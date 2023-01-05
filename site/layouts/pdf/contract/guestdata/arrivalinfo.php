<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestdata Guest data.
 */

$heading   = [];
$air       = '';
$other     = [];
$departure = [];
?>

	<table style="width:100%;border:none;border-collapse:collapse;">
		<tr>
			<td style="width:30%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SECTION_TRAVEL_SCHEDULE'); ?>
			</td>
			<td style="width:70%;">
				<?php if (!$guestdata->arrival_means): ?>
					<?php echo KrMethods::plain('COM_KNOWRES_WAITING_GUEST'); ?>
					<br>
				<?php endif; ?>
			</td>
		</tr>
	</table>

<?php if ($guestdata->arrival_means): ?>
	<?php $text = "COM_KNOWRES_CONTRACTGUESTDATAFORM_" . strtoupper($guestdata->arrival_means); ?>
	<?php if ($guestdata->arrival_means == 'air'): ?>
		<table style="width:100%;border:none;border-collapse:collapse;">
			<tr style="font-size:92%;color:#999;">
				<td style="width:120px;">&nbsp;</td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_AIRLINE_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_NUMBER_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_AIR_FROM_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_AIR_TO_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_TIME_LBL'); ?></td>
			</tr>

			<?php $first = true; ?>
			<?php foreach ($guestdata->arrival_air as $a) : ?>
				<?php if ($a->airline): ?>
					<tr>
						<?php if ($first): ?>
							<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_BY') . ' '
									. KrMethods::plain($text); ?></td>
							<?php $first = false; ?>
						<?php else: ?>
							<td></td>
						<?php endif; ?>
						<td><?php echo $a->airline; ?></td>
						<td><?php echo $a->flight ?></td>
						<td><?php echo $a->from; ?></td>
						<td><?php echo $a->to; ?></td>
						<td><?php echo $a->eta; ?></td>
					</tr>
				<?php endif; ?>
			<?php endforeach; ?>
		</table>
	<?php elseif ($guestdata->arrival_means == 'train'): ?>
		<table style="width:100%;border:none;border-collapse:collapse;">
			<tr style="font-size:92%;color:#999;">
				<td style="width:30%;">&nbsp;</td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_FROM_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_PLACE_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_TIME_LBL'); ?></td>
			</tr>
			<tr>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_BY') . ' '
						. KrMethods::plain($text); ?></td>
				<td><?php echo $guestdata->arrival_from; ?></td>
				<td><?php echo $guestdata->arrival_place; ?></td>
				<td><?php echo $guestdata->arrival_time; ?></td>
			</tr>
		</table>
	<?php elseif ($guestdata->arrival_means == 'auto'): ?>
		<table style="width:100%;border:none;border-collapse:collapse;">
			<tr style="font-size:92%;color:#999;">
				<td style="width:30%;">&nbsp;</td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_AUTO_ARRIVAL_FROM_LBL'); ?></td>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_TIME_LBL') ?></td>
			</tr>
			<tr>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_BY') . ' '
						. KrMethods::plain($text); ?></td>
				<td><?php echo $guestdata->arrival_from; ?></td>
				<td><?php echo $guestdata->arrival_time; ?></td>
			</tr>
		</table>
	<?php elseif ($guestdata->arrival_means == 'other'): ?>
		<table style="width:100%;border:none;">
			<tr>
				<td><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_BY') . ' '
						. KrMethods::plain($text); ?></td>
			</tr>
			<tr>
				<td><?php echo $guestdata->other_information; ?></td>
			</tr>
		</table>
	<?php endif; ?>
<?php endif; ?>