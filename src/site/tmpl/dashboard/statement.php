<?php
/**
 * @package     Know Reservations
 * @subpackage  Site TemplateEmail
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="grid-x grid-margin-x">
	<br><br>
	<div class="small-12 cell">
		<?php if ($this->balance > 0): ?>
			<h6><?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_SCHEDULE'); ?></h6>
			<div class="callout small financial">
				<?php if (is_countable($this->payments) && count($this->payments)): ?>
					<?php echo KrMethods::render('dashboard.schedule.payments',
					                             ['contract' => $this->item,
					                              'fees'     => $this->fees,
					                              'payments' => $this->payments,
					                              'balance'  => $this->balance
					                             ]);
					?>
				<?php else: ?>
					<?php echo KrMethods::render('dashboard.schedule.nopayments',
					                             ['contract' => $this->item,
					                              'fees'     => $this->fees,
					                              'balance'  => $this->balance
					                             ]);
					?>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<h6><?php echo KrMethods::plain('COM_KNOWRES_YOUR_STATEMENT'); ?></h6>
		<div class="callout small financial">
			<?php echo KrMethods::render('dashboard.summary', ['contract'    => $this->item,
			                                                   'fees'        => $this->fees,
			                                                   'payments'    => $this->payments,
			                                                   'audience'    => $this->audience,
			                                                   'balance'     => $this->balance,
			                                                   'balance_all' => $this->balance_all,
			]); ?>
		</div>

		<?php if (count($this->notes)) : ?>
			<h6><?php echo KrMethods::plain('COM_KNOWRES_NOTES'); ?></h6>
			<?php foreach ($this->notes as $p) : ?>
				<div class="callout small">
					<?php echo nl2br($p->note); ?>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</div>

<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button>