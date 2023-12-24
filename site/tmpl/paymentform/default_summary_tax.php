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

$taxes = [];

foreach ($this->contract->taxes as $k => $v)
{
	$text = ucfirst($k);
	if (isset($v['type']) && $v['type'] == 2)
	{
		$text .= ' ' . KrMethods::plain('COM_KNOWRES_CONTRACT_TAX_ESTIMATED');
	}

	if (count($this->contract->taxes) > 1)
	{
		$text .= '-' . Utility::displayValue($v['value'], $this->contract->currency);
	}

	$taxes[] = $text;
}

if (is_countable($taxes) && count($taxes))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_TAX'),
		'mid'   => implode('<br>', $taxes),
		'right' => Utility::displayValue($this->contract->tax_total, $this->contract->currency),
	];
}
else
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_TAX'),
		'mid'   => '',
		'right' => Utility::displayValue($this->contract->tax_total, $this->contract->currency),
	];
}