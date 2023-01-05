/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";

document.querySelectorAll('.countrychain').forEach((item) => {
	item.addEventListener('change', (event) => {
		event.preventDefault();
		let target = document.getElementById(item.dataset.target);
		setRegionSelect(item.value).then(data => {
			if (target.options.length > 0) {
				target.options.length = 0;
			}
			for (let i = 0; i < data['k'].length; i++) {
				target.options[target.options.length] = new Option(data['v'][i], data['k'][i]);
			}
		});
	});
}, false);

async function setRegionSelect(id) {
	let data = new URLSearchParams();
	data.append(`country_id`, id);
	const options = {
		method: 'POST',
		body:   data
	}

	const response = await fetch('index.php?option=com_knowres&task=regions.chained', options);
	if (!response.ok) {
		alert('Sorry we have enountered a problem please try again or contact us');
	} else {
		let result = await response.json();
		if (result.success) {
			return result.data;
		}
		alert(result.message);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	let element = document.getElementById('jform_country_id');
	if (typeof (element) != 'undefined' && element != null) {
		let changeEvent = new Event('change');
		element.dispatchEvent(changeEvent);
	}
});