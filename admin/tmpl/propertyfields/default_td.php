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
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'label']); ?>
		</th>
		<td>
			<?php echo 'p' . $this->item->id; ?>
		</td>
		<td class="text-center">
			<?php echo $this->item->required ? KrMethods::plain('JYES') : KrMethods::plain('JNO'); ?>
		</td>
		<td>
			<?php echo match ($this->item->format)
			{
				1 => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_FORMAT_1'),
				2 => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_FORMAT_2'),
				3 => KrMethods::plain('COM_KNOWRES_FORM_PROPERTYFIELD_FORMAT_3'),
			};
			?>
		</td>
		<td>
			<?php if ($this->item->special): ?>
				<?php echo KrFactory::getAdminModel('propertyfield')
				                    ->propertyFieldSpecial($this->item->special, false); ?>
			<?php endif; ?>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>