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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract    The contract item.
 * @var mixed        $fees        Contract fees
 * @var mixed        $payments    Contract payments
 * @var string       $audience    The type of viewee
 * @var float        $balance     Current confirmed balance.
 * @var float        $balance_all Current balance less unconfirmed payments.
 */
?>

<?php if (!Utility::compareFloat($contract->room_total_gross, $contract->room_total)): ?>
	<div class="grid-x grid-margin-x summary">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_FULL_PRICE'); ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($contract->room_total_gross, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($contract->discount > 0): ?>
	<div class="grid-x grid-margin-x">
		<div class="small-6 cell red">
			<?php echo KrMethods::plain('COM_KNOWRES_DISCOUNT'); ?>
		</div>
		<div class="small-3 cell red text-right">
			<?php echo Utility::displayValue($contract->discount, $contract->currency); ?>
		</div>
		<div class="small-3 cell text-right">
		</div>
	</div>
<?php endif; ?>

<?php if ($contract->coupon_discount > 0): ?>
	<div class="grid-x grid-margin-x">
		<div class="small-6 cell indent red">
			<?php echo KrMethods::plain('COM_KNOWRES_COUPON_DISCOUNT'); ?>
		</div>
		<div class="small-3 cell red text-right">
			<?php echo Utility::displayValue($contract->coupon_discount, $contract->currency); ?>
		</div>
		<div class="small-3 cell text-right">
		</div>
	</div>
<?php endif; ?>

	<div class="grid-x grid-margin-x">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_RENTAL_PRICE'); ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($contract->room_total, $contract->currency); ?>
		</div>
	</div>

	<!--// // Check for a booking note-->
	<!--// 	$notes = $this->getContractNotes(('owner'));-->
	<!--//		if (count($notes))-->
	<!--//		{-->
	<!--//			foreach ($notes as $n)-->
	<!--//			{-->
	<!--//				$line          = [];-->
	<!--//				$line['left']  = array(-->
	<!--//					'class' => 'indent',-->
	<!--//					'value' => (string) nl2br($n->note)-->
	<!--//				);-->
	<!--//				$line['mid']   = array(-->
	<!--//					'class' => '',-->
	<!--//					'value' => ''-->
	<!--//				);-->
	<!--//				$line['right'] = array(-->
	<!--//					'class' => '',-->
	<!--//					'value' => ''-->
	<!--//				);-->
	<!--//				$lines[]       = $line;-->
	<!--//			}-->
	<!--//		}-->

<?php if ($contract->tax_total > 0): ?>
	<div class="grid-x grid-margin-x">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_TAX'); ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($contract->tax_total, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if (count($contract->extras)): ?>
	<div class="grid-x grid-margin-x" style="margin-top:10px;">
		<div class="small-6 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_EXTRAS'); ?>
		</div>
	</div>

	<?php $prices_inclusive = 1; ?>
	<?php foreach ($contract->extras as $e => $d): ?>
		<?php if (!empty($e) && $e > 0): ?>
			<?php $extra = KrFactory::getAdminModel('extra')->getItem($e); ?>
			<?php $name = $extra->name; ?>
			<?php $value = $d['value']; ?>
			<?php if ((int) $d['quantity'] > 1): ?>
				<?php $name = $name . ' x ' . $d['quantity']; ?>
			<?php endif; ?>

			<div class="grid-x grid-margin-x">
				<div class="small-6 cell indent">
					<?php echo $name; ?>
				</div>
				<div class="small-3 cell text-right">
					<?php echo Utility::displayValue($value, $contract->currency); ?>
				</div>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>

	<div class="grid-x grid-margin-x">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_EXTRAS_TOTAL'); ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($contract->extra_total, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php $fee_total = 0; ?>
<?php if (isset($fees) && count($fees)): ?>
	<div class="grid-x grid-margin-x" style="margin-top:5px;">
		<div class="small-6 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_ADDITIONAL_CHARGES'); ?>
		</div>
	</div>

	<?php foreach ($fees as $fee): ?>
		<div class="grid-x grid-margin-x">
			<div class="small-6 cell indent">
				<?php echo TickTock::displayDate($fee->created_at) . ' - ' . $fee->description; ?>
			</div>
			<div class="small-3 cell text-right">
				<?php echo Utility::displayValue($fee->value, $contract->currency); ?>
			</div>
		</div>

		<?php $fee_total += $fee->value; ?>
	<?php endforeach; ?>
<?php endif; ?>

<?php if ($fee_total > 0): ?>
	<div class="grid-x grid-margin-x">
		<div class="small-9 cell subtotal">
			<?php echo KrMethods::plain('COM_KNOWRES_ADDITIONAL_CHARGES_TOTAL'); ?>
		</div>
		<div class="small-3 cell text-right">
			<?php echo Utility::displayValue($fee_total, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($contract->room_total != $contract->contract_total + $fee_total): ?>
	<div class="grid-x grid-margin-x" style="margin-top:10px;">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_RESERVATION_TOTAL'); ?>
		</div>
		<div class="small-3 cell heading text-right">
			<?php echo Utility::displayValue($contract->contract_total + $fee_total, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php $payment_total = 0; ?>
<?php $pending_total = 0; ?>
<?php if (isset($payments) && is_countable($payments) && count($payments)): ?>
	<hr>
	<div class="grid-x grid-margin-x" style="margin-top:10px;">
		<div class="small-12 cell heading">
			<?php echo KrMethods::plain('COM_KNOWRES_PAYMENTS'); ?>
		</div>
	</div>

	<?php foreach ($payments as $p): ?>
		<?php $refund = $p->amount < 0; ?>
		<?php $fex = ''; ?>
		<?php if ($p->amount != $p->base_amount): ?>
			<?php $fex = Utility::displayValue($p->amount, $p->currency) . '@' . $p->rate; ?>
		<?php endif; ?>
		<?php if ($p->confirmed): ?>
			<?php $payment_total += $p->base_amount; ?>
		<?php else: ?>
			<?php $pending_total += $p->base_amount; ?>
		<?php endif; ?>

		<div class="grid-x grid-margin-x">
			<div class="small-4 large-3 cell">
				<?php echo TickTock::displayDate($p->payment_date); ?>
				<?php if (!$p->confirmed): ?>
					<?php echo '*'; ?>
				<?php endif; ?>
			</div>
			<div class="small-5 large-6 cell">
				<?php if ($p->base_amount > 0): ?>
					<?php if (!empty($fex)): ?>
						<?php echo $fex . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . Utility::displayValue($p->base_amount,
								$contract->currency); ?>
					<?php endif; ?>
				<?php else: ?>
					<?php if (!empty($fex)): ?>
						<?php echo $fex . '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . Utility::displayValue(abs($p->base_amount),
								$contract->currency); ?>
					<?php endif; ?>
				<?php endif; ?>
				&nbsp;
			</div>
			<div class="small-3 cell text-right">
				<?php echo Utility::displayValue(abs($p->base_amount), $contract->currency); ?>
			</div>
		</div>
	<?php endforeach; ?>

	<div class="grid-x grid-margin-x">
		<div class="small-9 cell">
			<?php echo KrMethods::plain('COM_KNOWRES_PAYMENTS_TOTAL'); ?>
		</div>
		<?php if ($payment_total > 0): ?>
			<div class="small-3 cell text-right">
				<?php echo Utility::displayValue($payment_total, $contract->currency); ?>
			</div>
		<?php else: ?>
			<div class="small-3 cell text-right">
				<?php echo Utility::displayValue($payment_total, $contract->currency); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ($pending_total): ?>
		<div class="small-12 cell">
			<small><?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_UNCONFIRMED'); ?></small>
		</div>
	<?php endif; ?>
	<hr>

	<!--	<div class="grid-x grid-margin-x">-->
	<!--		<div class="small-5 divider">-->
	<!--			--><?php //echo KrMethods::plain('COM_KNOWRES_CONTRACT_CONTRACT_TOTAL_LBL'); ?>
	<!--		</div>-->
	<!--		<div class="small-4">-->
	<!--		</div>-->
	<!--		<div class="small-3 heading strong text-end">-->
	<!--			--><?php //echo Utility::displayValue($contract->contract_total + $fee_total, $contract->currency); ?>
	<!--		</div>-->
	<!--	</div>-->

	<?php $due = ''; ?>
	<?php if ($balance_all > 0): ?>
		<?php if (!$contract->balance_days && $payment_total): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_PAYABLE_ON_ARRIVAL'); ?>
		<?php elseif ($contract->balance_date > TickTock::getDate() && $contract->booking_status >= 10): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE') . ' (' . KrMethods::sprintf('COM_KNOWRES_DUE_BY',
					TickTock::displayDate($contract->balance_date)) . ')'; ?>
		<?php elseif ($contract->balance_date <= TickTock::getDate()): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE') . ' (' . KrMethods::plain('COM_KNOWRES_DUE_NOW')
				. ')'; ?>
		<?php else: ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		<?php endif; ?>
	<?php else: ?>
		<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
	<?php endif; ?>

	<div class="grid-x grid-margin-x" style="margin-top:10px;">
		<div class="small-9 cell heading">
			<?php echo $due; ?>
		</div>
		<div class="small-3 cell heading strong text-right">
			<?php echo Utility::displayValue($balance, $contract->currency); ?>
		</div>
	</div>
<?php endif; ?>