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
use HighlandVision\KR\Utility;
?>

<div class="row collapse">
	<button class="close-button" aria-label="Close" type="button" data-close>
		<span aria-hidden="true">&times;</span>
	</button>

	<div class="small-12 columns text-center">
		<?php echo $this->loadTemplate('slideshow'); ?>

		<h4>
			<a href="<?php echo $this->link; ?>" title="<?php echo $this->item->property_name; ?>">
				<?php echo $this->item->property_name; ?>
			</a>
		</h4>
		<p style="margin-bottom:0.5rem;">
			<?php echo KrMethods::plain("COM_KNOWRES_COLON_AREA"); ?>
			<strong><?php echo $this->item->property_area . ', ' . $this->item->town_name; ?></strong>
			<br>
			<?php echo KrMethods::plain("COM_KNOWRES_COLON_BEDROOMS"); ?>
			<strong><?php echo $this->item->bedrooms; ?></strong>
			<?php echo KrMethods::plain("COM_KNOWRES_COLON_SLEEPS"); ?>
			<strong>
				<?php echo $this->item->sleeps; ?>
				<?php if ($this->item->sleeps_extra): ?>
					<?php echo '+' . $this->item->sleeps_extra; ?>
				<?php endif; ?>
			</strong>
		</p>

		<h5><?php echo $this->item->tagline; ?></h5>
		<p>
			<?php echo Utility::cutString($this->item->p1, 190); ?>
		</p>
		<a href="<?php echo $this->link; ?>" class="button small no-margin-bottom" title="<?php echo $this->item->property_name; ?>">
			<?php echo KrMethods::plain('COM_KNOWRES_READ_MORE'); ?>
		</a>
	</div>
</div>