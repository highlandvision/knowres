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

/** @var HighlandVision\Component\Knowres\Administrator\View\Contract\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-book')
   ->useStyle('com_knowres.admin-book');

$this->form->setFieldAttribute('guests', 'required', false);
$this->form->setFieldAttribute('arrival_bd', 'label',
	KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_START_DATE_LBL'));
$this->form->setFieldAttribute('arrival_bd', 'description',
	KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_START_DATE_FORM_DSC'));
$this->form->setFieldAttribute('departure_bd', 'label',
	KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_RESUME_DATE_LBL'));
$this->form->setFieldAttribute('departure_bd', 'description',
	KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_RESUME_DATE_FORM_DSC'));
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id='
	. (int) $this->item->id); ?>" class="form-validate" id="contract-form" method="post" name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_TITLE_DSC'); ?>
				<div id="book-datepicker"></div>
				<br>
				<div id="jform_ajax_warning" style="display:none;"></div>
				<br>

				<fieldset>
					<div class="row">
						<div class="col-xl-6">
							<?php echo $this->form->renderField('arrival_bd'); ?>
							<?php if ($this->arrival): ?>
								<?php $this->form->setFieldAttribute('arrival_bd', 'default', $this->arrival_bd); ?>
								<?php $this->form->setFieldAttribute('departure_bd', 'default', $this->departure_bd); ?>
							<?php endif; ?>
						</div>
						<div class="col-xl-6">
							<?php echo $this->form->renderField('departure_bd'); ?>
						</div>

						<?php if ($this->settings['manager_requiredfields_block_note'] < 2) : ?>
							<div class="col-xl-6">
								<?php if ($this->settings['manager_requiredfields_block_note'] == 1): ?>
									<?php $this->form->setFieldAttribute('block_note', 'required', true); ?>
								<?php endif; ?>
								<?php echo $this->form->renderField('block_note'); ?>
							</div>
						<?php endif; ?>
					</div>
				</fieldset>
			</div>
		</div>
	</div>

	<input type="hidden" name="jform[arrival]" id="arrival" value="<?php echo $this->arrival; ?>">
	<input type="hidden" name="jform[departure]" id="departure" value="<?php echo $this->departure; ?>">
	<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="jform[property_id]" value="<?php echo $this->property_id; ?>">
	<input type="hidden" name="jform[black_booking]" value="1">
	<input type="hidden" name="jform[booking_status]" value="0">
	<input type="hidden" name="task" value="">
	<input type="hidden" name="action" value="block">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>

<div id="kr-manager-book" data-pid="<?php echo $this->property_id; ?>" data-today="<?php echo $this->today; ?>"
     data-arrival="<?php echo $this->item->arrival; ?>" data-departure="<?php echo $this->item->departure; ?>"
     data-editid="<?php echo $this->item->id; ?>" data-maxdate="<?php echo $this->maxdate; ?>">
</div>