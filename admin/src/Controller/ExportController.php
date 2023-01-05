<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnused */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Export;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;

/**
 * Reporting list controller list class.
 *
 * @since 1.0.0
 */
class ExportController extends FormController
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
		$gobackto = Utility::getGoBackTo();
		if ($gobackto)
		{
			KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&' . $gobackto, false));
		}

		return true;
	}

	/**
	 * Export balances to csv as per POST request.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function doBalances()
	{
		$this->checkToken();

		$data = KrMethods::inputArray('jform');
		if (!empty($data['property_id']))
		{
			$data['property_id'] = 0;
		}

		new Export\ContractBalances($data);
	}

	/**
	 * Export contracts to csv as per POST request.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	#[NoReturn] public function doContracts()
	{
		$this->checkToken();

		$data = KrMethods::inputArray('jform');
		if (empty($data['property_id']))
		{
			$data['property_id'] = 0;
		}

		new Export\Contracts($data);
	}

	/**
	 * Export owner payments to csv as per POST request.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	#[NoReturn] public function doOwnerPayments()
	{
		$this->checkToken();

		$data = KrMethods::inputArray('jform');
		if (empty($data['property_id']))
		{
			$data['property_id'] = 0;
		}
		if (empty($data['owner_id']))
		{
			$data['owner_id'] = 0;
		}

		new Export\OwnerPayments($data);
	}

	/**
	 * Export payments to csv as per POST request.
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	#[NoReturn] public function doPayments()
	{
		$this->checkToken();

		$data = KrMethods::inputArray('jform');
		if (empty($data['property_id']))
		{
			$data['property_id'] = 0;
		}

		new Export\Payments($data);
	}

	/**
	 * Export guest registration data
	 *
	 * @throws Exception
	 * @since  2.5.0
	 */
	public function doRegistration()
	{
		$this->checkToken();
		$data = KrMethods::inputArray('jform');

		new Export\Registration($data);
	}
}