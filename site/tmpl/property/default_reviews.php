<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2019 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
?>

<div class="kr-reviews">
	<p class="smaller">
		<?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_HEADER_GUEST_REVIEW_INFO"); ?>
	</p>

	<?php if (isset($this->ratings->avgcount) && $this->ratings->avgrating > 0) : ?>
		<div class="grid-x grid-margin-x ">
			<div class="small-12 large-9 cell">
				<dl class="chart">
					<?php for ($i = 0; $i < 7; $i++) : ?>
						<?php $param = "review_rating" . ($i + 1); ?>
						<?php $text = $this->params->get($param, ''); ?>
						<?php if ($text && $this->scores[$i] > 0) : ?>
							<dt><?php echo $text; ?></dt>
							<dd>
							<span style="width:<?php echo (int) $this->scores[$i] * 10 . "%"; ?>;">
								<?php echo $this->scores[$i]; ?>
							</span>
							</dd>
						<?php endif; ?>
					<?php endfor; ?>
				</dl>
				<br>
			</div>
			<div class="small-12 large-3 text-center cell">
				<?php if (isset($this->ratings->avgrating) && $this->ratings->avgrating > 0) : ?>
					<div class="review-score">
						<span class="strong xbig color-accent">
							<?php echo $this->ratings->avgrating; ?>
						</span>
						<span class="xbig font-vlight">/10</span>
						<p class="nospacing-vertical strong small">
							<?php echo KrMethods::sprintf('COM_KNOWRES_PROPERTY_HEADER_GUEST_REVIEW_COUNT',
								count($this->reviews)); ?>
						</p>
					</div>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>

	<?php foreach ($this->reviews as $r) : ?>
		<div class="kr-areview callout small">
			<div class="grid-x grid-margin-x ">
				<?php if (isset($this->ratings->avgrating)): ?>
					<div class="small-12 medium-10 cell">
						<?php if ($r->title): ?>
							<h4 class="color-accent">
								<?php echo $r->title; ?>
							</h4>
						<?php endif; ?>
						<?php if ($r->review): ?>
							<p>
								<?php echo nl2br($r->review); ?>
							</p>
						<?php endif; ?>
					</div>
					<div class="small-12 text-right medium-2 cell">
						<?php $rating = $r->rating1 + $r->rating2 + $r->rating3 + $r->rating4 + $r->rating5
							+ $r->rating6; ?>
						<?php if ($rating > 0): ?>
							<?php $rating = round($rating / 6, 1); ?>
							<div>
								<span class="big strong color-accent">
									<?php echo $rating; ?></span>
								<span class="big color-vlight">/10</span>
								<br>
							</div>
						<?php endif; ?>
					</div>
				<?php else: ?>
					<div class="small-12 cell">
						<?php if ($r->title): ?>
							<h4 class="color-accent"><?php echo $r->title; ?></h4>
						<?php endif; ?>
						<?php if ($r->review): ?>
							<p>
								<?php echo nl2br($r->review); ?>
							</p>
						<?php endif; ?>
					</div>
				<?php endif; ?>
				<div class="small-12 cell">
					<p style="font-size:14px;margin-bottom:0;">
						<?php echo $r->guest_name; ?>
					</p>
					<p style="margin-top:0;margin-bottom:0;font-size:12px;">
						<?php echo TickTock::displayDate($r->created_at, 'M Y'); ?>&nbsp;
						<?php echo $r->guest_location; ?>
					</p>
				</div>
			</div>
		</div>
	<?php endforeach; ?>

	<?php if ($this->more_reviews): ?>
		<?php $Itemid = SiteHelper::getItemId('com_knowres', 'reviews'); ?>
		<?php $link = KrMethods::route('index.php?option=com_knowres&view=reviews&property_id=' . $this->item->id
			. '&Itemid=' . $Itemid . '&limitstart=' . $this->list_limit,
			false); ?>
		<a href="<?php echo $link; ?>" class="button float-right">
			<?php echo KrMethods::plain('COM_KNOWRES_READ_MORE'); ?></a>
	<?php endif; ?>
</div>
