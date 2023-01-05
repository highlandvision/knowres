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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$currencies = KrFactory::getListModel('propertysettings')->getOneSetting('currency');
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
			<?php echo KrMethods::render('html.list.editable',
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'name']); ?>
		</th>
		<?php if (!$this->property_id): ?>
			<td class="d-none d-md-table-cell">
				<?php echo $this->item->property_name; ?>
			</td>
		<?php endif; ?>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayDate($this->item->valid_from, 'd M Y'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo TickTock::displayDate($this->item->valid_to, 'd M Y'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if ($this->item->is_pc): ?>
				<?php echo $this->item->discount . '%'; ?>
			<?php else: ?>
				<?php $currency = $currencies[$this->item->property_id] ?? $currencies[0]; ?>
				<?php echo Utility::displayValue($this->item->discount, $currency); ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if (!$this->item->model): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DISCOUNT_DAY_RANGE') . ' ' . $this->item->param1 . ' - '
					. $this->item->param2 ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_DISCOUNT_DATE_RANGE') . ' '
					. TickTock::displayDate($this->item->param1) . ' - ' . TickTock::displayDate($this->item->param2) ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>