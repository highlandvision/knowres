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
	<th scope="col" class="w-10">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_VALID_FROM', 'a.valid_from', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-10">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_VALID_TO', 'a.valid_to', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-10 text-end d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_RATE', 'a.rate', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 text-center d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_MIN_NIGHTS', 'a.min_nights', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 text-center d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_MAX_NIGHTS', 'a.max_nights', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 text-center d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_MIN_GUESTS', 'a.min_guests', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 text-center d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_MAX_GUESTS', 'a.max_guests', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 text-center d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_MORE_GUESTS', 'a.more_guests', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-10 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_RATES_START_DAY', 'a.start_day', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>