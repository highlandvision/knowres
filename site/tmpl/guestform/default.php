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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

$settings = KrFactory::getListModel('propertysettings')->getPropertysettings($this->property_id);

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<div class="row">
	<div class="small-12 medium-8 medium-offset-2 columns">
		<?php if (!$this->contract_id): ?>
			<h1 class="h3"><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_EDIT_GUEST'); ?></h1>
			<div class="callout small alert">
				<p class="vsmall"><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_EDIT_GUEST2'); ?></p>
			</div>
		<?php else: ?>
			<h1 class="h3"><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_PAYMENT_GUEST'); ?></h1>
		<?php endif; ?>

		<form action="<?php echo 'index.php?option=com_knowres'; ?>"
		      aria-label="<?php echo $this->form_aria_label; ?>" class="formbg form-validate" id="kr-guest-form"
		      method="post" name="adminForm">

			<fieldset class="fieldset">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_LEAD_GUEST'); ?></legend>

				<div class="callout small formbg">
					<div class="row">
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('firstname'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('surname'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('mobile_country_id'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('mobile'); ?>
						</div>
					</div>

					<?php if ($this->params->get('guestdata_document', 0)) : ?>
						<div class="row">
							<div class="small-12 medium-6 columns">
								<?php echo $this->form->getLabel('document_type'); ?>
								<?php echo $this->form->getInput('document_type'); ?>
							</div>
							<div class="small-12 medium-6 columns">
								<?php echo $this->form->getLabel('document_id'); ?>
								<?php echo $this->form->getInput('document_id'); ?>
							</div>
							<div class="small-12 columns">
								<div class="callout success small">
									<div class="smaller">
										<p><?php echo KrMethods::plain('COM_KNOWRES_DOCUMENT_TYPE_TEXT_DSC'); ?></p>
										<ul style="list-style-type:disc;padding-left: 1rem;margin-left:1rem;">
											<li><?php echo KrMethods::plain('COM_KNOWRES_DOCUMENT_TYPE_TEXT1_DSC'); ?></li>
											<li><?php echo KrMethods::plain('COM_KNOWRES_DOCUMENT_TYPE_TEXT2_DSC'); ?></li>
											<li><?php echo KrMethods::plain('COM_KNOWRES_DOCUMENT_TYPE_TEXT3_DSC'); ?></li>
											<li><?php echo KrMethods::plain('COM_KNOWRES_DOCUMENT_TYPE_TEXT4_DSC'); ?></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					<?php endif; ?>
				</div>
			</fieldset>

			<fieldset class="fieldset">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_GUEST_ADDITIONAL_CONTACT_DETAILS'); ?></legend>
				<div class="callout small formbg">
					<div class="callout success small">
						<p class="vsmall"><?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL_EMAIL_CHANGE'); ?></p>
					</div>

					<div class="row">
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('email_2'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('email_3'); ?>
						</div>
					</div>

					<?php echo $this->form->renderFieldSet('additionalphone'); ?>
				</div>
			</fieldset>

			<fieldset class="fieldset">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_MAILING_ADDRESS'); ?></legend>
				<div class="callout small formbg">
					<div class="row">
						<?php if ((int) $settings['bookingform_requiredfields_address1'] == 1) : ?>
							<?php $this->form->setFieldAttribute('address1', 'required', 'true'); ?>
						<?php endif; ?>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('address1'); ?>
						</div>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('address2'); ?>
						</div>
					</div>
					<div class="row">
						<?php if ((int) $settings['bookingform_requiredfields_town'] == 1) : ?>
							<?php $this->form->setFieldAttribute('town', 'required', 'true'); ?>
						<?php endif; ?>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('town'); ?>
						</div>

						<?php if ((int) $settings['bookingform_requiredfields_postcode'] == 1) : ?>
							<?php $this->form->setFieldAttribute('postcode', 'required', 'true'); ?>
						<?php endif; ?>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('postcode'); ?>
						</div>
					</div>
					<div class="row">
						<?php if ((int) $settings['bookingform_requiredfields_region'] == 1) : ?>
							<?php $this->form->setFieldAttribute('region_id', 'required', 'true'); ?>
							<?php $this->form->setFieldAttribute('country_id', 'required', 'true'); ?>
						<?php endif; ?>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('country_id'); ?>
						</div>
						<div class="small-12 medium-6 columns end">
							<?php echo $this->form->renderField('region_id'); ?>
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset class="fieldset">
				<legend>
					<?php echo KrMethods::plain('COM_KNOWRES_BILLING_ADDRESS'); ?>
				</legend>

				<div class="callout small formbg">
					<div class="row">
						<div class="small-12 medium-6 columns" style="margin-bottom:10px;">
							<?php echo $this->form->renderField('billing'); ?>
						</div>
					</div>
					<div class="row">
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_address1'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_address2'); ?>
						</div>
					</div>
					<div class="row">
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_town'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_postcode'); ?>
						</div>
					</div>
					<div class="row">
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_country_id'); ?>
						</div>
						<div class="small-12 medium-6 columns">
							<?php echo $this->form->renderField('b_region_id'); ?>
						</div>
					</div>
				</div>
			</fieldset>

			<?php if (!empty($this->gdpr)): ?>
				<div class="callout small alert">
					<p class="vsmall"><?php echo $this->gdpr; ?></p>
				</div>
			<?php endif; ?>

			<div class="text-right">
				<?php if ($this->contract_id) : ?>
					<button type="submit" class="button primary">
						<?php echo KrMethods::plain('COM_KNOWRES_PAY_NOW'); ?>
					</button>
				<?php else: ?>
					<button type="submit" class="button primary">
						<?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_UPDATE_ITEM'); ?>
					</button>
				<?php endif; ?>

				<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=dashboard.cancel'); ?>"
				   class="button clear small" title="<?php echo KrMethods::plain('JCANCEL'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_OR_CANCEL'); ?>
				</a>
			</div>

			<?php echo HTMLHelper::_('form.token'); ?>
			<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
			<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
			<input type="hidden" name="jform[email]" value="<?php echo $this->item->email; ?>">
			<input type="hidden" name="task" value="guest.save">
		</form>
	</div>
</div>

<script>
	function fillBilling(checked) {
		if (checked) {
			document.getElementById('jform_b_address1').value = document.getElementById('jform_address1').value;
			document.getElementById('jform_b_address2').value = document.getElementById('jform_address2').value;
			document.getElementById('jform_b_town').value = document.getElementById('jform_town').value;
			document.getElementById('jform_b_postcode').value = document.getElementById('jform_postcode').value;

			let first = document.getElementById('jform_country_id');
			let data = first.innerHTML;
			let second = document.getElementById('jform_b_country_id');
			second.innerHTML = second.innerHTML + data;

			first = document.getElementById('jform_region_id');
			data = first.innerHTML;
			second = document.getElementById('jform_b_region_id');
			second.innerHTML = second.innerHTML + data;

			document.getElementById('jform_b_country_id').value = document.getElementById('jform_country_id').value;
			document.getElementById('jform_b_region_id').value = document.getElementById('jform_region_id').value;
		} else {
			document.getElementById('jform_b_address1').value = '';
			document.getElementById('jform_b_address2').value = '';
			document.getElementById('jform_b_town').value = '';
			document.getElementById('jform_b_postcode').value = '';
			document.getElementById('jform_b_country_id').value = 0;
			document.getElementById('jform_b_region_id').value = 0;
		}
	}
	async function comboGeo(parentvalue, task, target, childvalue = '0') {
		let formData = new FormData();
		formData.append('parent', parentvalue);
		formData.append('target', target + '_id');
		formData.append('child', childvalue);
		let response = await fetch('index.php?option=com_knowres&task=' + task, {
			method: 'post',
			body:   formData
		});
		let result = await response.json();
		if (result.success) {
			let current = document.querySelector('.' + target + 'chain');
			current.outerHTML = result.data.html;
		} else {
			alert(result.message);
		}
		return false;
	}
</script>