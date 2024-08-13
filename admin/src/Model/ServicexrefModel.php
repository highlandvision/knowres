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
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use Joomla\CMS\Factory;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;
use stdClass;

/**
 * Knowres service xref model.
 *
 * @since 1.0.0
 */
class ServicexrefModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.servicexref';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_SERVICEXREF';

	/**
	 * Insert new service xref
	 *
	 * @param  int     $service_id   ID of service
	 * @param  string  $table_name   Field to update guest, owner
	 * @param  int     $table_id     ID of guest or owner
	 * @param  string  $foreign_key  Foreign key from channel
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	public static function insertServiceXref(int $service_id, string $table_name, int $table_id, string $foreign_key): void
	{
		if (empty($service_id) || empty($table_name) || empty($table_id) || empty($foreign_key))
		{
			throw new RuntimeException('Invalid params passed to insertServiceXref');
		}

		$valid_table_name = [
			'extra',
			'guest',
			'owner',
			'payment'
		];
		if (!in_array($table_name, $valid_table_name))
		{
			throw new RuntimeException('Invalid params passed to insertServiceXref');
		}

		$servicexref              = new stdClass();
		$servicexref->id          = 0;
		$servicexref->service_id  = $service_id;
		$servicexref->table_name  = $table_name;
		$servicexref->table_id    = $table_id;
		$servicexref->foreign_key = $foreign_key;
		$servicexref->state       = 1;
		$servicexref->created_at  = TickTock::getTS();
		KrFactory::insert('service_xref', $servicexref);
	}

	/**
	 * Reset new flag otherwise property will not update (Only for VRBO)
	 *
	 * @param  int  $id           ID of service xref
	 * @param  int  $service_id   ID of service
	 * @param  int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function resetNewServiceProperty(int $id, int $service_id, int $property_id): void
	{
		$service = KrFactory::getAdminModel('service')->getItem($service_id);
		if ($service->id && $service->plugin === 'vrbo') {
			$update              = new stdClass();
			$update->id          = $id;
			$update->foreign_key = $property_id;
			$update->new         = 0;
			$update->updated_at  = TickTock::getTS();
			KrFactory::update('service_xref', $update);
		}
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since   3.0.0
	 * @return  bool  True if allowed to delete the record. Defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();

		return $userSession->getAccessLevel() == 40 || Factory::getUser()->authorise('core.delete', $this->option);
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
		$data = KrMethods::getUserState('com_knowres.edit.servicexref.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table object
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareTable($table): void
	{
		if (empty($table->id))
		{
			if ($table->property_id && $table->foreign_key == '0')
			{
				$table->new = 1;
			}
		}

		parent::prepareTable($table);
	}
}