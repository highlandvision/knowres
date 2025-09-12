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
	<th scope="col" class='w-10'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_NAME', 'name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-15 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAXRATES_TAX_ID', 'tax_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAXRATES_CODE', 'a.code', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-5 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAXRATES_RATE', 'a.rate', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAXRATES_PER_NIGHT', 'a.per_night', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TAXRATES_VALID_FROM', 'a.valid_from', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>