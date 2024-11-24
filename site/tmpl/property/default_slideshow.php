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

$path      = Media\Images::getImagePath($this->item->id) . '/';
$thumbpath = Media\Images::getImagePath($this->item->id, "thumb") . '/';
$type      = $this->params->get('property_slideshow', 'centered');
$width     = $this->params->get('max_slideshow_width');
$height    = $this->params->get('max_slideshow_height');
$thumbs    = $this->params->get('property_thumbs', 0);

$mixed = "";
$landscape = $this->params->get('crop_slideshow', 1);
if (!$landscape) {
	$mixed ="mixed-width";
}
?>

<div id="kr-property-slideshow" class="kr-slick <?php echo $type; ?> <?php echo $mixed; ?>"
     data-type="<?php echo $type;
?>"
     data-thumbs="<?php echo $thumbs; ?>">
	<?php foreach ($this->images as $image): ?>
		<div>
			<?php
			if (!$this->params->get('crop_slideshow', 1)) {
				list ($width, $height) = getimagesize($path . $image->filename);
			} else {
				$width  = $this->params->get('max_slideshow_width');
				$height = $this->params->get('max_slideshow_height');
			}
			?>

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
	<?php $thumb_width = $this->params->get('max_slideshow_thumb_width'); ?>
	<?php $thumb_height = $this->params->get('max_slideshow_thumb_height'); ?>
	<div id="kr-property-thumbs" class="kr-slick hide-for-medium-down" data-twidth="<?php echo $thumb_width; ?>">
		<?php foreach ($this->images as $image): ?>
			<div>
				<?php echo HTMLHelper::_('image', $thumbpath . $image->filename, $image->alt_text, [
					'width'  => $thumb_width,
					'height' => $thumb_height
				]); ?>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>