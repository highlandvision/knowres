<?php
/**
 * @package    Know Reservations
 * @subpackage Site Controllers
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Translations;
?>

<div class="row collapse">
	<button class="close-button" aria-label="<?php echo KrMethods::plain('COM_KNOWRES_CLOSE'); ?>" type="button"
	        data-close>
		<span aria-hidden="true">&times;</span>
	</button>

	<div class="small-12 columns">
		<?php echo $this->loadTemplate('slideshow'); ?>
		<h4><?php echo $this->item->property_name; ?></h4>
		<p>
			<?php
			echo strtoupper(trim($this->item->property_area));
			echo ', ' . $this->item->region_name . ', ';
			echo Translations::getCountryName($this->item->country_id);?>
			<br>
			<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS'); ?>
			<?php echo $this->item->sleeps; ?>
			<?php if ($this->item->sleeps_extra > 0): ?>
				+ <?php echo $this->item->sleeps_extra; ?>
			<?php endif; ?>
			<?php echo ' / '; ?>
			<?php echo KrMethods::plain('COM_KNOWRES_BEDROOMS'); ?>
			<?php echo $this->item->bedrooms; ?>
			<?php echo ' / '; ?>
			<?php echo KrMethods::plain('COM_KNOWRES_BATHROOMS'); ?>
			<?php echo $this->item->bathrooms; ?>
			<?php echo ' / '; ?>
			<?php if (!$this->item->pets): ?>
				<?php echo KrMethods::plain('COM_KNOWRES_NO_PETS'); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_PETS'); ?>
				<?php echo $this->item->pets; ?>
			<?php endif; ?>
		</p>

		<a href="<?php echo $this->link; ?>" class="button expanded no-margin-bottom" target="_blank" title="<?php echo
		$this->item->property_name; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_VIEW_PROPERTY'); ?>
		</a>
	</div>
</div>