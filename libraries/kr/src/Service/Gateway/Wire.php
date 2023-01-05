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
use stdClass;

/**
 * Service gateway Wire
 *
 * @since 1.0.0
 */
class Wire extends Gateway
{
	/**
	 * @param   int       $service_id   ID of service
	 * @param   stdClass  $paymentData  Session payment data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $service_id, stdClass $paymentData)
	{
		parent::__construct($service_id, $paymentData, true, ['PBD', 'PBB']);
	}

	/**
	 * Data for output
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return stdClass
	 */
	public function setOutputData(): stdClass
	{
		$this->readTables();
		$this->setOutputManualDates();
		$this->setOutputForPaymentType();
		$this->setCustomOutput();

		return $this->paymentData;
	}

	/**
	 * Set custom gateway payment data
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setCustomOutput()
	{
		$this->paymentData->confirmed  = 0;
		$this->paymentData->service_id = $this->service_id;
	}
}