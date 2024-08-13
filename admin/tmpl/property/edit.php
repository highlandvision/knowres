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
use Joomla\CMS\HTML\HTMLHelper;

/** @var HighlandVision\Component\Knowres\Administrator\View\Property\HtmlView $this */

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
   ->useScript('form.validate')
   ->useScript('com_knowres.admin-property')
   ->useScript('com_knowres.admin-gmap')
   ->useScript('com_knowres.admin-combogeo');
?>

<form action="<?php echo KrMethods::route('index.php?option=com_knowres&layout=edit&id=' . (int) $this->item->id); ?>"
      class="form-validate" id="property-form" method="post" name="adminForm">
	<?php
	echo HTMLHelper::_('uitab.startTabSet', 'propertyTabs',
	                   ['active' => 'basics', 'recall' => true, 'breakpoint' => 768]);
	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'basics', KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_BASICS'));
	echo $this->loadTemplate('basic');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'capacity', KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_BBG'));
	echo $this->loadTemplate('capacity');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'location',
	                   KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_LOCATION'));
	echo $this->loadTemplate('location');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'propertyfields',
	                   KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_FIELDS'));
	echo $this->loadTemplate('propertyfields');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'amenities',
	                   KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'));
	echo $this->loadTemplate('amenities');
	echo HTMLHelper::_('uitab.endTab');

	if ($this->params->get('property_rooms', 0)) {
		echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'rooms', KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_ROOMS'));
		echo $this->loadTemplate('rooms');
		echo HTMLHelper::_('uitab.endTab');
	}

	echo HTMLHelper::_('uitab.addTab', 'propertyTabs', 'checkinout',
	                   KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_CHECKINOUT'));
	echo $this->loadTemplate('checkinout');
	echo HTMLHelper::_('uitab.endTab');
	echo HTMLHelper::_('uitab.endTabSet');
	?>
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>