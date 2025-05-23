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
	<th scope="col" class="w-20">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_NAME', 'name', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-7 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_TRIGGER_ACTUAL', 'a.trigger_actual',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-15 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_EMAIL_TEMPLATE_ID',
			'email_template_name', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-5 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_TRIGGER_CRON', 'a.trigger_cron',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_DAYS', 'a.days', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_GUEST', 'a.send_guest',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNER', 'a.send_owner',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_SEND_CARETAKER', 'a.send_caretaker',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_SEND_AGENCY', 'a.send_agency',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-2 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_EMAILTRIGGERS_SEND_ADMIN', 'a.send_admin',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>