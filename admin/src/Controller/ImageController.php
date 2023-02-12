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
use HighlandVision\Component\Knowres\Administrator\Model\ImageModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Image controller form class.
 *
 * @since 1.0.0
 */
class ImageController extends FormController
{
	/**
	 * Process additional requirements after save image
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		/** @var ImageModel $model */
		$id = $model->getItem()->get('id');

		$description = (string) $validData['description'];
		$alt_text    = (string) $validData['alt_text'];

		if ($this->input->get('task') == 'save2copy')
		{
			$description = StringHelper::increment($description);
		}

		$translation = new Translations();
		$translation->updateDefault('image', $id, 'description', $description);
		$translation->updateDefault('image', $id, 'alt_text', $alt_text);

		KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateProperty', (int) $validData['property_id'],
			0, 'ru');
	}
}