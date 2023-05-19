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
use HighlandVision\KR\Utility;
?>

<div class="manager-totals">
	<fieldset>
		<legend>
			<?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_SUMMARY'); ?>
		</legend>

		<div class="row" style="margin-bottom:0.5rem;">
			<div class="col">
				<?php echo KrMethods::plain('COM_KNOWRES_NIGHTS'); ?>
			</div>
			<div class="col text-end" id="jform_nights">
				<?php echo $this->nights; ?>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<?php echo $this->form->getLabel('room_total_gross'); ?>
			</div>
			<div class="col text-end">
				<?php $this->form->setFieldAttribute('room_total_gross', 'required', true); ?>
				<?php $this->form->setValue('room_total_gross', '',
					Utility::displayMoney($this->item->room_total_gross, $this->dp)); ?>
				<?php echo $this->form->getInput('room_total_gross'); ?>
			</div>
		</div>

		<div id="jform_adjustments"></div>
		<hr>

		<div class="row">
			<div class="col">
				<?php echo $this->form->getLabel('discount'); ?>
			</div>
			<div class="col text-end">
				<?php $this->form->setValue('discount', '', Utility::displayMoney($this->item->discount, $this->dp)); ?>
				<?php echo $this->form->getInput('discount'); ?>
			</div>
		</div>

		<div id="jform_discounts"></div>

		<?php if ($this->show_coupon): ?>
			<hr>
			<div class="row">
				<div class="col">
					<?php echo $this->form->getLabel('coupon_discount'); ?>
				</div>
				<div class="col text-end">
					<div id="jform_coupon_discount">
						<?php echo Utility::displayValue($this->item->coupon_discount, $this->settings['currency']); ?>
					</div>
				</div>
			</div>
		<?php endif; ?>
		<hr>
		<div class="row">
			<div class="col" style="min-height:18px">
				<?php echo $this->form->getLabel('room_total'); ?>
			</div>
			<div class="col text-end" style="min-height:18px">
				<div id="jform_room_total">
					<?php echo Utility::displayValue($this->item->room_total, $this->settings['currency']); ?>
				</div>
			</div>
		</div>
		<div class="row infolist">
			<div class="col-6">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_NET_PRICE_SYSTEM_LBL'); ?>
			</div>
			<div class="col-3 text-end" id="jform_net_price_system">
				<?php echo Utility::displayValue($this->item->net_price, $this->settings['currency']); ?>
			</div>
		</div>
		<div class="row infolist">
			<div class="col-6">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_COMMISSION_LBL'); ?>
			</div>
			<div class="col-3 text-end" id="jform_commission">
				<?php echo Utility::displayValue($this->item->commission, $this->settings['currency']); ?>
			</div>
		</div>
		<hr>
		<div id="jform_taxes"></div>
		<div id="jform_extras"></div>
		<div class="row">
			<div class="col">
				<?php echo $this->form->getLabel('contract_total'); ?>
			</div>
			<div class="col text-end" id="jform_contract_total">
				<?php echo Utility::displayValue($this->item->contract_total, $this->settings['currency']); ?>
			</div>
		</div>
	</fieldset>
</div>
<br>
<div class="manager-totals">
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?></legend>
		<small>
			<?php echo KrMethods::plain('COM_KNOWRES_ERROR_DEPOSIT_CLEAR'); ?>
		</small>
		<br>

		<div class="row">
			<div class="col-7">
				<label id="jform_deposit_lbl" for="jform_deposit">
					<span id="jform_deposit_date"></span>
				</label>
			</div>
			<div class="col text-end">
				<?php $this->form->setValue('deposit', '',
					Utility::displayMoney($this->item->deposit, $this->dp)); ?>
				<?php echo $this->form->getInput('deposit'); ?>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-7">
				<label id="jform_balance_lbl" for="jform_balance">
					<span id="jform_balance_date"></span>
				</label>
			</div>
			<div class="col text-end">
				<div id="jform_balance"></div>
			</div>
		</div>

		<div id="jform_taxbreakdown2"></div>
	</fieldset>
</div><br>
<div class="row">
	<div>
		<button type="button" id="manual" data-override="manual" class="btn btn-primary kr-calculate">
			<?php echo KrMethods::plain('COM_KNOWRES_UPDATE_OVERRIDE'); ?>
		</button>
	</div>
	<br><br>
	<small><?php echo KrMethods::plain('COM_KNOWRES_UPDATE_WARNING'); ?></small>
</div>