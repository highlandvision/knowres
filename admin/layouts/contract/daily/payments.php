<?php
/**
 * @package     Know Reservations
 * @subpackage  Admin Layout
 * @copyright   2021 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var object $lines The payment data.
 */
?>

<div class="table-responsive">
	<table class="table table-sm">
		<thead>
		<tr>
			<th scope="col" style="width:12%"><?php echo KrMethods::plain('COM_KNOWRES_TAG'); ?></th>
			<th scope="col" style="width:18%"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_CONTRACT_TOTAL'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_PAYMENT_RECEIVED'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_GATEWAY'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_BOOKING_STATUS'); ?></th>
			<th scope="col" style="width:30%"><?php echo KrMethods::plain('COM_KNOWRES_GUEST'); ?></th>
		</tr>
		</thead>
		<tbody>
		<?php foreach ($lines as $l): ?>
			<?php $clink = KrMethods::route('index.php?option=com_knowres&task=contract.show&id=' . $l->contract_id); ?>
			<?php $plink = KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id='
				. $l->property_id); ?>

			<tr>
				<th scope="col"><a href="<?php echo $clink; ?>"><?php echo $l->tag; ?></a></th>
				<td><a href="<?php echo $plink; ?>"><?php echo $l->property_name; ?></a></td>
				<td><?php echo Utility::displayValue($l->contract_total, $l->currency); ?></td>
				<td><?php echo Utility::displayValue($l->base_amount, $l->currency); ?></td>
				<td><?php echo ucfirst($l->plugin); ?></td>
				<td><?php echo Utility::getBookingStatus($l->booking_status); ?></td>
				<td><?php echo $l->firstname . ' ' . $l->surname; ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>