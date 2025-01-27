<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use Joomla\Database\QueryInterface;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;

use function implode;
use function is_array;
use function is_numeric;

/**
 * Properties list model.
 *
 * @since 1.0.0
 */
class PropertiesModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param  array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct(array $config = [])
	{
		if (empty($config['filter_fields'])) {
			$config['filter_fields'] = KrListField::setPropertyFilterFields();
		}

		$userSession           = new KrSession\User();
		$this->user_properties = $userSession->getUserProperties();

		parent::__construct($config);
	}

	/**
	 * Get last property update
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return array
	 */
	public static function propertyDates(): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('p.created_at') . '), MAX(' . $db->qn('p.updated_at') . '))  as '
		               . $db->qn('maxdate'))
			->select($db->qn('p.id', 'pid'))
			->from($db->qn('#__knowres_property', 'p'))
			->where($db->qn('p.state') . ' = 1')
			->group($db->qn('pid'));

		$db->setQuery($query);

		return $db->loadAssocList('pid');
	}

	/**
	 * Get last property update on sub tables
	 *
	 * @param  string  $table  Name of table
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 * @return array
	 */
	public static function propertySubDates(string $table): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('s.created_at') . '), MAX(' . $db->qn('s.updated_at') . '))  as '
		               . $db->qn('maxdate'))
			->select($db->qn('s.property_id'))
			->from($db->qn($table, 's'))
			->where($db->qn('s.state') . ' IN(0,1)')
			->group($db->qn('property_id'));
		$db->setQuery($query);

		return $db->loadAssocList('property_id');
	}

	/**
	 * Get property areas for typeahead
	 *
	 * @param  int      $region_id  ID of region
	 * @param  ?string  $search     Search value
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getArea(int $region_id = 0, ?string $search = null): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('a.property_area'));
		$query->from($db->qn('#__knowres_property', 'a'))
			->where($db->qn('a.state') . '=1')
			->where($db->qn('a.approved') . '=1');

		if ($region_id) {
			$query->where($db->qn('a.region_id') . '=' . $region_id);
		}

		if (!is_null($search)) {
			if (stripos($search, 'id:') === 0) {
				$query->where($db->qn('a.id') . ' = ' . (int) substr($search, 3));
			} else {
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where($db->qn('a.property_area') . ' LIKE ' . $search);
			}
		}

		$query->group($db->qn('property_area'));
		$query->order($db->qn('a.property_area'));

		$db->setQuery($query);

		return $db->loadColumn();
	}

	/**
	 * Get property autosearch data
	 *
	 * @param  string  $name  Property name string
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAutosearch(string $name): array
	{
		$db   = $this->getDatabase();
		$lang = KrMethods::getLanguageTag();

		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('p.region_id'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query = $db->getQuery(true)
			->select($db->qn(array(
				'p.id',
				'p.property_name',
				'p.region_id',
				'p.property_area'
			)))
			->from($db->qn('#__knowres_property', 'p'));

		$query->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'));

		$query->where($db->qn('p.state') . '=1')
			->where($db->qn('p.approved') . '=1');

		if ($name) {
			$name = $db->q('%' . $db->escape($name) . '%');
			$query->where($db->qn('p.property_name') . ' LIKE ' . $name);
		}

		$query->order($db->qn('p.property_name'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Method to get all the data for the property dashboard.
	 *
	 * @param  int  $id  The id of the primary key.
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed  The return value or null if the query failed.
	 */
	public function getForDashboard(int $id): mixed
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id',
			'a.property_name',
			'a.region_id',
			'a.country_id',
			'a.sleeps',
			'a.sleeps_extra',
			'a.owner_id',
			'a.checked_out',
			'a.checked_out_time',
			'a.property_area',
			'a.booking_type',
			'a.state',
			'a.property_email',
			'a.bedrooms',
			'a.bathrooms',
			'a.wc',
			'a.town_id'
		]));

		$query->from($db->qn('#__knowres_property', 'a'))
			->where($db->qn('a.id') . '=' . $id);

		$query->select('COUNT(DISTINCT op.id) AS ownerpayments')
			->join('LEFT',
				$db->qn('#__knowres_service', 'op') . 'ON' . $db->qn('op.property_id') . '=' . $db->qn('a.id') . 'AND'
				. $db->qn('op.type') . '=' . $db->q('g') . 'AND' . $db->qn('op.state') . '=1');

		$query->select('COUNT(DISTINCT x.id) AS channels')
			->join('LEFT',
				$db->qn('#__knowres_service_xref', 'x') . 'ON' . $db->qn('x.property_id') . '=' . $db->qn('a.id')
				. 'AND' . $db->qn('x.state') . '=1');

		$query->select('COUNT(DISTINCT ical.id) AS icals')
			->join('LEFT',
				$db->qn('#__knowres_property_ical', 'ical') . 'ON' . $db->qn('ical.property_id') . '='
				. $db->qn('a.id') . 'AND'
				. $db->qn('ical.state') . '=1');

		$query->select('COUNT(DISTINCT rm.id) AS ratemarkups')
			->join('LEFT',
				$db->qn('#__knowres_rate_markup', 'rm') . 'ON' . $db->qn('rm.property_id') . '=' . $db->qn('a.id')
				. 'AND'
				. $db->qn('rm.state') . '=1 AND' . $db->qn('rm.valid_to') . '>=' . $db->q($today));

		$query->select('COUNT(DISTINCT c.id) AS coupons')
			->join('LEFT',
				$db->qn('#__knowres_coupon', 'c') . 'ON' . $db->qn('c.property_id') . '=' . $db->qn('a.id') . 'AND'
				. $db->qn('c.state') . '=1 AND' . $db->qn('c.valid_to') . '>=' . $db->q($today));

		$query->select('COUNT(DISTINCT d.id) AS discounts')
			->join('LEFT',
				$db->qn('#__knowres_discount', 'd') . 'ON' . $db->qn('d.property_id') . '=' . $db->qn('a.id') . 'AND'
				. $db->qn('d.state') . '=1 AND' . $db->qn('d.valid_to') . '>=' . $db->q($today));

		$query->select('COUNT(DISTINCT e.id) AS extras')
			->join('LEFT',
				$db->qn('#__knowres_extra', 'e') . 'ON' . $db->qn('e.property_id') . '=' . $db->qn('a.id') . 'AND'
				. $db->qn('e.state') . '=1');

		$query->group($db->qn('id'));

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get properties for change list
	 *
	 * @param  int  $id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getForSwitch(int $id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id', 'property_name']));
		$query->from($db->qn('#__knowres_property'))
		      ->where($db->qn('id') . '<>' . $id)
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('approved') . '=1');

		if (!empty($this->user_properties))
		{
			$query->where('id IN (' . $this->user_properties . ')');
		}

		$query->order($db->qn('property_name'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Query to get property data for current user's properties
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function getForGantt(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id',
			'a.property_name',
			'a.region_id'
		]));
		$query->from($db->qn('#__knowres_property', 'a'))
			->where($db->qn('a.state') . '=1');

		if (!empty($this->user_properties)) {
			$query->where($db->qn('a.id') . ' IN (' . $this->user_properties . ')');
		}

		$query->order($db->qn('property_name'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get properties awaiting approval
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getForApproval(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
		               ->from($db->qn('#__knowres_translation', 'sub'))
		               ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		               ->where($db->qn('sub.item_id') . ' = ' . $db->qn('region_id'))
		               ->where($db->qn('sub.field') . ' = ' . $db->q('name'))
		               ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		               ->setLimit(1);

		$query->select($db->qn(array('id',
		                             'property_name',
		                             'property_area')));

		$query->from($db->qn('#__knowres_property'))
			->where($db->qn('state') . '=1')
		      ->where($db->qn('approved') . '=0')
		      ->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'))
		      ->order($db->qn('created_at'));

		if (!empty($this->user_properties)) {
			$query->where('id IN (' . $this->user_properties . ')');
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get property IDs for a specific state
	 *
	 * @param  int  $state  Required state or 0 for all
	 *
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return mixed
	 */
	public function getIds(int $state = 1): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
			->from($db->qn('#__knowres_property'));

		if ($state) {
			$query->where($db->qn('state') . '=' . $state);
		}

		$query->order($db->qn('id'));

		$db->setQuery($query);

		return $db->loadColumn();
	}

	/**
	 * Get rates for annual update of property
	 *
	 * @param  int     $id    ID of property
	 * @param  string  $date  From date
	 *
	 * @since   3.3.0
	 * @return mixed
	 */
	public function getRatesToCopy(int $id, string $date): mixed
	{
		$db = $this->getDatabase();

		$item = 'rate';
		$lang = KrMethods::getLanguageTag();

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . '=' . $db->q($item))
			->where($db->qn('sub.item_id') . '=' . $db->qn('r.id'))
			->where($db->qn('sub.field') . '=' . $db->q('name'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query = $db->getQuery(true);
		$query->select($db->qn(array(
			'id',
			'property_id',
			'valid_from',
			'valid_to',
			'rate',
			'min_nights',
			'max_nights',
			'min_guests',
			'max_guests',
			'ignore_pppn',
			'start_day',
			'more_guests',
			'state'
		)))
			->from($db->qn('#__knowres_rate', 'r'))
			->select('(' . $subQuery->__toString() . ') ' . $db->q('name'))
			->where($db->qn('r.property_id') . '=' . $id)
			->where($db->qn('r.valid_from') . '>=' . $db->q($date))
			->order($db->qn('r.valid_to') . 'DESC');

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

		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.region_id'))
			->where($db->qn('sub.field') . ' = ' . $db->q('name'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$item         = 'type';
		$subQueryType = $db->getQuery(true);
		$subQueryType->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . '=' . $db->q($item))
			->where($db->qn('sub.item_id') . '=' . $db->qn('a.type_id'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_property', 'a'));
		$query->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'));
		$query->select('(' . $subQueryType->__toString() . ') ' . $db->q('type_name'));

		$query->select('uc.name AS editor');
		$query->join('LEFT', '#__users AS uc ON uc.id = a.checked_out');
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		if (!empty($this->user_properties)) {
			$query->where('a.id IN (' . $this->user_properties . ')');
		}

		$filter_id = $this->state->get('filter.id');
		if ($filter_id) {
			if (is_numeric($filter_id)) {
				$query->where($db->qn('a.id') . ' = ' . (int) $filter_id);
			} else if (is_array($filter_id)) {
				$query->where($db->qn('a.id') . ' IN (' . implode(',', array_map('intval', $filter_id)) . ')');
			} else if (is_string($filter_id) && strlen($filter_id)) {
				$ids = explode(",", $filter_id);
				$query->where($db->qn('a.id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state)) {
			$query->where($db->qn('a.state') . ' = ' . (int) $state);
		} else if ($state === '') {
			$query->where($db->qn('a.state') . ' = 1');
		}

		$book = $this->getState('filter.booking_type');
		if (is_numeric($book)) {
			$query->where('a.booking_type = ' . (int) $book);
		} else if (is_array($book)) {
			$data = [];
			foreach ($book as $f) {
				$data[] = 'a.booking_type = ' . (int) $f;
			}
			$query->where('(' . implode(" OR ", $data) . ')');
		}

		$filter_owner_id = $this->state->get('filter.owner_id');
		if ($filter_owner_id) {
			if (is_numeric($filter_owner_id)) {
				$query->where('a.owner_id = ' . (int) $filter_owner_id);
			} else if (is_array($filter_owner_id)) {
				$data = [];
				foreach ($filter_owner_id as $f) {
					$data[] = 'a.owner_id = ' . (int) $f;
				}
				$query->where('(' . implode(" OR ", $data) . ')');
			}
		}

		$filter_type_id = $this->state->get('filter.type_id');
		if ($filter_type_id) {
			if (is_numeric($filter_type_id)) {
				$query->where('a.type_id = ' . (int) $filter_type_id);
			} else if (is_array($filter_type_id)) {
				$data = [];
				foreach ($filter_type_id as $f) {
					$data[] = 'a.type_id = ' . (int) $f;
				}
				$query->where('(' . implode(" OR ", $data) . ')');
			}
		}

		$filter_region_id = $this->state->get('filter.region_id');
		if ($filter_region_id) {
			if (is_numeric($filter_region_id)) {
				$query->where('a.region_id = ' . (int) $filter_region_id);
			} else if (is_array($filter_region_id)) {
				$query->where('a.region_id IN (' . implode(',', array_map('intval', $filter_region_id)) . ')');
			}
		}

		$search = $this->getState('filter.search');
		if (!empty($search)) {
			if (stripos($search, 'id:') === 0) {
				$query->where($db->qn('a.id') . ' = ' . (int) substr($search, 3));
			} else {
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where($db->qn('a.property_name') . ' LIKE ' . $search);
			}
		}

		$query->group($db->qn('id'));

		if ($this->state->get('list.ordercustom')) {
			$orderCustom = $this->state->get('list.ordercustom');
			$query->order($db->escape($orderCustom));
		} else {
			$orderCol  = $this->state->get('list.ordering');
			$orderDirn = $this->state->get('list.direction');
			if ($orderCol && $orderDirn) {
				$query->order($db->escape($orderCol . ' ' . $orderDirn));
			}
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
	 * @return string
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.booking_type');
		$id .= ':' . $this->getState('filter.id');
		$id .= ':' . $this->getState('filter.region_id');
		$id .= ':' . $this->getState('filter.type_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering
	 * @param  string  $direction
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.ordering', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.booking_type',
			$this->getUserStateFromRequest($this->context . '.filter.booking_type', 'filter_booking_type', '', 'string'));
		$this->setState('filter.id',
			$this->getUserStateFromRequest($this->context . '.filter.id', 'filter_id', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));
		$this->setState('filter.type_id',
			$this->getUserStateFromRequest($this->context . '.filter.type_id', 'filter_type_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}