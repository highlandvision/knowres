<?php
/**
 * @package         Joomla.Administrator
 * @subpackage      mod_knowres
 * @copyright   (C) 2006 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Knowres\Module\Headermenu\Administrator\Helper\KnowresHeadermenuHelper;

//JLoader::registerNamespace('HighlandVision\\KR', JPATH_LIBRARIES . '/highlandvision/src', false, true);

$menu = KnowresHeaderMenuHelper::getMenu();
if (is_countable($menu) && count($menu))
{
	require ModuleHelper::getLayoutPath('mod_knowres_headermenu', $params->get('layout', 'default'));
}