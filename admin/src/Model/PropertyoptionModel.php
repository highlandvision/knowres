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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\AdminModel;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Translations;
use Joomla\CMS\Factory;
use Joomla\CMS\Versioning\VersionableControllerTrait;

/**
 * Knowres  Property option model.
 *
 * @since 1.0.0
 */
class PropertyoptionModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.propertyoption';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PROPERTYOPTION';

	/**
	 * Method to get a knowres record.
	 *
	 * @param  int  $pk  The id of the primary key.
	 *
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$item = parent::getItem($pk);
		if ($item)
		{
			$Translations = new Translations();
			$item->name   = $Translations->getText('propertyoption', $item->id);
		}

		return $item;
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param  object  $record  A record object.
	 *
	 * @since  3.0.0
	 * @return bool  True if allowed to delete the record. Defaults to the permission for the component.
	 */
	protected function canDelete($record): bool
	{
		$userSession = new KrSession\User();
		if ($userSession->getAccessLevel() == 40)
		{
			return true;
		}
		else
		{
			return Factory::getUser()->authorise('core.delete', $this->option);
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
		$data = KrMethods::getUserState('com_knowres.edit.propertyoption.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}
}