<?php

/**
 * @package     Know Reservations
 * @subpackage  Admin Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

if (!$displayData['data']) {
    return;
}

$data = Utility::arrayToObject($displayData['data']);
if (count($data)) {
    $days = KrMethods::plain('COM_KNOWRES_DAYS');
    $all  = [];

    foreach ($data as $d) {
        $parts = [];

        if ($d['cancellation_penalty_from'] > 0 || $d['cancellation_penalty_to'] > 0) {
            $parts[] = $d['cancellation_penalty_from'] . '-' . $d['cancellation_penalty_to'];
            $parts[] = $days;
            $parts[] = $d['cancellation_penalty_pc'] . '%';
            $all[]   = implode(' ', $parts);
        }
    }

    echo implode(', ', $all);
}