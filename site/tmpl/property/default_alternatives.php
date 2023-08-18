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

if (!is_countable($this->alternatives) || !count($this->alternatives))
{
	return;
}
?>

<div id="kr-alternatives" class="kr-slick moduletable">
	<div class="row">
		<div class="small-9 columns">
			<h3 class="h4"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_HEADER_ALTERNATIVES'); ?></h3>
		</div>
		<div class="small-3 pull-right columns">
			<div class="kr-double-arrows"></div>
		</div>
	</div>

	<div class="row kr-alternatives">
		<?php foreach ($this->alternatives as $item): ?>
			<?php
			$plink    = SiteHelper::buildPropertyLink($item->id);
			$image    = Media\Images::getPropertyImageName($item->id);
			$currency = $this->currencies[0];
			if (isset($this->currencies[$item->id]))
			{
				$currency = $this->currencies[$item->id];
			}
			$netrate = $this->net_rates[0];
			if (isset($this->net_rates[$item->id]))
			{
				$net_rate = $this->net_rates[$item->id];
			}
			$markup = $this->net_markup[0];
			if (isset($this->net_markup[$item->id]))
			{
				$markup = $this->net_markup[$item->id];
			}
			?>

			<div class="small-12 columns">
				<a href="<?php echo $plink; ?>" class="property" title="<?php echo $item->property_name; ?>">
					<div class="image-wrapper">
						<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->id, 'solo', $image),
							$item->property_name, [
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

					<div class="content">
						<h3 class="h4"><?php echo $item->property_name; ?></h3>
						<p><?php echo Utility::cutString($item->p1, 140); ?></p>
						<i class="fas fa-female fa-lg color-accent"></i>
						<i class="fas fa-male fa-lg color-accent"></i> &nbsp;
						<?php echo ' ' . ($item->sleeps + $item->sleeps_extra) . ' '
							. KrMethods::plain('COM_KNOWRES_FEATURED_PERSONS'); ?>
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	</div>
</div>