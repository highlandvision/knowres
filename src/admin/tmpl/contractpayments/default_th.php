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
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_PAYMENT_DATE', 'a.payment_date',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class='w-8'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_CONTRACT_ID', 'contract_tag',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-15 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_SERVICE_ID', 'service_name', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell text-center">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_CONFIRMED', 'a.confirmed', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-10 d-none d-md-table-cell text-end'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_AMOUNT', 'a.amount', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell text-end'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_RATE', 'a.rate', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class='w-8 d-none d-md-table-cell text-end'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_BASE_AMOUNT', 'a.base_amount',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-1 d-none d-md-table-cell text-center">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_CONTRACTPAYMENTS_ACTIONED', 'a.actioned', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th scope="col" class="w-3 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>