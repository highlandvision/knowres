<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use HighlandVision\KR\Translations;
use Joomla\CMS\HTML\HTMLHelper;

$this->allimages = KrFactory::getListModel('images')->getAllForProperty($this->property_id);

$width  = (int) $this->params->get('max_slideshow_thumb_width');
$height = (int) $this->params->get('max_slideshow_thumb_height');

if ($width < 100)
{
	$width  += $width / 2;
	$height = (int) $this->params->get('max_slideshow_thumb_height');
	$height += $height / 2;
}
else if ($width > 150 && $width <= 200)
{
	$width  -= $width / 5;
	$height = (int) $this->params->get('max_slideshow_thumb_height');
	$height -= $height / 5;
}
else if ($width > 200)
{
	$width  -= $width / 2.5;
	$height = (int) $this->params->get('max_slideshow_thumb_height');
	$height -= $height / 2.5;
}

$Translations = new Translations();
?>

<div class="modal" id="orderModal" aria-labelledby="orderModalLabel">
	<div class="modal-dialog modal-xl">
		<div class="modal-content" style="min-height:500px;">
			<div class="modal-header">
				<h2 class="modal-title" id="orderModalLabel">
					<?php echo KrMethods::plain('COM_KNOWRES_IMAGE_ORDER_MODAL_TITLE'); ?>
				</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div id="kr-media-images" class="col-lg-12">
						<?php foreach ($this->allimages as $i) : ?>
							<div data-id="<?php echo $i->id; ?>">
								<?php echo HTMLHelper::_('image',
									Media\Images::getImagePath($i->property_id, "thumb", $i->filename),
									$Translations->getText('image', $i->id, 'alt_text'), array(
										'class'  => 'ordering',
										'width'  => $width,
										'height' => $height
									));
								?>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
			<div id="property_id" style="display:none;">
				<?php echo $this->property_id; ?>
			</div>
		</div>
	</div>
</div>

<script>
	let element = document.getElementById('orderModal');
	element.addEventListener('hidden.bs.modal', function () {
		location.reload();
	});
</script>