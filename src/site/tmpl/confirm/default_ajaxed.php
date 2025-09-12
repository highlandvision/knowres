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

<div id="kr-totals" class="callout primary">
	<div class="grid-x grid-margin-x">
		<div class="small-12 cell">
			<h3 class="no-margin-bottom"><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_TOTAL'); ?></h3>
			<p id="hilite_total" class="big"></p>
			<div class="small total-summary">
				<?php echo KrMethods::render('confirm.summary', ['data' => $this->contractData]); ?>
				<button type="button" data-toggle="kr-guest-totals" class="button accent small">
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_VIEW_BREAKDOWN'); ?>
				</button>
			</div>
		</div>
	</div>

	<div id="kr-guest-totals" data-toggler=".hideme" class="text-left hideme">
		<div class="grid-x grid-margin-x">
			<div id="room_total_gross_text" class="small-7 cell text-left"></div>
			<div id="room_total_gross" class="small-5 cell text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="discount_text" class="small-5 cell red text-left"></div>
			<div id="discount" class="small-4 cell red text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="coupon_text" class="small-5 cell red text-left"></div>
			<div id="coupon_discount" class="small-4 cell red text-right"></div>
		</div>
		<div class="grid-x grid-margin-x">
			<div id="hr" class="small-12 cell"></div>
			<div id="room_total_text" class="small-7 cell text-left"></div>
			<div id="room_total" class="small-5 cell text-right"></div>
		</div>

		<div id="taxbreakdown1"></div>
		<div id="extrasbreakdown"></div>

		<div class="grid-x grid-margin-x">
			<div class="small-7 cell strong text-left">
				<?php echo strtoupper(KrMethods::plain('COM_KNOWRES_CONFIRM_TOTAL')); ?>
			</div>
			<div id="contract_total" class="small-5 cell text-right"></div>
		</div>
		<div id="taxbreakdown2"></div>
		<div id="taxbreakdown3"></div>
	</div>

	<div class="grid-x grid-margin-x payment-info">
		<div class="small-12 cell text-center">
			<h4 id="deposit_date" class="no-margin-bottom"></h4>
			<p id="deposit" class="bigger"></p>
			<p id="request_note"></p>
			<h4 id="balance_date" class="no-margin-bottom"></h4>
			<p id="balance" class="bigger"></p>

			<?php if ((float) $this->property->security_amount > 0): ?>
				<div class="security no-margin-bottom">
					<h6 class="no-margin-bottom"><?php echo KrMethods::plain('COM_KNOWRES_SECURITY_DEPOSIT'); ?></h6>
					<p class="bigger no-margin-bottom">
						<?php echo Utility::displayValue($this->property->security_amount,
							$this->contractData->currency); ?>
					</p>
					<small><?php echo $this->property->security_text; ?></small>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>