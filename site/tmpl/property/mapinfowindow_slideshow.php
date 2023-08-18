<?php
/**
 * @package     Know Reservations
 * @subpackage  Library
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

defined('_JEXEC') or die;

$path   = Media\Images::getImagePath($this->item->id) . '/';
$width  = $this->params->get('max_slideshow_width');
$height = $this->params->get('max_slideshow_height');
?>

<div class="kr-infowindow-slideshow kr-slick">
	<?php foreach ($this->images as $image): ?>
		<div>
			<?php echo HTMLHelper::_('image', $path . $image->filename, $image->alt_text,
				['width' => $width, 'height' => $height]); ?>
		</div>
	<?php endforeach; ?>
</div>