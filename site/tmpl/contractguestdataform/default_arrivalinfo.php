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
	<div class="small-12 columns">
		<div id="howtoarrive" data-means="<?php echo $this->form->getValue('arrival_means'); ?>"></div>
		<?php echo $this->loadTemplate('arrivalinfo_tabs'); ?>

		<div id="air-data" class="callout small gray">
			<p><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_ARRIVAL_AIR'); ?></p>
			<?php echo $this->form->renderField('arrival_air'); ?>
		</div>

		<div id="train-data" class="callout small gray">
			<div class="row">
				<div class="small-12 medium-4 columns">
					<?php echo $this->form->renderField('arrival_from'); ?>
				</div>
				<div class="small-12 medium-4 columns">
					<?php echo $this->form->renderField('arrival_place'); ?>
				</div>
				<div class="small-12 medium-4 columns">
					<?php echo $this->form->renderField('arrival_time'); ?>
				</div>
			</div>
		</div>
		<div id="auto-data" class="callout small gray">
			<div class="row">
				<div class="small-12 medium-4 columns">
					<?php $this->form->setValue('auto_arrival_from', '', $this->item->arrival_from); ?>
					<?php echo $this->form->renderField('auto_arrival_from'); ?>
				</div>
				<div class="small-12 medium-4 columns">
					<?php $this->form->setValue('auto_arrival_time', '', $this->item->arrival_time); ?>
					<?php echo $this->form->renderField('auto_arrival_time'); ?>
				</div>
				<div class="small-12 medium-4 columns">
				</div>
			</div>
		</div>
		<div id="other-data" class="callout small gray">
			<div class="row">
				<div class="small-12 medium-9 columns end">
					<?php echo $this->form->renderField('other_information'); ?>
				</div>
			</div>
		</div>
	</div>
</div>