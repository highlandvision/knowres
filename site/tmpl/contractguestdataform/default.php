<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<h1><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_TITLE'); ?></h1>

<?php echo KrMethods::render('dashboard.header', ['contract' => $this->contract,
                                                  'times'    => false]);
?>
<br>
<div class="callout small alert">
	<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_INSTRUCTIONS'); ?>
</div>

<form action="<?php echo 'index.php?option=com_knowres'; ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" id="kr-guestdata-form"
      method="post" name="adminForm">

	<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SECTION_GUEST_REGISTRATION'); ?></h3>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_PARTYSIZE_HELP'); ?></legend>
		<div class="row">
			<div class="small-12 columns">
				<div class="callout small gray">
					<?php echo $this->loadTemplate('partyinfo'); ?>
				</div>
			</div>
		</div>
	</fieldset>

	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_GUESTINFO'); ?></legend>
		<div class="row">
			<div class="small-12 columns">
				<div class="callout small gray">
					<?php echo $this->form->renderField('guestinfo'); ?>
				</div>
			</div>
		</div>
	</fieldset>

	<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SECTION_TRAVEL_SCHEDULE'); ?></h3>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_ARRIVALINFO'); ?></legend>
		<?php echo $this->loadTemplate('arrivalinfo'); ?>
	</fieldset>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_DEPARTUREINFO'); ?></legend>
		<?php echo $this->loadTemplate('departureinfo'); ?>
	</fieldset>

	<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_SECTION_EMERGENCY'); ?></h3>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_EMERGENCY'); ?></legend>
		<?php echo $this->loadTemplate('emergency'); ?>
	</fieldset>

	<?php echo $this->form->renderField('options'); ?>

	<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_PREFERENCES'); ?></h3>
	<fieldset>
		<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_PREFERENCES'); ?></legend>
		<div class="row">
			<div class="small-12 medium-12 large-6 columns">
				<?php echo $this->form->renderField('preferences'); ?>
			</div>
		</div>
	</fieldset>

	<fieldset>
		<div class="row">
			<div class="small-12 columns text-right">
				<button type="submit" class="button validate">
					<span><?php echo KrMethods::plain('COM_KNOWRES_DASHBOARD_UPDATE_ITEM'); ?></span>
				</button>
				<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=dashboard.cancel'); ?>"
				   class="button clear small" title="<?php echo KrMethods::plain('JCANCEL'); ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_OR_CANCEL'); ?>
				</a>
			</div>
		</div>
	</fieldset>

	<?php echo HTMLHelper::_('form.token'); ?>
	<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="jform[contract_id]" value="<?php echo $this->contract->id; ?>">
	<input type="hidden" name="jform[guest_id]" value="<?php echo $this->contract->guest_id; ?>">
	<input type="hidden" name="jform[arrival_means]" id="jform_arrival_means" value="<?php echo $this->item->arrival_means; ?>">
	<input type="hidden" name="task" value="contractguestdata.save">
</form>
