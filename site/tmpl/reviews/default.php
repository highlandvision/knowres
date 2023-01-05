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
use HighlandVision\KR\TickTock;

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_knowres.site')
   ->useScript('keepalive');

$show = false;
?>

<div class="pagination-wrapper">
	<div class="row">
		<div class="small-12 medium-6 columns">
			<h2><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_HEADER_GUEST_REVIEW') . ' ' . $this->property->property_name; ?></h2>
		</div>
		<div class="small-12 medium-6 columns">
			<div class="kr-pager">
				<?php echo $this->pagination->getPagesLinks(); ?>
			</div>
		</div>
	</div>
</div>

<div style="clear:both;"></div>

<div class="row">
	<div class="small-12 small-centered medium-9 medium-uncentered columns">
		<?php if (count($this->items)): ?>
			<div class="striped">
				<?php foreach ($this->items as $review) : ?>
					<?php $show = true; ?>
					<div class="areview">
						<div class="row">
							<div class="small-12 small-centered medium-10 medium-uncentered columns">
								<h6><?php echo trim($review->title); ?></h6>
							</div>
							<div class="small-12 small-centered medium-2 medium-uncentered text-right columns">
								<small><?php echo TickTock::displayDate($review->review_date, "M Y"); ?></small>
							</div>
						</div>
						<div class="row">
							<div class="small-12 columns">
								<?php $text = str_replace('</p><p>', '<br>', $review->review); ?>
								<?php $text = strip_tags($text, '<br>'); ?>
								<?php echo '<p>' . $text . '</p>'; ?>
							</div>
						</div>
						<div class="row">
							<div class="small-12 columns">
								<small>
									<i>
										<?php if ($review->guest_name): ?>
											<?php echo $review->guest_name; ?>
										<?php endif; ?>
										<?php if ($review->guest_name && $review->guest_location): ?>
											<?php echo ", "; ?>
										<?php endif; ?>
										<?php if ($review->guest_location): ?>
											<?php echo $review->guest_location; ?>
										<?php endif; ?>
									</i>
								</small>
							</div>
						</div>
					</div>

					<hr>
				<?php endforeach; ?>
				<?php if (!$show): ?>
					<?php echo JText::_('COM_KNOWRES_NO_ITEMS'); ?>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</div>