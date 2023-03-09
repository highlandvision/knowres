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

$approval_url = KrMethods::route('index.php?option=com_knowres&task=service.paypal');
?>

<div class="row">
	<div class="small-12 medium-10 large-8 medium-offset-1 large-offset-2 columns">
		<div class="text-center">
			<h4><?php echo $this->paymentData->note; ?></h4>
			<br><br>
		</div>
	</div>
	<div class="small-12 medium-8 large-6 medium-offset-2 large-offset-3 columns">
		<div class="text-center">
			<div id="paypal-button-container"></div>
			<br>
		</div>
	</div>
</div>
<button class="close-button" data-close aria-label="Close modal" type="button">
	<span aria-hidden="true">&times;</span>
</button>

<script>
	paypal.Buttons({
		createOrder: function (data, actions) {
			return actions.order.create({
				payer:               {
					name:          {
						given_name: '<?php echo $this->paymentData->firstname; ?>',
						surname:    '<?php echo $this->paymentData->surname; ?>',
					},
					address:       {
						address_line_1: '<?php echo $this->paymentData->address1; ?>',
						address_line_2: '<?php echo $this->paymentData->address2; ?>',
						admin_area_1:   '<?php echo $this->paymentData->town; ?>',
						admin_area_2:   '<?php echo $this->paymentData->region_name; ?>',
						postal_code:    '<?php echo $this->paymentData->postcode; ?>',
						country_code:   '<?php echo $this->paymentData->country_iso; ?>',
					},
					email_address: '<?php echo $this->paymentData->email; ?>',
					phone:         {
						phone_type:   'MOBILE',
						phone_number: {
							national_number: '<?php echo $this->paymentData->mobile; ?>'
						}
					}
				},
				purchase_units:      [{
					description: '<?php echo $this->paymentData->note; ?>',
					custom_id:   '<?php echo $this->paymentData->tag; ?>',
					invoice_id:  '<?php echo $this->paymentData->invoice_id; ?>',
					amount:      {
						value: '<?php echo $this->paymentData->amount; ?>'
					},
				}],
				application_context: {
					shipping_preference: 'NO_SHIPPING',
				},
			});
		},
		onApprove:   function (data) {
			return fetch("<?php echo $approval_url; ?>", {
				headers:     {
					'Content-Type': 'application/json'
				},
				method:      'POST',
				mode:        "same-origin",
				credentials: "same-origin",
				body:        JSON.stringify({
					payment_ref: data.orderID,
					service_id: <?php echo $this->service_id; ?>,
				})
			}).then(function (response) {
				return response.json();
			}).then(function (result) {
				if (result.error) {
					alert("ouch");
				} else {
					window.location.replace(result.success);
				}
			})
		},
	}).render('#paypal-button-container');
</script>