<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
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

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class DiscountsModel extends ListModel
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
				'property_id', 'a.property_id',
				'discount', 'a.discount',
				'is_pc', 'a.is_pc',
				'valid_from', 'a.valid_from',
				'valid_to', 'a.valid_to',
				'model', 'a.model',
				'param1', 'a.param1',
				'param2', 'a.param2',
				'ordering', 'a.ordering',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Get discounts
	 *
	 * @param   mixed  $properties  ID or csv string of property ids
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getDiscounts(mixed $properties): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();
		$item = 'discount';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_discount', 'a'))
		      ->select('(' . $subQuery->__toString() . ') ' . $db->q('name'))
		      ->where($db->qn('a.state') . '=1');

		if (is_numeric($properties))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $properties);
		}
		else if (is_string($properties) && strlen($properties) > 0)
		{
			$ids = explode(',', $properties);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$query->where($db->qn('a.valid_to') . '>=' . $db->q(TickTock::getDate()))
		      ->order($db->qn('property_id'))
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

		$lang = KrMethods::getLanguageTag();
		$item = "discount";

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_discount', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('#__knowres_property_1166011.property_name AS property_name');
		$query->join('LEFT',
			'#__knowres_property AS #__knowres_property_1166011 ON #__knowres_property_1166011.id = a.property_id');
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0,1)');
		}

		$filter_property_id = $this->state->get("filter.property_id");
		if (is_numeric($filter_property_id))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}
		else if (is_string($filter_property_id) && strlen($filter_property_id) > 0)
		{
			$ids = explode(',', $filter_property_id);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$filter_valid_from = $this->state->get('filter.valid_from');
		if ($filter_valid_from)
		{
			$query->where($db->qn('a.valid_from') . '<=' . $db->q($filter_valid_from));
		}

		$filter_valid_to = $this->state->get("filter.valid_to");
		if ($filter_valid_to)
		{
			$query->where($db->qn('a.valid_to') . '>=' . $db->q($filter_valid_to));
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
				$query->where('(' . $subQuery->__toString() . ') ' . ' LIKE ' . $search);
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
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.valid_from');
		$id .= ':' . $this->getState('filter.valid_to');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.valid_to', $direction = 'asc')
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

		parent::populateState($ordering, $direction);
	}
}