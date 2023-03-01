<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<h2><?php echo $this->item->property_name; ?></h2>

<p>
	<strong><?php echo KrMethods::plain('COM_KNOWRES_COLON_AREA'); ?></strong>
	<?php echo $this->item->property_area . ', ' . $this->item->town_name; ?>
	&nbsp; <strong><?php echo KrMethods::plain('COM_KNOWRES_COLON_BEDROOMS'); ?></strong>
	<?php echo $this->item->bedrooms; ?>
	&nbsp; <strong><?php echo KrMethods::plain('COM_KNOWRES_COLON_SLEEPS'); ?></strong>
	<?php echo $this->item->sleeps; ?>
	<?php if ($this->item->sleeps_extra) : ?>
		+ <?php echo $this->item->sleeps_extra; ?>
	<?php endif; ?>
	<?php if ($this->item->sleeps_infant_max == 1) : ?>
		<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_SLEEPS_INFANT', $this->item->sleeps_infant_age); ?>
	<?php elseif ($this->item->sleeps_infant_max > 1): ?>
		<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_SLEEPS_INFANTS', $this->item->sleeps_infant_max,
			$this->item->sleeps_infant_age); ?>
	<?php endif; ?>
</p>

<h3><?php echo $this->item->tagline; ?></h3>
<p><?php echo $this->item->p1; ?></p>

<div class="show-for-medium">
	<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
</div>