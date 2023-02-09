<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Core;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\TickTock;
use RuntimeException;

use function count;
use function is_countable;

/**
 * Cancels a contract
 *
 * @since   1.0.0
 */
class Requestreject
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Process cancel
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;

		return $this->saveAll();
	}

	/**
	 * Cancel request contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	protected function saveAll(): bool
	{
		$this->hub->setValue('booking_status', 99);
		$this->hub->setValue('cancelled', 2);
		$this->hub->setValue('cancelled_timestamp', TickTock::getTs());

		try
		{
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$modelContract = KrFactory::getAdminModel('contract');
			$data          = $modelContract->validate($modelContract->getForm(), (array) $this->hub->getData());
			if (!$data)
			{
				$this->hub->errors = $modelGuest->getErrors();
				throw new RuntimeException('Validation errors found in Contract');
			}

			$modelContract->save($data);

			$note = KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_REQUEST_DECLINED');
			KrFactory::getAdminModel('contractnote')::createContractNote($this->hub->getValue('id'), $note);

			$db->transactionCommit();
		}
		catch (Exception $e)
		{
			$db->transactionRollback();

			if (is_countable($this->hub->errors) && count($this->hub->errors))
			{
				return false;
			}

			throw $e;
		}

		return true;
	}
}