<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_media
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace HighlandVision\Component\Knowres\Administrator\Controller;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Gantt;
use HighlandVision\KR\Joomla\Extend\FormController;
use HighlandVision\KR\Session as KrSession;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\Response\JsonResponse;

use function jexit;

/**
 * Gantt form controller.
 *
 * @since  1.5
 */
class GanttController extends FormController
{
	/**
	 * Cancels back to menu
	 *
	 * @param   null  $key  String
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	public function cancel($key = null): void
	{
		$this->setRedirect(KrMethods::route('index.php?option=' . $this->option, false));
	}

	/**
	 * Return json data for gantt ajax request
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	#[NoReturn] public function data(): void
	{
		$this->checkToken();

		$data         = '';
		$userSession  = new KrSession\User();
		$access_level = $userSession->getAccessLevel();
		if ($access_level >= 30)
		{
			$cache_options = [
				'cachebase'    => JPATH_ADMINISTRATOR . '/cache',
				'lifetime'     => 86400,
				'caching'      => true,
				'defaultgroup' => 'com_knowres_contracts'
			];

			$cache = KrMethods::getCache($cache_options);
			$data  = Utility::decodeJson($cache->get('gantt'), true);
		}

		if (empty($data))
		{
			$allow = true;
			if ($access_level == 10)
			{
				$params = KrMethods::getParams();
				if (!$params->get('contract_add') && !$params->get('block_add'))
				{
					$allow = false;
				}
			}

			$properties = KrFactory::getListModel('properties')->getForGantt();
			$from       = TickTock::modifyMonths('now', 3, '-');
			$booked     = KrFactory::getListModel('contracts')->getBookedDates('', $from, true, 1);
			$Gantt      = new Gantt();
			$data       = $Gantt->prepareData($properties, $booked, $allow);
		}

		if (!$data)
		{
			echo new JsonResponse(null, KrMethods::plain('COM_KNOWRES_NO_DATA_FOUND'), true);
		}
		else
		{
			if ($access_level >= 30)
			{
				$cache->store(Utility::encodeJson($data), 'gantt');
			}

			echo new JsonResponse($data);
		}

		jexit();
	}

	/**
	 * Ajax - Returns the HTML data for the gantt tooltip
	 *
	 * @throws Exception
	 * @since  3.2.0
	 */
	public function tooltip()
	{
		$id = KrMethods::inputInt('id');
		if (!$id)
		{
			return false;
			jexit();
		}

		echo KrMethods::render('gantt.tooltip', ['data' => KrFactory::getListModel('contracts')->getTooltipData($id)]);

		jexit();
	}
}