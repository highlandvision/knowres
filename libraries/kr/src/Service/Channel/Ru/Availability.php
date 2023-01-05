<?php
/**
 * @package     KR
 * @subpackage  Library
 * @copyright   Copyright (c) 2020, Highland Vision. All rights reserved.
 * @license     See the file LICENSE.txt for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

namespace HighlandVision\KR\Service\Channel\Ru;

defined('_JEXEC') or die;

use Exception;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Service\Channel\Ru;
use HighlandVision\KR\TickTock;
use RuntimeException;
use SimpleXMLElement;

use function count;

/**
 * Service channel for bookings
 *
 * @since 1.0.0
 */
class Availability extends Ru
{
	/** @var  array Properties to send dates for */
	protected array $properties = [];

	/**
	 * Constructor.
	 *
	 * @param   bool  $test  TRUE for test
	 *
	 * @throws Exception
	 * @since  2.2.0
	 */
	public function __construct(bool $test = false)
	{
		parent::__construct($test);
	}

	/**
	 * Process the queue, each row holds either a new booking, block or cancellation
	 * Check for new properties and send blocks for booked dates
	 * Only send one set of availability per property
	 *
	 * @param   array  $queue  Queue rowss
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  1.0.0
	 */
	public function processQueue(array $queue)
	{
		$properties = [];

		foreach ($queue as $q)
		{
			$this->errors = [];
			if (!$q->id || !$q->property_id || !$q->foreign_key || (!$q->contract_id && $q->method == ''))
			{
				$this->errors[] = KrMethods::sprintf('COM_KNOWRES_THROW_MISSING_PARAMETER', 'queue');
				$this->addLog(false);
				$this->queue_ids[] = $q->id;
				continue;
			}

			if (!in_array($q->property_id, $this->properties))
			{
				$properties[$q->property_id] = ['foreign_key' => $q->foreign_key,
				                                'queue_id'    => $q->id
				];
			}
			else
			{
				$this->queue_ids[] = $q->id;
			}
		}

		// Set duplicate properties and / or errors to actioned
		$this->setQueueActioned();
		if (!count($properties))
		{
			return;
		}

		$this->queue_ids = [];
		foreach ($properties as $p => $d)
		{
			$this->properties[] = $p;
			$this->xrefs[$p]    = $d['foreign_key'];
			$this->queue[$p]    = $d['queue_id'];
			$this->queue_ids[]  = $d['queue_id'];
		}

		$this->doAvailability();
		$this->setQueueActioned();
	}

	/**
	 * Send availability for all supplied properties
	 *
	 * @param   array  $properties  Property IDs to be processed
	 * @param   array  $xrefs       Property xrefs
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	public function sendForProperties(array $properties, array $xrefs)
	{
		$this->properties[] = $properties;
		$this->xrefs[$p]    = $xrefs;

		$this->doAvailability();
	}

	/**
	 * Process the availability for properties
	 *
	 * @throws RuntimeException
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function doAvailability()
	{
		$settings = KrFactory::getListModel('propertysettings')->getPropertysettings(0, 'advanceBookingsLimit');

		foreach ($this->properties as $p)
		{
			$this->property_id = $p;
			$this->setDates($this->today, $this->max_nights, $settings[$p] ?? $this->max_nights);
			$dates = $this->getDates();
			$this->sendAvailability($dates);
		}
	}

	/**
	 * Format array of booked date ranges
	 *
	 * @throws Exception
	 * @since  3.3.4
	 * @return array
	 */
	protected function getDates(): array
	{
		$dates     = [];
		$arrival   = '';
		$departure = false;

		$booked = KrFactory::getListModel('contracts')->getBookedDates($this->property_id, $this->first);
		if (!count($booked))
		{
			return $this->mergeFreeDates($dates);
		}

		foreach ($booked as $b)
		{
			if (!$departure)
			{
				$arrival   = $b->arrival;
				$departure = $b->departure;
			}
			else if ($b->arrival == $departure)
			{
				$departure = $b->departure;
			}
			else
			{
				$dates[$arrival] = ['arrival'      => $arrival,
				                    'departure'    => $departure,
				                    'availability' => 0];

				$arrival   = $b->arrival;
				$departure = $b->departure;
			}
		}

		$dates[$arrival] = ['arrival'      => $arrival,
		                    'departure'    => $departure,
		                    'availability' => 0];

		return $this->mergeFreeDates($dates);
	}

	/**
	 * Merge booked with free dates
	 *
	 * @param   array  $booked  Booked dates
	 *
	 * @since  3.3.1
	 * @return array
	 */
	protected function mergeFreeDates(array $booked): array
	{
		$start = $this->first;

		foreach ($booked as $v)
		{
			if ($start < $v['arrival'])
			{
				$end            = min($v['arrival'], $this->final);
				$booked[$start] = [
					'arrival'      => $start,
					'departure'    => $end,
					'availability' => 1
				];
			}

			$start = $v['departure'];
			if ($start >= $this->final)
			{
				break;
			}
		}

		if ($start < $this->final)
		{
			$booked[$start] = [
				'arrival'      => $start,
				'departure'    => $this->final,
				'availability' => 1
			];
		}

		ksort($booked);

		return $booked;
	}

	/**
	 * Push availability
	 *
	 * @param   array  $dates  Availability
	 *
	 * @throws Exception
	 * @since  2.2.0
	 * @return SimpleXmlElement
	 */
	protected function pushAvailability(array $dates): SimpleXMLElement
	{
		$xml = new SimpleXMLElement('<Push_PutAvb_RQ></Push_PutAvb_RQ>');
		$xml = $this->addAuthentication($xml);

		$calendarXml = $xml->addChild('Calendar');
		$calendarXml->addAttribute('PropertyID', $this->foreign_key);
		foreach ($dates as $d)
		{
			if ($d['availability'])
			{
				$availabilityXml = $calendarXml->addChild('Availability', 'true');
			}
			else
			{
				$availabilityXml = $calendarXml->addChild('Availability', 'false');
			}

			$availabilityXml->addAttribute('DateFrom', $d['arrival']);
			$availabilityXml->addAttribute('DateTo', TickTock::modifyDays($d['departure'], 1, '-'));
		}

		return $this->sendXml($xml, 'Push_PutAvb_RQ');
	}

	/**
	 * Send the availability
	 *
	 * @param   array  $dates  Booked and free date ranges
	 *
	 * @throws Exception
	 * @since  3.3.1
	 */
	protected function sendAvailability(array $dates)
	{
		$this->foreign_key = $this->xrefs[$this->property_id];
		$this->queue_id    = $this->queue[$this->property_id];

		try
		{
			$simple = $this->pushAvailability($dates);
		}
		catch (Exception $e)
		{
			$this->messages[] = $e->getMessage();
			$this->addLog(false);

			return;
		}

		$this->checkNotifs($simple);
		if (count($this->messages))
		{
			$this->addLog(false);
		}
	}
}