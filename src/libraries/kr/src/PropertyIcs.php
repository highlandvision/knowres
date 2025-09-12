<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

use DateTime;
use DateTimeZone;
use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Kigkonsult\Icalcreator\Vcalendar;

use function array_unique;
use function count;
use function date;
use function str_replace;
use function strtotime;

defined('_JEXEC') or die;

/**
 * Generate ics file containing dates for property bookings
 *
 * @since 3.3.0
 */
class PropertyIcs
{
	/** @var  Vcalendar Vcalender object */
	protected Vcalendar $Calendar;
	/* @var bool Individual Booking data required */
	protected bool $amalgamate = true;
	/* @var string Name of custom ical */
	protected string $custom = '';
	/** @var  int ID of proeprty */
	protected int $property_id = 0;
	/** @var  string Name of property */
	protected string $property_name = '';

	/**
	 * Initialise
	 *
	 * @param  int     $property_id    Property ID
	 * @param  string  $property_name  Name of property
	 *
	 * @since  3.3.0
	 */
	public function __construct(int $property_id, string $property_name, string $custom = '')
	{
		$this->property_id   = $property_id;
		$this->property_name = $property_name;
		$this->custom        = $custom;

		if ($this->custom == 'split') {
			$this->amalgamate = false;
		}
	}

	/**
	 * Format check in / out times
	 *
	 * @param ?string  $time  Either check in / out time from property
	 *
	 * @since  4.2.0
	 * @return string
	 */
	private static function setCheckTime(?string $time): string
	{
		$new = '000000';
		if (!empty($time)) {
			$new = str_replace(':', '', $time) . '00';
		}

		return $new;
	}

	/**
	 * Create the calendar ics and dispatch
	 *
	 * @param  string  $action  Despatch action dl to download or echo
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function createIcs(string $action): void
	{
		$vconfig = ['unique_id' => KrMethods::getCfg('sitename')
		];

		$this->Calendar = new Vcalendar($vconfig);
		$this->Calendar->setMethod('PUBLISH');
		$this->Calendar->setDescription($this->property_name);

		$booked = $this->getBookedDates();
		if (is_countable($booked) && count($booked)) {
			if ($this->amalgamate) {
				$this->addAmalgamated($booked);
			} else {
				$this->setTimezone();
				foreach ($booked as $b) {
					$this->addBookingEvent($b);
				}
			}
		}

		if ($action == 'dl') {
			$this->Calendar->returnCalendar();
		} else {
			echo $this->Calendar->createCalendar();
		}
	}

	/**
	 * Amalgamate any consercutive bookings and add dates to calendar
	 *
	 * @param  array  $booked  Booked dates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function addAmalgamated(array $booked): void
	{
		$start = false;
		$prev  = false;

		foreach ($booked as $d) {
			if (!$start) {
				$start = $d;
				$prev  = $d;
			}

			$days = TickTock::differenceDays($prev, $d);
			if ($days > 1) {
				$this->addAmalgamatedEvent($start, $prev);
				$start = $d;
			}

			$prev = $d;
		}

		$date = TickTock::getDate();
		if ($start < $date) {
			$start = $date;
		}

		$this->addAmalgamatedEvent($start, $prev);
	}

	/**
	 * Add consecutive amalgaamted booked dates event
	 *
	 * @param  string  $start  Start date
	 * @param  string  $prev   Previous date
	 *
	 * @throws Exception
	 * @since  4.1.0
	 */
	private function addAmalgamatedEvent(string $start, string $prev): void
	{
		$vevent = $this->Calendar->newVevent();
		$vevent->setDtstart(date('Ymd', strtotime($start)), ['VALUE' => 'DATE']);
		$vevent->setDtend(date('Ymd', strtotime($prev . '+1 Days')), ['VALUE' => 'DATE']);
		$vevent->setSummary('Blocked');
		$vevent->setStatus('CONFIRMED');
	}

	/**
	 * Add booking event
	 *
	 * @param  object  $b  Booked dates - contract or black booking
	 *
	 * @throws Exception
	 * @since  4.1.0
	 */
	private function addBookingEvent(object $b): void
	{
		$vevent = $this->Calendar->newVevent();

		$ci = $this->setCheckTime($b->checkin_time);
		$co = $this->setCheckTime($b->checkout_time);

		$vevent->setDtstart(new DateTime($b->arrival . 'T' . $this->setCheckTime($b->checkin_time),
			new DateTimeZone(KrMethods::getCfg('offset'))));
		$vevent->setDtend(new DateTime($b->departure . 'T' . $this->setCheckTime($b->checkout_time),
			new DateTimeZone(KrMethods::getCfg('offset'))));

		if (!empty($b->tag)) {
			$vevent->setComment($b->firstname . ' ' . $b->surname . ' ID:' . $b->tag);
		} else if ($b->black_booking == 1) {
			$vevent->setComment('Block');
		} else if ($b->black_booking == 2) {
			$vevent->setComment('Ical Block');
		}

		$vevent->setStatus('CONFIRMED');
	}

	/**
	 * Get booked dates for property
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return array
	 */
	private function getBookedDates(): array
	{
		$bookings = KrFactory::getListModel('contracts')->getBookedDates($this->property_id);
		$booked   = [];

		if ($this->amalgamate) {
			foreach ($bookings as $b) {
				$dates = TickTock::allDatesBetween($b->arrival, $b->departure, true);
				foreach ($dates as $d) {
					$booked[] = $d;
				}
			}

			return array_unique($booked);
		} else {
			$newtz = $this->Calendar->newVtimezone();
			$newtz->setTzid(KrMethods::getCfg('offset'));

			foreach ($bookings as $b) {
				$booked[] = $b;
			}

			return $booked;
		}
	}

	/**
	 * Set the timezone for booking calendars
	 *
	 * @throws Exception
	 * @since  4.1.0
	 */
	private function setTimeZone(): void
	{
		$this->Calendar->setXprop($this->Calendar::X_WR_TIMEZONE, KrMethods::getCfg('offset'));
	}
}