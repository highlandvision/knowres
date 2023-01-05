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
use Joomla\CMS\HTML\HTMLHelper;

$seasonText = [
	'xlow'  => KrMethods::plain('COM_KNOWRES_SEASON_XLOW'),
	'low'   => KrMethods::plain('COM_KNOWRES_SEASON_LOW'),
	'slow'  => KrMethods::plain('COM_KNOWRES_SEASON_SLOW'),
	'mid'   => KrMethods::plain('COM_KNOWRES_SEASON_MID'),
	'high'  => KrMethods::plain('COM_KNOWRES_SEASON_HIGH'),
	'xhigh' => KrMethods::plain('COM_KNOWRES_SEASON_XHIGH'),
];
?>

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
			<?php echo KrMethods::render('html.list.editable', ['data' => $this, 'item' => $this->item, 'i' => $i]); ?>
		</th>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayDate($this->item->valid_from); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayDate($this->item->valid_to); ?>
		</td>
		<td class="d-none d-md-table-cell text-center">
			<?php echo $this->item->minimum_nights; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $seasonText[$this->item->season]; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->cluster_name; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>