<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use DOMDocument;
use Exception;
use HighlandVision\Helpscout\Helpdesk;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Pdf\Property\Terms;
use HighlandVision\KR\Model\SiteModel;
use HighlandVision\KR\Payments\PostPayment;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\Service\Mailchimp;
use HighlandVision\KR\Service\Webhook;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use HighlandVision\Ru\Manager\Bookings;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use stdClass;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient as StripeClient;
use Stripe\Webhook as StripeWebhook;

use function base64_decode;
use function explode;
use function file_get_contents;
use function header;
use function http_response_code;
use function is_bool;
use function jexit;
use function json_decode;
use function json_encode;
use function libxml_clear_errors;
use function libxml_get_errors;
use function libxml_use_internal_errors;
use function simplexml_import_dom;
use function simplexml_load_string;
use function strtolower;
use function trim;

/**
 * Service controller
 *
 * @since   1.0.0
 */
//TODO 5.2 Put responses into Library class (preprocesser for PostPayment)
class ServiceController extends BaseController
{
	/** @var int Indicates that test is being run */
	protected int $test;

	/**
	 * Bankia gateway
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	public function bankia(): void
	{
		$this->processRedsys();
	}

	/**
	 * Process check confirmation
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function check(): void
	{
		$this->checkToken();
		$this->manual();
	}

	/**
	 * Helpscout custom sidebar app
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.2.0
	 */
	#[NoReturn] public function hsdynamic(): void
	{
		$hs = new Helpdesk\Dynamic();
		echo $hs->getDynamicResponse();

		jexit();
	}

	/**
	 * Action mailchimp subscriptions
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	public function mailchimpsubscribe(): void
	{
		$this->doMailchimp();
	}

	/**
	 * PayPal SCA process response
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	public function paypal(): void
	{
		$this->doPaypal();
	}

	/**
	 * Redsys gateway
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	public function redsys(): void
	{
		$this->doRedsys();
	}

	/**
	 * Process LNM post from RU
	 *
	 * @throws Exception
	 * @since        2.2.0
	 * @noinspection PhpUnused
	 */
	public function rulnmhandler(): void
	{
		$this->doRuLnmHandler();
	}

	/**
	 * Send all properties to channel
	 *
	 * @throws Exception
	 * @since 3.1.0
	 */
	public function sendallproperties(): void
	{
		$service_id = KrMethods::inputInt('id');
		if (!$service_id) {
			jexit('Please add id of service e.g. id=55 to the URL request');
		}

		$properties = KrFactory::getListModel('servicexrefs')->getPropertiesForService($service_id);
		$db         = KrFactory::getDatabase();
		foreach ($properties as $p) {
			$queue               = new stdClass();
			$queue->id           = 0;
			$queue->service_id   = $service_id;
			$queue->contract_id  = 0;
			$queue->agent_id     = 0;
			$queue->property_id  = $p->property_id;
			$queue->arrival      = '';
			$queue->departure    = '';
			$queue->availability = 0;
			$queue->actioned     = 0;
			$queue->method       = 'updateProperty';
			$queue->foreign_key  = $p->foreign_key;
			$queue->state        = 1;
			$queue->created_at   = TickTock::getTS();
			$queue->created_by   = Factory::getUser()->id;

			$db->insertObject('#__knowres_service_queue', $queue);
		}
	}

	/**
	 * Stripe return url redirects
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	public function stripecomplete(): void
	{
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();

		if ($paymentData->contract_id) {
			$contract = KrFactory::getAdminModel('contract')->getItem($paymentData->contract_id);
			if (!$contract->id) {
				throw new RuntimeException('Contract not found for id ' . $paymentData->contract_id);
			}
		}

		// Would normally be done when payment gets confirmed but webhook timing can't be guaranteed
		// for success page so displaying now
		$userSession               = new KrSession\User();
		$userData                  = $userSession->getData();
		$userData->pr_contract_id  = $paymentData->contract_id;
		$userData->pr_payment_type = $paymentData->payment_type;
		$userSession->setData($userData);

		try {
			$this->redirectSuccess($paymentData->payment_type, $paymentData->contract_id);
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_CANCEL'), 'alert');
			$this->redirectError($paymentData->payment_type);
		}
	}

	/**
	 * Set data for stripe order and return setup intent (OBR) or payment intent (all others)
	 * No usages called in js
	 *
	 * @since  5.1
	 */
	public function stripecreate(): void
	{
		header('Content-Type: application/json');
		try {
			$paymentSession = new KrSession\Payment();
			$paymentData    = $paymentSession->getData();

			if ($paymentData->payment_type == 'OBR') {
				$secret = $this->stripeSetupIntents($paymentData);
			} else {
				$secret = $this->stripePaymentIntents($paymentData);
			}

			$output = [
				'clientSecret' => $secret,
				'paymentType'  => $paymentData->payment_type,
			];

			echo json_encode($output);
			jexit();
		} catch (Error|Exception $e) {
			http_response_code(500);
			echo json_encode(['error' => $e->getMessage()]);
			jexit();
		}
	}

	/**
	 * Stripe webhook endpoint
	 *
	 * @throws Exception
	 * @since  5.1.0
	 */
	#[NoReturn] public function stripewebhook(): void
	{
		$payload   = @file_get_contents('php://input');
		$signature = $_SERVER['HTTP_STRIPE_SIGNATURE'];
		$event     = null;

		$services = KrFactory::getListModel('services')->getServicesByPlugin('stripe');
		foreach ($services as $s) {
			$service = KrFactory::getAdminModel('service')->getItem($s->id);
			$secret  = $service->parameters->webhook_key;
			break;
		}

		try {
			$event = StripeWebhook::constructEvent($payload, $signature, $secret);
			if (isset($event->data->object->metadata)) {
				$metadata = $event->data->object->metadata;
				// Convert object to stdClass
				$metadata = json_decode(json_encode($metadata));
			}
		} catch (UnexpectedValueException $e) {
			// Invalid payload
			echo json_encode(['Error parsing payload: ' => $e->getMessage()]);
			http_response_code(401);
			jexit();
		} catch (SignatureVerificationException $e) {
			// Invalid signature
			echo json_encode(['Error verifying webhook signature: ' => $e->getMessage()]);
			http_response_code(402);
			jexit();
		}

		http_response_code(200);

		try {
			if ($event->type == 'setup_intent.succeeded') {
				$metadata->payment_ref = 'OBR';
				if (isset($event->data->object->payment_method)) {
					$metadata->service_ref = $event->data->object->payment_method;
				}
			} elseif ($event->type == 'payment_intent.succeeded') {
				if (isset($event->data->object->id)) {
					$metadata->payment_ref     = $event->data->object->id;
					$metadata->service_ref     = 'na';
					$metadata->on_request_paid = 1;
				}
			} elseif ($event->type == 'payment_intent.payment_failed' ||
			          $event->type == 'setup_intent.setup_failed') {
				if (isset($event->data->object->id)) {
					$metadata->on_request_paid = 0;
				}
			}
		} catch (UnexpectedValueException|Exception $e) {
			Logger::logMe($e->getMessage());
		}

		$this->stripeWebhookUpdate($event->type, $metadata);
	}

	/**
	 * Display generic / property terms
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function termspdf(): void
	{
		try {
			$id    = KrMethods::inputInt('id');
			$Terms = new Terms('download', $id);
			$Terms->getPdf();
		} catch (Exception) {
			throw new RuntimeException(
				'Error creating PDF, please try again later'
			);
		}

		jexit();
	}

	/**
	 * Process wire confirmation
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	public function wire(): void
	{
		$this->checkToken();
		$this->manual();
	}

	/**
	 * Process international wire confirmation
	 *
	 * @throws Exception
	 * @since  2.2.0
	 * @noinspection PhpUnused
	 */
	public function wireint(): void
	{
		$this->checkToken();
		$this->manual();
	}

	/**
	 * Get the service id for manual gateways
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	protected function getServiceId(): int
	{
		$service_id = KrMethods::inputInt('service_id');
		if (!$service_id) {
			throw new RuntimeException('Service ID was not received');
		}

		return $service_id;
	}

	/**
	 * Process manual gateways
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function manual(): void
	{
		$service_id     = $this->getServiceId();
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();
		$payment_type   = $paymentData->payment_type;
		$contract_id    = $paymentData->contract_id;

		try {
			$postPayment = new PostPayment($service_id, $paymentData);
			$postPayment->processPayment();
			$this->redirectSuccess($payment_type, $contract_id, true);
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'error');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'));
			$this->redirectError($payment_type);
		}
	}

	/**
	 * Process Redsys response
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	protected function processRedsys(): void
	{
		$action = KrMethods::inputString('action', '');
		if (!$action) {
			throw new RuntimeException('Action field is empty');
		}
		if ($action != 'ipn' && $action != 'success' && $action != 'cancel') {
			throw new RuntimeException('Action field is invalid ' . $action);
		}

		$parameters = KrMethods::inputString('Ds_MerchantParameters', '');
		$signature  = KrMethods::inputString('Ds_Signature', '');
		if (empty($parameters) || empty($signature)) {
			throw new RuntimeException(
				'Payment response fields not received from Redsys'
			);
		}

		$fields         = base64_decode(strtr($parameters, '-_', '+/'));
		$fields         = Utility::decodeJson($fields, true);
		$custom         = (string) $fields['Ds_MerchantData'];
		$split          = explode('-', $custom);
		$service_id     = isset($split[0]) ? (int) $split[0] : 0;
		$contract_id    = isset($split[1]) ? (int) $split[1] : 0;
		$payment_type   = $split[2] ?? '';
		$base_amount    = (float) $split[3];
		$rate           = (float) $split[4];
		$base_surcharge = (float) $split[5];

		if (!$service_id || !$contract_id || !$payment_type) {
			throw new RuntimeException(
				'Invalid Custom field returned in Success message' . $custom . ' for action ' . $action
			);
		}

		if ($action == 'ipn') {
			try {
				if (!$base_amount || !$rate) {
					throw new RuntimeException(
						"Redsys Base amount $base_amount or rate $rate or both are zero"
					);
				}

				$paymentSession                  = new KrSession\Payment();
				$paymentData                     = $paymentSession->getData();
				$paymentData->base_amount        = $base_amount;
				$paymentData->base_surcharge     = $base_surcharge;
				$paymentData->confirmed          = true;
				$paymentData->contract_id        = $contract_id;
				$paymentData->payment_date       = TickTock::getDate();
				$paymentData->payment_type       = $payment_type;
				$paymentData->manual             = 0;
				$paymentData->merchantParameters = $parameters;
				$paymentData->merchantSignature  = $signature;
				$paymentData->rate               = $rate;
				$paymentData->service_id         = $service_id;

				$Redsys      = new Gateway\Redsys($service_id, $paymentData);
				$paymentData = $Redsys->setResponseData();

				$postPayment = new PostPayment($service_id, $paymentData);
				$postPayment->processPayment();
			} catch (Exception $e) {
				Logger::logMe($e->getMessage());
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'));
				$this->redirectError($payment_type);
			}

			jexit();
		} else {
			if ($action == 'success') {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_SUCCESS'));
				$this->redirectSuccess($payment_type, $contract_id);
			} else {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_CANCEL'), 'alert');
				$this->redirectError($payment_type);
			}
		}
	}

	/**
	 * Set the redirect for errors
	 *
	 * @param  string  $payment_type  Payment type being processed
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function redirectError(string $payment_type): void
	{
		if ($payment_type === 'PBD' || $payment_type === 'PBB') {
			SiteHelper::redirectDashboard(true);
		} else if ($payment_type) {
			$Itemid = SiteHelper::getItemId('com_knowres', 'confirm');
			KrMethods::redirect(KrMethods::route(KrMethods::getBase() .
			                                     'index.php?option=com_knowres&view=confirm&Itemid=' .
			                                     $Itemid,
				false));
		} else {
			KrMethods::redirect(KrMethods::route(KrMethods::getBase(), false));
		}
	}

	/**
	 * Set the redirect for successful payments
	 *
	 * @param  string  $payment_type  Payment type
	 * @param  int     $contract_id   ID of contract
	 * @param  bool    $manual        True for manual payment (cheque, bank transfer etc)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function redirectSuccess(string $payment_type, int $contract_id, bool $manual = false): void
	{
		if ($payment_type === 'OBD' || $payment_type === 'OBR') {
			SiteHelper::redirectSuccess();
		} elseif ($payment_type === 'PBD' || $payment_type === 'PBB') {
			if ($manual) {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_MANUAL'), 'alert');
			} else {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_SUCCESS_POST'), 'alert');
			}
			SiteHelper::redirectDashboard();
		} else {
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot(), false));
		}
	}

	/**
	 * Test that secret is valid
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function checkSecret(): void
	{
		$this->test = $this->input->getInt('test', 0);
		$secret     = $this->input->getString('secret', '');

		if (!$this->test && $secret != KrMethods::getCfg('secret')) {
			jexit();
		}
	}

	/**
	 * Process mailchimp subscription
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	private function doMailchimp(): void
	{
		$this->checkToken();

		$service_id = KrMethods::inputInt('id');
		$name       = KrMethods::inputString('name', '');
		$email      = KrMethods::inputString('email', '');

		try {
			$Mailchimp = new Mailchimp($service_id, $email, $name);
		} catch (InvalidArgumentException $e) {
			echo new JsonResponse(null, $e->getMessage(), true);
			jexit();
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'error');
			echo new JsonResponse(
				null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_FAIL'), true
			);
			jexit();
		}

		try {
			$result = $Mailchimp->subscribe();
			if (is_bool($result) && $result) {
				echo new JsonResponse(
					null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_SUCCESS'),
					true
				);
				jexit();
			} else {
				throw new RuntimeException(
					'Mailchimp failed with error ' . $result
				);
			}
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());
			echo new JsonResponse(
				null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_FAIL'), true
			);
		}

		jexit();
	}

	/**
	 * Process PayPal payment response
	 * NOTE: JsonResponse does not work in this function keep as standard
	 *
	 * @throws Exception
	 * @since  5.1.0
	 */
	private function doPaypal(): void
	{
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();
		$payment_type   = $paymentData->payment_type;

		try {
			$json        = trim(file_get_contents("php://input"));
			$data        = Utility::decodeJson($json, true);
			$paymentData = $paymentSession->updateData($data);

			$postPayment = new PostPayment($paymentData->service_id, $paymentData);
			$postPayment->processPayment();

			if ($payment_type === 'OBD' || $payment_type === 'OBR') {
				$Itemid   = SiteHelper::getItemId('com_knowres', 'success');
				$redirect =
					KrMethods::route('index.php?option=com_knowres&task=success.success&Itemid=' . $Itemid, false);
			} elseif ($payment_type === 'PBD' || $payment_type === 'PBB') {
				$Itemid   = SiteHelper::getItemId('com_knowres', 'dashboard');
				$redirect =
					KrMethods::route('index.php?option=com_knowres&task=dashboard.success&Itemid=' . $Itemid, false);
			} else {
				KrMethods::redirect(KrMethods::route(KrMethods::getRoot(), false));
			}

			echo json_encode(['success' => KrMethods::route($redirect, false)]);
			jexit();
		} catch (Exception $e) {
			Logger::logMe($e->getMessage(), 'error');
			echo json_encode(['error' => KrMethods::plain('COM_KNOWRES_ERROR_FATAL')]);
			jexit();
		}
	}

	/**
	 * Process redsys response
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 */
	private function doRedsys(): void
	{
		$action = KrMethods::inputString('action', '');
		if (!$action) {
			throw new RuntimeException('Action field is empty');
		}
		if ($action != 'ipn' && $action != 'success' && $action != 'cancel') {
			throw new RuntimeException('Action field is invalid ' . $action);
		}

		$parameters = KrMethods::inputString('Ds_MerchantParameters', '');
		$signature  = KrMethods::inputString('Ds_Signature', '');
		if (empty($parameters) || empty($signature)) {
			throw new RuntimeException(
				'Payment response fields not received from Redsys'
			);
		}

		$fields         = base64_decode(strtr($parameters, '-_', '+/'));
		$fields         = Utility::decodeJson($fields, true);
		$custom         = (string) $fields['Ds_MerchantData'];
		$split          = explode('-', $custom);
		$service_id     = isset($split[0]) ? (int) $split[0] : 0;
		$contract_id    = isset($split[1]) ? (int) $split[1] : 0;
		$payment_type   = $split[2] ?? '';
		$base_amount    = (float) $split[3];
		$rate           = (float) $split[4];
		$base_surcharge = (float) $split[5];

		if (!$service_id || !$contract_id || !$payment_type) {
			throw new RuntimeException(
				'Invalid Custom field returned in Success message' . $custom . ' for action ' . $action
			);
		}

		if ($action == 'ipn') {
			try {
				if (!$base_amount || !$rate) {
					throw new RuntimeException(
						"Redsys Base amount $base_amount or rate $rate or both are zero"
					);
				}

				$paymentSession                  = new KrSession\Payment();
				$paymentData                     = $paymentSession->getData();
				$paymentData->base_amount        = $base_amount;
				$paymentData->base_surcharge     = $base_surcharge;
				$paymentData->confirmed          = true;
				$paymentData->contract_id        = $contract_id;
				$paymentData->payment_date       = TickTock::getDate();
				$paymentData->payment_type       = $payment_type;
				$paymentData->manual             = 0;
				$paymentData->merchantParameters = $parameters;
				$paymentData->merchantSignature  = $signature;
				$paymentData->rate               = $rate;
				$paymentData->service_id         = $service_id;

				$Redsys      = new Gateway\Redsys($service_id, $paymentData);
				$paymentData = $Redsys->setResponseData();

				$postPayment = new PostPayment($service_id, $paymentData);
				$postPayment->processPayment();
			} catch (Exception $e) {
				Logger::logMe($e->getMessage());
			}

			jexit();
		} else {
			if ($action == 'success') {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_SUCCESS'));
				$this->redirectSuccess($payment_type, $contract_id);
			} else {
				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_CANCEL'), 'alert');
				$this->redirectError($payment_type);
			}
		}
	}

	/**
	 * Action the RU LNM Handler for reservations
	 *
	 * @throws Exception
	 * @since  5.1.0
	 */
	private function doRuLnmHandler(): void
	{
		$this->checkSecret();

		if ($this->test) {
			$xmlstring = trim(file_get_contents('Z:\apps\ProjectKR\api\ru\test\staycation.xml'));
			$xml       = simplexml_load_string($xmlstring);
		} else {
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$this->errors[] = 'Rentals United LNM Handler (rulnmhandler)';

				$xmlstring      = file_get_contents('php://input');
				$this->errors[] = 'XML received from ru ' . $xmlstring;

				libxml_use_internal_errors(true);
				$xml = simplexml_load_string($xmlstring);
				if ($xml === false) {
					// Retry the xml load on encoded string
					$xmlstring = mb_convert_encoding(
						$xmlstring,
						'UTF-8',
						mb_detect_encoding(
							$xmlstring,
							'UTF-8, ISO-8859-1',
							true
						)
					);

					$xml = simplexml_load_string($xmlstring);

					if ($xml === false) {
						// Drastic measures
						libxml_clear_errors();
						libxml_use_internal_errors(true);
						$dom                      = new DOMDocument('1.0', 'UTF-8');
						$dom->strictErrorChecking = false;
						$dom->validateOnParse     = false;
						$dom->recover             = true;
						$dom->loadXML($xmlstring);
						$xml = simplexml_import_dom($dom);

						if ($xml === false) {
							// Just give up and speak to RU
							$errors[] = 'content encoding trying utf8_encode';
							$errors[] = 'encoded xml string ' . $xmlstring;
							foreach (libxml_get_errors() as $error) {
								$errors[] = $error->message;
							}

							throw new RuntimeException(
								'Bad data received from RU for LNM ' .
								Utility::encodeJson($errors)
							);
						}
					}
				}

				libxml_clear_errors();
				libxml_use_internal_errors();
			} else {
				foreach ($_SERVER as $key_name => $key_value) {
					$message[] = $key_name . ' = ' . $key_value;
				}

				throw new RuntimeException(
					'POST data not received from RU ' . Utility::encodeJson(
						$message
					)
				);
			}
		}

		$ru = new Bookings();
		$ru->doLNM($xmlstring, $xml);

		jexit();
	}

	/**
	 * Create payment intent (all payments except OBR)
	 *
	 * @param  stdClass  $paymentData  Session data for payments
	 *
	 * @throws Exception
	 * @since  5.1.0
	 * @return string
	 */
	private function stripePaymentIntents(stdClass $paymentData): string
	{
		$metadata                = Utility::setStripeMeta($paymentData);
		$metadata['expiry_date'] = !empty($paymentData->expiry_date) ? $paymentData->expiry_date : null;
		$metadata['manual']      = 0;
		$metadata['service_ref'] = '';
		$metadata['state']       = 1;

		$stripeClient = new StripeClient($paymentData->secret_key);
		$pi           = $stripeClient->paymentIntents->create(
			['amount'                    => Utility::setStripeAmount($paymentData->amount, $paymentData->currency),
			 'currency'                  => strtolower($paymentData->currency),
			 'automatic_payment_methods' => ['enabled' => true],
			 'metadata'                  => $metadata,
			]
		);

		return $pi->client_secret;
	}

	/**
	 * Create set up intent for OBR
	 *
	 * @param  stdClass  $paymentData  Session data for payments
	 *
	 * @throws ApiErrorException
	 * @since  5.1.0
	 * @return string
	 */
	private function stripeSetupIntents(stdClass $paymentData): string
	{
		$stripeClient = new StripeClient($paymentData->secret_key);

		$guestSession = new KrSession\Guest();
		$guestData    = $guestSession->getData();
		$customer     = $stripeClient->customers->create(
			['name'  => $guestData->firstname . ' ' . $guestData->surname,
			 'email' => $guestData->email,
			]
		);
		if (!$customer->id) {
			throw new RuntimeException('Stripe did not return a customer id');
		}

		$metadata                 = Utility::setStripeMeta($paymentData);
		$metadata['customer_ref'] = $customer->id;
		$metadata['expiry_date']  = !empty($paymentData->expiry_date) ? $paymentData->expiry_date : null;
		$metadata['manual']       = 0;
		$metadata['service_ref']  = 'tbd';
		$metadata['state']        = 0;

		$si = $stripeClient->setupIntents->create(
			['customer'                  => $customer->id,
			 'automatic_payment_methods' => ['enabled' => true],
			 'metadata'                  => $metadata,
			]);

		return $si->client_secret;
	}

	/**
	 * Process stripe webhook response
	 * metadata holds paymentData fields stored by Stripe
	 *
	 * @param  string    $event_type  Webhook event type
	 * @param  stdClass  $metadata    Stored metadata returned by stripe
	 *
	 * @throws Exception
	 * @since  5.1.0
	 */
	private function stripeWebhookUpdate(string $event_type, stdClass $metadata): void
	{
		$paymentSession = new KrSession\Payment();
		$paymentSession->resetData();
		$paymentData  = $paymentSession->updateData($metadata);
		$payment_type = $paymentData->payment_type;
		if ($paymentData->service_ref == 'na') {
			// Can't set an empty value in metadata so reset here
			$paymentData->service_ref = '';
		}

		switch ($event_type) {
			case 'payment_intent.succeeded':
			case 'setup_intent.succeeded':
				try {
					$postPayment = new PostPayment($paymentData->service_id, $paymentData, true);
					$postPayment->processPayment();
				} catch (Exception $e) {
					KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_CANCEL'), 'alert');
					$this->redirectError($payment_type);
				}
				break;
			case 'payment_intent.payment_failed':
			case 'setup_intent.setup_failed':
				$update                  = new stdClass();
				$update->id              = $paymentData->contract_id;
				$update->on_request_paid = $paymentData->on_request_paid;
				KrFactory::update('contract', $update);
				break;
			default:
				Logger::logMe('Received unknown webhook event type ' . $event_type);
		}
	}
}