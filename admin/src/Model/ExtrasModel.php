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
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class ExtrasModel extends ListModel
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
				'price', 'a.price',
				'percentage', 'a.percentage',
				'tax_id', 'a.tax_id',
				'max_quantity', 'a.max_quantity',
				'property_id', 'a.property_id',
				'model', 'a.model',
				'mandatory', 'a.mandatory',
				'ordering', 'a.ordering',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name', 'description'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get extras for property
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getByProperty(int $property_id): mixed
	{
		if (!$property_id)
		{
			throw new RuntimeException('Property ID must not be zero');
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'id', 'price', 'percentage', 'tax_id', 'max_quantity', 'property_id', 'model', 'mandatory', 'state'
		]));

		$query->from($db->qn('#__knowres_extra'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->order($db->escape('mandatory DESC'))
		      ->order($db->escape('ordering'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get extras for cleaning
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCleaningFee(int $property_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.price'));

		$query->from($db->qn('#__knowres_extra', 'a'))
		      ->where($db->qn('a.property_id') . '=' . $property_id)
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.cleaning') . '=1')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get extras for pricing
	 *
	 * @param   mixed  $properties  Solo or multiple properties
	 * @param   bool   $mandatory   Return only mandatory extras
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPricingExtras(mixed $properties, bool $mandatory = false): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$lang = KrMethods::getLanguageTag();
		$item = 'extra';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->where($db->qn('sub.field') . '=' . $db->q('name'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'))
		      ->from($db->qn('#__knowres_extra', 'a'))
		      ->select('(' . $subQuery->__toString() . ') `name`')
		      ->where($db->qn('a.state') . ' = 1');

		if (is_numeric($properties))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $properties);
		}
		else if (is_string($properties) && strlen($properties) > 0)
		{
			$ids = explode(',', $properties);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		if ($mandatory)
		{
			$query->where($db->qn('a.mandatory') . '=1');
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

		$lang = KrMethods::getLanguageTag();
		$item = 'extra';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->where($db->qn('sub.field') . '=' . $db->q('name'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$subQuery1 = $db->getQuery(true);
		$subQuery1->select('sub.text')
		          ->from($db->qn('#__knowres_translation', 'sub'))
		          ->where($db->qn('sub.item') . '=' . $db->q($item))
		          ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		          ->where($db->qn('sub.field') . '=' . $db->q('description'))
		          ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		          ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));

		$query->from($db->qn('#__knowres_extra', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQuery1->__toString() . ') ' . $db->q('description'));
		$query = self::commonJoins($db, $query);

		$query->select($db->qn('p.property_name', 'property_name'));
		$query->join('LEFT', $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '='
			. $db->qn('a.property_id'));

		$query->select($db->qn('t.code', 'taxrate_code'));
		$query->join('LEFT', $db->qn('#__knowres_tax_rate', 't') . 'ON' . $db->qn('t.id') . '=' . $db->qn('a.tax_id'));

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
		if (is_numeric($filter_property_id))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}
		else if (is_string($filter_property_id) && strlen($filter_property_id) > 0)
		{
			$ids = explode(',', $filter_property_id);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$filter_mandatory = $this->state->get('filter.mandatory');
		if ($filter_mandatory)
		{
			$query->where($db->qn('a.mandatory') . '=' . (int) $filter_mandatory);
		}

		$filter_tax_id = $this->state->get("filter.tax_id");
		if ($filter_tax_id)
		{
			$query->where($db->qn('a.tax_id') . '=' . (int) $filter_tax_id);
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
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.tax_id');
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
	protected function populateState($ordering = 'a.mandatory', $direction = 'desc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.tax_id',
			$this->getUserStateFromRequest($this->context . '.filter.tax_id', 'filter_tax_id', '', 'integer'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '',
				'integer'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}