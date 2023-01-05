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

/**
 * KR contract note list model.
 *
 * @since 1.0.0
 */
class ContractnotesModel extends ListModel
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
				'note', 'a.note',
				'note_type', 'a.note_type',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get notes for contract
	 *
	 * @param   int  $contract_id  ID of contract
	 * @param   int  $note_type    Type of note
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getForContract(int $contract_id, int $note_type = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_contract_note', 'a'));

		if ($contract_id)
		{
			$query->where($db->qn('a.contract_id') . '=' . $contract_id);
		}

		if ($note_type)
		{
			$query->where($db->qn('a.note_type') . ' LIKE ' . $db->q('%' . $note_type . '%'));
		}

		$query->select($db->qn('created_by.name', 'created_by_name'))
		      ->join('LEFT', $db->qn('#__users',
				      'created_by') . ' ON ' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by_name'))
		      ->join('LEFT', $db->qn('#__users',
				      'updated_by') . ' ON ' . $db->qn('updated_by.id') . '=' . $db->qn('a.updated_by'));

		$query->order($db->escape('id DESC'));

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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_contract_note` AS a');

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('#__knowres_contract_1163928.tag AS contract_tag');
		$query->join('LEFT',
			'#__knowres_contract AS #__knowres_contract_1163928 ON #__knowres_contract_1163928.id = a.contract_id');
		$query->select('created_by.name AS created_by_name');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by_name');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$filter_contract_id = $this->state->get("filter.contract_id");
		if ($filter_contract_id)
		{
			$query->where("a.contract_id = " . (int) $filter_contract_id);
		}

		$filter_note_type = $this->state->get("filter.note_type");
		if (is_numeric($filter_note_type))
		{
			$query->where($db->qn('note_type') . ' LIKE ' . $db->q("%" . $filter_note_type . "%"));
		}
		else if (is_array($filter_note_type))
		{
			$query->where('a.note_type IN (' . implode(',', array_map('intval', $filter_note_type)) . ')');
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
				$query->where('( a.note LIKE ' . $search . ' )');
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
		$id .= ':' . $this->getState('filter.contract_id');
		$id .= ':' . $this->getState('filter.note_type');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Default ordering
	 * @param   string  $direction  Default ordering direction
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.id', $direction = 'desc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.contract_id',
			$this->getUserStateFromRequest($this->context . '.filter.contract_id', 'filter_contract_id', '', 'string'));
		$this->setState('filter.note_type',
			$this->getUserStateFromRequest($this->context . '.filter.note_type', 'filter_note_type', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}