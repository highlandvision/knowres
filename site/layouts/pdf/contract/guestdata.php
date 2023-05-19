<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
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
 * @var false|object $contract         Contract item.
 * @var false|object $agency           Agency item.
 * @var false|object $property         Property item;
 * @var false|object $guestdata        Guestdata item.
 * @var array        $property_options Property options.
 * @var float        $balance          Contract balance.
 */

$params = KrMethods::getParams();
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr style="font-size:120%;">
		<td style="width:30%;">
			<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_ARRIVAL_INFORMATION_REFERENCE', $contract->tag); ?>
		</td>
		<td style="width:70%;">
			<?php echo KrMethods::plain('COM_KNOWRES_LEAD_GUEST') . ': ' . $contract->guest_name; ?>
		</td>
	</tr>
</table>

<div>
	<hr>
</div>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:25%;"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTIES_PROPERTY_NAME'); ?></td>
		<td style="width:75%;"><?php echo $property->property_name; ?></td>
	</tr>
	<?php if ($property->property_aka) : ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PROPERTIES_PROPERTY_AKA'); ?></td>
			<td><?php echo $property->property_aka; ?></td>
		</tr>
	<?php endif; ?>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_ARRIVAL_LBL'); ?></td>
		<td><?php echo TickTock::displayDate($contract->arrival); ?></td>
	</tr>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_DEPARTURE_LBL'); ?></td>
		<td><?php echo TickTock::displayDate($contract->departure); ?></td>
	</tr>

	<?php if ($contract->booking_status == 39 && $balance > 0) : ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_PAYMENT_ON_ARRIVAL'); ?></td>
			<td><?php echo KrMethods::sprintf('COM_KNOWRES_CONTRACTPAYMENTS_PAID_ON_ARRIVAL', $balance); ?></td>
		</tr>
	<?php endif; ?>
</table>

<?php echo KrMethods::render('pdf.contract.guestdata.partysize',
	['guestdata' => $guestdata,
	 'property'  => $property,
	 'contract'  => $contract]
);
?>

<div>
	<hr>
</div>

<?php if (is_countable($guestdata->guestinfo) && count($guestdata->guestinfo)): ?>
	<?php echo KrMethods::render('pdf.contract.guestdata.guestinfo', ['guestinfo' => $guestdata->guestinfo]); ?>
<?php endif; ?>

<div>
	<hr>
</div>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:25%;">
			<?php echo KrMethods::plain('COM_KNOWRES_GUEST_MOBILE_LBL'); ?>
		</td>
		<td style="width:75%;">
			<?php echo Utility::formatPhoneNumber($contract->guest_mobile, $contract->guest_mobile_country_id); ?>
		</td>
	</tr>
</table>

<div>
	<hr>
</div>

<!-- Emergency contact-->
<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:25%;">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SECTION_EMERGENCY'); ?>
		</td>
		<td style="width:75%;">
			<?php if (!$guestdata->c_name): ?><?php echo KrMethods::plain('COM_KNOWRES_WAITING_GUEST'); ?><?php else: ?>
				<table style="width:100%;border:none;border-collapse:collapse;">
					<tr style="font-size:92%;color:#999;">
						<td><?php echo KrMethods::plain('COM_KNOWRES_NAME'); ?></td>
						<td><?php echo KrMethods::plain('COM_KNOWRES_TELEPHONE'); ?></td>
						<td><?php echo KrMethods::plain('COM_KNOWRES_EMAIL'); ?></td>
					</tr>
					<tr>
						<td><?php echo $guestdata->c_name; ?></td>
						<td><?php echo $guestdata->c_phone; ?></td>
						<td><?php echo $guestdata->c_email; ?></td>
					</tr>
				</table>
			<?php endif; ?>
		</td>
	</tr>
</table>

<div>
	<hr>
</div>

<!-- Arrival Info-->
<?php echo KrMethods::render('pdf.contract.guestdata.arrivalinfo', ['guestdata' => $guestdata]); ?>
<br><br>
<!-- Departure Info-->
<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:100%;">
			<?php if (!$guestdata->departure_time): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_WAITING_GUEST'); ?>
				<br>
			<?php else: ?>
				<table style="width:100%;border:none;border-collapse:collapse;">
					<tr>
						<td>
							<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DEPARTURE_TIME_LBL'); ?>
							:&nbsp;<?php echo $guestdata->departure_time; ?>
						</td>
						<?php if ($params->get('departure_means', 0)) : ?>
							<td>
								<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DEPARTURE_MEANS_LBL'); ?>
								:&nbsp;<?php echo ucfirst($guestdata->departure_means); ?>
							</td>
							<td>
								<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_DEPARTURE_NUMBER_LBL'); ?>
								:&nbsp;<?php echo $guestdata->departure_number; ?>
							</td>
						<?php endif; ?>
					</tr>
				</table>
			<?php endif; ?>
		</td>
	</tr>
</table>

<div>
	<hr>
</div>

<!-- Arrival options-->
<?php if (is_countable($guestdata->options) && count($guestdata->options)): ?>
	<?php $answers = []; ?>
	<?php $options = json_decode(json_encode($guestdata->options), true); ?>
	<?php foreach ($options as $k => $v): ?>
		<?php $answers[$v['id']] = $v['answer']; ?>
	<?php endforeach; ?>

	<table style="width:100%;border:none;border-collapse:collapse;">
		<tr>
			<td colspan="2"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_OPTIONS'); ?><br></td>
		</tr>
		<?php foreach ($property_options as $o): ?>
			<tr>
				<td style="width:30%;vertical-align:top;padding:5px 0;">
					<?php echo $o->name; ?>
				</td>
				<td style="width:70%;vertical-align:top;padding:5px 0;">
					<?php if (isset($answers[$o->id])): ?>
						<?php $answer = $answers[$o->id]; ?>
					<?php endif; ?>
					<?php if ($o->yesno): ?>
						<?php echo $answer ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
					<?php else: ?>
						<?php echo $answer; ?>
					<?php endif; ?>
				</td>
			</tr>
			<br>
		<?php endforeach; ?>
	</table>
<?php endif; ?>

<div>
	<hr>
</div>

<?php if ($guestdata->preferences) : ?>
	<!-- Additional comments-->
	<table style="width:100%;border:none;border-collapse:collapse;">
		<tr>
			<td style="width:30%;"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_PREFERENCES_LBL'); ?></td>
			<td style="width:70%;">
				<?php echo nl2br($guestdata->preferences); ?>
			</td>
		</tr>
	</table>
<?php endif; ?>