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
use HighlandVision\KR\Payments\PostPayment;
use HighlandVision\KR\Service\Gateway;
use HighlandVision\KR\TickTock;
use RuntimeException;

/**
 * Process an approved request
 *
 * @since   1.0.0
 */
class Requestapprove
{
	/** @var Hub Hub data. */
	protected Hub $Hub;
	/** @var string Service plugin. */
	public string $plugin;
	/** @var int Service ID. */
	protected int $service_id;

	/**
	 * Process request approval
	 *
	 * @param  Hub  $Hub  Hub data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function action(Hub $Hub): bool
	{
		$this->Hub = $Hub;

		if (!$this->setValues())
		{
			return false;
		}

		return $this->saveAll();
	}

	/**
	 * Approve contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 * @return true
	 */
	protected function saveAll(): bool
	{
		if (!$this->service_id)
		{
			try
			{
				$db = KrFactory::getDatabase();
				$db->transactionStart();
				$settings = KrFactory::getListModel('propertysettings')
				                     ->getPropertysettings($this->Hub->getValue('property_id'));

				$expiry_days = $settings['expiry_days'] ?: 2;
				$this->Hub->setValue('expiry_days', $expiry_days);
				$this->Hub->setValue('expiry_date', TickTock::modifyDays('now', $expiry_days));
				$this->Hub->setValue('on_request', 0);

				$modelContract = KrFactory::getAdminModel('contract');
				$data          = $modelContract->validate($modelContract->getForm(), (array) $this->Hub->getData());
				if (!$data)
				{
					$this->Hub->errors = $modelContract->getErrors();
					throw new RuntimeException('Validation errors found in Contract');
				}
				$modelContract->save($data);

				KrFactory::getAdminModel('contractnote')::createContractNote($this->Hub->getValue('id'),
					'Request approved provisional emails sent');
				$db->transactionCommit();
			}
			catch (Exception $e)
			{
				$db->transactionRollback();

				throw $e;
			}
		}
		else
		{
			try
			{
				$db = KrFactory::getDatabase();
				$db->transactionStart();

				$class   = Gateway::setGatewayClass('stripe');
				$gateway = new $class($this->service_id, $this->Hub->getData('paymentData'));
				$gateway->setOutputData();
				$gateway->processIncoming();

				$postPayment = new PostPayment($this->service_id, $this->Hub->getData('paymentData'));
				$postPayment->processPayment();

				KrFactory::getAdminModel('contractnote')::createContractNote($this->Hub->getValue('id'),
					KrMethods::plain('COM_KNOWRES_CONTRACT_REQUEST_SUCCESS'));
				KrMethods::message(KrMethods::plain('COM_KNOWRES_CONTRACT_REQUEST_SUCCESS'));

				$db->transactionCommit();
			}
			catch (Exception $e)
			{
				$db->transactionRollback();

				throw $e;
			}
		}

		return true;
	}

	/**
	 * Pre save processing
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return bool
	 */
	protected function setValues(): bool
	{
		$this->service_id = $this->Hub->getValue('service_id', 'paymentData');
		if (!$this->service_id)
		{
			return true;
		}

		$service = KrFactory::getAdminModel('service')->getItem($this->service_id);
		if (!$service->id)
		{
			$this->Hub->errors = [KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK')];

			return false;
		}

		$this->plugin = $service->plugin;
		$this->Hub->setValue('email_trigger', 'BOOKREQUESTCONFIRM');

		return true;
	}
}