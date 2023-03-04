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
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('bootstrap.dropdown')
   ->useScript('bootstrap.modal')
   ->useScript('core');
?>

	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
		id="contract-form" method="post" name="adminForm">
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
		<input type="hidden" name="property_id" value="<?php echo $this->item->property_id; ?>">
		<input type="hidden" name="arrival" value="<?php echo $this->item->arrival; ?>">
		<input type="hidden" name="departure" value="<?php echo $this->item->departure; ?>">
		<input type="hidden" name="guests" value="<?php echo $this->item->guests; ?>">
		<input type="hidden" name="layout" value="manager">
		<input type="hidden" name="guest_id" value="<?php echo $this->item->guest_id; ?>">
		<input type="hidden" name="guestdata_id" value="<?php echo $this->item->guestdata_id; ?>">
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>"
	      id="contract-checkin" method="post" name="adminForm">
		<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
		<input type="hidden" name="guest_id" value="<?php echo $this->item->guest_id; ?>">
		<input type="hidden" name="guestdata_id" value="<?php echo $this->item->guestdata_id; ?>">
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>"
	      id="contractpdf-form" method="post" name="adminForm">
		<input type="hidden" name="contract_id" value="<?php echo $this->item->id; ?>">
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>
	<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=property.calendar'); ?>"
	      id="propertycalendar-form" method="post" name="adminForm">
		<input type="hidden" name="property_id" value="<?php echo $this->item->property_id; ?>">
		<input type="hidden" name="task" value="">
		<?php echo HTMLHelper::_('form.token'); ?>
	</form>

	<div class="accordion">
		<div class="row">
			<div class="col-xl-6">
				<div style="max-width:600px;">
					<?php echo $this->loadTemplate('summary'); ?>
					<?php echo $this->loadTemplate('rooms'); ?>
					<?php echo $this->loadTemplate('notes'); ?>
					<?php echo $this->loadTemplate('agent'); ?>
					<?php echo $this->loadTemplate('schedule'); ?>
					<?php echo $this->loadTemplate('payments'); ?>
					<?php echo $this->loadTemplate('fees'); ?>
					<?php echo $this->loadTemplate('owner'); ?>
					<?php echo $this->loadTemplate('adjustments'); ?>
				</div>
			</div>
			<div class="col-xl-6" style="max-width:600px;">
				<div style="max-width:600px;">
					<?php echo $this->loadTemplate('guest'); ?>
					<?php echo $this->loadTemplate('guestdata'); ?>
				</div>
			</div>
		</div>
	</div>

<?php if ($this->access_level > 10 && !$this->item->black_booking): ?>
	<?php echo $this->loadTemplate('modal_trigger'); ?>
	<?php if (!$this->item->cancelled): ?>
		<?php echo $this->loadTemplate('modal_quickedit'); ?>
	<?php else: ?>
		<?php echo $this->loadTemplate('modal_resurrect'); ?>
	<?php endif; ?>
<?php endif; ?>

	<!--TODO-v4.1 reinstate-->
<?php if ($this->xero): ?>
	<?php echo $this->loadTemplate('xero'); ?>
<?php endif; ?>

<?php echo KrMethods::render('contract.modal.error'); ?>