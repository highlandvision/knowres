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
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Guest\HtmlView $this */

$params = KrMethods::getParams();

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->usePreset('choicesjs')
   ->useScript('webcomponent.field-fancy-select')
   ->useScript('com_knowres.admin-guest');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="guest-form" method="post"
      name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-7">
				<fieldset>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_LEAD_GUEST'); ?></legend>
					<?php echo $this->form->renderField('email'); ?>
					<?php echo $this->form->renderField('firstname'); ?>
					<?php echo $this->form->renderField('surname'); ?>
					<?php echo $this->form->renderField('mobile_country_id'); ?>
					<?php echo $this->form->renderField('mobile'); ?>
					<?php echo $this->form->renderField('document_type'); ?>
					<?php echo $this->form->renderField('document_id'); ?>
				</fieldset>

				<fieldset>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_LEGEND_GUEST_ADDITIONAL'); ?></legend>
					<?php echo $this->form->renderField('email_2'); ?>
					<?php echo $this->form->renderField('email_3'); ?>
					<?php echo $this->form->renderField('telephone'); ?>
				</fieldset>

				<fieldset>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_MAILING_ADDRESS'); ?></legend>
					<?php echo $this->form->renderField('address1'); ?>
					<?php echo $this->form->renderField('address2'); ?>
					<?php echo $this->form->renderField('town'); ?>
					<?php echo $this->form->renderField('postcode'); ?>
					<?php echo $this->form->renderField('country_id'); ?>
					<?php echo $this->form->renderField('region_id'); ?>
				</fieldset>

				<fieldset>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_BILLING_ADDRESS'); ?></legend>
					<?php echo $this->form->renderField('billing'); ?>
					<?php echo $this->form->renderField('b_address1'); ?>
					<?php echo $this->form->renderField('b_address2'); ?>
					<?php echo $this->form->renderField('b_town'); ?>
					<?php echo $this->form->renderField('b_postcode'); ?>
					<?php echo $this->form->renderField('b_country_id'); ?>
					<?php echo $this->form->renderField('b_region_id'); ?>
				</fieldset>
			</div>
			<div class="col-xl-3 offset-xxl-2">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>