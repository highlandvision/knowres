<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\TickTock;
use Joomla\Database\Exception\ExecutionFailureException;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function array_map;
use function count;
use function implode;
use function is_numeric;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class ContractpaymentsModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param  array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct($config = [])
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'contract_id', 'a.contract_id',
				'service_id', 'a.service_id',
				'payment_date', 'a.payment_date',
				'amount', 'a.amount',
				'rate', 'a.rate',
				'base_amount', 'a.base_amount',
				'currency', 'a.currency',
				'payment_ref', 'a.payment_ref',
				'note', 'a.note',
				'confirmed', 'a.confirmed',
				'service_ref', 'a.service_ref',
				'actioned', 'a.actioned',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'contract_tag', 'service_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Check for any pending payments from PayPal
	 *
	 * @param  int     $contract_id  ID of contract
	 * @param  string  $payment_ref  Payment reference
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function checkForPending(int $contract_id, string $payment_ref): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_contract_payment'))
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('payment_date') . ' IS NULL')
		      ->where($db->qn('payment_ref') . '=' . $db->q($payment_ref))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('confirmed') . '=0')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get payment export data for csv
	 *
	 * @param  array  $data  Filter values
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function exportPayments(array $data): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));

		$query->select($db->qn(['c.tag',
		                        'c.cancelled',
		                        'c.arrival',
		                        'c.departure'
		]));

		$query->select($db->qn('c.currency', 'base_currency'))
		      ->select($db->qn('p.property_name'))
		      ->select($db->qn('ag.name', 'agency_name'))
		      ->select($db->qn('i.plugin', 'service_plugin'))
		      ->select($db->qn('r.id', 'region_id'));

		$query->from($db->qn('#__knowres_contract_payment', 'a'));

		$query->join('LEFT',
			$db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('a.contract_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_agency', 'ag') . 'ON' . $db->qn('ag.id') . '=' . $db->qn('c.agency_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_region', 'r') . 'ON' . $db->qn('r.id') . '=' . $db->qn('p.region_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_service', 'i') . 'ON' . $db->qn('i.id') . '=' . $db->qn('a.service_id'));

		$query = self::filterProperty($db, $query, $data['property_id']);

		$filter_region_id = $data['region_id'];
		if ($filter_region_id)
		{
			if (is_numeric($filter_region_id))
			{
				$query->where('p.region_id = ' . (int) $filter_region_id);
			}
		}

		$filter_service_id = $data['service_id'];
		if ($filter_service_id)
		{
			if (is_numeric($filter_service_id))
			{
				$query->where('a.service_id = ' . (int) $filter_service_id);
			}
		}

		$filter_agency_id = $data['agency_id'];
		if ($filter_agency_id)
		{
			if (is_numeric($filter_agency_id))
			{
				$query->where($db->qn('c.agency_id') . '=' . (int) $filter_agency_id);
			}
		}

		if (!$data['cancelled'])
		{
			$query->where($db->qn('c.cancelled') . ' = 0');
		}

		if (!$data['datetype'])
		{
			$ts_a = $data['valid_from'] . ' 00:00:00';
			$ts_d = $data['valid_to'] . ' 23:59:59';
			$query->where($db->qn('a.created_at') . ' >= ' . $db->q($ts_a));
			$query->where($db->qn('a.created_at') . ' <= ' . $db->q($ts_d));
		}
		else
		{
			$query->where($db->qn('a.payment_date') . ' >= ' . $db->q($data['valid_from']));
			$query->where($db->qn('a.payment_date') . ' <= ' . $db->q($data['valid_to']));
		}

		$query->where($db->qn('c.black_booking') . '=0')
		      ->where($db->qn('c.state') . '=1')
		      ->order('a.id');

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get data for the overview
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getOverview(): mixed
	{
		$yesterdayTS = TickTock::modifyDays('now', 1, '-');

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'cp.id', 'cp.contract_id',
			'cp.payment_date', 'cp.amount', 'cp.rate', 'cp.base_amount',
			'c.tag', 'c.booking_status', 'c.property_id',
			'c.currency', 'c.contract_total',
			'p.id', 'p.property_name', 'g.firstname', 'g.surname',
			's.plugin'
		]));

		$query->from($db->qn('#__knowres_contract_payment', 'cp'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('cp.contract_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('g.id') . '=' . $db->qn('c.guest_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_service', 's') . 'ON' . $db->qn('s.id') . '=' . $db->qn('cp.service_id'))
		      ->where($db->qn('cp.confirmed') . '=1')
		      ->where($db->qn('cp.created_at') . '>' . $db->q($yesterdayTS))
		      ->where($db->qn('cp.state') . '=1')
		      ->order($db->qn('cp.created_at'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get unprocessed payment rows
	 *
	 * @param  int  $agency_id  ID of agency
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPaymentQueue(int $agency_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'cp.*'))
		      ->from($db->qn('#__knowres_contract_payment', 'cp'))
		      ->select($db->qn('c.arrival', 'arrival'))
		      ->select($db->qn('c.booking_status', 'booking_status'))
		      ->select($db->qn('c.tag', 'tag'))
		      ->select($db->qn('c.departure', 'departure'))
		      ->select($db->qn('c.deposit', 'deposit'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('cp.contract_id'))
		      ->select($db->qn('p.owner_id', 'owner_id'))
		      ->select($db->qn('p.property_name', 'property_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('c.property_id') . '=' . $db->qn('p.id'))
		      ->select($db->qn('s.plugin', 'plugin'))
		      ->join('LEFT',
			      $db->qn('#__knowres_service', 's') . 'ON' . $db->qn('s.id') . '=' . $db->qn('cp.service_id'))
		      ->select($db->qn('o.commission', 'commission'))
		      ->select($db->qn('o.days', 'days'))
		      ->select($db->qn('o.pay_deposit', 'pay_deposit'))
		      ->select($db->qn('o.deposit_days', 'deposit_days'))
		      ->select($db->qn('o.payment_schedule', 'schedule'))
		      ->select($db->qn('o.whopays', 'whopays'))
		      ->join('LEFT',
			      $db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('p.owner_id'))
		      ->select($db->qn('p.owner_id', 'owner_id'))
		      ->where($db->qn('cp.state') . '=1')
		      ->where($db->qn('cp.actioned') . '=0')
		      ->where($db->qn('cp.confirmed') . '=1');

		if ($agency_id)
		{
			$query->where($db->qn('c.agency_id') . '=' . $agency_id);
		}

		$query->order($db->qn('cp.id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get total of all payments for contract
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return ?float
	 */
	public function getPaymentTotal(int $contract_id): ?float
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('SUM(base_amount) AS total')
		      ->from('#__knowres_contract_payment')
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('state') . '=1');

		$db->setQuery($query);

		$value = $db->loadResult();
		if (is_null($value))
		{
			$value = 0;
		}

		return (float) $value;
	}

	/**
	 * Get payments for contract
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getForContract(int $contract_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_contract_payment', 'a'))
		      ->select($db->qn('c.tag', 'contract_tag'))
		      ->select($db->qn('c.currency', 'contract_currency'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('a.contract_id'))
		      ->select($db->qn('i.name', 'service_name'))
		      ->select($db->qn('i.plugin', 'service_plugin'))
		      ->join('LEFT', $db->qn('#__knowres_service', 'i') . 'ON' . $db->qn('i.id') . '=' . ('a.service_id'))
		      ->where($db->qn('a.contract_id') . '=' . $contract_id)
		      ->where($db->qn('a.state') . '=1')
		      ->order($db->qn('id'));

		$db->setQuery($query);
		return $db->loadObjectList();
	}

	/**
	 * Get any pending payments
	 *
	 * @param  int  $contract_id  ID of contract
	 * @param  int  $service_id   ID of service
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPending(int $contract_id, int $service_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_contract_payment', 'a'))
		      ->where($db->qn('a.state') . '=0')
		      ->where($db->qn('a.contract_id') . '=' . $contract_id)
		      ->where($db->qn('a.service_id') . '=' . $service_id)
		      ->where($db->qn('a.service_ref') . '<>' . $db->q(''))
		      ->order($db->qn('a.id') . ' DESC')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get payment totals
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return ?object
	 */
	public function getTotals(int $contract_id): ?object
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('SUM(CASE WHEN confirmed = 1 THEN base_amount ELSE 0 END) AS confirmed')
		      ->select('SUM(base_amount) AS total')
		      ->from($db->qn('#__knowres_contract_payment'))
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('state') . '=1')
		      ->group($db->qn('contract_id'));
		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Update actioned payments
	 *
	 * @param  array  $ids  Array of IDs to be updated
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.2.0
	 */
	public function updateActionedPayments(array $ids): void
	{
		if (!is_countable($ids) || !count($ids))
		{
			return;
		}

		try
		{
			$db    = $this->getDatabase();
			$query = $db->getQuery(true);

			$db->transactionStart();

			$query->update($db->qn('#__knowres_contract_payment'))
			      ->set($db->qn('actioned') . '=1')
			      ->set($db->qn('actioned_at') . '=' . $db->q(TickTock::getTS()))
			      ->where($db->qn('id') . '=' . implode(' OR ' . $db->qn('id') . '=', $ids));
			$db->setQuery($query);
			$db->execute();

			$db->transactionCommit();
		}
		catch (ExecutionFailureException $e)
		{
			$db->transactionRollback();
			throw $e;
		}
	}

	/**
	 * Unset agent payments that have been amended
	 *
	 * @param  int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function unsetPseudoPayments(int $contract_id): void
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		try
		{
			$db->transactionStart();
			$query = $db->getQuery(true);

			$fields     = [
				$db->qn('state') . '=0',
				$db->qn('confirmed') . '=0'
			];
			$conditions = [
				$db->qn('contract_id') . '=' . $contract_id
			];

			$query->update($db->qn('#__knowres_contract_payment'))
			      ->set($fields)
			      ->where($conditions);

			$db->setQuery($query);
			$db->execute();

			$db->transactionCommit();
		}
		catch (ExecutionFailureException $e)
		{
			$db->transactionRollback();
			throw $e;
		}
	}

	/**
	 * Update existing payment and fee records to actioned for new Xero service
	 *
	 * @param  int  $agency_id  ID of agency
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.1.0
	 */
	public function updateForXero(int $agency_id): void
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$fieldlist = $db->qn(array('p.contract_id'));
		$query->select($fieldlist)
		      ->from($db->qn('#__knowres_contract_payment', 'p'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . ' ON ' . $db->qn('c.id') . '=' . $db->qn('p.contract_id'))
		      ->where($db->qn('p.actioned') . '=1')
		      ->where($db->qn('c.agency_id') . '=' . $agency_id)
		      ->where($db->qn('p.actioned_at') . '=' . $db->q('0000-00-00 00:00:00'))
		      ->where($db->qn('p.state') . '=1')
		      ->where($db->qn('p.confirmed') . '=1');

		$db->setQuery($query);
		$cids = $db->loadColumn();
		if (is_countable($cids) && count($cids))
		{
			try
			{
				$db->transactionStart();

				$query = $db->getQuery(true)
				            ->update($db->qn('#__knowres_contract_payment'))
				            ->set($db->qn('actioned') . '=1')
				            ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $cids)) . ')');
				$db->setQuery($query);
				$db->execute();

				$query = $db->getQuery(true)
				            ->update($db->qn('#__knowres_contract_fee'))
				            ->set($db->qn('actioned') . ' = 1')
				            ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $cids)) . ')');

				$db->setQuery($query);
				$db->execute();
			}
			catch (ExecutionFailureException $e)
			{
				KrMethods::message(KrMethods::plain('Payment and Fee records could not be set to actioned for Xero initialise. Please contact support'),
					'error');
			}
		}
	}

	/**
	 * Reset actioned flag on payments and fess for selected contracts
	 *
	 * @param  array  $ids  Contract ids for update
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.1.0
	 * @return bool
	 */
	public function updateXeroBatch(array $ids): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$fieldlist    = $db->qn(array('contract_id'));
		$fieldlist[0] = 'DISTINCT ' . $fieldlist[0];

		$query->select($fieldlist)
		      ->from($db->qn('#__knowres_contract_payment'))
		      ->where($db->qn('actioned') . '  = 1')
		      ->where($db->qn('actioned_at') . ' = ' . $db->q('0000-00-00 00:00:00'))
		      ->where($db->qn('state') . ' = 1')
		      ->where($db->qn('confirmed') . ' = 1')
		      ->where($db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');

		$db->setQuery($query);
		$contracts = $db->loadColumn();

		if (!count($contracts))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'), 'info');

			return true;
		}

		try
		{
			$db->transactionStart();
			$query = $db->getQuery(true);

			$fields     = array(
				$db->qn('actioned') . ' = 0'
			);
			$conditions = array(
				$db->qn('contract_id') . ' IN (' . implode(',', array_map('intval', $contracts)) . ')',
			);

			$query->update($db->qn('#__knowres_contract_payment'))
			      ->set($fields)
			      ->where($conditions);

			$db->setQuery($query);
			$db->execute();

			$query = $db->getQuery(true);

			$query->update($db->qn('#__knowres_contract_fee'))
			      ->set($fields)
			      ->where($conditions);

			$db->setQuery($query);
			$db->execute();

			$db->transactionCommit();
		}
		catch (ExecutionFailureException $e)
		{
			KrMethods::message(KrMethods::plain($e->getMessage()), 'error');
			KrMethods::message(KrMethods::plain('KrFactory error, please try again or contact support'), 'error');

			return false;
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'), 'info');

		return true;
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a .*'));
		$query->from($db->qn('#__knowres_contract_payment', 'a'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('c.tag AS contract_tag, c.currency AS contract_currency');
		$query->join('LEFT', '#__knowres_contract AS c ON c.id = a.contract_id');
		$query->select('i.name AS service_name, i.plugin AS service_plugin');
		$query->join('LEFT', '#__knowres_service AS i ON i.id = a.service_id');
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where('a.state = ' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '= 1');
		}

		$filter_contract_id = $this->state->get('filter.contract_id');
		if ($filter_contract_id)
		{
			$query->where($db->qn('a.contract_id') . '= ' . (int) $filter_contract_id);
		}

		$filter_service_id = $this->state->get("filter.service_id");
		if ($filter_service_id)
		{
			$query->where($db->qn('a.service_id') . '= ' . (int) $filter_service_id);
		}

		$filter_payment_ref = $this->state->get("filter.payment_ref");
		if ($filter_payment_ref)
		{
			$query->where($db->qn('a.payment_ref') . '= ' . $db->q($filter_payment_ref));
		}

		$filter_currency = $this->state->get("filter.currency");
		if ($filter_currency)
		{
			$query->where($db->qn('a.currency') . '= ' . $db->q($filter_currency));
		}

		$filter_payment_date = $this->state->get("filter.payment_date");
		if ($filter_payment_date)
		{
			$query->where($db->qn('a.payment_date') . ' >= ' . $db->q($filter_payment_date));
		}

		$confirmed = $this->getState('filter.confirmed');
		if (is_numeric($confirmed))
		{
			$query->where($db->qn('a.confirmed') . '=' . (int) $confirmed);
		}

		$actioned = $this->getState('filter.actioned');
		if (is_numeric($actioned))
		{
			$query->where($db->qn('a.actioned') . '=' . (int) $actioned);
		}

		$search = $this->getState('filter.search');
		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where('a.id = ' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->q('%' . $db->escape(trim($search), true) . '%');
				$query->having('( a.payment_ref LIKE ' . $search . ' OR ( contract_tag LIKE ' . $search . ' ) )');
			}
		}

		$orderCol  = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');
		if ($orderCol && $orderDirn)
		{
			$query->order($db->qn($orderCol) . ' ' . $orderDirn);
		}

		return $query;
	}

	/**
	 * Method to get a store id based on model configuration state.
	 * This is necessary because the model is used by the component and
	 * different modules that might need different sets of data or different
	 * ordering requirements.
	 *
	 * @param  string  $id  A prefix for the store id.
	 *
	 * @since  1.0.0
	 * @return string   A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.contract_id');
		$id .= ':' . $this->getState('filter.service_id');
		$id .= ':' . $this->getState('filter.payment_date');
		$id .= ':' . $this->getState('filter.payment_ref');
		$id .= ':' . $this->getState('filter.currency');
		$id .= ':' . $this->getState('filter.confirmed');
		$id .= ':' . $this->getState('filter.action');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering   Field to order by
	 * @param  string  $direction  Direction to order
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.payment_date', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));

		$this->setState('filter.contract_id',
			$this->getUserStateFromRequest($this->context . '.filter.contract_id', 'filter_contract_id', 0, 'integer'));

		$this->setState('filter.service_id',
			$this->getUserStateFromRequest($this->context . '.filter.service_id', 'filter_service_id', 0, 'integer'));

		$this->setState('filter.payment_date',
			$this->getUserStateFromRequest($this->context . '.filter.payment_date', 'filter_payment_date',
				TickTock::modifyMonths('now', 1, '-'), 'string'));

		$this->setState('filter.payment_ref',
			$this->getUserStateFromRequest($this->context . '.filter.payment_ref', 'filter_payment_ref', '', 'string'));

		$this->setState('filter.currency',
			$this->getUserStateFromRequest($this->context . '.filter.currency', 'filter_currency', '', 'string'));

		$this->setState('filter.confirmed',
			$this->getUserStateFromRequest($this->context . '.filter.confirmed', 'filter_confirmed', '', 'string'));

		$this->setState('filter.actioned',
			$this->getUserStateFromRequest($this->context . '.filter.actioned', 'filter_actioned', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}