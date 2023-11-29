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
use Joomla\CMS\Session\Session;
?>

<?php foreach ($this->items as $i => $this->item): ?>
	<?php if ($this->item->item == 'property'): ?>
		<?php $property_name = $Translations->getProperty($this->item->item_id); ?>
		<?php if (!$property_name): ?>
			<?php continue; ?>
		<?php endif; ?>
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
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'item']); ?>
		</th>
		<td>
			<?php if ($this->item->item == 'property'): ?>
				<?php echo $property_name; ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php if ($this->item->item != 'property'): ?>
				<?php echo $this->item->field; ?>
			<?php else: ?>
				<?php $id = (int) substr($this->item->field, 1); ?>
				<?php echo $this->Translations->getText('propertyfield', $id, 'label'); ?>
			<?php endif; ?>
		</td>
		<?php if ($this->orphans && $canEdit): ?>
			<td class="d-none d-md-table-cell text-center">
				<?php $link = KrMethods::route('index.php?option=com_knowres&task=translation.translateme&tmpl=raw&'
					. Session::getFormToken() . '=1' . '&id=' . $this->item->id); ?>
				<a href="<?php echo $link; ?>" class="modal" rel="{handler: 'ajax',size: {x: 600, y: 450}}">
					<i class='fa-solid fa-language fa-2x'></i>
				</a>
			</td>
		<?php endif; ?>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->text; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo $this->item->language; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>