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
use HighlandVision\Component\Knowres\Administrator\Model\ExtraModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Extra controller form class
 *
 * @since 1.0.0
 */
class ExtraController extends FormController
{
	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		/* @var ExtraModel $model */
		$id          = $model->getItem()->get('id');
		$name        = (string) $validData['name'];
		$description = (string) $validData['description'];

		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('extra', $id, 'name', $name);
		$Translations->updateDefault('extra', $id, 'description', $description);

		if ($validData['cleaning'])
		{
			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', (int) $validData['property_id'], 0, 'ru');
			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates', (int) $validData['property_id'], 0, 'vrbo');
		}
	}
}