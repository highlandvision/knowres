<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('keepalive');

echo KrMethods::render('properties.basicgrid', [
	'items'  => $this->items,
	'params' => $this->params,
	'title'  => KrMethods::plain('COM_KNOWRES_BROWSE_NEW_VILLAS')
]);