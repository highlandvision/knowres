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
 * Service logs list model.
 *
 * @since 1.0.0
 */
class ServicelogsModel extends ListModel
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
				'id',
				'a.id',
				'service_id',
				'a.service_id',
				'success',
				'a.success',
				'queue_id',
				'a.queue_id',
				'contract_id',
				'a.contract_id',
				'property_id',
				'a.property_id',
				'foreign_key',
				'a.foreign_key',
				'method',
				'a.method',
				'request',
				'a.request',
				'response',
				'a.response',
				'subject',
				'a.subject',
				'reply_to',
				'a.reply_to',
				'created_at',
				'a.created_at',
				'service_name',
				'contract_tag',
				'property_name'
			);
		}

		parent::__construct($config);
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
		$query->from('`#__knowres_service_log` AS a');

		$query->select('#__knowres_service_1166231.name AS service_name');
		$query->join('LEFT',
			'#__knowres_service AS #__knowres_service_1166231 ON #__knowres_service_1166231.id = a.service_id');
		$query->select('#__knowres_contract_1166238.tag AS contract_tag');
		$query->join('LEFT',
			'#__knowres_contract AS #__knowres_contract_1166238 ON #__knowres_contract_1166238.id = a.contract_id');
		$query->select('#__knowres_property_1166247.property_name AS property_name');
		$query->join('LEFT',
			'#__knowres_property AS #__knowres_property_1166247 ON #__knowres_property_1166247.id = a.property_id');

		$filter_service_id = $this->state->get("filter.service_id");
		if ($filter_service_id)
		{
			$query->where("a.service_id = '" . $db->escape($filter_service_id) . "'");
		}

		$filter_property_id = $this->state->get("filter.property_id");
		if ($filter_property_id)
		{
			$query->where("a.property_id = '" . $db->escape($filter_property_id) . "'");
		}

		$filter_method = $this->state->get("filter.method");
		if ($filter_method)
		{
			$query->where("a.method" . ' = ' . $db->q($filter_method));
		}

		$success = $this->getState('filter.success');
		if (is_numeric($success))
		{
			$query->where($db->qn('a.success') . ' = ' . (int) $success);
		}
		else if ($success === '')
		{
			$query->where('(a.success IN (0, 1))');
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
				$query->where('( a.request LIKE ' . $search . ' )');
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
	 * @return string  A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.service_id');
		$id .= ':' . $this->getState('filter.property_id');
		$id .= ':' . $this->getState('filter.success');
		$id .= ':' . $this->getState('filter.method');

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
	protected function populateState($ordering = 'a.id', $direction = 'desc')
	{
		$search = $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search');
		$this->setState('filter.search', trim($search));
		$this->setState('filter.service_id',
			$this->getUserStateFromRequest($this->context . '.filter.service_id', 'filter_service_id', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter.property_id', 'filter_property_id', '', 'string'));
		$this->setState('filter.success',
			$this->getUserStateFromRequest($this->context . '.filter.success', 'filter_success', '', 'string'));
		$this->setState('filter.method',
			$this->getUserStateFromRequest($this->context . '.filter.method', 'filter_method', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}