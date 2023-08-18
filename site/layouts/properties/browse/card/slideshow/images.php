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

use HighlandVision\KR\Framework\KrMethods;
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
$image_order    = explode(',', $item->imageorder);
$path           = Media\Images::getImagePath($item->id) . '/';
$width          = $params->get('max_slideshow_width');
$height         = $params->get('max_slideshow_height');
$count          = 0;
$slick_id       = "kr-lazy-" . $item->id;

$display = [];
$index   = 0;
foreach ($image_order as $order)
{
	$display[(int) $order] = ['name' => $image_filename[$index], 'id' => $image_id[$index]];
	$index++;
}
ksort($display);
?>

<div id="<?php echo $slick_id; ?>" class="kr-properties-slideshow">
	<?php foreach ($display as $order => $image): ?>
		<?php $alt = $Translations->getText('image', $image['id'], 'alt_text'); ?>
		<a href="<?php echo $plink; ?>" target="_blank">
			<?php if (!$count): ?>
				<?php echo HTMLHelper::_('image', $path . $image['name'], $alt, [
					'width'  => $width,
					'height' => $height
				]); ?>
				<?php $count++; ?>
			<?php else: ?>
				<!--suppress RequiredAttributes -->
				<img data-lazy="<?php echo "/" . $path . $image['name']; ?>" width="<?php echo $width; ?>"
				     height="<?php echo $height; ?>" alt="<?php echo $alt; ?>">
			<?php endif; ?>
		</a>
	<?php endforeach; ?>
</div>