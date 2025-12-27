<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Translations;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') || die;
// phpcs:enable PSR1.Files.SideEffects

extract($displayData);
/**
 * Layout variables
 *
 * @var array        $rooms        Contract rooms (jsa only).
 * @var Translations $Translations Translations object.
 */

$lines = [];
foreach ($rooms as $r) {
    if ($r['number'] > 0) {
        $lines[] = $Translations->getText('room', (int)$r['room_id']) . ' x ' . $d['number'];
    }
}

echo count($lines) ? implode('<br>', $lines) : '';