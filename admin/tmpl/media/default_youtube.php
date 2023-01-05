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
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>"
      class="form-vertical form-validate" id="propertyvideo-form" method="post" name="adminForm">

	<fieldset class="adminform">
		<legend><?php echo KrMethods::plain('YouTube Video'); ?></legend>
		<div class="control-group">
			<div class="control-label">
				<?php echo $this->form->getLabel('property_videolink'); ?>
			</div>
			<div class="controls w-auto">
				<?php echo $this->form->getInput('property_videolink'); ?>
			</div>
		</div>
		<button type="submit" class="btn btn-primary">
			<?php echo KrMethods::plain('COM_KNOWRES_UPDATE'); ?>
		</button>
	</fieldset>

	<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="task" value="property.savevideo">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>