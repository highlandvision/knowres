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

		if ($d['checkin_fees_amount'] > 0)
		{
			$parts[] = $d['checkin_fees_from'] . "-" . $d['checkin_fees_to'];
			$parts[] = Utility::displayMoney($d['checkin_fees_amount']);

			$all[] = implode(" ", $parts);
		}
	}

	echo implode(", ", $all);
}