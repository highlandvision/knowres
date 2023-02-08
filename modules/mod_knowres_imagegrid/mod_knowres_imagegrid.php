<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$grid = $params->get('imagegrid');
$data = [];

foreach ($grid as $g)
{
	if (isset($g->image) && $g->image)
	{
		$data[] = array(
			'image' => $g->image,
			'text'  => $g->text,
			'link'  => $g->link
		);
	}
}

$count = count($data);

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_imagegrid', $params->get('layout', 'default'));