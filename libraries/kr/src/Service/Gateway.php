<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

use function in_array;
use function nl2br;

/**
 * Service gateways to process payments for
 * OBD - Online booking deposit
 * OBR - Online booking request
 * PBD = Post booking deposit from manager booking
 * PBB = Post booking balance
 * RBD = Post booking deposit from request booking
 * CBB = Channel booking balance
 *
 * @since 1.0.0
 */
class Gateway extends Service
{
	/** @var false|object Contractpayment item */
	protected false|object $payment;
	/** @var stdClass Payment session data */
	protected stdClass $paymentData;

	/**
	 * Initialize
	 *
	 * @param  int       $service_id     ID of service
	 * @param  stdClass  $paymentData    Session payment data
	 * @param  bool      $manual         True for manual gateway
	 * @param  array     $payment_types  Valid payment types
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $service_id, stdClass $paymentData, bool $manual = false,
		array $payment_types = ['OBD', 'PBD', 'PBB'])
	{
		parent::__construct($service_id);

		$this->validatePaymentType($paymentData, $payment_types);
		$this->setContractId($paymentData->contract_id);

		$this->paymentData         = $paymentData;
		$this->paymentData->manual = $manual;
	}

	/**
	 * Set gateway class for payment
	 *
	 * @param  string  $gateway_name  Name of selected gateway
	 *
	 * @since  3.3.1
	 * @return string
	 */
	public static function setGatewayClass(string $gateway_name): string
	{
		if ($gateway_name == 'bankia') {
			$class = '\\HighlandVision\\KR\\Service\\Gateway\\Redsys\\' . ucfirst($gateway_name);
		}
		else if ($gateway_name == 'wireint') {
			$class = '\\HighlandVision\\KR\\Service\\Gateway\\Wire\\' . ucfirst($gateway_name);
		}
		else {
			$class = '\\HighlandVision\\KR\\Service\\Gateway\\' . ucfirst($gateway_name);
		}

		return $class;
	}

	/**
	 * Read Payment for RBD
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	protected function readPayment()
	{
		$this->payment = KrFactory::getListModel('contractpayments')->getPending($this->contract_id, $this->service_id);
		if (!$this->payment->id) {
			throw new RuntimeException('Payment not found for id ' . $this->contract_id);
		}
	}

	/**
	 * Read database for required tables
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function readTables()
	{
		$this->readContract();
		$this->readGuest();
		if ($this->paymentData->payment_type == 'RBD') {
			$this->readPayment();
		}
	}

	/**
	 * Set the text for the payment note
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setNote()
	{
		if ($this->paymentData->manual) {
			$this->paymentData->note =
				KrMethods::sprintf('COM_KNOWRES_PAYMENT_NOTE', $this->service->name,
				                   Utility::displayValue($this->paymentData->amount, $this->paymentData->currency),
				                   TickTock::displayDate($this->paymentData->due_date, 'D j M Y'));
		}
		else {
			if ($this->paymentData->payment_type == 'PBB') {
				$type = KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE_PAYMENT');
			}
			else {
				if ($this->contract->deposit != $this->contract->contract_total) {
					$type = KrMethods::plain('COM_KNOWRES_DEPOSIT');
				}
				else {
					$type = KrMethods::plain('COM_KNOWRES_FULL_PAYMENT');
				}
			}

			$this->paymentData->note =
				KrMethods::sprintf('COM_KNOWRES_PAYMENT_DESCRIPTION', $type,
				                   Utility::displayValue($this->paymentData->amount, $this->paymentData->currency),
				                   $this->contract->property_name, TickTock::displayDate($this->contract->arrival),
				                   TickTock::displayDate($this->contract->departure));
		}
	}

	/**
	 * Set payment data for output payment types
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 */
	protected function setOutputForPaymentType()
	{
		$this->setPaymentData();
	}

	/**
	 * Manual gateway set due date and expiry date
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function setOutputManualDates()
	{
		$this->paymentData->expiry_date = $this->contract->expiry_date;
		if ($this->paymentData->payment_type == 'OBD' || $this->paymentData->payment_type == 'PBD') {
			$weekenddays = KrFactory::getListModel('propertysettings')->getOneSetting('weekenddays');
			if (isset($this->parameters->expirydays) && (int) $this->parameters->expirydays > 0) {
				$wedays = $weekenddays[0];
				if (isset($weekenddays[$this->contract->property_id])) {
					$wedays = $weekenddays[$this->contract->property_id];
				}

				$this->paymentData->expiry_date = TickTock::getDueDate($wedays, $this->parameters->expirydays);
				$this->paymentData->due_date    = $this->paymentData->expiry_date;
			}
		}
		else {
			$this->paymentData->due_date = $this->contract->balance_date;
		}
	}

	/**
	 * Set pre payment gateway data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function setPaymentData()
	{
		$gateways = $this->paymentData->gateways;
		$gateway  = $gateways[$this->service_id];

		if (!$gateway->base_amount || !$gateway->amount || !$gateway->currency) {
			throw new RuntimeException('Amounts not set for Payment');
		}

		$this->paymentData->amount              = $gateway->amount;
		$this->paymentData->base_amount         = $gateway->base_amount;
		$this->paymentData->base_surcharge      = $gateway->base_surcharge;
		$this->paymentData->currency            = $gateway->currency;
		$this->paymentData->gateway_description = nl2br($this->parameters->description);
		$this->paymentData->gateway_name        = $this->service->name;
		$this->paymentData->payment_date        = TickTock::getDate();
		$this->paymentData->rate                = $gateway->rate;
		$this->paymentData->service_id          = $this->service_id;
		$this->paymentData->confirmed           = $this->paymentData->manual ? 0 : 1;

		$this->setNote();
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
		$this->paymentData->base_surcharge =
			KrFactory::getListModel('contractfees')->getTotalForContract($this->contract_id);
		$this->paymentData->currency       = $this->payment->currency;
		$this->paymentData->payment_date   = TickTock::getDate();
		$this->paymentData->rate           = $this->payment->rate;
		$this->paymentData->service_ref    = $this->payment->service_ref;

		if (!$this->paymentData->base_amount || !$this->paymentData->amount || !$this->paymentData->currency) {
			throw new RuntimeException('Amounts missing for PrePayment');
		}

		$this->setNote();
	}

	/**
	 * Validate payment type
	 *
	 * @param  stdClass  $paymentData    Payment data
	 * @param  array     $payment_types  Valid payment types
	 *
	 * @throws InvalidArgumentException
	 * @since  3.3.1
	 */
	protected function validatePaymentType(stdClass $paymentData, array $payment_types): void
	{
		if (!in_array($paymentData->payment_type, $payment_types)) {
			throw new InvalidArgumentException("Payment type $paymentData->payment_type is not valid for $this->service->name");
		}
	}
}