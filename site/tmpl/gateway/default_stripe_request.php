<?php
/**
 * @package     Know Reservations
 * @subpackage  Site Controller
 * @copyright   2020 Highland Vision. All rights reserved.
 * @license     See the file "LICENSE.txt" for the full license governing this code.
 * @author      Hazel Wilson <hazel@highlandvision.com>
 */

defined('_JEXEC') or die;

use HighlandVision\KR\Framework\KrMethods;
use HighlandVision\KR\Utility;
use Stripe\Stripe as StripeLib;

StripeLib::setApiKey(trim($this->paymentData->secret_key));
?>

<form id="kr-form-gateway" class="kr-stripe">
	<div class="grid-x grid-padding-x">
		<div class="small-12 medium-10 medium-offset-1 cell">
			<div class="text-center">
				<h4><?php echo $this->paymentData->note; ?></h4>
				<div class="callout small alert">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_NOTE'); ?>
				</div>
			</div>
			<br>
			<div id="payment-element">
				<!--Stripe.js injects the Payment Element-->
			</div>
			<br>
			<button id="submit" class="button expanded">
				<div class="spinner hidden" id="spinner"></div>
				<span id="button-text">
					<?php $payment_amount = Utility::displayValue($this->paymentData->amount,
					                                              $this->paymentData->currency); ?>
					<?php echo KrMethods::sprintf('COM_KNOWRES_PAYMENT_CARD_SUBMIT', $payment_amount); ?>
			</button>
			<div id="payment-message" class="hidden"></div>
		</div>
	</div>
</form>
<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button><br>

<div id="stripe-key" data-key="<?php echo trim($this->paymentData->publishable_key); ?>"></div>