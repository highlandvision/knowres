(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["site"], {

	/***/ "./com_knowres/media/js/src/site/app.js":
	/*!**********************************************!*\
	 !*** ./com_knowres/media/js/src/site/app.js ***!
	 \**********************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		let lang;
		let searchdata = [];
		let searchDone = false;
		let calendarLoaded = false;
		let savedwidth = false;
		let large;
		let resized = false;
		if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host;
		const livesite = window.location.origin + '/';

		(function ($) {
			$(function () {
				Foundation.addToJquery();
				$(document).foundation();
				lang = $('#kr-lang').data('krlang');
				checkScreenWidth();
				$(window).on("resize", function () {
					checkScreenWidth();
				});
				const bars = $('.kr-rating');

				if (bars.length) {
					bars.barrating('show', {
						showValues:         true,
						showSelectedRating: false
					});
				}

				$(document).on('submit', '.ajaxform', function (e) {
					e.preventDefault();
					const $form = $(this);
					$.ajax({
						type:     'POST',
						url:      $form.attr('action') + '&lang=' + lang,
						data:     $form.serialize(),
						dataType: 'json',
						success:  function (result) {
							if (result.success) {
								if (result.data) {
									formResponse($form.attr('id'), result.data);
								} else {
									window.location.href = livesite;
								}
							} else {
								$('.kr-ajax-modal-error-message').html(result.message);
								const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
								$modal.open();
							}
						},
						error:    function () {
							$('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
							const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
							$modal.open();
						}
					});
				}).on('hide.zf.dropdown', '#kr-quote-form', function () {
					$('#guests').trigger('change');
				}).on('open.zf.reveal', '.kr-ajax-modal[data-reveal]', function (e) {
					e.preventDefault();
					const modalid = "#" + $(this).attr('id');

					if (!$.trim($(modalid).html()).length) {
						const ajaxurl = $(this).data('ajaxurl');

						if (ajaxurl) {
							$.ajax({
								type:    'POST',
								url:     ajaxurl,
								success: function (content) {
									$(modalid).html(content).trigger('resizeme.zf.reveal');
									$(modalid).foundation();
								}
							});
						}
					}
				}).on('click', '.favspan', function (e) {
					e.preventDefault();
					const $this = $(this);
					$.ajax({
						type:     'POST',
						url:      livesite + 'index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
						data:     {
							'property_id': $this.data('property'),
							'view':        $this.data('view')
						},
						dataType: 'json',
						success:  function (result) {
							if (result.success) {
								if (result.data.action === 'hideme') {
									const element = "#" + $this.find('.has-tip').data('toggle');
									$(element).remove();
									$this.parents('.kr-properties .kr-property .favs:first').hide('slow');
								} else if (result.data.action !== 'none') {
									const $target = $this.find('i.fa-heart');
									$target.toggleClass('in');
									const val1 = '#' + $target.data('toggle');
									$(val1).text(result.data.action).hide();
								}
							}
						}
					});
				}).on('click', '.getResponseSearch', function (e) {
					e.preventDefault();
					getProperties($(this).data('field'), $(this).data('value'));
				}).on('click', '.kr-filters-close', function (e) {
					e.preventDefault();
					$('.kr-filters.top').addClass('hideme');
					$(this).removeClass('active');
				}).on('click', '.sidebar .kr-filters ul.filter-sort-list li.head', function (e) {
					e.preventDefault();
					$(this).parent().children('li.checkbox').toggle();
					$(this).toggleClass('active');
				}).on('click', '#showgateways', function (e) {
					e.preventDefault();
					$('#kr-gateways').toggleClass('hideme');
				}).on('click', '#kr-show-sortby', function (e) {
					e.preventDefault();
					$('.kr-filters.top').addClass('hideme');
					$('.kr-sortby.top').toggleClass('hideme');
					setActiveMenu('sort');
				}).on('click', '#kr-show-filterby', function (e) {
					e.preventDefault();
					$('.kr-sortby.top').addClass('hideme');
					$('.kr-filters.top').toggleClass('hideme');
					setActiveMenu('filter');
				}).on('click', '.kr-filters-close', function (e) {
					e.preventDefault();
					$('.kr-filters.top').addClass('hideme');
					setActiveMenu('list');
				}).on('click', '.toggleother', function (e) {
					e.preventDefault();
					$(this).data('other').toggle();
				});

				if ($('.kr-properties').length && !searchDone) {
					getProperties('view', $(this).data('view'));
				}

				let $tabs = $('.tabs');

				if ($('#kr-property-tabs').length && !calendarLoaded) {
					$tabs.find('a').each(function () {
						if ($(this).attr('href') === "#calendar") {
							const pid = $(this).data('pid');
							loadCalendar(pid);
							calendarLoaded = true;
						}
					});
				}
			});
			$.event.special.touchstart = {
				setup: function (_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchstart", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchstart", handle, {
							passive: true
						});
					}
				}
			};
			$.event.special.touchmove = {
				setup: function (_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchmove", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchmove", handle, {
							passive: true
						});
					}
				}
			};

			function loadCalendar(pid) {
				$.ajax({
					type:     'POST',
					url:      livesite + 'index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
					dataType: 'html',
					data:     {
						'pid': pid
					},
					success:  function (data) {
						$('#calendar.tabs-panel').append(data);
					}
				});
			}

			function formResponse(id, data) {
				if (data.hasOwnProperty('redirect')) {
					window.location.replace(data.redirect);
				} else if (id === 'kr-form-payment') {
					if (data.hasOwnProperty('html')) {
						let $modal = $('#kr-gateway-modal');
						$modal.html(data.html).trigger('resizeme.zf.reveal');
						$modal.foundation('open');
					} else {
						window.location.href = livesite;
					}
				} else if (id === 'kr-form-mailchimp') {
					$('#response2').html(data);
				}
			}

			function getProperties(field, value) {
				$.ajax({
					url:      livesite + 'index.php?option=com_knowres&view=properties&format=raw&lang=' + lang,
					type:     'POST',
					data:     {
						'field': field,
						'value': value
					},
					dataType: 'json',
					success:  function (data) {
						searchdata = data;

						if (!searchdata) {
							window.location.reload();
							return;
						} // noinspection OverlyComplexBooleanExpressionJS


						if (field === 'order' || field === 'view' || field === 'favs' || field === 'map') {
							setActiveMenu(searchdata['view']);
						}

						setSearchData(searchdata, field);
						$('.has-tip').foundation();
						$('.dropdown-pane').foundation();

						if (!large && field === 'order') {
							$('#sortby').trigger('click');
						}

						searchDone = true;
					}
				});
			}

			function setSearchData(response) {
				let field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

				if (response) {
					$('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
					$('.kr-pager').html(response['pagination']);

					if (large === true) {
						$("#kr-properties-search-off-canvas").html('');
						$("#kr-properties-filters-off-canvas").html('');
						$("#kr-properties-sortby-off-canvas").html('');
						$("#kr-sidebar-search").empty().html(response['search']);
						$('#kr-properties-filters').empty().html(response['filters']);
						$('#kr-properties-sortby').empty().html(response['sortby']).addClass('hideme');
					} else {
						$('#kr-properties-filters').html('');
						$('#kr-properties-sortby').html('');
						$("#kr-sidebar-search").html('');
						$("#kr-properties-filters-off-canvas").html(response['filters']);
						$("#kr-properties-sortby-off-canvas").html(response['sortby']);
						$("#kr-properties-search-off-canvas").html(response['search']);
					}

					if (response['search'].length && $('#arrivaldsp').length) {
						$('body').trigger('initajaxsearch');
					}

					$('.sidebar .kr-filters ul.filter-sort-list li.head').each(function () {
						if ($(this).hasClass('active')) {
							$(this).parent().children('li.checkbox').show();
						} else {
							$(this).parent().children('li.checkbox').hide();
						}
					});

					if (field === 'page') {
						window.scrollTo(0, 0);
					}
				}
			}

			function setActiveMenu(item) {
				const bar = $('.kr-searchbar').find('li');
				$.each(bar, function (index, bar) {
					$(bar).removeClass('is-active');
				});
				const element = '.kr-searchbar li.' + item;
				$(element).addClass('is-active');
			} // Return true if width has changed


			function screenWidthHasChanged() {
				large = Foundation.MediaQuery.atLeast('large');

				if (large !== savedwidth) {
					savedwidth = large;
					return true;
				} else return false;
			}

			function checkScreenWidth() {
				resized = false;

				if (screenWidthHasChanged() && searchdata['items'] && !resized) {
					setSearchData(searchdata);
					resized = true;
				}
			}

			$.event.special.touchstart = {
				setup: function (_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchstart", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchstart", handle, {
							passive: true
						});
					}
				}
			};
			$.event.special.touchmove = {
				setup: function (_, ns, handle) {
					if (ns.includes("noPreventDefault")) {
						this.addEventListener("touchmove", handle, {
							passive: false
						});
					} else {
						this.addEventListener("touchmove", handle, {
							passive: true
						});
					}
				}
			};
		})(jQuery);

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/comboregion.js":
	/*!******************************************************!*\
	 !*** ./com_knowres/media/js/src/site/comboregion.js ***!
	 \******************************************************/
	/***/ (() => {

		"use strict";
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		document.querySelectorAll('.countrychain').forEach(item => {
			item.addEventListener('change', event => {
				event.preventDefault();
				let target = document.getElementById(item.dataset.target);
				setRegionSelect(item.value).then(data => {
					if (target.options.length > 0) {
						target.options.length = 0;
					}

					for (let i = 0; i < data['k'].length; i++) {
						target.options[target.options.length] = new Option(data['v'][i], data['k'][i]);
					}
				});
			});
		}, false);

		async function setRegionSelect(id) {
			let data = new URLSearchParams();
			data.append(`country_id`, id);
			const options = {
				method: 'POST',
				body:   data
			};
			const response = await fetch('index.php?option=com_knowres&task=regions.chained', options);

			if (!response.ok) {
				alert('Sorry we have enountered a problem please try again or contact us');
			} else {
				let result = await response.json();

				if (result.success) {
					return result.data;
				}

				alert(result.message);
			}
		}

		document.addEventListener('DOMContentLoaded', function () {
			let element = document.getElementById('jform_country_id');

			if (typeof element != 'undefined' && element != null) {
				let changeEvent = new Event('change');
				element.dispatchEvent(changeEvent);
			}
		});

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/confirm.js":
	/*!**************************************************!*\
	 !*** ./com_knowres/media/js/src/site/confirm.js ***!
	 \**************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		(function ($) {
			if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host;
			const livesite = window.location.origin + '/';
			let lang = $("#kr-lang").data('krlang');
			let myConfirm;

			class Krconfirm {
				constructor($form) {
					this.form = $form;
					this.init();
				}

				init() {
					this.updateQuote(this.form);
				}

				updateQuote($form) {
					jQuery.ajax({
						type:     'POST',
						url:      livesite + 'index.php?option=com_knowres&task=confirm.compute&lang=' + lang,
						data:     $form.serializeArray(),
						dataType: 'json',
						success:  function (result) {
							if (result.success) {
								const data = result.data;

								if (data.hasOwnProperty('redirect')) {
									window.location.replace(data.redirect);
								}

								let div;
								$.each(result.data.response, function (key, val) {
									$('.hideinitial').show();
									div = "#" + key;
									$(div).text(val);
									$(div).html(val);
									$(div).val(val);
									$(div).show();
								});
							} else {
								$('.kr-ajax-modal-error-message').html(result.message);
								const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
								$modal.open();
							}
						}
					});
				}

			}

			$(function () {
				let $element = $('#kr-form-confirm');

				if ($element.length) {
					myConfirm = new Krconfirm($element);
				}

				$element.on('change, click', '.kr-calculate', function (e) {
					e.preventDefault();
					$element = $('#kr-form-confirm');
					myConfirm.updateQuote($element);
				});
				$(document).on('submit', '.jsonform', function (e) {
					e.preventDefault();
					const $form = $(this);
					$.ajax({
						type:     'POST',
						url:      $form.attr('action') + '&lang=' + lang,
						data:     $form.serialize(),
						dataType: 'json',
						success:  function (result) {
							if (result.success) {
								window.location.href = result.data.redirect;
							} else {
								$('.kr-ajax-modal-error-message').html(result.message);
								const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
								$modal.open();
							}
						},
						error:    function () {
							$('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
							const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
							$modal.open();
						}
					});
				}).on('click', '#checkterms', function (e) {
					e.preventDefault();

					if (checkTerms()) {
						$('#checkterms').trigger('submit');
					}
				});
			}); // noinspection JSUnusedLocalSymbols

			function checkTerms() {
				let result = true;
				const test = document.getElementById('agreecheck');
				const testc = document.getElementById('agreecheckc');
				const testt = document.getElementById('agreecheckt'); // noinspection JSUnresolvedVariable

				if (test && !document.getElementById('kr-form-payment').agreecheck.checked) {
					result = false;
				} // noinspection JSUnresolvedVariable


				if (testc && !document.getElementById('kr-form-payment').agreecheckc.checked) {
					result = false;
				} // noinspection JSUnresolvedVariable


				if (testt && !document.getElementById('kr-form-payment').agreecheckt.checked) {
					result = false;
				}

				if (result) {
					return true;
				} else {
					const $modal = new Foundation.Reveal($('#errorModal'));
					$modal.open();
					return false;
				}
			}
		})(jQuery);

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/dobentry.js":
	/*!***************************************************!*\
	 !*** ./com_knowres/media/js/src/site/dobentry.js ***!
	 \***************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.host;
		}

		(function ($) {
			let myKrDobEntry;
			let today;
			let key = {
				BACKSPACE: 8
			};
			let settings = {
				custom_validation:     false,
				days_in_month:         [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				document_date:         false,
				errorbox_x:            1,
				errorbox_y:            5,
				field_hint_text_day:   'DD',
				field_hint_text_month: 'MM',
				field_hint_text_year:  'YYYY',
				field_order:           'DMY',
				field_width_day:       6,
				field_width_month:     6,
				field_width_year:      7,
				field_width_sep:       2,
				max_date:              false,
				min_year:              1910,
				month_name:            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				on_blur:               false,
				on_error:              false,
				on_change:             false,
				parse_date:            true,
				separator:             '/',
				show_errors:           true,
				show_hints:            true,
				E_DAY_NAN:             'Day must be a number',
				E_DAY_TOO_BIG:         'Day must be 1-31',
				E_DAY_TOO_SMALL:       'Day must be 1-31',
				E_BAD_DAY_FOR_MONTH:   'Only %d days in %m %y',
				E_MONTH_NAN:           'Month must be a number',
				E_MONTH_TOO_BIG:       'Month must be 1-12',
				E_MONTH_TOO_SMALL:     'Month cannot be 0',
				E_YEAR_NAN:            'Year must be a number',
				E_YEAR_LENGTH:         'Year must be 4 digits',
				E_YEAR_TOO_SMALL:      'Year must not be before %y',
				E_MIN_DATE:            'Date must be after %DATE',
				E_MAX_DATE:            'Date must not be in the future'
			};

			class KrDobEntry {
				constructor($element, options) {
					today = KrDobEntry.getYmd(new Date());
					this.input_day = 0;
					this.input_month = 0;
					this.input_year = 0;
					this.$element = $element;

					if (options) {
						$.extend(settings, options);
					}

					this.init();
				}

				static getYmd(date) {
					const m = date.getMonth() + 1;
					const d = date.getDay();
					return date.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
				}

				static getYmdObject(date) {
					return date.year + '-' + date.month + '-' + date.day;
				}

				addEntryFields() {
					let dobfield = this;
					dobfield.fields = [];
					$.each(settings.field_order.split(''), function (i, field) {
						switch (field) {
							case 'D':
								dobfield.buildField('day', i);
								break;

							case 'M':
								dobfield.buildField('month', i);
								break;

							case 'Y':
								dobfield.buildField('year', i);
								break;

							default:
								throw "Unexpected field order '" + field + "' expected D, M or Y";
						}
					});
				}

				afterPaste(target) {
					if (this.parseDate($(target).val())) {
						this.setDate($(target).val());
					}
				}

				buildField(name, index) {
					let krdobentry = this;
					let input = new KrDobInput({
						name:       name,
						krdobentry: krdobentry,
						index:      index,
						hint_text:  settings.show_hints ? settings['field_hint_text_' + name] : null
					});
					this.inner.append(input.$input);
					this['input_' + name] = input;

					if (index < 2) {
						this.inner.append($('<span class="separator" />').text(settings.separator));
					}

					this.fields[index] = input;
					this[name] = input;
				}

				buildUi() {
					let dobfield = this;
					this.wrapper = $(this.$element.wrap('<span class="jq-dte" />').parent()[0]);
					this.inner = $('<span class="jq-dte-inner" />');
					this.addEntryFields();
					this.errorbox = $('<span class="jq-dte-errorbox" />').hide();
					this.inner.on('paste', 'input', function (e) {
						let input = this;
						setTimeout(function () {
							dobfield.afterPaste(input, e);
						}, 2);
					});
					this.wrapper.append(this.inner, this.errorbox);
					this.setFieldWidths();
					this.$element.hide();
				}

				checkDocument(dob, childdob, classname) {
					let elements = document.getElementsByClassName(classname);

					for (let i = 0; i < elements.length; i++) {
						if (new Date(dob) > new Date(childdob)) {
							elements[i].style.display = 'none';
						} else {
							elements[i].style.display = 'block';
						}
					}
				}

				clear() {
					this.clearError('');
					this.setDate('');
				}

				clearError() {
					delete this.error_text;
					this.showError();
				}

				destroy() {
					this.$element.show();
					this.$element.css('display', '');
					this.wrapper.find('span').remove();
					this.$element.unwrap();
					this.$element.removeData('datetextentry');
					delete this.inner;
					delete this.wrapper;
					delete this.$element;
				}

				focus() {
					this.fields[0].setFocus(true);
				}

				focusFieldBefore(input) {
					const index = input.index;

					if (index < 1) {
						return;
					}

					this.fields[index].yieldFocus();
					this.fields[index - 1].setFocus(true); // let next = this.fields[index - 1];
					// let val = next.get();
					// next.setFocus(false);
				}

				focusFieldAfter(input) {
					const index = input.index;

					if (index > 1) {
						return;
					}

					this.fields[index].yieldFocus();
					this.fields[index + 1].setFocus(true);
				}

				focusIn() {
					this.wrapper.addClass('focus');
				}

				focusOut() {
					if (settings.on_blur) {
						setTimeout(function () {
							self.widgetFocusLost();
						}, 2);
					}

					this.wrapper.removeClass('focus');
				}

				getDate() {
					return this.day_value && this.month_value && this.year_value ? {
						day:   this.day_value,
						month: this.month_value,
						year:  this.year_value
					} : null;
				}

				init() {
					if (!settings.max_date) settings.max_date = today;
					if (!settings.min_year) settings.min_year = '1910';
					this.buildUi();
					this.setDate(this.$element.attr('value'));
					this.proxyLabelClicks();
				}

				parseDate(text) {
					return this.parseIsoDate(text);
				}

				parseIsoDate(text) {
					return text && text.match(/^(\d\d\d\d)-(\d\d)-(\d\d)/) ? {
						day:   RegExp.$3,
						month: RegExp.$2,
						year:  RegExp.$1
					} : null;
				}

				proxyLabelClicks() {
					let dobfield = this;
					let id = this.$element.attr('id');

					if (!id) {
						return;
					}

					$('label[for=' + id + ']').click(function () {
						dobfield.focus();
					});
				}

				setDate(new_date) {
					let dobfield = this;
					new_date = this.parseDate(new_date);
					delete this.day_value;
					delete this.month_value;
					delete this.year_value;
					this.input_day.set(new_date ? new_date.day : '');
					this.input_month.set(new_date ? new_date.month : '');
					this.input_year.set(new_date ? new_date.year : '');
					this.clearError();
					this.$element.val(new_date);

					if (new_date) {
						$.each(this.fields, function (i, input) {
							dobfield.validate(input);
						});
					}
				}

				setError(error_text) {
					this.error_text = error_text;
					this.showError();
				}

				setFieldWidths() {
					let available = this.$element.width() - 2;
					let total = settings.field_width_year + settings.field_width_sep + settings.field_width_month + settings.field_width_sep + settings.field_width_day;
					this.input_day.setWidth(Math.floor(settings.field_width_day * available / total));
					this.input_month.setWidth(Math.floor(settings.field_width_month * available / total));
					this.input_year.setWidth(Math.floor(settings.field_width_year * available / total));
				}

				setReadonly(mode) {
					if (mode === undefined) {
						mode = true;
					}

					this.input_day.setReadonly(mode);
					this.input_month.setReadonly(mode);
					this.input_year.setReadonly(mode);

					if (mode) {
						this.wrapper.addClass('readonly');
					} else {
						this.wrapper.removeClass('readonly');
					}
				}

				showError() {
					let error_text = this.widgetErrorText();

					if (this.on_error) {
						this.on_error(error_text);
					}

					if (!settings.show_errors) {
						return;
					}

					if (error_text === '') {
						this.errorbox.hide();
						this.errorbox.text('');
					} else {
						let x_offset = this.inner.outerWidth() + settings.errorbox_x + 'px';
						let y_offset = settings.errorbox_y + 'px';
						this.errorbox.css({
							display:  'block',
							position: 'absolute',
							top:      y_offset,
							left:     x_offset
						});
						this.errorbox.text(error_text);
						this.errorbox.show();
					}
				}

				validate(current_input) {
					this.$element.val('');

					if (current_input) {
						const type = current_input.name;

						try {
							if (type === 'day') {
								this.validateDay();
							} else if (type === 'month') {
								this.validateMonth();
							} else if (type === 'year') {
								this.validateYear();
							}

							current_input.clearError();
						} catch (e) {
							current_input.setError(e);
							return false;
						}
					}

					if (this.day_value && this.month_value) {
						this.clearError();

						try {
							this.validateDaysInMonth();

							if (this.year_value && this.year_value.length === 4) {
								this.validateCompleteDate();
								let date_str = KrDobEntry.getYmdObject(this.getDate());
								this.$element.val(date_str);

								if (this.$element.data('childdob')) {
									this.checkDocument(date_str, this.$element.data('childdob'), this.$element.attr('id'));
								}
							}
						} catch (e) {
							this.setError(e);
							return false;
						}
					} else {
						this.clearError();
					}

					return true;
				}

				validateCompleteDate() {
					const date_obj = this.getDate();
					const date_iso = KrDobEntry.getYmdObject(date_obj);
					let max_date = settings.max_date;

					if (typeof max_date === 'function') {
						max_date = max_date.call(this);
					}

					if (typeof max_date === 'string') {
						max_date = this.parseDate(max_date);
					}

					if (max_date) {
						if (date_iso > settings.max_date) {
							throw settings.E_MAX_DATE;
						}
					}

					if (this.custom_validation) {
						date_obj.date = new Date(parseInt(date_obj.year, 10), parseInt(date_obj.month, 10) - 1, parseInt(date_obj.day, 10));
						this.custom_validation(date_obj);
					}
				}

				validateDay() {
					let opt = settings;
					let input = this.input_day;
					this.day_value = undefined;
					let text = input.get();

					if (text === '' || text === '0' && input.has_focus) {
						return;
					}

					if (text.match(/\D/)) {
						throw opt.E_DAY_NAN;
					}

					let num = parseInt(text, 10);

					if (num < 1) {
						throw opt.E_DAY_TOO_SMALL;
					}

					if (num > 31) {
						throw opt.E_DAY_TOO_BIG;
					}

					text = num < 10 ? '0' + num : '' + num;

					if (!input.has_focus) {
						input.set(text);
					}

					this.day_value = text;
				}

				validateDaysInMonth() {
					const day = parseInt(this.day_value, 10);
					const month = parseInt(this.month_value, 10);
					const year = parseInt(this.year_value, 10);

					if (day < 1 || month < 1) {
						return;
					}

					let max = settings.days_in_month[month - 1];
					let msg = settings.E_BAD_DAY_FOR_MONTH;

					if (month === 2 && ('' + year).length === 4) {
						max = year % 4 ? 28 : year % 100 ? 29 : year % 400 ? 28 : 29;
						msg = msg.replace(/%y/, year.toString());
					} else {
						msg = msg.replace(/ *%y/, '');
					}

					if (day > max) {
						throw msg.replace(/%d/, max.toString()).replace(/%m/, settings.month_name[month - 1]);
					}
				}

				validateMonth() {
					let input = this.input_month;
					this.month_value = undefined;
					let text = input.get();

					if (text === '' || text === '0' && input.has_focus) {
						return;
					}

					if (text.match(/\D/)) {
						throw settings.E_MONTH_NAN;
					}

					let num = parseInt(text, 10);

					if (num < 1) {
						throw settings.E_MONTH_TOO_SMALL;
					}

					if (num > 12) {
						throw settings.E_MONTH_TOO_BIG;
					}

					text = num < 10 ? '0' + num : '' + num;

					if (!input.has_focus) {
						input.set(text);
					}

					this.month_value = text;
				}

				validateYear() {
					const input = this.input_year;
					this.year_value = undefined;
					let text = input.get();

					if (text === '' || text === '0' && input.has_focus) {
						return;
					}

					if (text.match(/\D/)) {
						throw settings.E_YEAR_NAN;
					}

					if (input.has_focus) {
						if (text.length > 4) {
							throw settings.E_YEAR_LENGTH;
						}
					} else {
						if (text.length !== 4) {
							throw settings.E_YEAR_LENGTH;
						}
					}

					if (text.length === 4) {
						const num = parseInt(text, 10);

						if (settings.min_year && num < settings.min_year) {
							throw settings.E_YEAR_TOO_SMALL.replace(/%y/, settings.min_year);
						}
					}

					this.year_value = text;
				}

				widgetErrorText() {
					let error_text = '';
					$.each(this.fields, function (i, input) {
						if (input.error_text) {
							if (input.has_focus || error_text === '') {
								error_text = input.error_text;
							}
						}
					});

					if (error_text === '' && this.error_text) {
						error_text = this.error_text;
					}

					return error_text;
				}

				widgetFocusLost() {
					if (settings.on_blur && !this.wrapper.is('.focus')) {
						settings.onBlur();
					}
				}

			}

			class KrDobInput {
				constructor(options) {
					const input = this;
					this.dobfield = options.krdobentry;
					this.name = options.name;
					this.index = options.index;
					this.hint_text = options.hint_text;
					this.has_focus = false;
					this.empty = true;
					this.$input = $('<input type="text" value="" />').addClass('jq-dte-' + this.name).attr('aria-label', '' + " (" + this.hint_text + ")").focus($.proxy(input, 'focus')).blur($.proxy(input, 'blur')).keydown(function (e) {
						setTimeout(function () {
							input.keydown(e);
						}, 2);
					}).keyup(function (e) {
						setTimeout(function () {
							input.keyup(e);
						}, 2);
					});
				}

				blur() {
					this.has_focus = false;
					this.dobfield.focusOut();
					this.show_hint();
					this.dobfield.validate(this);
				}

				clearError() {
					delete this.error_text;
					this.$input.removeClass('error');
				}

				focus() {
					this.key_is_down = false;

					if (this.$input.prop('readonly')) {
						return;
					}

					this.has_focus = true;
					this.dobfield.focusIn();

					if (this.$input.hasClass('hint')) {
						this.$input.val('').removeClass('hint');
					}

					this.dobfield.showError();
				}

				get() {
					let val = this.$input.val();
					return val === this.hint_text ? '' : val;
				}

				isDigitKey(e) {
					let keycode = e.which;
					return keycode >= 48 && keycode <= 57 || keycode >= 96 && keycode <= 105;
				}

				keydown() {
					// Ignore keyup events that arrive after focus moved to next field
					this.key_is_down = true;
				}

				keyup(e) {
					if (!this.key_is_down) {
						return;
					} // Handle Backspace - shifting focus to previous field if required


					let keycode = e.which;

					if (keycode === key.BACKSPACE && this.empty) {
						return this.dobfield.focusFieldBefore(this);
					}

					let text = this.get();
					this.empty = text === ''; // Trap and discard separator characters - advancing focus if required

					if (text.match(/[\/\\. -]/)) {
						text = text.replace(/[\/\\. -]/, '');
						this.set(text);

						if (!this.empty && this.index < 2) {
							this.dobfield.focusFieldAfter(this);
						}
					} // Advance focus if this field is both valid and full


					if (this.dobfield.validate(this)) {
						let want = this.name === 'year' ? 4 : 2;

						if (this.isDigitKey(e) && text.length === want) {
							this.dobfield.focusFieldAfter(this);
						}
					}
				}

				left() {
					return this.$input.position().left;
				}

				set(new_value) {
					this.$input.val(new_value).removeClass('hint');

					if (!this.has_focus) {
						this.show_hint();
					}

					this.empty = new_value === '';
					this.clearError();
					return this;
				}

				setError(text) {
					this.error_text = text;
					this.$input.addClass('error');
					this.dobfield.showError();
				}

				setFocus(select_all) {
					let $input = this.$input;
					$input.focus();

					if (select_all) {
						$input.select();
					} else {
						$input.val($input.val());
					}

					return this;
				}

				setWidth(new_width) {
					this.$input.width(new_width);
					return this;
				}

				show_hint() {
					if (this.get() === '' && typeof this.hint_text === 'string') {
						this.$input.val(this.hint_text).addClass('hint');
					}

					return this;
				}

				yieldFocus() {
					this.$input.blur();
				}

			}

			$(document).ready(function () {
				$('.dobissue').each(function () {
					myKrDobEntry = new KrDobEntry($(this), {});
				});
			});
		})(jQuery);

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/guestdata.js":
	/*!****************************************************!*\
	 !*** ./com_knowres/media/js/src/site/guestdata.js ***!
	 \****************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
// noinspection DuplicatedCode

		/**
		 * @package    Know Reservations
		 * @subpackage Admin JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


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
				let numAdults = $('#jform_adults').val();
				let $inputChild = $('#jform_child');
				let numChildren = $inputChild.val();
				let maxChildren = guests - numAdults;
				let $holder = $('#holder');
				let i;

				if (type === 1) {
					$inputChild.attr('max', maxChildren);

					if (numChildren > maxChildren) {
						$inputChild.val(maxChildren);
						if (!maxChildren) $holder.hide(); else {
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

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/map.js":
	/*!**********************************************!*\
	 !*** ./com_knowres/media/js/src/site/map.js ***!
	 \**********************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.host;
		}

		const livesite = window.location.origin + '/';
		const lang = "en";

		(function ($) {
			const markershape = {
				type:   'poly',
				coords: [1, 1, 1, 32, 37, 32, 32, 1]
			};
			let myKrmap;
			let mapData = false;
			let map;
			let mapZoom;
			let infoWindow;
			let infoWindow2;
			let bounds;
			let propertydiv;
			let propertyicon;
			let mc; //	let bicon;
			//	let hicon;
			//	let large_slideshow = false;

			let settings = {
				propertyMarkers: [],
				filterIds:       [],
				mapMarkers:      [],
				mapTypeId:       '',
				mapZoom:         0,
				mapMaxZoom:      20,
				mapType:         '',
				mapId:           '',
				markerColor:     'red'
			};

			class Krmap {
				constructor(settings) {
					this.settings = settings; //Initialise map options

					this.gmOptions = {
						scrollwheel:       false,
						zoom:              this.settings.mapZoom,
						maxZoom:           this.settings.mapMaxZoom,
						mapTypeId:         this.settings.mapTypeId,
						streetViewControl: false
					};
					mapZoom = this.settings.mapZoom;
					this.gmarkers = [];
					this.count = 0;
					this.initMap();
				}

				static closeKrInfowindow() {
					$('#kr-infowindow').hide(); //			"#kr-infowindow".style.display = 'none';

					infoWindow.close();
					infoWindow2.close();
				} // only show visible markers


				static showVisibleMarkers(markers) {
					let bounds = map.getBounds();
					let count = 0;

					for (let d = 0; d < markers.length; d++) {
						let marker = markers[d];

						if (marker.type === 'map') {
							if (bounds.contains(marker.getPosition()) === true) {
								marker.setVisible(true);
								count++;
							} else {
								marker.setVisible(false);
							}
						}
					}

					return count;
				} // Check Markers array for duplicate position and offset a little


				checkDuplicate(current) {
					if (this.gmarkers.length > 0) {
						let dups = 0;

						for (let index = 0; index < this.gmarkers.length; index++) {
							let pos = this.gmarkers[index].getPosition();

							if (current.equals(pos)) {
								dups++;
								let a = 360.0 / dups;
								let newLat = pos.lat() + -.00002 * Math.cos(+a * dups / 180 * Math.PI); //x

								let newLng = pos.lng() + -.00000 * Math.sin(+a * dups / 180 * Math.PI); //Y

								current = new google.maps.LatLng(newLat, newLng);
							}
						}
					}

					return current;
				}

				checkZoom() {
					if (mapZoom > 0) {
						let mylistener = map.addListener('idle', function () {
							const currentZoom = map.getZoom();

							if (mapZoom > 0 && currentZoom !== mapZoom) {
								map.setZoom(mapZoom);
								mylistener.remove();
							}
						});
					}
				}

				clusterMap() {
					const mcOptions = {
						gridSize:            20,
						maxZoom:             this.settings.mapMaxZoom - 1,
						imagePath:           '/media/com_knowres/images/markerclusterer/m',
						ignoreHiddenMarkers: true
					};
					this.setPropertyMarkers();
					this.setMapMarkers();

					for (let d = 0; d < this.gmarkers.length; d++) {
						let marker = this.gmarkers[d];

						if (marker.type === 'property') {
							if (this.settings.filterIds.includes(marker.pid)) {
								marker.setVisible(true);
							} else {
								marker.setVisible(false);
							}
						}
					}

					mc = new MarkerClusterer(map, this.gmarkers, mcOptions);
					google.maps.event.addListener(mc, "clusterclick", function () {
						$('#kr-infowindow').hide();
						infoWindow.close();
					});
					map.fitBounds(bounds);
					this.checkZoom();
				} // Create the Map


				createMap() {
					map = new google.maps.Map(document.getElementById(this.settings.mapId), this.gmOptions);
					infoWindow = new google.maps.InfoWindow();
					infoWindow2 = new google.maps.InfoWindow();
					bounds = new google.maps.LatLngBounds();
				} // Create the marker and set up the event window


				createMapMarker(point, html, image, boxinfo, link, title) {
					let marker = new google.maps.Marker({
						shape:    markershape,
						link:     link,
						icon:     image,
						position: point,
						title:    title,
						map:      map,
						zIndex:   999
					});
					google.maps.event.addListener(marker, 'mouseover', function (html) {
						return function () {
							infoWindow2.setContent(html);
							infoWindow2.open(map, marker);
						};
					}(html));
					google.maps.event.addListener(marker, 'mouseout', function () {
						return function () {
							infoWindow2.close();
						};
					}());
					google.maps.event.addListener(marker, 'closeclick', function () {
						infoWindow2.close();
					});
					this.gmarkers.push(marker);
					this.count++;
				}

				createPropertyMarker(point, html, boxinfo, link, title, color, id, image, pid) {
					let marker = new google.maps.Marker({
						position: point,
						link:     link,
						map:      map,
						icon:     image,
						title:    title,
						pid:      pid,
						type:     'property',
						zIndex:   this.count + 1000
					});
					propertydiv = document.getElementById(id); // if (propertydiv !== null) {
					// 	google.maps.event.addDomListener(propertydiv, 'mouseover', function () {
					// 		marker.setIcon(
					// 			hicon
					// 		)
					// 		marker.setZIndex(marker.getZIndex() + 1000);
					// 	});
					// 	google.maps.event.addDomListener(propertydiv, 'mouseout', function () {
					// 		marker.setIcon(
					// 			bicon
					// 		)
					// 		marker.setZIndex(marker.getZIndex() - 1000);
					// 	});
					// }
					// marker.addListener('mouseover', (function () {
					// 	marker.setIcon(
					// 		hicon
					// 	)
					// 	marker.setZIndex(marker.getZIndex() + 1000);
					// }));
					//
					// marker.addListener('mouseout', (function () {
					// 	marker.setIcon(
					// 		bicon
					// 	)
					// 	marker.setZIndex(marker.getZIndex() - 1000);
					// }));
					// google.maps.event.addListener(marker, 'click', function() {
					// 	marker.setVisible(false); // maps API hide call
					// });

					marker.addListener('mousedown', function (boxinfo) {
						return function () {
							infoWindow.close();
							$('#kr-infowindow').hide();
							infoWindow.setContent(html);
							infoWindow.open(map, marker);
							$.ajax({
								type:    "POST",
								url:     livesite + 'index.php?option=com_knowres&task=property.mapinfowindow&lang=' + lang,
								data:    {
									id: parseInt(boxinfo)
								},
								success: function (data) {
									$('#kr-infowindow').fadeIn(400).html(data).show();
									$(".kr-infowindow-slideshow").not('.slick-initialized').slick({
										nextArrow: '<i class="slick-nav next fas fa-chevron-right "></i>',
										prevArrow: '<i class="slick-nav prev fas fa-chevron-left "></i>',
										autoplay:  true
									});
								}
							});
						};
					}(boxinfo));
					google.maps.event.addListener(marker, 'closeclick', function () {
						$('#kr-infowindow').hide();
						infoWindow.close();
					});
					this.gmarkers.push(marker);
					bounds.extend(point);
					this.count++;
				} //Initialise map


				initMap() {
					this.createMap(); //			this.setMarkerIcons();

					if (this.settings.mapType === 'cluster') {
						this.clusterMap();
					} else {
						this.soloMap();
					}
				} // Reset map to initial state


				refreshMap($mapmodal) {
					if (this.settings.mapType === 'solo') return;
					let self = this;
					jQuery.ajax({
						url:      livesite + 'index.php?option=com_knowres&task=properties.refreshmap&lang=' + lang,
						type:     "POST",
						dataType: "json",
						success:  function (result) {
							if (result.success) {
								self.settings.filterIds = result.data.filterIds;

								for (let d = 0; d < self.gmarkers.length; d++) {
									let marker = self.gmarkers[d];

									if (marker.type === 'property') {
										if (self.settings.filterIds.includes(marker.pid)) {
											marker.setVisible(true);
										} else {
											marker.setVisible(false);
										}
									}
								}

								mc.repaint();
								new Foundation.Reveal($mapmodal);
								$mapmodal.foundation('open');
								google.maps.event.trigger(map, 'resize');
								$mapmodal.foundation('open');
							} else {
								alert(result.message);
							}
						}
					});
				} // Reset map to initial state


				resetMap() {
					infoWindow.close();
					infoWindow2.close();
					$('#kr-infowindow').hide();
					map.fitBounds(bounds);
					this.checkZoom();
				} // loop to set map markers


				setMapMarkers() {
					let point;
					let amark;

					for (let d = 0; d < this.settings.mapMarkers.length; d++) {
						amark = this.settings.mapMarkers[d];
						let markericon = {
							url:  amark['icon'],
							size: new google.maps.Size(32, 37),
							// OR scaledSize: new google.maps.Size(40, 47)
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(0, 18)
						};
						point = new google.maps.LatLng(amark['lat'], amark['lng']);
						point = this.checkDuplicate(point);
						this.createMapMarker(point, amark['html'], markericon, '', '', amark['title']);
					}
				} // setMarkerIcons() {
				// 	bicon = {
				// 		path:         '/media/com_knowres/assets/images/svg',
				// 		fillColor:    this.settings.markerColor,
				// 		fillOpacity:  0.9,
				// 		anchor:       new google.maps.Point(9, 35),
				// 		strokeColor:  "#efefef",
				// 		strokeWeight: 0.5,
				// 		scale:        1
				// 	};
				// 	hicon = {
				// 		path:         '/media/com_knowres/assets/images/svg',
				// 		fillColor:    "green",
				// 		fillOpacity:  1,
				// 		anchor:       new google.maps.Point(9, 35),
				// 		strokeColor:  "#efefef",
				// 		strokeWeight: 0.8,
				// 		scale:        1.5
				// 	};
				// }
				// loop to set property markers


				setPropertyMarkers() {
					let point;
					let amark;

					for (let d = 0; d < this.settings.propertyMarkers.length; d++) {
						amark = this.settings.propertyMarkers[d];

						if (!d) {
							propertyicon = {
								url:    amark['icon'],
								size:   new google.maps.Size(32, 37),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(0, 20)
							};
						}

						point = new google.maps.LatLng(amark['lat'], amark['lng']);
						point = this.checkDuplicate(point);
						this.createPropertyMarker(point, amark['html'], amark['boxinfo'], amark['link'], amark['title'], amark['color'], amark['id'], propertyicon, amark['pid']);
					}
				}

				soloMap() {
					this.setPropertyMarkers();
					this.setMapMarkers();
					map.fitBounds(bounds);
					this.checkZoom();

					if (this.settings.mapMarkers.length > 0) {
						const self = this;
						let myListener = google.maps.event.addListener(map, 'idle', function () {
							let found = 0;
							let currentZoom = map.getZoom();

							while (!found) {
								found = Krmap.showVisibleMarkers(self.gmarkers);

								if (found) {
									myListener.remove();
									map.setZoom(currentZoom);
									break;
								}

								currentZoom = currentZoom - 1;

								if (currentZoom < 10) {
									break;
								}
							}
						});
					}
				}

			}

			$(function () {
				let $mapmodal;
				$('body').on('click', '.map-trigger', function (e) {
					e.preventDefault();

					if (mapData) {
						myKrmap.refreshMap($mapmodal);
					} else {
						kickMap($(this));
						$mapmodal = $('#kr-search-map-modal');
						new Foundation.Reveal($mapmodal);
						$mapmodal.foundation('open');
					}
				}).on('click', '.resetmap', function (e) {
					e.preventDefault();
					myKrmap.resetMap();
				}).on('click', '#kr-search-map-full-infowindow-close', function (e) {
					e.preventDefault();
					Krmap.closeKrInfowindow();
				}).on('click', '.closemap', function (e) {
					e.preventDefault();
					$mapmodal.foundation('close');
					$.ajax({
						type:    "POST",
						url:     livesite + 'index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
						success: function () {
							return true;
						}
					});
				}).on('open.zf.reveal', '#kr-search-map-modal', function (e) {
					e.preventDefault();
					$('#kr-search-map-full').height($('#kr-search-map-modal').height());
					google.maps.event.trigger(map, "resize");
					$.ajax({
						type:    "POST",
						url:     livesite + 'index.php?option=com_knowres&task=properties.mapsession&lang=' + lang,
						data:    {
							map_modal: '1'
						},
						success: function () {
							return true;
						}
					});
				}); // Doesn't trigger if included above ??

				if (!mapData) {
					const $soloTrigger = $('#kr-map-solo-trigger');
					$soloTrigger.one('click', function () {
						kickMap($soloTrigger);
					});

					if (window.location.href.indexOf('#map') !== -1 && $soloTrigger.length) {
						kickMap($soloTrigger);
					}
				} // Test for force map


				const $trigger = $('.map-trigger');

				if ($trigger.data('forcemap')) {
					$trigger.trigger('click');
				}

				function kickMap($elem) {
					const type = $elem.data('type');
					let pid = 0;

					if (type === 'solo') {
						pid = $elem.data('pid');
					}

					jQuery.ajax({
						url:      livesite + 'index.php?option=com_knowres&task=properties.mapdata&pid=' + pid + '&lang=' + lang,
						type:     "POST",
						dataType: "json",
						success:  function (result) {
							if (result.success) {
								settings = {
									mapId:           $elem.data('target'),
									mapType:         $elem.data('type'),
									mapTypeId:       $elem.data('maptypeid'),
									mapZoom:         parseInt($elem.data('zoom')),
									mapMaxZoom:      parseInt($elem.data('zoommax')),
									propertyMarkers: result.data.propertyMarkers,
									mapMarkers:      result.data.mapMarkers,
									filterIds:       result.data.filterIds
								};
								myKrmap = new Krmap(settings);
								mapData = true;
							} else {
								alert(result.message);
							}
						}
					});
				}
			});
		})(jQuery);

		/***/
	}),

	/***/ "./com_knowres/media/js/src/site/route.js":
	/*!************************************************!*\
	 !*** ./com_knowres/media/js/src/site/route.js ***!
	 \************************************************/
	/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

		"use strict";
		/* provided dependency */
		var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/**
		 * @package    Know Reservations
		 * @subpackage Site JS
		 * @copyright  2020 Highland Vision. All rights reserved.
		 * @license    See the file "LICENSE.txt" for the full license governing this code.
		 * @author     Hazel Wilson <hazel@highlandvision.com>
		 */


		(function ($) {
			let myKrroute;
			let directionsDisplay;
			let directionsVisible = false;
			let routeMap;
			let origin;
			let destination;
			let routeMarkers = [];
			let routeStopPoints = [];
			let point;
			let self;
			let settings = {
				lat:               "",
				lng:               "",
				name:              "",
				icon:              "",
				detour:            "",
				mapZoom:           9,
				mapMaxZoom:        20,
				mapTypeId:         "roadmap",
				mapId:             "kr-map-route",
				directionsPanel:   "kr-directions-panel",
				directionsService: null
			};

			class Krroute {
				constructor($element, options) {
					this.settings = settings;

					if (options) {
						$.extend(this.settings, options);
					}

					this.settings.directionsService = new google.maps.DirectionsService();
					this.init();
				}

				static clearRouteMarkers() {
					for (let i = 0; i < routeMarkers.length; i++) {
						routeMarkers[i].setMap(null);
					}
				}

				static clearWaypoints() {
					origin = null;
					routeMarkers = [];
					routeStopPoints = [];
					directionsVisible = false;
				}

				addRouteMarker(latlng) {
					routeMarkers.push(new google.maps.Marker({
						position: latlng,
						map:      routeMap,
						icon:     this.settings.detour
					}));
				} //
				// addPropertyMarker(point, html, image, boxinfo) {
				// 	let marker = new google.maps.Marker({
				// 		position: point,
				// 		html:     html,
				// 		map:      routeMap,
				// 		icon:     image,
				// 		zIndex:   1
				// 	});
				//
				// 	let infowindow = new google.maps.InfoWindow({
				// 		content: boxinfo
				// 	});
				//
				// 	google.maps.event.addListener(marker, 'click', function () {
				// 		// Check to see if there is an info window stored in routeCurrInfoWindow,
				// 		// if there is, we use .close() to hide the window
				// 		if (routeCurrInfoWindow) {
				// 			routeCurrInfoWindow.close();
				// 		}
				// 		// Put our new info window in to the routeCurrInfoWindow variable
				// 		routeCurrInfoWindow = infowindow;
				// 		// Open the window
				// 		infowindow.open(routeMap, marker);
				// 	});
				//
				// 	//gmarkers.push( marker );
				// 	routeMarkers.push(marker);
				// }
				// static updateMode() {
				// 	if (directionsVisible) {
				// 		this.calcRoute();
				// 	}
				// }


				calcRoute() {
					let from_address = document.getElementById("from_address").value;
					let origin = "";
					if (from_address === "Address") from_address = "";
					if (from_address) origin = from_address + "," + "";
					let mode;

					switch (document.getElementById("mode").value) {
						case "bicycling":
							mode = google.maps.DirectionsTravelMode.BICYCLING;
							break;

						case "driving":
							mode = google.maps.DirectionsTravelMode.DRIVING;
							break;

						case "walking":
							mode = google.maps.DirectionsTravelMode.WALKING;
							break;
					}

					if (origin) {
						let request = {
							origin:        origin,
							destination:   destination,
							waypoints:     routeStopPoints,
							travelMode:    mode,
							avoidHighways: document.getElementById('highways').checked,
							avoidTolls:    document.getElementById('tolls').checked
						};
						self = this;
						this.settings.directionsService.route(request, function (response, status) {
							if (status === google.maps.DirectionsStatus.OK) {
								directionsDisplay.setDirections(response);
							} else {
								alert("Google couldn`t calculate directions for this route and selected options");
								self.resetRoute();
							}
						});
					}

					Krroute.clearRouteMarkers();
					directionsVisible = true;
				}

				init() {
					destination = new google.maps.LatLng(this.settings.lat, this.settings.lng); //Initialise map options

					this.myOptions = {
						scrollwheel:       false,
						zoom:              this.settings.mapZoom,
						maxZoom:           this.settings.mapMaxZoom,
						mapTypeId:         this.settings.mapTypeId,
						streetViewControl: false,
						center:            destination
					};
					routeMap = new google.maps.Map(document.getElementById(this.settings.mapId), this.myOptions);
					directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(routeMap);
					directionsDisplay.setPanel(document.getElementById(this.settings.directionsPanel));
					const image = new google.maps.MarkerImage(this.settings.icon);
					point = new google.maps.LatLng(this.settings.lat, this.settings.lng);
					self = this;
					google.maps.event.addListener(routeMap, 'click', function (event) {
						if (routeStopPoints.length < 9) {
							routeStopPoints.push({
								location: event.latLng,
								stopover: true
							});
							point = event.latLng;
							self.addRouteMarker(point);
						} else {
							alert("Maximum number of 9 waypoints reached");
						}
					});
					self = this;
					google.maps.event.addListenerOnce(routeMap, 'idle', function () {
						google.maps.event.trigger(routeMap, 'resize');
						self.calcRoute();
					});
				}

				resetRoute() {
					Krroute.clearRouteMarkers();
					Krroute.clearWaypoints();
					directionsDisplay.setMap(null);
					directionsDisplay.setPanel(null);
					directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(routeMap);
					directionsDisplay.setPanel(document.getElementById(this.settings.directionPanel));
					this.init();
				}

			}

			$(document).ready(function () {
				$(".kr-directions-modal").on('click', '#kr-map-route', function (e) {
					let $element = $(this);
					const options = {
						lat:    $element.data('lat'),
						lng:    $element.data('lng'),
						name:   $element.data('name'),
						icon:   $element.data('icon'),
						detour: $element.data('detour')
					};
					myKrroute = new Krroute($element, options);
				}).on('click', '.resetroute', function (e) {
					e.preventDefault();
					myKrroute.resetRoute();
				}).on('click', '.calcroute', function (e) {
					e.preventDefault();
					myKrroute.calcRoute();
				});
				jQuery("a#geocodeAddress").on('click', function (e) {
					e.preventDefault();
					let addressString = jQuery("#jform_property_street").val() + ", " + jQuery('#jform_town_id').find(":selected").text() + " " + jQuery("#jform_property_postcode").val() + ", " + jQuery('#jform_region_id').find(":selected").text() + " " + jQuery('#jform_country_id').find(":selected").text();
					let url = 'index.php?option=com_knowres&task=property.geocode';
					let coord = [];
					jQuery.ajax({
						type:     "POST",
						url:      url,
						data:     {
							address: addressString
						},
						dataType: "json",
						success:  function (jsondata) {
							jQuery.each(jsondata, function (key, val) {
								let div = "#" + key;
								jQuery(div).val(val);
								coord[key] = val;
								myGmap.refreshMap(coord['lat'], coord['lng'], false);
							});
						}
					});
				});
			});
		})(jQuery);

		/***/
	}),

	/***/ "./node_modules/is-marker-clusterer/src/markerclusterer.js":
	/*!*****************************************************************!*\
	 !*** ./node_modules/is-marker-clusterer/src/markerclusterer.js ***!
	 \*****************************************************************/
	/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		/**
		 * Npm version of markerClusterer works great with browserify
		 * Difference from the original - adds a commonjs format and replaces window with global and some unit test
		 * The original functionality it's not modified for docs and original source check
		 * https://github.com/googlemaps/js-marker-clusterer
		 */

		/**
		 * @name MarkerClusterer for Google Maps v3
		 * @version version 1.0
		 * @author Luke Mahe
		 * @fileoverview
		 * The library creates and manages per-zoom-level clusters for large amounts of
		 * markers.
		 * <br/>
		 * This is a v3 implementation of the
		 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
		 * >v2 MarkerClusterer</a>.
		 */

		/**
		 * Licensed under the Apache License, Version 2.0 (the "License");
		 * you may not use this file except in compliance with the License.
		 * You may obtain a copy of the License at
		 *
		 *     http://www.apache.org/licenses/LICENSE-2.0
		 *
		 * Unless required by applicable law or agreed to in writing, software
		 * distributed under the License is distributed on an "AS IS" BASIS,
		 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		 * See the License for the specific language governing permissions and
		 * limitations under the License.
		 */

		/**
		 * A Marker Clusterer that clusters markers.
		 *
		 * @param {google.maps.Map} map The Google map to attach to.
		 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
		 *   the cluster.
		 * @param {Object=} opt_options support the following options:
		 *     'gridSize': (number) The grid size of a cluster in pixels.
		 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
		 *                cluster.
		 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
		 *                    cluster is to zoom into it.
		 *     'averageCenter': (boolean) Wether the center of each cluster should be
		 *                      the average of all markers in the cluster.
		 *     'minimumClusterSize': (number) The minimum number of markers to be in a
		 *                           cluster before the markers are hidden and a count
		 *                           is shown.
		 *     'styles': (object) An object that has style properties:
		 *       'url': (string) The image url.
		 *       'height': (number) The image height.
		 *       'width': (number) The image width.
		 *       'anchor': (Array) The anchor position of the label text.
		 *       'textColor': (string) The text color.
		 *       'textSize': (number) The text size.
		 *       'fontFamily': (string) The font family.
		 *       'fontWeight': (string) The font weight.
		 *       'backgroundPosition': (string) The position of the backgound x, y.
		 * @constructor
		 * @extends google.maps.OverlayView
		 */
		function MarkerClusterer(map, opt_markers, opt_options) {
			// MarkerClusterer implements google.maps.OverlayView interface. We use the
			// extend function to extend MarkerClusterer with google.maps.OverlayView
			// because it might not always be available when the code is defined so we
			// look for it at the last possible moment. If it doesn't exist now then
			// there is no point going ahead :)
			this.extend(MarkerClusterer, google.maps.OverlayView);
			this.map_ = map;
			/**
			 * @type {Array.<google.maps.Marker>}
			 * @private
			 */

			this.markers_ = [];
			/**
			 *  @type {Array.<Cluster>}
			 */

			this.clusters_ = [];
			this.sizes = [53, 56, 66, 78, 90];
			/**
			 * @private
			 */

			this.styles_ = [];
			/**
			 * @type {boolean}
			 * @private
			 */

			this.ready_ = false;
			var options = opt_options || {};
			/**
			 * @type {number}
			 * @private
			 */

			this.gridSize_ = options['gridSize'] || 60;
			/**
			 * @private
			 */

			this.minClusterSize_ = options['minimumClusterSize'] || 2;
			/**
			 * @type {?number}
			 * @private
			 */

			this.maxZoom_ = options['maxZoom'] || null;
			this.styles_ = options['styles'] || [];
			/**
			 * @type {string}
			 * @private
			 */

			this.imagePath_ = options['imagePath'] || this.MARKER_CLUSTER_IMAGE_PATH_;
			/**
			 * @type {string}
			 * @private
			 */

			this.imageExtension_ = options['imageExtension'] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;
			/**
			 * @type {boolean}
			 * @private
			 */

			this.zoomOnClick_ = true;

			if (options['zoomOnClick'] != undefined) {
				this.zoomOnClick_ = options['zoomOnClick'];
			}
			/**
			 * @type {boolean}
			 * @private
			 */


			this.averageCenter_ = false;

			if (options['averageCenter'] != undefined) {
				this.averageCenter_ = options['averageCenter'];
			}

			this.setupStyles_();
			this.setMap(map);
			/**
			 * @type {number}
			 * @private
			 */

			this.prevZoom_ = this.map_.getZoom(); // Add the map event listeners

			var that = this;
			google.maps.event.addListener(this.map_, 'zoom_changed', function () {
				var zoom = that.map_.getZoom();

				if (that.prevZoom_ != zoom) {
					that.prevZoom_ = zoom;
					that.resetViewport();
				}
			});
			google.maps.event.addListener(this.map_, 'idle', function () {
				that.redraw();
			}); // Finally, add the markers

			if (opt_markers && opt_markers.length) {
				this.addMarkers(opt_markers, false);
			}
		}

		/**
		 * The marker cluster image path.
		 *
		 * @type {string}
		 * @private
		 */


		MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/' + 'images/m';
		/**
		 * The marker cluster image path.
		 *
		 * @type {string}
		 * @private
		 */

		MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';
		/**
		 * Extends a objects prototype by anothers.
		 *
		 * @param {Object} obj1 The object to be extended.
		 * @param {Object} obj2 The object to extend with.
		 * @return {Object} The new extended object.
		 * @ignore
		 */

		MarkerClusterer.prototype.extend = function (obj1, obj2) {
			return function (object) {
				for (var property in object.prototype) {
					this.prototype[property] = object.prototype[property];
				}

				return this;
			}.apply(obj1, [obj2]);
		};
		/**
		 * Implementaion of the interface method.
		 * @ignore
		 */


		MarkerClusterer.prototype.onAdd = function () {
			this.setReady_(true);
		};
		/**
		 * Implementaion of the interface method.
		 * @ignore
		 */


		MarkerClusterer.prototype.draw = function () {
		};
		/**
		 * Sets up the styles object.
		 *
		 * @private
		 */


		MarkerClusterer.prototype.setupStyles_ = function () {
			if (this.styles_.length) {
				return;
			}

			for (var i = 0, size; size = this.sizes[i]; i++) {
				this.styles_.push({
					url:    this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
					height: size,
					width:  size
				});
			}
		};
		/**
		 *  Fit the map to the bounds of the markers in the clusterer.
		 */


		MarkerClusterer.prototype.fitMapToMarkers = function () {
			var markers = this.getMarkers();
			var bounds = new google.maps.LatLngBounds();

			for (var i = 0, marker; marker = markers[i]; i++) {
				bounds.extend(marker.getPosition());
			}

			this.map_.fitBounds(bounds);
		};
		/**
		 *  Sets the styles.
		 *
		 *  @param {Object} styles The style to set.
		 */


		MarkerClusterer.prototype.setStyles = function (styles) {
			this.styles_ = styles;
		};
		/**
		 *  Gets the styles.
		 *
		 *  @return {Object} The styles object.
		 */


		MarkerClusterer.prototype.getStyles = function () {
			return this.styles_;
		};
		/**
		 * Whether zoom on click is set.
		 *
		 * @return {boolean} True if zoomOnClick_ is set.
		 */


		MarkerClusterer.prototype.isZoomOnClick = function () {
			return this.zoomOnClick_;
		};
		/**
		 * Whether average center is set.
		 *
		 * @return {boolean} True if averageCenter_ is set.
		 */


		MarkerClusterer.prototype.isAverageCenter = function () {
			return this.averageCenter_;
		};
		/**
		 *  Returns the array of markers in the clusterer.
		 *
		 *  @return {Array.<google.maps.Marker>} The markers.
		 */


		MarkerClusterer.prototype.getMarkers = function () {
			return this.markers_;
		};
		/**
		 *  Returns the number of markers in the clusterer
		 *
		 *  @return {Number} The number of markers.
		 */


		MarkerClusterer.prototype.getTotalMarkers = function () {
			return this.markers_.length;
		};
		/**
		 *  Sets the max zoom for the clusterer.
		 *
		 *  @param {number} maxZoom The max zoom level.
		 */


		MarkerClusterer.prototype.setMaxZoom = function (maxZoom) {
			this.maxZoom_ = maxZoom;
		};
		/**
		 *  Gets the max zoom for the clusterer.
		 *
		 *  @return {number} The max zoom level.
		 */


		MarkerClusterer.prototype.getMaxZoom = function () {
			return this.maxZoom_;
		};
		/**
		 *  The function for calculating the cluster icon image.
		 *
		 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
		 *  @param {number} numStyles The number of styles available.
		 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
		 *  @private
		 */


		MarkerClusterer.prototype.calculator_ = function (markers, numStyles) {
			var index = 0;
			var count = markers.length;
			var dv = count;

			while (dv !== 0) {
				dv = parseInt(dv / 10, 10);
				index++;
			}

			index = Math.min(index, numStyles);
			return {
				text:  count,
				index: index
			};
		};
		/**
		 * Set the calculator function.
		 *
		 * @param {function(Array, number)} calculator The function to set as the
		 *     calculator. The function should return a object properties:
		 *     'text' (string) and 'index' (number).
		 *
		 */


		MarkerClusterer.prototype.setCalculator = function (calculator) {
			this.calculator_ = calculator;
		};
		/**
		 * Get the calculator function.
		 *
		 * @return {function(Array, number)} the calculator function.
		 */


		MarkerClusterer.prototype.getCalculator = function () {
			return this.calculator_;
		};
		/**
		 * Add an array of markers to the clusterer.
		 *
		 * @param {Array.<google.maps.Marker>} markers The markers to add.
		 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
		 */


		MarkerClusterer.prototype.addMarkers = function (markers, opt_nodraw) {
			for (var i = 0, marker; marker = markers[i]; i++) {
				this.pushMarkerTo_(marker);
			}

			if (!opt_nodraw) {
				this.redraw();
			}
		};
		/**
		 * Pushes a marker to the clusterer.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @private
		 */


		MarkerClusterer.prototype.pushMarkerTo_ = function (marker) {
			marker.isAdded = false;

			if (marker['draggable']) {
				// If the marker is draggable add a listener so we update the clusters on
				// the drag end.
				var that = this;
				google.maps.event.addListener(marker, 'dragend', function () {
					marker.isAdded = false;
					that.repaint();
				});
			}

			this.markers_.push(marker);
		};
		/**
		 * Adds a marker to the clusterer and redraws if needed.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
		 */


		MarkerClusterer.prototype.addMarker = function (marker, opt_nodraw) {
			this.pushMarkerTo_(marker);

			if (!opt_nodraw) {
				this.redraw();
			}
		};
		/**
		 * Removes a marker and returns true if removed, false if not
		 *
		 * @param {google.maps.Marker} marker The marker to remove
		 * @return {boolean} Whether the marker was removed or not
		 * @private
		 */


		MarkerClusterer.prototype.removeMarker_ = function (marker) {
			var index = -1;

			if (this.markers_.indexOf) {
				index = this.markers_.indexOf(marker);
			} else {
				for (var i = 0, m; m = this.markers_[i]; i++) {
					if (m == marker) {
						index = i;
						break;
					}
				}
			}

			if (index == -1) {
				// Marker is not in our list of markers.
				return false;
			}

			marker.setMap(null);
			this.markers_.splice(index, 1);
			return true;
		};
		/**
		 * Remove a marker from the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to remove.
		 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
		 * @return {boolean} True if the marker was removed.
		 */


		MarkerClusterer.prototype.removeMarker = function (marker, opt_nodraw) {
			var removed = this.removeMarker_(marker);

			if (!opt_nodraw && removed) {
				this.resetViewport();
				this.redraw();
				return true;
			} else {
				return false;
			}
		};
		/**
		 * Removes an array of markers from the cluster.
		 *
		 * @param {Array.<google.maps.Marker>} markers The markers to remove.
		 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
		 */


		MarkerClusterer.prototype.removeMarkers = function (markers, opt_nodraw) {
			var removed = false;

			for (var i = 0, marker; marker = markers[i]; i++) {
				var r = this.removeMarker_(marker);
				removed = removed || r;
			}

			if (!opt_nodraw && removed) {
				this.resetViewport();
				this.redraw();
				return true;
			}
		};
		/**
		 * Sets the clusterer's ready state.
		 *
		 * @param {boolean} ready The state.
		 * @private
		 */


		MarkerClusterer.prototype.setReady_ = function (ready) {
			if (!this.ready_) {
				this.ready_ = ready;
				this.createClusters_();
			}
		};
		/**
		 * Returns the number of clusters in the clusterer.
		 *
		 * @return {number} The number of clusters.
		 */


		MarkerClusterer.prototype.getTotalClusters = function () {
			return this.clusters_.length;
		};
		/**
		 * Returns the google map that the clusterer is associated with.
		 *
		 * @return {google.maps.Map} The map.
		 */


		MarkerClusterer.prototype.getMap = function () {
			return this.map_;
		};
		/**
		 * Sets the google map that the clusterer is associated with.
		 *
		 * @param {google.maps.Map} map The map.
		 */


		MarkerClusterer.prototype.setMap = function (map) {
			this.map_ = map;
		};
		/**
		 * Returns the size of the grid.
		 *
		 * @return {number} The grid size.
		 */


		MarkerClusterer.prototype.getGridSize = function () {
			return this.gridSize_;
		};
		/**
		 * Sets the size of the grid.
		 *
		 * @param {number} size The grid size.
		 */


		MarkerClusterer.prototype.setGridSize = function (size) {
			this.gridSize_ = size;
		};
		/**
		 * Returns the min cluster size.
		 *
		 * @return {number} The grid size.
		 */


		MarkerClusterer.prototype.getMinClusterSize = function () {
			return this.minClusterSize_;
		};
		/**
		 * Sets the min cluster size.
		 *
		 * @param {number} size The grid size.
		 */


		MarkerClusterer.prototype.setMinClusterSize = function (size) {
			this.minClusterSize_ = size;
		};
		/**
		 * Extends a bounds object by the grid size.
		 *
		 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
		 * @return {google.maps.LatLngBounds} The extended bounds.
		 */


		MarkerClusterer.prototype.getExtendedBounds = function (bounds) {
			var projection = this.getProjection(); // Turn the bounds into latlng.

			var tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
			var bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()); // Convert the points to pixels and the extend out by the grid size.

			var trPix = projection.fromLatLngToDivPixel(tr);
			trPix.x += this.gridSize_;
			trPix.y -= this.gridSize_;
			var blPix = projection.fromLatLngToDivPixel(bl);
			blPix.x -= this.gridSize_;
			blPix.y += this.gridSize_; // Convert the pixel points back to LatLng

			var ne = projection.fromDivPixelToLatLng(trPix);
			var sw = projection.fromDivPixelToLatLng(blPix); // Extend the bounds to contain the new bounds.

			bounds.extend(ne);
			bounds.extend(sw);
			return bounds;
		};
		/**
		 * Determins if a marker is contained in a bounds.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
		 * @return {boolean} True if the marker is in the bounds.
		 * @private
		 */


		MarkerClusterer.prototype.isMarkerInBounds_ = function (marker, bounds) {
			return bounds.contains(marker.getPosition());
		};
		/**
		 * Clears all clusters and markers from the clusterer.
		 */


		MarkerClusterer.prototype.clearMarkers = function () {
			this.resetViewport(true); // Set the markers a empty array.

			this.markers_ = [];
		};
		/**
		 * Clears all existing clusters and recreates them.
		 * @param {boolean} opt_hide To also hide the marker.
		 */


		MarkerClusterer.prototype.resetViewport = function (opt_hide) {
			// Remove all the clusters
			for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
				cluster.remove();
			} // Reset the markers to not be added and to be invisible.


			for (var i = 0, marker; marker = this.markers_[i]; i++) {
				marker.isAdded = false;

				if (opt_hide) {
					marker.setMap(null);
				}
			}

			this.clusters_ = [];
		};
		/**
		 *
		 */


		MarkerClusterer.prototype.repaint = function () {
			var oldClusters = this.clusters_.slice();
			this.clusters_.length = 0;
			this.resetViewport();
			this.redraw(); // Remove the old clusters.
			// Do it in a timeout so the other clusters have been drawn first.

			window.setTimeout(function () {
				for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
					cluster.remove();
				}
			}, 0);
		};
		/**
		 * Redraws the clusters.
		 */


		MarkerClusterer.prototype.redraw = function () {
			this.createClusters_();
		};
		/**
		 * Calculates the distance between two latlng locations in km.
		 * @see http://www.movable-type.co.uk/scripts/latlong.html
		 *
		 * @param {google.maps.LatLng} p1 The first lat lng point.
		 * @param {google.maps.LatLng} p2 The second lat lng point.
		 * @return {number} The distance between the two points in km.
		 * @private
		 */


		MarkerClusterer.prototype.distanceBetweenPoints_ = function (p1, p2) {
			if (!p1 || !p2) {
				return 0;
			}

			var R = 6371; // Radius of the Earth in km

			var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
			var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;
			return d;
		};
		/**
		 * Add a marker to a cluster, or creates a new cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @private
		 */


		MarkerClusterer.prototype.addToClosestCluster_ = function (marker) {
			var distance = 40000; // Some large number

			var clusterToAddTo = null;
			var pos = marker.getPosition();

			for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
				var center = cluster.getCenter();

				if (center) {
					var d = this.distanceBetweenPoints_(center, marker.getPosition());

					if (d < distance) {
						distance = d;
						clusterToAddTo = cluster;
					}
				}
			}

			if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
				clusterToAddTo.addMarker(marker);
			} else {
				var cluster = new Cluster(this);
				cluster.addMarker(marker);
				this.clusters_.push(cluster);
			}
		};
		/**
		 * Creates the clusters.
		 *
		 * @private
		 */


		MarkerClusterer.prototype.createClusters_ = function () {
			if (!this.ready_) {
				return;
			} // Get our current map view bounds.
			// Create a new bounds object so we don't affect the map.


			var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast());
			var bounds = this.getExtendedBounds(mapBounds);

			for (var i = 0, marker; marker = this.markers_[i]; i++) {
				if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
					this.addToClosestCluster_(marker);
				}
			}
		};

		/**
		 * A cluster that contains markers.
		 *
		 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
		 *     cluster is associated with.
		 * @constructor
		 * @ignore
		 */


		function Cluster(markerClusterer) {
			this.markerClusterer_ = markerClusterer;
			this.map_ = markerClusterer.getMap();
			this.gridSize_ = markerClusterer.getGridSize();
			this.minClusterSize_ = markerClusterer.getMinClusterSize();
			this.averageCenter_ = markerClusterer.isAverageCenter();
			this.center_ = null;
			this.markers_ = [];
			this.bounds_ = null;
			this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
		}

		/**
		 * Determins if a marker is already added to the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @return {boolean} True if the marker is already added.
		 */


		Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
			if (this.markers_.indexOf) {
				return this.markers_.indexOf(marker) != -1;
			} else {
				for (var i = 0, m; m = this.markers_[i]; i++) {
					if (m == marker) {
						return true;
					}
				}
			}

			return false;
		};
		/**
		 * Add a marker the cluster.
		 *
		 * @param {google.maps.Marker} marker The marker to add.
		 * @return {boolean} True if the marker was added.
		 */


		Cluster.prototype.addMarker = function (marker) {
			if (this.isMarkerAlreadyAdded(marker)) {
				return false;
			}

			if (!this.center_) {
				this.center_ = marker.getPosition();
				this.calculateBounds_();
			} else {
				if (this.averageCenter_) {
					var l = this.markers_.length + 1;
					var lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
					var lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
					this.center_ = new google.maps.LatLng(lat, lng);
					this.calculateBounds_();
				}
			}

			marker.isAdded = true;
			this.markers_.push(marker);
			var len = this.markers_.length;

			if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
				// Min cluster size not reached so show the marker.
				marker.setMap(this.map_);
			}

			if (len == this.minClusterSize_) {
				// Hide the markers that were showing.
				for (var i = 0; i < len; i++) {
					this.markers_[i].setMap(null);
				}
			}

			if (len >= this.minClusterSize_) {
				marker.setMap(null);
			}

			this.updateIcon();
			return true;
		};
		/**
		 * Returns the marker clusterer that the cluster is associated with.
		 *
		 * @return {MarkerClusterer} The associated marker clusterer.
		 */


		Cluster.prototype.getMarkerClusterer = function () {
			return this.markerClusterer_;
		};
		/**
		 * Returns the bounds of the cluster.
		 *
		 * @return {google.maps.LatLngBounds} the cluster bounds.
		 */


		Cluster.prototype.getBounds = function () {
			var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
			var markers = this.getMarkers();

			for (var i = 0, marker; marker = markers[i]; i++) {
				bounds.extend(marker.getPosition());
			}

			return bounds;
		};
		/**
		 * Removes the cluster
		 */


		Cluster.prototype.remove = function () {
			this.clusterIcon_.remove();
			this.markers_.length = 0;
			delete this.markers_;
		};
		/**
		 * Returns the center of the cluster.
		 *
		 * @return {number} The cluster center.
		 */


		Cluster.prototype.getSize = function () {
			return this.markers_.length;
		};
		/**
		 * Returns the center of the cluster.
		 *
		 * @return {Array.<google.maps.Marker>} The cluster center.
		 */


		Cluster.prototype.getMarkers = function () {
			return this.markers_;
		};
		/**
		 * Returns the center of the cluster.
		 *
		 * @return {google.maps.LatLng} The cluster center.
		 */


		Cluster.prototype.getCenter = function () {
			return this.center_;
		};
		/**
		 * Calculated the extended bounds of the cluster with the grid.
		 *
		 * @private
		 */


		Cluster.prototype.calculateBounds_ = function () {
			var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
			this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
		};
		/**
		 * Determines if a marker lies in the clusters bounds.
		 *
		 * @param {google.maps.Marker} marker The marker to check.
		 * @return {boolean} True if the marker lies in the bounds.
		 */


		Cluster.prototype.isMarkerInClusterBounds = function (marker) {
			return this.bounds_.contains(marker.getPosition());
		};
		/**
		 * Returns the map that the cluster is associated with.
		 *
		 * @return {google.maps.Map} The map.
		 */


		Cluster.prototype.getMap = function () {
			return this.map_;
		};
		/**
		 * Updates the cluster icon
		 */


		Cluster.prototype.updateIcon = function () {
			var zoom = this.map_.getZoom();
			var mz = this.markerClusterer_.getMaxZoom();

			if (mz && zoom > mz) {
				// The zoom is greater than our max zoom so show all the markers in cluster.
				for (var i = 0, marker; marker = this.markers_[i]; i++) {
					marker.setMap(this.map_);
				}

				return;
			}

			if (this.markers_.length < this.minClusterSize_) {
				// Min cluster size not yet reached.
				this.clusterIcon_.hide();
				return;
			}

			var numStyles = this.markerClusterer_.getStyles().length;
			var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
			this.clusterIcon_.setCenter(this.center_);
			this.clusterIcon_.setSums(sums);
			this.clusterIcon_.show();
		};

		/**
		 * A cluster icon
		 *
		 * @param {Cluster} cluster The cluster to be associated with.
		 * @param {Object} styles An object that has style properties:
		 *     'url': (string) The image url.
		 *     'height': (number) The image height.
		 *     'width': (number) The image width.
		 *     'anchor': (Array) The anchor position of the label text.
		 *     'textColor': (string) The text color.
		 *     'textSize': (number) The text size.
		 *      'fontFamily': (string) The font family.
		 *      'fontWeight': (string) The font weight.
		 *     'backgroundPosition: (string) The background postition x, y.
		 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
		 * @constructor
		 * @extends google.maps.OverlayView
		 * @ignore
		 */


		function ClusterIcon(cluster, styles, opt_padding) {
			cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);
			this.styles_ = styles;
			this.padding_ = opt_padding || 0;
			this.cluster_ = cluster;
			this.center_ = null;
			this.map_ = cluster.getMap();
			this.div_ = null;
			this.sums_ = null;
			this.visible_ = false;
			this.setMap(this.map_);
		}

		/**
		 * Triggers the clusterclick event and zoom's if the option is set.
		 */


		ClusterIcon.prototype.triggerClusterClick = function () {
			var markerClusterer = this.cluster_.getMarkerClusterer(); // Trigger the clusterclick event.

			google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);

			if (markerClusterer.isZoomOnClick()) {
				// Zoom into the cluster.
				this.map_.fitBounds(this.cluster_.getBounds());
			}
		};
		/**
		 * Adding the cluster icon to the dom.
		 * @ignore
		 */


		ClusterIcon.prototype.onAdd = function () {
			this.div_ = document.createElement('DIV');

			if (this.visible_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.cssText = this.createCss(pos);
				this.div_.innerHTML = this.sums_.text;
			}

			var panes = this.getPanes();
			panes.overlayMouseTarget.appendChild(this.div_);
			var that = this;
			google.maps.event.addDomListener(this.div_, 'click', function () {
				that.triggerClusterClick();
			});
		};
		/**
		 * Returns the position to place the div dending on the latlng.
		 *
		 * @param {google.maps.LatLng} latlng The position in latlng.
		 * @return {google.maps.Point} The position in pixels.
		 * @private
		 */


		ClusterIcon.prototype.getPosFromLatLng_ = function (latlng) {
			var pos = this.getProjection().fromLatLngToDivPixel(latlng);
			pos.x -= parseInt(this.width_ / 2, 10);
			pos.y -= parseInt(this.height_ / 2, 10);
			return pos;
		};
		/**
		 * Draw the icon.
		 * @ignore
		 */


		ClusterIcon.prototype.draw = function () {
			if (this.visible_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.top = pos.y + 'px';
				this.div_.style.left = pos.x + 'px';
			}
		};
		/**
		 * Hide the icon.
		 */


		ClusterIcon.prototype.hide = function () {
			if (this.div_) {
				this.div_.style.display = 'none';
			}

			this.visible_ = false;
		};
		/**
		 * Position and show the icon.
		 */


		ClusterIcon.prototype.show = function () {
			if (this.div_) {
				var pos = this.getPosFromLatLng_(this.center_);
				this.div_.style.cssText = this.createCss(pos);
				this.div_.style.display = '';
			}

			this.visible_ = true;
		};
		/**
		 * Remove the icon from the map
		 */


		ClusterIcon.prototype.remove = function () {
			this.setMap(null);
		};
		/**
		 * Implementation of the onRemove interface.
		 * @ignore
		 */


		ClusterIcon.prototype.onRemove = function () {
			if (this.div_ && this.div_.parentNode) {
				this.hide();
				this.div_.parentNode.removeChild(this.div_);
				this.div_ = null;
			}
		};
		/**
		 * Set the sums of the icon.
		 *
		 * @param {Object} sums The sums containing:
		 *   'text': (string) The text to display in the icon.
		 *   'index': (number) The style index of the icon.
		 */


		ClusterIcon.prototype.setSums = function (sums) {
			this.sums_ = sums;
			this.text_ = sums.text;
			this.index_ = sums.index;

			if (this.div_) {
				this.div_.innerHTML = sums.text;
			}

			this.useStyle();
		};
		/**
		 * Sets the icon to the the styles.
		 */


		ClusterIcon.prototype.useStyle = function () {
			var index = Math.max(0, this.sums_.index - 1);
			index = Math.min(this.styles_.length - 1, index);
			var style = this.styles_[index];
			this.url_ = style['url'];
			this.height_ = style['height'];
			this.width_ = style['width'];
			this.textColor_ = style['textColor'];
			this.anchor_ = style['anchor'];
			this.textSize_ = style['textSize'];
			this.fontFamily_ = style['fontFamily'];
			this.fontWeight_ = style['fontWeight'];
			this.backgroundPosition_ = style['backgroundPosition'];
		};
		/**
		 * Sets the center of the icon.
		 *
		 * @param {google.maps.LatLng} center The latlng to set as the center.
		 */


		ClusterIcon.prototype.setCenter = function (center) {
			this.center_ = center;
		};
		/**
		 * Create the css text based on the position of the icon.
		 *
		 * @param {google.maps.Point} pos The position.
		 * @return {string} The css style text.
		 */


		ClusterIcon.prototype.createCss = function (pos) {
			var style = [];
			style.push('background-image:url(' + this.url_ + ');');
			var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
			style.push('background-position:' + backgroundPosition + ';');

			if (_typeof(this.anchor_) === 'object') {
				if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
					style.push('height:' + (this.height_ - this.anchor_[0]) + 'px; padding-top:' + this.anchor_[0] + 'px;');
				} else {
					style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px;');
				}

				if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
					style.push('width:' + (this.width_ - this.anchor_[1]) + 'px; padding-left:' + this.anchor_[1] + 'px;');
				} else {
					style.push('width:' + this.width_ + 'px; text-align:center;');
				}
			} else {
				style.push('height:' + this.height_ + 'px; line-height:' + this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
			}

			var txtColor = this.textColor_ ? this.textColor_ : 'black';
			var txtSize = this.textSize_ ? this.textSize_ : 11;
			var fontFamily = this.fontFamily_ ? this.fontFamily_ : 'Arial,sans-serif';
			var fontWeight = this.fontWeight_ ? this.fontWeight_ : '400';
			style.push('cursor:pointer; top:' + pos.y + 'px; left:' + pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' + txtSize + 'px; font-family:' + fontFamily + '; font-weight:' + fontWeight + ';');
			return style.join('');
		}; // Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.


		__webpack_require__.g['MarkerClusterer'] = MarkerClusterer;
		MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
		MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
		MarkerClusterer.prototype['clearMarkers'] = MarkerClusterer.prototype.clearMarkers;
		MarkerClusterer.prototype['fitMapToMarkers'] = MarkerClusterer.prototype.fitMapToMarkers;
		MarkerClusterer.prototype['getCalculator'] = MarkerClusterer.prototype.getCalculator;
		MarkerClusterer.prototype['getGridSize'] = MarkerClusterer.prototype.getGridSize;
		MarkerClusterer.prototype['getExtendedBounds'] = MarkerClusterer.prototype.getExtendedBounds;
		MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
		MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
		MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
		MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
		MarkerClusterer.prototype['getTotalClusters'] = MarkerClusterer.prototype.getTotalClusters;
		MarkerClusterer.prototype['getTotalMarkers'] = MarkerClusterer.prototype.getTotalMarkers;
		MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
		MarkerClusterer.prototype['removeMarker'] = MarkerClusterer.prototype.removeMarker;
		MarkerClusterer.prototype['removeMarkers'] = MarkerClusterer.prototype.removeMarkers;
		MarkerClusterer.prototype['resetViewport'] = MarkerClusterer.prototype.resetViewport;
		MarkerClusterer.prototype['repaint'] = MarkerClusterer.prototype.repaint;
		MarkerClusterer.prototype['setCalculator'] = MarkerClusterer.prototype.setCalculator;
		MarkerClusterer.prototype['setGridSize'] = MarkerClusterer.prototype.setGridSize;
		MarkerClusterer.prototype['setMaxZoom'] = MarkerClusterer.prototype.setMaxZoom;
		MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
		MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;
		Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
		Cluster.prototype['getSize'] = Cluster.prototype.getSize;
		Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;
		ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
		ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
		ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;
		module.exports = MarkerClusterer;

		/***/
	}),

	/***/ "./node_modules/jquery-bar-rating/jquery.barrating.js":
	/*!************************************************************!*\
	 !*** ./node_modules/jquery-bar-rating/jquery.barrating.js ***!
	 \************************************************************/
	/***/ ((module, exports, __webpack_require__) => {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		/**
		 * jQuery Bar Rating Plugin v1.2.2
		 *
		 * http://github.com/antennaio/jquery-bar-rating
		 *
		 * Copyright (c) 2012-2016 Kazik Pietruszewski
		 *
		 * This plugin is available under the MIT license.
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		(function (factory) {
			if (true) {
				// AMD
				!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
					                                 (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			} else {
			}
		})(function ($) {
			var BarRating = function () {
				function BarRating() {
					var self = this; // wrap element in a wrapper div

					var wrapElement = function wrapElement() {
						var classes = ['br-wrapper'];

						if (self.options.theme !== '') {
							classes.push('br-theme-' + self.options.theme);
						}

						self.$elem.wrap($('<div />', {
							'class': classes.join(' ')
						}));
					}; // unwrap element


					var unwrapElement = function unwrapElement() {
						self.$elem.unwrap();
					}; // find option by value


					var findOption = function findOption(value) {
						if ($.isNumeric(value)) {
							value = Math.floor(value);
						}

						return $('option[value="' + value + '"]', self.$elem);
					}; // get initial option


					var getInitialOption = function getInitialOption() {
						var initialRating = self.options.initialRating;

						if (!initialRating) {
							return $('option:selected', self.$elem);
						}

						return findOption(initialRating);
					}; // get empty option


					var getEmptyOption = function getEmptyOption() {
						var $emptyOpt = self.$elem.find('option[value="' + self.options.emptyValue + '"]');

						if (!$emptyOpt.length && self.options.allowEmpty) {
							$emptyOpt = $('<option />', {
								'value': self.options.emptyValue
							});
							return $emptyOpt.prependTo(self.$elem);
						}

						return $emptyOpt;
					}; // get data


					var getData = function getData(key) {
						var data = self.$elem.data('barrating');

						if (typeof key !== 'undefined') {
							return data[key];
						}

						return data;
					}; // set data


					var setData = function setData(key, value) {
						if (value !== null && _typeof(value) === 'object') {
							self.$elem.data('barrating', value);
						} else {
							self.$elem.data('barrating')[key] = value;
						}
					}; // save data on element


					var saveDataOnElement = function saveDataOnElement() {
						var $opt = getInitialOption();
						var $emptyOpt = getEmptyOption();
						var value = $opt.val();
						var text = $opt.data('html') ? $opt.data('html') : $opt.text(); // if the allowEmpty option is not set let's check if empty option exists in the select field

						var allowEmpty = self.options.allowEmpty !== null ? self.options.allowEmpty : !!$emptyOpt.length;
						var emptyValue = $emptyOpt.length ? $emptyOpt.val() : null;
						var emptyText = $emptyOpt.length ? $emptyOpt.text() : null;
						setData(null, {
							userOptions: self.options,
							// initial rating based on the OPTION value
							ratingValue: value,
							ratingText:  text,
							// rating will be restored by calling clear method
							originalRatingValue: value,
							originalRatingText:  text,
							// allow empty ratings?
							allowEmpty: allowEmpty,
							// rating value and text of the empty OPTION
							emptyRatingValue: emptyValue,
							emptyRatingText:  emptyText,
							// read-only state
							readOnly: self.options.readonly,
							// did the user already select a rating?
							ratingMade: false
						});
					}; // remove data on element


					var removeDataOnElement = function removeDataOnElement() {
						self.$elem.removeData('barrating');
					}; // return current rating text


					var ratingText = function ratingText() {
						return getData('ratingText');
					}; // return current rating value


					var ratingValue = function ratingValue() {
						return getData('ratingValue');
					}; // build widget and return jQuery element


					var buildWidget = function buildWidget() {
						var $w = $('<div />', {
							'class': 'br-widget'
						}); // create A elements that will replace OPTIONs

						self.$elem.find('option').each(function () {
							var val, text, html, $a;
							val = $(this).val(); // create ratings - but only if val is not defined as empty

							if (val !== getData('emptyRatingValue')) {
								text = $(this).text();
								html = $(this).data('html');

								if (html) {
									text = html;
								}

								$a = $('<a />', {
									'href':              '#',
									'data-rating-value': val,
									'data-rating-text':  text,
									'html':              self.options.showValues ? text : ''
								});
								$w.append($a);
							}
						}); // append .br-current-rating div to the widget

						if (self.options.showSelectedRating) {
							$w.append($('<div />', {
								'text':  '',
								'class': 'br-current-rating'
							}));
						} // additional classes for the widget


						if (self.options.reverse) {
							$w.addClass('br-reverse');
						}

						if (self.options.readonly) {
							$w.addClass('br-readonly');
						}

						return $w;
					}; // return a jQuery function name depending on the 'reverse' setting


					var nextAllorPreviousAll = function nextAllorPreviousAll() {
						if (getData('userOptions').reverse) {
							return 'nextAll';
						} else {
							return 'prevAll';
						}
					}; // set the value of the select field


					var setSelectFieldValue = function setSelectFieldValue(value) {
						// change selected option
						findOption(value).prop('selected', true);
						self.$elem.change();
					}; // reset select field


					var resetSelectField = function resetSelectField() {
						$('option', self.$elem).prop('selected', function () {
							return this.defaultSelected;
						});
						self.$elem.change();
					}; // display the currently selected rating


					var showSelectedRating = function showSelectedRating(text) {
						// text undefined?
						text = text ? text : ratingText(); // special case when the selected rating is defined as empty

						if (text == getData('emptyRatingText')) {
							text = '';
						} // update .br-current-rating div


						if (self.options.showSelectedRating) {
							self.$elem.parent().find('.br-current-rating').text(text);
						}
					}; // return rounded fraction of a value (14.4 -> 40, 0.99 -> 90)


					var fraction = function fraction(value) {
						return Math.round(Math.floor(value * 10) / 10 % 1 * 100);
					}; // remove all classes from elements


					var resetStyle = function resetStyle() {
						// remove all classes starting with br-*
						self.$widget.find('a').removeClass(function (index, classes) {
							return (classes.match(/(^|\s)br-\S+/g) || []).join(' ');
						});
					}; // apply style by setting classes on elements


					var applyStyle = function applyStyle() {
						var $a = self.$widget.find('a[data-rating-value="' + ratingValue() + '"]');
						var initialRating = getData('userOptions').initialRating;
						var baseValue = $.isNumeric(ratingValue()) ? ratingValue() : 0;
						var f = fraction(initialRating);
						var $all, $fractional;
						resetStyle(); // add classes

						$a.addClass('br-selected br-current')[nextAllorPreviousAll()]().addClass('br-selected');

						if (!getData('ratingMade') && $.isNumeric(initialRating)) {
							if (initialRating <= baseValue || !f) {
								return;
							}

							$all = self.$widget.find('a');
							$fractional = $a.length ? $a[getData('userOptions').reverse ? 'prev' : 'next']() : $all[getData('userOptions').reverse ? 'last' : 'first']();
							$fractional.addClass('br-fractional');
							$fractional.addClass('br-fractional-' + f);
						}
					}; // check if the element is deselectable?


					var isDeselectable = function isDeselectable($element) {
						if (!getData('allowEmpty') || !getData('userOptions').deselectable) {
							return false;
						}

						return ratingValue() == $element.attr('data-rating-value');
					}; // handle click events


					var attachClickHandler = function attachClickHandler($elements) {
						$elements.on('click.barrating', function (event) {
							var $a      = $(this),
							    options = getData('userOptions'),
							    value,
							    text;
							event.preventDefault();
							value = $a.attr('data-rating-value');
							text = $a.attr('data-rating-text'); // is current and deselectable?

							if (isDeselectable($a)) {
								value = getData('emptyRatingValue');
								text = getData('emptyRatingText');
							} // remember selected rating


							setData('ratingValue', value);
							setData('ratingText', text);
							setData('ratingMade', true);
							setSelectFieldValue(value);
							showSelectedRating(text);
							applyStyle(); // onSelect callback

							options.onSelect.call(self, ratingValue(), ratingText(), event);
							return false;
						});
					}; // handle mouseenter events


					var attachMouseEnterHandler = function attachMouseEnterHandler($elements) {
						$elements.on('mouseenter.barrating', function () {
							var $a = $(this);
							resetStyle();
							$a.addClass('br-active')[nextAllorPreviousAll()]().addClass('br-active');
							showSelectedRating($a.attr('data-rating-text'));
						});
					}; // handle mouseleave events


					var attachMouseLeaveHandler = function attachMouseLeaveHandler($elements) {
						self.$widget.on('mouseleave.barrating blur.barrating', function () {
							showSelectedRating();
							applyStyle();
						});
					}; // somewhat primitive way to remove 300ms click delay on touch devices
					// for a more advanced solution consider setting `fastClicks` option to false
					// and using a library such as fastclick (https://github.com/ftlabs/fastclick)


					var fastClicks = function fastClicks($elements) {
						$elements.on('touchstart.barrating', function (event) {
							event.preventDefault();
							event.stopPropagation();
							$(this).click();
						});
					}; // disable clicks


					var disableClicks = function disableClicks($elements) {
						$elements.on('click.barrating', function (event) {
							event.preventDefault();
						});
					};

					var attachHandlers = function attachHandlers($elements) {
						// attach click event handler
						attachClickHandler($elements);

						if (self.options.hoverState) {
							// attach mouseenter event handler
							attachMouseEnterHandler($elements); // attach mouseleave event handler

							attachMouseLeaveHandler($elements);
						}
					};

					var detachHandlers = function detachHandlers($elements) {
						// remove event handlers in the ".barrating" namespace
						$elements.off('.barrating');
					};

					var setupHandlers = function setupHandlers(readonly) {
						var $elements = self.$widget.find('a');

						if (fastClicks) {
							fastClicks($elements);
						}

						if (readonly) {
							detachHandlers($elements);
							disableClicks($elements);
						} else {
							attachHandlers($elements);
						}
					};

					this.show = function () {
						// run only once
						if (getData()) return; // wrap element

						wrapElement(); // save data

						saveDataOnElement(); // build & append widget to the DOM

						self.$widget = buildWidget();
						self.$widget.insertAfter(self.$elem);
						applyStyle();
						showSelectedRating();
						setupHandlers(self.options.readonly); // hide the select field

						self.$elem.hide();
					};

					this.readonly = function (state) {
						if (typeof state !== 'boolean' || getData('readOnly') == state) return;
						setupHandlers(state);
						setData('readOnly', state);
						self.$widget.toggleClass('br-readonly');
					};

					this.set = function (value) {
						var options = getData('userOptions');
						if (self.$elem.find('option[value="' + value + '"]').length === 0) return; // set data

						setData('ratingValue', value);
						setData('ratingText', self.$elem.find('option[value="' + value + '"]').text());
						setData('ratingMade', true);
						setSelectFieldValue(ratingValue());
						showSelectedRating(ratingText());
						applyStyle(); // onSelect callback

						if (!options.silent) {
							options.onSelect.call(this, ratingValue(), ratingText());
						}
					};

					this.clear = function () {
						var options = getData('userOptions'); // restore original data

						setData('ratingValue', getData('originalRatingValue'));
						setData('ratingText', getData('originalRatingText'));
						setData('ratingMade', false);
						resetSelectField();
						showSelectedRating(ratingText());
						applyStyle(); // onClear callback

						options.onClear.call(this, ratingValue(), ratingText());
					};

					this.destroy = function () {
						var value = ratingValue();
						var text = ratingText();
						var options = getData('userOptions'); // detach handlers

						detachHandlers(self.$widget.find('a')); // remove widget

						self.$widget.remove(); // remove data

						removeDataOnElement(); // unwrap the element

						unwrapElement(); // show the element

						self.$elem.show(); // onDestroy callback

						options.onDestroy.call(this, value, text);
					};
				}

				BarRating.prototype.init = function (options, elem) {
					this.$elem = $(elem);
					this.options = $.extend({}, $.fn.barrating.defaults, options);
					return this.options;
				};

				return BarRating;
			}();

			$.fn.barrating = function (method, options) {
				return this.each(function () {
					var plugin = new BarRating(); // plugin works with select fields

					if (!$(this).is('select')) {
						$.error('Sorry, this plugin only works with select fields.');
					} // method supplied


					if (plugin.hasOwnProperty(method)) {
						plugin.init(options, this);

						if (method === 'show') {
							return plugin.show(options);
						} else {
							// plugin exists?
							if (plugin.$elem.data('barrating')) {
								plugin.$widget = $(this).next('.br-widget');
								return plugin[method](options);
							}
						} // no method supplied or only options supplied

					} else if (_typeof(method) === 'object' || !method) {
						options = method;
						plugin.init(options, this);
						return plugin.show();
					} else {
						$.error('Method ' + method + ' does not exist on jQuery.barrating');
					}
				});
			};

			$.fn.barrating.defaults = {
				theme:         '',
				initialRating: null,
				// initial rating
				allowEmpty: null,
				// allow empty ratings?
				emptyValue: '',
				// this is the expected value of the empty rating
				showValues: false,
				// display rating values on the bars?
				showSelectedRating: true,
				// append a div with a rating to the widget?
				deselectable: true,
				// allow to deselect ratings?
				reverse: false,
				// reverse the rating?
				readonly: false,
				// make the rating ready-only?
				fastClicks: true,
				// remove 300ms click delay on touch devices?
				hoverState: true,
				// change state on hover?
				silent: false,
				// supress callbacks when controlling ratings programatically
				onSelect: function onSelect(value, text, event) {
				},
				// callback fired when a rating is selected
				onClear: function onClear(value, text) {
				},
				// callback fired when a rating is cleared
				onDestroy: function onDestroy(value, text) {
				} // callback fired when a widget is destroyed

			};
			$.fn.barrating.BarRating = BarRating;
		});

		/***/
	}),

	/***/ "./webpack.build.site.js":
	/*!*******************************!*\
	 !*** ./webpack.build.site.js ***!
	 \*******************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */
		var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/jquery-bar-rating/jquery.barrating */ "./node_modules/jquery-bar-rating/jquery.barrating.js");
		/* harmony import */
		var npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(npm_jquery_bar_rating_jquery_barrating__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! npm/is-marker-clusterer */ "./node_modules/is-marker-clusterer/src/markerclusterer.js");
		/* harmony import */
		var npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(npm_is_marker_clusterer__WEBPACK_IMPORTED_MODULE_1__);
		/* harmony import */
		var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mediajs/site/app */ "./com_knowres/media/js/src/site/app.js");
		/* harmony import */
		var mediajs_site_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_app__WEBPACK_IMPORTED_MODULE_2__);
		/* harmony import */
		var mediajs_site_comboregion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mediajs/site/comboregion */ "./com_knowres/media/js/src/site/comboregion.js");
		/* harmony import */
		var mediajs_site_comboregion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_comboregion__WEBPACK_IMPORTED_MODULE_3__);
		/* harmony import */
		var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mediajs/site/confirm */ "./com_knowres/media/js/src/site/confirm.js");
		/* harmony import */
		var mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_confirm__WEBPACK_IMPORTED_MODULE_4__);
		/* harmony import */
		var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mediajs/site/dobentry */ "./com_knowres/media/js/src/site/dobentry.js");
		/* harmony import */
		var mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_dobentry__WEBPACK_IMPORTED_MODULE_5__);
		/* harmony import */
		var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! mediajs/site/guestdata */ "./com_knowres/media/js/src/site/guestdata.js");
		/* harmony import */
		var mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_guestdata__WEBPACK_IMPORTED_MODULE_6__);
		/* harmony import */
		var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mediajs/site/map */ "./com_knowres/media/js/src/site/map.js");
		/* harmony import */
		var mediajs_site_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_map__WEBPACK_IMPORTED_MODULE_7__);
		/* harmony import */
		var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mediajs/site/route */ "./com_knowres/media/js/src/site/route.js");
		/* harmony import */
		var mediajs_site_route__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(mediajs_site_route__WEBPACK_IMPORTED_MODULE_8__);
// KR APP JS Files


		// import './js/src/krapp/stripe';

		/***/
	})

},
	/******/ __webpack_require__ => { // webpackRuntimeModules
		/******/
		var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
		/******/
		__webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.site.js")));
		/******/
		var __webpack_exports__ = __webpack_require__.O();
		/******/
	}
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWhCcUI7SUFnQm5CO0lBQ0hpcUIsU0FBUyxFQUFDLG1CQUFVcG9CLEtBQVYsRUFBaUI3QixJQUFqQixFQUF1QixDQUNoQyxDQWxCcUIsQ0FrQnBCOztFQWxCb0IsQ0FBMUI7RUFxQkEvQyxDQUFDLENBQUNrdEIsRUFBRixDQUFLeHNCLFNBQUwsQ0FBZW1vQixTQUFmLEdBQTJCQSxTQUEzQjtBQUVILENBOWpCQSxDQUFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Q0FFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vY29tX2tub3dyZXMvbWVkaWEvanMvc3JjL3NpdGUvYXBwLmpzIiwid2VicGFjazovL2tyLy4vY29tX2tub3dyZXMvbWVkaWEvanMvc3JjL3NpdGUvY29tYm9yZWdpb24uanMiLCJ3ZWJwYWNrOi8va3IvLi9jb21fa25vd3Jlcy9tZWRpYS9qcy9zcmMvc2l0ZS9jb25maXJtLmpzIiwid2VicGFjazovL2tyLy4vY29tX2tub3dyZXMvbWVkaWEvanMvc3JjL3NpdGUvZG9iZW50cnkuanMiLCJ3ZWJwYWNrOi8va3IvLi9jb21fa25vd3Jlcy9tZWRpYS9qcy9zcmMvc2l0ZS9ndWVzdGRhdGEuanMiLCJ3ZWJwYWNrOi8va3IvLi9jb21fa25vd3Jlcy9tZWRpYS9qcy9zcmMvc2l0ZS9tYXAuanMiLCJ3ZWJwYWNrOi8va3IvLi9jb21fa25vd3Jlcy9tZWRpYS9qcy9zcmMvc2l0ZS9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9pcy1tYXJrZXItY2x1c3RlcmVyL3NyYy9tYXJrZXJjbHVzdGVyZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWJhci1yYXRpbmcvanF1ZXJ5LmJhcnJhdGluZy5qcyIsIndlYnBhY2s6Ly9rci8uL3dlYnBhY2suYnVpbGQuc2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5sZXQgbGFuZztcbmxldCBzZWFyY2hkYXRhID0gW107XG5sZXQgc2VhcmNoRG9uZSA9IGZhbHNlO1xubGV0IGNhbGVuZGFyTG9hZGVkID0gZmFsc2U7XG5sZXQgc2F2ZWR3aWR0aCA9IGZhbHNlO1xubGV0IGxhcmdlO1xubGV0IHJlc2l6ZWQgPSBmYWxzZTtcblxuaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuXHR3aW5kb3cubG9jYXRpb24ub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG5jb25zdCBsaXZlc2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGZ1bmN0aW9uKCkge1xuXHRcdEZvdW5kYXRpb24uYWRkVG9KcXVlcnkoKTtcblx0XHQkKGRvY3VtZW50KS5mb3VuZGF0aW9uKCk7XG5cdFx0bGFuZyA9ICQoJyNrci1sYW5nJykuZGF0YSgna3JsYW5nJyk7XG5cblx0XHRjaGVja1NjcmVlbldpZHRoKCk7XG5cdFx0JCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNoZWNrU2NyZWVuV2lkdGgoKVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgYmFycyA9ICQoJy5rci1yYXRpbmcnKTtcblx0XHRpZiAoYmFycy5sZW5ndGgpIHtcblx0XHRcdGJhcnMuYmFycmF0aW5nKCdzaG93Jywge1xuXHRcdFx0XHRzaG93VmFsdWVzOiAgICAgICAgIHRydWUsXG5cdFx0XHRcdHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnLmFqYXhmb3JtJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICRmb3JtID0gJCh0aGlzKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nKSArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgICRmb3JtLnNlcmlhbGl6ZSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGZvcm1SZXNwb25zZSgkZm9ybS5hdHRyKCdpZCcpLCByZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpdmVzaXRlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6ICAgIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG5cdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdoaWRlLnpmLmRyb3Bkb3duJywgJyNrci1xdW90ZS1mb3JtJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcjZ3Vlc3RzJykudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0fSkub24oJ29wZW4uemYucmV2ZWFsJywgJy5rci1hamF4LW1vZGFsW2RhdGEtcmV2ZWFsXScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBtb2RhbGlkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cdFx0XHRpZiAoISQudHJpbSggJChtb2RhbGlkKS5odG1sKCkpLmxlbmd0aCkge1xuXHRcdFx0XHRjb25zdCBhamF4dXJsID0gJCh0aGlzKS5kYXRhKCdhamF4dXJsJyk7XG5cdFx0XHRcdGlmIChhamF4dXJsKSB7XG5cdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdHR5cGU6ICAgICdQT1NUJyxcblx0XHRcdFx0XHRcdHVybDogICAgIGFqYXh1cmwsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdFx0XHRcdFx0XHQkKG1vZGFsaWQpLmh0bWwoY29udGVudCkudHJpZ2dlcigncmVzaXplbWUuemYucmV2ZWFsJyk7XG5cdFx0XHRcdFx0XHRcdCQobW9kYWxpZCkuZm91bmRhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkub24oJ2NsaWNrJywgJy5mYXZzcGFuJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLmZhdm91cml0ZSZsYW5nPScgKyBsYW5nLFxuXHRcdFx0XHRkYXRhOiAgICAgeydwcm9wZXJ0eV9pZCc6ICR0aGlzLmRhdGEoJ3Byb3BlcnR5JyksICd2aWV3JzogJHRoaXMuZGF0YSgndmlldycpfSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGF0YS5hY3Rpb24gPT09ICdoaWRlbWUnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBcIiNcIiArICR0aGlzLmZpbmQoJy5oYXMtdGlwJykuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQoZWxlbWVudCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLnBhcmVudHMoJy5rci1wcm9wZXJ0aWVzIC5rci1wcm9wZXJ0eSAuZmF2czpmaXJzdCcpLmhpZGUoJ3Nsb3cnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LmRhdGEuYWN0aW9uICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgJHRhcmdldCA9ICR0aGlzLmZpbmQoJ2kuZmEtaGVhcnQnKTtcblx0XHRcdFx0XHRcdFx0JHRhcmdldC50b2dnbGVDbGFzcygnaW4nKTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsMSA9ICcjJyArICR0YXJnZXQuZGF0YSgndG9nZ2xlJyk7XG5cdFx0XHRcdFx0XHRcdCQodmFsMSkudGV4dChyZXN1bHQuZGF0YS5hY3Rpb24pLmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdjbGljaycsICcuZ2V0UmVzcG9uc2VTZWFyY2gnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Z2V0UHJvcGVydGllcygkKHRoaXMpLmRhdGEoJ2ZpZWxkJyksICQodGhpcykuZGF0YSgndmFsdWUnKSk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy5rci1maWx0ZXJzLWNsb3NlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcuc2lkZWJhciAua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS50b2dnbGUoKTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pLm9uKCdjbGljaycsICcjc2hvd2dhdGV3YXlzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJyNrci1nYXRld2F5cycpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHR9KS5vbignY2xpY2snLCAnI2tyLXNob3ctc29ydGJ5JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1zb3J0YnkudG9wJykudG9nZ2xlQ2xhc3MoJ2hpZGVtZScpO1xuXHRcdFx0c2V0QWN0aXZlTWVudSgnc29ydCcpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2hvdy1maWx0ZXJieScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3Itc29ydGJ5LnRvcCcpLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdCQoJy5rci1maWx0ZXJzLnRvcCcpLnRvZ2dsZUNsYXNzKCdoaWRlbWUnKTtcblx0XHRcdHNldEFjdGl2ZU1lbnUoJ2ZpbHRlcicpO1xuXHRcdH0pLm9uKCdjbGljaycsICcua3ItZmlsdGVycy1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcua3ItZmlsdGVycy50b3AnKS5hZGRDbGFzcygnaGlkZW1lJyk7XG5cdFx0XHRzZXRBY3RpdmVNZW51KCdsaXN0Jyk7XG5cdFx0fSkub24oJ2NsaWNrJywgJy50b2dnbGVvdGhlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKHRoaXMpLmRhdGEoJ290aGVyJykudG9nZ2xlKCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnLmtyLXByb3BlcnRpZXMnKS5sZW5ndGggJiYgIXNlYXJjaERvbmUpIHtcblx0XHRcdGdldFByb3BlcnRpZXMoJ3ZpZXcnLCAkKHRoaXMpLmRhdGEoJ3ZpZXcnKSk7XG5cdFx0fVxuXG5cdFx0bGV0ICR0YWJzID0gJCgnLnRhYnMnKTtcblx0XHRpZiAoJCgnI2tyLXByb3BlcnR5LXRhYnMnKS5sZW5ndGggJiYgIWNhbGVuZGFyTG9hZGVkKSB7XG5cdFx0XHQkdGFicy5maW5kKCdhJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmF0dHIoJ2hyZWYnKSA9PT0gXCIjY2FsZW5kYXJcIikge1xuXHRcdFx0XHRcdGNvbnN0IHBpZCA9ICQodGhpcykuZGF0YSgncGlkJyk7XG5cdFx0XHRcdFx0bG9hZENhbGVuZGFyKHBpZCk7XG5cdFx0XHRcdFx0Y2FsZW5kYXJMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaHN0YXJ0ID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiggXywgbnMsIGhhbmRsZSApe1xuXHRcdFx0aWYgKCBucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikgKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuZXZlbnQuc3BlY2lhbC50b3VjaG1vdmUgPSB7XG5cdFx0c2V0dXA6IGZ1bmN0aW9uKCBfLCBucywgaGFuZGxlICl7XG5cdFx0XHRpZiAoIG5zLmluY2x1ZGVzKFwibm9QcmV2ZW50RGVmYXVsdFwiKSApIHtcblx0XHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gbG9hZENhbGVuZGFyKHBpZCkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5nZXJpYXRyaWMmbGFuZz0nICsgbGFuZyxcblx0XHRcdGRhdGFUeXBlOiAnaHRtbCcsXG5cdFx0XHRkYXRhOiAgICAge1xuXHRcdFx0XHQncGlkJzogcGlkXG5cdFx0XHR9LFxuXHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdCQoJyNjYWxlbmRhci50YWJzLXBhbmVsJykuYXBwZW5kKGRhdGEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9ybVJlc3BvbnNlKGlkLCBkYXRhKSB7XG5cdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVkaXJlY3QpO1xuXHRcdH0gZWxzZSBpZiAoaWQgPT09ICdrci1mb3JtLXBheW1lbnQnKSB7XG5cdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpKSB7XG5cdFx0XHRcdGxldCAkbW9kYWwgPSAkKCcja3ItZ2F0ZXdheS1tb2RhbCcpO1xuXHRcdFx0XHQkbW9kYWwuaHRtbChkYXRhLmh0bWwpLnRyaWdnZXIoJ3Jlc2l6ZW1lLnpmLnJldmVhbCcpO1xuXHRcdFx0XHQkbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaXZlc2l0ZTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGlkID09PSAna3ItZm9ybS1tYWlsY2hpbXAnKSB7XG5cdFx0XHQkKCcjcmVzcG9uc2UyJykuaHRtbChkYXRhKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKGZpZWxkLCB2YWx1ZSkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ2aWV3PXByb3BlcnRpZXMmZm9ybWF0PXJhdyZsYW5nPScgKyBsYW5nLFxuXHRcdFx0dHlwZTogICAgICdQT1NUJyxcblx0XHRcdGRhdGE6ICAgICB7J2ZpZWxkJzogZmllbGQsICd2YWx1ZSc6IHZhbHVlfSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0c2VhcmNoZGF0YSA9IGRhdGE7XG5cdFx0XHRcdGlmICghc2VhcmNoZGF0YSkge1xuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBub2luc3BlY3Rpb24gT3Zlcmx5Q29tcGxleEJvb2xlYW5FeHByZXNzaW9uSlNcblx0XHRcdFx0aWYgKGZpZWxkID09PSAnb3JkZXInIHx8IGZpZWxkID09PSAndmlldycgfHwgZmllbGQgPT09ICdmYXZzJyB8fCBmaWVsZCA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHRzZXRBY3RpdmVNZW51KHNlYXJjaGRhdGFbJ3ZpZXcnXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRTZWFyY2hEYXRhKHNlYXJjaGRhdGEsIGZpZWxkKTtcblx0XHRcdFx0JCgnLmhhcy10aXAnKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHRcdCQoJy5kcm9wZG93bi1wYW5lJykuZm91bmRhdGlvbigpO1xuXHRcdFx0XHRpZiAoIWxhcmdlICYmIGZpZWxkID09PSAnb3JkZXInKSB7XG5cdFx0XHRcdFx0JCgnI3NvcnRieScpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VhcmNoRG9uZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRTZWFyY2hEYXRhKHJlc3BvbnNlLCBmaWVsZCA9ICcnKSB7XG5cdFx0aWYgKHJlc3BvbnNlKSB7XG5cdFx0XHQkKCcja3ItcHJvcGVydGllcy1kYXRhJykuZW1wdHkoKS5mYWRlSW4oJ3Nsb3cnKS5odG1sKHJlc3BvbnNlWydpdGVtcyddKS5mb3VuZGF0aW9uKCk7XG5cdFx0XHQkKCcua3ItcGFnZXInKS5odG1sKHJlc3BvbnNlWydwYWdpbmF0aW9uJ10pO1xuXG5cdFx0XHRpZiAobGFyZ2UgPT09IHRydWUpIHtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNlYXJjaC1vZmYtY2FudmFzXCIpLmh0bWwoJycpO1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtZmlsdGVycy1vZmYtY2FudmFzXCIpLmh0bWwoJycpO1xuXHRcdFx0XHQkKFwiI2tyLXByb3BlcnRpZXMtc29ydGJ5LW9mZi1jYW52YXNcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3Itc2lkZWJhci1zZWFyY2hcIikuZW1wdHkoKS5odG1sKHJlc3BvbnNlWydzZWFyY2gnXSk7XG5cdFx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlcnMnKS5lbXB0eSgpLmh0bWwocmVzcG9uc2VbJ2ZpbHRlcnMnXSk7XG5cdFx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLXNvcnRieScpLmVtcHR5KCkuaHRtbChyZXNwb25zZVsnc29ydGJ5J10pLmFkZENsYXNzKCdoaWRlbWUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJyNrci1wcm9wZXJ0aWVzLWZpbHRlcnMnKS5odG1sKCcnKTtcblx0XHRcdFx0JCgnI2tyLXByb3BlcnRpZXMtc29ydGJ5JykuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3Itc2lkZWJhci1zZWFyY2hcIikuaHRtbCgnJyk7XG5cdFx0XHRcdCQoXCIja3ItcHJvcGVydGllcy1maWx0ZXJzLW9mZi1jYW52YXNcIikuaHRtbChyZXNwb25zZVsnZmlsdGVycyddKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNvcnRieS1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NvcnRieSddKTtcblx0XHRcdFx0JChcIiNrci1wcm9wZXJ0aWVzLXNlYXJjaC1vZmYtY2FudmFzXCIpLmh0bWwocmVzcG9uc2VbJ3NlYXJjaCddKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlc3BvbnNlWydzZWFyY2gnXS5sZW5ndGggJiYgJCgnI2Fycml2YWxkc3AnKS5sZW5ndGgpXG5cdFx0XHR7XG5cdFx0XHRcdCQoJ2JvZHknKS50cmlnZ2VyKCdpbml0YWpheHNlYXJjaCcpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcuc2lkZWJhciAua3ItZmlsdGVycyB1bC5maWx0ZXItc29ydC1saXN0IGxpLmhlYWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS5zaG93KCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignbGkuY2hlY2tib3gnKS5oaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZmllbGQgPT09ICdwYWdlJykge1xuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0QWN0aXZlTWVudShpdGVtKSB7XG5cdFx0Y29uc3QgYmFyID0gJCgnLmtyLXNlYXJjaGJhcicpLmZpbmQoJ2xpJyk7XG5cdFx0JC5lYWNoKGJhciwgZnVuY3Rpb24gKGluZGV4LCBiYXIpIHtcblx0XHRcdCQoYmFyKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBlbGVtZW50ID0gJy5rci1zZWFyY2hiYXIgbGkuJyArIGl0ZW07XG5cdFx0JChlbGVtZW50KS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cdH1cblxuXHQvLyBSZXR1cm4gdHJ1ZSBpZiB3aWR0aCBoYXMgY2hhbmdlZFxuXHRmdW5jdGlvbiBzY3JlZW5XaWR0aEhhc0NoYW5nZWQoKSB7XG5cdFx0bGFyZ2UgPSBGb3VuZGF0aW9uLk1lZGlhUXVlcnkuYXRMZWFzdCgnbGFyZ2UnKTtcblx0XHRpZiAobGFyZ2UgIT09IHNhdmVkd2lkdGgpIHtcblx0XHRcdHNhdmVkd2lkdGggPSBsYXJnZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tTY3JlZW5XaWR0aCgpIHtcblx0XHRyZXNpemVkID0gZmFsc2U7XG5cdFx0aWYgKHNjcmVlbldpZHRoSGFzQ2hhbmdlZCgpICYmIHNlYXJjaGRhdGFbJ2l0ZW1zJ10gJiYgIXJlc2l6ZWQpIHtcblx0XHRcdHNldFNlYXJjaERhdGEoc2VhcmNoZGF0YSk7XG5cdFx0XHRyZXNpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHQkLmV2ZW50LnNwZWNpYWwudG91Y2hzdGFydCA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24oIF8sIG5zLCBoYW5kbGUgKXtcblx0XHRcdGlmICggbnMuaW5jbHVkZXMoXCJub1ByZXZlbnREZWZhdWx0XCIpICkge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHQkLmV2ZW50LnNwZWNpYWwudG91Y2htb3ZlID0ge1xuXHRcdHNldHVwOiBmdW5jdGlvbiggXywgbnMsIGhhbmRsZSApe1xuXHRcdFx0aWYgKCBucy5pbmNsdWRlcyhcIm5vUHJldmVudERlZmF1bHRcIikgKSB7XG5cdFx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvdW50cnljaGFpbicpLmZvckVhY2goKGl0ZW0pID0+IHtcblx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmRhdGFzZXQudGFyZ2V0KTtcblx0XHRzZXRSZWdpb25TZWxlY3QoaXRlbS52YWx1ZSkudGhlbihkYXRhID0+IHtcblx0XHRcdGlmICh0YXJnZXQub3B0aW9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRhcmdldC5vcHRpb25zLmxlbmd0aCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFbJ2snXS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0YXJnZXQub3B0aW9uc1t0YXJnZXQub3B0aW9ucy5sZW5ndGhdID0gbmV3IE9wdGlvbihkYXRhWyd2J11baV0sIGRhdGFbJ2snXVtpXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufSwgZmFsc2UpO1xuXG5hc3luYyBmdW5jdGlvbiBzZXRSZWdpb25TZWxlY3QoaWQpIHtcblx0bGV0IGRhdGEgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cdGRhdGEuYXBwZW5kKGBjb3VudHJ5X2lkYCwgaWQpO1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdGJvZHk6ICAgZGF0YVxuXHR9XG5cblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXJlZ2lvbnMuY2hhaW5lZCcsIG9wdGlvbnMpO1xuXHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0YWxlcnQoJ1NvcnJ5IHdlIGhhdmUgZW5vdW50ZXJlZCBhIHByb2JsZW0gcGxlYXNlIHRyeSBhZ2FpbiBvciBjb250YWN0IHVzJyk7XG5cdH0gZWxzZSB7XG5cdFx0bGV0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcblx0XHRcdHJldHVybiByZXN1bHQuZGF0YTtcblx0XHR9XG5cdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHR9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pmb3JtX2NvdW50cnlfaWQnKTtcblx0aWYgKHR5cGVvZihlbGVtZW50KSAhPSAndW5kZWZpbmVkJyAmJiBlbGVtZW50ICE9IG51bGwpIHtcblx0XHRsZXQgY2hhbmdlRXZlbnQgPSBuZXcgRXZlbnQoJ2NoYW5nZScpO1xuXHRcdGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdmVudCk7XG5cdH1cbn0pOyIsIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXHRpZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuXHRjb25zdCBsaXZlc2l0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyc7XG5cblx0bGV0IGxhbmcgPSAkKFwiI2tyLWxhbmdcIikuZGF0YSgna3JsYW5nJyk7XG5cdGxldCBteUNvbmZpcm07XG5cblx0Y2xhc3MgS3Jjb25maXJtIHtcblx0XHRjb25zdHJ1Y3RvcigkZm9ybSkge1xuXHRcdFx0dGhpcy5mb3JtID0gJGZvcm07XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpbml0KCkge1xuXHRcdFx0dGhpcy51cGRhdGVRdW90ZSh0aGlzLmZvcm0pO1xuXHRcdH1cblxuXHRcdHVwZGF0ZVF1b3RlKCRmb3JtKSB7XG5cdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgICAnUE9TVCcsXG5cdFx0XHRcdHVybDogICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9Y29uZmlybS5jb21wdXRlJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgICAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRzdWNjZXNzOiAgZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0JykpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsZXQgZGl2O1xuXHRcdFx0XHRcdFx0JC5lYWNoKHJlc3VsdC5kYXRhLnJlc3BvbnNlLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdFx0JCgnLmhpZGVpbml0aWFsJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnRleHQodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLmh0bWwodmFsKTtcblx0XHRcdFx0XHRcdFx0JChkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0XHQkKGRpdikuc2hvdygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoJy5rci1hamF4LW1vZGFsLWVycm9yLW1lc3NhZ2UnKS5odG1sKHJlc3VsdC5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGNvbnN0ICRtb2RhbCA9IG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkKCcjS3JBamF4TW9kYWxFcnJvcicpKTtcblx0XHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgJGVsZW1lbnQgPSAkKCcja3ItZm9ybS1jb25maXJtJyk7XG5cdFx0aWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuXHRcdFx0bXlDb25maXJtID0gbmV3IEtyY29uZmlybSgkZWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0JGVsZW1lbnQub24oJ2NoYW5nZSwgY2xpY2snLCAnLmtyLWNhbGN1bGF0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkZWxlbWVudCA9ICQoJyNrci1mb3JtLWNvbmZpcm0nKTtcblx0XHRcdG15Q29uZmlybS51cGRhdGVRdW90ZSgkZWxlbWVudCk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5vbignc3VibWl0JywgJy5qc29uZm9ybScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCAkZm9ybSA9ICQodGhpcyk7XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nKSArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0ZGF0YTogICAgJGZvcm0uc2VyaWFsaXplKCksXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3VsdC5kYXRhLnJlZGlyZWN0O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbChyZXN1bHQubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI0tyQWpheE1vZGFsRXJyb3InKSk7XG5cdFx0XHRcdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKCcua3ItYWpheC1tb2RhbC1lcnJvci1tZXNzYWdlJykuaHRtbCgnU29ycnkgYW4gZXJyb3IgaGFzIG9jY3VycmVkLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG5cdFx0XHRcdFx0Y29uc3QgJG1vZGFsID0gbmV3IEZvdW5kYXRpb24uUmV2ZWFsKCQoJyNLckFqYXhNb2RhbEVycm9yJykpO1xuXHRcdFx0XHRcdCRtb2RhbC5vcGVuKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pLm9uKCdjbGljaycsICcjY2hlY2t0ZXJtcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY2hlY2tUZXJtcygpKSB7XG5cdFx0XHRcdCQoJyNjaGVja3Rlcm1zJykudHJpZ2dlcignc3VibWl0Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRmdW5jdGlvbiBjaGVja1Rlcm1zKCkge1xuXHRcdGxldCByZXN1bHQgPSB0cnVlO1xuXHRcdGNvbnN0IHRlc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVjaycpO1xuXHRcdGNvbnN0IHRlc3RjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FncmVlY2hlY2tjJyk7XG5cdFx0Y29uc3QgdGVzdHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdyZWVjaGVja3QnKTtcblxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0ICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVjay5jaGVja2VkKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0Ly8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG5cdFx0aWYgKHRlc3RjICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna3ItZm9ybS1wYXltZW50JykuYWdyZWVjaGVja2MuY2hlY2tlZCkge1xuXHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuXHRcdGlmICh0ZXN0dCAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tyLWZvcm0tcGF5bWVudCcpLmFncmVlY2hlY2t0LmNoZWNrZWQpIHtcblx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCAkbW9kYWwgPSBuZXcgRm91bmRhdGlvbi5SZXZlYWwoJCgnI2Vycm9yTW9kYWwnKSk7XG5cdFx0XHQkbW9kYWwub3BlbigpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxufShqUXVlcnkpKTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuXG4oZnVuY3Rpb24gKCQpIHtcblx0bGV0IG15S3JEb2JFbnRyeTtcblx0bGV0IHRvZGF5O1xuXHRsZXQga2V5ID0ge0JBQ0tTUEFDRTogOH07XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdGN1c3RvbV92YWxpZGF0aW9uOiAgICAgZmFsc2UsXG5cdFx0ZGF5c19pbl9tb250aDogICAgICAgICBbMzEsIDI5LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG5cdFx0ZG9jdW1lbnRfZGF0ZTogICAgICAgICBmYWxzZSxcblx0XHRlcnJvcmJveF94OiAgICAgICAgICAgIDEsXG5cdFx0ZXJyb3Jib3hfeTogICAgICAgICAgICA1LFxuXHRcdGZpZWxkX2hpbnRfdGV4dF9kYXk6ICAgJ0REJyxcblx0XHRmaWVsZF9oaW50X3RleHRfbW9udGg6ICdNTScsXG5cdFx0ZmllbGRfaGludF90ZXh0X3llYXI6ICAnWVlZWScsXG5cdFx0ZmllbGRfb3JkZXI6ICAgICAgICAgICAnRE1ZJyxcblx0XHRmaWVsZF93aWR0aF9kYXk6ICAgICAgIDYsXG5cdFx0ZmllbGRfd2lkdGhfbW9udGg6ICAgICA2LFxuXHRcdGZpZWxkX3dpZHRoX3llYXI6ICAgICAgNyxcblx0XHRmaWVsZF93aWR0aF9zZXA6ICAgICAgIDIsXG5cdFx0bWF4X2RhdGU6ICAgICAgICAgICAgICBmYWxzZSxcblx0XHRtaW5feWVhcjogICAgICAgICAgICAgIDE5MTAsXG5cdFx0bW9udGhfbmFtZTogICAgICAgICAgICBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsXG5cdFx0XHQnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ10sXG5cdFx0b25fYmx1cjogICAgICAgICAgICAgICBmYWxzZSxcblx0XHRvbl9lcnJvcjogICAgICAgICAgICAgIGZhbHNlLFxuXHRcdG9uX2NoYW5nZTogICAgICAgICAgICAgZmFsc2UsXG5cdFx0cGFyc2VfZGF0ZTogICAgICAgICAgICB0cnVlLFxuXHRcdHNlcGFyYXRvcjogICAgICAgICAgICAgJy8nLFxuXHRcdHNob3dfZXJyb3JzOiAgICAgICAgICAgdHJ1ZSxcblx0XHRzaG93X2hpbnRzOiAgICAgICAgICAgIHRydWUsXG5cdFx0RV9EQVlfTkFOOiAgICAgICAgICAgICAnRGF5IG11c3QgYmUgYSBudW1iZXInLFxuXHRcdEVfREFZX1RPT19CSUc6ICAgICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfREFZX1RPT19TTUFMTDogICAgICAgJ0RheSBtdXN0IGJlIDEtMzEnLFxuXHRcdEVfQkFEX0RBWV9GT1JfTU9OVEg6ICAgJ09ubHkgJWQgZGF5cyBpbiAlbSAleScsXG5cdFx0RV9NT05USF9OQU46ICAgICAgICAgICAnTW9udGggbXVzdCBiZSBhIG51bWJlcicsXG5cdFx0RV9NT05USF9UT09fQklHOiAgICAgICAnTW9udGggbXVzdCBiZSAxLTEyJyxcblx0XHRFX01PTlRIX1RPT19TTUFMTDogICAgICdNb250aCBjYW5ub3QgYmUgMCcsXG5cdFx0RV9ZRUFSX05BTjogICAgICAgICAgICAnWWVhciBtdXN0IGJlIGEgbnVtYmVyJyxcblx0XHRFX1lFQVJfTEVOR1RIOiAgICAgICAgICdZZWFyIG11c3QgYmUgNCBkaWdpdHMnLFxuXHRcdEVfWUVBUl9UT09fU01BTEw6ICAgICAgJ1llYXIgbXVzdCBub3QgYmUgYmVmb3JlICV5Jyxcblx0XHRFX01JTl9EQVRFOiAgICAgICAgICAgICdEYXRlIG11c3QgYmUgYWZ0ZXIgJURBVEUnLFxuXHRcdEVfTUFYX0RBVEU6ICAgICAgICAgICAgJ0RhdGUgbXVzdCBub3QgYmUgaW4gdGhlIGZ1dHVyZSdcblx0fTtcblxuXHRjbGFzcyBLckRvYkVudHJ5IHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dG9kYXkgPSBLckRvYkVudHJ5LmdldFltZChuZXcgRGF0ZSgpKTtcblxuXHRcdFx0dGhpcy5pbnB1dF9kYXkgPSAwO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aCA9IDA7XG5cdFx0XHR0aGlzLmlucHV0X3llYXIgPSAwO1xuXHRcdFx0dGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRzdGF0aWMgZ2V0WW1kKGRhdGUpIHtcblx0XHRcdGNvbnN0IG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuXHRcdFx0Y29uc3QgZCA9IGRhdGUuZ2V0RGF5KCk7XG5cblx0XHRcdHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgKG0gPCAxMCA/ICcwJyA6ICcnKSArIG0gKyAnLScgKyAoZCA8IDEwID8gJzAnIDogJycpICsgZCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGdldFltZE9iamVjdChkYXRlKSB7XG5cdFx0XHRyZXR1cm4gKGRhdGUueWVhciArICctJyArIGRhdGUubW9udGggKyAnLScgKyBkYXRlLmRheSk7XG5cdFx0fVxuXG5cdFx0YWRkRW50cnlGaWVsZHMoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0ZG9iZmllbGQuZmllbGRzID0gW107XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MuZmllbGRfb3JkZXIuc3BsaXQoJycpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcblx0XHRcdFx0c3dpdGNoIChmaWVsZCkge1xuXHRcdFx0XHRcdGNhc2UgJ0QnOlxuXHRcdFx0XHRcdFx0ZG9iZmllbGQuYnVpbGRGaWVsZCgnZGF5JywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ21vbnRoJywgaSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdZJzpcblx0XHRcdFx0XHRcdGRvYmZpZWxkLmJ1aWxkRmllbGQoJ3llYXInLCBpKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRcdFx0dGhyb3cgXCJVbmV4cGVjdGVkIGZpZWxkIG9yZGVyICdcIiArIGZpZWxkICsgXCInIGV4cGVjdGVkIEQsIE0gb3IgWVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRhZnRlclBhc3RlKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMucGFyc2VEYXRlKCQodGFyZ2V0KS52YWwoKSkpIHtcblx0XHRcdFx0dGhpcy5zZXREYXRlKCQodGFyZ2V0KS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YnVpbGRGaWVsZChuYW1lLCBpbmRleCkge1xuXHRcdFx0bGV0IGtyZG9iZW50cnkgPSB0aGlzO1xuXHRcdFx0bGV0IGlucHV0ID0gbmV3IEtyRG9iSW5wdXQoe1xuXHRcdFx0XHRuYW1lOiAgICAgICBuYW1lLFxuXHRcdFx0XHRrcmRvYmVudHJ5OiBrcmRvYmVudHJ5LFxuXHRcdFx0XHRpbmRleDogICAgICBpbmRleCxcblx0XHRcdFx0aGludF90ZXh0OiAgc2V0dGluZ3Muc2hvd19oaW50cyA/IHNldHRpbmdzWydmaWVsZF9oaW50X3RleHRfJyArIG5hbWVdIDogbnVsbCxcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLmlubmVyLmFwcGVuZChpbnB1dC4kaW5wdXQpO1xuXHRcdFx0dGhpc1snaW5wdXRfJyArIG5hbWVdID0gaW5wdXQ7XG5cblx0XHRcdGlmIChpbmRleCA8IDIpIHtcblx0XHRcdFx0dGhpcy5pbm5lci5hcHBlbmQoJCgnPHNwYW4gY2xhc3M9XCJzZXBhcmF0b3JcIiAvPicpLnRleHQoc2V0dGluZ3Muc2VwYXJhdG9yKSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZmllbGRzW2luZGV4XSA9IGlucHV0O1xuXHRcdFx0dGhpc1tuYW1lXSA9IGlucHV0O1xuXHRcdH1cblxuXHRcdGJ1aWxkVWkoKSB7XG5cdFx0XHRsZXQgZG9iZmllbGQgPSB0aGlzO1xuXHRcdFx0dGhpcy53cmFwcGVyID0gJCh0aGlzLiRlbGVtZW50LndyYXAoJzxzcGFuIGNsYXNzPVwianEtZHRlXCIgLz4nKS5wYXJlbnQoKVswXSk7XG5cdFx0XHR0aGlzLmlubmVyID0gJCgnPHNwYW4gY2xhc3M9XCJqcS1kdGUtaW5uZXJcIiAvPicpO1xuXHRcdFx0dGhpcy5hZGRFbnRyeUZpZWxkcygpO1xuXHRcdFx0dGhpcy5lcnJvcmJveCA9ICQoJzxzcGFuIGNsYXNzPVwianEtZHRlLWVycm9yYm94XCIgLz4nKS5oaWRlKCk7XG5cdFx0XHR0aGlzLmlubmVyLm9uKCdwYXN0ZScsICdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGxldCBpbnB1dCA9IHRoaXM7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGRvYmZpZWxkLmFmdGVyUGFzdGUoaW5wdXQsIGUpO1xuXHRcdFx0XHR9LCAyKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy53cmFwcGVyLmFwcGVuZCh0aGlzLmlubmVyLCB0aGlzLmVycm9yYm94KTtcblx0XHRcdHRoaXMuc2V0RmllbGRXaWR0aHMoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuaGlkZSgpO1xuXHRcdH1cblxuXHRcdGNoZWNrRG9jdW1lbnQoZG9iLCBjaGlsZGRvYiwgY2xhc3NuYW1lKSB7XG5cdFx0XHRsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzbmFtZSk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChuZXcgRGF0ZShkb2IpID4gbmV3IERhdGUoY2hpbGRkb2IpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNsZWFyKCkge1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCcnKTtcblx0XHRcdHRoaXMuc2V0RGF0ZSgnJyk7XG5cdFx0fVxuXG5cdFx0Y2xlYXJFcnJvcigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdGRlc3Ryb3koKSB7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnNob3coKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQuY3NzKCdkaXNwbGF5JywgJycpO1xuXHRcdFx0dGhpcy53cmFwcGVyLmZpbmQoJ3NwYW4nKS5yZW1vdmUoKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQudW53cmFwKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnJlbW92ZURhdGEoJ2RhdGV0ZXh0ZW50cnknKTtcblx0XHRcdGRlbGV0ZSB0aGlzLmlubmVyO1xuXHRcdFx0ZGVsZXRlIHRoaXMud3JhcHBlcjtcblx0XHRcdGRlbGV0ZSB0aGlzLiRlbGVtZW50O1xuXHRcdH1cblxuXHRcdGZvY3VzKCkge1xuXHRcdFx0dGhpcy5maWVsZHNbMF0uc2V0Rm9jdXModHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEJlZm9yZShpbnB1dCkge1xuXHRcdFx0Y29uc3QgaW5kZXggPSBpbnB1dC5pbmRleDtcblx0XHRcdGlmIChpbmRleCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggLSAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHRcdC8vIGxldCBuZXh0ID0gdGhpcy5maWVsZHNbaW5kZXggLSAxXTtcblx0XHRcdC8vIGxldCB2YWwgPSBuZXh0LmdldCgpO1xuXHRcdFx0Ly8gbmV4dC5zZXRGb2N1cyhmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Zm9jdXNGaWVsZEFmdGVyKGlucHV0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGlucHV0LmluZGV4O1xuXHRcdFx0aWYgKGluZGV4ID4gMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmZpZWxkc1tpbmRleF0ueWllbGRGb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbaW5kZXggKyAxXS5zZXRGb2N1cyh0cnVlKTtcblx0XHR9XG5cblx0XHRmb2N1c0luKCkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmFkZENsYXNzKCdmb2N1cycpO1xuXHRcdH1cblxuXHRcdGZvY3VzT3V0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2VsZi53aWRnZXRGb2N1c0xvc3QoKTtcblx0XHRcdFx0fSwgMik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG5cdFx0fVxuXG5cdFx0Z2V0RGF0ZSgpIHtcblx0XHRcdHJldHVybiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSAmJiB0aGlzLnllYXJfdmFsdWUpXG5cdFx0XHQgICAgICAgPyB7ZGF5OiB0aGlzLmRheV92YWx1ZSwgbW9udGg6IHRoaXMubW9udGhfdmFsdWUsIHllYXI6IHRoaXMueWVhcl92YWx1ZX1cblx0XHRcdCAgICAgICA6IG51bGw7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGlmICghc2V0dGluZ3MubWF4X2RhdGUpXG5cdFx0XHRcdHNldHRpbmdzLm1heF9kYXRlID0gdG9kYXk7XG5cdFx0XHRpZiAoIXNldHRpbmdzLm1pbl95ZWFyKVxuXHRcdFx0XHRzZXR0aW5ncy5taW5feWVhciA9ICcxOTEwJztcblxuXHRcdFx0dGhpcy5idWlsZFVpKCk7XG5cdFx0XHR0aGlzLnNldERhdGUodGhpcy4kZWxlbWVudC5hdHRyKCd2YWx1ZScpKTtcblx0XHRcdHRoaXMucHJveHlMYWJlbENsaWNrcygpO1xuXHRcdH1cblxuXHRcdHBhcnNlRGF0ZSh0ZXh0KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJzZUlzb0RhdGUodGV4dCk7XG5cdFx0fVxuXG5cdFx0cGFyc2VJc29EYXRlKHRleHQpIHtcblx0XHRcdHJldHVybiB0ZXh0ICYmIHRleHQubWF0Y2goL14oXFxkXFxkXFxkXFxkKS0oXFxkXFxkKS0oXFxkXFxkKS8pID8ge1xuXHRcdFx0XHRkYXk6ICAgUmVnRXhwLiQzLFxuXHRcdFx0XHRtb250aDogUmVnRXhwLiQyLFxuXHRcdFx0XHR5ZWFyOiAgUmVnRXhwLiQxXG5cdFx0XHR9IDogbnVsbDtcblx0XHR9XG5cblx0XHRwcm94eUxhYmVsQ2xpY2tzKCkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdGxldCBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0JCgnbGFiZWxbZm9yPScgKyBpZCArICddJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRkb2JmaWVsZC5mb2N1cygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RGF0ZShuZXdfZGF0ZSkge1xuXHRcdFx0bGV0IGRvYmZpZWxkID0gdGhpcztcblx0XHRcdG5ld19kYXRlID0gdGhpcy5wYXJzZURhdGUobmV3X2RhdGUpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuZGF5X3ZhbHVlO1xuXHRcdFx0ZGVsZXRlIHRoaXMubW9udGhfdmFsdWU7XG5cdFx0XHRkZWxldGUgdGhpcy55ZWFyX3ZhbHVlO1xuXHRcdFx0dGhpcy5pbnB1dF9kYXkuc2V0KG5ld19kYXRlID8gbmV3X2RhdGUuZGF5IDogJycpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS5tb250aCA6ICcnKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXQobmV3X2RhdGUgPyBuZXdfZGF0ZS55ZWFyIDogJycpO1xuXHRcdFx0dGhpcy5jbGVhckVycm9yKCk7XG5cdFx0XHR0aGlzLiRlbGVtZW50LnZhbChuZXdfZGF0ZSk7XG5cdFx0XHRpZiAobmV3X2RhdGUpIHtcblx0XHRcdFx0JC5lYWNoKHRoaXMuZmllbGRzLCBmdW5jdGlvbiAoaSwgaW5wdXQpIHtcblx0XHRcdFx0XHRkb2JmaWVsZC52YWxpZGF0ZShpbnB1dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNldEVycm9yKGVycm9yX3RleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IGVycm9yX3RleHQ7XG5cdFx0XHR0aGlzLnNob3dFcnJvcigpO1xuXHRcdH1cblxuXHRcdHNldEZpZWxkV2lkdGhzKCkge1xuXHRcdFx0bGV0IGF2YWlsYWJsZSA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKSAtIDI7XG5cdFx0XHRsZXQgdG90YWwgPSBzZXR0aW5ncy5maWVsZF93aWR0aF95ZWFyICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfc2VwICsgc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggK1xuXHRcdFx0XHRzZXR0aW5ncy5maWVsZF93aWR0aF9zZXAgKyBzZXR0aW5ncy5maWVsZF93aWR0aF9kYXk7XG5cdFx0XHR0aGlzLmlucHV0X2RheS5zZXRXaWR0aChNYXRoLmZsb29yKHNldHRpbmdzLmZpZWxkX3dpZHRoX2RheSAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0XHR0aGlzLmlucHV0X21vbnRoLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfbW9udGggKiBhdmFpbGFibGUgLyB0b3RhbCkpO1xuXHRcdFx0dGhpcy5pbnB1dF95ZWFyLnNldFdpZHRoKE1hdGguZmxvb3Ioc2V0dGluZ3MuZmllbGRfd2lkdGhfeWVhciAqIGF2YWlsYWJsZSAvIHRvdGFsKSk7XG5cdFx0fVxuXG5cdFx0c2V0UmVhZG9ubHkobW9kZSkge1xuXHRcdFx0aWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRtb2RlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRfZGF5LnNldFJlYWRvbmx5KG1vZGUpO1xuXHRcdFx0dGhpcy5pbnB1dF9tb250aC5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdHRoaXMuaW5wdXRfeWVhci5zZXRSZWFkb25seShtb2RlKTtcblx0XHRcdGlmIChtb2RlKSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5hZGRDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5yZW1vdmVDbGFzcygncmVhZG9ubHknKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93RXJyb3IoKSB7XG5cdFx0XHRsZXQgZXJyb3JfdGV4dCA9IHRoaXMud2lkZ2V0RXJyb3JUZXh0KCk7XG5cdFx0XHRpZiAodGhpcy5vbl9lcnJvcikge1xuXHRcdFx0XHR0aGlzLm9uX2Vycm9yKGVycm9yX3RleHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzZXR0aW5ncy5zaG93X2Vycm9ycykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXJyb3JfdGV4dCA9PT0gJycpIHtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5oaWRlKCk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dCgnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgeF9vZmZzZXQgPSAodGhpcy5pbm5lci5vdXRlcldpZHRoKCkgKyBzZXR0aW5ncy5lcnJvcmJveF94KSArICdweCc7XG5cdFx0XHRcdGxldCB5X29mZnNldCA9IHNldHRpbmdzLmVycm9yYm94X3kgKyAncHgnO1xuXHRcdFx0XHR0aGlzLmVycm9yYm94LmNzcyh7ZGlzcGxheTogJ2Jsb2NrJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogeV9vZmZzZXQsIGxlZnQ6IHhfb2Zmc2V0fSk7XG5cdFx0XHRcdHRoaXMuZXJyb3Jib3gudGV4dChlcnJvcl90ZXh0KTtcblx0XHRcdFx0dGhpcy5lcnJvcmJveC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGUoY3VycmVudF9pbnB1dCkge1xuXHRcdFx0dGhpcy4kZWxlbWVudC52YWwoJycpO1xuXHRcdFx0aWYgKGN1cnJlbnRfaW5wdXQpIHtcblx0XHRcdFx0Y29uc3QgdHlwZSA9IGN1cnJlbnRfaW5wdXQubmFtZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2RheScpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVEYXkoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdtb250aCcpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlWWVhcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50X2lucHV0LmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGN1cnJlbnRfaW5wdXQuc2V0RXJyb3IoZSk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5kYXlfdmFsdWUgJiYgdGhpcy5tb250aF92YWx1ZSkge1xuXHRcdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aGlzLnZhbGlkYXRlRGF5c0luTW9udGgoKTtcblx0XHRcdFx0XHRpZiAodGhpcy55ZWFyX3ZhbHVlICYmIHRoaXMueWVhcl92YWx1ZS5sZW5ndGggPT09IDQpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsaWRhdGVDb21wbGV0ZURhdGUoKTtcblx0XHRcdFx0XHRcdGxldCBkYXRlX3N0ciA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KHRoaXMuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQudmFsKGRhdGVfc3RyKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJykpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGVja0RvY3VtZW50KGRhdGVfc3RyLCB0aGlzLiRlbGVtZW50LmRhdGEoJ2NoaWxkZG9iJyksIHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRFcnJvcihlKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJFcnJvcigpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUNvbXBsZXRlRGF0ZSgpIHtcblx0XHRcdGNvbnN0IGRhdGVfb2JqID0gdGhpcy5nZXREYXRlKCk7XG5cdFx0XHRjb25zdCBkYXRlX2lzbyA9IEtyRG9iRW50cnkuZ2V0WW1kT2JqZWN0KGRhdGVfb2JqKTtcblxuXHRcdFx0bGV0IG1heF9kYXRlID0gc2V0dGluZ3MubWF4X2RhdGU7XG5cdFx0XHRpZiAodHlwZW9mIG1heF9kYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdG1heF9kYXRlID0gbWF4X2RhdGUuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgbWF4X2RhdGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdG1heF9kYXRlID0gdGhpcy5wYXJzZURhdGUobWF4X2RhdGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1heF9kYXRlKSB7XG5cdFx0XHRcdGlmIChkYXRlX2lzbyA+IHNldHRpbmdzLm1heF9kYXRlKSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NQVhfREFURSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY3VzdG9tX3ZhbGlkYXRpb24pIHtcblx0XHRcdFx0ZGF0ZV9vYmouZGF0ZSA9IG5ldyBEYXRlKFxuXHRcdFx0XHRcdHBhcnNlSW50KGRhdGVfb2JqLnllYXIsIDEwKSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5tb250aCwgMTApIC0gMSxcblx0XHRcdFx0XHRwYXJzZUludChkYXRlX29iai5kYXksIDEwKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLmN1c3RvbV92YWxpZGF0aW9uKGRhdGVfb2JqKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZURheSgpIHtcblx0XHRcdGxldCBvcHQgPSBzZXR0aW5ncztcblx0XHRcdGxldCBpbnB1dCA9IHRoaXMuaW5wdXRfZGF5O1xuXHRcdFx0dGhpcy5kYXlfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX05BTik7XG5cdFx0XHR9XG5cdFx0XHRsZXQgbnVtID0gcGFyc2VJbnQodGV4dCwgMTApO1xuXHRcdFx0aWYgKG51bSA8IDEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19TTUFMTCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAobnVtID4gMzEpIHtcblx0XHRcdFx0dGhyb3cob3B0LkVfREFZX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRheV92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0dmFsaWRhdGVEYXlzSW5Nb250aCgpIHtcblx0XHRcdGNvbnN0IGRheSA9IHBhcnNlSW50KHRoaXMuZGF5X3ZhbHVlLCAxMCk7XG5cdFx0XHRjb25zdCBtb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfdmFsdWUsIDEwKTtcblx0XHRcdGNvbnN0IHllYXIgPSBwYXJzZUludCh0aGlzLnllYXJfdmFsdWUsIDEwKTtcblx0XHRcdGlmIChkYXkgPCAxIHx8IG1vbnRoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbWF4ID0gc2V0dGluZ3MuZGF5c19pbl9tb250aFttb250aCAtIDFdO1xuXHRcdFx0bGV0IG1zZyA9IHNldHRpbmdzLkVfQkFEX0RBWV9GT1JfTU9OVEg7XG5cdFx0XHRpZiAobW9udGggPT09IDIgJiYgKCcnICsgeWVhcikubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdG1heCA9IHllYXIgJSA0ID8gMjggOiB5ZWFyICUgMTAwID8gMjkgOiB5ZWFyICUgNDAwID8gMjggOiAyOTtcblx0XHRcdFx0bXNnID0gbXNnLnJlcGxhY2UoLyV5LywgeWVhci50b1N0cmluZygpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1zZyA9IG1zZy5yZXBsYWNlKC8gKiV5LywgJycpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRheSA+IG1heCkge1xuXHRcdFx0XHR0aHJvdyhtc2cucmVwbGFjZSgvJWQvLCBtYXgudG9TdHJpbmcoKSkucmVwbGFjZSgvJW0vLCBzZXR0aW5ncy5tb250aF9uYW1lW21vbnRoIC0gMV0pKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWxpZGF0ZU1vbnRoKCkge1xuXHRcdFx0bGV0IGlucHV0ID0gdGhpcy5pbnB1dF9tb250aDtcblx0XHRcdHRoaXMubW9udGhfdmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgdGV4dCA9IGlucHV0LmdldCgpO1xuXHRcdFx0aWYgKHRleHQgPT09ICcnIHx8ICh0ZXh0ID09PSAnMCcgJiYgaW5wdXQuaGFzX2ZvY3VzKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGV4dC5tYXRjaCgvXFxELykpIHtcblx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9NT05USF9OQU4pO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdGlmIChudW0gPCAxKSB7XG5cdFx0XHRcdHRocm93KHNldHRpbmdzLkVfTU9OVEhfVE9PX1NNQUxMKTtcblx0XHRcdH1cblx0XHRcdGlmIChudW0gPiAxMikge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX01PTlRIX1RPT19CSUcpO1xuXHRcdFx0fVxuXHRcdFx0dGV4dCA9IG51bSA8IDEwID8gJzAnICsgbnVtIDogJycgKyBudW07XG5cdFx0XHRpZiAoIWlucHV0Lmhhc19mb2N1cykge1xuXHRcdFx0XHRpbnB1dC5zZXQodGV4dCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1vbnRoX3ZhbHVlID0gdGV4dDtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZVllYXIoKSB7XG5cdFx0XHRjb25zdCBpbnB1dCA9IHRoaXMuaW5wdXRfeWVhcjtcblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCB0ZXh0ID0gaW5wdXQuZ2V0KCk7XG5cdFx0XHRpZiAodGV4dCA9PT0gJycgfHwgKHRleHQgPT09ICcwJyAmJiBpbnB1dC5oYXNfZm9jdXMpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9cXEQvKSkge1xuXHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTkFOKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbnB1dC5oYXNfZm9jdXMpIHtcblx0XHRcdFx0aWYgKHRleHQubGVuZ3RoID4gNCkge1xuXHRcdFx0XHRcdHRocm93KHNldHRpbmdzLkVfWUVBUl9MRU5HVEgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodGV4dC5sZW5ndGggIT09IDQpIHtcblx0XHRcdFx0XHR0aHJvdyhzZXR0aW5ncy5FX1lFQVJfTEVOR1RIKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09PSA0KSB7XG5cdFx0XHRcdGNvbnN0IG51bSA9IHBhcnNlSW50KHRleHQsIDEwKTtcblx0XHRcdFx0aWYgKHNldHRpbmdzLm1pbl95ZWFyICYmIG51bSA8IHNldHRpbmdzLm1pbl95ZWFyKSB7XG5cdFx0XHRcdFx0dGhyb3coc2V0dGluZ3MuRV9ZRUFSX1RPT19TTUFMTC5yZXBsYWNlKC8leS8sIHNldHRpbmdzLm1pbl95ZWFyKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMueWVhcl92YWx1ZSA9IHRleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0RXJyb3JUZXh0KCkge1xuXHRcdFx0bGV0IGVycm9yX3RleHQgPSAnJztcblx0XHRcdCQuZWFjaCh0aGlzLmZpZWxkcywgZnVuY3Rpb24gKGksIGlucHV0KSB7XG5cdFx0XHRcdGlmIChpbnB1dC5lcnJvcl90ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKGlucHV0Lmhhc19mb2N1cyB8fCBlcnJvcl90ZXh0ID09PSAnJykge1xuXHRcdFx0XHRcdFx0ZXJyb3JfdGV4dCA9IGlucHV0LmVycm9yX3RleHRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKGVycm9yX3RleHQgPT09ICcnICYmIHRoaXMuZXJyb3JfdGV4dCkge1xuXHRcdFx0XHRlcnJvcl90ZXh0ID0gdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVycm9yX3RleHQ7XG5cdFx0fVxuXG5cdFx0d2lkZ2V0Rm9jdXNMb3N0KCkge1xuXHRcdFx0aWYgKHNldHRpbmdzLm9uX2JsdXIgJiYgIXRoaXMud3JhcHBlci5pcygnLmZvY3VzJykpIHtcblx0XHRcdFx0c2V0dGluZ3Mub25CbHVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xhc3MgS3JEb2JJbnB1dCB7XG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdFx0Y29uc3QgaW5wdXQgPSB0aGlzO1xuXHRcdFx0dGhpcy5kb2JmaWVsZCA9IG9wdGlvbnMua3Jkb2JlbnRyeTtcblx0XHRcdHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblx0XHRcdHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuXHRcdFx0dGhpcy5oaW50X3RleHQgPSBvcHRpb25zLmhpbnRfdGV4dDtcblx0XHRcdHRoaXMuaGFzX2ZvY3VzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdHJ1ZTtcblx0XHRcdHRoaXMuJGlucHV0ID0gJCgnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiAvPicpLmFkZENsYXNzKCdqcS1kdGUtJyArIHRoaXMubmFtZSkuYXR0cignYXJpYS1sYWJlbCcsICcnICsgXCIgKFwiICsgdGhpcy5oaW50X3RleHQgKyBcIilcIikuZm9jdXMoJC5wcm94eShpbnB1dCwgJ2ZvY3VzJykpLmJsdXIoJC5wcm94eShpbnB1dCwgJ2JsdXInKSkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpbnB1dC5rZXlkb3duKGUpO1xuXHRcdFx0XHR9LCAyKVxuXHRcdFx0fSkua2V5dXAoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5wdXQua2V5dXAoZSk7XG5cdFx0XHRcdH0sIDIpXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRibHVyKCkge1xuXHRcdFx0dGhpcy5oYXNfZm9jdXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZG9iZmllbGQuZm9jdXNPdXQoKTtcblx0XHRcdHRoaXMuc2hvd19oaW50KCk7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLnZhbGlkYXRlKHRoaXMpO1xuXHRcdH1cblxuXHRcdGNsZWFyRXJyb3IoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lcnJvcl90ZXh0O1xuXHRcdFx0dGhpcy4kaW5wdXQucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG5cdFx0fVxuXG5cdFx0Zm9jdXMoKSB7XG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gZmFsc2U7XG5cdFx0XHRpZiAodGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmhhc19mb2N1cyA9IHRydWU7XG5cdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzSW4oKTtcblx0XHRcdGlmICh0aGlzLiRpbnB1dC5oYXNDbGFzcygnaGludCcpKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJykucmVtb3ZlQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0Z2V0KCkge1xuXHRcdFx0bGV0IHZhbCA9IHRoaXMuJGlucHV0LnZhbCgpO1xuXHRcdFx0cmV0dXJuIHZhbCA9PT0gdGhpcy5oaW50X3RleHQgPyAnJyA6IHZhbDtcblx0XHR9XG5cblx0XHRpc0RpZ2l0S2V5KGUpIHtcblx0XHRcdGxldCBrZXljb2RlID0gZS53aGljaDtcblx0XHRcdHJldHVybiBrZXljb2RlID49IDQ4ICYmIGtleWNvZGUgPD0gNTcgfHwga2V5Y29kZSA+PSA5NiAmJiBrZXljb2RlIDw9IDEwNTtcblx0XHR9XG5cblx0XHRrZXlkb3duKCkge1xuXHRcdFx0Ly8gSWdub3JlIGtleXVwIGV2ZW50cyB0aGF0IGFycml2ZSBhZnRlciBmb2N1cyBtb3ZlZCB0byBuZXh0IGZpZWxkXG5cdFx0XHR0aGlzLmtleV9pc19kb3duID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRrZXl1cChlKSB7XG5cdFx0XHRpZiAoIXRoaXMua2V5X2lzX2Rvd24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly8gSGFuZGxlIEJhY2tzcGFjZSAtIHNoaWZ0aW5nIGZvY3VzIHRvIHByZXZpb3VzIGZpZWxkIGlmIHJlcXVpcmVkXG5cdFx0XHRsZXQga2V5Y29kZSA9IGUud2hpY2g7XG5cdFx0XHRpZiAoa2V5Y29kZSA9PT0ga2V5LkJBQ0tTUEFDRSAmJiB0aGlzLmVtcHR5KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRCZWZvcmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgdGV4dCA9IHRoaXMuZ2V0KCk7XG5cdFx0XHR0aGlzLmVtcHR5ID0gdGV4dCA9PT0gJyc7XG5cblx0XHRcdC8vIFRyYXAgYW5kIGRpc2NhcmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgLSBhZHZhbmNpbmcgZm9jdXMgaWYgcmVxdWlyZWRcblx0XHRcdGlmICh0ZXh0Lm1hdGNoKC9bXFwvXFxcXC4gLV0vKSkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9bXFwvXFxcXC4gLV0vLCAnJyk7XG5cdFx0XHRcdHRoaXMuc2V0KHRleHQpO1xuXHRcdFx0XHRpZiAoIXRoaXMuZW1wdHkgJiYgdGhpcy5pbmRleCA8IDIpIHtcblx0XHRcdFx0XHR0aGlzLmRvYmZpZWxkLmZvY3VzRmllbGRBZnRlcih0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZHZhbmNlIGZvY3VzIGlmIHRoaXMgZmllbGQgaXMgYm90aCB2YWxpZCBhbmQgZnVsbFxuXHRcdFx0aWYgKHRoaXMuZG9iZmllbGQudmFsaWRhdGUodGhpcykpIHtcblx0XHRcdFx0bGV0IHdhbnQgPSB0aGlzLm5hbWUgPT09ICd5ZWFyJyA/IDQgOiAyO1xuXHRcdFx0XHRpZiAodGhpcy5pc0RpZ2l0S2V5KGUpICYmIHRleHQubGVuZ3RoID09PSB3YW50KSB7XG5cdFx0XHRcdFx0dGhpcy5kb2JmaWVsZC5mb2N1c0ZpZWxkQWZ0ZXIodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZWZ0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuJGlucHV0LnBvc2l0aW9uKCkubGVmdDtcblx0XHR9XG5cblx0XHRzZXQobmV3X3ZhbHVlKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC52YWwobmV3X3ZhbHVlKS5yZW1vdmVDbGFzcygnaGludCcpO1xuXHRcdFx0aWYgKCF0aGlzLmhhc19mb2N1cykge1xuXHRcdFx0XHR0aGlzLnNob3dfaGludCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbXB0eSA9IG5ld192YWx1ZSA9PT0gJyc7XG5cdFx0XHR0aGlzLmNsZWFyRXJyb3IoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHNldEVycm9yKHRleHQpIHtcblx0XHRcdHRoaXMuZXJyb3JfdGV4dCA9IHRleHQ7XG5cdFx0XHR0aGlzLiRpbnB1dC5hZGRDbGFzcygnZXJyb3InKTtcblx0XHRcdHRoaXMuZG9iZmllbGQuc2hvd0Vycm9yKCk7XG5cdFx0fVxuXG5cdFx0c2V0Rm9jdXMoc2VsZWN0X2FsbCkge1xuXHRcdFx0bGV0ICRpbnB1dCA9IHRoaXMuJGlucHV0O1xuXHRcdFx0JGlucHV0LmZvY3VzKCk7XG5cdFx0XHRpZiAoc2VsZWN0X2FsbCkge1xuXHRcdFx0XHQkaW5wdXQuc2VsZWN0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkaW5wdXQudmFsKCRpbnB1dC52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzZXRXaWR0aChuZXdfd2lkdGgpIHtcblx0XHRcdHRoaXMuJGlucHV0LndpZHRoKG5ld193aWR0aCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRzaG93X2hpbnQoKSB7XG5cdFx0XHRpZiAodGhpcy5nZXQoKSA9PT0gJycgJiYgdHlwZW9mICh0aGlzLmhpbnRfdGV4dCkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLmhpbnRfdGV4dCkuYWRkQ2xhc3MoJ2hpbnQnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHlpZWxkRm9jdXMoKSB7XG5cdFx0XHR0aGlzLiRpbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5kb2Jpc3N1ZScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0bXlLckRvYkVudHJ5ID0gbmV3IEtyRG9iRW50cnkoJCh0aGlzKSwge30pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLy8gbm9pbnNwZWN0aW9uIER1cGxpY2F0ZWRDb2RlXG5cbi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIEFkbWluIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCQpIHtcblxuXHQkKGZ1bmN0aW9uICgpIHtcblx0XHRjb25zdCB0b3RhbEd1ZXN0cyA9ICQoJyNqc2RhdGEnKS5kYXRhKCd0b3RhbGd1ZXN0cycpO1xuXHRcdCQoJyNqZm9ybV9hZHVsdHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2hhbmdlUGFydHlTaXplKDEsIHRvdGFsR3Vlc3RzKTtcblx0XHR9KTtcblx0XHQkKCcjamZvcm1fY2hpbGQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2hhbmdlUGFydHlTaXplKDIsIHRvdGFsR3Vlc3RzKTtcblx0XHR9KTtcblxuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKSkge1xuXHRcdFx0Y29uc3QgaG93dG9hcnJpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG93dG9hcnJpdmUnKTtcblx0XHRcdGxldCBhcnJpdmFsbWVhbnMgPSBob3d0b2Fycml2ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWVhbnMnKTtcblx0XHRcdGlmICghYXJyaXZhbG1lYW5zKSB7XG5cdFx0XHRcdGFycml2YWxtZWFucyA9ICdhaXInO1xuXHRcdFx0fVxuXG5cdFx0XHRkaXNwbGF5QXJyaXZhbChhcnJpdmFsbWVhbnMpO1xuXHRcdH1cblxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnLmFtaXRlbScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRkaXNwbGF5QXJyaXZhbCgkKHRoaXMpLmF0dHIoJ2lkJykpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VQYXJ0eVNpemUodHlwZSwgZ3Vlc3RzKSB7XG5cdFx0bGV0IG51bUFkdWx0cyA9ICQoJyNqZm9ybV9hZHVsdHMnKS52YWwoKVxuXHRcdGxldCAkaW5wdXRDaGlsZCA9ICQoJyNqZm9ybV9jaGlsZCcpO1xuXHRcdGxldCBudW1DaGlsZHJlbiA9ICRpbnB1dENoaWxkLnZhbCgpO1xuXHRcdGxldCBtYXhDaGlsZHJlbiA9IGd1ZXN0cyAtIG51bUFkdWx0cztcblx0XHRsZXQgJGhvbGRlciA9ICQoJyNob2xkZXInKTtcblx0XHRsZXQgaTtcblxuXHRcdGlmICh0eXBlID09PSAxKSB7XG5cdFx0XHQkaW5wdXRDaGlsZC5hdHRyKCdtYXgnLCBtYXhDaGlsZHJlbik7XG5cdFx0XHRpZiAobnVtQ2hpbGRyZW4gPiBtYXhDaGlsZHJlbikge1xuXHRcdFx0XHQkaW5wdXRDaGlsZC52YWwobWF4Q2hpbGRyZW4pO1xuXHRcdFx0XHRpZiAoIW1heENoaWxkcmVuKVxuXHRcdFx0XHRcdCRob2xkZXIuaGlkZSgpO1xuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbnVtQ2hpbGRyZW4gLSBtYXhDaGlsZHJlbjsgaSsrKSB7XG5cdFx0XHRcdFx0XHQkaG9sZGVyLmNoaWxkcmVuKCkubGFzdCgpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gMikge1xuXHRcdFx0bGV0IGRpZmZlcmVuY2U7XG5cdFx0XHRsZXQgZXhpc3RpbmcgPSAkaG9sZGVyLmNoaWxkcmVuKCdpbnB1dCcpLmxlbmd0aDtcblx0XHRcdGlmIChudW1DaGlsZHJlbiA+IGV4aXN0aW5nKSB7XG5cdFx0XHRcdGRpZmZlcmVuY2UgPSBudW1DaGlsZHJlbiAtIGV4aXN0aW5nO1xuXHRcdFx0XHRmb3IgKGkgPSAxOyBpIDw9IGRpZmZlcmVuY2U7IGkrKykge1xuXHRcdFx0XHRcdCRob2xkZXIuYXBwZW5kKGNyZWF0ZU5ld0FnZUZpZWxkKGV4aXN0aW5nICsgaSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkaWZmZXJlbmNlID0gZXhpc3RpbmcgLSBudW1DaGlsZHJlbjtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGRpZmZlcmVuY2U7IGkrKykge1xuXHRcdFx0XHRcdCRob2xkZXIuY2hpbGRyZW4oJ2lucHV0JykubGFzdCgpLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGxldCBub3cgPSAkaG9sZGVyLmNoaWxkcmVuKCdpbnB1dCcpLmxlbmd0aDtcblx0XHRcdGlmIChub3cpIHtcblx0XHRcdFx0JGhvbGRlci5zaG93KCk7XG5cdFx0XHR9IGVsc2UgaWYgKCFub3cpIHtcblx0XHRcdFx0JGhvbGRlci5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlTmV3QWdlRmllbGQoY291bnQpIHtcblx0XHRjb25zdCAkanNkYXRhID0gJCgnI2pzZGF0YScpO1xuXHRcdGNvbnN0IGNoaWxkTWluQWdlID0gJGpzZGF0YS5kYXRhKCdjaGlsZG1pbmFnZScpO1xuXHRcdGNvbnN0IGNoaWxkTWF4QWdlID0gJGpzZGF0YS5kYXRhKCdjaGlsZG1heGFnZScpO1xuXHRcdGxldCBuZXdhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwibnVtYmVyXCIpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgY2hpbGRNaW5BZ2UpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgY2hpbGRNYXhBZ2UpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCAnMicpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsICcxJyk7XG5cdFx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnbmFtZScsICdqZm9ybVtjaGlsZF9hZ2VzXVtdJyk7XG5cdFx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnaWQnLCAnamZvcm1fY2hpbGRfYWdlc18nICsgY291bnQpO1xuXHRcdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zsb2F0LWxlZnQgY2hpbGQtYWdlcyBpbnB1dC10aW55IGZvcm0tY29udHJvbCB2YWxpZCBmb3JtLWNvbnRyb2wtc3VjY2VzcycpO1xuXG5cdFx0cmV0dXJuIG5ld2FnZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpc3BsYXlBcnJpdmFsKHZhbHVlKSB7XG5cdFx0bGV0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbWl0ZW0nKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcblx0XHRcdHhbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fpci1kYXRhJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW4tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG8tZGF0YScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyLWRhdGEnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGxldCBhcnJpdmFsZGF0YSA9IHZhbHVlICsgJy1kYXRhJztcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhcnJpdmFsZGF0YSkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZm9ybV9hcnJpdmFsX21lYW5zJykudmFsdWUgPSB2YWx1ZTtcblx0fVxufSkoalF1ZXJ5KTsiLCIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoIXdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcblx0d2luZG93LmxvY2F0aW9uLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xufVxuY29uc3QgbGl2ZXNpdGUgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy8nO1xuY29uc3QgbGFuZyA9IFwiZW5cIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGNvbnN0IG1hcmtlcnNoYXBlID0ge1xuXHRcdHR5cGU6ICAgJ3BvbHknLFxuXHRcdGNvb3JkczogWzEsIDEsIDEsIDMyLCAzNywgMzIsIDMyLCAxXVxuXHR9O1xuXG5cdGxldCBteUtybWFwO1xuXHRsZXQgbWFwRGF0YSA9IGZhbHNlO1xuXHRsZXQgbWFwO1xuXHRsZXQgbWFwWm9vbTtcblx0bGV0IGluZm9XaW5kb3c7XG5cdGxldCBpbmZvV2luZG93Mjtcblx0bGV0IGJvdW5kcztcblx0bGV0IHByb3BlcnR5ZGl2O1xuXHRsZXQgcHJvcGVydHlpY29uO1xuXHRsZXQgbWM7XG4vL1x0bGV0IGJpY29uO1xuLy9cdGxldCBoaWNvbjtcbi8vXHRsZXQgbGFyZ2Vfc2xpZGVzaG93ID0gZmFsc2U7XG5cblx0bGV0IHNldHRpbmdzID0ge1xuXHRcdHByb3BlcnR5TWFya2VyczogW10sXG5cdFx0ZmlsdGVySWRzOiAgICAgICBbXSxcblx0XHRtYXBNYXJrZXJzOiAgICAgIFtdLFxuXHRcdG1hcFR5cGVJZDogICAgICAgJycsXG5cdFx0bWFwWm9vbTogICAgICAgICAwLFxuXHRcdG1hcE1heFpvb206ICAgICAgMjAsXG5cdFx0bWFwVHlwZTogICAgICAgICAnJyxcblx0XHRtYXBJZDogICAgICAgICAgICcnLFxuXHRcdG1hcmtlckNvbG9yOiAgICAgJ3JlZCcsXG5cdH07XG5cblx0Y2xhc3MgS3JtYXAge1xuXHRcdGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cblx0XHRcdC8vSW5pdGlhbGlzZSBtYXAgb3B0aW9uc1xuXHRcdFx0dGhpcy5nbU9wdGlvbnMgPSB7XG5cdFx0XHRcdHNjcm9sbHdoZWVsOiAgICAgICBmYWxzZSxcblx0XHRcdFx0em9vbTogICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwWm9vbSxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwTWF4Wm9vbSxcblx0XHRcdFx0bWFwVHlwZUlkOiAgICAgICAgIHRoaXMuc2V0dGluZ3MubWFwVHlwZUlkLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcblx0XHRcdH07XG5cblx0XHRcdG1hcFpvb20gPSB0aGlzLnNldHRpbmdzLm1hcFpvb207XG5cdFx0XHR0aGlzLmdtYXJrZXJzID0gW107XG5cdFx0XHR0aGlzLmNvdW50ID0gMDtcblxuXHRcdFx0dGhpcy5pbml0TWFwKCk7XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsb3NlS3JJbmZvd2luZG93KCkge1xuXHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG4vL1x0XHRcdFwiI2tyLWluZm93aW5kb3dcIi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHR9XG5cblx0XHQvLyBvbmx5IHNob3cgdmlzaWJsZSBtYXJrZXJzXG5cdFx0c3RhdGljIHNob3dWaXNpYmxlTWFya2VycyhtYXJrZXJzKSB7XG5cdFx0XHRsZXQgYm91bmRzID0gbWFwLmdldEJvdW5kcygpO1xuXHRcdFx0bGV0IGNvdW50ID0gMDtcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCBtYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGxldCBtYXJrZXIgPSBtYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmIChtYXJrZXIudHlwZSA9PT0gJ21hcCcpIHtcblx0XHRcdFx0XHRpZiAoYm91bmRzLmNvbnRhaW5zKG1hcmtlci5nZXRQb3NpdGlvbigpKSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjb3VudDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBNYXJrZXJzIGFycmF5IGZvciBkdXBsaWNhdGUgcG9zaXRpb24gYW5kIG9mZnNldCBhIGxpdHRsZVxuXHRcdGNoZWNrRHVwbGljYXRlKGN1cnJlbnQpIHtcblx0XHRcdGlmICh0aGlzLmdtYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0bGV0IGR1cHMgPSAwO1xuXG5cdFx0XHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdtYXJrZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0XHRcdGxldCBwb3MgPSB0aGlzLmdtYXJrZXJzW2luZGV4XS5nZXRQb3NpdGlvbigpO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50LmVxdWFscyhwb3MpKSB7XG5cdFx0XHRcdFx0XHRkdXBzKys7XG5cdFx0XHRcdFx0XHRsZXQgYSA9IDM2MC4wIC8gZHVwcztcblx0XHRcdFx0XHRcdGxldCBuZXdMYXQgPSBwb3MubGF0KCkgKyAtLjAwMDAyICogTWF0aC5jb3MoKCthICogZHVwcykgLyAxODAgKiBNYXRoLlBJKTsgIC8veFxuXHRcdFx0XHRcdFx0bGV0IG5ld0xuZyA9IHBvcy5sbmcoKSArIC0uMDAwMDAgKiBNYXRoLnNpbigoK2EgKiBkdXBzKSAvIDE4MCAqIE1hdGguUEkpOyAgLy9ZXG5cdFx0XHRcdFx0XHRjdXJyZW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhuZXdMYXQsIG5ld0xuZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjdXJyZW50O1xuXHRcdH1cblxuXHRcdGNoZWNrWm9vbSgpIHtcblx0XHRcdGlmIChtYXBab29tID4gMCkge1xuXHRcdFx0XHRsZXQgbXlsaXN0ZW5lciA9IG1hcC5hZGRMaXN0ZW5lcignaWRsZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRjb25zdCBjdXJyZW50Wm9vbSA9IG1hcC5nZXRab29tKCk7XG5cdFx0XHRcdFx0aWYgKG1hcFpvb20gPiAwICYmIGN1cnJlbnRab29tICE9PSBtYXBab29tKSB7XG5cdFx0XHRcdFx0XHRtYXAuc2V0Wm9vbShtYXBab29tKTtcblx0XHRcdFx0XHRcdG15bGlzdGVuZXIucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjbHVzdGVyTWFwKCkge1xuXHRcdFx0Y29uc3QgbWNPcHRpb25zID0ge1xuXHRcdFx0XHRncmlkU2l6ZTogICAgICAgICAgICAyMCxcblx0XHRcdFx0bWF4Wm9vbTogICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5tYXBNYXhab29tIC0gMSxcblx0XHRcdFx0aW1hZ2VQYXRoOiAgICAgICAgICAgJy9tZWRpYS9jb21fa25vd3Jlcy9pbWFnZXMvbWFya2VyY2x1c3RlcmVyL20nLFxuXHRcdFx0XHRpZ25vcmVIaWRkZW5NYXJrZXJzOiB0cnVlXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnNldFByb3BlcnR5TWFya2VycygpO1xuXHRcdFx0dGhpcy5zZXRNYXBNYXJrZXJzKCk7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRsZXQgbWFya2VyID0gdGhpcy5nbWFya2Vyc1tkXTtcblx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRtYyA9IG5ldyBNYXJrZXJDbHVzdGVyZXIobWFwLCB0aGlzLmdtYXJrZXJzLCBtY09wdGlvbnMpO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWMsIFwiY2x1c3RlcmNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnI2tyLWluZm93aW5kb3cnKS5oaWRlKCk7XG5cdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cblx0XHRcdHRoaXMuY2hlY2tab29tKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHRoZSBNYXBcblx0XHRjcmVhdGVNYXAoKSB7XG5cdFx0XHRtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc2V0dGluZ3MubWFwSWQpLCB0aGlzLmdtT3B0aW9ucyk7XG5cdFx0XHRpbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcblx0XHRcdGluZm9XaW5kb3cyID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coKTtcblx0XHRcdGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgdGhlIG1hcmtlciBhbmQgc2V0IHVwIHRoZSBldmVudCB3aW5kb3dcblx0XHRjcmVhdGVNYXBNYXJrZXIocG9pbnQsIGh0bWwsIGltYWdlLCBib3hpbmZvLCBsaW5rLCB0aXRsZSkge1xuXHRcdFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRzaGFwZTogICAgbWFya2Vyc2hhcGUsXG5cdFx0XHRcdGxpbms6ICAgICBsaW5rLFxuXHRcdFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb2ludCxcblx0XHRcdFx0dGl0bGU6ICAgIHRpdGxlLFxuXHRcdFx0XHRtYXA6ICAgICAgbWFwLFxuXHRcdFx0XHR6SW5kZXg6ICAgOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnbW91c2VvdmVyJywgKGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIuc2V0Q29udGVudChodG1sKTtcblx0XHRcdFx0XHRpbmZvV2luZG93Mi5vcGVuKG1hcCwgbWFya2VyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkoaHRtbCkpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdtb3VzZW91dCcsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdzIuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkoKSk7XG5cblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2Nsb3NlY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5nbWFya2Vycy5wdXNoKG1hcmtlcik7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHRjcmVhdGVQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgYm94aW5mbywgbGluaywgdGl0bGUsIGNvbG9yLCBpZCwgaW1hZ2UsIHBpZCkge1xuXHRcdFx0bGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuXHRcdFx0XHRwb3NpdGlvbjogcG9pbnQsXG5cdFx0XHRcdGxpbms6ICAgICBsaW5rLFxuXHRcdFx0XHRtYXA6ICAgICAgbWFwLFxuXHRcdFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0XHRcdHRpdGxlOiAgICB0aXRsZSxcblx0XHRcdFx0cGlkOiAgICAgIHBpZCxcblx0XHRcdFx0dHlwZTogICAgICdwcm9wZXJ0eScsXG5cdFx0XHRcdHpJbmRleDogICB0aGlzLmNvdW50ICsgMTAwMFxuXHRcdFx0fSk7XG5cblx0XHRcdHByb3BlcnR5ZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdFx0Ly8gaWYgKHByb3BlcnR5ZGl2ICE9PSBudWxsKSB7XG5cdFx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHByb3BlcnR5ZGl2LCAnbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdFx0aGljb25cblx0XHRcdC8vIFx0XHQpXG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgKyAxMDAwKTtcblx0XHRcdC8vIFx0fSk7XG5cdFx0XHQvLyBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHByb3BlcnR5ZGl2LCAnbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdFx0bWFya2VyLnNldEljb24oXG5cdFx0XHQvLyBcdFx0XHRiaWNvblxuXHRcdFx0Ly8gXHRcdClcblx0XHRcdC8vIFx0XHRtYXJrZXIuc2V0WkluZGV4KG1hcmtlci5nZXRaSW5kZXgoKSAtIDEwMDApO1xuXHRcdFx0Ly8gXHR9KTtcblx0XHRcdC8vIH1cblxuXHRcdFx0Ly8gbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gXHRtYXJrZXIuc2V0SWNvbihcblx0XHRcdC8vIFx0XHRoaWNvblxuXHRcdFx0Ly8gXHQpXG5cdFx0XHQvLyBcdG1hcmtlci5zZXRaSW5kZXgobWFya2VyLmdldFpJbmRleCgpICsgMTAwMCk7XG5cdFx0XHQvLyB9KSk7XG5cdFx0XHQvL1xuXHRcdFx0Ly8gbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW91dCcsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBcdG1hcmtlci5zZXRJY29uKFxuXHRcdFx0Ly8gXHRcdGJpY29uXG5cdFx0XHQvLyBcdClcblx0XHRcdC8vIFx0bWFya2VyLnNldFpJbmRleChtYXJrZXIuZ2V0WkluZGV4KCkgLSAxMDAwKTtcblx0XHRcdC8vIH0pKTtcblxuXHRcdFx0Ly8gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpOyAvLyBtYXBzIEFQSSBoaWRlIGNhbGxcblx0XHRcdC8vIH0pO1xuXG5cdFx0XHRtYXJrZXIuYWRkTGlzdGVuZXIoJ21vdXNlZG93bicsIChmdW5jdGlvbiAoYm94aW5mbykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0XHRpbmZvV2luZG93LnNldENvbnRlbnQoaHRtbCk7XG5cdFx0XHRcdFx0aW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcblxuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHR0eXBlOiAgICBcIlBPU1RcIixcblx0XHRcdFx0XHRcdHVybDogICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0eS5tYXBpbmZvd2luZG93Jmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdFx0XHRkYXRhOiAgICB7XG5cdFx0XHRcdFx0XHRcdGlkOiBwYXJzZUludChib3hpbmZvKVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdCQoJyNrci1pbmZvd2luZG93JykuZmFkZUluKDQwMCkuaHRtbChkYXRhKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdCQoXCIua3ItaW5mb3dpbmRvdy1zbGlkZXNob3dcIikubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XG5cdFx0XHRcdFx0XHRcdFx0bmV4dEFycm93OiAnPGkgY2xhc3M9XCJzbGljay1uYXYgbmV4dCBmYXMgZmEtY2hldnJvbi1yaWdodCBcIj48L2k+Jyxcblx0XHRcdFx0XHRcdFx0XHRwcmV2QXJyb3c6ICc8aSBjbGFzcz1cInNsaWNrLW5hdiBwcmV2IGZhcyBmYS1jaGV2cm9uLWxlZnQgXCI+PC9pPicsXG5cdFx0XHRcdFx0XHRcdFx0YXV0b3BsYXk6ICB0cnVlXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoYm94aW5mbykpO1xuXG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbG9zZWNsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdFx0aW5mb1dpbmRvdy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuZ21hcmtlcnMucHVzaChtYXJrZXIpO1xuXHRcdFx0Ym91bmRzLmV4dGVuZChwb2ludCk7XG5cblx0XHRcdHRoaXMuY291bnQrKztcblx0XHR9XG5cblx0XHQvL0luaXRpYWxpc2UgbWFwXG5cdFx0aW5pdE1hcCgpIHtcblx0XHRcdHRoaXMuY3JlYXRlTWFwKCk7XG4vL1x0XHRcdHRoaXMuc2V0TWFya2VySWNvbnMoKTtcblxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ2NsdXN0ZXInKSB7XG5cdFx0XHRcdHRoaXMuY2x1c3Rlck1hcCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zb2xvTWFwKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZWZyZXNoTWFwKCRtYXBtb2RhbCkge1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWFwVHlwZSA9PT0gJ3NvbG8nKVxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdGxldCBzZWxmID0gdGhpcztcblx0XHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdFx0dXJsOiAgICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLnJlZnJlc2htYXAmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnNldHRpbmdzLmZpbHRlcklkcyA9IHJlc3VsdC5kYXRhLmZpbHRlcklkcztcblx0XHRcdFx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgc2VsZi5nbWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRcdFx0XHRsZXQgbWFya2VyID0gc2VsZi5nbWFya2Vyc1tkXTtcblx0XHRcdFx0XHRcdFx0aWYgKG1hcmtlci50eXBlID09PSAncHJvcGVydHknKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNlbGYuc2V0dGluZ3MuZmlsdGVySWRzLmluY2x1ZGVzKG1hcmtlci5waWQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuc2V0VmlzaWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnNldFZpc2libGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRtYy5yZXBhaW50KCk7XG5cdFx0XHRcdFx0XHRuZXcgRm91bmRhdGlvbi5SZXZlYWwoJG1hcG1vZGFsKTtcblx0XHRcdFx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdvcGVuJyk7XG5cdFx0XHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG1hcCwgJ3Jlc2l6ZScpO1xuXHRcdFx0XHRcdFx0JG1hcG1vZGFsLmZvdW5kYXRpb24oJ29wZW4nKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgbWFwIHRvIGluaXRpYWwgc3RhdGVcblx0XHRyZXNldE1hcCgpIHtcblx0XHRcdGluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHRcdGluZm9XaW5kb3cyLmNsb3NlKCk7XG5cdFx0XHQkKCcja3ItaW5mb3dpbmRvdycpLmhpZGUoKTtcblx0XHRcdG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuXHRcdFx0dGhpcy5jaGVja1pvb20oKTtcblx0XHR9XG5cblx0XHQvLyBsb29wIHRvIHNldCBtYXAgbWFya2Vyc1xuXHRcdHNldE1hcE1hcmtlcnMoKSB7XG5cdFx0XHRsZXQgcG9pbnQ7XG5cdFx0XHRsZXQgYW1hcms7XG5cblx0XHRcdGZvciAobGV0IGQgPSAwOyBkIDwgdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aDsgZCsrKSB7XG5cdFx0XHRcdGFtYXJrID0gdGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGxldCBtYXJrZXJpY29uID0ge1xuXHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRzaXplOiAgIG5ldyBnb29nbGUubWFwcy5TaXplKDMyLCAzNyksXG5cdFx0XHRcdFx0Ly8gT1Igc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDQ3KVxuXHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDE4KVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlTWFwTWFya2VyKHBvaW50LCBhbWFya1snaHRtbCddLCBtYXJrZXJpY29uLCAnJywgJycsIGFtYXJrWyd0aXRsZSddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBzZXRNYXJrZXJJY29ucygpIHtcblx0XHQvLyBcdGJpY29uID0ge1xuXHRcdC8vIFx0XHRwYXRoOiAgICAgICAgICcvbWVkaWEvY29tX2tub3dyZXMvYXNzZXRzL2ltYWdlcy9zdmcnLFxuXHRcdC8vIFx0XHRmaWxsQ29sb3I6ICAgIHRoaXMuc2V0dGluZ3MubWFya2VyQ29sb3IsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMC45LFxuXHRcdC8vIFx0XHRhbmNob3I6ICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2ludCg5LCAzNSksXG5cdFx0Ly8gXHRcdHN0cm9rZUNvbG9yOiAgXCIjZWZlZmVmXCIsXG5cdFx0Ly8gXHRcdHN0cm9rZVdlaWdodDogMC41LFxuXHRcdC8vIFx0XHRzY2FsZTogICAgICAgIDFcblx0XHQvLyBcdH07XG5cdFx0Ly8gXHRoaWNvbiA9IHtcblx0XHQvLyBcdFx0cGF0aDogICAgICAgICAnL21lZGlhL2NvbV9rbm93cmVzL2Fzc2V0cy9pbWFnZXMvc3ZnJyxcblx0XHQvLyBcdFx0ZmlsbENvbG9yOiAgICBcImdyZWVuXCIsXG5cdFx0Ly8gXHRcdGZpbGxPcGFjaXR5OiAgMSxcblx0XHQvLyBcdFx0YW5jaG9yOiAgICAgICBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoOSwgMzUpLFxuXHRcdC8vIFx0XHRzdHJva2VDb2xvcjogIFwiI2VmZWZlZlwiLFxuXHRcdC8vIFx0XHRzdHJva2VXZWlnaHQ6IDAuOCxcblx0XHQvLyBcdFx0c2NhbGU6ICAgICAgICAxLjVcblx0XHQvLyBcdH07XG5cdFx0Ly8gfVxuXG5cdFx0Ly8gbG9vcCB0byBzZXQgcHJvcGVydHkgbWFya2Vyc1xuXHRcdHNldFByb3BlcnR5TWFya2VycygpIHtcblx0XHRcdGxldCBwb2ludDtcblx0XHRcdGxldCBhbWFyaztcblxuXHRcdFx0Zm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLnNldHRpbmdzLnByb3BlcnR5TWFya2Vycy5sZW5ndGg7IGQrKykge1xuXHRcdFx0XHRhbWFyayA9IHRoaXMuc2V0dGluZ3MucHJvcGVydHlNYXJrZXJzW2RdO1xuXG5cdFx0XHRcdGlmICghZCkge1xuXHRcdFx0XHRcdHByb3BlcnR5aWNvbiA9IHtcblx0XHRcdFx0XHRcdHVybDogICAgYW1hcmtbJ2ljb24nXSxcblx0XHRcdFx0XHRcdHNpemU6ICAgbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDM3KSxcblx0XHRcdFx0XHRcdG9yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxuXHRcdFx0XHRcdFx0YW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMjApXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhhbWFya1snbGF0J10sIGFtYXJrWydsbmcnXSk7XG5cdFx0XHRcdHBvaW50ID0gdGhpcy5jaGVja0R1cGxpY2F0ZShwb2ludCk7XG5cdFx0XHRcdHRoaXMuY3JlYXRlUHJvcGVydHlNYXJrZXIocG9pbnQsIGFtYXJrWydodG1sJ10sIGFtYXJrWydib3hpbmZvJ10sIGFtYXJrWydsaW5rJ10sIGFtYXJrWyd0aXRsZSddLCBhbWFya1snY29sb3InXSwgYW1hcmtbJ2lkJ10sIHByb3BlcnR5aWNvbiwgYW1hcmtbJ3BpZCddKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzb2xvTWFwKCkge1xuXHRcdFx0dGhpcy5zZXRQcm9wZXJ0eU1hcmtlcnMoKTtcblx0XHRcdHRoaXMuc2V0TWFwTWFya2VycygpO1xuXG5cdFx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG5cdFx0XHR0aGlzLmNoZWNrWm9vbSgpO1xuXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tYXBNYXJrZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHRcdFx0bGV0IG15TGlzdGVuZXIgPSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGxldCBmb3VuZCA9IDA7XG5cdFx0XHRcdFx0bGV0IGN1cnJlbnRab29tID0gbWFwLmdldFpvb20oKTtcblxuXHRcdFx0XHRcdHdoaWxlICghZm91bmQpIHtcblx0XHRcdFx0XHRcdGZvdW5kID0gS3JtYXAuc2hvd1Zpc2libGVNYXJrZXJzKHNlbGYuZ21hcmtlcnMpO1xuXG5cdFx0XHRcdFx0XHRpZiAoZm91bmQpIHtcblx0XHRcdFx0XHRcdFx0bXlMaXN0ZW5lci5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0bWFwLnNldFpvb20oY3VycmVudFpvb20pO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y3VycmVudFpvb20gPSBjdXJyZW50Wm9vbSAtIDE7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudFpvb20gPCAxMCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdCQoZnVuY3Rpb24gKCkge1xuXHRcdGxldCAkbWFwbW9kYWw7XG5cblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tYXAtdHJpZ2dlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAobWFwRGF0YSkge1xuXHRcdFx0XHRteUtybWFwLnJlZnJlc2hNYXAoJG1hcG1vZGFsKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtpY2tNYXAoJCh0aGlzKSk7XG5cdFx0XHRcdCRtYXBtb2RhbCA9ICQoJyNrci1zZWFyY2gtbWFwLW1vZGFsJyk7XG5cdFx0XHRcdG5ldyBGb3VuZGF0aW9uLlJldmVhbCgkbWFwbW9kYWwpO1xuXHRcdFx0XHQkbWFwbW9kYWwuZm91bmRhdGlvbignb3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pLm9uKCdjbGljaycsICcucmVzZXRtYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcm1hcC5yZXNldE1hcCgpO1xuXHRcdH0pLm9uKCdjbGljaycsICcja3Itc2VhcmNoLW1hcC1mdWxsLWluZm93aW5kb3ctY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0S3JtYXAuY2xvc2VLckluZm93aW5kb3coKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNsb3NlbWFwJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCRtYXBtb2RhbC5mb3VuZGF0aW9uKCdjbG9zZScpO1xuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0dHlwZTogICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgIGxpdmVzaXRlICsgJ2luZGV4LnBocD9vcHRpb249Y29tX2tub3dyZXMmdGFzaz1wcm9wZXJ0aWVzLm1hcHNlc3Npb24mbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KS5vbignb3Blbi56Zi5yZXZlYWwnLCAnI2tyLXNlYXJjaC1tYXAtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnI2tyLXNlYXJjaC1tYXAtZnVsbCcpLmhlaWdodCgkKCcja3Itc2VhcmNoLW1hcC1tb2RhbCcpLmhlaWdodCgpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFwLCBcInJlc2l6ZVwiKTtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHR5cGU6ICAgIFwiUE9TVFwiLFxuXHRcdFx0XHR1cmw6ICAgICBsaXZlc2l0ZSArICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydGllcy5tYXBzZXNzaW9uJmxhbmc9JyArIGxhbmcsXG5cdFx0XHRcdGRhdGE6ICAgIHttYXBfbW9kYWw6ICcxJ30sXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBEb2Vzbid0IHRyaWdnZXIgaWYgaW5jbHVkZWQgYWJvdmUgPz9cblx0XHRpZiAoIW1hcERhdGEpIHtcblx0XHRcdGNvbnN0ICRzb2xvVHJpZ2dlciA9ICQoJyNrci1tYXAtc29sby10cmlnZ2VyJyk7XG5cdFx0XHQkc29sb1RyaWdnZXIub25lKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjbWFwJykgIT09IC0xICYmICRzb2xvVHJpZ2dlci5sZW5ndGgpIHtcblx0XHRcdFx0a2lja01hcCgkc29sb1RyaWdnZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRlc3QgZm9yIGZvcmNlIG1hcFxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJCgnLm1hcC10cmlnZ2VyJyk7XG5cdFx0aWYgKCR0cmlnZ2VyLmRhdGEoJ2ZvcmNlbWFwJykpIHtcblx0XHRcdCR0cmlnZ2VyLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24ga2lja01hcCgkZWxlbSkge1xuXHRcdFx0Y29uc3QgdHlwZSA9ICRlbGVtLmRhdGEoJ3R5cGUnKTtcblx0XHRcdGxldCBwaWQgPSAwO1xuXHRcdFx0aWYgKHR5cGUgPT09ICdzb2xvJykge1xuXHRcdFx0XHRwaWQgPSAkZWxlbS5kYXRhKCdwaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR1cmw6ICAgICAgbGl2ZXNpdGUgKyAnaW5kZXgucGhwP29wdGlvbj1jb21fa25vd3JlcyZ0YXNrPXByb3BlcnRpZXMubWFwZGF0YSZwaWQ9JyArIHBpZCArICcmbGFuZz0nICsgbGFuZyxcblx0XHRcdFx0dHlwZTogICAgIFwiUE9TVFwiLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdHN1Y2Nlc3M6ICBmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRcdFx0bWFwSWQ6ICAgICAgICAgICAkZWxlbS5kYXRhKCd0YXJnZXQnKSxcblx0XHRcdFx0XHRcdFx0bWFwVHlwZTogICAgICAgICAkZWxlbS5kYXRhKCd0eXBlJyksXG5cdFx0XHRcdFx0XHRcdG1hcFR5cGVJZDogICAgICAgJGVsZW0uZGF0YSgnbWFwdHlwZWlkJyksXG5cdFx0XHRcdFx0XHRcdG1hcFpvb206ICAgICAgICAgcGFyc2VJbnQoJGVsZW0uZGF0YSgnem9vbScpKSxcblx0XHRcdFx0XHRcdFx0bWFwTWF4Wm9vbTogICAgICBwYXJzZUludCgkZWxlbS5kYXRhKCd6b29tbWF4JykpLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eU1hcmtlcnM6IHJlc3VsdC5kYXRhLnByb3BlcnR5TWFya2Vycyxcblx0XHRcdFx0XHRcdFx0bWFwTWFya2VyczogICAgICByZXN1bHQuZGF0YS5tYXBNYXJrZXJzLFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJJZHM6ICAgICAgIHJlc3VsdC5kYXRhLmZpbHRlcklkc1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0bXlLcm1hcCA9IG5ldyBLcm1hcChzZXR0aW5ncyk7XG5cdFx0XHRcdFx0XHRtYXBEYXRhID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cdGxldCBteUtycm91dGU7XG5cdGxldCBkaXJlY3Rpb25zRGlzcGxheTtcblx0bGV0IGRpcmVjdGlvbnNWaXNpYmxlID0gZmFsc2U7XG5cdGxldCByb3V0ZU1hcDtcblx0bGV0IG9yaWdpbjtcblx0bGV0IGRlc3RpbmF0aW9uO1xuXHRsZXQgcm91dGVNYXJrZXJzID0gW107XG5cdGxldCByb3V0ZVN0b3BQb2ludHMgPSBbXTtcblx0bGV0IHBvaW50O1xuXHRsZXQgc2VsZjtcblxuXHRsZXQgc2V0dGluZ3MgPSB7XG5cdFx0bGF0OiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bG5nOiAgICAgICAgICAgICAgIFwiXCIsXG5cdFx0bmFtZTogICAgICAgICAgICAgIFwiXCIsXG5cdFx0aWNvbjogICAgICAgICAgICAgIFwiXCIsXG5cdFx0ZGV0b3VyOiAgICAgICAgICAgIFwiXCIsXG5cdFx0bWFwWm9vbTogICAgICAgICAgIDksXG5cdFx0bWFwTWF4Wm9vbTogICAgICAgIDIwLFxuXHRcdG1hcFR5cGVJZDogICAgICAgICBcInJvYWRtYXBcIixcblx0XHRtYXBJZDogICAgICAgICAgICAgXCJrci1tYXAtcm91dGVcIixcblx0XHRkaXJlY3Rpb25zUGFuZWw6ICAgXCJrci1kaXJlY3Rpb25zLXBhbmVsXCIsXG5cdFx0ZGlyZWN0aW9uc1NlcnZpY2U6IG51bGxcblx0fTtcblxuXHRjbGFzcyBLcnJvdXRlIHtcblx0XHRjb25zdHJ1Y3RvcigkZWxlbWVudCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0JC5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjbGVhclJvdXRlTWFya2VycygpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVNYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvdXRlTWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3RhdGljIGNsZWFyV2F5cG9pbnRzKCkge1xuXHRcdFx0b3JpZ2luID0gbnVsbDtcblx0XHRcdHJvdXRlTWFya2VycyA9IFtdO1xuXHRcdFx0cm91dGVTdG9wUG9pbnRzID0gW107XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGFkZFJvdXRlTWFya2VyKGxhdGxuZykge1xuXHRcdFx0cm91dGVNYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdHBvc2l0aW9uOiBsYXRsbmcsXG5cdFx0XHRcdG1hcDogICAgICByb3V0ZU1hcCxcblx0XHRcdFx0aWNvbjogICAgIHRoaXMuc2V0dGluZ3MuZGV0b3VyXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0Ly9cblx0XHQvLyBhZGRQcm9wZXJ0eU1hcmtlcihwb2ludCwgaHRtbCwgaW1hZ2UsIGJveGluZm8pIHtcblx0XHQvLyBcdGxldCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHQvLyBcdFx0cG9zaXRpb246IHBvaW50LFxuXHRcdC8vIFx0XHRodG1sOiAgICAgaHRtbCxcblx0XHQvLyBcdFx0bWFwOiAgICAgIHJvdXRlTWFwLFxuXHRcdC8vIFx0XHRpY29uOiAgICAgaW1hZ2UsXG5cdFx0Ly8gXHRcdHpJbmRleDogICAxXG5cdFx0Ly8gXHR9KTtcblx0XHQvL1xuXHRcdC8vIFx0bGV0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG5cdFx0Ly8gXHRcdGNvbnRlbnQ6IGJveGluZm9cblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHQvLyBcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGluZm8gd2luZG93IHN0b3JlZCBpbiByb3V0ZUN1cnJJbmZvV2luZG93LFxuXHRcdC8vIFx0XHQvLyBpZiB0aGVyZSBpcywgd2UgdXNlIC5jbG9zZSgpIHRvIGhpZGUgdGhlIHdpbmRvd1xuXHRcdC8vIFx0XHRpZiAocm91dGVDdXJySW5mb1dpbmRvdykge1xuXHRcdC8vIFx0XHRcdHJvdXRlQ3VyckluZm9XaW5kb3cuY2xvc2UoKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0XHQvLyBQdXQgb3VyIG5ldyBpbmZvIHdpbmRvdyBpbiB0byB0aGUgcm91dGVDdXJySW5mb1dpbmRvdyB2YXJpYWJsZVxuXHRcdC8vIFx0XHRyb3V0ZUN1cnJJbmZvV2luZG93ID0gaW5mb3dpbmRvdztcblx0XHQvLyBcdFx0Ly8gT3BlbiB0aGUgd2luZG93XG5cdFx0Ly8gXHRcdGluZm93aW5kb3cub3Blbihyb3V0ZU1hcCwgbWFya2VyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vXG5cdFx0Ly8gXHQvL2dtYXJrZXJzLnB1c2goIG1hcmtlciApO1xuXHRcdC8vIFx0cm91dGVNYXJrZXJzLnB1c2gobWFya2VyKTtcblx0XHQvLyB9XG5cblx0XHQvLyBzdGF0aWMgdXBkYXRlTW9kZSgpIHtcblx0XHQvLyBcdGlmIChkaXJlY3Rpb25zVmlzaWJsZSkge1xuXHRcdC8vIFx0XHR0aGlzLmNhbGNSb3V0ZSgpO1xuXHRcdC8vIFx0fVxuXHRcdC8vIH1cblxuXHRcdGNhbGNSb3V0ZSgpIHtcblx0XHRcdGxldCBmcm9tX2FkZHJlc3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZyb21fYWRkcmVzc1wiKS52YWx1ZTtcblx0XHRcdGxldCBvcmlnaW4gPSBcIlwiO1xuXG5cdFx0XHRpZiAoZnJvbV9hZGRyZXNzID09PSBcIkFkZHJlc3NcIikgZnJvbV9hZGRyZXNzID0gXCJcIjtcblx0XHRcdGlmIChmcm9tX2FkZHJlc3MpIG9yaWdpbiA9IGZyb21fYWRkcmVzcyArIFwiLFwiICsgXCJcIjtcblxuXHRcdFx0bGV0IG1vZGU7XG5cdFx0XHRzd2l0Y2ggKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kZVwiKS52YWx1ZSkge1xuXHRcdFx0XHRjYXNlIFwiYmljeWNsaW5nXCI6XG5cdFx0XHRcdFx0bW9kZSA9IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNUcmF2ZWxNb2RlLkJJQ1lDTElORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRyaXZpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuRFJJVklORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIndhbGtpbmdcIjpcblx0XHRcdFx0XHRtb2RlID0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1RyYXZlbE1vZGUuV0FMS0lORztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9yaWdpbikge1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IHtcblx0XHRcdFx0XHRvcmlnaW46ICAgICAgICBvcmlnaW4sXG5cdFx0XHRcdFx0ZGVzdGluYXRpb246ICAgZGVzdGluYXRpb24sXG5cdFx0XHRcdFx0d2F5cG9pbnRzOiAgICAgcm91dGVTdG9wUG9pbnRzLFxuXHRcdFx0XHRcdHRyYXZlbE1vZGU6ICAgIG1vZGUsXG5cdFx0XHRcdFx0YXZvaWRIaWdod2F5czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZ2h3YXlzJykuY2hlY2tlZCxcblx0XHRcdFx0XHRhdm9pZFRvbGxzOiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9sbHMnKS5jaGVja2VkXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24gKHJlc3BvbnNlLCBzdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJHb29nbGUgY291bGRuYHQgY2FsY3VsYXRlIGRpcmVjdGlvbnMgZm9yIHRoaXMgcm91dGUgYW5kIHNlbGVjdGVkIG9wdGlvbnNcIik7XG5cdFx0XHRcdFx0XHRzZWxmLnJlc2V0Um91dGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRLcnJvdXRlLmNsZWFyUm91dGVNYXJrZXJzKCk7XG5cdFx0XHRkaXJlY3Rpb25zVmlzaWJsZSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW5pdCgpIHtcblx0XHRcdGRlc3RpbmF0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHQvL0luaXRpYWxpc2UgbWFwIG9wdGlvbnNcblx0XHRcdHRoaXMubXlPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGx3aGVlbDogICAgICAgZmFsc2UsXG5cdFx0XHRcdHpvb206ICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFpvb20sXG5cdFx0XHRcdG1heFpvb206ICAgICAgICAgICB0aGlzLnNldHRpbmdzLm1hcE1heFpvb20sXG5cdFx0XHRcdG1hcFR5cGVJZDogICAgICAgICB0aGlzLnNldHRpbmdzLm1hcFR5cGVJZCxcblx0XHRcdFx0c3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRjZW50ZXI6ICAgICAgICAgICAgZGVzdGluYXRpb25cblx0XHRcdH07XG5cblx0XHRcdHJvdXRlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLm1hcElkKSwgdGhpcy5teU9wdGlvbnMpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRNYXAocm91dGVNYXApO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZXR0aW5ncy5kaXJlY3Rpb25zUGFuZWwpKTtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2UodGhpcy5zZXR0aW5ncy5pY29uKTtcblx0XHRcdHBvaW50ID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyh0aGlzLnNldHRpbmdzLmxhdCwgdGhpcy5zZXR0aW5ncy5sbmcpO1xuXG5cdFx0XHRzZWxmID0gdGhpcztcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJvdXRlTWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0aWYgKHJvdXRlU3RvcFBvaW50cy5sZW5ndGggPCA5KSB7XG5cdFx0XHRcdFx0cm91dGVTdG9wUG9pbnRzLnB1c2goe2xvY2F0aW9uOiBldmVudC5sYXRMbmcsIHN0b3BvdmVyOiB0cnVlfSk7XG5cdFx0XHRcdFx0cG9pbnQgPSBldmVudC5sYXRMbmc7XG5cdFx0XHRcdFx0c2VsZi5hZGRSb3V0ZU1hcmtlcihwb2ludCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoXCJNYXhpbXVtIG51bWJlciBvZiA5IHdheXBvaW50cyByZWFjaGVkXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2Uocm91dGVNYXAsICdpZGxlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHJvdXRlTWFwLCAncmVzaXplJyk7XG5cdFx0XHRcdHNlbGYuY2FsY1JvdXRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXNldFJvdXRlKCkge1xuXHRcdFx0S3Jyb3V0ZS5jbGVhclJvdXRlTWFya2VycygpO1xuXHRcdFx0S3Jyb3V0ZS5jbGVhcldheXBvaW50cygpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0TWFwKG51bGwpO1xuXHRcdFx0ZGlyZWN0aW9uc0Rpc3BsYXkuc2V0UGFuZWwobnVsbCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheSA9IG5ldyBnb29nbGUubWFwcy5EaXJlY3Rpb25zUmVuZGVyZXIoKTtcblx0XHRcdGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChyb3V0ZU1hcCk7XG5cdFx0XHRkaXJlY3Rpb25zRGlzcGxheS5zZXRQYW5lbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmRpcmVjdGlvblBhbmVsKSk7XG5cblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblx0fVxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHQkKFwiLmtyLWRpcmVjdGlvbnMtbW9kYWxcIikub24oJ2NsaWNrJywgJyNrci1tYXAtcm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0bGV0ICRlbGVtZW50ID0gJCh0aGlzKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdGxhdDogICAgJGVsZW1lbnQuZGF0YSgnbGF0JyksXG5cdFx0XHRcdGxuZzogICAgJGVsZW1lbnQuZGF0YSgnbG5nJyksXG5cdFx0XHRcdG5hbWU6ICAgJGVsZW1lbnQuZGF0YSgnbmFtZScpLFxuXHRcdFx0XHRpY29uOiAgICRlbGVtZW50LmRhdGEoJ2ljb24nKSxcblx0XHRcdFx0ZGV0b3VyOiAkZWxlbWVudC5kYXRhKCdkZXRvdXInKVxuXHRcdFx0fTtcblx0XHRcdG15S3Jyb3V0ZSA9IG5ldyBLcnJvdXRlKCRlbGVtZW50LCBvcHRpb25zKTtcblx0XHR9KS5vbignY2xpY2snLCAnLnJlc2V0cm91dGUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bXlLcnJvdXRlLnJlc2V0Um91dGUoKTtcblx0XHR9KS5vbignY2xpY2snLCAnLmNhbGNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRteUtycm91dGUuY2FsY1JvdXRlKCk7XG5cdFx0fSk7XG5cblx0XHRqUXVlcnkoXCJhI2dlb2NvZGVBZGRyZXNzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBhZGRyZXNzU3RyaW5nID1cblx0XHRcdFx0ICAgIGpRdWVyeShcIiNqZm9ybV9wcm9wZXJ0eV9zdHJlZXRcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3Rvd25faWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKVxuXHRcdFx0XHQgICAgKyBcIiBcIlxuXHRcdFx0XHQgICAgKyBqUXVlcnkoXCIjamZvcm1fcHJvcGVydHlfcG9zdGNvZGVcIikudmFsKClcblx0XHRcdFx0ICAgICsgXCIsIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX3JlZ2lvbl9pZCcpLmZpbmQoXCI6c2VsZWN0ZWRcIikudGV4dCgpXG5cdFx0XHRcdCAgICArIFwiIFwiXG5cdFx0XHRcdCAgICArIGpRdWVyeSgnI2pmb3JtX2NvdW50cnlfaWQnKS5maW5kKFwiOnNlbGVjdGVkXCIpLnRleHQoKTtcblxuXHRcdFx0bGV0IHVybCA9ICdpbmRleC5waHA/b3B0aW9uPWNvbV9rbm93cmVzJnRhc2s9cHJvcGVydHkuZ2VvY29kZSc7XG5cdFx0XHRsZXQgY29vcmQgPSBbXTtcblxuXHRcdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0XHR0eXBlOiAgICAgXCJQT1NUXCIsXG5cdFx0XHRcdHVybDogICAgICB1cmwsXG5cdFx0XHRcdGRhdGE6ICAgICB7YWRkcmVzczogYWRkcmVzc1N0cmluZ30sXG5cdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0c3VjY2VzczogIGZ1bmN0aW9uIChqc29uZGF0YSkge1xuXHRcdFx0XHRcdGpRdWVyeS5lYWNoKGpzb25kYXRhLCBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcblx0XHRcdFx0XHRcdGxldCBkaXYgPSBcIiNcIiArIGtleTtcblx0XHRcdFx0XHRcdGpRdWVyeShkaXYpLnZhbCh2YWwpO1xuXHRcdFx0XHRcdFx0Y29vcmRba2V5XSA9IHZhbDtcblx0XHRcdFx0XHRcdG15R21hcC5yZWZyZXNoTWFwKGNvb3JkWydsYXQnXSwgY29vcmRbJ2xuZyddLCBmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn0oalF1ZXJ5KSk7IiwiLyoqXG4gKiBOcG0gdmVyc2lvbiBvZiBtYXJrZXJDbHVzdGVyZXIgd29ya3MgZ3JlYXQgd2l0aCBicm93c2VyaWZ5XG4gKiBEaWZmZXJlbmNlIGZyb20gdGhlIG9yaWdpbmFsIC0gYWRkcyBhIGNvbW1vbmpzIGZvcm1hdCBhbmQgcmVwbGFjZXMgd2luZG93IHdpdGggZ2xvYmFsIGFuZCBzb21lIHVuaXQgdGVzdFxuICogVGhlIG9yaWdpbmFsIGZ1bmN0aW9uYWxpdHkgaXQncyBub3QgbW9kaWZpZWQgZm9yIGRvY3MgYW5kIG9yaWdpbmFsIHNvdXJjZSBjaGVja1xuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZW1hcHMvanMtbWFya2VyLWNsdXN0ZXJlclxuICovXG5cbi8qKlxuICogQG5hbWUgTWFya2VyQ2x1c3RlcmVyIGZvciBHb29nbGUgTWFwcyB2M1xuICogQHZlcnNpb24gdmVyc2lvbiAxLjBcbiAqIEBhdXRob3IgTHVrZSBNYWhlXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBUaGUgbGlicmFyeSBjcmVhdGVzIGFuZCBtYW5hZ2VzIHBlci16b29tLWxldmVsIGNsdXN0ZXJzIGZvciBsYXJnZSBhbW91bnRzIG9mXG4gKiBtYXJrZXJzLlxuICogPGJyLz5cbiAqIFRoaXMgaXMgYSB2MyBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAqIDxhIGhyZWY9XCJodHRwOi8vZ21hcHMtdXRpbGl0eS1saWJyYXJ5LWRldi5nb29nbGVjb2RlLmNvbS9zdm4vdGFncy9tYXJrZXJjbHVzdGVyZXIvXCJcbiAqID52MiBNYXJrZXJDbHVzdGVyZXI8L2E+LlxuICovXG5cbi8qKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cblxuLyoqXG4gKiBBIE1hcmtlciBDbHVzdGVyZXIgdGhhdCBjbHVzdGVycyBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFwfSBtYXAgVGhlIEdvb2dsZSBtYXAgdG8gYXR0YWNoIHRvLlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPj19IG9wdF9tYXJrZXJzIE9wdGlvbmFsIG1hcmtlcnMgdG8gYWRkIHRvXG4gKiAgIHRoZSBjbHVzdGVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfb3B0aW9ucyBzdXBwb3J0IHRoZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqICAgICAnZ3JpZFNpemUnOiAobnVtYmVyKSBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHMuXG4gKiAgICAgJ21heFpvb20nOiAobnVtYmVyKSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHRoYXQgYSBtYXJrZXIgY2FuIGJlIHBhcnQgb2YgYVxuICogICAgICAgICAgICAgICAgY2x1c3Rlci5cbiAqICAgICAnem9vbU9uQ2xpY2snOiAoYm9vbGVhbikgV2hldGhlciB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgb2YgY2xpY2tpbmcgb24gYVxuICogICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgaXMgdG8gem9vbSBpbnRvIGl0LlxuICogICAgICdhdmVyYWdlQ2VudGVyJzogKGJvb2xlYW4pIFdldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgIHRoZSBhdmVyYWdlIG9mIGFsbCBtYXJrZXJzIGluIHRoZSBjbHVzdGVyLlxuICogICAgICdtaW5pbXVtQ2x1c3RlclNpemUnOiAobnVtYmVyKSBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgc2hvd24uXG4gKiAgICAgJ3N0eWxlcyc6IChvYmplY3QpIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICAgJ3VybCc6IChzdHJpbmcpIFRoZSBpbWFnZSB1cmwuXG4gKiAgICAgICAnaGVpZ2h0JzogKG51bWJlcikgVGhlIGltYWdlIGhlaWdodC5cbiAqICAgICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAgICdhbmNob3InOiAoQXJyYXkpIFRoZSBhbmNob3IgcG9zaXRpb24gb2YgdGhlIGxhYmVsIHRleHQuXG4gKiAgICAgICAndGV4dENvbG9yJzogKHN0cmluZykgVGhlIHRleHQgY29sb3IuXG4gKiAgICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAgJ2ZvbnRGYW1pbHknOiAoc3RyaW5nKSBUaGUgZm9udCBmYW1pbHkuXG4gKiAgICAgICAnZm9udFdlaWdodCc6IChzdHJpbmcpIFRoZSBmb250IHdlaWdodC5cbiAqICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiAoc3RyaW5nKSBUaGUgcG9zaXRpb24gb2YgdGhlIGJhY2tnb3VuZCB4LCB5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBnb29nbGUubWFwcy5PdmVybGF5Vmlld1xuICovXG5mdW5jdGlvbiBNYXJrZXJDbHVzdGVyZXIobWFwLCBvcHRfbWFya2Vycywgb3B0X29wdGlvbnMpIHtcbiAgLy8gTWFya2VyQ2x1c3RlcmVyIGltcGxlbWVudHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcgaW50ZXJmYWNlLiBXZSB1c2UgdGhlXG4gIC8vIGV4dGVuZCBmdW5jdGlvbiB0byBleHRlbmQgTWFya2VyQ2x1c3RlcmVyIHdpdGggZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAgLy8gYmVjYXVzZSBpdCBtaWdodCBub3QgYWx3YXlzIGJlIGF2YWlsYWJsZSB3aGVuIHRoZSBjb2RlIGlzIGRlZmluZWQgc28gd2VcbiAgLy8gbG9vayBmb3IgaXQgYXQgdGhlIGxhc3QgcG9zc2libGUgbW9tZW50LiBJZiBpdCBkb2Vzbid0IGV4aXN0IG5vdyB0aGVuXG4gIC8vIHRoZXJlIGlzIG5vIHBvaW50IGdvaW5nIGFoZWFkIDopXG4gIHRoaXMuZXh0ZW5kKE1hcmtlckNsdXN0ZXJlciwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuICB0aGlzLm1hcF8gPSBtYXA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcblxuICAvKipcbiAgICogIEB0eXBlIHtBcnJheS48Q2x1c3Rlcj59XG4gICAqL1xuICB0aGlzLmNsdXN0ZXJzXyA9IFtdO1xuXG4gIHRoaXMuc2l6ZXMgPSBbNTMsIDU2LCA2NiwgNzgsIDkwXTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuc3R5bGVzXyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMucmVhZHlfID0gZmFsc2U7XG5cbiAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZ3JpZFNpemVfID0gb3B0aW9uc1snZ3JpZFNpemUnXSB8fCA2MDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gb3B0aW9uc1snbWluaW11bUNsdXN0ZXJTaXplJ10gfHwgMjtcblxuXG4gIC8qKlxuICAgKiBAdHlwZSB7P251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMubWF4Wm9vbV8gPSBvcHRpb25zWydtYXhab29tJ10gfHwgbnVsbDtcblxuICB0aGlzLnN0eWxlc18gPSBvcHRpb25zWydzdHlsZXMnXSB8fCBbXTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuaW1hZ2VQYXRoXyA9IG9wdGlvbnNbJ2ltYWdlUGF0aCddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbWFnZUV4dGVuc2lvbl8gPSBvcHRpb25zWydpbWFnZUV4dGVuc2lvbiddIHx8XG4gICAgICB0aGlzLk1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTl87XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy56b29tT25DbGlja18gPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zWyd6b29tT25DbGljayddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuem9vbU9uQ2xpY2tfID0gb3B0aW9uc1snem9vbU9uQ2xpY2snXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBmYWxzZTtcblxuICBpZiAob3B0aW9uc1snYXZlcmFnZUNlbnRlciddICE9IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBvcHRpb25zWydhdmVyYWdlQ2VudGVyJ107XG4gIH1cblxuICB0aGlzLnNldHVwU3R5bGVzXygpO1xuXG4gIHRoaXMuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLnByZXZab29tXyA9IHRoaXMubWFwXy5nZXRab29tKCk7XG5cbiAgLy8gQWRkIHRoZSBtYXAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnem9vbV9jaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHpvb20gPSB0aGF0Lm1hcF8uZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKHRoYXQucHJldlpvb21fICE9IHpvb20pIHtcbiAgICAgIHRoYXQucHJldlpvb21fID0gem9vbTtcbiAgICAgIHRoYXQucmVzZXRWaWV3cG9ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXBfLCAnaWRsZScsIGZ1bmN0aW9uKCkge1xuICAgIHRoYXQucmVkcmF3KCk7XG4gIH0pO1xuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUgbWFya2Vyc1xuICBpZiAob3B0X21hcmtlcnMgJiYgb3B0X21hcmtlcnMubGVuZ3RoKSB7XG4gICAgdGhpcy5hZGRNYXJrZXJzKG9wdF9tYXJrZXJzLCBmYWxzZSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFRoZSBtYXJrZXIgY2x1c3RlciBpbWFnZSBwYXRoLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLk1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfID1cbiAgICAnaHR0cDovL2dvb2dsZS1tYXBzLXV0aWxpdHktbGlicmFyeS12My5nb29nbGVjb2RlLmNvbS9zdm4vdHJ1bmsvbWFya2VyY2x1c3RlcmVyLycgK1xuICAgICdpbWFnZXMvbSc7XG5cblxuLyoqXG4gKiBUaGUgbWFya2VyIGNsdXN0ZXIgaW1hZ2UgcGF0aC5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5NQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fID0gJ3BuZyc7XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgb2JqZWN0cyBwcm90b3R5cGUgYnkgYW5vdGhlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoyIFRoZSBvYmplY3QgdG8gZXh0ZW5kIHdpdGguXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgZXh0ZW5kZWQgb2JqZWN0LlxuICogQGlnbm9yZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIChmdW5jdGlvbihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QucHJvdG90eXBlKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZVtwcm9wZXJ0eV0gPSBvYmplY3QucHJvdG90eXBlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLmFwcGx5KG9iajEsIFtvYmoyXSk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldFJlYWR5Xyh0cnVlKTtcbn07XG5cbi8qKlxuICogSW1wbGVtZW50YWlvbiBvZiB0aGUgaW50ZXJmYWNlIG1ldGhvZC5cbiAqIEBpZ25vcmVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTZXRzIHVwIHRoZSBzdHlsZXMgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0dXBTdHlsZXNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0eWxlc18ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHNpemU7IHNpemUgPSB0aGlzLnNpemVzW2ldOyBpKyspIHtcbiAgICB0aGlzLnN0eWxlc18ucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuaW1hZ2VQYXRoXyArIChpICsgMSkgKyAnLicgKyB0aGlzLmltYWdlRXh0ZW5zaW9uXyxcbiAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgIHdpZHRoOiBzaXplXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogIEZpdCB0aGUgbWFwIHRvIHRoZSBib3VuZHMgb2YgdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5maXRNYXBUb01hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMoKTtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gbWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgYm91bmRzLmV4dGVuZChtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG4gIH1cblxuICB0aGlzLm1hcF8uZml0Qm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHBhcmFtIHtPYmplY3R9IHN0eWxlcyBUaGUgc3R5bGUgdG8gc2V0LlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uKHN0eWxlcykge1xuICB0aGlzLnN0eWxlc18gPSBzdHlsZXM7XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIHN0eWxlcy5cbiAqXG4gKiAgQHJldHVybiB7T2JqZWN0fSBUaGUgc3R5bGVzIG9iamVjdC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3R5bGVzXztcbn07XG5cblxuLyoqXG4gKiBXaGV0aGVyIHpvb20gb24gY2xpY2sgaXMgc2V0LlxuICpcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgem9vbU9uQ2xpY2tfIGlzIHNldC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc1pvb21PbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnpvb21PbkNsaWNrXztcbn07XG5cbi8qKlxuICogV2hldGhlciBhdmVyYWdlIGNlbnRlciBpcyBzZXQuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhdmVyYWdlQ2VudGVyXyBpcyBzZXQuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuaXNBdmVyYWdlQ2VudGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmF2ZXJhZ2VDZW50ZXJfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBhcnJheSBvZiBtYXJrZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgbWFya2Vycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXJrZXJzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqICBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWFya2VycyBpbiB0aGUgY2x1c3RlcmVyXG4gKlxuICogIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBtYXJrZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogIFNldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4IHpvb20gbGV2ZWwuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWF4Wm9vbSA9IGZ1bmN0aW9uKG1heFpvb20pIHtcbiAgdGhpcy5tYXhab29tXyA9IG1heFpvb207XG59O1xuXG5cbi8qKlxuICogIEdldHMgdGhlIG1heCB6b29tIGZvciB0aGUgY2x1c3RlcmVyLlxuICpcbiAqICBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXggem9vbSBsZXZlbC5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXhab29tID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1heFpvb21fO1xufTtcblxuXG4vKipcbiAqICBUaGUgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIHRoZSBjbHVzdGVyIGljb24gaW1hZ2UuXG4gKlxuICogIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXJlci5cbiAqICBAcGFyYW0ge251bWJlcn0gbnVtU3R5bGVzIFRoZSBudW1iZXIgb2Ygc3R5bGVzIGF2YWlsYWJsZS5cbiAqICBAcmV0dXJuIHtPYmplY3R9IEEgb2JqZWN0IHByb3BlcnRpZXM6ICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqICBAcHJpdmF0ZVxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNhbGN1bGF0b3JfID0gZnVuY3Rpb24obWFya2VycywgbnVtU3R5bGVzKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBjb3VudCA9IG1hcmtlcnMubGVuZ3RoO1xuICB2YXIgZHYgPSBjb3VudDtcbiAgd2hpbGUgKGR2ICE9PSAwKSB7XG4gICAgZHYgPSBwYXJzZUludChkdiAvIDEwLCAxMCk7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIG51bVN0eWxlcyk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogY291bnQsXG4gICAgaW5kZXg6IGluZGV4XG4gIH07XG59O1xuXG5cbi8qKlxuICogU2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oQXJyYXksIG51bWJlcil9IGNhbGN1bGF0b3IgVGhlIGZ1bmN0aW9uIHRvIHNldCBhcyB0aGVcbiAqICAgICBjYWxjdWxhdG9yLiBUaGUgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG9iamVjdCBwcm9wZXJ0aWVzOlxuICogICAgICd0ZXh0JyAoc3RyaW5nKSBhbmQgJ2luZGV4JyAobnVtYmVyKS5cbiAqXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0Q2FsY3VsYXRvciA9IGZ1bmN0aW9uKGNhbGN1bGF0b3IpIHtcbiAgdGhpcy5jYWxjdWxhdG9yXyA9IGNhbGN1bGF0b3I7XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBjYWxjdWxhdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm4ge2Z1bmN0aW9uKEFycmF5LCBudW1iZXIpfSB0aGUgY2FsY3VsYXRvciBmdW5jdGlvbi5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRDYWxjdWxhdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNhbGN1bGF0b3JfO1xufTtcblxuXG4vKipcbiAqIEFkZCBhbiBhcnJheSBvZiBtYXJrZXJzIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheS48Z29vZ2xlLm1hcHMuTWFya2VyPn0gbWFya2VycyBUaGUgbWFya2VycyB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICB0aGlzLnB1c2hNYXJrZXJUb18obWFya2VyKTtcbiAgfVxuICBpZiAoIW9wdF9ub2RyYXcpIHtcbiAgICB0aGlzLnJlZHJhdygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUHVzaGVzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucHVzaE1hcmtlclRvXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBtYXJrZXIuaXNBZGRlZCA9IGZhbHNlO1xuICBpZiAobWFya2VyWydkcmFnZ2FibGUnXSkge1xuICAgIC8vIElmIHRoZSBtYXJrZXIgaXMgZHJhZ2dhYmxlIGFkZCBhIGxpc3RlbmVyIHNvIHdlIHVwZGF0ZSB0aGUgY2x1c3RlcnMgb25cbiAgICAvLyB0aGUgZHJhZyBlbmQuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIG1hcmtlci5pc0FkZGVkID0gZmFsc2U7XG4gICAgICB0aGF0LnJlcGFpbnQoKTtcbiAgICB9KTtcbiAgfVxuICB0aGlzLm1hcmtlcnNfLnB1c2gobWFya2VyKTtcbn07XG5cblxuLyoqXG4gKiBBZGRzIGEgbWFya2VyIHRvIHRoZSBjbHVzdGVyZXIgYW5kIHJlZHJhd3MgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBhZGQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IFdoZXRoZXIgdG8gcmVkcmF3IHRoZSBjbHVzdGVycy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIsIG9wdF9ub2RyYXcpIHtcbiAgdGhpcy5wdXNoTWFya2VyVG9fKG1hcmtlcik7XG4gIGlmICghb3B0X25vZHJhdykge1xuICAgIHRoaXMucmVkcmF3KCk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZW1vdmVzIGEgbWFya2VyIGFuZCByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90XG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIHJlbW92ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbWFya2VyIHdhcyByZW1vdmVkIG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJfID0gZnVuY3Rpb24obWFya2VyKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgaW5kZXggPSB0aGlzLm1hcmtlcnNfLmluZGV4T2YobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbTsgbSA9IHRoaXMubWFya2Vyc19baV07IGkrKykge1xuICAgICAgaWYgKG0gPT0gbWFya2VyKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGV4ID09IC0xKSB7XG4gICAgLy8gTWFya2VyIGlzIG5vdCBpbiBvdXIgbGlzdCBvZiBtYXJrZXJzLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG1hcmtlci5zZXRNYXAobnVsbCk7XG5cbiAgdGhpcy5tYXJrZXJzXy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZSBhIG1hcmtlciBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byByZW1vdmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfbm9kcmF3IE9wdGlvbmFsIGJvb2xlYW4gdG8gZm9yY2Ugbm8gcmVkcmF3LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIHdhcyByZW1vdmVkLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlciwgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlTWFya2VyXyhtYXJrZXIpO1xuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgYW4gYXJyYXkgb2YgbWFya2VycyBmcm9tIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPGdvb2dsZS5tYXBzLk1hcmtlcj59IG1hcmtlcnMgVGhlIG1hcmtlcnMgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X25vZHJhdyBPcHRpb25hbCBib29sZWFuIHRvIGZvcmNlIG5vIHJlZHJhdy5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24obWFya2Vycywgb3B0X25vZHJhdykge1xuICB2YXIgcmVtb3ZlZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IG1hcmtlcnNbaV07IGkrKykge1xuICAgIHZhciByID0gdGhpcy5yZW1vdmVNYXJrZXJfKG1hcmtlcik7XG4gICAgcmVtb3ZlZCA9IHJlbW92ZWQgfHwgcjtcbiAgfVxuXG4gIGlmICghb3B0X25vZHJhdyAmJiByZW1vdmVkKSB7XG4gICAgdGhpcy5yZXNldFZpZXdwb3J0KCk7XG4gICAgdGhpcy5yZWRyYXcoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGNsdXN0ZXJlcidzIHJlYWR5IHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZHkgVGhlIHN0YXRlLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5zZXRSZWFkeV8gPSBmdW5jdGlvbihyZWFkeSkge1xuICBpZiAoIXRoaXMucmVhZHlfKSB7XG4gICAgdGhpcy5yZWFkeV8gPSByZWFkeTtcbiAgICB0aGlzLmNyZWF0ZUNsdXN0ZXJzXygpO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNsdXN0ZXJzIGluIHRoZSBjbHVzdGVyZXIuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNsdXN0ZXJzLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2x1c3RlcnNfLmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnb29nbGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXJlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuTWFwfSBUaGUgbWFwLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXBfO1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIGdvb2dsZSBtYXAgdGhhdCB0aGUgY2x1c3RlcmVyIGlzIGFzc29jaWF0ZWQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcH0gbWFwIFRoZSBtYXAuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWFwID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMubWFwXyA9IG1hcDtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGdyaWQgc2l6ZS5cbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRHcmlkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5ncmlkU2l6ZV87XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgZ3JpZCBzaXplLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICB0aGlzLmdyaWRTaXplXyA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluIGNsdXN0ZXIgc2l6ZS5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWluQ2x1c3RlclNpemVfO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtaW4gY2x1c3RlciBzaXplLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIFRoZSBncmlkIHNpemUuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuc2V0TWluQ2x1c3RlclNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBFeHRlbmRzIGEgYm91bmRzIG9iamVjdCBieSB0aGUgZ3JpZCBzaXplLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzfSBib3VuZHMgVGhlIGJvdW5kcyB0byBleHRlbmQuXG4gKiBAcmV0dXJuIHtnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN9IFRoZSBleHRlbmRlZCBib3VuZHMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0RXh0ZW5kZWRCb3VuZHMgPSBmdW5jdGlvbihib3VuZHMpIHtcbiAgdmFyIHByb2plY3Rpb24gPSB0aGlzLmdldFByb2plY3Rpb24oKTtcblxuICAvLyBUdXJuIHRoZSBib3VuZHMgaW50byBsYXRsbmcuXG4gIHZhciB0ciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoYm91bmRzLmdldE5vcnRoRWFzdCgpLmxhdCgpLFxuICAgICAgYm91bmRzLmdldE5vcnRoRWFzdCgpLmxuZygpKTtcbiAgdmFyIGJsID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHMuZ2V0U291dGhXZXN0KCkubGF0KCksXG4gICAgICBib3VuZHMuZ2V0U291dGhXZXN0KCkubG5nKCkpO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBvaW50cyB0byBwaXhlbHMgYW5kIHRoZSBleHRlbmQgb3V0IGJ5IHRoZSBncmlkIHNpemUuXG4gIHZhciB0clBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwodHIpO1xuICB0clBpeC54ICs9IHRoaXMuZ3JpZFNpemVfO1xuICB0clBpeC55IC09IHRoaXMuZ3JpZFNpemVfO1xuXG4gIHZhciBibFBpeCA9IHByb2plY3Rpb24uZnJvbUxhdExuZ1RvRGl2UGl4ZWwoYmwpO1xuICBibFBpeC54IC09IHRoaXMuZ3JpZFNpemVfO1xuICBibFBpeC55ICs9IHRoaXMuZ3JpZFNpemVfO1xuXG4gIC8vIENvbnZlcnQgdGhlIHBpeGVsIHBvaW50cyBiYWNrIHRvIExhdExuZ1xuICB2YXIgbmUgPSBwcm9qZWN0aW9uLmZyb21EaXZQaXhlbFRvTGF0TG5nKHRyUGl4KTtcbiAgdmFyIHN3ID0gcHJvamVjdGlvbi5mcm9tRGl2UGl4ZWxUb0xhdExuZyhibFBpeCk7XG5cbiAgLy8gRXh0ZW5kIHRoZSBib3VuZHMgdG8gY29udGFpbiB0aGUgbmV3IGJvdW5kcy5cbiAgYm91bmRzLmV4dGVuZChuZSk7XG4gIGJvdW5kcy5leHRlbmQoc3cpO1xuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5zIGlmIGEgbWFya2VyIGlzIGNvbnRhaW5lZCBpbiBhIGJvdW5kcy5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gY2hlY2suXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gYm91bmRzIFRoZSBib3VuZHMgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBpbiB0aGUgYm91bmRzLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5pc01hcmtlckluQm91bmRzXyA9IGZ1bmN0aW9uKG1hcmtlciwgYm91bmRzKSB7XG4gIHJldHVybiBib3VuZHMuY29udGFpbnMobWFya2VyLmdldFBvc2l0aW9uKCkpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyBhbGwgY2x1c3RlcnMgYW5kIG1hcmtlcnMgZnJvbSB0aGUgY2x1c3RlcmVyLlxuICovXG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmNsZWFyTWFya2VycyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2V0Vmlld3BvcnQodHJ1ZSk7XG5cbiAgLy8gU2V0IHRoZSBtYXJrZXJzIGEgZW1wdHkgYXJyYXkuXG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgYWxsIGV4aXN0aW5nIGNsdXN0ZXJzIGFuZCByZWNyZWF0ZXMgdGhlbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0X2hpZGUgVG8gYWxzbyBoaWRlIHRoZSBtYXJrZXIuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydCA9IGZ1bmN0aW9uKG9wdF9oaWRlKSB7XG4gIC8vIFJlbW92ZSBhbGwgdGhlIGNsdXN0ZXJzXG4gIGZvciAodmFyIGkgPSAwLCBjbHVzdGVyOyBjbHVzdGVyID0gdGhpcy5jbHVzdGVyc19baV07IGkrKykge1xuICAgIGNsdXN0ZXIucmVtb3ZlKCk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgbWFya2VycyB0byBub3QgYmUgYWRkZWQgYW5kIHRvIGJlIGludmlzaWJsZS5cbiAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgbWFya2VyLmlzQWRkZWQgPSBmYWxzZTtcbiAgICBpZiAob3B0X2hpZGUpIHtcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbHVzdGVyc18gPSBbXTtcbn07XG5cbi8qKlxuICpcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRDbHVzdGVycyA9IHRoaXMuY2x1c3RlcnNfLnNsaWNlKCk7XG4gIHRoaXMuY2x1c3RlcnNfLmxlbmd0aCA9IDA7XG4gIHRoaXMucmVzZXRWaWV3cG9ydCgpO1xuICB0aGlzLnJlZHJhdygpO1xuXG4gIC8vIFJlbW92ZSB0aGUgb2xkIGNsdXN0ZXJzLlxuICAvLyBEbyBpdCBpbiBhIHRpbWVvdXQgc28gdGhlIG90aGVyIGNsdXN0ZXJzIGhhdmUgYmVlbiBkcmF3biBmaXJzdC5cbiAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGNsdXN0ZXI7IGNsdXN0ZXIgPSBvbGRDbHVzdGVyc1tpXTsgaSsrKSB7XG4gICAgICBjbHVzdGVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfSwgMCk7XG59O1xuXG5cbi8qKlxuICogUmVkcmF3cyB0aGUgY2x1c3RlcnMuXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3JlYXRlQ2x1c3RlcnNfKCk7XG59O1xuXG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gbGF0bG5nIGxvY2F0aW9ucyBpbiBrbS5cbiAqIEBzZWUgaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9sYXRsb25nLmh0bWxcbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDEgVGhlIGZpcnN0IGxhdCBsbmcgcG9pbnQuXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLkxhdExuZ30gcDIgVGhlIHNlY29uZCBsYXQgbG5nIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiBrbS5cbiAqIEBwcml2YXRlXG4qL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5kaXN0YW5jZUJldHdlZW5Qb2ludHNfID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gIGlmICghcDEgfHwgIXAyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgUiA9IDYzNzE7IC8vIFJhZGl1cyBvZiB0aGUgRWFydGggaW4ga21cbiAgdmFyIGRMYXQgPSAocDIubGF0KCkgLSBwMS5sYXQoKSkgKiBNYXRoLlBJIC8gMTgwO1xuICB2YXIgZExvbiA9IChwMi5sbmcoKSAtIHAxLmxuZygpKSAqIE1hdGguUEkgLyAxODA7XG4gIHZhciBhID0gTWF0aC5zaW4oZExhdCAvIDIpICogTWF0aC5zaW4oZExhdCAvIDIpICtcbiAgICBNYXRoLmNvcyhwMS5sYXQoKSAqIE1hdGguUEkgLyAxODApICogTWF0aC5jb3MocDIubGF0KCkgKiBNYXRoLlBJIC8gMTgwKSAqXG4gICAgTWF0aC5zaW4oZExvbiAvIDIpICogTWF0aC5zaW4oZExvbiAvIDIpO1xuICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG4gIHZhciBkID0gUiAqIGM7XG4gIHJldHVybiBkO1xufTtcblxuXG4vKipcbiAqIEFkZCBhIG1hcmtlciB0byBhIGNsdXN0ZXIsIG9yIGNyZWF0ZXMgYSBuZXcgY2x1c3Rlci5cbiAqXG4gKiBAcGFyYW0ge2dvb2dsZS5tYXBzLk1hcmtlcn0gbWFya2VyIFRoZSBtYXJrZXIgdG8gYWRkLlxuICogQHByaXZhdGVcbiAqL1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRUb0Nsb3Nlc3RDbHVzdGVyXyA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICB2YXIgZGlzdGFuY2UgPSA0MDAwMDsgLy8gU29tZSBsYXJnZSBudW1iZXJcbiAgdmFyIGNsdXN0ZXJUb0FkZFRvID0gbnVsbDtcbiAgdmFyIHBvcyA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICBmb3IgKHZhciBpID0gMCwgY2x1c3RlcjsgY2x1c3RlciA9IHRoaXMuY2x1c3RlcnNfW2ldOyBpKyspIHtcbiAgICB2YXIgY2VudGVyID0gY2x1c3Rlci5nZXRDZW50ZXIoKTtcbiAgICBpZiAoY2VudGVyKSB7XG4gICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2VCZXR3ZWVuUG9pbnRzXyhjZW50ZXIsIG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgIGlmIChkIDwgZGlzdGFuY2UpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBkO1xuICAgICAgICBjbHVzdGVyVG9BZGRUbyA9IGNsdXN0ZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsdXN0ZXJUb0FkZFRvICYmIGNsdXN0ZXJUb0FkZFRvLmlzTWFya2VySW5DbHVzdGVyQm91bmRzKG1hcmtlcikpIHtcbiAgICBjbHVzdGVyVG9BZGRUby5hZGRNYXJrZXIobWFya2VyKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY2x1c3RlciA9IG5ldyBDbHVzdGVyKHRoaXMpO1xuICAgIGNsdXN0ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgdGhpcy5jbHVzdGVyc18ucHVzaChjbHVzdGVyKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNsdXN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY3JlYXRlQ2x1c3RlcnNfID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5yZWFkeV8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgb3VyIGN1cnJlbnQgbWFwIHZpZXcgYm91bmRzLlxuICAvLyBDcmVhdGUgYSBuZXcgYm91bmRzIG9iamVjdCBzbyB3ZSBkb24ndCBhZmZlY3QgdGhlIG1hcC5cbiAgdmFyIG1hcEJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5tYXBfLmdldEJvdW5kcygpLmdldFNvdXRoV2VzdCgpLFxuICAgICAgdGhpcy5tYXBfLmdldEJvdW5kcygpLmdldE5vcnRoRWFzdCgpKTtcbiAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0RXh0ZW5kZWRCb3VuZHMobWFwQm91bmRzKTtcblxuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSB0aGlzLm1hcmtlcnNfW2ldOyBpKyspIHtcbiAgICBpZiAoIW1hcmtlci5pc0FkZGVkICYmIHRoaXMuaXNNYXJrZXJJbkJvdW5kc18obWFya2VyLCBib3VuZHMpKSB7XG4gICAgICB0aGlzLmFkZFRvQ2xvc2VzdENsdXN0ZXJfKG1hcmtlcik7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogQSBjbHVzdGVyIHRoYXQgY29udGFpbnMgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0ge01hcmtlckNsdXN0ZXJlcn0gbWFya2VyQ2x1c3RlcmVyIFRoZSBtYXJrZXJjbHVzdGVyZXIgdGhhdCB0aGlzXG4gKiAgICAgY2x1c3RlciBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKiBAY29uc3RydWN0b3JcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3RlcihtYXJrZXJDbHVzdGVyZXIpIHtcbiAgdGhpcy5tYXJrZXJDbHVzdGVyZXJfID0gbWFya2VyQ2x1c3RlcmVyO1xuICB0aGlzLm1hcF8gPSBtYXJrZXJDbHVzdGVyZXIuZ2V0TWFwKCk7XG4gIHRoaXMuZ3JpZFNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCk7XG4gIHRoaXMubWluQ2x1c3RlclNpemVfID0gbWFya2VyQ2x1c3RlcmVyLmdldE1pbkNsdXN0ZXJTaXplKCk7XG4gIHRoaXMuYXZlcmFnZUNlbnRlcl8gPSBtYXJrZXJDbHVzdGVyZXIuaXNBdmVyYWdlQ2VudGVyKCk7XG4gIHRoaXMuY2VudGVyXyA9IG51bGw7XG4gIHRoaXMubWFya2Vyc18gPSBbXTtcbiAgdGhpcy5ib3VuZHNfID0gbnVsbDtcbiAgdGhpcy5jbHVzdGVySWNvbl8gPSBuZXcgQ2x1c3Rlckljb24odGhpcywgbWFya2VyQ2x1c3RlcmVyLmdldFN0eWxlcygpLFxuICAgICAgbWFya2VyQ2x1c3RlcmVyLmdldEdyaWRTaXplKCkpO1xufVxuXG4vKipcbiAqIERldGVybWlucyBpZiBhIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBjbHVzdGVyLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTWFya2VyfSBtYXJrZXIgVGhlIG1hcmtlciB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciBpcyBhbHJlYWR5IGFkZGVkLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5pc01hcmtlckFscmVhZHlBZGRlZCA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5tYXJrZXJzXy5pbmRleE9mKSB7XG4gICAgcmV0dXJuIHRoaXMubWFya2Vyc18uaW5kZXhPZihtYXJrZXIpICE9IC0xO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBtOyBtID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBpZiAobSA9PSBtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLyoqXG4gKiBBZGQgYSBtYXJrZXIgdGhlIGNsdXN0ZXIuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGFkZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hcmtlciB3YXMgYWRkZWQuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uKG1hcmtlcikge1xuICBpZiAodGhpcy5pc01hcmtlckFscmVhZHlBZGRlZChtYXJrZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCF0aGlzLmNlbnRlcl8pIHtcbiAgICB0aGlzLmNlbnRlcl8gPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5hdmVyYWdlQ2VudGVyXykge1xuICAgICAgdmFyIGwgPSB0aGlzLm1hcmtlcnNfLmxlbmd0aCArIDE7XG4gICAgICB2YXIgbGF0ID0gKHRoaXMuY2VudGVyXy5sYXQoKSAqIChsLTEpICsgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCkpIC8gbDtcbiAgICAgIHZhciBsbmcgPSAodGhpcy5jZW50ZXJfLmxuZygpICogKGwtMSkgKyBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKSkgLyBsO1xuICAgICAgdGhpcy5jZW50ZXJfID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kc18oKTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuaXNBZGRlZCA9IHRydWU7XG4gIHRoaXMubWFya2Vyc18ucHVzaChtYXJrZXIpO1xuXG4gIHZhciBsZW4gPSB0aGlzLm1hcmtlcnNfLmxlbmd0aDtcbiAgaWYgKGxlbiA8IHRoaXMubWluQ2x1c3RlclNpemVfICYmIG1hcmtlci5nZXRNYXAoKSAhPSB0aGlzLm1hcF8pIHtcbiAgICAvLyBNaW4gY2x1c3RlciBzaXplIG5vdCByZWFjaGVkIHNvIHNob3cgdGhlIG1hcmtlci5cbiAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gIH1cblxuICBpZiAobGVuID09IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gSGlkZSB0aGUgbWFya2VycyB0aGF0IHdlcmUgc2hvd2luZy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLm1hcmtlcnNfW2ldLnNldE1hcChudWxsKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGVuID49IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMudXBkYXRlSWNvbigpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXJrZXIgY2x1c3RlcmVyIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge01hcmtlckNsdXN0ZXJlcn0gVGhlIGFzc29jaWF0ZWQgbWFya2VyIGNsdXN0ZXJlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VyQ2x1c3RlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcmtlckNsdXN0ZXJlcl87XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgYm91bmRzIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc30gdGhlIGNsdXN0ZXIgYm91bmRzLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHModGhpcy5jZW50ZXJfLCB0aGlzLmNlbnRlcl8pO1xuICB2YXIgbWFya2VycyA9IHRoaXMuZ2V0TWFya2VycygpO1xuICBmb3IgKHZhciBpID0gMCwgbWFya2VyOyBtYXJrZXIgPSBtYXJrZXJzW2ldOyBpKyspIHtcbiAgICBib3VuZHMuZXh0ZW5kKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgfVxuICByZXR1cm4gYm91bmRzO1xufTtcblxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGNsdXN0ZXJcbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2x1c3Rlckljb25fLnJlbW92ZSgpO1xuICB0aGlzLm1hcmtlcnNfLmxlbmd0aCA9IDA7XG4gIGRlbGV0ZSB0aGlzLm1hcmtlcnNfO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgY2x1c3Rlci5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjbHVzdGVyIGNlbnRlci5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5tYXJrZXJzXy5sZW5ndGg7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge0FycmF5Ljxnb29nbGUubWFwcy5NYXJrZXI+fSBUaGUgY2x1c3RlciBjZW50ZXIuXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLmdldE1hcmtlcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMubWFya2Vyc187XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgY2VudGVyIG9mIHRoZSBjbHVzdGVyLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLkxhdExuZ30gVGhlIGNsdXN0ZXIgY2VudGVyLlxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VudGVyXztcbn07XG5cblxuLyoqXG4gKiBDYWxjdWxhdGVkIHRoZSBleHRlbmRlZCBib3VuZHMgb2YgdGhlIGNsdXN0ZXIgd2l0aCB0aGUgZ3JpZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVyLnByb3RvdHlwZS5jYWxjdWxhdGVCb3VuZHNfID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKHRoaXMuY2VudGVyXywgdGhpcy5jZW50ZXJfKTtcbiAgdGhpcy5ib3VuZHNfID0gdGhpcy5tYXJrZXJDbHVzdGVyZXJfLmdldEV4dGVuZGVkQm91bmRzKGJvdW5kcyk7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiBhIG1hcmtlciBsaWVzIGluIHRoZSBjbHVzdGVycyBib3VuZHMuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5NYXJrZXJ9IG1hcmtlciBUaGUgbWFya2VyIHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWFya2VyIGxpZXMgaW4gdGhlIGJvdW5kcy5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuaXNNYXJrZXJJbkNsdXN0ZXJCb3VuZHMgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgcmV0dXJuIHRoaXMuYm91bmRzXy5jb250YWlucyhtYXJrZXIuZ2V0UG9zaXRpb24oKSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWFwIHRoYXQgdGhlIGNsdXN0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICpcbiAqIEByZXR1cm4ge2dvb2dsZS5tYXBzLk1hcH0gVGhlIG1hcC5cbiAqL1xuQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm1hcF87XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2x1c3RlciBpY29uXG4gKi9cbkNsdXN0ZXIucHJvdG90eXBlLnVwZGF0ZUljb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHpvb20gPSB0aGlzLm1hcF8uZ2V0Wm9vbSgpO1xuICB2YXIgbXogPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0TWF4Wm9vbSgpO1xuXG4gIGlmIChteiAmJiB6b29tID4gbXopIHtcbiAgICAvLyBUaGUgem9vbSBpcyBncmVhdGVyIHRoYW4gb3VyIG1heCB6b29tIHNvIHNob3cgYWxsIHRoZSBtYXJrZXJzIGluIGNsdXN0ZXIuXG4gICAgZm9yICh2YXIgaSA9IDAsIG1hcmtlcjsgbWFya2VyID0gdGhpcy5tYXJrZXJzX1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwXyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLm1hcmtlcnNfLmxlbmd0aCA8IHRoaXMubWluQ2x1c3RlclNpemVfKSB7XG4gICAgLy8gTWluIGNsdXN0ZXIgc2l6ZSBub3QgeWV0IHJlYWNoZWQuXG4gICAgdGhpcy5jbHVzdGVySWNvbl8uaGlkZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBudW1TdHlsZXMgPSB0aGlzLm1hcmtlckNsdXN0ZXJlcl8uZ2V0U3R5bGVzKCkubGVuZ3RoO1xuICB2YXIgc3VtcyA9IHRoaXMubWFya2VyQ2x1c3RlcmVyXy5nZXRDYWxjdWxhdG9yKCkodGhpcy5tYXJrZXJzXywgbnVtU3R5bGVzKTtcbiAgdGhpcy5jbHVzdGVySWNvbl8uc2V0Q2VudGVyKHRoaXMuY2VudGVyXyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNldFN1bXMoc3Vtcyk7XG4gIHRoaXMuY2x1c3Rlckljb25fLnNob3coKTtcbn07XG5cblxuLyoqXG4gKiBBIGNsdXN0ZXIgaWNvblxuICpcbiAqIEBwYXJhbSB7Q2x1c3Rlcn0gY2x1c3RlciBUaGUgY2x1c3RlciB0byBiZSBhc3NvY2lhdGVkIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVzIEFuIG9iamVjdCB0aGF0IGhhcyBzdHlsZSBwcm9wZXJ0aWVzOlxuICogICAgICd1cmwnOiAoc3RyaW5nKSBUaGUgaW1hZ2UgdXJsLlxuICogICAgICdoZWlnaHQnOiAobnVtYmVyKSBUaGUgaW1hZ2UgaGVpZ2h0LlxuICogICAgICd3aWR0aCc6IChudW1iZXIpIFRoZSBpbWFnZSB3aWR0aC5cbiAqICAgICAnYW5jaG9yJzogKEFycmF5KSBUaGUgYW5jaG9yIHBvc2l0aW9uIG9mIHRoZSBsYWJlbCB0ZXh0LlxuICogICAgICd0ZXh0Q29sb3InOiAoc3RyaW5nKSBUaGUgdGV4dCBjb2xvci5cbiAqICAgICAndGV4dFNpemUnOiAobnVtYmVyKSBUaGUgdGV4dCBzaXplLlxuICogICAgICAnZm9udEZhbWlseSc6IChzdHJpbmcpIFRoZSBmb250IGZhbWlseS5cbiAqICAgICAgJ2ZvbnRXZWlnaHQnOiAoc3RyaW5nKSBUaGUgZm9udCB3ZWlnaHQuXG4gKiAgICAgJ2JhY2tncm91bmRQb3NpdGlvbjogKHN0cmluZykgVGhlIGJhY2tncm91bmQgcG9zdGl0aW9uIHgsIHkuXG4gKiBAcGFyYW0ge251bWJlcj19IG9wdF9wYWRkaW5nIE9wdGlvbmFsIHBhZGRpbmcgdG8gYXBwbHkgdG8gdGhlIGNsdXN0ZXIgaWNvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXdcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gQ2x1c3Rlckljb24oY2x1c3Rlciwgc3R5bGVzLCBvcHRfcGFkZGluZykge1xuICBjbHVzdGVyLmdldE1hcmtlckNsdXN0ZXJlcigpLmV4dGVuZChDbHVzdGVySWNvbiwgZ29vZ2xlLm1hcHMuT3ZlcmxheVZpZXcpO1xuXG4gIHRoaXMuc3R5bGVzXyA9IHN0eWxlcztcbiAgdGhpcy5wYWRkaW5nXyA9IG9wdF9wYWRkaW5nIHx8IDA7XG4gIHRoaXMuY2x1c3Rlcl8gPSBjbHVzdGVyO1xuICB0aGlzLmNlbnRlcl8gPSBudWxsO1xuICB0aGlzLm1hcF8gPSBjbHVzdGVyLmdldE1hcCgpO1xuICB0aGlzLmRpdl8gPSBudWxsO1xuICB0aGlzLnN1bXNfID0gbnVsbDtcbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0TWFwKHRoaXMubWFwXyk7XG59XG5cblxuLyoqXG4gKiBUcmlnZ2VycyB0aGUgY2x1c3RlcmNsaWNrIGV2ZW50IGFuZCB6b29tJ3MgaWYgdGhlIG9wdGlvbiBpcyBzZXQuXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS50cmlnZ2VyQ2x1c3RlckNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJrZXJDbHVzdGVyZXIgPSB0aGlzLmNsdXN0ZXJfLmdldE1hcmtlckNsdXN0ZXJlcigpO1xuXG4gIC8vIFRyaWdnZXIgdGhlIGNsdXN0ZXJjbGljayBldmVudC5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXJDbHVzdGVyZXIsICdjbHVzdGVyY2xpY2snLCB0aGlzLmNsdXN0ZXJfKTtcblxuICBpZiAobWFya2VyQ2x1c3RlcmVyLmlzWm9vbU9uQ2xpY2soKSkge1xuICAgIC8vIFpvb20gaW50byB0aGUgY2x1c3Rlci5cbiAgICB0aGlzLm1hcF8uZml0Qm91bmRzKHRoaXMuY2x1c3Rlcl8uZ2V0Qm91bmRzKCkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQWRkaW5nIHRoZSBjbHVzdGVyIGljb24gdG8gdGhlIGRvbS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGl2XyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICBpZiAodGhpcy52aXNpYmxlXykge1xuICAgIHZhciBwb3MgPSB0aGlzLmdldFBvc0Zyb21MYXRMbmdfKHRoaXMuY2VudGVyXyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmNzc1RleHQgPSB0aGlzLmNyZWF0ZUNzcyhwb3MpO1xuICAgIHRoaXMuZGl2Xy5pbm5lckhUTUwgPSB0aGlzLnN1bXNfLnRleHQ7XG4gIH1cblxuICB2YXIgcGFuZXMgPSB0aGlzLmdldFBhbmVzKCk7XG4gIHBhbmVzLm92ZXJsYXlNb3VzZVRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmRpdl8pO1xuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIodGhpcy5kaXZfLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB0aGF0LnRyaWdnZXJDbHVzdGVyQ2xpY2soKTtcbiAgfSk7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gdG8gcGxhY2UgdGhlIGRpdiBkZW5kaW5nIG9uIHRoZSBsYXRsbmcuXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5MYXRMbmd9IGxhdGxuZyBUaGUgcG9zaXRpb24gaW4gbGF0bG5nLlxuICogQHJldHVybiB7Z29vZ2xlLm1hcHMuUG9pbnR9IFRoZSBwb3NpdGlvbiBpbiBwaXhlbHMuXG4gKiBAcHJpdmF0ZVxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuZ2V0UG9zRnJvbUxhdExuZ18gPSBmdW5jdGlvbihsYXRsbmcpIHtcbiAgdmFyIHBvcyA9IHRoaXMuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb0RpdlBpeGVsKGxhdGxuZyk7XG4gIHBvcy54IC09IHBhcnNlSW50KHRoaXMud2lkdGhfIC8gMiwgMTApO1xuICBwb3MueSAtPSBwYXJzZUludCh0aGlzLmhlaWdodF8gLyAyLCAxMCk7XG4gIHJldHVybiBwb3M7XG59O1xuXG5cbi8qKlxuICogRHJhdyB0aGUgaWNvbi5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMudmlzaWJsZV8pIHtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NGcm9tTGF0TG5nXyh0aGlzLmNlbnRlcl8pO1xuICAgIHRoaXMuZGl2Xy5zdHlsZS50b3AgPSBwb3MueSArICdweCc7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmxlZnQgPSBwb3MueCArICdweCc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBIaWRlIHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgdGhpcy52aXNpYmxlXyA9IGZhbHNlO1xufTtcblxuXG4vKipcbiAqIFBvc2l0aW9uIGFuZCBzaG93IHRoZSBpY29uLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zRnJvbUxhdExuZ18odGhpcy5jZW50ZXJfKTtcbiAgICB0aGlzLmRpdl8uc3R5bGUuY3NzVGV4dCA9IHRoaXMuY3JlYXRlQ3NzKHBvcyk7XG4gICAgdGhpcy5kaXZfLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfVxuICB0aGlzLnZpc2libGVfID0gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGljb24gZnJvbSB0aGUgbWFwXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXRNYXAobnVsbCk7XG59O1xuXG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIG9uUmVtb3ZlIGludGVyZmFjZS5cbiAqIEBpZ25vcmVcbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpdl8gJiYgdGhpcy5kaXZfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgICB0aGlzLmRpdl8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmRpdl8pO1xuICAgIHRoaXMuZGl2XyA9IG51bGw7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIHN1bXMgb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN1bXMgVGhlIHN1bXMgY29udGFpbmluZzpcbiAqICAgJ3RleHQnOiAoc3RyaW5nKSBUaGUgdGV4dCB0byBkaXNwbGF5IGluIHRoZSBpY29uLlxuICogICAnaW5kZXgnOiAobnVtYmVyKSBUaGUgc3R5bGUgaW5kZXggb2YgdGhlIGljb24uXG4gKi9cbkNsdXN0ZXJJY29uLnByb3RvdHlwZS5zZXRTdW1zID0gZnVuY3Rpb24oc3Vtcykge1xuICB0aGlzLnN1bXNfID0gc3VtcztcbiAgdGhpcy50ZXh0XyA9IHN1bXMudGV4dDtcbiAgdGhpcy5pbmRleF8gPSBzdW1zLmluZGV4O1xuICBpZiAodGhpcy5kaXZfKSB7XG4gICAgdGhpcy5kaXZfLmlubmVySFRNTCA9IHN1bXMudGV4dDtcbiAgfVxuXG4gIHRoaXMudXNlU3R5bGUoKTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBpY29uIHRvIHRoZSB0aGUgc3R5bGVzLlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUudXNlU3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5zdW1zXy5pbmRleCAtIDEpO1xuICBpbmRleCA9IE1hdGgubWluKHRoaXMuc3R5bGVzXy5sZW5ndGggLSAxLCBpbmRleCk7XG4gIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVzX1tpbmRleF07XG4gIHRoaXMudXJsXyA9IHN0eWxlWyd1cmwnXTtcbiAgdGhpcy5oZWlnaHRfID0gc3R5bGVbJ2hlaWdodCddO1xuICB0aGlzLndpZHRoXyA9IHN0eWxlWyd3aWR0aCddO1xuICB0aGlzLnRleHRDb2xvcl8gPSBzdHlsZVsndGV4dENvbG9yJ107XG4gIHRoaXMuYW5jaG9yXyA9IHN0eWxlWydhbmNob3InXTtcbiAgdGhpcy50ZXh0U2l6ZV8gPSBzdHlsZVsndGV4dFNpemUnXTtcbiAgdGhpcy5mb250RmFtaWx5XyA9IHN0eWxlWydmb250RmFtaWx5J107XG4gIHRoaXMuZm9udFdlaWdodF8gPSBzdHlsZVsnZm9udFdlaWdodCddO1xuICB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPSBzdHlsZVsnYmFja2dyb3VuZFBvc2l0aW9uJ107XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgY2VudGVyIG9mIHRoZSBpY29uLlxuICpcbiAqIEBwYXJhbSB7Z29vZ2xlLm1hcHMuTGF0TG5nfSBjZW50ZXIgVGhlIGxhdGxuZyB0byBzZXQgYXMgdGhlIGNlbnRlci5cbiAqL1xuQ2x1c3Rlckljb24ucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uKGNlbnRlcikge1xuICB0aGlzLmNlbnRlcl8gPSBjZW50ZXI7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjc3MgdGV4dCBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGljb24uXG4gKlxuICogQHBhcmFtIHtnb29nbGUubWFwcy5Qb2ludH0gcG9zIFRoZSBwb3NpdGlvbi5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGNzcyBzdHlsZSB0ZXh0LlxuICovXG5DbHVzdGVySWNvbi5wcm90b3R5cGUuY3JlYXRlQ3NzID0gZnVuY3Rpb24ocG9zKSB7XG4gIHZhciBzdHlsZSA9IFtdO1xuICBzdHlsZS5wdXNoKCdiYWNrZ3JvdW5kLWltYWdlOnVybCgnICsgdGhpcy51cmxfICsgJyk7Jyk7XG4gIHZhciBiYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gPyB0aGlzLmJhY2tncm91bmRQb3NpdGlvbl8gOiAnMCAwJztcbiAgc3R5bGUucHVzaCgnYmFja2dyb3VuZC1wb3NpdGlvbjonICsgYmFja2dyb3VuZFBvc2l0aW9uICsgJzsnKTtcblxuICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yXyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuYW5jaG9yX1swXSA9PT0gJ251bWJlcicgJiYgdGhpcy5hbmNob3JfWzBdID4gMCAmJlxuICAgICAgICB0aGlzLmFuY2hvcl9bMF0gPCB0aGlzLmhlaWdodF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ2hlaWdodDonICsgKHRoaXMuaGVpZ2h0XyAtIHRoaXMuYW5jaG9yX1swXSkgK1xuICAgICAgICAgICdweDsgcGFkZGluZy10b3A6JyArIHRoaXMuYW5jaG9yX1swXSArICdweDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUucHVzaCgnaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gKyAncHg7IGxpbmUtaGVpZ2h0OicgKyB0aGlzLmhlaWdodF8gK1xuICAgICAgICAgICdweDsnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFuY2hvcl9bMV0gPT09ICdudW1iZXInICYmIHRoaXMuYW5jaG9yX1sxXSA+IDAgJiZcbiAgICAgICAgdGhpcy5hbmNob3JfWzFdIDwgdGhpcy53aWR0aF8pIHtcbiAgICAgIHN0eWxlLnB1c2goJ3dpZHRoOicgKyAodGhpcy53aWR0aF8gLSB0aGlzLmFuY2hvcl9bMV0pICtcbiAgICAgICAgICAncHg7IHBhZGRpbmctbGVmdDonICsgdGhpcy5hbmNob3JfWzFdICsgJ3B4OycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5wdXNoKCd3aWR0aDonICsgdGhpcy53aWR0aF8gKyAncHg7IHRleHQtYWxpZ246Y2VudGVyOycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5wdXNoKCdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0XyArICdweDsgbGluZS1oZWlnaHQ6JyArXG4gICAgICAgIHRoaXMuaGVpZ2h0XyArICdweDsgd2lkdGg6JyArIHRoaXMud2lkdGhfICsgJ3B4OyB0ZXh0LWFsaWduOmNlbnRlcjsnKTtcbiAgfVxuXG4gIHZhciB0eHRDb2xvciA9IHRoaXMudGV4dENvbG9yXyA/IHRoaXMudGV4dENvbG9yXyA6ICdibGFjayc7XG4gIHZhciB0eHRTaXplID0gdGhpcy50ZXh0U2l6ZV8gPyB0aGlzLnRleHRTaXplXyA6IDExO1xuICB2YXIgZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseV8gPyB0aGlzLmZvbnRGYW1pbHlfIDogJ0FyaWFsLHNhbnMtc2VyaWYnO1xuICB2YXIgZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodF8gPyB0aGlzLmZvbnRXZWlnaHRfIDogJzQwMCc7XG5cbiAgc3R5bGUucHVzaCgnY3Vyc29yOnBvaW50ZXI7IHRvcDonICsgcG9zLnkgKyAncHg7IGxlZnQ6JyArXG4gICAgICBwb3MueCArICdweDsgY29sb3I6JyArIHR4dENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7IGZvbnQtc2l6ZTonICtcbiAgICAgIHR4dFNpemUgKyAncHg7IGZvbnQtZmFtaWx5OicgKyBmb250RmFtaWx5ICsgJzsgZm9udC13ZWlnaHQ6JyArIGZvbnRXZWlnaHQgKyAnOycpO1xuICByZXR1cm4gc3R5bGUuam9pbignJyk7XG59O1xuXG5cbi8vIEV4cG9ydCBTeW1ib2xzIGZvciBDbG9zdXJlXG4vLyBJZiB5b3UgYXJlIG5vdCBnb2luZyB0byBjb21waWxlIHdpdGggY2xvc3VyZSB0aGVuIHlvdSBjYW4gcmVtb3ZlIHRoZVxuLy8gY29kZSBiZWxvdy5cbmdsb2JhbFsnTWFya2VyQ2x1c3RlcmVyJ10gPSBNYXJrZXJDbHVzdGVyZXI7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydhZGRNYXJrZXInXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuYWRkTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnYWRkTWFya2VycyddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5hZGRNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnY2xlYXJNYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuY2xlYXJNYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZml0TWFwVG9NYXJrZXJzJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZml0TWFwVG9NYXJrZXJzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0RXh0ZW5kZWRCb3VuZHMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRFeHRlbmRlZEJvdW5kcztcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2dldE1hcCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRNYXA7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXJrZXJzJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRNYXhab29tJ10gPSBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRTdHlsZXMnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZ2V0U3R5bGVzO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnZ2V0VG90YWxDbHVzdGVycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLmdldFRvdGFsQ2x1c3RlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydnZXRUb3RhbE1hcmtlcnMnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5nZXRUb3RhbE1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZWRyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVkcmF3O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VyJ10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVtb3ZlTWFya2VyO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsncmVtb3ZlTWFya2VycyddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnJlbW92ZU1hcmtlcnM7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydyZXNldFZpZXdwb3J0J10gPVxuICAgIE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUucmVzZXRWaWV3cG9ydDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ3JlcGFpbnQnXSA9XG4gICAgTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5yZXBhaW50O1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0Q2FsY3VsYXRvciddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldENhbGN1bGF0b3I7XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydzZXRHcmlkU2l6ZSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldEdyaWRTaXplO1xuTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZVsnc2V0TWF4Wm9vbSddID1cbiAgICBNYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlLnNldE1heFpvb207XG5NYXJrZXJDbHVzdGVyZXIucHJvdG90eXBlWydvbkFkZCddID0gTWFya2VyQ2x1c3RlcmVyLnByb3RvdHlwZS5vbkFkZDtcbk1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGVbJ2RyYXcnXSA9IE1hcmtlckNsdXN0ZXJlci5wcm90b3R5cGUuZHJhdztcblxuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldENlbnRlciddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0Q2VudGVyO1xuQ2x1c3Rlci5wcm90b3R5cGVbJ2dldFNpemUnXSA9IENsdXN0ZXIucHJvdG90eXBlLmdldFNpemU7XG5DbHVzdGVyLnByb3RvdHlwZVsnZ2V0TWFya2VycyddID0gQ2x1c3Rlci5wcm90b3R5cGUuZ2V0TWFya2VycztcblxuQ2x1c3Rlckljb24ucHJvdG90eXBlWydvbkFkZCddID0gQ2x1c3Rlckljb24ucHJvdG90eXBlLm9uQWRkO1xuQ2x1c3Rlckljb24ucHJvdG90eXBlWydkcmF3J10gPSBDbHVzdGVySWNvbi5wcm90b3R5cGUuZHJhdztcbkNsdXN0ZXJJY29uLnByb3RvdHlwZVsnb25SZW1vdmUnXSA9IENsdXN0ZXJJY29uLnByb3RvdHlwZS5vblJlbW92ZTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckNsdXN0ZXJlcjtcbiIsIi8qKlxuICogalF1ZXJ5IEJhciBSYXRpbmcgUGx1Z2luIHYxLjIuMlxuICpcbiAqIGh0dHA6Ly9naXRodWIuY29tL2FudGVubmFpby9qcXVlcnktYmFyLXJhdGluZ1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDE2IEthemlrIFBpZXRydXN6ZXdza2lcbiAqXG4gKiBUaGlzIHBsdWdpbiBpcyBhdmFpbGFibGUgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTURcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KU1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIEJhclJhdGluZyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBCYXJSYXRpbmcoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHdyYXAgZWxlbWVudCBpbiBhIHdyYXBwZXIgZGl2XG4gICAgICAgICAgICB2YXIgd3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IFsnYnItd3JhcHBlciddO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy50aGVtZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdici10aGVtZS0nICsgc2VsZi5vcHRpb25zLnRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndyYXAoJCgnPGRpdiAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogY2xhc3Nlcy5qb2luKCcgJylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB1bndyYXAgZWxlbWVudFxuICAgICAgICAgICAgdmFyIHVud3JhcEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnVud3JhcCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZmluZCBvcHRpb24gYnkgdmFsdWVcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJC5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSAgKyAnXCJdJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgaW5pdGlhbCBvcHRpb25cbiAgICAgICAgICAgIHZhciBnZXRJbml0aWFsT3B0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBzZWxmLm9wdGlvbnMuaW5pdGlhbFJhdGluZztcblxuICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnb3B0aW9uOnNlbGVjdGVkJywgc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRPcHRpb24oaW5pdGlhbFJhdGluZyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBnZXQgZW1wdHkgb3B0aW9uXG4gICAgICAgICAgICB2YXIgZ2V0RW1wdHlPcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRlbXB0eU9wdC5sZW5ndGggJiYgc2VsZi5vcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVtcHR5T3B0ID0gJCgnPG9wdGlvbiAvPicsIHsgJ3ZhbHVlJzogc2VsZi5vcHRpb25zLmVtcHR5VmFsdWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdC5wcmVwZW5kVG8oc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbXB0eU9wdDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGdldCBkYXRhXG4gICAgICAgICAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2VsZi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gc2V0IGRhdGFcbiAgICAgICAgICAgIHZhciBzZXREYXRhID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uZGF0YSgnYmFycmF0aW5nJylba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNhdmUgZGF0YSBvbiBlbGVtZW50XG4gICAgICAgICAgICB2YXIgc2F2ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG9wdCA9IGdldEluaXRpYWxPcHRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgJGVtcHR5T3B0ID0gZ2V0RW1wdHlPcHRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRvcHQudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkb3B0LmRhdGEoJ2h0bWwnKSA/ICRvcHQuZGF0YSgnaHRtbCcpIDogJG9wdC50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYWxsb3dFbXB0eSBvcHRpb24gaXMgbm90IHNldCBsZXQncyBjaGVjayBpZiBlbXB0eSBvcHRpb24gZXhpc3RzIGluIHRoZSBzZWxlY3QgZmllbGRcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dFbXB0eSA9IChzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYWxsb3dFbXB0eSA6XG4gICAgICAgICAgICAgICAgICAgICEhJGVtcHR5T3B0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHZhciBlbXB0eVZhbHVlID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnZhbCgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZW1wdHlUZXh0ID0gKCRlbXB0eU9wdC5sZW5ndGgpID8gJGVtcHR5T3B0LnRleHQoKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBzZXREYXRhKG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlck9wdGlvbnM6IHNlbGYub3B0aW9ucyxcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIHJhdGluZyBiYXNlZCBvbiB0aGUgT1BUSU9OIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dDogdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAvLyByYXRpbmcgd2lsbCBiZSByZXN0b3JlZCBieSBjYWxsaW5nIGNsZWFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFJhdGluZ1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSYXRpbmdUZXh0OiB0ZXh0LFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IGVtcHR5IHJhdGluZ3M/XG4gICAgICAgICAgICAgICAgICAgIGFsbG93RW1wdHk6IGFsbG93RW1wdHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmF0aW5nIHZhbHVlIGFuZCB0ZXh0IG9mIHRoZSBlbXB0eSBPUFRJT05cbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdWYWx1ZTogZW1wdHlWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSYXRpbmdUZXh0OiBlbXB0eVRleHQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVhZC1vbmx5IHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBzZWxmLm9wdGlvbnMucmVhZG9ubHksXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlkIHRoZSB1c2VyIGFscmVhZHkgc2VsZWN0IGEgcmF0aW5nP1xuICAgICAgICAgICAgICAgICAgICByYXRpbmdNYWRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGEgb24gZWxlbWVudFxuICAgICAgICAgICAgdmFyIHJlbW92ZURhdGFPbkVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnJlbW92ZURhdGEoJ2JhcnJhdGluZycpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGN1cnJlbnQgcmF0aW5nIHRleHRcbiAgICAgICAgICAgIHZhciByYXRpbmdUZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1RleHQnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50IHJhdGluZyB2YWx1ZVxuICAgICAgICAgICAgdmFyIHJhdGluZ1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGEoJ3JhdGluZ1ZhbHVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWRnZXQgYW5kIHJldHVybiBqUXVlcnkgZWxlbWVudFxuICAgICAgICAgICAgdmFyIGJ1aWxkV2lkZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR3ID0gJCgnPGRpdiAvPicsIHsgJ2NsYXNzJzogJ2JyLXdpZGdldCcgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgQSBlbGVtZW50cyB0aGF0IHdpbGwgcmVwbGFjZSBPUFRJT05zXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsLCB0ZXh0LCBodG1sLCAkYTtcblxuICAgICAgICAgICAgICAgICAgICB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSByYXRpbmdzIC0gYnV0IG9ubHkgaWYgdmFsIGlzIG5vdCBkZWZpbmVkIGFzIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IGdldERhdGEoJ2VtcHR5UmF0aW5nVmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICQodGhpcykuZGF0YSgnaHRtbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwpIHsgdGV4dCA9IGh0bWw7IH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJGEgPSAkKCc8YSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaHJlZic6ICcjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yYXRpbmctdmFsdWUnOiB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcmF0aW5nLXRleHQnOiB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogKHNlbGYub3B0aW9ucy5zaG93VmFsdWVzKSA/IHRleHQgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gYXBwZW5kIC5ici1jdXJyZW50LXJhdGluZyBkaXYgdG8gdGhlIHdpZGdldFxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuc2hvd1NlbGVjdGVkUmF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFwcGVuZCgkKCc8ZGl2IC8+JywgeyAndGV4dCc6ICcnLCAnY2xhc3MnOiAnYnItY3VycmVudC1yYXRpbmcnIH0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIHRoZSB3aWRnZXRcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHcuYWRkQ2xhc3MoJ2JyLXJldmVyc2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgICR3LmFkZENsYXNzKCdici1yZWFkb25seScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkdztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJldHVybiBhIGpRdWVyeSBmdW5jdGlvbiBuYW1lIGRlcGVuZGluZyBvbiB0aGUgJ3JldmVyc2UnIHNldHRpbmdcbiAgICAgICAgICAgIHZhciBuZXh0QWxsb3JQcmV2aW91c0FsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICduZXh0QWxsJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ByZXZBbGwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHNldFNlbGVjdEZpZWxkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAgICBmaW5kT3B0aW9uKHZhbHVlKS5wcm9wKCdzZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgdmFyIHJlc2V0U2VsZWN0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCdvcHRpb24nLCBzZWxmLiRlbGVtKS5wcm9wKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0U2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNoYW5nZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhdGluZ1xuICAgICAgICAgICAgdmFyIHNob3dTZWxlY3RlZFJhdGluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHVuZGVmaW5lZD9cbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQgOiByYXRpbmdUZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgc2VsZWN0ZWQgcmF0aW5nIGlzIGRlZmluZWQgYXMgZW1wdHlcbiAgICAgICAgICAgICAgICBpZiAodGV4dCA9PSBnZXREYXRhKCdlbXB0eVJhdGluZ1RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIC5ici1jdXJyZW50LXJhdGluZyBkaXZcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnNob3dTZWxlY3RlZFJhdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLmZpbmQoJy5ici1jdXJyZW50LXJhdGluZycpLnRleHQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmV0dXJuIHJvdW5kZWQgZnJhY3Rpb24gb2YgYSB2YWx1ZSAoMTQuNCAtPiA0MCwgMC45OSAtPiA5MClcbiAgICAgICAgICAgIHZhciBmcmFjdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKChNYXRoLmZsb29yKHZhbHVlICogMTApIC8gMTApICUgMSkgKiAxMDApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIGZyb20gZWxlbWVudHNcbiAgICAgICAgICAgIHZhciByZXNldFN0eWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBjbGFzc2VzIHN0YXJ0aW5nIHdpdGggYnItKlxuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc2VzLm1hdGNoKC8oXnxcXHMpYnItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3R5bGUgYnkgc2V0dGluZyBjbGFzc2VzIG9uIGVsZW1lbnRzXG4gICAgICAgICAgICB2YXIgYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkYSA9IHNlbGYuJHdpZGdldC5maW5kKCdhW2RhdGEtcmF0aW5nLXZhbHVlPVwiJyArIHJhdGluZ1ZhbHVlKCkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxSYXRpbmcgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpLmluaXRpYWxSYXRpbmc7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VWYWx1ZSA9ICQuaXNOdW1lcmljKHJhdGluZ1ZhbHVlKCkpID8gcmF0aW5nVmFsdWUoKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBmcmFjdGlvbihpbml0aWFsUmF0aW5nKTtcbiAgICAgICAgICAgICAgICB2YXIgJGFsbCwgJGZyYWN0aW9uYWw7XG5cbiAgICAgICAgICAgICAgICByZXNldFN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgY2xhc3Nlc1xuICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1zZWxlY3RlZCBici1jdXJyZW50JylbbmV4dEFsbG9yUHJldmlvdXNBbGwoKV0oKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ3JhdGluZ01hZGUnKSAmJiAkLmlzTnVtZXJpYyhpbml0aWFsUmF0aW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluaXRpYWxSYXRpbmcgPD0gYmFzZVZhbHVlKSB8fCAhZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJGFsbCA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGZyYWN0aW9uYWwgPSAoJGEubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAkYVsoZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5yZXZlcnNlKSA/ICdwcmV2JyA6ICduZXh0J10oKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAkYWxsWyhnZXREYXRhKCd1c2VyT3B0aW9ucycpLnJldmVyc2UpID8gJ2xhc3QnIDogJ2ZpcnN0J10oKTtcblxuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbCcpO1xuICAgICAgICAgICAgICAgICAgICAkZnJhY3Rpb25hbC5hZGRDbGFzcygnYnItZnJhY3Rpb25hbC0nICsgZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgZGVzZWxlY3RhYmxlP1xuICAgICAgICAgICAgdmFyIGlzRGVzZWxlY3RhYmxlID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWdldERhdGEoJ2FsbG93RW1wdHknKSB8fCAhZ2V0RGF0YSgndXNlck9wdGlvbnMnKS5kZXNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAocmF0aW5nVmFsdWUoKSA9PSAkZWxlbWVudC5hdHRyKCdkYXRhLXJhdGluZy12YWx1ZScpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSBjbGljayBldmVudHNcbiAgICAgICAgICAgIHZhciBhdHRhY2hDbGlja0hhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gZ2V0RGF0YSgndXNlck9wdGlvbnMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGEuYXR0cignZGF0YS1yYXRpbmctdmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICRhLmF0dHIoJ2RhdGEtcmF0aW5nLXRleHQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBjdXJyZW50IGFuZCBkZXNlbGVjdGFibGU/XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rlc2VsZWN0YWJsZSgkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0RGF0YSgnZW1wdHlSYXRpbmdWYWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGdldERhdGEoJ2VtcHR5UmF0aW5nVGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgc2VsZWN0ZWQgcmF0aW5nXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZXREYXRhKCdyYXRpbmdUZXh0JywgdGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RGaWVsZFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHRleHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uU2VsZWN0LmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1RleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlZW50ZXIgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ21vdXNlZW50ZXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRTdHlsZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhLmFkZENsYXNzKCdici1hY3RpdmUnKVtuZXh0QWxsb3JQcmV2aW91c0FsbCgpXSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JyLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygkYS5hdHRyKCdkYXRhLXJhdGluZy10ZXh0JykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaGFuZGxlIG1vdXNlbGVhdmUgZXZlbnRzXG4gICAgICAgICAgICB2YXIgYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQub24oJ21vdXNlbGVhdmUuYmFycmF0aW5nIGJsdXIuYmFycmF0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RlZFJhdGluZygpO1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBzb21ld2hhdCBwcmltaXRpdmUgd2F5IHRvIHJlbW92ZSAzMDBtcyBjbGljayBkZWxheSBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICAgICAgICAvLyBmb3IgYSBtb3JlIGFkdmFuY2VkIHNvbHV0aW9uIGNvbnNpZGVyIHNldHRpbmcgYGZhc3RDbGlja3NgIG9wdGlvbiB0byBmYWxzZVxuICAgICAgICAgICAgLy8gYW5kIHVzaW5nIGEgbGlicmFyeSBzdWNoIGFzIGZhc3RjbGljayAoaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2spXG4gICAgICAgICAgICB2YXIgZmFzdENsaWNrcyA9IGZ1bmN0aW9uKCRlbGVtZW50cykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50cy5vbigndG91Y2hzdGFydC5iYXJyYXRpbmcnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNsaWNrc1xuICAgICAgICAgICAgdmFyIGRpc2FibGVDbGlja3MgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub24oJ2NsaWNrLmJhcnJhdGluZycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgYXR0YWNoSGFuZGxlcnMgPSBmdW5jdGlvbigkZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAvLyBhdHRhY2ggY2xpY2sgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIGF0dGFjaENsaWNrSGFuZGxlcigkZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3ZlclN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dGFjaCBtb3VzZWVudGVyIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoTW91c2VFbnRlckhhbmRsZXIoJGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRhY2ggbW91c2VsZWF2ZSBldmVudCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaE1vdXNlTGVhdmVIYW5kbGVyKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGRldGFjaEhhbmRsZXJzID0gZnVuY3Rpb24oJGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGhhbmRsZXJzIGluIHRoZSBcIi5iYXJyYXRpbmdcIiBuYW1lc3BhY2VcbiAgICAgICAgICAgICAgICAkZWxlbWVudHMub2ZmKCcuYmFycmF0aW5nJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc2V0dXBIYW5kbGVycyA9IGZ1bmN0aW9uKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50cyA9IHNlbGYuJHdpZGdldC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFzdENsaWNrcykge1xuICAgICAgICAgICAgICAgICAgICBmYXN0Q2xpY2tzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaEhhbmRsZXJzKCRlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVDbGlja3MoJGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hIYW5kbGVycygkZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBvbmx5IG9uY2VcbiAgICAgICAgICAgICAgICBpZiAoZ2V0RGF0YSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyB3cmFwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3cmFwRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2F2ZSBkYXRhXG4gICAgICAgICAgICAgICAgc2F2ZURhdGFPbkVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGJ1aWxkICYgYXBwZW5kIHdpZGdldCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0ID0gYnVpbGRXaWRnZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLiR3aWRnZXQuaW5zZXJ0QWZ0ZXIoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcoKTtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc2VsZi5vcHRpb25zLnJlYWRvbmx5KTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNlbGVjdCBmaWVsZFxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGlkZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPT0gJ2Jvb2xlYW4nIHx8IGdldERhdGEoJ3JlYWRPbmx5JykgPT0gc3RhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHNldHVwSGFuZGxlcnMoc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JlYWRPbmx5Jywgc3RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuJHdpZGdldC50b2dnbGVDbGFzcygnYnItcmVhZG9ubHknKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGdldERhdGEoJ3VzZXJPcHRpb25zJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi4kZWxlbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgdmFsdWUgKyAnXCJdJykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZGF0YVxuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBzZWxmLiRlbGVtLmZpbmQoJ29wdGlvblt2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ01hZGUnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHNldFNlbGVjdEZpZWxkVmFsdWUocmF0aW5nVmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkUmF0aW5nKHJhdGluZ1RleHQoKSk7XG5cbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvblNlbGVjdCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGluZ1ZhbHVlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpbmdUZXh0KClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBvcmlnaW5hbCBkYXRhXG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nVmFsdWUnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1ZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHNldERhdGEoJ3JhdGluZ1RleHQnLCBnZXREYXRhKCdvcmlnaW5hbFJhdGluZ1RleHQnKSk7XG4gICAgICAgICAgICAgICAgc2V0RGF0YSgncmF0aW5nTWFkZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHJlc2V0U2VsZWN0RmllbGQoKTtcbiAgICAgICAgICAgICAgICBzaG93U2VsZWN0ZWRSYXRpbmcocmF0aW5nVGV4dCgpKTtcblxuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIG9uQ2xlYXIgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uQ2xlYXIuY2FsbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmF0aW5nVGV4dCgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJhdGluZ1ZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByYXRpbmdUZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBnZXREYXRhKCd1c2VyT3B0aW9ucycpO1xuXG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoIGhhbmRsZXJzXG4gICAgICAgICAgICAgICAgZGV0YWNoSGFuZGxlcnMoc2VsZi4kd2lkZ2V0LmZpbmQoJ2EnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgd2lkZ2V0XG4gICAgICAgICAgICAgICAgc2VsZi4kd2lkZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhdGFcbiAgICAgICAgICAgICAgICByZW1vdmVEYXRhT25FbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1bndyYXAgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB1bndyYXBFbGVtZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBvbkRlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9uRGVzdHJveS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgQmFyUmF0aW5nLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQuZm4uYmFycmF0aW5nLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gQmFyUmF0aW5nO1xuICAgIH0pKCk7XG5cbiAgICAkLmZuLmJhcnJhdGluZyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gbmV3IEJhclJhdGluZygpO1xuXG4gICAgICAgICAgICAvLyBwbHVnaW4gd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcignU29ycnksIHRoaXMgcGx1Z2luIG9ubHkgd29ya3Mgd2l0aCBzZWxlY3QgZmllbGRzLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtZXRob2Qgc3VwcGxpZWRcbiAgICAgICAgICAgIGlmIChwbHVnaW4uaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbi5pbml0KG9wdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdzaG93Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3cob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcGx1Z2luIGV4aXN0cz9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbi4kZWxlbS5kYXRhKCdiYXJyYXRpbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luLiR3aWRnZXQgPSAkKHRoaXMpLm5leHQoJy5ici13aWRnZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwbHVnaW5bbWV0aG9kXShvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gbWV0aG9kIHN1cHBsaWVkIG9yIG9ubHkgb3B0aW9ucyBzdXBwbGllZFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBwbHVnaW4uaW5pdChvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKCdNZXRob2QgJyArIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LmJhcnJhdGluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuZGVmYXVsdHMgPSB7XG4gICAgICAgIHRoZW1lOicnLFxuICAgICAgICBpbml0aWFsUmF0aW5nOm51bGwsIC8vIGluaXRpYWwgcmF0aW5nXG4gICAgICAgIGFsbG93RW1wdHk6bnVsbCwgLy8gYWxsb3cgZW1wdHkgcmF0aW5ncz9cbiAgICAgICAgZW1wdHlWYWx1ZTonJywgLy8gdGhpcyBpcyB0aGUgZXhwZWN0ZWQgdmFsdWUgb2YgdGhlIGVtcHR5IHJhdGluZ1xuICAgICAgICBzaG93VmFsdWVzOmZhbHNlLCAvLyBkaXNwbGF5IHJhdGluZyB2YWx1ZXMgb24gdGhlIGJhcnM/XG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzp0cnVlLCAvLyBhcHBlbmQgYSBkaXYgd2l0aCBhIHJhdGluZyB0byB0aGUgd2lkZ2V0P1xuICAgICAgICBkZXNlbGVjdGFibGU6dHJ1ZSwgLy8gYWxsb3cgdG8gZGVzZWxlY3QgcmF0aW5ncz9cbiAgICAgICAgcmV2ZXJzZTpmYWxzZSwgLy8gcmV2ZXJzZSB0aGUgcmF0aW5nP1xuICAgICAgICByZWFkb25seTpmYWxzZSwgLy8gbWFrZSB0aGUgcmF0aW5nIHJlYWR5LW9ubHk/XG4gICAgICAgIGZhc3RDbGlja3M6dHJ1ZSwgLy8gcmVtb3ZlIDMwMG1zIGNsaWNrIGRlbGF5IG9uIHRvdWNoIGRldmljZXM/XG4gICAgICAgIGhvdmVyU3RhdGU6dHJ1ZSwgLy8gY2hhbmdlIHN0YXRlIG9uIGhvdmVyP1xuICAgICAgICBzaWxlbnQ6ZmFsc2UsIC8vIHN1cHJlc3MgY2FsbGJhY2tzIHdoZW4gY29udHJvbGxpbmcgcmF0aW5ncyBwcm9ncmFtYXRpY2FsbHlcbiAgICAgICAgb25TZWxlY3Q6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0LCBldmVudCkge1xuICAgICAgICB9LCAvLyBjYWxsYmFjayBmaXJlZCB3aGVuIGEgcmF0aW5nIGlzIHNlbGVjdGVkXG4gICAgICAgIG9uQ2xlYXI6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0sIC8vIGNhbGxiYWNrIGZpcmVkIHdoZW4gYSByYXRpbmcgaXMgY2xlYXJlZFxuICAgICAgICBvbkRlc3Ryb3k6ZnVuY3Rpb24gKHZhbHVlLCB0ZXh0KSB7XG4gICAgICAgIH0gLy8gY2FsbGJhY2sgZmlyZWQgd2hlbiBhIHdpZGdldCBpcyBkZXN0cm95ZWRcbiAgICB9O1xuXG4gICAgJC5mbi5iYXJyYXRpbmcuQmFyUmF0aW5nID0gQmFyUmF0aW5nO1xuXG59KSk7XG4iLCIvLyBLUiBBUFAgSlMgRmlsZXNcbmltcG9ydCAnbnBtL2pxdWVyeS1iYXItcmF0aW5nL2pxdWVyeS5iYXJyYXRpbmcnO1xuaW1wb3J0ICducG0vaXMtbWFya2VyLWNsdXN0ZXJlcic7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9hcHAnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29tYm9yZWdpb24nO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvY29uZmlybSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9kb2JlbnRyeSc7XG5pbXBvcnQgJ21lZGlhanMvc2l0ZS9ndWVzdGRhdGEnO1xuaW1wb3J0ICdtZWRpYWpzL3NpdGUvbWFwJztcbmltcG9ydCAnbWVkaWFqcy9zaXRlL3JvdXRlJztcbi8vIGltcG9ydCAnLi9qcy9zcmMva3JhcHAvc3RyaXBlJzsiXSwibmFtZXMiOlsibGFuZyIsInNlYXJjaGRhdGEiLCJzZWFyY2hEb25lIiwiY2FsZW5kYXJMb2FkZWQiLCJzYXZlZHdpZHRoIiwibGFyZ2UiLCJyZXNpemVkIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJwcm90b2NvbCIsImhvc3QiLCJsaXZlc2l0ZSIsIiQiLCJGb3VuZGF0aW9uIiwiYWRkVG9KcXVlcnkiLCJkb2N1bWVudCIsImZvdW5kYXRpb24iLCJkYXRhIiwiY2hlY2tTY3JlZW5XaWR0aCIsIm9uIiwiYmFycyIsImxlbmd0aCIsImJhcnJhdGluZyIsInNob3dWYWx1ZXMiLCJzaG93U2VsZWN0ZWRSYXRpbmciLCJlIiwicHJldmVudERlZmF1bHQiLCIkZm9ybSIsImFqYXgiLCJ0eXBlIiwidXJsIiwiYXR0ciIsInNlcmlhbGl6ZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsInJlc3VsdCIsImZvcm1SZXNwb25zZSIsImhyZWYiLCJodG1sIiwibWVzc2FnZSIsIiRtb2RhbCIsIlJldmVhbCIsIm9wZW4iLCJlcnJvciIsInRyaWdnZXIiLCJtb2RhbGlkIiwidHJpbSIsImFqYXh1cmwiLCJjb250ZW50IiwiJHRoaXMiLCJhY3Rpb24iLCJlbGVtZW50IiwiZmluZCIsInJlbW92ZSIsInBhcmVudHMiLCJoaWRlIiwiJHRhcmdldCIsInRvZ2dsZUNsYXNzIiwidmFsMSIsInRleHQiLCJnZXRQcm9wZXJ0aWVzIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInBhcmVudCIsImNoaWxkcmVuIiwidG9nZ2xlIiwic2V0QWN0aXZlTWVudSIsIiR0YWJzIiwiZWFjaCIsInBpZCIsImxvYWRDYWxlbmRhciIsImV2ZW50Iiwic3BlY2lhbCIsInRvdWNoc3RhcnQiLCJzZXR1cCIsIl8iLCJucyIsImhhbmRsZSIsImluY2x1ZGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJ0b3VjaG1vdmUiLCJhcHBlbmQiLCJpZCIsImhhc093blByb3BlcnR5IiwicmVwbGFjZSIsInJlZGlyZWN0IiwiZmllbGQiLCJ2YWx1ZSIsInJlbG9hZCIsInNldFNlYXJjaERhdGEiLCJyZXNwb25zZSIsImVtcHR5IiwiZmFkZUluIiwiaGFzQ2xhc3MiLCJzaG93Iiwic2Nyb2xsVG8iLCJpdGVtIiwiYmFyIiwiaW5kZXgiLCJzY3JlZW5XaWR0aEhhc0NoYW5nZWQiLCJNZWRpYVF1ZXJ5IiwiYXRMZWFzdCIsImpRdWVyeSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwidGFyZ2V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhc2V0Iiwic2V0UmVnaW9uU2VsZWN0IiwidGhlbiIsIm9wdGlvbnMiLCJpIiwiT3B0aW9uIiwiVVJMU2VhcmNoUGFyYW1zIiwibWV0aG9kIiwiYm9keSIsImZldGNoIiwib2siLCJhbGVydCIsImpzb24iLCJjaGFuZ2VFdmVudCIsIkV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIm15Q29uZmlybSIsIktyY29uZmlybSIsImNvbnN0cnVjdG9yIiwiZm9ybSIsImluaXQiLCJ1cGRhdGVRdW90ZSIsInNlcmlhbGl6ZUFycmF5IiwiZGl2Iiwia2V5IiwidmFsIiwiJGVsZW1lbnQiLCJjaGVja1Rlcm1zIiwidGVzdCIsInRlc3RjIiwidGVzdHQiLCJhZ3JlZWNoZWNrIiwiY2hlY2tlZCIsImFncmVlY2hlY2tjIiwiYWdyZWVjaGVja3QiLCJteUtyRG9iRW50cnkiLCJ0b2RheSIsIkJBQ0tTUEFDRSIsInNldHRpbmdzIiwiY3VzdG9tX3ZhbGlkYXRpb24iLCJkYXlzX2luX21vbnRoIiwiZG9jdW1lbnRfZGF0ZSIsImVycm9yYm94X3giLCJlcnJvcmJveF95IiwiZmllbGRfaGludF90ZXh0X2RheSIsImZpZWxkX2hpbnRfdGV4dF9tb250aCIsImZpZWxkX2hpbnRfdGV4dF95ZWFyIiwiZmllbGRfb3JkZXIiLCJmaWVsZF93aWR0aF9kYXkiLCJmaWVsZF93aWR0aF9tb250aCIsImZpZWxkX3dpZHRoX3llYXIiLCJmaWVsZF93aWR0aF9zZXAiLCJtYXhfZGF0ZSIsIm1pbl95ZWFyIiwibW9udGhfbmFtZSIsIm9uX2JsdXIiLCJvbl9lcnJvciIsIm9uX2NoYW5nZSIsInBhcnNlX2RhdGUiLCJzZXBhcmF0b3IiLCJzaG93X2Vycm9ycyIsInNob3dfaGludHMiLCJFX0RBWV9OQU4iLCJFX0RBWV9UT09fQklHIiwiRV9EQVlfVE9PX1NNQUxMIiwiRV9CQURfREFZX0ZPUl9NT05USCIsIkVfTU9OVEhfTkFOIiwiRV9NT05USF9UT09fQklHIiwiRV9NT05USF9UT09fU01BTEwiLCJFX1lFQVJfTkFOIiwiRV9ZRUFSX0xFTkdUSCIsIkVfWUVBUl9UT09fU01BTEwiLCJFX01JTl9EQVRFIiwiRV9NQVhfREFURSIsIktyRG9iRW50cnkiLCJnZXRZbWQiLCJEYXRlIiwiaW5wdXRfZGF5IiwiaW5wdXRfbW9udGgiLCJpbnB1dF95ZWFyIiwiZXh0ZW5kIiwiZGF0ZSIsIm0iLCJnZXRNb250aCIsImQiLCJnZXREYXkiLCJnZXRGdWxsWWVhciIsImdldFltZE9iamVjdCIsInllYXIiLCJtb250aCIsImRheSIsImFkZEVudHJ5RmllbGRzIiwiZG9iZmllbGQiLCJmaWVsZHMiLCJzcGxpdCIsImJ1aWxkRmllbGQiLCJhZnRlclBhc3RlIiwicGFyc2VEYXRlIiwic2V0RGF0ZSIsIm5hbWUiLCJrcmRvYmVudHJ5IiwiaW5wdXQiLCJLckRvYklucHV0IiwiaGludF90ZXh0IiwiaW5uZXIiLCIkaW5wdXQiLCJidWlsZFVpIiwid3JhcHBlciIsIndyYXAiLCJlcnJvcmJveCIsInNldFRpbWVvdXQiLCJzZXRGaWVsZFdpZHRocyIsImNoZWNrRG9jdW1lbnQiLCJkb2IiLCJjaGlsZGRvYiIsImNsYXNzbmFtZSIsImVsZW1lbnRzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyIiwiY2xlYXJFcnJvciIsImVycm9yX3RleHQiLCJzaG93RXJyb3IiLCJkZXN0cm95IiwiY3NzIiwidW53cmFwIiwicmVtb3ZlRGF0YSIsImZvY3VzIiwic2V0Rm9jdXMiLCJmb2N1c0ZpZWxkQmVmb3JlIiwieWllbGRGb2N1cyIsImZvY3VzRmllbGRBZnRlciIsImZvY3VzSW4iLCJmb2N1c091dCIsInNlbGYiLCJ3aWRnZXRGb2N1c0xvc3QiLCJnZXREYXRlIiwiZGF5X3ZhbHVlIiwibW9udGhfdmFsdWUiLCJ5ZWFyX3ZhbHVlIiwicHJveHlMYWJlbENsaWNrcyIsInBhcnNlSXNvRGF0ZSIsIm1hdGNoIiwiUmVnRXhwIiwiJDMiLCIkMiIsIiQxIiwiY2xpY2siLCJuZXdfZGF0ZSIsInNldCIsInZhbGlkYXRlIiwic2V0RXJyb3IiLCJhdmFpbGFibGUiLCJ3aWR0aCIsInRvdGFsIiwic2V0V2lkdGgiLCJNYXRoIiwiZmxvb3IiLCJzZXRSZWFkb25seSIsIm1vZGUiLCJ1bmRlZmluZWQiLCJ3aWRnZXRFcnJvclRleHQiLCJ4X29mZnNldCIsIm91dGVyV2lkdGgiLCJ5X29mZnNldCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImN1cnJlbnRfaW5wdXQiLCJ2YWxpZGF0ZURheSIsInZhbGlkYXRlTW9udGgiLCJ2YWxpZGF0ZVllYXIiLCJ2YWxpZGF0ZURheXNJbk1vbnRoIiwidmFsaWRhdGVDb21wbGV0ZURhdGUiLCJkYXRlX3N0ciIsImRhdGVfb2JqIiwiZGF0ZV9pc28iLCJjYWxsIiwicGFyc2VJbnQiLCJvcHQiLCJnZXQiLCJoYXNfZm9jdXMiLCJudW0iLCJtYXgiLCJtc2ciLCJ0b1N0cmluZyIsImlzIiwib25CbHVyIiwicHJveHkiLCJibHVyIiwia2V5ZG93biIsImtleXVwIiwic2hvd19oaW50Iiwia2V5X2lzX2Rvd24iLCJwcm9wIiwiaXNEaWdpdEtleSIsImtleWNvZGUiLCJ3aGljaCIsIndhbnQiLCJuZXdfdmFsdWUiLCJzZWxlY3RfYWxsIiwic2VsZWN0IiwibmV3X3dpZHRoIiwicmVhZHkiLCJ0b3RhbEd1ZXN0cyIsImNoYW5nZVBhcnR5U2l6ZSIsImhvd3RvYXJyaXZlIiwiYXJyaXZhbG1lYW5zIiwiZ2V0QXR0cmlidXRlIiwiZGlzcGxheUFycml2YWwiLCJndWVzdHMiLCJudW1BZHVsdHMiLCIkaW5wdXRDaGlsZCIsIm51bUNoaWxkcmVuIiwibWF4Q2hpbGRyZW4iLCIkaG9sZGVyIiwibGFzdCIsImRpZmZlcmVuY2UiLCJleGlzdGluZyIsImNyZWF0ZU5ld0FnZUZpZWxkIiwibm93IiwiY291bnQiLCIkanNkYXRhIiwiY2hpbGRNaW5BZ2UiLCJjaGlsZE1heEFnZSIsIm5ld2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJ4IiwiY2xhc3NMaXN0IiwiYXJyaXZhbGRhdGEiLCJhZGQiLCJtYXJrZXJzaGFwZSIsImNvb3JkcyIsIm15S3JtYXAiLCJtYXBEYXRhIiwibWFwIiwibWFwWm9vbSIsImluZm9XaW5kb3ciLCJpbmZvV2luZG93MiIsImJvdW5kcyIsInByb3BlcnR5ZGl2IiwicHJvcGVydHlpY29uIiwibWMiLCJwcm9wZXJ0eU1hcmtlcnMiLCJmaWx0ZXJJZHMiLCJtYXBNYXJrZXJzIiwibWFwVHlwZUlkIiwibWFwTWF4Wm9vbSIsIm1hcFR5cGUiLCJtYXBJZCIsIm1hcmtlckNvbG9yIiwiS3JtYXAiLCJnbU9wdGlvbnMiLCJzY3JvbGx3aGVlbCIsInpvb20iLCJtYXhab29tIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJnbWFya2VycyIsImluaXRNYXAiLCJjbG9zZUtySW5mb3dpbmRvdyIsImNsb3NlIiwic2hvd1Zpc2libGVNYXJrZXJzIiwibWFya2VycyIsImdldEJvdW5kcyIsIm1hcmtlciIsImNvbnRhaW5zIiwiZ2V0UG9zaXRpb24iLCJzZXRWaXNpYmxlIiwiY2hlY2tEdXBsaWNhdGUiLCJjdXJyZW50IiwiZHVwcyIsInBvcyIsImVxdWFscyIsImEiLCJuZXdMYXQiLCJsYXQiLCJjb3MiLCJQSSIsIm5ld0xuZyIsImxuZyIsInNpbiIsImdvb2dsZSIsIm1hcHMiLCJMYXRMbmciLCJjaGVja1pvb20iLCJteWxpc3RlbmVyIiwiYWRkTGlzdGVuZXIiLCJjdXJyZW50Wm9vbSIsImdldFpvb20iLCJzZXRab29tIiwiY2x1c3Rlck1hcCIsIm1jT3B0aW9ucyIsImdyaWRTaXplIiwiaW1hZ2VQYXRoIiwiaWdub3JlSGlkZGVuTWFya2VycyIsInNldFByb3BlcnR5TWFya2VycyIsInNldE1hcE1hcmtlcnMiLCJNYXJrZXJDbHVzdGVyZXIiLCJmaXRCb3VuZHMiLCJjcmVhdGVNYXAiLCJNYXAiLCJJbmZvV2luZG93IiwiTGF0TG5nQm91bmRzIiwiY3JlYXRlTWFwTWFya2VyIiwicG9pbnQiLCJpbWFnZSIsImJveGluZm8iLCJsaW5rIiwidGl0bGUiLCJNYXJrZXIiLCJzaGFwZSIsImljb24iLCJ6SW5kZXgiLCJzZXRDb250ZW50IiwicHVzaCIsImNyZWF0ZVByb3BlcnR5TWFya2VyIiwiY29sb3IiLCJub3QiLCJzbGljayIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImF1dG9wbGF5Iiwic29sb01hcCIsInJlZnJlc2hNYXAiLCIkbWFwbW9kYWwiLCJyZXBhaW50IiwicmVzZXRNYXAiLCJhbWFyayIsIm1hcmtlcmljb24iLCJzaXplIiwiU2l6ZSIsIlBvaW50IiwiYW5jaG9yIiwibXlMaXN0ZW5lciIsImZvdW5kIiwia2lja01hcCIsImhlaWdodCIsIm1hcF9tb2RhbCIsIiRzb2xvVHJpZ2dlciIsIm9uZSIsImluZGV4T2YiLCIkdHJpZ2dlciIsIiRlbGVtIiwibXlLcnJvdXRlIiwiZGlyZWN0aW9uc0Rpc3BsYXkiLCJkaXJlY3Rpb25zVmlzaWJsZSIsInJvdXRlTWFwIiwiZGVzdGluYXRpb24iLCJyb3V0ZU1hcmtlcnMiLCJyb3V0ZVN0b3BQb2ludHMiLCJkZXRvdXIiLCJkaXJlY3Rpb25zUGFuZWwiLCJkaXJlY3Rpb25zU2VydmljZSIsIktycm91dGUiLCJEaXJlY3Rpb25zU2VydmljZSIsImNsZWFyUm91dGVNYXJrZXJzIiwic2V0TWFwIiwiY2xlYXJXYXlwb2ludHMiLCJhZGRSb3V0ZU1hcmtlciIsImxhdGxuZyIsImNhbGNSb3V0ZSIsImZyb21fYWRkcmVzcyIsIkRpcmVjdGlvbnNUcmF2ZWxNb2RlIiwiQklDWUNMSU5HIiwiRFJJVklORyIsIldBTEtJTkciLCJyZXF1ZXN0Iiwid2F5cG9pbnRzIiwidHJhdmVsTW9kZSIsImF2b2lkSGlnaHdheXMiLCJhdm9pZFRvbGxzIiwicm91dGUiLCJzdGF0dXMiLCJEaXJlY3Rpb25zU3RhdHVzIiwiT0siLCJzZXREaXJlY3Rpb25zIiwicmVzZXRSb3V0ZSIsIm15T3B0aW9ucyIsImNlbnRlciIsIkRpcmVjdGlvbnNSZW5kZXJlciIsInNldFBhbmVsIiwiTWFya2VySW1hZ2UiLCJsYXRMbmciLCJzdG9wb3ZlciIsImFkZExpc3RlbmVyT25jZSIsImRpcmVjdGlvblBhbmVsIiwiYWRkcmVzc1N0cmluZyIsImNvb3JkIiwiYWRkcmVzcyIsImpzb25kYXRhIiwibXlHbWFwIiwib3B0X21hcmtlcnMiLCJvcHRfb3B0aW9ucyIsIk92ZXJsYXlWaWV3IiwibWFwXyIsIm1hcmtlcnNfIiwiY2x1c3RlcnNfIiwic2l6ZXMiLCJzdHlsZXNfIiwicmVhZHlfIiwiZ3JpZFNpemVfIiwibWluQ2x1c3RlclNpemVfIiwibWF4Wm9vbV8iLCJpbWFnZVBhdGhfIiwiTUFSS0VSX0NMVVNURVJfSU1BR0VfUEFUSF8iLCJpbWFnZUV4dGVuc2lvbl8iLCJNQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT05fIiwiem9vbU9uQ2xpY2tfIiwiYXZlcmFnZUNlbnRlcl8iLCJzZXR1cFN0eWxlc18iLCJwcmV2Wm9vbV8iLCJ0aGF0IiwicmVzZXRWaWV3cG9ydCIsInJlZHJhdyIsImFkZE1hcmtlcnMiLCJwcm90b3R5cGUiLCJvYmoxIiwib2JqMiIsIm9iamVjdCIsInByb3BlcnR5IiwiYXBwbHkiLCJvbkFkZCIsInNldFJlYWR5XyIsImRyYXciLCJmaXRNYXBUb01hcmtlcnMiLCJnZXRNYXJrZXJzIiwic2V0U3R5bGVzIiwic3R5bGVzIiwiZ2V0U3R5bGVzIiwiaXNab29tT25DbGljayIsImlzQXZlcmFnZUNlbnRlciIsImdldFRvdGFsTWFya2VycyIsInNldE1heFpvb20iLCJnZXRNYXhab29tIiwiY2FsY3VsYXRvcl8iLCJudW1TdHlsZXMiLCJkdiIsIm1pbiIsInNldENhbGN1bGF0b3IiLCJjYWxjdWxhdG9yIiwiZ2V0Q2FsY3VsYXRvciIsIm9wdF9ub2RyYXciLCJwdXNoTWFya2VyVG9fIiwiaXNBZGRlZCIsImFkZE1hcmtlciIsInJlbW92ZU1hcmtlcl8iLCJzcGxpY2UiLCJyZW1vdmVNYXJrZXIiLCJyZW1vdmVkIiwicmVtb3ZlTWFya2VycyIsInIiLCJjcmVhdGVDbHVzdGVyc18iLCJnZXRUb3RhbENsdXN0ZXJzIiwiZ2V0TWFwIiwiZ2V0R3JpZFNpemUiLCJzZXRHcmlkU2l6ZSIsImdldE1pbkNsdXN0ZXJTaXplIiwic2V0TWluQ2x1c3RlclNpemUiLCJnZXRFeHRlbmRlZEJvdW5kcyIsInByb2plY3Rpb24iLCJnZXRQcm9qZWN0aW9uIiwidHIiLCJnZXROb3J0aEVhc3QiLCJibCIsImdldFNvdXRoV2VzdCIsInRyUGl4IiwiZnJvbUxhdExuZ1RvRGl2UGl4ZWwiLCJ5IiwiYmxQaXgiLCJuZSIsImZyb21EaXZQaXhlbFRvTGF0TG5nIiwic3ciLCJpc01hcmtlckluQm91bmRzXyIsImNsZWFyTWFya2VycyIsIm9wdF9oaWRlIiwiY2x1c3RlciIsIm9sZENsdXN0ZXJzIiwic2xpY2UiLCJkaXN0YW5jZUJldHdlZW5Qb2ludHNfIiwicDEiLCJwMiIsIlIiLCJkTGF0IiwiZExvbiIsImMiLCJhdGFuMiIsInNxcnQiLCJhZGRUb0Nsb3Nlc3RDbHVzdGVyXyIsImRpc3RhbmNlIiwiY2x1c3RlclRvQWRkVG8iLCJnZXRDZW50ZXIiLCJpc01hcmtlckluQ2x1c3RlckJvdW5kcyIsIkNsdXN0ZXIiLCJtYXBCb3VuZHMiLCJtYXJrZXJDbHVzdGVyZXIiLCJtYXJrZXJDbHVzdGVyZXJfIiwiY2VudGVyXyIsImJvdW5kc18iLCJjbHVzdGVySWNvbl8iLCJDbHVzdGVySWNvbiIsImlzTWFya2VyQWxyZWFkeUFkZGVkIiwiY2FsY3VsYXRlQm91bmRzXyIsImwiLCJsZW4iLCJ1cGRhdGVJY29uIiwiZ2V0TWFya2VyQ2x1c3RlcmVyIiwiZ2V0U2l6ZSIsIm16Iiwic3VtcyIsInNldENlbnRlciIsInNldFN1bXMiLCJvcHRfcGFkZGluZyIsInBhZGRpbmdfIiwiY2x1c3Rlcl8iLCJkaXZfIiwic3Vtc18iLCJ2aXNpYmxlXyIsInRyaWdnZXJDbHVzdGVyQ2xpY2siLCJnZXRQb3NGcm9tTGF0TG5nXyIsImNzc1RleHQiLCJjcmVhdGVDc3MiLCJpbm5lckhUTUwiLCJwYW5lcyIsImdldFBhbmVzIiwib3ZlcmxheU1vdXNlVGFyZ2V0IiwiYXBwZW5kQ2hpbGQiLCJhZGREb21MaXN0ZW5lciIsIndpZHRoXyIsImhlaWdodF8iLCJvblJlbW92ZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInRleHRfIiwiaW5kZXhfIiwidXNlU3R5bGUiLCJ1cmxfIiwidGV4dENvbG9yXyIsImFuY2hvcl8iLCJ0ZXh0U2l6ZV8iLCJmb250RmFtaWx5XyIsImZvbnRXZWlnaHRfIiwiYmFja2dyb3VuZFBvc2l0aW9uXyIsImJhY2tncm91bmRQb3NpdGlvbiIsInR4dENvbG9yIiwidHh0U2l6ZSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0Iiwiam9pbiIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwicmVxdWlyZSIsIkJhclJhdGluZyIsIndyYXBFbGVtZW50IiwiY2xhc3NlcyIsInRoZW1lIiwidW53cmFwRWxlbWVudCIsImZpbmRPcHRpb24iLCJpc051bWVyaWMiLCJnZXRJbml0aWFsT3B0aW9uIiwiaW5pdGlhbFJhdGluZyIsImdldEVtcHR5T3B0aW9uIiwiJGVtcHR5T3B0IiwiZW1wdHlWYWx1ZSIsImFsbG93RW1wdHkiLCJwcmVwZW5kVG8iLCJnZXREYXRhIiwic2V0RGF0YSIsInNhdmVEYXRhT25FbGVtZW50IiwiJG9wdCIsImVtcHR5VGV4dCIsInVzZXJPcHRpb25zIiwicmF0aW5nVmFsdWUiLCJyYXRpbmdUZXh0Iiwib3JpZ2luYWxSYXRpbmdWYWx1ZSIsIm9yaWdpbmFsUmF0aW5nVGV4dCIsImVtcHR5UmF0aW5nVmFsdWUiLCJlbXB0eVJhdGluZ1RleHQiLCJyZWFkT25seSIsInJlYWRvbmx5IiwicmF0aW5nTWFkZSIsInJlbW92ZURhdGFPbkVsZW1lbnQiLCJidWlsZFdpZGdldCIsIiR3IiwiJGEiLCJyZXZlcnNlIiwibmV4dEFsbG9yUHJldmlvdXNBbGwiLCJzZXRTZWxlY3RGaWVsZFZhbHVlIiwiY2hhbmdlIiwicmVzZXRTZWxlY3RGaWVsZCIsImRlZmF1bHRTZWxlY3RlZCIsImZyYWN0aW9uIiwicm91bmQiLCJyZXNldFN0eWxlIiwiJHdpZGdldCIsImFwcGx5U3R5bGUiLCJiYXNlVmFsdWUiLCJmIiwiJGFsbCIsIiRmcmFjdGlvbmFsIiwiaXNEZXNlbGVjdGFibGUiLCJkZXNlbGVjdGFibGUiLCJhdHRhY2hDbGlja0hhbmRsZXIiLCIkZWxlbWVudHMiLCJvblNlbGVjdCIsImF0dGFjaE1vdXNlRW50ZXJIYW5kbGVyIiwiYXR0YWNoTW91c2VMZWF2ZUhhbmRsZXIiLCJmYXN0Q2xpY2tzIiwic3RvcFByb3BhZ2F0aW9uIiwiZGlzYWJsZUNsaWNrcyIsImF0dGFjaEhhbmRsZXJzIiwiaG92ZXJTdGF0ZSIsImRldGFjaEhhbmRsZXJzIiwib2ZmIiwic2V0dXBIYW5kbGVycyIsImluc2VydEFmdGVyIiwic3RhdGUiLCJzaWxlbnQiLCJvbkNsZWFyIiwib25EZXN0cm95IiwiZWxlbSIsImZuIiwiZGVmYXVsdHMiLCJwbHVnaW4iLCJuZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==