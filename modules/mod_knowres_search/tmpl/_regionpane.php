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

<div class="dropdown-pane noscroll" id="kr-searchregion-drop" data-auto-focus="true" data-closable
     data-close-on-click="true" data-dropdown data-h-offset="-2" data-v-offset="8">
	<div class="dropdown-body">
		<?php $c = 0; ?>
		<div class="grid-x grid-margin-x">
			<?php foreach ($regions as $k => $v): ?>
				<div class="small-4 medium-2 cell country <?php if ($c > 2)
					echo 'spacer'; ?>">
					<?php echo $k; ?>
				</div>
				<div class="small-8 medium-4 cell <?php if ($c > 2)
					echo 'spacer'; ?>">
					<?php foreach ($v as $id => $r): ?>
						<?php if ($id == $initial->region_id) : ?>
							<input type="radio" class="radioover region" checked="checked"
							       name="xregion_id" onclick="setregion(<?php echo $id; ?>);"
							       id="<?php echo $id; ?>" value="<?php echo $id; ?>"
							       data-field="<?php echo $id; ?>" data-country="<?php echo $k; ?>"
							       data-region="<?php echo $id; ?>" data-value="<?php echo $id; ?>">
						<?php else : ?>
							<input type="radio" class="radioover region"
							       name="xregion_id" onclick="setregion(<?php echo $id; ?>);"
							       id="<?php echo $id; ?>" value="<?php echo $id; ?>" data-value="<?php echo $id; ?>"
							       data-region="<?php echo $id; ?>" data-country="<?php echo $k; ?>">
						<?php endif; ?>

						<label class="radiolabel" for="<?php echo $id; ?>">
							<?php echo $r; ?></label>
						<br>
						<?php $c++; ?>
					<?php endforeach; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>