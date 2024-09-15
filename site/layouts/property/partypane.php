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

$tadults   = KrMethods::plain('MOD_KNOWRES_SEARCH_ADULTS');
$tchildren = KrMethods::plain('MOD_KNOWRES_SEARCH_PLURAL_CHILDREN');
$tchild    = KrMethods::plain('MOD_KNOWRES_SEARCH_PLURAL_CHILDREN_1');
?>

<div class="dropdown-pane noscroll" id="kr-searchguest-drop" data-auto-focus="true" data-closable
     data-close-on-click="true" data-dropdown data-h-offset="0" data-v-offset="8">
	<div class="dropdown-body">
		<div class="grid-x grid-margin-x">
			<button class="close-button" aria-label="Close alert" type="button" data-close>
				<span aria-hidden="true">&times;</span>
			</button>
			<div class="small-6 cell">
				<label for="adults">
					<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SHOW_GUESTS_ADULTS'); ?>
				</label>
			</div>
			<div class="small-6 cell">
				<label for="children">
					<?php echo KrMethods::sprintf('MOD_KNOWRES_SEARCH_SHOW_GUESTS_CHILDREN', '2 - 17'); ?>
				</label>
			</div>
			<div class="small-6 cell">
				<div class="input-group input-number-group">
					<div class="input-group-button">
						<button type="button" id="aminus" class="input-number-decrement"
						        title="<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_DECREMENT'); ?>"
						        onClick="moduleSearch.guestIncrement(-1, 'adults', '<?php echo $tadults; ?>',
							        '<?php echo $tchildren; ?>', '<?php echo $tchild; ?>', false)">
							<i class="fa-solid fa-circle-minus fa-xs"></i>
						</button>
					</div>
					<input class="input-number" id="adults" name="adults" type="number"
					       value="<?php echo $initial->adults; ?>" min="1" max="50" readonly>
					<div class="input-group-button">
						<button type="button" id="aplus" class="input-number-increment"
						        title="<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_INCREMENT'); ?>"
						        onClick="moduleSearch.guestIncrement(1, 'adults', '<?php echo $tadults; ?>',
							        '<?php echo $tchildren; ?>', '<?php echo $tchild; ?>', false)">
							<i class="fa-solid fa-circle-plus fa-xs"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="small-6 cell">
				<div class="input-group input-number-group">
					<div class="input-group-button">
						<button type="button" id="cminus" class="input-number-decrement"
						        title="<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_DECREMENT'); ?>"
						        onClick="moduleSearch.guestIncrement(-1, 'children', '<?php echo $tadults; ?>',
							        '<?php echo $tchildren; ?>', '<?php echo $tchild; ?>', false)">
							<i class="fa-solid fa-circle-minus fa-xs"></i>
						</button>
					</div>
					<input class="input-number" id="children" name="children" type="number"
					       value="<?php echo $initial->children; ?>" min="0" max="10" readonly>
					<div class="input-group-button">
						<button type="button" id="cplus" class="input-number-increment"
						        title="<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_INCREMENT'); ?>"
						        onClick="moduleSearch.guestIncrement(1, 'children', '<?php echo $tadults; ?>',
							        '<?php echo $tchildren; ?>', '<?php echo $tchild; ?>', false)">
							<i class="fa-solid fa-circle-plus fa-xs"></i>
						</button>
					</div>
				</div>
			</div>
			<div class="small-12 cell">
				<?php $hideme = $initial->children == 0 ? 'hidden' : ''; ?>
				<label for="child-ages-container" id="age-help" <?php echo $hideme; ?>>
					<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SHOW_GUESTS_AGES'); ?>
				</label>
				<div id="child-ages-container">
					<?php foreach ($initial->child_ages as $k => $age): ?>
						<?php $id = 'child_ages_' . $k + 1; ?>
						<?php $aria = KrMethods::sprintf('MOD_KNOWRES_SEARCH_SHOW_GUESTS_LBL', $k + 1); ?>
						<input aria-label="<?php echo $aria; ?>" class="form-control valid form-control-success"
						       id="<?php echo $id; ?>" max="17" min="0" name="child_ages[]" step="1"
						       type="number"
						       value="<?php echo $age; ?>"/>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</div>