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

<h2 class="h3"><?php echo $this->item->tagline; ?></h2>
<p><?php echo KrMethods::render('property.area_beds_sleeps', ['item' => $this->item]); ?> </p>

<div class="page">
	<!--  Overview -->
	<h3 class="header"><?php echo $this->item->hp1 ?></h3>
	<?php echo $this->item->p1; ?>

	<!--  Video -->
	<?php if ($this->item->property_videolink) : ?>
		<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_VIDEO'); ?></h3>
		<div>
			<div class="responsive-embed">
				<iframe width="500" height="auto"
				        src='https://www.youtube.com/embed/<?php echo $this->item->property_videolink; ?>'
				        allowfullscreen>
				</iframe>
			</div>
		</div>
	<?php endif; ?>

	<!--  Rooms -->
	<?php if (!empty($this->rooms) && count($this->rooms)): ?>
		<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_ROOMS'); ?></h3>
		<div class="rooms">
			<?php echo KrMethods::render('property.rooms', ['rooms' => $this->rooms]); ?>
		</div>
	<?php endif; ?>

	<!--  Amenities -->
	<?php if (!empty($this->features) && count($this->features)): ?>
		<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'); ?></h3>
		<div class="rooms">
			<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
		</div>
	<?php endif; ?>

	<!--  Text Fields -->
	<?php foreach($this->fields as $pf): ?>
		<?php if (!$pf->special && $pf->id > 1 ): ?>
			<?php $label = 'hp' . $pf->id; ?>
			<?php $field = 'p' . $pf->id; ?>
			<?php if (!empty(strip_tags($this->item->{$field}))): ?>
				<h3 class="header"><?php echo $this->item->{$label}; ?></h3>
				<?php echo $this->item->{$field}; ?>
			<?php endif; ?>
		<?php endif; ?>
	<?php endforeach; ?>

<!--	<div>-->
<!--		--><?php //echo $this->loadTemplate('phototour'); ?>
<!--	</div>-->

	<!--  Geriatric calendar -->
	<?php if ((int) $this->settings['display_calendar']) : ?>
		<h3 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?></h3>
		<div id="kr-page-geriatric-calendar"></div>
		<a href="#" id="kr-page-geriatric-calendar-trigger" data-pid="<?php echo $this->item->id; ?>"
		   data-target="#kr-page-geriatric-calendar"
		   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?>">
		</a>
	<?php endif; ?>

	<!--  Units -->
	<?php if (is_countable($this->units) && count($this->units)) : ?>
		<h3 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_UNITS"); ?></h3>
		<?php echo $this->loadTemplate('units'); ?>
	<?php endif; ?>

	<!--  Map -->
	<?php if ($this->item->lat && $this->item->lng) : ?>
		<h3 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?></h3>
		<div id="kr-map-solo"></div>
		<a href="#" id="kr-map-solo-trigger" class="map-trigger"
		   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?>"
		   data-forcemap="true"
		   data-zoom="<?php echo $this->map_zoom; ?>"
		   data-zoommax="<?php echo $this->item->map_max_zoom; ?>" data-target="kr-map-solo"
		   data-type="solo" data-pid="<?php echo $this->item->id; ?>"
		   data-maptypeid="<?php echo $this->params->get('property_map_type', "roadmap"); ?>">
		</a>
	<?php endif; ?>

	<!--  Reviews -->
	<?php if (is_countable($this->reviews) && count($this->reviews)): ?>
		<h3 class="header"><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_REVIEWS"); ?></h3>
		<?php echo $this->loadTemplate('reviews'); ?>
	<?php endif; ?>
</div>