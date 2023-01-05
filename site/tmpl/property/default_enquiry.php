<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

$form = KrFactory::getAdhocForm('contact', 'contact.xml', 'site');
?>

<p class="strong"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_LEGEND_TAB'); ?></p>
<p class="smaller"><?php echo KrMethods::plain('COM_KNOWRES_CONTACT_REQUIRED'); ?></p>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=contact.submit'); ?>"
      class="formbg form-validate" id="kr-form-contact" method="post" onsubmit="return verifyemail();">

	<fieldset class="fieldset">
		<div class="callout">
			<div class="row">
				<div class="small-12 medium-6 columns end">
					<?php echo $form->getLabel('contact_name'); ?>
					<?php echo $form->getInput('contact_name'); ?>
				</div>
			</div>
			<div class="row">
				<div class="small-12 medium-6 columns">
					<?php echo $form->getLabel('contact_email'); ?>
					<?php echo $form->getInput('contact_email'); ?>
				</div>
				<div class="small-12 medium-6 columns">
					<?php echo $form->getLabel('verify_email'); ?>
					<?php echo $form->getInput('verify_email'); ?>
				</div>
			</div>
			<div class="row">
				<div class="small-12 medium-6 columns end">
					<?php echo $form->getLabel('contact_country'); ?>
					<?php echo $form->getInput('contact_country'); ?>
				</div>
				<div class="small-12 medium-6 columns">
					<?php $form->setFieldAttribute('contact_phone', 'required',
						true); ?><?php echo $form->getLabel('contact_phone'); ?>
					<?php echo $form->getInput('contact_phone'); ?>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<div class="callout">
			<div class="row">
				<div class="small-12 medium-12 columns">
					<?php echo $form->getLabel('message'); ?>
					<?php echo $form->getInput('message'); ?>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<div class="callout">
			<div class="row">
				<div class="small-12 medium-12 columns">
					<?php echo $form->getInput('reserve'); ?>
					<?php echo $form->getLabel('reserve'); ?>
				</div>
			</div>
			<br>
			<div class="row">
				<div class="small-4 medium-4 columns">
					<?php echo $form->getLabel('day'); ?>
					<?php echo $form->getInput('day'); ?>
				</div>
				<div class="small-4 medium-4 columns">
					<?php echo $form->getLabel('month'); ?>
					<?php echo $form->getInput('month'); ?>
				</div>
				<div class="small-4 medium-4 columns end">
					<?php echo $form->getLabel('nights'); ?>
					<?php echo $form->getInput('nights'); ?>
				</div>
			</div>
			<div class="row">
				<div class="small-4 medium-4 columns">
					<?php echo $form->getLabel('guests'); ?>
					<?php echo $form->getInput('guests'); ?>
				</div>
				<div class="small-4 medium-4 columns">
					<?php echo $form->getLabel('children'); ?>
					<?php echo $form->getInput('children'); ?>
				</div>
				<div class="small-4 medium-4 columns end">
					<?php echo $form->getLabel('ages'); ?>
					<?php echo $form->getInput('ages'); ?>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<div class="callout">
			<div class="row">
				<div class="small-12 medium-4 columns">
					<?php echo $form->getLabel('grecaptcha'); ?>
					<div id="recaptcha-container">
						<?php echo $form->getInput('grecaptcha'); ?>
					</div>
				</div>
				<div class="small-12 medium-6 columns text-center" style="margin-top:2rem;">
					<button type="submit" class="button validate">
						<?php echo KrMethods::plain('COM_KNOWRES_CONTACT_SEND'); ?>
					</button>

					<span class="font-standard">
						<?php echo KrMethods::plain('&nbsp;or&nbsp;'); ?>
						<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contact.cancel&id='
							. $this->item->id); ?>" title="<?php echo KrMethods::plain('JCANCEL'); ?>">
							<?php echo KrMethods::plain('JCANCEL'); ?>
						</a>
					</span>

					<p class="smaller">
						<?php echo KrMethods::sprintf('COM_KNOWRES_CONTACT_SEND_3RDPARTY',
							KrMethods::getCfg('sitename')); ?>
					</p>
				</div>
			</div>
		</div>
	</fieldset>

	<input type="hidden" name="option" value="com_knowres" />
	<input type="hidden" name="task" value="contact.submit" />
	<input type="hidden" name="id" value="<?php echo $this->item->id; ?>" />
	<?php echo HTMLHelper::_('form.token'); ?>
</form>

<script>
	function verifyemail() {
		if (document.getElementById("jform_contact_email").value !== document.getElementById("jform_verify_email").value) {
			alert("Please check that Verify email has the same value as Email");
			document.getElementById("jform_verify_email").focus();
			return false;
		} else {
			return true;
		}
	}
</script>