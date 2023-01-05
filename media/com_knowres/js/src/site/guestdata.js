// noinspection DuplicatedCode

/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {

	$(function () {
		const totalGuests = $('#jsdata').data('totalguests');
		$('#jform_adults').on('change', function () {
			changePartySize(1, totalGuests);
		});
		$('#jform_child').on('change', function () {
			changePartySize(2, totalGuests);
		});

		if (document.getElementById('howtoarrive')) {
			const howtoarrive = document.getElementById('howtoarrive');
			let arrivalmeans = howtoarrive.getAttribute('data-means');
			if (!arrivalmeans) {
				arrivalmeans = 'air';
			}

			displayArrival(arrivalmeans);
		}

		$('body').on('click', '.amitem', function (e) {
			e.preventDefault();
			displayArrival($(this).attr('id'));
		});
	});

	function changePartySize(type, guests) {
		let numAdults = $('#jform_adults').val()
		let $inputChild = $('#jform_child');
		let numChildren = $inputChild.val();
		let maxChildren = guests - numAdults;
		let $holder = $('#holder');
		let i;

		if (type === 1) {
			$inputChild.attr('max', maxChildren);
			if (numChildren > maxChildren) {
				$inputChild.val(maxChildren);
				if (!maxChildren)
					$holder.hide();
				else {
					for (i = 0; i < numChildren - maxChildren; i++) {
						$holder.children().last().remove();
					}
				}
			}
		} else if (type === 2) {
			let difference;
			let existing = $holder.children('input').length;
			if (numChildren > existing) {
				difference = numChildren - existing;
				for (i = 1; i <= difference; i++) {
					$holder.append(createNewAgeField(existing + i));
				}
			} else {
				difference = existing - numChildren;
				for (i = 0; i < difference; i++) {
					$holder.children('input').last().remove();
				}
			}

			let now = $holder.children('input').length;
			if (now) {
				$holder.show();
			} else if (!now) {
				$holder.hide();
			}
		}
	}

	function createNewAgeField(count) {
		const $jsdata = $('#jsdata');
		const childMinAge = $jsdata.data('childminage');
		const childMaxAge = $jsdata.data('childmaxage');
		let newage = document.createElement('input');
		newage.setAttribute("type", "number");
		newage.setAttribute("min", childMinAge);
		newage.setAttribute("max", childMaxAge);
		newage.setAttribute("value", '2');
		newage.setAttribute("step", '1');
		newage.setAttribute('name', 'jform[child_ages][]');
		newage.setAttribute('id', 'jform_child_ages_' + count);
		newage.setAttribute('class', 'float-left child-ages input-tiny form-control valid form-control-success');

		return newage;
	}

	function displayArrival(value) {
		let x = document.getElementsByClassName('amitem');
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('active');
		}

		document.getElementById('air-data').style.display = 'none';
		document.getElementById('train-data').style.display = 'none';
		document.getElementById('auto-data').style.display = 'none';
		document.getElementById('other-data').style.display = 'none';
		let arrivaldata = value + '-data';
		document.getElementById(arrivaldata).style.display = 'block';
		document.getElementById(value).classList.add('active');
		document.getElementById('jform_arrival_means').value = value;
	}
})(jQuery);