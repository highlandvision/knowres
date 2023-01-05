<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
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
 * Knowres Property field Table
 *
 * @since    1.0.0
 */
class PropertyfieldTable extends Table implements VersionableTableInterface
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
		$this->typeAlias = 'com_knowres.propertyfield';
		parent::__construct('#__knowres_property_field', 'id', $db);

		$this->setColumnAlias('published', 'state');
	}

	/**
	 * Method to delete a row from the database table by primary key value.
	 *
	 * @param   mixed  $pk  ID to delete
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return bool
	 */
	public function delete($pk = null): bool
	{
		$this->load($pk);
		$result = parent::delete($pk);

		if ($result)
		{
			$Translations = new Translations();
			$Translations->deleteText('propertyfield', $pk);
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