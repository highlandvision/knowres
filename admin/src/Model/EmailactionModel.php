<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Models
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection MissingSinceTagDocInspection */

namespace HighlandVision\Component\Knowres\Administrator\Model;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\TickTock;
use stdClass;

/**
 * Knowres email action model.
 *
 * @since 1.0.0
 */
class EmailactionModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.emailaction';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_EMAILACTION';

	/**
	 * Update email actions
	 *
	 * @param   int     $contract_id  ID of contract
	 * @param   string  $trigger      Trigger to be actioned
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public static function updateEmailAction(int $contract_id, string $trigger)
	{
		if ($contract_id && $trigger)
		{
			/* @var ContractModel $contract */
			$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if (isset($contract->id) && $contract->arrival < TickTock::modifyDays('now', 30))
			{
				$data                = new stdClass();
				$data->id            = 0;
				$data->contract_id   = $contract_id;
				$data->email_trigger = $trigger;
				$data->created_at    = TickTock::getTS();
				$data->created_by    = KrMethods::getUser()->id;
				KrFactory::insert('email_action', $data);
			}
		}
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return mixed The data for the form.
	 */
	protected function loadFormData(): mixed
	{
		$data = KrMethods::getUserState('com_knowres.edit.emailaction.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}