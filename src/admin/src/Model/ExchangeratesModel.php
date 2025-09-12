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
 * Knowres exchange rates model.
 *
 * @since 1.0.0
 */
class ExchangeratesModel extends ListModel
{

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
				'currency_from',
				'a.currency_from',
				'currency_to',
				'a.currency_to',
				'factor',
				'a.factor',
				'rate',
				'a.rate',
				'state',
				'a.state',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Read the latest rate
	 *
	 * @param  string  $from  From currency iso
	 * @param  string  $to    To currency iso
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getLatest(string $from, string $to): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'))
			->from($db->qn('#__knowres_exchange_rate', 'a'))
			->where($db->qn('a.state') . '= 1')
			->where($db->qn('a.currency_from') . '=' . $db->q($from))
			->where($db->qn('a.currency_to') . '=' . $db->q($to))
			->setLimit(1);

		$query = self::order($db, $query, 'a.updated_at', 'DESC');

		$db->setQuery($query);

		return $db->loadObject();
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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_exchange_rate` AS a');

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state)) {
			$query->where('a.state = ' . (int) $state);
		} else {
			$query->where('a.state = 1');
		}

		$filter_currency_from = $this->state->get("filter.currency_from");
		if ($filter_currency_from) {
			$query->where("a.currency_from = '" . $db->escape($filter_currency_from) . "'");
		}

		$filter_currency_to = $this->state->get("filter.currency_to");
		if ($filter_currency_to) {
			$query->where("a.currency_to = '" . $db->escape($filter_currency_to) . "'");
		}

		$search = $this->getState('filter.search');
		$query  = self::search($db, $query, $search, 'a.currency_from');

		return self::order($db,
			$query,
			$this->state->get('list.ordering'),
			$this->state->get('list.direction'));
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
		$id .= ':' . $this->getState('filter.currency_from');
		$id .= ':' . $this->getState('filter.currency_to');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  null|string  $ordering
	 * @param  null|string  $direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.id', $direction = 'desc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.currency_from',
			$this->getUserStateFromRequest($this->context . '.filter.currency_from',
				'filter_currency_from',
				'',
				'string'));
		$this->setState('filter.currency_to',
			$this->getUserStateFromRequest($this->context . '.filter.currency_to', 'filter_currency_to', '', 'string'));

		$this->setState('params', KrMethods::getParams());
		$this->setState('list.select',
			'a.id, a.currency_from, a.currency_to, a.rate, a.factor, a.state, a.checked_out, a.checked_out_time, a.created_by, 
			a.created_at, a.updated_by, a.updated_at');

		parent::populateState($ordering, $direction);
	}
}