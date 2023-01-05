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

$net_rates = KrFactory::getListModel('propertysettings')->getOneSetting('net_rates');
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
			<?php echo HTMLHelper::_('jgrid.published', $this->item->state, $i, 'ownerpayments.', $this->canChange,
				'cb'); ?>
		</td>
		<td>
			<?php echo TickTock::displayDate($this->item->payment_date, 'dMY'); ?>
		</td>
		<td>
			<a href="<?php echo KrMethods::route('index.php?option=com_knowres&task=owner.edit&id='
				. (int) $this->item->owner_id); ?>">
				<?php echo $this->escape($this->item->owner_name); ?>
			</a>
		</td>
		<td>
			<?php echo $this->item->type; ?>
		</td>
		<td>
			<a href="<?php echo KrMethods::route(
				'index.php?option=com_knowres&task=property.dashboard&id='
				. (int) $this->item->property_id); ?>">
				<?php echo $this->escape($this->item->property_name); ?>
			</a>
		</td>
		<td>
			<a href="<?php echo KrMethods::route(
				'index.php?option=com_knowres&task=contract.show&id=' . (int) $this->item->contract_id); ?>">
				<?php echo $this->item->contract_tag; ?>
			</a>
		</td>
		<td class="text-end">
			<?php $net = !isset($net_rates[$this->item->property_id]) ? $net_rates[0]
				: $net_rates[$this->item->property_id]; ?>
			<?php if ($net): ?>
				<?php echo Utility::displayValue($this->item->net_price, $this->item->currency); ?>
			<?php else: ?>
				<?php echo Utility::displayValue($this->item->room_total, $this->item->currency); ?>
			<?php endif; ?>
		</td>
		<td class="text-end">
			<?php if ($this->item->confirmed > 0): ?>
				<?php echo Utility::displayValue($this->item->amount, $this->item->currency); ?>
			<?php endif; ?>
		</td>
		<td class="text-end">
			<?php echo Utility::displayValue($this->item->calculated, $this->item->currency); ?>
		</td>
		<td class="text-center">
			<?php if ($this->item->confirmed): ?>
				<?php echo KrMethods::plain('JYES'); ?>
			<?php else: ?>
				<button type="button" class="ownerpaymentconfirm btn btn-small btn-primary text-end"
				        data-id="<?php echo $this->item->id; ?>">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM'); ?>
				</button>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>