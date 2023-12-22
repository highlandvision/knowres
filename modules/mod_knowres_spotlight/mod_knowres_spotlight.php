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

/** @noinspection PhpPossiblePolymorphicInvocationInspection */
$app->bootComponent('com_knowres')->getMVCFactory()->createModel('Hero', 'Site', ['ignore_request' => true]);

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

$count = 0;
$data  = [];

for ($i = 1; $i <= 3; $i++) {
	if ($params->get('image' . $i)) {
		$count++;
		$data[$i] = ['image' => $params->get('image' . $i),
		             'text'  => $params->get('text' . $i),
		             'link'  => $params->get('link' . $i),
		             'url'   => $params->get('url' . $i)
		];
	}
}

require ModuleHelper::getLayoutPath('mod_knowres_spotlight', $params->get('layout', 'default'));