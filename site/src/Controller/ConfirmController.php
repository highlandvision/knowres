<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\View\Gateway\HtmlView as GatewayView;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Payments\PrePayment;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use stdClass;

use function implode;
use function jexit;
use function substr;


/**
 * Reservation confirm controller
 *
 * @since 1.0.0
 */
class ConfirmController extends FormController
{
	/**
	 * Computes the values for the reservation (ajax)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function compute(): void
	{
		$this->checkToken();

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		$property_id     = $contractData->property_id;
		$arrival         = $contractData->arrival;
		$departure       = $contractData->departure;
		$guests          = $contractData->guests;
		$wrapper         = [];

		if (!$property_id || !$arrival || !$departure || !$guests) {
			$searchSession       = new KrSession\Search();
			$searchData          = $searchSession->getData();
			$region_id           = $searchData->region_id ?? 0;
			$Itemid              = SiteHelper::getItemId('com_knowres', 'properties', ['region_id' => $region_id]);
			$wrapper['redirect'] =
				KrMethods::route('index.php?option=com_knowres&view=properties&retain=2&Itemid=' . $Itemid);
			echo new JsonResponse($wrapper);
			jexit();
		}

		try {
			$jform                          = KrMethods::inputArray('jform');
			$contractData                   = $contractSession->updateData($jform);
			$contractData->deposit          = 0;
			$contractData->extra_quantities = KrMethods::inputArray('extra_quantities');
			$contractData->extra_ids        = KrMethods::inputArray('extra_ids');
			$contractData                   = $this->validateCoupon($contractData);

			$Hub = new Hub($contractData);
			$Hub->setExtras();

			$computations = ['base',
			                 'dow',
			                 'seasons',
			                 'shortstay',
			                 'longstay',
			                 'ratemarkup',
			                 'discount',
			                 'coupon',
			                 'tax',
			                 'extras',
			                 'deposit',
			                 'paymentdates',
			                 'commission'
			];

			$Hub->compute($computations);
			if (!$Hub->getValue('room_total')) {
				echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), true);
				jexit();
			}

			$contractSession->setData($Hub->getData());
			$wrapper['response'] = $this->formatOutput($Hub);
			echo new JsonResponse($wrapper);
			jexit();
		} catch (Exception $e) {
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), true);
			Logger::logMe($e->getMessage());
			jexit();
		}
	}

	/**
	 * Select function for payments
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function payment(): void
	{
		$this->checkToken();

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		if (!$contractData->contract_total) {
			$contractSession->resetData();
			SiteHelper::expiredSession(0, true);
		}

		$jform = KrMethods::inputArray('jform');
		if ($jform['property_id'] != $contractData->property_id ||
		    $jform['arrival'] != $contractData->arrival ||
		    $jform['room_total'] != $contractData->room_total) {
			$contractSession->resetData();
			SiteHelper::expiredSession($jform['property_id'], true);
		}

		if (!KrFactory::getListModel('contracts')
			->isPropertyAvailable($contractData->property_id,
				$contractData->arrival,
				$contractData->departure)) {
			$contractSession->resetData();
			SiteHelper::expiredSession($jform['property_id'], true);
		}

		$guestSession = new KrSession\Guest();
		$guestData    = $guestSession->getData();

		$contractData = $contractSession->updateData($jform);
		KrMethods::setUserState('com_knowres.edit.contract.data', $jform);
		$guestData = $guestSession->updateData($jform);
		KrMethods::setUserState('com_knowres.edit.guest.data', $jform);

		$Hub = new Hub($contractData);
		$Hub->setData($guestData, 'guestData');
		$actions = ['confirm'];
		$success = $this->core($Hub, $actions);
		if (!$success) {
			Utility::pageErrors($Hub->errors);
			$Itemid = SiteHelper::getItemId('com_knowres', 'confirm');
			$link   = KrMethods::route('index.php?option=com_knowres&view=confirm&Itemid=' . $Itemid, false);
			KrMethods::redirect($link);
		}

		$contractSession->setData($Hub->getData());
		$guestSession->setData($Hub->getData('guestData'));

		/** @var PaymentView $view */
		$view               = $this->getView('confirm', 'payment');
		$view->contractData = $Hub->getData();
		$view->guestData    = $Hub->getData('guestData');
		$view->property     = KrFactory::getAdminModel('property')->getItem($contractData->property_id);

		try {
			$prePayment        = new PrePayment();
			$view->paymentData = $prePayment->constructNew($contractData);
			$view->gateways    = $view->paymentData->gateways;
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), 'error');
			SiteHelper::redirectProperty($view->property->id);
		}

		$view->display();
	}

	/**
	 * Saves the contract and guest data before displaying gateway payment choices
	 *
	 * @param  null  $key     The name of the primary key of the URL variable.
	 * @param  null  $urlVar  The name of the URL variable if different from the primary key
	 *                        (sometimes required to avoid router collisions).
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function save($key = null, $urlVar = null): void
	{
		$this->checkToken();

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		if (!$contractData->contract_total) {
			$contractSession->resetData();
			SiteHelper::expiredSession(0, true);
		}

		$guestSession   = new KrSession\Guest();
		$guestData      = $guestSession->getData();
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();

		try {
			$Hub = new Hub($contractData);
			$Hub->setData($guestData, 'guestData');
			$Hub->setData($paymentData, 'paymentData');

			$actions = ['guest'];
			if (!$this->core($Hub, $actions)) {
				$errors = Utility::ajaxErrors($Hub->errors);
				echo new JsonResponse(null, implode('<br>', $errors), true);
				jexit();
			}

			$contractSession->setData($Hub->getData());
			$guestSession->setData($Hub->getData('guestData'));
			$paymentSession->setData($Hub->getData('paymentData'));

			$plugincc     = KrMethods::inputString('plugincc', '');
			$gateway_name = substr($plugincc, 0, -3);
			$service      = 'service' . $plugincc;
			$service_id   = KrMethods::inputInt($service);
			$class        = Gateway::setGatewayClass($gateway_name);
			$Gateway      = new $class($service_id, $paymentData);
			$paymentSession->setData($Gateway->setOutputData());

			/** @var GatewayView $view */
			$view               = $this->getView('gateway', 'html');
			$view->gateway_name = $gateway_name;
			$view->payment_type = $paymentData->payment_type;
			$view->service_id   = $service_id;
			$view->paymentData  = $paymentData;
			$view->display();
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'info');
			Utility::ajaxErrors($e);
		}
	}

	/**
	 * Display confirmation page for online reservations
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function success(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$contract_id  = !empty($userData->pr_contract_id) ? $userData->pr_contract_id : 0;
		$payment_type = !empty($userData->pr_payment_type) ? $userData->pr_payment_type : '';

		if (empty($contract_id)) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot()));
		}

		$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);

		KrMethods::cleanCache('com_knowres_contracts');
		$contractSession = new KrSession\Contract();
		$contractSession->resetData();

		/* @var HighlandVision\Component\Knowres\Site\View\Success\HtmlView $view * */
		$view                = $this->getView('success', 'html');
		$view->contract_id   = $contract->id;
		$view->contract_tag  = $contract->tag;
		$view->on_request    = $payment_type == 'OBR';
		$view->property_name = $contract->property_name;
		$view->Itemid        = SiteHelper::getItemId('com_knowres', 'success');

		$view->display();
	}

	/**
	 * Process the core updates and actions.
	 *
	 * @param  Hub    $Hub      Hub
	 * @param  array  $actions  Core processes to be actioned
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return bool
	 */
	protected function core(Hub $Hub, array $actions): bool
	{
		try {
			return $Hub->action($actions);
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_TRY_LATER'), true);
			jexit();
		}
	}

	/**
	 * Breaks the extras into rows for the contract form totals
	 *
	 * @param  Hub  $Hub  Hub data
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return string
	 */
	protected function extrasBreakdown(Hub $Hub): string
	{
		$Translations = new Translations();
		$display      = '';

		foreach ($Hub->getValue('extras') as $k => $v) {
			$name     = $Translations->getText('extra', $k);
			$quantity = $v['quantity'];
			$value    = $v['value'];

			if ($quantity > 1) {
				$name .= " x " . $quantity;
			}

			$valueDsp = '';
			if ($value > 0) {
				$valueDsp = $Hub->currencyDisplay($value);
			}

			$display .= '<div class="grid-x grid-margin-x"><span class="small-8 cell text-left">' .
			            $name .
			            '</span><span class="small-4 cell text-right">' . $valueDsp . '</span></div>';
		}

		return $display;
	}

	/**
	 * Format the json output
	 *
	 * @param  Hub  $Hub  Quote data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	protected function formatOutput(Hub $Hub): stdClass
	{
		$output = new stdClass();

		$output->nights       = $Hub->getValue('nights');
		$output->currency     = $Hub->getValue('currency');
		$output->hilite_total = $Hub->currencyDisplay($Hub->getValue('contract_total'));

		$output->room_total_gross = $Hub->currencyDisplay($Hub->getValue('room_total_gross'));
		if ((float) $Hub->getValue('discount') > 0 || (float) $Hub->getValue('coupon_discount') > 0) {
			$output->room_total_gross_text = KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL_GROSS');
			$output->hr                    = '<hr>';
			$output->room_total_text       = KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL');
			$output->room_total            = $Hub->currencyDisplay($Hub->getValue('room_total'));
		} else {
			$output->room_total_gross_text = KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL');
			$output->room_total_text       = '';
			$output->room_total            = '';
			$output->hr                    = '';
		}

		$output->discount_text = '';
		$output->discount      = '';
		if ((float) $Hub->getValue('discount') > 0) {
			$output->discount_text = KrMethods::plain('COM_KNOWRES_CONFIRM_DISCOUNT_LBL');
			$output->discount      = '-' . $Hub->currencyDisplay($Hub->getValue('discount'));
		}

		$output->coupon_text     = '';
		$output->coupon_discount = '';
		if ((float) $Hub->getValue('coupon_discount') > 0) {
			$output->coupon_text     = KrMethods::plain('COM_KNOWRES_CONFIRM_COUPON_DISCOUNT');
			$output->coupon_discount = '-' . $Hub->currencyDisplay($Hub->getValue('coupon_discount'));
		}

		$output->taxbreakdown1 = $this->taxDisplay($Hub, 1);
		$output->taxbreakdown2 = $this->taxDisplay($Hub, 2);
		$output->taxbreakdown3 = $this->taxDisplay($Hub, 3);

		$output->extrasbreakdown = $this->extrasBreakdown($Hub);
		if (!empty($output->extrasbreakdown)) {
			$output->extra_total_text = KrMethods::plain('COM_KNOWRES_CONTRACT_EXTRA_TOTAL_LBL');
			$output->extra_total      = $Hub->currencyDisplay($Hub->getValue('extra_total'));
		}

		$output->contract_total = $Hub->currencyDisplay($Hub->getValue('contract_total'));
		$output->deposit        = $Hub->currencyDisplay($Hub->getValue('deposit'));

		if ($Hub->getValue('booking_type') == 1) {
			$Hub->setValue('on_request', $Hub->params->get('booking_request_hold'));
			if ($Hub->getValue('contract_total') == $Hub->getValue('deposit')) {
				$output->deposit_date =
					KrMethods::sprintf('COM_KNOWRES_CONFIRM_REQUEST_FULL_PAYMENT',
						TickTock::displayDate($Hub->getValue('expiry_date')));
			} else {
				$output->deposit_date =
					KrMethods::sprintf('COM_KNOWRES_CONFIRM_REQUEST_DEPOSIT_DUE',
						TickTock::displayDate($Hub->getValue('expiry_date')));
			}

			$output->request_note = KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_NOTE');
		} else {
			if ($Hub->getValue('contract_total') == $Hub->getValue('deposit')) {
				$output->deposit_date = KrMethods::sprintf('COM_KNOWRES_CONFIRM_BOOK_FULL_PAYMENT');
			} else {
				$output->deposit_date =
					KrMethods::plain('COM_KNOWRES_DEPOSIT') .
					' ' .
					KrMethods::plain('COM_KNOWRES_CONFIRM_BOOK_PAYABLE_NOW');
			}
		}

		if ($Hub->getValue('contract_total') - $Hub->getValue('deposit') > 0) {
			$output->balance = $Hub->currencyDisplay($Hub->getValue('contract_total') - $Hub->getValue('deposit'));
			if (!(int) $Hub->getValue('balance_days')) {
				$output->balance_date = KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_39');
			} else {
				$output->balance_date =
					KrMethods::sprintf('COM_KNOWRES_CONFIRM_BALANCE_DUE',
						TickTock::displayDate($Hub->getValue('balance_date')));
			}
		}

		return $output;
	}

	/**
	 * Breaks the tax into rows for the contract form totals
	 *
	 * @param  Hub  $Hub       Hub data.
	 * @param  int  $tax_type  Calculation type of tax for breakdown.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	protected function taxDisplay(Hub $Hub, int $tax_type = 0): string
	{
		$display = '';
		foreach ($Hub->getValue('taxes') as $code => $v) {
			if ((float) $v['value'] <= 0) {
				continue;
			}
			if (isset($v['gross'])) {
				if ($tax_type == 1 && ((int) $v['gross'] || (int) $v['pay_arrival'])) {
					continue;
				}
				if ($tax_type == 2 && !(int) $v['gross']) {
					continue;
				}
				if ($tax_type == 3 && !(int) $v['pay_arrival']) {
					continue;
				}
			} else {
				$tax_type = isset($v['type']) ?? 0;
				$tax_type += 1;
			}

			$display .= KrMethods::render('confirm.summary.taxbreakdown',
				['type'  => $tax_type,
                 'value' => $Hub->currencyDisplay($v['value']),
                 'code'  => $code,
                 'id'    => $v['id'] ?? 0
			     ]);
		}

		return $display;
	}

	/**
	 * Validate coupon code
	 *
	 * @param  stdClass  $data  Form data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return stdClass
	 */
	protected function validateCoupon(stdClass $data): stdClass
	{
		if ($data->coupon_code) {
			$coupon = KrFactory::getListModel('coupons')->getCoupon($data->property_id, $data->coupon_code);
			if (isset($coupon->id) && $coupon->id > 0) {
				$data->coupon_id            = $coupon->id;
				$data->coupon_amount        = $coupon->amount;
				$data->coupon_is_percentage = $coupon->is_percentage;
				$data->coupon_discount      = 0;
			} else {
				$error = KrMethods::sprintf('COM_KNOWRES_CONFIRM_COUPON_INVALID', $data->coupon_code);
				echo new JsonResponse(null, $error, true);
				jexit();
			}
		} else {
			$data->coupon_code          = '';
			$data->coupon_id            = 0;
			$data->coupon_amount        = 0;
			$data->coupon_is_percentage = 0;
			$data->coupon_discount      = 0;
		}

		return $data;
	}
}