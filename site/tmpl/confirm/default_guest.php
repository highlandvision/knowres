<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2017 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

$this->form->setFieldAttribute('guest_note', 'hiddenLabel', false);
?>

<fieldset class="fieldset">
	<legend><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_CONTACT_DETAILS'); ?></legend>
	<div class="callout small">
		<div class="grid-x grid-margin-x">
			<div class="small-12 large-6 cell">
				<?php echo $this->guestForm->renderField('email'); ?>
			</div>
		</div>

		<?php if ($this->guestForm->getFieldAttribute('firstname', 'type', 'hidden') != 'hidden'
			|| $this->guestForm->getFieldAttribute('surname', 'type', 'hidden') != 'hidden'): ?>
			<div class="grid-x grid-margin-x">
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('firstname'); ?>
				</div>
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('surname'); ?>
				</div>
			</div>
		<?php endif; ?>

		<?php if ($this->guestForm->getFieldAttribute('mobile', 'type', 'hidden') != 'hidden'): ?>
			<div class="grid-x grid-margin-x">
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('mobile_country_id'); ?>
				</div>
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('mobile'); ?>
				</div>
			</div>
		<?php endif; ?>

		<?php if ($this->guestForm->getFieldAttribute('address1', 'type', 'hidden') != 'hidden'): ?>
			<div class="grid-x grid-margin-x">
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('address1'); ?>
				</div>
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('address2'); ?>
				</div>
			</div>
		<?php endif; ?>

		<?php if ($this->guestForm->getFieldAttribute('town', 'type', 'hidden') != 'hidden'): ?>
			<div class="grid-x grid-margin-x">
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('town'); ?>
				</div>
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('postcode'); ?>
				</div>
			</div>
		<?php endif; ?>

		<?php if ($this->guestForm->getFieldAttribute('region_id', 'type', 'hidden') != 'hidden'): ?>
			<div class="grid-x grid-margin-x">
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('country_id'); ?>
				</div>
				<div class="large-6 cell">
					<?php echo $this->guestForm->renderField('region_id'); ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</fieldset>

<fieldset class="fieldset">
	<legend><?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_ADDITIONAL_INFO'); ?></legend>
	<div class="callout small">
		<div class="grid-x grid-margin-x">
			<div class="small-12 cell">
				<?php echo $this->form->renderField('guest_note'); ?>
			</div>
		</div>
	</div>
</fieldset>

<script>
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