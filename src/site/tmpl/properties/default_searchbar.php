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

<div class="grid-x grid-margin-x">
	<div class="small-12 medium-8 large-9 cell">
		<div class="kr-searchbar">
			<div class="expanded custom button-group">
				<button type="button" class="button sort left-off-canvas-toggle"
				        data-toggle="kr-offcanvas-properties-sortby" id="sortby"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>">
					<i class='fa-solid fa-lg fa fa-sort'></i>
					<span class="show-for-large">
						<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>
					</span>
				</button>

				<?php if (isset($this->layouts['grid'])): ?>
					<?php $text = KrMethods::plain('COM_KNOWRES_VIEW_GRID'); ?>
					<button type="button" class="button grid getResponseSearch" data-bar="grid"
					        title="<?php echo $text; ?>" aria-label="<?php echo $text; ?>">
						<i class="fa-solid fa-lg fa-table-cells-large"></i>
						<span class="show-for-large">
							<?php echo $text; ?>
						</span>
					</button>
				<?php endif; ?>

				<?php if (isset($this->layouts['list'])): ?>
					<?php $text = KrMethods::plain('COM_KNOWRES_VIEW_LIST'); ?>
					<button type="button" class="button list getResponseSearch" data-bar="list"
					        title="<?php echo $text; ?>"
					        aria-label="<?php echo $text; ?>">
						<i class="fa-solid fa-lg fa fa-list"></i>
						<span class="show-for-large">
							<?php echo $text; ?>
						</span>
					</button>
				<?php endif; ?>

				<button type="button" class="button map map-trigger" id="kr-search-map-trigger"
				        data-zoom="<?php echo $this->Search->searchData->map_zoom; ?>"
				        data-zoommax="<?php echo $this->Search->searchData->map_zoom_max; ?>"
				        data-target="kr-search-map-full"
				        data-bar="map" data-type="cluster"
				        data-forcemap="<?php echo $this->Search->searchData->map_modal; ?>"
				        data-maptypeid="<?php echo $this->params->get('property_map_type', ''); ?>"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>">
					<i class='fa-solid fa-lg fa fa-map-marker'></i>
					<span class="show-for-large">
						<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>
					</span>
				</button>

				<button type="button" class="button favs getResponseSearch" data-bar="favs"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>">
					<i class="fa-solid fa-lg fa fa-heart"></i>
					<span class="show-for-large">
						<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>
					</span>
				</button>

				<button type="button" class="button filter right-off-canvas-toggle"
				        data-toggle="kr-offcanvas-properties-filter"
				        title="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>"
				        aria-label="<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>">
					<i class="fa-solid fa-lg fa fa-filter"></i>
					<span class="show-for-large">
						&nbsp;<?php echo KrMethods::plain('COM_KNOWRES_FILTER'); ?>
					</span>
				</button>
			</div>
		</div>
	</div>
	<div class="small-12 medium-4 large-3 cell">
		<div class="kr-pager"></div>
	</div>
</div>