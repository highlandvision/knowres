/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.host;
}

(function ($) {
	let myKrDobEntry;
	let today;
	let key = {BACKSPACE: 8};

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
		minmax:                '',
		min_date:              false,
		max_date:              false,
		min_year:              1910,
		month_name:            [
			'January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August', 'September',
			'October', 'November', 'December'],
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
		E_MIN_DATE:            'Date must not be in the past',
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

			return (date.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d);
		}

		static getYmdObject(date) {
			return (date.year + '-' + date.month + '-' + date.day);
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
					default :
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
				hint_text:  settings.show_hints ? settings['field_hint_text_' + name] : null,
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
				return
			}
			this.fields[index].yieldFocus();
			this.fields[index - 1].setFocus(true);
			// let next = this.fields[index - 1];
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
			return (this.day_value && this.month_value && this.year_value)
			       ? {day: this.day_value, month: this.month_value, year: this.year_value}
			       : null;
		}

		init() {
			if (!settings.min_year)
				settings.min_year = '1910';

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
			let total = settings.field_width_year + settings.field_width_sep + settings.field_width_month +
				settings.field_width_sep + settings.field_width_day;
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
				let x_offset = (this.inner.outerWidth() + settings.errorbox_x) + 'px';
				let y_offset = settings.errorbox_y + 'px';
				this.errorbox.css({display: 'block', position: 'absolute', top: y_offset, left: x_offset});
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
			settings.minmax = this.$element.data('validation');

			if (settings.minmax === 'max') {
				if (date_iso > today) {
					throw(settings.E_MAX_DATE);
				}
			}
			if (settings.minmax === 'min') {
				if (date_iso < today) {
					throw(settings.E_MIN_DATE);
				}
			}

			// let max_date = settings.max_date;
			// if (typeof max_date === 'function') {
			// 	max_date = max_date.call(this);
			// }
			// if (typeof max_date === 'string') {
			// 	max_date = this.parseDate(max_date);
			// }
			// if (max_date) {
			// 	if (date_iso > settings.max_date) {
			// 		throw(settings.E_MAX_DATE);
			// 	}
			// }

			if (this.custom_validation) {
				date_obj.date = new Date(
					parseInt(date_obj.year, 10),
					parseInt(date_obj.month, 10) - 1,
					parseInt(date_obj.day, 10)
				);
				this.custom_validation(date_obj);
			}
		}

		validateDay() {
			let opt = settings;
			let input = this.input_day;
			this.day_value = undefined;
			let text = input.get();
			if (text === '' || (text === '0' && input.has_focus)) {
				return;
			}
			if (text.match(/\D/)) {
				throw(opt.E_DAY_NAN);
			}
			let num = parseInt(text, 10);
			if (num < 1) {
				throw(opt.E_DAY_TOO_SMALL);
			}
			if (num > 31) {
				throw(opt.E_DAY_TOO_BIG);
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
				throw(msg.replace(/%d/, max.toString()).replace(/%m/, settings.month_name[month - 1]));
			}
		}

		validateMonth() {
			let input = this.input_month;
			this.month_value = undefined;
			let text = input.get();
			if (text === '' || (text === '0' && input.has_focus)) {
				return;
			}
			if (text.match(/\D/)) {
				throw(settings.E_MONTH_NAN);
			}
			let num = parseInt(text, 10);
			if (num < 1) {
				throw(settings.E_MONTH_TOO_SMALL);
			}
			if (num > 12) {
				throw(settings.E_MONTH_TOO_BIG);
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
			if (text === '' || (text === '0' && input.has_focus)) {
				return;
			}
			if (text.match(/\D/)) {
				throw(settings.E_YEAR_NAN);
			}
			if (input.has_focus) {
				if (text.length > 4) {
					throw(settings.E_YEAR_LENGTH);
				}
			} else {
				if (text.length !== 4) {
					throw(settings.E_YEAR_LENGTH);
				}
			}
			if (text.length === 4) {
				const num = parseInt(text, 10);
				if (settings.min_year && num < settings.min_year) {
					throw(settings.E_YEAR_TOO_SMALL.replace(/%y/, settings.min_year));
				}
			}
			this.year_value = text;
		}

		widgetErrorText() {
			let error_text = '';
			$.each(this.fields, function (i, input) {
				if (input.error_text) {
					if (input.has_focus || error_text === '') {
						error_text = input.error_text
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
				}, 2)
			}).keyup(function (e) {
				setTimeout(function () {
					input.keyup(e);
				}, 2)
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
			}
			// Handle Backspace - shifting focus to previous field if required
			let keycode = e.which;
			if (keycode === key.BACKSPACE && this.empty) {
				return this.dobfield.focusFieldBefore(this);
			}
			let text = this.get();
			this.empty = text === '';

			// Trap and discard separator characters - advancing focus if required
			if (text.match(/[\/\\. -]/)) {
				text = text.replace(/[\/\\. -]/, '');
				this.set(text);
				if (!this.empty && this.index < 2) {
					this.dobfield.focusFieldAfter(this);
				}
			}

			// Advance focus if this field is both valid and full
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
			if (this.get() === '' && typeof (this.hint_text) === 'string') {
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
}(jQuery));