<?php
/**
 * @package     Know Reservations
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Gateway;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\Response\JsonResponse;
use RuntimeException;
use stdClass;
use Stripe\Customer;
use Stripe\Exception\ApiConnectionException;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\AuthenticationException;
use Stripe\Exception\CardException;
use Stripe\Exception\InvalidRequestException;
use Stripe\PaymentIntent;
use Stripe\SetupIntent;
use Stripe\Stripe as StripeLib;

use function trim;

/**
 * Service gateway Stripe
 *
 * @since 1.0.0
 */
class Stripe extends Gateway
{
	/** @var string Current action. */
	protected string $action = '';
	/** @var array RBS exception for declined / authorization. */
	protected array $card_exception = [];
	/** @var string Current function for error handling. */
	protected string $function = '';
	/** @var bool Off session payment indicator. */
	protected bool $off_session = false;

	/**
	 * Initialize
	 *
	 * @param   int       $service_id   ID of service
	 * @param   stdClass  $paymentData  Session payment data
	 * @param   string    $action       Action from Stripe
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $service_id, stdClass $paymentData, string $action = '')
	{
		parent::__construct($service_id, $paymentData, false, ['OBD', 'OBR', 'RBD', 'PBD', 'PBB']);

		$this->action = $action;
	}

	/**
	 * Do processing for incoming post message that should
	 * have a stripe token
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  1.0.0
	 */
	public function processIncoming()
	{
		$this->readTables();
		if ($this->paymentData->payment_type === 'OBR')
		{
			$this->setPaymentOBR();
		}
		else if ($this->paymentData->payment_type === 'RBD')
		{
			$this->off_session = true;
			$this->setPaymentRBD();
		}
		else
		{
			$this->setPaymentOthers();
		}
	}

	//TODO-v4.1 Reinstate with correct stripe processing end email notifications
	//	/**
	//	 * Process channel booking balance (CBB) transaction
	//	 * Create customer and take payment
	//	 * Credit card info cannot be stored on server
	//	 *
	//	 * @throws Exception
	//	 * @since 2.3.0
	//	 * @return bool
	//	 */
	//	public function processCBB()
	//	{
	//		$this->function    = 'processCBB';
	//		$this->off_session = true;
	//
	//		if ($this->chargeCustomer())
	//		{
	//			$this->setPayment();
	//			$this->saveAll();
	//			$this->sendEmails();
	//		}
	//	}

	/**
	 * Set data for Stripe call
	 *
	 * @throws ApiErrorException
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function setOutputData(): stdClass
	{
		$this->readTables();
		$this->setOutputForPaymentType();

		$client_secret = false;
		if ($this->paymentData->payment_type === 'OBR')
		{
			StripeLib::setApiKey(trim($this->parameters->secret_key));
			if (trim($this->parameters->api_version))
			{
				StripeLib::setApiVersion(trim($this->parameters->api_version));
			}
			$intent        = SetupIntent::create([]);
			$client_secret = $intent->client_secret;
		}

		$this->paymentData->api_version     = trim($this->parameters->api_version);
		$this->paymentData->client_secret   = $client_secret;
		$this->paymentData->publishable_key = trim($this->parameters->publishable_key);
		$this->paymentData->secret_key      = trim($this->parameters->secret_key);

		return $this->paymentData;
	}

	/**
	 * Create Stripe customer for future use
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  2.4.0
	 */
	protected function createCustomer()
	{
		$this->function                  = 'createCustomer';
		$this->paymentData->customer_ref = '';

		$params = [
			'payment_method' => $this->paymentData->payment_setup_id,
			'description'    => $this->guest->email
		];

		$response = $this->doStripe($params, 'customer');
		if (!isset($response->id) || !$response->id)
		{
			throw new RuntimeException('Stripe did not return a customer reference');
		}

		$this->paymentData->customer_ref = $response->id;
	}

	/**
	 * Do the Stripe call
	 *
	 * @param   array   $params  Stripe parameters
	 * @param   string  $method  Stripe method
	 *
	 * @throws Exception|ApiErrorException
	 * @since  2.3.0
	 * @return object|bool
	 */
	protected function doStripe(array $params, string $method): object|bool
	{
		if (!count($params) || !$method)
		{
			throw new InvalidArgumentException('Params or method is missing');
		}

		$this->setOutputData();
		StripeLib::setApiKey(trim($this->parameters->secret_key));
		if (trim($this->parameters->api_version))
		{
			StripeLib::setApiVersion(trim($this->parameters->api_version));
		}

		try
		{
			if ($method === 'customer')
			{
				return Customer::create($params);
			}
			else if ($method === 'paymentmethod')
			{
				return $this->generatePaymentResponse(PaymentIntent::create($params));
			}
			else if ($method === 'paymentintent')
			{
				$response = PaymentIntent::retrieve($params['payment_intent_id']);
				$response->confirm();

				return $this->generatePaymentResponse($response);
			}
		}
		catch (CardException $e)
		{
			if (!$this->off_session)
			{
				$this->error_to_display = KrMethods::plain('COM_KNOWRES_ERROR_DECLINED');
				$this->writeErrors($e);
			}
			else
			{
				$this->card_exception = $e->getJsonBody();
				$this->messages       = [];

				return false;
			}
		}
		catch (InvalidRequestException $e)
		{
			$this->writeErrors($e, 'Invalid parameters supplied to Stripe API');
		}
		catch (AuthenticationException $e)
		{
			$this->writeErrors($e, 'Authentication with Stripe API failed');
		}
		catch (ApiConnectionException $e)
		{
			$this->writeErrors($e, 'Network communication with Stripe failed');
		}
		catch (ApiErrorException $e)
		{
			$this->writeErrors($e, 'Base error');
		}
		catch (Exception $e)
		{
			$this->writeErrors($e, 'Other exception');
		}
		finally
		{
			if (is_countable($this->messages) && count($this->messages))
			{
				throw new Exception(Utility::encodeJson($this->messages));
			}
		}
	}

	/**
	 * Process response from payment intent
	 *
	 * @param   object  $response  Response from request
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return object|bool
	 */
	protected function generatePaymentResponse(object $response): object|bool
	{
		if (!$this->off_session)
		{
			if ($response->status == 'requires_action' && $response->next_action->type == 'use_stripe_sdk')
			{
				echo Utility::encodeJson([
					'requires_action'              => true,
					'payment_intent_client_secret' => $response->client_secret
				]);

				jexit();
			}
			else if ($response->status === 'succeeded')
			{
				return $response;
			}
			else
			{
				http_response_code(500);
				echo Utility::encodeJson(['error' => KrMethods::plain('COM_KNOWRES_ERROR_FATAL')]);

				jexit();
			}
		}
		else
		{
			if ($response->status === 'succeeded')
			{
				return $response;
			}
		}
	}

	//	/**
	//	 * Set up values for a channel balance payment
	//	 * No gateways must be Stripe
	//	 *
	//	 * @throws RuntimeException
	//	 * @throws Exception
	//	 * @throws Exception
	//	 * @since 1.0.0
	//	 */
	//	protected function outputChannelBalance()
	//	{
	//		TODO-v4.1 Automatic balance payments with notification emails etc,
	//		TODO-v4.1 Move all of this to the calling routine
	//		$this->readGuest();
	//		if (!$this->guest->customer_ref)
	//		{
	//			$this->errors[] = "Stripe token missing for guest";
	//
	//			return false;
	//		}
	//
	//		$this->readContract();
	//		$amount = KrFactory::getListModel('contracts')->getCurrentBalance($this->contract_id);
	//		if (!$amount || !$this->contract->currency)
	//		{
	//			$this->errors[] = "Balance amount or payment currency missing for balance payment";
	//
	//			return false;
	//		}
	//
	//		$this->paymentData->amount = $amount;
	//		$this->paymentData->currency = $this->contract->currency;
	//		$this->paymentData->base_amount    = $tamount;
	//		$this->paymentData->rate           = 1;
	//		$this->paymentData->base_surcharge = 0;
	//		$this->paymentData->customer_ref   = $this->guest->customer_ref;
	//
	//		$type = KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE_OF');
	//		$this->paymentData->description = KrMethods::sprintf('COM_KNOWRES_SERVICE_DESCRIPTION', $type,
	//			Utility::displayValue($amount, $this->contract->currency), $this->contract->property_name,
	//			TickTock::displayDate($this->contract->arrival), TickTock::displayDate($this->contract->departure));
	//
	//		return true;
	//	}

	/**
	 * Payment attempt retry
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  3.3.0
	 */
	protected function paymentIntent()
	{
		$this->function = 'paymentIntent';
		$params         = ['payment_intent_id' => $this->paymentData->payment_intent_id];
		$response       = $this->doStripe($params, 'paymentintent');
		if (!$response)
		{
			throw new RuntimeException('Stripe did not return a Payment Intent response');
		}

		$this->paymentData->payment_ref = $response->id;
	}

	/**
	 * Attempt to charge customer
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  3.3.0
	 */
	protected function paymentMethod()
	{
		$this->function = 'paymentMethod';

		$params = [
			'payment_method'       => $this->paymentData->payment_method_id,
			'amount'               => $this->paymentData->amount * 100,
			'currency'             => $this->paymentData->currency,
			'confirmation_method'  => 'manual',
			'confirm'              => true,
			'description'          => $this->paymentData->note,
			'receipt_email'        => $this->guest->email,
			'metadata'             => [
				'email'       => $this->guest->email,
				'ip_address'  => $_SERVER['REMOTE_ADDR'],
				'reservation' => $this->contract->tag
			],
			'statement_descriptor' => KrMethods::getCfg('sitename')
		];

		$response = $this->doStripe($params, 'paymentmethod');
		if (!isset($response->id) || !$response->id)
		{
			throw new RuntimeException('No response from Stripe');
		}

		$this->paymentData->payment_ref = $response->id;
	}

	/**
	 * Set payment data for output payment types
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 */
	protected function setOutputForPaymentType()
	{
		if ($this->paymentData->payment_type == 'RBD')
		{
			$this->setPaymentDataRBD();
		}
		else if ($this->paymentData->payment_type == 'CBB')
		{
			//TODO-v4.1 do this properly with emails etc and add to valid payment types above
			//return $this->outputChannelBalance();
			throw new RuntimeException('Payment type CBB not currently implemented');
		}
		else
		{
			$this->setPaymentData();
		}
	}

	/**
	 * Set up values for a request deposit payment
	 * No gateways displayed as Stripe already selected at booking
	 * and stored in an unpublished payment record
	 *
	 * @throws Exception
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	protected function setPaymentDataRBD()
	{
		$this->paymentData->amount         = $this->payment->amount;
		$this->paymentData->base_amount    = $this->payment->base_amount;
		$this->paymentData->base_surcharge = KrFactory::getListModel('contractfees')
		                                              ->getTotalForContract($this->contract_id);
		$this->paymentData->currency       = $this->payment->currency;
		$this->paymentData->payment_date   = TickTock::getDate();
		$this->paymentData->rate           = $this->payment->rate;
		$this->paymentData->service_ref    = $this->payment->service_ref;

		if (!$this->paymentData->base_amount || !$this->paymentData->amount || !$this->paymentData->currency)
		{
			throw new RuntimeException('Amounts missing for PrePayment');
		}

		$this->setNote();
	}

	/**
	 * Process OBR transaction, create customer on stripe
	 * store customer id and update contract
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  1.0.0
	 */
	protected function setPaymentOBR()
	{
		$this->function = 'setPaymentOBR';

		$this->createCustomer();
		$this->paymentData->service_ref = $this->paymentData->payment_setup_id;
		$this->paymentData->state       = 0;
	}

	/**
	 * Process standard online deposit or payment
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  1.0.0
	 */
	protected function setPaymentOthers()
	{
		$this->function = 'setPaymentOthers';

		if ($this->action == 'payment_method_id')
		{
			$this->paymentMethod();
		}
		else if ($this->action == 'payment_intent_id')
		{
			$this->paymentIntent();
		}
	}

	/**
	 * Process RBD transaction using data saved from OBR
	 *
	 * @throws Exception
	 * @throws ApiErrorException
	 * @since  1.0.0
	 */
	protected function setPaymentRBD()
	{
		$this->function = 'setPaymentRBD';

		$params = [
			'amount'               => (int) $this->paymentData->amount * 100,
			'confirm'              => true,
			'currency'             => $this->paymentData->currency,
			'customer'             => $this->guest->customer_ref,
			'description'          => $this->paymentData->note,
			'off_session'          => true,
			'payment_method'       => $this->paymentData->service_ref,
			'payment_method_types' => ['card'],
			'receipt_email'        => $this->guest->email,
			'metadata'             => [
				'email'       => $this->guest->email,
				'reservation' => $this->contract->tag
			],
			'statement_descriptor' => KrMethods::getCfg('sitename')
		];

		$response = $this->doStripe($params, 'paymentmethod');
		if ($response)
		{
			$this->paymentData->payment_ref  = $response->id;
			$this->paymentData->payment_date = TickTock::getDate();
			$this->paymentData->service_ref  = '';
			$this->paymentData->confirmed    = 1;
			$this->paymentData->state        = 1;
		}
		else
		{
			$this->setPaymentRBDFailure();

			$email = new ContractEmail('BOOKAUTHENTICATE');
			$email->sendTheEmails($this->contract_id, (float) $this->paymentData->amount, $this->paymentData->currency,
				$this->service_id);

			if ($this->card_exception['error']['decline_code'] == 'authentication_required')
			{
				$message[] = 'Payment authentication required';
			}
			else
			{
				$message[] = 'Payment was declined';
			}

			$message[] = 'Authentication email requesting online payment sent to guest';
			$message[] = 'Reservation status updated to New Resevation Option';
			$message[] = 'Please update expiry date manually if required';

			echo new JsonResponse(null, implode("\r\n", $message), true, true);
			jexit();
		}
	}

	/**
	 * Update database for failed payments
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setPaymentRBDFailure()
	{
		$update                 = new stdClass();
		$update->id             = $this->contract_id;
		$update->on_request     = 0;
		$update->state          = 1;
		$update->booking_status = 1;
		$update->updated_at     = TickTock::getTS();
		KrFactory::update('contract', $update);
	}

	/**
	 * Add exception errors to $this->messages
	 *
	 * @param   object  $e        Exception
	 * @param   mixed   $message  Error message
	 *
	 * @since 1.0.0
	 */
	protected function writeErrors(object $e, mixed $message = null)
	{
		$this->messages[] = 'Stripe call failed see error details below';
		$this->messages[] = $e->getMessage();

		if (!is_null($message))
		{
			$this->messages[] = $message;
		}

		if ($this->function)
		{
			$this->messages[] = 'Found in ' . $this->function;
		}

		$body = $e->getJsonBody();
		$err  = $body['error'];

		$this->messages[] = 'Http status ' . $e->getHttpStatus();

		if (isset($err['type']))
		{
			$this->messages[] = 'Type:' . $err['type'];
		}
		if (isset($err['code']))
		{
			$this->messages[] = 'Code:' . $err['code'];
		}
		if (isset($err['param']))
		{
			$this->messages[] = 'Param:' . $err['param'];
		}
		if (isset($err['message']))
		{
			$this->messages[] = 'Message:' . $err['message'];
		}
	}
}