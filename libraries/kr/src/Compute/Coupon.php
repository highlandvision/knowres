<?php
/**
 * @package     Know Hubs
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Compute;

defined('_JEXEC') or die;

use Exception as Exception;
use HighlandVision\KR\Hub;

/**
 * Calculate gross rate
 *
 * @since 3.9.3
 */
class Coupon
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate any coupon discounts
	 *
	 * @param   Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub     = $Hub;
		$coupon_id     = $this->Hub->getValue('coupon_id');
		$coupon_code   = $this->Hub->getValue('coupon_code');
		$coupon_amount = $this->Hub->getValue('coupon_amount');

		if (!$coupon_id || !$coupon_code || !$coupon_amount)
		{
			$this->Hub->setValue('coupon_discount', 0);
		}
		else
		{
			$this->calculateCoupon($coupon_amount);
		}
	}

	/**
	 * Check if coupon code is valid
	 *
	 * @param   float  $coupon_amount  Amount of coupon
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function calculateCoupon(float $coupon_amount): void
	{
		$room_total = $this->Hub->getValue('room_total');
		$is_pc      = (int) $this->Hub->getValue('coupon_is_percentage');
		if ($is_pc)
		{
			$coupon_discount = $this->Hub->round($room_total * ($coupon_amount / 100));
		}
		else
		{
			$coupon_discount = $coupon->amount;
		}

		$nightly    = $this->Hub->adjustNightly($coupon_discount, false);
		$room_total -= $coupon_discount;
		$this->Hub->setValue('nightly', $nightly);
		$this->Hub->setValue('room_total', $room_total);
		$this->Hub->setValue('coupon_discount', $coupon_discount);
	}
}