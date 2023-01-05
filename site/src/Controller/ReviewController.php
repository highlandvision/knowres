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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Joomla\Extend\FormController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use stdClass;

/**
 * Review form controller class
 *
 * @since 1.0.0
 */
class ReviewController extends FormController
{
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

	/**
	 * Process additional requirements after save review
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		if (isset($validData['contract_id']) && $validData['contract_id'])
		{
			$data           = new stdClass();
			$data->id       = $validData['contract_id'];
			$data->reviewed = 1;
			KrFactory::update('contract', $data);
		}
	}
}