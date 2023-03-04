<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

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
			<div class="col text-end" id="jform_nights"></div>
		</div>
		<div class="row">
			<div class="col">
				<?php echo $this->form->getLabel('room_total'); ?>
			</div>
			<div class="col text-end" id="jform_room_total">
			</div>
		</div>
		<div class="row infolist red">
			<div class="col-6">
				<?php echo $this->form->getLabel('net_price_system'); ?>
			</div>
			<div class="col-3 text-end" id="jform_net_price_system">
				<?php echo Utility::displayValue($this->item->net_price, $this->settings['currency']); ?>
			</div>
		</div>
		<div class="row infolist red">
			<div class="col-6">
				<?php echo $this->form->getLabel('commission'); ?>
			</div>
			<div class="col-3 text-end" id="jform_commission">
				<?php echo Utility::displayValue($this->item->commission, $this->settings['currency']); ?>
			</div>
		</div>
		<div class="row">
			<br>
			<span id="jform_adjustments"></span>
		</div>
		<hr>
		<div id="jform_taxes"></div>
		<div id="jform_extras"></div>

		<div class="row">
			<div class="col">
				<?php echo $this->form->getLabel('contract_total'); ?>
			</div>
			<div class="col text-end" id="jform_contract_total">
			</div>
		</div>
		<hr>
	</fieldset>
</div>

<br>
<div class="manager-totals">
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTPAYMENTS_TITLE'); ?></legend>
		<div class="row">
			<div class="col-8">
				<label id="jform_hdeposit" for="jform_hdeposit">
					<span id="jform_deposit_date"></span>
				</label>
			</div>
			<div class="col text-end">
				<div id="jform_deposit"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-8">
				<div id="jform_balance_date"></div>
			</div>
			<div class="col text-end">
				<div id="jform_balance"></div>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-8">
				<?php echo $this->form->getLabel('agent_commission'); ?>
			</div>
			<div class="col text-end" id="jform_agent_commission"></div>
		</div>
	</fieldset>
</div>