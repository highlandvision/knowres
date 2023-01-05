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
use HighlandVision\Component\Knowres\Administrator\Model\OwnerModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;

use function jexit;

/**
 * Controller form class for owner
 *
 * @since 1.0.0
 */
class OwnerController extends FormController
{
	/**
	 * Method to cancel an edit.
	 *
	 * @param   null  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function cancel($key = null): bool
	{
		if (parent::cancel($key))
		{
			$gobackto = Utility::getGoBackTo();
			if ($gobackto)
			{
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $gobackto, false));
			}

			return true;
		}

		return false;
	}

	/**
	 * Return owners combo
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function combo()
	{
		$model  = new OwnerModel();
		$form   = $model->getForm([], false);
		$target = KrMethods::inputString('target');

		$wrapper         = [];
		$wrapper['html'] = $form->getInput($target);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Function that allows child controller access to model data after the data has been saved.
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		$gobackto = Utility::getGoBackTo();
		if ($gobackto)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $gobackto, false));
		}
	}
}