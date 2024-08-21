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
use HighlandVision\KR\Logger;
use HighlandVision\KR\Model\ContractModel;
use HighlandVision\KR\Model\ServiceModel;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;
use Stripe\Exception\CardException;
use Stripe\Exception\InvalidRequestException;
use Stripe\PaymentIntent as StripePI;
use Stripe\Stripe as StripeLib;

use function count;
use function is_countable;

/**
 * Process an approved request
 *
 * @since   1.0.0
 */
class Requestapprove
{
	/** @var string Service plugin. */
	public string $plugin;
	/** @var Hub Hub data. */
	protected Hub $hub;
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
		$this->hub = $Hub;
		if (!$this->setValues()) {
			return false;
		}

		return $this->saveAll();
	}

	/**
	 * Poll webhook for on request payment success
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	protected function pollWebhook(int $contract_id): int
	{
		$count = 0;
		while (true) {
			$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if (!is_null($contract->on_request_paid)) {
				return $contract->on_request_paid;
			}

			$count++;
			if ($count > 3) {
				return 99;
			}

			sleep(3);
		}
	}

	/**
	 * Approve contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function saveAll(): bool
	{
		if (!$this->service_id) {
			try {
				$db = KrFactory::getDatabase();
				$db->transactionStart();
				$settings = KrFactory::getListModel('propertysettings')->getPropertysettings(
					$this->hub->getValue('property_id'));

				$expiry_days = $settings['expiry_days'] ?: 2;
				$this->hub->setValue('expiry_days', $expiry_days);
				$this->hub->setValue('expiry_date', TickTock::modifyDays('now', $expiry_days));
				$this->hub->setValue('on_request', 0);

				$modelContract = KrFactory::getAdminModel('contract');
				$data          = $modelContract->validate($modelContract->getForm(), (array) $this->hub->getData());
				if (!$data) {
					$this->hub->errors = $modelContract->getErrors();
					throw new RuntimeException('Validation errors found in Contract');
				}
				$modelContract->save($data);

				KrFactory::getAdminModel('contractnote')::createContractNote($this->hub->getValue('id'),
					KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_REQUEST_APPROVED'));
				$db->transactionCommit();
			} catch (Exception $e) {
				$db->transactionRollback();
			}
		} else {
			//TODO do only for stripe
			// Stripe only for now!
			$paymentData             = $this->hub->getData('paymentData');
			$guestData               = $this->hub->getData('guestData');

			$metadata                = Utility::setStripeMeta($paymentData);
			$metadata['on_request_paid'] = $on_request_paid;
			$metadata['state']       = 1;
			$metadata['service_ref'] = "na";
			$metadata['payment_ref'] = '';

			try {
				// Finalize payment, result sent to webhook processing
				StripeLib::setApiKey(trim($paymentData->secret_key));
				StripePI::create(['amount'         =>
					                  Utility::setStripeAmount($paymentData->amount, $paymentData->currency),
				                  'currency'       => strtolower($paymentData->currency),
				                  'customer'       => $guestData->customer_ref,
				                  'payment_method' => $paymentData->service_ref,
				                  'metadata'       => $metadata,
				                  'off_session'    => true,
				                  'confirm'        => true,
				]);

				// Wait on webhook response for a few seconds to check for success
				$on_request_paid = $this->pollWebhook($paymentData->contract_id);
				if ($on_request_paid == 99) {
					$this->hub->errors = [KrMethods::plain('COM_KNOWRES_CONTRACT_REQUEST_TRY_LATER')];
				}
			} catch (CardException $e) {
				Logger::logMe("A payment error occurred: " . $e->getError()->message);
				$this->hub->errors = ['A Stripe payment error occurred: ' . $e->getError()->message];
				throw $e;
			} catch (InvalidRequestException $e) {
				Logger::logMe("An invalid request occurred");
				$this->hub->errors = ['An invalid request was received by Stripe: ' . $e->getError()->message];
				throw $e;
			} catch (Exception $e) {
				$db->transactionRollback();
				if (is_countable($this->hub->errors) && count($this->hub->errors)) {
					return false;
				}
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
		$this->service_id = $this->hub->getValue('service_id', 'paymentData');
		if (!$this->service_id) {
			return true;
		}

		$service = KrFactory::getAdminModel('service')->getItem($this->service_id);
		if (!$service->id) {
			$this->hub->errors = [KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK')];

			return false;
		}

		$this->plugin = $service->plugin;

		return true;
	}
}