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

use function count;
use function defined;

/**
 * Calendar for search results
 *
 * @since 3.4.0
 */
class Search extends Calendar
{
	/**
	 * Initialise
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $arrive       Arrival date Y-m-d
	 * @param   string  $depart       Departure date Y-m-d
	 * @param   array   $rates        Property rates
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, string $arrive, string $depart, array $rates = [])
	{
		parent::__construct($property_id, $arrive, $depart, 0, 0, $rates);
	}

	/**
	 * Check availability for search
	 *
	 * @throws Exception
	 * @since  3.4.0
	 * @return bool
	 */
	public function checkSearchDates(): bool
	{
		$nights = count($this->range) - 1;

		if (!count($this->rates))
		{
			$params = KrMethods::getParams();
			if ($params->get('calendar_norates', 0))
			{
				return false;
			}

			return $this->checkFreeDate($this->first, $nights);
		}

		$this->getMinstay();
		$this->getMaxstay();
		if (!isset($this->minstay[$this->first]) || !isset($this->maxstay[$this->first]))
		{
			return false;
		}
		if ($nights < $this->minstay[$this->first] || $nights > $this->maxstay[$this->first])
		{
			return false;
		}

		$this->getAvailability();
		$this->getChangeOvers(false);
		$this->getWeekly();

		foreach ($this->range as $date)
		{
			if ($date == $this->first && $this->changeovers[$date] != 'C' && $this->changeovers[$date] != 'I')
			{
				return false;
			}
			else if ($this->changeovers[$date] == 'X' && isset($this->weekly[$date])
				&& $this->availability[$date] == 'N')
			{
				return false;
			}
			else if ($this->changeovers[$date] == 'X' && !isset($this->weekly[$date]))
			{
				return false;
			}
			if ($date == $this->final && $this->changeovers[$date] != 'C' && $this->changeovers[$date] != 'O')
			{
				return false;
			}
		}

		return $this->checkFreeDate($this->first, $nights);
	}
}