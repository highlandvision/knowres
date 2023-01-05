// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

if (typeof jQuery === 'undefined') jQuery.noConflict();

(function ($) {
	let elem, id, split, new_date, valid_from, valid_to, $to;
	const ui_options = {
		altFormat:         'yy-mm-dd',
		buttonText:        '<i role="button" class="fas fa-calendar-day fa-lg"></i>',
		changeMonth:       true,
		changeYear:        true,
		dateFormat:        'd M yy',
		firstDay:          1,
		numberOfMonths:    1,
		selectOtherMonths: true,
		showButtonPanel:   true,
		showOn:            'both',
		showOtherMonths:   true,
		onSelect:          function () {
			id = $(this).attr('id');
			elem = document.getElementById(id);
			if (id === 'jform_valid_from_dsp') {
				$to = $('#jform_valid_to');
				valid_from = $('#jform_valid_from').val();
				valid_to = $to.val();
				split = valid_from.split('-');
				new_date = new Date(split[0], split[1] - 1, split[2]);
				$('#jform_valid_to_dsp').datepicker('option', 'minDate', new_date);
				if (valid_from > valid_to) {
					$to.val($.datepicker.formatDate('yy-mm-dd', new Date(new_date)));
				}
			} else if (elem.classList.contains('kr-search-date-filter')) {
				document.adminForm.submit();
			}
		},
	};

	$(function () {
		const $cal = $('.uicalendar');
		if ($cal.length) {
			$('[data-datepicker]').each(function () {
				$.extend(ui_options, $(this).data('datepicker'));
				$(this).datepicker(ui_options);
			});
			$cal.datepicker();
		}
	});
})(jQuery);