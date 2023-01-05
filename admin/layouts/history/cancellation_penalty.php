<?php

/**
 * @package     Know Reservations
 * @subpackage  Admin Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

if (!$displayData['data'])
{
	return;
}

$data = Utility::arrayToObject($displayData['data']);
if (count($data))
{
	$days = KrMethods::plain('COM_KNOWRES_DAYS');
	$all  = [];

	foreach ($data as $d)
	{
		$parts = [];

		if ($d['cancellation_penalty_from'] > 0 || $d['cancellation_penalty_to'] > 0)
		{
			$parts[] = $d['cancellation_penalty_from'] . "-" . $d['cancellation_penalty_to'];
			$parts[] = $days;
			$parts[] = $d['cancellation_penalty_pc'] . "%";

			$all[] = implode(" ", $parts);
		}
	}

	echo implode(", ", $all);
}