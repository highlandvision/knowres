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
use stdClass;

/**
 * Review controller class.
 *
 * @since 1.0.0
 */
class ReviewController extends FormController
{
	/**
	 * Method to cancel an edit and return to dashboard.
	 *
	 * @param   string  $key  The name of the primary key of the URL variable.
	 * @param   null    $urlVar
	 *
	 * @throws Exception
	 * @since  3.0.0
	 */
	public function save($key = null, $urlVar = null): void
	{
		if (parent::save())
		{
			if ($this->getTask() != 'apply')
			{
				$return = KrMethods::getUserState('com_knowres.gobackto');
				if ($return)
				{
					KrMethods::setUserState('com_knowres.gobackto', null);
					KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $return, false));
				}
			}
		}
	}

	/**
	 * Process additional requirements after save review
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @since  3.1
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