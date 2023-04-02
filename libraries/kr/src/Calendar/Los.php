<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Calendar;

defined('_JEXEC') or die;

use Carbon\Exceptions\InvalidFormatException;
use Exception;
use HighlandVision\KR\Calendar;
use HighlandVision\KR\TickTock;

use function defined;

/**
 * Data for los rates calculations
 *
 * @since 3.4.0
 */
class Los extends Calendar
{
	/**
	 * Initialise
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $first        From date Y-m-d
	 * @param  string  $final        End date Y-m-d
	 * @param  array   $rates        Rates for property, Will be read if not supplied
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, string $first, string $final, array $rates = [])
	{
		parent::__construct($property_id, $first, $final, 0, 0, $rates);

		$this->getChangeOvers(false);
		$this->getWeekly();
		$this->getMinstay();
	}

	/**
	 * Check if date is not a valid changeover date for weekly rates
	 *
	 * @param  string  $date  Date to check
	 *
	 * @throws Exception
	 * @since  4.0.0
	 * @return bool True if date is a changeover day
	 */
	public function weeklyChangeOverDay(string $date): bool
	{
		return !isset($this->weekly[$date]);
	}

	//	/**
	//	 * Return number of nights to first blocked date
	//	 *
	//	 * @param  string  $date        Start date
	//	 * @param  int     $max_nights  Maximum #nights
	//	 * @param  string  $dow         Weekly start date
	//	 * @param  int     $min         Current minimum nights
	//	 *
	//	 * @throws Exception
	//	 * @since  3.4.0
	//	 * @return int
	//	 */
	//	public function getFirstBookedDate(string $date, int $max_nights, string $dow, int $min = 0): int
	//	{
	//		$range  = TickTock::allDatesBetween($date, TickTock::modifyDays($date, $max_nights), true);
	//		$nights = 0;
	//
	//		foreach ($range as $r)
	//		{
	//			if ($this->changeovers[$r] == 'O')
	//			{
	//				return $nights;
	//			}
	//			if ($this->changeovers[$r] == 'X' && !isset($this->weekly[$r]))
	//			{
	//				return $nights;
	//			}
	//			if ($dow < 7 && TickTock::getDow($r) != $dow)
	//			{
	//				return $nights;
	//			}
	//
	//			$nights++;
	//			if ($nights > $min)
	//			{
	//				return $min;
	//			}
	//		}
	//
	//		return $max_nights;
	//	}

	/**
	 * Set minimum and maximum actual stay days for a date
	 *
	 * @param  string  $date        Required date
	 * @param  int     $max_nights  Maximum allowed stay
	 *
	 * @throws InvalidFormatException
	 * @since  3.4.0
	 * @return array
	 */
	public function getMinMaxStay(string $date, int $max_nights = 31): array
	{
		$start   = $date;
		$mindate = TickTock::modifyDays($date, $this->minstay[$date]);
		$maxdate = TickTock::modifyDays($date, $max_nights);
		$mindays = 0;
		$maxdays = 0;

		while ($start <= $mindate)
		{
			//			if (!$this->checkMin($start, $first, $mindate))
			//			{
			//				if (!$mindays)
			//				{
			//					return [0, 0];
			//				}
			//
			//				break;
			//			}

			$mindays++;
			$start = TickTock::modifyDays($start);
		}

		$mindays--;
		if (!$mindays || $mindays < $this->minstay[$date])
		{
			return [0, 0];
		}

		//		$start = $date;
		while ($start < $maxdate)
		{
			//			if (!$this->checkMax($start))
			//			{
			//				return [$mindays, $maxdays];
			//			}

			$maxdays++;
			$start = TickTock::modifyDays($start);
		}

		return [$mindays, $maxdays];
	}

	/**
	 * Check if date is available for check out
	 *
	 * @param  string  $date  Date to check
	 *
	 * @since  3.4.0
	 * @return bool
	 */
	private function checkMax(string $date): bool
	{
		if ($this->changeovers[$date] == 'O')
		{
			return false;
		}
		if ($this->changeovers[$date] == 'X' && !isset($this->weekly[$date]))
		{
			return false;
		}
		if ($this->changeovers[$date] == 'I' && isset($this->weekly[$date]))
		{
			return false;
		}

		return true;
	}

	/**
	 * Check if date is available for check in
	 *
	 * @param  string  $date     Date to check
	 * @param  string  $first    Arrival date
	 * @param  string  $mindate  Earliest departure date
	 *
	 * @since  3.4.0
	 * @return bool
	 */
	private function checkMin(string $date, string $first, string $mindate): bool
	{
		if ($this->changeovers[$date] == 'I' && $date != $first)
		{
			return false;
		}
		if ($this->changeovers[$date] == 'O' && $date != $mindate)
		{
			return false;
		}
		if ($this->changeovers[$date] == 'X' && !isset($this->weekly[$date]))
		{
			return false;
		}

		return true;
	}
}