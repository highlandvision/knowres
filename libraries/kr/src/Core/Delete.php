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

use function count;
use function is_countable;

/**
 * Deletes a contract
 *
 * @since   3.3.0
 */
class Delete
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Process delete
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
	 * Delete contract
	 *
	 * @throws Exception
	 * @return bool
	 */
	public function saveAll(): bool
	{
		try
		{
			KrFactory::getAdminModel('contract')::deleteAll($this->hub->getValue('id'),
				$this->hub->getValue('guest_id'));
		}
		catch (Exception $e)
		{
			if (is_countable($this->hub->errors) && count($this->hub->errors))
			{
				return false;
			}

			throw $e;
		}

		return true;
	}
}