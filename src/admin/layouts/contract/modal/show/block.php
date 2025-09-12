<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item         The contract item.
 * @var array|bool   $notes        The contract notes.
 * @var bool         $allow_cancel Allow cancellation
 */
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-gantt-modal-show-label">
		<?php echo $item->property_name; ?>
	</h3>
	<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
	<ul class="m0 nav nav-tabs" id="kr-gantt-tab" role="tablist">
		<li class="nav-item" role="presentation">
			<button class="nav-link active" id="summary-tab" data-bs-toggle="tab" data-bs-target="#summary"
			        type="button" role="tab" aria-controls="summary" aria-selected="true">
				<?php echo KrMethods::plain('COM_KNOWRES_SUMMARY'); ?>
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="notes-tab" data-bs-toggle="tab" data-bs-target="#notes"
			        type="button" role="tab" aria-controls="notes" aria-selected="false">
				<?php echo KrMethods::plain('COM_KNOWRES_NOTES'); ?>
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="systemnotes-tab" data-bs-toggle="tab" data-bs-target="#systemnotes"
			        type="button" role="tab" aria-controls="systemnotes" aria-selected="false">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_SYSTEM_NOTES'); ?>
			</button>
		</li>
	</ul>
	<div class="p-3 tab-content">
		<div class="tab-pane active" id="summary" role="tabpanel" aria-labelledby="summary-tab">
			<?php echo KrMethods::render('contract.modal.show.summary', ['item' => $item]); ?>
		</div>
		<div class="tab-pane" id="notes" role="tabpanel" aria-labelledby="notes-tab">
			<?php echo KrMethods::render('contract.modal.show.notes',
				['item' => $item, 'notes' => $notes, 'system' => false]); ?>
		</div>
		<div class="tab-pane" id="systemnotes" role="tabpanel" aria-labelledby="systemnotes-tab">
			<?php echo KrMethods::render('contract.modal.show.notes',
				['item' => $item, 'notes' => $notes, 'system' => true]); ?>
		</div>
	</div>
</div>
<div class="modal-footer">
	<?php if ((int) $item->black_booking === 1): ?>
		<?php if ($allow_cancel): ?>
			<button class="btn btn-primary modalshowcancel" data-task="contract.trash"
			        data-id="<?php echo $item->id; ?>">
				<?php echo KrMethods::plain('COM_KNOWRES_CANCEL_BLOCK'); ?>
			</button>
		<?php endif; ?>
	<?php endif; ?>
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
	</button>
</div>