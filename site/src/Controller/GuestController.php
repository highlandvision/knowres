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

use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Guest(form) controller class
 *
 * @since 2.5.0
 */
class GuestController extends FormController
{

	/**
	 * Proxy for getModel
	 * Includes the admin model to save repetition and not a site model
	 *
	 * @param   string  $name
	 * @param   string  $prefix
	 * @param   array   $config
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
	 * Method to check if you can save a new or existing record.
	 * Override - All edit checks have been done so just return true
	 *
	 * @param   array   $data  An array of input data.
	 * @param   string  $key   The name of the key for the primary key.
	 *
	 * @since  1.0.0
	 * @return bool
	 */
	protected function allowSave($data, $key = 'id'): bool
	{
		return true;
	}
}