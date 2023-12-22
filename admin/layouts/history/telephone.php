<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file 'LICENSE.txt' for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Utility;

defined('_JEXEC') or die;

if (!$displayData['data']) {
	return;
}
//TODO-v4.4 Fix and renable history
$data = $displayData['data'];
if (is_countable($data)) {
	foreach ($data as $d) {
		if (!empty($d['number'])) {
			$parts    = [];
			$dialcode = '';

			if ($d['type'] == '1') {
				$parts[] = 'Home';
			}
			else if ($d['type'] == '2') {
				$parts[] = 'Office';
			}
			else if ($d['type'] == '3') {
				$parts[] = 'Mobile';
			}

			if ((int) $d['country']) {
				try {
					$parts[] = '+' . Utility::getDialCode($d['country']);
				} catch (RuntimeException $e) {
					$parts[] = '+XX';
				}
			}

			$parts[] = $d['number'];

			echo implode(' ', $parts) . '<br>';
		}
	}
}