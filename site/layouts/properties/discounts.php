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
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var array    $items          Display Items.
 * @var array    $discounts      Available discounts keyed by property ID.
 * @var Registry $params         KR params.
 * @var string   $title          Page title.
 * @var array    $currencies     Property currencies.
 * @var int      $per_row_medium # per row for medium.
 * @var int      $per_row_large  # per row for large.
 */

$medium = 'medium-up-' . $per_row_medium;
$large  = 'large-up-' . $per_row_large;
?>

<h1><?php echo $title; ?></h1>

<div class="kr-properties">
	<div class="grid-x grid-margin-x small-up-1 <?php echo $medium; ?> <?php echo $large; ?>">
		<?php foreach ($items as $item): ?>
			<?php $plink = SiteHelper::buildPropertyLink($item->property_id); ?>
			<?php $image = Media\Images::getPropertyImageName($item->property_id); ?>

			<div class="column column-block">
				<a href="<?php echo $plink; ?>" aria-label="<?php echo $item->property_name; ?>">
					<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->property_id, 'solo', $image),
						$item->property_name, ['class'  => "relative",
						                       'width'  => $params->get('max_property_width'),
						                       'height' => $params->get('max_property_height')
						]);
					?>
				</a>

				<div class="content">
					<h3 class="item no-margin-bottom">
						<?php echo $item->property_name; ?>
					</h3>
					<p>
						<?php echo KrMethods::plain("COM_KNOWRES_COLON_AREA"); ?>
						<strong><?php echo $item->property_area . ', ' . $item->region_name; ?></strong>
						<?php echo KrMethods::plain("COM_KNOWRES_COLON_BEDROOMS"); ?>
						<strong><?php echo $item->bedrooms; ?></strong>
						<?php echo KrMethods::plain("COM_KNOWRES_COLON_SLEEPS"); ?>
						<strong><?php echo $item->sleeps; ?></strong>
						<?php if ($item->sleeps_extra) : ?>
							<strong>&nbsp;+&nbsp;<?php echo $item->sleeps_extra; ?></strong>
						<?php endif; ?>
					</p>

					<div class="callout small">
						<?php $pdiscounts = $discounts[$item->property_id]; ?>
						<?php foreach ($pdiscounts as $k => $discount): ?>
							<?php echo KrMethods::render('properties.discount', [
								'discount'    => $discount,
								'currencies'  => $currencies,
								'property_id' => $item->property_id
							]); ?>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>