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
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Owner Payment form controller class.
 *
 * @since 3.3.1
 */
class OwnerpaymentController extends FormController
{
	/**
	 * Display property calendar
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function modal(): void
	{
		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id)
		{
			Utility::goto('ownerpayments');
		}

		$view = $this->getView('ownerpayment', 'modal');
		$view->display();
	}

	/**
	 * Process additional requirements after save payment
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		if ((int) $validData['contract_id'] && (int) $validData['confirmed'])
		{
			$contract = KrFactory::getAdminModel('contract')->getItem((int) $validData['contract_id']);
			$amount   = Utility::displayValue($validData['amount'], $contract->currency);
			if ($validData['type'] == 'dep')
			{
				$text = KrMethods::sprintf('COM_KNOWRES_OWNERPAYMENTS_NOTE_DEPOSIT', $amount);
			}
			else
			{
				$text = KrMethods::sprintf('COM_KNOWRES_OWNERPAYMENTS_NOTE_BALANCE', $amount);
			}

			if (!empty($validData['note']))
			{
				$text .= '<br>' . $validData['note'];
			}

			KrFactory::getAdminModel('contractnote')::createContractNote($validData['contract_id'], $text);
		}
	}
}