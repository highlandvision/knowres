<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Compute;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;

/**
 * Calculate commission
 *
 * @since 3.3.0
 */
class Commission
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate commission
	 *
	 * @param   Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;

		if (!$this->Hub->settings['net_rates'])
		{
			$this->calculatePc();
		}
		else
		{
			$this->calculateNet();
		}
	}

	/**
	 * Calculate commission and owner rate based on commission %
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function calculatePc(): void
	{
		$room_total = $this->Hub->getValue('room_total');
		$net_price  = $this->Hub->getValue('net_price');

		if (!$this->Hub->property->owner_id)
		{
			$net_price_system = 0;
			$commission       = $room_total;
		}
		else
		{
			$owner = KrFactory::getAdminModel('owner')->getItem($this->Hub->property->owner_id);
			if (empty($owner->id))
			{
				$net_price_system = 0;
				$commission       = $room_total;
			}
			else if ($net_price)
			{
				$net_price_system = $this->Hub->round($room_total * ((100 - $owner->commission) / 100));
				$commission       = $room_total - $net_price;
			}
			else
			{
				$base           = $this->Hub->getValue('room_total');
				$channel_markup = $this->Hub->getValue('channel_markup');
				$adjusted       = $base - $channel_markup;

				$net_price_system = $this->Hub->round($adjusted * ((100 - $owner->commission) / 100));
				$commission       = $adjusted - $net_price_system;
			}
		}

		$this->Hub->setValue('net_price_system', $net_price_system);
		$this->Hub->setValue('commission', $commission);
	}

	/**
	 * Calculate net and commission rate based on net rate markup and discounts
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function calculateNet(): void
	{
		$markup                  = $this->Hub->getValue('markup');
		$markup_pc               = $this->Hub->getValue('markup_pc');
		$room_total_gross_system = $this->Hub->getValue('room_total_gross_system');
		$discount                = (float) $this->Hub->getValue('discount');
		$coupon                  = (float) $this->Hub->getValue('coupon_discount');
		$net_discount            = 0;
		$commission_discount     = 0;

		if (!empty($discount) || !empty($coupon))
		{
			$net_discount        = ($discount + $coupon) * (100 / (100 + $markup_pc));
			$commission_discount = $discount + $coupon - $net_discount;
		}

		$this->Hub->setValue('net_price_system', $room_total_gross_system - $net_discount);
		$this->Hub->setValue('commission', $markup - $commission_discount);
	}
}