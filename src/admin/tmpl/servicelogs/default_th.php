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
	<th class='w-5 center'>
		<?php echo KrMethods::plain('COM_KNOWRES_VIEW'); ?>
	</th>
	<th scope="col" class="w-15">
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_SERVICE_ID', 'a.service_name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_METHOD', 'a.method', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th class='w-7 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_SUCCESS', 'a.success', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_PROPERTY_ID', 'property_name',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th class='w-10 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_CONTRACT_ID', 'contract_tag',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th class='w-7 text-center d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_QUEUE_ID', 'a.queue_id', $this->listDirn,
			$this->listOrder); ?>
	</th>
	<th class='w-12 d-none d-md-table-cell'>
		<?php echo HTMLHelper::_('searchtools.sort', 'COM_KNOWRES_SERVICELOGS_CREATED_AT', 'a.created_at',
			$this->listDirn, $this->listOrder); ?>
	</th>
	<th scope="col" class="w-5 d-none d-md-table-cell">
		<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ID', 'a.id', $this->listDirn, $this->listOrder); ?>
	</th>
</tr>