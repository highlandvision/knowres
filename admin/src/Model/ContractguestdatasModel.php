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

use function defined;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class ContractguestdatasModel extends ListModel
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
				'contract_id', 'a.contract_id',
				'adults', 'a.adults',
				'children', 'a.children',
				'guest_id', 'a.guest_id',
				'guestinfo', 'a.guestinfo',
				'c_name', 'a.c_name',
				'c_phone', 'a.c_phone',
				'c_email', 'a.c_email',
				'arrival_means', 'a.arrival_means',
				'arrival_time', 'a.arrival_time',
				'arrival_place', 'a.arrival_place',
				'arrival_from', 'a.arrival_from',
				'arrival_air', 'a.arrival_air',
				'departure_time', 'a.departure_time',
				'departure_means', 'a.departure_means',
				'departure_number', 'a.departure_number',
				'other_information', 'a.other_information',
				'options', 'a.options',
				'preferences', 'a.preferences',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get contract export data for csv
	 *
	 * @param   string  $arrival  Date of arrival
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function exportRegistration(string $arrival): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('a.id',
		                             'a.property_id')));
		$query->from($db->qn('#__knowres_contract', 'a'))
		      ->select($db->qn(array('p.property_name')))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . ' ON ' . $db->qn('p.id') . '=' . $db->qn('a.property_id'))
		      ->select($db->qn(array(
			      'g.adults',
			      'g.children',
			      'g.guestinfo'
		      )))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract_guestdata', 'g') . ' ON ' . $db->qn('g.contract_id') . '='
			      . $db->qn('a.id'))
		      ->where($db->qn('a.arrival') . '  = ' . $db->q($arrival))
		      ->where($db->qn('a.cancelled') . ' = 0')
		      ->where($db->qn('a.black_booking') . ' = 0')
		      ->where($db->qn('a.state') . ' = 1');
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get guest data ID from contract ID
	 *
	 * @param  ?int  $contract_id  ID of contract
	 *
	 * @since   1.0.0
	 * @return ?int
	 */
	public function getByContractId(?int $contract_id): ?int
	{
		if (empty($contract_id))
		{
			return 0;
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('id')
		      ->from($db->qn('#__knowres_contract_guestdata'))
		      ->where($db->qn('contract_id') . '=' . $contract_id)
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_contract_guestdata', 'a'));
		$query = self::commonJoins($db, $query);

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
				$query->where('( a.guest_info LIKE ' . $search . ' )');
			}
		}

		$filter_guest_id = $this->state->get("filter.guest_id");
		if ($filter_guest_id)
		{
			$query->where($db->qn('a.guest_id') . '=' . (int) $filter_guest_id);
		}

		$filter_contract_id = $this->state->get("filter.contract_id");
		if ($filter_contract_id)
		{
			$query->where($db->qn('a.contract_id') . '=' . (int) $filter_contract_id);
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

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Field
	 * @param   string  $direction  Direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.guest_id', $direction = 'asc')
	{
		$search = $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search');
		$this->setState('filter.search', trim($search));
		$this->setState('filter.guest_id',
			$this->getUserStateFromRequest($this->context . '.filter.guest_id', 'filter_guest_id', 0, 'integer'));
		$this->setState('filter.contract_id',
			$this->getUserStateFromRequest($this->context . '.filter.contract_id', 'filter_contract_id', 0, 'integer'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}
