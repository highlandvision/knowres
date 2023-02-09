<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Beyond;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Beyond;
use RuntimeException;

use function json_encode;

use const JSON_NUMERIC_CHECK;

/**
 * Update rate parameters for Beyond
 *
 * @since 2.4.0
 */
class PushRates extends Beyond
{
	/**
	 * Initialize
	 *
	 * @param  int  $test  1 for testing
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function __construct(int $test = 0)
	{
		parent::__construct($test);
	}

	/**
	 * Update the changed property min and base price rates to beyond
	 *
	 * @param  object  $queue  The queue database record
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.4.0
	 */
	public function processQueue(object $queue)
	{
		$this->method = 'listings';

		try
		{
			if (!$queue->id)
			{
				throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue'));
			}

			if (!$queue->property_id)
			{
				throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue.property_id'));
			}

			if (!$queue->foreign_key)
			{
				throw new Exception(KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue.foreign_key'));
			}

			$this->queue_id    = $queue->id;
			$this->foreign_key = $queue->foreign_key;
			$this->property_id = $queue->property_id;
			$this->readProperty($this->property_id);
			$this->getSettings($this->property_id);

			if ((float) $this->settings['base_price'] > 0 && (float) $this->settings['min_price'] > 0)
			{
				$data = [
					'id'         => $this->foreign_key,
					'base_price' => $this->settings['base_price'],
					'min_price'  => $this->settings['min_price'],
					'enabled'    => true
				];

				$request = json_encode($data, JSON_NUMERIC_CHECK);
				$this->sendCurlRequest($request, $this->foreign_key);
			}

			$this->messages[] = 'Beyond rate settings updated successfully';
			$this->addLog(true);
		}
		catch (Exception $e)
		{
			$this->exception = $e;
			$this->addLog(false);
		}
	}
}