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
 * Property fields list model.
 *
 * @since 1.0.0
 */
class PropertyfieldsModel extends ListModel
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
				'required', 'a.required',
				'format', 'a.format',
				'special', 'a.special',
				'ordering', 'a.ordering',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'label', 'description'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Read property text fields
	 *
	 * @param   bool  $required  Required fields only
	 * @param   bool  $format    Special format only
	 *
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAllPropertyFields(bool $required = false, bool $format = false): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id', 'required', 'format', 'special']))
		      ->from($db->qn('#__knowres_property_field'))
		      ->where($db->qn('state') . '=1');

		if ($required)
		{
			$query->where($db->qn('required') . '=' . (int) $required);
		}

		if ($format)
		{
			$query->where($db->qn('format') . '>' . $db->q(''));
		}

		$query->order($db->qn('ordering'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws  RuntimeException
	 * @since   1.0.0
	 * @return  QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();

		$item     = 'propertyfield';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->where($db->qn('sub.field') . '=' . $db->q('label'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_property_field` AS a');
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('label'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
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

		$filter_required = (int) $this->state->get('filter.required');
		if ($filter_required)
		{
			$query->where($db->qn('a.required') . '=' . $filter_required);
		}

		$filter_format = $this->state->get('filter.format');
		if ($filter_format)
		{
			$query->where($db->qn('format') . '>' . $db->q(''));
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
	 * @return string A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.required');
		$id .= ':' . $this->getState('filter.format');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.ordering', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.required',
			$this->getUserStateFromRequest($this->context . '.filter.required', 'filter_required', '', 'string'));
		$this->setState('filter.format',
			$this->getUserStateFromRequest($this->context . '.filter.format', 'filter_format', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}