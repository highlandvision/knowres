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
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;

use function count;
use function is_countable;

/**
 * Calculate seasons adjsutment
 *
 * @since 3.3.0
 */
class Seasons
{
	/** @var Hub Hub data. */
	protected Hub $Hub;

	/**
	 * Calculate any season adjutsments
	 *
	 * @param  Hub  $Hub  Hub data
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;

		if (!$this->Hub->settings['managed_rates'] || !$this->Hub->settings['cluster'])
		{
			return;
		}

		$seasons = [];
		if ($this->Hub->getValue('seasonsRq'))
		{
			$seasons = KrFactory::getListModel('seasons')->getSeasons($this->Hub->settings['cluster']);
		}
		else
		{
			$seasonsDb = $this->Hub->getValue('seasonsDb');
			foreach ($seasonsDb as $s)
			{
				if ($s->cluster_id == $this->Hub->settings['cluster'])
				{
					$seasons[] = $s;
				}
			}
		}

		if (!is_countable($seasons) || !count($seasons))
		{
			return;
		}

		$this->calculateSeasons($seasons);
	}

	/**
	 * Calculates the season surcharge / discount
	 * Adds to gross if surcharge or sets as discount
	 *
	 * @param  array  $seasons  Season DB data
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	private function calculateSeasons(array $seasons): void
	{
		$adjustment   = 0;
		$base         = $this->Hub->getValue('base_rate');
		$gross        = $this->Hub->getValue('room_total_gross_system');
		$date_range   = $this->Hub->getValue('date_range');
		$season_pcs   = $this->mergeSeasonDates($seasons, $date_range);
		$base_nightly = $this->Hub->getValue('base_nightly');
		$nightly      = $this->Hub->getValue('nightly');

		foreach ($base_nightly as $date => $rate)
		{
			if (isset($season_pcs[$date]) && (int) $season_pcs[$date] <> 100)
			{
				$new            = $this->Hub->round($rate * $season_pcs[$date] / 100);
				$adjustment     += $new - $rate;
				$nightly[$date] += $new - $rate;
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
			$this->Hub->setAdjustments('Season Average', $adjustment, $pc . '%', $base);
		}

		$this->Hub->setValue('room_total', $gross);
		$this->Hub->setValue('room_total_gross', $gross);
		$this->Hub->setValue('room_total_gross_system', $gross);
		$this->Hub->setValue('nightly', $nightly);
	}

	/**
	 * Get rate mark-ups for calculations
	 *
	 * @param  array  $seasonsDb   Rate markups from DB
	 * @param  array  $date_range  Booking date range
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	private function mergeSeasonDates(array $seasonsDb, array $date_range): array
	{
		$season_pc = [];
		$final     = end($date_range);

		foreach ($date_range as $d)
		{
			$season_pc[$d] = 100;
			foreach ($seasonsDb as $s)
			{
				if ($s->valid_from > $final)
				{
					break;
				}

				if ($s->valid_from <= $d && $s->valid_to >= $d)
				{
					$season_pc[$d] = $this->getSeasonPc($s->season);
					break;
				}
			}
		}

		return $season_pc;
	}

	/**
	 * Get the pc adjustment for season
	 *
	 * @param  string  $season  Season
	 *
	 * @since  3.3.0
	 * @return float|int
	 */
	private function getSeasonPc(string $season): float|int
	{
		if ($season == 'xlow')
		{
			$pc = $this->Hub->settings['xlow_season_pc'];
		}
		else if ($season == 'low')
		{
			$pc = $this->Hub->settings['low_season_pc'];
		}
		else if ($season == 'slow')
		{
			$pc = $this->Hub->settings['slow_season_pc'];
		}
		else if ($season == 'mid')
		{
			$pc = $this->Hub->settings['mid_season_pc'];
		}
		else if ($season == 'high')
		{
			$pc = $this->Hub->settings['high_season_pc'];
		}
		else if ($season == 'xhigh')
		{
			$pc = $this->Hub->settings['xhigh_season_pc'];
		}

		return $pc;
	}
}