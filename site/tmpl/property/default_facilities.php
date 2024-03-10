<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
?>

<!--  Features -->
<?php if (!empty($this->features) && count($this->features)): ?>
	<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'); ?></h3>
	<div class="rooms">
		<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
	</div>
<?php endif; ?>

<!--  Rooms -->
<?php if (!empty($this->rooms) && count($this->rooms)): ?>
<!--	<h3 class="header">--><?php //echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_ROOMS'); ?><!--</h3>-->
	<div class="rooms">
		<?php echo KrMethods::render('property.rooms', ['rooms' => $this->rooms]); ?>
	</div>
<?php endif; ?>

<!--  Text Fields -->
<?php foreach($this->fields as $pf): ?>
	<?php if (!$pf->special && $pf->id > 1 ): ?>
		<?php $label = 'hp' . $pf->id; ?>
		<?php $field = 'p' . $pf->id; ?>
		<?php if (!empty(strip_tags($this->item->{$field}))): ?>
			<h3 class="header"><?php echo $this->item->{$label}; ?></h3>
			<?php echo $this->item->{$field}; ?>
		<?php endif; ?>
	<?php endif; ?>
<?php endforeach; ?>