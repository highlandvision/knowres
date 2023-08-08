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

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Translations;

extract($displayData);
/**
 * Layout variables
 *
 * @var array  $items          Properties
 * @var mixed  $params         KR params.
 * @var string $currency       Default currency.
 * @var bool   $favicon        Property is favourite.
 * @var bool   $saved          Property is favourite.
 * @var string $view           Selected view.
 * @var bool   $byAvailability Search by availability.
 * @var array  $net            Net rates.
 * @var array  $discount       Discount value.
 * @var array  $rating         Review value.
 */

$Translations = new Translations();
$weekly       = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
$new          = $params->get('search_new', 0);
if ($new) {
	$created = TickTock::modifyMonths('now', $new, '-');
}
?>

<div class="kr-property">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $id = 'kr-property-' . $item->id; ?>

		<div id="<?php echo $id; ?>" class="<?php echo $view; ?>">
			<div class="row">
				<div class="small-12 medium-6 columns slider">
					<?php if ($item->imagefilename) : ?>
						<div class="image-wrapper">
							<?php echo KrMethods::render('properties.slideshow', ['item'         => $item,
							                                                      'params'       => $params,
							                                                      'plink'        => $plink,
							                                                      'Translations' => $Translations
							]); ?>
							<?php if ($favicon): ?>
								<?php echo KrMethods::render('properties.favicon', ['item'  => $item,
								                                                    'saved' => $saved,
								                                                    'view'  => $view
								]); ?>
							<?php endif; ?>
							<?php if ($new && $item->created_at >= $created): ?>
								<?php echo KrMethods::render('properties.badge'); ?>
							<?php endif; ?>
						</div>
					<?php endif; ?>
				</div>

				<div class="small-12 medium-6 columns">
					<div class="top-section">
						<a href="<?php echo $plink; ?>" title="<?php echo $item->property_name; ?>">
							<h2 class="h3">
								<?php echo $item->property_name; ?>
							</h2>
						</a>
						<p class="color-dark">
							<?php echo $item->property_area . ', ' . $item->region_name; ?>
							<br>
							<?php echo KrMethods::plain('COM_KNOWRES_SLEEPS'); ?>
							<?php echo $item->sleeps; ?>
							<?php if ($item->sleeps_extra): ?>
								+ <?php echo $item->sleeps_extra; ?>
							<?php endif; ?>
							<?php echo ' / '; ?>
							<?php echo KrMethods::plain('COM_KNOWRES_BEDROOMS'); ?>
							<?php echo $item->bedrooms; ?>
							<?php echo ' / '; ?>
							<?php echo KrMethods::plain('COM_KNOWRES_BATHROOMS'); ?>
							<?php echo $item->bathrooms; ?>
						</p>

						<h3 class="h4 tagline hide-for-medium-only">
							<?php echo $Translations->getText('property', $item->id, 'p10'); ?>
						</h3>

						<div class="kr-relative-pricing">
							<?php echo KrMethods::render('properties.pricedisplay',
							                             ['item'           => $item,
							                              'currency'       => $currency,
							                              'byAvailability' => $byAvailability,
							                              'net'            => $net[$item->id] ?? 0,
							                              'discount'       => $discount[$item->id] ?? 0,
							                              'weekly'         => $weekly[$item->id] ?? $weekly[0],
							                              'plink'          => $plink
							                             ]);
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>