<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

if ($this->contract->agent_id && $this->contract->agent_deposit_paid) {
    $this->loadtemplate('summary_paynow_agent');
} elseif ($this->payment_total) {
    $left = KrMethods::plain('COM_KNOWRES_BALANCE');
    $mid  = '';
    if (!$this->balance) {
        $mid = !$this->payment_pending ? KrMethods::plain('COM_KNOWRES_PAID') : '';
    }

    $this->data[] = [
        'left'  => $left,
        'mid'   => $mid,
        'right' => Utility::displayValue($this->balance, $this->contract->currency),
    ];
}