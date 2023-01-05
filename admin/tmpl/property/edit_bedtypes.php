<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUndefinedClassInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="row">
	<div class="col">
		<h4><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_DEPRECATED_BED_TYPES'); ?></h4>
		<br>
		<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_BED_TYPES_DSC'); ?></p>
		<?php echo $this->form->renderField('bed_types'); ?>
	</div>
</div>