<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Dispatcher
 * @copyright  2022 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\Component\Knowres\Site\Dispatcher;

defined('_JEXEC') or die;

use Carbon\Carbon;
use Exception;
use HighlandVision\KR\ExceptionHandling;
use Joomla\CMS\Dispatcher\ComponentDispatcher;

use function is_dir;

use const JPATH_ROOT;

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
		if (is_dir(JPATH_ROOT . '/media/com_knowres/vendor'))
		{
			require_once(JPATH_ROOT . '/media/com_knowres/vendor/autoload.php');
		}

		new ExceptionHandling();
		Carbon::setToStringFormat('Y-m-d');

		parent::dispatch();
	}
}