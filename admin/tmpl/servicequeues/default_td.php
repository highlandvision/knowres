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
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'service_name']); ?>
		</th>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->method; ?>
		</td>
		<td class="d-none d-lg-table-cell">
			<?php echo $this->item->property_name; ?>
		</td>
		<td class="d-none d-lg-table-cell">
			<?php if ($this->item->contract_id): ?>
				<?php echo !empty($this->item->contract_tag) ? $this->item->contract_tag : $this->item->contract_id; ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-lg-table-cell">
			<?php echo TickTock::displayDate($this->item->arrival, 'd-M-y'); ?>
		</td>
		<td class="d-none d-lg-table-cell">
			<?php echo TickTock::displayDate($this->item->departure, 'd-M-y'); ?>
		</td>
		<td class="d-none d-lg-table-cell text-center">
			<?php echo $this->item->availability ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->foreign_key; ?>
		</td>
		<td class="d-none d-lg-table-cell text-center">
			<?php echo $this->item->actioned ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>