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
use InvalidArgumentException;
use RuntimeException;

use function count;
use function is_countable;

/**
 * Save helper for quick save limited fields
 *
 * @since   1.0.0
 */
class Quick
{
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var object Copy of Hub data. */
	protected object $odata;

	/**
	 * Process block
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub   = $hub;
		$this->odata = $this->hub->getOriginalData();

		if (!$this->validate())
		{
			return false;
		}

		$this->prepareData();

		return $this->saveAll();
	}

	/**
	 * Additional procesing before save
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareData(): void
	{
		$payments = new Compute\PaymentDates();
		$payments->calculate($this->hub);

		$commission = new Compute\Commission();
		$commission->calculate($this->hub);
	}

	/**
	 * Controls the save and processing for the contract
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	protected function saveAll(): bool
	{
		try
		{
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$modelContract = KrFactory::getAdminModel('contract');
			$data          = $modelContract->validate($modelContract->getForm(), (array) $this->hub->getData());
			if (!$data)
			{
				$this->hub->errors = $modelContract->getErrors();
				throw new RuntimeException('Validation errors found in Contract');
			}

			$modelContract->save($data);

			$status   = Utility::getBookingStatus($this->odata->booking_status) . ' to '
				. Utility::getBookingStatus($this->hub->getValue('booking_status'));
			$expiry   = TickTock::displayDate($this->odata->expiry_date) . ' to '
				. TickTock::displayDate($this->hub->getValue('expiry_date'));
			$balance  = TickTock::displayDate($this->odata->balance_date) . ' to '
				. TickTock::displayDate($this->hub->getValue('balance_date'));
			$currency = $this->hub->getValue('currency');
			$net      = Utility::displayValue($this->odata->net_price,
					$currency) . ' to ' . Utility::displayValue($this->hub->getValue('net_price'), $currency);

			$note = KrMethods::sprintf('COM_KNOWRES_CONTRACT_QUICK', $status, $expiry, $balance, $net);
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

	/**
	 * Any additional procesing before save
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 * @return bool
	 */
	protected function validate(): bool
	{
		if ($this->hub->getValue('net_price') > $this->hub->getValue('room_total'))
		{
			$this->hub->errors = [KrMethods::plain('COM_KNOWRES_RULES_NETPRICE')];

			return false;
		}

		return true;
	}
}