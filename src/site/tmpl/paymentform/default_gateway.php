<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

// phpcs:disable PSR1.Files.SideEffects
defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

$plugincc = $this->gateway->plugin . $this->gateway->currency;

echo KrMethods::render('payment.gateway', [
    'plugincc'   => $plugincc,
    'checked'    => $this->checked,
    'label'      => $this->gateway->name,
    'amount'     => $this->gateway->amount,
    'currency'   => $this->gateway->currency,
    'surcharge'  => $this->gateway->surcharge,
    'service'    => 'service' . $plugincc,
    'service_id' => $this->gateway->service_id,
]);