<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var mixed $item Property item.
 */
?>

<div class="flex-horizontal-list">
	<div class="item">
		<p class="title"><?php echo KrMethods::plain('COM_KNOWRES_COLON_BEDROOMS'); ?></p>
		<p class="value"><?php echo $item->bedrooms; ?></p>
	</div>
	<div class="item">
		<p class="title"><?php echo KrMethods::plain('COM_KNOWRES_COLON_BATHROOMS'); ?></p>
		<p class="value"><?php echo $item->bathrooms; ?></p>
	</div>
	<div class="item">
		<p class="title"><?php echo KrMethods::plain('COM_KNOWRES_COLON_SLEEPS'); ?></p>
		<p class="value">
			<?php echo $item->sleeps; ?>
			<?php if ($item->sleeps_extra) : ?>
				+ <?php echo $item->sleeps_extra; ?>
			<?php endif; ?>
			<?php if ($item->sleeps_infant_max == 1) : ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_SLEEPS_INFANT', $item->sleeps_infant_age); ?>
			<?php elseif ($item->sleeps_infant_max > 1): ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_SLEEPS_INFANTS',
					$item->sleeps_infant_max,
					$item->sleeps_infant_age); ?>
			<?php endif; ?>
		</p>
	</div>
</div>