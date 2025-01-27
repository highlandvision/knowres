<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

extract($displayData);

/**
 * Layout variables
 *
 * @var mixed $item Property item.
 */
?>

<div class="flex-horizontal-sep no-margin-bottom">
	<div class="item">
		<p class="value"><?php echo $item->country_name; ?></p>
		<p class="sep">|</p>
	</div>
	<div class="item">
		<p class="value"><?php echo $item->region_name; ?></p>
		<p class="sep">|</p>
	</div>
	<div class="item">
		<p class="value"><?php echo $item->town_name; ?></p>
		<p class="sep">|</p>
	</div>
	<div class="item">
		<p class="value"><?php echo $item->property_area; ?></p>
	</div>
</div>