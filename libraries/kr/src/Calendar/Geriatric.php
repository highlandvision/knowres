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
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;

use function defined;

/**
 * Geriatric calendar
 *
 * @since 3.4.0
 */
class Geriatric extends Calendar
{
	/** @var array Confirmed dates */
	protected array $confirmed = [];

	/**
	 * Initialise
	 *
	 * @param  int     $property_id  ID of property
	 * @param  string  $first        First display date
	 * @param  string  $final        Final display date
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, string $first, string $final)
	{
		parent::__construct($property_id, $first, $final);
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
	 * Set booked dates from contracts and icals
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return array
	 */
	public function getConfirmedDates(): array
	{
		return $this->confirmed;
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
				$paid   = !($b->booking_status < 10) || $b->black_booking;
				foreach ($bdates as $d)
				{
					$this->incrementBlockedDate($d, $b->arrival, $b->departure, false, $paid);
				}
			}
		}

		$params = KrMethods::getParams();
		if ($params->get('calendar_norates', 0) && $this->booking_type > 0)
		{
			$this->setRateBlocks();
		}

		$this->blocked_done = true;
	}

	/**
	 * Update blocked dates
	 *
	 * @param  string  $d             Blocked date being processed
	 * @param  string  $first         Date of first block
	 * @param  string  $last          Date of last block
	 * @param  bool    $check_frozen  Set false to ignore frozen
	 * @param  bool    $paid          Set true for paid reservationsn
	 *
	 * @since  3.4.0
	 */
	protected function incrementBlockedDate(string $d, string $first, string $last, bool $check_frozen = true,
		bool $paid = true): void
	{
		if (isset($this->frozen[$d]))
		{
			return;
		}

		if (isset($this->confirmed[$d]))
		{
			$astate = $this->confirmed[$d]['astate'];
			$dstate = $this->confirmed[$d]['dstate'];
			$bstate = $this->confirmed[$d]['bstate'];
		}
		else
		{
			$astate = false;
			$dstate = false;
			$bstate = false;
		}

		if ($d >= $this->first)
		{
			if ($d === $first)
			{
				$this->incrementBlocked($d, 1);
				$astate = $paid;
			}
			else if ($d === $last)
			{
				$this->incrementBlocked($d, 2);
				$dstate = $paid;
			}
			else
			{
				$this->incrementBlocked($d, 0);
				$bstate = $paid;
			}

			$this->confirmed[$d] = [
				'astate' => $astate,
				'dstate' => $dstate,
				'bstate' => $bstate
			];
		}
	}
}