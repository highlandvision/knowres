<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Dispatcher
 * @copyright  2022 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Administrator\Dispatcher;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Dispatcher\ComponentDispatcher;
use Joomla\CMS\Factory;

use function is_dir;

use const JPATH_ROOT;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

/**
 * ComponentDispatcher class for KR
 *
 * @since  4.0.0
 */
class Dispatcher extends ComponentDispatcher
{
	/**
	 * Define tasks for before dispatch
	 *
	 * @throws Exception
	 * @since  4.0.0
	 */
	public function dispatch(): void
	{
		if (is_dir(JPATH_ROOT . '/media/com_knowres/vendor')) {
			require_once(JPATH_ROOT . '/media/com_knowres/vendor/autoload.php');
		}

		new ExceptionHandling();
		Carbon::setToStringFormat('Y-m-d');

		$wa = Factory::getDocument()->getWebAssetManager();
		$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
		$wa->useStyle('com_knowres.admin-generic');
		$wa->useScript('com_knowres.admin-generic');

		if (KrMethods::inputInt('success')) {
			KrMethods::message(KrMethods::plain('COM_KNOWRES_ACTION_SUCCESS'));
		}

		parent::dispatch();
	}
}