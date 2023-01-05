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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Tax rates list model.
 *
 * @since 1.0.0
 */
class TaxratesModel extends ListModel
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
			$config['filter_fields'] = [
				'id', 'a.id',
				'tax_id', 'a.tax_id',
				'tax_type', 'a.tax_type',
				'code', 'a.code',
				'service', 'a.service',
				'a.agent', 'a.agent',
				'rate', 'a.rate',
				'fixed', 'a.fixed',
				'basis', 'a.basis',
				'max_nights', 'a.max_nights',
				'reduced_rate', 'a.reduced_rate',
				'gross', 'a.gross',
				'pay_arrival', 'a.pay_arrival',
				'applicable_age', 'a.applicable_age',
				'per_night', 'a.per_night',
				'valid_from', 'a.valid_from',
				'taxrate_id', 'a.taxrate_id',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name', 'tax_name'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Get all published rows including jurisdiction locations
	 *
	 * @param   string  $order  Sort by field
	 *
	 * @since  3.3.0
	 * @return array
	 */
	public function getAll(string $order = ''): array
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id', 'a.tax_id', 'a.tax_type', 'a.code', 'a.service', 'a.agent', 'a.rate', 'a.fixed', 'a.basis',
			'a.max_nights', 'a.reduced_rate', 'a.gross', 'a.pay_arrival', 'a.applicable_age', 'a.per_night',
			'a.valid_from', 'a.taxrate_id', 'a.state', 'a.created_by', 'a.created_at', 'a.updated_by', 'a.updated_at'
		]));

		$query->from($db->qn('#__knowres_tax_rate', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.valid_from') . '<=' . $db->q($today));

		$query->select($db->qn('t.country_id', 'country_id'));
		$query->select($db->qn('t.region_id', 'region_id'));
		$query->select($db->qn('t.town_id', 'town_id'));
		$query->join('LEFT', $db->qn('#__knowres_tax', 't') . 'ON' . $db->qn('t.id') . '=' . $db->qn('a.tax_id'));

		if (!empty($order))
		{
			$query->order($db->qn($order));
		}

		$db->setQuery($query);

		$items = $db->loadObjectList();

		$Translations = new Translations();
		$items        = $Translations->addTranslationToObject($items, 'taxrate');

		return $Translations->addTranslationToObject($items, 'tax', 'tax_id', 'name', 'tax_name', false);
	}

	/**
	 * Get tax code row for current date.
	 *
	 * @param   string  $code  Tax code
	 * @param   string  $date  YY-MM-DD Applicable date (normally arrival date
	 *
	 * @since  3.3.0
	 * @return array
	 */
	public function getByCode(string $code, string $date): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id', 'a.tax_id', 'a.tax_type', 'a.code', 'a.service', 'a.agent', 'a.rate', 'a.fixed', 'a.basis',
			'a.max_nights', 'a.reduced_rate', 'a.gross', 'a.pay_arrival', 'a.applicable_age', 'a.per_night',
			'a.valid_from', 'a.taxrate_id', 'a.state', 'a.created_by', 'a.created_at', 'a.updated_by', 'a.updated_at'
		]));

		$query->from($db->qn('#__knowres_tax_rate', 'a'))
		      ->where($db->qn('a.code') . '=' . $db->q($code))
		      ->where($db->qn('a.valid_from') . '<=' . $db->q($date))
		      ->where($db->qn('a.state') . '=1')
		      ->setLimit(1)
		      ->order($db->qn('valid_from') . 'DESC');

		$db->setQuery($query);

		$items = $db->loadObjectList();

		$Translations = new Translations();
		$items        = $Translations->addTranslationToObject($items, 'taxrate');

		return $Translations->addTranslationToObject($items, 'tax', 'tax_id', 'name', 'tax_name', false);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$lang = KrMethods::getLanguageTag();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$item     = 'taxrate';
		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$item        = 'tax';
		$subQueryTax = $db->getQuery(true);
		$subQueryTax->select('sub.text')
		            ->from($db->qn('#__knowres_translation', 'sub'))
		            ->where($db->qn('sub.item') . '=' . $db->q($item))
		            ->where($db->qn('sub.item_id') . '=' . $db->qn('a.tax_id'))
		            ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		            ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_tax_rate', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query->select('(' . $subQueryTax->__toString() . ') ' . $db->q('tax_name'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join('LEFT', $db->qn('#__users', 'uc') . ' ON ' . $db->qn('uc.id') . '=' . $db->qn('a.checked_out'));
		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT',
			$db->qn('#__users', 'created_by') . ' ON ' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by'));
		$query->join('LEFT',
			$db->qn('#__users', 'updated_by') . ' ON ' . $db->qn('updated_by.id') . '=' . $db->qn('a.updated_by'));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$valid_from = $this->getState('filter.valid_from');
		if ($valid_from)
		{
			$today = TickTock::getDate();
			$query->where($db->qn('a.valid_from') . '<=' . $db->q($today));
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
			$query->order($db->qn($orderCol) . ' ' . $orderDirn);
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
		$id .= ':' . $this->getState('filter.valid_from');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Ordering field
	 * @param   string  $direction  Ordering direction
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'tax_name', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.valid_from',
			$this->getUserStateFromRequest($this->context . '.filter.valid_from', 'filter_valid_from', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}