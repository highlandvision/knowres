<?php
/**
 * @package     Know Reservations
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

use function end;

/**
 * Calculate net rates markup
 *
 * @since 3.3.0
 */
class RateMarkup
{
	/** @var Hub $Hub Hub Data. */
	protected Hub $Hub;

	/**
	 * Calculate any rate markup adjustments
	 *
	 * @param  Hub  $Hub  Hub details class
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		if (!$this->Hub->settings['net_rates'])
		{
			return;
		}

		$date_range = $this->Hub->getValue('date_range');
		$final      = end($date_range);

		if ($this->Hub->getValue('ratemarkupsRq') || $this->Hub->getValue('shortbook'))
		{
			$ratemarkupsDb = KrFactory::getListModel('ratemarkups')
			                          ->getMarkups($this->Hub->getValue('property_id'), $final);
		}
		else
		{
			$ratemarkupsDb = $this->Hub->getValue('ratemarkupsDb');
		}

		$this->calculateRatemarkup($ratemarkupsDb);
	}

	/**
	 * Calculates the selling price for net rates
	 *
	 * @param  array  $ratemarkupsDb  Database markups
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function calculateRatemarkup(array $ratemarkupsDb): void
	{
		$date_range = $this->Hub->getValue('date_range');
		$final      = end($date_range);
		$markup_pc  = $this->mergeNetRateMarkups($ratemarkupsDb, $date_range, $final);
		$nightly    = $this->Hub->getValue('nightly');
		$room_total = $this->Hub->getValue('room_total');
		$markup     = 0;

		if (!count($ratemarkupsDb))
		{
			$markup         = $this->Hub->round($room_total * $this->Hub->settings['net_markup'] / 100);
			$nightly_markup = $this->Hub->round($markup / $this->Hub->getValue('nights'));
			$total          = $markup;
			foreach ($nightly as $date => $rate)
			{
				if ($final == $date)
				{
					$nightly[$date] += $total;
				}
				else
				{
					$nightly[$date] += $nightly_markup;
					$total          -= $nightly_markup;
				}
			}
		}
		else
		{
			foreach ($nightly as $date => $rate)
			{
				$nightly_markup = $this->Hub->round($rate * $markup_pc[$date] / 100);
				$nightly[$date] += $nightly_markup;
				$markup         += $nightly_markup;
			}
		}

		$markup = $this->Hub->round($markup);
		if (!$markup)
		{
			return;
		}

		if ($this->Hub->getValue('adjustmentsRq'))
		{
			$pc = $this->Hub->round($markup / $room_total * 100);
			$this->Hub->setAdjustments('NetRateMarkup', $markup, $pc . '%', $room_total);
		}

		$room_total += $markup;
		$this->Hub->setValue('markup', $markup);
		$this->Hub->setValue('markup_pc', $markup_pc);
		$this->Hub->setValue('room_total', $room_total);
		$this->Hub->setValue('room_total_gross', $this->Hub->getValue('room_total_gross') + $markup);
		$this->Hub->setValue('nightly', $nightly);
	}

	/**
	 * Get rate mark-ups for calculations
	 *
	 * @param  array   $ratemarkupsDb  Rate markups from DB
	 * @param  array   $date_range     Booking date range
	 * @param  string  $final          Final date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	private function mergeNetRateMarkUps(array $ratemarkupsDb, array $date_range, string $final): array
	{
		$markup = [];

		foreach ($date_range as $d)
		{
			$markup[$d] = $this->Hub->settings['net_markup'];
			foreach ($ratemarkupsDb as $rm)
			{
				if ($rm->valid_from > $final)
				{
					break;
				}

				if ($rm->valid_from <= $d && $rm->valid_to >= $d)
				{
					$markup[$d] = $rm->net_markup;
					break;
				}
			}
		}

		return $markup;
	}
}