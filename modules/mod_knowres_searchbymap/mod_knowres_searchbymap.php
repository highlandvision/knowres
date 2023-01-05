<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.modules');

$layout    = $params->get('layout', 'default');
$KRparams  = KrMethods::getParams();
$region_id = $KRparams->get('default_region');
$Itemid    = SiteHelper::getItemId('com_knowres', 'properties', array("region_id" => 0));

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_searchbymap', $params->get('layout', 'default'));