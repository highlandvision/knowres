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

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-guestdata')
   ->useStyle('com_knowres.admin-guestdata');
?>

<div class="main-card" style="padding-top:0;">
	<div class="row">
		<div class="col">
			<fieldset>
				<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_ARRIVALINFO'); ?></legend>
				<?php $means = $this->form->getValue('arrival_means'); ?>
				<?php echo $this->form->renderField('arrival_means'); ?>

				<div id="air">
					<?php echo $this->form->renderField('arrival_air'); ?>
				</div>
				<div id="train">
					<div class="row">
						<div class="col">
							<?php echo $this->form->renderField('arrival_from'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('arrival_place'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('arrival_time'); ?>
						</div>
					</div>
				</div>
				<div id="auto">
					<div class="row">
						<div class="col">
							<?php $this->form->setValue('auto_arrival_from', '', $this->item->arrival_from); ?>
							<?php echo $this->form->renderField('auto_arrival_from'); ?>
						</div>
						<div class="col">
							<?php $this->form->setValue('auto_arrival_time', '', $this->item->arrival_time); ?>
							<?php echo $this->form->renderField('auto_arrival_time'); ?>
						</div>
						<div class="col">
						</div>
					</div>
				</div>
				<div id="other">
					<div class="row">
						<div class="col-lg-8">
							<?php echo $this->form->renderField('other_information'); ?>
						</div>
					</div>
				</div>
			</fieldset>

			<fieldset>
				<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_DEPARTUREINFO'); ?></legend>
				<div class="row">
					<div class="col-lg-4">
						<?php echo $this->form->renderField('departure_time'); ?>
					</div>
					<?php if ($this->params->get('guestdata_departure_means')) : ?>
						<div class="col">
							<?php echo $this->form->renderField('departure_means'); ?>
						</div>
						<div class="col">
							<?php echo $this->form->renderField('departure_number'); ?>
						</div>
					<?php endif; ?>
			</fieldset>
		</div>
	</div>
</div>