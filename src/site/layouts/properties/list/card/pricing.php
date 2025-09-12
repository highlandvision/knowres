<?php
/**
 * @package    Know Reservations
 * @subpackage Site Layout
 * @copyright  2018 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Currency;
use HighlandVision\KR\Framework\KrFactory;
use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

extract($displayData);
/**
 * Layout variables
 *
 * @var false|object $item           Property Item.
 * @var string       $currency       Rates / property currency.
 * @var bool         $byAvailability Search by availabbility.
 * @var float        $net            Net rates.
 * @var float        $discount       Discount value.
 * @var bool         $weekly         True for weekly rates.
 * @var int          $nights         Nights
 */

$booking_type = $net == 9999999 ? 0 : $item->booking_type;
$Currency     = new Currency();
$full         = !empty($discount) ? $net + $discount : 0;
$params       = KrMethods::getParams();
?>

<div class="pricing">
	<div class="heading">
		<?php echo KrFactory::getAdminModel('property')::bookingTypeText($item->booking_type, true); ?>
	</div>
	<?php if ($booking_type): ?>
		<?php if ($byAvailability): ?>
			<div><?php echo KrMethods::sprintf('COM_KNOWRES_NIGHTS_STAY', $nights); ?></div>
			<div class="rate">
				<?php echo Utility::displayValue($net, $currency, false); ?>
			</div>
		<?php elseif ($weekly) : ?>
			<div><?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM'); ?></div>
			<div class="rate">
				<?php echo Utility::displayValue($net, $currency, false); ?>
			</div>
		<?php else : ?>
			<div><?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_NIGHT_FROM'); ?></div>
			<div class="rate"><?php echo Utility::displayValue($net, $currency, false); ?></div>
		<?php endif; ?>

		<?php if ($full): ?>
			<div class="discount">
				<i class="fa-solid fa-cut fa-sm"></i>
				<del><?php echo Utility::displayValue($full, $currency, false); ?></del>
			</div>
		<?php endif; ?>
	<?php else: ?>
		<div class="summary">
			<?php if ($item->price_summary): ?>
				<?php if ($weekly) : ?>
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM'); ?>
					<?php echo ' '; ?>
					<?php echo $Currency->getSimpleValue($item->price_summary, $currency); ?>
				<?php else : ?>
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_NIGHT_FROM'); ?>
					<br>
					<?php echo $Currency->getSimpleValue($item->price_summary, $currency); ?>
				<?php endif; ?>
			<?php else: ?>
				<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST_RATES'); ?>
			<?php endif; ?>
		</div>
	<?php endif; ?>
</div>
<div class="view">
	<?php echo KrMethods::plain('COM_KNOWRES_VIEW'); ?>
	&nbsp;<i class="fa-solid fa-lg fa-circle-chevron-right"></i>
</div>