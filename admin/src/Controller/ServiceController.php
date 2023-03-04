<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controller
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
use HighlandVision\Ru\Manager\Bookings;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use RuntimeException;

/**
 * Service controller form class.
 *
 * @since 1.0.0
 */
class ServiceController extends FormController
{
	/**
	 * Method to add a new record.
	 *
	 * @throws Exception
	 * @since   1.6
	 */
	public function add(): void
	{
		if (parent::add())
		{
			KrMethods::redirect('index.php?option=com_knowres&task=services.new');
		}
	}

	/**
	 * Refresh LNM password
	 *
	 * @throws Exception
	 * @throws RuntimeException
	 * @since  4.0.0
	 */
	public function lnm()
	{
		$service_id = KrFactory::getListModel('services')::checkForSingleService(true, 'ru');
		$Bookings   = new Bookings();
		$Bookings->enableLNM();

		KrMethods::redirect(KrMethods::route('index.php?option=com_knowres&task=service.edit&id=' . $service_id,
			false));
	}

	/**
	 * Process additional requirements after save
	 *
	 * @param  BaseDatabaseModel  $model      The data model object.
	 * @param  array              $validData  The validated data.
	 *
	 * @throws Exception
	 * @since  3.1.0
	 */
	protected function postSaveHook(BaseDatabaseModel $model, $validData = [])
	{
		// If adding xero then set all payments and fees to actioned
		if (!(int) $validData['id'] && (string) $validData['plugin'] == 'xero')
		{
			KrFactory::getListModel('contractpayments')->updateForXero($validData['agency_id']);
		}

		// Check for changes to ha service parameters
		if ((int) $validData['id'] && $validData['type'] == 'c' && $validData['plugin'] == 'vrbo')
		{
			$existing = Utility::decodeJson(KrMethods::inputString('existing'), true);
			$new      = Utility::decodeJson($validData['parameters'], true);
			if ((is_countable($new) && count($new)) && (is_countable($existing) && count($existing)))
			{
				if ($new['bookingPolicy'] != $existing['bookingPolicy']
					|| $new['cancellationPolicy'] != $existing['cancellationPolicy']
					|| $new['pricingPolicy'] != $existing['pricingPolicy']
					|| $new['checkInTime'] != $existing['checkInTime']
					|| $new['checkOutTime'] != $existing['checkOutTime'])
				{
					KrFactory::getAdminModel('propertysetting')->updateSetting('security_changes', 0);
				}

				if ($new['markup'] != $existing['markup'])
				{
					KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updatePropertyRates', 0, 0,
						'vrbo');
				}
			}
		}
	}
}