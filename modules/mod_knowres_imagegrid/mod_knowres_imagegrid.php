<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\Helper\ModuleHelper;

$wa = $app->getDocument()->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site-modules');

//TODO v5.1 Add alt and description fields for images
$grid = $params->get('imagegrid');
$data = [];

foreach ($grid as $g) {
	$link = '';
	if (empty($g->url)) {
		if ($g->category_id <> -1) {
			$Itemid = SiteHelper::getItemId('com_knowres', 'properties',
			                                ['layout' => 'category', 'category_id' => $g->category_id],
			                                ['layout' => 'category']);
			$link   = KrMethods::route('index.php?option=com_knowres&view=properties&layout=category&category_id=' .
			                           $g->category_id . '&Itemid=' . $Itemid);
		} elseif ($g->link <> -1) {
			$link = KrMethods::route('index.php?Itemid=' . $g->link);
		}
	}

	if (!empty($link) || $g->url) {
		$data[] = [
			'image' => $g->image,
			'text'  => $g->text,
			'link'  => $link,
			'url'   => $g->url
		];
	}
}

$count = count($data);

require ModuleHelper::getLayoutPath('mod_knowres_imagegrid', $params->get('layout', 'default'));