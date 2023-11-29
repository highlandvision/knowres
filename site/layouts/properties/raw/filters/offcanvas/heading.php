<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2023 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="actions small button-group expanded">
	<button type="button" class="kr-filters-reset button clear small getResponseSearch" data-action="clear">
		<i class='fa-solid fa-sync' aria-hidden="true"></i>&nbsp;
		<?php echo KrMethods::plain('COM_KNOWRES_FILTER_RESET'); ?>
	</button>
	<button type="button" class="button clear small" data-close
	        title="<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>">
			<span aria-hidden="true">
				<i class='fa-solid fa-times-circle' aria-hidden="true"></i>
				<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>
			</span>
	</button>
</div>