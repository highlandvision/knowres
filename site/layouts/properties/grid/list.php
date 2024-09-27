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
use HighlandVision\KR\Utility;

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
$weekly       = KrFactory::getListModel('propertysettings')->getOneSetting('tariffChargesStoredWeeklyYesNo');
$medium       = Utility::setColumns($params->get('per_row_medium', 2), 'medium');
$large        = Utility::setColumns($params->get('per_row_large', 3), 'large');
?>

<div class="grid-x grid-margin-x" id="kr-grid">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $id = 'kr-property-' . $item->id; ?>
		<?php $title = KrMethods::plain('COM_KNOWRES_VIEW') . ' ' . $item->property_name; ?>
		<div class="small-12 <?php echo $medium; ?> <?php echo $large; ?> cell flex-container">
			<div id="<?php echo $id; ?>" class="kr-list-property card" data-id="<?php echo $item->id; ?>">
				<?php if ($item->imagefilename) : ?>
					<div class="kr-slideshow-wrapper">
						<?php echo KrMethods::render('properties.grid.card.slideshow.images',
							['item'         => $item,
							 'params'       => $params,
							 'plink'        => $plink,
							 'Translations' => $Translations
							]); ?>
						<?php echo KrMethods::render('properties.grid.card.slideshow.favicon',
							['item' => $item,
							 'favs' => $favs,
							 'bar'  => $bar
							]); ?>
					</div>
				<?php endif; ?>

				<?php echo KrMethods::render('properties.grid.card.slideshow.pricing',
					['item'           => $item,
					 'currency'       => $currency,
					 'byAvailability' => $byAvailability,
					 'net'            => $net[$item->id] ?? 0,
					 'discount'       => $discount[$item->id] ?? 0,
					 'weekly'         => $weekly[$item->id] ?? $weekly[0],
					 'plink'          => $plink
					]);
				?>

				<a class="suppress-underline" href="<?php echo $plink; ?>">
					<div class="card-section">
						<?php echo KrMethods::render('properties.grid.card.section',
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