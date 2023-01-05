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
use HighlandVision\KR\TickTock;

use function defined;

/**
 * Calculate managed adjustments and update gross
 *
 * @since 3.4.0
 */
class Dow
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Get the total rate value for the stay
	 *
	 * @param   Hub  $Hub  Hub data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return void
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		if (!$this->Hub->settings['managed_rates'])
		{
			return;
		}

		$dow_pc = $this->getDowPc();
		$calc   = false;
		foreach ($dow_pc as $pc)
		{
			if ($pc <> 100)
			{
				$calc = true;
				break;
			}
		}

		if (!$calc)
		{
			return;
		}

		$this->calculateDow($dow_pc);
	}

	/**
	 * Calculate day of week adjustments
	 *
	 * @param   array  $dow_pc  Day of week percentage adjustments
	 *
	 * @throws Exception
	 * @since  3.3.4
	 */
	private function calculateDow(array $dow_pc): void
	{
		$base         = $this->Hub->getValue('base_rate');
		$gross        = $this->Hub->getValue('room_total_gross_system');
		$base_nightly = $this->Hub->getValue('base_nightly');
		$nightly      = $this->Hub->getValue('nightly');
		$adjustment   = 0;

		foreach ($base_nightly as $date => $rate)
		{
			$dow = TickTock::getDow($date);
			if ((int) $dow_pc[$dow] !== 100)
			{
				$new            = $this->Hub->round($rate * ($dow_pc[$dow] / 100));
				$nightly[$date] += $new - $rate;
				$adjustment     += $new - $rate;
			}
		}

		if ($adjustment == 0)
		{
			return;
		}

		$gross = $this->Hub->round($gross + $adjustment);

		if ($this->Hub->getValue('adjustmentsRq'))
		{
			$pc = $this->Hub->round($adjustment / $base * 100);
			$this->Hub->setAdjustments('Dow Average', $adjustment, $pc . '%', $base);
		}

		$this->Hub->setValue('room_total', $gross);
		$this->Hub->setValue('room_total_gross', $gross);
		$this->Hub->setValue('room_total_gross_system', $gross);
		$this->Hub->setValue('nightly', $nightly);
	}

	/**
	 * Get DOW % adjustments
	 *
	 * @since  3.4.0
	 * @return array
	 */
	private function getDowPc(): array
	{
		$dow_pc    = [];
		$dow_pc[0] = $this->Hub->settings['sunday_pc'];
		$dow_pc[1] = $this->Hub->settings['monday_pc'];
		$dow_pc[2] = $this->Hub->settings['tuesday_pc'];
		$dow_pc[3] = $this->Hub->settings['wednesday_pc'];
		$dow_pc[4] = $this->Hub->settings['thursday_pc'];
		$dow_pc[5] = $this->Hub->settings['friday_pc'];
		$dow_pc[6] = $this->Hub->settings['saturday_pc'];

		return $dow_pc;
	}
}