<?php
/**
 * @package     KR
 * @subpackage  Admin Layouts
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract The contract item.
 * @var mixed        $fees     Contract fees.
 * @var mixed        $payments Contract payments
 * @var float        $balance  Outstanding balance
 */
?>

<?php if ($contract->deposit > 0): ?>
	<div class="grid-x grid-margin-x summary">
		<div class="small-3 cell">
			<?php if ($contract->deposit != $contract->contract_total): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DEPOSIT'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_FULL_PAYMENT'); ?>
			<?php endif; ?>
		</div>
		<div class="small-6 cell text-right">
			<?php if ($contract->booking_status > 9): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_PAID_IN_FULL'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_PENDING'); ?>
			<?php endif; ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($contract->deposit, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($balance > 0): ?>
	<?php if (!$contract->balance_days): ?>
		<?php $due = KrMethods::plain('COM_KNOWRES_PAYABLE_ON_ARRIVAL'); ?>
	<?php elseif ($contract->booking_status == 35): ?>
		<?php $due = KrMethods::plain('COM_KNOWRES_PENDING'); ?>
	<?php elseif ($contract->balance_date > TickTock::getDate()): ?>
		<?php $due = KrMethods::sprintf('COM_KNOWRES_DUE_BY', TickTock::displayDate($contract->balance_date)); ?>
	<?php else: ?>
		<?php $due = KrMethods::plain('COM_KNOWRES_DUE_NOW'); ?>
	<?php endif; ?>
	<div class="grid-x grid-margin-x summary">
		<div class="small-3 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		</div>
		<div class="small-6 cell">
			<?php echo $due; ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($balance, $contract->currency); ?>
		</div>
	</div>
<?php elseif ($contract->deposit != $contract->contract_total): ?>
	<div class="grid-x grid-margin-x summary">
		<div class="small-3 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_PAID_IN_FULL'); ?>
		</div>
		<div class="small-6 cell">
			<?php echo $due; ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($balance, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>