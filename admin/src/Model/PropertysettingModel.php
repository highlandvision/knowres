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
use HighlandVision\KR\Service\Beyond;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;
use stdClass;

use function count;
use function implode;
use function is_countable;

/**
 * Knowres Property settings model.
 *
 * @since 1.0.0
 */
class PropertysettingModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.propertysetting';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_PROPERTYSETTING';

	/**
	 * Update akey setting for service
	 *
	 * @param  string  $akey         Name of setting
	 * @param  int     $property_id  ID of property or 0 for all
	 * @param  string  $plugin       Value of setting
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 */
	public static function updateSetting(string $akey, int $property_id, string $plugin = 'vrbo')
	{
		if (!$akey)
		{
			return;
		}

		$values = KrFactory::getListModel('propertysettings')->getOneSetting($akey);
		if (!isset($values[$property_id]))
		{
			$setting              = new stdClass();
			$setting->id          = 0;
			$setting->akey        = $akey;
			$setting->value       = $plugin;
			$setting->property_id = $property_id;
			$setting->created_at  = TickTock::getTS();
			$setting->created_by  = (int) KrMethods::getUser()->id;
			$setting->updated_at  = TickTock::getTS();
			$setting->updated_by  = 0;

			KrFactory::insert('property_setting', $setting);
		}
		else
		{
			$db    = KrFactory::getDatabase();
			$query = $db->getQuery(true);

			$fields     = [
				$db->qn('updated_at') . '=' . $db->q(TickTock::getTS()),
				$db->qn('updated_by') . '=' . (int) KrMethods::getUser()->id
			];
			$conditions = [
				$db->qn('akey') . '=' . $db->q($akey),
				$db->qn('value') . '=' . $db->q($plugin),
				$db->qn('property_id') . '=' . $property_id
			];

			$query->update($db->qn('#__knowres_property_setting'))->set($fields)->where($conditions);
			$db->setQuery($query);
			$db->execute();
		}
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return false|object  Object on success, false on failure.
	 */
	public function getItem($pk = null): false|object
	{
		$data = KrMethods::getUserState('com_knowres.edit.propertysetting.data', []);
		if (empty($data))
		{
			$data = parent::getItem();
		}

		return $data;
	}

	/**
	 * Save settings
	 *
	 * @param  int  $property_id  ID of property or 0 for global
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function saveSettings(int $property_id)
	{
		$old_settings    = KrMethods::inputString('old_settings', 'null');
		$old_setting_ids = KrMethods::inputString('old_setting_ids', 'null');
		$postArray       = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
		$oldSettings     = Utility::decodeJson($old_settings, true);
		$oldSettingIds   = Utility::decodeJson($old_setting_ids, true);

		$settings = [];
		foreach ($postArray as $akey => $value)
		{
			if (array_key_exists($akey, $oldSettings) && $oldSettings[$akey] != $value)
			{
				$settings[$akey] = [
					$value,
					$oldSettingIds[$akey]
				];
			}
		}

		$this->updateSettings($settings, $property_id);
	}

	/**
	 * Save the property settings to the database.
	 *
	 * @param  array  $settings     Changed settings
	 * @param  int    $property_id  ID of specific property or 0 for all
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function updateSettings(array $settings, int $property_id)
	{
		$rates_update   = false;
		$deposit_update = false;
		$bp_update      = false;

		if (is_countable($settings) && count($settings))
		{
			$db      = $this->getDatabase();
			$columns = [
				'id', 'property_id', 'akey', 'value', 'created_at', 'created_by'
			];

			$rows    = [];
			$user_id = KrMethods::getUser()->get('id');

			foreach ($settings as $akey => $value)
			{
				if (!$rates_update && !str_contains($akey, 'requiredfields'))
				{
					$rates_update = true;
				}

				if (!$deposit_update && str_contains($akey, 'deposit'))
				{
					$deposit_update = true;
				}

				if (!$bp_update && ($akey == 'min_price' || $akey == 'base_price') && $value > 0)
				{
					$bp_update = true;
				}

				$row = [
					!$property_id || $value[1] ? (int) $value[1] : 0,
					$property_id,
					$db->q($akey),
					$db->q($value[0]),
					$db->q(TickTock::getTS()),
					(int) $user_id
				];

				$rows[] = $row;
			}

			if (count($rows))
			{
				foreach ($rows as &$row)
				{
					$row = implode(', ', $row);
				}

				try
				{
					$db->transactionStart();

					$query = $db->getQuery(true);
					$query->insert($db->qn('#__knowres_property_setting'))
					      ->columns($db->qn($columns))->values($rows);
					$query .= ' ON DUPLICATE KEY UPDATE ';
					$query .= $db->qn('value') . ' = VALUES(value), ';
					$query .= $db->qn('updated_at') . ' = VALUES(created_at), ';
					$query .= $db->qn('updated_by') . ' = VALUES(created_by)';

					$db->setQuery($query);
					$db->execute();

					if ($rates_update)
					{
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
							$property_id);
					}

					if ($bp_update && $property_id)
					{
						Beyond::settingRateUpdate($property_id);
					}

					if ($deposit_update)
					{
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', $property_id, 0,
							'ru');
						KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
							$property_id, 0, 'vrbo');
					}

					$db->transactionCommit();

					KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
				}
				catch (Exception $e)
				{
					$db->transactionRollback();

					throw new $e;
				}
			}
		}
	}
}