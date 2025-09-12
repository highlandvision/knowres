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
?>

<?php foreach ($discounts as $d): ?>
	<div class="grid-x grid-margin-x">
		<div class="small-12 meium-6 large-4">
			<div class="list-discount">
				<?php
				$value = $d->is_pc ? (float) $d->discount . '%' : Utility::displayValue($d->discount, $currency);
				?>
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
			</div>
		</div>
	</div>
<?php endforeach; ?>