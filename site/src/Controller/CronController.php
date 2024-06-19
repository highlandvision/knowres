<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\ServicequeueModel;
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Hub;
use HighlandVision\KR\Logger;
use HighlandVision\KR\Owner\PaymentsQueue;
use HighlandVision\KR\Property\Delete;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;
use RuntimeException;
use stdClass;

/**
 * Cron controller class - tasks called by cron
 *
 * @since  1.0.0
 */
class CronController extends BaseController
{
	/** @var bool Indicates that test is being run */
	protected bool $test;

	/**
	 * Daily contract processing
	 * 1. deleteUnpublished() - Delete unpublished contracts (payment process aborted)
	 * 2. cancelNoDeposit() - Cancel contracts deposit not received by expiry date + 1
	 * 3. balanceDue() - Update booking status to 30 for balance date = today
	 * 4. sendReviewRequests() - Send review requests - custom
	 * 5. sendReviewRequests() - Send review reminders - custom
	 * 6. sendEmailsOnly() - Send guest arrival info reminders
	 * 7. sendCustomByDate() - Send site custom emails
	 * 8. dailyArrivalInfo() - Send owner arrival info updates
	 * 9. deleteProperties() - Delete properties marked for deletion
	 * 10. dailyCleanUp() - Delete old records
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function dailyemails(): void
	{
		$this->checkSecret();
		KrMethods::loadLanguage();

		//Delete unpublished contracts
		self::deleteUnpublished();
		// Cancel no deposit received
		self::cancelNoDeposit();
		// Cancel expired requests
		self::cancelExpiredRequests();
		// Balance due - no emails just update
		self::balanceDue();
		// Owner payments
		self::ownerPayments();
		// Send review emails
		self::sendReviewRequests('REVIEWREQUEST');
		// Send the review reminders
		self::sendReviewRequests('REVIEWREMINDER', true);
		// Arrival info reminder
		self::sendEmailsOnly('GUESTARRIVALREMIND', 'getArrivalInfoReminder');
		// Admin emails by date
		self::sendCustomByDate();
		// Arrival info updates
		self::dailyArrivalInfo();
		// Delete trashed properties
		self::deleteProperties();
		// Delete outdated  icals, service log and service queue records
		self::dailyCleanup();

		KrMethods::cleanCache('com_knowres_contracts');

		jexit();
	}

	/**
	 * Final payment due - set status to 30 (no emails)
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function balanceDue(): void
	{
		$today     = TickTock::getDate();
		$contracts = KrFactory::getListModel('contracts')->getBalanceDue($today);
		foreach ($contracts as $c) {
			$contract                 = new stdClass();
			$contract->id             = $c->id;
			$contract->booking_status = 30;
			$contract->updated_at     = TickTock::getTS();
			KrFactory::update('contract', $contract);
		}
	}

	/**
	 * Cancel a contract
	 *
	 * @param  object  $contract  Contract row
	 * @param  string  $trigger   Email trigger
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	private function cancelContract(object $contract, string $trigger): void
	{
		$item            = KrFactory::getAdminModel('contract')->getItem($contract->id);
		$contractSession = new KrSession\Contract();
		$contractData    = $contractSession->updateData($item);

		try {
			$hub = new Hub($contractData);
			$hub->setValue('email_trigger', $trigger);
			$actions = ['cancel',
			            'servicequeue',
			            'emails'
			];
			$hub->action($actions);
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());
		}
	}

	/**
	 * Cancel expired booking requests
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	private function cancelExpiredRequests(): void
	{
		$this->checkSecret();

		$contracts = KrFactory::getListModel('contracts')->getExpiredRequests();
		if (is_countable($contracts)) {
			foreach ($contracts as $c) {
				$expiry = TickTock::modifyHours($c->created_at, $c->on_request);
				if (TickTock::getTS() > $expiry) {
					self::cancelContract($c, 'BOOKREQUESTCANCELEXPIRED');
				}
			}
		}
	}

	/**
	 * Cancel contracts where deposit has not been received
	 * by 1 day after expiry date
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function cancelNoDeposit(): void
	{
		$today    = TickTock::getDate();
		$trigger  = 'BOOKCANCELNODEP';
		$triggers = self::getCronTriggers($trigger);
		if (is_countable($triggers) && count($triggers)) {
			$expiry_date = TickTock::modifyDays($today, 1, '-');
			$contracts   = KrFactory::getListModel('contracts')->getDueExpire($expiry_date);
			if (is_countable($contracts)) {
				foreach ($contracts as $c) {
					self::cancelContract($c, 'BOOKCANCELNODEP');
				}
			}
		}
	}

	/**
	 * Test that secret is valid
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function checkSecret(): void
	{
		$this->test = $this->input->getInt('test', 0);
		$secret     = $this->input->getString('secret', '');

		if (!$this->test && $secret != KrMethods::getCfg('secret')) {
			throw new RuntimeException('Secret does not match');
		}
	}

	/**
	 * Send emails for updated arrival info past notification date
	 * for any additional chnages accumulated over the day from guest or agent input
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function dailyArrivalInfo(): void
	{
		$sent    = [];
		$actions = KrFactory::getListModel('emailactions')->getItems();
		if (is_countable($actions)) {
			foreach ($actions as $a) {
				if (!is_null($a->contract_tag) && !in_array($a->contract_id, $sent)) {
					$email = new ContractEmail($a->email_trigger);
					$email->sendTheEmails($a->contract_id);
					$sent[] = $a->contract_id;
				}
			}

			KrFactory::truncate('email_action');
		}
	}

	/**
	 * Delete outdated service log and queue records
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	private function dailyCleanup(): void
	{
		self::deleteServiceLog();
		self::deleteServiceQueue();
	}

	/**
	 * Delete all data for trashed properties
	 * Pending trash have custom state of -99
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.0.0
	 */
	private function deleteProperties(): void
	{
		$ids = KrFactory::getListModel('properties')->getIds(-99);
		if (!is_countable($ids) || !count($ids)) {
			return;
		}

		$userSession            = new KrSession\User();
		$userData               = $userSession->getData();
		$userData->access_level = 40;
		$userSession->setData($userData);

		foreach ($ids as $id) {
			$Delete = new Delete($id);
			$Delete->deleteTheProperty();
		}

		KrMethods::cleanCache('com_knowres_contracts');
	}

	/**
	 * Delete old service logs
	 * Delete success over 14 days old
	 * Delete unsuccessful over 56 days old
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	private function deleteServiceLog(): void
	{
		$today = TickTock::getDate();

		$date = TickTock::modifyDays($today, 14, '-');
		KrFactory::getAdminModel('servicelog')::deleteOldLogs($date);

		$date = TickTock::modifyDays($today, 56, '-');
		KrFactory::getAdminModel('servicelog')::deleteOldLogs($date, 0);
	}

	/**
	 * Delete old service queue over 72 days old
	 *
	 * @throws Exception
	 * @throws Exception
	 * @since  3.1.0
	 */
	private function deleteServiceQueue(): void
	{
		$today = TickTock::getDate();
		$date  = TickTock::modifyDays($today, 72, '-');
		ServicequeueModel::deleteOldQueue($date);
	}

	/**
	 * Delete unpublished contracts where no payment has been made online
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function deleteUnpublished(): void
	{
		$rows = KrFactory::getListModel('contracts')->getStrays();
		if (!is_countable($rows) || !count($rows)) {
			return;
		}

		foreach ($rows as $r) {
			try {
				KrFactory::getAdminModel('contract')::deleteAll($r->id, $r->guest_id);
			} catch (Exception|RuntimeException $e) {
				Logger::logMe($e->getMessage());
			}
		}
	}

	/**
	 * Get trigger if exists
	 *
	 * @param  string  $trigger_actual  Email trigger
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	private function getCronTriggers(string $trigger_actual): mixed
	{
		return KrFactory::getListModel('emailtriggers')->getTriggers($trigger_actual);
	}

	/**
	 * Get the due date relative to today
	 * Before = true - due date is x days in future
	 * Before = false - due date is x days in past
	 *
	 * @param  string  $date    Due date
	 * @param  int     $days    #Days
	 * @param  bool    $before  Before (true)  or After (false)
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	private function getDueDate(string $date, int $days, bool $before): string
	{
		if ($before) {
			$due_date = TickTock::modifyDays($date, $days);
		}
		else {
			$due_date = TickTock::modifyDays($date, $days, '-');
		}

		return $due_date;
	}

	/**
	 * Process payments due to owners
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	private function ownerPayments(): void
	{
		$params = KrMethods::getParams();
		if ($params->get('owner_payments', false)) {
			$paymentsQueue = new PaymentsQueue();
			$paymentsQueue->process();
		}
	}

	/**
	 * Send admin emails set up for dates and booking status
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function sendCustomByDate(): void
	{
		$trigger  = 'CUSTOMBYDATE';
		$triggers = self::getCronTriggers($trigger);
		if (is_countable($triggers) && count($triggers)) {
			foreach ($triggers as $t) {
				$due_date          = self::getDueDate(TickTock::getDate(), $t->days, $t->days_before);
				$t->booking_status = Utility::decodeJson($t->booking_status, true);
				$contracts         = KrFactory::getListModel('contracts')
				                              ->getCronTrigger($t->trigger_cron, $due_date, $t->booking_status);

				if (is_countable($contracts) && count($contracts)) {
					$email = new ContractEmail($trigger, $t->id);
					foreach ($contracts as $c) {
						$email->sendTheEmails($c->id);
					}
				}
			}
		}
	}

	/**
	 * Send emails only
	 *
	 * @param  string  $trigger         Email trigger
	 * @param  string  $model_function  Function to retrieve data
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpSameParameterValueInspection
	 */
	private function sendEmailsOnly(string $trigger, string $model_function): void
	{
		$triggers = self::getCronTriggers($trigger);
		if (is_countable($triggers) && count($triggers)) {
			foreach ($triggers as $t) {
				$due_date  = self::getDueDate(TickTock::getDate(), $t->days, $t->days_before);
				$contracts = KrFactory::getListModel('contracts')->{$model_function}($due_date);
				if (is_countable($contracts) && count($contracts)) {
					$email = new ContractEmail($trigger);
					foreach ($contracts as $c) {
						$email->sendTheEmails($c->id);
					}
				}
			}
		}
	}

	/**
	 * Process review request / reminder
	 *
	 * @param  string  $trigger   Email trigger
	 * @param  bool    $reminder  True for review reminder
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function sendReviewRequests(string $trigger, bool $reminder = false): void
	{
		$triggers = self::getCronTriggers($trigger);
		if (is_countable($triggers) && count($triggers)) {
			foreach ($triggers as $t) {
				$due_date  = self::getDueDate(TickTock::getDate(), $t->days, $t->days_before);
				$contracts = KrFactory::getListModel('contracts')->getDueReviews($due_date, $reminder);
				if (is_countable($contracts) && count($contracts)) {
					$email = new ContractEmail($trigger);
					foreach ($contracts as $c) {
						$email->sendTheEmails($c->id);
						if (!$reminder) {
							$contract                   = new stdClass();
							$contract->id               = $c->id;
							$contract->review_requested = 1;
							KrFactory::update('contract', $contract);
						}
					}
				}
			}
		}
	}
}