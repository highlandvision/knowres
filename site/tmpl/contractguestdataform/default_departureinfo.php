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
			<?php echo $this->form->getLabel('departure_time'); ?><?php echo $this->form->getInput('departure_time'); ?>
		</div>
		<?php if ($this->params->get('guestdata_departure_means', 0)) : ?>
			<div class="small-12 medium-4 columns">
				<?php echo $this->form->getLabel('departure_means'); ?><?php echo $this->form->getInput('departure_means'); ?>
			</div>
			<div class="small-12 medium-4 columns">
				<?php echo $this->form->getLabel('departure_number'); ?><?php echo $this->form->getInput('departure_number'); ?>
			</div>
		<?php endif; ?>
	</div>
</div>
