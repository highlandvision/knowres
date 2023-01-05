<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Service queues list model.
 *
 * @since 1.0.0
 */
class ServicequeuesModel extends ListModel
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
				'agent_id', 'a.agent_id',
				'contract_id', 'a.contract_id',
				'property_id', 'a.property_id',
				'arrival', 'a.arrival',
				'departure', 'a.departure',
				'availability', 'a.availability',
				'foreign_key', 'a.foreign_key',
				'actioned', 'a.actioned',
				'method', 'a.method',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'contract_tag', 'property_name', 'service_name', 'agent_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get any pending records waiting to be sent
	 *
	 * @param   int     $contract_id   ID of contract
	 * @param   int     $service_id    ID of service
	 * @param   int     $availability  Block (0) release(1) (reverse of current action)
	 * @param   int     $property_id   ID of property
	 * @param   string  $arrival       Arrrival date
	 * @param   string  $departure     Departure date
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPending(int $contract_id, int $service_id, int $availability, int $property_id, string $arrival,
		string $departure): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_service_queue'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('actioned') . '=0')
		      ->where($db->qn('service_id') . '=' . $service_id)
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->where($db->qn('availability') . '=' . $availability)
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('arrival') . '=' . $db->q($arrival))
		      ->where($db->qn('departure') . '=' . $db->q($departure))
		      ->setLimit(1);
		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get unactioned queue
	 *
	 * @param   int     $service_id  ID of service
	 * @param   string  $method      APlI method
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getQueueByServiceMethod(int $service_id, string $method = ''): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', '*'));
		$query->from($db->qn('#__knowres_service_queue'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('actioned') . '=0')
		      ->where($db->qn('service_id') . '=' . $service_id);

		if ($method !== 'updateProperty')
		{
			$query->where($db->qn('foreign_key') . '>' . $db->q(''));
		}

		if ($method === 'updateAvailability')
		{
			$query->andWhere([$db->qn('method') . '=' . $db->q($method),
			                  $db->qn('method') . '=' . $db->q('')]);
		}
		else
		{
			$query->where($db->qn('method') . '=' . $db->q($method));
		}

		$query->order($db->qn('id'));
		$query->order($db->qn('method'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Update the xref contract record to actioned
	 *
	 * @param   int  $id  ID of service queue
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return bool
	 */
	public function updateActioned(int $id): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$update = [
			$db->qn('actioned') . '=1'
		];

		$conditions = [
			$db->qn('id') . '=' . $id
		];

		$query->update($db->qn('#__knowres_service_queue'))->set($update)->where($conditions);
		$db->setQuery($query);

		return $db->execute();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  1.2.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_service_queue', 'a'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join('LEFT', '#__users AS uc ON uc.id = a.checked_out');

		$query->select($db->qn('contract.tag', 'contract_tag'));
		$query->join('LEFT', '#__knowres_contract AS contract ON contract.id = a.contract_id');

		$query->select($db->qn('property.property_name', 'property_name'));
		$query->join('LEFT', '#__knowres_property AS property ON property.id = a.property_id');

		$query->select($db->qn('agent.name', 'agent_name'));
		$query->join('LEFT', '#__knowres_agent AS agent ON agent.id = a.agent_id');

		$query->select($db->qn('service.name', 'service_name'));
		$query->join('LEFT', '#__knowres_service AS service ON service.id = a.service_id');

		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');

		$query->select($db->qn('updated_by.name', 'updated_by'));
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$filter_contract_id = $this->state->get('filter.contract_id');
		if ($filter_contract_id)
		{
			$query->where($db->qn('a.contract_id') . '=' . (int) $filter_contract_id);
		}

		$filter_property_id = $this->state->get("filter.property_id");
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}

		$filter_agent_id = $this->state->get('filter.agent_id');
		if ($filter_agent_id)
		{
			$query->where($db->qn('a.agent_id') . '=' . (int) $filter_agent_id);
		}

		$filter_service_id = $this->state->get('filter.service_id');
		if ($filter_service_id)
		{
			$query->where($db->qn('a.service_id') . '=' . $db->escape($filter_service_id));
		}

		$filter_method = $this->state->get('filter.method');
		if ($filter_method)
		{
			if ($filter_method == "availability")
			{
				$query->where($db->qn('a.method') . '=' . $db->q(''));
			}
			else
			{
				$query->where($db->qn('a.method') . '=' . $db->q($filter_method));
			}
		}

		$filter_actioned = $this->state->get('filter.actioned');
		if (is_numeric($filter_actioned))
		{
			$query->where($db->qn('a.actioned') . '=' . (int) $filter_actioned);
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
	 * @since  1.0.0
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.contract_id');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.agent_id');
		$id .= ':' . $this->getState('filter.service_id');
		$id .= ':' . $this->getState('filter.method');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering   Sort order
	 * @param   null|string  $direction  Sort direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.id', $direction = 'desc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.contract_id',
			$this->getUserStateFromRequest($this->context . '.filter.contract_id', 'filter_contract_id', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.agent_id',
			$this->getUserStateFromRequest($this->context . '.filter.agent_id', 'filter_agent_id', '', 'string'));
		$this->setState('filter.service_id',
			$this->getUserStateFromRequest($this->context . '.filter.service_id', 'filter_service_id', '', 'string'));
		$this->setState('filter.method',
			$this->getUserStateFromRequest($this->context . '.filter.method', 'filter_method', '', 'string'));
		$this->setState('filter.actioned',
			$this->getUserStateFromRequest($this->context . '.filter.actioned', 'filter_actioned', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}