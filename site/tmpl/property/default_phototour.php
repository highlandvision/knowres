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
$width  = $this->params->get('max_slideshow_width');
$height = $this->params->get('max_slideshow_height');
?>

<div class="items basicgrid row small-up-1">
	<?php foreach ($this->images as $image): ?>
		<div class="column column-block">
			<?php echo HTMLHelper::_('image', $path . $image->filename, $image->description, [
				'width' => '100%'
			]);
			?>

			<p class="smaller">
				<?php if ($image->description): ?>
					<?php echo $image->description; ?>
				<?php else: ?>
					<?php echo $this->item->property_name . ' - ' . $this->item->region_name . ', ' . $this->item->country_name; ?>
				<?php endif; ?>
			</p>
		</div>
	<?php endforeach; ?>
</div>