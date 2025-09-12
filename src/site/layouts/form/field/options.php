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

<h3><?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_OPTIONS'); ?></h3>
<fieldset>
	<legend>
		<?php echo KrMethods::plain('COM_KNOWRES_CONTRACTGUESTDATAFORM_LEGEND_OPTIONS'); ?>
	</legend>

	<div class="callout">
		<?php foreach ($property_options as $po): ?>
			<div class="grid-x grid-margin-x">
				<div class="small-12 medium-3 cell">
					<?php echo $po->name; ?>
				</div>

				<?php $id = 'answer_' . $po->id; ?>
				<?php if ($po->yesno) : ?>
					<div class="small-12 medium-2 large-1 cell">
						<?php echo HTMLHelper::_('select.genericlist', $yesno, 'answer[]',
							'class="form-select input-mini"', 'value', 'text',
							$goptions[$po->id]); ?>
						<input type=hidden name="oid[]" value="<?php echo $po->id; ?>">
					</div>
				<?php else : ?>
					<div class="small-12 medium-9 cell">
						<label class="show-for-sr" for="<?php echo $id; ?>"><?php echo $po->name; ?></label>
						<input id="<?php echo $id; ?>" type="text" class="form-control" name="answer[]"
						       value="<?php echo $goptions[$po->id]; ?>">
						<input type=hidden name="oid[]" value="<?php echo $po->id; ?>">
					</div>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>
</fieldset>