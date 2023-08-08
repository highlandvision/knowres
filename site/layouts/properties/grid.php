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

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\SiteHelper;
use HighlandVision\KR\Translations;
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var array    $items          Property items.
 * @var Registry $params         KR params.
 * @var string   $currency       Property currency.
 * @var string   $favicon        Fav icon.
 * @var array    $saved          Saved favourites.
 * @var string   $view           View to display.
 * @var bool     $byAvailability Availabolity search?
 */

$Translations = new Translations();
?>

<div class="kr-property row small-up-1 medium-up-2 large-up-2">
	<?php foreach ($items as $item) : ?>
		<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
		<?php $title = 'View ' . $item->property_name; ?>
		<?php $id = 'kr-property-' . $item->id; ?>

		<div id="<?php echo $id; ?>" class="<?php echo $view; ?> column column-block">
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
				</div>
			<?php endif; ?>

			<a href="<?php echo $plink; ?>" title="<?php echo $item->property_name; ?>">
				<div class="content">
					<h3><?php echo $item->property_name; ?></h3>
					<h5><?php echo $item->bedrooms . 'BR / ' . $item->type_name; ?></h5>
				</div>
			</a>
		</div>
	<?php endforeach; ?>
</div>