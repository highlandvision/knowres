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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Service cross-reference controller class.
 *
 * @since 1.0.0
 */
class ServicexrefController extends FormController
{
	/**
	 * Method to cancel an edit and return to dashboard.
	 *
	 * @param  string  $key  The name of the primary key of the URL variable.
	 * @param  null    $urlVar
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function save($key = null, $urlVar = null)
	{
		if (parent::save())
		{
			$return = KrMethods::getUserState('com_knowres.gobackto');
			if ($return)
			{
				KrMethods::setUserState('com_knowres.gobackto', null);
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $return, false));
			}
		}
	}

	/**
	 * Process additional requirements after save
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		if ((int) $validData['foreign_key'] == 0 && (int) $validData['property_id'] > 0)
		{
			$model::resetNewServiceProperty($model->getItem()->get('id'), (int) $validData['service_id'],
				(int) $validData['property_id']);
			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty',
				(int) $validData['property_id'], 0, 'ru');
		}

		if (isset($validData['sell']))
		{
			if (KrMethods::inputInt('old_sell') <> $validData['sell'])
			{
				KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty',
					(int) $validData['property_id'], 0, 'ru');
			}
		}
	}
}