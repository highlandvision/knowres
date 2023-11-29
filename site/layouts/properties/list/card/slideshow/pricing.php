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
 */

$booking_type = $net == 9999999 ? 0 : $item->booking_type;
$Currency     = new Currency();
$full         = !empty($discount) ? $net + $discount : 0;
$params       = KrMethods::getParams();
?>

<div class="kr-search-pricing flex-container">
	<div class="discounts">
		<?php $discounts = false; ?>
		<?php if ($item->discount_id > 0 && $params->get('search_discounts', 0)): ?>
			<?php $discounts = KrFactory::getListSiteModel('properties')->getDiscount($item->id); ?>
			<?php if (is_countable($discounts) && count($discounts)): ?>
				<?php echo KrMethods::render('properties.discountsearch', ['property_id' => $item->id,
			                                                               'discounts'   => $discounts,
			                                                               'currency'    => $currency
				]); ?>
				<?php $discounts = true; ?>
			<?php endif; ?>
		<?php endif; ?>

		<?php if (!$discounts): ?>
			<button aria-label="No discounts available" class="button secondary discounts-none" type="button">&nbsp;
			</button>
		<?php endif; ?>
	</div>
	<div class="price">
		<a class="button rate" href="<?php echo $plink; ?>" target="_blank">
			<?php if ($booking_type): ?>
				<?php if ($byAvailability): ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_SEARCH_PRICE',
					                              Utility::displayValue($net, $currency, false)); ?>
				<?php elseif ($weekly) : ?>
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM'); ?>
					<?php echo Utility::displayValue($net, $currency, false); ?>
				<?php else : ?>
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_NIGHT_FROM'); ?>
					<?php echo Utility::displayValue($net, $currency, false); ?>
				<?php endif; ?>

				<?php if ($full): ?>
					<span class="center">
				           &nbsp;&nbsp;<i class='fa-solid fa-cut fa-1x red'></i>
				           <del><?php echo Utility::displayValue($full, $currency, false); ?></del>
				        </span>
				<?php endif; ?>
			<?php else: ?>
				<?php if ($item->price_summary): ?>
					<?php if ($weekly) : ?>
						<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM'); ?>
						<?php echo ' '; ?>
						<?php echo $Currency->getSimpleValue($item->price_summary, $currency); ?>
					<?php else : ?>
						<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_PRICE_FROM_NIGHT'); ?>
						<?php echo ' '; ?>
						<?php echo $Currency->getSimpleValue($item->price_summary, $currency); ?>
					<?php endif; ?>
				<?php else: ?>
					<?php echo KrMethods::plain('COM_KNOWRES_SEARCH_REQUEST_RATES'); ?>
				<?php endif; ?>
			<?php endif; ?>
		</a>
	</div>
	<div class="bookingtype">
		<a class="button viewproperty" href="<?php echo $plink; ?>">
			<?php echo KrFactory::getAdminModel('property')::bookingTypeText($item->booking_type); ?>
			<i class='fa-solid fa-chevron-right' style="color:#fefefe;float:right;"></i>
		</a>
	</div>
</div>