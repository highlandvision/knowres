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

<div class="row">
	<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_ROOM'); ?></p>
	<br>
	<div class="col col-xl-9">
		<?php echo $this->form->renderField('rooms'); ?>
	</div>
</div>
<div class="row">
	<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_GUEST_TYPE'); ?></p>
	<br>
	<div class="col col-xl-6">
		<?php echo $this->form->renderField('guest_types'); ?>
	</div>
</div>