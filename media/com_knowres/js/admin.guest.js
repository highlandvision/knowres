// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

function fillBilling(checked) {
	if (checked) {
		document.getElementById('jform_b_address1').value = document.getElementById('jform_address1').value;
		document.getElementById('jform_b_address2').value = document.getElementById('jform_address2').value;
		document.getElementById('jform_b_town').value = document.getElementById('jform_town').value;
		document.getElementById('jform_b_postcode').value = document.getElementById('jform_postcode').value;

		let first = document.getElementById('jform_country_id');
		let data = first.innerHTML;
		let second = document.getElementById('jform_b_country_id');
		second.innerHTML = second.innerHTML + data;

		first = document.getElementById('jform_region_id');
		data = first.innerHTML;
		second = document.getElementById('jform_b_region_id');
		second.innerHTML = second.innerHTML + data;

		document.getElementById('jform_b_country_id').value = document.getElementById('jform_country_id').value;
		document.getElementById('jform_b_region_id').value = document.getElementById('jform_region_id').value;
	} else {
		document.getElementById('jform_b_address1').value = '';
		document.getElementById('jform_b_address2').value = '';
		document.getElementById('jform_b_town').value = '';
		document.getElementById('jform_b_postcode').value = '';
		document.getElementById('jform_b_country_id').value = 0;
		document.getElementById('jform_b_region_id').value = 0;
	}
}