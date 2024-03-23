<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  2017 Highland Vision. All rights reserved.
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
use function defined;
use function hash;

/**
 * Enquiry requests
 *
 * @since 5.0.0
 */
class Enquiry
{
	/** @var Hub Hub data. */
	protected Hub $hub;
	/** @var int ID of contract. */
	protected int $id;

	/**
	 * Action enquiry
	 *
	 * @param  Hub  $hub  Hub data
	 *
	 * @throws Exception
	 * @since  5.0.0
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
	 * @since 5.0.0
	 */
	protected function setValues(): void
	{
		$this->hub->checkGuestUser();
		$this->hub->setValue('booking_status', 0);
		$this->hub->setValue('guest_id', 0);
		$this->hub->setValue('id', 0);
		$this->hub->setValue('state', 0);
		$this->hub->setValue('tag', KrFactory::getAdminModel('contract')::generateTag());
	}

	/**
	 * Controls the save and processing for the enquiry
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  5.0.0
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