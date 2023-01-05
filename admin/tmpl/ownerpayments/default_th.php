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
	<th scope="col" class='w-6'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_PAYMENT_DATE',
			'a.payment_date', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-12'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_OWNER_ID',
			'owner_name', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_TYPE', 'a.type', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-15'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_PROPERTIES_PROPERTY_NAME',
			'property_name', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_RESERVATION',
			'contract_tag', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell text-end'>
		<?php echo KrMethods::plain('COM_KNOWRES_OWNERPAYMENTS_RENTAL'); ?>
	</th>
	<th scope="col" class='w-12 d-none d-md-table-cell text-end'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_AMOUNT', 'a.amount', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-12 d-none d-md-table-cell text-end'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_OWNERPAYMENTS_CALCULATED',
			'a.calculated', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-15 d-none d-md-table-cell text-center nowrap">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONFIRM', 'a.confirmed', $this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>