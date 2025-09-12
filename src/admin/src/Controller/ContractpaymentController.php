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
use HighlandVision\KR\Email\ContractEmail;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Utility;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use stdClass;

/**
 * Payment controller form class.
 *
 * @since 1.0.0
 */
class ContractpaymentController extends FormController
{
	/**
	 * Method to cancel an edit.
	 *
	 * @param  null  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool
	 */
	public function cancel($key = null): bool
	{
		if (parent::cancel($key)) {
			$gobackto = Utility::getGoBackTo();
			if ($gobackto) {
				KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $gobackto, false));
			}

			return true;
		}

		return false;
	}

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
		$contract           = KrFactory::getAdminModel('contract')->getItem($validData['contract_id']);
		$old_booking_status = (int) $contract->booking_status;

		if ($old_booking_status !== (int) $validData['booking_status']) {
			$update                 = new stdClass();
			$update->id             = $validData['contract_id'];
			$update->booking_status = $validData['booking_status'];
			KrFactory::update('contract', $update);
		}

		if ((int) $validData['booking_status'] > 1 && (int) $validData['confirmed'] && !(int) $validData['refund']) {
			if ($old_booking_status < 10 && (int) $validData['booking_status'] > 9) {
				$email = new ContractEmail('BOOKCONFIRM');
			} else {
				$email = new ContractEmail('PAYRECEIPT');
			}

			$email->sendTheEmails($validData['contract_id'], $validData['amount'], $validData['currency']);
		}

		if ($this->getTask() === 'save') {
			$contract_id = $validData['contract_id'];
			if (!$contract_id) {
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&view=' . $this->view_list,
				                                     false));
			} else {
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&task=contract.show&id='
				                                     . $contract_id,
				                                     false));
			}
		}
	}
}