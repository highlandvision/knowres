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
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;
?>

<div id="kr-alternatives">
	<div class="grid-x grid-margin-x">
		<div class="small-9 cell">
			<h3><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_HEADER_ALTERNATIVES'); ?></h3>
		</div>
		<div class="small-3 text-right cell">
			<div class="kr-double-arrows"></div>
		</div>
	</div>

	<div class="grid-x gtid-margin-x kr-alternatives">
		<?php foreach ($this->alternatives as $item): ?>
			<?php
			$plink    = SiteHelper::buildPropertyLink($item->id);
			$image    = Media\Images::getPropertyImageName($item->id);
			$currency = $this->currencies[0];
			if (isset($this->currencies[$item->id])) {
				$currency = $this->currencies[$item->id];
			}
			$netrate = $this->net_rates[0];
			if (isset($this->net_rates[$item->id])) {
				$net_rate = $this->net_rates[$item->id];
			}
			$markup = $this->net_markup[0];
			if (isset($this->net_markup[$item->id])) {
				$markup = $this->net_markup[$item->id];
			}
			?>

			<div class="small-12 cell">
				<a href="<?php echo $plink; ?>" class="property" title="<?php echo $item->property_name; ?>">
					<div class="image-wrapper">
						<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->id, 'solo', $image),
						                         $item->property_name,
						                         [
							                         'width'  => $this->params->get('max_property_width'),
							                         'height' => $this->params->get('max_property_height')
						                         ]);
						?>

						<?php echo KrMethods::render('properties.pricesummary', [
							'minrate'  => $item->minrate,
							'maxrate'  => $item->maxrate,
							'netrate'  => $netrate,
							'markup'   => $markup,
							'summary'  => $item->price_summary,
							'currency' => $currency
						]);
						?>
					</div>

					<div class="content no-margin-bottom">
						<h4><?php echo $item->property_name; ?></h4>
						<?php $clean = strip_tags($item->p1); ?>
						<p><?php echo Utility::cutString($clean, 150); ?></p>
						<p class="occupancy">
							<i class="fas fa-female fa-lg color-accent"></i>
							<i class="fas fa-male fa-lg color-accent"></i>
							<?php echo ' ' . ($item->sleeps + $item->sleeps_extra)
								. ' ' . KrMethods::plain('COM_KNOWRES_FEATURED_PERSONS')
								.  ' | ' . $item->bedrooms . ' '
								. KrMethods::plain('COM_KNOWRES_BEDROOMS');
							?>
						</p>
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	</div>
</div>