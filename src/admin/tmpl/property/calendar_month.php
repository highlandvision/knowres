<?php
/**
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 * @package     KR
 */

defined('_JEXEC') or die;

use HighlandVision\KR\TickTock;

/** @noinspection PhpUnhandledExceptionInspection */
$days = TickTock::displayDate($this->startDate, 't');
/** @noinspection PhpUnhandledExceptionInspection */
$monthYear = TickTock::displayDate($this->startDate, 'M Y');
?>

<table class="amonth">
    <tr>
        <th>
            <?php echo $monthYear; ?>
        </th>

        <?php for ($d = 1; $d <= $days; $d++): ?>
            <?php $this->dateYmd = $d < 10 ? $this->startMonth . '-0' . $d : $this->startMonth . '-' . $d; ?>
            <?php echo $this->loadTemplate('day'); ?>
        <?php endfor; ?>
    </tr>
</table>