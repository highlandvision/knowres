<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Core;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Session as KnowresSession;
use HighlandVision\KR\TickTock;
use RuntimeException;
use stdClass;

use function hash;

/**
 * Processes save functionality for a manager reservation
 *
 * @since  3.3.0
 */
class Manager
{
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var int ID of contract. */
	protected int $id;

	/**
	 * Action manager
	 *
	 * @param   Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;
		$this->setValues();
		if (!$this->saveAll())
		{
			return false;
		}
		$this->postSave();

		return true;
	}

	/**
	 * Pre save processing
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function setValues(): void
	{
		$this->hub->checkGuestUser();
		if (!$this->hub->getValue('isEdit'))
		{
			if (!$this->hub->getValue('tag'))
			{
				$this->hub->setValue('tag', KrFactory::getAdminModel('contract')::generateTag());
			}

			$this->hub->setValue('booking_status', $this->hub->doBookingStatus());
		}

		if ((float) $this->hub->getValue('net_price') == 0)
		{
			$this->hub->setValue('net_price', $this->hub->getValue('net_price_system'));
		}

		// If agent booking and linked to a channel then set service_id
		if ($this->hub->getValue('agent_id') && !$this->hub->getValue('service_id'))
		{
			$agent = KrFactory::getAdminModel('agent')->getItem($this->hub->getValue('agent_id'));
			$this->hub->setValue('service_id', $agent->service_id);
		}

		if ($this->hub->params->get('manager_scope', 0))
		{
			$userSession = new KnowresSession\User();
			$userData    = $userSession->getData();
			$this->hub->setValue('agency_id', $userData->agency_id);
			$this->hub->setValue('manager_id', $userData->manager_id);
		}
		else
		{
			$this->hub->setValue('manager_id', $this->hub->settings['default_manager']);
			if ($this->hub->settings['default_manager'])
			{
				$this->hub->setValue('agency_id',
					KrFactory::getListModel('managers')->getAgency($this->hub->settings['default_manager']));
			}
		}
	}

	/**
	 * Post save processing
	 *
	 * @throws Exception
	 * @since   3.2.0
	 */
	protected function postSave(): void
	{
		if ($this->hub->getValue('isEdit'))
		{
			if (!$this->hub->getValue('fixrate'))
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id,
					KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_EDIT'));
			}
			else
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id,
					KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_FIXRATE'));
			}
		}
	}

	/**
	 * Controls the save and processing for the contract
	 *
	 * @throws RuntimeException
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

			$modelGuest = KrFactory::getAdminModel('guest');
			$data       = $modelGuest->validate($modelGuest->getForm(), (array) $this->hub->getData('guestData'), null,
				$this->hub->settings);
			if (!$data)
			{
				$this->hub->errors = $modelGuest->getErrors();
				throw new RuntimeException('Validation errors found in Contract');
			}

			$guest_id = $data['id'];
			$modelGuest->save($data);
			$guest_id = $guest_id ?: $modelGuest->getState('guest.id');

			if (!$this->hub->getValue('guest_id') && $guest_id)
			{
				$this->hub->setValue('guest_id', $guest_id);
			}

			$hash = $this->hub->getValue('tag') . $guest_id;
			$this->hub->setValue('qkey', hash('ripemd160', $hash));

			$modelContract = KrFactory::getAdminModel('contract');
			$data          = $modelContract->validate($modelContract->getForm(), (array) $this->hub->getData());
			if (!$data)
			{
				$this->hub->errors = $modelContract->getErrors();
				throw new RuntimeException('Validation errors found in Contract');
			}

			$modelContract->save($data);
			$this->id = $modelContract->getState('contract.id');
			$this->hub->setValue('id', $this->id);

			$guest_note = $this->hub->getValue('guest_note');
			if ($guest_note)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id, $guest_note, '0,1');
			}

			$owner_note = $this->hub->getValue('owner_note');
			if ($owner_note)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id, $owner_note, '0,2');
			}

			$this->savePaymentAgent();
			$this->saveOwnerDepositAgent();
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
	 * Saves the agent owner deposit payment if required
	 *
	 * @throws Exception
	 * @since  3.3.3
	 */
	protected function saveOwnerDepositAgent(): void
	{
		if ($this->hub->getValue('owner_deposit') > 0)
		{
			$ps               = new stdClass();
			$ps->owner_id     = $this->hub->getValue('owner_id');
			$ps->contract_id  = $this->id;
			$ps->amount       = $this->hub->getValue('owner_deposit');
			$ps->calculated   = $this->hub->getValue('owner_deposit');
			$ps->type         = 'dep';
			$ps->payment_date = TickTock::getDate();
			$ps->state        = 1;
			$ps->created_at   = TickTock::getTs();
			KrFactory::insert('owner_payment', $ps);
		}
	}

	/**
	 * Saves the agent pseudo payment if required
	 *
	 * @throws Exception
	 * @since   3.2.0
	 */
	protected function savePaymentAgent(): void
	{
		if (!$this->hub->getValue('isEdit'))
		{
			$agent_id           = $this->hub->getValue('agent_id');
			$agent_deposit_paid = $this->hub->getValue('agent_deposit_paid');
			$deposit            = $this->hub->getValue('deposit');
			if ($agent_id && $agent_deposit_paid && $deposit > 0)
			{
				$agent                 = KrFactory::getAdminModel('agent')->getItem($agent_id);
				$payment               = new stdClass();
				$payment->id           = 0;
				$payment->contract_id  = $this->id;
				$payment->service_id   = 0;
				$payment->payment_date = TickTock::getDate();
				$payment->amount       = $deposit;
				$payment->rate         = 1;
				$payment->base_amount  = $deposit;
				$payment->currency     = $this->hub->getValue('currency');
				$payment->payment_ref  = $this->hub->getValue('agent_reference') ?: $agent->name;
				$payment->note         = KrMethods::sprintf('COM_KNOWRES_PAID_AGENT_NOTE', $agent->name);
				$payment->confirmed    = 1;
				$payment->state        = 1;
				$payment->created_at   = TickTock::getTS();
				$payment->created_by   = KrMethods::getUser()->id;
				KrFactory::insert('contract_payment', $payment);
			}
		}
	}
}