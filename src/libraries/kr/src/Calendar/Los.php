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

use function defined;

/**
 * Data for los rates calculations
 *
 * @since 3.4.0
 */
class Los extends Calendar {
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
	 * Check if date is a valid changeover day for weekly rates
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
}