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

/**
 * Service log controller class.
 *
 * @since 1.0.0
 */
class ServicelogController extends FormController
{
	/**
	 * View service log
	 *
	 * @throws Exception
	 * @since  3.0
	 * @return void
	 */
	#[NoReturn] public function modal(): void
	{
		$this->checkToken('get');

		$id = KrMethods::inputInt('id', 0, 'get');
		if (!$id) {
			Utility::goto('servicelogs');
		}

		/* @var ServiceLog $view */
		$view       = $this->getView('servicelog', 'modal');
		$view->id   = $id;
		$item       = KrFactory::getAdminModel('servicelog')->getItem($id);
		$view->form = KrFactory::getAdhocForm('servicelog', 'servicelog.xml');
		$view->form->bind($item);
		$view->display();
	}
}