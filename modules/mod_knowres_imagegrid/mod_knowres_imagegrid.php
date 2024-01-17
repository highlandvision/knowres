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

//TODO v4.4 Add alt and description fields

foreach ($grid as $g) {
	if (!empty($g->image)) {
		$data[] = [
			'image' => $g->image,
			'text'  => $g->text,
			'link'  => $g->link,
			'url'   => $g->url
		];
	}
}

$count = count($data);

require ModuleHelper::getLayoutPath('mod_knowres_imagegrid', $params->get('layout', 'default'));