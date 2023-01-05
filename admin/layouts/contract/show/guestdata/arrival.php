<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\Object\CMSObject;

defined('_JEXEC') or die;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $guestdata Guestdata row.
 */
?>

	<div class="row mt-3">
		<div class="col-12 fw500">
			<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
		</div>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAS_ARRIVAL_BY'); ?>
		</div>
		<div class="col-8">
			<?php echo ucfirst($guestdata->arrival_means); ?>
		</div>
	</div>

<?php if ($guestdata->arrival_means == 'air'): ?>
	<?php if (is_countable($guestdata->arrival_air) && count($guestdata->arrival_air)): ?>
		<?php echo KrMethods::render('contract.show.guestdata.arrival.air', ['air' => $guestdata->arrival_air]); ?>
	<?php endif; ?>
<?php elseif ($guestdata->arrival_means == 'train'): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_PLACE_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->arrival_place; ?>
		</div>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_TIME_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->arrival_time; ?>
		</div>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_FROM_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->arrival_from; ?>
		</div>
	</div>
<?php elseif ($guestdata->arrival_means == 'auto'): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_AUTO_ARRIVAL_FROM_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->arrival_from; ?>
		</div>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_TIME_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->arrival_time; ?>
		</div>
	</div>
<?php elseif ($guestdata->arrival_means == 'other'): ?>
	<div class="row">
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAS_OTHER_INFORMATION'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->other_information; ?>
		</div>
	</div>
<?php endif; ?>