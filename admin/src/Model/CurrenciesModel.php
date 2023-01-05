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
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class CurrenciesModel extends ListModel
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
				'iso', 'a.iso',
				'decimals', 'a.decimals',
				'allow_property', 'a.allow_property',
				'allow_payment', 'a.allow_payment',
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
	 * Find all payment currencies
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAllPropertyCurrencies(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'id',
			'iso',
			'decimals',
			'allow_property',
			'allow_payment',
			'ordering',
			'state',
			'created_by',
			'created_at',
			'updated_by',
			'updated_at'
		)))
		      ->from($db->qn('#__knowres_currency'))
		      ->where($db->qn('state') . ' = 1')
		      ->where($db->qn('allow_property') . ' = 1')
		      ->order($db->qn('iso') . ' asc');
		$db->setQuery($query);

		$items        = $db->loadObjectList();
		$Translations = new Translations();

		return $Translations->addTranslationToObject($items, 'currency', 'id', 'name', 'name', false);
	}

	/**
	 * Get payment currencies for property currency
	 *
	 * @param   string  $iso  Iso currency code
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return int
	 */
	public function getDp(string $iso): int
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('decimals'))
		      ->from($db->qn('#__knowres_currency'))
		      ->where($db->qn('iso') . '=' . $db->q($iso))
		      ->setLimit(1);
		$db->setQuery($query);

		$decimals = $db->loadResult();

		return is_null($decimals) ? 0 : $decimals;
	}

	/**
	 * Method to get an array of data items.
	 *
	 * @since  12.2
	 * @return array  Object on success, false on failure.
	 */
	public function getItems($pk = null): array
	{
		$items = parent::getItems();
		foreach ($items as $item)
		{
			$item->allow_payment = Utility::decodeJson($item->allow_payment, true);
		}

		return $items;
	}

	/**
	 * Get payment currencies for property currency
	 *
	 * @param   string  $iso  ISO currency code
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed An array of data items on success, false on failure.
	 */
	public function getPaymentCurrencies(string $iso): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('allow_payment')
		      ->from($db->qn('#__knowres_currency'))
		      ->where($db->qn('allow_payment') . '>' . $db->q(''))
		      ->where($db->qn('iso') . '=' . $db->q($iso))
		      ->order($db->qn('ordering'));
		$db->setQuery($query);

		return $db->loadResult();
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
		$item = "currency";

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_currency` AS a');
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));
		$query = self::commonJoins($db, $query);

		$filter_allow_property = $this->state->get("filter.allow_property");
		if ($filter_allow_property)
		{
			$query->where($db->qn('a.allow_property') . '=' . (int) $filter_allow_property);
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
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
	 * @return string A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.allow_property');

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
		$this->setState('filter.allow_property',
			$this->getUserStateFromRequest($this->context . '.filter.allow_property', 'filter_allow_property', '',
				'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}