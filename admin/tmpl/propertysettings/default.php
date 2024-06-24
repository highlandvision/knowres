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
use HighlandVision\KR\Utility;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\CalendarView $this */

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>" id="adminForm" method="post"
      name="adminForm">

	<div class="main-card">
		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab',
			['active' => 'booking', 'recall' => true, 'breakpoint' => 768]); ?>
		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'booking',
			KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING')); ?>
		<div class="row">
			<div class="col-lg-6">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING_LIMITS'); ?></legend>
				<?php echo $this->form->renderFieldset('bookings-left'); ?>

				<?php if (!$this->params->get('tax_ignore')): ?>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_TAX'); ?></legend>
					<?php echo $this->form->renderFieldset('bookings-lefttax'); ?>
				<?php endif; ?>
			</div>
			<div class="col-lg-6">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING_DEPOSIT'); ?></legend>
				<?php echo $this->form->renderFieldset('bookings-right'); ?>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>
		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'fields',
			KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING_REQUIRED')); ?>
		<div class="row">
			<div class="col-lg-6">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING_REQUIRED_GUEST'); ?></legend>
				<?php echo $this->form->renderFieldset('form-left'); ?>
			</div>
			<div class="col-lg-6">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_BOOKING_REQUIRED_MANAGER'); ?></legend>
				<?php echo $this->form->renderFieldset('form-right'); ?>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>
		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'rates',
			KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE')); ?>
		<div class="row">
			<div class="col-lg-6">
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_ENTRY'); ?></legend>
				<?php echo $this->form->renderFieldset('rates-left'); ?>
				<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_STAY'); ?></legend>
				<?php echo $this->loadTemplate('rates_left_los'); ?>
				<?php echo $this->loadTemplate('rates_left_sb'); ?>
			</div>
			<div class="col-lg-6">
				<?php if ($this->access_level == 40): ?>
					<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_MANAGER_ADMIN'); ?></legend>
					<p><?php echo KrMethods::plain('COM_KNOWRES_PROPERTYSETTINGS_RATE_MANAGER_ADMIN_DSC'); ?></p>
					<?php echo $this->form->renderFieldset('rates-right-net'); ?>
					<?php echo $this->form->renderFieldset('rates-right-beyond'); ?>
					<div id="beyond" class="label-right">
						<?php echo $this->form->renderFieldset('rates-right-beyond-data'); ?>
					</div>
					<?php echo $this->form->renderFieldset('rates-right-managed'); ?>
					<div id="managed" class="label-right">
						<?php echo $this->form->renderFieldset('rates-right-managed-data'); ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>
		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>

		<input type="hidden" name="old_settings"
		       value="<?php echo htmlspecialchars(Utility::encodeJson($this->settings)); ?>">
		<input type="hidden" name="old_setting_ids"
		       value="<?php echo htmlspecialchars(Utility::encodeJson($this->settings_ids)); ?>">
		<input type="hidden" name="property_id" value="<?php echo $this->property_id; ?>">
		<input type="hidden" name="task" value="">

		<?php echo HTMLHelper::_('form.token'); ?>
		<?php echo HTMLHelper::_('bootstrap.endTabSet'); ?>
	</div>
</form>