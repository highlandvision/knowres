<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

?>

<div class="row">
	<div class="small-12">
		<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=enquiry.submit'); ?>"
		      id="form-enquiry" onsubmit="return verifyemail();" class="formbg form-validate" method="post">

			<p class="quoteform" style="margin-bottom:1px;">
				<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_GET'); ?>
			</p>

	<fieldset class="fieldset">
				<legend>
					<i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_ARRIVAL'); ?>
				</legend>

			<div class="row">
					<div class="small-6 columns">
						<div class="form-floating-label has-value">
							<?php echo $this->enquiry_form->getInput('arrival'); ?>
							<?php echo $this->enquiry_form->getLabel('arrival'); ?>
				</div>
			</div>
					<div class="small-6 columns">
						<div class="form-floating-label has-value">
							<?php echo $this->enquiry_form->getInput('departure'); ?>
							<?php echo $this->enquiry_form->getLabel('departure'); ?>
				</div>
				</div>
			</div>
			</fieldset>

			<?php echo $this->enquiry_form->getInput('guest_types'); ?>
			<?php echo $this->enquiry_form->getInput('rooms'); ?>
			<?php echo $this->enquiry_form->getInput('extras'); ?>

			<fieldset class="fieldset">
				<legend>
					<i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_CONTACT_MESSAGE_LABEL'); ?>
				</legend>
			<div class="row">
					<div class="small-12 columns">
						<?php echo $this->enquiry_form->getInput('guest_note'); ?>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
				<legend>
					<i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_DETAILS'); ?>
				</legend>
			<div class="row">
					<?php $this->enquiry_form->setFieldAttribute('firstname', 'required', true); ?>
					<?php $this->enquiry_form->setFieldAttribute('surname', 'required', true); ?>
					<div class="small-6 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('firstname'); ?>
							<?php echo $this->enquiry_form->getLabel('firstname'); ?>
						</div>
					</div>
					<div class="small-6 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('surname'); ?>
							<?php echo $this->enquiry_form->getLabel('surname'); ?>
						</div>
					</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->render('email'); ?>
							<?php echo $this->enquiry_form->getLabel('email'); ?>
						</div>
					</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('verify_email'); ?>
							<?php echo $this->enquiry_form->getLabel('verify_email'); ?>
						</div>
				</div>

					<?php $this->enquiry_form->setFieldAttribute('mobile_country_id', 'required', true); ?>
					<?php $this->enquiry_form->setFieldAttribute('mobile', 'required', true); ?>
					<div class="small-7 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getLabel('mobile_country_id'); ?>
							<?php echo $this->enquiry_form->getInput('mobile_country_id'); ?>
						</div>
					</div>
					<div class="small-5 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('mobile'); ?>
							<?php echo $this->enquiry_form->getLabel('mobile'); ?>
						</div>
					</div>

					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('address1'); ?>
							<?php echo $this->enquiry_form->getLabel('address1'); ?>
			</div>
		</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('address2'); ?>
							<?php echo $this->enquiry_form->getLabel('address2'); ?>
				</div>
			</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('town'); ?>
							<?php echo $this->enquiry_form->getLabel('town'); ?>
				</div>
				</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getInput('postcode'); ?>
							<?php echo $this->enquiry_form->getLabel('postcode'); ?>
				</div>
			</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getLabel('country_id'); ?>
							<?php echo $this->enquiry_form->getInput('country_id'); ?>
				</div>
				</div>
					<div class="small-12 columns">
						<div class="form-floating-label">
							<?php echo $this->enquiry_form->getLabel('region_id'); ?>
							<?php echo $this->enquiry_form->getInput('region_id'); ?>
				</div>
			</div>
		</div>
	</fieldset>

			<fieldset>
				<div class="row align-center">
					<div class="small-12 columns text-center">
						<?php echo $this->enquiry_form->getLabel('grecaptcha'); ?>
					<div id="recaptcha-container">
							<?php echo $this->enquiry_form->getInput('grecaptcha'); ?>
					</div>
				</div>
					<div class="small-12 columns text-center" style="margin-top:2rem;margin-bottom:0;">
					<button type="submit" class="button validate">
							<?php echo KrMethods::plain('COM_KNOWRES_REQUEST_QUOTE'); ?>
					</button>
			</div>
		</div>
	</fieldset>

			<input type="hidden" name="task" value="enquiry.submit">
			<input type="hidden" name="jform[property_id]" value="<?php echo $this->item->id; ?>">
			<input type="hidden" name="jform[black_booking]" value="0">
			<?php echo JHtml::_('form.token'); ?>
</form>
	</div>
</div>

<script>
	function verifyemail() {
        if (document.getElementById('jform_email').value !== document.getElementById('jform_verify_email').value) {
			<?php KrMethods::plain('COM_KNOWRES_CONTACT_VERIFY_ERROR'); ?>
            document.getElementById('jform_verify_email').focus();
			return false;
		} else {
			return true;
		}
	}
</script>