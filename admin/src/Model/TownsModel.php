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
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Towns list model.
 *
 * @since 1.0.0
 */
class TownsModel extends ListModel
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
				'country_id', 'a.country_id',
				'region_id', 'a.region_id',
				'allow_property', 'a.allow_property',
				'timezone', 'a.timezone',
				'currency', 'a.currency',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name', 'country_name', 'region_name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get all records
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAll(): array
	{
		return $this->_getList($this->getListQuery());
	}

	/**
	 * Get all published properties for region
	 *
	 * @param  int   $region_id       ID of region
	 * @param  bool  $allow_property  True to allow property towns only
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function getByRegion(int $region_id, bool $allow_property = false): array
	{
		$db = $this->getDatabase();

		$lang = KrMethods::getLanguageTag();

		$item     = 'town';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query = $db->getQuery(true)
		            ->select('a.id')
		            ->select('(' . $subQuery->__toString() . ') ' . $db->q('name'))
		            ->from($db->qn('#__knowres_town', 'a'))
		            ->where($db->qn('region_id') . '=' . $region_id)
		            ->where($db->qn('allow_property') . '=' . (int) $allow_property)
		            ->where($db->qn('state') . '=1')
		            ->order($db->qn('name') . ' ASC');
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

		$item     = 'town';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
		               ->from($db->qn('#__knowres_translation', 'sub'))
		               ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		               ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.region_id'))
		               ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		               ->setLimit(1);

		$item            = 'country';
		$subQueryCountry = $db->getQuery(true);
		$subQueryCountry->select('sub.text')
		                ->from($db->qn('#__knowres_translation', 'sub'))
		                ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		                ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.country_id'))
		                ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang)
			                . ' THEN 1 ELSE 2 END )')
		                ->setLimit(1);

		$query->select($this->getState('list.select',
			'a.id, a.country_id, a.region_id, a.lat, a.lng, a.allow_property, a.timezone, a.currency, a.state, 
			a.checked_out, a.checked_out_time, a.created_by, a.created_at, a.updated_by, a.updated_at, a.version'));
		$query->from($db->qn('#__knowres_town', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'));
		$query->select('(' . $subQueryCountry->__toString() . ') ' . $db->q('country_name'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . ' = ' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_allow_property = $this->state->get("filter.allow_property");
		if ($filter_allow_property)
		{
			$query->where("a.allow_property = " . (int) $filter_allow_property);
		}

		$filter_country_id = $this->state->get("filter.country_id");
		if ($filter_country_id)
		{
			$query->where("a.country_id = '" . $db->escape($filter_country_id) . "'");
		}

		$filter_region_id = $this->state->get("filter.region_id");
		if ($filter_region_id)
		{
			$query->where("a.region_id = " . (int) $filter_region_id);
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
	 * @param  string  $id  A prefix for the store id.
	 *
	 * @since  1.0.0
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.country_id');
		$id .= ':' . $this->getState('filter.region_id');
		$id .= ':' . $this->getState('filter.allow_property');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering
	 * @param  string  $direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'name', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));
		$this->setState('filter.allow_property',
			$this->getUserStateFromRequest($this->context . '.filter.allow_property', 'filter_allow_property', '',
				'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}