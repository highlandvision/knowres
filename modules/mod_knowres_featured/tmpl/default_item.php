<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\HTML\HTMLHelper;

$KRparams = KrMethods::getParams();
?>

<div class="small-12 medium-4 cell">
	<a href="<?php echo $item['plink']; ?>" class="property text-left suppress-underline" title="<?php echo $item['property_name']; ?>">
		<div class="image-wrapper">
			<?php echo HTMLHelper::_('image',
			                         Media\Images::getImagePath($item['id'], 'solo', $item['image']),
			                         $item['property_name'],
			                         [
				                         'width'  => $KRparams->get('max_property_width'),
				                         'height' => $KRparams->get('max_property_height')
			                         ]);
			?>
			<?php require ModuleHelper::getLayoutPath('mod_knowres_featured',
				                                          $params->get('layout', 'default') . '_pricesummary'); ?>
		</div>

		<div class="content no-margin-bottom">
			<h4 class="flexible"><?php echo $item['property_name']; ?></h4>
			<?php $clean = strip_tags($item['text']); ?>
			<p><?php echo $clean; ?></p>
			<div class="occupancy">
				<i class='fa-solid fa-female fa-lg font-hilite'></i>
				<i class='fa-solid fa-male fa-lg font-hilite'></i>
				<?php echo '&nbsp;' . ($item['sleeps']) . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_PERSONS'); ?>
				<?php echo ' | ' . ($item['bedrooms']) . ' ' . KrMethods::plain('MOD_KNOWRES_FEATURED_BEDROOMS'); ?>
			</div>
		</div>
	</a>
</div>