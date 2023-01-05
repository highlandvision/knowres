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
use UnexpectedValueException;

/**
 * List model for Translations.
 *
 * @since 1.0.0
 */
class TranslationsModel extends ListModel
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
				'item', 'a.item',
				'item_id', 'a.item_id',
				'field', 'a.field',
				'text', 'a.text',
				'language', 'a.language',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'created_at', 'a.created_at',
				'updated_by', 'a.updated_by',
				'updated_at', 'a.updated_at',
				'name',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Delete translations for item and array of ids
	 *
	 * @param   string  $item  Translations item
	 * @param   array   $pks   Translations item_ids to delete
	 *
	 * @throws RuntimeException
	 * @since  3.0.0
	 */
	public function deleteMultipleItemId(string $item, array $pks)
	{
		if (!is_countable($pks) || !count($pks))
		{
			return;
		}

		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$conditions = array(
			$db->qn('item_id') . ' IN (' . implode(',', array_map('intval', $pks)) . ')',
			$db->qn('item') . '=' . $db->q($item),
		);

		$query->delete($db->qn('#__knowres_translation'));
		$query->where($conditions);

		$db->setQuery($query);
		$db->execute();
	}

	/**
	 * Get translations by Item
	 *
	 * @param   string  $item  Table of base item
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getByItem(string $item): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.item_id, a.field, a.text, a.language'))
		      ->from($db->qn('#__knowres_translation', 'a'))
		      ->where($db->qn('a.item') . '=' . $db->q($item))
		      ->where($db->qn('a.state') . '=1')
		      ->order($db->qn('a.text'));

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get item by text
	 *
	 * @param   string  $item      Table name
	 * @param   string  $text      Text value
	 * @param   string  $field     Field value
	 * @param   string  $language  Required language
	 *
	 * @throws UnexpectedValueException
	 * @since  3.3.3
	 */
	public function getByValue(string $item, string $text, string $field = 'name', string $language = 'en-GB')
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.item_id'))
		      ->from($db->qn('#__knowres_translation', 'a'))
		      ->where($db->qn('a.item') . '=' . $db->q($item))
		      ->where($db->qn('a.text') . '=' . $db->q($text))
		      ->where($db->qn('a.field') . '=' . $db->q($field))
		      ->where($db->qn('a.language') . '=' . $db->q($language))
		      ->setLimit(1);
		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Get translation id and text
	 *
	 * @param   string  $item      Item name
	 * @param   int     $item_id   Item ID
	 * @param   string  $field     Field name
	 * @param   string  $language  Language string
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getIdText(string $item, int $item_id, string $field, string $language): mixed
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.id, a.text'))
		      ->from($db->qn('#__knowres_translation', 'a'))
		      ->where($db->qn('a.item') . '=' . $db->q($item))
		      ->where($db->qn('a.item_id') . '=' . $item_id)
		      ->where($db->qn('a.field') . '=' . $db->q($field))
		      ->where($db->qn('a.language') . '=' . $db->q($language));

		$db->setQuery($query);

		return $db->loadObject();
	}

	/**
	 * Get translation
	 *
	 * @param   string  $item       table of base item
	 * @param   int     $item_id    id of base item
	 * @param   string  $field      name of field
	 * @param   array   $languages  languages to search by
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getTranslation(string $item, int $item_id, string $field, array $languages): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($this->getState('list.select', 'a.text, a.language'));

		$query->from($db->qn('#__knowres_translation', 'a'))
		      ->where($db->qn('a.item') . '=' . $db->q($item))
		      ->where($db->qn('a.item_id') . '=' . $item_id)
		      ->where($db->qn('a.field') . '=' . $db->q($field));

		if (count($languages) > 1)
		{
			$query->where($db->qn('a.language') . ' IN ' . $db->q(implode(',', $languages)))
			      ->order($db->qn('a.language') . ' IN ' . $db->q(implode(',', $languages)))
			      ->setLimit(1);
		}
		else if (count($languages) == 1)
		{
			$query->where($db->qn('a.language') . '=' . $db->q($languages[0]))->setLimit(1);
		}

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * Get translation id and text
	 *
	 * @param   string  $item     Item name
	 * @param   int     $item_id  Item ID
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return array
	 */
	public function getTranslationByItem(string $item, int $item_id): array
	{
		$db    = $this->getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn(['id', 'field', 'text', 'language']))
		      ->from($db->qn('#__knowres_translation'))
		      ->where($db->qn('item') . '=' . $db->q($item))
		      ->where($db->qn('item_id') . '=' . $item_id);

		$db->setQuery($query);

		return $db->loadObjectList();
	}

	/**
	 * SQL query to load the list data.
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
		$query->from($db->qn('#__knowres_translation', 'a'));

		$query = self::commonJoins($db, $query);

		$filter_language = $this->state->get('filter.language');
		if ($filter_language)
		{
			$query->where($db->qn('a.language') . '=' . $db->q($filter_language));
		}

		$filter_item = $this->state->get('filter.item');
		if ($filter_item)
		{
			$query->where($db->qn('a.item') . '=' . $db->q($filter_item));
		}

		$filter_item_id = $this->state->get('filter.item_id');
		if ($filter_item_id)
		{
			$query->where($db->qn('a.item_id') . '=' . (int) $filter_item_id);
			$query->where($db->qn('a.item') . '=' . $db->q('property'));
		}

		$filter_field = $this->state->get("filter.field");
		if ($filter_field)
		{
			$query->where($db->qn('a.field') . '=' . $db->q($filter_field));
		}

		$filter_orphans = $this->state->get('filter.orphans');
		if ($filter_orphans)
		{
			$query->group(
				[
					$db->qn('a.item'),
					$db->qn('a.item_id'),
					$db->qn('a.field'),
				]);
			$query->having("COUNT( DISTINCT (" . $db->qn('a.language') . ")) < " . (int) $filter_orphans);
		}
		else
		{
			$state = $this->getState('filter.state');
			if (is_numeric($state))
			{
				$query->where($db->qn('a.state') . '=' . (int) $state);
			}
			else if ($state === '')
			{
				$query->where($db->qn('a.state') . ' IN (0, 1)');
			}
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
				$search = $db->q('%' . $db->escape(trim($search)) . '%');
				$query->where($db->qn('a.text') . ' LIKE ' . $search);
			}
		}

		if ($this->state->get('list.ordercustom'))
		{
			$orderCustom = $this->state->get('list.ordercustom');
			$query->order($db->escape($orderCustom));
		}
		else
		{
			$orderCol  = $this->state->get('list.ordering');
			$orderDirn = $this->state->get('list.direction');
			if ($orderCol && $orderDirn)
			{
				$query->order($db->escape($orderCol . ' ' . $orderDirn));
			}
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
		$id .= ':' . $this->getState('filter.item');
		$id .= ':' . $this->getState('filter.item_id');
		$id .= ':' . $this->getState('filter.field');
		$id .= ':' . $this->getState('filter.language');
		$id .= ':' . $this->getState('filter.orphans');

		return parent::getStoreId($id);
	}

	/**
	 * Method to autopopulate the model state.
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Order item
	 * @param   string  $direction  Order direction
	 *
	 * @since 1.0.0
	 */
	protected function populateState($ordering = 'a.item', $direction = 'asc')
	{
		$this->setState(
			'filter.search', $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search')
		);
		$this->setState(
			'filter.state',
			$this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string')
		);
		$this->setState(
			'filter.item', $this->getUserStateFromRequest($this->context . '.filter.item', 'filter_item', '', 'string')
		);
		$this->setState(
			'filter.item_id',
			$this->getUserStateFromRequest($this->context . '.filter.item_id', 'filter_item_id', '', 'string')
		);
		$this->setState(
			'filter.field',
			$this->getUserStateFromRequest($this->context . '.filter.field', 'filter_field', '', 'string')
		);
		$this->setState(
			'filter.language',
			$this->getUserStateFromRequest($this->context . '.filter.language', 'filter_language', '', 'string')
		);
		$this->setState(
			'filter.orphans',
			$this->getUserStateFromRequest($this->context . '.filter.orphans', 'filter_orphans', '', 'string')
		);

		$params = KrMethods::getParams();
		$this->setState('params', $params);

		parent::populateState($ordering, $direction);
	}
}