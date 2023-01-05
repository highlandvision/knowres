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
use Joomla\Database\QueryInterface;

use RuntimeException;

use function defined;

/**
 * Rate markups list model.
 *
 * @since 1.0.0
 */
class RatemarkupsModel extends ListModel
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
				'property_id', 'a.property_id',
				'valid_from', 'a.valid_from',
				'valid_to', 'a.valid_to',
				'net_markup', 'a.net_markup',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get all markups after today for property
	 *
	 * @param   mixed   $properties  one ID or csv string or array of property IDs
	 * @param  ?string  $final       Restrict date range
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getMarkups(mixed $properties, ?string $final = null): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'property_id',
			'net_markup',
			'valid_from',
			'valid_to'
		)));

		$query->from($db->qn('#__knowres_rate_markup'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('valid_to') . '>=' . $db->q(TickTock::getDate()));

		if (!is_null($final))
		{
			$query->where($db->qn('valid_from') . '<=' . $db->q($final));
		}

		$filter_property_id = $properties;
		if (is_numeric($filter_property_id))
		{
			$query->where($db->qn('property_id') . '=' . (int) $filter_property_id);
		}
		else if (is_array($filter_property_id))
		{
			$query->where($db->qn('property_id') . ' IN (' . implode(',', array_map('intval', $filter_property_id))
				. ')');
		}
		else if (is_string($filter_property_id) && strlen($filter_property_id) > 0)
		{
			$ids = explode(',', $filter_property_id);
			$query->where($db->qn('property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$query->order($db->qn('property_id'))
		      ->order($db->qn('valid_from'));

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
		$query->from('`#__knowres_rate_markup` AS a');

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select($db->qn('p.property_name', 'property_name'));
		$query->join('LEFT',
			$db->qn('#__knowres_property', 'p') . ' ON ' . $db->qn('p.id') . ' =  ' . $db->qn('a.property_id'));
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

		$filter_property_id = $this->state->get("filter.property_id");
		if ($filter_property_id)
		{
			if (is_numeric($filter_property_id))
			{
				$query->where('a.property_id = ' . (int) $filter_property_id);
			}
			else if (is_array($filter_property_id))
			{
				$query->where('a.property_id IN (' . implode(',', array_map('intval', $filter_property_id)) . ')');
			}
			else if (is_string($filter_property_id) && strlen($filter_property_id) > 0)
			{
				$ids = explode(",", $filter_property_id);
				$query->where('a.property_id IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		$filter_valid_from = $this->state->get("filter.valid_from");
		if ($filter_valid_from)
		{
			$query->where("a.valid_to >= '" . $db->escape($filter_valid_from) . "'");
		}

		$filter_valid_to = $this->state->get("filter.valid_to");
		if ($filter_valid_to)
		{
			$query->where("a.valid_from <= '" . $db->escape($filter_valid_to) . "'");
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
				$query->where($db->qn('a.net_markup') . ' LIKE ' . $search);
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
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.valid_from');
		$id .= ':' . $this->getState('filter.valid_to');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null  $ordering
	 * @param   null  $direction
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.valid_from',
			$this->getUserStateFromRequest($this->context . '.filter.valid_from', 'filter_valid_from', '', 'string'));
		$this->setState('filter.valid_to',
			$this->getUserStateFromRequest($this->context . '.filter.valid_to', 'filter_valid_to', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState('a.property_id', 'asc');
	}
}