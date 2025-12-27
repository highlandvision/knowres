<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

if (empty($this->approvals))
{
    return;
}
?>

<div class="card kr-daily">
    <div class="card-header">
        <a class="showbefore" data-bs-toggle="collapse" href="#panel-approvals" role="button"
           aria-expanded="true" aria-controls="panel-approvals">
            <?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_DAILY_APPROVALS'); ?>
        </a>
    </div>
    <div class="collapse show" id="panel-approvals">
        <div class="card-body">
            <?php echo KrMethods::render('contract.daily.approvals', ['lines' => $this->approvals]); ?>
        </div>
    </div>
</div>