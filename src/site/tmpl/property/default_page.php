<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;
?>

<div class="page">
	<h3><?php echo $this->item->tagline; ?></h3>
	<?php echo $this->item->p1; ?>

	<!--  Video -->
	<?php if ($this->item->property_videolink) : ?>
		<h5 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_VIDEO'); ?></h5>
		<div class="section">
			<div class="responsive-embed">
				<iframe width="500" height="auto"
				        src='https://www.youtube.com/embed/<?php echo $this->item->property_videolink; ?>'
				        allowfullscreen>
				</iframe>
			</div>
		</div>
	<?php endif; ?>

	<!--  Amenities -->
	<?php if (!empty($this->features) && count($this->features)): ?>
		<h5 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'); ?></h5>
		<div class="section rooms">
			<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
		</div>
	<?php endif; ?>

	<!--  Text Fields -->
	<?php foreach ($this->fields as $pf): ?>
		<?php if (!$pf->special && $pf->id > 1): ?>
			<?php $label = 'hp' . $pf->id; ?>
			<?php $field = 'p' . $pf->id; ?>
			<?php if (!empty(strip_tags($this->item->{$field}))): ?>
				<h5 class="header"><?php echo $this->item->{$label}; ?></h5>
				<div class="section"><?php echo $this->item->{$field}; ?></div>
			<?php endif; ?>
		<?php endif; ?>
	<?php endforeach; ?>

	<!--  Geriatric calendar -->
	<?php if ((int) $this->settings['display_calendar']) : ?>
		<h5 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?></h5>
		<div id="kr-page-geriatric-calendar" class="section"></div>
		<a href="#" id="kr-page-geriatric-calendar-trigger" data-pid="<?php echo $this->item->id; ?>"
		   data-target="#kr-page-geriatric-calendar"
		   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?>">
		</a>
	<?php endif; ?>

	<!--  Units -->
	<?php if (is_countable($this->units) && count($this->units)) : ?>
		<h5 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_UNITS"); ?></h5>
		<div class="section">
			<?php echo $this->loadTemplate('units'); ?>
		</div>
	<?php endif; ?>

	<!--  Map -->
	<?php if ($this->item->lat && $this->item->lng) : ?>
		<h5 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?></h5>
		<div id="kr-map-solo" class="section"></div>
		<a href="#" id="kr-map-solo-trigger" class="map-trigger"
		   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?>"
		   data-forcemap="true"
		   data-zoom="<?php echo $this->map_zoom; ?>"
		   data-zoommax="<?php echo $this->item->map_max_zoom; ?>" data-target="kr-map-solo"
		   data-type="solo" data-pid="<?php echo $this->item->id; ?>"
		   data-maptypeid="<?php echo $this->params->get('property_map_type', "roadmap"); ?>">
		</a>
	<?php endif; ?>

	<!--  Rooms -->
	<?php if (!empty($this->rooms) && count($this->rooms)): ?>
		<h5 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_ROOMS'); ?></h5>
		<div class="section rooms">
			<?php echo KrMethods::render('property.rooms', ['rooms' => $this->rooms]); ?>
		</div>
	<?php endif; ?>

	<!--  Reviews -->
	<?php if (is_countable($this->reviews) && count($this->reviews)): ?>
		<h5 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_REVIEWS"); ?></h5>
		<div class="section">
			<?php echo $this->loadTemplate('reviews'); ?>
		</div>
	<?php endif; ?>
</div>