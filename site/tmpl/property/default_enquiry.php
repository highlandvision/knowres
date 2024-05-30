<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2017 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

$eform = KrFactory::getAdhocForm('enquiry', 'enquiry.xml', 'site', null);
$action = '/index.php?option=com_knowres&task=enquiry.submit';
?>

<div class="grid-x grid-margin-x">
	<div class="small-12">
		<form action="<?php echo $action; ?>" id="form-enquiry" onsubmit="return verifyemail();"
		      class="formbg form-validate" method="post">

			<p class="quoteform" style="margin-bottom:1px;">
				<?php echo KrMethods::plain('COM_KNOWRES_QUOTE_GET'); ?>
			</p>

			<fieldset class="fieldset">
				<legend>
					<i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_ARRIVAL'); ?>
				</legend>

				<div class="grid-x grid-margin-x ">
					<div class="small-6 cell">
						<div class="form-floating-label has-value">
							<?php echo $eform->getInput('arrival'); ?>
							<?php echo $eform->getLabel('arrival'); ?>
						</div>
					</div>
					<div class="small-6 cell">
						<div class="form-floating-label has-value">
							<?php echo $eform->getInput('departure'); ?>
							<?php echo $eform->getLabel('departure'); ?>
						</div>
					</div>
				</div>
			</fieldset>

			<?php echo $eform->getInput('guest_types'); ?>
			<?php echo $eform->getInput('rooms'); ?>
			<?php echo $eform->getInput('extras'); ?>

			<fieldset class="fieldset">
				<legend>
					<i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_CONTACT_MESSAGE_LABEL'); ?>
				</legend>
				<div class="grid-x grid-margin-x">
					<div class="small-12 cell">
						<?php echo $eform->getInput('guest_note'); ?>
					</div>
				</div>
			</fieldset>

			<fieldset class="fieldset">
				<legend>
					<i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_ENQURIY_DETAILS'); ?>
				</legend>
				<div class="grid-x grid-margin-x ">
					<?php $eform->setFieldAttribute('firstname', 'required', true); ?>
					<?php $eform->setFieldAttribute('surname', 'required', true); ?>
					<div class="small-6 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('firstname'); ?>
							<?php echo $eform->getLabel('firstname'); ?>
						</div>
					</div>
					<div class="small-6 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('surname'); ?>
							<?php echo $eform->getLabel('surname'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->render('email'); ?>
							<?php echo $eform->getLabel('email'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('verify_email'); ?>
							<?php echo $eform->getLabel('verify_email'); ?>
						</div>
					</div>

					<?php $eform->setFieldAttribute('mobile_country_id', 'required', true); ?>
					<?php $eform->setFieldAttribute('mobile', 'required', true); ?>
					<div class="small-7 cell">
						<div class="form-floating-label">
							<?php echo $eform->getLabel('mobile_country_id'); ?>
							<?php echo $eform->getInput('mobile_country_id'); ?>
						</div>
					</div>
					<div class="small-5 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('mobile'); ?>
							<?php echo $eform->getLabel('mobile'); ?>
						</div>
					</div>

					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('address1'); ?>
							<?php echo $eform->getLabel('address1'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('address2'); ?>
							<?php echo $eform->getLabel('address2'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('town'); ?>
							<?php echo $eform->getLabel('town'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getInput('postcode'); ?>
							<?php echo $eform->getLabel('postcode'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getLabel('country_id'); ?>
							<?php echo $eform->getInput('country_id'); ?>
						</div>
					</div>
					<div class="small-12 cell">
						<div class="form-floating-label">
							<?php echo $eform->getLabel('region_id'); ?>
							<?php echo $eform->getInput('region_id'); ?>
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset>
				<div class="grid-x grid-margin-x  align-center">
					<div class="small-12 cell text-center">
						<?php echo $eform->getLabel('grecaptcha'); ?>
						<div id="recaptcha-container">
							<?php echo $eform->getInput('grecaptcha'); ?>
						</div>
					</div>
					<div class="small-12 cell text-center" style="margin-top:2rem;margin-bottom:0;">
						<button type="submit" class="button validate">
							<?php echo KrMethods::plain('COM_KNOWRES_REQUEST_QUOTE'); ?>
						</button>
					</div>
				</div>
			</fieldset>

			<input type="hidden" name="task" value="enquiry.submit">
			<input type="hidden" name="jform[property_id]" value="<?php echo $this->item->id; ?>">
			<input type="hidden" name="jform[black_booking]" value="0">
			<?php echo HTMLHelper::_('form.token'); ?>
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