<?php
/**
 * @package    Know Reservations
 * @subpackage Site View
 * @copyright  2018 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;

extract($displayData);
/**
 * Layout variables
 *
 * @var string $order     Filter order.
 * @var string $heading   Heading for filters.
 * @var string $value1    Order ID 1.
 * @var string $value2    Order ID 2.
 * @var string $sort_type Alpha / Numeric.
 */

$order     = $displayData['order'];
$heading   = $displayData['heading'];
$value1    = $displayData['value1'];
$value2    = $displayData['value2'];
$sort_type = $displayData['sorttype'];

$id1 = 'order' . $value1;
$id2 = 'order' . $value2;

if ($sort_type == 'a')
{
	$label1 = KrMethods::plain('COM_KNOWRES_SORT_A_Z');
	$label2 = KrMethods::plain('COM_KNOWRES_SORT_Z_A');
}
else
{
	$label1 = KrMethods::plain('COM_KNOWRES_SORT_LOW_HIGH');
	$label2 = KrMethods::plain('COM_KNOWRES_SORT_HIGH_LOW');
}
?>

<ul class="filter-sort-list">
	<li class="head"><?php echo $heading ?></li>
	<li>
		<input type="radio" id="<?php echo $id1; ?>" class="radioover getResponseSearch"
		       name="ordering" <?php echo $order == $value1 ? 'checked="checked"' : ''; ?>
		       value="<?php echo $value1; ?>" data-action="order" data-action-value="<?php echo $value1; ?>">
		<label class="radiolabel" for="<?php echo $id1; ?>">
			<?php echo $label1; ?>
		</label>
	</li>
	<li>
		<input type="radio" id="<?php echo $id2; ?>" class="radioover getResponseSearch"
		       name="ordering" <?php echo $order == $value2 ? 'checked="checked"' : ''; ?>
		       value="<?php echo $value2; ?>" data-action="order" data-action-value="<?php echo $value2; ?>">
		<label class="radiolabel" for="<?php echo $id2; ?>">
			<?php echo $label2; ?>
		</label>
	</li>
</ul>