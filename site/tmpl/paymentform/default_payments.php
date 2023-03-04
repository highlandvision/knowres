<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;

$this->client_id    = '';
$this->currency     = '';
$this->paypal_found = false;

$due             = 0;
$balance_payable = $this->contract->contract_total - $this->contract->deposit;
$balance_date    = max($this->contract->balance_date, $this->today);
?>

<div class="callout">
	<?php if ($this->contract->booking_status < 10): ?>
		<?php $lang = !$balance_payable ? 'COM_KNOWRES_PAYMENT_FULL_OF' : 'COM_KNOWRES_PAYMENT_DEPOSIT_OF'; ?>
		<?php $text = KrMethods::plain($lang); ?>

		<?php if ($this->contract->booking_status < 5): ?>
			<?php $due = $this->contract->deposit; ?>
			<?php echo KrMethods::render('dashboard.payment.payments', [
				'text'     => $text,
				'value'    => $this->contract->deposit,
				'currency' => $this->contract->currency,
				'date'     => KrMethods::plain('COM_KNOWRES_PAYMENT_DUE'),
				'right'    => '',
				'due'      => $this->contract->deposit
			]); ?>
		<?php elseif ($this->contract->booking_status == 5 || $this->contract->booking_status == 35): ?>
			<?php echo KrMethods::render('dashboard.payment.payments',
				['text'     => $text,
				 'value'    => $this->contract->deposit,
				 'currency' => $this->contract->currency,
				 'date'     => KrMethods::sprintf('COM_KNOWRES_PAYMENT_DUE_BY',
					 TickTock::displayDate($this->contract->expiry_date)),
				 'right'    => KrMethods::plain('COM_KNOWRES_PAYMENT_PENDING'),
				 'due'      => 0
				]); ?>
		<?php endif; ?>
		<?php if ($balance_payable): ?>
			<hr>
			<?php if (!$this->contract->balance_days): ?>
				<?php echo KrMethods::render('dashboard.payment.payments',
					['text'     => KrMethods::plain('COM_KNOWRES_BALANCE_ARRIVAL'),
					 'value'    => $balance_payable,
					 'currency' => $this->contract->currency,
					 'date'     => '',
					 'right'    => $this->property->security_text ?: '',
					 'due'      => 0
					]); ?>
			<?php else: ?>
				<?php echo KrMethods::render('dashboard.payment.payments',
					['text'     => KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE'),
					 'value'    => $balance_payable,
					 'currency' => $this->contract->currency,
					 'date'     => KrMethods::sprintf('COM_KNOWRES_PAYMENT_DUE_BY',
						 TickTock::displayDate($this->contract->balance_date)),
					 'right'    => '',
					 'due'      => 0
					]); ?>
			<?php endif; ?>
		<?php endif; ?>
	<?php elseif ($this->balance > 0): ?>
		<?php if ($this->contract->agent_id && $this->contract->agent_deposit_paid): ?>
			<?php if ((float) $this->contract->deposit > 0): ?>
				<?php echo KrMethods::render('dashboard.payment.payments',
					['text'     => KrMethods::plain('COM_KNOWRES_DEPOSIT'),
					 'value'    => $this->contract->deposit,
					 'currency' => $this->contract->currency,
					 'date'     => '',
					 'right'    => KrMethods::sprintf('COM_KNOWRES_PAID_AGENT', $this->agent->name),
					 'due'      => 0
					]); ?>
			<?php endif; ?>
		<?php else: ?>
			<?php echo KrMethods::render('dashboard.payment.payments',
				['text'     => KrMethods::plain('COM_KNOWRES_PAYMENT_DEPOSIT_OF'),
				 'value'    => $this->contract->deposit,
				 'currency' => $this->contract->currency,
				 'date'     => '',
				 'right'    => KrMethods::plain('COM_KNOWRES_PAYMENT_RECEIVED'),
				 'due'      => 0
				]); ?>
		<?php endif; ?>

		<?php if (!$this->contract->balance_days): ?>
			<hr>
			<?php $right = KrMethods::plain('COM_KNOWRES_BALANCE_ARRIVAL'); ?>
			<?php if (isset($this->property->security_text) && $this->property->security_text): ?>
				<?php $right .= '<br><em>' . $this->property->security_text . '</em>'; ?>
			<?php endif; ?>

			<?php echo KrMethods::render('dashboard.payment.payments',
				['text'     => KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE'),
				 'value'    => $this->balance,
				 'currency' => $this->contract->currency,
				 'date'     => '',
				 'right'    => $right,
				 'due'      => 0
				]); ?>
		<?php elseif ($this->payment_total !== $this->payment_confirmed): ?>
			<?php echo KrMethods::render('dashboard.payment.payments',
				['text'     => KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE'),
				 'value'    => $this->payment_total - $this->payment_confirmed,
				 'currency' => $this->contract->currency,
				 'date'     => KrMethods::sprintf('COM_KNOWRES_PAYMENT_DUE_BY', TickTock::displayDate($balance_date)),
				 'right'    => KrMethods::plain('COM_KNOWRES_PAYMENT_PENDING'),
				 'due'      => 0
				]); ?>
		<?php else: ?>
			<?php $due = $this->balance; ?>
			<?php echo KrMethods::render('dashboard.payment.payments',
				['text'     => KrMethods::plain('COM_KNOWRES_PAYMENT_BALANCE'),
				 'value'    => $this->balance,
				 'currency' => $this->contract->currency,
				 'date'     => KrMethods::sprintf('COM_KNOWRES_PAYMENT_DUE_BY', TickTock::displayDate($balance_date)),
				 'right'    => '',
				 'due'      => $this->balance
				]); ?>
		<?php endif; ?>
	<?php endif; ?>
</div>

<?php if ($due): ?>
	<?php echo $this->loadTemplate('gateways'); ?>
<?php endif; ?>

<?php if ($this->paypal_found): ?>
	<script
		src="https://www.paypal.com/sdk/js?client-id=<?php echo $this->client_id; ?>&currency=<?php echo $this->currency; ?>"
		data-order-id="<?php echo $this->contract->tag; ?>"></script>
<?php endif; ?>
