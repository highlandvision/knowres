<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Gateway;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\Utility;
use stdClass;

/**
 * Service gateway PayPal
 *
 * @since 1.0.0
 */
class Paypal extends Gateway
{
	/** @var string Paypal app client */
	protected string $client_id;
	/** @var string Paypal app secret */
	protected string $client_secret;
	/** @var string PayPal business email */
	protected string $email;

	/**
	 * Initialize
	 *
	 * @param  int       $service_id   ID of service
	 * @param  stdClass  $paymentData  Session payment data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $service_id, stdClass $paymentData)
	{
		parent::__construct($service_id, $paymentData);
	}

	/**
	 * Set output data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return stdClass
	 */
	public function setOutputData(): stdClass
	{
		$this->readTables();
		$this->setOutputForPaymentType();

		$this->paymentData->service_id  = $this->service_id;
		$this->paymentData->tag         = $this->contract->tag;
		$this->paymentData->invoice_id  = $this->contract->id . '-' . $this->contract->tag;
		$this->paymentData->firstname   = $this->guest->firstname;
		$this->paymentData->surname     = $this->guest->surname;
		$this->paymentData->email       = $this->guest->email;
		$this->paymentData->address1    = $this->guest->address1;
		$this->paymentData->address2    = $this->guest->address2;
		$this->paymentData->town        = $this->guest->town;
		$this->paymentData->country_iso = $this->guest->country_iso;
		$this->paymentData->postcode    = $this->guest->postcode;
		$this->paymentData->region_name = $this->guest->region_name;
		$this->paymentData->mobile      = Utility::formatPhoneNumber($this->guest->mobile,
		                                                             $this->guest->mobile_country_id, true);

		return $this->paymentData;
	}
}