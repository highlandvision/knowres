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
use HighlandVision\KR\Hub;
use RuntimeException;

use function count;
use function is_countable;

/**
 * Contract block (black booking) save functionality
 *
 * @since 1.0.0
 */
class Block
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Process block
	 *
	 * @param   Hub  $hub  Hub data
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
	 * Controls the save and processing for the contract
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
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
			$id = $modelContract->getState('contract.id');
			$this->hub->setValue('id', $id);

			$note = $this->hub->getValue('block_note');
			if ($note)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($id, $note, '0,2');
			}

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