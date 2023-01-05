<?php
/**
 * @package    Know Reservations
 * @subpackage Library
 * @copyright  Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use RuntimeException;

use function array_key_exists;
use function count;
use function defined;
use function ksort;

/**
 * Data for calendars / date pickers / availability
 *
 * @since 3.4.0
 */
class Calendar
{
	/** @var array Available dates */
	protected array $availability = [];
	/** @var array Blocked Dates */
	protected array $blocked = [];
	/** @var bool Blocked dates done flag as could be empty array */
	protected bool $blocked_done = false;
	/** @var array Bookings */
	protected array $bookings;
	/** @var int Property booking type */
	protected int $booking_type = 0;
	/** @var array Changeover values */
	protected array $changeovers = [];
	/** @var int Contract ID if editing */
	protected int $edit_id;
	/** @var string Final rate date */
	protected string $final;
	/** @var string First date */
	protected string $first;
	/** @var array Copy of blocked Dates */
	protected array $frozen = [];
	/** @var array Maximum stay per date */
	protected array $maxstay = [];
	/** @var array Minimum stay per date */
	protected array $minstay = [];
	/** @var int ID of property */
	protected int $property_id = 0;
	/** @var array All dates between first and final */
	protected array $range = [];
	/** @var array Rates */
	protected array $rates;
	/** @var array Property settings */
	protected array $settings;
	/** @var array Weekly rate dates */
	protected array $weekly = [];
	/** @var bool Weekly dates done flag as could be empty array */
	protected bool $weekly_done = false;

	/**
	 * Initialise
	 *
	 * @param   int     $property_id  ID of property
	 * @param  ?string  $first        From date Y-m-d
	 * @param  ?string  $final        End date Y-m-d
	 * @param   int     $nights       # Nights
	 * @param   int     $edit_id      ID of contract being edited
	 * @param   array   $rates        Rates for property, Will be read if not supplied
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, ?string $first = null, ?string $final = null, int $nights = 0,
		int $edit_id = 0, array $rates = [])
	{
		$this->setProperty($property_id);
		$this->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($this->property_id);

		$first = empty($first) ? TickTock::getDate() : $first;
		$this->setDates($first, $final, $nights);
		$this->edit_id = $edit_id;

		$this->getData($rates);
	}

	/**
	 * Check booked dates to determine if we can reduce the stay nights
	 *
	 * @param   string  $date    To be checked
	 * @param   int     $nights  Stay nights for date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return int Free nights
	 */
	public function checkCanWeBook(string $date, int $nights): int
	{
		$after  = 0;
		$before = 0;

		$this->getBlockedDates();
		$canwebook = (int) $this->settings['canwebook'];

		if (isset($this->blocked[$date]) && ($this->blocked[$date] == 0 || $this->blocked[$date] == 3))
		{
			return 0;
		}

		for ($i = 0; $i <= $nights; $i++)
		{
			$d      = TickTock::modifyDays($date, $i, '-');
			$before = $i;
			if (isset($this->blocked[$d]) && $this->blocked[$d] == 2)
			{
				break;
			}
		}

		for ($i = 0; $i <= $nights; $i++)
		{
			$d     = TickTock::modifyDays($date, $i);
			$after = $i;
			if (isset($this->blocked[$d]) && $this->blocked[$d] == 1)
			{
				break;
			}
		}

		if ($before + $after >= $nights)
		{
			return 0;
		}
		else if ($after >= $canwebook)
		{
			return $canwebook;
		}

		return 0;
	}

	/**
	 * Set booked dates from contracts and icals
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getAvailability(): array
	{
		if (is_countable($this->availability) && count($this->availability))
		{
			return $this->availability;
		}

		$this->setAvailability();

		return $this->availability;
	}

	/**
	 * Get blocked dates
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getBlockedDates(): array
	{
		if (!$this->blocked_done)
		{
			$this->setBlockedDates();
		}

		return $this->blocked;
	}

	/**
	 * Get changeover values
	 *
	 * @param   bool  $check_weekly  Set true to set all weekly none start days to X
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getChangeOvers(bool $check_weekly = true): array
	{
		if (is_countable($this->changeovers) && count($this->changeovers))
		{
			return $this->changeovers;
		}

		$this->setChangeOvers($check_weekly);

		return $this->changeovers;
	}

	/**
	 * Get the final booking date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return string
	 */
	public function getEndDate(): string
	{
		return TickTock::modifyDays('now', $this->settings['advanceBookingsLimit']);
	}

	/**
	 * Find the first available date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getFirstFreeDate(): array
	{
		$this->getAvailability();
		$this->getChangeOvers();
		$this->getWeekly();
		$this->getMinstay();

		foreach ($this->range as $date)
		{
			if ($this->changeovers[$date] == 'O' || $this->changeovers[$date] == 'X')
			{
				continue;
			}

			$nights = $this->minstay[$date];
			if ($this->checkFreeDate($date, $nights))
			{
				break;
			}
		}

		$arrival   = $date;
		$departure = TickTock::modifyDays($date, $nights);

		return [$arrival,
		        $departure];
	}

	/**
	 * Get changeover values
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getMaxstay(): array
	{
		if (is_countable($this->maxstay) && count($this->maxstay))
		{
			return $this->maxstay;
		}

		$this->setMaxstay();

		return $this->maxstay;
	}

	/**
	 * Get changeover values
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getMinstay(): array
	{
		if (is_countable($this->minstay) && count($this->minstay))
		{
			return $this->minstay;
		}

		$this->setMinstay();

		return $this->minstay;
	}

	/**
	 * Get changeover values
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getWeekly(): array
	{
		if ($this->weekly_done)
		{
			return $this->weekly;
		}

		$this->setWeekly();

		return $this->weekly;
	}

	/**
	 * Check if property is available for the required nights
	 *
	 * @param   string  $first   First date
	 * @param   int     $nights  Stay nights
	 *
	 * @throws Exception
	 * @since  3.3.4
	 * @return bool
	 */
	protected function checkFreeDate(string $first, int $nights): bool
	{
		$date  = $first;
		$last  = TickTock::modifyDays($date, $nights);
		$avail = true;

		$this->getAvailability();
		$this->getChangeOvers();
		$this->getWeekly();

		while ($date <= $last)
		{
			if ($this->changeovers[$date] == 'I' && $date != $first)
			{
				$avail = false;
				break;
			}
			if ($this->changeovers[$date] == 'O' && $date != $last)
			{
				$avail = false;
				break;
			}
			if ($this->changeovers[$date] == 'X' && !isset($this->weekly))
			{
				$avail = false;
				break;
			}

			$date = TickTock::modifyDays($date);
		}

		return $avail;
	}

	/**
	 * Read data for processing
	 *
	 * @param   array  $rates  Property rates
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function getData(array $rates = []): void
	{
		$this->setRates($rates);
		$this->bookings = KrFactory::getListModel('contracts')->getBookedDates($this->property_id);
	}

	/**
	 * Increment blocked date value
	 *
	 * @param   string  $date       Booked date
	 * @param   int     $increment  Increment value
	 *
	 * @since  3.4.0
	 */
	protected function incrementBlocked(string $date, int $increment): void
	{
		$value = 0;
		if (isset($this->blocked[$date]))
		{
			$value = (int) $this->blocked[$date];
		}

		$value                += $increment;
		$this->blocked[$date] = $value;
	}

	/**
	 * Update blocked dates
	 *
	 * @param   string  $d             Blocked date being processed
	 * @param   string  $first         Date of first block
	 * @param   string  $last          Date of last block
	 * @param   bool    $check_frozen  Set false to ignore frozen
	 * @param   bool    $paid          Set true for paid reservationsn
	 *
	 * @since  3.4.0
	 */
	protected function incrementBlockedDate(string $d, string $first, string $last, bool $check_frozen = true,
		bool $paid = true): void
	{
		if ($check_frozen && isset($this->frozen[$d]))
		{
			return;
		}

		//TODO-v4 Try to remember what this fixed
		//		if ($check_frozen && isset($this->frozen[$d]))
		//		{
		//			if ($this->frozen[$d] == 0 || $this->frozen[$d] == 3)
		//			{
		//				return;
		//			}
		//		}

		if ($d == $this->first)
		{
			$this->incrementBlocked($d, 2);
		}

		if ($d === $first)
		{
			$this->incrementBlocked($d, 1);
		}
		else if ($d === $last)
		{
			$this->incrementBlocked($d, 2);
		}
		else
		{
			$this->incrementBlocked($d, 0);
		}
	}

	/**
	 * Get array of daily availability
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setAvailability(): void
	{
		$this->getBlockedDates();

		foreach ($this->range as $date)
		{
			$type = array_key_exists($date, $this->blocked) ? $this->blocked[$date] : 1;
			if ($type == 0 || $type == 3)
			{
				$this->availability[$date] = 'N';
			}
			else
			{
				$this->availability[$date] = 'Y';
			}
		}
	}

	/**
	 * Read the rates to get base minimum nights
	 *
	 * @param   string  $date  Date to process
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	protected function setBaseMinStay(string $date): array
	{
		$first     = true;
		$end       = '0000-00-00';
		$min_stay  = 0;
		$start_day = 7;

		foreach ($this->rates as $r)
		{
			if ($r->min_guests > 1 || $date > $r->valid_to)
			{
				continue;
			}

			if ($first && $date >= $r->valid_from)
			{
				if ($this->settings['managed_rates'] || $this->settings['beyond_rates'])
				{
					$min_stay = $this->getSeasonNights($date, $r->min_nights);
				}
				else
				{
					$min_stay = $r->min_nights;
				}

				$start_day = $r->start_day;
				$end       = TickTock::modifyDays($date, $min_stay);
				if ($end <= $r->valid_to)
				{
					break;
				}

				$first = false;
				continue;
			}

			if (!$first && $end >= $r->valid_from && $end < $r->valid_to)
			{
				if ($r->start_day == 7 || $r->start_day == $start_day)
				{
					break;
				}

				$start_day = $r->start_day;
				for ($nights = 7; $nights < 14; $nights++)
				{
					$tmp = TickTock::modifyDays($date, $nights);
					$dow = TickTock::getDow($tmp);
					if ($dow === $r->start_day)
					{
						$min_stay  = $nights;
						$start_day = 7;
						break 2;
					}
				}
			}
		}

		return [$min_stay,
		        $start_day];
	}

	/**
	 * Get minimum nights from season / cluster
	 *
	 * @param   string  $date        Required date
	 * @param   int     $min_nights  Minimum nights
	 *
	 * @since  3.3.4
	 * @return int
	 */
	private function getSeasonNights(string $date, int $min_nights): int
	{
		if ($this->settings['cluster'])
		{
			$nights = KrFactory::getListModel('seasons')
			                   ->getMinimumNights((int) $this->settings['cluster'], $date);
			if (!empty($nights))
			{
				$min_nights = $nights;
			}
		}

		return $min_nights;
	}

	/**
	 * Prepare blocked dates array
	 * Blocked dates each have a value to indicate
	 * 0 - booked (can allow nothing )
	 * 1 - booked and arrival ( can allow departure )
	 * 2 - booked and departure ( can allow arrival )
	 * 3 - booked and arrival and departure (can allow nothing )
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setBlockedDates(): void
	{
		foreach ($this->bookings as $b)
		{
			if (!$this->edit_id || $b->black_booking == 2 || ($b->black_booking < 2 && $b->id != $this->edit_id))
			{
				$bdates = TickTock::allDatesBetween($b->arrival, $b->departure);
				foreach ($bdates as $d)
				{
					$this->incrementBlockedDate($d, $b->arrival, $b->departure, false);
				}
			}
		}

		$params = KrMethods::getParams();
		if ($params->get('calendar_norates', 0))
		{
			$this->setRateBlocks();
		}

		$this->blocked_done = true;
	}

	/**
	 * Change over values
	 * I - Check in
	 * O - Check out
	 * X - None
	 * C - Both
	 *
	 * @param   bool  $check_weekly  Set true to set all none day of week start days to X
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setChangeovers(bool $check_weekly): void
	{
		$this->getBlockedDates();
		$this->getWeekly();
		$first = true;

		foreach ($this->range as $date)
		{
			$code = 99;
			if (array_key_exists($date, $this->blocked))
			{
				$code = $this->blocked[$date];
			}
			if ($check_weekly && isset($this->weekly[$date]))
			{
				$code = 3;
			}

			$this->changeovers[$date] = match ($code)
			{
				0, 3 => 'X',
				1 => $first ? 'X' : 'O',
				2 => 'I',
				default => $first ? 'I' : 'C'
			};

			$first = false;
		}
	}

	/**
	 * Set and validate dates
	 *
	 * @param   string  $first  From date Y-m-d
	 * @param  ?string  $final  End date Y-m-d
	 * @param   int     $days   # Days
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setDates(string $first, ?string $final, int $days): void
	{
		if (empty($final) && !$days)
		{
			$days = $this->settings['advanceBookingsLimit'];
		}

		if (empty($final) && $days > 0)
		{
			$final = TickTock::modifyDays($first, $days);
		}

		if (empty($final))
		{
			throw new InvalidArgumentException('Please supply Final date or #Days');
		}

		if ($final < $first)
		{
			throw new InvalidArgumentException('Final date is before First date');
		}

		$this->first = $first;
		$this->final = $final;
		$this->range = TickTock::allDatesBetween($this->first, $this->final);
	}

	/**
	 * Set the maximum stay for all dates
	 *
	 * @since  3.4.0
	 */
	protected function setMaxStay(): void
	{
		foreach ($this->range as $d)
		{
			$this->maxstay[$d] = 0;
		}

		foreach ($this->rates as $r)
		{
			if ($r->min_guests == 1)
			{
				if ($r->valid_to < $this->first)
				{
					continue;
				}
				if ($r->valid_from > $this->final)
				{
					break;
				}

				$dates = TickTock::allDatesBetween($r->valid_from, $r->valid_to);
				foreach ($dates as $d)
				{
					if ($d >= $this->first && $d <= $this->final)
					{
						$this->maxstay[$d] = $r->max_nights;
					}
				}
			}
		}

		$last = count($this->maxstay) ? array_key_last($this->maxstay) : $this->today;
		if ($last < $this->final)
		{
			$dates = TickTock::allDatesBetween(TickTock::modifyDays($last), $this->final);
			foreach ($dates as $d)
			{
				$this->maxstay[$d] = 0;
			}
		}
	}

	/**
	 * Calculate the minimum stay required for a date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setMinStay(): void
	{
		$canwebook = (int) $this->settings['canwebook'];
		if ($canwebook)
		{
			$this->getBlockedDates();
		}

		foreach ($this->range as $d)
		{
			list($nights, $start_day) = $this->setBaseMinStay($d);
			if (!$nights)
			{
				$this->minstay[$d] = 0;
				continue;
			}

			if ((int) $this->settings['shortbook'] && $start_day == 7)
			{
				$this->minstay[$d] = $this->settings['shortbook'];
				continue;
			}

			if ($canwebook && $canwebook < $nights && $start_day == 7)
			{
				$cwb = $this->checkCanWeBook($d, $nights);
				if ($cwb)
				{
					$this->minstay[$d] = $cwb;
					continue;
				}
			}

			$this->minstay[$d] = (int) $nights;
		}
	}

	/**
	 * Validate property ID
	 *
	 * @param   int  $property_id  ID of property
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setProperty(int $property_id): void
	{
		if (empty($property_id))
		{
			throw new RuntimeException('Property ID must be provided');
		}

		$item = KrFactory::getAdminModel('property')->getItem($property_id);
		if (!$item)
		{
			throw new RuntimeException('Property ID is not valid');
		}

		$this->property_id  = $property_id;
		$this->booking_type = $item->booking_type;
	}

	/**
	 * Add dates with no rates to blocked dates
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setRateBlocks(): void
	{
		$this->frozen    = $this->blocked;
		$next_valid_from = $this->first;
		$last_valid_to   = false;

		foreach ($this->rates as $r)
		{
			if ($r->min_guests > 1)
			{
				continue;
			}

			if ($r->valid_from > $next_valid_from)
			{
				$interval = TickTock::allDatesBetween($next_valid_from, $r->valid_from, true);
				$first    = true;
				foreach ($interval as $d)
				{
					if ($first)
					{
						$this->incrementBlockedDate($d, $next_valid_from, '');
						$first = false;
					}
					else
					{
						$this->incrementBlockedDate($d, '', '');
					}
				}
			}

			$last_valid_to   = $r->valid_to;
			$next_valid_from = TickTock::modifyDays($r->valid_to);
		}

		if ($last_valid_to <= $this->final)
		{
			$this->incrementBlockedDate($next_valid_from, $next_valid_from, $this->final);

			$from     = TickTock::modifyDays($next_valid_from);
			$interval = TickTock::allDatesBetween($from, $this->final, true);
			foreach ($interval as $d)
			{
				$this->incrementBlockedDate($d, $last_valid_to, $this->final);
			}
		}

		ksort($this->blocked);
	}

	/**
	 * Set rates for property
	 *
	 * @param   array  $rates  Rates array
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setRates(array $rates = []): void
	{
		if (is_countable($rates) && count($rates))
		{
			$this->rates = $rates;
		}
		else
		{
			$this->rates = KrFactory::getListModel('rates')
			                        ->getRatesForProperty($this->property_id, $this->first, $this->final);
		}
	}

	/**
	 * Get array of all non changeover dates for weekly rates
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function setWeekly(): void
	{
		foreach ($this->rates as $r)
		{
			if ($r->min_guests == 1)
			{
				$dates = TickTock::allDatesBetween($r->valid_from, TickTock::modifyDays($r->valid_to));
				foreach ($dates as $date)
				{
					if ($date >= $this->first && $date <= $this->final)
					{
						if ($r->start_day < 7 && TickTock::getDow($date) != $r->start_day)
						{
							$this->weekly[$date] = $date;
						}
					}
				}
			}
		}
	}
}