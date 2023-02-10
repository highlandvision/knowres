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
 * @var false|object $item        The contract item.
 * @var mixed        $fees        Contract fees
 * @var mixed        $payments    Contract payments
 * @var string       $audience    The type of viewee
 * @var float        $balance     Current confirmed balance.
 * @var float        $balance_all Current balance less unconfirmed payments.
 * @var array        $notes       Contract notes.
 */
?>

<?php if (!Utility::compareFloat($item->room_total_gross, $item->room_total)): ?>
	<div class="row">
		<div class="col-6 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_ROOM_TOTAL_GROSS_LBL'); ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 text-end">
			<?php echo Utility::displayValue($item->room_total_gross, $item->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($item->discount > 0): ?>
	<div class="row">
		<div class="col-6 red">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_DISCOUNT_LBL'); ?>
		</div>
		<div class="col-3 red text-end">
			<?php echo '-' . Utility::displayValue($item->discount, $item->currency); ?>
		</div>
		<div class="col-3 text-end">
		</div>
	</div>
<?php endif; ?>

<?php if ($item->coupon_discount > 0): ?>
	<div class="row">
		<div class="col-6 indent red">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_COUPON_DISCOUNT_LBL'); ?>
		</div>
		<div class="col-3 red text-end">
			<?php echo '-' . Utility::displayValue($item->coupon_discount, $item->currency); ?>
		</div>
		<div class="col-3 text-end">
		</div>
	</div>
<?php endif; ?>

	<div class="row">
		<div class="col-6 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_ROOM_TOTAL_LBL'); ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 strong text-end">
			<?php echo Utility::displayValue($item->room_total, $item->currency); ?>
		</div>
	</div>

	<!--JSA only-->
<?php if (KrMethods::getParams()->get('property_rooms', 0)): ?>
	<?php if (is_countable($notes)): ?>
		<?php foreach ($notes as $n): ?>
			<?php if (str_contains($n->note_type, 2)): ?>
				<div class="row">
					<div class="col-11 col-offset-1">
						<?php echo nl2br($n->note); ?>
					</div>
				</div>
			<?php endif; ?>
		<?php endforeach; ?>
	<?php endif; ?>
<?php endif; ?>

<?php echo KrMethods::render('contract.show.taxes',
	['taxes'     => $item->taxes,
	 'tax_total' => $item->tax_total,
	 'currency'  => $item->currency
	]
)
?>

<?php if (count($item->extras)): ?>
	<div class="row" style="margin-top:10px;">
		<div class="col-6">
			<?php echo KrMethods::plain('COM_KNOWRES_EXTRA_TITLE'); ?>
		</div>
	</div>

	<?php $prices_inclusive = 1; ?>
	<?php foreach ($item->extras as $e => $d): ?>
		<?php if (!empty($e) && $e > 0): ?>
			<?php $extra = KrFactory::getAdminModel('extra')->getItem($e); ?>
			<?php $name = $extra->name; ?>
			<?php $value = $d['value']; ?>
			<?php if ((int) $d['quantity'] > 1): ?>
				<?php $name = $name . ' x ' . $d['quantity']; ?>
			<?php endif; ?>

			<div class="row infolist">
				<div class="col-6 indent">
					<?php echo $name; ?>
				</div>
				<div class="col-3 text-end">
					<?php echo Utility::displayValue($value, $item->currency); ?>
				</div>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>

	<div class="row">
		<div class="col-6">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_EXTRAS_TOTAL'); ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 text-end">
			<?php echo Utility::displayValue($item->extra_total, $item->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php $fee_total = 0; ?>
<?php if (isset($fees) && count($fees)): ?>
	<div class="row" style="margin-top:5px;">
		<div class="col-6">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEE_TITLE'); ?>
		</div>
	</div>

	<?php foreach ($fees as $fee): ?>
		<div class="row">
			<div class="col-6 indent">
				<?php echo TickTock::displayDate($fee->created_at) . ' - ' . $fee->description; ?>
			</div>
			<div class="col-3 text-end">
				<?php echo Utility::displayValue($fee->value, $item->currency); ?>
			</div>
		</div>

		<?php $fee_total += $fee->value; ?>
	<?php endforeach; ?>
<?php endif; ?>

<?php if ($fee_total > 0): ?>
	<div class="row">
		<div class="col-6 subtotal">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTFEES_TOTAL'); ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 text-end">
			<?php echo Utility::displayValue($fee_total, $item->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($item->room_total != $item->contract_total + $fee_total): ?>
	<div class="row" style="margin-top:10px;">
		<div class="col-6 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_CONTRACT_TOTAL_LBL'); ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 heading strong text-end">
			<?php echo Utility::displayValue($item->contract_total + $fee_total, $item->currency); ?>
		</div>
	</div>
<?php endif; ?>

<?php $payment_total = 0; ?>
<?php $pending_total = 0; ?>
<?php if (isset($payments) && is_countable($payments) && count($payments)): ?>
	<div class="row" style="margin-top:10px;">
		<div class="col-12">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?>
		</div>
	</div>

	<?php foreach ($payments as $p): ?>
		<?php
		$refund = $p->amount < 0;
		$fex    = '';
		if ($p->amount != $p->base_amount)
		{
			$fex = '(' . Utility::displayValue($p->amount, $p->currency) . ' @ ' . $p->rate
				. ')&nbsp;&nbsp;&nbsp;';
		}
		if ($p->confirmed)
		{
			$payment_total += $p->base_amount;
		}
		else
		{
			$pending_total += $p->base_amount;
		}
		?>

		<div class="row">
			<div class="col-4 indent">
				<?php if ($p->service_plugin): ?>
					<?php echo TickTock::displayDate($p->payment_date, 'dMy') . ' '
						. KrMethods::sprintf('COM_KNOWRES_CONTRACTPAYMENTS_BY', ucfirst($p->service_plugin)); ?>
				<?php else: ?>
					<?php echo TickTock::displayDate($p->payment_date, 'dMy'); ?>
				<?php endif; ?>
			</div>
			<?php if ($p->base_amount > 0): ?>
				<div class="col-5 red text-end">
					<?php echo $fex . '-' . Utility::displayValue($p->base_amount, $item->currency); ?>
				</div>
			<?php else: ?>
				<div class="col-3 text-end">
					<?php echo $fex . Utility::displayValue(abs($p->base_amount), $item->currency); ?>
				</div>
			<?php endif; ?>
		</div>

		<?php if ($p->note && $audience == 'manager'): ?>
			<div class="row">
				<div class="col-12 indent">
					<p>(<?php echo $p->note; ?>)</p>
				</div>
			</div>
		<?php endif; ?>
	<?php endforeach; ?>

	<div class="row">
		<div class="col-6">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_RECEIVED'); ?>
		</div>
		<div class="col-3">
		</div>
		<?php if ($payment_total > 0): ?>
			<div class="col-3 red text-end">
				<?php echo '-' . Utility::displayValue($payment_total, $item->currency); ?>
			</div>
		<?php else: ?>
			<div class="col-3 text-end">
				<?php echo Utility::displayValue($payment_total, $item->currency); ?>
			</div>
		<?php endif; ?>
	</div>

	<?php if ($pending_total): ?>
		<div class="col-12">
			<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_UNCONFIRMED'); ?>
		</div>
	<?php endif; ?>

	<!--	<div class="row">-->
	<!--		<div class="col-5 divider">-->
	<!--			--><?php //echo KrMethods::plain('COM_KNOWRES_CONTRACT_CONTRACT_TOTAL_LBL'); ?>
	<!--		</div>-->
	<!--		<div class="col-4">-->
	<!--		</div>-->
	<!--		<div class="col-3 heading strong text-end">-->
	<!--			--><?php //echo Utility::displayValue($item->contract_total + $fee_total, $item->currency); ?>
	<!--		</div>-->
	<!--	</div>-->

	<?php $due = ''; ?>
	<?php if ($balance_all > 0): ?>
		<?php if (!$item->balance_days && $payment_total): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_PAYMENT_ON_ARRIVAL'); ?>
		<?php elseif ($item->balance_date > TickTock::getDate() && $item->booking_status >= 10): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE') . ' ('
				. KrMethods::sprintf('COM_KNOWRES_DUE_BY',
					TickTock::displayDate($item->balance_date)) . ')'; ?>
		<?php elseif ($item->balance_date <= TickTock::getDate()): ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE') . ' ('
				. KrMethods::plain('COM_KNOWRES_DUE_NOW')
				. ')'; ?>
		<?php else: ?>
			<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
		<?php endif; ?>
	<?php else: ?>
		<?php $due = KrMethods::plain('COM_KNOWRES_BALANCE'); ?>
	<?php endif; ?>

	<div class="row" style="margin-top:10px;">
		<div class="col-6 heading strong">
			<?php echo $due; ?>
		</div>
		<div class="col-3">
		</div>
		<div class="col-3 heading strong text-end">
			<?php echo Utility::displayValue($balance, $item->currency); ?>
		</div>
	</div>
<?php endif; ?>