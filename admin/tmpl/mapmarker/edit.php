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
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

HTMLHelper::script(trim(Utility::getGmapsURL()));

/** @var HighlandVision\Component\Knowres\Administrator\View\Mapmarker\HtmlView $this */
$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-combogeo')
   ->useScript('com_knowres.admin-gmap')
   ->useScript('webcomponent.field-fancy-select')
   ->usePreset('choicesjs');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      aria-label="<?php echo $this->form_aria_label; ?>" class="form-validate" enctype="multipart/form-data"
      id="mapmarker-form" method="post" name="adminForm">

	<div class="main-card">
		<div class="row">
			<div class="col-xl-9 col-xxl-8">
				<?php echo $this->form->renderFieldset('krdata'); ?>
				<?php echo KrMethods::render('form.field.geocode', [
					'label' => KrMethods::plain('COM_KNOWRES_FORM_MAPMARKER_GEOCODE'),
					'f1'    => $this->form->renderField('lat'),
					'f2'    => $this->form->renderField('lng'),
					'lat'   => $this->lat,
					'lng'   => $this->lng,
					'zoom'  => $this->zoom
				]);
				?>
			</div>
			<div class="col-xl-3 offset-xxl-1">
				<?php echo KrMethods::render('joomla.edit.global', $this); ?>
			</div>
		</div>
	</div>

	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>