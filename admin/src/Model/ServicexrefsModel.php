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
use Joomla\Database\Exception\DatabaseNotFoundException;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Service xrefs list model.
 *
 * @since 2.0.0
 */
class ServicexrefsModel extends ListModel
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
				'service_id', 'a.service_id',
				'property_id', 'a.property_id',
				'contract_id', 'a.contract_id',
				'payment_id', 'a.payment_id',
				'guest_id', 'a.guest_id',
				'owner_id', 'a.owner_id',
				'invoice_number', 'a.invoice_number',
				'foreign_key', 'a.foreign_key',
				'cancelled', 'a.cancelled',
				'new', 'a.new',
				'sell', 'a.sell',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'service_name', 'property_name', 'contract_tag', 'guest_name', 'owner_name', 'type'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Find channels for a property
	 *
	 * @param   int   $property_id  ID of property
	 * @param   bool  $new          True for new properties
	 *
	 * @throws RuntimeException
	 * @throws DatabaseNotFoundException
	 * @throws QueryTypeAlreadyDefinedException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function getChannels(int $property_id, bool $new = false): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			's.id',
			's.service_id',
			's.foreign_key',
			'i.plugin',
			'i.name'
		)));
		$query->from($db->qn('#__knowres_service_xref', 's'))
		      ->join('LEFT',
			      $db->qn('#__knowres_service', 'i') . ' ON ' . $db->qn('i.id') . '=' . $db->qn('s.service_id'))
		      ->where($db->qn('s.state') . '=1')
		      ->where($db->qn('s.property_id') . '=' . $property_id)
		      ->where($db->qn('s.foreign_key') . '>' . $db->q(''))
		      ->where($db->qn('s.contract_id') . '=0')
		      ->where($db->qn('i.type') . '=' . $db->q('c'))
		      ->where($db->qn('i.state') . '=1');

		if (!$new)
		{
			$query->where($db->qn('s.new') . '=0');
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * @param   int     $service_id   ID of service
	 * @param   string  $foreign_key  Foreign copntract key
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return array
	 */
	public function getContractForForeignKey(int $service_id, string $foreign_key): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('contract_id'))
		      ->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('property_id') . '=0')
		      ->where($db->qn('foreign_key') . '=' . $db->q($foreign_key));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get contracts for service
	 *
	 * @param   int  $service_id  ID of service
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getContractsForService(int $service_id): mixed
	{
		$departure = TickTock::modifyDays('now', 45, '-');

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'x.id', 'x.contract_id', 'x.foreign_key', 'x.state',
			'x.created_at', 'x.updated_at', 'c.cancelled', 'c.tag'
		]));

		$query->from($db->qn('#__knowres_service_xref', 'x'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . ' ON ' . $db->qn('c.id') . '=' . $db->qn('x.contract_id'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . ' ON ' . $db->qn('c.guest_id') . '=' . $db->qn('g.id'))
		      ->where($db->qn('x.contract_id') . '>0')
		      ->where($db->qn('x.property_id') . '=0')
		      ->where($db->qn('x.service_id') . '=' . $service_id)
		      ->where($db->qn('x.state') . '=1')
		      ->where($db->qn('c.departure') . '>=' . $db->q($departure));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the foreign key for a contract
	 *
	 * @param   int  $service_id   ID of service
	 * @param   int  $contract_id  ID of contract
	 * @param   int  $cancelled    Cancelled indicator
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function getForeignKeyForContract(int $service_id, int $contract_id, int $cancelled = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('foreign_key'))
		      ->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('state') . '=1')
			//		      ->where($db->qn('cancelled') . '=' . $cancelled)
			  ->setLimit(1);
		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get foreign key by table_name and table_id
	 *
	 * @param   int     $service_id  ID of service
	 * @param   string  $table_name  Table name
	 * @param   int     $table_id    Table ID
	 *
	 * @since  2.0.0
	 * @return ?string
	 */
	public function getForeignKey(int $service_id, string $table_name, int $table_id): ?string
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('foreign_key'))
		      ->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('table_name') . '=' . $db->q($table_name))
		      ->where($db->qn('table_id') . '=' . $table_id)
		      ->where($db->qn('state') . '=1')
		      ->setLimit(1);
		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get properties or an individual property for all active channel managers
	 *
	 * @param   int     $property_id  ID of property
	 * @param  ?string  $method       API method for checking queue
	 * @param  ?string  $plugin       Specific plugin
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function getPropertiesForAllServices(int $property_id = 0, ?string $method = null,
		?string $plugin = null): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$subQuery = $db->getQuery(true);
		$subQuery->select('q.id')
		         ->from($db->qn('#__knowres_service_queue', 'q'))
		         ->where($db->qn('q.property_id') . '=' . $db->qn('x.property_id'))
		         ->where($db->qn('q.actioned') . '=0')
		         ->where($db->qn('q.state') . '=1')
		         ->where($db->qn('q.service_id') . '=' . $db->qn('x.service_id'))
		         ->where($db->qn('q.method') . '=' . $db->q($method));

		$query->select($db->qn(array(
			'x.property_id',
			'x.foreign_key',
			'x.service_id',
			'x.new',
			'i.plugin',
			'i.parameters'
		)));
		$query->from($db->qn('#__knowres_service_xref', 'x'))
		      ->join('', $db->qn('#__knowres_service', 'i')
			      . ' ON ' . $db->qn('i.id') . '=' . $db->qn('x.service_id')
			      . ' AND ' . $db->qn('i.agency_id') . '>0'
			      . ' AND ' . $db->qn('i.type') . '=' . $db->q('c')
			      . ' AND ' . $db->qn('i.state') . '=1')
		      ->where($db->qn('x.state') . '=1')
		      ->where($db->qn('x.new') . '<>1')
		      ->where(' NOT EXISTS (' . $subQuery->__toString() . ') ');

		if ($property_id)
		{
			$query->where($db->qn('x.property_id') . '=' . $property_id);
		}
		else
		{
			$query->where($db->qn('x.property_id') . '>0');
		}

		if (!is_null($plugin))
		{
			$query->where($db->qn('i.plugin') . '=' . $db->q($plugin));
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get properties for service
	 *
	 * @param   int   $service_id  ID of service
	 * @param   bool  $new         Set to true to only retrieve new records
	 * @param   bool  $all         All properties for serviceSet to true to only retrieve new records
	 * @param   bool  $sellonly    Sell only filter (HA only)
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getPropertiesForService(int $service_id, bool $new = false, bool $all = false,
		bool $sellonly = false): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'id',
			'property_id',
			'foreign_key',
			'new',
			'sell',
			'state',
			'created_at',
			'updated_at',
		)));
		$query->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('property_id') . '>0')
		      ->where($db->qn('contract_id') . '=0')
		      ->where($db->qn('service_id') . '=' . $service_id);

		if (!$all)
		{
			if ($new)
			{
				$query->where($db->qn('new') . '=1');
			}
			else
			{
				$query->where($db->qn('foreign_key') . '<>' . $db->q('0'));
			}
		}

		if ($sellonly)
		{
			$query->where($db->qn('sell') . '=1');
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Return local ID for foreign key and type
	 *
	 * @param   int     $service_id   ID of service
	 * @param   string  $table_name   Local table
	 * @param   string  $foreign_key  Foreign key
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function getIdForForeign(int $service_id, string $table_name, string $foreign_key): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('table_id'))
		      ->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('table_name') . '=' . $db->q($table_name))
		      ->where($db->qn('foreign_key') . '=' . $db->q($foreign_key))
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Return property id for service and foreign key
	 *
	 * @param   int     $service_id   ID of service
	 * @param   string  $foreign_key  Channel key
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function getPropertyForService(int $service_id, string $foreign_key): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('property_id'))
		      ->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('foreign_key') . '=' . $db->q($foreign_key))
		      ->where($db->qn('contract_id') . '=0')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get service xref for the service and property
	 *
	 * @param   int  $service_id   ID of service
	 * @param  ?int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  2.5.0
	 * @return mixed
	 */
	public function getServiceProperty(int $service_id, ?int $property_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'id',
			'service_id',
			'property_id',
			'foreign_key',
			'sell'
		)));
		$query->from($db->qn('#__knowres_service_xref'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('contract_id') . '=0')
		      ->where($db->qn('service_id') . '=' . $service_id);

		if (!empty($property_id))
		{
			$query->where($db->qn('property_id') . '=' . $property_id);
			$query->setLimit(1);
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Set the xref contract record to cancelled
	 *
	 * @param   int  $service_id   ID of service
	 * @param   int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return bool
	 */
	public function updateCancelledForContract(int $service_id, int $contract_id): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$fields = [
			$db->qn('cancelled') . '=1'
		];

		$conditions = [
			$db->qn('service_id') . '=' . $service_id,
			$db->qn('contract_id') . '=' . $contract_id,
			$db->qn('cancelled') . '=0',
			$db->qn('state') . '=1'
		];

		$query->update($db->qn('#__knowres_service_xref'))
		      ->set($fields)
		      ->where($conditions);
		$db->setQuery($query);

		return $db->execute();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$subQuery = $db->getQuery(true);
		$subQuery->select('i.plugin')
		         ->from($db->qn('#__knowres_service', 'i'))
		         ->where($db->qn('i.plugin') . '=' . $db->q('ical'))
		         ->where($db->qn('i.id') . '=' . $db->qn('a.service_id'));

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_service_xref', 'a'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");

		$query->select('service.name AS service_name');
		$query->join('LEFT', '#__knowres_service AS service ON service.id = a.service_id');

		$query->select('property.property_name AS property_name');
		$query->join('LEFT', '#__knowres_property AS property ON property.id = a.property_id');

		$query->select('contract.tag AS contract_tag');
		$query->join('LEFT', '#__knowres_contract AS contract ON contract.id = a.contract_id');

		$query->select($db->qn('guest.surname', 'guest_name'));
		$query->join('LEFT', '#__knowres_guest AS guest ON guest.id = a.guest_id');

		$query->select('owner.name AS owner_name');
		$query->join('LEFT', '#__knowres_owner AS owner ON owner.id = a.owner_id');

		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');

		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$filter_service_id = (int) $this->state->get('filter.service_id');
		if ($filter_service_id > 0)
		{
			$query->where($db->qn('a.service_id') . '=' . $filter_service_id);
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$sell = $this->getState('filter.sell');
		if (is_numeric($sell))
		{
			$query->where($db->qn('a.sell') . '=' . (int) $sell);
			$query->where($db->qn('a.property_id') . '>0');
			$query->where($db->qn('a.contract_id') . '=0');
		}
		else if ($sell === '')
		{
			$query->where($db->qn('a.sell') . ' IN (0, 1)');
		}

		$type = $this->getState('filter.type');
		$key  = $this->getState('filter.key');
		if ($type == 'p')
		{
			if ($key > 0)
			{
				$query->where($db->qn('a.property_id') . '=' . $key);
			}

			$query->where($db->qn('a.contract_id') . '=0');
			$query->where($db->qn('a.guest_id') . '=0');
			$query->where($db->qn('a.owner_id') . '=0');
			$query->where($db->qn('a.payment_id') . '=0');
		}
		else if ($type == 'c')
		{
			if ($key > 0)
			{
				$query->where($db->qn('a.contract_id') . '=' . $key);
			}

			$query->where($db->qn('a.property_id') . '=0');
			$query->where($db->qn('a.guest_id') . '=0');
			$query->where($db->qn('a.owner_id') . '=0');
			$query->where($db->qn('a.payment_id') . '=0');
		}
		else if ($type == 'g')
		{
			if ($key > 0)
			{
				$query->where($db->qn('a.guest_id') . '=' . $key);
			}

			$query->where($db->qn('a.property_id') . '=0');
			$query->where($db->qn('a.contract_id') . '=0');
			$query->where($db->qn('a.owner_id') . '=0');
			$query->where($db->qn('a.payment_id') . '=0');
		}
		else if ($type == 'o')
		{
			if ($key > 0)
			{
				$query->where($db->qn('a.owner_id') . '=' . $key);
			}

			$query->where($db->qn('a.property_id') . '=0');
			$query->where($db->qn('a.contract_id') . '=0');
			$query->where($db->qn('a.guest_id') . '=0');
			$query->where($db->qn('a.payment_id') . '=0');
		}
		else if ($type == 'x')
		{
			if ($key > 0)
			{
				$query->where($db->qn('a.payment_id') . '=' . $key);
			}

			$query->where($db->qn('a.property_id') . '=0');
			$query->where($db->qn('a.contract_id') . '=0');
			$query->where($db->qn('a.guest_id') . '=0');
			$query->where($db->qn('a.owner_id') . '=0');
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
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where('( a.foreign_key LIKE ' . $search . ' )');
			}
		}

		$query->where(' NOT EXISTS (' . $subQuery->__toString() . ') ');

		$orderCol  = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');
		if ($orderCol && $orderDirn)
		{
			$query->order($db->escape($orderCol . ' ' . $orderDirn));
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
	 * @since  2.0.0
	 * @return string   A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.service_id');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.sell');
		$id .= ':' . $this->getState('filter.contract_id');
		$id .= ':' . $this->getState('filter.guest_id');
		$id .= ':' . $this->getState('filter.owner_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since 2.0.0
	 */
	protected function populateState($ordering = 'a.service_id', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.service_id',
			$this->getUserStateFromRequest($this->context . '.filter.service_id', 'filter_service_id', '', 'string'));
		$this->setState('filter.type',
			$this->getUserStateFromRequest($this->context . '.filter.type', 'filter_type', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.sell',
			$this->getUserStateFromRequest($this->context . '.filter.sell', 'filter_sell', '', 'string'));
		$this->setState('filter.contract_id',
			$this->getUserStateFromRequest($this->context . '.filter.contract_id', 'filter_contract_id', '', 'string'));
		$this->setState('filter.guest_id',
			$this->getUserStateFromRequest($this->context . '.filter.guest_id', 'filter_guest_id', '', 'string'));
		$this->setState('filter.owner_id',
			$this->getUserStateFromRequest($this->context . '.filter.owner_id', 'filter_owner_id', '', 'string'));
		$this->setState('filter.payment_id',
			$this->getUserStateFromRequest($this->context . '.filter.payment_id', 'filter_payment_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}