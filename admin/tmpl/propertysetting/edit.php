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

?>

<!--suppress JSCheckFunctionSignatures -->
<script>
    Joomla.submitbutton = function (task) {
        if (task === 'propertysetting.cancel') {
            Joomla.submitform(task, document.getElementById('propertysetting-form'));
        } else {
            if (task !== 'propertysetting.cancel' && document.formvalidator.isValid(document.getElementById('propertysetting-form'))) {
                Joomla.submitform(task, document.getElementById('propertysetting-form'));
            } else {
                alert('<?php echo $this->escape(KrMethods::plain('JGLOBAL_VALIDATION_FORM_FAILED')); ?>');
            }
        }
    }
</script>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      method="post" enctype="multipart/form-data" name="adminForm" id="propertysetting-form" class="form-validate">
	<div class="form-horizontal">
		<div class="row-fluid">
			<div class="span10 form-horizontal">
				<fieldset class="adminform">
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('property_id'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('property_id'); ?></div>
					</div>

					<?php
					foreach ((array) $this->item->property_id as $value):
						if (!is_array($value)):
							echo '<input type="hidden" class="property_id" name="jform[property_idhidden][' . $value
							     . ']" value="' . $value . '" />';
						endif;
					endforeach;
					?>

					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('akey'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('akey'); ?></div>
					</div>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('value'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('value'); ?></div>
					</div>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('state'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('state'); ?></div>
					</div>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('created_by'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('created_by'); ?></div>
					</div>

					<?php echo $this->form->getInput('created_at'); ?>
					<?php echo $this->form->getInput('updated_at'); ?>
				</fieldset>
			</div>
		</div>

		<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>"/>
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</div>
</form>