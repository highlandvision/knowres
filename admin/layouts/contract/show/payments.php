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
 * @var mixed        $payments Contract payments
 */

$count = 0;
?>

	<div class="row">
		<div class="col-2 strong"><?php echo KrMethods::plain('COM_KNOWRES_DATE'); ?></div>
		<div class="col-4 strong"><?php echo KrMethods::plain('COM_KNOWRES_STATUS'); ?></div>
		<div class="col-4 strong text-end"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_AMOUNT'); ?></div>
		<div class="col-2 strong text-end"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_BASE_AMOUNT'); ?></div>
	</div>

<?php foreach ($payments as $p): ?>
	<?php if ($count): ?>
		<div class="row">
			<div class="col-12 h-divider">
				<hr>
			</div>
		</div>
	<?php endif; ?>
	<div class="row">
		<div class="col-2">
			<?php echo TickTock::displayDate($p->payment_date, 'dMy'); ?>
		</div>
		<div class="col-4">
			<?php if ($p->confirmed) : ?>
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRMED'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_PENDING'); ?>
			<?php endif; ?>
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contractpayment.edit&id=' .
			                                     $p->id,
				false); ?>" class="red" style="margin-left:0.5rem;">
				<?php echo KrMethods::plain('COM_KNOWRES_EDIT'); ?>
			</a>
		</div>
		<?php if ($p->currency != $contract->currency) : ?>
			<div class="col-4 text-end">
				<?php echo Utility::displayValue($p->amount, $p->currency); ?> @ <?php echo $p->rate; ?>
			</div>
			<?php if ($p->base_amount < 0): ?>
				<div class="col-2 text-end red">
					<?php echo Utility::displayValue($p->base_amount, $contract->currency); ?>
				</div>
			<?php else: ?>
				<div class="col-2 text-end">
					<?php echo Utility::displayValue($p->base_amount, $contract->currency); ?>
				</div>
			<?php endif; ?>
		<?php else: ?>
			<div class="col-4">
				&nbsp;
			</div>
			<?php if ($p->base_amount < 0): ?>
				<div class="col-2 text-end red">
					<?php echo Utility::displayValue($p->base_amount, $contract->currency); ?>
				</div>
			<?php else: ?>
				<div class="col-2 text-end">
					<?php echo Utility::displayValue($p->base_amount, $contract->currency); ?>
				</div>
			<?php endif; ?>
		<?php endif; ?>
	</div>
	<div class="row">
		<div class="col-12" style="margin-top:0.5rem;">
			<?php echo $p->service_name . ' ' . $p->payment_ref; ?>
		</div>
		<div class="col-12">
			<?php echo $p->note; ?>
		</div>
	</div>

	<?php $count++; ?>
<?php endforeach; ?>