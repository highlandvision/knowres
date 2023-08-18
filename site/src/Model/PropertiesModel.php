<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Model;

defined('_JEXEC') or die;

use Carbon\Exceptions\InvalidFormatException;
use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListField as KrListField;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\Joomla\Extend\Pagination;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\Exception\DatabaseNotFoundException;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use Joomla\Database\QueryInterface;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;

use function array_keys;
use function array_map;
use function count;
use function date;
use function implode;
use function is_array;

/**
 * Site properties model used for search
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
	 * @since  1.6
	 * @see    BaseController
	 */
	public function __construct($config = [])
	{
		if (empty($config['filter_fields'])) {
			$config['filter_fields'] = KrListField::setPropertyFilterFields();
		}

		parent::__construct($config);
	}

	/**
	 * Find all properties in current search display
	 * Filters are passed via state
	 *
	 * @throws RuntimeException
	 * @since        3.3.0
	 * @return array
	 * @noinspection PhpUnused
	 */
	public function currentlyDisplayed(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('a.id'))
		      ->from($db->qn('#__knowres_property', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.approved') . '=1');
		$query = $this->doFiltering($db, $query);

		$db->setQuery($query);

		return $db->loadColumn();
	}

	/**
	 * Get base items for search
	 *
	 * @param  object  $data  Search parameters
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 * @return array
	 */
	public function getBaseItems(object $data): array
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.id, a.bedrooms, a.categories, a.type_id, a.town_id,
				a.property_area, a.property_town, a.property_features, a.booking_type, a.created_at,
				a.sleeps, a.sleeps_extra, a.sleeps_infant_max, a.sleeps_infant_age, a.pets, r.rating, 
				SUM(a.sleeps + a.sleeps_extra + a.sleeps_infant_max) AS allsleeps'));

		if ($data->layout == 'discount') {
			$query->select($this->getState('list.select', 'd.id, d.valid_from, d.valid_to, d.discount, d.is_pc,
			       d.model, d.param1, d.param2'));
		}

		$query->from($db->qn('#__knowres_property', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.private') . '=0')
		      ->where($db->qn('a.approved') . '=1');

		if ($data->layout == 'discount') {
			$query->from($db->qn('#__knowres_discount', 'd'))
			      ->join('LEFT', $db->qn('#__knowres_property', 'a') .
				      'ON' .
				      $db->qn('d.property_id') .
				      '=' .
				      $db->qn('a.id') .
				      'AND' .
				      $db->qn('d.state') .
				      '=1' .
				      'AND' .
				      $db->qn('d.valid_from') .
				      '<=' .
				      $db->q($today) .
				      'AND' .
				      $db->qn('d.valid_to') .
				      '>=' .
				      $db->q($today));
		}

		$query->join('LEFT', $db->qn('#__knowres_review', 'r') .
			'ON' .
			$db->qn('r.property_id') .
			'=' .
			$db->qn('a.id') .
			'AND' .
			$db->qn('r.state') .
			'=1 AND ' .
			$db->qn('r.held') .
			'=0');

		if (count($data->region_id)) {
			$query->where($db->qn('a.region_id') . 'IN (' . implode(',', array_keys($data->region_id)) . ')');
		}

		if ($data->layout == 'category' && $data->category_id) {
			$query = self::jsonFindInSet($db, $query, $data->category_id, 'categories');
		}

		if ($data->layout == 'discount') {
			$query = self::jsonFindInSet($db, $query, $data->category_id, 'categories');
		}

		if ((int) $data->byAvailability && !(int) $data->flexible) {
			$subQuery = $db->getQuery(true);
			$subQuery->select($db->qn('sub.id'));
			$subQuery->from($db->qn('#__knowres_contract', 'sub'))
			         ->where($db->qn('sub.property_id') .
				         '=' .
				         $db->qn('a.id'))
			         ->where($db->qn('sub.cancelled') . '=0')
			         ->where($db->qn('sub.state') . '=1')
			         ->where($db->qn('sub.arrival') . '<' . $db->q($data->departure))
			         ->where($db->qn('sub.departure') . '>' . $db->q($data->arrival));
			$query->where(' NOT EXISTS (' . $subQuery->__toString() . ') ');

			$subQuery1 = $db->getQuery(true);
			$subQuery1->select($db->qn('sub.id'));
			$subQuery1->from($db->qn('#__knowres_ical_block', 'sub'))
			          ->where($db->qn('sub.property_id') .
				          '=' .
				          $db->qn('a.id'))
			          ->where($db->qn('sub.arrival') . '<' . $db->q($data->departure))
			          ->where($db->qn('sub.departure') . '>' . $db->q($data->arrival));
			$query->where(' NOT EXISTS (' . $subQuery1->__toString() . ') ');
		}
		$query->group('id');

		$filter_guests = $data->guests;
		if ($filter_guests) {
			$query->having($db->qn('allsleeps') . '>=' . (int) $filter_guests);
		}

		if ($data->layout == 'new') {
			$query->order($db->qn('a.created_at') . 'DESC');
			$query->setLimit(50);
		}
		else if ($data->ordercustom) {
			$orderCustom = $data->ordercustom;
			$query->order($db->escape($orderCustom));
		}
		else {
			$orderCol  = $data->ordering;
			$orderDirn = $data->direction;
			if ($orderCol && $orderDirn) {
				$query->order($db->escape($orderCol . ' ' . $orderDirn));
			}
		}

		$db->setQuery($query);

		$results = $db->loadObjectList();
		if (!$data->flexible || !count($results)) {
			return $results;
		}

		$final      = [];
		$properties = $this->doFlexible($db, $data, $results);
		foreach ($results as $r) {
			if (in_array($r->id, $properties)) {
				$final[] = $r;
			}
		}

		return $final;
	}

	/**
	 * Get properties for a category
	 *
	 * @param  int  $category_id  ID of category
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getByCategory(int $category_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id',
		                        'bedrooms',
		                        'property_name',
		                        'property_area',
		                        'region_id',
		                        'sleeps',
		                        'sleeps_extra'
		]));

		$query->from($db->qn('#__knowres_property'))
		      ->select('(' .
			      self::transSQ($db, 'region', 'region_id') .
			      ') AS ' .
			      $db->q('region_name'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('approved') . '=1')
		      ->where($db->qn('private') . '=0');

		$query = self::jsonFindInSet($db, $query, $category_id, 'categories');
		$query->order($db->qn('region_id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Count returned data items
	 * Is used in search do not delete
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getCountItems(): array
	{
		$bedrooms = $this->getCountQuery('a.bedrooms');
		$book     = $this->getCountQuery('a.booking_type');
		$type     = $this->getCountQuery('a.type_id');
		$town     = $this->getCountQuery('a.property_town');
		$area     = $this->getCountQuery('a.property_area');
		$pets     = $this->getCountQuery('a.pets');
		$price    = $this->getCountQuery();
		$feature  = $this->getCountFeatureQuery();
		$category = $this->getCountCategoryQuery();

		return [$bedrooms, $book, $feature, $type, $town, $area, $pets, $category, $price];
	}

	/**
	 * Get discounted properties for search
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws DatabaseNotFoundException
	 * @throws RuntimeException
	 * @throws QueryTypeAlreadyDefinedException
	 * @throws InvalidFormatException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getDiscount(int $property_id = 0): mixed
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('d.id',
		                             'd.valid_from',
		                             'd.valid_to',
		                             'd.discount',
		                             'd.is_pc',
		                             'd.model',
		                             'd.param1',
		                             'd.param2',
		                             'a.region_id',
		                             'd.property_id',
		                             'a.property_name',
		                             'a.property_area',
		                             'a.bedrooms',
		                             'a.sleeps',
		                             'a.sleeps_extra'
		)));

		$query->from($db->qn('#__knowres_discount', 'd'))
		      ->select('(' .
			      self::transSQ($db, 'region', 'a.region_id') .
			      ') AS ' .
			      $db->q('region_name'))
		      ->join('INNER', $db->qn('#__knowres_property', 'a') .
			      'ON' .
			      $db->qn('a.id') .
			      '=' .
			      $db->qn('d.property_id') .
			      ' AND ' .
			      $db->qn('a.state') .
			      '=1' .
			      ' AND ' .
			      $db->qn('a.approved') .
			      '=1')
		      ->where($db->qn('d.state') . '=1')
		      ->where($db->qn('d.valid_from') . '<=' . $db->q($today))
		      ->where($db->qn('d.valid_to') . '>=' . $db->q($today));

		if ($property_id) {
			$query->where($db->qn('d.property_id') . '=' . $property_id);
		}

		$query->order($db->qn('region_name'))->order($db->qn('property_id'))->order($db->qn('param1'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the distinct types for published properties
	 *
	 * @throws KeyNotFoundException
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.2
	 * @return mixed
	 */
	public function getDistinctTypes(): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();
		$item = 'type';

		$subQueryType = $db->getQuery(true);
		$subQueryType->select('sub.text')->from($db->qn('#__knowres_translation', 'sub'))->where($db->qn('sub.item') .
			'=' .
			$db->q($item))->where($db->qn('sub.item_id') . '=' . $db->qn('a.type_id'))->order('(CASE WHEN ' .
			$db->qn('sub.language') .
			'=' .
			$db->q($lang) .
			' THEN 1 ELSE 2 END )')->setLimit(1);

		$query->select('DISTINCT a.type_id')
		      ->from($db->qn('#__knowres_property', 'a'))
		      ->select('(' .
			      $subQueryType->__toString() .
			      ') ' .
			      $db->q('name'))
		      ->select($db->qn('t.ordering', 'sortorder'))
		      ->join('LEFT', $db->qn('#__knowres_type', 't') . 'ON' . $db->qn('t.id') . '=' . $db->qn('a.type_id'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.approved') . '=1')
		      ->order($db->qn('sortorder'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	//TODO 4.3 delete if no issues
//	/**
//	 * Get max values for guests and bedrooms per region
//	 *
//	 * @param  int  $region_id  The property region for the select
//	 *
//	 * @throws RuntimeException
//	 * @throws InvalidArgumentException
//	 * @return mixed
//	 */
//	public function getMaxBedsSleeps(int $region_id): mixed
//	{
//		$db    = KrFactory::getDatabase();
//		$query = $db->getQuery(true);
//
//		$query->select('MAX(' . $db->qn('a.bedrooms') . ')  as ' . $db->qn('bedrooms'))
//		      ->select('MAX(' . $db->qn('a.sleeps') . '+' . $db->qn('a.sleeps_extra') . ') as ' . $db->qn('guests'))
//		      ->from($db->qn('#__knowres_property', 'a'))
//		      ->where($db->qn('a.state') . '=1')
//		      ->where($db->qn('a.approved') . '=1')
//		      ->where($db->qn('a.private') . '=0')
//		      ->where($db->qn('a.region_id') . '=' . $region_id)
//		      ->setLimit(1);
//
//		$db->setQuery($query);
//
//		return $db->loadObject();
//	}

	/**
	 * Get the minimum and maximum rate for one or more properties
	 *
	 * @param  mixed  $properties  Single, string or array of property IDs
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getMinMaxRates(mixed $properties): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['a.id',
		                        'a.bedrooms',
		                        'a.booking_type',
		                        'a.property_name',
		                        'a.property_area',
		                        'a.sleeps',
		                        'a.sleeps_extra',
		                        'price_summary'
		]));

		$query->from($db->qn('#__knowres_property', 'a'));

		$query->select('MIN(' . $db->qn('r.rate') . ') AS minrate');
		$query->select('MAX(' . $db->qn('r.rate') . ') AS maxrate');
		$query->join('LEFT', $db->qn('#__knowres_rate', 'r') .
			' ON ' .
			$db->qn('r.property_id') .
			'=' .
			$db->qn('a.id') .
			' AND ' .
			$db->qn('r.state') .
			'=1 AND ' .
			$db->qn('r.valid_to') .
			'>=' .
			$db->q(date('Y-m-d')));

		if (is_numeric($properties)) {
			$query->where($db->qn('a.id') . '=' . (int) $properties);
		}
		else if (is_array($properties) && count($properties)) {
			$query->where('a.id IN (' . implode(',', array_map('intval', $properties)) . ')');
		}
		else if (is_string($properties) && strlen($properties)) {
			$ids = explode(',', $properties);
			$query->where('a.id IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$query->where($db->qn('a.state') . '=1')->where($db->qn('a.approved') . '=1');

		$query->group($db->qn('id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Query to get published and approved properties
	 *
	 * @param  mixed  $properties  IDs to get names for
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return array
	 */
	public function getNames(mixed $properties = null): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('id',
		                             'property_name',
		                             'region_id',
		                             'country_id'
		)))
		      ->from($db->qn('#__knowres_property'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('approved') . '=1')
		      ->where($db->qn('private') . '=0');

		if (!is_null($properties)) {
			if (is_numeric($properties)) {
				$query->where($db->qn('id') . '=' . (int) $properties);
			}
			else if (is_array($properties)) {
				$query->where($db->qn('id') . ' IN (' . implode(',', array_map('intval', $properties)) . ')');
			}
			else if (is_string($properties) && strlen($properties)) {
				$ids = explode(',', $properties);
				$query->where($db->qn('id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		$query->order($db->qn('property_name'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get last 50 newly added properties
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getNew(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('a.id',
		                             'a.property_name',
		                             'a.property_area',
		                             'a.bedrooms',
		                             'a.region_id',
		                             'a.sleeps',
		                             'a.sleeps_extra'
		)));
		$query->from($db->qn('#__knowres_property', 'a'))
		      ->select('(' .
			      self::transSQ($db, 'region', 'a.region_id') .
			      ') AS ' .
			      $db->q('region_name'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.approved') . '=1')
		      ->where($db->qn('a.private') . '=0')
		      ->order($db->qn('a.created_at') . 'DESC')
		      ->setLimit(50);

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Returns pagination for properties list.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return Pagination  A Pagination object for the data set.
	 */
	public function getPagination(): Pagination
	{
		$store = $this->getStoreId('getPagination');
		if (isset($this->cache[$store])) {
			return $this->cache[$store];
		}

		$limit = (int) $this->getState('list.limit') - (int) $this->getState('list.links');
		$page  = new Pagination($this->getTotal(), $this->getStart(), $limit);

		$this->cache[$store] = $page;

		return $this->cache[$store];
	}

	/**
	 * Get the data required for the map markers
	 * for the current search
	 *
	 * @param  array  $ids  Property Ids
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function mapMarkers(array $ids): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id',
		                        'lat',
		                        'lng',
		                        'property_name'
		]));

		$query->from($db->qn('#__knowres_property'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('approved') . '=1')
		      ->where($db->qn('private') . '=0');

		$query = self::intArrayString($db, $query, 'id', $ids);

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Perform the filtering for selected filters
	 *
	 * @param  DatabaseInterface  $db     Database instance
	 * @param  QueryInterface     $query  Current query
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	protected function doFiltering(DatabaseInterface $db, QueryInterface $query): QueryInterface
	{
		$query = self::intArrayString($db, $query, 'a.id', $this->state->get('filter.id'));
		$query = self::intFilter($db, $query, 'a.bedrooms', $this->state->get('filter.bedrooms'));
		$query = self::intFilter($db, $query, 'a.booking_type', $this->state->get('filter.booking_type'));
		$query = self::intFilter($db, $query, 'a.type_id', $this->state->get('filter.type_id'));
		$query = self::intFilter($db, $query, 'a.pets', $this->state->get('filter.pets'));
		$query = self::stringFilter($db, $query, 'a.property_area', $this->state->get('filter.area'));
		$query = self::jsonFindInSet($db, $query, $this->state->get('filter.feature'), 'property_features');

		return self::jsonFindInSet($db, $query, $this->state->get('filter.category'), 'categories');
	}

	/**
	 * Additional processing for flexible date search
	 *
	 * @param  DatabaseInterface  $db       Database instance
	 * @param  object             $data     Search data
	 * @param  array              $results  Results from base search
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	protected function doFlexible(DatabaseInterface $db, object $data, array $results): array
	{
		$properties = [];
		foreach ($results as $r) {
			$properties[(int) $r->id] = (int) $r->id;
		}

		$start = TickTock::modifyDays($data->arrival, (int) $data->flexible, '-');
		if ($start < date('Y-m-d')) {
			$start = date('Y-m-d');
		}

		$end = TickTock::modifyDays($data->departure, (int) $data->flexible);

		$query = $db->getQuery(true);
		$query->select('id, property_id, arrival, departure')
		      ->from($db->qn('#__knowres_contract'))
		      ->where($db->qn('property_id') . ' IN (' . implode(',', $properties) . ')')
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('arrival') . '<=' . $db->q($end))
		      ->where($db->qn('departure') . '>=' . $db->q($start))
		      ->order($db->qn('property_id'));

		$db->setQuery($query);
		$bookings = $db->loadObjectList();

		$dates = [];
		while ($start < $end) {
			$dates[] = $start;
			$start   = TickTock::modifyDays($start);
		}

		foreach ($properties as $p) {
			$booked_dates = [];
			$count        = 0;
			$found        = false;

			foreach ($bookings as $b) {
				if ($p == $b->property_id) {
					$range        = TickTock::allDatesBetween($b->arrival, $b->departure, true);
					$booked_dates = array_merge($booked_dates, $range);
				}
			}

			if (count($dates)) {
				foreach ($dates as $d) {
					if (in_array($d, $booked_dates)) {
						// Booked date reset count
						$count = 0;
					}
					else {
						$count++;
						if ($count >= $data->nights) {
							$found = true;
							break;
						}
					}
				}

				if (!$found) {
					unset($properties[$p]);
				}
			}
		}

		return $properties;
	}

	/**
	 * Get the category totals
	 *
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return array
	 */
	protected function getCountCategoryQuery(): array
	{
		$totals = [];

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('a.categories', 'id'));
		$query->from($db->qn('#__knowres_property', 'a'));
		$query = $this->doFiltering($db, $query);

		$db->setQuery($query);
		$data = $db->loadObjectList();

		foreach ($data as $d) {
			$categories = trim($d->id);
			$values     = Utility::decodeJson($categories, true);
			foreach ($values as $c) {
				if ($c) {
					if (!array_key_exists($c, $totals)) {
						$totals[$c] = array($c,
						                    1
						);
					}
					else {
						$count         = $totals[$c][1];
						$totals[$c][1] = $count + 1;
					}
				}
			}
		}

		return $totals;
	}

	/**
	 * Get the feature totals
	 *
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return array
	 */
	protected function getCountFeatureQuery(): array
	{
		$totals = [];

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);
		$query->select($this->getState('list.select', 'a.property_features as id'));
		$query->from($db->qn('#__knowres_property', 'a'));
		$query = $this->doFiltering($db, $query);

		$db->setQuery($query);
		$data = $db->loadObjectList();

		foreach ($data as $d) {
			$features = $d->id;
			$values   = Utility::decodeJson(trim($features), true);
			foreach ($values as $c) {
				if ($c) {
					if (!array_key_exists($c, $totals)) {
						$totals[$c] = array($c,
						                    1
						);
					}
					else {
						$count         = $totals[$c][1];
						$totals[$c][1] = $count + 1;
					}
				}
			}
		}

		return $totals;
	}

	/**
	 * Get the filter totals
	 *
	 * @param  string  $name  The field being totalled
	 *
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return array
	 */
	protected function getCountQuery(string $name = ''): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		if ($name) {
			$query->select($this->getState('list.select', $name . ' as id, COUNT(1) as total'));
		}
		else {
			$query->select($this->getState('list.select', 'id'));
		}

		$query->from($db->qn('#__knowres_property', 'a'));
		$query = self::intArrayString($db, $query, 'a.id', $this->state->get('filter.id'));

		if ($name != 'a.bedrooms') {
			$query = self::intFilter($db, $query, 'a.bedrooms', $this->state->get('filter.bedrooms'));
		}
		if ($name != 'a.booking_type') {
			$query = self::intFilter($db, $query, 'a.booking_type', $this->state->get('filter.booking_type'));
		}
		if ($name != 'a.type_id') {
			$query = self::intFilter($db, $query, 'a.type_id', $this->state->get('filter.type_id'));
		}
		if ($name != 'a.property_area') {
			$query = self::stringFilter($db, $query, 'a.property_area', $this->state->get('filter.area'));
		}

		$query = self::jsonFindInSet($db, $query, $this->state->get('filter.feature'), 'property_features');
		$query = self::jsonFindInSet($db, $query, $this->state->get('filter.category'), 'categories');

		if ($name) {
			$query->group($db->qn($name));
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Query for properties list
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))->select('a.sleeps + a.sleeps_extra AS ' .
			$db->qn('allsleeps'))->from($db->qn('#__knowres_property', 'a'))->select('(' .
			self::transSQ($db, 'region', 'a.region_id') .
			') AS ' .
			$db->q('region_name'))->select('(' .
			self::transSQ($db, 'type', 'a.type_id') .
			') AS ' .
			$db->q('type_name'));

		$query->select('IFNULL( ROUND(AVG(r.rating),1), 0) AS avgrating');
		$query->select('COUNT(DISTINCT r.id) as numreviews');
		$query->join('LEFT', $db->qn('#__knowres_review', 'r') .
			'ON' .
			$db->qn('r.property_id') .
			'=' .
			$db->qn('a.id') .
			' AND ' .
			$db->qn('r.state') .
			'=1 AND ' .
			$db->qn('r.held') .
			'=0');

		$query->select($db->qn('d.id', 'discount_id'));
		$query->join('LEFT', $db->qn('#__knowres_discount', 'd') .
			'ON' .
			$db->qn('d.property_id') .
			'=' .
			$db->qn('a.id') .
			' AND ' .
			$db->qn('d.state') .
			'=1' .
			' AND ' .
			$db->qn('d.valid_from') .
			'<=' .
			$db->q($today) .
			' AND ' .
			$db->qn('d.valid_to') .
			'>=' .
			$db->q($today));

		$query->select('GROUP_CONCAT(' . $db->qn('i.filename') . ') AS imagefilename');
		$query->select('GROUP_CONCAT(' . $db->qn('i.id') . ') AS imageid');
		$query->select('GROUP_CONCAT(' . $db->qn('i.property_order') . ') AS imageorder');
		$query->join('LEFT', $db->qn('#__knowres_image', 'i') .
			'ON' .
			$db->qn('i.property_id') .
			'=' .
			$db->qn('a.id') .
			'AND' .
			$db->qn('i.state') .
			'=1');

		$private = $this->state->get('filter.private', 0);
		$query->where($db->qn('a.private') . '=' . (int) $private)
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.approved') . '=1');

		$query = $this->doFiltering($db, $query);
		$query->group('id');

		if ($this->state->get('list.ordercustom')) {
			$orderCustom = $this->state->get('list.ordercustom');
			$query->order($db->escape($orderCustom));
		}
		else {
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
		$id .= ':' . json_encode($this->getState('filter.area'));
		$id .= ':' . json_encode($this->getState('filter.bedrooms'));
		$id .= ':' . json_encode($this->getState('filter.booking_type'));
		$id .= ':' . json_encode($this->getState('filter.category'));
		$id .= ':' . json_encode($this->getState('filter.feature'));
		$id .= ':' . json_encode($this->getState('filter.region_id'));
		$id .= ':' . json_encode($this->getState('filter.type_id'));
		$id .= ':' . json_encode($this->getState('filter.private'));

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
	protected function populateState($ordering = 'a.ordering', $direction = 'asc')
	{
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.id',
			$this->getUserStateFromRequest($this->context . '.filter.id', 'filter_id', '', 'string'));
		$this->setState('filter.area',
			$this->getUserStateFromRequest($this->context . '.filter.area', 'filter_area', '', 'string'));
		$this->setState('filter.bedrooms',
			$this->getUserStateFromRequest($this->context . '.filter.bedrooms', 'filter_bedrooms', '', 'string'));
		$this->setState('filter.booking_type',
			$this->getUserStateFromRequest($this->context . '.filter.booking_type', 'filter_booking_type', '',
				'string'));
		$this->setState('filter.category',
			$this->getUserStateFromRequest($this->context . '.filter.category', 'filter_category', '', 'string'));
		$this->setState('filter.feature',
			$this->getUserStateFromRequest($this->context . '.filter.feature', 'filter_feature', '', 'string'));
		$this->setState('filter.pets',
			$this->getUserStateFromRequest($this->context . '.filter.pets', 'filter_pets', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));
		$this->setState('filter.type_id',
			$this->getUserStateFromRequest($this->context . '.filter.type_id', 'filter_type_id', '', 'string'));
		$this->setState('filter.private',
			$this->getUserStateFromRequest($this->context . '.filter.private', 'filter_private', '', 'string'));

		$params = KrMethods::getParams();
		$this->setState('params', $params);
		$this->setState('layout', KrMethods::inputString('layout'));

		parent::populateState($ordering, $direction);
	}
}