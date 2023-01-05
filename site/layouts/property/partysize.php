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

extract($displayData);
/**
 * Layout variables
 *
 * @var object $defaults Default values.
 * @var object $item     Property row.
 */

$tadults   = KrMethods::plain('MOD_KNOWRES_SEARCH_ADULTS');
$tchildren = KrMethods::plain('MOD_KNOWRES_SEARCH_CHILDREN');
?>

<div class="dropdown-pane" id="kr-searchguest-drop" data-position="bottom" data-alignment="center"
     data-close-on-click="true" data-dropdown>
	<div class="row collapse">
		<div class="small-12 columns text-center">
			<p style="line-height:1.1;">
				<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SHOW_GUESTS_TEXT'); ?>
			</p>
		</div>

		<div class="small-12 columns">
			<label for="adults" class="text-center">
				<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SHOW_GUESTS_ADULTS'); ?>
			</label>
		</div>
		<div class="small-12 columns">
			<div class="input-group input-number-group">
				<div class="input-group-button">
					<span class="input-number-decrement"
					      onClick="guestIncrement(-1, 'adults', '<?php echo $tadults; ?>', '<?php echo $tchildren; ?>')">-</span>
				</div>
				<input class="input-number" id="adults" name="adults" type="number"
				       value="<?php echo $defaults->adults; ?>" min="1"
				       max="<?php echo $item->sleeps + $item->sleeps_extra; ?>" readonly>
				<div class="input-group-button">
					<span class="input-number-increment"
					      onClick="guestIncrement(1, 'adults', '<?php echo $tadults; ?>', '<?php echo $tchildren; ?>')">+</span>
				</div>
			</div>
		</div>

		<div class="small-12 columns">
			<label for="children" class="text-center">
				<?php echo KrMethods::sprintf('MOD_KNOWRES_SEARCH_SHOW_GUESTS_CHILDREN', '2 - 17'); ?>
			</label>
		</div>
		<div class="small-12 columns">
			<div class="input-group input-number-group">
				<div class="input-group-button">
					<span class="input-number-decrement"
					      onClick="guestIncrement(-1, 'children', '<?php echo $tadults; ?>', '<?php echo $tchildren; ?>')">-</span>
				</div>
				<input class="input-number" id="children" name="children" type="number"
				       value="<?php echo $defaults->children; ?>" min="0"
				       max="<?php echo $item->sleeps + $item->sleeps_extra - 1; ?>" readonly>
				<div class="input-group-button">
					<span class="input-number-increment"
					      onClick="guestIncrement(1, 'children', '<?php echo $tadults; ?>', '<?php echo $tchildren; ?>')">+</span>
				</div>
			</div>
		</div>
		<div class="small-12 columns">
			<?php $hideme = $defaults->children == 0 ? 'hidden' : ''; ?>
			<p class="text-center" id="age-help" style="line-height:1.1;" <?php echo $hideme; ?>>
				<?php echo KrMethods::plain('MOD_KNOWRES_SEARCH_SHOW_GUESTS_AGES'); ?>
			</p>
			<div id="child-ages-container" class="text-center">
				<?php foreach ($defaults->child_ages as $k => $age): ?>
					<?php $id = 'child_ages_' . $k + 1; ?>
					<?php $aria = KrMethods::sprintf('MOD_KNOWRES_SEARCH_SHOW_GUESTS_LBL', $k + 1); ?>
					<input aria-label="<?php echo $aria; ?>" class="form-control valid form-control-success"
					       id="<?php echo $id; ?>" max="17" min="0" name="child_ages[]" step="1" type="number"
					       value="<?php echo $age; ?>" />
				<?php endforeach; ?>
			</div>
		</div>
		<div class="small-12 columns">
			<a href="#" class="button small expanded no-margin-bottom kr-quote-auto-click" data-close>
				<?php echo KrMethods:: plain('MOD_KNOWRES_SEARCH_APPLY'); ?>
			</a>
		</div>
	</div>
</div>