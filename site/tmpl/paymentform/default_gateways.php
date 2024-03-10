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

$this->checked       = 'checked';
$surcharge_displayed = false;
?>

<div class="grid-x grid-margin-x hideme" id="kr-gateways">
	<div class="small-12 cell">
		<?php if (count($this->gateways) > 1) : ?>
			<h6>
				<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_SELECT'); ?>
			</h6>
		<?php endif; ?>

		<?php foreach ($this->gateways as $this->gateway): ?>
			<?php if ($this->gateway->plugin === 'paypal'): ?>
				<?php $this->paypal_found = true; ?>
				<?php $this->client_id = $this->gateway->client_id; ?>
				<?php $this->currency = $this->gateway->currency; ?>
			<?php endif; ?>
			<?php if ($this->gateway->surcharge > 0 && !$surcharge_displayed) : ?>
				<p class="small" style="margin-top:5px;">
					<i><?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_SELECT_SURCHARGE'); ?></i>
				</p>
				<?php $surcharge_displayed = true; ?>
			<?php endif; ?>
		<?php endforeach; ?>

		<div class="callout">
			<?php foreach ($this->gateways as $this->gateway): ?>
				<?php echo $this->loadTemplate('gateway'); ?>
				<?php $this->checked = ""; ?>
			<?php endforeach; ?>
		</div>

		<?php echo KrMethods::render('payment.terms', [
			'title' => KrMethods::plain('COM_KNOWRES_CANCELLATION_TERMS'),
			'text'  => $this->Translations->getText('agency', $this->contract->agency_id, 'cancellation_terms'),
			'label' => KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS_CANCELLATION'),
			'name'  => "agreecheckc"
		]);
		?>

		<?php echo KrMethods::render('payment.terms', [
			'title' => KrMethods::plain('COM_KNOWRES_TRAVEL_INSURANCE'),
			'text'  => $this->Translations->getText('agency', $this->contract->agency_id, 'insurance_disclaimer'),
			'label' => KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS_INSURANCE'),
			'name'  => "agreecheckt"
		]);
		?>

		<div class="callout formbg small">
			<input type="checkbox" class="checkover" name="agreecheck" id="agreecheck">
			<label class="checklabel" for="agreecheck">
				<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS1'); ?>
				<a data-open="kr-terms-modal" style="text-decoration:underline;">
					<?php echo KrMethods::sprintf('COM_KNOWRES_PAYMENT_TERMS2', KrMethods::getCfg('sitename')); ?>
				</a>
			</label>
		</div>
		<button type="submit" id="checkterms" class="button expanded validate">
			<span><?php echo KrMethods::plain('COM_KNOWRES_PAY_NOW'); ?></span>
		</button>
	</div>
</div>