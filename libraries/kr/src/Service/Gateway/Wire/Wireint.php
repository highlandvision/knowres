<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Gateway\Wire;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Service\Gateway\Wire;
use stdClass;

/**
 * Service gateway bankia (redsys)
 *
 * @since 1.0.0
 */
class Wireint extends Wire
{
	/**
	 * Initialize
	 *
	 * @param   int       $service_id   ID of service
	 * @param   stdClass  $paymentData  Session payment data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(int $service_id, stdClass $paymentData)
	{
		parent::__construct($service_id, $paymentData);
	}
}