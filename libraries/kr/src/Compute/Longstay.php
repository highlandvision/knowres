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
use RuntimeException;

/**
 * Calculate long stay adjustments
 *
 * @since 3.3.0
 */
class Longstay
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate any long stay adjustments
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
		if ($nights < (int) $this->Hub->settings['longstay_days1'])
		{
			return;
		}

		$pc = $this->getPc($nights);
		if (!$pc || $pc == 100)
		{
			return;
		}

		$this->calculateLongstay($pc);
	}

	/**
	 * Calculates the long stay discount
	 *
	 * @param  int  $pc  Percentage decrease for long stay
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.4.0
	 */
	private function calculateLongstay(int $pc): void
	{
		$base         = $this->Hub->getValue('base_rate');
		$gross        = $this->Hub->getValue('room_total_gross_system');
		$base_nightly = $this->Hub->getValue('base_nightly');
		$nightly      = $this->Hub->getValue('nightly');
		$total        = 0;

		foreach ($base_nightly as $date => $rate)
		{
			$nightly[$date] = $this->Hub->round($rate * $pc / 100);
			$total          += $this->Hub->round($rate * $pc / 100);
		}

		$adjustment = $total - $base;
		$gross      += $adjustment;
		if ($this->Hub->getValue('adjustmentsRq'))
		{
			$this->Hub->setAdjustments('Long Stay', $adjustment, 100 - $pc . '%', $base);
		}

		$this->Hub->setValue('room_total', $gross);
		$this->Hub->setValue('room_total_gross', $gross);
		$this->Hub->setValue('room_total_gross_system', $gross);
		$this->Hub->setValue('nightly', $nightly);
	}

	/**
	 * Set the percentage decrease for a longstay
	 *
	 * @param  int  $nights  #Nights
	 *
	 * @since  3.4.0
	 * @return int
	 */
	private function getPc(int $nights): int
	{
		$pc = 0;
		if ($nights > (int) $this->Hub->settings['longstay_days3'] && (int) $this->Hub->settings['longstay_days3'])
		{
			$pc = (int) $this->Hub->settings['longstay_percentage3'];
		}
		else if ($nights > (int) $this->Hub->settings['longstay_days2'] && (int) $this->Hub->settings['longstay_days2'])
		{
			$pc = (int) $this->Hub->settings['longstay_percentage2'];
		}
		else if ($nights > (int) $this->Hub->settings['longstay_days1'] && (int) $this->Hub->settings['longstay_days1'])
		{
			$pc = (int) $this->Hub->settings['longstay_percentage1'];
		}

		return $pc;
	}
}