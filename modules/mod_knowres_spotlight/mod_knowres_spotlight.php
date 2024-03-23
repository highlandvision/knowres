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

		$category_id = $params->get('category_id' . $i);
		$layout      = $params->get('layout' . $i);
		$link        = '';

		if ($category_id <> -1) {
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
			                                ['layout' => 'category', 'category_id' => $category_id],
			                                ['layout' => 'category']);
			$link   = KrMethods::route('index.php?option=com_knowres&view=properties&layout=category&category_id=' .
			                           $category_id . '&Itemid=' . $Itemid);
		} elseif ($layout <> -1) {
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
			                                ['layout' => $layout]);
			$link = KrMethods::route('index.php?option=com_knowres&view=properties&layout=' . $layout
			                         . '&Itemid=' . $Itemid);
		}

		if (empty($link)) {
			continue;
		}

		$data[$i] = ['image' => $params->get('image' . $i),
		             'text'  => $params->get('text' . $i),
		             'link'  => $link
		];
	}
}

require ModuleHelper::getLayoutPath('mod_knowres_spotlight', $params->get('layout', 'default'));