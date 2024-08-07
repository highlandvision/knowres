<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
?>

<div id="kr-totals">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<div class="total-text"><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_TOTAL'); ?></div>
			<div id="hilite_total" class="hilite-total"></div>
			<div class="total-summary">
				<?php echo KrMethods::render('confirm.summary', ['data' => $this->contractData]); ?>

				<br><br>
				<button type="button" data-toggle="kr-guest-totals" class="button secondary small milk">
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_VIEW_BREAKDOWN'); ?>
				</button>
			</div>
		</div>
	</div>

	<div id="kr-guest-totals" data-toggler=".hideme" class="text-left hideme">
		<div class="grid-x grid-margin-x">
			<div id="room_total_gross_text" class="small-7 cell"></div>
			<div id="room_total_gross" class="small-5 cell text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="discount_text" class="small-5 cell red"></div>
			<div id="discount" class="small-4 cell red text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="coupon_text" class="small-5 cell red"></div>
			<div id="coupon_discount" class="small-4 cell red text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="hr" class="small-12 cell"></div>
			<div id="room_total_text" class="small-7 cell"></div>
			<div id="room_total" class="small-5 cell text-right"></div>
		</div>

		<div id="taxbreakdown1"></div>
		<div id="extrasbreakdown"></div>

		<div class="grid-x grid-margin-x">
			<div class="small-7 cell strong">
				<?php echo strtoupper(KrMethods::plain('COM_KNOWRES_CONFIRM_TOTAL')); ?>
			</div>
			<div id="contract_total" class="small-5 cell strong text-right"></div>
			<br>
		</div>
		<br>
		<div id="taxbreakdown2"></div>
		<div id="taxbreakdown3"></div>
	</div>

	<div class="grid-x grid-margin-x payment-info">
		<div class="small-12 cell text-center">
			<div id="deposit_date"></div>
			<div id="deposit"></div>
			<div id="request_note"></div>
			<div id="balance_date"></div>
			<div id="balance"></div>

			<?php if ((float) $this->property->security_amount > 0): ?>
				<div><?php echo KrMethods::plain('COM_KNOWRES_SECURITY_DEPOSIT'); ?></div>
				<div class="security">
					<?php echo Utility::displayValue($this->property->security_amount,
						$this->contractData->currency); ?>
				</div>
				<small style="padding:0 0.5rem;">
					<?php echo $this->property->security_text; ?>
				</small>
			<?php endif; ?>
		</div>
	</div>
</div>