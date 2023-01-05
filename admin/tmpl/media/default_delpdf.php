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
use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=property.delpdf'); ?>"
      class="form-vertical form-validate" id="form-delpdf" method="post">

	<fieldset class="adminform">
		<legend><?php echo KrMethods::plain('COM_KNOWRES_DELETE_PDF'); ?></legend>

		<div class="control-group">
			<div class="controls" style="margin-top:10px;margin-bottom:10px;">
				<?php foreach ($this->lines as $line): ?>
					<?php $filename = Media::getFileName($line) . '.' . Media::getFileExtension($line); ?>
					<label class="checkbox" style="margin-bottom:10px;">
						<input name="pdf[]" type="checkbox" value="<?php echo $filename; ?>">
						&nbsp;&nbsp;&nbsp;<?php echo $filename; ?>
					</label>
					<br>
				<?php endforeach; ?>
			</div>
		</div>

		<button type="submit" class="btn btn-primary">
			<?php echo KrMethods::plain('COM_KNOWRES_DELETE'); ?>
		</button>

		<input type="hidden" name="task" value="property.delpdf">
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
		<?php echo HTMLHelper::_('form.token'); ?>
	</fieldset>
</form>