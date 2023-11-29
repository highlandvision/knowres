<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;

$date = KrFactory::getListModel('rates')->getLastRateDate($this->item->id);
?>

	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_RATES_TITLE'); ?>
		</div>
		<div class="col-md-5">
			<?php if ($date && $date >= $this->today) : ?>
				<?php echo KrMethods::plain('COM_KNOWRES_RATES_LAST_DATE') . ' ' . TickTock::displayDate($date); ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_RATES_LAST_DATE_NONE'); ?>
			<?php endif; ?>
		</div>
		<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('rate_manage', false))): ?>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=rate.edit"); ?>">
					<i class='fa-solid fa-plus-square'></i> <?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
				</a>
			</div>
			<div class="col-md-2">
				<?php if ($date) : ?>
					<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=rates"); ?>">
						<i class='fa-solid fa-list'></i> <?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>

<?php if ($this->settings['net_rates'] && $this->access_level > 10): ?>
	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_RATEMARKUPS_TITLE'); ?>
		</div>
		<div class="col-md-5">
			<?php
			echo KrMethods::sprintf('COM_KNOWRES_CURRENT', (int) $this->item->ratemarkups);
			?>
		</div>
		<div class="col-md-2">
			<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=ratemarkup.edit"); ?>">
				<i class='fa-solid fa-plus-square'></i>
				<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
			</a>
		</div>
		<div class="col-md-2">
			<?php if ((int) $this->item->ratemarkups) : ?>
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=ratemarkups"); ?>">
					<i class='fa-solid fa-list'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>

<?php if ($this->access_level > 10): ?>
	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_COUPONS_TITLE'); ?>
		</div>
		<div class="col-md-5">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CURRENT', $this->item->coupons); ?>
		</div>
		<div class="col-md-2">
			<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=coupon.edit"); ?>">
				<i class='fa-solid fa-plus-square'></i>
				<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
			</a>
		</div>
		<div class="col-md-2">
			<?php if ((int) $this->item->coupons) : ?>
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=coupons"); ?>">
					<i class='fa-solid fa-list'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>

	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_DISCOUNTS_TITLE'); ?>
		</div>
		<div class="col-md-5">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CURRENT', $this->item->discounts); ?>
		</div>
		<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('discount_manage', false))): ?>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=discount.edit"); ?>">
					<i class='fa-solid fa-plus-square'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
				</a>
			</div>
			<div class="col-md-2">
				<?php if ((int) $this->item->discounts) : ?>
					<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=discounts"); ?>">
						<i class='fa-solid fa-list'></i>
						<?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_EXTRAS_TITLE'); ?>
		</div>
		<div class="col-md-5">
			<?php echo KrMethods::sprintf('COM_KNOWRES_CURRENT', $this->item->extras); ?>
		</div>
		<?php if ($this->access_level > 10 || ($this->access_level == 10 && $this->params->get('extra_manage', false))): ?>
			<div class="col-md-2">
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=extra.edit"); ?>">
					<i class='fa-solid fa-plus-square'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
				</a>
			</div>
			<div class="col-md-2">
				<?php if ((int) $this->item->extras) : ?>
					<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=extras"); ?>">
						<i class='fa-solid fa-list'></i>
						<?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>

<?php if ($this->access_level > 10) : ?>
	<div class="row">
		<div class="col-md-3">
			<?php echo KrMethods::plain('COM_KNOWRES_PROPERTYICALS_TITLE'); ?>
		</div>
		<div class="col-md-5"><?php echo KrMethods::sprintf('COM_KNOWRES_CURRENT', $this->item->icals); ?></div>
		<div class="col-md-2">
			<a href="<?php echo KrMethods::route("index.php?option=com_knowres&task=propertyical.edit"); ?>">
				<i class='fa-solid fa-plus-square'></i>
				<?php echo KrMethods::plain('COM_KNOWRES_ADD'); ?>
			</a>
		</div>
		<div class="col-md-2">
			<?php if ((int) $this->item->icals) : ?>
				<a href="<?php echo KrMethods::route("index.php?option=com_knowres&view=propertyicals"); ?>">
					<i class='fa-solid fa-list'></i>
					<?php echo KrMethods::plain('COM_KNOWRES_LIST'); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>