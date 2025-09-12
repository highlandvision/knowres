<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

use HighlandVision\KR\Framework\KrMethods;

defined('_JEXEC') or die;
?>

<?php echo KrMethods::render('property.area_beds_sleeps', ['item' => $this->item]); ?>

<h3><?php echo $this->item->tagline; ?></h3>

<div class="description">
	<?php echo $this->item->p1; ?>
</div>

<!--  Features -->
<?php if (!empty($this->features) && count($this->features)): ?>
	<h3 class="header"><?php echo KrMethods::plain('COM_KNOWRES_PROPERTY_TAB_AMENITIES'); ?></h3>
	<div class="facilities">
		<?php echo KrMethods::render('property.features', ['features' => $this->features]); ?>
	</div>
<?php endif; ?>