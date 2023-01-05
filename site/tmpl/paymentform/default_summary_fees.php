<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

$fees   = [];
$values = [];

foreach ($this->contract_fees as $fee)
{
	$fees[]   = $fee->description;
	$values[] = Utility::displayValue($fee->value, $this->contract->currency);
}

if (count($fees))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_CONTRACTFEE_TITLE'),
		'mid'   => implode("<br>", $fees),
		'right' => implode("<br>", $values)
	];
}