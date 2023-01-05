<?php
/**
 * @package    Know Reservations
 * @subpackage Admin model
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
use Joomla\CMS\Factory;
use Joomla\Database\QueryInterface;

use RuntimeException;

use function defined;

/**
 * Methods supporting a list of Knowres records.
 *
 * @since 1.0.0
 */
class RoomsModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function __construct($config = array())
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = [
				'id', 'a.id',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name', 'description'
			];
		}

		parent::__construct($config);
	}

	/**
	 * Get all the rooms
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getAll(): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn('id'))
		      ->from($db->qn('#__knowres_room'))
		      ->where($db->qn('state') . '=1');
		$db->setQuery($query);

		$items        = $db->loadObjectList();
		$Translations = new Translations();

		return $Translations->addTranslationToObject($items, 'room');
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
		$item = 'room';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')->from($db->qn('#__knowres_translation', 'sub'))->where(
			$db->qn('sub.item') . '=' . $db->q($item))->where(
			$db->qn('sub.item_id') . '=' . $db->qn('a.id'))->where(
			$db->qn('sub.field') . '=' . $db->q('name'))->order(
			'(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q(
				$lang) . ' THEN 1 ELSE 2 END )')->setlimit(1);

		$subQuery1 = $db->getQuery(true);
		$subQuery1->select('sub.text')->from($db->qn('#__knowres_translation', 'sub'))->where(
			$db->qn('sub.item') . '=' . $db->q($item))->where(
			$db->qn('sub.item_id') . '=' . $db->qn('a.id'))->where(
			$db->qn('sub.field') . '=' . $db->q('description'))->order(
			'(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q(
				$lang) . ' THEN 1 ELSE 2 END )')->setlimit(1);

		$query->select($this->getState('list.select', 'a.*'));

		$query->from('`#__knowres_room` AS a')
		      ->select('(' . $subQuery->__toString() . ') ' . $db->q('name'))
		      ->select('(' . $subQuery1->__toString() . ') ' . $db->q('description'));

		$query = ListModel::commonJoins($db, $query);

		$published = $this->getState('filter.state');
		if (is_numeric($published))
		{
			$query->where($db->qn('a.state') . '=' . (int) $published);
		}
		else if ($published === '')
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
	 * @since  1.6
	 * @return string        A store id.
	 */
	protected function getStoreId($id = ''): string
	{
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.state');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	protected function populateState($ordering = 'name', $direction = 'asc')
	{
		$app    = Factory::getApplication();
		$search = $app->getUserStateFromRequest($this->context . '.filter.search', 'filter_search');
		$this->setState('filter.search', trim($search));
		$published = $app->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string');
		$this->setState('filter.state', $published);

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}
}