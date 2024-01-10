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
 * @var array  $key_features   Features assigned for filtering
 */

$Translations = new Translations();

$weekly = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
?>

<div class="grid-x grid-margin-x" id="kr-browse">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $id = 'kr-property-' . $item->id; ?>
		<?php $title = KrMethods::plain('COM_KNOWRES_VIEW') . ' ' . $item->property_name; ?>
		<div class="small-6 medium-4 cell flex-container" style="flex-direction:column;">
			<div id="<?php echo $id; ?>" class="kr-list-property card" data-id="<?php echo $item->id; ?>">
				<?php if ($item->imagefilename) : ?>
					<div class="kr-slideshow-wrapper">
						<?php echo KrMethods::render('properties.browse.card.slideshow.images',
						                             ['item'         => $item,
						                              'params'       => $params,
						                              'plink'        => $plink,
						                              'Translations' => $Translations
						                             ]); ?>
						<?php echo KrMethods::render('properties.browse.card.slideshow.pricing',
						                             ['item'           => $item,
						                              'currency'       => $currency,
						                              'byAvailability' => $byAvailability,
						                              'net'            => $net[$item->id] ?? 0,
						                              'discount'       => $discount[$item->id] ?? 0,
						                              'weekly'         => $weekly[$item->id] ?? $weekly[0],
						                              'plink'          => $plink
						                             ]);
						?>
						<?php echo KrMethods::render('properties.browse.card.slideshow.favicon',
						                             ['item' => $item,
						                              'favs' => $favs,
						                              'bar'  => $bar
						                             ]); ?>
					</div>
				<?php endif; ?>

				<a href="<?php echo $plink; ?>">
					<div class="card-section">
						<?php echo KrMethods::render('properties.browse.card.section',
						                             ['item'         => $item,
						                              'params'       => $params,
						                              'plink'        => $plink,
						                              'key_features' => $key_features,
						                              'Translations' => $Translations
						                             ]); ?>
					</div>
				</a>
			</div>
		</div>
	<?php endforeach; ?>
</div>