<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="row hide-for-large">
	<div class="small-12 columns">
		<ul class="kr-mobilebar menu icons expanded align-center">
			<li>
				<button type="button" class="button expanded left-off-canvas-toggle"
				        data-toggle="kr-properties-sortby-off-canvas" id="sortby"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>">
					<i class="fas fa-sort"></i>
					<span>
						&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>
					</span>
				</button>
			</li>
			<li>
				<button type="button" class="button expanded top-off-canvas-toggle" data-toggle="kr-properties-search-off-canvas"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_SEARCH'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_SEARCH'); ?>">
					<i class="fas fa-search"></i>
					<span>
						&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_SEARCH'); ?>
					</span>
				</button>
			</li>
			<li>
				<button type="button" class="button expanded right-off-canvas-toggle"
				        data-toggle="kr-properties-filters-off-canvas"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>">
					<i class="fas fa-filter"></i>
					<span>
						&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>
					</span>
				</button>
			</li>
		</ul>
	</div>
</div>