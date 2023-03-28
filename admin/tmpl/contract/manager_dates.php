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

if ($this->arrival)
{
	$this->form->setFieldAttribute('arrival_bd', 'default', $this->arrival_bd);
	$this->form->setFieldAttribute('departure_bd', 'default', $this->departure_bd);
}

//TODO-v4.1 Replace guests with adults, children again
?>

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_MANAGER_DATES'); ?></legend>
	<div class="row">
		<div class="col-sm-6 col-lg-2">
			<?php echo $this->form->renderField('arrival_bd'); ?>
		</div>
		<div class="col-sm-6 col-lg-2">
			<?php echo $this->form->renderField('departure_bd'); ?>
		</div>
		<div class="col-sm-2 col-lg-2">
			<?php echo $this->form->renderField('adults'); ?>
		</div>
		<div class="col-sm-2 col-lg-2">
			<?php echo $this->form->renderField('children'); ?>
		</div>
		<div class="col-sm-6 col-lg-3">
			<?php $this->form->setValue('child_ages', null, implode(',', $this->form->getValue('child_ages'))); ?>
			<?php echo $this->form->renderField('child_ages'); ?>
		</div>
		<?php if (!empty($this->item->id)): ?>
			<div class="col-lg-1">
				<?php echo $this->form->renderField('fixrate'); ?>
			</div>
		<?php endif; ?>
	</div>
</fieldset>