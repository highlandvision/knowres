<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var array $data Layout data.
 */

if (empty($data))
{
	return;
}

$data = Utility::arrayToObject($data);
if (is_countable($data))
{
	$allbedtypes = KrFactory::getListModel('bedtypes')->getAll();
	if (!count($allbedtypes))
	{
		return;
	}

	$Translations = new Translations();
	foreach ($data as $d)
	{
		$text      = 'COM_KNOWRES_BEDTYPE_' . $d['room_id'];
		$bed_types = $d['bed_types'];
		$first     = true;

		foreach ($allbedtypes as $b)
		{
			$parts      = [];
			$bed_number = 0;
			if (isset($bed_types[$b->id]))
			{
				$bed_number = $bed_types[$b->id]['bed_number'];
			}

			for ($n = 0; $n < $bed_number; $n++)
			{
				if ($first)
				{
					if (!$d['room_number'])
					{
						$parts[] = KrMethods::plain($text);
					}
					else
					{
						$parts[] = KrMethods::plain($text) . ' ' . $d['room_number'];
					}
					$first = false;
				}

				$parts[] = $Translations->getText('bedtype', $b->id);
			}

			if (count($parts))
			{
				echo implode(' ', $parts) . '<br>';
			}
		}
	}
}