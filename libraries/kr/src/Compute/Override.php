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

use HighlandVision\KR\Hub;
use InvalidArgumentException;
use RuntimeException;

/**
 * Calculate gross rate
 *
 * @since 3.9.3
 */
class Override
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate the manager override values
	 *
	 * @param  Hub  $Hub  Hub data
	 *
	 * @throws RuntimeException
	 * @throws InvalidArgumentException
	 * @since  3.3.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		$this->Hub->setValue('discounts', []);
		$this->calculateOverride();
	}

	/**
	 * Calculate override values
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  1.0.0
	 */
	private function calculateOverride(): void
	{
		$room_total_gross = $this->Hub->getValue('room_total_gross');
		$discount         = $this->Hub->getValue('discount');
		$date_range       = $this->Hub->getValue('date_range');
		$total            = 0;
		$nightly          = [];

		$room_total = $room_total_gross - $discount;
		$per_night  = $this->Hub->round($room_total / $this->Hub->getValue('nights'));
		foreach ($date_range as $d)
		{
			if ($total + $per_night <= $room_total)
			{
				$nightly[$d] = $per_night;
				$total       += $per_night;
			}
			else
			{
				$nightly[$d] = $room_total - $total;
			}
		}

		$this->Hub->setValue('room_total', $room_total);
		$this->Hub->setValue('nightly', $nightly);
		$this->Hub->setValue('base_nightly', $nightly);
	}
}