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
 * Calendar for search results
 *
 * @since 3.4.0
 */
class Quote extends Calendar
{
	/**
	 * Initialise
	 *
	 * @param   int     $property_id  ID of property
	 * @param   string  $first        From date Y-m-d
	 * @param   string  $final        End date Y-m-d
	 *
	 * @throws Exception
	 * @since  3.4.0
	 */
	public function __construct(int $property_id, string $first, string $final)
	{
		parent::__construct($property_id, $first, $final);
	}
}