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
use InvalidArgumentException;
use RuntimeException;

use function count;
use function is_countable;

/**
 * Validates the contract and guest data before taking payment
 *
 * @since 1.0.0
 */
class Confirm
{
	/** @var Hub Hub data. */
	protected Hub $hub;

	/**
	 * Action manager
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
		$this->setValues();

		return $this->validate();
	}

	/**
	 * Add any additional fields before validation
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 */
	protected function setValues(): void
	{
		$this->hub->setValue('id', 0, 'guestData');
		$this->hub->setValue('user_id', 0, 'guestData');
		$this->hub->setValue('email', KrMethods::emailToPunycode($this->hub->getValue('email', 'guestData')),
			'guestData');
	}

	/**
	 * Data validation
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	protected function validate(): bool
	{
		try
		{
			$guestModel = KrFactory::getSiteModel('guest');
			$guestForm  = KrFactory::getAdhocForm('guest', 'guest.xml', 'site');
			$data       = $guestForm->filter((array) $this->hub->getData('guestData'));
			$data       = $guestModel->validate($guestForm, $data, null, $this->hub->settings);
			if (!$data)
			{
				$this->hub->errors = $guestModel->getErrors();
				throw new RuntimeException('Guest validation errors found in Confirm');
			}

			$contractModel = KrFactory::getAdminModel('contract');
			$form          = KrFactory::getAdhocForm('contract-form', 'contract.xml');
			if (!$contractModel->validate($form, (array) $this->hub->getData()))
			{
				$this->hub->errors = $contractModel->getErrors();
				throw new RuntimeException('Contract validation errors found in Confirm');
			}
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