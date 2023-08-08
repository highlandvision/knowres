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

use Exception;
use HighlandVision\KR\Cryptor;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media\Pdf;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\SiteHelper;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\BaseController;

use function count;
use function is_countable;

/**
 * Dashboard for guest reservations
 *
 * @since 2.5.0
 */
class DashboardController extends BaseController
{
	/**
	 * Redirects on any dashboard form cancel
	 *
	 * @throws Exception
	 * @since 2.5.0
	 */
	public function cancel(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$guest_id     = $userData->db_guest_id;
		$db_contracts = $userData->db_contracts;

		if ($guest_id)
		{
			$guestForm = KrFactory::getSiteModel('guest');
			$guestForm->checkin($guest_id);
		}

		foreach ($db_contracts as $c)
		{
			if ($c['guestdata_id'])
			{
				$ContractguestdataForm = KrFactory::getSiteModel('contractguestdata');
				$ContractguestdataForm->checkin($c['guestdata_id']);
			}
		}

		KrMethods::setUserState('com_knowres.edit.guestform.data', null);
		KrMethods::setUserState('com_knowres.edit.contractguestdataform.data', null);

		SiteHelper::redirectDashboard();
	}

	/**
	 * Downloads the pdf files
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public function download(): void
	{
		$contract_id  = KrMethods::inputInt('key', 0, 'get');
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$db_contracts = $userData->db_contracts;

		if (!$userData->db_guest_id || !isset($db_contracts[$contract_id]))
		{
			SiteHelper::badUser();
		}

		SiteHelper::getDownloadPdf();
		KrMethods::message(KrMethods::plain('COM_KNOWRES_DASHBOARD_DOWNLOAD_ERROR'));
		SiteHelper::redirectDashboard();
	}

	/**
	 * Format and download the arrival details pdf
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	#[NoReturn] public function guestdata(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$db_contracts = $userData->db_contracts;
		$contract_id  = $this->input->getInt('id', 0);

		if (!$userData->db_guest_id || !isset($db_contracts[$contract_id]))
		{
			SiteHelper::badUser();
		}

		$item = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			SiteHelper::redirectDashboard();
		}

		$GuestData = new Pdf\Contract\GuestData('download', $contract_id);
		$result    = $GuestData->getPdf();
		if (!$result)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'dashboard');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), 'error');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=dashboard&Itemid=' . $Itemid),
				false);
		}

		jexit();
	}

	/**
	 * Format and download the pdf invoice
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	#[NoReturn] public function invoice(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$db_contracts = $userData->db_contracts;
		$contract_id  = KrMethods::inputInt('id', 0, ' get');

		if (!$userData->db_guest_id || !isset($db_contracts[$contract_id]))
		{
			SiteHelper::badUser();
		}

		$item = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			SiteHelper::redirectDashboard();
		}

		$invoice = new Pdf\Contract\Invoice('download', $contract_id);
		$result  = $invoice->getPdf(true);
		if (!$result)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'dashboard');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), 'error');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=dashboard&Itemid=' . $Itemid),
				false);
		}

		jexit();
	}

	/**
	 * Login for registered users
	 *
	 * @throws Exception
	 * @since 2.5.0
	 */
	public function login(): void
	{
		SiteHelper::loginUser();
		SiteHelper::redirectDashboard();
	}

	/**
	 * Preprocess standard dashboard request to hide identifiers
	 * Decrypt key input to get [0]contract_id, [1]guest_id, [2]qkey, [3]view (defauolt dashboard).
	 *
	 * @throws Exception
	 * @since 2.5.0
	 */
	public function request(): void
	{
		SiteHelper::checkUser();

		$userSession = new KrSession\User();
		$userData    = $userSession->getData();
		$contract_id = 0;
		$guest_id    = 0;

		$key = KrMethods::inputString('key', '', 'get');
		try
		{
			if (empty($key))
			{
				throw new Exception('Dashboard key was not received');
			}

			list($contract_id, $guest_id, $qkey, $view) = Cryptor::decrypt($key);
			if (!$guest_id || !$qkey)
			{
				throw new Exception('Dashboard key was invalid');
			}
		}
		catch (Exception $e)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_DASHBOARD_ACCESS'));
			SiteHelper::badUser();
		}

		//TODO-v4.3 Can be deleted after 1 year
		if ($view == 'guestdataform')
		{
			$view = 'contractguestdataform';
		}

		if ($view == 'reviewform')
		{
			$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if (!$contract->id || $contract->qkey != $qkey || $contract->guest_id != $guest_id)
			{
				SiteHelper::redirectHome();
			}

			$userData->db_contract_id = $contract_id;
			$userSession->setData($userData);

			SiteHelper::redirectView($view);
		}
		else if ($view !== 'dashboard')
		{
			$contract = KrFactory::getAdminModel('contract')->getItem($contract_id);
			if (!$contract->id || $contract->qkey != $qkey || $contract->guest_id != $guest_id)
			{
				SiteHelper::redirectHome();
			}
			if (!is_countable($userData->db_contracts) || !count($userData->db_contracts))
			{
				SiteHelper::redirectDashboard();
			}

			$userData->db_guest_id    = $guest_id;
			$userData->db_contract_id = $contract_id;
			if ($view == 'guestupdate')
			{
				$userData->db_guest_update = true;
				$view                      = 'guestform';
			}
			else if ($view == 'contractguestdataform')
			{
				$userData->db_guest_update = false;
			}

			$userSession->setData($userData);
			SiteHelper::redirectView($view);
		}
		else
		{
			$userData->db_guest_id    = $guest_id;
			$userData->db_contracts   = [];
			$userData->db_contract_id = 0;
			$userSession->setData($userData);

			SiteHelper::redirectDashboard();
		}
	}

	/**
	 * Display for successful payments
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function success(): void
	{
		KrMethods::message(KrMethods::plain('COM_KNOWRES_PAYMENT_SUCCESS_POST'));
		SiteHelper::redirectDashboard();
	}

	/**
	 * Format and download the pdf voucher
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	#[NoReturn] public function voucher(): void
	{
		$userSession  = new KrSession\User();
		$userData     = $userSession->getData();
		$db_contracts = $userData->db_contracts;
		$contract_id  = KrMethods::inputInt('id', 0, 'get');

		if (!$userData->db_guest_id || !isset($db_contracts[$contract_id]))
		{
			SiteHelper::badUser();
		}

		$item = KrFactory::getAdminModel('contract')->getItem($contract_id);
		if (!$item->id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL_CONFIRM'));
			SiteHelper::redirectDashboard();
		}

		$voucher = new Pdf\Contract\Voucher('download', $contract_id,);
		$result  = $voucher->getPdf();
		if (!$result)
		{
			$Itemid = SiteHelper::getItemId('com_knowres', 'dashboard');
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_FATAL'), 'error');
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&view=dashboard&Itemid=' . $Itemid),
				false);
		}

		jexit();
	}
}