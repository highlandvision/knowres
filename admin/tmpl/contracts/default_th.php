<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
?>

<tr>
	<td class="w-1 text-center">
		<?php echo HTMLHelper::_('grid.checkall'); ?>
	</td>
	<?php if ($this->ordering): ?>
		<th scope="col" class="w-1 text-center d-none d-md-table-cell">
			<?php echo HTMLHelper::_('searchtools.sort', '', 'a.ordering', $this->listDirn, $this->listOrder, null,
				'asc', 'JGRID_HEADING_ORDERING', 'icon-sort'); ?>
		</th>
	<?php endif; ?>
	<th scope="col" class="w-1 text-center">
		<?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.state', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-7'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAG', 'a.tag', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-3'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_ARRIVAL', 'a.arrival', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-3'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_DEPARTURE', 'a.departure', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_PROPERTY', 'property_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_GUEST', 'guest_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-6 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTS_AGENT_ID', 'agent_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-5 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_REGION', 'region_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_PROPERTIES_OWNER', 'owner_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTS_MANAGER_ID', 'manager_name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-6 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTS_BOOKING_STATUS_SHORT', 'a.booking_status',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<?php if ($this->access_level > 10): ?>
		<th scope="col" class='w-5 d-none d-md-table-cell text-end'>
			<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTS_CONTRACT_TOTAL', 'a.contract_total',
				$this->listDirn, $this->listOrder); ?>
		</th>
	<?php endif; ?>
	<th scope="col" class="w-1 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>