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
 * @var false|object $item        Contract row.
 * @var array|bool   $notes       Contract notes.
 * @var false|object $guest       Guest row.
 * @var false|object $guestdata   Guestdata row.
 * @var object       $payments    Payment rows.
 * @var float        $payment     Payments total.
 * @var array|bool   $fees        Contractfee rows.
 * @var string       $audience    'manager' or 'owner'.
 * @var float        $balance     Confirmed balance.
 * @var float        $balance_all Balance.
 */
?>

<div class="modal-header">
	<h3 class="modal-title" id="kr-gantt-modal-show-label">
		<?php echo $guest->firstname . ' ' . $guest->surname . ' @ ' . $item->property_name; ?>
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
			<button class="nav-link" id="account-tab" data-bs-toggle="tab" data-bs-target="#account"
			        type="button" role="tab" aria-controls="account" aria-selected="true">
				<?php echo KrMethods::plain('COM_KNOWRES_STATEMENT'); ?>
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
			<?php echo KrMethods::render('contract.show.reservation',
				['contract' => $item, 'guest' => $guest, 'guestdata' => $guestdata,
				 'payment'  => $payment]); ?>
		</div>
		<div class="tab-pane" id="account" role="tabpanel" aria-labelledby="account-tab">
			<?php echo KrMethods::render('contract.show.summary',
				['item'        => $item,
				 'fees'        => $fees,
				 'payments'    => $payments,
				 'audience'    => $audience,
				 'balance'     => $balance,
				 'balance_all' => $balance_all,
				 'payment'     => $payment,
				]
			);
			?>
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
	<a class="btn btn-primary" role="button"
	   href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $item->id); ?>">
		<?php echo KrMethods::plain('COM_KNOWRES_GANTT_FULL_DETAILS'); ?>
	</a>
	<button class="btn btn-danger" type="button" data-bs-dismiss="modal">
		<?php echo KrMethods::plain('JTOOLBAR_CLOSE'); ?>
	</button>
</div>