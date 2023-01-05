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
use HighlandVision\KR\TickTock;
use Joomla\Database\QueryInterface;
use RuntimeException;
use stdClass;

/**
 * Property icals list model.
 *
 * @since 2.0
 */
class PropertyicalsModel extends ListModel
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
				'property_id', 'a.property_id',
				'service_id', 'a.service_id',
				'name', 'a.name',
				'link', 'a.link',
				'last_update', 'a.last_update',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'service_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get propertyicals that are due for import
	 *
	 * @param   int  $service_id  ID of service
	 * @param   int  $hours       #hours for schedule
	 *
	 * @throws Exception
	 * @since  2.0
	 * @return array
	 */
	public function getByTime(int $service_id, int $hours = 24): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$ts = TickTock::modifyHours('now', $hours, '-');

		$query->select($db->qn(['a.id',
		                        'a.property_id',
		                        'a.link',
		                        'a.icsdata']))
		      ->from($db->qn('#__knowres_property_ical', 'a'))
		      ->join('LEFT', $db->qn('#__knowres_property', 'property') . 'ON' . $db->qn('property.id') . '='
			      . $db->qn('a.property_id'))
		      ->where($db->qn('a.service_id') . '=' . $service_id)
		      ->where($db->qn('property.state') . '=1')
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.last_update') . '<' . $db->q($ts))
		      ->orwhere($db->qn('a.last_update') . 'IS NULL');
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Rule validate Property ical edit for duplicates
	 *
	 * @param   int  $id          ID of row being edited
	 * @param   int  $value       ID of property
	 * @param   int  $service_id  ID of service
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return bool
	 */
	public function rulePropertyical(int $id, int $value, int $service_id): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('COUNT(*)')
		      ->from($db->qn('#__knowres_property_ical'))
		      ->where($db->qn('id') . ' <> ' . $id)
		      ->where($db->qn('property_id') . '=' . $value)
		      ->where($db->qn('service_id') . '=' . $service_id);

		$db->setQuery($query);

		return (bool) $db->loadResult();
	}

	/**
	 * Update last updated
	 *
	 * @param   int     $id       ID of Table
	 * @param  ?string  $icsdata  Ics file data receieved
	 *
	 * @throws Exception
	 * @since 2.0
	 */
	public function updateLastUpdated(int $id, ?string $icsdata = null)
	{
		$data              = new stdClass();
		$data->id          = $id;
		$data->last_update = TickTock::getTS();
		$data->icsdata     = $icsdata;
		KrFactory::update('property_ical', $data);
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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_property_ical', 'a'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');
		$query->select('property.property_name AS property_name');
		$query->join('LEFT', '#__knowres_property AS property ON property.id = a.property_id');
		$query->select('service.name AS service_name');
		$query->join('LEFT', '#__knowres_service AS service ON service.id = a.service_id');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_property_id = $this->state->get("filter.property_id");
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
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

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since 2.0
	 */
	protected function populateState($ordering = 'a.id', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		$this->setState('list.select', 'a.id, a.property_id, a.service_id, a.name, a.link, a.last_update,
			a.state, a.created_by, a.created_at, a.updated_by, a.updated_at');

		parent::populateState($ordering, $direction);
	}
}