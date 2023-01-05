<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

defined('_JEXEC') or die;

foreach ($this->stats as $p => $d)
{
	$table         = [];
	$table['cols'] = [
		[
			'label' => KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_SOURCE'),
			'type'  => 'string'
		],
		[
			'label' => KrMethods::plain('COM_KNOWRES_MENU_PROPERTY_STATISTICS_REVENUE'),
			'type'  => 'number'
		]
	];

	$first = true;
	$rows  = [];

	foreach ($d as $type => $value)
	{
		if (!$first)
		{
			$temp   = [];
			$temp[] = array('v' => $type);
			$temp[] = array('v' => (float) $value[2]);
			$rows[] = array('c' => $temp);
		}
		else
		{
			$first = false;
		}

		$table['rows'] = $rows;

		if ($p == 'day')
		{
			$day = Utility::encodeJson($table);
		}
		else if ($p == 'week')
		{
			$week = Utility::encodeJson($table);
		}
		else if ($p == 'month')
		{
			$month = Utility::encodeJson($table);
		}
		else if ($p == 'year')
		{
			$year = Utility::encodeJson($table);
		}
	}
}
?>

<div id="kr-stats-data" data-day='<?php echo $day; ?>' data-week='<?php echo $week; ?>'
     data-month='<?php echo $month; ?>'
     data-year='<?php echo $year; ?>'>
</div>