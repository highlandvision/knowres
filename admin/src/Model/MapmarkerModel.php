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
use HighlandVision\KR\Logger;
use HighlandVision\KR\Media\Images\MapMarkers;
use HighlandVision\KR\Translations;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use RuntimeException;

/**
 * Knowres Map Marker model.
 *
 * @since 1.0.0
 */
class MapmarkerModel extends AdminModel
{
	use VersionableControllerTrait;

	/**  @var string The type alias. */
	public $typeAlias = 'com_knowres.mapmarker';
	/** @var mixed Batch copy/move command. If set to false, the batch copy/move command is not supported. */
	protected $batch_copymove = false;
	/**  @var ?string The prefix to use with controller messages. */
	protected $text_prefix = 'COM_KNOWRES_MAPMARKER';

	/**
	 * Method to get a map marker record.
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
			$Translations      = new Translations();
			$item->name        = $Translations->getText('mapmarker', $item->id);
			$item->description = $Translations->getText('mapmarker', $item->id, 'description');
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
		$data = KrMethods::getUserState('com_knowres.edit.mapmarker.data', []);
		if (empty($data))
		{
			$data = $this->getItem();
		}

		return $data;
	}

	/**
	 * Upload map marker image
	 *
	 * @throws    Exception
	 * @since    3.2.0
	 */
	protected function saveImage(int $id, array $files)
	{
		$name     = $files['name'];
		$tmp_name = $files['tmp_name'];
		$error    = $files['error'];

		if (!$name)
		{
			Logger::logMe('Image was not received');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');

			return;
		}

		$MapMarkers = new MapMarkers($id);
		try
		{
			$MapMarkers->validate($name, $tmp_name, $error);
			$MapMarkers->process();
		}
		catch (RuntimeException $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN_CHECK'), 'error');

			return;
		}

		KrMethods::message(KrMethods::plain('COM_KNOWRES_UPLOAD_SUCCESS'));
		KrMethods::cleanCache('com_knowres_map');
	}

	/**
	 * Method to save the form data.
	 *
	 * @param  array  $data  The form data.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool  True on success.
	 */
	public function save($data): bool
	{
		if (parent::save($data))
		{
			$files = KrMethods::inputFiles('jform');
			if (!empty($files['marker_image']['name']))
			{
				$id = $this->getState('mapmarker.id');
				$this->saveImage($id, $files['marker_image']);
			}

			return true;
		}

		return false;
	}
}