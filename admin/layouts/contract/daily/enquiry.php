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

extract($displayData);
/**
 * Layout variables
 *
 * @var array $lines The request data.
 */
?>

<div class="table-responsive">
	<table class="table table-sm">
		<thead>
		<tr>
			<th scope="col" style="width:12%"><?php echo KrMethods::plain('COM_KNOWRES_TAG'); ?></th>
			<th scope="col" style="width:18%"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_GUEST'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_AGENT_TITLE'); ?></th>
			<th scope="col" style="width:30%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_EXPIRES_AT'); ?></th>
		</tr>
		</thead>
		<tbody>
		<?php foreach ($lines as $l): ?>
			<tr>
				<th scope="col"><?php echo $l['tag']; ?></th>
				<td><?php echo $l['property_name']; ?></td>
				<td><?php echo $l['guestname']; ?></td>
				<td><?php echo $l['arrival']; ?></td>
				<td><?php echo $l['departure']; ?></td>
				<td><?php echo $l['agent_name']; ?></td>
				<td><?php echo $l['expires']; ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>
