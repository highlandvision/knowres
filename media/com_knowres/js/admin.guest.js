// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

function fillBilling(checked) {
	let select1, select2;
	if (checked) {
		document.getElementById('jform_b_address1').value = document.getElementById('jform_address1').value;
		document.getElementById('jform_b_address2').value = document.getElementById('jform_address2').value;
		document.getElementById('jform_b_town').value = document.getElementById('jform_town').value;
		document.getElementById('jform_b_postcode').value = document.getElementById('jform_postcode').value;
		document.getElementById('jform_b_country_id').value = document.getElementById('jform_country_id').value;
		document.getElementById('jform_b_region_id').value = document.getElementById('jform_region_id').value;

		select1 = document.getElementById('jform_country_id');
		select2 = document.getElementById('jform_b_country_id');
		select2.innerHTML = select2.innerHTML + select1.innerHTML;

		select1 = document.getElementById('jform_region_id');
		select2 = document.getElementById('jform_b_region_id');
		select2.innerHTML = select2.innerHTML + select1.innerHTML;
	} else {
		document.getElementById('jform_b_address1').value = '';
		document.getElementById('jform_b_address2').value = '';
		document.getElementById('jform_b_town').value = '';
		document.getElementById('jform_b_postcode').value = '';
		document.getElementById('jform_b_country_id').value = 0;
		document.getElementById('jform_b_region_id').value = 0;
	}
}