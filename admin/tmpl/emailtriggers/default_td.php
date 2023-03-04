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
			<?php echo KrMethods::render('html.list.editable', ['data' => $this, 'item' => $this->item, 'i' => $i]); ?>
		</th>
		<td>
			<?php echo $this->item->trigger_actual; ?>
		</td>
		<td>
			<?php $link = KrMethods::route('index.php?option=com_knowres&task=emailtemplate.edit&id=' . $this->item->email_template_id); ?>
			<a href="<?php echo $link; ?>">
				<?php echo $this->escape($this->item->email_template_name); ?>
			</a>
		</td>
		<td>
			<?php echo $this->item->trigger_cron; ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php if ($this->item->days): ?>
				<?php echo $this->item->days_before ? '-' . $this->item->days : '+' . $this->item->days; ?>
			<?php endif; ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->send_guest ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->send_owner ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->send_caretaker ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->send_agent ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="text-center d-none d-md-table-cell">
			<?php echo $this->item->send_admin ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>