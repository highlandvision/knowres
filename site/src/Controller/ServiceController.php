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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Pdf\Property\Terms;
use HighlandVision\KR\Payments\PostPayment;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\Service\Mailchimp;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use HighlandVision\Ru\Manager\Bookings;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\Session\Session;
use RuntimeException;

use function file_get_contents;
use function is_bool;
use function jexit;
use function json_encode;
use function simplexml_load_string;
use function trim;

/**
 * Service controller
 *
 * @since   1.0.0
 */
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
	public function bankia()
	{
		$this->processRedsys();
	}

	/**
	 * Process check confirmation
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function check()
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$this->manual();
	}

	/**
	 * Helpscout custom sidebar app
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.2.0
	 */
	#[NoReturn] public function hsdynamic()
	{
		$hs = new Helpdesk\Dynamic();
		echo $hs->getDynamicResponse();

		jexit();
	}

	/**
	 * Process mailchimp subscriptions
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	public function mailchimpsubscribe()
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$service_id = KrMethods::inputInt('id');
		$name       = KrMethods::inputString('name', '');
		$email      = KrMethods::inputString('email', '');

		try
		{
			$Mailchimp = new Mailchimp($service_id, $email, $name);
		}
		catch (InvalidArgumentException $e)
		{
			echo new JsonResponse(null, $e->getMessage(), true);
			jexit();
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_FAIL'), true);
			jexit();
		}

		try
		{
			$result = $Mailchimp->subscribe();
			if (is_bool($result) && $result)
			{
				echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_SUCCESS'), true);
				jexit();
			}
			else
			{
				throw new RuntimeException('Mailchimp failed with error ' . $result);
			}
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_MAILCHIMP_FAIL'), true);
		}

		jexit();
	}

	/**
	 * PayPal SCA process response
	 * NOTE: JsonResponse does not work in this function keep as standard
	 *
	 * @since  1.2.2
	 */
	public function paypal()
	{
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();
		$payment_type   = $paymentData->payment_type;

		try
		{
			$json        = trim(file_get_contents("php://input"));
			$data        = Utility::decodeJson($json, true);
			$paymentData = $paymentSession->updateData($data);

			$postPayment = new PostPayment($paymentData->service_id, $paymentData);
			$postPayment->processPayment();

			if ($payment_type == 'PBD' || $payment_type == 'PBB')
			{
				$Itemid   = SiteHelper::getItemId('com_knowres', 'dashboard');
				$redirect = KrMethods::route('index.php?option=com_knowres&task=dashboard.success&Itemid=' . $Itemid,
					false);
			}
			else
			{
				$Itemid   = SiteHelper::getItemId('com_knowres', 'success');
				$redirect = KrMethods::route('index.php?option=com_knowres&view=success&Itemid=' . $Itemid, false);
			}

			echo json_encode(['success' => KrMethods::route($redirect, false)]);
			jexit();
		}
		catch (Exception)
		{
			echo json_encode(['error' => KrMethods::plain('COM_KNOWRES_ERROR_FATAL')]);
			jexit();
		}
	}

	/**
	 * Redsys gateway
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	public function redsys()
	{
		$this->processRedsys();
	}

	/**
	 * Process LNM post from RU
	 *
	 * @throws Exception
	 * @since        2.2.0
	 * @noinspection PhpUnused
	 */
	public function rulnmhandler()
	{
		$this->checkSecret();

		if ($this->test)
		{
			$xmlstring = $this->zzTestLNM();
			$xml       = simplexml_load_string($xmlstring);
		}
		else if ($_SERVER['REQUEST_METHOD'] === 'POST')
		{
			$this->errors[] = 'Rentals United LNM Handler (rulnmhandler)';

			$xmlstring      = file_get_contents('php://input');
			$this->errors[] = 'XML received from ru ' . $xmlstring;

			libxml_use_internal_errors(true);
			$xml = simplexml_load_string($xmlstring);
			if ($xml === false)
			{
				// Retry the xml load on encoded string
				$xmlstring = mb_convert_encoding($xmlstring, 'UTF-8',
					mb_detect_encoding($xmlstring, 'UTF-8, ISO-8859-1', true));

				$xml = simplexml_load_string($xmlstring);

				if ($xml === false)
				{
					// Drastic measures
					libxml_clear_errors();
					libxml_use_internal_errors(true);
					$dom                      = new DOMDocument('1.0', 'UTF-8');
					$dom->strictErrorChecking = false;
					$dom->validateOnParse     = false;
					$dom->recover             = true;
					$dom->loadXML($xmlstring);
					$xml = simplexml_import_dom($dom);

					if ($xml === false)
					{
						// Just give up and speak to RU
						$errors[] = 'content encoding trying utf8_encode';
						$errors[] = 'encoded xml string ' . $xmlstring;
						foreach (libxml_get_errors() as $error)
						{
							$errors[] = $error->message;
						}

						throw new RuntimeException('Bad data received from RU for LNM '
							. Utility::encodeJson($errors));
					}
				}
			}

			libxml_clear_errors();
			libxml_use_internal_errors();
		}
		else
		{
			foreach ($_SERVER as $key_name => $key_value)
			{
				$message[] = $key_name . ' = ' . $key_value;
			}

			throw new RuntimeException('POST data not received from RU ' . Utility::encodeJson($message));
		}

		$ru = new Bookings();
		$ru->doLNM($xmlstring, $xml);

		jexit();
	}

	/**
	 * Stripe SCA process response
	 * NOTE: JsonResponse does not work in this function keep as standard
	 *
	 * @throws Exception
	 * @since  1.2.2
	 */
	public function stripe()
	{
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();
		$payment_type   = $paymentData->payment_type;

		try
		{
			$json        = trim(file_get_contents("php://input"));
			$data        = Utility::decodeJson($json, true);
			$paymentData = $paymentSession->updateData($data);

			$action = '';
			if (isset($data['payment_method_id']))
			{
				$action = 'payment_method_id';
			}
			else if (isset($data['payment_intent_id']))
			{
				$action = 'payment_intent_id';
			}
			else if (isset($data['payment_setup_id']))
			{
				$action = 'payment_setup_id';
			}
			if (empty($action))
			{
				$stripe = false;
				throw new RuntimeException('Stripe did not return a payment action');
			}

			$stripe = new Gateway\Stripe($paymentData->service_id, $paymentData, $action);
			$stripe->processIncoming();
			if (empty($paymentData->payment_ref) && $action != 'payment_setup_id')
			{
				$stripe = false;
				throw new RuntimeException('Stripe did not return a payment reference');
			}

			$postPayment = new PostPayment($paymentData->service_id, $paymentData);
			$postPayment->processPayment();

			if ($payment_type == 'PBD' || $payment_type == 'PBB')
			{
				$Itemid   = SiteHelper::getItemId('com_knowres', 'dashboard');
				$redirect = KrMethods::route('index.php?option=com_knowres&task=dashboard.success&Itemid=' . $Itemid,
					false);
			}
			else
			{
				$Itemid   = SiteHelper::getItemId('com_knowres', 'success');
				$redirect = KrMethods::route('index.php?option=com_knowres&view=success&Itemid=' . $Itemid, false);
			}

			echo json_encode(['success' => $redirect]);
			jexit();
		}
		catch (Exception $e)
		{
			if (!empty($stripe))
			{
				echo json_encode(['error' => $stripe->getErrorToDisplay()]);
			}
			else
			{
				Logger::logMe($e->getMessage(), 'error');
				echo json_encode(['error' => KrMethods::plain('COM_KNOWRES_ERROR_FATAL_EXCHANGE')]);
			}

			jexit();
		}
	}

	/**
	 * Display generic / property terms
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since        3.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function termspdf()
	{
		try
		{
			$id    = KrMethods::inputInt('id', 0, 'get');
			$Terms = new Terms('download', $id);
			$Terms->getPdf();
		}
		catch (Exception)
		{
			throw new RuntimeException('Error creating PDF, please try again later');
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
	public function wire()
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$this->manual();
	}

	//	/**
	//	 * Send all properties to channel
	//	 *
	//	 * @since 3.1.0
	//	 */
	//	public function sendallproperties()
	//	{
	//		$service_id = $this->input->get->getInt('id', 0);
	//		if (!$service_id)
	//		{
	//			jexit('Please add id=x to your request');
	//		}
	//
	//		$modelServicexrefs = $this->getModel('servicexrefs');
	//		$properties        = $modelServicexrefs->getPropertiesForService($service_id);
	//
	//		foreach ($properties as $p)
	//		{
	//			// Get all the channels for property or all properties
	//			// excluding any current unactioned queue record
	//			$result = KrFactory::getListModel('Servicexrefs')->getPropertiesForAllServices($p->property_id, 'updateProperty');
	//			if (is_countable($result) && count($result))
	//			{
	//				$db = Factory::getDatabase();
	//
	//				foreach ($result as $r)
	//				{
	//					$queue               = new stdClass();
	//					$queue->id           = 0;
	//					$queue->service_id   = $service_id;
	//					$queue->contract_id  = 0;
	//					$queue->agent_id     = 0;
	//					$queue->property_id  = $r->property_id;
	//					$queue->arrival      = '';
	//					$queue->departure    = '';
	//					$queue->availability = 0;
	//					$queue->actioned     = 0;
	//					$queue->method       = 'updateProperty';
	//					$queue->foreign_key  = $r->foreign_key;
	//					$queue->state        = 1;
	//					$queue->created_at   = TickTock::getTS();
	//					$queue->created_by   = Factory::getUser()->id;
	//
	//					$db->insertObject('#__knowres_service_queue', $queue);
	//				}
	//			}
	//		}
	//	}

	/**
	 * Process international wire confirmation
	 *
	 * @throws Exception
	 * @since        2.2.0
	 * @noinspection PhpUnused
	 */
	public function wireint()
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$this->manual();
	}

	/**
	 * Get contract ID
	 *
	 * @param  object  $session  Payment session data
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return int
	 */
	protected function getContractId(object $session): int
	{
		$contract_id = $session->contract_id;
		if (!$contract_id)
		{
			throw new RuntimeException('Contract ID was not set in session');
		}

		return $contract_id;
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
		$service_id = KrMethods::inputInt('service_id', 0, 'get');
		if (!$service_id)
		{
			throw new RuntimeException('Service ID was not received via POST');
		}

		return $service_id;
	}

	/**
	 * Process manual gateways
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function manual()
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$service_id     = $this->getServiceId();
		$paymentSession = new KrSession\Payment();
		$paymentData    = $paymentSession->getData();
		$payment_type   = $paymentData->payment_type;
		$contract_id    = $paymentData->contract_id;

		try
		{
			$postPayment = new PostPayment($service_id, $paymentData);
			$postPayment->processPayment();

			KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_MANUAL'));
			$this->redirectSuccess($payment_type, $contract_id);
		}
		catch (Exception)
		{
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
	protected function processRedsys()
	{
		$action = $this->input->getString('action', '');
		if (!$action)
		{
			throw new RuntimeException('Action field is empty');
		}

		if ($action != 'ipn' && $action != 'success' && $action != 'cancel')
		{
			throw new RuntimeException('Action field is invalid ' . $action);
		}

		$signature    = $this->input->getString('Ds_Signature', '');
		$parameters   = $this->input->getString('Ds_MerchantParameters', '');
		$fields       = base64_decode(strtr($parameters, '-_', '+/'));
		$fields       = Utility::decodeJson($fields, true);
		$custom       = (string) $fields['Ds_MerchantData'];
		$split        = explode('-', $custom);
		$service_id   = isset($split[0]) ? (int) $split[0] : 0;
		$contract_id  = isset($split[1]) ? (int) $split[1] : 0;
		$payment_type = $split[2] ?? '';

		if ($action === 'ipn')
		{
			if (!$service_id || !$contract_id || !$payment_type)
			{
				throw new RuntimeException('Invalid Custom field returned in IPN message' . $custom . ' for action '
					. $action);
			}

			$paymentSession                  = new KrSession\Payment();
			$paymentData                     = $paymentSession->getData();
			$paymentData->service_id         = $service_id;
			$paymentData->contract_id        = $contract_id;
			$paymentData->payment_type       = $payment_type;
			$paymentData->merchantParameters = $parameters;
			$paymentData->merchantSignature  = $signature;

			try
			{
				$redsys = new Gateway\Redsys($service_id, $paymentData);
				$redsys->setResponseData();

				$postPayment = new PostPayment($service_id, $paymentData);
				$postPayment->processPayment();

				KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_MANUAL'));
				$this->redirectSuccess($payment_type, $contract_id);
			}
			catch (Exception)
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'));
				$this->redirectError($payment_type);
			}
		}
		else if ($action == 'success')
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_SUCCESS'));
			$this->redirectSuccess($payment_type, $contract_id);
		}
		else
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_CANCEL'));
			$this->redirectError($payment_type);
		}
	}

	/**
	 * Set the redirect for errors
	 *
	 * @param  string  $payment_type  Payment type being processed
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function redirectError(string $payment_type)
	{
		if ($payment_type == 'OBD')
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'confirm', ['layout' => 'payment']);
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=confirm.payment&Itemid=' . $Itemid,
				false));
		}
		else if ($payment_type == 'PBD' || $payment_type == 'PBB')
		{
			SiteHelper::redirectDashboard();
		}
		else
		{
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot(), false));
		}
	}

	/**
	 * Set the redirect for successful payments
	 *
	 * @param  string  $payment_type  Payment type
	 * @param  int     $contract_id   ID of contract
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function redirectSuccess(string $payment_type, int $contract_id)
	{
		if ($payment_type === 'OBD' || $payment_type === 'OBR')
		{
			$userSession              = new KrSession\User();
			$userData                 = $userSession->getData();
			$userData->pr_contract_id = $contract_id;
			$userSession->setData($userData);

			$Itemid = SiteHelper::getItemId('com_knowres', 'success');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=success&Itemid=' . $Itemid, false));
		}
		else if ($payment_type === 'PBD' || $payment_type === 'PBB')
		{
			SiteHelper::redirectDashboard();
		}
		else
		{
			KrMethods::redirect(KrMethods::route(KrMethods::getRoot(), false));
		}
	}

	/**
	 * Generate test LNM string
	 *
	 * @since  1.0.0
	 * @return string
	 */
	protected function zzTestLNM(): string
	{
		return
			'<LNM_PutConfirmedReservation_RQ>
	<Authentication>
		<UserName>hazel@highlandvision.com</UserName>
		<Password>84859939FDC9C768AEB85DB430513BF6B88CD8A3</Password>
	</Authentication>
	<Reservation Currency="">
		<ReservationID>149329799</ReservationID>
		<CreatedDate>2023-01-09</CreatedDate>
		<LastMod>2023-01-09 01:00:21</LastMod>
		<StayInfos>
			<StayInfo>
				<PropertyID>253204</PropertyID>
				<DateFrom>2023-06-06</DateFrom>
				<DateTo>2023-06-09</DateTo>
				<NumberOfGuests>4</NumberOfGuests>
				<Costs>
					<RUPrice>646.03</RUPrice>
					<ClientPrice>760.03</ClientPrice>
					<AlreadyPaid>760.03</AlreadyPaid>
					<PriceScale>0%</PriceScale>
				</Costs>
				<ResapaID>165417209</ResapaID>
				<Units>1</Units>
				<ReservationBreakdown>
					<RUBreakdown>
						<DayPrices Date="2023-02-14">
							<Rent>168.68</Rent>
							<Price>168.68</Price>
						</DayPrices>
						<DayPrices Date="2023-02-15">
							<Rent>168.68</Rent>
							<Price>168.68</Price>
						</DayPrices>
						<DayPrices Date="2023-02-16">
							<Rent>168.67</Rent>
							<Price>168.67</Price>
						</DayPrices>
						<TotalFeesTaxes>
							<TotalFeeTax AlreadyIncluded="false" Amount="140" Name="CleaningFee" FeeTaxType="41"/>
						</TotalFeesTaxes>
						<Total>646.03</Total>
						<Rent>506.03</Rent>
					</RUBreakdown>
				</ReservationBreakdown>
			</StayInfo>
		</StayInfos>
		<CustomerInfo>
			<Name>Baldy</Name>
			<SurName>Bain</SurName>
			<Email>info@highlandgigs.co.uk</Email>
			<Phone>08001234</Phone>
			<SkypeID/>
			<Address/>
			<ZipCode/>
			<CountryID>20</CountryID>
			<MessagingContactId>9876543</MessagingContactId>
		</CustomerInfo>
		<Creator>test@test.com</Creator>
		<ReservationStatusID>1</ReservationStatusID>
		<ReferenceID>X3GWB0NO</ReferenceID>
		<IsArchived>false</IsArchived>
		<Comments>These are my comments</Comments>
	</Reservation>
</LNM_PutConfirmedReservation_RQ>';
	}

	/**
	 * Test that secret is valid
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function checkSecret()
	{
		$this->test = $this->input->getInt('test', 0);
		$secret     = $this->input->getString('secret', '');

		if (!$this->test && $secret != KrMethods::getCfg('secret'))
		{
			jexit();
		}
	}
}