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
use Joomla\Database\DatabaseDriver;

/**
 * Knowres Property ical Table
 *
 * @since    1.0.0
 */
class IcalblockTable extends Table
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
		$this->typeAlias = 'com_knowres.icalblock';
		parent::__construct('#__knowres_ical_block', 'id', $db);

		$this->setColumnAlias('published', 'state');
	}
}