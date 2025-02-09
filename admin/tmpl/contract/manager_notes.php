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

?>

<fieldset>
	<legend><?php echo KrMethods::plain('COM_KNOWRES_NOTES'); ?></legend>
	<div class="row">
		<div class="col-xxl-6">
			<?php echo $this->form->renderField('guest_note'); ?>
		</div>
		<div class="col-xxl-6">
			<?php echo $this->form->renderField('owner_note'); ?>
		</div>
	</div>
</fieldset>

