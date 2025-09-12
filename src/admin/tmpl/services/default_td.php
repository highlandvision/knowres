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

<?php foreach ($this->items as $i => $this->item): ?>
	<?php if ($this->item->agency_id == 0): ?>
		<?php continue; ?>
	<?php endif; ?>

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
				['data' => $this, 'item' => $this->item, 'i' => $i]); ?>
		</th>
		<td class="text-center">
			<?php
			if ($this->item->agency_id > 0 && $this->item->type == "g")
			{
				echo $this->item->currency;
			}
			?>
		</td>
		<td>
			<?php echo match ($this->item->type)
			{
				'g' => KrMethods::plain('COM_KNOWRES_SERVICE_GATEWAY'),
				's' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_SERVICE'),
				'c' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_CHANNEL'),
				'i' => KrMethods::plain('COM_KNOWRES_SERVICE_TYPE_ICAL'),
				default => KrMethods::plain('COM_KNOWRES_UNKNOWN'),
			};
			?>
		</td>
		<td>
			<?php echo $this->item->plugin; ?>
		</td>
		<td>
			<?php echo $this->item->agency_name; ?>
		</td>
		<td>
			<?php echo $this->item->property_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>