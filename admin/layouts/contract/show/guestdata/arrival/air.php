<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
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
 * @var array $air Air arrival info
 */
?>

	<div class="row">
		<div class="col-2 small italic"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_AIRLINE_LBL'); ?></div>
		<div class="col-2 small italic"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_NUMBER_LBL'); ?></div>
		<div class="col-3 small italic"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_AIR_FROM_LBL'); ?></div>
		<div class="col-3 small italic"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_AIR_TO_LBL'); ?></div>
		<div class="col-2 small italic"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_ARRIVAL_TIME_LBL'); ?></div>
	</div>

<?php foreach ($air as $a): ?>
	<div class="row">
		<div class="col-2"><?php echo $a->airline; ?></div>
		<div class="col-2"><?php echo $a->flight; ?></div>
		<div class="col-3"><?php echo $a->from; ?></div>
		<div class="col-3"><?php echo $a->to; ?></div>
		<div class="col-2"><?php echo $a->eta; ?></div>
	</div>
<?php endforeach; ?>