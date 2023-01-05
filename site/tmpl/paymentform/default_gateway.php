<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$plugincc = $this->gateway->plugin . $this->gateway->currency;

echo KrMethods::render('payment.gateway', [
	'plugincc'   => $plugincc,
	'checked'    => $this->checked,
	'label'      => $this->gateway->name,
	'amount'     => $this->gateway->amount,
	'currency'   => $this->gateway->currency,
	'surcharge'  => $this->gateway->surcharge,
	'service'    => 'service' . $plugincc,
	'service_id' => $this->gateway->service_id
]);