<?php
/**
 * @package         Joomla.Site
 * @subpackage      Layout
 * @copyright   (C) 2016 Open Source Matters, Inc. <https://www.joomla.org>
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use Joomla\CMS\HTML\HTMLHelper;

extract($displayData);
/**
 * Layout variables
 * -----------------
 *
 * @var   array $property_options Property options.
 * @var   array $goptions         Guest options.
 * @var   array $yesno            Yes / No selection.
 */
?>

<fieldset>
	<legend>
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATA_LEGEND_OPTIONS'); ?>
	</legend>

	<?php foreach ($property_options as $po): ?>
		<div class="control-group">
			<?php $input_id = 'answer_' . $po->id; ?>
			<?php $label_id = 'label_' . $po->id; ?>
			<div class="control-label">
				<label id="<?php echo $label_id; ?>" for="<?php echo $input_id; ?>">
					<?php echo $po->name; ?>
				</label>
			</div>
			<div class="controls">
				<?php if ($po->yesno) : ?>
					<div class="col-2">
						<?php echo HTMLHelper::_('select.genericlist', $yesno, 'answer[]', 'class="form-select input-mini"',
							'value', 'text', $goptions[$po->id], $input_id); ?>
						<input type=hidden name="oid[]" value="<?php echo $po->id; ?>">
					</div>
				<?php else : ?>
					<div class="col-9">
						<input id="<?php echo $input_id; ?>" type="text" class="form-control" name="answer[]"
						       value="<?php echo $goptions[$po->id]; ?>">
						<input type=hidden name="oid[]" value="<?php echo $po->id; ?>">
					</div>
				<?php endif; ?>
			</div>
		</div>
		<br>
	<?php endforeach; ?>
</fieldset>