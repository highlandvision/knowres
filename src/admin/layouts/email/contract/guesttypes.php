<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

extract($displayData);
/**
 * Layout variables
 *
 * @var int   $guests      #Contract guests.
 * @var array $guest_types Contract guest types (jsa only).
 */

if (!is_countable($guest_types)) {
    echo '';
} else {
    $lines = [];
    foreach ($guest_types as $d) {
        $lines[] = $d['number'] . ' ' . $d['type'];
    }

    echo count($lines) ? implode('<br>', $lines) : $guests;
}