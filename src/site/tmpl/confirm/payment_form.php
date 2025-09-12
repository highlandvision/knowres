<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$multi = '';
foreach ($this->gateways as $gateway)
{
	if (!$multi)
	{
		$multi = $gateway->currency;
	}
	else if ($multi != $gateway->currency)
	{
		$multi = true;
		break;
	}
}

$Itemid = SiteHelper::getItemId('com_knowres', 'confirm', ['layout' => 'payment']);
$action = '/index.php?option=com_knowres&view=confirm&layout=payment&Itemid=' . $Itemid;
?>

<form action="<?php echo $action; ?>" class="ajaxform form-validate" id="kr-form-payment" method="post">
	<fieldset class="fieldset">
		<div class="callout">
			<h3>
				<?php if ($this->contractData->contract_total == $this->contractData->deposit): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_AMOUNT_DUE_FULL',
						Utility::displayValue($this->contractData->deposit, $this->contractData->currency),
						$this->when); ?>
				<?php else: ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_CONFIRM_AMOUNT_DUE_DEPOSIT',
						Utility::displayValue($this->contractData->deposit, $this->contractData->currency),
						$this->when); ?>
				<?php endif; ?>
			</h3>
			<h6 style="margin-top:0.5rem;">
				<?php if (!$multi): ?>
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_METHOD'); ?>
				<?php else: ?>
					<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_METHOD_CURRENCY'); ?>
				<?php endif; ?>
			</h6>
			<?php foreach ($this->gateways as $this->gateway) : ?>
				<?php if ($this->gateway->plugin === 'paypal'): ?>
					<?php $this->paypal_found = true; ?>
					<?php $this->client_id = $this->gateway->client_id; ?>
					<?php $this->currency = $this->gateway->currency; ?>
				<?php endif; ?>
				<?php echo $this->loadTemplate('gateway'); ?>
				<?php $this->checked = ''; ?>
			<?php endforeach; ?>
		</div>

		<?php if ($this->property->booking_type == 1): ?>
			<fieldset class="fieldset">
				<div class="callout alert">
					<p>
						<?php $params = KrMethods::getParams(); ?>
						<?php echo nl2br($this->params->get('booking_request_text')); ?>
					</p>
				</div>
			</fieldset>
		<?php endif; ?>

		<?php echo KrMethods::render('payment.terms', [
			'title' => KrMethods::plain('COM_KNOWRES_CANCELLATION_TERMS'),
			'text'  => $this->Translations->getText('agency', $this->contractData->agency_id, 'cancellation_terms'),
			'label' => KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS_CANCELLATION'),
			'name'  => "agreecheckc"
		]);
		?>

		<?php echo KrMethods::render('payment.terms', [
			'title' => KrMethods::plain('COM_KNOWRES_TRAVEL_INSURANCE'),
			'text'  => $this->Translations->getText('agency', $this->contractData->agency_id, 'insurance_disclaimer'),
			'label' => KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS_INSURANCE'),
			'name'  => "agreecheckt"
		]);
		?>

		<div class="callout small primary">
			<input type="checkbox" class="checkover" name="agreecheck" id="agreecheck">
			<label class="checklabel" for="agreecheck">
				<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_TERMS1'); ?>
				<a data-open="kr-terms-modal" style="text-decoration:underline;">
					<?php echo KrMethods::sprintf('COM_KNOWRES_PAYMENT_TERMS2', KrMethods::getCfg('sitename')); ?>
				</a>
			</label>
		</div>
	</fieldset>

	<button type="submit" id="checkterms" class="button expanded large validate">
		<?php if ($this->property->booking_type == 2) : ?>
			<span><?php echo KrMethods::plain('COM_KNOWRES_MAKE_A_PAYMENT'); ?></span>
		<?php else: ?>
			<span><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_PAYMENT_SUBMIT'); ?></span>
		<?php endif; ?>
	</button>

	<input type="hidden" name="task" value="confirm.save" />
	<?php echo HTMLHelper::_('form.token'); ?>
</form>