<?php
/**
 * @package     KR
 * @subpackage  Admin Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Administrator\Model\TaxModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use Joomla\String\StringHelper;

use function jexit;

/**
 * Tax controller class
 *
 * @since 2.5.0
 */
class TaxController extends FormController
{
	/**
	 * Return regions combo
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function combo(): void
	{
		$model     = new TaxModel();
		$form      = $model->getForm([], false);
		$parent_id = KrMethods::inputInt('parent');
		$target    = KrMethods::inputString('target');

		if ($target == 'region_id') {
			$form->setValue('country_id', null, $parent_id);
		}
		else {
			$form->setValue('region_id', null, $parent_id);
		}

		$wrapper         = [];
		$wrapper['html'] = $form->getInput($target);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Function that allows child controller access to model data after the data has been saved.
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/** @var TaxModel $model */
		$id   = $model->getItem()->get('id');
		$name = (string) $validData['name'];
		if ($this->input->get('task') == 'save2copy') {
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('tax', $id, 'name', $name);
	}
}