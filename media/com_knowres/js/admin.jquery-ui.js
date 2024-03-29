// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file "LICENSE.txt" for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	return typeof obj;
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
/*! jQuery UI - v1.11.1 - 2014-10-09
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, sortable.js, datepicker.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */


(function (e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (e) {
	function t(t, s) {
		var n,
		    a,
		    o,
		    r = t.nodeName.toLowerCase();
		return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t);
	}

	function i(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
			return "hidden" === e.css(this, "visibility");
		}).length;
	}

	function s(e) {
		for (var t, i; e.length && e[0] !== document;) {
			if (t = e.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
			e = e.parent();
		}

		return 0;
	}

	function n() {
		this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
			closeText:   "Done",
			prevText:    "Prev",
			nextText:    "Next",
			currentText: "Today",
			// monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNames:         ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			monthNamesShort:    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames:           ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort:      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin:        ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader:         "Wk",
			dateFormat:         "mm/dd/yy",
			firstDay:           0,
			isRTL:              !1,
			showMonthAfterYear: !1,
			yearSuffix:         ""
		}, this._defaults = {
			showOn:                 "focus",
			showAnim:               "fadeIn",
			showOptions:            {},
			defaultDate:            null,
			appendText:             "",
			buttonText:             "...",
			buttonImage:            "",
			buttonImageOnly:        !1,
			hideIfNoPrevNext:       !1,
			navigationAsDateFormat: !1,
			gotoCurrent:            !1,
			changeMonth:            !1,
			changeYear:             !1,
			yearRange:              "c-10:c+10",
			showOtherMonths:        !1,
			selectOtherMonths:      !1,
			showWeek:               !1,
			calculateWeek:          this.iso8601Week,
			shortYearCutoff:        "+10",
			minDate:                null,
			maxDate:                null,
			duration:               "fast",
			beforeShowDay:          null,
			beforeShow:             null,
			onSelect:               null,
			onChangeMonthYear:      null,
			onClose:                null,
			numberOfMonths:         1,
			showCurrentAtPos:       0,
			stepMonths:             1,
			stepBigMonths:          12,
			altField:               "",
			altFormat:              "",
			constrainInput:         !0,
			showButtonPanel:        !1,
			autoSize:               !1,
			disabled:               !1
		}, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = a(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
	}

	function a(t) {
		var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return t.delegate(i, "mouseout", function () {
			e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover");
		}).delegate(i, "mouseover", o);
	}
	function o() {
		e.datepicker._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"));
	}
	function r(t, i) {
		e.extend(t, i);

		for (var s in i) {
			null == i[s] && (t[s] = i[s]);
		}

		return t;
	}

	e.ui = e.ui || {}, e.extend(e.ui, {
		version: "1.11.1",
		keyCode: {
			BACKSPACE: 8,
			COMMA:     188,
			DELETE:    46,
			DOWN:      40,
			END:       35,
			ENTER:     13,
			ESCAPE:    27,
			HOME:      36,
			LEFT:      37,
			PAGE_DOWN: 34,
			PAGE_UP:   33,
			PERIOD:    190,
			RIGHT:     39,
			SPACE:     32,
			TAB:       9,
			UP:        38
		}
	}), e.fn.extend({
		scrollParent:   function scrollParent(t) {
			var i = this.css("position"),
			    s = "absolute" === i,
			    n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			    a = this.parents().filter(function () {
				    var t = e(this);
				    return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
			    }).eq(0);
			return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document);
		},
		uniqueId:       function () {
			var e = 0;
			return function () {
				return this.each(function () {
					this.id || (this.id = "ui-id-" + ++e);
				});
			};
		}(),
		removeUniqueId: function removeUniqueId() {
			return this.each(function () {
				/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");
			});
		}
	}), e.extend(e.expr[":"], {
		data:      e.expr.createPseudo ? e.expr.createPseudo(function (t) {
			return function (i) {
				return !!e.data(i, t);
			};
		}) : function (t, i, s) {
			return !!e.data(t, s[3]);
		},
		focusable: function focusable(i) {
			return t(i, !isNaN(e.attr(i, "tabindex")));
		},
		tabbable:  function tabbable(i) {
			var s = e.attr(i, "tabindex"),
			    n = isNaN(s);
			return (n || s >= 0) && t(i, !n);
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (t, i) {
		function s(t, i, s, a) {
			return e.each(n, function () {
				i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
			}), i;
		}

		var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
		    a = i.toLowerCase(),
		    o = {
			    innerWidth:  e.fn.innerWidth,
			    innerHeight: e.fn.innerHeight,
			    outerWidth:  e.fn.outerWidth,
			    outerHeight: e.fn.outerHeight
		    };
		e.fn["inner" + i] = function (t) {
			return void 0 === t ? o["inner" + i].call(this) : this.each(function () {
				e(this).css(a, s(this, t) + "px");
			});
		}, e.fn["outer" + i] = function (t, n) {
			return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function () {
				e(this).css(a, s(this, t, !0, n) + "px");
			});
		};
	}), e.fn.addBack || (e.fn.addBack = function (e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
		return function (i) {
			return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
		};
	}(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
		focus:            function (t) {
			return function (i, s) {
				return "number" == typeof i ? this.each(function () {
					var t = this;
					setTimeout(function () {
						e(t).focus(), s && s.call(t);
					}, i);
				}) : t.apply(this, arguments);
			};
		}(e.fn.focus),
		disableSelection: function () {
			var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function () {
				return this.bind(e + ".ui-disableSelection", function (e) {
					e.preventDefault();
				});
			};
		}(),
		enableSelection:  function enableSelection() {
			return this.unbind(".ui-disableSelection");
		},
		zIndex:           function zIndex(t) {
			if (void 0 !== t) return this.css("zIndex", t);
			if (this.length) for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
				if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
				n = n.parent();
			}
			return 0;
		}
	}), e.ui.plugin = {
		add:  function add(t, i, s) {
			var n,
			    a = e.ui[t].prototype;

			for (n in s) {
				a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]]);
			}
		},
		call: function call(e, t, i, s) {
			var n,
			    a = e.plugins[t];
			if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (n = 0; a.length > n; n++) {
				e.options[a[n][0]] && a[n][1].apply(e.element, i);
			}
		}
	};
	var h = 0,
	    l = Array.prototype.slice;
	e.cleanData = function (t) {
		return function (i) {
			var s, n, a;

			for (a = 0; null != (n = i[a]); a++) {
				try {
					s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove");
				} catch (o) {}
			}

			t(i);
		};
	}(e.cleanData), e.widget = function (t, i, s) {
		var n,
		    a,
		    o,
		    r,
		    h = {},
		    l = t.split(".")[0];
		return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function (t) {
			return !!e.data(t, n);
		}, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function (e, t) {
			return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t);
		}, e.extend(o, a, {
			version:            s.version,
			_proto:             e.extend({}, s),
			_childConstructors: []
		}), r = new i(), r.options = e.widget.extend({}, r.options), e.each(s, function (t, s) {
			return e.isFunction(s) ? (h[t] = function () {
				var e = function e() {
					    return i.prototype[t].apply(this, arguments);
				    },
				    n = function n(e) {
					    return i.prototype[t].apply(this, e);
				    };

				return function () {
					var t,
					    i = this._super,
					    a = this._superApply;
					return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t;
				};
			}(), void 0) : (h[t] = s, void 0);
		}), o.prototype = e.widget.extend(r, {
			widgetEventPrefix: a ? r.widgetEventPrefix || t : t
		}, h, {
			constructor:    o,
			namespace:      l,
			widgetName:     t,
			widgetFullName: n
		}), a ? (e.each(a._childConstructors, function (t, i) {
			var s = i.prototype;
			e.widget(s.namespace + "." + s.widgetName, o, i._proto);
		}), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o;
	}, e.widget.extend = function (t) {
		for (var i, s, n = l.call(arguments, 1), a = 0, o = n.length; o > a; a++) {
			for (i in n[a]) {
				s = n[a][i], n[a].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
			}
		}

		return t;
	}, e.widget.bridge = function (t, i) {
		var s = i.prototype.widgetFullName || t;

		e.fn[t] = function (n) {
			var a = "string" == typeof n,
			    o = l.call(arguments, 1),
			    r = this;
			return n = !a && o.length ? e.widget.extend.apply(null, [n].concat(o)) : n, a ? this.each(function () {
				var i,
				    a = e.data(this, s);
				return "instance" === n ? (r = a, !1) : a ? e.isFunction(a[n]) && "_" !== n.charAt(0) ? (i = a[n].apply(a, o), i !== a && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + n + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + n + "'");
			}) : this.each(function () {
				var t = e.data(this, s);
				t ? (t.option(n || {}), t._init && t._init()) : e.data(this, s, new i(n, this));
			}), r;
		};
	}, e.Widget = function () {
	}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName:          "widget",
		widgetEventPrefix:   "",
		defaultElement:      "<div>",
		options:             {
			disabled: !1,
			create:   null
		},
		_createWidget:       function _createWidget(t, i) {
			i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = h++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function remove(e) {
					e.target === i && this.destroy();
				}
			}), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
		},
		_getCreateOptions:   e.noop,
		_getCreateEventData: e.noop,
		_create:             e.noop,
		_init:               e.noop,
		destroy:             function destroy() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");
		},
		_destroy:            e.noop,
		widget:              function widget() {
			return this.element;
		},
		option:              function option(t, i) {
			var s,
			    n,
			    a,
			    o = t;
			if (0 === arguments.length) return e.widget.extend({}, this.options);
			if ("string" == typeof t) if (o = {}, s = t.split("."), t = s.shift(), s.length) {
				for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) {
					n[s[a]] = n[s[a]] || {}, n = n[s[a]];
				}

				if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
				n[t] = i;
			} else {
				if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
				o[t] = i;
			}
			return this._setOptions(o), this;
		},
		_setOptions:         function _setOptions(e) {
			var t;

			for (t in e) {
				this._setOption(t, e[t]);
			}

			return this;
		},
		_setOption:          function _setOption(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this;
		},
		enable:              function enable() {
			return this._setOptions({
				disabled: !1
			});
		},
		disable:             function disable() {
			return this._setOptions({
				disabled: !0
			});
		},
		_on:                 function _on(t, i, s) {
			var n,
			    a = this;
			"boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function (s, o) {
				function r() {
					return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0;
				}

				"string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
				var h = s.match(/^([\w:-]*)\s*(.*)$/),
				    l = h[1] + a.eventNamespace,
				    u = h[2];
				u ? n.delegate(u, l, r) : i.bind(l, r);
			});
		},
		_off:                function _off(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t);
		},
		_delay:              function _delay(e, t) {
			function i() {
				return ("string" == typeof e ? s[e] : e).apply(s, arguments);
			}

			var s = this;
			return setTimeout(i, t || 0);
		},
		_hoverable:          function _hoverable(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function mouseenter(t) {
					e(t.currentTarget).addClass("ui-state-hover");
				},
				mouseleave: function mouseleave(t) {
					e(t.currentTarget).removeClass("ui-state-hover");
				}
			});
		},
		_focusable:          function _focusable(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin:  function focusin(t) {
					e(t.currentTarget).addClass("ui-state-focus");
				},
				focusout: function focusout(t) {
					e(t.currentTarget).removeClass("ui-state-focus");
				}
			});
		},
		_trigger:            function _trigger(t, i, s) {
			var n,
			    a,
			    o = this.options[t];
			if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent) for (n in a) {
				n in i || (i[n] = a[n]);
			}
			return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function (t, i) {
		e.Widget.prototype["_" + t] = function (s, n, a) {
			"string" == typeof n && (n = {
				effect: n
			});
			var o,
			    r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
			n = n || {}, "number" == typeof n && (n = {
				duration: n
			}), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) {
				e(this)[t](), a && a.call(s[0]), i();
			});
		};
	}), e.widget;
	var u = !1;
	e(document).mouseup(function () {
		u = !1;
	}), e.widget("ui.mouse", {
		version:           "1.11.1",
		options:           {
			cancel:   "input,textarea,button,select,option",
			distance: 1,
			delay:    0
		},
		_mouseInit:        function _mouseInit() {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function (e) {
				return t._mouseDown(e);
			}).bind("click." + this.widgetName, function (i) {
				return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0;
			}), this.started = !1;
		},
		_mouseDestroy:     function _mouseDestroy() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		},
		_mouseDown:        function _mouseDown(t) {
			if (!u) {
				this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
				var i = this,
				    s = 1 === t.which,
				    n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
				return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
					i.mouseDelayMet = !0;
				}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
					return i._mouseMove(e);
				}, this._mouseUpDelegate = function (e) {
					return i._mouseUp(e);
				}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), u = !0, !0)) : !0;
			}
		},
		_mouseMove:        function _mouseMove(t) {
			return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : t.which ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t);
		},
		_mouseUp:          function _mouseUp(t) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), u = !1, !1;
		},
		_mouseDistanceMet: function _mouseDistanceMet(e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;
		},
		_mouseDelayMet:    function _mouseDelayMet() {
			return this.mouseDelayMet;
		},
		_mouseStart:       function _mouseStart() {
		},
		_mouseDrag:        function _mouseDrag() {
		},
		_mouseStop:        function _mouseStop() {
		},
		_mouseCapture:     function _mouseCapture() {
			return !0;
		}
	}), function () {
		function t(e, t, i) {
			return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)];
		}

		function i(t, i) {
			return parseInt(e.css(t, i), 10) || 0;
		}

		function s(t) {
			var i = t[0];
			return 9 === i.nodeType ? {
				width:  t.width(),
				height: t.height(),
				offset: {
					top:  0,
					left: 0
				}
			} : e.isWindow(i) ? {
				width:  t.width(),
				height: t.height(),
				offset: {
					top:  t.scrollTop(),
					left: t.scrollLeft()
				}
			} : i.preventDefault ? {
				width:  0,
				height: 0,
				offset: {
					top:  i.pageY,
					left: i.pageX
				}
			} : {
				width:  t.outerWidth(),
				height: t.outerHeight(),
				offset: t.offset()
			};
		}

		e.ui = e.ui || {};
		var n,
		    a,
		    o = Math.max,
		    r = Math.abs,
		    h = Math.round,
		    l = /left|center|right/,
		    u = /top|center|bottom/,
		    d = /[\+\-]\d+(\.[\d]+)?%?/,
		    c = /^\w+/,
		    p = /%$/,
		    f = e.fn.position;
		e.position = {
			scrollbarWidth: function scrollbarWidth() {
				if (void 0 !== n) return n;
				var t,
				    i,
				    s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
				    a = s.children()[0];
				return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i;
			},
			getScrollInfo:  function getScrollInfo(t) {
				var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
				    s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
				    n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
				    a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
				return {
					width:  a ? e.position.scrollbarWidth() : 0,
					height: n ? e.position.scrollbarWidth() : 0
				};
			},
			getWithinInfo:  function getWithinInfo(t) {
				var i = e(t || window),
				    s = e.isWindow(i[0]),
				    n = !!i[0] && 9 === i[0].nodeType;
				return {
					element:    i,
					isWindow:   s,
					isDocument: n,
					offset:     i.offset() || {
						left: 0,
						top:  0
					},
					scrollLeft: i.scrollLeft(),
					scrollTop:  i.scrollTop(),
					width:      s || n ? i.width() : i.outerWidth(),
					height:     s || n ? i.height() : i.outerHeight()
				};
			}
		}, e.fn.position = function (n) {
			if (!n || !n.of) return f.apply(this, arguments);
			n = e.extend({}, n);

			var p,
			    m,
			    g,
			    v,
			    y,
			    b,
			    _ = e(n.of),
			    x = e.position.getWithinInfo(n.within),
			    w = e.position.getScrollInfo(x),
			    k = (n.collision || "flip").split(" "),
			    T = {};

			return b = s(_), _[0].preventDefault && (n.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function () {
				var e,
				    t,
				    i = (n[this] || "").split(" ");
				1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), T[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]];
			}), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? y.left += m : "center" === n.at[0] && (y.left += m / 2), "bottom" === n.at[1] ? y.top += g : "center" === n.at[1] && (y.top += g / 2), p = t(T.at, m, g), y.left += p[0], y.top += p[1], this.each(function () {
				var s,
				    l,
				    u = e(this),
				    d = u.outerWidth(),
				    c = u.outerHeight(),
				    f = i(this, "marginLeft"),
				    b = i(this, "marginTop"),
				    D = d + f + i(this, "marginRight") + w.width,
				    S = c + b + i(this, "marginBottom") + w.height,
				    N = e.extend({}, y),
				    M = t(T.my, u.outerWidth(), u.outerHeight());
				"right" === n.my[0] ? N.left -= d : "center" === n.my[0] && (N.left -= d / 2), "bottom" === n.my[1] ? N.top -= c : "center" === n.my[1] && (N.top -= c / 2), N.left += M[0], N.top += M[1], a || (N.left = h(N.left), N.top = h(N.top)), s = {
					marginLeft: f,
					marginTop:  b
				}, e.each(["left", "top"], function (t, i) {
					e.ui.position[k[t]] && e.ui.position[k[t]][i](N, {
						targetWidth:       m,
						targetHeight:      g,
						elemWidth:         d,
						elemHeight:        c,
						collisionPosition: s,
						collisionWidth:    D,
						collisionHeight:   S,
						offset:            [p[0] + M[0], p[1] + M[1]],
						my:                n.my,
						at:                n.at,
						within:            x,
						elem:              u
					});
				}), n.using && (l = function l(e) {
					var t = v.left - N.left,
					    i = t + m - d,
					    s = v.top - N.top,
					    a = s + g - c,
					    h = {
						    target:     {
							    element: _,
							    left:    v.left,
							    top:     v.top,
							    width:   m,
							    height:  g
						    },
						    element:    {
							    element: u,
							    left:    N.left,
							    top:     N.top,
							    width:   d,
							    height:  c
						    },
						    horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
						    vertical:   0 > a ? "top" : s > 0 ? "bottom" : "middle"
					    };
					d > m && m > r(t + i) && (h.horizontal = "center"), c > g && g > r(s + a) && (h.vertical = "middle"), h.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, h);
				}), u.offset(e.extend(N, {
					using: l
				}));
			});
		}, e.ui.position = {
			fit:     {
				left: function left(e, t) {
					var i,
					    s = t.within,
					    n = s.isWindow ? s.scrollLeft : s.offset.left,
					    a = s.width,
					    r = e.left - t.collisionPosition.marginLeft,
					    h = n - r,
					    l = r + t.collisionWidth - a - n;
					t.collisionWidth > a ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - a - n, e.left += h - i) : e.left = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionWidth : n : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left);
				},
				top:  function top(e, t) {
					var i,
					    s = t.within,
					    n = s.isWindow ? s.scrollTop : s.offset.top,
					    a = t.within.height,
					    r = e.top - t.collisionPosition.marginTop,
					    h = n - r,
					    l = r + t.collisionHeight - a - n;
					t.collisionHeight > a ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - a - n, e.top += h - i) : e.top = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionHeight : n : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top);
				}
			},
			flip:    {
				left: function left(e, t) {
					var i,
					    s,
					    n = t.within,
					    a = n.offset.left + n.scrollLeft,
					    o = n.width,
					    h = n.isWindow ? n.scrollLeft : n.offset.left,
					    l = e.left - t.collisionPosition.marginLeft,
					    u = l - h,
					    d = l + t.collisionWidth - o - h,
					    c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
					    p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
					    f = -2 * t.offset[0];
					0 > u ? (i = e.left + c + p + f + t.collisionWidth - o - a, (0 > i || r(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h, (s > 0 || d > r(s)) && (e.left += c + p + f));
				},
				top:  function top(e, t) {
					var i,
					    s,
					    n = t.within,
					    a = n.offset.top + n.scrollTop,
					    o = n.height,
					    h = n.isWindow ? n.scrollTop : n.offset.top,
					    l = e.top - t.collisionPosition.marginTop,
					    u = l - h,
					    d = l + t.collisionHeight - o - h,
					    c = "top" === t.my[1],
					    p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
					    f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
					    m = -2 * t.offset[1];
					0 > u ? (s = e.top + p + f + m + t.collisionHeight - o - a, e.top + p + f + m > u && (0 > s || r(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, e.top + p + f + m > d && (i > 0 || d > r(i)) && (e.top += p + f + m));
				}
			},
			flipfit: {
				left: function left() {
					e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments);
				},
				top:  function top() {
					e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments);
				}
			}
		}, function () {
			var t,
			    i,
			    s,
			    n,
			    o,
			    r = document.getElementsByTagName("body")[0],
			    h = document.createElement("div");
			t = document.createElement(r ? "div" : "body"), s = {
				visibility: "hidden",
				width:      0,
				height:     0,
				border:     0,
				margin:     0,
				background: "none"
			}, r && e.extend(s, {
				position: "absolute",
				left:     "-1000px",
				top:      "-1000px"
			});

			for (o in s) {
				t.style[o] = s[o];
			}

			t.appendChild(h), i = r || document.documentElement, i.insertBefore(t, i.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = e(h).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t);
		}();
	}(), e.ui.position, e.widget("ui.draggable", e.ui.mouse, {
		version:                 "1.11.1",
		widgetEventPrefix:       "drag",
		options:                 {
			addClasses:        !0,
			appendTo:          "parent",
			axis:              !1,
			connectToSortable: !1,
			containment:       !1,
			cursor:            "auto",
			cursorAt:          !1,
			grid:              !1,
			handle:            !1,
			helper:            "original",
			iframeFix:         !1,
			opacity:           !1,
			refreshPositions:  !1,
			revert:            !1,
			revertDuration:    500,
			scope:             "default",
			scroll:            !0,
			scrollSensitivity: 20,
			scrollSpeed:       20,
			snap:              !1,
			snapMode:          "both",
			snapTolerance:     20,
			stack:             !1,
			zIndex:            !1,
			drag:              null,
			start:             null,
			stop:              null
		},
		_create:                 function _create() {
			"original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit();
		},
		_setOption:              function _setOption(e, t) {
			this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName());
		},
		_destroy:                function _destroy() {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0);
		},
		_mouseCapture:           function _mouseCapture(t) {
			var i = this.document[0],
			    s = this.options;

			try {
				i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur();
			} catch (n) {
			}

			return this.helper || s.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(s.iframeFix === !0 ? "iframe" : s.iframeFix).each(function () {
				e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
					width:    this.offsetWidth + "px",
					height:   this.offsetHeight + "px",
					position: "absolute",
					opacity:  "0.001",
					zIndex:   1e3
				}).css(e(this).offset()).appendTo("body");
			}), !0) : !1);
		},
		_mouseStart:             function _mouseStart(t) {
			var i = this.options;
			return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top:  this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, this.offset.scroll = !1, e.extend(this.offset, {
				click:    {
					left: t.pageX - this.offset.left,
					top:  t.pageY - this.offset.top
				},
				parent:   this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0);
		},
		_mouseDrag:              function _mouseDrag(t, i) {
			if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var s = this._uiHash();

				if (this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1;
				this.position = s.position;
			}

			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1;
		},
		_mouseStop:              function _mouseStop(t) {
			var i = this,
			    s = !1;
			return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
				i._trigger("stop", t) !== !1 && i._clear();
			}) : this._trigger("stop", t) !== !1 && this._clear(), !1;
		},
		_mouseUp:                function _mouseUp(t) {
			return e("div.ui-draggable-iframeFix").each(function () {
				this.parentNode.removeChild(this);
			}), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t);
		},
		cancel:                  function cancel() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
		},
		_getHandle:              function _getHandle(t) {
			return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0;
		},
		_setHandleClassName:     function _setHandleClassName() {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle");
		},
		_removeHandleClassName:  function _removeHandleClassName() {
			this.handleElement.removeClass("ui-draggable-handle");
		},
		_createHelper:           function _createHelper(t) {
			var i = this.options,
			    s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
			return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"), s;
		},
		_adjustOffsetFromHelper: function _adjustOffsetFromHelper(t) {
			"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top:  +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
		},
		_isRootNode:             function _isRootNode(e) {
			return /(html|body)/i.test(e.tagName) || e === this.document[0];
		},
		_getParentOffset:        function _getParentOffset() {
			var t = this.offsetParent.offset(),
			    i = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
				top:  0,
				left: 0
			}), {
				top:  t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},
		_getRelativeOffset:      function _getRelativeOffset() {
			if ("relative" !== this.cssPosition) return {
				top:  0,
				left: 0
			};

			var e = this.element.position(),
			    t = this._isRootNode(this.scrollParent[0]);

			return {
				top:  e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
				left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
			};
		},
		_cacheMargins:           function _cacheMargins() {
			this.margins = {
				left:   parseInt(this.element.css("marginLeft"), 10) || 0,
				top:    parseInt(this.element.css("marginTop"), 10) || 0,
				right:  parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			};
		},
		_cacheHelperProportions: function _cacheHelperProportions() {
			this.helperProportions = {
				width:  this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
		_setContainment:         function _setContainment() {
			var t,
			    i,
			    s,
			    n = this.options,
			    a = this.document[0];
			return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, e(a).width() - this.helperProportions.width - this.margins.left, (e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0);
		},
		_convertPositionTo:      function _convertPositionTo(e, t) {
			t || (t = this.position);

			var i = "absolute" === e ? 1 : -1,
			    s = this._isRootNode(this.scrollParent[0]);

			return {
				top:  t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
				left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
			};
		},
		_generatePosition:       function _generatePosition(e, t) {
			var i,
			    s,
			    n,
			    a,
			    o = this.options,
			    r = this._isRootNode(this.scrollParent[0]),
			    h = e.pageX,
			    l = e.pageY;

			return r && this.offset.scroll || (this.offset.scroll = {
				top:  this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), {
				top:  l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
				left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
			};
		},
		_clear:                  function _clear() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
		},
		_trigger:                function _trigger(t, i, s) {
			return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, i, s);
		},
		plugins:                 {},
		_uiHash:                 function _uiHash() {
			return {
				helper:           this.helper,
				position:         this.position,
				originalPosition: this.originalPosition,
				offset:           this.positionAbs
			};
		}
	}), e.ui.plugin.add("draggable", "connectToSortable", {
		start: function start(t, i, s) {
			var n = s.options,
			    a = e.extend({}, i, {
				    item: s.element
			    });
			s.sortables = [], e(n.connectToSortable).each(function () {
				var i = e(this).sortable("instance");
				i && !i.options.disabled && (s.sortables.push({
					instance:     i,
					shouldRevert: i.options.revert
				}), i.refreshPositions(), i._trigger("activate", t, a));
			});
		},
		stop:  function stop(t, i, s) {
			var n = e.extend({}, i, {
				item: s.element
			});
			e.each(s.sortables, function () {
				this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
					top:  "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, n));
			});
		},
		drag:  function drag(t, i, s) {
			var n = this;
			e.each(s.sortables, function () {
				var a = !1,
				    o = this;
				this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (a = !0, e.each(s.sortables, function () {
					return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (a = !1), a;
				})), a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
					return i.helper[0];
				}, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", t), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", t), s.dropped = !1);
			});
		}
	}), e.ui.plugin.add("draggable", "cursor", {
		start: function start(t, i, s) {
			var n = e("body"),
			    a = s.options;
			n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor);
		},
		stop:  function stop(t, i, s) {
			var n = s.options;
			n._cursor && e("body").css("cursor", n._cursor);
		}
	}), e.ui.plugin.add("draggable", "opacity", {
		start: function start(t, i, s) {
			var n = e(i.helper),
			    a = s.options;
			n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity);
		},
		stop:  function stop(t, i, s) {
			var n = s.options;
			n._opacity && e(i.helper).css("opacity", n._opacity);
		}
	}), e.ui.plugin.add("draggable", "scroll", {
		start: function start(e, t, i) {
			i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
		},
		drag:  function drag(t, i, s) {
			var n = s.options,
			    a = !1,
			    o = s.scrollParentNotHidden[0],
			    r = s.document[0];
			o !== r && "HTML" !== o.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t);
		}
	}), e.ui.plugin.add("draggable", "snap", {
		start: function start(t, i, s) {
			var n = s.options;
			s.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
				var t = e(this),
				    i = t.offset();
				this !== s.element[0] && s.snapElements.push({
					item:   this,
					width:  t.outerWidth(),
					height: t.outerHeight(),
					top:    i.top,
					left:   i.left
				});
			});
		},
		drag:  function drag(t, i, s) {
			var n,
			    a,
			    o,
			    r,
			    h,
			    l,
			    u,
			    d,
			    c,
			    p,
			    f = s.options,
			    m = f.snapTolerance,
			    g = i.offset.left,
			    v = g + s.helperProportions.width,
			    y = i.offset.top,
			    b = y + s.helperProportions.height;

			for (c = s.snapElements.length - 1; c >= 0; c--) {
				h = s.snapElements[c].left, l = h + s.snapElements[c].width, u = s.snapElements[c].top, d = u + s.snapElements[c].height, h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {
					snapItem: s.snapElements[c].item
				})), s.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", {
					top:  u - s.helperProportions.height,
					left: 0
				}).top - s.margins.top), a && (i.position.top = s._convertPositionTo("relative", {
					top:  d,
					left: 0
				}).top - s.margins.top), o && (i.position.left = s._convertPositionTo("relative", {
					top:  0,
					left: h - s.helperProportions.width
				}).left - s.margins.left), r && (i.position.left = s._convertPositionTo("relative", {
					top:  0,
					left: l
				}).left - s.margins.left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", {
					top:  u,
					left: 0
				}).top - s.margins.top), a && (i.position.top = s._convertPositionTo("relative", {
					top:  d - s.helperProportions.height,
					left: 0
				}).top - s.margins.top), o && (i.position.left = s._convertPositionTo("relative", {
					top:  0,
					left: h
				}).left - s.margins.left), r && (i.position.left = s._convertPositionTo("relative", {
					top:  0,
					left: l - s.helperProportions.width
				}).left - s.margins.left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {
					snapItem: s.snapElements[c].item
				})), s.snapElements[c].snapping = n || a || o || r || p);
			}
		}
	}), e.ui.plugin.add("draggable", "stack", {
		start: function start(t, i, s) {
			var n,
			    a = s.options,
			    o = e.makeArray(e(a.stack)).sort(function (t, i) {
				    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0);
			    });
			o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function (t) {
				e(this).css("zIndex", n + t);
			}), this.css("zIndex", n + o.length));
		}
	}), e.ui.plugin.add("draggable", "zIndex", {
		start: function start(t, i, s) {
			var n = e(i.helper),
			    a = s.options;
			n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex);
		},
		stop:  function stop(t, i, s) {
			var n = s.options;
			n._zIndex && e(i.helper).css("zIndex", n._zIndex);
		}
	}), e.ui.draggable, e.widget("ui.droppable", {
		version:           "1.11.1",
		widgetEventPrefix: "drop",
		options:           {
			accept:      "*",
			activeClass: !1,
			addClasses:  !0,
			greedy:      !1,
			hoverClass:  !1,
			scope:       "default",
			tolerance:   "intersect",
			activate:    null,
			deactivate:  null,
			drop:        null,
			out:         null,
			over:        null
		},
		_create:           function _create() {
			var t,
			    i = this.options,
			    s = i.accept;
			this.isover = !1, this.isout = !0, this.accept = e.isFunction(s) ? s : function (e) {
				return e.is(s);
			}, this.proportions = function () {
				return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
					width:  this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				};
			}, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable");
		},
		_addToManager:     function _addToManager(t) {
			e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this);
		},
		_splice:           function _splice(e) {
			for (var t = 0; e.length > t; t++) {
				e[t] === this && e.splice(t, 1);
			}
		},
		_destroy:          function _destroy() {
			var t = e.ui.ddmanager.droppables[this.options.scope];
			this._splice(t), this.element.removeClass("ui-droppable ui-droppable-disabled");
		},
		_setOption:        function _setOption(t, i) {
			if ("accept" === t) this.accept = e.isFunction(i) ? i : function (e) {
				return e.is(i);
			}; else if ("scope" === t) {
				var s = e.ui.ddmanager.droppables[this.options.scope];
				this._splice(s), this._addToManager(i);
			}

			this._super(t, i);
		},
		_activate:         function _activate(t) {
			var i = e.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i));
		},
		_deactivate:       function _deactivate(t) {
			var i = e.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i));
		},
		_over:             function _over(t) {
			var i = e.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)));
		},
		_out:              function _out(t) {
			var i = e.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)));
		},
		_drop:             function _drop(t, i) {
			var s = i || e.ui.ddmanager.current,
			    n = !1;
			return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
				var i = e(this).droppable("instance");
				return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, {
					offset: i.element.offset()
				}), i.options.tolerance, t) ? (n = !0, !1) : void 0;
			}), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element) : !1) : !1;
		},
		ui:                function ui(e) {
			return {
				draggable: e.currentItem || e.element,
				helper:    e.helper,
				position:  e.position,
				offset:    e.positionAbs
			};
		}
	}), e.ui.intersect = function () {
		function e(e, t, i) {
			return e >= t && t + i > e;
		}

		return function (t, i, s, n) {
			if (!i.offset) return !1;
			var a = (t.positionAbs || t.position.absolute).left,
			    o = (t.positionAbs || t.position.absolute).top,
			    r = a + t.helperProportions.width,
			    h = o + t.helperProportions.height,
			    l = i.offset.left,
			    u = i.offset.top,
			    d = l + i.proportions().width,
			    c = u + i.proportions().height;

			switch (s) {
				case "fit":
					return a >= l && d >= r && o >= u && c >= h;

				case "intersect":
					return a + t.helperProportions.width / 2 > l && d > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > u && c > h - t.helperProportions.height / 2;

				case "pointer":
					return e(n.pageY, u, i.proportions().height) && e(n.pageX, l, i.proportions().width);

				case "touch":
					return (o >= u && c >= o || h >= u && c >= h || u > o && h > c) && (a >= l && d >= a || r >= l && d >= r || l > a && r > d);

				default:
					return !1;
			}
		};
	}(), e.ui.ddmanager = {
		current:        null,
		droppables:     {
			"default": []
		},
		prepareOffsets: function prepareOffsets(t, i) {
			var s,
			    n,
			    a = e.ui.ddmanager.droppables[t.options.scope] || [],
			    o = i ? i.type : null,
			    r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();

			e: for (s = 0; a.length > s; s++) {
				if (!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) {
					for (n = 0; r.length > n; n++) {
						if (r[n] === a[s].element[0]) {
							a[s].proportions().height = 0;
							continue e;
						}
					}

					a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({
						width:  a[s].element[0].offsetWidth,
						height: a[s].element[0].offsetHeight
					}));
				}
			}
		},
		drop:           function drop(t, i) {
			var s = !1;
			return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function () {
				this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)));
			}), s;
		},
		dragStart:      function dragStart(t, i) {
			t.element.parentsUntil("body").bind("scroll.droppable", function () {
				t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);
			});
		},
		drag:           function drag(t, i) {
			t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var s,
					    n,
					    a,
					    o = e.ui.intersect(t, this, this.options.tolerance, i),
					    r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
					r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function () {
						return e(this).droppable("instance").options.scope === n;
					}), a.length && (s = e(a[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)));
				}
			});
		},
		dragStop:       function dragStop(t, i) {
			t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);
		}
	}, e.ui.droppable, e.widget("ui.sortable", e.ui.mouse, {
		version:                     "1.11.1",
		widgetEventPrefix:           "sort",
		ready:                       !1,
		options:                     {
			appendTo:             "parent",
			axis:                 !1,
			connectWith:          !1,
			containment:          !1,
			cursor:               "auto",
			cursorAt:             !1,
			dropOnEmpty:          !0,
			forcePlaceholderSize: !1,
			forceHelperSize:      !1,
			grid:                 !1,
			handle:               !1,
			helper:               "original",
			items:                "> *",
			opacity:              !1,
			placeholder:          !1,
			revert:               !1,
			scroll:               !0,
			scrollSensitivity:    20,
			scrollSpeed:          20,
			scope:                "default",
			tolerance:            "intersect",
			zIndex:               1e3,
			activate:             null,
			beforeStop:           null,
			change:               null,
			deactivate:           null,
			out:                  null,
			over:                 null,
			receive:              null,
			remove:               null,
			sort:                 null,
			start:                null,
			stop:                 null,
			update:               null
		},
		_isOverAxis:                 function _isOverAxis(e, t, i) {
			return e >= t && t + i > e;
		},
		_isFloating:                 function _isFloating(e) {
			return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"));
		},
		_create:                     function _create() {
			var e = this.options;
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === e.axis || this._isFloating(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;
		},
		_setOption:                  function _setOption(e, t) {
			this._super(e, t), "handle" === e && this._setHandleClassName();
		},
		_setHandleClassName:         function _setHandleClassName() {
			this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), e.each(this.items, function () {
				(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle");
			});
		},
		_destroy:                    function _destroy() {
			this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();

			for (var e = this.items.length - 1; e >= 0; e--) {
				this.items[e].item.removeData(this.widgetName + "-item");
			}

			return this;
		},
		_mouseCapture:               function _mouseCapture(t, i) {
			var s = null,
			    n = !1,
			    a = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function () {
				return e.data(this, a.widgetName + "-item") === a ? (s = e(this), !1) : void 0;
			}), e.data(t.target, a.widgetName + "-item") === a && (s = e(t.target)), s ? !this.options.handle || i || (e(this.options.handle, s).find("*").addBack().each(function () {
				this === t.target && (n = !0);
			}), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1);
		},
		_mouseStart:                 function _mouseStart(t, i, s) {
			var n,
			    a,
			    o = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
				top:  this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, e.extend(this.offset, {
				click:    {
					left: t.pageX - this.offset.left,
					top:  t.pageY - this.offset.top
				},
				parent:   this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
				prev:   this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (a = this.document.find("body"), this.storedCursor = a.css("cursor"), a.css("cursor", o.cursor), this.storedStylesheet = e("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) {
				this.containers[n]._trigger("activate", t, this._uiHash(this));
			}
			return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0;
		},
		_mouseDrag:                  function _mouseDrag(t) {
			var i,
			    s,
			    n,
			    a,
			    o = this.options,
			    r = !1;

			for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (t.pageY - e(document).scrollTop() < o.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed)), t.pageX - e(document).scrollLeft() < o.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed))), r !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) {
				if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? "next" : "prev"]()[0] !== n && !e.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], n) : !0)) {
					if (this.direction = 1 === a ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
					this._rearrange(t, s), this._trigger("change", t, this._uiHash());
					break;
				}
			}

			return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1;
		},
		_mouseStop:                  function _mouseStop(t, i) {
			if (t) {
				if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
					var s = this,
					    n = this.placeholder.offset(),
					    a = this.options.axis,
					    o = {};
					a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function () {
						s._clear(t);
					});
				} else this._clear(t, i);

				return !1;
			}
		},
		cancel:                      function cancel() {
			if (this.dragging) {
				this._mouseUp({
					target: null
				}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();

				for (var t = this.containers.length - 1; t >= 0; t--) {
					this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0);
				}
			}

			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
				helper:       null,
				dragging:     !1,
				reverting:    !1,
				_noFinalSort: null
			}), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this;
		},
		serialize:                   function serialize(t) {
			var i = this._getItemsAsjQuery(t && t.connected),
			    s = [];

			return t = t || {}, e(i).each(function () {
				var i = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
				i && s.push((t.key || i[1] + "[]") + "=" + (t.key && t.expression ? i[1] : i[2]));
			}), !s.length && t.key && s.push(t.key + "="), s.join("&");
		},
		toArray:                     function toArray(t) {
			var i = this._getItemsAsjQuery(t && t.connected),
			    s = [];

			return t = t || {}, i.each(function () {
				s.push(e(t.item || this).attr(t.attribute || "id") || "");
			}), s;
		},
		_intersectsWith:             function _intersectsWith(e) {
			var t = this.positionAbs.left,
			    i = t + this.helperProportions.width,
			    s = this.positionAbs.top,
			    n = s + this.helperProportions.height,
			    a = e.left,
			    o = a + e.width,
			    r = e.top,
			    h = r + e.height,
			    l = this.offset.click.top,
			    u = this.offset.click.left,
			    d = "x" === this.options.axis || s + l > r && h > s + l,
			    c = "y" === this.options.axis || t + u > a && o > t + u,
			    p = d && c;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : t + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;
		},
		_intersectsWithPointer:      function _intersectsWithPointer(e) {
			var t = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
			    i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
			    s = t && i,
			    n = this._getDragVerticalDirection(),
			    a = this._getDragHorizontalDirection();

			return s ? this.floating ? a && "right" === a || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1;
		},
		_intersectsWithSides:        function _intersectsWithSides(e) {
			var t = this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
			    i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
			    s = this._getDragVerticalDirection(),
			    n = this._getDragHorizontalDirection();

			return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && t || "up" === s && !t);
		},
		_getDragVerticalDirection:   function _getDragVerticalDirection() {
			var e = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== e && (e > 0 ? "down" : "up");
		},
		_getDragHorizontalDirection: function _getDragHorizontalDirection() {
			var e = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== e && (e > 0 ? "right" : "left");
		},
		refresh:                     function refresh(e) {
			return this._refreshItems(e), this._setHandleClassName(), this.refreshPositions(), this;
		},
		_connectWith:                function _connectWith() {
			var e = this.options;
			return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith;
		},
		_getItemsAsjQuery:           function _getItemsAsjQuery(t) {
			function i() {
				r.push(this);
			}

			var s,
			    n,
			    a,
			    o,
			    r = [],
			    h = [],
			    l = this._connectWith();

			if (l && t) for (s = l.length - 1; s >= 0; s--) {
				for (a = e(l[s]), n = a.length - 1; n >= 0; n--) {
					o = e.data(a[n], this.widgetFullName), o && o !== this && !o.options.disabled && h.push([e.isFunction(o.options.items) ? o.options.items.call(o.element) : e(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
				}
			}

			for (h.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item:    this.currentItem
			}) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) {
				h[s][0].each(i);
			}

			return e(r);
		},
		_removeCurrentsFromItems:    function _removeCurrentsFromItems() {
			var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = e.grep(this.items, function (e) {
				for (var i = 0; t.length > i; i++) {
					if (t[i] === e.item[0]) return !1;
				}

				return !0;
			});
		},
		_refreshItems:               function _refreshItems(t) {
			this.items = [], this.containers = [this];

			var i,
			    s,
			    n,
			    a,
			    o,
			    r,
			    h,
			    l,
			    u = this.items,
			    d = [[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
				    item: this.currentItem
			    }) : e(this.options.items, this.element), this]],
			    c = this._connectWith();

			if (c && this.ready) for (i = c.length - 1; i >= 0; i--) {
				for (n = e(c[i]), s = n.length - 1; s >= 0; s--) {
					a = e.data(n[s], this.widgetFullName), a && a !== this && !a.options.disabled && (d.push([e.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {
						item: this.currentItem
					}) : e(a.options.items, a.element), a]), this.containers.push(a));
				}
			}

			for (i = d.length - 1; i >= 0; i--) {
				for (o = d[i][1], r = d[i][0], s = 0, l = r.length; l > s; s++) {
					h = e(r[s]), h.data(this.widgetName + "-item", o), u.push({
						item:     h,
						instance: o,
						width:    0,
						height:   0,
						left:     0,
						top:      0
					});
				}
			}
		},
		refreshPositions:            function refreshPositions(t) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var i, s, n, a;

			for (i = this.items.length - 1; i >= 0; i--) {
				s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? e(this.options.toleranceElement, s.item) : s.item, t || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);
			}

			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) {
				a = this.containers[i].element.offset(), this.containers[i].containerCache.left = a.left, this.containers[i].containerCache.top = a.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
			return this;
		},
		_createPlaceholder:          function _createPlaceholder(t) {
			t = t || this;
			var i,
			    s = t.options;
			s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
				element: function element() {
					var s = t.currentItem[0].nodeName.toLowerCase(),
					    n = e("<" + s + ">", t.document[0]).addClass(i || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
					return "tr" === s ? t.currentItem.children().each(function () {
						e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(n);
					}) : "img" === s && n.attr("src", t.currentItem.attr("src")), i || n.css("visibility", "hidden"), n;
				},
				update:  function update(e, n) {
					(!i || s.forcePlaceholderSize) && (n.height() || n.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)));
				}
			}), t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), s.placeholder.update(t, t.placeholder);
		},
		_contactContainers:          function _contactContainers(t) {
			var i,
			    s,
			    n,
			    a,
			    o,
			    r,
			    h,
			    l,
			    u,
			    d,
			    c = null,
			    p = null;

			for (i = this.containers.length - 1; i >= 0; i--) {
				if (!e.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
					if (c && e.contains(this.containers[i].element[0], c.element[0])) continue;
					c = this.containers[i], p = i;
				} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0);
			}

			if (c) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1); else {
				for (n = 1e4, a = null, u = c.floating || this._isFloating(this.currentItem), o = u ? "left" : "top", r = u ? "width" : "height", d = u ? "clientX" : "clientY", s = this.items.length - 1; s >= 0; s--) {
					e.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[o], l = !1, t[d] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(t[d] - h) && (n = Math.abs(t[d] - h), a = this.items[s], this.direction = l ? "up" : "down"));
				}

				if (!a && !this.options.dropOnEmpty) return;
				if (this.currentContainer === this.containers[p]) return;
				a ? this._rearrange(t, a, null, !0) : this._rearrange(t, null, this.containers[p].element, !0), this._trigger("change", t, this._uiHash()), this.containers[p]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1;
			}
		},
		_createHelper:               function _createHelper(t) {
			var i = this.options,
			    s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
			return s.parents("body").length || e("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
				width:    this.currentItem[0].style.width,
				height:   this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top:      this.currentItem.css("top"),
				left:     this.currentItem.css("left")
			}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s;
		},
		_adjustOffsetFromHelper:     function _adjustOffsetFromHelper(t) {
			"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top:  +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
		},
		_getParentOffset:            function _getParentOffset() {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
				top:  0,
				left: 0
			}), {
				top:  t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},
		_getRelativeOffset:          function _getRelativeOffset() {
			if ("relative" === this.cssPosition) {
				var e = this.currentItem.position();
				return {
					top:  e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				};
			}

			return {
				top:  0,
				left: 0
			};
		},
		_cacheMargins:               function _cacheMargins() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top:  parseInt(this.currentItem.css("marginTop"), 10) || 0
			};
		},
		_cacheHelperProportions:     function _cacheHelperProportions() {
			this.helperProportions = {
				width:  this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},
		_setContainment:             function _setContainment() {
			var t,
			    i,
			    s,
			    n = this.options;
			"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (e("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (t = e(n.containment)[0], i = e(n.containment).offset(), s = "hidden" !== e(t).css("overflow"), this.containment = [i.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);
		},
		_convertPositionTo:          function _convertPositionTo(t, i) {
			i || (i = this.position);
			var s = "absolute" === t ? 1 : -1,
			    n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
			    a = /(html|body)/i.test(n[0].tagName);
			return {
				top:  i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
				left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
			};
		},
		_generatePosition:           function _generatePosition(t) {
			var i,
			    s,
			    n = this.options,
			    a = t.pageX,
			    o = t.pageY,
			    r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
			    h = /(html|body)/i.test(r[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
				top:  o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
				left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
			};
		},
		_rearrange:                  function _rearrange(e, t, i, s) {
			i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var n = this.counter;

			this._delay(function () {
				n === this.counter && this.refreshPositions(!s);
			});
		},
		_clear:                      function _clear(e, t) {
			function i(e, t, i) {
				return function (s) {
					i._trigger(e, s, t._uiHash(t));
				};
			}

			this.reverting = !1;
			var s,
			    n = [];

			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (s in this._storedCSS) {
					("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
				}

				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else this.currentItem.show();

			for (this.fromOutside && !t && n.push(function (e) {
				this._trigger("receive", e, this._uiHash(this.fromOutside));
			}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || n.push(function (e) {
				this._trigger("update", e, this._uiHash());
			}), this !== this.currentContainer && (t || (n.push(function (e) {
				this._trigger("remove", e, this._uiHash());
			}), n.push(function (e) {
				return function (t) {
					e._trigger("receive", t, this._uiHash(this));
				};
			}.call(this, this.currentContainer)), n.push(function (e) {
				return function (t) {
					e._trigger("update", t, this._uiHash(this));
				};
			}.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) {
				t || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
			}

			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
				if (!t) {
					for (this._trigger("beforeStop", e, this._uiHash()), s = 0; n.length > s; s++) {
						n[s].call(this, e);
					}

					this._trigger("stop", e, this._uiHash());
				}

				return this.fromOutside = !1, !1;
			}

			if (t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !t) {
				for (s = 0; n.length > s; s++) {
					n[s].call(this, e);
				}

				this._trigger("stop", e, this._uiHash());
			}

			return this.fromOutside = !1, !0;
		},
		_trigger:                    function _trigger() {
			e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
		},
		_uiHash:                     function _uiHash(t) {
			var i = t || this;
			return {
				helper:           i.helper,
				placeholder:      i.placeholder || e([]),
				position:         i.position,
				originalPosition: i.originalPosition,
				offset:           i.positionAbs,
				item:             i.currentItem,
				sender:           t ? t.element : null
			};
		}
	}), e.extend(e.ui, {
		datepicker: {
			version: "1.11.1"
		}
	});
	var d;
	e.extend(n.prototype, {
		markerClassName:          "hasDatepicker",
		maxRows:                  4,
		_widgetDatepicker:        function _widgetDatepicker() {
			return this.dpDiv;
		},
		setDefaults:              function setDefaults(e) {
			return r(this._defaults, e || {}), this;
		},
		_attachDatepicker:        function _attachDatepicker(t, i) {
			var s, n, a;
			s = t.nodeName.toLowerCase(), n = "div" === s || "span" === s, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), a = this._newInst(e(t), n), a.settings = e.extend({}, i || {}), "input" === s ? this._connectDatepicker(t, a) : n && this._inlineDatepicker(t, a);
		},
		_newInst:                 function _newInst(t, i) {
			var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id:            s,
				input:         t,
				selectedDay:   0,
				selectedMonth: 0,
				selectedYear:  0,
				drawMonth:     0,
				drawYear:      0,
				inline:        i,
				dpDiv:         i ? a(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
			};
		},
		_connectDatepicker:       function _connectDatepicker(t, i) {
			var s = e(t);
			i.append = e([]), i.trigger = e([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t));
		},
		_attachments:             function _attachments(t, i) {
			var s,
			    n,
			    a,
			    o = this._get(i, "appendText"),
			    r = this._get(i, "isRTL");

			i.append && i.append.remove(), o && (i.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[r ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && t.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
				src:   a,
				alt:   n,
				title: n
			}) : e("<button type='button'></button>").addClass(this._triggerClass).html(a ? e("<img/>").attr({
				src:   a,
				alt:   n,
				title: n
			}) : n)), t[r ? "before" : "after"](i.trigger), i.trigger.click(function () {
				return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1;
			}));
		},
		_autoSize:                function _autoSize(e) {
			if (this._get(e, "autoSize") && !e.inline) {
				var t,
				    i,
				    s,
				    n,
				    a = new Date(2009, 11, 20),
				    o = this._get(e, "dateFormat");

				o.match(/[DM]/) && (t = function t(e) {
					for (i = 0, s = 0, n = 0; e.length > n; n++) {
						e[n].length > i && (i = e[n].length, s = n);
					}

					return s;
				}, a.setMonth(t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), e.input.attr("size", this._formatDate(e, a).length);
			}
		},
		_inlineDatepicker:        function _inlineDatepicker(t, i) {
			var s = e(t);
			s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"));
		},
		_dialogDatepicker:        function _dialogDatepicker(t, i, s, n, a) {
			var o,
			    h,
			    l,
			    u,
			    d,
			    c = this._dialogInst;
			return c || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), c = this._dialogInst = this._newInst(this._dialogInput, !1), c.settings = {}, e.data(this._dialogInput[0], "datepicker", c)), r(c.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(c, i) : i, this._dialogInput.val(i), this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, l / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), c.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", c), this;
		},
		_destroyDatepicker:       function _destroyDatepicker(t) {
			var i,
			    s = e(t),
			    n = e.data(t, "datepicker");
			s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty());
		},
		_enableDatepicker:        function _enableDatepicker(t) {
			var i,
			    s,
			    n = e(t),
			    a = e.data(t, "datepicker");
			n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, a.trigger.filter("button").each(function () {
				this.disabled = !1;
			}).end().filter("img").css({
				opacity: "1.0",
				cursor:  ""
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function (e) {
				return e === t ? null : e;
			}));
		},
		_disableDatepicker:       function _disableDatepicker(t) {
			var i,
			    s,
			    n = e(t),
			    a = e.data(t, "datepicker");
			n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, a.trigger.filter("button").each(function () {
				this.disabled = !0;
			}).end().filter("img").css({
				opacity: "0.5",
				cursor:  "default"
			})) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function (e) {
				return e === t ? null : e;
			}), this._disabledInputs[this._disabledInputs.length] = t);
		},
		_isDisabledDatepicker:    function _isDisabledDatepicker(e) {
			if (!e) return !1;

			for (var t = 0; this._disabledInputs.length > t; t++) {
				if (this._disabledInputs[t] === e) return !0;
			}

			return !1;
		},
		_getInst:                 function _getInst(t) {
			try {
				return e.data(t, "datepicker");
			} catch (i) {
				throw "Missing instance data for this datepicker";
			}
		},
		_optionDatepicker:        function _optionDatepicker(t, i, s) {
			var n,
			    a,
			    o,
			    h,
			    l = this._getInst(t);

			return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? e.extend({}, e.datepicker._defaults) : l ? "all" === i ? e.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), a = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), r(l.settings, n), null !== o && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, o)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), l), this._autoSize(l), this._setDate(l, a), this._updateAlternate(l), this._updateDatepicker(l)), void 0);
		},
		_changeDatepicker:        function _changeDatepicker(e, t, i) {
			this._optionDatepicker(e, t, i);
		},
		_refreshDatepicker:       function _refreshDatepicker(e) {
			var t = this._getInst(e);

			t && this._updateDatepicker(t);
		},
		_setDateDatepicker:       function _setDateDatepicker(e, t) {
			var i = this._getInst(e);

			i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i));
		},
		_getDateDatepicker:       function _getDateDatepicker(e, t) {
			var i = this._getInst(e);

			return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null;
		},
		_doKeyDown:               function _doKeyDown(t) {
			var i,
			    s,
			    n,
			    a = e.datepicker._getInst(t.target),
			    o = !0,
			    r = a.dpDiv.is(".ui-datepicker-rtl");

			if (a._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
				case 9:
					e.datepicker._hideDatepicker(), o = !1;
					break;

				case 13:
					return n = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", a.dpDiv), n[0] && e.datepicker._selectDay(t.target, a.selectedMonth, a.selectedYear, n[0]), i = e.datepicker._get(a, "onSelect"), i ? (s = e.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : e.datepicker._hideDatepicker(), !1;

				case 27:
					e.datepicker._hideDatepicker();

					break;

				case 33:
					e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");

					break;

				case 34:
					e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");

					break;

				case 35:
					(t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;
					break;

				case 36:
					(t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;
					break;

				case 37:
					(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? 1 : -1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");
					break;

				case 38:
					(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;
					break;

				case 39:
					(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? -1 : 1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");
					break;

				case 40:
					(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;
					break;

				default:
					o = !1;
			} else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : o = !1;
			o && (t.preventDefault(), t.stopPropagation());
		},
		_doKeyPress:              function _doKeyPress(t) {
			var i,
			    s,
			    n = e.datepicker._getInst(t.target);

			return e.datepicker._get(n, "constrainInput") ? (i = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0;
		},
		_doKeyUp:                 function _doKeyUp(t) {
			var i,
			    s = e.datepicker._getInst(t.target);

			if (s.input.val() !== s.lastVal) try {
				i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, e.datepicker._getFormatConfig(s)), i && (e.datepicker._setDateFromField(s), e.datepicker._updateAlternate(s), e.datepicker._updateDatepicker(s));
			} catch (n) {
			}
			return !0;
		},
		_showDatepicker:          function _showDatepicker(t) {
			if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
				var i, n, a, o, h, l, u;
				i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), n = e.datepicker._get(i, "beforeShow"), a = n ? n.apply(t, [t, i]) : {}, a !== !1 && (r(i.settings, a), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function () {
					return o |= "fixed" === e(this).css("position"), !o;
				}), h = {
					left: e.datepicker._pos[0],
					top:  e.datepicker._pos[1]
				}, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
					position: "absolute",
					display:  "block",
					top:      "-1000px"
				}), e.datepicker._updateDatepicker(i), h = e.datepicker._checkOffset(i, h, o), i.dpDiv.css({
					position: e.datepicker._inDialog && e.blockUI ? "static" : o ? "fixed" : "absolute",
					display:  "none",
					left:     h.left + "px",
					top:      h.top + "px"
				}), i.inline || (l = e.datepicker._get(i, "showAnim"), u = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[l] ? i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), u) : i.dpDiv[l || "show"](l ? u : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i));
			}
		},
		_updateDatepicker:        function _updateDatepicker(t) {
			this.maxRows = 4, d = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);

			var i,
			    s = this._getNumberOfMonths(t),
			    n = s[1],
			    a = 14,
			    r = t.dpDiv.find("." + this._dayOverClass + " a");

			r.length > 0 && o.apply(r.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function () {
				i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null;
			}, 0));
		},
		_shouldFocusInput:        function _shouldFocusInput(e) {
			return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus");
		},
		_checkOffset:             function _checkOffset(t, i, s) {
			var n = t.dpDiv.outerWidth(),
			    a = t.dpDiv.outerHeight(),
			    o = t.input ? t.input.outerWidth() : 0,
			    r = t.input ? t.input.outerHeight() : 0,
			    h = document.documentElement.clientWidth + (s ? 0 : e(document).scrollLeft()),
			    l = document.documentElement.clientHeight + (s ? 0 : e(document).scrollTop());
			return i.left -= this._get(t, "isRTL") ? n - o : 0, i.left -= s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= s && i.top === t.input.offset().top + r ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + r) : 0), i;
		},
		_findPos:                 function _findPos(t) {
			for (var i, s = this._getInst(t), n = this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) {
				t = t[n ? "previousSibling" : "nextSibling"];
			}

			return i = e(t).offset(), [i.left, i.top];
		},
		_hideDatepicker:          function _hideDatepicker(t) {
			var i,
			    s,
			    n,
			    a,
			    o = this._curInst;
			!o || t && o !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function n() {
				e.datepicker._tidyDialog(o);
			}, e.effects && (e.effects.effect[i] || e.effects[i]) ? o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left:     "0",
				top:      "-100px"
			}), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1);
		},
		_tidyDialog:              function _tidyDialog(e) {
			e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
		},
		_checkExternalClick:      function _checkExternalClick(t) {
			if (e.datepicker._curInst) {
				var i = e(t.target),
				    s = e.datepicker._getInst(i[0]);

				(i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker();
			}
		},
		_adjustDate:              function _adjustDate(t, i, s) {
			var n = e(t),
			    a = this._getInst(n[0]);

			this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a));
		},
		_gotoToday:               function _gotoToday(t) {
			var i,
			    s = e(t),
			    n = this._getInst(s[0]);

			this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date(), n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s);
		},
		_selectMonthYear:         function _selectMonthYear(t, i, s) {
			var n = e(t),
			    a = this._getInst(n[0]);

			a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n);
		},
		_selectDay:               function _selectDay(t, i, s, n) {
			var a,
			    o = e(t);
			e(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = e("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(t, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)));
		},
		_clearDate:               function _clearDate(t) {
			var i = e(t);

			this._selectDate(i, "");
		},
		_selectDate:              function _selectDate(t, i) {
			var s,
			    n = e(t),
			    a = this._getInst(n[0]);

			i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != _typeof(a.input[0]) && a.input.focus(), this._lastInput = null);
		},
		_updateAlternate:         function _updateAlternate(t) {
			var i,
			    s,
			    n,
			    a = this._get(t, "altField");

			a && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), s = this._getDate(t), n = this.formatDate(i, s, this._getFormatConfig(t)), e(a).each(function () {
				e(this).val(n);
			}));
		},
		noWeekends:               function noWeekends(e) {
			var t = e.getDay();
			return [t > 0 && 6 > t, ""];
		},
		iso8601Week:              function iso8601Week(e) {
			var t,
			    i = new Date(e.getTime());
			return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1;
		},
		parseDate:                function parseDate(t, i, s) {
			if (null == t || null == i) throw "Invalid arguments";
			if (i = "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? "" + i : i + "", "" === i) return null;

			var n,
			    a,
			    o,
			    r,
			    h = 0,
			    l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			    u = "string" != typeof l ? l : new Date().getFullYear() % 100 + parseInt(l, 10),
			    d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
			    c = (s ? s.dayNames : null) || this._defaults.dayNames,
			    p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
			    f = (s ? s.monthNames : null) || this._defaults.monthNames,
			    m = -1,
			    g = -1,
			    v = -1,
			    y = -1,
			    b = !1,
			    _ = function _(e) {
				    var i = t.length > n + 1 && t.charAt(n + 1) === e;
				    return i && n++, i;
			    },
			    x = function x(e) {
				    var t = _(e),
				        s = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
				        n = "y" === e ? s : 1,
				        a = RegExp("^\\d{" + n + "," + s + "}"),
				        o = i.substring(h).match(a);

				    if (!o) throw "Missing number at position " + h;
				    return h += o[0].length, parseInt(o[0], 10);
			    },
			    w = function w(t, s, n) {
				    var a = -1,
				        o = e.map(_(t) ? n : s, function (e, t) {
					        return [[t, e]];
				        }).sort(function (e, t) {
					        return -(e[1].length - t[1].length);
				        });
				    if (e.each(o, function (e, t) {
					    var s = t[1];
					    return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (a = t[0], h += s.length, !1) : void 0;
				    }), -1 !== a) return a + 1;
				    throw "Unknown name at position " + h;
			    },
			    k = function k() {
				    if (i.charAt(h) !== t.charAt(n)) throw "Unexpected literal at position " + h;
				    h++;
			    };

			for (n = 0; t.length > n; n++) {
				if (b) "'" !== t.charAt(n) || _("'") ? k() : b = !1; else switch (t.charAt(n)) {
					case "d":
						v = x("d");
						break;

					case "D":
						w("D", d, c);
						break;

					case "o":
						y = x("o");
						break;

					case "m":
						g = x("m");
						break;

					case "M":
						g = w("M", p, f);
						break;

					case "y":
						m = x("y");
						break;

					case "@":
						r = new Date(x("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
						break;

					case "!":
						r = new Date((x("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
						break;

					case "'":
						_("'") ? k() : b = !0;
						break;

					default:
						k();
				}
			}

			if (i.length > h && (o = i.substr(h), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
			if (-1 === m ? m = new Date().getFullYear() : 100 > m && (m += new Date().getFullYear() - new Date().getFullYear() % 100 + (u >= m ? 0 : -100)), y > -1) for (g = 1, v = y; ;) {
				if (a = this._getDaysInMonth(m, g - 1), a >= v) break;
				g++, v -= a;
			}
			if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
			return r;
		},
		ATOM:                     "yy-mm-dd",
		COOKIE:                   "D, dd M yy",
		ISO_8601:                 "yy-mm-dd",
		RFC_822:                  "D, d M y",
		RFC_850:                  "DD, dd-M-y",
		RFC_1036:                 "D, d M y",
		RFC_1123:                 "D, d M yy",
		RFC_2822:                 "D, d M yy",
		RSS:                      "D, d M y",
		TICKS:                    "!",
		TIMESTAMP:                "@",
		W3C:                      "yy-mm-dd",
		_ticksTo1970:             1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
		formatDate:               function formatDate(e, t, i) {
			if (!t) return "";

			var s,
			    n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
			    a = (i ? i.dayNames : null) || this._defaults.dayNames,
			    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
			    r = (i ? i.monthNames : null) || this._defaults.monthNames,
			    h = function h(t) {
				    var i = e.length > s + 1 && e.charAt(s + 1) === t;
				    return i && s++, i;
			    },
			    l = function l(e, t, i) {
				    var s = "" + t;
				    if (h(e)) for (; i > s.length;) {
					    s = "0" + s;
				    }
				    return s;
			    },
			    u = function u(e, t, i, s) {
				    return h(e) ? s[t] : i[t];
			    },
			    d = "",
			    c = !1;

			if (t) for (s = 0; e.length > s; s++) {
				if (c) "'" !== e.charAt(s) || h("'") ? d += e.charAt(s) : c = !1; else switch (e.charAt(s)) {
					case "d":
						d += l("d", t.getDate(), 2);
						break;

					case "D":
						d += u("D", t.getDay(), n, a);
						break;

					case "o":
						d += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
						break;

					case "m":
						d += l("m", t.getMonth() + 1, 2);
						break;

					case "M":
						d += u("M", t.getMonth(), o, r);
						break;

					case "y":
						d += h("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
						break;

					case "@":
						d += t.getTime();
						break;

					case "!":
						d += 1e4 * t.getTime() + this._ticksTo1970;
						break;

					case "'":
						h("'") ? d += "'" : c = !0;
						break;

					default:
						d += e.charAt(s);
				}
			}
			return d;
		},
		_possibleChars:           function _possibleChars(e) {
			var t,
			    i = "",
			    s = !1,
			    n = function n(i) {
				    var s = e.length > t + 1 && e.charAt(t + 1) === i;
				    return s && t++, s;
			    };

			for (t = 0; e.length > t; t++) {
				if (s) "'" !== e.charAt(t) || n("'") ? i += e.charAt(t) : s = !1; else switch (e.charAt(t)) {
					case "d":
					case "m":
					case "y":
					case "@":
						i += "0123456789";
						break;

					case "D":
					case "M":
						return null;

					case "'":
						n("'") ? i += "'" : s = !0;
						break;

					default:
						i += e.charAt(t);
				}
			}

			return i;
		},
		_get:                     function _get(e, t) {
			return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t];
		},
		_setDateFromField:        function _setDateFromField(e, t) {
			if (e.input.val() !== e.lastVal) {
				var i = this._get(e, "dateFormat"),
				    s = e.lastVal = e.input ? e.input.val() : null,
				    n = this._getDefaultDate(e),
				    a = n,
				    o = this._getFormatConfig(e);

				try {
					a = this.parseDate(i, s, o) || n;
				} catch (r) {
					s = t ? "" : s;
				}

				e.selectedDay = a.getDate(), e.drawMonth = e.selectedMonth = a.getMonth(), e.drawYear = e.selectedYear = a.getFullYear(), e.currentDay = s ? a.getDate() : 0, e.currentMonth = s ? a.getMonth() : 0, e.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(e);
			}
		},
		_getDefaultDate:          function _getDefaultDate(e) {
			return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date()));
		},
		_determineDate:           function _determineDate(t, i, s) {
			var n = function n(e) {
				    var t = new Date();
				    return t.setDate(t.getDate() + e), t;
			    },
			    a = function a(i) {
				    try {
					    return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t));
				    } catch (s) {
				    }

				    for (var n = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date(), a = n.getFullYear(), o = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
					    switch (l[2] || "d") {
						    case "d":
						    case "D":
							    r += parseInt(l[1], 10);
							    break;

						    case "w":
						    case "W":
							    r += 7 * parseInt(l[1], 10);
							    break;

						    case "m":
						    case "M":
							    o += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));
							    break;

						    case "y":
						    case "Y":
							    a += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));
					    }

					    l = h.exec(i);
				    }

				    return new Date(a, o, r);
			    },
			    o = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());

			return o = o && "Invalid Date" == "" + o ? s : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o);
		},
		_daylightSavingAdjust:    function _daylightSavingAdjust(e) {
			return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null;
		},
		_setDate:                 function _setDate(e, t, i) {
			var s = !t,
			    n = e.selectedMonth,
			    a = e.selectedYear,
			    o = this._restrictMinMax(e, this._determineDate(e, t, new Date()));

			e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), n === e.selectedMonth && a === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s ? "" : this._formatDate(e));
		},
		_getDate:                 function _getDate(e) {
			var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
			return t;
		},
		_attachHandlers:          function _attachHandlers(t) {
			var i = this._get(t, "stepMonths"),
			    s = "#" + t.id.replace(/\\\\/g, "\\");

			t.dpDiv.find("[data-handler]").map(function () {
				var t = {
					prev:        function prev() {
						e.datepicker._adjustDate(s, -i, "M");
					},
					next:        function next() {
						e.datepicker._adjustDate(s, +i, "M");
					},
					hide:        function hide() {
						e.datepicker._hideDatepicker();
					},
					today:       function today() {
						e.datepicker._gotoToday(s);
					},
					selectDay:   function selectDay() {
						return e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
					},
					selectMonth: function selectMonth() {
						return e.datepicker._selectMonthYear(s, this, "M"), !1;
					},
					selectYear:  function selectYear() {
						return e.datepicker._selectMonthYear(s, this, "Y"), !1;
					}
				};
				e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
			});
		},
		_generateHTML:            function _generateHTML(e) {
			var t,
			    i,
			    s,
			    n,
			    a,
			    o,
			    r,
			    h,
			    l,
			    u,
			    d,
			    c,
			    p,
			    f,
			    m,
			    g,
			    v,
			    y,
			    b,
			    _,
			    x,
			    w,
			    k,
			    T,
			    D,
			    S,
			    N,
			    M,
			    C,
			    P,
			    A,
			    I,
			    H,
			    z,
			    F,
			    E,
			    W,
			    L,
			    O,
			    j  = new Date(),
			    R  = this._daylightSavingAdjust(new Date(j.getFullYear(), j.getMonth(), j.getDate())),
			    Y  = this._get(e, "isRTL"),
			    J  = this._get(e, "showButtonPanel"),
			    B  = this._get(e, "hideIfNoPrevNext"),
			    K  = this._get(e, "navigationAsDateFormat"),
			    V  = this._getNumberOfMonths(e),
			    U  = this._get(e, "showCurrentAtPos"),
			    q  = this._get(e, "stepMonths"),
			    G  = 1 !== V[0] || 1 !== V[1],
			    X  = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
			    Q  = this._getMinMaxDate(e, "min"),
			    $  = this._getMinMaxDate(e, "max"),
			    Z  = e.drawMonth - U,
			    et = e.drawYear;

			if (0 > Z && (Z += 12, et--), $) for (t = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - V[0] * V[1] + 1, $.getDate())), t = Q && Q > t ? Q : t; this._daylightSavingAdjust(new Date(et, Z, 1)) > t;) {
				Z--, 0 > Z && (Z = 11, et--);
			}

			for (e.drawMonth = Z, e.drawYear = et, i = this._get(e, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z - q, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : B ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(e, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(et, Z + q, 1)), this._getFormatConfig(e)) : n, a = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : B ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", o = this._get(e, "currentText"), r = this._get(e, "gotoCurrent") && e.currentDay ? X : R, o = K ? this.formatDate(o, r, this._getFormatConfig(e)) : o, h = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", l = J ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(e, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (Y ? "" : h) + "</div>" : "", u = parseInt(this._get(e, "firstDay"), 10), u = isNaN(u) ? 0 : u, d = this._get(e, "showWeek"), c = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), _ = "", w = 0; V[0] > w; w++) {
				for (k = "", this.maxRows = 4, T = 0; V[1] > T; T++) {
					if (D = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), S = " ui-corner-all", N = "", G) {
						if (N += "<div class='ui-datepicker-group", V[1] > 1) switch (T) {
							case 0:
								N += " ui-datepicker-group-first", S = " ui-corner-" + (Y ? "right" : "left");
								break;

							case V[1] - 1:
								N += " ui-datepicker-group-last", S = " ui-corner-" + (Y ? "left" : "right");
								break;

							default:
								N += " ui-datepicker-group-middle", S = "";
						}
						N += "'>";
					}

					for (N += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === w ? Y ? a : s : "") + (/all|right/.test(S) && 0 === w ? Y ? s : a : "") + this._generateMonthYearHeader(e, Z, et, Q, $, w > 0 || T > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", M = d ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) {
						C = (x + u) % 7, M += "<th scope='col'" + ((x + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + c[C] + "'>" + p[C] + "</span></th>";
					}

					for (N += M + "</tr></thead><tbody>", P = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, P)), A = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7, I = Math.ceil((A + P) / 7), H = G ? this.maxRows > I ? this.maxRows : I : I, this.maxRows = H, z = this._daylightSavingAdjust(new Date(et, Z, 1 - A)), F = 0; H > F; F++) {
						for (N += "<tr>", E = d ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(z) + "</td>" : "", x = 0; 7 > x; x++) {
							W = g ? g.apply(e.input ? e.input[0] : null, [z]) : [!0, ""], L = z.getMonth() !== Z, O = L && !y || !W[0] || Q && Q > z || $ && z > $, E += "<td class='" + ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + (z.getTime() === D.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === z.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (O ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !v ? "" : " " + W[1] + (z.getTime() === X.getTime() ? " " + this._currentClass : "") + (z.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + (L && !v || !W[2] ? "" : " title='" + W[2].replace(/'/g, "&#39;") + "'") + (O ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (L && !v ? "&#xa0;" : O ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === R.getTime() ? " ui-state-highlight" : "") + (z.getTime() === X.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
						}

						N += E + "</tr>";
					}

					Z++, Z > 11 && (Z = 0, et++), N += "</tbody></table>" + (G ? "</div>" + (V[0] > 0 && T === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += N;
				}

				_ += k;
			}

			return _ += l, e._keyEvent = !1, _;
		},
		_generateMonthYearHeader: function _generateMonthYearHeader(e, t, i, s, n, a, o, r) {
			var h,
			    l,
			    u,
			    d,
			    c,
			    p,
			    f,
			    m,
			    g = this._get(e, "changeMonth"),
			    v = this._get(e, "changeYear"),
			    y = this._get(e, "showMonthAfterYear"),
			    b = "<div class='ui-datepicker-title'>",
			    _ = "";

			if (a || !g) _ += "<span class='ui-datepicker-month'>" + o[t] + "</span>"; else {
				for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++) {
					(!h || u >= s.getMonth()) && (!l || n.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === t ? " selected='selected'" : "") + ">" + r[u] + "</option>");
				}

				_ += "</select>";
			}
			if (y || (b += _ + (!a && g && v ? "" : "&#xa0;")), !e.yearshtml) if (e.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>"; else {
				for (d = this._get(e, "yearRange").split(":"), c = new Date().getFullYear(), p = function p(e) {
					var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? c + parseInt(e, 10) : parseInt(e, 10);
					return isNaN(t) ? c : t;
				}, f = p(d[0]), m = Math.max(f, p(d[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) {
					e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
				}

				e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null;
			}
			return b += this._get(e, "yearSuffix"), y && (b += (!a && g && v ? "" : "&#xa0;") + _), b += "</div>";
		},
		_adjustInstDate:          function _adjustInstDate(e, t, i) {
			var s = e.drawYear + ("Y" === i ? t : 0),
			    n = e.drawMonth + ("M" === i ? t : 0),
			    a = Math.min(e.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? t : 0),
			    o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, n, a)));

			e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e);
		},
		_restrictMinMax:          function _restrictMinMax(e, t) {
			var i = this._getMinMaxDate(e, "min"),
			    s = this._getMinMaxDate(e, "max"),
			    n = i && i > t ? i : t;

			return s && n > s ? s : n;
		},
		_notifyChange:            function _notifyChange(e) {
			var t = this._get(e, "onChangeMonthYear");

			t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e]);
		},
		_getNumberOfMonths:       function _getNumberOfMonths(e) {
			var t = this._get(e, "numberOfMonths");

			return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
		},
		_getMinMaxDate:           function _getMinMaxDate(e, t) {
			return this._determineDate(e, this._get(e, t + "Date"), null);
		},
		_getDaysInMonth:          function _getDaysInMonth(e, t) {
			return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate();
		},
		_getFirstDayOfMonth:      function _getFirstDayOfMonth(e, t) {
			return new Date(e, t, 1).getDay();
		},
		_canAdjustMonth:          function _canAdjustMonth(e, t, i, s) {
			var n = this._getNumberOfMonths(e),
			    a = this._daylightSavingAdjust(new Date(i, s + (0 > t ? t : n[0] * n[1]), 1));

			return 0 > t && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(e, a);
		},
		_isInRange:               function _isInRange(e, t) {
			var i,
			    s,
			    n = this._getMinMaxDate(e, "min"),
			    a = this._getMinMaxDate(e, "max"),
			    o = null,
			    r = null,
			    h = this._get(e, "yearRange");

			return h && (i = h.split(":"), s = new Date().getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || t.getTime() >= n.getTime()) && (!a || t.getTime() <= a.getTime()) && (!o || t.getFullYear() >= o) && (!r || r >= t.getFullYear());
		},
		_getFormatConfig:         function _getFormatConfig(e) {
			var t = this._get(e, "shortYearCutoff");

			return t = "string" != typeof t ? t : new Date().getFullYear() % 100 + parseInt(t, 10), {
				shortYearCutoff: t,
				dayNamesShort:   this._get(e, "dayNamesShort"),
				dayNames:        this._get(e, "dayNames"),
				monthNamesShort: this._get(e, "monthNamesShort"),
				monthNames:      this._get(e, "monthNames")
			};
		},
		_formatDate:              function _formatDate(e, t, i, s) {
			t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
			var n = t ? "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : this._daylightSavingAdjust(new Date(s, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
			return this.formatDate(this._get(e, "dateFormat"), n, this._getFormatConfig(e));
		}
	}), e.fn.datepicker = function (t) {
		if (!this.length) return this;
		e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
		var i = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function () {
			"string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t);
		}) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i));
	}, e.datepicker = new n(), e.datepicker.initialized = !1, e.datepicker.uuid = new Date().getTime(), e.datepicker.version = "1.11.1", e.datepicker;
});
//# sourceMappingURL=admin.jquery-ui.js.map