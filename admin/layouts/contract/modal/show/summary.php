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
use HighlandVision\KR\TickTock;
use Joomla\CMS\Object\CMSObject;

extract($displayData);
/**
 * Layout variables
 *
 * @var CMSObject $item The contract row.
 */
?>

<div class="row">
	<div class="col-6">
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?>
			</div>
			<div class="col-8">
				<?php echo TickTock::displayDate($item->arrival); ?>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?>
			</div>
			<div class="col-8">
				<?php echo TickTock::displayDate($item->departure); ?>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_NIGHTS'); ?>
			</div>
			<div class="col-8">
				<?php echo TickTock::differenceDays($item->arrival, $item->departure); ?>
			</div>
		</div>
	</div>
	<div class="col-6">
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_SERVICE_ID'); ?>
			</div>
			<div class="col-8">
				<?php echo $item->service_name; ?>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_LBL_CREATED'); ?>
			</div>
			<div class="col-8">
				<?php echo TickTock::displayTS($item->created_at); ?>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<?php echo KrMethods::plain('COM_KNOWRES_CREATED_BY_LBL'); ?>
			</div>
			<div class="col-8">
				<?php if ((int) $item->black_booking == 1): ?>
					<?php echo $item->created_by_name ?: KrMethods::plain('COM_KNOWRES_GUEST'); ?>
				<?php else: ?>
					<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_SERVICE_ID'); ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>