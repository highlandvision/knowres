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
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\TickTock;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Owner payments list model.
 *
 * @since 3.3.1
 */
class OwnerpaymentsModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
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
				'owner_id', 'a.owner_id',
				'payment_date', 'a.payment_date',
				'confirmed', 'a.confirmed',
				'type', 'a.type',
				'amount', 'a.amount',
				'calculated', 'a.calculated',
				'state', 'a.state',
				'contract_tag', 'contract_currency', 'owner_name', 'property_id', 'property_name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get owner payment data for csv
	 *
	 * @param   array  $data  Filter data
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 * @return array
	 */
	public function exportPayments(array $data): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_owner_payment', 'a'));

		$query->select($db->qn(['c.tag', 'c.cancelled', 'c.currency', 'c.property_id',
		                        'c.room_total', 'c.net_price', 'c.arrival', 'c.departure']))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('a.contract_id'));

		$query->select($db->qn('p.property_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'));

		$query->select($db->qn('o.name', 'owner_name'))
		      ->select($db->qn('o.commission', 'owner_commission'))
		      ->select($db->qn('o.payment_schedule', 'owner_schedule'))
		      ->select($db->qn('o.business', 'business'))
		      ->select($db->qn('o.iban', 'iban'))
		      ->join('LEFT',
			      $db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('a.owner_id'));

		if (!empty($filter_owner_id))
		{
			$filter_owner_id = $data['owner_id'];

			if (is_numeric($filter_owner_id))
			{
				$query->where($db->qn('a.owner_id') . '=' . (int) $filter_owner_id);
			}
			else if (is_array($filter_owner_id))
			{
				$query->where($db->qn('a.owner_id') . 'IN (' . implode(',', array_map('intval', $filter_owner_id))
					. ')');
			}
			else if (is_string($filter_owner_id) && strlen($filter_owner_id) > 0)
			{
				$ids = explode(',', $filter_owner_id);
				$query->where($db->qn('a.owner_id') . 'IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		$query = self::filterProperty($db, $query, $data['property_id']);

		if ((int) $data['confirmed'] < 2)
		{
			$query->where($db->qn('a.confirmed') . '=' . (int) $data['confirmed']);
		}

		$query->where($db->qn('a.payment_date') . '>=' . $db->q($data['valid_from']))
		      ->where($db->qn('a.payment_date') . '<=' . $db->q($data['valid_to']))
		      ->where($db->qn('c.state') . '=1')
		      ->order('a.payment_date');

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get data for the overview
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return array
	 */
	public function getOverview(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['op.id', 'op.contract_id', 'op.payment_date', 'op.amount', 'op.type',
		                        'c.tag', 'c.currency', 'c.contract_total', 'c.property_id',
		                        'p.property_name', 'o.name']));

		$query->from($db->qn('#__knowres_owner_payment', 'op'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('op.contract_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('op.owner_id'))
		      ->where($db->qn('op.confirmed') . '=0')
		      ->where($db->qn('op.state') . '=1')
		      ->order($db->qn('op.id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get total of all payments for contract
	 *
	 * @param   int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 * @return ?float
	 */
	public function getTotalForContract(int $contract_id): ?float
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('SUM(amount) AS total')
		      ->from('#__knowres_owner_payment')
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('confirmed') . '=1')
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
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  3.3.1
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a .*'));

		$query->from($db->qn('#__knowres_owner_payment', 'a'))
		      ->select($db->qn('c.tag', 'contract_tag'))
		      ->select($db->qn('c.currency', 'currency'))
		      ->select($db->qn('c.net_price', 'net_price'))
		      ->select($db->qn('c.room_total', 'room_total'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . ' ON ' . $db->qn('c.id') . '=' . $db->qn('a.contract_id'))
		      ->select($db->qn('p.id', 'property_id'))
		      ->select($db->qn('p.property_name', 'property_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . ' ON ' . $db->qn('c.property_id') . '=' . $db->qn('p.id'))
		      ->select($db->qn('o.name', 'owner_name'))
		      ->join('LEFT', $db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('a.owner_id'));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$owner_id = $this->getState('filter.owner_id');
		if ($owner_id)
		{
			$query->where($db->qn('a.owner_id') . '=' . (int) $owner_id);
		}

		$confirmed = $this->getState('filter.confirmed');
		if ($confirmed < 2)
		{
			$query->where($db->qn('a.confirmed') . '=' . (int) $confirmed);
		}

		$filter_payment_date = $this->state->get('filter.payment_date');
		if ($filter_payment_date && $confirmed > 0)
		{
			$query->where($db->qn('a.payment_date') . '>=' . $db->q($filter_payment_date));
		}

		$type = $this->getState('filter.type');
		if (!empty($type))
		{
			$query->where($db->qn('a.type') . '=' . $db->q($type));
		}

		$search = $this->getState('filter.search');
		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where($db->qn('a.id') . '=' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->q('%' . $db->escape(trim($search), true) . '%');
				$query->having('(owner_name LIKE ' . $search . ' OR contract_tag LIKE ' . $search
					. ' OR property_name LIKE ' . $search . ')');
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
	 * @param   string  $id  A prefix for the store id.
	 *
	 * @since  1.0.0
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.owner_id');
		$id .= ':' . $this->getState('filter.payment_date');
		$id .= ':' . $this->getState('filter.type');
		$id .= ':' . $this->getState('filter.confirmed');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Field to order by
	 * @param   string  $direction  Direction to order
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.payment_date', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.owner_id',
			$this->getUserStateFromRequest($this->context . '.filter.owner_id', 'filter_owner_id', '', 'string'));
		$this->setState('filter.payment_date',
			$this->getUserStateFromRequest($this->context . '.filter.payment_date', 'filter_payment_date',
				TickTock::modifyMonths('now', 1, '-'), 'string'));
		$this->setState('filter.confirmed',
			$this->getUserStateFromRequest($this->context . '.filter.confirmed', 'filter_confirmed', '', 'string'));
		$this->setState('filter.type',
			$this->getUserStateFromRequest($this->context . '.filter.type', 'filter_type', '', 'string'));

		parent::populateState($ordering, $direction);
	}
}