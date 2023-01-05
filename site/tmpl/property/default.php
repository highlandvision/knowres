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

$wa = $this->document->getWebAssetManager();
$wa->getRegistry()->addExtensionRegistryFile('com_knowres');
$wa->useScript('com_knowres.site')
   ->useScript('form.validate')
   ->useScript('keepalive');
?>

<?php if ($this->item) : ?>
	<div class="kr-property">
		<?php if ($this->backlink): ?>
			<a href="<?php echo $this->backlink ?>" class="show-for-large button backlink"
			   title="<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'); ?>">
				<i class="fas fa-long-arrow-alt-left">&nbsp;</i>
				<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'); ?>
			</a>
		<?php endif; ?>
		<div class="row align-bottom">
			<div class="small-12 medium-8 large-9 columns">
				<h1><?php echo $this->item->property_name . ' - ' . $this->item->property_area; ?></h1>
			</div>
			<div class="show-for-medium medium-4 medium-text-left large-3 columns">
				<div class="addthis_toolbox addthis_default_style addthis_32x32_style" style="float:right;">
					<a class="addthis_button_facebook"></a>
					<a class="addthis_button_twitter"></a>
					<a class="addthis_button_pinterest_share"></a>
					<a class="addthis_button_email"></a>
				</div>
			</div>
		</div>
		<div class="row slideshow-wrapper">
			<div class="small-12 columns">
				<?php echo $this->loadTemplate('slideshow'); ?>
			</div>
		</div>

		<div class="row">
			<div class="small-12 medium-8 large-9 columns">
				<ul class="tabs" id="kr-property-tabs" data-tabs data-deep-link="true" data-update-history="true">
					<li class="tabs-title is-active" role="presentation">
						<a href="#overview"
						   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_OVERVIEW"); ?>">
							<i class="fas fa-eye fa-lg hide-for-medium"></i>
							<span class="show-for-medium">
								<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_OVERVIEW"); ?>
							</span>
						</a>
					</li>
					<li class="tabs-title" role="presentation">
						<a href="#details" data-tabs-target="details"
						   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_DETAILS"); ?>">
							<i class="fas fa-info-circle fa-lg hide-for-medium"></i>
							<span class="show-for-medium">
								<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_DETAILS"); ?>
							</span>
						</a>
					</li>
					<li class="tabs-title" role="presentation">
						<a href="#phototour" data-tabs-target="phototour"
						   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_PHOTO_TOUR"); ?>">
							<i class="fas fa-camera fa-lg hide-for-medium"></i>
							<span class="show-for-medium">
								<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_PHOTO_TOUR"); ?>
							</span>
						</a>
					</li>
					<?php if ($this->item->property_videolink) : ?>
						<li class="tabs-title" role="presentation">
							<a href="#video" data-tabs-target="video"
							   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_VIDEO"); ?>">
								<i class="fas fa-video fa-lg hide-for-medium"></i>
								<span class="show-for-medium">
									<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_VIDEO"); ?>
								</span>
							</a>
						</li>
					<?php endif; ?>
					<?php if ((int) $this->settings['display_calendar']) : ?>
						<li class="tabs-title" role="presentation">
							<a href="#calendar" id="kr-geriatric-calendar" data-tabs-target="calendar"
							   data-pid="<?php echo $this->item->id; ?>"
							   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?>">
								<i class="fas fa-calendar-alt fa-lg hide-for-medium"></i>
								<span class="show-for-medium">
									<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_AVAILABILITY_PRICE"); ?>
								</span>
							</a>
						</li>
					<?php endif; ?>
					<?php if (is_countable($this->units) && count($this->units)) : ?>
						<li class="tabs-title" role="presentation">
							<a href="#units" data-tabs-target="units"
							   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_UNITS"); ?>">
								<i class="fas fa-building fa-lg hide-for-medium"></i>
								<span class="show-for-medium">
									<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_UNITS"); ?>
								</span>
							</a>
						</li>
					<?php endif; ?>
					<?php if ($this->item->lat && $this->item->lng) : ?>
						<li class="tabs-title" role="presentation">
							<a href="#map" id="kr-map-solo-trigger" data-tabs-target="map"
							   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?>"
							   data-zoom="<?php echo $this->map_zoom; ?>"
							   data-zoommax="<?php echo $this->item->map_max_zoom; ?>" data-target="kr-map-solo"
							   data-type="solo" data-pid="<?php echo $this->item->id; ?>"
							   data-maptypeid="<?php echo $this->params->get('property_map_type', "roadmap"); ?>">
								<i class="fas fa-map hide-for-medium"></i>
								<span class="show-for-medium">
									<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_MAP"); ?>
								</span>
							</a>
						</li>
					<?php endif; ?>
					<?php if (count($this->reviews)) : ?>
						<li class="tabs-title" role="presentation">
							<a data-link="#reviews" data-tabs-target="reviews"
							   aria-label="<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_REVIEWS"); ?>">
								<i class="fas fa-comments hide-for-medium"></i>
								<span class="show-for-medium">
									<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_TAB_REVIEWS"); ?>
								</span>
							</a>
						</li>
					<?php endif; ?>
				</ul>

				<div class="tabs-content" data-tabs-content="kr-property-tabs">
					<div class="tabs-panel is-active" id="overview">
						<?php echo $this->loadTemplate('overview'); ?>
					</div>
					<div class="tabs-panel" id="details">
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
			</div>

			<div id="sidebar-right" class="small-12 medium-4 large-3 columns">
				<div class="kr-property-quote">
					<?php if ((int) $this->booking_type) : ?>
						<?php echo $this->loadTemplate('quote'); ?>
					<?php else: ?>
						<?php echo $this->loadTemplate('reservation'); ?>
					<?php endif; ?>
				</div>

				<?php echo $this->loadTemplate('summary'); ?>

				<div class="text-center">
					<?php echo $this->modules; ?>
				</div>

				<?php if (is_countable($this->alternatives) && count($this->alternatives)): ?>
					<?php echo $this->loadTemplate('alternatives'); ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
<?php endif; ?>

<?php echo $this->loadTemplate('head'); ?>