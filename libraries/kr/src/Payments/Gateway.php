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
use HighlandVision\KR\Utility;
use stdClass;

use function defined;
use function floatval;
use function nl2br;

/**
 * Get gateways available for a payment
 * Can't seem to get this to work as a Class so using stdClass
 *
 * @since 3.3.1
 */
class Gateway
{
	/** @var float Base amount */
	private float $base_amount;
	/** @var string Base currency */
	private string $base_currency;
	/** @var string Contract currency */
	private string $currency = '';
	/** @var string Payment type */
	private string $payment_type;
	/** @var stdClass Holds data for one gateway */
	private stdClass $gw;

	/**
	 * Constructor
	 *
	 * @param  string  $payment_type   Type of payment, deposit, balance etc
	 * @param  string  $base_currency  Base (contract) currency
	 * @param  float   $base_amount    Payment amount in base currency
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function __construct(string $payment_type, string $base_currency, float $base_amount)
	{
		$this->base_amount   = $base_amount;
		$this->base_currency = $base_currency;
		$this->payment_type  = $payment_type;
	}

	/**
	 * Set data for one gateway
	 *
	 * @param  object  $gateway   Gateway service row
	 * @param  object  $params    Gateway parameters
	 *                            <code>
	 *                            $amount         - Payment amount in FEX currency
	 *                            $base_amount    - Payment amount in base currency
	 *                            $base_surcharge - Surcharge in base currency
	 *                            $client_id      - PayPal client id
	 *                            $currency       - Payment currency
	 *                            $description    - Gateway description
	 *                            $expirydays     - #Days for payment option to expire
	 *                            $name           - Gateway name
	 *                            $plugin         - Plugin in name
	 *                            $rate           - FEX rate
	 *                            $service_id     - ID of service
	 *                            $surcharge      - FEX surcharge value
	 *                            </code>
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return stdClass
	 */
	public function setGateway(object $gateway, object $params): stdClass
	{
		$this->currency = $gateway->currency;

		[$amount, $rate] = KrFactory::getAdminModel('exchangerate')::convertAmount($this->base_amount,
			$this->base_currency, $this->currency);

		$this->getGateway($gateway, $params, $amount, $rate);

		return $this->gw;
	}

	/**
	 * Add gateway data
	 *
	 * @param  object  $gateway  Gateway
	 * @param  object  $params   Gateway parameters
	 * @param  float   $amount   Fex payment amount
	 * @param  float   $rate     Fex rate
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function getGateway(object $gateway, object $params, float $amount, float $rate): void
	{
		$this->gw                 = new stdClass();
		$this->gw->base_surcharge = 0;
		$this->gw->client_id      = $this->setClientId($gateway->plugin, $params);
		$this->gw->currency       = $this->currency;
		$this->gw->description    = nl2br($params->description);
		$this->gw->expirydays     = isset($params->expirydays) ? (int) $params->expirydays : 0;
		$this->gw->name           = $gateway->name;
		$this->gw->plugin         = $gateway->plugin;
		$this->gw->rate           = $rate;
		$this->gw->service_id     = $gateway->id;
		$this->gw->surcharge      = 0;

		$this->setSurcharge($params, $amount, $rate);
	}

	/**
	 * Set client ID value for PayPal
	 *
	 * @param  string  $plugin  Gateway plugin
	 * @param  object  $params  Service parameters
	 *
	 * @since  3.3.1
	 * @return string
	 */
	protected function setClientId(string $plugin, object $params): string
	{
		if ($plugin === 'paypal')
		{
			if (isset($params->usesandbox) && $params->usesandbox && isset($params->sandbox_client_id))
			{
				return $params->sandbox_client_id;
			}
			else
			{
				return $params->client_id;
			}
		}

		return '';
	}

	/**
	 * Calculate surchange values
	 *
	 * @param  object  $params  Service parameters
	 * @param  float   $amount  Fex payment amount
	 * @param  float   $rate    Fex rate
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setSurcharge(object $params, float $amount, float $rate = 1): void
	{
		[$surcharge_value, $surcharge_calc] = $this->setSurchargeData($params);
		if ($surcharge_calc)
		{
			// Value
			[$surcharge] = KrFactory::getAdminModel('exchangerate')::convertAmount($surcharge_value,
				$this->base_currency, $this->currency, true, $rate);
			$base_surcharge = Utility::roundValue($surcharge_value, $this->currency);
		}
		else
		{
			// PC
			$surcharge      = Utility::roundValue($amount * $surcharge_value / 100, $this->currency);
			$base_surcharge = Utility::roundValue($this->base_amount * $surcharge_value / 100, $this->currency);
		}

		$this->gw->amount         = $amount + $surcharge;
		$this->gw->base_amount    = $this->base_amount + $base_surcharge;
		$this->gw->surcharge      = $surcharge;
		$this->gw->base_surcharge = $base_surcharge;
	}

	/**
	 * Set value for any surcharge
	 *
	 * @param  object  $params  Service parameters
	 *
	 * @since   3.3.0
	 * @return array
	 */
	protected function setSurchargeData(object $params): array
	{
		$calc    = 0;
		$value   = 0;
		$deposit = 0;

		if (isset($params->surchargetype))
		{
			$calc = (int) $params->surchargetype;
		}
		if (isset($params->surcharge))
		{
			$value = floatval($params->surcharge);
		}
		if (isset($params->surchargedeposit))
		{
			$deposit = (int) $params->surchargedeposit;
		}

		if (!$deposit && ($this->payment_type === 'OBD' || $this->payment_type === 'OBR'))
		{
			$value = 0;
		}

		return [$value,
		        $calc];
	}
}