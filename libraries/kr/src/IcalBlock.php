<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR;

defined('_JEXEC') or die;

use DateTime;
use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use InvalidArgumentException;
use Kigkonsult\Icalcreator\IcalInterface;
use Kigkonsult\Icalcreator\Vcalendar;
use Kigkonsult\Icalcreator\Vevent;
use RuntimeException;
use stdClass;

use function count;
use function defined;
use function file_get_contents;
use function in_array;
use function is_null;
use function json_encode;
use function ksort;
use function trim;

//TODO v4.1 Check if blocks can be entered as is and just ignored for booked dates on calendar

/**
 * Create blocks for Ical import
 */
class IcalBlock
{
	/** @var array Event arrival dates */
	protected array $arrivals = [];
	/** @var array New blocks for upddate */
	protected array $blocks = [];
	/** @var array Event departure dates */
	protected array $departures = [];
	/** @var string ICS file directory */
	protected string $directory = '';
	/** @var array Validated event dates and vevent data */
	protected array $events = [];
	/** @var array Basic event dates and data */
	protected array $event_ranges = [];
	/** @var string ics file name */
	protected string $filename = '';
	/** @var ?string ics data from previous run */
	protected ?string $previous_date_ranges = '';
	/** @var array Messages */
	protected array $messages = [];
	/** @var array New ICS date ranges */
	protected array $new_date_ranges = [];
	/** @var integer ID of service */
	protected int $service_id = 0;
	/** @var Vcalendar Vcalendar object */
	protected Vcalendar $calendar;
	/** @var array Validated events */
	protected array $vevents = [];

	/**
	 * Constructor.
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $directory    The directory location of the ical file
	 * @param   string  $filename     The ical file name
	 * @param   int     $service_id   ID of Service
	 * @param  ?string  $icsdata      ics data from previous run
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	public function __construct(int $property_id, string $directory, string $filename, int $service_id = 0,
		?string $icsdata = '')
	{
		$this->property_id          = $property_id;
		$this->directory            = $directory;
		$this->filename             = $filename;
		$this->service_id           = $service_id;
		$this->previous_date_ranges = $icsdata;
		$this->today                = TickTock::getDate();
	}

	/**
	 * Get messages
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public function getMessages(): array
	{
		return $this->messages;
	}

	/**
	 * Import calendar data
	 *
	 * @throws Exception
	 * @since  1.0.0
	 * @return string
	 */
	public function import(): string
	{
		$this->validateFile();
		$this->validateEvents();

		if ($this->checkForNewEvents())
		{
			$this->formatEvents();
			$this->buildBlocks();
			KrFactory::getAdminModel('icalblock')
			         ->refreshIcalBlocks($this->property_id, $this->blocks, $this->service_id);
			KrFactory::getAdminModel('servicequeue')::serviceQueueUpdate('updateAvailability', $this->property_id);
		}

		return !empty($this->new_date_ranges) ? json_encode($this->new_date_ranges) : $this->previous_date_ranges;
	}

	/**
	 * Prepare ical blocks from event data
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	protected function buildBlocks(): void
	{
		foreach ($this->event_ranges as $data)
		{
			$this->buildBlock($data);
		}
	}

	/**
	 * Prepare a new ical block
	 *
	 * @param   object  $data  Block data object
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function buildBlock(object $data): void
	{
		$this->messages[] = '----Arrival: ' . $data->arrival;
		$this->messages[] = '--Departure: ' . $data->departure;

		//		$booked = KrFactory::getListModel('contracts')
		//		                   ->getPropertyAvailableDates($this->property_id, $data->arrival, $data->departure);

		//		if (!count($booked))
		//		{
		$this->updateBlock($data);
		$this->messages[] = 'New iCal block created';

		return;
		//		}

		//		foreach ($booked as $b)
		//		{
		//			if ($data->arrival == $b->arrival && $data->departure == $b->departure)
		//			{
		//				$this->messages[] = 'Property booked and dates match - block ignored';
		//
		//				return;
		//			}
		//		}
		//
		//		$this->buildConcatenatedBlock($data, $booked);
	}

	/**
	 * Check for interlaced bookings and blocks
	 * i.e. a string of separate bookings that are concatenated into one vEvent
	 *
	 * @param   object  $data    Ical event data
	 * @param   array   $booked  Booked dates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function buildConcatenatedBlock(object $data, array $booked): void
	{
		$block_dates      = [];
		$block_start      = $data->arrival;
		$block_end        = $data->departure;
		$this->messages[] = 'Concatenated iCal block received from ' . TickTock::displayDate($block_start) . ' to '
			. TickTock::displayDate($block_end);

		// Create block for any unblocked dates
		foreach ($booked as $b)
		{
			if ($block_start < $b->arrival)
			{
				$block_dates[$block_start] = $b->arrival;
			}

			$block_start = $b->departure;
		}

		// Check the iCal departure date if we have found a booking
		if ($block_start != $data->arrival && $block_end > $block_start)
		{
			$block_dates[$block_start] = $block_end;
		}

		if (count($block_dates))
		{
			foreach ($block_dates as $arrival => $departure)
			{
				if ($departure < $this->today)
				{
					continue;
				}
				if ($arrival < $departure)
				{
					$this->updateBlock($data, $arrival, $departure);
					$this->messages[] = 'Partial iCal block created from ' . TickTock::displayDate($arrival) . ' to '
						. TickTock::displayDate($departure);
				}
			}
		}
	}

	/**
	 * Generate Y-m-d from ical date
	 *
	 * @param   DateTime  $date  Date timestamp
	 *
	 * @throws Exception
	 * @since  3.3.0
	 * @return string
	 */
	protected function formatDate(DateTime $date): string
	{
		return $date->format('Y-m-d');
	}

	/**
	 * Format vevent into data for a block
	 *
	 * @param   Vevent  $vevent  Ical event
	 *
	 * @throws Exception
	 * @since   3.3.0
	 */
	protected function formatEvent(Vevent $vevent): void
	{
		$dtend = $this->formatDate($vevent->getDtend());
		if ($dtend < $this->today)
		{
			return;
		}

		$dtstart            = $this->formatDate($vevent->getDtstart());
		$this->arrivals[]   = $dtstart;
		$this->departures[] = $dtend;
		$range              = TickTock::allDatesBetween($dtstart, $dtend);

		foreach ($range as $d)
		{
			$this->events[$d]['new'] = false;
			if ($dtstart == $d)
			{
				$this->events[$d]['new'] = true;
			}

			$this->events[$d]['arrival']     = $d;
			$this->events[$d]['uid']         = $vevent->getUid();
			$this->events[$d]['summary']     = $vevent->getSummary();
			$description                     = $vevent->getDescription();
			$this->events[$d]['description'] = !empty($description) ? $description : '';
		}
	}

	/**
	 * Remove duplicate dates
	 *
	 * @throws Exception
	 * @since  3.3.0
	 */
	protected function formatEventRanges(): void
	{
		ksort($this->events);
		$arrival  = false;
		$previous = false;

		foreach ($this->events as $date => $dsc)
		{
			if ($arrival)
			{
				$days = TickTock::differenceDays($previous, $date);
				if ($days == 1 && !$dsc['new'])
				{
					$previous = $date;
					continue;
				}

				if (in_array($date, $this->arrivals) && in_array($date, $this->departures))
				{
					$tmp->departure = $date;
				}
				else
				{
					$tmp->departure = $dsc['new'] || $days == 1 ? $previous : $date;
				}
				$this->event_ranges[] = $tmp;
			}

			$arrival  = $date;
			$previous = $date;

			$tmp              = new stdClass();
			$tmp->arrival     = $arrival;
			$tmp->uid         = $dsc['uid'];
			$tmp->summary     = trim($dsc['summary']);
			$tmp->description = trim($dsc['description']);
		}

		$tmp->departure       = $previous;
		$this->event_ranges[] = $tmp;
	}

	/**
	 * Format vevents for update
	 *
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function formatEvents(): void
	{
		foreach ($this->vevents as $vevent)
		{
			$this->formatEvent($vevent);
		}
		if (count($this->events))
		{
			$this->formatEventRanges();
		}
	}

	/**
	 * Set the block note text
	 *
	 * @param   object  $event  Block data
	 *
	 * @since  3.3.0
	 * @return string
	 */
	protected function setNote(object $event): string
	{
		$summary     = $event->summary ?? '';
		$description = $event->description ?? '';
		if ($summary === $description)
		{
			$description = '';
		}

		$note = $event->uid;
		$note .= ' ' . $summary;
		$note .= ' ' . $description;

		return trim($note);
	}

	/**
	 * Prepare the new block
	 *
	 * @param   object       $data       Block data
	 * @param   string|null  $arrival    Override ical arrival date
	 * @param   string|null  $departure  Override ical departure date
	 *
	 * @throws Exception
	 * @since  3.0.0
	 * @return void
	 */
	protected function updateBlock(object $data, string $arrival = null, string $departure = null): void
	{
		$block              = new stdClass();
		$block->id          = 0;
		$block->service_id  = $this->service_id;
		$block->property_id = $this->property_id;
		$block->arrival     = !is_null($arrival) ? $arrival : $data->arrival;
		$block->departure   = !is_null($departure) ? $departure : $data->departure;
		$block->note        = $this->setNote($data);
		$block->created_at  = TickTock::getTS();
		$this->blocks[]     = $block;
	}

	/**
	 * Validate an ical vevent
	 *
	 * @param   bool|Vevent  $vevent  Event data
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since 1.0.0
	 */
	protected function validateEvent(bool|Vevent $vevent): void
	{
		$departure = $this->formatDate($vevent->getDtend());
		if (empty($departure))
		{
			throw new RuntimeException('Error: Event departure date missing from ics file');
		}
		if ($departure < $this->today)
		{
			return;
		}

		$arrival = $this->formatDate($vevent->getDtstart());
		if (empty($arrival))
		{
			throw new RuntimeException('Error: Event arrival date missing from ics file');
		}

		if ($arrival > $departure)
		{
			throw new RuntimeException('ERROR: Event arrival date is on or after departure date');
		}

		$this->vevents[]                 = $vevent;
		$this->new_date_ranges[$arrival] = $departure;
	}

	/**
	 * Validate calendar events
	 *
	 * @throws RuntimeException|Exception
	 */
	protected function validateEvents(): void
	{
		while (true)
		{
			$vevent = $this->calendar->getComponent(IcalInterface::VEVENT);
			if (empty($vevent))
			{
				break;
			}

			$this->validateEvent($vevent);
		}
	}

	/**
	 * Validate calendar file
	 *
	 * @throws InvalidArgumentException
	 * @throws Exception
	 */
	protected function validateFile(): void
	{
		$this->calendar = new Vcalendar([IcalInterface::UNIQUE_ID => KrMethods::getCfg('sitename')]);

		try
		{
			$data = file_get_contents($this->directory . $this->filename);
			$this->calendar->parse($data);
		}
		catch (Exception $e)
		{
			$message = 'Calendar file for property ' . $this->property_id . ' failed validation';
			$message .= ' Error: ' . $e->getMessage();

			throw new InvalidArgumentException($message);
		}
	}

	/**
	 * Match calendar file events with previous file events
	 *
	 * @since  3.3.1
	 * @return bool
	 */
	protected function checkForNewEvents(): bool
	{
		if (json_encode($this->new_date_ranges) == $this->previous_date_ranges)
		{
			return false;
		}

		return true;
	}
}