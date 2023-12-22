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
use Joomla\Database\QueryInterface;
use RuntimeException;

use function stripos;
use function substr;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class AgenciesModel extends ListModel
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
				'name', 'a.name',
				'street', 'a.street',
				'town', 'a.town',
				'postcode', 'a.postcode',
				'region_id', 'a.region_id', 'region_name',
				'country_id', 'a.country_id', 'country_name',
				'telephone', 'a.telephone',
				'tax_code', 'a.tax_code',
				'company_number', 'a.company_number',
				'ordering', 'a.ordering',
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
	 * Get agency for manager
	 *
	 * @param  int  $manager_id  ID of manager
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getAgencyForManager(int $manager_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id', 'a.name', 'a.street', 'a.town', 'a.postcode', 'a.region_id', 'a.country_id', 'a.telephone',
			'a.tax_code', 'a.company_number'
		]));
		$query->from($db->qn('#__knowres_agency', 'a'))
		      ->join('LEFT',
			      $db->qn('#__knowres_manager', 'm') . ' ON ' . $db->qn('m.agency_id') . '=' . $db->qn('a.id'))
		      ->where($db->qn('m.id') . '=' . $manager_id)
		      ->setLimit(1);
		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get all published agencies.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAll(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id', 'a.name', 'a.street', 'a.town', 'a.postcode', 'a.region_id', 'a.country_id', 'a.telephone',
			'a.tax_code', 'a.company_number', 'a.ordering', 'a.state', 'a.created_by', 'a.created_at', 'a.updated_by',
			'a.updated_at'
		]));

		$query->from($db->qn('#__knowres_agency', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->order($db->qn('a.name'));

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

		$lang           = KrMethods::getLanguageTag();
		$item           = 'region';
		$subQueryRegion = $db->getQuery(true);
		$subQueryRegion->select('sub.text')
		               ->from($db->qn('#__knowres_translation', 'sub'))
		               ->where($db->qn('sub.item') . '=' . $db->q($item))
		               ->where($db->qn('sub.item_id') . '=' . $db->qn('a.region_id'))
		               ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		               ->setLimit(1);

		$item            = 'country';
		$subQueryCountry = $db->getQuery(true);
		$subQueryCountry->select('sub.text')
		                ->from($db->qn('#__knowres_translation', 'sub'))
		                ->where($db->qn('sub.item') . '=' . $db->q($item))
		                ->where($db->qn('sub.item_id') . '=' . $db->qn('a.country_id'))
		                ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang)
			                . ' THEN 1 ELSE 2 END )')
		                ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_agency', 'a'));

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
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

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
				$query->where($db->qn('a.name') . ' LIKE ' . $search);
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
		$id .= ':' . $this->getState('filter.region_id');
		$id .= ':' . $this->getState('filter.country_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering   Default ordering
	 * @param  string  $direction  Default ordering direction
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.name', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));

		$params = KrMethods::getParams();
		$this->setState('params', $params);

		parent::populateState($ordering, $direction);
	}
}