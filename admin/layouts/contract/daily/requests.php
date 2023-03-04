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
use Joomla\CMS\HTML\HTMLHelper;

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
			<th scope="col"
			    style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_CONTRACT_TOTAL'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_ARRIVAL'); ?></th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_DEPARTURE'); ?></th>
			<th scope="col" style="width:10%">&nbsp;</th>
			<th scope="col" style="width:10%"><?php echo KrMethods::plain('COM_KNOWRES_GUEST'); ?></th>
			<th scope="col" style="width:20%"><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_EXPIRES_AT'); ?></th>
		</tr>
		</thead>
		<tbody>
		<?php foreach ($lines as $l): ?>
			<tr>
				<th scope="col"><?php echo $l['tag']; ?></th>
				<td><?php echo $l['property_name']; ?></td>
				<td><?php echo Utility::displayValue($l['contract_total'], $l['currency']); ?></td>
				<td><?php echo $l['arrival']; ?></td>
				<td><?php echo $l['departure']; ?></td>
				<td>
					<?php $id = "kr-contract-request-form-" . $l['id']; ?>
					<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>"
					      class="form-validate" id="<?php echo $id; ?>" method="post" name="adminForm"">

						<div class="btn-toolbar" role="toolbar" aria-label="Approve request">
							<button class="btn btn-success"
							        onclick="Knowres.submitform('contract.requestapprove', document.getElementById('<?php echo $id; ?>'));"
							        title="<?php echo KrMethods::plain('COM_KNOWRES_APPROVE'); ?>" type="button">
								<i class="fas fa-check"></i>
							</button>&nbsp;&nbsp;&nbsp;
							<button class="btn btn-danger"
							        onclick="Knowres.submitform('contract.requestreject', document.getElementById('<?php echo $id; ?>'));"
							        title="<?php echo KrMethods::plain('COM_KNOWRES_REJECT'); ?>" type="button">
								<i class="fas fa-trash"></i>
							</button>
						</div>
						<?php echo HTMLHelper::_('form.token'); ?>
						<input type="hidden" name="id" value="<?php echo $l['id']; ?>">
						<input type="hidden" name="service_id" value="<?php echo $l['service_id']; ?>">
						<input type="hidden" name="property_id" value="<?php echo $l['property_id']; ?>">
						<input type="hidden" name="task" value="">
					</form>
				</td>
				<td><?php echo $l['guestname']; ?></td>
				<td><?php echo $l['expires']; ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>