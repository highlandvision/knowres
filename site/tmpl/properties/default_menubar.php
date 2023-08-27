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

<div class="row kr-searchbar">
	<div class="small-12 medium-8 columns">
		<div class="small button-group">
			<button type="button" class="button sort left-off-canvas-toggle" data-value="sort"
			        data-toggle="kr-properties-sortby-off-canvas" id="sortby"
			        title="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>"
			        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>">
				<i class="fas fa-sort"></i>
				<span>
					&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>
				</span>
			</button>

			<?php if (isset($this->layouts['list'])): ?>
				<a class="button getResponseSearch list" data-field="view" data-value="list">
					<i class="fas fa-th-list"></i>
					<span class="show-for-medium">
						<?php echo KrMethods::plain('COM_KNOWRES_VIEW_LIST'); ?>
					</span>
				</a>
			<?php endif; ?>

			<a class="button map map-trigger" data-zoom="<?php echo $this->Search->data->map_zoom; ?>"
			   data-zoommax="<?php echo $this->Search->data->map_zoom_max; ?>" data-target="kr-search-map-full"
			   data-value="map" data-type="cluster" data-forcemap="<?php echo $this->Search->data->map_modal; ?>"
			   data-maptypeid="<?php echo $this->params->get('property_map_type', ''); ?>">
				<i class="fas fa-map-marker"></i>
				<span class="show-for-medium">
					<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>
				</span>
			</a>
			<a class="button getResponseSearch favs" data-field="favs" data-value="favs">
				<i class="fas fa-heart"></i>
				<span class="show-for-medium">
					<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>
				</span>
			</a>

			<button type="button" class="button filter right-off-canvas-toggle" data-value="filter"
			        data-toggle="kr-properties-filters-off-canvas"
			        title="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>"
			        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>">
				<i class="fas fa-filter"></i>
				<span class="show-for-medium">
					&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>
				</span>
			</button>
		</div>
	</div>
	<div class="medium-4 show-for-medium columns">
		<div class="kr-pager"></div>
	</div>
</div>