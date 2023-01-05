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
use HighlandVision\KR\Utility;
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
			<?php echo KrMethods::render('html.list.editable', ['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'payment_date']); ?>
		</th>
		<td>
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=contract.show&id='
				. (int) $this->item->contract_id); ?>">
				<?php echo $this->item->contract_tag; ?>
			</a>
		</td>
		<td>
			<?php if ($this->item->service_name): ?>
				<?php echo $this->item->service_name; ?>
				<?php if ($this->item->payment_ref): ?>
					<?php echo $this->item->payment_ref; ?>
				<?php endif; ?>
			<?php elseif ($this->item->payment_ref): ?>
				<?php echo '----------<br>' . $this->item->payment_ref; ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell text-center">
			<?php echo $this->item->confirmed ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell text-end">
			<?php echo Utility::displayValue($this->item->amount, $this->item->currency); ?>
		</td>
		<td class="d-none d-md-table-cell text-end">
			<?php echo $this->item->rate; ?>
		</td>
		<td class="d-none d-md-table-cell text-end">
			<?php echo Utility::displayValue($this->item->base_amount, $this->item->currency); ?>
		</td>
		<td class="d-none d-md-table-cell text-center">
			<?php echo (int) $this->item->actioned ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>