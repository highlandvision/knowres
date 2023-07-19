/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

//TODO-v4.3 Replace inline code with this file

if (!window.location.origin)
	window.location.origin = window.location.protocol + "//" + window.location.host;
const livesite = window.location.origin + '/';

(function ($) {
	$(function () {
		$(document).on('open.zf.reveal', '[data-reveal]', function () {
			const $data = $('#stripe-data');
			const pk = $data.data('pk');
			const serviceId = $data.data('service');

			let stripe = Stripe(pk);
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
			let card = elements.create('card', {style: style});
			card.mount('#card-element');

			// Handle real-time validation errors from the card Element.
			card.addEventListener('change', function (event) {
				let displayError = document.getElementById('card-errors');
				if (event.error) {
					displayError.textContent = event.error.message;
				} else {
					displayError.textContent = '';
				}
			});

			let gatewayform = document.getElementById('kr-form-gateway');
			gatewayform.addEventListener('submit', function (event) {
				event.preventDefault();
				document.getElementById('card-errors').innerHTML = '<div id="disabled-overlay"><div class="ajaxloader"></div></div>';
				stripe.createPaymentMethod(
					'card',
					card
				).then(function (result) {
					if (result.error) {
						// Show error in payment form
						let displayError = document.getElementById('card-errors');
						displayError.textContent = result.error.message;
					} else {
						// Get payment intent from server
						fetch(gatewayform.action, {
							method:      'POST',
							mode:        "same-origin",
							credentials: "same-origin",
							headers:     {
								'Content-Type': 'application/json'
							},
							body:        JSON.stringify({
								payment_method_id: result.paymentMethod.id,
								service_id:        serviceId
							})
						}).
						then(function (result) {
							// Handle server response (see Step 3)
							result.json().then(function (json) {
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
				} else if (response.requires_action) {
					// Use Stripe.js to handle required card action
					handleAction(response);
				} else {
					// Show success page
					window.location.replace(livesite + response.success);
				}
			}

			function handleAction(response) {
				stripe.handleCardAction(
					response.payment_intent_client_secret
				).then(function (result) {
					if (result.error) {
						// Show error in payment form
						let displayError = document.getElementById('card-errors');
						displayError.textContent = result.error.message;
					} else {
						// Request actioned so process payment
						fetch(gatewayform.action, {
							method:  'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body:    JSON.stringify({
								payment_intent_id: result.paymentIntent.id,
								service_id:        serviceId
							})
						}).
						then(function (confirmResult) {
							return confirmResult.json();
						}).then(handleServerResponse);
					}
				});
			}
		});
	});
}(jQuery));