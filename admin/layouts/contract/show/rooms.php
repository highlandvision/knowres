<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $contract The contract item.
 */

$Translations = new Translations();
$guest_types  = $contract->guest_types;
$rooms        = $contract->rooms;
$extras       = $contract->extras;
?>

<?php if (count($guest_types)): ?>
	<div class="row">
		<div class="col-4 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_PARTYSIZE'); ?>
		</div>
	</div>
	<?php foreach ($guest_types as $d): ?>
		<div class="row">
			<div class="col-4">
				<?php echo $d->type; ?>
			</div>
			<div class="col-8">
				<?php echo $d->number; ?>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>

<?php if (count($rooms)): ?>
	<div class="row">
		<div class="col-4 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_REQUESTED_ROOMS'); ?>
		</div>
	</div>
	<?php foreach ($rooms as $d): ?>
		<div class="row">
			<div class="col-4">
				<?php echo $Translations->getText('room', $d->room_id); ?>
			</div>
			<div class="col-8">
				<?php echo $d->number; ?>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>

<?php if (count($extras)): ?>
	<div class="row">
		<div class="col-4 strong">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_EXTRAS_LBL'); ?>
		</div>
	</div>
	<?php foreach ($extras as $id => $d): ?>
		<div class="row">
			<div class="col-4">
				<?php echo $Translations->getText('extra', $id); ?>
			</div>
			<div class="col-8">
				<?php echo $d->quantity; ?>
			</div>
		</div>
	<?php endforeach; ?>
<?php endif; ?>