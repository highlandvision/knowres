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
use HighlandVision\Component\Knowres\Administrator\Model\BedtypeModel;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Bedtype controller class.
 *
 * @since 2.2.0
 */
class BedtypeController extends FormController
{
	/**
	 * Process additional requirements after save
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		/* @var BedtypeModel $model */
		$id = $model->getItem()->get('id');

		$name = (string) $validData['name'];
		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('bedtype', $id, 'name', $name);
	}
}