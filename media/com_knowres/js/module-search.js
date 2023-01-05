/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

// noinspection JSUnusedGlobalSymbols
function guestIncrement(updown, target, atext, ctext) {
	let cac = document.getElementById('child-ages-container');
	let aci = document.getElementById(target);
	let value = parseInt(aci.value);
	value += updown;
	if (value >= aci.getAttribute('min') && value <= aci.getAttribute('max')) {
		let guests = document.getElementById('guests');
		let maxguests = guests.dataset.max;
		let guestcount = parseInt(guests.options[guests.selectedIndex].value) + parseInt(updown);
		if (guestcount > 0 && guestcount <= maxguests) {
			document.getElementById(target).value = value;
			let adults = document.getElementById('adults').value;
			let children = document.getElementById('children').value;
			guests.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext;
			guests.value = guestcount;
			if (target === "children") {
				let agehelp = document.getElementById('age-help');
				if (updown === 1) {
					if (value === 1) {
						agehelp.hidden = false;
					}
					cac.append(createAgeField(value));
				} else {
					if (value === 1) {
						agehelp.hidden = true;
					}
					removeAgeField(value + 1)
				}
			}
		}
	}
}

function createAgeField(count) {
	let newage = document.createElement('input');
	newage.setAttribute('type', 'number');
	newage.setAttribute('aria-label', 'Age ' + count);
	newage.setAttribute('min', '0');
	newage.setAttribute('max', '17');
	newage.setAttribute('value', '2');
	newage.setAttribute('step', '1');
	newage.setAttribute('name', 'child_ages[]');
	newage.setAttribute('id', 'child_ages_' + count);
	newage.setAttribute('class', 'form-control valid form-control-success');
	return newage;
}

function removeAgeField(count) {
	let container = document.getElementById('child_ages_' + count);
	container.remove()
}

function setregion(id) {
	let element = document.getElementById('region_id');
	element.value = id;
	let pane = document.getElementById('region_id');
	pane.click();
}