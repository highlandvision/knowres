<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (C) 2020 Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Carbon\CarbonTimeZone;
use Carbon\Exceptions\InvalidFormatException;
use Exception as Exception;
use HighlandVision\KR\Framework\KrMethods;

use function count;
use function date_default_timezone_set;
use function gmdate;

date_default_timezone_set('UTC');

/**
 * KR Date time helper functions
 *
 * @since  3.3.0
 */
class TickTock
{
	/**
	 * Returns an array with all dates between and including the two entered dates
	 *
	 * @param  string  $first       Start date
	 * @param  string  $last        End date
	 * @param  bool    $ignoreLast  TRUE ignore the end date
	 *
	 * @since   3.3.0
	 * @return  array
	 */
	public static function allDatesBetween(string $first, string $last, bool $ignoreLast = false): array
	{
		$dates = [];

		if (!$first || !$last || $last < $first) {
			return $dates;
		}

		if (!$ignoreLast) {
			$period = CarbonPeriod::create($first, $last);
		}
		else {
			$period = CarbonPeriod::create($first, $last, CarbonPeriod::EXCLUDE_END_DATE);
		}

		foreach ($period as $d) {
			$dates[] = $d->toDateString();
		}

		return $dates;
	}

	/**
	 * Returns an array with all dates and day numbers between two entered dates
	 *
	 * @param  string  $first       Start date
	 * @param  string  $last        End date
	 * @param  bool    $ignoreLast  TRUE Ignore the end date
	 *
	 * @since  3.3.0
	 * @return array
	 */
	public static function allDowBetween(string $first, string $last, bool $ignoreLast = false): array
	{
		$dow = [];
		if (!$first || !$last || $last < $first) {
			return $dow;
		}

		if (!$ignoreLast) {
			$period = CarbonPeriod::create($first, $last);
		}
		else {
			$period = CarbonPeriod::create($first, $last, CarbonPeriod::EXCLUDE_END_DATE);
		}

		foreach ($period as $d) {
			$dow[$d->format('Y-m-d')] = $d->format('w');
		}

		return $dow;
	}

	/**
	 * Returns the difference in days between two dates
	 *
	 * @param  string  $date1  First date
	 * @param  string  $date2  End date
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return int
	 */
	public static function differenceDays(string $date1, string $date2): int
	{
		try {
			$start = new Carbon($date1);

			return $start->diffInDays($date2);
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());

			return 999;
		}
	}

	/**
	 * Convert date for output display
	 * Only use for fields with dates already set
	 *
	 * @param  ?string  $date    Date for conversion yyyy-mm-dd
	 * @param  string   $format  Required date format
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string Date object on success empty string on failure
	 */
	public static function displayDate(?string $date, string $format = ''): string
	{
		try {
			if (empty($format)) {
				$format = KrMethods::plain('DATE_FORMAT_LC3');
			}

			if ($date && $date != '0000-00-00') {
				$dt = new Carbon($date);

				return $dt->format($format);
			}
			else {
				return '';
			}
		} catch (Exception $e) {
			Logger::logMe($e->getMessage());

			return '';
		}
	}

	/**
	 * Convert timestamp for output display
	 *
	 * @param  ?string  $ts      Timestamp
	 * @param  string   $format  Format required
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string Date object on success, empty string on failure
	 */
	public static function displayTS(?string $ts, string $format = 'j M Y @ H:i:s'): string
	{
		if (empty($ts) || $ts == '0000-00-00 00:00:00') {
			return '';
		}

		$date     = Carbon::createFromFormat('Y-m-d H:i:s', $ts, 'UTC');
		$date->tz = self::setTimeZone();

		return $date->format($format);
	}

	/**
	 * Get date
	 *
	 * @param  string  $string  Date required or empty for current date
	 * @param  string  $format  Return format Date format required
	 * @param  string  $tz      Timezone
	 *
	 * @throws InvalidFormatException
	 * @since  3.3.0
	 * @return string
	 */
	public static function getDate(string $string = 'now', string $format = 'Y-m-d', string $tz = 'UTC'): string
	{
		//TODO-v4.4 should default timezone be based on agency location
		$date = new Carbon($string, $tz);

		return $date->format($format);
	}

	/**
	 * Get date for a different timezone
	 *
	 * @param  string  $format  Return format Date format required
	 * @param  string  $tz      Timezone
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getDateForTimezone(string $format = 'Y-m-d', string $tz = 'Europe/Madrid'): string
	{
		$timestamp = self::getDate('now', 'Y-m-d H:i:s');
		try {
			$date = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $tz);
		} catch (Exception) {
			$date = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, 'Europe/Madrid');
		}

		return $date->format($format);
	}

	/**
	 * Return day name from day of week
	 *
	 * @param  int  $dow  Day of week
	 *
	 * @since  3.3.0
	 * @return string
	 */
	public static function getDayName(int $dow): string
	{
		$day_name = '';

		switch ($dow) {
			case 0:
				$day_name = KrMethods::plain('COM_KNOWRES_SUNDAY');
				break;
			case 1:
				$day_name = KrMethods::plain('COM_KNOWRES_MONDAY');
				break;
			case 2:
				$day_name = KrMethods::plain('COM_KNOWRES_TUESDAY');
				break;
			case 3:
				$day_name = KrMethods::plain('COM_KNOWRES_WEDNESDAY');
				break;
			case 4:
				$day_name = KrMethods::plain('COM_KNOWRES_THURSDAY');
				break;
			case 5:
				$day_name = KrMethods::plain('COM_KNOWRES_FRIDAY');
				break;
			case 6:
				$day_name = KrMethods::plain('COM_KNOWRES_SATURDAY');
				break;
			default:
				break;
		}

		return $day_name;
	}

	/**
	 * Get the dow for a date
	 *
	 * @param  string  $date  Date to manipulate
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getDow(string $date): string
	{
		$date = new Carbon($date);

		return $date->format('w');
	}

	/**
	 * Calculate new expiry or balance date
	 *
	 * @param  string  $weekendDays  Comma separated string of days
	 * @param  int     $days         Number of days to push the date forward
	 * @param  string  $date         Start date Y-m-d format, today will be used if not given
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getDueDate(string $weekendDays, int $days, string $date = ''): string
	{
		if (!$date) {
			$date = Carbon::today();
		}
		else {
			$date = new Carbon($date);
		}

		$dow = [];
		if ($weekendDays) {
			$dow = explode(',', $weekendDays);
		}

		$count = 0;
		while ($count < $days) {
			$date = $date->addDay();
			if (!in_array($date->dayOfWeek, $dow)) {
				$count++;
			}
		}

		return $date->toDateString();
	}

	/**
	 * Get midnight
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getMidnight(): string
	{
		return self::getDate() . ' 00:00:00';
	}

	/**
	 * Return database timestamp
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function getTS(): string
	{
		return gmdate('Y-m-d H:i:s', time());
	}

	/**
	 * Validate for a valid yyyy-mm-dd Date
	 *
	 * @param  string  $date  Date as yyyy-mm-dd
	 *
	 * @since  3.3.0
	 * @return bool
	 */
	public static function isValidDate(string $date): bool
	{
		$tmp = explode('-', $date);

		if (!is_countable($tmp) || count($tmp) <> 3) {
			return false;
		}

		if (!is_numeric($tmp[0]) || !is_numeric($tmp[1]) || !is_numeric($tmp[2])) {
			return false;
		}

		return checkdate((int) $tmp[1], (int) $tmp[2], (int) $tmp[0]);
	}

	/**
	 * Add number of days to date
	 *
	 * @param  string  $date    Date to be used as base yyyy-mm-dd
	 * @param  int     $days    Number of days to add or subtract
	 * @param  string  $sign    + or - to date
	 * @param  string  $format  Output format
	 *
	 * @throws InvalidFormatException
	 * @since  3.3.0
	 * @return string
	 */
	public static function modifyDays(string $date = 'now', int $days = 1, string $sign = '+',
		string $format = 'Y-m-d'): string
	{
		$date = new Carbon($date);
		if ($sign == '+') {
			$date->addDays($days);
		}
		else {
			$date->subDays($days);
		}

		return $date->format($format);
	}

	/**
	 * Add or subtract number of hours to or from timestamp
	 *
	 * @param  string  $ts      Timestamp to be used as base Y-m-d H:i:s
	 * @param  int     $hours   Hours to add or subtract
	 * @param  string  $sign    + to add or - to subtract from date
	 * @param  string  $format  Output format
	 *
	 * @throws InvalidFormatException
	 * @since  3.3.0
	 * @return string
	 */
	public static function modifyHours(string $ts = 'now', int $hours = 1, string $sign = '+',
		string $format = 'Y-m-d H:i:s'): string
	{
		$date = new Carbon($ts);
		if ($sign == '+') {
			$date->addHours($hours);
		}
		else {
			$date->subHours($hours);
		}

		return $date->format($format);
	}

	/**
	 * Add number of months to date
	 *
	 * @param  string  $date    Date to be used as base yyyy-mm-dd
	 * @param  int     $months  Months to increment or subtract
	 * @param  string  $sign    + or - to date
	 * @param  string  $format  Output format
	 *
	 * @throws InvalidFormatException
	 * @since  3.3.0
	 * @return string
	 */
	public static function modifyMonths(string $date = 'now', int $months = 1, string $sign = '+',
		string $format = 'Y-m-d'): string
	{
		$date = new Carbon($date);
		if ($sign == '+') {
			$date->addMonths($months);
		}
		else {
			$date->subMonths($months);
		}

		return $date->format($format);
	}

	/**
	 * Add or subtract number of years to or from date
	 *
	 * @param  string  $date   Date to be used as base yyyy-mm-dd
	 * @param  int     $years  Years to add or subtract
	 * @param  string  $sign   + to add or - to subtract from date
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	public static function modifyYears(string $date = 'now', int $years = 1, string $sign = '+'): string
	{
		$date = new Carbon($date);
		if ($sign == '+') {
			$date->addYears($years);
		}
		else {
			$date->subYears($years);
		}

		return $date->toDateString();
	}

	/**
	 * Get next end of monmth
	 *
	 * @since  3.3.1
	 * @return string
	 */
	public static function getEom(): string
	{
		$date = Carbon::now('UTC');
		$date->addMonth();
		$date->day = 0;

		return $date->toDateString();
	}

	/**
	 * Change the date format
	 *
	 * @param  string  $string  Date string to parse
	 * @param  string  $format  Return format Date format required
	 *
	 * @throws InvalidFormatException
	 * @since  3.3.0
	 * @return string
	 */
	public static function parseString(string $string, string $format = 'Y-m-d'): string
	{
		return Carbon::parse($string)
		             ->setTimezone('UTC')
		             ->format($format);
	}

	/**
	 * Set user timezone
	 *
	 * @throws Exception
	 * @since  3.2.0
	 * @return CarbonTimeZone|string
	 */
	public static function setTimeZone(): CarbonTimeZone|string
	{
		$user = KrMethods::getUser();
		$tz   = $user->getTimezone();
		$name = $tz->getName();
		if ($name) {
			return $name;
		}

		$offset = KrMethods::getCfg('offset', 0);
		if ($offset) {
			$now = Carbon::now($offset);

			return $now->timezone;
		}

		return 'UTC';
	}
}