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

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $guestdata Guestdata row.
 */
?>

<div class="row mt-2">
	<div class="col-12 fw500">
		<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
	</div>
	<div class="col-4">
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DEPARTURE_TIME_DSC'); ?>
	</div>
	<div class="col-8">
		<?php echo $guestdata->departure_time; ?>
	</div>
	<?php if (!empty($guestdata->departure_means)): ?>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DEPARTURE_MEANS_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->departure_means; ?>
		</div>
	<?php endif; ?>
	<?php if (!empty($guestdata->departure_number)): ?>
		<div class="col-4">
			<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_DEPARTURE_NUMBER_LBL'); ?>
		</div>
		<div class="col-8">
			<?php echo $guestdata->departure_number; ?>
		</div>
	<?php endif; ?>
</div>