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

$booknow = KrMethods::plain('MOD_KNOWRES_FEATURED_BOOK') . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_NOW');
?>

<div class="row">
	<div class="small-8 small-text-left medium-8 large-9 medium-uncentered columns">
		<h3>
			<?php if (!$title): ?>
				<?php echo KrMethods::plain('MOD_KNOWRES_FEATURED_BARCELONA'); ?>
			<?php else: ?>
				<?php echo $title; ?>
			<?php endif; ?>
		</h3>
	</div>
	<div class="show-for-large large-3 columns">
		<div class="kr-double-arrows"></div>
	</div>
</div>

<div class="row kr-featured solo" data-equalizer data-slick='{"slidesToShow": <?php echo $slidestoshow; ?>}'>
	<?php foreach ($data as $p => $d): ?>
		<?php echo KrMethods::render('modules.featured.solo', ['id' => $p, 'data' => $d]); ?>
	<?php endforeach; ?>
</div>