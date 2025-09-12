<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Layout
 * @copyright   2018 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Media;
use HighlandVision\KR\Translations;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Registry\Registry;

extract($displayData);

/**
 * Layout variables
 *
 * @var false|object $item         Image data from DB.
 * @var Registry     $params       KR params.
 * @var string       $plink        Property link.
 * @var Translations $Translations Translations object.
 */

$image_filename = explode(',', $item->imagefilename);
$image_id       = explode(',', $item->imageid);
$path           = Media\Images::getImagePath($item->id) . '/';
$width          = $params->get('max_slideshow_width');
$height         = $params->get('max_slideshow_height');

$slick_id = "kr-lazy-" . $item->id;
$display  = [];
$index    = 0;

foreach ($image_id as $id) {
	$display[$index] = ['name' => $image_filename[$index], 'id' => $id];
	$index++;
}
?>

<div class="kr-properties-slideshow" id="<?php echo $slick_id; ?>">
	<?php foreach ($display as $order => $image): ?>
		<?php $alt = $Translations->getText('image', $image['id'], 'alt_text'); ?>
		<a href="<?php echo $plink; ?>" title="View">
			<?php echo HTMLHelper::_('image', $path . $image['name'], $alt, [
				'width'  => $width,
				'height' => $height
			]); ?>
		</a>
	<?php endforeach; ?>
</div>