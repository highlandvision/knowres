<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Model
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
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Versioning\VersionableControllerTrait;

/**
 * Knowres rate model
 *
 * @since 1.0.0
 */
class RateModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.rate';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_RATE';

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
			$item->more_guests = Utility::decodeJson($item->more_guests);

			$Translations = new Translations();
			$item->name   = $Translations->getText('rate', $item->id);
		}

		return $item;
	}

	/**
	 * Override publish function
	 *
	 * @param  array    &$pks    A list of the primary keys to change.
	 * @param  int       $value  The value of the published state.
	 *
	 * @throws Exception
	 * @since  3.1.0
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
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
							(int) $item->property_id, 0, null, (string)$item->valid_from, (string)$item->valid_to);
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateAvailability',
							(int) $item->property_id, 0, 'vrbo');
					}

					$first = false;
				}

				self::setUpdatedAt($id, 'rate');
			}
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
		$data = KrMethods::getUserState('com_knowres.edit.rate.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Method to validate the form data.
	 *
	 * @param  Form    $form   The form to validate against.
	 * @param  array   $data   The data to validate.
	 * @param  string  $group  The name of the field group to validate.
	 *
	 * @throws Exception
	 * @since  1.6
	 * @return bool|array
	 */
	public function validate($form, $data, $group = null): bool|array
	{
		$more_guests         = KrMethods::inputArray('more_guests');
		$data['more_guests'] = Utility::encodeJson($more_guests);

		return parent::validate($form, $data, $group);
	}
}