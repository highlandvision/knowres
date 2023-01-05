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
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;
?>

<?php if (is_countable($this->rates) && count($this->rates)): ?>
	<ul>
		<?php foreach ($this->rates as $r): ?>
			<?php
			$rate = $r->rate;
			if ($this->settings['net_rates'])
			{
				$rate = KrFactory::getAdminModel('ratemarkup')::getGrossRate((float) $rate, $this->settings['net_markup'],
					$this->settings['currency']);
			}
			else
			{
				$rate = Utility::roundValue((float) $rate, $this->settings['currency']);
			}
			?>

			<li class="color-secondary" style="margin-top:10px;">
				<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_DATES',
					$this->Translations->getText('rate', $r->id, 'name'), TickTock::displayDate($r->valid_from),
					TickTock::displayDate($r->valid_to)); ?>
			</li>

			<li class="smaller">
				<?php if ($r->start_day < 7): ?>
					<em>
						<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_WEEKLY_STAYS',
							TickTock::getDayName($r->start_day)); ?>
					</em>
				<?php elseif ($r->min_nights > 1): ?>
					<em>
						<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_MINIMUM_STAYS', $r->min_nights); ?>
					</em>
				<?php endif; ?>
			</li>

			<?php if ($r->min_guests == 1): ?>
				<li style="font-size:92%;">
					<?php if ($r->max_guests == 1): ?>
						<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_SOLO', $r->max_guests,
							Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
					<?php else: ?>
						<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_BASE', $r->max_guests,
							Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
					<?php endif; ?>
				</li>
			<?php endif; ?>

			<?php $more_guests = Utility::decodeJson($r->more_guests); ?>
			<?php if (count($more_guests)): ?>
				<?php foreach ($more_guests as $m): ?>
					<?php
					$rate = $m->more_rate;
					if ($this->settings['net_rates'])
					{
						$rate = KrFactory::getAdminModel('ratemarkup')::getGrossRate((float) $rate,
							$this->settings['net_markup'], $this->settings['currency']);
					}
					else
					{
						$rate = Utility::roundValue((float) $rate, $this->settings['currency']);
					}
					?>
					<?php if ((int) $m->more_max - (int) $m->more_min == 0): ?>
						<li style="font-size:92%;">
							<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_SOLO', $m->more_max,
								Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
						</li>
					<?php elseif ((int) $m->more_max - (int) $m->more_min == 1): ?>
						<?php if ($m->more_pppn): ?>
							<li style="font-size:92%;">
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI_ALL', $m->more_max,
									Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
							</li>
						<?php else: ?>
							<li style="font-size:92%;">
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI2', $m->more_min,
									$m->more_max, Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
							</li>
						<?php endif; ?>
					<?php elseif ((int) $m->more_max - (int) $m->more_min > 1): ?>
						<?php if ($m->more_pppn): ?>
							<li style="font-size:92%;">
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI_ALL', $m->more_max,
									Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
							</li>
						<?php else: ?>
							<li style="font-size:92%;">
								<?php echo KrMethods::sprintf('COM_KNOWRES_PRICING_ADDITIONAL_MULTI', $m->more_min,
									$m->more_max, Utility::displayValue((float) $rate, $this->settings['currency'])); ?>
							</li>
						<?php endif; ?>
					<?php endif; ?>
				<?php endforeach; ?>
			<?php endif; ?>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>