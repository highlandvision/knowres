// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

if (typeof jQuery === 'undefined') jQuery.noConflict();

(function ($) {
	let ui_aDate;
	let ui_dDate;
	let ui_eDate;
	let ui_minDays;
	let ui_booked;

	$(function () {
		$(document).on('click', '#kr-property-calendar .bookme', function () {
			let property_id = $('#kr-property-calendar').data('property_id');
			let arrival = $(this).data('date');
			displayModalBook(property_id, arrival);
		}).on('click', '#kr-property-calendar .modalshow', function () {
			let property_id = $('#kr-property-calendar').data('property_id');
			let id = $(this).data('id');
			let block = 'c';
			if ($(this).data('ical')) {
				block = '';
			}
			displayModalShow(property_id, id, block);
		}).on('click', '#newreservation', function (e) {
			e.preventDefault();
			let link = $(this).attr('href');
			link = link + '&arrival=' + $("#arrival").val() + '&departure=' + $("#departure").val();
			window.location.replace(link);
		}).on('click', '.modalshowcancel', function (e) {
			e.preventDefault();
			const id = $(this).data('id');
			$.ajax({
				type:     'POST',
				dataType: 'json',
				url:      'index.php?option=com_knowres&task=' + $(this).data('task'),
				data:     {id: id},
				success:  function (result) {
					if (result.success) {
						window.location.reload();
					} else {
						alert(result.message)
					}
				}
			});
		});
	});

	function displayModalBook(property_id, arrival) {
		let formData = new FormData();
		formData.append('property_id', property_id);
		formData.append('arrival', arrival);
		formData.append('source', 'calendar');

		$.ajax({
			url:         'index.php?option=com_knowres&task=contract.modalbook',
			dataType:    'json',
			method:      'POST',
			cache:       false,
			contentType: false,
			processData: false,
			data:        formData,
			success:     function (result) {
				if (result.success) {
					/** @namespace result.data.ui_aDate */
					/** @namespace result.data.ui_booked */
					/** @namespace result.data.ui_dDate */
					/** @namespace result.data.ui_eDate */
					/** @namespace result.data.ui_minDays */
					ui_aDate = result.data.ui_aDate;
					ui_dDate = result.data.ui_dDate;
					ui_eDate = result.data.ui_eDate;
					ui_minDays = result.data.ui_minDays;
					try {
						ui_booked = JSON.parse(result.data.ui_booked)
					} catch (e) {
						ui_booked = [];
					}

					$('#kr-contract-modal-book .modal-content').empty().append(result.data.html).draggable({
						handle: '.modal-header'
					});
					$('#kr-contract-modal-book').modal('show');

					const dateFormat = 'mm/dd/yy', $from = $('#jform_arrivaldsp').datepicker({
						altField:          '#arrival',
						altFormat:         'yy-mm-dd',
						buttonText:        '<i class="fa-solid fa-calendar-alt"></i>',
						changeMonth:       true,
						changeYear:        true,
						dateFormat:        'd M yy',
						defaultDate:       arrival,
						minDate:           ui_minDays,
						numberOfMonths:    1,
						selectOtherMonths: true,
						showOn:            'both',
						showOtherMonths:   true,
						beforeShowDay:     beforeShowDay
					}).on('change', function () {
						ui_aDate = $.datepicker.formatDate('yy-mm-dd', new Date($(this).val()));
						$to.datepicker('option', 'minDate', getDpDate(this, dateFormat));
						let new2 = $('#jform_arrivaldsp').datepicker('getDate', '+1d');
						new2.setDate(new2.getDate() + 1);
						$('#jform_departuredsp').datepicker('setDate', new2);
						ui_dDate = $.datepicker.formatDate('yy-mm-dd', new Date(new2));
						$('#kr-contract-modal-book #arrival').val(ui_aDate);
					}), $to          = $('#jform_departuredsp').datepicker({
						altField:          '#departure',
						altFormat:         'yy-mm-dd',
						buttonText:        '<i class="fa-solid fa-calendar-alt"></i>',
						changeMonth:       true,
						changeYear:        true,
						defaultDate:       '+1d',
						dateFormat:        'd M yy',
						numberOfMonths:    1,
						showOn:            'both',
						selectOtherMonths: true,
						showOtherMonths:   true,
						beforeShowDay:     beforeShowDayDepart
					}).on('change', function () {
						ui_dDate = $.datepicker.formatDate('yy-mm-dd', new Date($(this).val()));
						$from.datepicker('option', 'maxDate', getDpDate(this, dateFormat));
						$('#kr-contract-modal-book #departure').val(ui_dDate);
					});
				}
			},
			error:       function () {
				alert('Sorry we cannot process your request at the moment. Please try again later!');
			},
		});
	}

	function displayModalShow(property_id, id, block) {
		let formData = new FormData();
		formData.append('id', id);
		formData.append('block', block);
		formData.append('gobackto', 'task=property.calendar&id=' + property_id);
		$.ajax({
			url:         'index.php?option=com_knowres&task=contract.modalshow',
			type:        'POST',
			data:        formData,
			dataType:    'json',
			cache:       false,
			contentType: false,
			processData: false,
			success:     function (result) {
				if (!result.success) {
					if (result.message) {
						alert(result.message);
					} else {
						alert('Sorry we cannot process your request at the moment. Please try again later!');
					}
				} else {
					$('#kr-calendar-modal-show .modal-content').empty().append(result.data.html).draggable({
						handle: '.modal-header'
					});
					$('#kr-calendar-modal-show').modal('show');
					$('#kr-gantt-tab').tab();
				}
			},
			error:       function (result) {
				alert('Sorry we cannot process your request at the moment. Please try again later!');
			},
		});
	}

	function beforeShowDay(date) {
		let thisDate = new Date(date);
		thisDate = $.datepicker.formatDate('yy-mm-dd', thisDate);

		return checkAvailable(thisDate, ui_aDate, ui_dDate);
	}

	function beforeShowDayDepart(date) {
		let thisDate = new Date(date);
		thisDate = $.datepicker.formatDate('yy-mm-dd', thisDate);

		return checkAvailableDepart(thisDate, ui_aDate, ui_dDate);
	}

	function checkAvailable(thisDate, aDate, dDate) {
		if (aDate && dDate) {
			if (thisDate >= aDate && thisDate <= dDate) return [true, 'datepick-selected'];
		}

		let value;
		if (typeof ui_booked[thisDate] !== 'undefined') {
			value = ui_booked[thisDate];
		} else {
			return [true, ''];
		}

		if (value === 0 || value === 3) {
			return [false, 'datepick-booked'];
		} else if (value === 1) {
			return [false, 'datepick-booked datepick-half'];
		} else {
			return [true, 'datepick-booked datepick-half135'];
		}
	}

	function checkAvailableDepart(thisDate, aDate, dDate) {
		if (aDate && dDate) {
			if (thisDate >= aDate && thisDate <= dDate) return [true, 'datepick-selected'];
		}

		if (thisDate >= ui_eDate) return [false, 'datepick-disabled'];

		let value;
		if (typeof ui_booked[thisDate] !== 'undefined') {
			value = ui_booked[thisDate];
		} else {
			return [true, ''];
		}

		if (value === 0 || value === 3) {
			return [false, 'datepick-booked'];
		} else if (value === 1) {
			return [true, 'datepick-booked datepick-half'];
		} else {
			return [false, 'datepick-booked datepick-half135'];
		}
	}

	function getDpDate(element, format) {
		let date;
		try {
			date = $.datepicker.parseDate(format, element.value);
		} catch (error) {
			date = null;
		}

		return date;
	}
})(jQuery);

(function ($) {
	const ui_options = {
		buttonText:        '<i class="fa-solid fa-calendar-alt"></i>',
		changeMonth:       true,
		changeYear:        true,
		dateFormat:        'd M yy',
		firstDay:          1,
		numberOfMonths:    1,
		selectOtherMonths: true,
		showButtonPanel:   true,
		showOn:            'both',
		showOtherMonths:   true,
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