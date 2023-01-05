<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;
?>

<fieldset>
	<div class="row">
		<div class="col-lg-3">
			<?php $this->form->setFieldAttribute('agent_id', 'required', true); ?>
			<?php echo $this->form->renderField('agent_id'); ?>
		</div>
		<div class="col-lg-3">
			<?php echo $this->form->renderField('agent_reference'); ?>
		</div>
		<div class="col-lg-3">
			<?php $this->form->setFieldAttribute('agent_value', 'required', true); ?>
			<?php $this->form->setFieldAttribute('agent_value', 'addonBefore', $this->settings['currency']); ?>
			<?php echo $this->form->renderField('agent_value'); ?>
		</div>
		<div class="col-lg-3">
			<button class="btn btn-primary btn-block kr-calculate" type="button" style="width:100%;margin-top:34px;">
				<?php echo KrMethods::plain('COM_KNOWRES_CALCULATE'); ?>
			</button>
		</div>
	</div>
</fieldset>