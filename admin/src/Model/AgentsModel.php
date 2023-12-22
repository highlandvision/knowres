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
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class AgentsModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param  array  $config An optional associative array of configuration settings.
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
				'service_id', 'a.service_id',
				'foreign_key', 'a.foreign_key',
				'mandatory_extras_charge', 'a.mandatory_extras_charge',
				'mandatory_extras_excluded', 'a.mandatory_extras_excluded',
				'deposit', 'a.deposit',
				'deposit_paid', 'a.deposit_paid',
				'commission', 'a.commission',
				'provisional_email_text', 'a.provisional_email_text',
				'confirmed_email_text', 'a.confirmed_email_text',
				'invoice_text', 'a.invoice_text',
				'foreign_key_reqd', 'a.foreign_key_reqd',
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
	 * Get agent by service reference
	 *
	 * @param  int     $service_id   ID of service
	 * @param  string  $foreign_key  Agent foreign key
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAgentByForeignKey(int $service_id, string $foreign_key): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_agent', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.service_id') . '=' . $service_id)
		      ->where($db->qn('a.foreign_key') . '=' . $db->q($foreign_key));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get agent by service reference
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getAgents(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('id', 'name')))
		      ->from($db->qn('#__knowres_agent'))
		      ->where($db->qn('state') . '=1')
		      ->order($db->qn('name'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException if no database connection
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_agent', 'a'));
		$query->select($db->qn('uc.name', 'editor'));
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('service.name AS service_name');
		$query->join('LEFT', '#__knowres_service AS service ON service.id = a.service_id');
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . ' = ' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_service_id = $this->state->get("filter.service_id");
		if ($filter_service_id)
		{
			$query->where($db->qn('a.service_id') . ' = ' . (int) $filter_service_id);
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
		$id .= ':' . $this->getState('filter.service_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  null|string  $ordering
	 * @param  null|string  $direction
	 *
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.name', $direction = 'desc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.service_id',
			$this->getUserStateFromRequest($this->context . '.filter.service_id', 'filter_service_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}