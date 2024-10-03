<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
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

	<th scope="col" class="w-10 text-center">
		<?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.state', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-10">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_SERVICE_ID', 'a.service_name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-10 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_METHOD', 'a.method', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-15 d-none d-lg-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_PROPERTY_ID', 'property_name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-6 d-none d-lg-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_CONTRACT_ID', 'contract_tag',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-7 d-none d-lg-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_ARRIVAL', 'a.arrival', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-7 d-none d-lg-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_DEPARTURE', 'a.departure',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-7 d-none d-lg-table-cell text-center'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_AVAILABILITY', 'a.availability',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-10 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_FOREIGN_KEY', 'a.foreign_key',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-7 d-none d-lg-table-cell text-center'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICEQUEUES_ACTIONED', 'a.actioned',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>