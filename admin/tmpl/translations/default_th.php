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
	<th scope="col" class="w-1 text-center">
		<?php echo HTMLHelper::_('searchtools.sort', 'JSTATUS', 'a.state', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TRANSLATIONS_ITEM', 'a.item',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TRANSLATIONS_ITEM_ID', 'name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TRANSLATIONS_FIELD', 'a.field',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<?php if ($this->orphans): ?>
		<th scope="col" class="w-5 d-none d-md-table-cell nowrap text-center">
			<?php echo KrMethods::plain('COM_KNOWRES_TRANSLATE'); ?>
		</th>
	<?php endif; ?>
	<th scope="col" class="w-50 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TRANSLATIONS_TEXT', 'a.text', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_TRANSLATIONS_LANGUAGE', 'a.language', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>