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

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if (!$this->item->black_booking && $this->balance != 0) : ?>
	<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('show_schedule'))): ?>
		<div class="card kr-card">
			<div class="card-header">
				<a class="showbefore collapsed" data-bs-toggle="collapse"
				   href="#panel-collapse-schedule" role="button" aria-expanded="false"
				   aria-controls="panel-collapse-schedule">
					<?php echo KrMethods::plain('COM_KNOWRES_SCHEDULE'); ?>
				</a>
			</div>
			<div class="collapse" id="panel-collapse-schedule">
				<div class="card-body">
					<?php if (is_countable($this->payments) && count($this->payments)): ?>
						<?php echo KrMethods::render('contract.show.schedule.payments',
							['contract' => $this->item,
							 'fees'     => $this->fees,
							 'payments' => $this->payments,
							 'balance'  => $this->balance
							]);
						?>
					<?php else: ?>
						<?php echo KrMethods::render('contract.show.schedule.nopayments',
							['contract' => $this->item,
							 'fees'     => $this->fees,
							 'balance'  => $this->balance
							]);
						?>
					<?php endif; ?>
				</div>
			</div>
		</div>
	<?php endif; ?>
<?php endif; ?>