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
use HighlandVision\KR\TickTock;
use InvalidArgumentException;

use function abs;
use function array_splice;
use function count;
use function in_array;
use function min;
use function round;
use function substr;

/**
 * Calculate general discount
 *
 * @since 3.9.3
 */
class Discount
{
	/** @var array Discount calculations. */
	protected array $calculations = [];
	/** @var array Dates discount applied to. */
	protected array $dates = [];
	/** @var Hub $Hub Hub. */
	protected Hub $Hub;

	/**
	 * Calculate discounts
	 *
	 * @param  Hub  $Hub  Hub base class
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function calculate(Hub $Hub): void
	{
		$this->Hub = $Hub;
		$this->Hub->setValue('discounts', []);
		$this->Hub->setValue('discount_system', 0);

		$manual = $this->Hub->getValue('manual');
		if ($manual)
		{
			$this->calculateManual();
		}
		else
		{
			$this->Hub->setValue('discount', 0);
			$this->calculateDiscount();
		}
	}

	/**
	 * Applies the largest discount and adjusts the gross
	 *
	 * @param  float  $room_total  Calculated rate
	 *
	 * @throws InvalidArgumentException
	 * @since  1.0.0
	 */
	private function applyLargest(float $room_total): void
	{
		$discount  = 0;
		$discounts = $this->Hub->getValue('discounts');
		foreach ($discounts as $key => $d)
		{
			if ($d['value'] > $discount)
			{
				$discount = $d['value'];
				$type     = $key;
			}
		}

		if ($discount > 0)
		{
			if ($this->Hub->getValue('do_discounts'))
			{
				$this->adjustNightly($type, $discount);
				$this->Hub->setValue('discount', $discount);
				$this->Hub->setValue('discount_system', $discount);
			}

			// TODO-v4.1 Test this works for RU where discounts are sent separately
			if ($this->Hub->getValue('agent_value') > 0 && $this->Hub->getValue('adjustmentsRq'))
			{
				$this->Hub->setAdjustments('Discount', 0, '', $discount * -1);
			}
			else if ($this->Hub->getValue('do_discounts'))
			{
				$room_total -= $discount;
				$this->Hub->setValue('room_total', $room_total);
			}
		}
	}

	/**
	 * Calculate arrival range discount
	 *
	 * @param  object  $d           Discount row
	 * @param  float   $room_total  Calculated rate
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return float
	 */
	private function calculateArrivalRange(object $d, float $room_total): float
	{
		$arrival  = $this->Hub->getValue('arrival');
		$nights   = $this->Hub->getValue('nights');
		$low      = $d->param1;
		$high     = $d->param2;
		$discount = 0;

		if ($arrival >= $low && $arrival <= $high)
		{
			if ($d->is_pc)
			{
				$discount = ((float) $d->discount * $room_total) / 100;
			}
			else
			{
				$discount = (float) $d->discount;
			}

			$nights_valid = min($nights, (TickTock::differenceDays($arrival, $high) + 1));
			$discount     = $discount * $nights_valid / $nights;

			$date_range = $this->Hub->getValue('date_range');
			array_splice($date_range, $nights_valid);
			$this->dates[$d->name]        = $date_range;
			$this->calculations[$d->name] = ['pc'       => $d->is_pc ? $d->discount : 0,
			                                 'fixed'    => !$d->is_pc ? $d->discount : 0,
			                                 'discount' => $discount];
		}

		return (float) $discount;
	}

	/**
	 * Calulate days b4 arrival discount
	 *
	 * @param  object  $d           Discount row
	 * @param  string  $date        Discount date
	 * @param  float   $room_total  Calculated rate
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return float
	 */
	private function calculateDaysb4Arrival(object $d, string $date, float $room_total): float
	{
		$daysb4   = TickTock::differenceDays($date, $this->Hub->getValue('arrival'));
		$low      = (int) $d->param1;
		$high     = (int) $d->param2;
		$discount = 0;

		if ($daysb4 >= $low && $daysb4 <= $high)
		{
			if ($d->is_pc)
			{
				$discount = ((float) $d->discount * $room_total) / 100;
			}
			else
			{
				$discount = (float) $d->discount;
			}

			$date_range                   = $this->Hub->getValue('date_range');
			$this->dates[$d->name]        = $date_range;
			$this->calculations[$d->name] = ['pc'       => $d->is_pc ? $d->discount : 0,
			                                 'fixed'    => !$d->is_pc ? $d->discount : 0,
			                                 'discount' => $discount];
		}

		return (float) $discount;
	}

	/**
	 * Calculates discounts
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	private function calculateDiscount(): void
	{
		$room_total = $this->Hub->getValue('room_total');
		$nights     = $this->Hub->getValue('nights');

		$this->calculateManagedLastMinute($room_total, $nights);
		$this->calculateStandard($room_total, $nights);
		$this->applyLargest($room_total);
	}

	/**
	 * Calculates the managed Last Minute Discount
	 *
	 * @param  float  $room_total  Room total value
	 * @param  int    $nights      #Nights
	 *
	 * @throws Exception
	 * @since  1.0.0
	 */
	private function calculateManagedLastMinute(float $room_total, int $nights): void
	{
		if (!$this->Hub->settings['managed_rates'] || $this->Hub->settings['exclude_lastminute'])
		{
			return;
		}

		$arrival = $this->Hub->getValue('arrival');
		$pc      = (int) $this->Hub->params->get('lmd_pc1');
		if ($pc && $nights >= (int) $this->Hub->params->get('lmd_min_nights')
			&& $nights <= (int) $this->Hub->params->get('lmd_max_nights'))
		{
			$days_b4_booking = TickTock::differenceDays($this->Hub->today, $arrival);
			if ($days_b4_booking >= (int) $this->Hub->params->get('lmd_range_from1')
				&& $days_b4_booking <= (int) $this->Hub->params->get('lmd_range_to1'))
			{
				$discount = $this->Hub->round($room_total * $pc / 100);
				$this->Hub->setDiscounts('lastminute', $discount, $pc . '%', $nights, $room_total);

				$this->dates['lastminute']        = $this->Hub->getValue('date_range');
				$this->calculations['lastminute'] = ['pc'       => $pc,
				                                     'discount' => $discount];
			}
		}
	}

	/**
	 * Calculates general discounts
	 *
	 * @param  float  $room_total  Gross rate
	 * @param  int    $nights      #Nights
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function calculateStandard(float $room_total, int $nights): void
	{
		if ($this->Hub->getValue('discountsRq'))
		{
			$discountsDb = KrFactory::getListModel('discounts')->getDiscounts($this->Hub->getValue('property_id'));
		}
		else
		{
			$discountsDb = $this->Hub->getValue('discountsDb');
		}

		if (!is_countable($discountsDb) || !count($discountsDb))
		{
			return;
		}

		$id = $this->Hub->getValue('id');

		foreach ($discountsDb as $d)
		{
			$discount = 0;
			$date     = $this->Hub->today;
			if ($id)
			{
				$created_at = $this->Hub->getValue('created_at');
				$date       = substr($created_at, 0, 10);
			}

			if ($d->valid_from <= $this->Hub->today && $d->valid_to >= $this->Hub->today)
			{
				switch ($d->model)
				{
					case '0':
						$discount = $this->calculateDaysb4Arrival($d, $date, $room_total);
						break;
					case '1':
						$discount = $this->calculateArrivalRange($d, $room_total);
						break;
					default:
						break;
				}
			}

			if ($discount > 0)
			{
				$discount = $this->Hub->round($discount);
				if ($d->is_pc)
				{
					$this->Hub->setDiscounts($d->name, $discount, $d->discount . '%', $nights, $room_total);
				}
				else
				{
					$this->Hub->setDiscounts($d->name, $discount, '', $nights, $room_total);
				}
			}
		}
	}

	/**
	 * Applies a manually entered discount
	 *
	 * @throws InvalidArgumentException
	 * @since  3.4.0
	 */
	private function calculateManual(): void
	{
		$discount = $this->Hub->getValue('discount');
		if ($discount > 0)
		{
			$date_range                   = $this->Hub->getValue('date_range');
			$this->dates['manual']        = $date_range;
			$this->calculations['manual'] = ['pc'       => 0,
			                                 'fixed'    => $discount,
			                                 'discount' => $discount];

			$this->adjustNightly('manual', $discount);
			$this->Hub->setValue('room_total', $this->Hub->getValue('room_total') - $discount);
			$this->Hub->setValue('discount', $discount);
			$this->Hub->setValue('discount_system', $discount);
		}
	}

	/**
	 * Adjust nightly rates
	 *
	 * @param  string  $type            Discount type
	 * @param  float   $total_discount  Discount value
	 *
	 * @throws InvalidArgumentException
	 * @since  3.4.0
	 */
	private function adjustNightly(string $type, float $total_discount): void
	{
		$nightly      = $this->Hub->getValue('nightly');
		$last         = array_key_last($nightly);
		$dates        = $this->dates[$type];
		$remaining    = $total_discount;
		$calculations = $this->calculations[$type];
		$pc           = 0;
		if ($calculations['pc'])
		{
			$pc = $calculations['pc'];
		}
		else
		{
			$fixed = round($calculations['fixed'] / count($dates), 2);
		}

		foreach ($nightly as $date => $rate)
		{
			if (!in_array($date, $dates))
			{
				continue;
			}

			if ($date == $last)
			{
				$nightly[$date] = $rate + $remaining;
			}
			else
			{
				if ($pc)
				{
					$per_night = $this->Hub->round($rate * $pc / 100);
				}
				else
				{
					$per_night = $fixed;
				}

				$nightly[$date] = $rate - $per_night;
				$remaining      = round($remaining - abs($per_night), 2);
			}
		}

		$this->Hub->setValue('nightly', $nightly);
	}
}