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

use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

$path   = Media\Images::getImagePath($this->item->id) . '/';
$type   = 'inatab ' . $this->params->get('property_slideshow');
$width  = $this->params->get('max_slideshow_width');
$height = $this->params->get('max_slideshow_height');
$thumbs = $this->params->get('property_thumbs', 0);
if ($thumbs) {
	$thumbpath    = Media\Images::getImagePath($this->item->id, 'thumb') . '/';
	$thumb_height = $this->params->get('max_slideshow_thumb_height');
	$thumb_width  = $this->params->get('max_slideshow_thumb_width');
}
?>

	<div id="kr-property-slideshow" class="kr-slick <?php echo $type; ?>" data-type="<?php echo $type; ?>"
	     data-thumbs="<?php echo $thumbs; ?>">
		<?php foreach ($this->images as $image): ?>
			<div>
				<?php echo HTMLHelper::_('image', $path . $image->filename, $image->alt_text, [
					'width'  => $width,
					'height' => $height
				]); ?>

				<?php if (trim($image->description)): ?>
					<p><?php echo $image->description; ?></p>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>
	</div>

<?php if ($thumbs): ?>
	<div id="kr-property-thumbs" class="kr-slick show-for-large" data-twidth="<?php echo $thumb_width; ?>">
		<?php foreach ($this->images as $image): ?>
			<div>
				<?php echo HTMLHelper::_('image', $thumbpath . $image->filename, $image->alt_text, array(
					'width'  => $thumb_width,
					'height' => $thumb_height
				)); ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>