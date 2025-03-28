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

<ul class="tabs" id="kr-property-tabs" data-tabs data-deep-link="true" data-update-history="true">
	<li class="tabs-title is-active" role="presentation">
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_OVERVIEW"); ?>
		<a href="#overview" aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
			<i class='fa-solid fa-eye fa-lg hide-for-large'></i>
			<span class="show-for-large">
				<?php echo $help; ?>
			</span>
		</a>
	</li>
	<li class="tabs-title" role="presentation">
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_FACILITIES"); ?>
		<a href="#facilities" data-tabs-target="facilities"
		   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
			<i class='fa-solid fa-info-circle fa-lg hide-for-large'></i>
			<span class="show-for-large">
				<?php echo $help; ?>
			</span>
		</a>
	</li>
	<li class="tabs-title" role="presentation">
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_PHOTO_TOUR"); ?>
		<a href="#phototour" data-tabs-target="phototour"
		   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
			<i class='fa-solid fa-camera fa-lg hide-for-large'></i>
			<span class="show-for-large">
				<?php echo $help; ?>
			</span>
		</a>
	</li>
	<?php if ($this->item->property_videolink) : ?>
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_VIDEO"); ?>
		<li class="tabs-title" role="presentation">
			<a href="#video" data-tabs-target="video"
			   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
				<i class='fa-solid fa-video fa-lg hide-for-large'></i>
				<span class="show-for-large">
					<?php echo $help; ?>
				</span>
			</a>
		</li>
	<?php endif; ?>
	<?php if ((int) $this->settings['display_calendar']) : ?>
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?>
		<li class="tabs-title" role="presentation">
			<a href="#calendar" id="kr-geriatric-calendar" data-tabs-target="calendar"
			   data-pid="<?php echo $this->item->id; ?>"
			   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
				<i class='fa-solid fa-calendar-alt fa-lg hide-for-large'></i>
				<span class="show-for-large">
					<?php echo $help; ?>
				</span>
			</a>
		</li>
	<?php endif; ?>
	<?php if (is_countable($this->units) && count($this->units)) : ?>
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_UNITS"); ?>
		<li class="tabs-title" role="presentation">
			<a href="#units" data-tabs-target="units"
			   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
				<i class='fa-solid fa-building fa-lg hide-for-large'></i>
				<span class="show-for-large">
					<?php echo $help; ?>
				</span>
			</a>
		</li>
	<?php endif; ?>
	<?php if ($this->item->lat && $this->item->lng) : ?>
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?>
		<li class="tabs-title" role="presentation">
			<a href="#map" id="kr-map-solo-trigger" aria-label="<?php echo $help; ?>"
			    title="<?php echo $help; ?>"
				data-zoom="<?php echo $this->map_zoom; ?>"
				data-zoommax="<?php echo $this->item->map_max_zoom; ?>"
                data-tabs-target="map"
                data-target="kr-map-solo"
				data-type="solo"
                data-pid="<?php echo $this->item->id; ?>"
				data-maptypeid="<?php echo $this->params->get('property_map_type', "roadmap"); ?>">
				<i class='fa-solid fa-map hide-for-large'></i>
				<span class="show-for-large">
					<?php echo $help; ?>
				</span>
			</a>
		</li>
	<?php endif; ?>
	<?php if (count($this->reviews)) : ?>
		<?php $help = KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_REVIEWS"); ?>
		<li class="tabs-title" role="presentation">
			<a data-link="#reviews" data-tabs-target="reviews"
			   aria-label="<?php echo $help; ?>" title="<?php echo $help; ?>">
				<i class='fa-solid fa-comments hide-for-large'></i>
				<span class="show-for-large">
					<?php echo $help; ?>
				</span>
			</a>
		</li>
	<?php endif; ?>
</ul>

<div class="tabs-content" data-tabs-content="kr-property-tabs">
	<div class="tabs-panel is-active" id="overview">
		<?php echo $this->loadTemplate('overview'); ?>
	</div>
	<div class="tabs-panel" id="facilities">
		<?php echo $this->loadTemplate('facilities'); ?>
	</div>
	<div class="tabs-panel" id="phototour">
		<?php echo $this->loadTemplate('phototour'); ?>
	</div>
	<?php if ($this->item->property_videolink) : ?>
		<div class="tabs-panel" id="video">
			<div class="responsive-embed">
				<iframe width="500" height="auto"
				        src='https://www.youtube.com/embed/<?php echo $this->item->property_videolink; ?>'
				        allowfullscreen>
				</iframe>
			</div>
		</div>
	<?php endif; ?>
	<?php if ((int) $this->settings['display_calendar']) : ?>
		<div class="tabs-panel" id="calendar">
			<?php echo $this->loadTemplate('geriatric'); ?>
		</div>
	<?php endif; ?>
	<?php if (is_countable($this->units) && count($this->units)) : ?>
		<div class="tabs-panel" id="units">
			<?php echo $this->loadTemplate('units'); ?>
		</div>
	<?php endif; ?>
	<?php if ($this->item->lat && $this->item->lng) : ?>
		<div class="tabs-panel" id="map">
			<?php echo $this->loadTemplate('map'); ?>
		</div>
	<?php endif; ?>
	<?php if (count($this->reviews)) : ?>
		<div class="tabs-panel" id="reviews">
			<?php echo $this->loadTemplate('reviews'); ?>
		</div>
	<?php endif; ?>
</div>