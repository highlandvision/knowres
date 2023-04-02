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
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableTableInterface;
use Joomla\Database\DatabaseDriver;
use RuntimeException;
use UnexpectedValueException;

/**
 * Region Table class
 *
 * @since 1.0.0
 */
class RegionTable extends Table implements VersionableTableInterface
{
	/** $var bool Indicates that columns fully support the NULL value in the database */
	protected $_supportNullValue = true;

	/**
	 * Constructor
	 *
	 * @param   DatabaseDriver  $db  DB connector
	 *
	 * @since  1.0.0
	 */
	public function __construct(DatabaseDriver $db)
	{
		$this->typeAlias = 'com_knowres.region';
		parent::__construct('#__knowres_region', 'id', $db);

		$this->setColumnAlias('published', 'state');
	}

	/**
	 * Method to delete a row from the database table by primary key value.
	 *
	 * @param   mixed  $pk  An optional primary key value to delete.  If not set the instance property value is used.
	 *
	 * @throws RuntimeException
	 * @throws UnexpectedValueException
	 * @since  1.0.0
	 * @return bool  True on success.
	 */
	public function delete($pk = null): bool
	{
		$result = parent::delete($pk);
		if ($result)
		{
			$translation = new Translations();
			$translation->deleteText('region', $pk);
		}

		return $result;
	}

	/**
	 * Get the type alias for the history table
	 *
	 * @since 4.0.0
	 * @return  string  The alias as described above
	 */
	public function getTypeAlias(): string
	{
		return $this->typeAlias;
	}
}
