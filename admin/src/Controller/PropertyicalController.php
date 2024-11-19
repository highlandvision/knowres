<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\IcalBlock;
use HighlandVision\KR\Joomla\Extend\FormController;

use HighlandVision\KR\Utility;

use function print_r;

/**
 * Property ical controller form class
 *
 * @since 5.1.0
 */
class PropertyicalController extends FormController
{
	/**
	 * Import manually uploaded ics.
	 *
	 * @throws Exception
	 * @since 5.1.0
	 */
	public function import(): void
	{
		$this->checkToken();

		$property_id = KrMethods::inputInt('property_id');
		echo print_r($_FILES, true);

		$filename    = $_FILES['jform']['name']['files']['file'];
		$filetype    = $_FILES['jform']['type']['files']['file'];
		$tmp_name    = $_FILES['jform']['tmp_name']['files']['file'];

		$redirect = KrMethods::route('index.php?option=com_knowres&view=propertyicals&property_id=' . $property_id,
			false);

		if (!$tmp_name || !$property_id || $filetype != 'text/calendar') {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_PROPERTYICALS_FORM_ERROR_FILE'), 'error');
			KrMethods::redirect($redirect);
		}

		$directory = Utility::getPath('root') . '/tmp/';
		if (!move_uploaded_file($tmp_name, $directory . $filename)) {
			KrMethods::message($tmp_name . ' to ' . $dest_path . ' '
			                   . KrMethods::plain('Error Moving File To Directory'),
				'error');
			KrMethods::redirect($redirect);
		}

		try {
			$IcalBlock = new IcalBlock($property_id, $directory, $filename);
			$IcalBlock->import();
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		} catch (Exception $e) {
			DisplayModel::pageErrors($e);
		}

		if (file_exists($directory . $filename)) {
			unlink($directory . $filename);
		}

		KrMethods::redirect($redirect);
	}
}