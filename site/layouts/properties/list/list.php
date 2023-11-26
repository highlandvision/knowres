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
 * @var array  $favs           Favourite properties.
 * @var string $bar            Selected menu bar.
 * @var bool   $byAvailability Search by availability.
 * @var array  $net            Net rates.
 * @var array  $discount       Discount value.
 * @var array  $rating         Review value.
 * @var bool   $one_region     True if all properties are in 1 region
 * @var array  $key_features   Features assigned for filtering
 */

$Translations = new Translations();

$weekly  = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
$new     = $params->get('search_new', 0);
$created = $new ? TickTock::modifyMonths('now', $new, '-') : false;
$total   = count($items);
$count   = 0;
?>

<div class="grid-x grid-margin-x" id="kr-list">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $id = 'kr-property-' . $item->id; ?>
		<?php $title = KrMethods::plain('COM_KNOWRES_VIEW') . ' ' . $item->property_name; ?>
		<?php $count++; ?>
		<?php $end = $count < $total ? '' : 'end'; ?>
		<div class="small-12 medium-6 cell flex-container">
			<div id="<?php echo $id; ?>" class="card kr-list-property" data-id="<?php echo $item->id; ?>">
				<?php if ($item->imagefilename) : ?>
					<div class="kr-slideshow-wrapper">
						<?php echo KrMethods::render('properties.list.card.slideshow.images',
						                             ['item'         => $item,
						                              'params'       => $params,
						                              'plink'        => $plink,
						                              'Translations' => $Translations
						                             ]); ?>
						<?php echo KrMethods::render('properties.list.card.slideshow.pricing',
						                             ['item'           => $item,
						                              'currency'       => $currency,
						                              'byAvailability' => $byAvailability,
						                              'net'            => $net[$item->id] ?? 0,
						                              'discount'       => $discount[$item->id] ?? 0,
						                              'weekly'         => $weekly[$item->id] ?? $weekly[0],
						                              'plink'          => $plink
						                             ]);
						?>
						<?php echo KrMethods::render('properties.list.card.slideshow.favicon',
						                             ['item'  => $item,
						                              'favs'  => $favs,
						                              'bar'   => $bar
						                             ]); ?>
						<?php if ($new && $item->created_at >= $created): ?>
							<?php echo KrMethods::render('properties.list.card.slideshow.badge'); ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<div class="card-section">
					<a href="<?php echo $plink; ?>" target="_blank">
						<?php echo KrMethods::render('properties.list.card.section', ['item'         => $item,
						                                                              'params'       => $params,
						                                                              'plink'        => $plink,
						                                                              'one_region'   => $one_region,
						                                                              'key_features' => $key_features,
						                                                              'Translations' => $Translations
						]); ?>
					</a>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>