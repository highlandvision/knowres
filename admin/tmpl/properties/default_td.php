<?php
/**
 * @package    Know Reservations
 * @subpackage Admin templates
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

if ($this->access_level == 10)
{
	$edit             = $this->params->get('property_edit', false);
	$this->canChange  = $edit;
	$this->canCheckin = $edit;
	$this->canEdit    = $edit;
	$this->ordering   = false;
}
?>

<?php foreach ($this->items as $i => $this->item): ?>
	<tr class="row<?php echo $i % 2; ?>;">
		<td class="text-center">
			<?php echo HTMLHelper::_('grid.id', $i, $this->item->id); ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php if ($this->ordering): ?>
				<?php echo KrMethods::render('html.list.sortable', ['data' => $this]); ?>
			<?php endif; ?>
		</td>
		<td class="text-center">
			<?php echo HTMLHelper::_('jgrid.published', $this->item->state, $i, $this->name . '.', $this->canChange,
				'cb'); ?>
		</td>
		<th scope="row">
			<?php echo KrMethods::render('html.list.editable',
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'property_name']); ?>
		</th>
		<td>
			<div class="btn-toolbar kr-property-action" style="margin:0;">
				<div class="btn-group btn-group-sm">
					<?php
					$data            = [];
					$data['label']   = KrMethods::plain('COM_KNOWRES_PROPERTYDASHBOARD_TITLE');
					$data['icon']    = 'fa-gauge';
					$data['id']      = 'property-dashboard' . $this->item->id;
					$data['item_id'] = $this->item->id;
					$data['type']    = 'task';
					$data['view']    = 'property.dashboard';
					$data['field']   = 'id';
					$data['layout']  = 'dashboard';
					echo KrMethods::render('html.list.propertybar', $data);

					$data            = [];
					$data['label']   = KrMethods::plain('COM_KNOWRES_PROPERTY_CALENDAR');
					$data['icon']    = 'fa-calendar';
					$data['id']      = 'property-calendar' . $this->item->id;
					$data['item_id'] = $this->item->id;
					$data['type']    = 'task';
					$data['view']    = 'property.calendar';
					$data['field']   = 'property_id';
					$data['layout']  = 'calendar';
					echo KrMethods::render('html.list.propertybar', $data);

					if ($this->allow_block)
					{
						KrMethods::setUserState('com_knowres.gobackto', 'view=properties');
						$data            = [];
						$data['label']   = KrMethods::plain('COM_KNOWRES_CONTRACT_BLOCK_TITLE_LONG');
						$data['icon']    = 'fa-lock';
						$data['id']      = 'contract-block' . $this->item->id;
						$data['item_id'] = $this->item->id;
						$data['type']    = 'edit';
						$data['view']    = 'contract.edit';
						$data['field']   = 'property_id';
						$data['layout']  = 'block';
						echo KrMethods::render('html.list.propertybar', $data);
					}
					if ($this->allow_book)
					{
						$data            = [];
						$data['label']   = KrMethods::plain('COM_KNOWRES_CONTRACT_MANAGER_TITLE_LONG');
						$data['icon']    = 'fa-suitcase';
						$data['id']      = 'contract-edit' . $this->item->id;
						$data['item_id'] = $this->item->id;
						$data['type']    = 'edit';
						$data['view']    = 'contract.edit';
						$data['field']   = 'property_id';
						$data['layout']  = 'manager';
						echo KrMethods::render('html.list.propertybar', $data);
					}
					if ($this->allow_book && $this->agent)
					{
						$data            = [];
						$data['label']   = KrMethods::plain('COM_KNOWRES_CONTRACT_AGENT_TITLE_LONG');
						$data['icon']    = 'fa-headphones';
						$data['id']      = 'contract-agent' . $this->item->id;
						$data['item_id'] = $this->item->id;
						$data['type']    = 'edit';
						$data['view']    = 'contract.agent';
						$data['field']   = 'property_id';
						$data['layout']  = 'manager';
						echo KrMethods::render('html.list.propertybar', $data);
					}
					?>
				</div>
			</div>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->type_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->region_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo KrFactory::getAdminModel('property')::bookingTypeText($this->item->booking_type); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>