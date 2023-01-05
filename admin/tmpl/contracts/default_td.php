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

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;
?>
	<style>
		.table > :not(caption) > * > * {
			padding: 0.75rem 0.5rem;
	</style>

<?php foreach ($this->items as $i => $this->item): ?>
	<tr class="row<?php echo $i % 2; ?>;">
		<td class="text-center">
			<?php echo HTMLHelper::_('grid.id', $i, $this->item->id); ?>
		</td>
		<?php if ($this->ordering): ?>
			<td class="text-center d-none d-md-table-cell">
				<?php echo KrMethods::render('html.list.sortable', ['data' => $this]); ?>
			</td>
		<?php endif; ?>
		<td class="text-center">
			<?php echo HTMLHelper::_('jgrid.published', $this->item->state, $i, $this->name . '.', $this->canChange,
				'cb'); ?>
		</td>
		<th scope="row">
			<?php echo KrMethods::render('html.list.editable',
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'tag', 'task' => 'contract.show']); ?>
		</th>
		<td>
			<?php echo TickTock::displayDate($this->item->arrival, 'dMy'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayDate($this->item->departure, 'dMy'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=property.dashboard&id='
				. (int) $this->item->property_id); ?>">
				<?php echo $this->escape($this->item->property_name); ?>
			</a>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if (!$this->item->black_booking) : ?>
				<?php echo $this->item->guest_name; ?>
			<?php else : ?>
				<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTS_BLACK_BOOKING'); ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if ($this->item->agent_id) : ?>
				<?php echo $this->item->agent_name; ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->region_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->owner_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->manager_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php
			if (!$this->item->black_booking || $this->item->booking_status == 99)
			{
				echo Utility::getBookingStatus($this->item->booking_status, true);
			}
			?>
		</td>
		<?php if ($this->access_level > 10): ?>
			<td class="text-end d-none d-md-table-cell">
				<?php if (!$this->item->black_booking) : ?>
					<?php echo Utility::displayValue($this->item->contract_total, $this->item->currency); ?>
				<?php endif; ?>
			</td>
		<?php endif; ?>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>