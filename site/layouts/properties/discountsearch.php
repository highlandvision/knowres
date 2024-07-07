<?php
/**
 * @package     Know Reservations
 * @subpackage  Layout
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\TickTock;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var int   $property_id ID of property.
 * @var array $discounts   Available discounts.
 * @var array $currencies  Property currencies.
 */

$toggle = "kr-discount-data" . $property_id;
$count = 0;
?>

<button aria-label="<?php echo KrMethods::plain('COM_KNOWRES_HOVER_FOR_DISCOUNTS'); ?>"
        class="button expanded accent" type="button" data-toggle="<?php echo $toggle; ?>">
	<i class='fa-solid fa-xl fa-tags'></i>
</button>
<div class="dropdown-pane" id="<?php echo $toggle; ?>" data-dropdown data-hover="true" data-hover-pane="true"
     data-position="top" data-alignment="left">
	<?php foreach ($discounts as $d): ?>
		<?php $value = $d->is_pc ? (float) $d->discount . '%' : Utility::displayValue($d->discount, $currency); ?>
		<?php if ($d->model == 1): ?>
			<?php $text1 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_DATE_RANGE_1', $value); ?>
			<?php $text2 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_DATE_RANGE_2',
				$d->param1 ? TickTock::displayDate($d->param1, 'j M Y')
					: strtolower(KrMethods::plain('COM_KNOWRES_NOW')),
				TickTock::displayDate($d->param2, 'j M Y')); ?>
		<?php elseif ((int) $d->param1): ?>
			<?php $text1 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_EARLY_BIRD_1', $value); ?>
			<?php $text2 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_EARLY_BIRD_2',
				TickTock::modifyDays('now', $d->param1, '+', 'j M Y')); ?>
		<?php else: ?>
			<?php $text1 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_LAST_MINUTE_1', $value); ?>
			<?php $text2 = KrMethods::sprintf('COM_KNOWRES_DISCOUNT_LAST_MINUTE_2',
				TickTock::modifyDays('now', $d->param2, '+', 'j M Y')); ?>
		<?php endif; ?>

		<?php if ($count): ?>
			<?php echo '----------'; ?>
		<?php endif; ?>
		<div class="discount-data">
			<?php echo $text1; ?><br>
			<span><?php echo $text2; ?></span>
		</div>
		<?php $count++; ?>
	<?php endforeach; ?>
</div>