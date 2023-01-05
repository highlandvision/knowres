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
use function hash;
use function is_countable;

/**
 * Validate guest and contract details on POST confirm page
 * and save details prepayment.
 *
 * @since 1.0.0
 */
class Guest
{
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var int ID of contract. */
	protected int $id;

	/**
	 * Action guest confirm
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
		$this->setValues();

		return $this->saveAll();
	}

	/**
	 * Pre save processing
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	protected function setValues(): void
	{
		$this->hub->checkGuestUser();
		$this->hub->setValue('booking_status', $this->hub->doBookingStatus());
		$this->hub->setValue('guest_id', 0);
		$this->hub->setValue('id', 0);
		$this->hub->setValue('state', 0);
		$this->hub->setValue('tag', KrFactory::getAdminModel('contract')::generateTag());
		$this->hub->setValue('net_price', $this->hub->getValue('net_price_system'));

		$this->hub->setValue('manager_id', $this->hub->settings['default_manager']);
		if ($this->hub->settings['default_manager'])
		{
			$this->hub->setValue('agency_id',
				KrFactory::getListModel('managers')->getAgency($this->hub->settings['default_manager']));
		}
	}

	/**
	 * Controls the save and processing for the guest contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function saveAll(): bool
	{
		try
		{
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$guestModel = KrFactory::getAdminModel('guest');
			$guestForm  = $guestModel->getForm();
			$data       = $guestForm->filter((array) $this->hub->getData('guestData'));
			$data       = $guestModel->validate($guestForm, $data, null, $this->hub->settings);
			if (!$data)
			{
				$this->hub->errors = $guestModel->getErrors();
				throw new RuntimeException('Guest validation errors found in Confirm');
			}

			$guest_id = $data['id'];
			$guestModel->save($data);
			$guest_id = $guest_id ?: $guestModel->getState('guest.id');
			if (!$this->hub->getValue('guest_id') && $guest_id)
			{
				$this->hub->setValue('guest_id', $guest_id);
			}

			$hash = $this->hub->getValue('tag') . $guest_id;
			$this->hub->setValue('qkey', hash('ripemd160', $hash));

			$contractModel = KrFactory::getAdminModel('contract');
			$contractForm  = KrFactory::getAdhocForm('contract-form', 'contract.xml');
			$data          = $contractForm->filter((array) $this->hub->getData());
			$data          = $contractModel->validate($contractForm, $data);
			if (!$data)
			{
				$this->hub->errors = $contractModel->getErrors();
				throw new RuntimeException('Contract validation errors found in Confirm');
			}

			$contractModel->save($data);
			$this->id = $contractModel->getState('contract.id');
			$this->hub->setValue('id', $this->id);
			$this->hub->setValue('contract_id', $this->id, 'paymentData');

			$guest_note = $this->hub->getValue('guest_note');
			if ($guest_note)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id, $guest_note, '0,1');
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