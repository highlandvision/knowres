<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.modules');

$glob    = 'images/' . $params->get('folder') . '/*.{jpg,png,gif}';
$fimages = glob($glob, GLOB_BRACE);
$images  = [];
foreach ($fimages as $i)
{
	$size = getimagesize(JPATH_SITE . '/' . $i);
	if ($size)
	{
		$parts = pathinfo($i);
		$alt   = str_replace(["_", " "], "-", $parts['filename']);
		$alt   = str_replace(['.jpg', '.png', '.gif'], "", $alt);

		$images[] = array(
			'image'  => $i,
			'height' => $params->get('height', $size[1]),
			'width'  => $params->get('width', $size[0]),
			'alt'    => $alt
		);
	}
}

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));
require ModuleHelper::getLayoutPath('mod_knowres_carousel', $params->get('layout', 'default'));