<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\ListModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use InvalidArgumentException;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function array_map;
use function explode;
use function implode;
use function is_array;
use function is_numeric;
use function is_string;
use function strlen;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class ContractsModel extends ListModel
{
	/** @var string Comma separated string of property ids that this user can access */
	public string $user_properties;

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
			$config['filter_fields'] = ['id',
			                            'a.id',
			                            'agent_id',
			                            'a.agent_id',
			                            'arrival',
			                            'a.arrival',
			                            'black_booking',
			                            'a.black_booking',
			                            'booking_status',
			                            'a.booking_status',
			                            'cancelled',
			                            'a.cancelled',
			                            'contract_total',
			                            'a.contract_total',
			                            'departure',
			                            'a.departure',
			                            'guest_id',
			                            'a.guest_id',
			                            'property_id',
			                            'a.property_id',
			                            'manager_id',
			                            'a.manager_id',
			                            'owner_id',
			                            'p.owner_id',
			                            'region_id',
			                            'p.region_id',
			                            'state',
			                            'a.state',
			                            'tag',
			                            'a.tag',
			                            'agent_name',
			                            'owner_name',
			                            'guest_name',
			                            'manager_name',
			                            'property_name',
			                            'region_name'
			];
		}

		$userSession           = new KrSession\User();
		$this->user_properties = $userSession->getUserProperties();

		parent::__construct($config);
	}

	/**
	 * Check if generated contract tag already exists
	 *
	 * @param  string  $tag  Tag to check
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  1.0.0
	 * @return mixed False if not in use otherwise true
	 */
	public static function checkTag(string $tag): mixed
	{
		if ($tag) {
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);

			$query->select($db->qn('id'))
			      ->from($db->qn('#__knowres_contract'))
			      ->where($db->qn('tag') . '=' . $db->q($tag))
			      ->setLimit(1);

			$db->setQuery($query);

			return $db->loadResult();
		}

		return true;
	}

	/**
	 * Get last contract update
	 *
	 * @param  int  $service_id  ID of service
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return array
	 */
	public static function contractDates(int $service_id): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('c.created_at') . '), MAX(' . $db->qn('c.updated_at') . '))  as ' . $db->qn('maxdate'))
		      ->select($db->qn('c.id', 'cid'))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('c.service_id') . '=' . $service_id)
		      ->group($db->qn('cid'));

		$db->setQuery($query);

		return $db->loadAssocList('cid');
	}

	/**
	 * Get contract export data for csv
	 *
	 * @param  array  $data  Filtering data
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function exportBalances(array $data): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$subQueryContractfee = $db->getQuery(true);
		$subQueryContractfee->select('IFNULL(SUM(' . $db->qn('cf.value') . ') ,0)')
		                    ->from($db->qn('#__knowres_contract_fee', 'cf'))
		                    ->where($db->qn('cf.contract_id') . '=' . $db->qn('a.id'));

		$subQueryContractpayment = $db->getQuery(true);
		$subQueryContractpayment->select('IFNULL(SUM(' . $db->qn('cp.base_amount') . ') ,0)')
		                        ->from($db->qn('#__knowres_contract_payment', 'cp'))
		                        ->where($db->qn('cp.contract_id') . '=' . $db->qn('a.id'))
		                        ->where($db->qn('cp.state') . '=1');

		$subQueryContractpayment1 = $db->getQuery(true);
		$subQueryContractpayment1->select('IFNULL(SUM(' . $db->qn('cp.base_amount') . ') ,0)')
		                         ->from($db->qn('#__knowres_contract_payment', 'cp'))
		                         ->where($db->qn('cp.contract_id') . '=' . $db->qn('a.id'))
		                         ->where($db->qn('cp.confirmed') . '=0')
		                         ->where($db->qn('cp.state') . '=1');

		$query->select($this->getState('list.select', 'a.*'));

		$query->select($db->qn('p.property_name', 'property_name'));
		$query->select($db->qn('ag.name', 'agent_name'));
		$query->select($db->qn('i.name', 'service_name'));
		$query->select($db->qn('r.id', 'region_id'));

		$subQueryContractfee = $db->getQuery(true);
		$subQueryContractfee->select('IFNULL(SUM(' . $db->qn('cf.value') . ') ,0)')
		                    ->from($db->qn('#__knowres_contract_fee', 'cf'))
		                    ->where($db->qn('cf.contract_id') . '=' . $db->qn('a.id'));
		$query->select('(' . $subQueryContractfee->__toString() . ') ' . $db->q('fees'));
		$query->select('(' . $subQueryContractpayment->__toString() . ') ' . $db->q('payments'));
		$query->select('(' . $subQueryContractpayment1->__toString() . ') ' . $db->q('unconfirmed'));

		if ($data['guest']) {
			$query->select($db->qn(['g.firstname',
			                        'g.surname',
			                        'g.email'
			]));
		}

		if ($data['owner']) {
			$query->select($db->qn(['o.name',
			                        'o.commission'
			]));
		}

		$query->from($db->qn('#__knowres_contract', 'a'));

		$query->join('LEFT',
			$db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('a.property_id'));

		$query->join('LEFT', $db->qn('#__knowres_agent', 'ag') . 'ON' . $db->qn('ag.id') . '=' . $db->qn('a.agent_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_service', 'i') . 'ON' . $db->qn('i.id') . '=' . $db->qn('a.service_id'));

		$query->join('LEFT', $db->qn('#__knowres_region', 'r') . 'ON' . $db->qn('r.id') . '=' . $db->qn('p.region_id'));

		if ($data['guest']) {
			$query->join('LEFT',
				$db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('g.id') . '=' . $db->qn('a.guest_id'));
		}

		if ($data['owner']) {
			$query->join('LEFT',
				$db->qn('#__knowres_owner', 'o') . 'ON' . $db->qn('o.id') . '=' . $db->qn('p.owner_id'));
		}

		$query->where($db->qn('a.state') . '=1');
		$query = self::filterProperty($db, $query, $data['property_id']);

		$filter_region_id = $data['region_id'];
		if (is_numeric($filter_region_id) && $filter_region_id > 0) {
			$query->where($db->qn('p.region_id') . '=' . (int) $filter_region_id);
		}

		$filter_agent_id = $data['agent_id'];
		if (is_numeric($filter_agent_id)) {
			$query->where($db->qn('a.agent_id') . '=' . (int) $filter_agent_id);
		}

		$query->where($db->qn('a.black_booking') . '=0');

		if (!$data['cancelled']) {
			$query->where($db->qn('a.cancelled') . '=0');
		}

		$query->group($db->qn('id'));
		$query->having($db->qn('payments') . '<>' . $db->qn('fees') . '+' . $db->qn('a.contract_total') . ' OR ' . $db->qn('unconfirmed') . '<> 0');
		$query->order($db->qn('a.arrival'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get contract export data for csv
	 *
	 * @param $data
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function exportContracts($data): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->select($db->qn('p.property_name', 'property_name'));
		$query->select($db->qn('ag.name', 'agent_name'));
		$query->select($db->qn('i.name', 'service_name'));
		$query->select($db->qn('r.id', 'region_id'));

		if ($data['guest']) {
			$query->select($db->qn(['g.firstname',
			                        'g.surname',
			                        'g.email',
			                        'g.country_id'
			]));
			$query->select($db->qn('g.document_id', 'guest_document_id'));
		}

		if ($data['referral']) {
			$query->select($db->qn(['g.referral_id',
			                        'g.referral_info'
			]));
		}

		if ($data['owner'] || (int) $data['owner_id'] > 0) {
			$query->select($db->qn(['o.name',
			                        'o.commission'
			]));
			$query->select($db->qn('o.document_id', 'owner_document_id'));
		}

		$query->from($db->qn('#__knowres_contract', 'a'))
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.black_booking') . '=0');

		$query->join('LEFT',
			$db->qn('#__knowres_property', 'p') . ' ON ' . $db->qn('p.id') . '=' . $db->qn('a.property_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_agent', 'ag') . ' ON ' . $db->qn('ag.id') . '=' . $db->qn('a.agent_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_service', 'i') . ' ON ' . $db->qn('i.id') . '=' . $db->qn('a.service_id'));

		$query->join('LEFT',
			$db->qn('#__knowres_region', 'r') . ' ON ' . $db->qn('r.id') . '=' . $db->qn('p.region_id'));

		if ($data['guest'] || $data['referral']) {
			$query->join('LEFT',
				$db->qn('#__knowres_guest', 'g') . ' ON ' . $db->qn('g.id') . '=' . $db->qn('a.guest_id'));
		}

		if ($data['owner'] || (int) $data['owner_id'] > 0) {
			$query->join('LEFT',
				$db->qn('#__knowres_owner', 'o') . ' ON ' . $db->qn('o.id') . '=' . $db->qn('p.owner_id'));
		}

		$query = self::filterProperty($db, $query, $data['property_id']);

		$filter_region_id = $data['region_id'];
		if ($filter_region_id && is_numeric($filter_region_id)) {
			$query->where('p.region_id = ' . (int) $filter_region_id);
		}

		$filter_agent_id = $data['agent_id'];
		if ($filter_agent_id && is_numeric($filter_agent_id)) {
			$query->where('a.agent_id = ' . (int) $filter_agent_id);
		}

		$filter_owner_id = $data['owner_id'];
		if ($filter_owner_id && is_numeric($filter_owner_id)) {
			$query->where($db->qn('o.id') . '=' . (int) $filter_owner_id);
		}

		if (!$data['cancelled']) {
			$query->where($db->qn('a.cancelled') . ' = 0');
		}

		if ($data['inresidence']) {
			$query->where($db->qn('a.arrival') . ' <= ' . $db->q($data['valid_from']));
			$query->where($db->qn('a.departure') . ' >= ' . $db->q($data['valid_from']));
		}
		else if (!$data['datetype']) {
			$ts_a = $data['valid_from'] . ' 00:00:00';
			$ts_d = $data['valid_to'] . ' 23:59:59';
			$query->where($db->qn('a.created_at') . ' >= ' . $db->q($ts_a));
			$query->where($db->qn('a.created_at') . ' <= ' . $db->q($ts_d));
		}
		else {
			$query->where($db->qn('a.arrival') . ' >= ' . $db->q($data['valid_from']));
			$query->where($db->qn('a.arrival') . ' <= ' . $db->q($data['valid_to']));
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get contract export data for guest registrations
	 *
	 * @param  string  $arrival  Date of arrival
	 *
	 * @throws RuntimeException
	 * @since  2.0.0
	 * @return mixed
	 */
	public function exportRegistration(string $arrival): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['a.id',
		                        'a.property_id',
		                        'p.property_name',
		                        'g.adults',
		                        'g.children',
		                        'g.guestinfo'
		]));
		$query->from($db->qn('#__knowres_contract', 'a'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('a.property_id'))
		      ->join('LEFT', $db->qn('#__knowres_contract_guestdata',
				      'g') . 'ON' . $db->qn('g.contract_id') . '=' . $db->qn('a.id'))
		      ->where($db->qn('a.arrival') . '=' . $db->q($arrival))
		      ->where($db->qn('a.cancelled') . '=0')
		      ->where($db->qn('a.black_booking') . '=0')
		      ->where($db->qn('a.state') . '=1');
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the entered arrival info
	 *
	 * @param  string  $arrival  Arrival date
	 *
	 * @throws RuntimeException
	 * @since 1.0.0
	 * @return array
	 */
	public function getArrivalInfoReminder(string $arrival): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$subQueryGuestdata = $db->getQuery(true);
		$subQueryGuestdata->select($db->qn('g.id'))
		                  ->from($db->qn('#__knowres_contract_guestdata', 'g'))
		                  ->where($db->qn('g.contract_id') . '=' . $db->qn('a.id'))
		                  ->where($db->qn('g.arrival_means') . '<>' . $db->q(''))
		                  ->where($db->qn('g.guestinfo') . '<>' . $db->q(''))
		                  ->where($db->qn('g.guestinfo') . '<>' . $db->q('[]'));

		$query->select($db->qn('a.id'))
		      ->from($db->qn('#__knowres_contract', 'a'))
		      ->where(' NOT EXISTS (' . $subQueryGuestdata->__toString() . ') ')
		      ->where($db->qn('a.arrival') . '=' . $db->q($arrival))
		      ->where($db->qn('a.cancelled') . '=0')
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.black_booking') . ' = 0')
		      ->where($db->qn('a.booking_status') . ' > 35')
		      ->order($db->qn('id'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the due balance for contract
	 *
	 * @param  string  $balance_date  Balance date
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getBalanceDue(string $balance_date): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_contract'))
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('black_booking') . '=0')
		      ->where($db->qn('balance_date') . '=' . $db->q($balance_date))
		      ->where($db->qn('booking_status') . '<30')
		      ->where($db->qn('booking_status') . '>=10')
		      ->order($db->qn('id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get all bookings and ical blocks for a property / properties after from date
	 *
	 * @param  mixed    $properties       ID, csv list or array of required properties to be returned
	 * @param  ?string  $from             Earliest departure date, defaults to today of not set
	 * @param  bool     $array            Format of output, set for associative array, default is array of objects
	 * @param  int      $sort             Required sort
	 *                                    0 = property ID, arrival
	 *                                    1 = property name, arrival
	 *                                    2 = property ID, black booking, arrival
	 * @param  bool     $published        TRUE to get bookings for published properties only
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	public function getBookedDates(mixed $properties, ?string $from = null, bool $array = false, int $sort = 0,
		bool $published = true): array
	{
		if (is_null($from)) {
			$from = TickTock::getDate();
		}

		$db = KrFactory::getDatabase();
		$q2 = self::unionQueryIcal($db, $properties, $from, $published);

		$q = $db->getQuery(true);
		$q->select($db->qn('a.id', 'id'))
		  ->select($db->qn('a.tag', 'tag'))
		  ->select($db->qn('a.arrival', 'arrival'))
		  ->select($db->qn('a.departure', 'departure'))
		  ->select($db->qn('a.service_id', 'service_id'))
		  ->select($db->qn('a.booking_status', 'booking_status'))
		  ->select($db->qn('a.property_id', 'property_id'))
		  ->select($db->qn('a.guest_id', 'guest_id'))
		  ->select($db->qn('a.black_booking', 'black_booking'))
		  ->from($db->qn('#__knowres_contract', 'a'))
		  ->where($db->qn('a.cancelled') . '=0')
		  ->where($db->qn('a.state') . '=1')
		  ->where($db->qn('a.departure') . '>=' . $db->q($from));

		if ($published) {
			$q->where($db->qn('property.state') . '=1');
		}

		if (!empty($this->user_properties)) {
			$q->where($db->qn('a.property_id') . ' IN (' . $this->user_properties . ')');
		}

		if (is_numeric($properties)) {
			$q->where($db->qn('a.property_id') . '=' . (int) $properties);
		}
		else if (is_array($properties)) {
			$q->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $properties)) . ')');
		}
		else if (is_string($properties) && strlen($properties) > 0) {
			$ids = explode(',', $properties);
			$q->where($db->qn('a.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$q->union($q2);

		$q->select($db->qn('guest.firstname', 'firstname'));
		$q->select($db->qn('guest.surname', 'surname'));
		$q->join('LEFT',
			$db->qn('#__knowres_guest', 'guest') . 'ON' . $db->qn('guest.id') . '=' . $db->qn('a.guest_id'));

		$q->select($db->qn('agent.name', 'agent_name'));
		$q->join('LEFT',
			$db->qn('#__knowres_agent', 'agent') . 'ON' . $db->qn('agent.id') . '=' . $db->qn('a.agent_id'));

		$q->select($db->qn('property.property_name', 'property_name'));
		$q->select($db->qn('property.checkin_time', 'checkin_time'));
		$q->select($db->qn('property.checkout_time', 'checkout_time'));
		$q->join('LEFT', $db->qn('#__knowres_property',
				'property') . 'ON' . $db->qn('property.id') . '=' . $db->qn('a.property_id'));

		$q->select($db->qn('service.name', 'service_name'));
		$q->join('LEFT',
			$db->qn('#__knowres_service', 'service') . 'ON' . $db->qn('service.id') . '=' . $db->qn('a.service_id'));

		if (!$sort) {
			$q->order($db->qn('property_id'))->order($db->qn('arrival'));
		}
		else if ($sort == 1) {
			$q->order($db->qn('property_name'))->order($db->qn('arrival'));
		}
		else if ($sort == 2) {
			$q->order($db->qn('property_id'))->order($db->qn('black_booking') . 'DESC')->order($db->qn('arrival'));
		}

		$db->setQuery($q);

		if ($array) {
			return $db->loadAssocList();
		}
		else {
			return $db->loadObjectList();
		}
	}

	/**
	 * Get contracts for property(ies) and optional service
	 *
	 * @param  mixed  $properties  One, csv string or array of properties
	 * @param  int    $service_id  ID of service
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getContractsByProperty(mixed $properties, int $service_id = 0): mixed
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.id',
		                        'c.tag',
		                        'c.arrival',
		                        'c.departure',
		                        'c.property_id',
		                        'c.cancelled'
		]));
		$query->select($db->qn('i.service_id', 'service_id'))
		      ->select($db->qn('i.foreign_key', 'foreign_key'))
		      ->from($db->qn('#__knowres_contract', 'c'));

		$query->join('LEFT',
			$db->qn('#__knowres_service_xref', 'i') . ' ON ' . $db->qn('i.contract_id') . '=' . $db->qn('c.id'));

		$query->where($db->qn('c.departure') . '>=' . $db->q($today))
		      ->where($db->qn('c.black_booking') . '=0')
		      ->where($db->qn('c.state') . '=1');

		if ($service_id) {
			$query->where($db->qn('c.service_id') . '=' . $service_id);
		}

		$filter_property_id = $properties;
		if (is_numeric($filter_property_id)) {
			$query->where($db->qn('c.property_id') . '=' . (int) $filter_property_id);
		}
		else if (is_array($filter_property_id)) {
			$query->where($db->qn('c.property_id') . ' IN (' . implode(',',
					array_map('intval', $filter_property_id)) . ')');
		}
		else if (is_string($filter_property_id) && strlen($filter_property_id) > 0) {
			$ids = explode(',', $filter_property_id);
			$query->where($db->qn('c.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get number of contracts for guest
	 *
	 * @param  int  $guest_id  ID of guest
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCountForGuest(int $guest_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('COUNT(*)')
		      ->from($db->qn('#__knowres_contract', 'a'))
		      ->where($db->qn('a.guest_id') . '=' . $guest_id);
		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get any cron triggers from emails
	 *
	 * @param  string  $trigger_date_field  The name of the trigger date field
	 * @param  string  $date                The trigger date
	 * @param  mixed   $booking_status      As int, string or array
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCronTrigger(string $trigger_date_field, string $date, mixed $booking_status): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_contract'))
		      ->where($db->qn($trigger_date_field) . '=' . $db->q($date))
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('black_booking') . '=0')
		      ->where($db->qn('state') . '=1');

		if (is_numeric($booking_status)) {
			$query->where($db->qn('booking_status') . '=' . (int) $booking_status);
		}
		else if (is_string($booking_status) && strlen($booking_status)) {
			$values = explode(',', $booking_status);
			$query->where($db->qn('booking_status') . ' IN (' . implode(',', array_map('intval', $values)) . ')');
		}
		else if (is_countable($booking_status) && count($booking_status)) {
			$query->where($db->qn('booking_status') . ' IN (' . implode(',',
					array_map('intval', $booking_status)) . ')');
		}

		$query->order($db->qn('id'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get combined dashboard data
	 *
	 * @param  int  $guest_id  ID of guest
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  2.5.0
	 * @return mixed
	 */
	public function getDashboardContracts(int $guest_id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['a.id',
		                        'a.agent_id',
		                        'a.agency_id',
		                        'a.arrival',
		                        'a.balance_date',
		                        'a.booking_status',
		                        'a.contract_total',
		                        'a.currency',
		                        'a.departure',
		                        'a.guests',
		                        'a.adults',
		                        'a.children',
		                        'a.child_ages',
		                        'a.guest_id',
		                        'a.property_id',
		                        'a.qkey',
		                        'a.tag',
		                        'p.checkin_time',
		                        'p.checkout_time',
		                        'p.property_name',
		                        'p.property_aka',
		                        'p.type_id',
		                        'p.lat',
		                        'p.lng',
		                        'p.lat_actual',
		                        'p.lng_actual',
		                        'p.property_street',
		                        'p.property_area',
		                        'p.town_id',
		                        'p.region_id',
		                        'p.country_id'
		]));

		$query->from($db->qn('#__knowres_contract', 'a'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('a.property_id'));

		$query->select($db->qn('g.firstname', 'firstname'))
		      ->select($db->qn('g.surname', 'surname'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('g.id') . '=' . $db->qn('a.guest_id'));

		$query->select($db->qn('gd.id', 'guestdata_id'))
		      ->join('LEFT', $db->qn('#__knowres_contract_guestdata',
				      'gd') . 'ON' . $db->qn('gd.contract_id') . '=' . $db->qn('a.id'));

		$query->select($db->qn('ag.name', 'agent_name'))
		      ->join('LEFT', $db->qn('#__knowres_agent', 'ag') . 'ON' . $db->qn('a.agent_id') . '=' . $db->qn('ag.id'));

		$query->select('(' . self::transSQ($db, 'region', 'p.region_id') . ') AS ' . $db->q('region_name'));
		$query->select('(' . self::transSQ($db, 'country', 'p.country_id') . ') AS ' . $db->q('country_name'));

		$today = date('Y-m-d');
		$query->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.black_booking') . '=0')
		      ->where($db->qn('a.cancelled') . '=0')
		      ->where($db->qn('a.departure') . '>=' . $db->q(TickTock::modifyMonths($today, 3, '-')))
		      ->where($db->qn('a.guest_id') . '=' . $guest_id)
		      ->order($db->qn('arrival'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get stats
	 *
	 * @param  int     $property_id    ID of property
	 * @param  string  $created_after  Contracts created after date
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getDataForPropertyStats(int $property_id, string $created_after): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id',
		                        'agent_id',
		                        'arrival',
		                        'departure',
		                        'room_total',
		                        'created_at',
		                        'created_by'
		]));

		$query->from($db->qn('#__knowres_contract'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . ' = 1')
		      ->where($db->qn('black_booking') . ' = 0')
		      ->where($db->qn('cancelled') . ' = 0')
		      ->where($db->qn('created_at') . '>= ' . $db->q($created_after))
		      ->order($db->qn('arrival'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get contracts due to expire when no deposit received
	 *
	 * @param  string  $expiry_date  Expiry date
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getDueExpire(string $expiry_date): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'));
		$query->from($db->qn('#__knowres_contract'))
		      ->where($db->qn('expiry_date') . '=' . $db->q($expiry_date))
		      ->where($db->qn('on_request') . '=0')
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('black_booking') . '=0')
		      ->where($db->qn('booking_status') . '>0')
		      ->where($db->qn('booking_status') . '<10')
		      ->order($db->qn('id'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get contracts due a review
	 *
	 * @param  string  $departure  Departure date
	 * @param  bool    $reminder   TRUE for reminder
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getDueReviews(string $departure, bool $reminder = false): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'));
		$query->from($db->qn('#__knowres_contract'))
		      ->where($db->qn('cancelled') . '=0')
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('black_booking') . '=0')
		      ->where($db->qn('reviewed') . '=0')
		      ->where($db->qn('booking_status') . '=40')
		      ->where($db->qn('departure') . '=' . $db->q($departure));

		if (!$reminder) {
			$query->where($db->qn('review_requested') . '=0');
		}
		else {
			$query->where($db->qn('review_requested') . '=1');
		}

		$query->order($db->qn('id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get expired requests
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getExpiredRequests(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.id',
		                        'c.on_request',
		                        'c.created_at'
		]));
		$query->from($db->qn('#__knowres_contract', 'c'))
		      ->where($db->qn('c.on_request') . '>0')
		      ->where($db->qn('c.booking_status') . '=1')
		      ->where($db->qn('c.cancelled') . '=0')
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('c.black_booking') . '=0');
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Find the latest n contracts for a property.
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $created_at   Earliest created at date
	 * @param  string  $today        Today
	 * @param  int     $limit        # to return
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function getLatestForProperty(int $property_id, string $created_at, string $today, int $limit = 7): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.id',
		                        'c.arrival',
		                        'c.departure',
		                        'g.firstname',
		                        'g.surname',
		                        'g.country_id'
		]))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('g.id') . '=' . $db->qn('c.guest_id'))
		      ->select($db->qn('g.firstname'))
		      ->select($db->qn('g.surname'))
		      ->select($db->qn('g.country_id'))
		      ->where($db->qn('c.property_id') . '=' . $property_id)
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('c.departure') . '>=' . $db->q($today))
		      ->where($db->qn('c.created_at') . '>=' . $db->q($created_at))
		      ->where($db->qn('c.black_booking') . '=0')
		      ->where($db->qn('c.cancelled') . '=0')
		      ->order($db->qn('c.created_at') . 'DESC')
		      ->setLimit($limit);
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the latest update date for each propertiy
	 *
	 * @throws RuntimeException|InvalidArgumentException
	 * @since  3.3.0
	 * @return array
	 */
	public function getLatestUpdatePerProperty(): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('c.created_at') . '), MAX(' . $db->qn('c.updated_at') . '))  as ' . $db->qn('maxdate'))
		      ->select($db->qn('c.property_id', 'pid'))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->where($db->qn('c.state') . '=1')
		      ->group($db->qn('pid'));

		$db->setQuery($query);

		return $db->loadAssocList('pid');
	}

	/**
	 * Get overview info
	 *
	 * @throws Exception
	 * @since  2.4.0
	 * @return mixed
	 */
	public function getOverview(): mixed
	{
		$today     = TickTock::getDate();
		$yesterday = TickTock::modifyDays($today, 1, '-') . ' 00:00:00';

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.id',
		                        'c.booking_status',
		                        'c.contract_total',
		                        'c.on_request',
		                        'c.tag',
		                        'c.arrival',
		                        'c.departure',
		                        'c.guest_id',
		                        'c.property_id',
		                        'c.booking_status',
		                        'c.currency',
		                        'c.cancelled_timestamp',
		                        'c.expiry_date',
		                        'c.balance_date',
		                        'c.created_at',
		                        'cp.service_id',
		                        'cp.service_ref',
		                        'g.firstname',
		                        'g.surname',
		                        'g.customer_ref',
		                        'p.property_name'
		]));

		$query->from($db->qn('#__knowres_contract', 'c'))
		      ->select($db->qn('a.name', 'agent_name'))
		      ->join('LEFT', $db->qn('#__knowres_agent', 'a') . 'ON' . $db->qn('a.id') . '=' . $db->qn('c.agent_id'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('g.id') . '=' . $db->qn('c.guest_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('c.property_id'))
		      ->join('LEFT', $db->qn('#__knowres_contract_payment',
				      'cp') . 'ON' . $db->qn('cp.contract_id') . '=' . $db->qn('c.id') . 'AND' . $db->qn('cp.state') . '=0');

		$query->where($db->qn('c.departure') . '>=' . $db->q($today))
		      ->where($db->qn('c.black_booking') . '=0')
		      ->where($db->qn('c.state') . '=1')
		      ->where('(( c.booking_status = 0 )' . ' OR (c.booking_status = 1 )' . ' OR (c.booking_status = 5 )' . ' OR (c.booking_status = 10 AND c.created_at > ' . $db->q($yesterday) . ')' . ' OR (c.booking_status = 40 AND c.created_at > ' . $db->q($yesterday) . ')' . ' OR (c.booking_status = 39 AND c.created_at > ' . $db->q($yesterday) . ')' . ' OR (c.booking_status = 30) OR (c.booking_status = 35 )' . ' OR (c.cancelled <> 0 AND c.cancelled_timestamp > ' . $db->q($yesterday) . ')' . ' OR (c.booking_status >= 39 AND c.booking_status <= 40 AND c.arrival = ' . $db->q($today) . ')' . ' OR (c.booking_status >= 39 AND c.booking_status <= 40 AND c.departure = ' . $db->q($today) . '))');

		if (!empty($this->user_properties)) {
			$query->where($db->qn('c.property_id') . ' IN (' . $this->user_properties . ')');
		}

		$query->order($db->qn('c.arrival'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Check if property is available (contracts only no ics) between two dates
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $arrival      Arrival date
	 * @param  string  $departure    Departure date
	 * @param  int     $id           ID of contract
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getPropertyAvailableDates(int $property_id, string $arrival, string $departure, int $id = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['a.tag',
		                        'a.arrival',
		                        'a.departure',
		                        'a.black_booking',
		                        'a.id'
		]))->from($db->qn('#__knowres_contract', 'a'));

		if ($id) {
			$query->where($db->qn('a.id') . '<>' . $id);
		}

		$query->where($db->qn('a.property_id') . '=' . $property_id)
		      ->where($db->qn('a.arrival') . '<' . $db->q($departure))
		      ->where($db->qn('a.departure') . '>' . $db->q($arrival))
		      ->where($db->qn('a.black_booking') . '<>2')
		      ->where($db->qn('a.state') . '=1')
		      ->where($db->qn('a.cancelled') . '=0')
		      ->order($db->qn('arrival'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get all unpublished 2 hours b4 current time
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getStrays(): mixed
	{
		$ts = TickTock::modifyHours('now', 2, '-');

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['a.id',
		                        'a.guest_id'
		]))
		      ->from($db->qn('#__knowres_contract', 'a'))
		      ->where($db->qn('a.created_at') . '<' . $db->q($ts))
		      ->where($db->qn('a.state') . '=0')
		      ->order($db->qn('a.id'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get the data to be displayed on the tooltip
	 *
	 * @param  int  $id  ID of contract
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return object
	 */
	public function getTooltipData(int $id): object
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.arrival',
		                        'c.departure'
		]))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->select($db->qn('guest.firstname', 'firstname'))
		      ->select($db->qn('guest.surname', 'surname'))
		      ->select($db->qn('guest.email', 'email'))
		      ->select($db->qn('guest.mobile', 'mobile'))
		      ->select($db->qn('guest.mobile_country_id', 'mobile_country_id'));
		$query->join('LEFT',
			$db->qn('#__knowres_guest', 'guest') . 'ON' . $db->qn('guest.id') . '=' . $db->qn('c.guest_id'));

		$query->where($db->qn('c.id') . '=' . $id);
		$query->setLimit(1);

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Find upcoming contracts for a property
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $arrival      Earliest arrival date
	 * @param  int     $limit        # to return
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function getUpcomingForProperty(int $property_id, string $arrival, int $limit = 7): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['c.id',
		                        'c.arrival',
		                        'c.departure',
		                        'g.firstname',
		                        'g.surname',
		                        'g.country_id'
		]))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . ' ON ' . $db->qn('g.id') . '=' . $db->qn('c.guest_id'))
		      ->select($db->qn('g.firstname'))
		      ->select($db->qn('g.surname'))
		      ->select($db->qn('g.country_id'))
		      ->where($db->qn('c.property_id') . '=' . $property_id)
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('c.departure') . '>=' . $db->q($arrival))
		      ->where($db->qn('c.black_booking') . '=0')
		      ->where($db->qn('c.cancelled') . '=0')
		      ->order($db->qn('arrival'))
		      ->setLimit($limit);
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Check if property is available between arrival and departure dates
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $arrival      Arrival date
	 * @param  string  $departure    Departure date
	 * @param  int     $edit_id      ID of contract being edited
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return bool
	 */
	public function isPropertyAvailable(int $property_id, string $arrival, string $departure, int $edit_id = 0): bool
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		//TODO-v4.4 Check if join will work
		$query->select($db->qn('c.id'));
		$query->from($db->qn('#__knowres_contract', 'c'))
		      ->where($db->qn('c.property_id') . '=' . $property_id)
		      ->where($db->qn('c.arrival') . '<' . $db->q($departure))
		      ->where($db->qn('c.departure') . '>' . $db->q($arrival))
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('c.cancelled') . '=0');

		if ($edit_id) {
			$query->where($db->qn('c.id') . '<>' . $edit_id);
		}

		$query->setLimit(1);
		$db->setQuery($query);
		$id = $db->loadResult();
		if (!empty($id)) {
			return false;
		}

		$query = $db->getQuery(true);

		$query->select($db->qn('c.id'));
		$query->from($db->qn('#__knowres_ical_block', 'c'))
		      ->where($db->qn('c.property_id') . '=' . $property_id)
		      ->where($db->qn('c.arrival') . '<' . $db->q($departure))
		      ->where($db->qn('c.departure') . '>' . $db->q($arrival))
		      ->setLimit(1);
		$db->setQuery($query);
		$id = $db->loadResult();
		if (!empty($id)) {
			return false;
		}

		return true;
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @throws RuntimeException|Exception
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	protected function getListQuery(): QueryInterface
	{
		$db = $this->getDatabase();

		$subQuery = $db->getQuery(true);
		$subQuery->select('guestdata.id')
		         ->from($db->qn('#__knowres_contract_guestdata', 'guestdata'))
		         ->where($db->qn('guestdata.contract_id') . '=' . $db->qn('a.id'))
		         ->order($db->qn('guestdata.id') . 'DESC')
		         ->setLimit(1);

		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_contract', 'a'));
		$query->select('(' . $subQuery->__toString() . ') ' . $db->q('guestdata_id'));

		$query->select($db->qn('uc.name', 'editor'));
		$query->join('LEFT', '#__users AS uc ON uc.id=a.checked_out');
		$query->select($db->qn('p.property_name', 'property_name'));
		$query->join('LEFT', '#__knowres_property AS p ON p.id = a.property_id');
		$query->select($db->qn('agency.name', 'agency_name'));
		$query->join('LEFT', '#__knowres_agency AS agency ON agency.id = a.agency_id');
		$query->select($db->qn('agent.name', 'agent_name'));
		$query->join('LEFT', '#__knowres_agent AS agent ON agent.id = a.agent_id');
		$query->select($db->qn('p.region_id', 'region_id'));
		$query->join('LEFT', '#__knowres_region AS region ON region.id = p.region_id');
		$query->select($db->qn('owner.name', 'owner_name'));
		$query->join('LEFT', '#__knowres_owner AS owner ON owner.id = p.owner_id');
		$query->select('CONCAT( guest.surname, " ", guest.firstname) AS guest_name');
		$query->select('CONCAT( guest.firstname, " ", guest.surname) AS guest_name_fs');
		$query->select($db->qn('guest.country_id', 'guest_country'));
		$query->join('LEFT', '#__knowres_guest AS guest ON guest.id = a.guest_id');
		$query->select($db->qn('user.name', 'manager_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_manager', 'm') . 'ON' . $db->qn('a.manager_id') . '=' . $db->qn('m.id'))
		      ->join('LEFT', $db->qn('#__users', 'user') . 'ON' . $db->qn('m.user_id') . '=' . $db->qn('user.id'));

		$query->select($db->qn('created_by.name', 'created_by'));
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select($db->qn('updated_by.name', 'updated_by'));
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$query->select('(' . self::transSQ($db, 'region', 'p.region_id') . ') AS ' . $db->q('region_name'));

		if (!empty($this->user_properties)) {
			$query->where($db->qn('a.property_id') . ' IN (' . $this->user_properties . ')');
		}

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id) {
			if (is_numeric($filter_property_id)) {
				$query->where('a.property_id = ' . (int) $filter_property_id);
			}
			else if (is_string($filter_property_id) && strlen($filter_property_id) > 0) {
				$ids = explode(',', $filter_property_id);
				$query->where('a.property_id IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		$state = $this->getState('filter.state');
		if (is_numeric($state)) {
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state == '') {
			$query->where($db->qn('a.state') . '= 1');
		}

		$filter_arrival = $this->state->get('filter.arrival');
		if ($filter_arrival) {
			$query->where($db->qn('a.arrival') . ' >= ' . $db->q($filter_arrival));
		}

		$filter_departure = $this->state->get('filter.departure');
		if ($filter_departure) {
			$query->where($db->qn('a.departure') . '>=' . $db->q($filter_departure));
		}
		else {
			$query->where($db->qn('a.departure') . '>=' . $db->q(TickTock::getDate()));
		}

		$filter_black_booking = $this->state->get('filter.black_booking');
		if (is_numeric($filter_black_booking)) {
			$query->where($db->qn('a.black_booking') . '=' . (int) $filter_black_booking);
		}
		else if (is_string($filter_black_booking) && strlen($filter_black_booking)) {
			$values = explode(',', $filter_black_booking);
			$query->where($db->qn('a.black_booking') . ' IN (' . implode(',', array_map('intval', $values)) . ')');
		}
		else {
			$query->where($db->qn('a.black_booking') . '=0');
		}

		$cancelled = $this->state->get('filter.cancelled');
		if (is_numeric($cancelled)) {
			$query->where($db->qn('a.cancelled') . '=' . (int) $cancelled);
		}
		else if (is_string($cancelled) && strlen($cancelled)) {
			$values = explode(',', $cancelled);
			$query->where($db->qn('a.cancelled') . ' IN (' . implode(',', array_map('intval', $values)) . ')');
		}
		else {
			$query->where($db->qn('a.cancelled') . '=0');
		}

		$filter_booking_status = $this->state->get('filter.booking_status');
		if (is_numeric($filter_booking_status)) {
			$query->where($db->qn('a.booking_status') . '=' . (int) $filter_booking_status);
		}

		$filter_guest_id = $this->state->get('filter.guest_id');
		if ($filter_guest_id) {
			$query->where($db->qn('a.guest_id') . '=' . (int) $filter_guest_id);
		}

		$filter_manager_id = $this->state->get('filter.manager_id');
		if ($filter_manager_id) {
			$query->where($db->qn('a.manager_id') . '=' . (int) $filter_manager_id);
		}

		$filter_agency_id = $this->state->get('filter.agency_id');
		if ($filter_agency_id) {
			$query->where($db->qn('a.agency_id') . '=' . (int) $filter_agency_id);
		}

		$filter_region_id = $this->state->get('filter.region_id');
		if ($filter_region_id > 0) {
			$query->where($db->qn('p.region_id') . '=' . (int) $filter_region_id);
		}

		$filter_owner_id = $this->state->get('filter.owner_id');
		if ((int) $filter_owner_id > 0) {
			$query->where($db->qn('p.owner_id') . '=' . (int) $filter_owner_id);
		}

		$filter_agent_id = $this->state->get('filter.agent_id');
		if ((int) $filter_agent_id > 0) {
			$query->where($db->qn('a.agent_id') . '=' . (int) $filter_agent_id);
		}

		$filter_created_at = $this->state->get('filter.created_at');
		if ($filter_created_at) {
			$query->where($db->qn('a.created_at') . ' >= ' . $db->q($filter_created_at));
		}

		$search = $this->getState('filter.search');
		if (!empty($search)) {
			if (stripos($search, 'id:') === 0) {
				$query->where($db->qn('a.id') . '=' . (int) substr($search, 3));
			}
			else {
				$search = $db->q('%' . $db->escape(trim($search), true) . '%');
				$query->having('( guest_name LIKE ' . $search . ' OR ( a.tag LIKE ' . $search . ' ) )');
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
	 * @return string   A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');
		$id .= ':' . $this->getState('filter.cancelled');
		$id .= ':' . $this->getState('filter.black_booking');
		$id .= ':' . $this->getState('filter.arrival');
		$id .= ':' . $this->getState('filter.departure');
		$id .= ':' . $this->getState('filter.booking_status');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.guest_id');
		$id .= ':' . $this->getState('filter.agency_id');
		$id .= ':' . $this->getState('filter.agent_id');
		$id .= ':' . $this->getState('filter.owner_id');
		$id .= ':' . $this->getState('filter.manager_id');
		$id .= ':' . $this->getState('filter.created_at');
		$id .= ':' . $this->getState('filter.region_id');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param  string  $ordering   Default ordering
	 * @param  string  $direction  Default ordering direction
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function populateState($ordering = 'a.arrival', $direction = 'asc'): void
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.cancelled',
			$this->getUserStateFromRequest($this->context . '.filter.cancelled', 'filter_cancelled', '', 'string'));
		$this->setState('filter.black_booking',
			$this->getUserStateFromRequest($this->context . '.filter.black_booking', 'filter_black_booking', '',
				'string'));
		$this->setState('filter.arrival',
			$this->getUserStateFromRequest($this->context . '.filter.arrival', 'filter_arrival', '', 'string'));
		$this->setState('filter.departure',
			$this->getUserStateFromRequest($this->context . '.filter.departure', 'filter_departure', '', 'string'));
		$this->setState('filter.booking_status',
			$this->getUserStateFromRequest($this->context . '.filter.booking_status', 'filter_booking_status', '',
				'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.guest_id',
			$this->getUserStateFromRequest($this->context . '.filter.guest_id', 'filter_guest_id', '', 'string'));
		$this->setState('filter.agency_id',
			$this->getUserStateFromRequest($this->context . '.filter.agency_id', 'filter_agency_id', '', 'string'));
		$this->setState('filter.agent_id',
			$this->getUserStateFromRequest($this->context . '.filter.agent_id', 'filter_agent_id', '', 'string'));
		$this->setState('filter.owner_id',
			$this->getUserStateFromRequest($this->context . '.filter.owner_id', 'filter_owner_id', '', 'string'));
		$this->setState('filter.manager_id',
			$this->getUserStateFromRequest($this->context . '.filter.manager_id', 'filter_manager_id', '', 'string'));
		$this->setState('filter.created_at',
			$this->getUserStateFromRequest($this->context . '.filter.created_at', 'filter_created_at', '', 'string'));
		$this->setState('filter.region_id',
			$this->getUserStateFromRequest($this->context . '.filter.region_id', 'filter_region_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}

	/**
	 * Union query for combining blocks
	 *
	 * @param  object  $db          KrFactory instance
	 * @param  mixed   $properties  ID, csv list or array of required properties to be returned
	 * @param  string  $departure   Earliest departure date, defauls to today of not set
	 * @param  bool    $published   TRUE to get bookings for published properties only
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	protected function unionQueryIcal(object $db, mixed $properties, string $departure, bool $published): QueryInterface
	{
		$q = $db->getQuery(true);
		$q->select($db->qn('b.id', 'id'))
		  ->select($db->q(null, 'tag'))
		  ->select($db->qn('b.arrival', 'arrival'))
		  ->select($db->qn('b.departure', 'departure'))
		  ->select($db->qn('b.service_id', 'service_id'))
		  ->select($db->q(0, 'booking_status'))
		  ->select($db->qn('b.property_id', 'property_id'))
		  ->select($db->q(0, 'guest_id'))
		  ->select($db->q(2, 'black_booking'))
		  ->select($db->q(null, 'firstname'))
		  ->select($db->q(null, 'surname'))
		  ->select($db->q(null, 'agent_name'))
		  ->from($db->qn('#__knowres_ical_block', 'b'));

		$q->select($db->qn('property.property_name', 'property_name'));
		$q->select($db->qn('property.checkin_time', 'checkin_time'));
		$q->select($db->qn('property.checkout_time', 'checkout_time'));
		$q->join('LEFT', $db->qn('#__knowres_property',
				'property') . 'ON' . $db->qn('property.id') . '=' . $db->qn('b.property_id'));

		$q->select($db->qn('service.name', 'service_name'));
		$q->join('LEFT',
			$db->qn('#__knowres_service', 'service') . 'ON' . $db->qn('service.id') . '=' . $db->qn('b.service_id'));

		if (!empty($this->user_properties)) {
			$q->where($db->qn('b.property_id') . ' IN (' . $this->user_properties . ')');
		}

		if (is_numeric($properties)) {
			$q->where($db->qn('b.property_id') . '=' . (int) $properties);
		}
		else if (is_array($properties)) {
			$q->where($db->qn('b.property_id') . ' IN (' . implode(',', array_map('intval', $properties)) . ')');
		}
		else if (is_string($properties) && strlen($properties) > 0) {
			$ids = explode(',', $properties);
			$q->where($db->qn('b.property_id') . ' IN (' . implode(',', array_map('intval', $ids)) . ')');
		}

		if ($published) {
			$q->where($db->qn('property.state') . '=1');
		}

		$q->where($db->qn('b.departure') . '>=' . $db->q($departure));

		return $q;
	}
}