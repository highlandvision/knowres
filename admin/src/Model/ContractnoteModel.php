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
use HighlandVision\KR\Utility;
use stdClass;

use function explode;
use function implode;
use function is_array;

/**
 * Knowres contract note model.
 *
 * @since 1.0.0
 */
class ContractnoteModel extends AdminModel
{
	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.contractnote';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_CONTRACTNOTE';

	/**
	 * Generate text for contract note types.
	 *
	 * @param  mixed  $note_type  Contract note types
	 *
	 * @since  2.5.0
	 * @return string
	 */
	public static function contractNoteTypes(mixed $note_type): string
	{
		if (!is_array($note_type))
		{
			$note_type = Utility::decodeJson($note_type, true);
		}

		$text = [];
		foreach ($note_type as $n)
		{
			if ((int) $n == 0)
			{
				$text[] = KrMethods::plain('COM_KNOWRES_STAFF');
			}
			else if ((int) $n == 1)
			{
				$text[] = KrMethods::plain('COM_KNOWRES_GUEST');
			}
			else if ((int) $n == 2)
			{
				$text[] = KrMethods::plain('COM_KNOWRES_OWNER');
			}
			else if ((int) $n == 3)
			{
				$text[] = KrMethods::plain('COM_KNOWRES_SYSTEM');
			}
		}

		return implode(',', $text);
	}

	/**
	 * Create a contract note for system / staff processes
	 *
	 * @param  int     $contract_id  ID of contract
	 * @param  string  $text         Note text
	 * @param  string  $note_type    Csv string with values 0,1,2 or 3
	 * @param  bool    $created_by   Set created by to user value
	 *
	 * @throws Exception
	 * @since  2.3.0
	 */
	public static function createContractNote(int $contract_id, string $text, string $note_type = '3',
		bool $created_by = true): void
	{
		if ($contract_id && $text)
		{
			$new              = new stdClass();
			$new->id          = 0;
			$new->contract_id = $contract_id;
			$new->note        = $text;
			$new->note_type   = Utility::encodeJson(explode(',', $note_type));
			$new->created_at  = TickTock::getTS();
			if ($created_by)
			{
				$new->created_by = KrMethods::getUser()->id;
			}

			KrFactory::insert('contract_note', $new);
		}
	}

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->note_type = Utility::decodeJson($item->note_type, true);
		}

		return $item;
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
		$data = KrMethods::getUserState('com_knowres.edit.contractnote.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param $table
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareTable($table): void
	{
		if (!isset($table->note_type))
		{
			$table->note_type = '';
		}

		parent::prepareTable($table);
	}
}