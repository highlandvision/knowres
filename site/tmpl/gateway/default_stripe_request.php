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
use Stripe\Stripe as StripeLib;

StripeLib::setApiKey($this->paymentData->secret_key);
?>

<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button>
<br>
<form action="<?php echo KrMethods::route('index.php?option=com_knowres&task=service.stripe'); ?>"
      class="stripe" id="kr-form-gateway" method="post">

	<div class="row">
		<div class="small-12 medium-10 medium-offset-1 columns">
			<div class="text-center">
				<h3><?php echo $this->paymentData->note; ?></h3>
				<p class="smaller">
					<?php echo KrMethods::plain('COM_KNOWRES_CONFIRM_REQUEST_NOTE'); ?>
				</p>
				<br>
				<div>
					<i class="fab fa-cc-visa fa-3x"></i>
					<i class="fab fa-cc-amex fa-3x"></i>
					<i class="fab fa-cc-mastercard fa-3x"></i>
				</div>
				<br>
			</div>

			<label for="card-element">
				Credit or debit card
			</label>
			<div id="card-element">
				<!-- a Stripe Element will be inserted here. -->
			</div>

			<!-- Used to display form errors -->
			<div id="card-errors" role="alert"></div>
			<br><br>

			<button id="card-button" class="button large expanded"
			        data-secret="<?php echo $this->paymentData->client_secret; ?>">
				<?php $payment_amount = Utility::displayValue($this->paymentData->amount,
					$this->paymentData->currency); ?>
				<?php echo KrMethods::sprintf('COM_KNOWRES_PAYMENT_CARD_SUBMIT', $payment_amount); ?>
			</button>
		</div>
	</div>
</form>

<script>
	(function () {
		'use strict';

		let stripe = Stripe("<?php echo $this->paymentData->publishable_key; ?>");
		let elements = stripe.elements();
		let style = {
			base:    {
				color:           '#32325d',
				fontFamily:      '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing:   'antialiased',
				fontSize:        '16px',
				'::placeholder': {
					color: '#aab7c4'
				},
			},
			invalid: {
				color:     '#cc0000',
				iconColor: '#cc0000'
			}
		};

		// Create an instance of the card Element
		// and add an instance of the card UI component into the `card-element` <div>
		let cardElement = elements.create('card', {style: style});
		cardElement.mount('#card-element');

		// let cardholderName = document.getElementById('cardholder-name');
		let cardButton = document.getElementById('card-button');
		let clientSecret = cardButton.dataset.secret;

		let gatewayform = document.getElementById('kr-form-gateway');
		gatewayform.addEventListener('submit', function (event) {
			event.preventDefault();
			document.getElementById('card-errors').innerHTML = '<div id="disabled-overlay"><div class="ajaxloader"></div></div>';
			stripe.handleCardSetup(
				clientSecret, cardElement, {
					payment_method_data: {
						billing_details: {name: 'Baldy Bain'}
					}
				}
			).then(function (result) {
				if (result.error) {
					let displayError = document.getElementById('card-errors');
					displayError.textContent = result.error.message;
				} else {
					// Push payment method to server
					fetch(gatewayform.action, {
						method:      'POST',
						mode:        "same-origin",
						credentials: "same-origin",
						headers:     {
							'Content-Type': 'application/json'
						},
						body:        JSON.stringify({
							payment_setup_id: result.setupIntent.payment_method,
							service_id: <?php echo $this->service_id; ?>
						})
					}).then(function (response) {
						response.json().then(function (json) {
							handleServerResponse(json);
						})
					});
				}
			});
		});

		function handleServerResponse(response) {
			if (response.error) {
				let displayError = document.getElementById('card-errors');
				displayError.textContent = response.error;
			} else {
				// Show success page
				window.location.replace(response.success);
			}
		}
	})();
</script>