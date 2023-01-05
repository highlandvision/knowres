/**
 * package    Know Reservations
 * subpackage Admin Js
 * copyright  2020 Highland Vision. All rights reserved.
 * license    See the file "LICENSE.txt" for the full license governing this code.
 * author     Hazel Wilson <hazel@highlandvision.com>
 */
"use strict";

if (typeof jQuery !== 'undefined')
	jQuery.noConflict();

(function ($) {
	let myBooking = false;
	let self;
	let $bookPicker;
	let settings = {
		initial:   0,
		pid:       0,
		blocked:   [],
		arrival:   '',
		departure: '',
		aDate:     '',
		dDate:     '',
		minDate:   '',
		maxDate:   '',
		today:     '',
		editId:    0,
		hideme:    1,
	};

	class KRbooking {
		constructor($element, options) {
			this.settings = settings;
			if (options) {
				$.extend(this.settings, options);
			}
			this.init();
		}

		static isItAvailable(thisDate, settings) {
			const aDate = settings.aDate;
			const dDate = settings.dDate;

			if (aDate && dDate) {
				if (thisDate >= aDate && thisDate <= dDate)
					return [true, 'dp-highlight'];
			}

			let value;
			if (typeof settings.blocked[thisDate] !== 'undefined') {
				value = settings.blocked[thisDate];
			} else {
				value = -1;
			}

			if (value === 0 || value === 3)
				return [false, 'datepick-booked'];
			else if (value === 1)
				return [false, 'datepick-booked datepick-candepart'];
			if (value === 2)
				return [true, 'datepick-booked datepick-canarrive'];
			else {
				return [true, ''];
			}
		}

		// 0 - booked (can allow nothing )
		// 1 - booked and arrival ( can allow departure )
		// 2 - booked and departure ( can allow arrival )
		// 3 - booked and arrival and departure (can allow nothing )
		static isItAvailableDepart(thisDate, settings) {
			const aDate = settings.aDate;
			const dDate = settings.dDate;
			const maxDate = settings.maxDate;

			if (thisDate < aDate)
				return [false, 'datepick-disabled'];
			else if (thisDate >= aDate && thisDate <= dDate)
				return [true, 'datepick-selected'];
			else if (thisDate > maxDate)
				return [false, 'datepick-disabled'];

			let value;
			if (typeof settings.blocked[thisDate] !== 'undefined') {
				value = settings.blocked[thisDate];
			} else {
				value = -1;
			}

			if (value === 0 || value === 3)
				return [false, ''];
			else if (value === 2)
				return [false, 'datepick-booked datepick-canarrive'];
			else if (value === 1)
				return [true, 'datepick-booked datepick-candepart'];
			else {
				return [true, ''];
			}
		}

		getQuote($this) {
			let data = new FormData($('#contract-form')[0]);
			data.append('jform[initial]', this.settings.initial);
			this.settings.initial = 0;
			const $manual = $this.data('override');
			if ($manual === 'manual')
				data.append('jform[manual]', '1');
			else
				data.append('jform[manual]', '0');
			self.settings = this.settings;

			$.ajax({
				type:        'POST',
				enctype:     'multipart/form-data',
				url:         'index.php?option=com_knowres&task=' + $('#task').val(),
				data:        data,
				processData: false,
				contentType: false,
				cache:       false,
				dataType:    'json',
				success:     function (result) {
					self.settings.hideme = 1;
					$('.hideinitial').show();
					if (result.success) {
						let div;
						$('#system-message-container').html('');
						if (typeof result.data !== 'undefined' && result.data !== null) {
							$.each(result.data.response, function (field, val) {
								field = String(field);
								val = String(val);
								div = '#' + 'jform_' + field;
								if ($(div).length) {
									if (field === 'jform_expiry_days') {
										$(div).val(val).trigger('liszt:updated');
									} else {
										$(div).text(val);
										$(div).html(val);
										$(div).val(val);
										$(div).show();
									}
								}
							});
						}
						let warning = $('#jform_ajax_warning');
						if (warning.text().length === 0)
							warning.css('display', 'none');
						else
							warning.css('display', 'block');
					} else {
						if (result.messages) {
							Joomla.renderMessages(result.messages);
						} else {
							$('#errorModalMessage').empty().append(result.message);
							$('#errorModal').modal('show');
						}
					}
				},
				error:       function () {
					alert("Sorry an error has occurred, please try again");
				}
			});
		}

		hasBeenSelected(dateText, $dp, settings) {
			const split = dateText.split('-');
			const year = split[0];
			const month = split[1];
			const day = split[2];
			let $depart;
			let dspDate = $.datepicker.formatDate('d M yy', new Date(year, month - 1, day));

			if (!settings.aDate || settings.dDate) {
				$('#arrival').val(dateText);
				$('#jform_arrival_bd').val(dspDate);

				$depart = $('#jform_departure_bd');
				$depart.val('');
				$dp.datepicker();

				settings.aDate = dateText;
				settings.dDate = '';
				settings.maxDate = '2099-12-31';
				let found = false;

				$.each(settings.blocked, function (date, type) {
					if (date < settings.aDate) {
						return true;
					}
					if (date > settings.aDate && date < settings.maxDate && !found) {
						settings.maxDate = date;
						found = true;
					}

					if (date > settings.maxDate) {
						if (type !== 1) {
							settings.maxDate = date;
							return false;
						}
					}
				});

				$("#departure").val(settings.maxDate);

				$depart.datepicker(
					'option', 'maxDate', settings.maxDate).datepicker(
					'setDate', $.datepicker.formatDate('d M yy', new Date(settings.maxDate))).datepicker(
					'refresh'
				)
			} else if (dateText < settings.aDate) {
				$('#jform_departure_bd').val($('jform_arrival_bd').val());
				$('#jform_arrival_bd').val(dateText);
				$dp.datepicker();
				settings.dDate = '';
			} else {
				$('#jform_departure_bd').val(dspDate);
				$dp.datepicker();
				settings.dDate = dateText;
				$("#departure").val(dateText).trigger('change');
			}
		}

		init() {
			self = this;
			$.ajax({
				type:     'POST',
				url:      'index.php?option=com_knowres&task=contract.init',
				dataType: 'json',
				data:     {
					'pid':       self.settings.pid,
					'edit_id':   self.settings.editId,
					'arrival':   self.settings.arrival,
					'departure': self.settings.departure
				},
				success:  function (result) {
					if (result.success) {
						if (self.settings.editId) {
							self.settings.initial = 1;
						}
						try {
							self.settings.blocked = JSON.parse(result.data.blocked)
						} catch (e) {
							self.settings.blocked = [];
						}
						if (!self.settings.arrival) {
							self.settings.arrival = result.data.arrival;
							self.settings.departure = result.data.departure;
							$('#arrival').val(result.data.arrival);
							/** @namespace result.data.arrival_bd **/
							$('#jform_arrival_bd').val(result.data.arrival_bd);
							$('#departure').val(result.data.departure);
							/** @namespace result.data.departure_bd **/
							$('#jform_departure_bd').val(result.data.departure_bd);
						}

						self.settings.aDate = self.settings.arrival;
						self.settings.dDate = self.settings.departure;
						self.triggerPicker(self);
						/** @namespace result.data.getquote **/
						if (result.data.getquote) {
							self.settings.hideme = 0;
							self.getQuote($('.kr-calculate'));
						}
					}
				}
			});
		}

		submitPost(form, url) {
			$.ajax({
				type:     'POST',
				url:      url,
				data:     form.serialize(),
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						window.location.href = result.data.redirect;
					} else if (result.messages) {
						Joomla.renderMessages(result.messages);
					} else {
						$('#errorModalMessage').empty().append(result.message);
						$('#errorModal').modal('show');
					}
				}
			});
		}

		triggerPicker(self) {
			let min = 0;
			let parts;
			if (self.settings.aDate < self.settings.today) {
				parts = self.settings.aDate.split('-');
				self.settings.minDate = this.settings.aDate;
				min = new Date(parts[0], parts[1] - 1, parts[2]);
			} else {
				self.settings.minDate = this.settings.today;
			}

			$bookPicker = $('#book-datepicker');
			const $container = $('#container-datepicker');
			let width = $container.width();
			let max = 5;
			if (width < 600)
				max = 2;
			else if (width >= 600 && width < 800)
				max = 3;
			else if (width >= 800 && width < 1000)
				max = 4;
			$bookPicker.datepicker({
				minDate:        min,
				maxDate:        self.settings.maxDate,
				numberOfMonths: max,
				defaultDate:    self.settings.aDate,
				dateFormat:     'yy-mm-dd',
				firstDay:       1,
				beforeShowDay:  function (d) {
					let ymd = $.datepicker.formatDate('yy-mm-dd', new Date(d));
					if (ymd < settings.minDate) {
						return [false, "datepick-disabled"];
					} else if (!settings.aDate || settings.dDate) {
						return KRbooking.isItAvailable(ymd, settings);
					} else if (ymd === settings.aDate) {
						return [false, "dp-highlight"];
					} else if (ymd < settings.aDate) {
						return [false, "datepick-disabled"];
					} else {
						return KRbooking.isItAvailableDepart(ymd, settings);
					}
				},
				onSelect:       function (dateText) {
					self.hasBeenSelected(dateText, $bookPicker, self.settings);
				}
			});

			$bookPicker.width(width);
		}
	}

	$(function () {
		// First display of manager block / book form calendar data
		const $init = $("#kr-manager-book");
		if ($init.length) {
			let options = {
				pid:       $init.data('pid'),
				today:     $init.data('today'),
				arrival:   $init.data('arrival'),
				departure: $init.data('departure'),
				editId:    $init.data('editid'),
				minDate:   $init.data('today'),
				maxDate:   $init.data('maxdate')
			};
			myBooking = new KRbooking($init, options);
		}

		let go = true;
		let $value = $('#jform_agent_value');
		if ($value.length && $value.value === '') {
			go = false;
		}

		const $quote = $('.kr-calculate');
		$quote.on('change', function (e) {
			e.preventDefault();
			if (myBooking && go) {
				myBooking.getQuote($(this));
			}
		});
		const $apply = $('.btn.kr-calculate');
		$apply.on('click', function (e) {
			e.preventDefault();
			if (myBooking && go) {
				myBooking.getQuote($(this));
			}
		});

		$('.kr-ajax-form').on('click', (function (e) {
			e.preventDefault();
			const form = $(this);
			const url = form.attr('action');
			if (myBooking) {
				myBooking.submitPost(form, url);
			}
		}));
	});
}(jQuery));

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('jform_email').addEventListener('blur', () => {
		const firstname = document.getElementById('jform_firstname');
		const email = document.getElementById('jform_email');
		let formdiv;
		if (email.value && !firstname.value) {
			findGuest(email.value).then((response) => {
				/** @namespace response.data.found **/
				if (response.data.found) {
					/** @namespace response.data.item **/
					const keys = Object.keys(response.data.item);
					keys.forEach((field) => {
						formdiv = document.getElementById('jform_' + field);
						if (formdiv) {
							formdiv.value = response.data.item[field];
							if (field === 'country_id') {
								comboGeo(response.data.item[field], 'guest.combo', 'region', response.data.item['region_id']);
							}
						}
					});
				}
			});
		}
	})
}, false);

async function findGuest(email) {
	let formData = new FormData();
	formData.append('email', email);
	const response = await fetch('index.php?option=com_knowres&task=guests.guestdetails', {
		method: 'post',
		body:   formData
	});

	return await response.json();
}