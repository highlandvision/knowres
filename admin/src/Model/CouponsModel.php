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
use Joomla\Database\QueryInterface;
use RuntimeException;

use function defined;
use function stripos;
use function substr;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class CouponsModel extends ListModel
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
				'coupon_code', 'a.coupon_code',
				'valid_from', 'a.valid_from',
				'valid_to', 'a.valid_to',
				'amount', 'a.amount',
				'is_percentage', 'a.is_percentage',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Checks if current valid coupons for a property
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $coupon_code  Coupon code
	 *
	 * @throws RuntimeException
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getCoupon(int $property_id, string $coupon_code): mixed
	{
		$today = TickTock::getDate();

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_coupon', 'a'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('valid_from') . '<=' . $db->q($today))
		      ->where($db->qn('valid_to') . '>=' . $db->q($today))
		      ->where($db->qn('coupon_code') . 'LIKE' . $db->q($coupon_code))
		      ->setLimit(1);
		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Checks if current valid coupons for a property
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getValidCoupons(int $property_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$today = TickTock::getDate();
		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_coupon'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->where($db->qn('valid_from') . '<=' . $db->q($today))
		      ->where($db->qn('valid_to') . '>=' . $db->q($today))
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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_coupon', 'a'));

		$query->select($db->qn('pp.state', 'property_state'))
		      ->join('INNER',
			      $db->qn('#__knowres_property', 'pp') . 'ON' . $db->qn('pp.id') . '=' . $db->qn('a.property_id')
			      . 'AND'
			      . $db->qn('pp.state') . '=1');
		$query->select($db->qn('uc.name', 'editor'))
		      ->join('LEFT', $db->qn('#__users', 'uc') . 'ON' . $db->qn('uc.id') . '=' . $db->qn('a.checked_out'));
		$query->select($db->qn('p.property_name', 'property_name'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('a.property_id'));
		$query->select($db->qn('created_by.name', 'created_by'))
		      ->join('LEFT',
			      $db->qn('#__users', 'created_by') . 'ON' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by'))
		      ->join('LEFT',
			      $db->qn('#__users', 'updated_by') . 'ON' . $db->qn('updated_by.id') . '=' . $db->qn('a.updated_by'));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . ' IN (0, 1)');
		}

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
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
				$search = $db->q('%' . $search . '%');
				$query->where($db->qn('a.coupon_code') . ' LIKE ' . $search);
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

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering   Ordering field
	 * @param   null|string  $direction  Ordering direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.valid_to', $direction = 'desc')
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