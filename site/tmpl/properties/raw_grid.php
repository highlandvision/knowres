<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;

echo KrMethods::render('properties.grid', [
	'items'          => $this->items,
	'params'         => $this->params,
	'currency'       => $this->Search->data->currency,
	'favicon'        => true,
	'saved'          => $this->saved,
	'view'           => $this->Search->data->view,
	'byAvailability' => $this->Search->data->byAvailability
]);