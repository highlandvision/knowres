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
 * Methods supporting a list of Knowres email actions records.
 *
 * @since 1.0.0
 */
class EmailactionsModel extends ListModel
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
				'email_trigger', 'a.email_trigger',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_at', 'a.updated_at',
				'contract_tag'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_email_action', 'a'));

		$query->select($db->qn('uc.name', 'editor'))
		      ->join('LEFT', $db->qn('#__users', 'uc') . ' ON ' . $db->qn('uc.id') . '=' . $db->qn('a.checked_out'));
		$query->select($db->qn('created_by.name', 'created_by'))
		      ->join('LEFT',
			      $db->qn('#__users', 'created_by') . ' ON ' . $db->qn('created_by.id') . '='
			      . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by'))
		      ->join('LEFT', $db->qn('#__users', 'updated_by') . ' ON ' . $db->qn('updated_by.id') . '='
			      . $db->qn('a.updated_by'));
		$query->select($db->qn('contract.tag', 'contract_tag'))
		      ->join('LEFT', $db->qn('#__knowres_contract', 'contract') . ' ON ' . $db->qn('contract.id') . '='
			      . $db->qn('a.contract_id'));

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
				$query->where($db->qn('contract.tag') . ' LIKE ' . $search);
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
	 * @since  2.0.0
	 * @return string A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');

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
	protected function populateState($ordering = 'a.id', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState('a.id', 'asc');
	}
}