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
use HighlandVision\KR\Logger;
use HighlandVision\KR\Service\Ical;
use HighlandVision\KR\Session as KnowresSession;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;

use function count;

/**
 * Propertyicals controller list class (defaulted to service table).
 *
 * @since 1.0.0
 */
class PropertyicalsController extends AdminController
{
	/**
	 * Proxy for getModel.
	 *
	 * @param   string  $name    Model name
	 * @param   string  $prefix  Model prefix administrator or site (defaults to administrator)
	 * @param   array   $config  Config options
	 *
	 * @since  1.6
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'propertyical', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Import manually uploaded ics.
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function import()
	{
		$this->checkToken();
		$return = KrMethods::route('index.php?option=com_knowres&view=propertyicals', false);

		$userSession = new KnowresSession\User();
		$userData    = $userSession->getData();
		$property_id = (int) $userData->cr_property_id;
		if (!$property_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect($return);
		}

		try
		{
			$cid = KrMethods::inputArray('cid', [], 'get');
			if (is_countable($cid) && count($cid) > 0)
			{
				foreach ($cid as $c)
				{
					$item = KrFactory::getAdminModel('propertyical')->getItem((int) $c);
					$Ical = new Ical($item->service_id);
					$Ical->processManual($c, $property_id, $item->link, $item->icsdata);
				}

				KrMethods::cleanCache('com_knowres_contracts');
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
			}
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
		}

		KrMethods::redirect($return);
	}

	/**
	 * Delete the blocks for a property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function purge()
	{
		$this->checkToken();
		$return = KrMethods::route('index.php?option=com_knowres&view=propertyicals', false);

		$userSession = new KnowresSession\User();
		$userData    = $userSession->getData();
		$property_id = (int) $userData->cr_property_id;
		if (!$property_id)
		{
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
			KrMethods::redirect($return);
		}

		try
		{
			$cid = KrMethods::inputArray('cid', [], 'get');
			if (is_countable($cid) && count($cid) > 0)
			{
				foreach ($cid as $c)
				{
					$ical = KrFactory::getAdminModel('propertyical')->getItem((int) $c);
					KrFactory::getAdminModel('icalblock')->deleteExisting($property_id, $ical->service_id);
					KrFactory::getAdminModel('propertyicals')->updateLastUpdated($c);
				}

				KrMethods::cleanCache('com_knowres_contracts');
				KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
			}
		}
		catch (Exception $e)
		{
			Logger::logMe($e->getMessage());
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ERROR_TRY_AGAIN'));
		}

		KrMethods::redirect($return);
	}
}