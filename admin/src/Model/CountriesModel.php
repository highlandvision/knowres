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
use Joomla\Database\QueryInterface;
use RuntimeException;

use function is_numeric;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class CountriesModel extends ListModel {
	/**
	 * Constructor.
	 *
	 * @param  array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct($config = [])
	{
		if (empty($config['filter_fields'])) {
			$config['filter_fields'] = array(
				'id',
				'a.id',
				'country_iso',
				'a.country_iso',
				'dial_code',
				'a.dial_code',
				'allow_property',
				'a.allow_property',
				'property_licence',
				'a.property_licence',
				'state',
				'a.state',
				'created_by',
				'a.created_by',
				'created_at',
				'a.created_at',
				'updated_by',
				'a.updated_by',
				'updated_at',
				'a.updated_at',
				'name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get country name for matching countries
	 *
	 * @param  int      $allow_property  1 for property countries only
	 * @param  ?string  $dial_code       Get for dial code only
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAll(int $allow_property = 0, ?string $dial_code = null): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'id',
			'country_iso',
			'dial_code',
			'allow_property',
			'state',
			'created_by',
			'created_at',
			'updated_by',
			'updated_at'
		]));

		$query->from($db->qn('#__knowres_country'))
			->where($db->qn('state') . '=1');

		if ($allow_property) {
			$query->where($db->qn('allow_property') . '=' . $allow_property);
		}

		if (!is_null($dial_code)) {
			$query->where($db->qn('dial_code') . '=' . $db->q($dial_code))
				->setLimit(1);
		}

		$db->setQuery($query);

		$items        = $db->loadObjectList();
		$Translations = new Translations();

		return $Translations->addTranslationToObject($items, 'country');
	}

	/**
	 * Get country id from dial code
	 *
	 * @param  string  $dial_code  Country dialling code
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCountryIdByDialCode(string $dial_code): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
			->from($db->qn('#__knowres_country'))
			->where($db->qn('dial_code') . '=' . $db->q($dial_code))
			->where($db->qn('state') . '=1')
			->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get country id from country iso
	 *
	 * @param  string  $country_iso  ISO country code (2 characters)
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCountryIdByIso(string $country_iso): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
			->from($db->qn('#__knowres_country'))
			->where($db->qn('country_iso') . '=' . $db->q($country_iso))
			->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
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
		$item = 'country';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
			->from($db->qn('#__knowres_translation', 'sub'))
			->where($db->qn('sub.item') . ' = ' . $db->q($item))
			->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
			->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
			->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_country', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join('LEFT', $db->qn('#__users', 'uc') . ' ON ' . $db->qn('uc.id') . '=' . $db->qn('a.checked_out'));
		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT',
			$db->qn('#__users', 'created_by') . ' ON ' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by'));
		$query->join('LEFT',
			$db->qn('#__users', 'updated_by') . ' ON ' . $db->qn('updated_by.id') . '=' . $db->qn('a.updated_by'));

		$state = $this->getState('filter.state');
		if (is_numeric($state)) {
			$query->where($db->qn('a.state') . '=' . (int) $state);
		} else if ($state === '') {
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_allow_property = (int) $this->state->get("filter.allow_property");
		if ($filter_allow_property) {
			$query->where($db->qn('a.allow_property') . '=' . $filter_allow_property);
		}

		$filter_property_licence = $this->getState("filter.property_licence");
		if (is_numeric($filter_property_licence)) {
			$query->where($db->qn('a.property_licence') . ' = ' . (int) $filter_property_licence);
		}

		$filter_dial_code = $this->state->get("filter.dial_code");
		if ($filter_dial_code) {
			$query->where($db->qn('a.dial_code') . '=' . trim($filter_dial_code));
		}

		$search = $this->getState('filter.search');
		if (!empty($search)) {
			if (stripos($search, 'id:') === 0) {
				$query->where('a.id = ' . (int) substr($search, 3));
			} else {
				$search = $db->q('%' . $search . '%');
				$query->where('(' . $subQuery->__toString() . ') LIKE ' . $search);
				$query->orWhere($db->qn('a.dial_code') . ' LIKE ' . $search);
			}
		}

		$orderCol  = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');
		if ($orderCol && $orderDirn) {
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
	 * @return    string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.allow_property');
		$id .= ':' . $this->getState('filter.dial_code');
		$id .= ':' . $this->getState('filter.property_licence');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering   Ordering column
	 * @param  string  $direction  Ordering direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'name', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.allow_property',
			$this->getUserStateFromRequest($this->context . '.filter.allow_property', 'filter_allow_property', '',
				'string'));
		$this->setState('filter.dial_code',
			$this->getUserStateFromRequest($this->context . '.filter.dial_code', 'filter_dial_code', '', 'string'));
		$this->setState('filter.property_licence',
			$this->getUserStateFromRequest($this->context . '.filter.property_licence', 'filter_property_licence', '',
				'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}