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
		kickDobissue();
		const totalGuests = $('#jsdata').data('totalguests');
		$('#jform_adults').on('change', function () {
			changePartySize(1, totalGuests);
		});
		$('#jform_child').on('change', function () {
			changePartySize(2, totalGuests);
		});
	});

	function kickDobissue() {
		const $dobissue = $('.dobissue');
		if ($dobissue.length > 0) {
			$dobissue.datetextentry({
				min_year:         '1900', max_date: function () {
					return this.get_today();
				},
				max_date_message: 'Date must not be in the future'
			});
		}
	}

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
		let $ages = $('#jsdata');
		const childMinAge = $ages.data('childminage');
		const childMaxAge = $ages.data('childmaxage');
		let newage = document.createElement("input");
		newage.setAttribute("type", "number");
		newage.setAttribute("min", childMinAge);
		newage.setAttribute("max", childMaxAge);
		newage.setAttribute("value", 2);
		newage.setAttribute("step", 1);
		newage.setAttribute('name', 'jform[child_ages][]');
		newage.setAttribute('id', 'jform_child_ages_' + count);
		newage.setAttribute('class', 'float-start child-ages input-tiny form-control valid form-control-success');

		return newage;
	}
})(jQuery);