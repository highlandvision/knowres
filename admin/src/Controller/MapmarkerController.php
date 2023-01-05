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
use HighlandVision\Component\Knowres\Administrator\Model\MapmarkerModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use Joomla\String\StringHelper;

use function jexit;

/**
 * Map marker controller form class.
 *
 * @since 1.0.0
 */
class MapmarkerController extends FormController
{
	/**
	 * Return map marker combo
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	#[NoReturn] public function combo()
	{
		$model  = new MapmarkerModel();
		$form   = $model->getForm([], false);
		$target = KrMethods::inputString('target');

		$wrapper         = [];
		$wrapper['html'] = $form->getInput($target);

		echo new JsonResponse($wrapper);
		jexit();
	}

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
		/** @var MapmarkerModel $model */
		$id          = $model->getItem()->get('id');
		$name        = (string) $validData['name'];
		$description = (string) $validData['description'];

		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('mapmarker', $id, 'name', $name);
		$Translations->updateDefault('mapmarker', $id, 'description', $description);

		KrMethods::cleanCache('com_knowres_map');
	}
}