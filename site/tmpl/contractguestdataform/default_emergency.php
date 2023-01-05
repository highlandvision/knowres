<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;
?>

<div class="callout gray">
	<div class="row">
		<div class="small-12 medium-4 columns">
			<?php echo $this->form->getLabel('c_name'); ?>
			<?php echo $this->form->getInput('c_name'); ?>
		</div>
		<div class="small-12 medium-4 columns">
			<?php echo $this->form->getLabel('c_phone'); ?>
			<?php echo $this->form->getInput('c_phone'); ?>
		</div>
		<div class="small-12 medium-4 columns">
			<?php echo $this->form->getLabel('c_email'); ?>
			<?php echo $this->form->getInput('c_email'); ?>
		</div>
	</div>
</div>