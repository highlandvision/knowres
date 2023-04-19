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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Contractguestdata(form) controller class
 *
 * @since 2.5.0
 */
class ContractguestdataController extends FormController
{
	/**
	 * Proxy for getModel
	 * Includes the admin model to save repetition and not a site model
	 *
	 * @param  string  $name
	 * @param  string  $prefix
	 * @param  array   $config
	 *
	 * @since  2.5.0
	 * @return BaseDatabaseModel
	 */
	public function getModel($name = 'contractguestdata', $prefix = 'Site',
		$config = ['ignore_request' => true]): BaseDatabaseModel {
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Method to save a record.
	 *
	 * @param ?string  $key     The name of the primary key of the URL variable.
	 * @param ?string  $urlVar  The name of the URL variable if different from the primary key (sometimes required to avoid router collisions).
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function save($key = null, $urlVar = null): bool
	{
		$this->checkToken();

		if (parent::save($key, $urlVar))
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ITEM_UPDATED_SUCCESSFULLY'));
			SiteHelper::redirectDashboard();

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