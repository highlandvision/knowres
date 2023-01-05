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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Managers List model.
 *
 * @since 1.0.0
 */
class ManagersModel extends ListModel
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
			$config['filter_fields'] = [
				'id', 'a.id',
				'user_id', 'a.user_id',
				'properties', 'a.properties',
				'access_level', 'a.access_level',
				'apikey', 'a.apikey',
				'agency_id', 'a.agency_id',
				'state', 'a.state',
				'user_name', 'user_username', 'agency_name'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Get the agency ID from the manager
	 *
	 * @param   int  $id  ID of manager
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAgency(int $id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('agency_id'));
		$query->from($db->qn('#__knowres_manager'))
		      ->where($db->qn('id') . ' = ' . $id)
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get all published managers
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAll(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'id',
			'user_id',
			'properties',
			'access_level',
			'apikey',
			'agency_id',
			'state',
			'created_by',
			'created_at',
			'updated_by',
			'updated_at'
		)))->from($db->qn('#__knowres_manager'))->where($db->qn('state') . ' = 1');

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get managers
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array  Object on success, false on failure.
	 */
	public function getItems(): array
	{
		$items = parent::getItems();
		foreach ($items as $item)
		{
			if (isset($item->properties))
			{
				$values = explode(',', $item->properties);

				$text = [];
				foreach ($values as $value)
				{
					$db    = KrFactory::getDatabase();
					$query = $db->getQuery(true);

					$query->select($db->qn('p.property_name'))
					      ->from($db->qn('#__knowres_property', 'p'))
					      ->where($db->qn('id') . ' = ' . $db->q($db->escape($value)));

					$db->setQuery($query);
					$results = $db->loadObject();

					if ($results)
					{
						$text[] = $results->property_name;
					}
					else
					{
						$text[] = $value;
					}
				}

				$item->properties = !empty($text) ? implode(', ', $text) : $item->properties;
			}
		}

		return $items;
	}

	/**
	 * Get all property managers (no owners).
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function getPropertyManagers()
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id', 'a.user_id', 'a.properties', 'a.access_level',
			'a.apikey', 'a.agency_id',
			'a.state',
			'a.created_by', 'a.created_at',
			'a.updated_by', 'a.updated_at'
		]));

		$query->from($db->qn('#__knowres_manager', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->select($db->qn('users.name', 'user_name'))
		      ->join('LEFT', $db->qn('#__users', 'users') . 'ON' . $db->qn('users.id') . '=' . $db->qn('a.user_id'))
		      ->where($db->qn('a.access_level') . '>=20')
		      ->order($db->qn('user_name'));

		$db->setQuery($query);

		return $db->loadObjectList();
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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_manager` AS a');

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('user_id.name AS user_name, user_id.username AS user_username');
		$query->join('LEFT', '#__users AS user_id ON user_id.id = a.user_id');
		$query->select($db->qn('agency.name', 'agency_name'));
		$query->join('LEFT',
			$db->qn('#__knowres_agency', 'agency') . ' ON ' . $db->qn('agency.id') . ' = ' . $db->qn('a.agency_id'));
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
			$query->where('(a.state IN (0, 1))');
		}

		$filter_agency_id = $this->state->get("filter.agency_id");
		if ($filter_agency_id)
		{
			$query->where("a.agency_id = '" . $db->escape($filter_agency_id) . "'");
		}

		$filter_access_level = $this->state->get("filter.access_level");
		if ($filter_access_level)
		{
			if (is_numeric($filter_access_level))
			{
				$query->where('a.access_level = ' . (int) $filter_access_level);
			}
			else if (is_string($filter_access_level) && strlen($filter_access_level) > 0)
			{
				$ids = explode(",", $filter_access_level);
				$query->where('a.access_level IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
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
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where('( user_id.name LIKE ' . $search . ' )');
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
	 * @return    string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.agency_id');
		$id .= ':' . $this->getState('filter.access_level');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.id', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.agency_id',
			$this->getUserStateFromRequest($this->context . '.filter.agency_id', 'filter_agency_id', '', 'string'));
		$this->setState('filter.access_level',
			$this->getUserStateFromRequest($this->context . '.filter.access_level', 'filter_access_level', '',
				'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}