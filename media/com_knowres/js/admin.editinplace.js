/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2023 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";

let column, table, text, old;

document.querySelectorAll('.kr-editinplace').forEach((item) => {
	item.addEventListener('focus', (event) => {
		item.setAttribute('style', 'background-color: yellow;');
		old = item.innerText;
	});
	item.addEventListener('blur', (event) => {
		event.preventDefault();
		item.setAttribute('style', 'background-color:red;');
		text = item.innerText;
		if (old !== text) {
			column = item.getAttribute('data-column');
			table = item.getAttribute('data-table');
			updateField(column, table, text).then(r => {
			});
		}
		item.setAttribute('style', 'background-color:#fff;');
	});
}, false);

async function updateField(column, table, text) {
	let data = new URLSearchParams();
	data.append(`column`, column);
	data.append(`table`, table);
	data.append(`text`, text);
	const options = {
		method: 'POST',
		body:   data
	}

	const response = await fetch('index.php?option=com_knowres&task=ajax.editinplace', options);
	let result = await response.json();
	if (result.success) {
		return result.data.html;
	} else {
		alert(result.message);
	}
}