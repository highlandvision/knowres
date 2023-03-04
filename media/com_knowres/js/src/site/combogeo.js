/**
 * @package    Know Reservations
 * @subpackage Site JS (copied from Admin JS)
 * @copyright  2022 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";
async function comboGeo(parentvalue, task, target, childvalue = '0') {
	let formData = new FormData();
	formData.append('parent', parentvalue);
	formData.append('target', target + '_id');
	formData.append('child', childvalue);

	let response = await fetch('index.php?option=com_knowres&task=' + task, {
		method: 'post',
		body:   formData
	});

	let result = await response.json();
	if (result.success) {
		let current = document.querySelector('.' +target+'chain');
		current.outerHTML = result.data.html;
	} else {
		alert(result.message);
	}
	return false;
}