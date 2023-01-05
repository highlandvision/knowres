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
 * Property options list model.
 *
 * @since 1.0.0
 */
class PropertyoptionsModel extends ListModel
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
				'yesno', 'a.yesno',
				'ordering', 'a.ordering',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get all items for a property
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPropertyOptionsForProperty(int $property_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();
		$item = "propertyoption";

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($db->qn(array(
			'a.id',
			'a.yesno'
		)))
		      ->from($db->qn('#__knowres_property_option', 'a'))
		      ->select('(' . $subQuery->__toString() . ') ' . $db->q('name'))
		      ->where($db->qn('a.state') . ' = 1')
		      ->where($db->qn('a.property_id') . ' = ' . $property_id)
		      ->order($db->qn('a.ordering') . ' asc');

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return    QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item     = "propertyoption";
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_property_option` AS a');
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('#__knowres_property_1165981.property_name AS property_name');
		$query->join('LEFT',
			'#__knowres_property AS #__knowres_property_1165981 ON #__knowres_property_1165981.id = a.property_id');
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

		$filter_property_id = $this->state->get("filter.property_id");
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . ' = ' . (int) $filter_property_id);
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
	 * @return    string        A store id.
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
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.ordering', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));

		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}