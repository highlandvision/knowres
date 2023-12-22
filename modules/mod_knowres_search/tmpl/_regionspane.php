<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;
?>

<div class="dropdown-pane large" id="kr-searchregion-drop" data-auto-focus="true" data-closable
     data-close-on-click="true" data-dropdown data-h-offset="-2" data-v-offset="8">
	<div class="dropdown-body">
		<?php $c = 0; ?>
		<?php foreach ($regions as $k => $v): ?>
			<div class="grid-x grid-margin-x">
				<div class="small-6 cell">
					<div class="regionspane-item">
						<input type="checkbox" class="checkover country" name="<?php echo $k; ?>"
						       id="<?php echo $k; ?>" data-value="<?php echo $k; ?>">
						<label class="checklabel" for="<?php echo $k; ?>">
							<?php echo $k; ?></label>
					</div>
				</div>
				<div class="small-6 cell">
					<?php foreach ($v as $id => $r): ?>
						<div class="regionspane-item">
							<?php if (in_array($id, $initial->region_id)) : ?>
								<input type="checkbox" checked="checked" class="checkover region"
								       name="region_id[]" id="<?php echo $id; ?>"
								       value="<?php echo $id; ?>"
								       data-field="<?php echo $id; ?>" data-country="<?php echo $k; ?>"
								       data-value="<?php echo $id; ?>">
							<?php else : ?>
								<input type="checkbox" class="checkover region" name="region_id[]"
								       id="<?php echo $id; ?>" value="<?php echo $id; ?>" data-value="<?php echo $id; ?>"
								       data-country="<?php echo $k; ?>">
							<?php endif; ?>

							<label class="checklabel" for="<?php echo $id; ?>">
								<?php echo $r; ?>
							</label>
							<br>
							<?php $c++; ?>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>