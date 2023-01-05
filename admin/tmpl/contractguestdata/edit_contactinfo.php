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

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-guestdata')
   ->useStyle('com_knowres.admin-guestdata');
?>

<div class="main-card" style="padding-top:0;">
	<div class="row">
		<div class="col-xl-9 col-xxl-8">
			<fieldset>
				<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_EMERGENCY'); ?></legend>
				<?php echo $this->form->renderField('c_name'); ?>
				<?php echo $this->form->renderField('c_phone'); ?>
				<?php echo $this->form->renderField('c_email'); ?>
			</fieldset>
		</div>
		<div class="col-xl-3 offset-xxl-1">
			<?php echo KrMethods::render('joomla.edit.global', $this); ?>
		</div>
	</div>
</div>

