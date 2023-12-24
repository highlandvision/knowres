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

if ($this->payment_total)
{
	$left = KrMethods::plain('COM_KNOWRES_BALANCE');
	$mid  = '';
	if (!$this->balance)
	{
		$mid = !$this->payment_pending ? KrMethods::plain('COM_KNOWRES_PAID') : '';
	}

	$this->data[] = [
		'left'  => $left,
		'mid'   => $mid,
		'right' => Utility::displayValue($this->balance, $this->contract->currency),
	];
}