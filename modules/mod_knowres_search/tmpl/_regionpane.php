<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

$cell = count($regions);
$count   = 0;
?>

<div class="dropdown-pane" id="kr-searchregion-drop" data-dropdown data-position="bottom"
     data-alignment="left" data-h-offset="-16" data-v-offset="1000" data-close-on-click="true">
	<?php $c = 0; ?>
	<?php foreach ($regions as $k => $v): ?>
		<div class="grid-x grid-margin-x">
			<div class="small-6 large-5 cell">
				<?php echo $k; ?>
			</div>
			<div class="small-6 large-7 cell end">
				<?php foreach ($v as $id => $r): ?>
					<?php if (!empty($initial->region_id[$id])) : ?>
						<input type="radio" class="radioover region" name="region_id"
						       id="<?php echo $id; ?>" value="<?php echo $id; ?>" checked="checked"
						       data-field="<?php echo $id; ?>" data-country="<?php echo $k; ?>"
						       data-region="<?php echo $id; ?>" data-value="<?php echo $id; ?>">
					<?php else : ?>
						<input type="radio" class="radioover region" name="region_id"
						       id="<?php echo $id; ?>" value="<?php echo $id; ?>" data-value="<?php echo $id; ?>"
						       data-region="<?php echo $id; ?>" data-country="<?php echo $k; ?>">
					<?php endif; ?>

					<label class="radiolabel" for="<?php echo $id; ?>">
						<?php echo $r; ?></label>
					<br>
					<?php $c++; ?>
				<?php endforeach; ?>
			</div>
		</div>
	<?php endforeach; ?>
</div>