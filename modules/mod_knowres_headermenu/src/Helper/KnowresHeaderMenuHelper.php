<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace Knowres\Module\Headermenu\Administrator\Helper;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrMethods;

use function defined;

/**
 * Helper class mod_knowres_headermenu
 *
 * @since 4.0.0
 */
abstract class KnowresHeaderMenuHelper
{
	/**
	 * Get the options for the header menu in admin
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return array
	 */
	public static function getMenu(): array
	{
		if (KrMethods::inputBool('hidemainmenu'))
		{
			return [];
		}

		$view = KrMethods::inputString('view', '');

		$menu   = [];
		$menu[] = ['MOD_KNOWRES_HEADERMENU_GANTT_TITLE', 'view=gantt', $view == 'gantt', 'fas fa-calendar-alt'];
		$menu[] = ['MOD_KNOWRES_HEADERMENU_CONTRACTS_DAILY_TITLE', 'task=contracts.daily', $view == 'daily',
		           'fas fa-calendar-day'];
		$menu[] = ['MOD_KNOWRES_HEADERMENU_PROPERTIES_TITLE', 'view=properties', $view == 'properties', 'fas fa-home'];
		$menu[] = ['MOD_KNOWRES_HEADERMENU_CONTRACTS_TITLE', 'view=contracts', $view == 'contracts', 'fas fa-calendar'];

		return $menu;
	}
}