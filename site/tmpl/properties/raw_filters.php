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

for ($i = 0; $i < 9; $i++) {
	if ($i == 0) {
		$filter_data = $this->Response->searchData->filterRegion;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_REGION');
		$field       = 'region';
		$output      = 'checkbox';
	}
	else if ($i == 1) {
		$filter_data = $this->Response->searchData->filterArea;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_AREA');
		$field       = 'area';
		$output      = 'checkbox';
	}
	elseif ($i == 2) {
		$filter_data = $this->Response->searchData->filterBedrooms;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BEDROOMS');
		$field       = 'bedrooms';
		$output      = 'checkbox';
	}
	elseif ($i == 3) {
		$filter_data = $this->Response->searchData->filterBook;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_BOOK');
		$field       = 'book';
		$output      = 'checkbox';
	}
	elseif ($i == 4) {
		$filter_data = $this->Response->searchData->filterCategory;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_CATEGORY');
		$field       = 'category';
		$output      = 'checkbox';
	}
	elseif ($i == 5) {
		$filter_data = $this->Response->searchData->filterFeature;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_FEATURE');
		$field       = 'feature';
		$output      = 'checkbox';
	}
	elseif ($i == 6) {
		$filter_data = $this->Response->searchData->filterPets;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_PETS');
		$field       = 'pets';
		$output      = 'checkbox';
	}
	elseif ($i == 7) {
		$filter_data = $this->Response->searchData->filterPrice;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_PRICE');
		$field       = 'price';
		$output      = 'checkbox';
	}
	elseif ($i == 8) {
		$filter_data = $this->Response->searchData->filterType;
		$name        = KrMethods::plain('COM_KNOWRES_FILTER_HEAD_TYPE');
		$field       = 'type';
		$output      = 'checkbox';
	}

	if (is_countable($filter_data) && count($filter_data) > 1) { ?>
		<?php if ($first) : ?>
			<div class="actions small button-group expanded">
				<button type="button" class="kr-filters-reset button clear small getResponseSearch" data-field="clear">
					<i class="fas fa-sync" aria-hidden="true"></i>&nbsp;
					<?php echo KrMethods::plain('COM_KNOWRES_FILTER_RESET'); ?>
				</button>
				<button type="button" class="button clear small" data-close
				        title="<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>">
						<span aria-hidden="true">
							<i class="fas fa-times-circle" aria-hidden="true"></i>
							<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>
						</span>
				</button>
			</div>
			<?php $first = false; ?>
		<?php endif; ?>

		<?php if ($this->Response->searchData->field != $field): ?>
			<?php $active = ''; ?>
			<?php $none = 'style="display:none;"'; ?>
			<?php foreach ($filter_data as $k => $v): ?>
				<?php if ($v[2]): ?>
					<?php $active = 'active'; ?>
					<?php $none = ''; ?>
					<?php break; ?>
				<?php endif; ?>
			<?php endforeach; ?>
		<?php else: ?>
			<?php $active = 'active'; ?>
			<?php $none = ''; ?>
		<?php endif; ?>

		<ul class="filter-sort-list">
			<li class="head button <?php echo $active; ?>"><?php echo $name; ?></li>
			<?php foreach ($filter_data as $k => $v) : ?>
				<?php $id = str_replace(' ', '-', $field); ?>
				<?php $id .= ':' . $k; ?>
				<li class="checkbox" <?php echo $none; ?>>
					<?php if (!$v[1]) : ?>
						<input type="checkbox" class="checkover" disabled name="<?php echo $field ?>"
						       id="<?php echo $id; ?>">
					<?php elseif ($v[2]) : ?>
						<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $field; ?>"
						       checked="checked" id="<?php echo $id; ?>" data-field="<?php echo $field; ?>"
						       data-value="<?php echo $k; ?>">
					<?php else : ?>
						<input type="checkbox" class="checkover getResponseSearch" name="<?php echo $field; ?>"
						       id="<?php echo $id; ?>" data-field="<?php echo $field; ?>"
						       data-value="<?php echo $k; ?>">
					<?php endif; ?>

					<?php if (!$v[1]) : ?>
						<label class="checklabel disabled" for="<?php echo $id; ?>">
							<?php echo $v[3]; ?> (<?php echo $v[1]; ?>)
						</label>
					<?php else : ?>
						<label class="checklabel" for="<?php echo $id; ?>">
							<?php echo $v[3]; ?> (<?php echo $v[1]; ?>)
						</label>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php } ?>
<?php } ?>

<?php $this->Response->searchData->field = ''; ?>