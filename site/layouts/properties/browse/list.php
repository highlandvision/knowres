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
 * @var bool   $favicon        Property is favourite.
 * @var bool   $saved          Property is favourite.
 * @var string $view           Selected view.
 * @var bool   $byAvailability Search by availability.
 * @var array  $net            Net rates.
 * @var array  $discount       Discount value.
 * @var array  $rating         Review value.
 * @var bool   $one_region     True if all properties are in 1 region
 * @var array  $key_features   Features assigned for filtering
 */

$Translations = new Translations();

$weekly  = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
?>

<div class="row" data-equalizer data-equalize-by-row="true">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $id = 'kr-property-' . $item->id; ?>
		<?php $title = KrMethods::plain('COM_KNOWRES_VIEW') . ' ' . $item->property_name; ?>
		<div class="small-6 medium-4 columns">
			<div id="<?php echo $id; ?>" class="kr-list-property card">
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
						<?php if ($favicon): ?>
							<?php echo KrMethods::render('properties.browse.card.slideshow.favicon',
							                             ['item'  => $item,
							                              'saved' => $saved,
							                              'view'  => $view
							                             ]); ?>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<a href="<?php echo $plink; ?>" target="_blank" data-equalizer-watch>
					<div class="card-section">
						<?php echo KrMethods::render('properties.browse.card.section',
						                             ['item'         => $item,
						                              'params'       => $params,
						                              'plink'        => $plink,
						                              'one_region'   => $one_region,
						                              'key_features' => $key_features,
						                              'Translations' => $Translations
						                             ]); ?>
					</div>
				</a>
			</div>
		</div>
	<?php endforeach; ?>
</div>