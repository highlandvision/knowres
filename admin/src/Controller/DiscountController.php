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
use HighlandVision\Component\Knowres\Administrator\Model\DiscountModel;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Translations;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\String\StringHelper;

/**
 * Discount controller form class.
 *
 * @since 1.0.0
 */
class DiscountController extends FormController
{
	/**
	 * Process additional requirements after save payment
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 * @return void
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		/* @var DiscountModel $model */
		$id   = $model->getItem()->get('id');
		$name = (string) $validData['name'];

		if ($this->input->get('task') == 'save2copy')
		{
			$name = StringHelper::increment($name);
		}

		$Translations = new Translations();
		$Translations->updateDefault('discount', $id, 'name', $name);

		KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateLastMinute',
			(int) $validData['property_id'], 0, 'ru');
		KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates',
			(int) $validData['property_id'], 0, 'vrbo');
	}
}