<?php
/**
 * @package    Know Reservations
 * @subpackage Admin model
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\Translations;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function is_numeric;
use function strlen;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class RegionsModel extends ListModel {
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
		if (empty($config['filter_fields'])) {
			$config['filter_fields'] = array(
				'id',
				'a.id',
				'region_iso',
				'a.region_iso',
				'country_id',
				'a.country_id',
				'allow_property',
				'a.allow_property',
				'property_licence',
				'a.property_licence',
				'map_zoom',
				'a.map_zoom',
				'map_zoom_max',
				'a.map_zoom_max',
				'code',
				'a.code',
				'state',
				'a.state',
				'created_by',
				'a.created_by',
				'created_at',
				'a.created_at',
				'updated_by',
				'a.updated_by',
				'updated_at',
				'a.updated_at',
				'name',
				'country_name',
				'blurb'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Return regions as per requested params
	 *
	 * @param  bool     $allow_property  Set True to return only property regions
	 * @param  ?string  $ordering        Name of ordering field
	 * @param  int      $country_id      ID of country
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAllRegions(bool $allow_property = false, ?string $ordering = null, int $country_id = 0): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('id')
			->from($db->qn('#__knowres_region'))
			->where($db->qn('state') . '=1');

		if ($country_id) {
			$query->where($db->qn('country_id') . '=' . $country_id);
		}
		if ($allow_property) {
			$query->where($db->qn('allow_property') . '=1');
		}
		if (!is_null($ordering)) {
			$query->order($db->qn($ordering));
		}

		$db->setQuery($query);
		$items        = $db->loadObjectList();
		$Translations = new Translations();

		return $Translations->addTranslationToObject($items, 'region');
	}

	/**
	 * Get the distinct regions for published properties
	 *
	 * @throws RuntimeException
	 * @since  3.2
	 * @return array
	 */
	public function getDistinctRegions(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . '=' . $db->q($item))
			->where($db->qn('sub.item_id') . '=' . $db->qn('a.region_id'))
			->where($db->qn('sub.field') . '=' . $db->q('name'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$item            = 'country';
		$subQueryCountry = $db->getQuery(true);
		$subQueryCountry->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . '=' . $db->q($item))
			->where($db->qn('sub.item_id') . '=' . $db->qn('a.country_id'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query->select('DISTINCT a.region_id')
			->from($db->qn('#__knowres_property', 'a'))
			->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('name'))
			->select('(' . $subQueryCountry->__toString() . ') ' . $db->q('country_name'));

		$query->select($db->qn(['r.created_at', 'r.updated_at']));
		$query->join('LEFT', $db->qn('#__knowres_region', 'r') . 'ON' . $db->q('r.id') . '=' . $db->q('a.region_id'));

		$query->where($db->qn('a.state') . '=1')
			->where($db->qn('a.approved') . '=1')
			->order($db->qn('country_name'))
			->order($db->qn('name'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get region id from region name and country ID
	 *
	 * @param  string  $region      Name of region
	 * @param  int     $country_id  ID of country
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getRegionIdByNameCountry(string $region, int $country_id): mixed
	{
		$db = $this->getDatabase();

		$lang = KrMethods::getLanguageTag();

		$item     = 'region';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
			->where($db->qn('sub.field') . ' = ' . $db->q('name'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query = $db->getQuery(true)
			->select('a.id')
			->from($db->qn('#__knowres_region', 'a'))
			->where($db->qn('a.country_id') . ' = ' . $country_id)
			->where($db->qn('a.state') . ' = 1')
			->setLimit(1);

		if (strlen($region) == 2) {
			$query->where($db->qn('a.region_iso') . ' = ' . $db->q($region));
		} else {
			$query->where('(' . $subQuery->__toString() . ') ' . ' LIKE ' . $db->q('%' . $region . '%'));
		}

		$db->setQuery($query);

		return $db->loadResult();
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

		$item     = "region";
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
			->where($db->qn('sub.field') . ' = ' . $db->q('name'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$subQuery1 = $db->getQuery(true);
		$subQuery1->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
			->where($db->qn('sub.field') . ' = ' . $db->q('blurb'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$item            = "country";
		$subQueryCountry = $db->getQuery(true);
		$subQueryCountry->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.country_id'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang)
			        . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query->select($db->qn(['a.id',
		                        'a.region_iso',
		                        'a.country_id',
		                        'a.allow_property',
		                        'a.map_zoom',
		                        'a.map_zoom_max',
		                        'a.code',
		                        'a.property_licence',
		                        'a.state',
		                        'a.checked_out',
		                        'a.checked_out_time',
		                        'a.created_by',
		                        'a.created_at',
		                        'a.updated_by',
		                        'a.updated_at'
		]));
		$query->from($db->qn('#__knowres_region', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQuery1->__toString() . ') ' . $db->q('blurb'));
		$query->select('(' . $subQueryCountry->__toString() . ') ' . $db->q('country_name'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");

		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');

		$query->select($db->qn('updated_by.name', 'updated_by'));
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state)) {
			$query->where($db->qn('a.state') . ' = ' . (int) $state);
		} else if ($state === '') {
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_country_id = $this->getState("filter.country_id");
		if ($filter_country_id) {
			$query->where($db->qn('a.country_id') . ' = ' . (int) $filter_country_id);
		}

		$filter_allow_property = $this->getState("filter.allow_property");
		if (is_numeric($filter_allow_property)) {
			$query->where($db->qn('a.allow_property') . ' = ' . (int) $filter_allow_property);
		}

		$filter_property_licence = $this->getState("filter.property_licence");
		if (is_numeric($filter_property_licence)) {
			$query->where($db->qn('a.property_licence') . ' = ' . (int) $filter_property_licence);
		}

		$search = $this->getState('filter.search');
		if (!empty($search)) {
			if (stripos($search, 'id:') === 0) {
				$query->where($db->qn('a.id') . ' = ' . (int) substr($search, 3));
			} else {
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where('(' . $subQuery->__toString() . ') ' . ' LIKE ' . $search);
			}
		}

		$orderCol  = $this->getState('list.ordering');
		$orderDirn = $this->getState('list.direction');
		if ($orderCol && $orderDirn) {
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
	 * @return  string  A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.country_id');
		$id .= ':' . $this->getState('filter.allow_property');
		$id .= ':' . $this->getState('filter.property_licence');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  ?string  $ordering   Field to order by
	 * @param  ?string  $direction  Ordering directopn
	 *
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'name', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));
		$this->setState('filter.allow_property', $this->getUserStateFromRequest($this->context . '.filter.allow_property',
			'filter_allow_property', '', 'string'));
		$this->setState('filter.property_licence', $this->getUserStateFromRequest($this->context . '.filter.property_licence',
			'filter_property_licence', '', 'string'));

		$params = KrMethods::getParams();
		$this->setState('params', $params);

		parent::populateState($ordering, $direction);
	}
}