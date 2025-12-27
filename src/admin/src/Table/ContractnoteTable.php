<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Table;

use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * Table Contract Note
 *
 * @since 1.0.0
 */
class ContractnoteTable extends Table
{
    /** @var array An array of key names to be json encoded in the bind function */
    protected $_jsonEncode = ['note_type'];

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
        $this->typeAlias = 'com_knowres.contractnote';
        parent::__construct('#__knowres_contract_note', 'id', $db);

        $this->setColumnAlias('published', 'state');
    }

    /**
     * Get the type alias for the history table
     *
     * @return  string  The alias as described above
     * @since   4.0.0
     */
    public function getTypeAlias(): string
    {
        return $this->typeAlias;
    }
}