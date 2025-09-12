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

$action = '/index.php?option=com_knowres&task=contact.submit';
?>

<h1 class="title"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_TITLE'); ?></h1>
<p><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_LEGEND'); ?></p>

<div>
	<p class="small"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_REQUIRED'); ?></p>

	<form action="<?php echo $action; ?>" class="form-validate" id="kr-contact-form"
	      onsubmit="return verifyEmail();" method="post">
		<fieldset class="fieldset">
			<div class="callout secondary">
				<div class="grid-x grid-margin-x">
					<div class="small-12 medium-6 cell end">
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
			<div class="callout secondary">
				<div class="grid-x grid-margin-x">
					<div class="small-12 cell">
						<?php echo $this->form->renderField('property'); ?>
					</div>
					<br>
					<div class="small-12 cell">
						<?php echo $this->form->renderField('location'); ?>
					</div>
					<br>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('day'); ?>
					</div>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('month'); ?>
					</div>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('nights'); ?>
					</div>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('guests'); ?>
					</div>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('children'); ?>
					</div>
					<div class="small-4 cell">
						<?php echo $this->form->renderField('ages'); ?>
					</div>
					<div class="small-6 cell">
						<?php echo $this->form->renderField('budget'); ?>
					</div>
					<div class="small-6 cell">
					</div>
				</div>
			</div>
		</fieldset>

		<fieldset class="fieldset">
			<div class="callout small secondary">
				<div class="grid-x grid-margin-x">
					<div class="small-12 medium-12 cell">
						<?php echo $this->form->renderField('message'); ?>
						<br>
					</div>
				</div>
			</div>
		</fieldset>

		<fieldset class="fieldset">
			<div class="callout secondary">
				<div class="grid-x grid-margin-x">
					<div class="small-12 medium-6 cell end text-center">
						<?php echo $this->form->renderField('grecaptcha'); ?>
					</div>
					<div class="small-12 cell medium-6 text-center">
						<br>
						<button type="submit" class="button large validate small-margin-bottom">
							<span><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_SEND'); ?></span>
						</button>
						<p class="smaller text-center">
							<?php echo KrMethods::sprintf('COM_KNOWRES_CONTACT_SEND_3RDPARTY',
								KrMethods::getCfg('sitename')); ?>
						</p>
					</div>
				</div>
			</div>
		</fieldset>

		<?php echo HTMLHelper::_('form.token'); ?>
		<input type="hidden" name="id" value=" . $this->property_id . ">
		<input type="hidden" name="task" value="contact.submit">
	</form>
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