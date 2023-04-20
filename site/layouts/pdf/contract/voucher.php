<?php
/**
 * @package    Know Reservations
 * @subpackage Admin Layout
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
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
 * @var false|object $contract  Contract item.
 * @var false|object $agency    Agency item.
 * @var false|object $property  Property item;
 * @var false|object $guestdata Guestdata item.
 * @var array        $notes     Contract notes.
 * @var float        $balance   Contract balance.
 */

$checkintime = strtolower(KrMethods::sprintf('COM_KNOWRES_ARRIVAL_FROM', $property->checkin_time));
if ($property->checkin_time_to)
{
	$checkintime .= ' - ' . $property->checkin_time_to;
}
$checkouttime = strtolower(KrMethods::sprintf('COM_KNOWRES_DEPARTURE_BY', $property->checkout_time));

$address = Utility::formatAddress($property->property_street, '', $property->property_postcode, $property->town_name,
	$property->region_name, $property->country_name, '<br>');

$lat = '';
$lng = '';
$lat = floatval(trim($property->lat_actual)) ? trim($property->lat_actual) : trim($property->lat);
$lng = floatval(trim($property->lng_actual)) ? trim($property->lng_actual) : trim($property->lng);
?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr style="font-size:120%;">
		<td style="width:25%;">
			<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_REFERENCE', $contract->tag); ?>
		</td>
		<td style="width:75%;">
			<?php echo KrMethods::plain('COM_KNOWRES_LEAD_GUEST') . ': ' . $contract->guest_name; ?>
		</td>
	</tr>
</table>

<hr>
<div><br /></div>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:25%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_PROPERTY'); ?></td>
		<td style="width:75%;"><?php echo $property->property_name; ?></td>
	</tr>
	<?php if ($property->property_aka): ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_PROPERTY_AKA'); ?></td>
			<td><?php echo $property->property_aka; ?></td>
		</tr>
	<?php endif; ?>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_ADDRESS'); ?></td>
		<td><?php echo $address; ?></td>
	</tr>
	<?php if ($lat && $lng): ?>
		<tr>
			<td colspan="2">&nbsp;</td>
		</tr>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_GPS'); ?></td>
			<td><?php echo $lat . ' | ' . $lng; ?></td>
		</tr>
	<?php endif; ?>

	<tr style="font-size:92%;color:#999;">
		<td colspan="2" height="5">-----------------------------</td>
	</tr>
</table>

<?php echo KrMethods::render('pdf.contract.guestdata.partysize', ['contract'  => $contract]); ?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr style="font-size:92%;color:#999;">
		<td colspan="2" height="5">-----------------------------</td>
	</tr>

	<tr>
		<td style="width:25%;"><?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?></td>
		<td style="width:75%;"><?php echo TickTock::displayDate($contract->arrival) . ' ' . $checkintime; ?></td>
	</tr>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?></td>
		<td><?php echo TickTock::displayDate($contract->departure) . ' ' . $checkouttime; ?></td>
	</tr>
	<tr>
		<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_NIGHTS'); ?></td>
		<td><?php echo TickTock::differenceDays($contract->arrival, $contract->departure); ?></td>
	</tr>
	<tr style="font-size:92%;color:#999;">
		<td colspan="2" height="5">-----------------------------</td>
	</tr>
	<?php if ($contract->booking_status == 39 && $balance > 0) : ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_BALANCE_ARRIVAL'); ?></td>
			<td><?php echo Utility::displayValue($balance, $contract->currency); ?></td>
		</tr>
	<?php endif; ?>

	<?php if ((float) $property->security_amount > 0
		|| (isset($property->security_text) && trim($property->security_text))) : ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_SECURITY_DEPOSIT'); ?></td>
			<td>
				<?php if ((float) $property->security_amount > 0): ?>
					<?php echo Utility::displayValue($property->security_amount, $contract->currency); ?>
					<?php echo '<br>'; ?>
				<?php endif; ?>

				<?php echo trim($property->security_text); ?>
			</td>
		</tr>
	<?php endif; ?>
</table>

<?php if (count($notes)) : ?>
	<table style="width:100%;border:none;border-collapse:collapse;">
		<tr style="font-size:92%;color:#999;">
			<td colspan="2" height="5">-----------------------------</td>
		</tr>
		<tr>
			<td style="width:25%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_NOTES'); ?></td>
			<td style="width:75%;">
				<?php foreach ($notes as $n) : ?>
					<?php echo nl2br($n->note); ?><br>
				<?php endforeach; ?>
			</td>
		</tr>
	</table>
<?php endif; ?>

<table style="width:100%;border:none;border-collapse:collapse;">
	<?php if ($property->contact_name || $property->contact_email || $property->contact_phone): ?>
		<tr style="font-size:92%;color:#999;">
			<td colspan="2" height="5">-----------------------------</td>
		</tr>
		<tr>
			<td style="width:25%;">
				<?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_LOCAL'); ?>
			</td>
			<?php if ($property->contact_days): ?>
				<td style="font-style:italic;color:#cc0000;">
					<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_DAYS',
						$property->contact_days); ?>
				</td>
			<?php else: ?>
				<td></td>
			<?php endif; ?>
		</tr>
	<?php endif; ?>

	<?php if ($property->contact_name): ?>
		<tr>
			<td style="width:25%;"><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_CONTACT_NAME'); ?></td>
			<td style="width:75%;"><?php echo $property->contact_name; ?></td>
		</tr>
	<?php endif; ?>
	<?php if ($property->contact_email): ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_CONTACT_EMAIL'); ?></td>
			<td><?php echo $property->contact_email; ?></td>
		</tr>
	<?php endif; ?>
	<?php if ($property->contact_phone): ?>
		<tr>
			<td><?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_CONTACT_PHONE'); ?></td>
			<td><?php echo $property->contact_phone; ?></td>
		</tr>
	<?php endif; ?>
	<tr>
		<td colspan="2">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="2">
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_ROUTING'); ?>
		</td>
	</tr>
</table>

<div>
	<hr>
</div>

<table style="width:100%;border:none;border-collapse:collapse;">
	<tr>
		<td style="width:100%;">
			<?php echo KrMethods::plain('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_FINALE'); ?>
		</td>
	</tr>
	<tr>
		<td>
			<?php echo KrMethods::sprintf('COM_KNOWRES_PDF_ACCOMMODATION_VOUCHER_TEAM',
				KrMethods::getCfg('sitename')); ?>
		</td>
	</tr>
</table>