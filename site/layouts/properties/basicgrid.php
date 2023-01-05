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
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Registry\Registry;

extract($displayData);
/**
 * Layout variables
 *
 * @var array    $items  Property Items.
 * @var Registry $params KR params.
 * @var string   $title  Page title.
 */
?>

<h1><?php echo $title; ?></h1>

<?php if (!count($items)): ?>
	<h4><?php echo KrMethods::plain('COM_KNOWRES_BROWSE_CATEGORY_NONE'); ?></h4>
	<?php return; ?>
<?php endif; ?>

<div class="kr-properties">
	<div class="items basicgrid row small-up-1 medium-up-2 large-up-3 text-center">
		<?php foreach ($items as $item): ?>
			<?php $plink = SiteHelper::buildPropertyLink($item->id); ?>
			<?php $image = Media\Images::getPropertyImageName($item->id); ?>

			<div class="column column-block">
				<a href="<?php echo $plink; ?>" title="<?php echo $item->property_name; ?>">
					<?php echo HTMLHelper::_('image', Media\Images::getImagePath($item->id, 'solo', $image),
						$item->property_name, [
							'class'  => 'relative',
							'width'  => $params->get('max_property_width'),
							'height' => $params->get('max_property_height')
						]);
					?>

					<div class="content">
						<h2 class="item">
							<?php echo $item->property_name; ?>
						</h2>
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
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	</div>
</div>
