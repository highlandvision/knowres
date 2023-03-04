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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\TickTock;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Rates list model
 *
 * @since 1.0.0
 */
class RatesModel extends ListModel
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
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'valid_from', 'a.valid_from',
				'valid_to', 'a.valid_to',
				'rate', 'a.rate',
				'min_nights', 'a.min_nights',
				'max_nights', 'a.max_nights',
				'min_guests', 'a.min_guests',
				'max_guests', 'a.max_guests',
				'start_day', 'a.start_day',
				'more_guests', 'a.more_guests',
				'state', 'a.state',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Insert / update rate changes into database currently only Beyond
	 *
	 * @param  array  $updates  Rate updates to be changed / inserted
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function insertUpdateRates(array $updates)
	{
		$db  = KrFactory::getDatabase();
		$sql = [];

		foreach ($updates as $row)
		{
			$sql[] = '( 
							' . (int) $row->id . ',
				            ' . (int) $row->property_id . ',
				            ' . $db->q($row->valid_from) . ',
				            ' . $db->q($row->valid_to) . ',
							' . (float) $row->rate . ',
				            ' . (int) $row->min_nights . ',
				            ' . (int) $row->max_nights . ',
				            ' . (int) $row->min_guests . ',
				            ' . (int) $row->max_guests . ',
				            ' . (int) $row->ignore_pppn . ',
				            ' . (int) $row->start_day . ',
				            ' . $db->q($row->more_guests) . ',
				            ' . (int) $row->state . ',
				            ' . $db->q($row->created_at) . '
				           )';
		}

		try
		{
			$db->transactionStart();

			$query = "INSERT INTO " . $db->qn('#__knowres_rate');
			$query .= " (`id`, `property_id`, `valid_from`, `valid_to`, `rate`,";
			$query .= " `min_nights`, `max_nights`, `min_guests`, `max_guests`,";
			$query .= " `ignore_pppn`, `start_day`, `more_guests`, `state`, `created_at`)";
			$query .= " VALUES " . implode(',', $sql);
			$query .= " ON DUPLICATE KEY UPDATE ";
			$query .= " `valid_from` = VALUES(valid_from), `valid_to` = VALUES(valid_to), `rate` = VALUES(rate),";
			$query .= " `min_nights` = VALUES(min_nights), `max_nights` = VALUES(max_nights),";
			$query .= " `min_guests` = VALUES(min_guests), `max_guests` = VALUES(max_guests),";
			$query .= " `ignore_pppn` = VALUES(ignore_pppn), `start_day` = VALUES(start_day),";
			$query .= " `more_guests` = VALUES(more_guests),";
			$query .= " `updated_at` = VALUES(created_at), `updated_by` = 0";

			$db->setQuery($query);
			$db->execute();
			$db->transactionCommit();
		}
		catch (Exception $e)
		{
			$db->transactionRollback();

			throw new Exception($e);
		}
	}

	/**
	 * Check for current rates for a property
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since 1.0.0
	 * @return ?int
	 */
	public function getCurrent(int $property_id): ?int
	{
		$date = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', $db->qn('a.id')));
		$query->from($db->qn('#__knowres_rate', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.property_id') . '=' . $property_id)
		      ->where($db->qn('a.valid_to') . '>=' . $db->q($date))
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Check for current rates for a property
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  3.0.0
	 * @return ?string
	 */
	public function getLastRateDate(int $property_id): ?string
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', $db->qn('a.valid_to')));
		$query->from($db->qn('#__knowres_rate', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.property_id') . '=' . $property_id)
		      ->order($db->qn('a.valid_to') . 'DESC')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get maximum standard guests
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return ?int
	 */
	public function getMaxGuests(int $property_id): ?int
	{
		$date = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', $db->qn('a.max_guests')));
		$query->from($db->qn('#__knowres_rate', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.property_id') . '=' . $property_id)
		      ->where($db->qn('a.valid_to') . '>=' . $db->q($date))
		      ->where($db->qn('a.min_guests') . '=1')
		      ->order($db->qn('a.valid_from'))
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get minimum rates value
	 *
	 * @param  mixed   $properties  Properties to search
	 * @param  string  $date        require date
	 * @param  int     $guests      #Guests
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getMinRates(mixed $properties, string $date, int $guests): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', $db->qn('a.property_id')));
		$query->select('MIN(a.rate) as minrate');
		$query->from($db->qn('#__knowres_rate', 'a'));
		if (is_numeric($properties))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $properties);
		}
		else if (is_string($properties) && strlen($properties) > 0)
		{
			$ids = explode(',', $properties);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}
		else if (is_array($properties))
		{
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $properties)) . ')');
		}

		if ($date)
		{
			$query->where($db->qn('a.valid_to') . '>=' . $db->q($date));
		}

		if ($guests)
		{
			$query->where($db->qn('a.min_guests') . '=' . $guests);
		}

		$query->where($db->qn('a.state') . '=1');
		$query->group($db->qn('property_id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get rates with no paraphenalia
	 *
	 * @param  mixed    $properties  Either a single property, csv of properties or array of properties
	 * @param  ?string  $from        From date
	 * @param  ?string  $to          To date
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getRatesForProperty(mixed $properties, ?string $from = null, ?string $to = null): mixed
	{
		if (is_null($from))
		{
			$from = TickTock::getDate();
		}
		if (is_null($to))
		{
			$to = '2100-12-31';
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select',
			[$db->qn('a.id'),
			 $db->qn('a.property_id'),
			 $db->qn('a.valid_from'),
			 $db->qn('a.valid_to'),
			 $db->qn('a.rate'),
			 $db->qn('a.min_nights'),
			 $db->qn('a.max_nights'),
			 $db->qn('a.min_guests'),
			 $db->qn('a.max_guests'),
			 $db->qn('a.ignore_pppn'),
			 $db->qn('a.start_day'),
			 $db->qn('a.more_guests'),
			 $db->qn('a.state'),
			 $db->qn('a.checked_out'),
			 $db->qn('a.checked_out_time'),
			 $db->qn('a.created_by'),
			 $db->qn('a.created_at'),
			 $db->qn('a.updated_by'),
			 $db->qn('a.updated_at')
			]));

		$query->from($db->qn('#__knowres_rate', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.valid_to') . '>=' . $db->q($from))
		      ->where($db->qn('a.valid_from') . '<=' . $db->q($to));

		if (is_numeric($properties))
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $properties);
		}
		else if (is_array($properties))
		{
			$query->where('a.property_id IN (' . implode(',', array_map('intval', $properties)) . ')');
		}
		else if (is_string($properties) && strlen($properties) > 0)
		{
			$ids = explode(',', $properties);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$query->order($db->qn('property_id'))
		      ->order($db->qn('valid_from'))
		      ->order($db->qn('min_guests'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Validate dates entered for a rate do not overlap with an existing rate
	 *
	 * @param  int     $id           ID of rate being edited
	 * @param  int     $property_id  ID of property
	 * @param  string  $valid_from   Entered valid from date
	 * @param  string  $valid_to     Entered valid to date
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function ruleDateRangeRates(int $id, int $property_id, string $valid_from, string $valid_to): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', $db->qn(['valid_from', 'valid_to'])));
		$query->from($db->qn('#__knowres_rate'))
		      ->where($db->qn('id') . '<>' . $id)
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('valid_from') . '<=' . $db->q($valid_from))
		      ->where($db->qn('valid_to') . '>=' . $db->q($valid_to))
		      ->where($db->qn('state') . '=1')
		      ->order($db->qn('valid_from') . ' ASC');
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
		$item = 'rate';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . ' = ' . $db->q($item))
		         ->where($db->qn('sub.item_id') . ' = ' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select',
			[$db->qn('a.id'),
			 $db->qn('a.property_id'),
			 $db->qn('a.valid_from'),
			 $db->qn('a.valid_to'),
			 $db->qn('a.rate'),
			 $db->qn('a.min_nights'),
			 $db->qn('a.max_nights'),
			 $db->qn('a.min_guests'),
			 $db->qn('a.max_guests'),
			 $db->qn('a.ignore_pppn'),
			 $db->qn('a.start_day'),
			 $db->qn('a.more_guests'),
			 $db->qn('a.state'),
			 $db->qn('a.checked_out'),
			 $db->qn('a.checked_out_time'),
			 $db->qn('a.created_by'),
			 $db->qn('a.created_at'),
			 $db->qn('a.updated_by'),
			 $db->qn('a.updated_at')
			]));

		$query->from($db->qn('#__knowres_rate', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('name'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select($db->qn('p.property_name', 'property_name'));
		$query->join('LEFT',
			$db->qn('#__knowres_property', 'p') . ' ON ' . $db->qn('p.id') . ' =  ' . $db->qn('a.property_id'));

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
		if (is_numeric($filter_property_id))
		{
			$query->where($db->qn('a.property_id') . ' = ' . (int) $filter_property_id);
		}
		else if (is_string($filter_property_id) && strlen($filter_property_id) > 0)
		{
			$ids = explode(",", $filter_property_id);
			$query->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$filter_valid_from = $this->state->get("filter.valid_from");
		if ($filter_valid_from)
		{
			$query->where($db->qn('a.valid_from') . ' <= ' . $db->q($filter_valid_from));
		}

		$filter_valid_to = $this->state->get("filter.valid_to");
		if ($filter_valid_to)
		{
			$query->where($db->qn('a.valid_to') . ' >= ' . $db->q($filter_valid_to));
		}

		$search = $this->getState('filter.search');
		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where($db->qn('a.id') . ' = ' . (int) substr($search, 3));
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
			$query->order($db->qn($orderCol) . $orderDirn);
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
	 * @return string
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.valid_from');
		$id .= ':' . $this->getState('filter.valid_to');
		$id .= ':' . $this->getState('filter.min_guests');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering   Field
	 * @param  string  $direction  Direction
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.valid_from', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.valid_from',
			$this->getUserStateFromRequest($this->context . '.filter.valid_from', 'filter_valid_from', '', 'string'));
		$this->setState('filter.valid_to',
			$this->getUserStateFromRequest($this->context . '.filter.valid_to', 'filter_valid_to', '', 'string'));
		$this->setState('filter.min_guests',
			$this->getUserStateFromRequest($this->context . '.filter.min_guests', 'filter_min_guests', 0, 'integer'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}