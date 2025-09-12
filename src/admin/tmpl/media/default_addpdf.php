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

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=property.uploadpdf'); ?>"
      class="form-validate" enctype="multipart/form-data" id="form-uploadpdf" method="post">

	<fieldset class="adminform">
		<legend><?php echo KrMethods::plain('COM_KNOWRES_UPLOAD_PDF'); ?></legend>
		<p><?php echo KrMethods::plain('COM_KNOWRES_PDF_UPLOAD_PROPERTY'); ?></p>
		<div class="control-group">
			<div class="control-label visually-hidden"><?php echo $this->form->getLabel('uploadpdf'); ?></div>
			<div class="controls"><?php echo $this->form->getInput('uploadpdf'); ?></div>
		</div>
		<button class="btn btn-primary" type="submit">
			<?php echo KrMethods::plain('COM_KNOWRES_UPLOAD_PDF'); ?>
		</button>

		<input type="hidden" name="task" value="property.uploadpdf" />
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>" />
		<?php echo HTMLHelper::_('form.token'); ?>
	</fieldset>
</form>