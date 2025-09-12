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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

$c2c = [];
$c3c = [];
$c2p = [];

foreach ($this->payments as $p)
{
	if ($p->confirmed)
	{
		$text = TickTock::displayDate($p->payment_date);
		if ($p->service_name)
		{
			$text .= ' by ' . $p->service_name;
		}
		else if ($this->contract->agent_id && $this->contract->agent_deposit_paid)
		{
			$text .= KrMethods::sprintf('COM_KNOWRES_PAID_AGENT', $this->agent->name);
		}

		if ($p->amount != $p->base_amount)
		{
			$text .= " ( " . Utility::displayValue($p->amount, $p->currency) . " @ " . $p->rate . " )";
		}

		$c2c[] = $text;

		if ($p->base_amount > 0)
		{
			$c3c[] = '<span class="red">- ' .
				Utility::displayValue($p->base_amount, $this->contract->currency) .
				'</span>';
		}
		else
		{
			$c3c[] = '<span>+ ' . Utility::displayValue($p->base_amount, $this->contract->currency) .
				'</span>';
		}
	}
	else
	{
		if ($p->amount != $p->base_amount)
		{
			$base = Utility::displayValue($p->base_amount, $this->contract->currency);
			$text = Utility::displayValue(
					$p->amount, $p->currency
				) . " ( " . $base . " @ " . $p->rate . " )";
		}
		else
		{
			$text = Utility::displayValue($p->amount, $p->currency);
		}

		if ($p->note)
		{
			$text .= '<br>' . $p->note;
		}

		$c2p[] = KrMethods::sprintf('COM_KNOWRES_CONTRACTPAYMENTS_PENDING_RECEIPT_OF', $text);
	}
}

if (count($c2c))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_CONFIRMED_PAYMENTS'),
		'mid'   => implode("<br>", $c2c),
		'right' => implode("<br>", $c3c)
	];
}

if (count($c2p))
{
	$this->data[] = [
		'left'  => KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_UNCONFIRMED_PAYMENTS'),
		'mid'   => implode("<br>", $c2p),
		'right' => ''
	];
}