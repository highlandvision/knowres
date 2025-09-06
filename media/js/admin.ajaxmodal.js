/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2021 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";

document.addEventListener('DOMContentLoaded', function () {
	let ajaxModal = document.getElementById('kr-ajax-modal')
	ajaxModal.addEventListener('show.bs.modal', function (event) {
		let button = event.relatedTarget;
		let task = button.getAttribute('data-task');
		let id = button.getAttribute('data-id');
		if (task) {
			setModalContent(task, id).then((response) => {
				console.log(response);
			});
		}
	});
	ajaxModal.addEventListener('hidden.bs.modal', function () {
		let myModal = bootstrap.Modal.getInstance(document.getElementById('kr-ajax-modal'));
		myModal.dispose();
	});
}, false);

async function setModalContent(task, id) {
	const token = Joomla.getOptions('csrf.token', '');
	let url = 'index.php?option=com_knowres&task=' + task;
	let data = new URLSearchParams();
	data.append(`id`, id);
	data.append(token, "1");
	const options = {
		method: 'post',
		body:   data
	}
	let response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('An error status was returned = ' + `${response.status}`);
	} else {
		let result = await response.text();
		let target = document.getElementById('kr-ajax-modal').getElementsByClassName('modal-content')[0];
		target.innerHTML = result;
	}
}