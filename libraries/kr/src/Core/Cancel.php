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
class Cancel
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Process cancel
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;

		return $this->saveAll();
	}

	/**
	 * Cancel contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	public function saveAll(): bool
	{
		$this->hub->setValue('booking_status', 99);
		$this->hub->setValue('cancelled', 1);
		$this->hub->setValue('cancelled_timestamp', TickTock::getTs());

		try
		{
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$modelContract = KrFactory::getAdminModel('contract');
			$form          = $modelContract->getForm([], false);
			if (!$modelContract->validate($form, (array) $this->hub->getData()))
			{
				$this->hub->errors = $modelContract->getErrors();
				throw new RuntimeException('Validation errors found in Contract');
			}

			$modelContract->save((array) $this->hub->getData());
			if (!$this->hub->getValue('on_request'))
			{
				if ($this->hub->getValue('email_trigger') == 'BOOKCANCELNODEP')
				{
					$note = KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_CANCEL_NO_DEPOSIT');
				}
				else
				{
					$note = KrMethods::plain('COM_KNOWRES_CONTRACT_CANCELLED');
				}
			}
			else
			{
				$note = KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_REQUEST_EXPIRED');
			}
			KrFactory::getAdminModel('contractnote')::createContractNote($this->hub->getValue('id'), $note);

			$db->transactionCommit();

			return true;
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
	}
}