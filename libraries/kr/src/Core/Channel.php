<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
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
use stdClass;

use function count;
use function hash;

/**
 * Saves reservations received from channel managers
 *
 * @since 1.0.0
 */
class Channel
{
	/** @var string Channel reservation ID */
	protected string $foreign_key = '';
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var int ID of contract. */
	protected int $id;

	/**
	 * Action channel
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since 1.0.0
	 * @return bool
	 */
	public function action(Hub $hub): bool
	{
		$this->hub = $hub;
		$this->setValues();

		return $this->saveAll();
	}

	/**
	 * Controls the save and processing for the channel contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
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
				throw new RuntimeException('Guest validation errors found in Core Channel');
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
				throw new RuntimeException('Contract validation errors found in Core Channel');
			}
			$contractModel->save($data);
			$this->id = $contractModel->getState('contract.id');
			$this->hub->setValue('id', $this->id);

			$this->saveNotes();
			$this->savePaymentAgent();
			$this->saveServiceXref();

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
	 * Save the contract notes
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	protected function saveNotes(): void
	{
		$guest_note = $this->hub->getValue('guest_note');
		if ($guest_note)
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->id, $guest_note, '0,1', false);
		}

		$system_note = $this->hub->getValue('system_note');
		if ($system_note)
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->id, $system_note, '3', false);
		}

		if ($this->hub->getValue('isEdit'))
		{
			KrFactory::getAdminModel('contractnote')::createContractNote($this->id, 'Reservation amended by channel',
				'3', false);
		}
		else
		{
			if ($this->hub->agent->deposit_paid)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id,
					'Channel confirmed reservation (deposit paid by agent)', '3', false);
			}
			else if ((int) $this->hub->getValue('on_request') > 0)
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id, 'Channel request reservation',
					'3', false);
			}
			else
			{
				KrFactory::getAdminModel('contractnote')::createContractNote($this->id,
					'Channel provisional reservation', '3', false);
			}
		}
	}

	/**
	 * Saves the agent pseudo payment if required
	 *
	 * @throws Exception
	 * @since        3.2.0
	 */
	protected function savePaymentAgent(): void
	{
		$agent_id           = $this->hub->getValue('agent_id');
		$agent_deposit_paid = $this->hub->getValue('agent_deposit_paid');
		$deposit            = $this->hub->getValue('deposit');

		if ($agent_id && $agent_deposit_paid && $deposit > 0)
		{
			if ($this->hub->getValue('isEdit'))
			{
				KrFactory::getAdminModel('contractpayments')->unsetPseudoPayments($this->id);
			}

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

	/**
	 * Save the service xref contract row
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function saveServiceXref(): void
	{
		if (!$this->hub->getValue('isEdit'))
		{
			$foreign_key = $this->hub->getValue('foreign_key');
			if (!$foreign_key)
			{
				$foreign_key = $this->id;
			}

			$xref              = new stdClass();
			$xref->id          = 0;
			$xref->property_id = 0;
			$xref->contract_id = $this->id;
			$xref->service_id  = $this->hub->getValue('service_id');
			$xref->foreign_key = $foreign_key;
			$xref->cancelled   = 0;
			$xref->sell        = 0;
			$xref->state       = 1;
			$xref->created_at  = TickTock::getTS();
			KrFactory::insert('service_xref', $xref);
		}
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

		$this->hub->setValue('net_price', $this->hub->getValue('net_price_system'));
	}
}