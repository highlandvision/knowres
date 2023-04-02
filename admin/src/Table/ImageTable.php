<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Table
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Table;

defined('_JEXEC') or die;

use HighlandVision\KR\Translations;
use InvalidArgumentException;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableTableInterface;
use Joomla\Database\DatabaseDriver;
use RuntimeException;
use UnexpectedValueException;

/**
 * Image Table class
 *
 * @since 1.0.0
 */
class ImageTable extends Table implements VersionableTableInterface
{
	/** $var bool Indicates that columns fully support the NULL value in the database */
	protected $_supportNullValue = true;

	/**
	 * Constructor
	 *
	 * @param   DatabaseDriver  $db  Db Connector
	 *
	 * @since  1.0.0
	 */
	public function __construct(DatabaseDriver $db)
	{
		$this->typeAlias = 'com_knowres.image';
		parent::__construct('#__knowres_image', 'id', $db);

		$this->setColumnAlias('published', 'state');
		$this->setColumnAlias('ordering', 'property_order');
	}

	/**
	 * Method to delete a row from the database table by primary key value.
	 *
	 * @param   mixed  $pk  An optional primary key value to delete.  If not set the instance property value is used.
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return bool  True on success.
	 */
	public function delete($pk = null): bool
	{
		$this->load($pk);
		$result = parent::delete($pk);
		if ($result)
		{
			$translation = new Translations();
			$translation->deleteText('image', $pk);
		}

		return $result;
	}

	/**
	 * Method to get the next ordering value for a group of rows defined by an SQL WHERE clause.
	 * This is useful for placing a new item last in a group of items in the table.
	 * Override to use field property_order
	 *
	 * @param   string  $where  WHERE clause to use for selecting the MAX(ordering) for the table.
	 *
	 * @throws RuntimeException
	 * @throws UnexpectedValueException|InvalidArgumentException
	 * @since   1.0.0
	 * @return  int  Boolean false a failure or the next ordering value as an integer.
	 * @link    https://docs.joomla.org/Table/getNextOrder
	 */
	public function getNextOrder($where = ''): int
	{
		if (!property_exists($this, 'property_order'))
		{
			throw new UnexpectedValueException(sprintf('%s does not support ordering.', get_class($this)));
		}

		$query = $this->_db->getQuery(true);
		$query->select('MAX(property_order)')
		      ->from($this->_tbl);
		if ($where)
		{
			$query->where($where);
		}

		$this->_db->setQuery($query);

		return (int) $this->_db->loadResult() + 1;
	}

	/**
	 * Get the type alias for the history table
	 *
	 * @since   4.0.0
	 * @return  string  The alias as described above
	 */
	public function getTypeAlias(): string
	{
		return $this->typeAlias;
	}

	/**
	 * Method to compact the ordering values of rows in a group of rows
	 * defined by an SQL WHERE clause.
	 *
	 * @param   string  $where  WHERE clause to use for limiting the selection of rows to compact the ordering values.
	 *
	 * @throws RuntimeException
	 * @throws UnexpectedValueException|InvalidArgumentException
	 * @since  1.0.0
	 * @return bool  Boolean  True on success.
	 * @link   https://docs.joomla.org/Table/reorder
	 */
	public function reorder($where = ''): bool
	{
		if (!property_exists($this, 'property_order'))
		{
			throw new UnexpectedValueException(sprintf('%s does not support ordering.', get_class($this)));
		}

		$query = $this->_db->getQuery(true)
		                   ->select(implode(',', $this->_tbl_keys) . ', property_order')
		                   ->from($this->_tbl)
		                   ->where('property_order >= 0')
		                   ->order('property_order');

		if ($where)
		{
			$query->where($where);
		}

		$this->_db->setQuery($query);
		$rows = $this->_db->loadObjectList();

		foreach ($rows as $i => $row)
		{
			if ($row->property_order >= 0)
			{
				if ($row->property_order != $i + 1)
				{
					$query->clear()->update($this->_tbl)->set('property_order = ' . ($i + 1));
					$this->appendPrimaryKeys($query, $row);
					$this->_db->setQuery($query);
					$this->_db->execute();
				}
			}
		}

		return true;
	}
}