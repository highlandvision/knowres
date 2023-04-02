<?php
/**
 * @package     Know Reservations (KR)
 * @subpackage  Admin Models
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Joomla\Extend;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\Database\DatabaseInterface;
use Joomla\Database\Exception\QueryTypeAlreadyDefinedException;
use Joomla\Database\QueryInterface;
use RuntimeException;

use function array_map;
use function count;
use function explode;
use function implode;
use function is_array;
use function is_numeric;
use function is_string;
use function stripos;
use function strlen;
use function substr;
use function trim;

defined('_JEXEC') or die;

/**
 * KR List model extends ListModel
 *
 * @since 3.0.0
 */
abstract class ListModel extends \Joomla\CMS\MVC\Model\ListModel
{
	/**
	 * Method to get model rows.
	 *
	 * @since   3.0.0
	 * @return  array    Object on success, false on failure.
	 */
	public function getItems(): array
	{
		if (parent::getItems())
		{
			return parent::getItems();
		}

		return [];
	}

	/**
	 * Get filter fields
	 *
	 * @since  4.0.0
	 * @return array
	 */
	public function getFilterFields(): array
	{
		return $this->filter_fields;
	}

	/**
	 * Generate query for multipurpose Int, Array, String
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  string             $column  Name of column
	 * @param  mixed              $value   Value for field
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	public static function intArrayString(DatabaseInterface $db, QueryInterface $query, string $column,
		mixed $value): QueryInterface
	{
		if (!empty($value))
		{
			if (is_numeric($value))
			{
				$query->where($db->qn($column) . ' = ' . (int) $value);
			}
			else if (is_array($value) && count($value))
			{
				$query->where($db->qn($column) . ' IN (' . implode(',', array_map('intval', $value)) . ')');
			}
			else if (is_string($value) && strlen(trim($value)))
			{
				$value = explode(',', $value);
				$query->where($db->qn($column) . ' IN (' . implode(',', array_map('intval', $value)) . ')');
			}
		}

		return $query;
	}

	/**
	 * Generate query for string Filter
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  string             $column  Name of column
	 * @param  mixed              $filter  Filter value
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	public static function stringFilter(DatabaseInterface $db, QueryInterface $query, string $column,
		mixed $filter): QueryInterface
	{
		if (!empty($filter))
		{
			if (is_string($filter))
			{
				$filter = trim($filter);
				$query->where($db->qn($column) . ' = ' . $db->q(trim($filter)));
			}
			else if (is_array($filter))
			{
				$query->where($db->qn($column) . ' IN (' . implode(',', $db->q(array_map('strval', $filter))) . ')');
			}
		}

		return $query;
	}

	/**
	 * Generate query for common list query joins
	 *
	 * @param  DatabaseInterface  $db     Database instance
	 * @param  QueryInterface     $query  Existing query
	 *
	 * @throws QueryTypeAlreadyDefinedException
	 * @since  4.0.0
	 * @return QueryInterface
	 */
	public static function commonJoins(DatabaseInterface $db, QueryInterface $query): QueryInterface
	{
		$query->select($db->qn('uc.name', 'editor'))
		      ->join('LEFT', $db->qn('#__users', 'uc') . 'ON' . $db->qn('uc.id') . '=' . $db->qn('a.checked_out'));
		$query->select($db->qn('created_by.name', 'created_by'))
		      ->join('LEFT',
			      $db->qn('#__users', 'created_by') . 'ON' . $db->qn('created_by.id') . '=' . $db->qn('a.created_by'));
		$query->select($db->qn('updated_by.name', 'updated_by'))
		      ->join('LEFT',
			      $db->qn('#__users', 'updated_by') . 'ON' . $db->qn('updated_by.id') . '=' . $db->qn('a.updated_by'));

		return $query;
	}

	/**
	 * Generate query for integer Filter
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  string             $column  Name of column
	 * @param  mixed              $filter  Filter value
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	public static function intFilter(DatabaseInterface $db, QueryInterface $query, string $column,
		mixed $filter): QueryInterface
	{
		if (!empty($filter))
		{
			if (is_numeric($filter))
			{
				$query->where($db->qn($column) . '=' . (int) $filter);
			}
			else if (is_array($filter) && count($filter))
			{
				$query->where($db->qn($column) . ' IN (' . implode(',', array_map('intval', $filter)) . ')');
			}
		}

		return $query;
	}

	/**
	 * Generate query for integer Filter
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  mixed              $filter  Filter value
	 *
	 * @since  3.3.0
	 * @return QueryInterface
	 */
	public static function filterProperty(DatabaseInterface $db, QueryInterface $query, mixed $filter): QueryInterface
	{
		if (!empty($filter))
		{
			if (is_numeric($filter))
			{
				$query->where($db->qn('a.property_id') . '=' . (int) $filter);
			}
			else if (is_array($filter))
			{
				$query->where($db->qn('a.property_id') . ' IN (' . implode(',',
						array_map('intval', $filter)) . ')');
			}
			else if (is_string($filter) && strlen($filter) > 0)
			{
				$ids = explode(',', $filter);
				$query->where($db->qn('a.property_id') . 'IN (' . implode(',', array_map('intval', $ids)) . ')');
			}
		}

		return $query;
	}

	/**
	 * Set query for json string find in set
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  mixed              $filter  Current filter values
	 * @param  string             $column  Database column
	 *
	 * @since  1.0.0
	 * @return QueryInterface
	 */
	public static function jsonFindInSet(DatabaseInterface $db, QueryInterface $query, mixed $filter,
		string $column): QueryInterface
	{
		if (is_numeric($filter) && (int) $filter > 0)
		{
			$query->where('FIND_IN_SET( ' . (int) $filter . ', REPLACE(REPLACE(REPLACE(' . $db->qn($column) . ','
				. $db->q('"') . ',' . $db->q('') . ' ), ' . $db->q('[') . ',' . $db->q('') . ' ), ' . $db->q(']') . ','
				. $db->q('') . ')) > 0');
		}
		else if (is_array($filter) && count($filter) > 0)
		{
			foreach ($filter as $f)
			{
				$query->where('FIND_IN_SET( ' . (int) $f . ', REPLACE(REPLACE(REPLACE(' . $db->qn($column) . ','
					. $db->q('"') . ',' . $db->q('') . ' ), ' . $db->q('[') . ',' . $db->q('') . ' ), ' . $db->q(']')
					. ',' . $db->q('') . ')) > 0');
			}
		}
		else if (is_string($filter) && $filter != '')
		{
			$query->where('FIND_IN_SET( ' . $db->q($filter) . ', REPLACE(REPLACE(REPLACE(' . $db->qn($column) . ','
				. $db->q('"') . ',' . $db->q('') . ' ), ' . $db->q('[') . ',' . $db->q('') . ' ), ' . $db->q(']') . ','
				. $db->q('') . ')) > 0');
		}

		return $query;
	}

	/**
	 * Generic search code for list query
	 *
	 * @param  DatabaseInterface  $db         Database instance
	 * @param  QueryInterface     $query      Existing query
	 * @param  string             $column     Order column
	 * @param  string             $direction  Order direction
	 *
	 * @since   3.3.0
	 * @return QueryInterface
	 */
	public static function order(DatabaseInterface $db, QueryInterface $query, string $column,
		string $direction): QueryInterface
	{
		if ($column && $direction)
		{
			$query->order($db->qn($column) . ' ' . $db->escape($direction));
		}

		return $query;
	}

	/**
	 * Generic search code for list query
	 *
	 * @param  DatabaseInterface  $db      Database instance
	 * @param  QueryInterface     $query   Existing query
	 * @param  string             $search  Search string
	 * @param  string             $field   Name of fiueld to search
	 *
	 * @since   3.3.0
	 * @return  QueryInterface
	 */
	public static function search(DatabaseInterface $db, QueryInterface $query, string $search,
		string $field): QueryInterface
	{
		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where($db->qn('a.id') . '=' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->q('%' . $db->escape($search) . '%');
				$query->where($db->qn($field) . ' LIKE ' . $search);
			}
		}

		return $query;
	}

	/**
	 * Build translation subquery
	 *
	 * @param  DatabaseInterface  $db     Database interface
	 * @param  string             $item   Item being translated
	 * @param  string             $key    Key for item
	 * @param  string             $field  Optional field name for multiple translations per table
	 *
	 * @throws RuntimeException
	 * @since  3.3.0
	 * @return string
	 */
	public static function transSQ(DatabaseInterface $db, string $item, string $key, string $field = ''): string
	{
		$lang = KrMethods::getLanguageTag();

		$subquery = $db->getQuery(true);
		$subquery->select($db->qn('sub.text'))
		         ->from($db->qn('#__knowres_translation', 'sub'))
		         ->where($db->qn('sub.item') . '=' . $db->q($item))
		         ->where($db->qn('sub.item_id') . '=' . $db->qn($key));

		if ($field)
		{
			$subquery->where($db->qn('sub.field') . '=' . $db->q($field));
		}

		$subquery->order('(CASE WHEN ' . $db->qn('sub.language') . ' = ' . $db->q($lang) . ' THEN 1 ELSE 2 END )')
		         ->setLimit(1);

		return $subquery->__toString();
	}
}