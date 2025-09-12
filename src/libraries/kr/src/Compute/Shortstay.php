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

use Exception;
use HighlandVision\KR\Hub;
use InvalidArgumentException;

/**
 * Calculate short stay adjustments
 *
 * @since 3.3.0
 */
class Shortstay
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate any short break adjustments
	 *
	 * @param  Hub  $Hub  Hub details class
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;

		$nights = $this->Hub->getValue('nights');
		if ($nights < 2 || $nights > 6)
		{
			return;
		}

		$setting = 'shortstay_percentage' . $nights;
		$pc      = $this->Hub->settings[$setting];
		if ($pc == 100)
		{
			return;
		}

		$this->calculateShortstay($pc);
	}

	/**
	 * Calculates the short break discount
	 *
	 * @param  int  $pc  Percentage surcharge for short stay
	 *
	 * @throws InvalidArgumentException
	 * @since  3.4.0
	 */
	private function calculateShortstay(int $pc): void
	{
		$base         = $this->Hub->getValue('base_rate');
		$gross        = $this->Hub->getValue('room_total_gross_system');
		$base_nightly = $this->Hub->getValue('base_nightly');
		$nightly      = $this->Hub->getValue('nightly');

		foreach ($base_nightly as $date => $rate)
		{
			$nightly[$date] = $this->Hub->round($rate * $pc / 100);
		}

		$adjustment = $this->Hub->round($base * $pc / 100) - $base;
		$gross      += $adjustment;

		if ($this->Hub->getValue('adjustmentsRq'))
		{
			$this->Hub->setAdjustments('Short Stay', $adjustment, $pc - 100 . '%', $base);
		}

		$this->Hub->setValue('room_total', $gross);
		$this->Hub->setValue('room_total_gross', $gross);
		$this->Hub->setValue('room_total_gross_system', $gross);
		$this->Hub->setValue('nightly', $nightly);
	}
}