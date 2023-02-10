<?php
/**
 * @package     KR
 * @subpackage  <Enter sub package>
 * @copyright   Copyright (C) 2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $contract Contract item.
 * @var array        $fees     Contract fees.
 * @var array        $payments Contract payments.
 */
?>

<table>
	<?php if (!Utility::compareFloat($contract->room_total_gross, $contract->room_total)): ?>
		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_ROOM_TOTAL_GROSS_LBL'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;">
				<?php echo Utility::displayValue($contract->room_total_gross, $contract->currency); ?>
			</td>
		</tr>
	<?php endif; ?>

	<?php if ($contract->discount > 0): ?>
		<tr>
			<td style="width:40%;color:#cc0000;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_DISCOUNT_LBL'); ?>
			</td>
			<td style="width:30%;color:#cc0000;text-align:right;">
				<?php echo '-' . Utility::displayValue($contract->discount, $contract->currency); ?>
			</td>
			<td style="width:30%;">
			</td>
		</tr>
	<?php endif; ?>

	<?php if ($contract->coupon_discount > 0): ?>
		<tr>
			<td style="width:40%;color:#cc0000;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_COUPON_DISCOUNT_LBL'); ?>
			</td>
			<td style="width:30%;color:#cc0000;text-align:right;">
				<?php echo '-' . Utility::displayValue($contract->coupon_discount, $contract->currency); ?>
			</td>
			<td style="width:30%;">
			</td>
		</tr>
	<?php endif; ?>

	<tr>
		<td style="width:40%;">
			<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_ROOM_TOTAL'); ?>
		</td>
		<td style="width:30%;">
		</td>
		<td style="width:30%;text-align:right;">
			<?php echo Utility::displayValue($contract->room_total, $contract->currency); ?>
		</td>
	</tr>

	<!-- TODO-v4.1 Sort for JSA-->
	<!-- // Check for a booking note-->
	<!-- 	$notes = $this->getContractNotes(('owner'));-->
	<!--		if (count($notes))-->
	<!--		{-->
	<!--			foreach ($notes as $n)-->
	<!--			{-->
	<!--				$line          = [];-->
	<!--				$line['left']  = array(-->
	<!--					'class' => 'indent',-->
	<!--					'value' => (string) nl2br($n->note)-->
	<!--				);-->
	<!--				$line['mid']   = array(-->
	<!--					'class' => '',-->
	<!--					'value' => ''-->
	<!--				);-->
	<!--				$line['right'] = array(-->
	<!--					'class' => '',-->
	<!--					'value' => ''-->
	<!--				);-->
	<!--				$lines[]       = $line;-->
	<!--			}-->
	<!--		}-->

	<?php if ($contract->tax_total > 0): ?>
		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_TAX'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
				<?php echo Utility::displayValue($contract->tax_total, $contract->currency); ?>
			</td>
		</tr>
	<?php endif; ?>

	<?php if (count($contract->extras)): ?>
		<tr>
			<td colspan="3"></td>
		</tr>

		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_EXTRA_TITLE'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
			</td>
		</tr>

		<?php foreach ($contract->extras as $e => $d): ?>
			<?php if (!empty($e) && $e > 0): ?>
				<?php $extra = KrFactory::getAdminModel('extra')->getItem($e); ?>
				<?php $name = $extra->name; ?>
				<?php $value = $d['value']; ?>
				<?php if ((int) $d['quantity'] > 1): ?>
					<?php $name = $extra->name . ' x ' . $d['quantity']; ?>
				<?php endif; ?>

				<tr>
					<td style="width:40%;text-indent:20px;">
						<?php echo $name; ?>
					</td>
					<td style="width:30%;text-align:right;">
						<?php echo Utility::displayValue($value, $contract->currency); ?>
					</td>
					<td style="width:30%;text-align:right;">
					</td>
				</tr>
			<?php endif; ?>
		<?php endforeach; ?>

		<tr>
			<td style="width:40%;text-indent:20px;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_EXTRAS_TOTAL'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
				<?php echo Utility::displayValue($contract->extra_total, $contract->currency); ?>
			</td>
		</tr>
	<?php endif; ?>

	<?php $fee_total = 0; ?>
	<?php if (!empty($fees)): ?>
		<tr>
			<td colspan="3"></td>
		</tr>

		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEE_TITLE'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
			</td>
		</tr>

		<?php foreach ($fees as $fee): ?>
			<tr>
				<td style="width:40%;text-indent:20px;">
					<?php echo TickTock::displayDate($fee->created_at) . ' - ' . $fee->description; ?>
				</td>
				<td style="width:30%;text-align:right;">
					<?php echo Utility::displayValue($fee->value, $contract->currency); ?>
				</td>
				<td style="width:30%;text-align:right;">
				</td>
			</tr>

			<?php $fee_total += $fee->value; ?>
		<?php endforeach; ?>

		<?php if ($fee_total > 0): ?>
			<tr>
				<td style="width:40%;text-indent:20px;">
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_CONTRACT_TOTAL'); ?>
				</td>
				<td style="width:30%;">
				</td>
				<td style="width:30%;text-align:right;">
					<?php echo Utility::displayValue($fee_total, $contract->currency); ?>
				</td>
			</tr>
		<?php endif; ?>
	<?php endif; ?>

	<?php if ($contract->room_total != $contract->contract_total + $fee_total): ?>
		<tr>
			<td colspan="3"></td>
		</tr>

		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_CONTRACT_TOTAL_LBL'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
				<?php echo Utility::displayValue($contract->contract_total + $fee_total, $contract->currency); ?>
			</td>
		</tr>
	<?php endif; ?>

	<?php $payment_total = 0; ?>
	<?php $pending_total = 0; ?>
	<?php $show_unconfirmed = false; ?>

	<?php if (!empty($payments)): ?>
		<tr>
			<td colspan="3"></td>
		</tr>

		<tr>
			<td style="width:40%;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
			</td>
		</tr>

		<?php foreach ($payments as $p): ?>
			<?php $refund = $p->amount < 0; ?>
			<?php $fex = ''; ?>
			<?php if ($p->amount != $p->base_amount): ?>
				<?php $fex = '('; ?>
				<?php $fex .= Utility::displayValue($p->amount, $p->currency); ?>
				<?php $fex .= ' @ '; ?>
				<?php $fex .= $p->rate . ')&nbsp;&nbsp;'; ?>
			<?php endif; ?>

			<?php if ($p->confirmed): ?>
				<?php $payment_total += $p->base_amount; ?>
			<?php else: ?>
				<?php $pending_total += $p->base_amount; ?>
			<?php endif; ?>

			<tr>
				<td style="width:40%;text-indent:20px;">
					<?php if ($p->confirmed): ?>
						<?php echo TickTock::displayDate($p->payment_date) . ' ' . $p->service_name; ?>
					<?php else: ?>
						<?php echo TickTock::displayDate($p->payment_date) . '*' . $p->service_name; ?>
						<?php $show_unconfirmed = true; ?>
					<?php endif; ?>
				</td>
				<td style="width:30%;text-align:right;">
					<?php if ($p->base_amount > 0): ?>
						<?php echo $fex . '-' . Utility::displayValue($p->base_amount, $contract->currency); ?>
					<?php else: ?>
						<?php echo $fex . Utility::displayValue(abs($p->base_amount), $contract->currency); ?>
					<?php endif; ?>
				</td>
				<td style="width:30%;text-align:right;">
				</td>
			</tr>

			<?php if ($p->note): ?>
				<tr>
					<td colspan="3" style="text-indent:20px;">
						<?php echo '(' . $p->note . ')'; ?>
					</td>
				</tr>
			<?php endif; ?>
		<?php endforeach; ?>

		<tr>
			<td style="width:40%;text-indent:20px;">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_RECEIVED'); ?>
			</td>
			<td style="width:30%;">
			</td>
			<?php if ($payment_total > 0): ?>
				<td style="width:30%;text-align:right;">
					<?php echo '-' . Utility::displayValue($payment_total, $contract->currency); ?>
				</td>
			<?php else: ?>
				<td style="width:30%;text-align:right;color:#cc0000;">
					<?php echo Utility::displayValue($payment_total, $contract->currency); ?>
				</td>
			<?php endif; ?>
		</tr>

		<?php if ($show_unconfirmed): ?>
			<tr>
				<td style="width:40%;font-weight:bold;">
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_UNCONFIRMED'); ?>
				</td>
				<td colspan="2">
				</td>
			</tr>

			<tr>
				<td colspan="3">
				</td>
			</tr>
		<?php endif; ?>

		<?php $balance = Utility::roundValue($contract->contract_total + $fee_total - $payment_total,
			$contract->currency); ?>
		<?php $balance_all = Utility::roundValue($contract->contract_total + $fee_total - $payment_total
			- $pending_total, $contract->currency); ?>

		<?php $due = ''; ?>
		<?php $left = ''; ?>
		<?php if ($balance_all > 0): ?>
			<?php if (!$contract->balance_days && $payment_total): ?>
				<?php $left = KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_PAYMENT_ON_ARRIVAL'); ?>
			<?php elseif ($contract->balance_date > TickTock::getDate() && $contract->booking_status >= 10): ?>
				<?php $due = KrMethods::sprintf('COM_KNOWRES_DUE_BY',
					TickTock::displayDate($contract->balance_date)); ?>
				<?php $due = '(' . $due . ')'; ?>
				<?php $left = KrMethods::plain('COM_KNOWRES_BALANCE') . ' ' . $due; ?>
			<?php elseif ($contract->balance_date <= TickTock::getDate()): ?>
				<?php $due = KrMethods::plain('COM_KNOWRES_DUE_NOW'); ?>
				<?php $due = '(' . $due . ')'; ?>
				<?php $left = KrMethods::plain('COM_KNOWRES_BALANCE') . ' ' . $due; ?>
			<?php else: ?>
				<?php $left = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
			<?php endif; ?>
		<?php else: ?>
			<?php $left = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		<?php endif; ?>

		<tr>
			<td colspan="3"></td>
		</tr>
		<tr>
			<td style="width:40%;">
				<?php echo $left; ?>
			</td>
			<td style="width:30%;">
			</td>
			<td style="width:30%;text-align:right;">
				<?php echo Utility::displayValue($balance, $contract->currency); ?>
			</td>
		</tr>
	<?php endif; ?>
</table>