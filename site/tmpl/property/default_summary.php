<?php
/**
 * @package     KR
 * @subpackage  Site View
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<?php if ($this->params->get('review_ratings') && count($this->reviews) && isset($this->ratings->avgrating) && $this->ratings->avgrating > 0) : ?>
	<div class="text-center" style="margin:1rem 0;">
		<span class="score">
			<?php $width = round($this->ratings->avgrating / 10 * 100, 1); ?>
			<span style="width:<?php echo $width . "%"; ?>;"></span>
		</span>
		<span>
		<!--suppress HtmlUnknownAnchorTarget -->
		<a href="#reviews">
			<?php echo KrMethods::sprintf("COM_KNOWRES_PROPERTY_HEADER_GUEST_REVIEW_SUMMARY", count($this->reviews)); ?>
		</a>
	</span>
	</div>
<?php endif; ?>
<div class="moduletable property-summary">
	<div class="grid-x grid-margin-x ">
		<div class="small-6 text-right cell">
			<?php echo KrMethods::plain("COM_KNOWRES_SLEEPS"); ?>
		</div>
		<div class="small-3 end text-right cell">
			<?php echo $this->item->sleeps; ?>
			<?php if ($this->item->sleeps_extra) : ?>
				+ <?php echo $this->item->sleeps_extra; ?>
			<?php endif; ?>
		</div>
		<div class="small-6 text-right cell">
			<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_HEADER_BEDROOMS"); ?>
		</div>
		<div class="small-3 end text-right cell">
			<?php echo $this->item->bedrooms; ?>
		</div>
		<div class="small-6 text-right cell">
			<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_HEADER_BATHROOMS"); ?>
		</div>
		<div class="small-3 end text-right cell">
			<?php echo $this->item->bathrooms; ?>
		</div>
		<?php if ($this->item->area > 0): ?>
			<div class="small-6 text-right cell">
				<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_HEADER_AREA"); ?>
			</div>
			<div class="small-3 end text-right cell">
				<?php echo $this->item->area . '<span class="smaller">m2</span>'; ?>
			</div>
		<?php endif; ?>
	</div>
</div>