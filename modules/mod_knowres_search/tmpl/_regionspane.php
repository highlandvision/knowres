<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="dropdown-pane large" id="kr-searchregion-drop" data-alignment="center" data-auto-focus="true"  data-closable
     data-close-on-click="true" data-dropdown data-position="bottom" data-v-offset="8">

	<div class="header">
		<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SELECT_DESTINATIONS'); ?>
	</div>

	<div class="dropdown-body">
		<?php $c = 0; ?>
		<?php foreach ($regions as $k => $v): ?>
			<div class="row">
				<div class="small-6 columns">
					<input type="checkbox" class="checkover country" name="<?php echo $k; ?>"
					       id="<?php echo $k; ?>" data-value="<?php echo $k; ?>">
					<label class="checklabel" for="<?php echo $k; ?>">
						<?php echo $k; ?></label>
				</div>
				<div class="small-6 columns">
					<?php foreach ($v as $id => $r): ?>
						<?php if (!empty($initial->region_id[$id])) : ?>
							<input type="checkbox" checked="checked" class="checkover region"
							       name="region_id[<?php echo $id; ?>]" id="<?php echo $id; ?>"
							       value="<?php echo $r; ?>"
							       data-field="<?php echo $id; ?>" data-country="<?php echo $k; ?>"
							       data-value="<?php echo $id; ?>">
						<?php else : ?>
							<input type="checkbox" class="checkover region" name="region_id[<?php echo $id; ?>]"
							       id="<?php echo $id; ?>" value="<?php echo $r; ?>" data-value="<?php echo $id; ?>"
							       data-country="<?php echo $k; ?>">
						<?php endif; ?>

						<label class="checklabel" for="<?php echo $id; ?>">
							<?php echo $r; ?>
						</label>
						<br>
						<?php $c++; ?>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>

	<div class="footer">
		<button class="primary" aria-label="<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>" type="button"
		        data-close>
			<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>
		</button>
	</div>
</div>