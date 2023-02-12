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

use function implode;

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
	 * Insert / update rate changes into database currently only Beyond
	 *
	 * @param  array  $updates  Rate updates to be changed / inserted
	 *
	 * @throws Exception
	 * @since  2.4.0
	 */
	public static function insertUpdateRates(array $updates)
	{
		$db  = KrFactory::getDatabase();
		$sql = [];

		foreach ($updates as $row)
		{
			$sql[] = '( 
							' . (int) $row->id . ',
				            ' . (int) $row->property_id . ',
				            ' . $db->q($row->valid_from) . ',
				            ' . $db->q($row->valid_to) . ',
							' . (float) $row->rate . ',
				            ' . (int) $row->min_nights . ',
				            ' . (int) $row->max_nights . ',
				            ' . (int) $row->min_guests . ',
				            ' . (int) $row->max_guests . ',
				            ' . (int) $row->ignore_pppn . ',
				            ' . (int) $row->start_day . ',
				            ' . $db->q($row->more_guests) . ',
				            ' . (int) $row->state . ',
				            ' . $db->q($row->created_at) . '
				           )';
		}

		try
		{
			$db->transactionStart();

			$query = "INSERT INTO " . $db->qn('#__knowres_rate');
			$query .= " (`id`, `property_id`, `valid_from`, `valid_to`, `rate`,";
			$query .= " `min_nights`, `max_nights`, `min_guests`, `max_guests`,";
			$query .= " `ignore_pppn`, `start_day`, `more_guests`, `state`, `created_at`)";
			$query .= " VALUES " . implode(',', $sql);
			$query .= " ON DUPLICATE KEY UPDATE ";
			$query .= " `valid_from` = VALUES(valid_from), `valid_to` = VALUES(valid_to), `rate` = VALUES(rate),";
			$query .= " `min_nights` = VALUES(min_nights), `max_nights` = VALUES(max_nights),";
			$query .= " `min_guests` = VALUES(min_guests), `max_guests` = VALUES(max_guests),";
			$query .= " `ignore_pppn` = VALUES(ignore_pppn), `start_day` = VALUES(start_day),";
			$query .= " `more_guests` = VALUES(more_guests),";
			$query .= " `updated_at` = VALUES(created_at), `updated_by` = 0";

			$db->setQuery($query);
			$db->execute();
			$db->transactionCommit();
		}
		catch (Exception $e)
		{
			$db->transactionRollback();

			throw new Exception($e);
		}
	}

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
							(int) $item->property_id, 0, null, $item->valid_from, $item->valid_to);
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