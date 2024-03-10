<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div id="geriatric-key" style="text-align:center;">
	<table class="legend">
		<tr>
			<td>
				<div class="bookme"></div>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CALENDAR_AVAILABLE'); ?>
			</td>
		</tr>
	</table>
	<table class="legend">
		<tr>
			<td>
				<div class="bgbook"></div>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CALENDAR_BOOKED'); ?>
			</td>
		</tr>
	</table>
	<?php if ($this->params->get('calendar_booked') != $this->params->get('calendar_provisional')): ?>
		<table class="legend">
			<tr>
				<td>
					<div class="bgprov"></div>
				</td>
				<td>
					<?php echo KrMethods::plain('COM_KNOWRES_CALENDAR_PROVISIONAL'); ?>
				</td>
			</tr>
		</table>
	<?php endif; ?>
	<table class="legend">
		<tr>
			<td>
				<div class="duo bgfrombook bgtoavail"></div>
			</td>
			<td>
				<?php echo KrMethods::plain('COM_KNOWRES_CALENDAR_CHANGEOVER'); ?>
			</td>
		</tr>
	</table>
</div>