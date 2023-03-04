<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Table\Table;
use RuntimeException;

/**
 * Knowres owner payment model.
 *
 * @since 3.3.1
 */
class OwnerpaymentModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.ownerpayment';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_OWNERPAYMENT';

	/**
	 * Return the ownerpayment row.
	 *
	 * @param  integer  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		/** @var OwnerpaymentModel $model */
		$item = parent::getItem($pk);
		if ($item)
		{
			$contract       = KrFactory::getAdminModel('contract')->getItem($item->contract_id);
			$item->currency = $contract->currency;
		}

		return $item;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  3.3.1
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.ownerpayment.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table instance
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function prepareTable($table)
	{
		if ($table->confirmed && !$table->confirmed_by)
		{
			$table->confirmed_at = TickTock::getTs();
			$table->confirmed_by = KrMethods::getUser()->id;
		}

		parent::prepareTable($table);
	}
}