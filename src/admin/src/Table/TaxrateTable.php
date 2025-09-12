<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Table;

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
 * Tax rate Table class
 *
 * @since 1.0.0
 */
class TaxrateTable extends Table implements VersionableTableInterface
{
	/** @var array An array of key names to be json encoded in the bind function */
	protected $_jsonEncode = ['agent'];
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
		$this->typeAlias = 'com_knowres.taxrate';
		parent::__construct('#__knowres_tax_rate', 'id', $db);

		$this->setColumnAlias('published', 'state');
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
			$translation->deleteText('taxrate', $pk);
		}

		return $result;
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