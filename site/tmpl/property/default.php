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
				<i class='fa-solid fa-long-arrow-alt-left'>&nbsp;</i>
				<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_RESULTS'); ?>
			</a>
		<?php endif; ?>
		<div class="grid-x grid-margin-x align-bottom">
			<div class="small-12 medium-8 cell">
				<h1><?php echo $this->item->property_name . ' - ' . $this->item->region_name . ' / ' . $this->item->property_area; ?></h1>
			</div>
			<div class="show-for-medium medium-4 medium-text-left cell">
				<div class="addthis_toolbox addthis_default_style addthis_32x32_style" style="float:right;">
					<a class="addthis_button_facebook"></a>
					<a class="addthis_button_twitter"></a>
					<a class="addthis_button_pinterest_share"></a>
					<a class="addthis_button_email"></a>
				</div>
			</div>
		</div>
		<div class="grid-x grid-margin-x slideshow-wrapper">
			<div class="small-12 cell">
				<?php echo $this->loadTemplate('slideshow'); ?>
			</div>
		</div>

		<div class="grid-x grid-margin-x ">
			<div class="small-12 medium-8 cell">
				<?php if ($this->tabs): ?>
					<?php echo $this->loadTemplate('tabs'); ?>
				<?php else: ?>
					<?php echo $this->loadTemplate('page'); ?>
				<?php endif; ?>
			</div>

			<div id="sidebar-right" class="small-12 medium-4 cell">
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