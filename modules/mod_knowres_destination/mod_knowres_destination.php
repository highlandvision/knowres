<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Translations;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.modules');

$Translations = new Translations();
$destination  = $Translations->getText('region', $params->get('region_id'));

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_destination', $params->get('layout', 'default'));