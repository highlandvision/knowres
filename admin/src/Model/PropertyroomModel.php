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
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

/**
 * Knowres property room model.
 *
 * @since 1.0.0
 */
class PropertyroomModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.propertyroom';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PROPERTYROOM';

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @throws RuntimeException
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$item->features = Utility::decodeJson($item->features, true);

			$Translations      = new Translations();
			$item->name        = $Translations->getText('propertyroom', $item->id);
			$item->description = $Translations->getText('propertyroom', $item->id, 'description');
		}

		return $item;
	}

	/**
	 * Override publish function
	 *
	 * @param  array   &$pks    A list of the primary keys to change.
	 * @param  int      $value  The value of the published state.
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return bool
	 */
	public function publish(&$pks, $value = 1): bool
	{
		$first = true;
		if (parent::publish($pks, $value))
		{
			foreach ($pks as $id)
			{
				if ($first)
				{
					$item = parent::getItem($id);
					if ($item)
					{
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty',
							$item->property_id, 0, 'ru');
					}

					$first = false;
				}

				self::setUpdatedAt($id, 'property_room');
			}

			return true;
		}

		return false;
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
		$data = KrMethods::getUserState('com_knowres.edit.propertyroom.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}