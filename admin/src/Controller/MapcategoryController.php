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
use HighlandVision\Component\Knowres\Administrator\Model\MapcategoryModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Map category controller form class.
 *
 * @since 1.0.0
 */
class MapcategoryController extends FormController
{
	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 * @return void
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/** @var MapcategoryModel $model */
		$id   = $model->getItem()->get('id');
		$name = (string) $validData['name'];

		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('mapcategory', $id, 'name', $name);

		KrMethods::cleanCache('com_knowres_map');
	}
}