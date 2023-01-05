<?php
/**
 * @package    Know Reservations
 * @subpackage Admin table
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Table;

defined('_JEXEC') or die;

use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableTableInterface;
use Joomla\Database\DatabaseDriver;
use RuntimeException;
use UnexpectedValueException;

/**
 * Table Contract Guestdata
 *
 * @since 1.0.0
 */
class ContractguestdataTable extends Table implements VersionableTableInterface
{
	/** @var array An array of key names to be json encoded in the bind function */
	protected $_jsonEncode
		= [
			'arrival_air',
			'guestinfo',
			'options'
		];

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
		$this->typeAlias = 'com_knowres.contractguestdata';
		parent::__construct('#__knowres_contract_guestdata', 'id', $db);

		$this->setColumnAlias('published', 'state');
	}

	/**
	 * Method to check a row in if the necessary properties/fields exist.
	 * Allow for 0 user for sited
	 * Checking a row in will allow other users the ability to edit the row.
	 *
	 * @param   mixed  $pk  An optional primary key value to check out.  If not set the instance property value is used.
	 *
	 * @throws UnexpectedValueException*@throws RuntimeException
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return bool  True on success.
	 */
	public function checkIn($pk = null): bool
	{
		$checkedOutField     = $this->getColumnAlias('checked_out');
		$checkedOutTimeField = $this->getColumnAlias('checked_out_time');

		if (!property_exists($this, $checkedOutField) || !property_exists($this, $checkedOutTimeField))
		{
			return true;
		}

		if (is_null($pk))
		{
			$pk = [];
			foreach ($this->_tbl_keys as $key)
			{
				$pk[$this->$key] = $this->$key;
			}
		}
		else if (!is_array($pk))
		{
			$pk = array($this->_tbl_key => $pk);
		}

		foreach ($this->_tbl_keys as $key)
		{
			$pk[$key] = empty($pk[$key]) ? $this->$key : $pk[$key];

			if ($pk[$key] === null)
			{
				throw new UnexpectedValueException('Null primary key not allowed.');
			}
		}

		$query = $this->_db->getQuery(true)
		                   ->update($this->_tbl)
		                   ->set($this->_db->quoteName($checkedOutField) . ' = 0')
		                   ->set($this->_db->quoteName($checkedOutTimeField) . ' = '
			                   . $this->_db->quote($this->_db->getNullDate()));
		$this->appendPrimaryKeys($query, $pk);
		$this->_db->setQuery($query);

		$this->_db->execute();

		$this->$checkedOutField     = 0;
		$this->$checkedOutTimeField = '';

		return true;
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
}