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

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-guestdata')
   ->useStyle('com_knowres.admin-guestdata');
?>

<div class="row">
	<div class="col-lg-10 col-xl-9 col-xxl-8">
		<fieldset>
			<?php echo $this->form->renderField('options'); ?>

			<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_EMERGENCY'); ?></legend>
			<div class="row">
				<div class="col-9">
					<?php echo $this->form->renderField('c_name'); ?>
				</div>
			</div>
			<div class="row">
				<div class="col-9">
					<?php echo $this->form->renderField('c_phone'); ?>
				</div>
			</div>
			<div class="row">
				<div class="col-9">
					<?php echo $this->form->renderField('c_email'); ?>
				</div>
			</div>

			<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_PREFERENCES'); ?></legend>
			<div class="row">
				<div class="col-9">
					<?php echo $this->form->renderField('preferences'); ?>
				</div>
			</div>
		</fieldset>
	</div>
</div>