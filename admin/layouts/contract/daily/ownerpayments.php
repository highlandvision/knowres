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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var object $lines The owner payment data.
 */
?>

<div class="table-responsive">
	<table class="table table-sm">
		<thead>
		<tr>
			<th scope="col" style="width:12%"><?php echo KrMethods::plain('COM_KNOWRES_TAG'); ?></th>
			<th scope="col" style="width:18%"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_OWNERPAYMENT_AMOUNT_LBL'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACT_CONTRACT_TOTAL_LBL'); ?></th>
			<th scope="col"
			    style="width:10%"><?php echo ucwords(KrMethods::plain('COM_KNOWRES_OWNERPAYMENTS_TYPE')); ?></th>
			<th scope="col" style="width:20%"><?php echo KrMethods::plain('COM_KNOWRES_OWNER'); ?></th>
			<th scope="col"
			    style="width:20%"><?php echo ucwords(KrMethods::plain('COM_KNOWRES_OWNERPAYMENTS_DUE')); ?></th>
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
				<td><?php echo Utility::displayValue($l->amount, $l->currency); ?></td>
				<td><?php echo Utility::displayValue($l->contract_total, $l->currency); ?></td>
				<td><?php echo $l->type; ?></td>
				<td><?php echo $l->name; ?></td>
				<td><?php echo TickTock::displayDate($l->payment_date, 'dMY'); ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>