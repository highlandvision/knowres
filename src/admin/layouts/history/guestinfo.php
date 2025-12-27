<?php

/**
 * @package     Know Reservations
 * @subpackage  Admin Layouts
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

if (!$displayData['data']) {
    return;
}

$data = Utility::arrayToObject($displayData['data']);
if (count($data)) {
    foreach ($data as $d) {
        $parts = [];

        foreach ($d as $k => $v) {
            if ($v) {
                $parts[] = ucfirst($k) . ": " . $v;
            }
        }

        $all[] = implode(" ", $parts);
    }

    echo implode(", ", $all);
}