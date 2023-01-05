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

/**
 * Seasons list model.
 *
 * @since 1.0.0
 */
class SeasonsModel extends ListModel
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
			$config['filter_fields'] = ['id', 'a.id',
			                            'cluster_id', 'a.cluster_id',
			                            'valid_from', 'a.valid_from',
			                            'valid_to', 'a.valid_to',
			                            'minimum_nights', 'a.minimum_nights',
			                            'season', 'a.season',
			                            'state', 'a.state',
			                            'name', 'cluster_name'];
		}

		parent::__construct($config);
	}

	/**
	 * Get minimum stay nights for a season
	 *
	 * @param   int     $cluster_id  ID of cluster
	 * @param   string  $arrival     Arrival date
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return ?int
	 */
	public function getMinimumNights(int $cluster_id, string $arrival): ?int
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('minimum_nights'));
		$query->from($db->qn('#__knowres_season'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('cluster_id') . '=' . $cluster_id)
		      ->where($db->qn('valid_from') . '<=' . $db->q($arrival))
		      ->where($db->qn('valid_to') . '>=' . $db->q($arrival))
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get all seasons or for a specified cluster
	 *
	 * @param   int  $cluster_id  ID of cluster
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getSeasons(int $cluster_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('season',
		                             'minimum_nights',
		                             'valid_from',
		                             'valid_to',
		                             'cluster_id')));

		$query->from($db->qn('#__knowres_season'))
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('valid_to') . '>=' . $db->q(TickTock::getDate()));

		if ($cluster_id)
		{
			$query->where($db->qn('cluster_id') . '=' . $cluster_id);
		}

		$query->order($db->qn('valid_from'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get seasons for a cluster and date range
	 *
	 * @param   int     $cluster_id  ID of cluster
	 * @param   string  $from        Date from
	 * @param   string  $to          Date to
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getSeasonsByClusterDateRange(int $cluster_id, string $from, string $to): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('id',
		                             'cluster_id',
		                             'valid_from',
		                             'valid_to',
		                             'minimum_nights',
		                             'season')));

		$query->from($db->qn('#__knowres_season'))
		      ->where($db->qn('state') . '=1');

		if ($cluster_id)
		{
			$query->where($db->qn('cluster_id') . '=' . $cluster_id);
		}

		if ($from)
		{
			$query->where($db->qn('valid_to') . '>=' . $db->q($from));
		}

		if ($to)
		{
			$query->where($db->qn('valid_from') . '<=' . $db->q($to));
		}

		$query->order($db->qn('valid_from'));

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

		$item     = 'season';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$item            = 'cluster';
		$subQueryCluster = $db->getQuery(true);
		$subQueryCluster->select('sub.text')
		                ->from($db->qn('#__knowres_translation', 'sub'))
		                ->where($db->qn('sub.item') . '=' . $db->q($item))
		                ->where($db->qn('sub.item_id') . '=' . $db->qn('a.cluster_id'))
		                ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		                ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_season', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQueryCluster->__toString() . ') ' . $db->q('cluster_name'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join('LEFT', $db->qn('#__users', 'uc') . ' ON uc.id=a.checked_out');
		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select($db->qn('updated_by.name', 'updated_by'));
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

		$filter_cluster_id = $this->state->get("filter.cluster_id");
		if ($filter_cluster_id)
		{
			$query->where("a.cluster_id = '" . $db->escape($filter_cluster_id) . "'");
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
	 * @return string
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.cluster_id');
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
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.valid_from', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.cluster_id',
			$this->getUserStateFromRequest($this->context . '.filter.cluster_id', 'filter_cluster_id', '', 'string'));
		$this->setState('filter.valid_from',
			$this->getUserStateFromRequest($this->context . '.filter.valid_from', 'filter_valid_from', '', 'string'));
		$this->setState('filter.valid_to',
			$this->getUserStateFromRequest($this->context . '.filter.valid_to', 'filter_valid_to', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}