<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $discount    Discount Item.
 * @var array        $currencies  Property currencies.
 * @var int          $property_id ID of property.
 */

$value = '';
$text  = '';
$dates = '';

$currency = $currencies[$property_id] ?? $currencies[0];
$value    = $discount->is_pc ? (float) $discount->discount . '%'
	: Utility::displayValue($discount->discount, $currency);

if ($discount->model == 1)
{
	// Arrivals between
	$text  .= KrMethods::plain('COM_KNOWRES_FOR_ARRIVALS');
	$dates = TickTock::displayDate($discount->param1, 'j M Y');
	$dates .= ' - ';
	$dates .= TickTock::displayDate($discount->param2, 'j M Y');
}
else
{
	// Days b4 arrival
	if ((int) $discount->param1)
	{
		$dates = (string) $discount->param1;
		$dates .= " - ";
	}
	else
	{
		$dates .= " up to ";
	}

	$dates .= $discount->param2;
	$text  .= KrMethods::sprintf('COM_KNOWRES_DISCOUNT_B4_ARRIVAL', $dates);
	$dates = '';
}

echo '<div class="smaller">' . $value . ' ' . $text . ' ' . $dates . '</div>';