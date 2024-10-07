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

<h3 class="no-margin-bottom"><?php echo $this->item->property_name; ?></h3>

<p>
	<strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_AREA"); ?></strong>
	<?php echo $this->item->property_area . ', ' . $this->item->town_name; ?>
	&nbsp; <strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_BEDROOMS"); ?></strong>
	<?php echo $this->item->bedrooms; ?>
	&nbsp; <strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_SLEEPS"); ?></strong>
	<?php echo $this->item->sleeps; ?>
	<?php if ($this->item->sleeps_extra) : ?>
		+ <?php echo $this->item->sleeps_extra; ?><?php endif; ?>
</p>

<h4><?php echo $this->item->tagline; ?></h4>

<div class="description">
	<?php echo $this->item->p1; ?>
</div>

<!--  Features -->
<?php if (!empty($this->features) && count($this->features)): ?>
	<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'); ?></h3>
	<div class="facilities">
		<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
	</div>
<?php endif; ?>