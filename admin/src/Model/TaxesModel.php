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

use function is_numeric;

/**
 * Taxes list model
 *
 * @since 2.5.0
 */
class TaxesModel extends ListModel
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
				'country_id', 'a.country_id',
				'region_id', 'a.region_id',
				'town_id', 'a.town_id',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name', 'country_name', 'region_name', 'town_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  2.5.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item     = 'tax';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$item            = "country";
		$subQueryCountry = $db->getQuery(true);
		$subQueryCountry->select('sub.text')
		                ->from($db->qn('#__knowres_translation', 'sub'))
		                ->where($db->qn('sub.item') . '=' . $db->q($item))
		                ->where($db->qn('sub.item_id') . '=' . $db->qn('a.country_id'))
		                ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		                ->setLimit(1);

		$item           = "region";
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
		               ->from($db->qn('#__knowres_translation', 'sub'))
		               ->where($db->qn('sub.item') . '=' . $db->q($item))
		               ->where($db->qn('sub.item_id') . '=' . $db->qn('a.region_id'))
		               ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		               ->setLimit(1);

		$item         = "town";
		$subQueryTown = $db->getQuery(true);
		$subQueryTown->select('sub.text')
		             ->from($db->qn('#__knowres_translation', 'sub'))
		             ->where($db->qn('sub.item') . '=' . $db->q($item))
		             ->where($db->qn('sub.item_id') . '=' . $db->qn('a.town_id'))
		             ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		             ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_tax', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQueryCountry->__toString() . ') ' . $db->q('country_name'));
		$query->select('(' . $subQueryRegion->__toString() . ') ' . $db->q('region_name'));
		$query->select('(' . $subQueryTown->__toString() . ') ' . $db->q('town_name'));

		$query = self::commonJoins($db, $query);

		$filter_country_id = $this->state->get('filter.country_id');
		if (!empty($filter_country_id))
		{
			$query->where($db->qn('a.country_id') . '=' . (int) $filter_country_id);
		}

		$filter_region_id = $this->state->get('filter.region_id');
		if (!empty($filter_region_id))
		{
			$query->where($db->qn('a.region_id') . '=' . (int) $filter_region_id);
		}

		$filter_town_id = $this->state->get('filter.town_id');
		if (!empty($filter_town_id))
		{
			$query->where($db->qn('a.town_id') . '=' . (int) $filter_town_id);
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
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
				$search = $db->q('%' . $search . '%');
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
	 * @since 2.5.0
	 * @return    string
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Default orderting field
	 * @param   string  $direction  Default direction value
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	protected function populateState($ordering = 'a.country_id', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));
		$this->setState('filter.town_id',
			$this->getUserStateFromRequest($this->context . '.filter.town_id', 'filter_town_id', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));

		$params = KrMethods::getParams();
		$this->setState('params', $params);

		parent::populateState($ordering, $direction);
	}
}