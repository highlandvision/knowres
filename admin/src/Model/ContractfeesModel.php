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
use Joomla\Database\Exception\DatabaseNotFoundException;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Contract fees list model.
 *
 * @since 1.0.0
 */
class ContractfeesModel extends ListModel
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
				'description', 'a.description',
				'value', 'a.value',
				'contract_id', 'a.contract_id',
				'contract_payment_id', 'a.contract_payment_id',
				'actioned', 'a.actioned',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get all contract fees
	 *
	 * @param   int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed An array of data items on success, false on failure.
	 */
	public function getForContract(int $contract_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));

		$query->from($db->qn('#__knowres_contract_fee', 'a'))
		      ->where($db->qn('a.contract_id') . '=' . $contract_id)
		      ->order($db->qn('a.id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the total fees for a contract
	 *
	 * @param   int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return float
	 */
	public function getTotalForContract(int $contract_id): float
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('SUM(value) AS total')
		      ->from($db->qn('#__knowres_contract_fee'))
		      ->where($db->qn('contract_id') . '=' . $contract_id);
		$db->setQuery($query);

		$value = $db->loadResult();
		if (is_null($value))
		{
			$value = 0;
		}

		return (float) $value;
	}

	/**
	 * Get unactioned fees
	 *
	 * @param   int  $contract_id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed An array of data items on success, false on failure.
	 */
	public function getUnactioned(int $contract_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_contract_fee', 'a'))
		      ->where($db->qn('a.contract_id') . '=' . $contract_id)
		      ->where($db->qn('a.actioned') . '=0');

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Updated actioned fields for on or more records
	 *
	 * @param $pks      array    Ids to be updated
	 * @param $value    int    Value for update
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	public function updateActioned(array $pks, int $value)
	{
		if (!is_countable($pks) || !count($pks))
		{
			return;
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true)
		            ->update($db->qn('#__knowres_contract_fee'))
		            ->set($db->qn('actioned') . '=' . $value)
		            ->where($db->qn('id') . '=' . implode(' OR ' . $db->qn('id') . '=', $pks));

		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Update paid fees with payment ID
	 *
	 * @param  int  $contract_id  ID of contract
	 * @param  int  $payment_id   ID of payment
	 *
	 * @throws RuntimeException
	 * @throws DatabaseNotFoundException
	 * @throws QueryTypeAlreadyDefinedException
	 * @since  1.0.0
	 */
	public function updatePaidFees(int $contract_id, int $payment_id)
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$fields = [
			$db->qn('contract_payment_id') . '=' . $payment_id
		];

		$conditions = [
			$db->qn('contract_payment_id') . ' = 0',
			$db->qn('contract_id') . '=' . $contract_id
		];

		$query->update($db->qn('#__knowres_contract_fee'))->set($fields)->where($conditions);
		$db->setQuery($query);

		$db->execute();
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
		$query->from($db->qn('#__knowres_contract_fee', 'a'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");

		$contract_id = $this->state->get("filter.contract_id");
		if ($contract_id)
		{
			$query->where($db->qn('a.contract_id') . ' = ' . (int) $contract_id);
		}

		$actioned = $this->state->get("filter.actioned");
		if (is_numeric($actioned))
		{
			$query->where($db->qn('a.actioned') . ' = ' . (int) $actioned);
		}
		else if ($actioned === '')
		{
			$query->where($db->qn('a.actioned') . ' IN (0, 1)');
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
				$query->where('( a.description LIKE ' . $search . '  OR  a.contract_id LIKE ' . $search . ' )');
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
	protected function populateState($ordering = 'a.created_at', $direction = 'asc')
	{
		$search = $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search');
		$this->setState('filter.search', trim($search));

		$contract_id = $this->getUserStateFromRequest($this->context . '.filter.state', 'filter_contract_id');
		$this->setState('filter.contract_id', $contract_id);

		$actioned = $this->getUserStateFromRequest($this->context . '.filter.state', 'filter_actioned');
		$this->setState('filter.actioned', $actioned);

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}