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
use JetBrains\PhpStorm\NoReturn;
use Joomla\CMS\MVC\Controller\AdminController;
use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Response\JsonResponse;

use function jexit;

/**
 * Guests controller list class.
 *
 * @since 1.0.0
 */
class GuestsController extends AdminController
{
	/**
	 * Returns the emails for the manager booking
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	#[NoReturn] public function email(): void
	{
		$query  = KrMethods::inputString('query', '');
		$emails = KrFactory::getListModel('guests')->getEmails($query);

		$wrapper           = [];
		$wrapper['emails'] = $emails;

		echo new JsonResponse($wrapper);
		jexit();
	}

	/**
	 * Proxy for getModel.
	 *
	 * @param  string  $name    Model name
	 * @param  string  $prefix  Site or Administrator
	 * @param  array   $config  Params
	 *
	 * @since  1.0.0
	 * @return bool|BaseDatabaseModel
	 */
	public function getModel($name = 'guest', $prefix = 'Administrator',
		$config = ['ignore_request' => true]): BaseDatabaseModel|bool
	{
		return parent::getModel($name, $prefix, $config);
	}

	/**
	 * Returns the guest data by ajax for a manager booking
	 *
	 * @throws Exception
	 * @since        1.0.0
	 * @noinspection PhpUnused
	 */
	#[NoReturn] public function guestdetails(): void
	{
		$email = KrMethods::inputString('email', '');
		$guest = KrFactory::getListModel('guests')->checkGuestEmail($email);

		$wrapper = [];
		if ($guest)
		{
			unset($guest->discount);
			$wrapper['item']  = $guest;
			$wrapper['found'] = true;
		}
		else
		{
			$wrapper['found'] = false;
		}

		echo new JsonResponse($wrapper);
		jexit();
	}
}