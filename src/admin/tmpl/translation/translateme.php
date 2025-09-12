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
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

$action = KrMethods::route('index.php?option=com_knowres&task=translation.save');

$translation_code   = '';
$translation_native = '';

$languages = KrMethods::getLanguages();
foreach ($languages as $language)
{
	if ($language->published && $language->lang_code != $this->item->language)
	{
		$translation_code   = $language->lang_code;
		$translation_native = $language->title_native;
	}
}
?>

<form action="<?php echo $action ?>" method="post" enctype="multipart/form-data" name="adminForm" id="translate-form"
      class="form-horizontal form-validate">
	<div class="modal-header">
		<h3><?php echo KrMethods::plain('Translate Me'); ?></h3>
		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	</div>

	<div class="modal-body">
		<div class="row">
			<div class="col-10">
				<fieldset>
					<div class="control-group">
						<?php
						if ($this->label)
						{
							$this->form->setFieldAttribute('text', 'label', $this->label);
						}
						if ($this->type)
						{
							$this->form->setFieldAttribute('text', 'type', $this->type);
						}
						if ($this->class)
						{
							$this->form->setFieldAttribute('text', 'class', $this->class);
						}
						if ($this->filter)
						{
							$this->form->setFieldAttribute('text', 'filter', $this->filter);
						}
						?>
						<div class="control-label"><?php echo $this->form->getLabel('text'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('text'); ?></div>
					</div>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('language'); ?></div>
						<div class="controls"><?php echo $translation_native; ?></div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		<!--		<button class="btn" type="button" aria-controls="sbox-window" data-dismiss="modal">-->
		<?php //echo KrMethods::plain( 'JTOOLBAR_CANCEL' ); ?><!--</button>-->
		<button class="btn btn-primary"
		        onclick="Joomla.submitbutton('next');"><?php echo KrMethods::plain('JTOOLBAR_SAVE'); ?></button>
	</div>

	<?php if (empty($this->item->created_by)) { ?>
		<input type="hidden" name="jform[created_by]" value="<?php echo Factory::getUser()->id; ?>" />
	<?php } else { ?>
		<input type="hidden" name="jform[created_by]" value="<?php echo $this->item->created_by; ?>" />
	<?php } ?>

	<?php echo $this->form->getInput('created_at'); ?>
	<?php echo $this->form->getInput('updated_at'); ?>

	<input type="hidden" name="jform[id]" value="0"> <input type="hidden" name="jform[item]"
	                                                        value="<?php echo $this->item->item; ?>">
	<input type="hidden" name="jform[item_id]" value="<?php echo $this->item->item_id; ?>">
	<input type="hidden" name="jform[field]" value="<?php echo $this->item->field; ?>">
	<input type="hidden" name="jform[language]" value="<?php echo $translation_code; ?>">
	<input type="hidden" name="jform[state]" value="<?php echo $this->item->state; ?>"> <input type="hidden" name="view"
	                                                                                           value="translation">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>