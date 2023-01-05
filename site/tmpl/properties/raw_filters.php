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

$first = true;

for ($i = 0; $i < 8; $i++): ?>
	<?php if ($i == 0): ?>
		<?php $filter_data = $this->Search->data->filterBook; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BOOK'); ?>
		<?php $type = 'book'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 1): ?>
		<?php $filter_data = $this->Search->data->filterType; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_TYPE'); ?>
		<?php $type = 'type'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 2): ?>
		<?php $filter_data = $this->Search->data->filterCategory; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_CATEGORY'); ?>
		<?php $type = 'category'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 3): ?>
		<?php $filter_data = $this->Search->data->filterFeature; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_FEATURE'); ?>
		<?php $type = 'feature'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 4): ?>
		<?php $filter_data = $this->Search->data->filterTown; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_TOWN'); ?>
		<?php $type = 'town'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 5): ?>
		<?php $filter_data = $this->Search->data->filterArea; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_AREA'); ?>
		<?php $type = 'area'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 6): ?>
		<?php $filter_data = $this->Search->data->filterBedrooms; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BEDROOMS'); ?>
		<?php $type = 'bedrooms'; ?>
		<?php $output = 'checkbox'; ?>
	<?php elseif ($i == 7): ?>
		<?php $filter_data = $this->Search->data->filterPrice; ?>
		<?php $name = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_PRICE'); ?>
		<?php $type = 'price'; ?>
		<?php $output = 'checkbox'; ?>
	<?php endif; ?>

	<?php if (is_countable($filter_data) && count($filter_data) > 1): ?>
		<?php if ($first) : ?>
			<div class="sidebar-only show-for-large clearfix">
				<h3 class="color-dark"><?php echo strtoupper(KrMethods::plain('COM_KNOWRES_FILTER_BY')); ?></h3>
				<button aria-label="<?php echo KrMethods::plain('COM_KNOWRES_FILTER_CLEAR'); ?>"
				        class="kr-filters-reset button clear small float-right getResponseSearch" data-field="clear"
				        type="button">
					<i class="fas fa-sync" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_FILTER_RESET'); ?>
				</button>
			</div>
			<div class="kr-filters-close top-only show-for-large"></div>
			<div class="actions hide-for-large">
				<div class="small button-group expanded">
					<button class="kr-filters-reset button clear small getResponseSearch" data-field="clear">
						<i class="fas fa-sync" aria-hidden="true"></i>&nbsp;
						<?php echo KrMethods::plain('COM_KNOWRES_FILTER_RESET'); ?>
					</button>
					<button class="button clear small" data-close>
					<span aria-hidden="true">
						<i class="fas fa-times-circle" aria-hidden="true"></i> Close
					</span>
					</button>
				</div>
			</div>
			<?php $first = false; ?>
		<?php endif; ?>

		<?php $active = ''; ?>
		<?php foreach ($filter_data as $k => $v): ?>
			<?php if ($v[2]): ?>
				<?php $active = 'active'; ?>
				<?php break; ?>
			<?php endif; ?>
		<?php endforeach; ?>

		<ul class="filter-sort-list">
			<li class="head button hollow expanded <?php echo $active; ?>"><?php echo $name; ?></li>
			<?php foreach ($filter_data as $k => $v) : ?>
				<?php $id = str_replace(' ', '-', $type); ?>
				<?php $id .= ':' . $k; ?>
				<li class="checkbox">
					<?php if (!$v[1]) : ?>
						<input class="checkover" disabled id="<?php echo $id; ?>" name="<?php echo $type; ?>"
						       type="checkbox">
					<?php elseif ($v[2]) : ?>
						<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $type; ?>"
						       checked="checked" id="<?php echo $id; ?>" data-field="<?php echo $type; ?>"
						       data-value="<?php echo $k; ?>">
					<?php else : ?>
						<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $type; ?>"
						       id="<?php echo $id; ?>" data-field="<?php echo $type; ?>" data-value="<?php echo $k; ?>">
					<?php endif; ?>

					<?php if (!$v[1]) : ?>
						<label class="checklabel disabled" for="<?php echo $id; ?>">
							<?php echo $v[3] ?>
							(<?php echo $v[1] ?>)
						</label>
					<?php else : ?>
						<label class="checklabel" for="<?php echo $id; ?>">
							<?php echo $v[3] ?> (<?php echo $v[1] ?>)</label>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
<?php endfor; ?>