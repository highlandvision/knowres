/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.host;
	}

	const livesite = window.location.origin + '/';
	let initQuote = true;
	let lang = $("#kr-lang").data('krlang');
	let maxDeparture;
	let maxDate;
	let minDate;
	let minDeparture;
	let myKrmobi;
	let quoteData = false;
	let self;

	class Krmobi {
		constructor($element, type, mobidefaults = {}, options = {}) {
			this.mobidefaults = {
				buttons:           ['cancel'],
				theme:             'kr',
				lang:              lang,
				firstDay:          1,
				dateFormat:        'd M yy',
				closeOnSelect:     true,
				layout:            'liquid',
				showDivergentDays: false,
				swipeDirection:    'vertical',
				navigation:        'month',
				display:           'bubble'
			};

			this.searchoptions = {};
			this.quoteoptions = {
				mqPid: '',
				// 	Values Y - Available N - Not available
				mqAvailability: [],
				// 	Values I - Check in O - Check out X - None C - Both
				mqChangeover:     [],
				mqMinstay:        [],
				mqMaxstay:        [],
				mqArrival:        '',
				mqDeparture:      '',
				mqMaxdate:        '',
				mqMindate:        '',
				mqSelectCheckin:  '',
				mqSelectCheckout: '',
				mqWeekly:         [],
			};

			if (mobidefaults) {
				$.extend(this.mobidefaults, mobidefaults);
			}

			$.mobiscroll.setDefaults(this.mobidefaults);

			if (type === 'search') {
				this.initSearchCalendar($element, options);
			} else if (type === 'quote') {
				this.getQuoteCalendar($element, options);
			}
		}

		static calFirst(year, month) {
			if (month === 0) {
				month = 12;
				year = year - 1;
			}

			if (month < 10) {
				month = '0' + month;
			}

			return year + '-' + month + '-' + '01';
		}

		static calLast(year, month) {
			month = month + 3;
			if (month > 12) {
				month = month - 12;
				year = year + 1;
			}

			if (month < 10) {
				month = '0' + month;
			}

			return year + '-' + month + '-' + '01';
		}

		static convertFromYmd(dateymd) {
			return !dateymd ? new Date() : new Date(dateymd);
		}

		static convertToYmd(date) {
			return $.mobiscroll.datetime.formatDate('yy-mm-dd', date);
		}

		static fillDateBox(box, date) {
			const d = date.getDate();
			const m = date.getMonth() + 1;
			$(box).val(date.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d);
		}

		static incrementDate(date, days) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() + parseInt(days));
		}

		static incrementDateYmd(dateymd, days) {
			let date = Krmobi.convertFromYmd(dateymd);
			date = Krmobi.incrementDate(date, days)

			return Krmobi.convertToYmd(date);
		}

		static markSelectedDates(arrive, depart, marked) {
			let date = arrive;
			let index = 0;
			let tmp = [];
			let ymd;

			while (date <= depart) {
				tmp = [];
				tmp['d'] = date;
				ymd = Krmobi.convertToYmd(date);

				if (ymd === Krmobi.convertToYmd(arrive))
					tmp['text'] = 'selected checkin';
				else if (ymd === Krmobi.convertToYmd(depart)) {
					tmp['text'] = 'selected checkout';
				} else
					tmp['text'] = 'selected';

				index = marked.findIndex((obj) => {
					return ymd === Krmobi.convertToYmd(obj.d);
				});
				if (index === -1) {
					marked.push(tmp);
				} else {
					tmp['text'] += ' ' + marked[index]['text'];
					marked[index] = tmp;
				}

				date = Krmobi.incrementDate(date, 1);
			}

			return marked;
		}

		getQuote() {
			const $element = $('#kr-quote-form');
			$.ajax({
				type:    'POST',
				cache:   false,
				url:     livesite + 'index.php?option=com_knowres&task=property.quote&lang=' + lang,
				data:    $element.serialize(),
				success: function (response) {
					if (response) {
						$('#kr-bookmodule').hide().slideDown(600).html(response);
						$('#kr-date-warning').empty();
					} else {
						window.location.href = livesite;
					}
				}
			});
		}
		getQuoteCalendar($element, options) {
			if (options) {
				$.extend(this.quoteoptions, options);
			}

			self = this;
			$.ajax({
				type:     'POST',
				cache:    false,
				url:      livesite + 'index.php?option=com_knowres&task=property.mobi&lang=' + lang,
				dataType: 'json',
				data:     {
					'pid':   self.quoteoptions.mqPid,
					'start': self.quoteoptions.mqMindate,
					'end':   self.quoteoptions.mqMaxdate
				},
				success:  function (result) {
					if (result.success) {
						/** @namespace data.availability **/
						try {
							self.quoteoptions.mqAvailability = JSON.parse(result.data.availability)
						} catch (e) {
							self.quoteoptions.mqAvailability = [];
						}
						/** @namespace data.changeover **/
						self.quoteoptions.mqChangeover = JSON.parse(result.data.changeover);
						/** @namespace data.minstay **/
						self.quoteoptions.mqMinstay = JSON.parse(result.data.minstay);
						/** @namespace data.maxstay **/
						self.quoteoptions.mqMaxstay = JSON.parse(result.data.maxstay);
						/** @namespace data.weekly **/
						try {
							self.quoteoptions.mqWeekly = JSON.parse(result.data.weekly)
						} catch (e) {
							self.quoteoptions.mqWeekly = [];
						}
						if (!self.quoteoptions.mqArrival) {
							/** @namespace data.arrival **/
							/** @namespace data.departure **/
							self.quoteoptions.mqArrival = result.data.arrival;
							self.quoteoptions.mqDeparture = result.data.departure;
						}
						self.initQuoteCalendar();
						self.getQuote();
						quoteData = true;
					} else {
						$('.kr-ajax-modal-error-message').html(result.message);
						const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
						$modal.open();
					}
				}
			});
		}

		initQuoteCalendar() {
			let calFirstDate;
			let calLastDate;
			let arrival = Krmobi.convertFromYmd(this.quoteoptions.mqArrival);
			let departure = Krmobi.convertFromYmd(this.quoteoptions.mqDeparture);
			const $arrivalBox = $('#qarrival');
			const $departureBox = $('#qdeparture');
			minDate = Krmobi.convertFromYmd(this.quoteoptions.mqMindate);
			maxDate = Krmobi.convertFromYmd(this.quoteoptions.mqMaxdate);
			initQuote = true;
			self = this;

			let $arrivalCal = $('#qarrivaldsp').mobiscroll().calendar({
				headerText:    this.quoteoptions.mqSelectCheckin,
				markedText:    true,
				maxDate:       maxDate,
				minDate:       minDate,
				months:        'auto',
				onMonthLoaded: function (year, month, inst) {
					calFirstDate = Krmobi.calFirst(year, month);
					calLastDate = Krmobi.calLast(year, month);
					departure = $departureCal.mobiscroll('getVal');
					inst.settings.invalid = self.setInvalidDatesArrival(calFirstDate, calLastDate);
					inst.settings.marked = self.setArrivalMarked(inst.getDate(), departure, calFirstDate, calLastDate);
					inst.refresh();
				},
				onSelect:      function (day, inst) {
					arrival = inst.getDate();
					departure = self.setDepartureForArrival(arrival, $departureCal.mobiscroll('getVal'));
					Krmobi.fillDateBox($arrivalBox, arrival);
					Krmobi.fillDateBox($departureBox, departure);
					$departureCal.mobiscroll('setVal', departure, true);
					self.getQuote();
				}
			});

			let $departureCal = $('#qdeparturedsp').mobiscroll().calendar({
				headerText:    this.quoteoptions.mqSelectCheckout,
				months:        'auto',
				maxDate:       maxDate,
				minDate:       minDate,
				markedText:    true,
				onMonthLoaded: function (year, month, inst) {
					calFirstDate = Krmobi.calFirst(year, month);
					calLastDate = Krmobi.calLast(year, month);
					arrival = $arrivalCal.mobiscroll('getVal');
					minDeparture = self.setDepartureMin(arrival);
					maxDeparture = self.setDepartureMax(arrival, minDeparture);
					inst.settings.invalid = self.setInvalidDatesDeparture(calFirstDate, calLastDate);
					inst.settings.marked = self.setDepartureMarked(arrival, departure, Krmobi.convertToYmd(minDeparture),
						Krmobi.convertToYmd(maxDeparture), calFirstDate, calLastDate);
					inst.refresh();
				},
				onSelect:      function (day, inst) {
					departure = inst.getDate();
					Krmobi.fillDateBox($departureBox, departure);
					self.getQuote();
				}
			});

			if (self.quoteoptions.mqArrival) {
				$arrivalCal.mobiscroll('setVal', arrival, true);
				Krmobi.fillDateBox($arrivalBox, arrival);
				$departureCal.mobiscroll('setVal', departure, true);
				Krmobi.fillDateBox($departureBox, departure);
			}
		}

		initSearchCalendar($element, options) {
			if (options) {
				$.extend(this.searchoptions, options);
			}

			const data_days = $element.data('days');
			const data_maxDays = $element.data('maxdays');
			const data_arrival = $element.data('arrival');
			const data_departure = $element.data('departure');
			const data_atext = $element.data('atext');
			const data_dtext = $element.data('dtext');
			let dateArrival;
			let dateDeparture;

			if (data_arrival) {
				dateArrival = Krmobi.convertFromYmd(data_arrival);
				dateDeparture = Krmobi.convertFromYmd(data_departure);
			} else {
				dateArrival = Krmobi.convertFromYmd('');
				dateDeparture = Krmobi.incrementDate(dateArrival, data_days);
			}

			const minDateDeparture = Krmobi.incrementDate(dateArrival, 1);
			minDate = Krmobi.convertFromYmd('');
			maxDate = Krmobi.incrementDate(minDate, data_maxDays);
			const $startBox = $('#arrival');
			const $endBox = $('#departure');

			const $startCal = $('#arrivaldsp').mobiscroll().calendar({
				headerText: data_atext,
				minDate:    minDate,
				maxDate:    maxDate,
				onSelect:   function (day, inst) {
					dateArrival = inst.getDate();
					Krmobi.fillDateBox($startBox, dateArrival);
					const newMinDate = Krmobi.incrementDate(dateArrival, 1);
					$endCal.mobiscroll('option', {minDate: newMinDate});
					if (dateDeparture < newMinDate || !data_arrival) {
						dateDeparture = Krmobi.incrementDate(dateArrival, data_days);
						$endCal.mobiscroll('setDate', dateDeparture, true);
						Krmobi.fillDateBox($endBox, dateDeparture);
					}
				}
			});
			const $endCal = $('#departuredsp').mobiscroll().calendar({
				headerText: data_dtext,
				minDate:    minDateDeparture,
				maxDate:    maxDate,
				onSelect:   function (day, inst) {
					dateDeparture = inst.getDate();
					Krmobi.fillDateBox($endBox, dateDeparture);
				}
			});

			if (data_arrival) {
				$startCal.mobiscroll('setVal', dateArrival, true);
				Krmobi.fillDateBox($startBox, dateArrival);
				$endCal.mobiscroll('setVal', dateDeparture, true);
				Krmobi.fillDateBox($endBox, dateDeparture);
			}
		}

		checkMinStay(arriveymd) {
			let dateymd = arriveymd;
			let departymd = Krmobi.incrementDateYmd(arriveymd, parseInt(this.quoteoptions.mqMinstay[arriveymd]));
			let free = true;
			let type;

			while (dateymd <= departymd) {
				if (self.quoteoptions.mqAvailability[dateymd] === 'N') {
					free = false
					break;
				}
				type = self.quoteoptions.mqChangeover[dateymd];
				if (dateymd === arriveymd) {
					if (type === 'O' || type === 'X') {
						free = false;
						break;
					}
				} else if (dateymd === departymd) {
					if (type === 'I' || type === 'X') {
						free = false;
						break;
					}
				} else if (type === 'I' || type === 'O' ||
					(type === 'X' && !self.quoteoptions.mqWeekly.hasOwnProperty(dateymd))) {
					free = false;
					break;
				}

				dateymd = Krmobi.incrementDateYmd(dateymd, 1);
			}

			return free;
		}

		setArrivalMarked(arrival, departure, firstymd, lastymd) {
			let marked = [];
			let type;

			while (firstymd < lastymd) {
				if (self.quoteoptions.mqAvailability[firstymd] === 'Y') {
					type = self.quoteoptions.mqChangeover[firstymd];
					if (type === 'O' || type === 'X') {
						marked.push(self.setArrivalMarkedClasses(firstymd, type, false));
					} else if (type === 'C' || type === 'I') {
						marked.push(self.setArrivalMarkedClasses(firstymd, type, self.checkMinStay(firstymd)));
					}
				}

				firstymd = Krmobi.incrementDateYmd(firstymd, 1);
			}

			return Krmobi.markSelectedDates(arrival, departure, marked);
		}

		setArrivalMarkedClasses(ymd, type, free) {
			let another = [];
			let muted = false;
			let myclass = '';
			another['d'] = Krmobi.convertFromYmd(ymd);

			if (type === 'O') {
				myclass = 'departure muted';
				muted = true;
			} else if (type === 'I') {
				myclass = 'arrival';
			}

			if (!free) {
				myclass += ' muted';
				muted = true;
			}

			if (!muted && self.quoteoptions.mqWeekly.hasOwnProperty(ymd)) {
				myclass = myclass ? myclass += ' muted' : 'muted';
			}

			another['text'] = myclass;

			return another;
		}

		setDepartureForArrival(arrive, depart) {
			let min = Krmobi.incrementDate(arrive, parseInt(self.quoteoptions.mqMinstay[Krmobi.convertToYmd(arrive)]));
			let max = Krmobi.incrementDate(arrive, parseInt(self.quoteoptions.mqMaxstay[Krmobi.convertToYmd(arrive)]));

			if (depart < min || depart > max) {
				depart = min;
			}

			let type;
			let valid = true;
			let dateymd = Krmobi.convertToYmd(min);
			let departymd = Krmobi.convertToYmd(depart);

			while (dateymd <= departymd) {
				if (self.quoteoptions.mqAvailability[dateymd] === 'N') {
					valid = false;
					break;
				}
				if (self.quoteoptions.mqWeekly.hasOwnProperty(dateymd)) {
					valid = false;
					break;
				}
				type = self.quoteoptions.mqChangeover[dateymd];
				if (type !== 'O' && type !== 'C') {
					valid = false;
					break;
				}

				dateymd = Krmobi.incrementDateYmd(dateymd, 1);
			}

			if (!valid) {
				depart = Krmobi.incrementDate(Krmobi.convertFromYmd(dateymd), -1)
			}

			return depart;
		}

		setDepartureMarked(arrival, departure, minDepartymd, maxDepartymd, firstymd, lastymd) {
			let marked = [];
			let type;

			while (firstymd < lastymd) {
				if (firstymd < minDepartymd || firstymd > maxDepartymd) {
					marked.push(self.setDepartureMarkedClasses(firstymd, 'X', false));
				} else if (self.quoteoptions.mqAvailability[firstymd] === 'Y') {
					type = self.quoteoptions.mqChangeover[firstymd];
					if (type === 'I') {
						marked.push(self.setDepartureMarkedClasses(firstymd, type, false));
					} else if (type === 'X') {
						marked.push(self.setDepartureMarkedClasses(firstymd, type, true));
					} else if (type === 'C' || type === 'O') {
						marked.push(self.setDepartureMarkedClasses(firstymd, type, true));
					}
				}

				firstymd = Krmobi.incrementDateYmd(firstymd, 1);
			}

			return Krmobi.markSelectedDates(arrival, departure, marked)
		}

		setDepartureMarkedClasses(ymd, type, free) {
			let another = [];
			let muted = false;
			let myclass = '';
			another['d'] = Krmobi.convertFromYmd(ymd);

			if (type === 'O') {
				myclass = 'departure';
				muted = true;
			} else if (type === 'I') {
				myclass = 'arrival muted';
			}

			if (!free) {
				myclass += ' blocked muted';
				muted = true;
			}

			if (!muted && self.quoteoptions.mqWeekly.hasOwnProperty(ymd)) {
				myclass = myclass ? myclass += ' muted' : 'muted';
			}

			another['text'] = myclass;

			return another;
		}

		setDepartureMax(arrive, mindepart) {
			let maxdepart = Krmobi.incrementDate(arrive, this.quoteoptions.mqMaxstay[Krmobi.convertToYmd(arrive)]);
			let dateymd = Krmobi.convertToYmd(mindepart);
			let maxymd = Krmobi.convertToYmd(maxdepart);
			let co;

			while (dateymd < maxymd) {
				if (self.quoteoptions.mqAvailability[dateymd] === 'N') {
					maxdepart = dateymd;
					maxymd = dateymd;
				} else {
					co = self.quoteoptions.mqChangeover[dateymd];
					if ((co === 'X' && !self.quoteoptions.mqWeekly.hasOwnProperty(dateymd)) || co === 'O') {
						maxdepart = dateymd;
						maxymd = dateymd;
					}
				}

				dateymd = Krmobi.incrementDateYmd(dateymd, 1);
			}

			return Krmobi.convertFromYmd(maxymd);
		}

		setDepartureMin(arrive) {
			let calc = Krmobi.convertFromYmd(arrive);
			calc.setDate(calc.getDate() + parseInt(this.quoteoptions.mqMinstay[Krmobi.convertToYmd(arrive)]));

			return calc;
		}

		setInvalidDatesArrival(firstymd, lastymd) {
			let invalid = [];

			while (firstymd < lastymd) {
				if (self.quoteoptions.mqAvailability[firstymd] === 'N') {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				} else if (self.quoteoptions.mqWeekly.hasOwnProperty(firstymd)) {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				} else if (self.quoteoptions.mqChangeover[firstymd] === 'O') {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				} else if (!self.checkMinStay(firstymd)) {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				}

				firstymd = Krmobi.incrementDateYmd(firstymd, 1);
			}

			return invalid;
		}

		setInvalidDatesDeparture(firstymd, lastymd) {
			let invalid = [];

			while (firstymd < lastymd) {
				if (self.quoteoptions.mqAvailability[firstymd] === 'N') {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				} else if (self.quoteoptions.mqWeekly.hasOwnProperty(firstymd)) {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				} else if (self.quoteoptions.mqChangeover[firstymd] === 'I') {
					invalid.push(Krmobi.convertFromYmd(firstymd));
				}

				firstymd = Krmobi.incrementDateYmd(firstymd, 1);
			}

			return invalid;
		}
	}

	$(function () {
		let $init = $('#kr-property-load');
		if ($init.length) {
			const options = {
				mqPid:            $init.data('pid'),
				mqArrival:        $init.data('arrival'),
				mqDeparture:      $init.data('departure'),
				mqMaxdate:        $init.data('maxdate'),
				mqMindate:        $init.data('mindate'),
				mqSelectCheckin:  $init.data('atext'),
				mqSelectCheckout: $init.data('dtext')
			};
			myKrmobi = new Krmobi($init, 'quote', '', options);
		}

		$('.kr-quote-auto').on('change', function (e) {
			e.preventDefault();
			if (quoteData) {
				myKrmobi.getQuote();
			}
		});
		$('.kr-quote-auto-click').on('click', function (e) {
			e.preventDefault();
			if (quoteData) {
				myKrmobi.getQuote();
			}
		});

		const $search = $('#arrivaldsp');
		if ($search.length) {
			new Krmobi($search, 'search');
		}
	});

	$('body').on('initajaxsearch', function () {
		const $search = $('#arrivaldsp');
		if ($search.length) {
			new Krmobi($search, 'search');
		}
	});
}(jQuery));