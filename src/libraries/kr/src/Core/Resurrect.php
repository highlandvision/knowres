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
use HighlandVision\KR\Compute;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;

use function count;
use function is_countable;

/**
 * Resurrect a contract
 *
 * @since 1.0.0
 */
class Resurrect
{
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var object Copy of Hub data. */
	protected object $odata;

	/**
	 * Action resurrrect
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub   = $hub;
		$this->odata = $this->hub->getOriginalData();
		$this->prepareData();

		return $this->saveAll();
	}

	/**
	 * Any additional procesing before save
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function prepareData(): void
	{
		$payments = new Compute\PaymentDates();
		$payments->calculate($this->hub);
	}

	/**
	 * Controls the save and processing for resurrect
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	protected function saveAll(): bool
	{
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

			$status   = Utility::getBookingStatus($this->odata->booking_status) . ' to '
				. Utility::getBookingStatus($this->hub->getValue('booking_status'));
			$expiry   = TickTock::displayDate($this->odata->expiry_date) . ' to '
				. TickTock::displayDate($this->hub->getValue('expiry_date'));
			$balance  = TickTock::displayDate($this->odata->balance_date) . ' to '
				. TickTock::displayDate($this->hub->getValue('balance_date'));
			$currency = $this->hub->getValue('currency');
			$net      = Utility::displayValue($this->odata->net_price,
					$currency) . ' to ' . Utility::displayValue($this->hub->getValue('net_price'), $currency);

			$note = KrMethods::sprintf('COM_KNOWRES_CONTRACT_RESURRECT', $status, $expiry, $balance, $net);
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