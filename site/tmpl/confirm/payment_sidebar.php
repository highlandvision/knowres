<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

/** @noinspection PhpUnhandledExceptionInspection */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;

$address = Utility::formatAddress($this->guestData->address1, $this->guestData->address2,
	$this->guestData->postcode, $this->guestData->town, $this->guestData->region_id,
	$this->guestData->country_id, '<br>');
?>

<div class="summary callout formbg text-center">
	<h2 class="color-primary">
		<?php if ($this->property->booking_type == 2) : ?>
			<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_BOOK_PAYABLE_NOW'); ?>
			<br>
			<span class="paynow bigger">
				<?php echo Utility::displayValue($this->contractData->deposit, $this->contractData->currency); ?>
			</span>
		<?php else: ?>
			<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_PAYABLE_NOW'); ?>
			<br>
			<span class="paynow">
				<?php echo Utility::displayValue($this->contractData->deposit, $this->contractData->currency); ?>
			</span>
		<?php endif; ?>
	</h2>

	<h3 style="margin-bottom:0;">
		<?php echo $this->property->property_name; ?>
	</h3>

	<div class="total-summary">
		<?php echo KrMethods::render('confirm.summary', ['data' => $this->contractData]); ?>
	</div>
	<br>
	<h3 class="no-margin-bottom">
		<?php echo KrMethods::plain('COM_KNOWRES_YOUR_DETAILS'); ?>
	</h3>

	<p>
		<?php echo $this->guestData->firstname . ' ' . $this->guestData->surname; ?>
		<br>
		<?php echo $address; ?>
		<?php if ($this->guestData->email) : ?>
			<br><br>
			<span>
				<i class='fa-solid fa-envelope'></i> <?php echo $this->guestData->email; ?>
			</span>
			<br>
		<?php endif; ?>

		<?php if ($this->guestData->mobile) : ?>
			<span>
				<i class='fa-solid fa-mobile-alt'></i>
				<?php echo Utility::formatPhoneNumber($this->guestData->mobile,
					$this->guestData->mobile_country_id); ?>
			</span>
		<?php endif; ?>
	</p>
</div>

<div class="summary callout text-center">
	<div class="show-for-medium">
		<?php echo KrMethods::loadInternal('{loadposition propertyview, html5}'); ?>
	</div>
</div>