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
use HighlandVision\KR\Utility;
use Joomla\CMS\Table\Table;
use Joomla\CMS\Versioning\VersionableModelTrait;
use RuntimeException;

/**
 * Knowres Manager model
 *
 * @since 1.0.0
 */
class ManagerModel extends AdminModel
{
	use VersionableModelTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.manager';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_MANAGER';

	/**
	 * Method to get a manager row.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return object|false  Object on success, false on failure.
	 */
	public function getItem($pk = null): object|false
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->properties = Utility::decodeJson($item->properties, true);
			$user             = KrMethods::getUser($item->user_id);
			$item->email      = $user->email;
			$item->name       = $user->name;
			if (!empty($item->agency_id))
			{
				$agency                 = KrFactory::getAdminModel('agency')->getItem($item->agency_id);
				$item->agency_email     = !empty($agency->email) ? $agency->email : KrMethods::getCfg('mailfrom');
				$item->agency_name      = !empty($agency->name) ? $agency->name : $item->agency_id;
				$item->agency_telephone = !empty($agency->telephone) ? $agency->telephone : '';
			}
		}

		return $item;
	}

	/**
	 * Get KR access level for user
	 *
	 * @param  int  $user_id  ID of user
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return mixed
	 */
	public function getManagerbyUserId(int $user_id): mixed
	{
		$db    = KrFactory::getDatabase();
		$query = $db->getQuery(true);

		$query->select($db->qn([
			'id',
			'access_level',
			'properties',
			'agency_id'
		]));

		$query->from($db->qn('#__knowres_manager'))
		      ->where($db->qn('user_id') . '=' . $user_id)
		      ->setLimit(1);

		$db->setQuery($query);

		return $db->loadObject();
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
		$data = KrMethods::getUserState('com_knowres.edit.manager.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param  Table  $table  Table instance.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function prepareTable($table)
	{
		if ($table->access_level >= 30)
		{
			$table->properties = '';
		}

		parent::prepareTable($table);
	}
}