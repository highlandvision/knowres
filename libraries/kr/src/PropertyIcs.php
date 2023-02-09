<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Model
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Kigkonsult\Icalcreator\Vcalendar;

use function array_unique;
use function count;
use function date;
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
	/** @var  int ID of proeprty */
	protected int $property_id = 0;
	/** @var  string Name of proeprty */
	protected string $property_name = '';

	/**
	 * Initialise
	 *
	 * @param  int     $property_id    Property ID
	 * @param  string  $property_name  Name of property
	 *
	 * @since 3.3.0
	 */
	public function __construct(int $property_id, string $property_name)
	{
		$this->property_id   = $property_id;
		$this->property_name = $property_name;
	}

	/**
	 * Create the calendar ics and dispatch
	 *
	 * @param  string  $action  Despatch action 'dl to download or echo
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function createIcs(string $action): void
	{
		$booked = $this->getBookedDates();

		$vconfig = [
			'unique_id' => KrMethods::getCfg('sitename')
		];

		$this->Calendar = new Vcalendar($vconfig);
		$this->Calendar->setMethod('PUBLISH');
		$this->Calendar->setDescription($this->property_name);

		if (is_countable($booked) && count($booked))
		{
			$this->addBookedDates($booked);
		}

		if ($action == 'dl')
		{
			$this->Calendar->returnCalendar();
		}
		else
		{
			echo $this->Calendar->createCalendar();
		}
	}

	/**
	 * Add booked dates to calendar
	 *
	 * @param  array  $booked  Booked dates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	private function addBookedDates(array $booked)
	{
		$start = false;
		$prev  = false;

		foreach ($booked as $d)
		{
			if (!$start)
			{
				$start = $d;
				$prev  = $d;
			}

			$days = TickTock::differenceDays($prev, $d);
			if ($days > 1)
			{
				$vevent = $this->Calendar->newVevent();
				$vevent->setDtstart(date('Ymd', strtotime($start)), array('VALUE' => 'DATE'));
				$vevent->setDtend(date('Ymd', strtotime($prev . '+1 Days')), array('VALUE' => 'DATE'));
				$vevent->setSummary('Blocked');
				$vevent->setStatus('CONFIRMED');

				$start = $d;
			}

			$prev = $d;
		}

		$date = TickTock::getDate();
		if ($start < $date)
		{
			$start = $date;
		}

		$vevent = $this->Calendar->newVevent();
		$vevent->setDtstart(date('Ymd', strtotime($start)), array('VALUE' => 'DATE'));
		$vevent->setDtend(date('Ymd', strtotime($prev . '+1 Days')), array('VALUE' => 'DATE'));
		$vevent->setSummary('Blocked');
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
		foreach ($bookings as $b)
		{
			$dates = TickTock::allDatesBetween($b->arrival, $b->departure, true);
			foreach ($dates as $d)
			{
				$booked[] = $d;
			}
		}

		return array_unique($booked);
	}
}