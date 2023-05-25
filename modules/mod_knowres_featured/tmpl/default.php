<?php
/**
 * @package    Know Reservations
 * @subpackage Site module
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<div class="row">
	<div class="small-12 text-center medium-text-left large-10 columns">
		<h3 class="h2">
			<?php if (!$title): ?>
				<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_FEATURED'); ?>
				<span class="color-secondary">
					<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_VILLAS'); ?>
				</span>
				<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_BEST'); ?>
				<span class="color-secondary">
					<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_QUALITY'); ?>
				</span>
			<?php else: ?>
				<?php echo $title; ?>
			<?php endif; ?>
		</h3>
	</div>
	<div class="show-for-large large-2 columns">
		<div class="kr-double-arrows"></div>
	</div>
</div>

<div class="row kr-featured" data-equalizer data-slick='{"slidesToShow": <?php echo $slidestoshow; ?>}'>
	<?php foreach ($data as $p => $d): ?>
		<?php echo KrMethods::render('modules.featured.default',
			['id'   => $p,
			 'data' => $d]
		);
		?>
	<?php endforeach; ?>
</div>