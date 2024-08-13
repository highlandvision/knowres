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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use RuntimeException;
use Stripe\Exception as StripeException;
use Stripe\PaymentIntent as StripePI;
use Stripe\Stripe as StripeLib;

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
	protected Hub $Hub;
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
		if (!$this->setValues()) {
			return false;
		}

		return $this->saveAll();
	}

	/**
	 * Approve contract
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return true
	 */
	protected function saveAll(): bool
	{
		if (!$this->service_id) {
			try {
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
				if (!$data) {
					$this->Hub->errors = $modelContract->getErrors();
					throw new RuntimeException('Validation errors found in Contract');
				}
				$modelContract->save($data);

				KrFactory::getAdminModel('contractnote')::createContractNote($this->Hub->getValue('id'),
				    KrMethods::plain('COM_KNOWRES_CONTRACTNOTE_TEXT_REQUEST_APPROVED'));
				$db->transactionCommit();
			} catch (Exception $e) {
				$db->transactionRollback();
				throw $e;
			}
		} else {
			$paymentData             = $this->Hub->getData('paymentData');
			$guestData               = $this->Hub->getData('guestData');
			$metadata                = Utility::setStripeMeta($paymentData);
			$metadata['state']       = 1;
			$metadata['service_ref'] = "na";

			//TODO v5.1 replace secret below from service
			try {
				StripeLib::setApiKey(trim($paymentData->secret_key));
				StripePI::create([
					                 'amount'         => Utility::setStripeAmount($paymentData->amount,
					                                                              $paymentData->currency),
					                 'currency'       => strtolower($paymentData->currency),
					                 'customer'       => $guestData->customer_ref,
					                 'payment_method' => $paymentData->service_ref,
					                 'metadata'       => $metadata,
					                 'off_session'    => true,
					                 'confirm'        => true,
				                 ]);
			} catch (StripeException\CardException $e) {
				// Error code will be authentication_required if authentication is needed
				echo 'Error code is:' . $e->getError()->code;
				$payment_intent_id = $e->getError()->payment_intent->id;
				$payment_intent    = StripePI::retrieve($payment_intent_id);
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
		if (!$this->service_id) {
			return true;
		}

		$service = KrFactory::getAdminModel('service')->getItem($this->service_id);
		if (!$service->id) {
			$this->Hub->errors = [KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK')];

			return false;
		}

		$this->plugin = $service->plugin;
		$this->Hub->setValue('email_trigger', 'BOOKREQUESTCONFIRM');

		return true;
	}
}