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

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Media;
use Joomla\CMS\HTML\HTMLHelper;

$soloPath = Media\Images::getImageAbsPath($this->item->id, 'solo');
$soloPath .= "/*.{jpg,gif,png,JPG,GIF,PNG}";
$files    = glob($soloPath, GLOB_BRACE);
$params   = KrMethods::getParams();

if (count($files))
{
	$path_parts  = pathinfo($files[0]);
	$this->image = $path_parts['filename'] . "." . $path_parts['extension'];
	$text        = KrMethods::plain('COM_KNOWRES_PROPERTY_IMAGE_REPLACE_DSC');
}
else
{
	$this->image = "";
	$text        = KrMethods::plain('COM_KNOWRES_PROPERTY_IMAGE_UPLOAD_DSC');
}
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres'); ?>"
      class="form-vertical form-validate" enctype="multipart/form-data" id="propertyimage-form" method="post"
      name="adminForm">

	<fieldset class="adminform">
		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_IMAGE_SEARCH'); ?></legend>
		<br>
		<div class="row">
			<div class="col-lg-3">
				<div class="control-group">
					<div class="control-label" style="width:auto;">
						<?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_IMAGE_UPLOAD_FORM_DSC'); ?>
					</div>
					<div class="controls" style="margin-top:10px;margin-bottom:10px;">
						<input type='file' name="image" value="">
					</div>
				</div>
				<button type="submit" class="btn btn-primary">
					<?php echo $text; ?>
				</button>
			</div>
			<?php if ($this->image) : ?>
				<div class="col-lg-9" style="margin-top:10px;">
					<?php echo HTMLHelper::_('image', Media\Images::getImagePath($this->item->id, 'solo', $this->image),
						$this->item->property_name, [
							'width'  => $params->get('max_property_width'),
							'height' => $params->get('max_property_height')
						]); ?>
				</div>
			<?php endif; ?>
		</div>
	</fieldset>

	<input type="hidden" name="id" value="<?php echo $this->item->id; ?>">
	<input type="hidden" name="task" value="property.saveimage">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>