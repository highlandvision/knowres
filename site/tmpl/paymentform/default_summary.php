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
use HighlandVision\KR\Utility;

$this->data = [];

if ($this->contract->room_total_gross != $this->contract->room_total)
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL_GROSS'),
		'mid'   => '',
		'right' => Utility::displayValue($this->contract->room_total_gross, $this->contract->currency),
	];

	if ($this->contract->discount > 0)
	{
		$this->data[] = [
			'left'  => KrMethods::plain('COM_KNOWRES_CONFIRM_DISCOUNT_LBL'),
			'mid'   => '',
			'right' => Utility::displayValue($this->contract->discount, $this->contract->currency),
		];
	}

	if ($this->contract->coupon_discount > 0)
	{
		$this->data[] = [
			'left'  => KrMethods::plain('COM_KNOWRES_CONFIRM_COUPON_DISCOUNT_LBL'),
			'mid'   => '',
			'right' => Utility::displayValue($this->contract->coupon_discount, $this->contract->currency),
		];
	}
}

//		$notes        = '';
//		$booking      = $this->getContractNotes("owner");
//		if (count($booking))
//		{
//			foreach ($booking as $n)
//			{
//				$notes .= nl2br($n->note) . "<br>";
//			}
//		}
//
//		$line['mid']   = $notes;

$this->data[] = [
	'left'  => KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL'),
	'mid'   => '',
	'right' => Utility::displayValue($this->contract->room_total, $this->contract->currency),
];

if (!$this->params->get('tax_ignore') && count($this->contract->taxes))
{
	$this->loadTemplate('summary_tax');
}

if (is_countable($this->contract->extras) && count($this->contract->extras))
{
	$this->loadTemplate('summary_extras');
}

$this->loadTemplate('summary_fees');

if ((is_countable($this->contract->extras) && count($this->contract->extras))
	|| (is_countable($this->contract_fees)
		&& count($this->contract_fees)))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_RESERVATION_TOTAL'),
		'mid'   => '',
		'right' => Utility::displayValue($this->contract->contract_total + $this->fee_total, $this->contract->currency),
	];
}

if (is_countable($this->payments) && count($this->payments))
{
	$this->loadTemplate('summary_payments');
}

$this->loadTemplate('summary_paynow');

echo KrMethods::render('dashboard.payment.summary', ['data' => $this->data]);