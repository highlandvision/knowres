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
 * Contract Table class
 *
 * @since 1.0.0
 */
class ContractTable extends Table
{
	/** @var array An array of key names to be json encoded in the bind function */
	protected $_jsonEncode
		= [
			'adjustments',
			'child_ages',
			'discounts',
			'extras',
			'guest_types',
			'nightly',
			'rooms',
			'taxes'
		];

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
		$this->typeAlias = 'com_knowres.contract';
		parent::__construct('#__knowres_contract', 'id', $db);

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

	/**
	 * Overridden Table::store to set created/modified and user id.
	 *
	 * @param   boolean  $updateNulls  True to update fields even if they are null.
	 *
	 * @since   1.6
	 * @return  bool  True on success.
	 */
	public function store($updateNulls = true): bool
	{
		return parent::store(true);
	}
}