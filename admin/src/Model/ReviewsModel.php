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
 * Reviews list model.
 *
 * @since 1.0.0
 */
class ReviewsModel extends ListModel
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
				'contract_id', 'a.contract_id',
				'property_id', 'a.property_id',
				'review_date', 'a.review_date',
				'rating', 'a.rating',
				'title', 'a.title',
				'review', 'a.review',
				'rating1', 'a.rating1',
				'rating2', 'a.rating2',
				'rating3', 'a.rating3',
				'rating4', 'a.rating4',
				'rating5', 'a.rating5',
				'rating6', 'a.rating6',
				'guest_name', 'a.guest_name',
				'guest_location', 'a.guest_location',
				'held', 'a.held',
				'approved', 'a.approved',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'property_name', 'guest_surname', 'contract_tag'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get reviews to display on property page
	 *
	 * @param   int  $property_id  ID of property
	 * @param   int  $limit        Rows to return
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return mixed
	 */
	public function forDisplay(int $property_id, int $limit): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'id', 'guest_name', 'guest_location',
			'property_id', 'review_date', 'rating', 'title', 'review',
			'rating1', 'rating2', 'rating3', 'rating4', 'rating5', 'rating6',
			'created_at'
		]));

		$query->from($db->qn('#__knowres_review'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('held') . '=0')
		      ->where($db->qn('approved') . '=1')
		      ->where($db->qn('state') . '=1')
		      ->order($db->qn('review_date') . ' DESC')
		      ->setLimit($limit);

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get average scores for property
	 *
	 * @param $property_id
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAvgReview($property_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select('COUNT(*) AS avgcount')
		      ->select('ROUND(AVG(rating),0) AS avgrating')
		      ->select('ROUND(AVG(rating1),0) AS avgrating1')
		      ->select('ROUND(AVG(rating2),0) AS avgrating2')
		      ->select('ROUND(AVG(rating3),0) AS avgrating3')
		      ->select('ROUND(AVG(rating4),0) AS avgrating4')
		      ->select('ROUND(AVG(rating5),0) AS avgrating5')
		      ->select('ROUND(AVG(rating6),0) AS avgrating6')
		      ->from($db->qn('#__knowres_review'))
		      ->where($db->qn('property_id') . ' = ' . (int) $property_id)
		      ->where($db->qn('state') . ' = 1')
		      ->where($db->qn('approved') . ' = 1')
		      ->where($db->qn('held') . ' = 0')
		      ->where($db->qn('rating') . ' > 0');
		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get reviews awaiting approval
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getReviewsForApproval(): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['r.id',
		                        'r.title',
		                        'p.property_name',
		                        'c.tag']));
		$query->from($db->qn('#__knowres_review', 'r'))
		      ->join('LEFT',
			      $db->qn('#__knowres_contract', 'c') . 'ON' . $db->qn('c.id') . '=' . $db->qn('r.contract_id'))
		      ->join('LEFT',
			      $db->qn('#__knowres_property', 'p') . 'ON' . $db->qn('p.id') . '=' . $db->qn('r.property_id'))
		      ->where($db->qn('r.state') . '=0')
		      ->where($db->qn('r.approved') . '=0')
		      ->where($db->qn('r.held') . '=0')
		      ->order($db->qn('r.created_at'));

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

		$query->select($this->getState('list.select', 'a.*'));
		$query->from('`#__knowres_review` AS a');

		$query->select($db->qn('uc.name', 'editor'));
		$query->join("LEFT", "#__users AS uc ON uc.id=a.checked_out");
		$query->select($db->qn('contract.tag', 'contract_tag'));
		$query->join('LEFT', '#__knowres_contract AS contract ON contract.id = a.contract_id');
		$query->select($db->qn('property.property_name', 'property_name'));
		$query->join('LEFT', '#__knowres_property AS property ON property.id = a.property_id');
		$query->select('created_by.name AS created_by');
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		$query->select('updated_by.name AS updated_by');
		$query->join('LEFT', '#__users AS updated_by ON updated_by.id = a.updated_by');

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else
		{
			$query->where($db->qn('a.state') . 'IN (0,1)');
		}

		$filter_property_id = $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . (int) $filter_property_id);
		}

		$filter_held = $this->state->get('filter.held');
		if (is_numeric($filter_held))
		{
			$query->where($db->qn('a.held') . '=' . (int) $filter_held);
		}
		else
		{
			$query->where($db->qn('a.held') . 'IN (0,1)');
		}

		$filter_approved = $this->state->get('filter.approved');
		if (is_numeric($filter_approved))
		{
			$query->where($db->qn('a.approved') . '=' . (int) $filter_approved);
		}
		else
		{
			$query->where($db->qn('a.approved') . 'IN (0,1)');
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

				$subQuery = $db->getQuery(true);
				$subQuery->select($db->qn('tag'));
				$subQuery->from($db->qn('#__knowres_contract'));
				$subQuery->where($db->qn('#__knowres_contract.id') . ' = ' . $db->qn('a.contract_id'));

				$query->where('(' . $db->qn('a.title') . ' LIKE ' . $search
					. ' OR (' . $subQuery->__toString() . ') LIKE ' . $search . ')');
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
		$id .= ':' . $this->getState('filter.held');
		$id .= ':' . $this->getState('filter.approved');

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
	protected function populateState($ordering = 'a.review_date', $direction = 'desc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.held',
			$this->getUserStateFromRequest($this->context . '.filter.held', 'filter_held', '', 'string'));
		$this->setState('filter.approved',
			$this->getUserStateFromRequest($this->context . '.filter.approved', 'filter_approved', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}