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

use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableTableInterface;
use Joomla\Database\DatabaseDriver;

/**
 * Guest Table class
 *
 * @since 1.0.0
 */
class GuestTable extends Table implements VersionableTableInterface
{
	/** @var array An array of key names to be json encoded in the bind function */
	protected $_jsonEncode = ['telephone'];
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
		$this->typeAlias = 'com_knowres.guest';
		parent::__construct('#__knowres_guest', 'id', $db);

		$this->setColumnAlias('published', 'state');
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