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
?>

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_GUEST_DETAILS'); ?></legend>
	<div class="row">
		<div class="col">
			<?php echo $this->guestForm->renderField('email'); ?>
		</div>
	</div>

	<?php if ($this->guestForm->getFieldAttribute('firstname', 'type', 'hidden') != 'hidden'
		|| $this->guestForm->getFieldAttribute('surname', 'type', 'hidden') != 'hidden'): ?>
		<div class="row">
			<div class="col">
				<?php echo $this->guestForm->renderField('firstname'); ?>
			</div>
			<div class="col">
				<?php echo $this->guestForm->renderField('surname'); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($this->guestForm->getFieldAttribute('mobile', 'type', 'hidden') != 'hidden'): ?>
		<div class="row">
			<div class="col">
				<?php echo $this->guestForm->renderField('mobile_country_id'); ?>
			</div>
			<div class="col">
				<?php echo $this->guestForm->renderField('mobile'); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($this->guestForm->getFieldAttribute('address1', 'type', 'hidden') != 'hidden'): ?>
		<div class="row">
			<div class="col">
				<?php echo $this->guestForm->renderField('address1'); ?>
			</div>
			<div class="col">
				<?php echo $this->guestForm->renderField('address2'); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($this->guestForm->getFieldAttribute('town', 'type', 'hidden') != 'hidden'): ?>
		<div class="row">
			<div class="col">
				<?php echo $this->guestForm->renderField('town'); ?>
			</div>
			<div class="col">
				<?php echo $this->guestForm->renderField('postcode'); ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($this->guestForm->getFieldAttribute('region_id', 'type', 'hidden') != 'hidden'): ?>
		<div class="row">
			<div class="col">
				<?php echo $this->guestForm->renderField('country_id'); ?>
			</div>
			<div class="col">
				<?php echo $this->guestForm->renderField('region_id'); ?>
			</div>
		</div>
	<?php endif; ?>
</fieldset>