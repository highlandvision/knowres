<?php
/**
 * @package    Know Reservations
 * @subpackage Site Layout
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
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item     Property Item.
 * @var string       $currency Property currency.
 * @var array        $saved    Saved favourites.
 * @var Registry     $params   KR params.
 */

$property_currency = $currency;
$Currency          = new Currency();
$view              = 'list';
$plink             = SiteHelper::buildPropertyLink($item->id, '#quote');
$image             = Media\Images::getPropertyImageName($item->id);
$booknow           = KrMethods::plain('MOD_KNOWRES_FEATURED_BOOK') . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_NOW');
?>

<div class="kr-property">
	<div class="list">
		<div class="small-12 columns">
			<a href="<?php echo $plink; ?>" title="<?php echo $item->property_name; ?>">
				<div class="image-wrapper">
					<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->id, 'solo', $image),
						$item->property_name, [
							'width'  => $params->get('max_property_width'),
							'height' => 'auto'
						]);
					?>

					<?php echo KrMethods::render('properties.favicon', ['item'  => $item,
					                                                    'saved' => $saved,
					                                                    'view'  => $view
					]); ?>

					<div class="price">
						<?php if ($item->minrate > 0): ?>
							<?php $price = floor($item->minrate / 1) * $unit; ?>
							<p class="from"><?php echo strtolower(KrMethods::plain('COM_KNOWRES_FROM')); ?></p>
							<p class="rate"><?php echo Utility::displayValue($price, $property_currency, false); ?></p>
						<?php elseif ($item->price_summary): ?>
							<p class="from"><?php echo strtolower(KrMethods::plain('COM_KNOWRES_FROM')); ?></p>
							<p class="rate"><?php echo $Currency->getSimpleValue($item->price_summary,
									$property_currency); ?></p>
						<?php else: ?>
							<p class="request"><?php echo KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST'); ?></p>
						<?php endif; ?>
					</div>
				</div>

				<div class="content">
					<div class="content-left">
						<h4><?php echo $item->property_name; ?></h4>
						<h5><?php echo $item->bedrooms . 'BR / ' . $item->property_area; ?></h5>
					</div>
					<div class="content-right">
						<p class="button expanded"><?php echo $booknow; ?></p>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>