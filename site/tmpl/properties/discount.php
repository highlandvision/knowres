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
use Joomla\CMS\Factory;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('keepalive');

$items     = [];
$discounts = [];
$prev_id   = 0;

foreach ($this->items as $i)
{
	if ($prev_id == $i->property_id)
	{
		$discounts[$i->property_id][] = $i;
	}
	if ($prev_id != $i->property_id)
	{
		$items[]                      = $i;
		$discounts[$i->property_id][] = $i;
		$prev_id                      = $i->property_id;
	}
}

$menu = Factory::getApplication()->getMenu()->getActive();
if ($menu)
{
	$menu_params = $menu->getParams();
}

echo KrMethods::render('properties.discounts', [
	'items'          => $items,
	'discounts'      => $discounts,
	'params'         => $this->params,
	'title'          => KrMethods::plain('COM_KNOWRES_BROWSE_DISCOUNTS'),
	'currencies'     => $this->currencies,
	'per_row_medium' => $menu_params->get('per_row_medium', 2),
	'per_row_large'  => $menu_params->get('per_row_large', 3)
]);