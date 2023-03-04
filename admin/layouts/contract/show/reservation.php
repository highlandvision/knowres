<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract  The contract item.
 * @var false|object $guest     Guest item.
 * @var false|object $guestdata Guest data item.
 * @var float        $payment   Total of payments made.
 */
?>

<div class="row">
	<div class="col-6">
		<div class="row">
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
			</div>
			<div class="col-7">
				<?php echo TickTock::displayDate($contract->arrival); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
			</div>
			<div class="col-7">
				<?php echo TickTock::displayDate($contract->departure); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_NIGHTS'); ?>
			</div>
			<div class="col-7">
				<?php echo TickTock::differenceDays($contract->arrival, $contract->departure); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_CONTRACT_TOTAL'); ?>
			</div>
			<div class="col-7">
				<?php echo Utility::displayValue($contract->contract_total, $contract->currency); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?>
			</div>
			<div class="col-7">
				<?php echo Utility::displayValue($payment, $contract->currency); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_GUESTS_EMAIL'); ?>
			</div>
			<div class="col-7">
				<?php echo $guest->email; ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_GUESTS_MOBILE'); ?>
			</div>
			<div class="col-7">
				<?php echo Utility::formatPhoneNumber($guest->mobile, $guest->mobile_country_id); ?>
			</div>
		</div>
	</div>
	<div class="col-6">
		<div class="row">
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_ETA'); ?>
			</div>
			<div class="col-7">
				<?php echo !empty($guestdata->arrival_time) ? $guestdata->arrival_time : ''; ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_ETD'); ?>
			</div>
			<div class="col-7">
				<?php echo !empty($guestdata->departure_time) ?? ''; ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS'); ?>
			</div>
			<div class="col-7 strong">
				<?php echo Utility::getBookingStatus($contract->booking_status); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_AGENT_ID'); ?>
			</div>
			<div class="col-7">
				<?php echo $contract->agent_name != '' ? $contract->agent_name : $contract->agency_name; ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_LBL_CREATED'); ?>
			</div>
			<div class="col-7">
				<?php echo TickTock::displayTS($contract->created_at); ?>
			</div>
			<div class="col-5">
				<?php echo KrMethods::plain('COM_KNOWRES_CREATED_BY_LBL'); ?>
			</div>
			<div class="col-7">
				<?php echo $contract->created_by_name ?: KrMethods::plain('COM_KNOWRES_GUEST'); ?>
			</div>
		</div>
	</div>
</div>