<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controller
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ContractModel;
use HighlandVision\Component\Knowres\Administrator\View\Contract\ShowView;
use HighlandVision\KR\Calendar;
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Pdf\Contract\Invoice;
use HighlandVision\KR\Media\Pdf\Contract\Voucher;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use stdClass;

use function count;
use function explode;
use function jexit;
use function join;

/**
 * Contract controller class.
 *
 * @since 1.0.0
 */
class ContractController extends FormController
{
	/** @var string Return link. */
	protected string $return = '';

	/**
	 * Returns the values for a manual agent booking
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function agent()
	{
		$this->checkToken();

		$jform           = KrMethods::inputArray('jform', []);
		$contractSession = new KrSession\Contract();
		$contractSession->resetData();
		$contractData         = $contractSession->updateData($jform);
		$contractData->guests = $jform['guests'];
		//		$contractData->guests     = $jform['adults'] + $jform['children'];
		//		$contractData->child_ages = !empty($jform['child_ages']) ? explode(',', $jform['child_ages']) : [];

		/* @var ContractModel $model */
		$model = $this->getModel();
		$form  = $model->getForm();
		if ($model->validate($form, (array) $contractData) === false)
		{
			echo new JsonResponse(null, join('<br>', $model->getErrors()), true);
			jexit();
		}

		try
		{
			$Hub   = new Hub($contractData);
			$agent = KrFactory::getAdminModel('agent')->getItem($contractData->agent_id);
			$Hub->setAgent($agent);
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}

		$computations = [
			'base',
			'dow',
			'seasons',
			'shortstay',
			'longstay',
			'discount'
		];
		$this->compute($Hub, $computations);

		if ($Hub->agent->mandatory_extras_charge)
		{
			$extrasDb = KrFactory::getListModel('extras')->getPricingExtras($Hub->getValue('property_id'), true);
			$Hub->setValue('extrasRq', false);
			$Hub->setValue('extrasDb', $extrasDb);
		}

		$computations = [
			'extras',
			'agent',
			'deposit',
			'paymentdates',
			'commission',
			'agentownerdeposit'
		];
		$this->compute($Hub, $computations);

		$room_total = $Hub->getValue('room_total');
		if (!$room_total)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_QUOTE_NO_ROOM_TOTAL'), true);
			jexit();
		}

		$contractSession->setData($Hub->getData());

		$wrapper             = [];
		$wrapper['response'] = $this->formatOutputAgent($Hub);
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Method to send unsent reservations to Xero
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	public function batchxero()
	{
		$this->checkToken();
		$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=contracts', false));

		$cid = KrMethods::inputArray('cid', [], 'get');
		if (is_countable($cid))
		{
			if (!KrFactory::getListModel('contractpayments')->updateXeroBatch($cid))
			{
				KrMethods::message("An error occurred please reselect contracts", 'error');
			}
		}
	}

	/**
	 * Abort the task and return
	 *
	 * @param   string|null  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function cancel($key = null)
	{
		if (parent::cancel($key))
		{
			$contractSession = new KrSession\Contract();
			$contractData    = $contractSession->getData();
			$id              = $contractData->id;
			$contractSession->resetData();
			$guestSession = new KrSession\Guest();
			$guestSession->resetData();
			$gobackto = Utility::getGoBackTo();

			if ($id)
			{
				$return = KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $id, false);
			}
			else if ($gobackto)
			{
				$return = KrMethods::route('index.php?option=com_knowres&' . $gobackto, false);
			}
			else
			{
				$return = KrMethods::route('index.php?option=com_knowres&view=properties', false);
			}

			$wrapper             = [];
			$wrapper['redirect'] = $return;

			echo new JsonResponse($wrapper);
			jexit();
		}
	}

	/**
	 * Method to delete (completely obliterate a contract and all related data )
	 *
	 * @throws Exception
	 * @since  2.3.0
	 */
	#[NoReturn] public function delete()
	{
		$this->checkToken();

		$id = $this->validateId();
		/* @var ContractModel $item */
		$item = KrFactory::getAdminModel('contract')->getItem($id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);

		$Hub     = new Hub($contractData);
		$actions = ['delete'];
		$success = $this->core($Hub, $actions);
		if (!$success)
		{
			echo new JsonResponse(null, join('<br>', $Hub->errors), true);
			jexit();
		}

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$wrapper             = [];
		$wrapper['redirect'] = KrMethods::route('index.php?option=com_knowres&view=contracts&success=1', false);
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Show calendar datepicker for admin bookings
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function init()
	{
		$property_id = $this->input->getInt('pid', 0);
		$edit_id     = $this->input->getInt('edit_id', 0);

		$Calendar            = new Calendar\Manager($property_id, $edit_id);
		$wrapper             = [];
		$wrapper['blocked']  = Utility::encodeJson($Calendar->getBlockedDates());
		$wrapper['getquote'] = true;

		if (!$edit_id)
		{
			$arrival   = $this->input->getString('arrival', '');
			$departure = $this->input->getString('departure', '');
			if (!$arrival || !$departure)
			{
				list($arrival, $departure) = $Calendar->getFirstFreeDate();
				$wrapper['getquote'] = false;
			}
			$wrapper['arrival']      = $arrival;
			$wrapper['departure']    = $departure;
			$wrapper['arrival_bd']   = TickTock::displayDate($arrival, 'j M Y');
			$wrapper['departure_bd'] = TickTock::displayDate($departure, 'j M Y');
		}

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Format and download the pdf invoice
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return bool
	 */
	public function invoice(): bool
	{
		$this->checkToken();

		$contract_id = KrMethods::inputInt('contract_id');
		if (!$contract_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=contracts'));
		}

		$Invoice = new Invoice('download', $contract_id);
		$result  = $Invoice->getPdf();
		if (!$result)
		{
			foreach ($errors as $e)
			{
				KrMethods::message($e);
			}

			return false;
		}

		jexit();
	}

	/**
	 * Returns the values for the manager booking
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function manager()
	{
		$this->checkToken('post', false);

		$jform   = KrMethods::inputArray('jform', []);
		$id      = isset($jform['id']) ? (int) $jform['id'] : 0;
		$initial = isset($jform['initial']) ? (int) $jform['initial'] : 0;
		$manual  = isset($jform['manual']) ? (int) $jform['manual'] : 0;
		$fixrate = isset($jform['fixrate']) ? (int) $jform['fixrate'] : 0;

		$contractSession = new KrSession\Contract();
		if (!$id)
		{
			$contractSession->resetData();
		}
		$contractData         = $contractSession->updateData($jform);
		$contractData->guests = $jform['guests'];
		//TODO-v4.1 reinstate when tax requires
		//		$contractData->adults           = $jform['adults'];
		//		$contractData->children         = $jform['children'];
		//		$contractData->child_ages       = !empty($jform['child_ages']) ? explode(',', $jform['child_ages']) : [];
		$contractData->isEdit           = (bool) $id;
		$contractData->extra_quantities = KrMethods::inputArray('extra_quantity', []);
		$contractData->extra_ids        = KrMethods::inputArray('extra_id', []);
		$contractData                   = $this->validateCoupon($contractData);

		if ($id && $initial)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_CONTRACT_EDIT_EDIT'), false);
			jexit();
		}

		try
		{
			$Hub = new Hub($contractData);
			if ($contractData->agent_id)
			{
				$agent = KrFactory::getAdminModel('agent')->getItem($contractData->agent_id);
				$Hub->setAgent($agent);
			}
		}
		catch (Exception $e)
		{
			echo new JsonResponse(null, $e->getMessage(), true);
			jexit();
		}

		$Hub->setExtras();

		if ($manual)
		{
			if (!$Hub->getValue('room_total_gross'))
			{
				echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_ROOM_TOTAL_GROSS'), true);
				jexit();
			}

			$saved        = clone $Hub->getData();
			$computations = [
				'base',
				'dow',
				'seasons',
				'shortstay',
				'longstay',
				'ratemarkup',
				'discount',
				'coupon'
			];
			$this->compute($Hub, $computations);
			$markup      = $Hub->getValue('markup');
			$adjustments = $Hub->getValue('adjustments');
			$Hub->setData($saved);
			$Hub->setValue('markup', $markup);
			$Hub->setValue('adjustments', $adjustments);

			$computations = [
				'override',
				'tax',
				'extras',
				'deposit',
				'paymentdates',
				'commission'
			];

			$this->compute($Hub, $computations);
		}
		else if ($fixrate)
		{
			$computations = [
				'extras',
				'deposit',
				'paymentdates'
			];
			$this->compute($Hub, $computations);
		}
		else
		{
			$Calendar = new Calendar($Hub->getValue('property_id'), $Hub->getValue('arrival'),
				$Hub->getValue('departure'));

			$minstay = $Calendar->getMinstay();
			if ($Hub->getValue('nights') < $minstay[$Hub->getValue('arrival')])
			{
				$Hub->setValue('ajax_warning', KrMethods::plain('COM_KNOWRES_ERROR_QUOTE_NO_RATES'));
			}
			else
			{
				$computations = [
					'base',
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

				$this->compute($Hub, $computations);
			}
		}

		$contractSession->setData($Hub->getData());
		if (!$Hub->getValue('room_total_gross'))
		{
			$Hub->setValue('ajax_warning', KrMethods::plain('COM_KNOWRES_ERROR_QUOTE_NO_RATES'));
		}

		$wrapper             = [];
		$wrapper['response'] = $this->formatOutput($Hub);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Ajax - Returns the Json data for the book modal for calendars
	 *
	 * @throws Exception
	 * @since        3.2.0
	 */
	#[NoReturn] public function modalbook()
	{
		$property_id = KrMethods::inputInt('property_id');
		$arrival     = KrMethods::inputString('arrival', '');
		$departure   = TickTock::modifyDays($arrival);
		$source      = KrMethods::inputString('source');
		$params      = KrMethods::getParams();

		$userSession  = new KrSession\User();
		$access_level = $userSession->getAccessLevel();
		$allow_block  = !($access_level == 10 && !$params->get('block_add'));
		$form         = null;
		if ($allow_block)
		{
			$Calendar = new Calendar\Manager($property_id);
			$blocked  = $Calendar->getBlockedDates();
			$edate    = $Calendar->getEndDate();

			$form = KrFactory::getAdhocForm('contract-modal-book', 'contract_modal_book.xml');
			$form->setValue('arrivaldsp', null, TickTock::parseString($arrival, 'd M Y'));
			$form->setValue('departuredsp', null, TickTock::parseString($departure, 'd M Y'));
		}

		if ($source == 'calendar')
		{
			KrMethods::setUserState('com_knowres.gobackto', 'task=property.calendar&property_id=' . $property_id);
		}
		else if ($source == 'gantt')
		{
			KrMethods::setUserState('com_knowres.gobackto', 'view=gantt');
		}

		$html = KrMethods::render('contract.modal.book', [
			'allow_block' => $allow_block,
			'allow_book'  => !($access_level == 10 && !$params->get('contract_add')),
			'arrival'     => $arrival,
			'departure'   => $departure,
			'form'        => $form,
			'property_id' => $property_id
		]);

		$wrapper               = [];
		$wrapper['html']       = $html;
		$wrapper['ui_booked']  = Utility::encodeJson($blocked);
		$wrapper['ui_eDate']   = $edate;
		$wrapper['ui_aDate']   = $arrival;
		$wrapper['ui_dDate']   = $departure;
		$wrapper['ui_minDays'] = 1;
		$wrapper['ui_minDate'] = TickTock::getDate();
		$wrapper['ui_today']   = TickTock::getDate();

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Ajax - Returns the HTML data for the gantt modal show
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	#[NoReturn] public function modalshow(): bool
	{
		$id = KrMethods::inputInt('id');
		if (!$id)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'));
			jexit();
		}

		$type = KrMethods::inputString('block', 'c');
		if ($type == 'c')
		{
			$item = KrFactory::getAdminModel('contract')->getItem($id);
			if (empty($item->id))
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
				echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
				jexit();
			}

			$userSession  = new KrSession\User();
			$access_level = $userSession->getAccessLevel();
			$params       = KrMethods::getParams();

			if ($item->black_booking)
			{
				$notes = KrFactory::getListModel('contractnotes')->getForContract($item->id);
				$html  = KrMethods::render('contract.modal.show.block', [
					'item'         => $item,
					'notes'        => $notes,
					'allow_cancel' => !($access_level == 10 && !$params->get('block_cancel'))
				]);
			}
			else
			{
				$guestdata = false;
				if ($item->guestdata_id)
				{
					$guestdata = KrFactory::getAdminModel('contractguestdata')->getItem($item->guestdata_id);
				}
				$payments = KrFactory::getListModel('contractpayments')->getForContract($item->id);
				$fees     = KrFactory::getListModel('contractfees')->getForContract($item->id);
				[$balance, $balance_all] = KrFactory::getAdminModel('contractpayment')::setBalances($item,
					$payments, $fees);

				$html = KrMethods::render('contract.modal.show.reservation', [
					'item'        => $item,
					'notes'       => KrFactory::getListModel('contractnotes')->getForContract($item->id),
					'guest'       => KrFactory::getAdminModel('guest')->getItem($item->guest_id),
					'guestdata'   => $guestdata,
					'payments'    => $payments,
					'payment'     => KrFactory::getListModel('contractpayments')->getPaymentTotal($item->id),
					'fees'        => $fees,
					'audience'    => $access_level > 10 ? 'manager' : 'owner',
					'balance'     => $balance,
					'balance_all' => $balance_all
				]);
			}

			KrMethods::setUserState('com_knowres.current.contract_id', $item->id);
		}
		else
		{
			$item = KrFactory::getAdminModel('icalblock')->getItem($id);
			if (empty($item->id))
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
				echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
				jexit();
			}

			$html = KrMethods::render('contract.modal.show.ical', ['item' => $item]);
		}

		$wrapper         = [];
		$wrapper['html'] = $html;
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Method to process a quick edit request
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	#[NoReturn] public function quick()
	{
		$this->checkToken();

		$jform = KrMethods::inputArray('jform', []);
		$id    = $jform['id'];
		if (!$id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		$originalData    = clone $contractData;
		$contractData    = $contractSession->updateData($jform);

		$Hub = new Hub($contractData);
		$Hub->setOriginalData($originalData);
		$actions = ['quick'];
		if (!$this->core($Hub, $actions))
		{
			echo new JsonResponse(null, join('<br>', $Hub->errors), true);
			jexit();
		}

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$wrapper             = [];
		$wrapper['redirect'] = KrMethods::route('index.php?option=com_knowres&task=contract.show&success=1&id=' . $id,
			false);
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Process an approved request
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function requestapprove()
	{
		$this->checkToken();

		$id         = $this->validateId();
		$service_id = $this->input->getInt('service_id', 0);

		/* @var ContractModel $item */
		$item = KrFactory::getAdminModel('contract')->getItem($id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);
		$Hub             = new Hub($contractData);

		$paymentSession          = new KrSession\Payment();
		$paymentData             = $paymentSession->resetData();
		$paymentData->service_id = $service_id;
		if ($service_id)
		{
			$paymentData->contract_id  = $id;
			$paymentData->payment_type = 'RBD';
		}
		$Hub->setData($paymentData, 'paymentData');

		$actions = ['requestapprove', 'emails'];
		$this->core($Hub, $actions);

		$wrapper             = [];
		$wrapper['redirect'] = $this->setReturn($Hub);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Process a rejected request
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function requestreject()
	{
		$this->checkToken();

		$id   = $this->validateId();
		$item = KrFactory::getAdminModel('contract')->getItem($id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);

		$Hub     = new Hub($contractData);
		$actions = ['requestreject',
		            'servicequeue',
		            'emails'];
		$this->core($Hub, $actions);

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$wrapper             = [];
		$wrapper['redirect'] = $this->setReturn($Hub);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Method to resurrect a cancelled reservation
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	#[NoReturn] public function resurrect()
	{
		$this->checkToken();

		$jform = KrMethods::inputArray('jform', []);
		$id    = $this->validateId($jform['id']);

		$item = KrFactory::getAdminModel('contract')->getItem($id);
		if (!$item->id)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_NOT_FOUND'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->getData();
		$originalData    = clone $contractData;
		$contractData    = $contractSession->updateData($jform);

		$Hub = new Hub($contractData);
		$Hub->setOriginalData($originalData);
		$actions = ['resurrect',
		            'servicequeue'];
		if (!$this->core($Hub, $actions))
		{
			Utility::pageErrors($Hub->errors);
			echo new JsonResponse(null, '', true);
			jexit();
		}

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$wrapper             = [];
		$wrapper['redirect'] = $this->setReturn($Hub);
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Override save function
	 * Requires session data to be set with current data
	 *
	 * @param   null  $key     The name of the primary key of the URL variable.
	 * @param   null  $urlVar  The name of the URL variable if different from the primary key (sometimes required to avoid router collisions).
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function save($key = null, $urlVar = null)
	{
		$this->checkToken();

		$action = KrMethods::inputString('action', '');
		$jform  = KrMethods::inputArray('jform', []);

		$contractSession          = new KrSession\Contract();
		$contractData             = $contractSession->updateData($jform);
		$contractData->child_ages = !empty($jform['child_ages']) ? explode(',', $jform['child_ages']) : [];
		$Hub                      = new Hub($contractData);

		if ($action != 'block')
		{
			$originalData = clone $contractData;
			$guestSession = new KrSession\Guest();
			$guestData    = $guestSession->updateData($jform);
			$Hub->setData($guestData, 'guestData');
			$Hub->setOriginalData($originalData);
			$actions = ['manager',
			            'servicequeue',
			            'emails'];
		}
		else
		{
			$actions = ['block',
			            'servicequeue'];
		}

		$success = $this->core($Hub, $actions);
		if (!$success)
		{
			echo new JsonResponse(null, join('<br>', $Hub->errors), true);
			jexit();
		}

		$contractSession->resetData();
		if ($action != 'block')
		{
			$guestSession->resetData();
		}
		KrMethods::cleanCache('com_knowres_contracts');
		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));

		if (!$this->return)
		{
			$this->return = $this->setReturn($Hub, $action);
		}

		$wrapper             = [];
		$wrapper['redirect'] = $this->return;
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Returns the data for the show view
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function show()
	{
		$id = $this->input->getInt('id', 0);
		if (!$id)
		{
			$cid = $this->input->post->get('cid', [], 'array');
			if (is_countable($cid) && count($cid))
			{
				$id = $cid[0];
			}
		}

		if (!$id)
		{
			KrMethods::message('Reservation ID not received, please select a Reservation', 'error');
			Utility::goto('contracts');
		}

		/* @var ShowView $view */
		$view     = $this->getView('contract', 'show');
		$view->id = $id;
		$view->display();
	}

	/**
	 * Method to cancel (trash as per Joomla terms) a contract
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function trash()
	{
		$id   = $this->validateId();
		$item = KrFactory::getAdminModel('contract')->getItem($id);
		if (!$item->id)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_NOT_FOUND'), true);
			jexit();
		}

		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);

		$Hub     = new Hub($contractData);
		$actions = ['cancel',
		            'servicequeue',
		            'emails'];
		if (!$this->core($Hub, $actions))
		{
			Utility::pageErrors($Hub->errors);
			echo new JsonResponse(null, '', true);
			jexit();
		}

		$contractSession->resetData();
		KrMethods::cleanCache('com_knowres_contracts');

		$wrapper             = [];
		$wrapper['redirect'] = $this->setReturn($Hub);
		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Send the manual email update
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function trigger()
	{
		$id            = $this->validateId();
		$email_trigger = $this->input->getInt('email_trigger', 0);

		if ($email_trigger == 1 || $email_trigger == 0)
		{
			$email = new ContractEmail('MANUALBOOK');
			$email->sendTheEmails($id);
		}
		if ($email_trigger == 2 || $email_trigger == 0)
		{
			$email = new ContractEmail('MANUALBOOKOWNER');
			$email->sendTheEmails($id);
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $id, false));
	}

	/**
	 * Format and download the pdf voucher
	 *
	 * @throws Exception
	 * @since  2.2.0
	 * @return bool
	 */
	public function voucher(): bool
	{
		$this->checkToken();

		$contract_id = KrMethods::inputInt('contract_id');
		if (!$contract_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			$this->setRedirect(KrMethods::route('index.php?option=com_knowres&view=contracts'));
		}

		$Voucher = new Voucher('download', $contract_id);
		$result  = $Voucher->getPdf();
		if (!$result)
		{
			foreach ($errors as $e)
			{
				KrMethods::message($e);
			}

			return false;
		}

		jexit();
	}

	/**
	 * Returns the data for the Xero modal
	 *
	 * @throws Exception
	 * @since 3.1.0
	 */
	public function xero()
	{
		$view = $this->getView('contract', 'xero');
		$view?->display();
	}

	/**
	 * Compute the reservation values
	 *
	 * @param   Hub    $Hub           Hub
	 * @param   array  $computations  Computations to be actioned
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function compute(Hub $Hub, array $computations)
	{
		try
		{
			$Hub->compute($computations);
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), true);
			jexit();
		}
	}

	/**
	 * Process the updates and actions.
	 *
	 * @param   Hub    $Hub      Hub
	 * @param   array  $actions  Core processes to be actioned
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return bool
	 */
	protected function core(Hub $Hub, array $actions): bool
	{
		try
		{
			return $Hub->action($actions);
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, $e->getMessage(), true);
			jexit();
		}
	}

	/**
	 * Format the ajax response for manager
	 *
	 * @param   Hub  $Hub  Quote data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	protected function formatOutput(Hub $Hub): stdClass
	{
		$output = new stdClass();

		$output->adjustments      = KrMethods::render('contract.summary.adjustments', ['quote' => $Hub->getData()]);
		$output->discount         = $Hub->valueDisplay($Hub->getValue('discount'));
		$output->discounts        = KrMethods::render('contract.summary.discounts', ['quote' => $Hub->getData()]);
		$output->taxes            = KrMethods::render('contract.summary.taxes', ['quote' => $Hub->getData()]);
		$output->extra_total      = $Hub->currencyDisplay($Hub->getValue('extra_total'));
		$output->extras           = KrMethods::render('contract.summary.extras', ['quote' => $Hub->getData()]);
		$output->nights           = $Hub->getValue('nights');
		$output->room_total       = $Hub->currencyDisplay($Hub->getValue('room_total'));
		$output->room_total_gross = $Hub->valueDisplay($Hub->getValue('room_total_gross'));
		$output->contract_total   = $Hub->currencyDisplay($Hub->getValue('contract_total'));
		$output->coupon_discount  = $Hub->currencyDisplay($Hub->getValue('coupon_discount'));
		$output->currency         = $Hub->getValue('currency');
		$output->deposit          = $Hub->valueDisplay($Hub->getValue('deposit'));
		$output->expiry_date      = TickTock::displayDate($Hub->getValue('expiry_date'));
		$output->balance          = $Hub->currencyDisplay($Hub->getValue('contract_total') - $Hub->getValue('deposit'));
		$output->net_price_system = $Hub->currencyDisplay($Hub->getValue('net_price_system'));
		$output->commission       = $Hub->currencyDisplay($Hub->getValue('commission'));

		if ($Hub->getValue('contract_total') == $Hub->getValue('deposit'))
		{
			$output->deposit_date = KrMethods::sprintf('COM_KNOWRES_FULL_PAYMENT_DUE',
				TickTock::displayDate($Hub->getValue('expiry_date')));
		}
		else
		{
			$output->deposit_date = KrMethods::sprintf('COM_KNOWRES_DEPOSIT_DUE',
				TickTock::displayDate($Hub->getValue('expiry_date')));
		}

		if ($Hub->getvalue('contract_total') - $Hub->getValue('deposit') == 0)
		{
			$output->balance_date = KrMethods::plain('COM_KNOWRES_BALANCE');
		}
		else if (!(int) $Hub->getValue('balance_days'))
		{
			$output->balance_date = KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_39');
		}
		else
		{
			$output->balance_date = KrMethods::sprintf('COM_KNOWRES_BALANCE_DUE',
				TickTock::displayDate($Hub->getValue('balance_date')));
		}

		$output->ajax_warning = $Hub->getValue('ajax_warning');

		return $output;
	}

	/**
	 * Format the output values for display in the form
	 *
	 * @param   Hub  $Hub  Quote data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	protected function formatOutputAgent(Hub $Hub): stdClass
	{
		$output = new stdClass();

		$output->taxes            = KrMethods::render('contract.summary.taxes', ['quote' => $Hub->getData()]);
		$output->extra_total      = $Hub->currencyDisplay($Hub->getValue('extra_total'));
		$output->extras           = KrMethods::render('contract.summary.extras', ['quote' => $Hub->getData()]);
		$output->adjustmnents     = KrMethods::render('contract.summary.adjustments', ['quote' => $Hub->getData()]);
		$output->net_price_system = $Hub->currencyDisplay($Hub->getValue('net_price_system'));
		$output->nights           = TickTock::differenceDays($Hub->getValue('arrival'), $Hub->getValue('departure'));
		$output->commission       = $Hub->currencyDisplay($Hub->getValue('commission'));
		$output->room_total       = $Hub->currencyDisplay($Hub->getValue('room_total'));
		$output->contract_total   = $Hub->currencyDisplay($Hub->getValue('contract_total'));
		$output->deposit          = $Hub->currencyDisplay($Hub->getValue('deposit'));
		$output->balance          = $Hub->currencyDisplay($Hub->getValue('contract_total') - $Hub->getValue('deposit'));
		$output->hbalance         = KrMethods::plain('COM_KNOWRES_BALANCE');
		$output->agent_commission = $Hub->currencyDisplay($Hub->getValue('agent_commission'));

		if ($Hub->getValue('agent_deposit_paid'))
		{
			$output->hdeposit = KrMethods::plain('COM_KNOWRES_DEPOSIT_AGENT');
		}
		else if ($Hub->getValue('contract_total') == $Hub->getValue('deposit'))
		{
			$output->hdeposit = KrMethods::sprintf('COM_KNOWRES_FULL_PAYMENT_DUE',
				TickTock::displayDate($Hub->getValue('expiry_date')));
		}
		else
		{
			$output->hdeposit = KrMethods::sprintf('COM_KNOWRES_DEPOSIT_DUE',
				TickTock::displayDate($Hub->getValue('expiry_date')));
		}

		if ($Hub->getValue('contract_total') - $Hub->getValue('deposit') == 0)
		{
			$output->balance_date = KrMethods::plain('COM_KNOWRES_BALANCE');
		}
		else if (!(int) $Hub->getValue('balance_days'))
		{
			$output->balance_date = KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS_39');
		}
		else
		{
			$output->balance_date = KrMethods::sprintf('COM_KNOWRES_BALANCE_DUE',
				TickTock::displayDate($Hub->getValue('balance_date')));
		}

		$output->ajax_warning = $Hub->getValue('ajax_warning');

		return $output;
	}

	/**
	 * Set the return value for block and manager.
	 *
	 * @param   Hub     $Hub      Hub
	 * @param   string  $action   Layout action
	 * @param   bool    $success  True for success
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	protected function setReturn(Hub $Hub, string $action = '', bool $success = true): string
	{
		$task     = $this->getTask();
		$gobackto = KrMethods::inputString('gobackto', '');
		if (empty($gobackto))
		{
			$gobackto = Utility::getGoBackTo();
		}

		$url = KrMethods::getRoot() . 'administrator/';
		try
		{
			$id = $Hub->getValue('id');
		}
		catch (Exception)
		{
			$id = 0;
		}

		if ($task === 'save' && $id > 0 && $action != 'block')
		{
			$url .= 'index.php?option=com_knowres&task=contract.show&id=' . $id;
		}
		else if ($task == 'save2new' && $id > 0)
		{
			$url .= 'index.php?option=com_knowres&view=contract&task=edit';
			if ($action)
			{
				$url .= '&layout=' . $action;
			}
		}
		else if ($gobackto)
		{
			if (str_contains($gobackto, 'task') || str_contains($gobackto, 'view'))
			{
				$url .= 'index.php?option=com_knowres&' . $gobackto;
			}
			else
			{
				$url .= 'index.php?option=com_knowres&view=' . $gobackto;
			}
		}
		else if (($task === 'trash' || $task === 'resurrect') && $id > 0)
		{
			$url .= 'index.php?option=com_knowres&task=contract.show&id=' . $id;
		}
		else if (($task === 'requestreject' || $task === 'requestapprove'))
		{
			$url .= 'index.php?option=com_knowres&task=contracts.daily&success=1';
		}
		else
		{
			$url .= 'index.php?option=com_knowres&view=contract&task=edit&layout=' . $action;
			if ($action)
			{
				$url .= '&layout=' . $action;
			}
		}

		if ($success)
		{
			$url .= '&success=1';
		}

		return KrMethods::route($url, false);
	}

	/**
	 * Validate coupon code
	 *
	 * @param   stdClass  $data  Form data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return stdClass
	 */
	protected function validateCoupon(stdClass $data): stdClass
	{
		if ($data->coupon_code)
		{
			$coupon = KrFactory::getListModel('coupons')
			                   ->getCoupon($data->property_id, $data->coupon_code);
			if (isset($coupon->id) && $coupon->id > 0)
			{
				$data->coupon_id            = $coupon->id;
				$data->coupon_amount        = $coupon->amount;
				$data->coupon_is_percentage = $coupon->is_percentage;
				$data->coupon_discount      = 0;
			}
			else
			{
				echo new JsonResponse(null, KrMethods::sprintf('COM_KNOWRES_COUPONS_ERROR', $data->coupon_code), true);
				jexit();
			}
		}
		else
		{
			$data->coupon_code          = '';
			$data->coupon_id            = 0;
			$data->coupon_amount        = 0;
			$data->coupon_is_percentage = 0;
			$data->coupon_discount      = 0;
		}

		return $data;
	}

	/**
	 * Check that contract ID has been sent
	 *
	 * @param   int  $id  Conteact ID
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return int
	 */
	protected function validateId(int $id = 0): int
	{
		if (!$id)
		{
			$id = KrMethods::inputInt('id');
		}
		if (!$id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_NO_CONTRACT'), 'error');
			echo new JsonResponse(null, '', true);
			jexit();
		}

		return $id;
	}

	//TODO-v4.1 - reinstate with correct stripe processing end email notifications
	//	/**
	//	 * Take balance via Stripe
	//	 *
	//	 * @since 1.0.0
	//	 */
	//	public function stripebalance()
	//	{
	//		JRequest::checkToken('get') or die(KrMethods::plain('Invalid Token'));
	//
	//		$back = KrMethods::route('index.php?option=com_knowres&task=contracts.daily');
	//
	//		$contract_id = $this->input->getInt('id', 0);
	//		if (!$contract_id)
	//		{
	//			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_NO_CONTRACT'), 'error');
	//			KrMethods::redirect($back);
	//		}
	//
	//		$contract = KrFactory::getAdminModel('Contract')->getItem($contract_id);
	//		if (!$contract->id)
	//		{
	//			KrMethods::message(KrMethods::plain('Reservation not found'), 'error');
	//			KrMethods::redirect($back);
	//		}
	//
	//		$services = KrFactory::getListModel('Services')->getServicesByPlugin('stripe', $contract->agency_id, $contract->currency);
	//		if (is_countable($services) && count($services) != 1)
	//		{
	//			KrMethods::message(KrMethods::plain('Gateway cannot be determined'), 'error');
	//			KrMethods::redirect($back);
	//		}
	//
	//		foreach ($services as $i)
	//		{
	//			$class   = '\\HighlandVision\\KR\\Service\\Gateway\\' . ucfirst($i->plugin);
	//			$gateway = new $class($i->id, $contract_id, 'CBB');
	//			if (!$gateway->getGatewayData())
	//			{
	//				foreach ($gateway->getErrors() as $e)
	//				{
	//					KrMethods::message($e, 'error');
	//				}
	//
	//				return;
	//			}
	//
	//			if (!$gateway->setOutputForPaymentType())
	//			{
	//				foreach ($gateway->getErrors() as $e)
	//				{
	//					KrMethods::message($e, 'error');
	//				}
	//
	//				return;
	//			}
	//
	//			if (!$gateway->processCBB())
	//			{
	//				foreach ($gateway->getErrors() as $e)
	//				{
	//					KrMethods::message($e, 'error');
	//				}
	//			}
	//			else
	//			{
	//				KrMethods::message(KrMethods::plain('COM_KNOWRES_CONTRACT_REQUEST_SUCCESS'));
	//			}
	//		}
	//	}
}