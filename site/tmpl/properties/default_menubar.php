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

<div class="row">
	<div class="small-12 medium-8 columns">
		<ul class="kr-searchbar menu icons icon-top expanded align-center">
			<li class="sort show-for-large">
				<a class="item" id="kr-show-sortby" title="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>">
					<i class="fas fa-sort"></i>
					<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>">
						<?php echo KrMethods::plain('COM_KNOWRES_SORT_LIST'); ?>
					</span>
				</a>
			</li>
			<?php if (isset($this->layouts["thumb"])): ?>
				<li class="thumb show-for-medium">
					<a class="item view-type getResponseSearch thumb" data-field="view" data-value="thumb">
						<i class="fas fa-th"></i>
						<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB'); ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB'); ?>
						</span>
					</a>
				</li>
			<?php endif; ?>
			<?php if (isset($this->layouts["grid"])): ?>
				<li class="grid show-for-medium">
					<a class="item view-type getResponseSearch grid" data-field="view" data-value="grid">
						<i class="fas fa-th-large"></i>
						<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_GRID'); ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_VIEW_GRID'); ?>
						</span>
					</a>
				</li>
			<?php endif; ?>
			<?php if (isset($this->layouts['list'])): ?>
				<li class="list">
					<a class="item view-type getResponseSearch list" data-field="view" data-value="list">
						<i class="fas fa-th-list"></i>
						<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_LIST'); ?>">
							<?php echo KrMethods::plain('COM_KNOWRES_VIEW_LIST'); ?>
						</span>
					</a>
				</li>
			<?php endif; ?>
			<li class="map">
				<a class="item map map-trigger" data-zoom="<?php echo $this->Search->data->map_zoom; ?>"
				   data-zoommax="<?php echo $this->Search->data->map_zoom_max; ?>" data-target="kr-search-map-full"
				   data-type="cluster" data-forcemap="<?php echo $this->Search->data->map_modal; ?>"
				   data-maptypeid="<?php echo $this->params->get('property_map_type', ''); ?>">
					<i class="fas fa-map-marker"></i>
					<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>">
						<?php echo KrMethods::plain('COM_KNOWRES_VIEW_MAP'); ?>
					</span>
				</a>
			</li>
			<li class="favs">
				<a class="item view-type getResponseSearch favs" data-field="favs" data-value="favs">
					<i class="fas fa-heart"></i>
					<span aria-label="<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>">
						<?php echo KrMethods::plain('COM_KNOWRES_VIEW_FAVOURITES'); ?>
					</span>
				</a>
			</li>
		</ul>
	</div>
	<div class="medium-4 show-for-medium columns">
		<div class="kr-pager"></div>
	</div>
</div>