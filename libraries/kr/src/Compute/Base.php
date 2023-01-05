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
use HighlandVision\KR\Calendar;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Hub;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use InvalidArgumentException;
use RuntimeException;

use function count;
use function defined;
use function is_countable;

/**
 * Calculate gross rate
 *
 * @since 3.3.0
 */
class Base
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
		$this->Hub   = $Hub;
		$property_id = $this->Hub->getValue('property_id');
		$arrival     = $this->Hub->getValue('arrival');
		$departure   = $this->Hub->getValue('departure');

		$ratesDb = $this->getRates($property_id, $arrival, $departure);
		if (!is_countable($ratesDb) || !count($ratesDb))
		{
			$this->Hub->setValue('room_total_gross', 0);
			$this->Hub->setValue('room_total_gross_system', 0);
			$this->Hub->setValue('booking_type', 0);

			return;
		}

		$this->calculateBaserate($ratesDb, $arrival, $departure);
	}

	/**
	 * Calculate the gross nightly and total rate for the stay
	 *
	 * @param   array   $ratesDb    Rates from db
	 * @param   string  $arrival    Arrival date
	 * @param   string  $departure  Departure date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return void
	 */
	private function calculateBaserate(array $ratesDb, string $arrival, string $departure): void
	{
		$old_departure = $departure;
		list($departure, $nights, $date_range) = $this->checkShortBook($ratesDb, $arrival, $departure);
		if ($old_departure < $departure)
		{
			$ratesDb = KrFactory::getListModel('rates')
			                    ->getRatesForProperty($this->Hub->getValue('property_id'), $arrival, $departure);
		}

		$guests = $this->Hub->getValue('guests');
		//TODO-v4.1 Reinstate for taxes.
		//		$guests = $this->Hub->getValue('guests') - $this->Hub->getValue('free_guests');
		$this->Hub->setValue('nightly', []);

		$count      = 0;
		$max        = 0;
		$first      = true;
		$next_guest = 1;
		$nightly    = [];
		$rate       = 0;
		$weekly     = (int) $this->Hub->settings['tariffChargesStoredWeeklyYesNo'] ? 7 : 1;

		foreach ($ratesDb as $r)
		{
			if ($r->valid_from > $departure)
			{
				break;
			}

			if ($arrival <= $r->valid_to)
			{
				$thisrates = $this->mergeMoreGuests($r);

				if ($first && $this->Hub->getValue('source') !== 'losrates')
				{
					if ((int) $this->Hub->settings['canwebook'])
					{
						$this->setCanwebook($r->min_nights);
					}
					$first = false;
				}

				foreach ($thisrates as $a)
				{
					$min_guests = $a['more_min'];
					if ($min_guests > $guests)
					{
						continue;
					}

					$max_guests  = $a['more_max'];
					$new_rate    = $a['more_rate'];
					$ignore_pppn = $a['more_pppn'];
					$next_guest  = $next_guest > $guests ? 1 : $next_guest;

					foreach ($date_range as $date)
					{
						if ($date > $r->valid_to)
						{
							break;
						}

						$thisrate = $new_rate;
						$pass     = true;
						while (true)
						{
							if ($date < $r->valid_from || $nights > $r->max_nights)
							{
								$pass = false;
								break;
							}

							if ($next_guest < $min_guests || $next_guest > $max_guests)
							{
								$pass = false;
								break;
							}

							if ($date == $arrival && $r->start_day < 7 && $r->start_day != TickTock::getDow($date))
							{
								$pass = false;
								break;
							}

							if ($date == $departure && $r->start_day < 7 && $r->start_day != TickTock::getDow($date))
							{
								$pass = false;
								break;
							}

							if ($date == $arrival && $min_guests == 1 && $nights < $r->min_nights)
							{
								if (!(int) $this->Hub->settings['canwebook'])
								{
									$pass = false;
									break;
								}

								if ((int) $this->Hub->getValue('canwebook') > 0)
								{
									if ($nights < (int) $this->Hub->getValue('canwebook'))
									{
										$pass = false;
										break;
									}
								}
							}

							if ($min_guests == 1)
							{
								$count++;
							}

							$max      = $max_guests > $guests ? $guests + 1 : $max_guests + 1;
							$thisrate = $ignore_pppn ? $thisrate : $thisrate * ($max - $min_guests);

							if (!isset($nightly[$date]))
							{
								$nightly[$date] = 0;
							}

							$rate           += $thisrate;
							$nightly[$date] += $this->Hub->round($thisrate / $weekly);

							break;
						}

						if (!$pass && $max && $max <= $guests)
						{
							$max = 1;
						}
					}

					$next_guest = $max;
				}
			}
		}

		if ($count < $nights)
		{
			$this->Hub->setValue('base_nightly', []);
			$this->Hub->setValue('base_rate', 0);
			$this->Hub->setValue('commission', 0);
			$this->Hub->setValue('contract_total', 0);
			$this->Hub->setValue('net_price', 0);
			$this->Hub->setValue('net_price_system', 0);
			$this->Hub->setValue('nightly', []);
			$this->Hub->setValue('room_total', 0);
			$this->Hub->setValue('room_total_gross', 0);
			$this->Hub->setValue('room_total_gross_system', 0);
		}
		else
		{
			$rate = $this->Hub->round($rate / $weekly);
			if ($weekly == 7)
			{
				$nightly = $this->roundNightly($nightly, $rate);
			}
			if ($this->Hub->getValue('adjustmentsRq'))
			{
				$this->Hub->setAdjustments('Base Rate', $rate, '', $rate);
			}

			$this->Hub->setValue('base_nightly', $nightly);
			$this->Hub->setValue('base_rate', $rate);
			$this->Hub->setValue('nightly', $nightly);
			$this->Hub->setValue('room_total', $rate);
			$this->Hub->setValue('room_total_gross', $rate);
			$this->Hub->setValue('room_total_gross_system', $rate);
		}
	}

	/**
	 * Get minimum nights from cluster
	 *
	 * @param   int     $min_nights  Minimum nights
	 * @param   string  $arrival     Arrival date
	 *
	 * @since  3.3.4
	 * @return int
	 */
	private function checkCluster(int $min_nights, string $arrival): int
	{
		if ($this->Hub->settings['cluster'])
		{
			$cluster = KrFactory::getListModel('seasons')
			                    ->getMinimumNights((int) $this->Hub->settings['cluster'], $arrival);
			if (!empty($cluster))
			{
				$min_nights = $cluster;
			}
		}

		return $min_nights;
	}

	/**
	 * Overrides the entered dates with shortbook settings
	 *
	 * @param   array   $ratesDb    Rates from db
	 * @param   string  $arrival    Arrival date
	 * @param   string  $departure  Departure date
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	private function checkShortBook(array $ratesDb, string $arrival, string $departure): array
	{
		$nights     = $this->Hub->getValue('nights');
		$date_range = $this->Hub->getValue('date_range');

		if ($this->Hub->settings['shortbook'])
		{
			$xmin = 9999;
			if ($this->Hub->settings['managed_rates'])
			{
				$xmin = $this->checkCluster($this->Hub->settings['minimuminterval'], $arrival);
			}
			else if ($this->Hub->settings['beyond_rates'])
			{
				$xmin = $this->checkCluster($this->Hub->settings['min_nights'], $arrival);
			}
			else
			{
				foreach ($ratesDb as $r)
				{
					if ($departure >= $r->valid_from && $arrival <= $r->valid_to)
					{
						$xmin = $r->min_nights;
						break;
					}
				}
			}

			if ($nights < $xmin
				&& ($nights < $this->Hub->settings['canwebook']
					|| empty($this->Hub->settings['canwebook'])))
			{
				$this->Hub->setValue('shortbook', 1);
				$this->Hub->setValue('shortbook_departure', $departure);
				$this->Hub->setValue('shortbook_nights', $nights);
				$this->Hub->setValue('shortbook_date_range', $date_range);

				$departure  = TickTock::modifyDays($arrival, $xmin);
				$date_range = TickTock::allDatesBetween($arrival, $departure, true);
				$nights     = $xmin;

				$this->Hub->setValue('departure', $departure);
				$this->Hub->setValue('nights', $nights);
				$this->Hub->setValue('date_range', $date_range);
			}
		}

		return [$departure,
		        $nights,
		        $date_range];
	}

	/**
	 * Filter the rates for current dates only
	 *
	 * @param   array   $rates      Property rates
	 * @param   string  $arrival    Arrival date
	 * @param   string  $departure  Departure date
	 *
	 * @since  3.3.0
	 * @return array
	 */
	private function filterRates(array $rates, string $arrival, string $departure): array
	{
		$current = [];
		foreach ($rates as $r)
		{
			if ($r->valid_to >= $arrival && $r->valid_from <= $departure)
			{
				$current[] = $r;
			}
		}

		return $current;
	}

	/**
	 * Get rates from database or Hub
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $arrival      Arrival date
	 * @param   string  $departure    Departure date
	 *
	 * @throws Exception
	 * @since  3.3.4
	 * @return array
	 */
	private function getRates(int $property_id, string $arrival, string $departure): array
	{
		if ($this->Hub->getValue('ratesRq'))
		{
			$ratesDb = KrFactory::getListModel('rates')
			                    ->getRatesForProperty($property_id, $arrival, $departure);
		}
		else
		{
			$ratesDb = $this->filterRates($this->Hub->getValue('ratesDb'), $arrival, $departure);
		}

		return $ratesDb;
	}

	/**
	 * Set rate value for calculation
	 *
	 * @param   object  $rate  Rate row
	 *
	 * @since  3.3.0
	 * @return array
	 */
	private function mergeMoreGuests(object $rate): array
	{
		$thisrates   = [];
		$thisrates[] = [
			'more_min'  => (int) $rate->min_guests,
			'more_max'  => (int) $rate->max_guests,
			'more_rate' => (float) $rate->rate,
			'more_pppn' => (int) $rate->ignore_pppn
		];

		$more_guests = Utility::decodeJson($rate->more_guests, true);
		foreach ($more_guests as $m)
		{
			$thisrates[] = $m;
		}

		return $thisrates;
	}

	/**
	 * Get minimum nights from cluster
	 *
	 * @param   array  $nightly  Nightly rates
	 * @param   float  $total    Total rate
	 *
	 * @throws InvalidArgumentException
	 * @throws RuntimeException
	 * @since  3.4.0
	 * @return array
	 */
	private function roundNightly(array $nightly, float $total): array
	{
		$sum = 0;
		foreach ($nightly as $date => $rate)
		{
			$sum       += $rate;
			$last_date = $date;
			$last_rate = $rate;
		}

		if ($sum != $total)
		{
			$nightly[$last_date] = $this->Hub->round($last_rate + ($total - $sum));
		}

		return $nightly;
	}

	/**
	 * Check if canwebook is valid
	 *
	 * @param   int  $nights  #Nights from rates
	 *
	 * @since  3.4.0
	 * @throws Exception
	 */
	private function setCanwebook(int $nights): void
	{
		$Calendar = new Calendar($this->Hub->getValue('property_id'), $this->Hub->getValue('arrival'),
			$this->Hub->getValue('departure'));
		$this->Hub->setValue('canwebook', $Calendar->checkCanWeBook($this->Hub->getValue('arrival'), $nights));
	}
}