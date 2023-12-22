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
use HighlandVision\KR\Translations;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Map markers list model.
 *
 * @since 1.0.0
 */
class MapmarkersModel extends ListModel
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
				'id',
				'a.id',
				'map_category_id',
				'a.map_category_id',
				'region',
				'a.region',
				'country_id',
				'a.country_id',
				'lat',
				'a.lat',
				'lng',
				'a.lng',
				'region_id',
				'a.region_id',
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
				'mapcategory_icon',
				'mapcategory_name',
				'description',
				'name',
				'region_name',
				'country_name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get all markers (plus optionally by region)
	 *
	 * @param   int  $region_id  Set to value for all in region
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function getAll(int $region_id = 0): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true)->select($db->qn(array(
			'a.id',
			'a.map_category_id',
			'a.region_id',
			'a.country_id',
			'a.lat',
			'a.lng',
			'a.state',
			'a.created_by',
			'a.created_at',
			'a.updated_by',
			'a.updated_at',
		)));

		$query->select($db->qn('mc.mapicon', 'mapcategory_mapicon'));
		$query->join('LEFT',
			$db->qn('#__knowres_map_category', 'mc') . ' ON ' . $db->qn('mc.id') . ' = ' . $db->qn('map_category_id'));

		$query->from($db->qn('#__knowres_map_marker', 'a'))->where($db->qn('a.state') . ' = 1');

		if ($region_id)
		{
			$query->where($db->qn('a.region_id') . ' = ' . $region_id);
		}

		$db->setQuery($query);

		$items = $db->loadObjectList();

		$Translations = new Translations();
		$items        = $Translations->addTranslationToObject($items, 'mapmarker');
		$items        = $Translations->addTranslationToObject($items, 'mapmarker', 'id', 'description', 'description',
			false);

		return $Translations->addTranslationToObject($items, 'mapcategory', 'map_category_id', 'name',
			'mapcategory_name', false);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return    QueryInterface
	 */
	protected function getListQuery(): QueryInterface

	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item     = 'mapmarker';
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
		          ->where($db->qn('sub.field') . ' = ' . $db->q('description'))
		          ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		          ->setLimit(1);

		$item                = "mapcategory";
		$subQueryMapcategory = $db->getQuery(true);
		$subQueryMapcategory->select('sub.text')
		                    ->from($db->qn('#__knowres_translation', 'sub'))
		                    ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		                    ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.map_category_id'))
		                    ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang)
			                    . ' THEN 1 ELSE 2 END )')
		                    ->setLimit(1);

		$item           = "region";
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
		               ->from($db->qn('#__knowres_translation', 'sub'))
		               ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		               ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.region_id'))
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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_map_marker', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQuery1->__toString() . ') ' . $db->q('description'));
		$query->select('(' . $subQueryMapcategory->__toString() . ') ' . $db->q('mapcategory_name'));
		$query->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'));
		$query->select('(' . $subQueryCountry->__toString() . ') ' . $db->q('country_name'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');
		$query->select('#__knowres_map_category.mapicon AS mapcategory_mapicon');
		$query->join('LEFT',
			'#__knowres_map_category AS #__knowres_map_category ON #__knowres_map_category.id = a.map_category_id');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where('a.state = ' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where('(a.state IN (0, 1))');
		}

		$filter_map_category_id = $this->state->get("filter.map_category_id");
		if ($filter_map_category_id)
		{
			$query->where($db->qn('a.map_category_id') . " = " . (int) $filter_map_category_id);
		}

		$filter_country_id = $this->state->get("filter.country_id");
		if ($filter_country_id)
		{
			$query->where("a.country_id = " . (int) $filter_country_id);
		}

		$filter_region_id = $this->state->get("filter.region_id");
		if ($filter_region_id)
		{
			$query->where("a.region_id = " . (int) $filter_region_id);
		}

		$orderCol  = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');
		if ($orderCol && $orderDirn)
		{
			$query->order($db->escape($orderCol . ' ' . $orderDirn));
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
		$id .= ':' . $this->getState('filter.map_category_id');
		$id .= ':' . $this->getState('filter.country_id');
		$id .= ':' . $this->getState('filter.region_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering
	 * @param   string  $direction
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function populateState($ordering = "a.id", $direction = "asc"): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));

		$this->setState('filter.map_category_id',
			$this->getUserStateFromRequest($this->context . '.filter.map_category_id', 'filter_map_category_id', '',
				'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}