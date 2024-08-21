// noinspection JSIgnoredPromiseFromCall,JSUnresolvedReference
// noinspection JSIgnoredPromiseFromCall

/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2024 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

stripe = Stripe(document.getElementById('stripe-key').dataset.key);
let pt;
let elements;

initializeStripe();
checkStatus();

document
    .querySelector("#kr-form-gateway")
    .addEventListener("submit", handleSubmit);

// Fetches a payment intent or setup intent and captures the client secret
async function initializeStripe() {
    const fetchurl = 'index.php?option=com_knowres&task=service.stripecreate';
    let {clientSecret, paymentType} = await fetch(fetchurl, {
        method: "POST", headers: {"Content-Type": "application/json"},
    }).then((r) => r.json());

    pt = paymentType;
    elements = stripe.elements({clientSecret});
    const paymentElementOptions = {
        layout: "tabs",
    };

    let paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const $url = 'https://' + window.location.hostname + '/index.php?option=com_knowres&task=service.stripecomplete';
    if (pt === 'OBR') {
        const {error} = await stripe.confirmSetup({
            elements, confirmParams: {
                return_url: $url,
            },
        });
    } else {
        const {error} = await stripe.confirmPayment({
            elements, confirmParams: {
                return_url: $url,
            },
        });
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("Sorry an unexpected error has occurred. Please check your details. If the error continues " +
            "please contact us for help.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
    let clientSecret;
    if (pt === 'OBR') {
        clientSecret = new URLSearchParams(window.location.search).get("setup_intent_client_secret");
    } else {
        clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    }

    if (!clientSecret) {
        return;
    }

    if (pt === 'OBR') {
        const {setupIntent} = await stripe.retrieveSetupIntent(clientSecret);
        switch (setupIntent.status) {
            case "succeeded":
                showMessage("Payment succeeded!");
                break;
            case "processing":
                showMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                showMessage("Your payment was not successful, please try again.");
                break;
            default:
                showMessage("Something went wrong.");
                break;
        }
    } else {
        const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
        switch (paymentIntent.status) {
            case "succeeded":
                showMessage("Payment succeeded!");
                break;
            case "processing":
                showMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                showMessage("Your payment was not successful, please try again.");
                break;
            default:
                showMessage("Something went wrong.");
                break;
        }
    }
}

// ------- UI helpers -------
function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}