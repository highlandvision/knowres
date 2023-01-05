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
use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

$params = KrMethods::getParams();
?>

<?php foreach ($this->items as $i => $this->item): ?>
	<tr class="row<?php echo $i % 2; ?>">
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
				['data' => $this, 'item' => $this->item, 'i' => $i, 'column' => 'filename']); ?>
		</th>
		<td class="d-none d-md-table-cell" style="vertical-align:top;">
			<?php echo HTMLHelper::_('image',
				Media\Images::getImagePath($this->item->property_id, "thumb", $this->item->filename),
				$this->item->alt_text, [
					'width'  => $params->get('max_slideshow_thumb_width'),
					'height' => $params->get('max_slideshow_thumb_height')
				]);
			?>
		</td>
		<td style="vertical-align:top;">
			<div class="form-control d-none d-md-table-cell kr-editinplace" contenteditable="true" tabindex="0"
			     data-column="alt_text"
			     data-table="translate~image~<?php echo $this->item->id; ?>">
				<?php echo $this->item->alt_text; ?>
			</div>
		</td>
		<td style="vertical-align:top;">
			<div class="form-control d-none d-md-table-cell kr-editinplace" contenteditable="true" tabindex="0"
			     data-column="description"
			     data-table="translate~image~<?php echo $this->item->id; ?>">
				<?php echo $this->item->description; ?>
			</div>
		</td>
		<td class="d-none d-md-table-cell">
			<?php echo (int) $this->item->id; ?>
		</td>
	</tr>
<?php endforeach; ?>