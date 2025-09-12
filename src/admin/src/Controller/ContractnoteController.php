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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Utility;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Contract note controller form class.
 *
 * @since 1.0.0
 */
class ContractnoteController extends FormController
{
	/**
	 * Method to cancel an edit.
	 *
	 * @param   null  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function cancel($key = null): bool
	{
		if (parent::cancel($key))
		{
			$gobackto = Utility::getGoBackTo();
			if ($gobackto)
			{
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $gobackto, false));
			}

			return true;
		}

		return false;
	}

	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		if ($this->getTask() == 'save')
		{
			$contract_id = KrMethods::getUserState('com_knowres.current.contract_id', 0);
			if (!$contract_id)
			{
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&view=' . $this->view_list
					. $this->getRedirectToListAppend(),
					false));
			}
			else
			{
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&task=contract.show&id='
					. $contract_id,
					false));
			}
		}
	}
}