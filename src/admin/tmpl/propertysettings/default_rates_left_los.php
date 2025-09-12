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

<div class="control-group">
	<div class="control-label">
		<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_LONGSTAY'); ?><br>
	</div>
	<div class="controls">
		<div class="row">
			<div class="col-lg-4">
				<?php echo $this->form->renderField('longstay_days1'); ?>
			</div>
			<div class="col-lg-2">
				<?php echo $this->form->renderField('longstay_percentage1'); ?>
			</div>
		</div>
	</div>
</div>

<div class="control-group">
	<div class="control-label">
	</div>
	<div class="controls">
		<div class="row">
			<div class="col-lg-4">
				<?php echo $this->form->renderField('longstay_days2'); ?>
			</div>
			<div class="col-lg-2">
				<?php echo $this->form->renderField('longstay_percentage2'); ?>
			</div>
		</div>
	</div>
</div>

<div class="control-group">
	<div class="control-label">
	</div>
	<div class="controls">
		<div class="row">
			<div class="col-lg-4">
				<?php echo $this->form->renderField('longstay_days3'); ?>
			</div>
			<div class="col-lg-2">
				<?php echo $this->form->renderField('longstay_percentage3'); ?>
			</div>
		</div>
	</div>
</div>

<div class="control-group">
	<div class="control-label">
	</div>
	<div class="controls">
		<small class="form-text">
			<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_LONGSTAY_DSC'); ?>
		</small>
	</div>
</div>