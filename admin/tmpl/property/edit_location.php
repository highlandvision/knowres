<?php
/**
 * @package     KR
 * @subpackage  Admin views
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\HtmlView $this */

HTMLHelper::script(Utility::getGmapsURL());

$this->lat  = $this->item->lat;
$this->lng  = $this->item->lng;
$this->zoom = $this->params->get('default_zoom', 12);
if (is_null($this->lat))
{
	$this->lat = $this->params->get('default_lat');
	$this->lng = $this->params->get('default_lng');
}
if (!$this->item->map_max_zoom)
{
	$this->item->map_max_zoom = $this->zoom;
}

$this->form->setFieldAttribute('property_area', 'autocomplete', "off");
$this->form->setFieldAttribute('region_id', 'required', "true");
$this->form->setFieldAttribute('town_id', 'required', "true");
?>

<div class="row">
	<div class="col-xl-9">
		<?php echo $this->form->renderFieldset('location'); ?>

		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_MAP'); ?></legend>
		<div>
			<a href="#" id="geocodeAddress"><?php echo KrMethods::plain('COM_KNOWRES_GEOCODE_ADDRESS'); ?></a>
			<br>
			<?php echo KrMethods::plain('COM_KNOWRES_GEOCODE_ADDRESS_INSTRUCTIONS'); ?>
		</div>
		<br>
		<div class="row">
			<div class="col">
				<div class="control-label"><?php echo $this->form->getLabel('lat'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('lat'); ?></div>
			</div>
			<div class="col">
				<div class="control-label"><?php echo $this->form->getLabel('lng'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('lng'); ?></div>
			</div>
			<div class="col">
				<div class="control-label"><?php echo $this->form->getLabel('map_max_zoom'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('map_max_zoom'); ?></div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<br>
				<div id="mapdrag" data-lat="<?php echo $this->lat; ?>" data-lng="<?php echo $this->lng; ?>"
				     data-maxzoom="<?php echo $this->item->map_max_zoom; ?>" data-zoom="<?php echo $this->zoom; ?>">
				</div>
			</div>
		</div>

		<legend><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_LEGEND_MAP_ACTUAL'); ?></legend>
		<?php echo $this->form->renderFieldset('mapactual'); ?>
	</div>
</div>
