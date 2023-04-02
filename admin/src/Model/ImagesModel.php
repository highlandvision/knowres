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
use Joomla\Database\Exception\DatabaseNotFoundException;
use Joomla\Database\QueryInterface;
use RuntimeException;

/**
 * Methods supporting a list of Single records.
 *
 * @since 1.0.0
 */
class ImagesModel extends ListModel
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
				'property_id', 'a.property_id',
				'property_order', 'a.property_order',
				'filename', 'a.filename',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'property_name', 'description', 'alt_text'
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get images, descriptins and alt text for a property
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return array
	 */
	public function forDisplay(int $property_id): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id',
			'a.filename'
		]));

		$query->select('(' . self::transSQ($db, 'image', 'a.id', 'description') . ') AS ' . $db->q('description'))
		      ->select('(' . self::transSQ($db, 'image', 'a.id', 'alt_text') . ') AS ' . $db->q('alt_text'))
		      ->from($db->qn('#__knowres_image', 'a'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->order($db->qn('property_order'));
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get all for property
	 *
	 * @param  int  $property_id  ID of property
	 *
	 * @throws DatabaseNotFoundException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getAllForProperty(int $property_id): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_image', 'a'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->order('property_order');
		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get images for xml site map
	 *
	 * @param  int  $property_id  ID of property
	 * @param  int  $limit        Number of images to return 0 = unlimited
	 *
	 * @throws DatabaseNotFoundException
	 * @throws RuntimeException
	 * @since  4.0.0
	 * @return mixed
	 */
	public function getForSiteMap(int $property_id, int $limit = 0): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'a.id',
			'a.filename'
		]));

		$query->from($db->qn('#__knowres_image', 'a'))
		      ->where($db->qn('property_id') . '=' . $property_id)
		      ->where($db->qn('state') . '=1')
		      ->order('property_order');

		if ($limit > 0)
		{
			$query->setLimit($limit);
		}

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
		$item = 'image';

		$subQuery = $db->getQuery(true);
		$subQuery->select('sub.text')
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn('a.id'))
		         ->order('(CASE WHEN ' . $db->qn('sub.language') . '=' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		$query->select($this->getState('list.select', 'a.*'));
		$query->from($db->qn('#__knowres_image', 'a'));
		$query->select('(' . self::transSQ($db, 'image', 'a.id', 'description') . ') AS '
			. $db->q('description'))
		      ->select('(' . self::transSQ($db, 'image', 'a.id', 'alt_text') . ') AS ' . $db->q('alt_text'));

		$query = self::commonJoins($db, $query);

		$query->select($db->qn('property.property_name', 'property_name'))
		      ->join('LEFT', $db->qn('#__knowres_property', 'property') . ' ON ' . $db->qn('property.id') . '='
			      . $db->qn('a.property_id'));

		$state = $this->getState('filter.state');
		if (is_numeric($state))
		{
			$query->where($db->qn('a.state') . '=' . (int) $state);
		}
		else if ($state === '')
		{
			$query->where($db->qn('a.state') . '=1');
		}

		$filter_property_id = (int) $this->state->get('filter.property_id');
		if ($filter_property_id)
		{
			$query->where($db->qn('a.property_id') . '=' . $filter_property_id);
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
	 * @since   1.0.0
	 * @return  string A store id.
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
	 * @param   null|string  $ordering
	 * @param   null|string  $direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.property_order', $direction = 'asc')
	{
		$this->setState('filter.search',
			$this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));
		$this->setState('filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string'));
		$this->setState('filter.property_id',
			$this->getUserStateFromRequest($this->context . '.filter_state', 'filter_property_id', '', 'string'));

		$this->setState('params', KrMethods::getParams());

		parent::populateState($ordering, $direction);
	}

	/**
	 * Set any translated text fields
	 *
	 * @param  array  $items  Items to translate
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	protected function setTranslations(array $items): array
	{
		if (count($items))
		{
			$Translations = new Translations();
			foreach ($items as $item)
			{
				$item->alt_text = $Translations->getText('image', $item->id, 'alt_text');
			}
		}

		return $items;
	}
}
