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

$setting = KrFactory::getListModel('propertysettings')->getPropertysettings($this->property_id, 'currency');
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
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'valid_from']); ?>
		</th>
		<td>
			<?php echo TickTock::displayDate($this->item->valid_to, 'd M Y'); ?>
		</td>
		<td class="text-end">
			<?php echo Utility::displayValue($this->item->rate, $setting['currency']); ?>
		</td>
		<td class="text-center">
			<?php echo $this->item->min_nights; ?>
		</td>
		<td class="text-center">
			<?php echo $this->item->max_nights; ?>
		</td>
		<td class="text-center">
			<?php echo $this->item->min_guests; ?>
		</td>
		<td class="text-center">
			<?php echo $this->item->max_guests; ?>
		</td>
		<td class="text-center">
			<?php $this->item->more_guests = Utility::decodeJson($this->item->more_guests, true); ?>
			<?php echo count($this->item->more_guests) > 0 ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td>
			<?php if ($this->item->start_day < 7): ?>
				<?php echo TickTock::getDayName($this->item->start_day); ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>