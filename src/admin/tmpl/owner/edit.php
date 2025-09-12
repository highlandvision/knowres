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
use Joomla\CMS\HTML\HTMLHelper;
use PHP_IBAN\IBAN;

/** @var HighlandVision\Component\Knowres\Administrator\View\Owner\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-combogeo')
   ->usePreset('choicesjs')
   ->useScript('webcomponent.field-fancy-select');

$iban = $this->form->getValue('iban');
$Iban = new IBAN($iban);
$this->form->setValue('iban', '', $Iban->HumanFormat());
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="owner-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<fieldset>
					<legend><?php echo Krmethods::plain('COM_KNOWRES_LEGEND_OWNER_DETAILS'); ?></legend>
					<?php echo $this->form->renderField('name'); ?>
					<?php echo $this->form->renderField('business'); ?>
					<div class="control-group">
						<div class="control-label">
							<?php echo KrMethods::plain('COM_KNOWRES_FORM_OWNER_DOCUMENTATION'); ?>
						</div>
						<div class="controls">
							<div class="row">
								<div class="col-lg-5">
									<?php echo $this->form->renderField('document_id'); ?>
								</div>
								<div class="col-lg-4">
									<?php echo $this->form->renderField('document_type'); ?>
								</div>
							</div>
						</div>
					</div>
					<?php echo $this->form->renderField('commission'); ?>
				</fieldset>
				<fieldset>
					<legend><?php echo Krmethods::plain('COM_KNOWRES_LEGEND_OWNER_CONTACT'); ?></legend>
					<?php echo $this->form->renderField('email'); ?>
					<div class="control-group">
						<div class="control-label">
							<?php echo KrMethods::plain('COM_KNOWRES_OWNER_MOBILE_LBL'); ?>
						</div>
						<div class="controls">
							<div class="row">
								<div class="col-lg-5">
									<?php echo $this->form->renderField('mobile_country_id'); ?>
								</div>
								<div class="col-lg-4">
									<?php echo $this->form->renderField('mobile'); ?>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend><?php echo Krmethods::plain('COM_KNOWRES_LEGEND_OWNER_ADDRESS'); ?></legend>
					<?php echo $this->form->renderFieldset('kraddress'); ?>
				</fieldset>
				<?php if (!empty($this->factura)): ?>
					<fieldset name="krfactura">
						<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_OWNER_FACTURA'); ?></legend>
						<div><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_OWNER_PAYMENTS'); ?></div>
						<?php echo $this->form->renderFieldset('krfactura'); ?>
					</fieldset>
				<?php else: ?>
					<fieldset name="krxero">
						<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_OWNER_INTERNAL'); ?></legend>
						<?php echo $this->form->renderFieldset('krxero'); ?>
					</fieldset>
				<?php endif; ?>
				<div><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_OWNER_PAYMENTS'); ?></div>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>