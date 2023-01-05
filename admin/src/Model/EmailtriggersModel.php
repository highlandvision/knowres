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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Methods supporting a list of email triggers
 *
 * @since 1.0.0
 */
class EmailtriggersModel extends ListModel
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
				'email_template_id',
				'a.email_template_id',
				'name',
				'a.name',
				'trigger_actual',
				'a.trigger_actual',
				'trigger_cron',
				'a.trigger_cron',
				'send_guest',
				'a.send_guest',
				'send_owner',
				'a.send_owner',
				'send_caretaker',
				'a.send_caretaker',
				'days',
				'a.days',
				'days_before',
				'a.days_before',
				'booking_status',
				'a.booking_status',
				'send_admin',
				'a.send_admin',
				'send_agent',
				'a.send_agent',
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
				'email_template_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get list items
	 *
	 * @param   string  $trigger_actual  Email trigger
	 * @param   int     $trigger_id      ID of required trigger
	 *
	 * @throws RuntimeException
	 * @since 1.0.0
	 * @return mixed
	 */
	public function getTriggers(string $trigger_actual, int $trigger_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id',
		                        'email_template_id',
		                        'name',
		                        'trigger_actual',
		                        'trigger_cron',
		                        'send_guest',
		                        'send_owner',
		                        'send_caretaker',
		                        'days',
		                        'days_before',
		                        'booking_status',
		                        'send_admin',
		                        'send_agent',
		                        'state',
		                        'created_by',
		                        'created_at',
		                        'updated_by',
		                        'updated_at',
		]));

		$query->from($db->qn('#__knowres_email_trigger'))
		      ->where($db->qn('trigger_actual') . '=' . $db->q($trigger_actual))
		      ->where($db->qn('state') . '=1');

		if ($trigger_id)
		{
			$query->where($db->qn('id') . '=' . $trigger_id);
		}

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
		      ->from($db->qn('#__knowres_email_trigger', 'a'));
		$query = self::commonJoins($db, $query);
		$query->select('(' . self::transSQ($db, 'emailtemplate', 'a.email_template_id',
				'name') . ') AS ' . $db->q('email_template_name'));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$filter_email_template_id = $this->state->get("filter.email_template_id");
		if ($filter_email_template_id)
		{
			$query->where($db->qn('a.email_template_id') . '=' . (int) $filter_email_template_id);
		}

		$filter_trigger_actual = $this->state->get('filter.trigger_actual');
		if ($filter_trigger_actual)
		{
			$query->where($db->qn('a.trigger_actual') . '=' . $db->q($filter_trigger_actual));
		}

		$filter_trigger_cron = $this->state->get('filter.trigger_cron');
		if ($filter_trigger_cron)
		{
			$query->where($db->qn('a.trigger_cron') . '=' . $db->q($filter_trigger_cron));
		}

		$filter_booking_status = $this->state->get('filter.booking_status');
		if (is_numeric($filter_booking_status))
		{
			$query->where('FIND_IN_SET( ' . (int) $filter_booking_status . ', booking_status) > 0');
		}
		else if (is_array($filter_booking_status))
		{
			$query->where('a.booking_status IN (' . implode(',', array_map('intval', $filter_booking_status)) . ')');
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
				$query->where('( a.name LIKE ' . $search . ' )');
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
	 * @return    string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.email_template_id');
		$id .= ':' . $this->getState('filter.trigger_actual');
		$id .= ':' . $this->getState('filter.trigger_cron');
		$id .= ':' . $this->getState('filter.trigger_statue');

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

		$this->setState('filter.email_template_id',
			$this->getUserStateFromRequest($this->context . '.filter.email_template_id', 'filter_email_template_id', '',
				'string'));

		$this->setState('filter.trigger_actual',
			$this->getUserStateFromRequest($this->context . '.filter.trigger_actual', 'filter_trigger_actual', '',
				'string'));

		$this->setState('filter.trigger_cron',
			$this->getUserStateFromRequest($this->context . '.filter.trigger_cron', 'filter_trigger_cron', '',
				'string'));

		$this->setState('filter.booking_status',
			$this->getUserStateFromRequest($this->context . '.filter.booking_status', 'filter_booking_status', '',
				'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}