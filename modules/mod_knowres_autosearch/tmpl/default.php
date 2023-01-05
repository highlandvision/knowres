<?php
/**
 * @since      3.3.0
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 * @package    Know Reservations
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div id="kr-autosearch-wrapper">
	<div class="input-group">
		<label class="show-for-sr" for="kr-autosearch">
			<?php echo KrMethods::plain('MOD_KNOWRES_AUTOSEARCH_PLACEHOLDER'); ?>
		</label>
		<input id="kr-autosearch" class="kr-autosearch"
		       placeholder="<?php echo KrMethods::plain('MOD_KNOWRES_AUTOSEARCH_PLACEHOLDER'); ?>" type="text">
		<span class="input-group-text">
	        <i class="fas fa-lg fa-search"></i>
		</span>
	</div>
</div>