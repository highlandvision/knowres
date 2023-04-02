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
use InvalidArgumentException;
use Joomla\Database\QueryInterface;
use Joomla\DI\Exception\KeyNotFoundException;
use RuntimeException;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class GuestsModel extends ListModel
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
				'email', 'a.email',
				'firstname', 'a.firstname',
				'surname', 'a.surname',
				'country_id', 'a.country_id',
				'state', 'a.state',
				'country_name'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get last guest update
	 *
	 * @param  int  $service_id  ID of service
	 *
	 * @throws RuntimeException
	 * @throws KeyNotFoundException|InvalidArgumentException
	 * @since  3.3.0
	 * @return array
	 */
	public static function guestDates(int $service_id): array
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select('GREATEST(MAX(' . $db->qn('g.created_at') . '), MAX(' . $db->qn('g.updated_at') . '))  as '
			. $db->qn('maxdate'))
		      ->select($db->qn('c.id', 'cid'))
		      ->from($db->qn('#__knowres_contract', 'c'))
		      ->join('LEFT', $db->qn('#__knowres_guest', 'g') . 'ON' . $db->qn('c.guest_id') . '=' . $db->qn('g.id'))
		      ->where($db->qn('c.state') . '=1')
		      ->where($db->qn('g.state') . '=1')
		      ->where($db->qn('c.service_id') . '=' . $service_id)
		      ->group($db->qn('cid'));

		$db->setQuery($query);

		return $db->loadAssocList('cid');
	}

	/**
	 * Validate if guest email exists on Guest
	 *
	 * @param   string  $email  Guest email
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function checkGuestEmail(string $email): mixed
	{
		if (!$email)
		{
			return false;
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('a.id', 'a.user_id', 'a.property_id', 'a.email', 'a.firstname', 'a.surname',
		                             'a.document_type', 'a.document_id', 'a.address1', 'a.address2', 'a.town',
		                             'a.region', 'a.region_id',
		                             'a.country_id', 'a.postcode', 'a.b_address1', 'a.b_address2', 'a.b_town',
		                             'a.b_region', 'a.b_postcode',
		                             'a.b_region_id', 'a.b_country_id', 'a.email_2', 'a.email_3', 'a.mobile',
		                             'a.mobile_country_id',
		                             'a.telephone', 'a.discount', 'a.referral_id', 'a.referral_info', 'a.customer_ref',
		                             'a.foreign_key',
		                             'a.state'
		)));

		$query->from($db->qn('#__knowres_guest', 'a'))
		      ->where($db->qn('a.email') . '=' . $db->q($email))
		      ->where($db->qn('a.state') . '=1')
		      ->order($db->qn('a.id') . 'DESC')
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get contracts by guest email
	 *
	 * @param   string  $email  Guest email
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return bool|array
	 */
	public function getContractsByGuestEmail(string $email): bool|array
	{
		if (!$email)
		{
			return false;
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array(
			'g.id',
			'g.firstname',
			'g.surname',
			'g.mobile',
			'g.mobile_country_id'
		)));

		$query->select($db->qn('c.arrival', 'arrival'))
		      ->select($db->qn('c.departure', 'departure'))
		      ->select($db->qn('p.property_name', 'property_name'))
		      ->from($db->qn('#__knowres_guest', 'g'));

		$query->join('LEFT', $db->qn('#__knowres_contract', 'c')
			. ' ON ' . $db->qn('c.guest_id') . '=' . $db->qn('g.id')
			. ' AND ' . $db->qn('c.state') . '=1'
			. ' AND ' . $db->qn('c.cancelled') . '=0');
		$query->join('LEFT', $db->qn('#__knowres_property', 'p')
			. ' ON ' . $db->qn('c.property_id') . '=' . $db->qn('p.id'));

		$query->where($db->qn('g.email') . ' = ' . $db->q($email))
		      ->where($db->qn('g.state') . ' = 1')
		      ->order($db->qn('departure') . 'DESC')
		      ->setLimit(3);

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get guest emails
	 *
	 * @param   string  $data   Data string with part of email
	 * @param   int     $limit  Rows to return
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getEmails(string $data, int $limit = 10): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id', 'email']));

		$query->from($db->qn('#__knowres_guest'))
		      ->where($db->qn('state') . '=1');

		if (!empty($data))
		{
			$search = '%' . trim($data, true) . '%';
			$query->where(($db->qn('email') . ' LIKE ' . $db->q($search) . ' OR ' . $db->qn('surname') . ' LIKE '
				. $db->q($search)));
		}

		$query->setLimit($limit)
		      ->group($db->qn('email'))
		      ->order($db->qn('email'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get guest foreign keys
	 * Will be deprectaed in next version when moved to service xrefs
	 *
	 * @throws RuntimeException
	 * @since      1.0.0
	 * @return array
	 * @deprecated deprecated since version 3.4.0
	 */
	public function getForeignKeys(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(array('id',
		                             'foreign_key',
		                             'state')))
		      ->from($db->qn('#__knowres_guest'))
		      ->where($db->qn('foreign_key') . '>' . $db->q(''));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get guest countries
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getGuestCountries(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('DISTINCT ' . $db->qn('country_id', 'id'))
		      ->from($db->qn('#__knowres_guest'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get guest id from user
	 *
	 * @param   int  $user_id  ID of user
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return ?int
	 */
	public function getGuestForUser(int $user_id): ?int
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_guest'))
		      ->where($db->qn('user_id') . '=' . $user_id)
		      ->where($db->qn('state') . '=1')
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

		$query->select($this->getState('list.select'));
		$query->from($db->qn('#__knowres_guest', 'a'));

		$query->select("uc.name AS editor");
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$lang = KrMethods::getLanguageTag();
		$query->select('c.text AS country_name');
		$query->join('LEFT', $db->qn('#__knowres_translation', 'c')
			. ' ON ' . $db->qn('c.item') . '=' . $db->q('country')
			. ' AND ' . $db->qn('c.item_id') . '=' . $db->qn('a.country_id')
			. ' AND ' . $db->qn('c.language') . '=' . $db->q($lang));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}

		$filter_country_id = $this->state->get("filter.country_id");
		if ($filter_country_id)
		{
			if (is_numeric($filter_country_id))
			{
				$query->where($db->qn('a.country_id') . '=' . (int) $filter_country_id);
			}
			else if (is_array($filter_country_id))
			{
				$query->where($db->qn('a.country_id') . ' IN (' . implode(',', array_map('intval', $filter_country_id))
					. ')');
			}
		}

		$filter_user_id = $this->state->get('filter.user_id');
		if ($filter_user_id)
		{
			$query->where($db->qn('a.user_id') . '=' . (int) $filter_user_id);
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
				$query->where('(a.email LIKE ' . $search . ' OR a.surname LIKE ' . $search . ' OR a.firstname LIKE '
					. $search . ')');
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
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.user_id');
		$id .= ':' . $this->getState('filter.country_id');

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
	protected function populateState($ordering = 'a.surname', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.user_id',
			$this->getUserStateFromRequest($this->context . '.filter.user_id', 'filter_user_id', '', 'string'));
		$this->setState('filter.country_id',
			$this->getUserStateFromRequest($this->context . '.filter.country_id', 'filter_country_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		$this->setState('list.select', 'a.id, a.user_id, a.property_id, a.email, a.firstname, a.surname, 
		a.document_type, a.document_id, a.address1, a.address2, a.town, a.region, a.region_id, a.country_id, a.postcode,
		 a.b_address1, a.b_address2, a.b_town, a.b_region, a.b_postcode, a.b_region_id, a.b_country_id, 
		 a.email_2, a.email_3, a.mobile, a.mobile_country_id, a.telephone, a.discount, a.referral_id,
		 a.referral_info, a.customer_ref, a.foreign_key,
 		 a.state, a.created_by, a.created_at, a.updated_by, a.updated_at');

		parent::populateState($ordering, $direction);
	}
}