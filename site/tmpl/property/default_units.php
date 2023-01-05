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

use HighlandVision\KR\Currency;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

$Currency = new Currency();
?>

	<h4><?php echo KrMethods::plain("COM_KNOWRES_PROPERTY_HEADER_UNITS"); ?></h4>

<?php foreach ($this->units as $unit) : ?>
	<div class="kr-properties-item callout small">
		<div class="row">
			<div class="small-12 columns">
				<?php
				$plink             = SiteHelper::buildPropertyLink($unit->id);
				$image             = Media\Images::getPropertyImageName($unit->id);
				$property_currency = isset($this->currencies[$unit->id]) ?: $this->currencies[0];
				$weekly            = isset($this->weekly[$unit->id]) || $this->weekly[0];
				if ($weekly)
				{
					$text = KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM');
				}
				else
				{
					$text = KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM_NIGHT');
				}
				?>

				<h4 style="margin-bottom:0.5rem;">
					<a href="<?php echo $plink; ?>" title="<?php echo $unit->property_name; ?>">
						<?php echo $unit->property_name; ?>
					</a>
				</h4>

				<p>
					<strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_AREA"); ?></strong>
					<?php echo $unit->property_area; ?>
					&nbsp; <strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_BEDROOMS"); ?></strong>
					<?php echo $unit->bedrooms; ?>
					&nbsp; <strong><?php echo KrMethods::plain("COM_KNOWRES_COLON_SLEEPS"); ?></strong>
					<?php echo $unit->sleeps; ?>
					<?php if ($unit->sleeps_extra) : ?>
						+ <?php echo $unit->sleeps_extra; ?><?php endif; ?>
				</p>

				<a href="<?php echo $plink; ?>" title="">
					<?php echo HTMLHelper::_('image', Media\Images::getImagePath($unit->id, 'solo', $image),
						$unit->property_name, [
							'class'  => "relative",
							'width'  => $this->params->get('max_property_width'),
							'height' => $this->params->get('max_property_height')
						]);
					?>
				</a>

				<div class="content">
					<div class="row">
						<div class="small-12 medium-8 columns end">
							<h4><br><?php echo $unit->tagline; ?></h4>
						</div>
					</div>
					<div class="row">
						<div class="small-12 medium-8 columns">
							<p><?php echo Utility::cutString($unit->p1, 250); ?></p>
						</div>

						<div class="small-12 medium-4 columns">
							<div class="price-content text-center">
								<div class="price-rate">
									<?php if ($unit->minrate): ?>
										<?php echo $text . '<br>' . $Currency->getSimpleValue((int) $unit->minrate,
												$property_currency); ?>
										<?php if ($unit->maxrate): ?>
											<?php echo ' - ' . $Currency->getSimpleValue((int) $unit->maxrate,
													$property_currency); ?>
										<?php endif; ?>
									<?php elseif ($unit->price_summary): ?>
										<?php echo $Currency->getSimpleValue($unit->price_summary,
											$property_currency); ?>
									<?php endif; ?>
								</div>
							</div>
							<a class="button small expanded"
							   href="<?php echo SiteHelper::buildPropertyLink($unit->id); ?>">
								<?php echo KrMethods::plain('COM_KNOWRES_PAYMENT_VIEW_BREAKDOWN'); ?>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php endforeach; ?>