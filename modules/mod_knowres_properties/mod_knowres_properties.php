<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Helper\ModuleHelper;
use Knowres\Module\Properties\Site\Helper\PropertiesHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$property_select = PropertiesHelper::setOptions();
if ($property_select)
{
	/** @noinspection PhpUnhandledExceptionInspection */
	$Itemid = SiteHelper::getItemId('com_knowres', 'property', ['id' => 0]);
	require ModuleHelper::getLayoutPath('mod_knowres_properties', $params->get('layout', 'default'));
}