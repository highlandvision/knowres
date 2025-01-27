<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\Component\Knowres\Site\Model\GuestModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;

use function jexit;

/**
 * Guest(form) controller class
 *
 * @since 2.5.0
 */
class GuestController extends FormController
{
	/**
	 * Return regions combo
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function combo(): void
	{
		$model     = new GuestModel();
		$form      = $model->getForm([], false);
		$parent_id = KrMethods::inputInt('parent');
		$target    = KrMethods::inputString('target');

		if ($target == 'region_id')
		{
			$form->setValue('country_id', null, $parent_id);
		}
		else if ($target == 'b_region_id')
		{
			$form->setValue('b_country_id', null, $parent_id);
		}
		else if ($target == 'town_id')
		{
			$form->setValue('region_id', null, $parent_id);
		}
		else if ($target == 'b_town_id')
		{
			$form->setValue('b_region_id', null, $parent_id);
		}

		$wrapper         = [];
		$wrapper['html'] = $form->getInput($target);

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Proxy for getModel
	 * Includes the admin model to save repetition and not a site model
	 *
	 * @param  string  $name        Name of model
	 * @param  string  $prefix      Prefix Admin or Site
	 * @param  array   $config      Config options
	 *
	 * @since  2.5.0
	 * @return BaseDatabaseModel
	 */
	public function getModel($name = 'guest', $prefix = 'Site',
		$config = ['ignore_request' => true]): BaseDatabaseModel
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Method to save a record.
	 *
	 * @param  string  $key     The name of the primary key of the URL variable.
	 * @param  string  $urlVar  The name of the URL variable if different from the primary key. Sometimes required
	 *                          to avoid router collisions.
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function save($key = null, $urlVar = null): bool
	{
		$this->checkToken();

		if (parent::save($key, $urlVar))
		{
			$userSession = new KrSession\User();
			$userData    = $userSession->getData();
			if ($userData->db_guest_update)
			{
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ITEM_UPDATED_SUCCESSFULLY'));
				SiteHelper::redirectDashboard();
			}
			else
			{
				$Itemid = SiteHelper::getItemId('com_knowres', 'paymentform');
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=paymentform&Itemid=' . $Itemid,
					false));
			}

			return true;
		}

		return false;
	}

	/**
	 * Method to check if you can save a new or existing record.
	 * Override - All edit checks have been done so just return true
	 *
	 * @param  array   $data  An array of input data.
	 * @param  string  $key   The name of the key for the primary key.
	 *
	 * @since  1.0.0
	 * @return bool
	 */
	protected function allowSave($data, $key = 'id'): bool
	{
		return true;
	}
}