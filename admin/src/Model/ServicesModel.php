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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function defined;
use function is_null;

/**
 * Services list model.
 *
 * @since 1.0.0
 */
class ServicesModel extends ListModel
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
				'agency_id', 'a.agency_id',
				'currency', 'a.currency',
				'id', 'a.id',
				'name', 'a.name',
				'ordering', 'a.ordering',
				'plugin', 'a.plugin',
				'property_id', 'a.property_id',
				'type', 'a.type',
				'state', 'a.state',
				'agency_name', 'property_name'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Check if service for plugin is enabled
	 *
	 * @param   bool    $required   Required - true to throw exception if not found
	 * @param   string  $plugin     Service plugin
	 * @param   int     $agency_id  ID of agency
	 * @param   string  $currency   Currency of service
	 *
	 * @throws RuntimeException
	 * @since  3.2.0
	 * @return int
	 */
	public static function checkForSingleService(bool $required, string $plugin, int $agency_id = 0,
		string $currency = ''): int
	{
		$services = KrFactory::getListModel('services')->getServicesByPlugin($plugin, $agency_id, $currency);
		if (count($services) > 1)
		{
			throw new RuntimeException('Multiple services found for service ' . $plugin . ' Please fix!');
		}

		if (!count($services))
		{
			if ($required)
			{
				throw new RuntimeException('No Service details found for service ' . $plugin . ' Please add!');
			}
			else
			{
				return 0;
			}
		}

		return $services[0]->id;
	}

	/**
	 * Get gateway payment services
	 *
	 * @param   mixed  $currency     String or array of currencies
	 * @param   int    $agency_id    ID of agency
	 * @param   int    $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getGateways(mixed $currency = null, int $agency_id = 0, int $property_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_service', 'a'))
		      ->select($db->qn('agency.name', 'agency_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_agency', 'agency') . ' ON ' . $db->qn('agency.id') . '=' . $db->qn('a.agency_id'))
		      ->where($db->qn('a.type') . '=' . $db->q('g'))
		      ->where($db->qn('a.state') . ' = 1');

		if (!is_null($currency))
		{
			if (is_string($currency))
			{
				$query->where($db->qn('a.currency') . '=' . $db->q($currency));
			}
			else if (is_array($currency))
			{
				$query->where($db->qn('a.currency') . ' IN (' . implode(',',
						$db->q(array_map('strval', $currency))) . ')');
			}
		}

		if ($agency_id)
		{
			$query->where($db->qn('a.agency_id') . '=' . $agency_id);
		}
		else
		{
			$query->where($db->qn('a.agency_id') . '>0');
		}

		$pids = [0,
		         $property_id];
		$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $pids)) . ')');

		$query = self::Order($db, $query, $this->state->get('list.ordering'),
			$this->state->get('list.direction'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get services by plugin name
	 *
	 * @param   string  $plugin     Service internal name
	 * @param   int     $agency_id  ID of agency
	 * @param  ?string  $currency   ISO currency
	 * @param  bool     $published  Publishd rows only
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getServicesByPlugin(string $plugin, int $agency_id = 0, ?string $currency = null, bool $published = true): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_service', 'a'))
		      ->select($db->qn('p.property_name', 'property_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('a.property_id'))
		      ->select($db->qn('ag.name', 'agency_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_agency', 'ag') . 'ON' . $db->qn('ag.id') . '=' . $db->qn('a.agency_id'))
		      ->where($db->qn('a.plugin') . '=' . $db->q(strtolower($plugin)));

		if ($published)
		{
			$query->where($db->qn('a.state') . '=1');
		}

		if (!is_null($currency))
		{
			$query->where($db->qn('a.currency') . '=' . $db->q($currency));
		}

		if ($agency_id)
		{
			$query->where($db->qn('a.agency_id') . '=' . $agency_id);
		}
		else
		{
			$query->where($db->qn('a.agency_id') . '<>0');
		}

		$query = self::Order($db, $query, $this->state->get('list.ordering'),
			$this->state->get('list.direction'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get services by type
	 *
	 * @param   string  $type  Service type
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getServicesByType(string $type): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.id, a.plugin, a.parameters'))
		      ->from($db->qn('#__knowres_service', 'a'))
		      ->where($db->qn('a.type') . '=' . $db->q($type))
		      ->where($db->qn('a.agency_id') . '>0')
		      ->where($db->qn('a.state') . '=1');

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

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_service', 'a'));

		$query = self::commonJoins($db, $query);

		$query->select($db->qn('property.property_name', 'property_name'))
		      ->join('LEFT', $db->qn('#__knowres_property', 'property') . 'ON' . $db->qn('property.id') . '='
			      . $db->qn('a.property_id'));
		$query->select($db->qn('agency.name', 'agency_name'))
		      ->join('LEFT', $db->qn('#__knowres_agency', 'agency') . 'ON' . $db->qn('agency.id') . '='
			      . $db->qn('a.agency_id'));

		$query->select('CASE type 
		WHEN "g" THEN "' . KrMethods::plain('COM_KNOWRES_SERVICE_GATEWAY') . '"
		WHEN "s" THEN "' . KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_SERVICE') . '"
		WHEN "c" THEN "' . KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_CHANNEL') . '"
		WHEN "i" THEN "' . KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_ICAL') . '"
		END AS "type_name"');

		$filter_plugin = $this->state->get('filter.plugin');
		if ($filter_plugin)
		{
			$query->where($db->qn('a.plugin') . '=' . $db->q($filter_plugin));
		}

		$global = $this->getState('filter.global');
		if (is_numeric($global) && $global == 1)
		{
			$query->where($db->qn('a.agency_id') . '=0');
		}
		else if (is_numeric($global) && $global == 2)
		{
			$query->where($db->qn('a.agency_id') . '>0');
		}
		else
		{
			$query->where($db->qn('a.agency_id') . '>=0');
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}

		$filter_agency_id = $this->state->get('filter.agency_id');
		if (is_numeric($filter_agency_id))
		{
			$query->where($db->qn('a.agency_id') . '=' . (int) $filter_agency_id);
		}
		else
		{
			$query->where($db->qn('a.agency_id') . '>0');
		}

		$filter_currency = $this->state->get('filter.currency');
		if ($filter_currency)
		{
			$query->where($db->qn('a.currency') . '=' . $db->q($filter_currency));
		}

		$filter_type = $this->state->get('filter.type');
		if ($filter_type)
		{
			$query->where($db->qn('a.type') . '=' . $db->q($filter_type));
		}

		$search = $this->getState('filter.search');
		$query  = self::Search($db, $query, $search, 'a.name');

		return self::Order($db, $query, $this->state->get('list.ordering'),
			$this->state->get('list.direction'));
	}

	/**
	 * Get services for view New
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getNew(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_service', 'a'))
		      ->where($db->qn('a.agency_id') . '=0')
		      ->where($db->qn('a.state') . '=1')
		      ->order($db->qn('a.type'));

		$db->setQuery($query);

		return $db->loadObjectList();
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
	 * @return string  A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.global');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.agency_id');
		$id .= ':' . $this->getState('filter.currency');
		$id .= ':' . $this->getState('filter.type');
		$id .= ':' . $this->getState('filter.plugin');

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
	protected function populateState($ordering = 'a.name', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.global',
			$this->getUserStateFromRequest($this->context . '.filter.global', 'filter_global', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.agency_id',
			$this->getUserStateFromRequest($this->context . '.filter.agency_id', 'filter_agency_id', '', 'string'));
		$this->setState('filter.currency',
			$this->getUserStateFromRequest($this->context . '.filter.currency', 'filter_currency', '', 'string'));
		$this->setState('filter.type',
			$this->getUserStateFromRequest($this->context . '.filter.type', 'filter_type', '', 'string'));
		$this->setState('filter.plugin',
			$this->getUserStateFromRequest($this->context . '.filter.plugin', 'filter_plugin', '', 'string'));

		$params = KrMethods::getParams();
		$this->setState('params', $params);

		$this->setState('list.select',
			'a.id, a.name, a.currency, a.property_id, a.agency_id, a.plugin, a.type, a.parameters, a.ordering, a.state,
			 a.checked_out, a.checked_out_time, a.created_by, a.created_at, a.updated_by, a.updated_at, a.version');

		parent::populateState($ordering, $direction);
	}
}