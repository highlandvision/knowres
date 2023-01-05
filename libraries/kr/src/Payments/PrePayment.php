<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Payments;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Session as KnowresSession;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;
use stdClass;

use function count;

/**
 * Pre payment processor sets Payment Session data
 *
 * @since 3.3.1
 */
class PrePayment
{
	/** @var stdClass Payment data */
	private stdClass $paymentData;

	/**
	 * Set payment data for Existing reservations
	 *
	 * @param   object  $contract  Database contract row
	 * @param   float   $balance   Balance due
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return stdClass
	 */
	public function constructExisting(object $contract, float $balance = 0): stdClass
	{
		if (!$contract->id)
		{
			throw new InvalidArgumentException('Invalid Contract object passed');
		}

		$paymentSession    = new KnowresSession\Payment();
		$this->paymentData = $paymentSession->getData();
		$paymentSession->resetData();

		$this->paymentData->agency_id    = $contract->agency_id;
		$this->paymentData->base_amount  = $this->setExistingAmount($contract, $balance);
		$this->paymentData->contract_id  = $contract->id;
		$this->paymentData->currency     = $contract->currency;
		$this->paymentData->payment_type = $this->setPaymentTypeExisting($contract->booking_status);
		$this->paymentData->property_id  = $contract->property_id;

		$this->getGateways($contract->currency);
		$paymentSession->setData($this->paymentData);

		return $this->paymentData;
	}

	/**
	 * Set payment data for New reservations
	 *
	 * @param   stdClass  $contractData  Contract session data
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return stdClass
	 */
	public function constructNew(stdClass $contractData): stdClass
	{
		if (!$contractData->property_id)
		{
			throw new InvalidArgumentException('Invalid Contract object passed');
		}

		$paymentSession    = new KnowresSession\Payment();
		$this->paymentData = $paymentSession->getData();
		$paymentSession->resetData();

		$this->paymentData->agency_id    = $contractData->agency_id;
		$this->paymentData->base_amount  = $this->setNewAmount($contractData->deposit);
		$this->paymentData->contract_id  = $contractData->id;
		$this->paymentData->currency     = $contractData->currency;
		$this->paymentData->payment_type = $this->setPaymentTypeNew($contractData->booking_type);
		$this->paymentData->property_id  = $contractData->property_id;

		$this->getGateways($contractData->currency);
		$paymentSession->setData($this->paymentData);

		return $this->paymentData;
	}

	/**
	 * Set the payment data for a gateway
	 *
	 * @param   string  $currency  Currency of contract
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function getGateways(string $currency): void
	{
		$currencies = $this->getCurrencies($currency);
		$services   = $this->getServiceGateways($currencies);
		$gateways   = [];

		$gateway = new Gateway($this->paymentData->payment_type, $currency,
			$this->paymentData->base_amount);

		foreach ($services as $g)
		{
			$params = Utility::decodeJson($g->parameters);

			$obd = isset($params->obd) ? (int) $params->obd : false;
			if (!$obd && $this->paymentData->payment_type === 'OBD')
			{
				continue;
			}
			$obr = isset($params->obr) ? (int) $params->obr : false;
			if (!$obr && $this->paymentData->payment_type === 'OBR')
			{
				continue;
			}

			try
			{
				$gateways[$g->id] = $gateway->setGateway($g, $params);
			}
			catch (Exception)
			{
				continue;
			}
		}

		$this->paymentData->gateways = $gateways;
	}

	/**
	 * Read and check for any property specific gateways
	 *
	 * @param   array  $currencies  Payment currencies
	 *
	 * @since  3.3.1
	 * @return array
	 */
	protected function getServiceGateways(array $currencies): array
	{
		$services = KrFactory::getListModel('services')->getGateways($currencies,
			$this->paymentData->agency_id, $this->paymentData->property_id);

		$property = [];
		$global   = [];

		foreach ($services as $t)
		{
			if ($t->property_id)
			{
				$property[] = $t;
			}
			else
			{
				$global[] = $t;
			}
		}

		return count($property) ? $property : $global;
	}

	/**
	 * Set the available currencies for a payment
	 *
	 * @param   string  $currency  Contract currency
	 *
	 * @since 3.3.1
	 * @return array
	 */
	protected function getCurrencies(string $currency): array
	{
		$currencies[] = $currency;

		$payment_currencies = KrFactory::getListModel('currencies')->getPaymentCurrencies($currency);
		if (is_string($payment_currencies))
		{
			$payment_currencies = Utility::decodeJson($payment_currencies);
			foreach ($payment_currencies as $c)
			{
				$currencies[] = $c;
			}
		}

		return $currencies;
	}

	/**
	 * Set payment amount
	 *
	 * @param   object  $contract  Contract row
	 * @param   float   $balance   Balance due
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 * @return float
	 */
	protected function setExistingAmount(object $contract, float $balance): float
	{
		$hasDeposit = $contract->contract_total - $contract->deposit;
		if ($hasDeposit && $contract->booking_status < 10)
		{
			$amount = $contract->deposit;
		}
		else
		{
			$amount = $balance;
		}

		if (!$amount)
		{
			throw new RuntimeException('Your reservation is fully paid');
		}

		return $amount;
	}

	/**
	 * Set payment amount
	 *
	 * @param   float  $amount  Payment amount
	 *
	 * @throws InvalidArgumentException
	 * @since  3.3.1
	 * @return float
	 */
	protected function setNewAmount(float $amount): float
	{
		if (!$amount)
		{
			throw new InvalidArgumentException('Payment amount could not be calculated');
		}

		return $amount;
	}

	//	/**
	//	 * Get the payment gateways
	//	 *
	//	 * @throws Exception
	//	 * @since  3.3.1
	//	 * @return array
	//	 */
	//	protected function setPaymentMethods(): array
	//	{
	//		$this->currencies[] = $this->currency;
	//		$this->addPaymentCurrencies();
	//		$this->propertySpecific();
	//		$this->setGateways();
	//
	//		if (!count($this->gateways))
	//		{
	//			throw new RuntimeException('No payment gateways found');
	//		}
	//
	//		return $this->gateways;
	//	}

	/**
	 * Set payment type for Existing
	 *
	 * @param   int  $booking_status  Booking status
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function setPaymentTypeExisting(int $booking_status): string
	{
		if ($booking_status < 10)
		{
			return 'PBD';
		}
		else
		{
			return 'PBB';
		}
	}

	/**
	 * Set payment type for New
	 *
	 * @param   int  $booking_type  Property booking type
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function setPaymentTypeNew(int $booking_type): string
	{
		if ($booking_type == 2)
		{
			return 'OBD';
		}
		else
		{
			return 'OBR';
		}
	}
}