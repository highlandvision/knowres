/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 *
 * Based on
 * JQuery fn.gantt chart plugin v1.2.0
 * Copyright 2011 by Marek Bielańczuk
 * http://mbielanczuk.com/
 * Released under the MIT and GPL Licenses.
 */

if (typeof jQuery === 'undefined') jQuery.noConflict();

(function ($) {
	let myGantt;
	let scrollTo;
	let ui_aDate;
	let ui_dDate;
	let ui_eDate;
	let ui_minDays;
	let ui_booked;
	let $to;

	class KrGantt {
		constructor($element, options) {
			this.settings = {
				source:     [],
				months:     ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				dow:        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				dowClass:   ['sn', 'wd', 'wd', 'wd', 'wd', 'wd', 'sa'],
				waitText:   'Please wait...',
				noResults:  'Sorry no results found ....',
				width:      600,
				cellHeight: 50,
				cellWidth:  30,
				popOver:    true,
				from:       KrGantt.getToday(),
				properties: []
			};

			this.ganttdata = {
				booked: [], options: [],
			};
			if (options) {
				$.extend(this.settings, options);
			}

			this.element = $element;
			this.setSource();
		}

		static dateToYmd(date) {
			// getMonth() is zero-based
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (month < 10) {
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}

			return [date.getFullYear(), month, day].join('-');
		}

		static diffDays(date1, date2) {
			const dt1 = new Date(date1);
			const dt2 = new Date(date2);
			return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
		}

		static getShowFrom(date) {
			let from = new Date(date);
			from.setHours(0, 0, 0);
			return from;
		}

		static getToday() {
			return KrGantt.dateToYmd(new Date());
		}

		static nameRow(name) {
			return $('<div class="grow name"><div class="cell">' + name + '</div></div>');
		}

		static parseDateRange(from, to) {
			let dates = [];
			let start = new Date(from);
			const end = new Date(to);

			while (start <= end) {
				dates.push(new Date(start));
				start.setDate(start.getDate() + 1);
			}

			return dates;
		}

		static propertyPanel(width) {
			return $('<div class="propertyPanel" style="width: ' + width + 'px;">');
		}

		static toArray(data) {
			if (data.includes(',')) {
				data = data.split(',');
				data = data.map(str => {
					return Number(str);
				});
			} else {
				data = [Number(data)];
			}

			return data;
		}

		static waitToggle(show) {
			if (!show) {
				$('.fn-gantt-loader').hide();
			}
		}

		createProgressBar(days, bID, barclass, label, arrivebefore, leaveafter) {
			const width = (days * this.settings.cellWidth) - 2;
			const bar = $("<div class='bar' data-bs-original-title=''><p>" + label + "</p></div>").addClass(barclass).addClass(arrivebefore).addClass(leaveafter).css({
				width: width
			});

			bar.click(function (e) {
				e.preventDefault();
				let block = 'c';
				if (barclass === 'ganttGrey')
					block = 'i';

				$.ajax({
					type:     'POST',
					url:      'index.php?option=com_knowres&task=contract.modalshow',
					data:     {id: bID, block: block},
					dataType: 'json',
					success:  function (result) {
						$('#kr-gantt-modal-show .modal-content').empty().append(result.data.html).draggable({
							handle: '.modal-header'
						});
						$('#kr-gantt-modal-show').modal('show');
						$('#kr-gantt-tab').tab();
					},
					error:    function () {
						KrGantt.waitToggle(false);
						document.getElementById("ganttselections").innerHTML = 'Sorry we are unable to process your request at the moment. Please try again later!';
					},
				});
			});

			if (barclass === 'ganttBook' || barclass === 'ganttProv') {
				bar.hover(function (e) {
					e.preventDefault();
					if (!bar.attr('data-bs-original-title')) {
						$.ajax({
							type:     'POST',
							url:      'index.php?option=com_knowres&task=gantt.tooltip',
							data:     {id: bID},
							dataType: 'html',
							success:  function (data) {
								bar.attr('data-bs-container', 'body');
								bar.attr('data-bs-content', data);
								bar.attr('data-bs-html', true);
								bar.attr('data-bs-title', label);
								bar.attr('data-bs-toggle', 'popover')
								bar.attr('data-bs-trigger', 'manual')
								bar.popover('toggle');
							}
						});
					} else {
						bar.popover('toggle');
					}
				});
			}

			return bar;
		}

		createSearchSelection(data) {
			const selection = $("<a href='#' data-id=" + data.id + "><i class='fa-solid fa-times'></i> " + data.name + "</a>").addClass('remove');
			const self = this;
			selection.click(function (e) {
				e.preventDefault();
				const ids = $(this).data('id').toString();
				let removals = KrGantt.toArray(ids);

				for (let property = 0; property <= removals.length; property++) {
					for (let i = self.settings.properties.length - 1; i >= 0; i--) {
						if (parseInt(self.settings.properties[i]) === parseInt(removals[property])) {
							self.settings.properties.splice(i, 1);
							break;
						}
					}
				}

				$(this).remove();
				self.renderChart();
			});

			return selection;
		}

		// render the top 2 rows with months and days
		dataPanel(range) {
			const months = $('<div class="grow">');
			let dowStr = '';
			let year = range[0].getFullYear();
			let daysInMonth = 0;
			let month = range[0].getMonth();
			let days = range.length;

			for (let i = 0; i < range.length; i++) {
				const rday = range[i];

				if (rday.getMonth() !== month) {
					months.append($('<div class="cell gheader month" style="width:' + this.settings.cellWidth * daysInMonth + 'px;"><div class="gantt-label">' + this.settings.months[month] + ' ' + year + '</div></div>'));

					month = rday.getMonth();
					days = days - daysInMonth;
					daysInMonth = 0;
				}

				if (rday.getFullYear() !== year) {
					year = rday.getFullYear();
				}

				daysInMonth++;

				let getDay = rday.getDay();
				let dayClass = this.settings.dowClass[rday.getDay()];

				dowStr += '<div class="cell day head ' + dayClass + '">' + ' <div class="gantt-label">' + this.settings.dow[getDay] + '<br>' + rday.getDate() + '</div></div>';
			}

			// Last month
			const lastwidth = (this.settings.cellWidth * days) - 5;
			months.append('<div class="cell gheader month" style="width:' + lastwidth + 'px;"><div class="gantt-label">' + this.settings.months[month] + ' ' + year + '</div></div>');

			// var width = range.length * this.getCellWidth;
			return $('<div class="dataPanel"></div>').append(months).append($('<div class="grow">').html(dowStr));
		}

		fillData(properties, showFrom, showTo) {
			const self = this;
			let bar, dl, start, end, $cell, carrive, cdepart, arrivebefore, leaveafter;

			$.each(this.ganttdata.booked, function (i, entry) {
				if (!properties.length || $.inArray(entry.id, properties) !== -1) {
					$.each(entry.values, function (j, day) {
						/** @namespace day.arrive */
						/** @namespace day.depart */
						if (day.arrive > showTo || day.depart < showFrom) {
							return;
						}
						end = new Date(day.depart);
						start = new Date(day.arrive);
						dl = day.days;
						arrivebefore = '';
						leaveafter = '';
						carrive = day.arrive;
						cdepart = day.depart;

						while (start < end) {
							$cell = $('#d' + i + '-' + KrGantt.dateToYmd(start));
							if ($cell.hasClass('bookme')) {
								$cell.removeClass('bookme');
							}
							start.setDate(start.getDate() + 1);
						}

						if (carrive < showFrom && cdepart > showTo) {
							dl = dl + 2;
							carrive = showFrom;
							arrivebefore = 'arrivebefore';
							leaveafter = 'leaveafter';
						} else if (carrive < showFrom) {
							dl = KrGantt.diffDays(showFrom, cdepart) + 1;
							carrive = showFrom;
							arrivebefore = 'arrivebefore';
						} else if (cdepart > showTo) {
							dl = KrGantt.diffDays(carrive, showTo) + 1;
							leaveafter = 'leaveafter';
						}

						bar = self.createProgressBar(dl, day.id ? day.id : '', day.customClass, day.label, arrivebefore, leaveafter);

						$cell = $('#d' + i + '-' + carrive);
						$cell.append(bar);
					});
				}
			});
		}

		// Get the show to date based on the element width
		getShowTo(from) {
			const days = Math.floor(this.settings.width / this.settings.cellWidth) - 1;
			let to = new Date(from);
			to.setDate(to.getDate() + days);
			return KrGantt.dateToYmd(to);
		}

		// Controls the render of the chart
		renderChart(from = null, properties = []) {
			KrGantt.waitToggle(true);

			if (localStorage.getItem('ganttFrom') !== null) {
				from = localStorage.getItem('ganttFrom');
				properties = [];
				if (localStorage.getItem('ganttProperties')) {
					properties = KrGantt.toArray(localStorage.getItem('ganttProperties'));
				}
				scrollTo = localStorage.getItem('ganttScrollTo');
				document.getElementById("ganttselections").innerHTML = localStorage.getItem('ganttSelections');
				const $picker1 = $('#ganttpicker1');
				const tmp = KrGantt.getShowFrom(from);
				const altDate = $.datepicker.formatDate('yy-mm-dd', tmp);
				$picker1.val(altDate);
				const dspDate = $.datepicker.formatDate('d M yy', tmp);
				$('#ganttpicker').val(dspDate);

				localStorage.removeItem('ganttFrom');
				localStorage.removeItem('ganttProperties');
				localStorage.removeItem('ganttGanttScrollTo');
				localStorage.removeItem('ganttSelections');
			}

			if (from !== null) {
				this.settings.from = from;
			}
			if (properties.length !== 0) {
				this.settings.properties = properties;
			}

			const to = this.getShowTo(this.settings.from);
			const range = KrGantt.parseDateRange(this.settings.from, to);

			let content = $('<div class="fn-content">');
			const $dataPanel = this.dataPanel(range);
			content.append($dataPanel);

			const $rightPanel = this.rightPanel(range, this.settings.properties);
			content.append($rightPanel);

			this.element.gantt = $('<div class="fn-gantt">').append(content);
			$(this.element).html(this.element.gantt);

			this.fillData(this.settings.properties, this.settings.from, to);

			$(this.element).css({
				height: $(this.element).find('.fn-gantt').height() + 'px'
			});

			if (scrollTo) {
				$('.rightPanel').scrollTop(scrollTo);
				scrollTo = 0;
			}

			KrGantt.waitToggle(false);
		}

		// Creates Data container with header
		rightPanel(range, properties) {
			let day = range[0];
			let propertyPanel = KrGantt.propertyPanel(range.length * this.settings.cellWidth);
			let entry;
			let todayCls;
			let dRow;
			let arrival;
			const today = KrGantt.getToday();

			// Generate grid
			for (let i = 0; i < this.ganttdata.booked.length; i++) {
				entry = this.ganttdata.booked[i];

				if (!properties.length || $.inArray(entry.id, properties) !== -1) {
					arrival = '';
					dRow = '<div class="grow">';

					for (let x = 0; x < range.length; x++) {
						day = range[x];
						arrival = KrGantt.dateToYmd(day);
						todayCls = this.settings.dowClass[day.getDay()];

						if (arrival >= today && entry.bookme) {
							dRow += '<div class="cell day bookme ' + todayCls + '" data-arrival="' + arrival + '" data-id="' + entry.id + '" id="d' + i + '-' + arrival + '"></div>';
						} else {
							dRow += '<div class="cell day ' + todayCls + '" data-arrival="' + arrival + '"  data-id="' + entry.id + '" id="d' + i + '-' + arrival + '"></div>';
						}
					}

					propertyPanel.append(KrGantt.nameRow(entry.name));
					propertyPanel.append($(dRow + '</div>'));
				}
			}

			return $('<div class="rightPanel"></div>').append(propertyPanel);
		}

		searchOptions() {
			const ganttsearch = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				local:          this.ganttdata.options
			});

			ganttsearch.initialize();
			const self = this;

			$('.typeahead').typeahead({
				minLength: 2,
				highlight: true
			}, {
				name: 'ganttsearch', source: ganttsearch.ttAdapter(), limit: 10, displayKey: 'name', templates: {
					suggestion: function (ganttsearch) {
						/** @namespace ganttsearch.arrival */
						/** @namespace ganttsearch.icon */
						/** @namespace ganttsearch.name */
						/** @namespace ganttsearch.property_name */
						if (ganttsearch.type === 'property') {
							return '<div><a href="javascript:void(0)"><i class="' + ganttsearch.icon + '">&nbsp;</i>' + ganttsearch.name + '<br><span>' + ganttsearch.region + '</span></a></div>';
						} else if (ganttsearch.type === 'guest') {
							return '<div><a href="javascript:void(0)"><i class="' + ganttsearch.icon + '">&nbsp;</i>' + ganttsearch.name + '<br><span>' + ganttsearch.property_name + ' ' + ganttsearch.arrival + '</span></a></div>';
						} else if (ganttsearch.type === 'region') {
							return '<div><a href="javascript:void(0)"><i class="' + ganttsearch.icon + '">&nbsp;</i>' + ganttsearch.name + '<br><span>All Properties</span></a></div>';
						}
					}, empty:   function () {
						return '<div>' + self.settings.noResults + '</div>';
					}
				}
			}).on('typeahead:selected', function (e, datum) {
				let $tracker = $('#ganttselections');
				if (datum.type === 'property') {
					if (self.settings.properties.length) {
						self.settings.properties.push(datum.id);
					} else {
						self.settings.properties = [datum.id];
					}
					$tracker.append(self.createSearchSelection(datum));
					self.renderChart();
				} else if (datum.type === 'guest') {
					$('.uicalendar').datepicker('setDate', datum.arrival);
					/** @namespace datum.arrival_ymd */
					/** @namespace datum.id */
					self.renderChart(datum.arrival_ymd);
					self.modalShow(datum.id);
				} else if (datum.type === 'region') {
					if (self.settings.properties.length) {
						self.settings.properties = self.settings.properties.concat(datum.id);
					} else {
						self.settings.properties = datum.id;
					}

					$tracker.append(self.createSearchSelection(datum));
					self.renderChart();
				}

				$(this).typeahead('val', '');
			});

			self.renderChart();
		}

		setSource() {
			let self = this;
			let token = $('#token').attr('name');
			$.ajax({
				url:      this.settings.source,
				type:     'POST',
				dataType: 'json',
				data:     {[token]: '1'},
				success:  function (result) {
					if (result.success) {
						self.ganttdata.booked = result.data.booked;
						self.ganttdata.options = result.data.options;
						self.searchOptions();
					} else {
						KrGantt.waitToggle(false);
						document.getElementById("ganttselections").innerHTML = result.message;
					}
				},
				error:    function () {
					KrGantt.waitToggle(false);
					document.getElementById("ganttselections").innerHTML = 'Sorry we are unable to process your request at the moment. Please try again later!';
				},
			});
		}

		modalShow(bID, block = 'c') {
			$.ajax({
				type:     'POST',
				url:      'index.php?option=com_knowres&task=contract.modalshow',
				data:     {id: bID, block: block},
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						$('#kr-gantt-modal-show .modal-content').empty().append(result);
						$('#kr-gantt-modal-show').modal('show');
						$('#kr-gantt-tab').tab();
					}
				},
				error:    function () {
					KrGantt.waitToggle(false);
					document.getElementById("ganttselections").innerHTML = 'Sorry we are unable to process your request at the moment. Please try again later!';
				},
			});
		}
	}

	$(function () {
		const gantt = $('.kr-gantt');
		if (gantt.length) {
			const filterWidth = Math.floor(document.getElementById('filter-bar').clientWidth);
			const params = {
				source: 'index.php?option=com_knowres&task=gantt.data', width: filterWidth
			};

			myGantt = new KrGantt(gantt, params);
		}

		const $cal = $('#ganttpicker');
		if ($cal.length) {
			$cal.datepicker({
				altField:          '#ganttpicker1',
				altFormat:         'yy-mm-dd',
				buttonText:        '<i class="fa-solid fa-calendar-alt"></i>',
				changeMonth:       true,
				changeYear:        true,
				dateFormat:        'd M yy',
				firstDay:          1,
				maxDate:           '+5Y',
				minDate:           '-6M',
				numberOfMonths:    1,
				selectOtherMonths: false,
				showButtonPanel:   true,
				showOn:            'both',
				showOtherMonths:   false,
				onSelect:          function (dateText, inst) {
					let month = inst.currentMonth + 1;
					if (month < 10) {
						month = '0' + month;
					}
					let day = inst.currentDay;
					if (inst.currentDay < 10) {
						day = '0' + inst.currentDay;
					}
					let date = inst.currentYear + '-' + month + '-' + day;
					scrollTo = $('.rightPanel').scrollTop();
					myGantt.renderChart(date);
				}
			});
		}

		$(document).on('click', '.bookme', function () {
			const arrival = $(this).data('arrival');

			let formData = new FormData();
			formData.append('property_id', $(this).data('id'));
			formData.append('arrival', $(this).data('arrival'));
			formData.append('source', 'gantt');

			localStorage.setItem('ganttProperties', myGantt.settings.properties);
			localStorage.setItem('ganttFrom', myGantt.settings.from);
			localStorage.setItem('ganttScrollTo', $('.rightPanel').scrollTop());
			localStorage.setItem('ganttSelections', $('#ganttselections').html());

			$.ajax({
				url:         'index.php?option=com_knowres&task=contract.modalbook',
				dataType:    'json',
				method:      'post',
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

						$('#kr-gantt-modal-book .modal-content').empty().append(result.data.html).draggable({
							handle: '.modal-header'
						});
						$('#kr-gantt-modal-book').modal('show');
						$('#kr-gantt-tab').tab();

						const mdyFormat = 'mm/dd/yy',
						      $from     = $('#jform_arrivaldsp').datepicker({
							      altField:          '#arrival',
							      altFormat:         'yy-mm-dd',
							      buttonText:        '<i aria-label="Select date" class="fa-solid fa-calendar-alt"></i>',
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
							      $to.datepicker('option', 'minDate', getDpDate(this, mdyFormat));
							      let new2 = $('#jform_arrivaldsp').datepicker('getDate', '+1d');
							      new2.setDate(new2.getDate() + 1);
							      $('#jform_departuredsp').datepicker('setDate', new2);
							      ui_dDate = $.datepicker.formatDate('yy-mm-dd', new Date(new2));
							      $('#kr-gantt-book-modal #arrival').val(ui_aDate);
						      }), $to   = $('#jform_departuredsp').datepicker({
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
							      $from.datepicker('option', 'maxDate', getDpDate(this, mdyFormat));
							      $('#kr-gantt-book-modal #departure').val(ui_dDate);
						      });
					}
				},
				error:       function () {
					KrGantt.waitToggle(false);
					document.getElementById("ganttselections").innerHTML = 'Sorry we are unable to process your request at the moment. Please try again later!';
				},
			});
		}).on('click', '#newreservation', function (e) {
			e.preventDefault();
			let link = $(this).attr('href');
			let id = $(this).data('id');
			link = link + '&property_id=' + id + '&arrival=' + $("#arrival").val() + '&departure=' + $("#departure").val();
			window.location.replace(link);
		}).on('click', '.modalshowcancel', function (e) {
			e.preventDefault();
			const id = $(this).data('id');
			localStorage.setItem('ganttProperties', myGantt.settings.properties);
			localStorage.setItem('ganttFrom', myGantt.settings.from);
			localStorage.setItem('ganttScrollTo', $('.rightPanel').scrollTop());
			localStorage.setItem('ganttSelections', $('#ganttselections').html());
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

		$('.ganttchange').on('click', function (e) {
			e.preventDefault();
			const $picker1 = $('#ganttpicker1');
			const direction = $(this).data('direction');
			let from;

			if (!direction) {
				from = new Date();
			} else {
				let days = Math.floor(myGantt.settings.width / 30) - 1;
				from = new Date($picker1.val());
				from.setHours(0, 0, 0);
				if (direction === 'left') {
					from = new Date(from.setDate(from.getDate() - days));
				} else {
					from = new Date(from.setDate(from.getDate() + days));
				}
			}

			scrollTo = $('.rightPanel').scrollTop();
			myGantt.renderChart(KrGantt.dateToYmd(from));
			const altDate = $.datepicker.formatDate('yy-mm-dd', from);
			$picker1.val(altDate);
			const dspDate = $.datepicker.formatDate('d M yy', from);
			$('#ganttpicker').val(dspDate);
		});
	});

	function getDpDate(element, format) {
		let date;
		try {
			date = $.datepicker.parseDate(format, element.value);
		} catch (error) {
			date = null;
		}

		return date;
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
})(jQuery);