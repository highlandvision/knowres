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
?>

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_CONTRACTS_MANAGER_DATES'); ?></legend>
	<div class="row">
		<div class="col-6 col-sm-4">
			<?php echo $this->form->renderField('arrival_bd'); ?>
		</div>
		<div class="col-6 col-sm-4">
			<?php echo $this->form->renderField('departure_bd'); ?>
		</div>
		<?php if (!empty($this->item->id)): ?>
			<div class="col-6 col-sm-4">
				<?php echo $this->form->renderField('fixrate'); ?>
			</div>
		<?php endif; ?>
	</div>
	<div class="row">
		<div class="col-6 col-sm-4">
			<?php echo $this->form->renderField('adults'); ?>
		</div>
		<div class="col-6 col-sm-4">
			<?php echo $this->form->renderField('children'); ?>
		</div>
		<div class="col-6 col-sm-4">
			<?php $this->form->setValue('child_ages', null, implode(',', $this->form->getValue('child_ages'))); ?>
			<?php echo $this->form->renderField('child_ages'); ?>
		</div>
	</div>
</fieldset>