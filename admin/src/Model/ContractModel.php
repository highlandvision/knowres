<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Table\Table;
use RuntimeException;
use UnexpectedValueException;

use function count;
use function is_countable;
use function is_null;
use function mt_rand;

/**
 * Knowres contract model
 *
 * @since 1.0.0
 */
class ContractModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.contract';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_CONTRACT_TITLE';

	/**
	 * Delete contract and associated data
	 * Delete the guest if only for this contract
	 *
	 * @param  int  $id        ID of contract
	 * @param  int  $guest_id  ID of guest
	 *
	 * @throws Exception
	 * @since  2.3.0
	 * @return void
	 */
	public static function deleteAll(int $id, int $guest_id = 0): void
	{
		if (!$id) {
			throw new RuntimeException('Contract ID not received for Delete');
		}

		$guests = 0;
		if ($guest_id) {
			$guests = KrFactory::getListModel('contracts')->getCountForGuest($guest_id);
		}

		try {
			$db = KrFactory::getDatabase();
			$db->transactionStart();

			$conditions = [$db->qn('contract_id') . '=' . $id];
			KrFactory::deleteData('contract_fee', $conditions);
			KrFactory::deleteData('contract_guestdata', $conditions);
			KrFactory::deleteData('contract_note', $conditions);
			KrFactory::deleteData('contract_payment', $conditions);
			KrFactory::deleteData('owner_payment', $conditions);
			KrFactory::deleteData('service_log', $conditions);
			KrFactory::deleteData('service_xref', $conditions);

			$conditions = [$db->qn('id') . '=' . $id];
			KrFactory::deleteData('contract', $conditions);
			if ($guests == 1) {
				$conditions = [$db->qn('id') . '=' . $guest_id];
				KrFactory::deleteData('guest', $conditions);
			}

			$db->transactionCommit();
		} catch (Exception $e) {
			$db->transactionRollback();

			throw $e;
		}
	}

	/**
	 * Generate 8 digit contract tag
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return string
	 */
	public static function generateTag(): string
	{
		$tag         = '';
		$keeplooking = true;
		while ($keeplooking) {
			$tag = mt_rand(10000000, 99999999);
			if (!KrFactory::getListModel('contracts')::checkTag($tag)) {
				$keeplooking = false;
			}
		}

		return $tag;
	}

	/**
	 * Get the currenct contract balance
	 *
	 * @param  float  $contract_total  Contract total
	 * @param  mixed  $fees            Contract fees
	 * @param  mixed  $payments        Contract payments
	 *
	 * @since  4.0.0
	 * @return float
	 */
	public static function getBalance(float $contract_total, mixed $fees, mixed $payments): float
	{
		$fee_total = 0;
		$confirmed = 0;

		if (is_countable($fees) && count($fees)) {
			foreach ($fees as $f) {
				$fee_total += $f->value;
			}
		}

		if (is_countable($payments) && count($payments)) {
			foreach ($payments as $p) {
				if ($p->confirmed) {
					$confirmed += $p->amount;
				}
			}
		}

		return $contract_total + $fee_total - $confirmed;
	}

	/**
	 * Get current contract balance
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  1.0.0
	 * @return mixed
	 */
	public static function getCurrentBalance(int $contract_id): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('c.contract_total') . ' +  IFNULL(SUM(' . $db->qn('cf.value') . ') ,0) - IFNULL(SUM('
		               . $db->qn('cp.base_amount') . '),0) AS balance')
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->join('LEFT',
		             $db->qn('#__knowres_contract_fee', 'cf') . ' ON '
		             . $db->qn('cf.contract_id') . '=' . $contract_id)
		      ->join('LEFT',
		             $db->qn('#__knowres_contract_payment', 'cp') . ' ON '
		             . $db->qn('cp.contract_id') . '=' . $contract_id . ' AND '
		             . $db->qn('cp.state') . '=1')
		      ->where($db->qn('c.id') . '=' . $contract_id);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get booking status options for filters etc
	 *
	 * @since  1.0.0
	 * @return array
	 */
	public function getBookingStatusOptions(): array
	{
		$tmp     = [];
		$tmp[0]  = KrMethods::plain('COM_KNOWRES_SELECT_BOOKING_STATUS');
		$tmp[1]  = Utility::getBookingStatus(1);
		$tmp[5]  = Utility::getBookingStatus(5);
		$tmp[10] = Utility::getBookingStatus(10);
		$tmp[30] = Utility::getBookingStatus(30);
		$tmp[35] = Utility::getBookingStatus(35);
		$tmp[39] = Utility::getBookingStatus(39);
		$tmp[40] = Utility::getBookingStatus(40);

		return $tmp;
	}

	/**
	 * Method to get the record form.
	 *
	 * @param  array    $data         An optional array of data for the form to interogate.
	 * @param  bool     $loadData     True if the form is to load its own data (default case), false if not.
	 * @param  ?string  $source       The form name if required.
	 * @param  int      $property_id  ID of property if required fields to be set.
	 *
	 * @throws Exception
	 * @since  1.0
	 * @return Form|false    A Form object on success, false on failure
	 */
	public function getForm($data = [],
		$loadData = true,
		                    ?string $source = 'contract',
		                    int $property_id = 0): Form|false
	{
		$form = parent::getForm($data, $loadData, $source);

		if ($property_id) {
			$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($property_id);
			if (is_countable($settings) && count($settings)) {
				$form = $this->setFormRequired($form, $settings);
			}
		}

		return $form;
	}

	/**
	 * Read and process the item.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item) {
			$item->adjustments = Utility::decodeJson($item->adjustments, true);
			$item->discounts   = Utility::decodeJson($item->discounts, true);
			$item->extras      = Utility::decodeJson($item->extras, true);
			$item->child_ages  = Utility::decodeJson(is_null($item->child_ages) ? '[]' : $item->child_ages, true);
			$item->guest_types = Utility::decodeJson($item->guest_types, true);
			$item->nightly     = Utility::decodeJson($item->nightly, true);
			$item->rooms       = Utility::decodeJson($item->rooms, true);
			$item->taxes       = Utility::decodeJson($item->taxes, true);

			$item->property_name = '';
			if (isset($item->property_id) && $item->property_id != 0) {
				$property            = KrFactory::getAdminModel('property')->getItem((int) $item->property_id);
				$item->property_name = $property->property_name;
				$item->property_area = $property->property_area;
				$item->region_name   = $property->region_name;
				$item->country_name  = $property->country_name;
				$item->checkin_time  = $property->checkin_time;
				$item->checkout_time = $property->checkout_time;
			}

			$item->agent_name = '';
			if ($item->agent_id > 0) {
				$agent            = KrFactory::getAdminModel('agent')->getItem((int) $item->agent_id);
				$item->agent_name = $agent->name ?? $item->agent_id;
			}

			$item->agency_name      = '';
			$item->agency_telephone = '';
			$item->agency_email     = '';
			if ($item->manager_id > 0) {
				$result                 = KrFactory::getAdminModel('manager')->getItem((int) $item->manager_id);
				$item->agency_name      = $result->agency_name ?? $item->agency_id;
				$item->agency_telephone = $result->agency_telephone ?? '';
				$item->agency_email     = $result->agency_email ?? '';
			}

			$item->service_name = '';
			if (!empty($item->service_id)) {
				$service = KrFactory::getAdminModel('service')->getItem((int) $item->service_id);
				if (!empty($service->name)) {
					$item->service_name = $service->name;
				}
			}

			$item->guest_name = '';
			$item->user_id    = 0;
			if (isset($item->guest_id) && $item->guest_id != 0) {
				$guest                         = KrFactory::getAdminModel('guest')->getItem((int) $item->guest_id);
				$item->guest_name              = $guest->name ?? '';
				$item->guest_firstname         = $guest->firstname ?? '';
				$item->guest_surname           = $guest->surname ?? '';
				$item->guest_country_id        = $guest->country_id ?? 0;
				$item->guest_mobile            = $guest->mobile ?? '';
				$item->guest_mobile_country_id = $guest->mobile_country_id ?? 0;
				$item->user_id                 = $guest->user_id ?? 0;
			}

			if (isset($item->created_by)) {
				$item->created_by_name = KrMethods::getUser($item->created_by)->name;
			}

			$item->guestdata_id = KrFactory::getListModel('contractguestdatas')->getByContractId($item->id);
		}

		return $item;
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since   3.0.0
	 * @return  bool  True if allowed to delete the record. Defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();
		if ($userSession->getAccessLevel() == 40) {
			return true;
		}
		else {
			return Factory::getUser()->authorise('core.delete', $this->option);
		}
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.contract.data', []);
		if (empty($data)) {
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table instance
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	#[NoReturn] protected function prepareTable($table): void
	{
		if (!$table->black_booking) {
			$hash                           = $table->tag . $table->guest_id;
			$table->qkey                    = hash('ripemd160', $hash);
		}

		if ($table->cancelled_timestamp == '0000-00-00 00:00:00' || $table->cancelled_timestamp == '') {
			$table->cancelled_timestamp = null;
		}

		if (empty($table->id)) {
			if (empty($table->created_at)) {
				$table->created_at = TickTock::getTS();
			}
			$table->created_by = KrMethods::getUser()->id;
		}
		else {
			$table->updated_at       = TickTock::getTS();
			$table->updated_by       = KrMethods::getUser()->id;
			$table->checked_out      = null;
			$table->checked_out_time = null;
		}
	}

	/**
	 * Set the required fields for the manager guest form (from settings)
	 *
	 * @param  Form   $form      Guest form
	 * @param  array  $settings  Property settings
	 *
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return Form
	 */
	protected function setFormRequired(Form $form, array $settings): Form
	{
		$form = $this->setAttribute($settings['manager_requiredfields_balance_days'], 'balance_days', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_block_note'], 'block_note', $form);
		$form = $this->setAttribute($settings['manager_requiredfields_expiry_days'], 'expiry_days', $form);
		$this->setAttribute($settings['manager_requiredfields_net_price'], 'net_price', $form);

		return $form;
	}
}