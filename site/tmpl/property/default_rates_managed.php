<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Best Holiday Homes. All rights reserved.
 * @license    See the file LICENSE.txt for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;

$seasons = KrFactory::getListModel('seasons')->getSeasons((int) $this->settings['cluster']);
?>

<?php for ($i = 0; $i < 6; $i++): ?>
	<?php $pc = 100; ?>
	<?php if ($i == 0): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_STANDARD'); ?></h6>
		<?php
		$pc    = 9999;
		$dates = '';
		?>
	<?php elseif ($i == 1 && $this->settings['xlow_season_pc'] != 100): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_XLOW'); ?></h6>
		<?php
		$pc    = $this->settings['xlow_season_pc'];
		$dates = SiteHelper::getDates('xlow', $seasons);
		?>
	<?php elseif ($i == 2 && $this->settings['low_season_pc'] != 100): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_LOW'); ?></h6>
		<?php
		$pc    = $this->settings['low_season_pc'];
		$dates = SiteHelper::getDates('low', $seasons);
		?>
	<?php elseif ($i == 3 && $this->settings['mid_season_pc'] != 100): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_MID'); ?></h6>
		<?php
		$pc    = $this->settings['mid_season_pc'];
		$dates = SiteHelper::getDates('mid', $seasons);
		?>
	<?php elseif ($i == 4 && $this->settings['high_season_pc'] != 100): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_HIGH'); ?></h6>
		<?php
		$pc    = $this->settings['high_season_pc'];
		$dates = SiteHelper::getDates('high', $seasons);
		?>
	<?php elseif ($i == 5 && $this->settings['xhigh_season_pc'] != 100): ?>
		<h6><?php echo KrMethods::plain('COM_KNOWRES_SEASON_XHIGH'); ?> </h6>
		<?php
		$pc    = $this->settings['xhigh_season_pc'];
		$dates = SiteHelper::getDates('xhigh', $seasons);
		?>
	<?php endif; ?>

	<?php if ($pc != 100): ?>
		<?php if ($pc == 9999): ?>
			<?php $pc = 100; ?>
		<?php endif; ?>
		<ul>
			<?php foreach ($this->rates as $r): ?>
				<?php $rate = Utility::roundValue($r->rate * $pc / 100, $this->settings['currency']); ?>
				<?php if ($r->min_guests == 1): ?>
					<li>
						<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_BASE', $r->max_guests,
							Utility::displayValue($rate, $this->settings['currency'])); ?>
					</li>
				<?php else: ?>
					<?php if ($r->max_guests - $r->min_guests == 0): ?>
						<li>
							<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_SOLO', $r->max_guests,
								Utility::displayValue($rate, $this->settings['currency'])); ?>
						</li>
					<?php elseif ($r->max_guests - $r->min_guests == 1): ?>
						<?php if ($r->ignore_pppn): ?>
							<li>
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI_ALL',
									$r->max_guests, Utility::displayValue($rate, $this->settings['currency'])); ?>
							</li>
						<?php else: ?>
							<li>
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI2', $r->min_guests,
									$r->max_guests, Utility::displayValue($rate, $this->settings['currency'])); ?>
							</li>
						<?php endif; ?>
					<?php elseif ($r->max_guests - $r->min_guests > 1): ?>
						<?php if ($r->ignore_pppn): ?>
							<li>
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI_ALL',
									$r->max_guests, Utility::displayValue($rate, $this->settings['currency'])); ?>
							</li>
						<?php else: ?>
							<li>
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI', $r->min_guests,
									$r->max_guests, Utility::displayValue($rate, $this->settings['currency'])); ?>
							</li>
						<?php endif; ?>
					<?php endif; ?>
				<?php endif; ?>
			<?php endforeach; ?>
		</ul>

		<?php if ($dates): ?>
			<p><?php echo $dates; ?></p>
		<?php endif; ?>
	<?php endif; ?>
<?php endfor; ?>