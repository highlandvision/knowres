<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Media\Pdf\Contract\GuestData;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;
use Joomla\CMS\Session\Session;

use function jexit;

/**
 * Contract Guest Data controller form class.
 *
 * @since 1.0.0
 */
class ContractguestdataController extends FormController
{
	/**
	 * Method to cancel an edit.
	 *
	 * @param   string  $key  The name of the primary key of the URL variable.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return bool  True if access level checks pass, false otherwise.
	 */
	public function cancel($key = null): bool
	{
		if (parent::cancel())
		{
			$gobackto = KrMethods::getUserState('com_knowres.gobackto');
			if (!empty($gobackto))
			{
				KrMethods::setUserState('com_knowres.gobackto', null);

				$link = KrMethods::route('index.php?option=com_knowres&' . $gobackto, false);
				KrMethods::redirect($link);
			}
		}

		return false;
	}

	/**
	 * Check in from show contract page.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function checkin(): void
	{
		Session::checkToken() or jexit(KrMethods::plain('JINVALID_TOKEN'));

		$guestdata_id = $this->input->post->getInt('guestdata_id', 0);
		if ($guestdata_id)
		{
			/** @var $model ContractguestdataModel */
			$model = $this->getModel();
			$model->checkin($guestdata_id);
		}

		echo new JsonResponse();
		jexit();
	}

	/**
	 * Format and download the pdf
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function pdf()
	{
		$this->checkToken();

		$contract_id = KrMethods::inputInt('contract_id');
		if (!$contract_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=contracts'));
		}

		$GuestData = new GuestData('download', $contract_id);
		$result    = $GuestData->getPdf();
		if (!$result)
		{
			foreach ($errors as $e)
			{
				KrMethods::message($e);
			}

			return false;
		}

		jexit();
	}

	/**
	 * Process additional requirements after saving guest arrival data
	 *
	 * @param   BaseDatabaseModel  $model      The data model object.
	 * @param   array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1
	 * @return void
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = []): void
	{
		$contract_id = (int) $validData['contract_id'];
		if ($contract_id)
		{
			KrFactory::getAdminModel('emailaction')::updateEmailAction($contract_id, "GUESTARRIVALOWNER");
		}

		if ($this->getTask() == 'save')
		{
			if (!$contract_id)
			{
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&view=' . $this->view_list
					. $this->getRedirectToListAppend(), false));
			}
			else
			{
				KrMethods::redirect(KrMethods::route('index.php?option=' . $this->option . '&task=contract.show&id='
					. $contract_id, false));
			}
		}
	}
}