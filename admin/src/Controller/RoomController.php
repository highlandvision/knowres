<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Versioning\VersionableControllerTrait;
use Joomla\String\StringHelper;

use function defined;

/**
 * Room controller class.
 *
 * @since 1.0.0
 */
class RoomController extends FormController
{
	use VersionableControllerTrait;

	/**
	 * Process additional requirements after save map marker
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		$id          = $model->getItem()->get('id');
		$name        = (string) $validData['name'];
		$description = (string) $validData['description'];

		if (KrMethods::inputString('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('room', $id, 'name', $name);
		$Translations->updateDefault('room', $id, 'description', $description);
	}
}