<?php
/**
 * @package     Know Reservations
 * @subpackage  <Enter sub package>
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

if (empty($this->lines['overduebalance']))
{
    return;
}
?>

<div class="card kr-daily">
    <div class="card-header">
        <a class="showbefore" data-bs-toggle="collapse" href="#panel-overduebalance" role="button"
           aria-expanded="true" aria-controls="panel-overduebalance">
            <?php echo Utility::getBookingStatus(35); ?>
        </a>
    </div>
    <div class="collapse show" id="panel-overduebalance">
        <div class="card-body">
            <?php echo KrMethods::render('contract.daily.contract', ['lines' => $this->lines['overduebalance']]); ?>
        </div>
    </div>
</div>