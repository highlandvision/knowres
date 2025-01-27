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

use Exception;
use HighlandVision\KR\Calendar;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\TickTock;

use function defined;

/**
 * Calendar for search results
 *
 * @since 3.4.0
 */
class Manager extends Calendar
{
	/**
	 * Initialise
	 *
	 * @param  int      $property_id  ID of property
	 * @param  int      $edit_id      ID of contract being edited
	 * @param  ?string  $first        From date Y-m-d
	 * @param  ?string  $final        End date Y-m-d
	 * @param  int      $days         # Days
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, int $edit_id = 0, ?string $first = null, ?string $final = null,
		int $days = 0)
	{
		parent::__construct($property_id, $first, $final, $days, $edit_id);
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
		if ($this->blocked_done)
		{
			return $this->blocked;
		}

		$this->setBlockedDates();

		return $this->blocked;
	}

	/**
	 * Read data for processing
	 *
	 * @param  array  $rates  Rates array
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	protected function getData(array $rates = []): void
	{
		$this->bookings = KrFactory::getListModel('contracts')->getBookedDates($this->property_id);
		$this->settings = KrFactory::getListModel('propertysettings')->getPropertysettings($this->property_id);
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
		$this->getBlockedDates();
		$arrival   = '';
		$departure = '';
		$found     = false;

		foreach ($this->range as $date)
		{
			if ($found)
			{
				if (!isset($this->blocked[$date]))
				{
					$departure = $date;
					break;
				}

				if ($this->blocked[$date] == '2')
				{
					$departure = $date;
					break;
				}

				$found = false;
			}

			if (isset($this->blocked[$date]))
			{
				if ($this->blocked[$date] == '0' || $this->blocked[$date] == '1' || $this->blocked[$date] == '3')
				{
					continue;
				}
			}

			$arrival = $date;
			$found   = true;
		}

		return [$arrival,
		        $departure];
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

		$this->blocked_done = true;
	}

	/**
	 * Set the maximum stay for all dates
	 *
	 * @since  3.4.0
	 */
	protected function setMaxStay(int $days = 0): void
	{
		foreach ($range as $d)
		{
			$this->maxstay[$d] = 365;
		}
	}
}