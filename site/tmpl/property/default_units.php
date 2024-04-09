<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
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

?>

<div class="grid-x grid-margin-x">
	<?php foreach ($this->units as $unit): ?>
		<?php
		$plink = SiteHelper::buildPropertyLink($unit->id);
		$image = Media\Images::getPropertyImageName($unit->id);
		?>

		<div class="small-12 medium-6 cell">
			<a href="<?php echo $plink; ?>" title="<?php echo $unit->property_name; ?>">
				<?php echo HTMLHelper::_('image',
				                         Media\Images::getImagePath($unit->id, 'solo', $image),
				                         $unit->property_name,
				                         [
					                         'class'  => "relative",
					                         'width'  => $this->params->get('max_property_width'),
					                         'height' => $this->params->get('max_property_height')
				                         ]);
				?>
			</a>
			<div class="callout small">
				<h5 class="h6 no-margin-bottom">
					<a href="<?php echo $plink; ?>" class="suppress-underline"
					   title="<?php echo $unit->property_name; ?>">
						<?php echo $unit->property_name; ?>
					</a>
				</h5>
				<small>
					<?php echo KrMethods::plain("COM_KNOWRES_COLON_BEDROOMS"); ?>
					<?php echo $unit->bedrooms; ?>
					&nbsp;<?php echo KrMethods::plain("COM_KNOWRES_COLON_SLEEPS"); ?>
					<?php echo $unit->sleeps; ?>
					<?php if ($unit->sleeps_extra): ?>
						+ <?php echo $unit->sleeps_extra; ?>
					<?php endif; ?>
				</small>
			</div>
		</div>
	<?php endforeach; ?>
</div>