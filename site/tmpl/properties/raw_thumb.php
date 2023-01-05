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

use HighlandVision\KR\Translations;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\SiteHelper;
use Joomla\CMS\HTML\HTMLHelper;

$Translations = new Translations();
?>

<div class="row thumb">
	<div class="medium-4 columns show-for-large-up" id="ptext">
		<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT1'); ?></p>
		<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT2'); ?></p>
		<p><?php echo KrMethods::plain('COM_KNOWRES_VIEW_THUMB_DEFAULT3'); ?></p>
	</div>
	<div class="large-8 columns">
		<ul class="small-block-grid-3 medium-block-grid-6 large-block-grid-6">
			<?php foreach ($this->items as $this->item) : ?>
				<?php $plink = SiteHelper::buildPropertyLink($this->item->id); ?>
				<?php $image = Media\Images::getPropertyImageName($this->item->id); ?>

				<li>
					<a href="<?php echo $plink; ?>" data-id="<?php echo $this->item->id; ?>">
						<?php echo HTMLHelper::_('image', Media\Images::getImagePath($this->item->id, 'solo', $image),
							$this->item->property_name, [
								'class'  => "thumbgrid",
								'width'  => $this->params->get('max_property_width'),
								'height' => $this->params->get('max_property_height')
							]);
						?>
					</a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>

<div style="display:none;">
	<?php foreach ($this->items as $this->item) : ?>
		<div class="thumboverview<?php echo $this->item->id; ?>">
			<h2><?php echo $this->item->property_name; ?></h2>
			<?php echo $Translations->getText('property', $this->item->id, 'p1'); ?>
		</div>
	<?php endforeach; ?>
</div>