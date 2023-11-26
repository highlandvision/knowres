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

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');

$action = KrMethods::route('index.php?option=com_knowres&task=contact.submit');
?>

<div class="grid-container">
	<div class="grid-x grid-margin-x">
		<div>
			<h1 class="title"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_TITLE'); ?></h1>
			<p class="smaller"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_REQUIRED'); ?></p>

			<form action="<?php echo $action; ?>" class="form-validate" id="kr-form-contact"
			      onsubmit="return verifyEmail();" method="post">
				<fieldset class="fieldset">
					<legend><?php echo KrMethods::plain('COM_KNOWRES_YOUR_DETAILS'); ?></legend>
					<div class="callout formbg small">
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-6 cell">
								<?php echo $this->form->renderField('contact_name'); ?>
							</div>
						</div>
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-6 cell">
								<?php echo $this->form->renderField('contact_email'); ?>
							</div>
							<div class="small-12 medium-6 cell">
								<?php echo $this->form->renderField('verify_email'); ?>
							</div>
						</div>
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-6 cell end">
								<?php echo $this->form->renderField('contact_country'); ?>
							</div>
							<div class="small-12 medium-6 cell">
								<?php echo $this->form->renderField('contact_phone'); ?>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset class="fieldset">
					<legend><?php echo KrMethods::plain('Your Property Requirements'); ?></legend>
					<div class="callout formbg small">
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-4 cell">
								<?php $this->form->setValue('region', '', $this->region_name); ?>
								<?php echo $this->form->renderField('region'); ?>
							</div>
							<div class="small-12 medium-4 cell">
								<?php $this->form->setValue('property', '', $this->property_name); ?>
								<?php echo $this->form->renderField('property'); ?>
							</div>
							<div class="small-12 medium-4 cell">
								<?php echo $this->form->renderField('budget'); ?>
							</div>
						</div>
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-4 cell">
								<?php echo $this->form->renderField('day'); ?>
							</div>
							<div class="small-12 medium-4 cell">
								<?php echo $this->form->renderField('month'); ?>
							</div>
							<div class="small-12 medium-4 cell end">
								<?php echo $this->form->renderField('nights'); ?>
							</div>
						</div>
						<div class="grid-x grid-margin-x">
							<div class="small-12 medium-4 cell">
								<?php echo $this->form->renderField('guests'); ?>
							</div>
							<div class="small-12 medium-4 cell">
								<?php echo $this->form->renderField('children'); ?>
							</div>
							<div class="small-12 medium-4 cell end">
								<?php echo $this->form->renderField('ages'); ?>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset class="fieldset">
					<legend><?php echo KrMethods::plain('Additional information'); ?></legend>
					<div class="grid-x grid-margin-x">
						<div class="small-12 medium-12 cell">
							<?php echo $this->form->renderField('message'); ?>
						</div>
					</div>
				</fieldset>

				<div class="grid-x grid-margin-x">
					<div class="small-12 medium-offset-3 medium-6 cell end text-center">
						<?php echo $this->form->renderField('grecaptcha'); ?>
					</div>
					<div class="small-12 cell text-center">
						<button type="submit" class="button validate expanded no-margin-bottom">
							<span><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_SEND'); ?></span>
						</button>
					</div>
				</div>

				<?php echo HTMLHelper::_('form.token'); ?>
				<input type="hidden" name="id" value="<?php echo $this->property_id; ?>">
				<input type="hidden" name="task" value="contact.submit">
			</form>
			<br>
			<p class="smaller text-center">
				<?php echo KrMethods::sprintf('COM_KNOWRES_CONTACT_SEND_3RDPARTY',
					KrMethods::getCfg('sitename')); ?>
			</p>
		</div>
	</div>
</div>

<script>
	function verifyEmail() {
		if (document.getElementById("jform_contact_email").value !== document.getElementById("jform_verify_email").value) {
			alert("<?php echo KrMethods::plain('COM_KNOWRES_CONTACT_VERIFY_ERROR');?>");
			document.getElementById("jform_verify_email").focus();
			return false;
		} else {
			return true;
		}
	}
</script>