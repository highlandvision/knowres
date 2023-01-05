<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\Component\Knowres\Administrator\Model\IcalblockModel;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;

extract($displayData);
/**
 * Layout variables
 *
 * @var IcalblockModel $item Ical data row.
 */
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-gantt-modal-show-label">
		<?php echo $item->property_name; ?>
	</h3>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<div class="row">
		<div class="col-6">
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
				</div>
				<div class="col-8">
					<?php echo TickTock::displayDate($item->arrival); ?>
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
				</div>
				<div class="col-8">
					<?php echo TickTock::displayDate($item->departure); ?>
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::plain('COM_KNOWRES_NIGHTS'); ?>
				</div>
				<div class="col-8">
					<?php echo TickTock::differenceDays($item->arrival, $item->departure); ?>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_SERVICE_ID'); ?>
				</div>
				<div class="col-8">
					<?php echo $item->service_name; ?>
				</div>
			</div>
			<div class="row">
				<div class="col-4">
					<?php echo KrMethods::plain('COM_KNOWRES_LBL_CREATED'); ?>
				</div>
				<div class="col-8">
					<?php echo TickTock::displayTS($item->created_at); ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-2">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_NOTE_LBL'); ?>
		</div>
		<div class="col-10">
			<?php echo nl2br($item->note); ?>
		</div>
	</div>
</div>
<div class="modal-footer">
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
	</button>
</div>