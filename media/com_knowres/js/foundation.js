(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["foundation"], {

	/***/ "./com_knowres/media/js/src/foundation/foundation.js":
	/*!***********************************************************!*\
	 !*** ./com_knowres/media/js/src/foundation/foundation.js ***!
	 \***********************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */
			"Foundation": () => (/* reexport safe */ _node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation)
			/* harmony export */
		});
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.core */ "./node_modules/foundation-sites/js/foundation.core.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.timer */ "./node_modules/foundation-sites/js/foundation.util.timer.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.dropdown */ "./node_modules/foundation-sites/js/foundation.dropdown.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.dropdownMenu */ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.equalizer */ "./node_modules/foundation-sites/js/foundation.equalizer.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_magellan__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.magellan */ "./node_modules/foundation-sites/js/foundation.magellan.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.offcanvas */ "./node_modules/foundation-sites/js/foundation.offcanvas.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.responsiveMenu */ "./node_modules/foundation-sites/js/foundation.responsiveMenu.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.reveal */ "./node_modules/foundation-sites/js/foundation.reveal.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.tabs */ "./node_modules/foundation-sites/js/foundation.tabs.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.toggler */ "./node_modules/foundation-sites/js/foundation.toggler.js");
		/* harmony import */
		var _node_modules_foundation_sites_js_foundation_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../node_modules/foundation-sites/js/foundation.tooltip */ "./node_modules/foundation-sites/js/foundation.tooltip.js");
		/* provided dependency */
		var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
//import $ from 'jquery';
//import 'what-input';
//for all
//import { Foundation } from ('./node_modules/foundation-sites');


		//import { Abide } from '../../../../../node_modules/foundation-sites/js/foundation.abide';
//import { Accordion } from '../../../../../node_modules/foundation-sites/js/foundation.accordion';
//import { AccordionMenu } from '../../../../../node_modules/foundation-sites/js/foundation.accordionMenu';
//import { Drilldown } from 'foundation.drilldown';


		//import { Interchange } from 'foundation.interchange';


		//import { Orbit } from 'foundation.orbit';

		//import { ResponsiveToggle } from 'foundation.responsiveToggle';

		//import { Slider } from 'foundation.slider';
//import { SmoothScroll } from 'foundation.smoothScroll';
//import { Sticky } from 'foundation.sticky';


		//import { ResponsiveAccordionTabs } from 'foundation.responsiveAccordionTabs';

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.addToJquery($); // IMPORTS
//Add Foundation Utils to Foundation global namespace for backwards
//compatibility.

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.rtl = _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.rtl;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.GetYoDigits = _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.transitionend = _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.transitionend;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.RegExpEscape = _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.RegExpEscape;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.onLoad = _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.onLoad;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Box = _node_modules_foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_2__.Box;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.onImagesLoaded = _node_modules_foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__.onImagesLoaded;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Keyboard = _node_modules_foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_4__.Keyboard;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.MediaQuery = _node_modules_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_5__.MediaQuery;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Motion = _node_modules_foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_6__.Motion;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Move = _node_modules_foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_6__.Move;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Nest = _node_modules_foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_7__.Nest;
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.Timer = _node_modules_foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_8__.Timer; //Touch and Triggers previously were almost purely side effect driven,
//so no need to add it to Foundation, just init them.

		_node_modules_foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_9__.Touch.init($);
		_node_modules_foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_10__.Triggers.init($, _node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation);

		_node_modules_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_5__.MediaQuery._init(); //Foundation.plugin(Abide, 'Abide');
//Foundation.plugin(Accordion, 'Accordion');
//Foundation.plugin(AccordionMenu, 'AccordionMenu');
//Foundation.plugin(Drilldown, 'Drilldown');


		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_dropdown__WEBPACK_IMPORTED_MODULE_11__.Dropdown, 'Dropdown');
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_12__.DropdownMenu, 'DropdownMenu');
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_13__.Equalizer, 'Equalizer'); //Foundation.plugin(Interchange, 'Interchange');

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_magellan__WEBPACK_IMPORTED_MODULE_14__.Magellan, 'Magellan');
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_15__.OffCanvas, 'OffCanvas'); //Foundation.plugin(Orbit, 'Orbit');

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__.ResponsiveMenu, 'ResponsiveMenu'); //Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_17__.Reveal, 'Reveal'); //Foundation.plugin(Slider, 'Slider');
//Foundation.plugin(SmoothScroll, 'SmoothScroll');
//Foundation.plugin(Sticky, 'Sticky');

		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_18__.Tabs, 'Tabs');
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_19__.Toggler, 'Toggler');
		_node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_node_modules_foundation_sites_js_foundation_tooltip__WEBPACK_IMPORTED_MODULE_20__.Tooltip, 'Tooltip'); //Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.accordionMenu.js":
	/*!**********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.accordionMenu.js ***!
	 \**********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "AccordionMenu": () => (/* binding */ AccordionMenu)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * AccordionMenu module.
		 * @module foundation.accordionMenu
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.nest
		 */

		var AccordionMenu = /*#__PURE__*/function (_Plugin) {
			_inherits(AccordionMenu, _Plugin);

			var _super = _createSuper(AccordionMenu);

			function AccordionMenu() {
				_classCallCheck(this, AccordionMenu);

				return _super.apply(this, arguments);
			}

			_createClass(AccordionMenu, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of an accordion menu.
				      * @class
				      * @name AccordionMenu
				      * @fires AccordionMenu#init
				      * @param {jQuery} element - jQuery object to make into an accordion menu.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, AccordionMenu.defaults, this.$element.data(), options);
					     this.className = 'AccordionMenu'; // ie9 back compat

					     this._init();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.register('AccordionMenu', {
						     'ENTER':       'toggle',
						     'SPACE':       'toggle',
						     'ARROW_RIGHT': 'open',
						     'ARROW_UP':    'up',
						     'ARROW_DOWN':  'down',
						     'ARROW_LEFT':  'close',
						     'ESCAPE':      'closeAll'
					     });
				     }
				/**
				 * Initializes the accordion menu by hiding all nested menus.
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__.Nest.Feather(this.$element, 'accordion');

					var _this = this;

					this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');

					this.$element.attr({
						'aria-multiselectable': this.options.multiOpen
					});
					this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
					this.$menuLinks.each(function () {
						var linkId   = this.id || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'acc-menu-link'),
						    $elem    = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $sub     = $elem.children('[data-submenu]'),
						    subId    = $sub[0].id || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'acc-menu'),
						    isActive = $sub.hasClass('is-active');

						if (_this.options.parentLink) {
							var $anchor = $elem.children('a');
							$anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
						}

						if (_this.options.submenuToggle) {
							$elem.addClass('has-submenu-toggle');
							$elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
						} else {
							$elem.attr({
								'aria-controls': subId,
								'aria-expanded': isActive,
								'id':            linkId
							});
						}

						$sub.attr({
							'aria-labelledby': linkId,
							'aria-hidden':     !isActive,
							'role':            'group',
							'id':              subId
						});
					});
					var initPanes = this.$element.find('.is-active');

					if (initPanes.length) {
						initPanes.each(function () {
							_this.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
						});
					}

					this._events();
				}
				/**
				 * Adds event handlers for items within the menu.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this = this;

					this.$element.find('li').each(function () {
						var $submenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]');

						if ($submenu.length) {
							if (_this.options.submenuToggle) {
								jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function () {
									_this.toggle($submenu);
								});
							} else {
								jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
									e.preventDefault();

									_this.toggle($submenu);
								});
							}
						}
					}).on('keydown.zf.accordionMenu', function (e) {
						var $element  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $elements = $element.parent('ul').children('li'),
						    $prevElement,
						    $nextElement,
						    $target   = $element.children('[data-submenu]');
						$elements.each(function (i) {
							if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
								$prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();
								$nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();

								if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]:visible').length) {
									// has open sub menu
									$nextElement = $element.find('li:first-child').find('a').first();
								}

								if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':first-child')) {
									// is first element of sub menu
									$prevElement = $element.parents('li').first().find('a').first();
								} else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {
									// if previous element has open sub menu
									$prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
								}

								if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':last-child')) {
									// is last element of sub menu
									$nextElement = $element.parents('li').first().next('li').find('a').first();
								}

								return;
							}
						});
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.handleKey(e, 'AccordionMenu', {
							open:     function open() {
								if ($target.is(':hidden')) {
									_this.down($target);

									$target.find('li').first().find('a').first().focus();
								}
							},
							close:    function close() {
								if ($target.length && !$target.is(':hidden')) {
									// close active sub of this item
									_this.up($target);
								} else if ($element.parent('[data-submenu]').length) {
									// close currently open sub
									_this.up($element.parent('[data-submenu]'));

									$element.parents('li').first().find('a').first().focus();
								}
							},
							up:       function up() {
								$prevElement.focus();
								return true;
							},
							down:     function down() {
								$nextElement.focus();
								return true;
							},
							toggle:   function toggle() {
								if (_this.options.submenuToggle) {
									return false;
								}

								if ($element.children('[data-submenu]').length) {
									_this.toggle($element.children('[data-submenu]'));

									return true;
								}
							},
							closeAll: function closeAll() {
								_this.hideAll();
							},
							handled:  function handled(preventDefault) {
								if (preventDefault) {
									e.preventDefault();
								}
							}
						});
					}); //.attr('tabindex', 0);
				}
				/**
				 * Closes all panes of the menu.
				 * @function
				 */

			}, {
				key:   "hideAll",
				value: function hideAll() {
					this.up(this.$element.find('[data-submenu]'));
				}
				/**
				 * Opens all panes of the menu.
				 * @function
				 */

			}, {
				key:   "showAll",
				value: function showAll() {
					this.down(this.$element.find('[data-submenu]'));
				}
				/**
				 * Toggles the open/close state of a submenu.
				 * @function
				 * @param {jQuery} $target - the submenu to toggle
				 */

			}, {
				key:   "toggle",
				value: function toggle($target) {
					if (!$target.is(':animated')) {
						if (!$target.is(':hidden')) {
							this.up($target);
						} else {
							this.down($target);
						}
					}
				}
				/**
				 * Opens the sub-menu defined by `$target`.
				 * @param {jQuery} $target - Sub-menu to open.
				 * @fires AccordionMenu#down
				 */

			}, {
				key:   "down",
				value: function down($target) {
					var _this2 = this;

					// If having multiple submenus active is disabled, close all the submenus
					// that are not parents or children of the targeted submenu.
					if (!this.options.multiOpen) {
						// The "branch" of the targetted submenu, from the component root to
						// the active submenus nested in it.
						var $targetBranch = $target.parentsUntil(this.$element).add($target).add($target.find('.is-active')); // All the active submenus that are not in the branch.

						var $othersActiveSubmenus = this.$element.find('.is-active').not($targetBranch);
						this.up($othersActiveSubmenus);
					}

					$target.addClass('is-active').attr({
						'aria-hidden': false
					});

					if (this.options.submenuToggle) {
						$target.prev('.submenu-toggle').attr({
							'aria-expanded': true
						});
					} else {
						$target.parent('.is-accordion-submenu-parent').attr({
							'aria-expanded': true
						});
					}

					$target.slideDown(this.options.slideSpeed, function () {
						/**
						 * Fires when the menu is done opening.
						 * @event AccordionMenu#down
						 */
						_this2.$element.trigger('down.zf.accordionMenu', [$target]);
					});
				}
				/**
				 * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
				 * @param {jQuery} $target - Sub-menu to close.
				 * @fires AccordionMenu#up
				 */

			}, {
				key:   "up",
				value: function up($target) {
					var _this3 = this;

					var $submenus = $target.find('[data-submenu]');
					var $allmenus = $target.add($submenus);
					$submenus.slideUp(0);
					$allmenus.removeClass('is-active').attr('aria-hidden', true);

					if (this.options.submenuToggle) {
						$allmenus.prev('.submenu-toggle').attr('aria-expanded', false);
					} else {
						$allmenus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
					}

					$target.slideUp(this.options.slideSpeed, function () {
						/**
						 * Fires when the menu is done collapsing up.
						 * @event AccordionMenu#up
						 */
						_this3.$element.trigger('up.zf.accordionMenu', [$target]);
					});
				}
				/**
				 * Destroys an instance of accordion menu.
				 * @fires AccordionMenu#destroyed
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.find('[data-submenu]').slideDown(0).css('display', '');
					this.$element.find('a').off('click.zf.accordionMenu');
					this.$element.find('[data-is-parent-link]').detach();

					if (this.options.submenuToggle) {
						this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
						this.$element.find('.submenu-toggle').remove();
					}

					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__.Nest.Burn(this.$element, 'accordion');
				}
			}]);

			return AccordionMenu;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__.Plugin);

		AccordionMenu.defaults = {
			/**
			 * Adds the parent link to the submenu.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			parentLink: false,

			/**
			 * Amount of time to animate the opening of a submenu in ms.
			 * @option
			 * @type {number}
			 * @default 250
			 */
			slideSpeed: 250,

			/**
			 * Adds a separate submenu toggle button. This allows the parent item to have a link.
			 * @option
			 * @example true
			 */
			submenuToggle: false,

			/**
			 * The text used for the submenu toggle if enabled. This is used for screen readers only.
			 * @option
			 * @example true
			 */
			submenuToggleText: 'Toggle menu',

			/**
			 * Allow the menu to have multiple open panes.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			multiOpen: true
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.core.js":
	/*!*************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.core.js ***!
	 \*************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Foundation": () => (/* binding */ Foundation)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}


		var FOUNDATION_VERSION = '6.7.4'; // Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify

		var Foundation = {
			version: FOUNDATION_VERSION,

			/**
			 * Stores initialized plugins.
			 */
			_plugins: {},

			/**
			 * Stores generated unique ids for plugin instances
			 */
			_uuids: [],

			/**
			 * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
			 * @param {Object} plugin - The constructor of the plugin.
			 */
			plugin: function plugin(_plugin, name) {
				// Object key to use when adding to global Foundation object
				// Examples: Foundation.Reveal, Foundation.OffCanvas
				var className = name || functionName(_plugin); // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
				// Examples: data-reveal, data-off-canvas

				var attrName = hyphenate(className); // Add to the Foundation object and the plugins list (for reflowing)

				this._plugins[attrName] = this[className] = _plugin;
			},

			/**
			 * @function
			 * Populates the _uuids array with pointers to each individual plugin instance.
			 * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
			 * Also fires the initialization event for each plugin, consolidating repetitive code.
			 * @param {Object} plugin - an instance of a plugin, usually `this` in context.
			 * @param {String} name - the name of the plugin, passed as a camelCased string.
			 * @fires Plugin#init
			 */
			registerPlugin: function registerPlugin(plugin, name) {
				var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
				plugin.uuid = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, pluginName);

				if (!plugin.$element.attr("data-".concat(pluginName))) {
					plugin.$element.attr("data-".concat(pluginName), plugin.uuid);
				}

				if (!plugin.$element.data('zfPlugin')) {
					plugin.$element.data('zfPlugin', plugin);
				}
				/**
				 * Fires when the plugin has initialized.
				 * @event Plugin#init
				 */


				plugin.$element.trigger("init.zf.".concat(pluginName));

				this._uuids.push(plugin.uuid);

				return;
			},

			/**
			 * @function
			 * Removes the plugins uuid from the _uuids array.
			 * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
			 * Also fires the destroyed event for the plugin, consolidating repetitive code.
			 * @param {Object} plugin - an instance of a plugin, usually `this` in context.
			 * @fires Plugin#destroyed
			 */
			unregisterPlugin: function unregisterPlugin(plugin) {
				var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

				this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);

				plugin.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
				/**
				 * Fires when the plugin has been destroyed.
				 * @event Plugin#destroyed
				 */
				.trigger("destroyed.zf.".concat(pluginName));

				for (var prop in plugin) {
					if (typeof plugin[prop] === 'function') {
						plugin[prop] = null; //clean up script to prep for garbage collection.
					}
				}

				return;
			},

			/**
			 * @function
			 * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
			 * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
			 * @default If no argument is passed, reflow all currently active plugins.
			 */
			reInit: function reInit(plugins) {
				var isJQ = plugins instanceof (jquery__WEBPACK_IMPORTED_MODULE_0___default());

				try {
					if (isJQ) {
						plugins.each(function () {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('zfPlugin')._init();
						});
					} else {
						var type  = _typeof(plugins),
						    _this = this,
						    fns   = {
							    'object':    function object(plgs) {
								    plgs.forEach(function (p) {
									    p = hyphenate(p);
									    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + p + ']').foundation('_init');
								    });
							    },
							    'string':    function string() {
								    plugins = hyphenate(plugins);
								    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + plugins + ']').foundation('_init');
							    },
							    'undefined': function undefined() {
								    this.object(Object.keys(_this._plugins));
							    }
						    };

						fns[type](plugins);
					}
				} catch (err) {
					console.error(err);
				} finally {
					return plugins;
				}
			},

			/**
			 * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
			 * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
			 * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
			 */
			reflow:      function reflow(elem, plugins) {
				// If plugins is undefined, just grab everything
				if (typeof plugins === 'undefined') {
					plugins = Object.keys(this._plugins);
				} // If plugins is a string, convert it to an array with one item
				else if (typeof plugins === 'string') {
					plugins = [plugins];
				}

				var _this = this; // Iterate through each plugin


				jquery__WEBPACK_IMPORTED_MODULE_0___default().each(plugins, function (i, name) {
					// Get the current plugin
					var plugin = _this._plugins[name]; // Localize the search to all elements inside elem, as well as elem itself, unless elem === document

					var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).find('[data-' + name + ']').addBack('[data-' + name + ']').filter(function () {
						return typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("zfPlugin") === 'undefined';
					}); // For each plugin found, initialize it

					$elem.each(function () {
						var $el  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    opts = {
							    reflow: true
						    };

						if ($el.attr('data-options')) {
							$el.attr('data-options').split(';').forEach(function (option) {
								var opt = option.split(':').map(function (el) {
									return el.trim();
								});
								if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
							});
						}

						try {
							$el.data('zfPlugin', new plugin(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), opts));
						} catch (er) {
							console.error(er);
						} finally {
							return;
						}
					});
				});
			},
			getFnName:   functionName,
			addToJquery: function addToJquery() {
				// TODO: consider not making this a jQuery function
				// TODO: need way to reflow vs. re-initialize

				/**
				 * The Foundation jQuery method.
				 * @param {String|Array} method - An action to perform on the current jQuery object.
				 */
				var foundation = function foundation(method) {
					var type  = _typeof(method),
					    $noJS = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.no-js');

					if ($noJS.length) {
						$noJS.removeClass('no-js');
					}

					if (type === 'undefined') {
						//needs to initialize the Foundation object, or an individual plugin.
						_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__.MediaQuery._init();

						Foundation.reflow(this);
					} else if (type === 'string') {
						//an individual method to invoke on a plugin or group of plugins
						var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary

						var plugClass = this.data('zfPlugin'); //determine the class of plugin

						if (typeof plugClass !== 'undefined' && typeof plugClass[method] !== 'undefined') {
							//make sure both the class and method exist
							if (this.length === 1) {
								//if there's only one, call it directly.
								plugClass[method].apply(plugClass, args);
							} else {
								this.each(function (i, el) {
									//otherwise loop through the jQuery collection and invoke the method on each
									plugClass[method].apply(jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).data('zfPlugin'), args);
								});
							}
						} else {
							//error for no class or no method
							throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
						}
					} else {
						//error for invalid argument type
						throw new TypeError("We're sorry, ".concat(type, " is not a valid parameter. You must use a string representing the method you wish to invoke."));
					}

					return this;
				};

				(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.foundation) = foundation;
				return (jquery__WEBPACK_IMPORTED_MODULE_0___default());
			}
		};
		Foundation.util = {
			/**
			 * Function for applying a debounce effect to a function call.
			 * @function
			 * @param {Function} func - Function to be called at end of timeout.
			 * @param {Number} delay - Time in ms to delay the call of `func`.
			 * @returns function
			 */
			throttle: function throttle(func, delay) {
				var timer = null;
				return function () {
					var context = this,
					    args    = arguments;

					if (timer === null) {
						timer = setTimeout(function () {
							func.apply(context, args);
							timer = null;
						}, delay);
					}
				};
			}
		};
		window.Foundation = Foundation; // Polyfill for requestAnimationFrame

		(function () {
			if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
				return new Date().getTime();
			};
			var vendors = ['webkit', 'moz'];

			for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
				var vp = vendors[i];
				window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
			}

			if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
				var lastTime = 0;

				window.requestAnimationFrame = function (callback) {
					var now = Date.now();
					var nextTime = Math.max(lastTime + 16, now);
					return setTimeout(function () {
						callback(lastTime = nextTime);
					}, nextTime - now);
				};

				window.cancelAnimationFrame = clearTimeout;
			}
			/**
			 * Polyfill for performance.now, required by rAF
			 */


			if (!window.performance || !window.performance.now) {
				window.performance = {
					start: Date.now(),
					now:   function now() {
						return Date.now() - this.start;
					}
				};
			}
		})();

		if (!Function.prototype.bind) {
			/* eslint-disable no-extend-native */
			Function.prototype.bind = function (oThis) {
				if (typeof this !== 'function') {
					// closest thing possible to the ECMAScript 5
					// internal IsCallable function
					throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
				}

				var aArgs   = Array.prototype.slice.call(arguments, 1),
				    fToBind = this,
				    fNOP    = function fNOP() {
				    },
				    fBound  = function fBound() {
					    return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
				    };

				if (this.prototype) {
					// native functions don't have a prototype
					fNOP.prototype = this.prototype;
				}

				fBound.prototype = new fNOP();
				return fBound;
			};
		} // Polyfill to get the name of a function in IE9


		function functionName(fn) {
			if (typeof Function.prototype.name === 'undefined') {
				var funcNameRegex = /function\s([^(]{1,})\(/;
				var results = funcNameRegex.exec(fn.toString());
				return results && results.length > 1 ? results[1].trim() : "";
			} else if (typeof fn.prototype === 'undefined') {
				return fn.constructor.name;
			} else {
				return fn.prototype.constructor.name;
			}
		}

		function parseValue(str) {
			if ('true' === str) return true; else if ('false' === str) return false; else if (!isNaN(str * 1)) return parseFloat(str);
			return str;
		} // Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


		function hyphenate(str) {
			return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.core.plugin.js":
	/*!********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.core.plugin.js ***!
	 \********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Plugin": () => (/* binding */ Plugin)
			/* harmony export */
		});
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)

		var Plugin = /*#__PURE__*/function () {
			function Plugin(element, options) {
				_classCallCheck(this, Plugin);

				this._setup(element, options);

				var pluginName = getPluginName(this);
				this.uuid = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__.GetYoDigits)(6, pluginName);

				if (!this.$element.attr("data-".concat(pluginName))) {
					this.$element.attr("data-".concat(pluginName), this.uuid);
				}

				if (!this.$element.data('zfPlugin')) {
					this.$element.data('zfPlugin', this);
				}
				/**
				 * Fires when the plugin has initialized.
				 * @event Plugin#init
				 */


				this.$element.trigger("init.zf.".concat(pluginName));
			}

			_createClass(Plugin, [{
				key:   "destroy",
				value: function destroy() {
					this._destroy();

					var pluginName = getPluginName(this);
					this.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
					/**
					 * Fires when the plugin has been destroyed.
					 * @event Plugin#destroyed
					 */
					.trigger("destroyed.zf.".concat(pluginName));

					for (var prop in this) {
						if (this.hasOwnProperty(prop)) {
							this[prop] = null; //clean up script to prep for garbage collection.
						}
					}
				}
			}]);

			return Plugin;
		}(); // Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


		function hyphenate(str) {
			return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		function getPluginName(obj) {
			return hyphenate(obj.className);
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.core.utils.js":
	/*!*******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.core.utils.js ***!
	 \*******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "GetYoDigits":          () => (/* binding */ GetYoDigits),
			/* harmony export */   "RegExpEscape":         () => (/* binding */ RegExpEscape),
			/* harmony export */   "ignoreMousedisappear": () => (/* binding */ ignoreMousedisappear),
			/* harmony export */   "onLoad":               () => (/* binding */ onLoad),
			/* harmony export */   "rtl":                  () => (/* binding */ rtl),
			/* harmony export */   "transitionend":        () => (/* binding */ transitionend)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

		// Core Foundation Utilities, utilized in a number of places.

		/**
		 * Returns a boolean for RTL support
		 */

		function rtl() {
			return jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'rtl';
		}

		/**
		 * returns a random base-36 uid with namespacing
		 * @function
		 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
		 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
		 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
		 * @returns {String} - unique id
		 */


		function GetYoDigits() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
			var namespace = arguments.length > 1 ? arguments[1] : undefined;
			var str = '';
			var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
			var charsLength = chars.length;

			for (var i = 0; i < length; i++) {
				str += chars[Math.floor(Math.random() * charsLength)];
			}

			return namespace ? "".concat(str, "-").concat(namespace) : str;
		}

		/**
		 * Escape a string so it can be used as a regexp pattern
		 * @function
		 * @see https://stackoverflow.com/a/9310752/4317384
		 *
		 * @param {String} str - string to escape.
		 * @returns {String} - escaped string
		 */


		function RegExpEscape(str) {
			return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		}

		function transitionend($elem) {
			var transitions = {
				'transition':       'transitionend',
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition':    'transitionend',
				'OTransition':      'otransitionend'
			};
			var elem = document.createElement('div'),
			    end;

			for (var transition in transitions) {
				if (typeof elem.style[transition] !== 'undefined') {
					end = transitions[transition];
				}
			}

			if (end) {
				return end;
			} else {
				setTimeout(function () {
					$elem.triggerHandler('transitionend', [$elem]);
				}, 1);
				return 'transitionend';
			}
		}

		/**
		 * Return an event type to listen for window load.
		 *
		 * If `$elem` is passed, an event will be triggered on `$elem`. If window is already loaded, the event will still be triggered.
		 * If `handler` is passed, attach it to the event on `$elem`.
		 * Calling `onLoad` without handler allows you to get the event type that will be triggered before attaching the handler by yourself.
		 * @function
		 *
		 * @param {Object} [] $elem - jQuery element on which the event will be triggered if passed.
		 * @param {Function} [] handler - function to attach to the event.
		 * @returns {String} - event type that should or will be triggered.
		 */


		function onLoad($elem, handler) {
			var didLoad = document.readyState === 'complete';
			var eventType = (didLoad ? '_didLoad' : 'load') + '.zf.util.onLoad';

			var cb = function cb() {
				return $elem.triggerHandler(eventType);
			};

			if ($elem) {
				if (handler) $elem.one(eventType, handler);
				if (didLoad) setTimeout(cb); else jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', cb);
			}

			return eventType;
		}

		/**
		 * Retuns an handler for the `mouseleave` that ignore disappeared mouses.
		 *
		 * If the mouse "disappeared" from the document (like when going on a browser UI element, See https://git.io/zf-11410),
		 * the event is ignored.
		 * - If the `ignoreLeaveWindow` is `true`, the event is ignored when the user actually left the window
		 *   (like by switching to an other window with [Alt]+[Tab]).
		 * - If the `ignoreReappear` is `true`, the event will be ignored when the mouse will reappear later on the document
		 *   outside of the element it left.
		 *
		 * @function
		 *
		 * @param {Function} [] handler - handler for the filtered `mouseleave` event to watch.
		 * @param {Object} [] options - object of options:
		 * - {Boolean} [false] ignoreLeaveWindow - also ignore when the user switched windows.
		 * - {Boolean} [false] ignoreReappear - also ignore when the mouse reappeared outside of the element it left.
		 * @returns {Function} - filtered handler to use to listen on the `mouseleave` event.
		 */


		function ignoreMousedisappear(handler) {
			var _ref                  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    _ref$ignoreLeaveWindo = _ref.ignoreLeaveWindow,
			    ignoreLeaveWindow     = _ref$ignoreLeaveWindo === void 0 ? false : _ref$ignoreLeaveWindo,
			    _ref$ignoreReappear   = _ref.ignoreReappear,
			    ignoreReappear        = _ref$ignoreReappear === void 0 ? false : _ref$ignoreReappear;

			return function leaveEventHandler(eLeave) {
				for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					rest[_key - 1] = arguments[_key];
				}

				var callback = handler.bind.apply(handler, [this, eLeave].concat(rest)); // The mouse left: call the given callback if the mouse entered elsewhere

				if (eLeave.relatedTarget !== null) {
					return callback();
				} // Otherwise, check if the mouse actually left the window.
				// In firefox if the user switched between windows, the window sill have the focus by the time
				// the event is triggered. We have to debounce the event to test this case.


				setTimeout(function leaveEventDebouncer() {
					if (!ignoreLeaveWindow && document.hasFocus && !document.hasFocus()) {
						return callback();
					} // Otherwise, wait for the mouse to reeapear outside of the element,


					if (!ignoreReappear) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('mouseenter', function reenterEventHandler(eReenter) {
							if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(eLeave.currentTarget).has(eReenter.target).length) {
								// Fill where the mouse finally entered.
								eLeave.relatedTarget = eReenter.target;
								callback();
							}
						});
					}
				}, 0);
			};
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.drilldown.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.drilldown.js ***!
	 \******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Drilldown": () => (/* binding */ Drilldown)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Drilldown module.
		 * @module foundation.drilldown
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.nest
		 * @requires foundation.util.box
		 */

		var Drilldown = /*#__PURE__*/function (_Plugin) {
			_inherits(Drilldown, _Plugin);

			var _super = _createSuper(Drilldown);

			function Drilldown() {
				_classCallCheck(this, Drilldown);

				return _super.apply(this, arguments);
			}

			_createClass(Drilldown, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of a drilldown menu.
				      * @class
				      * @name Drilldown
				      * @param {jQuery} element - jQuery object to make into an accordion menu.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Drilldown.defaults, this.$element.data(), options);
					     this.className = 'Drilldown'; // ie9 back compat

					     this._init();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.register('Drilldown', {
						     'ENTER':       'open',
						     'SPACE':       'open',
						     'ARROW_RIGHT': 'next',
						     'ARROW_UP':    'up',
						     'ARROW_DOWN':  'down',
						     'ARROW_LEFT':  'previous',
						     'ESCAPE':      'close'
					     });
				     }
				/**
				 * Initializes the drilldown by creating jQuery collections of elements
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__.Nest.Feather(this.$element, 'drilldown');

					if (this.options.autoApplyClass) {
						this.$element.addClass('drilldown');
					}

					this.$element.attr({
						'aria-multiselectable': false
					});
					this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
					this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
					this.$menuItems = this.$element.find('li').not('.js-drilldown-back').find('a'); // Set the main menu as current by default (unless a submenu is selected)
					// Used to set the wrapper height when the drilldown is closed/reopened from any (sub)menu

					this.$currentMenu = this.$element;
					this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'drilldown'));

					this._prepareMenu();

					this._registerEvents();

					this._keyboardEvents();
				}
				/**
				 * prepares drilldown menu by setting attributes to links and elements
				 * sets a min height to prevent content jumping
				 * wraps the element if not already wrapped
				 * @private
				 * @function
				 */

			}, {
				key:   "_prepareMenu",
				value: function _prepareMenu() {
					var _this = this; // if(!this.options.holdOpen){
					//   this._menuLinkEvents();
					// }


					this.$submenuAnchors.each(function () {
						var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
						var $sub = $link.parent();

						if (_this.options.parentLink) {
							$link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="none"></li>');
						}

						$link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
						$link.children('[data-submenu]').attr({
							'aria-hidden': true,
							'tabindex':    0,
							'role':        'group'
						});

						_this._events($link);
					});
					this.$submenus.each(function () {
						var $menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $back = $menu.find('.js-drilldown-back');

						if (!$back.length) {
							switch (_this.options.backButtonPosition) {
								case "bottom":
									$menu.append(_this.options.backButton);
									break;

								case "top":
									$menu.prepend(_this.options.backButton);
									break;

								default:
									console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
							}
						}

						_this._back($menu);
					});
					this.$submenus.addClass('invisible');

					if (!this.options.autoHeight) {
						this.$submenus.addClass('drilldown-submenu-cover-previous');
					} // create a wrapper on element if it doesn't exist.


					if (!this.$element.parent().hasClass('is-drilldown')) {
						this.$wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.wrapper).addClass('is-drilldown');
						if (this.options.animateHeight) this.$wrapper.addClass('animate-height');
						this.$element.wrap(this.$wrapper);
					} // set wrapper


					this.$wrapper = this.$element.parent();
					this.$wrapper.css(this._getMaxDims());
				}
			}, {
				key:   "_resize",
				value: function _resize() {
					this.$wrapper.css({
						'max-width':  'none',
						'min-height': 'none'
					}); // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths

					this.$wrapper.css(this._getMaxDims());
				}
				/**
				 * Adds event handlers to elements in the menu.
				 * @function
				 * @private
				 * @param {jQuery} $elem - the current menu item to add handlers to.
				 */

			}, {
				key:   "_events",
				value: function _events($elem) {
					var _this = this;

					$elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
						if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
							e.preventDefault();
						} // if(e.target !== e.currentTarget.firstElementChild){
						//   return false;
						// }


						_this._show($elem.parent('li'));

						if (_this.options.closeOnClick) {
							var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
							$body.off('.zf.drilldown').on('click.zf.drilldown', function (ev) {
								if (ev.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(_this.$element[0], ev.target)) {
									return;
								}

								ev.preventDefault();

								_this._hideAll();

								$body.off('.zf.drilldown');
							});
						}
					});
				}
				/**
				 * Adds event handlers to the menu element.
				 * @function
				 * @private
				 */

			}, {
				key:   "_registerEvents",
				value: function _registerEvents() {
					if (this.options.scrollTop) {
						this._bindHandler = this._scrollTop.bind(this);
						this.$element.on('open.zf.drilldown hide.zf.drilldown close.zf.drilldown closed.zf.drilldown', this._bindHandler);
					}

					this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
				}
				/**
				 * Scroll to Top of Element or data-scroll-top-element
				 * @function
				 * @fires Drilldown#scrollme
				 */

			}, {
				key:   "_scrollTop",
				value: function _scrollTop() {
					var _this = this;

					var $scrollTopElement = _this.options.scrollTopElement !== '' ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.scrollTopElement) : _this.$element,
					    scrollPos         = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({
						scrollTop: scrollPos
					}, _this.options.animationDuration, _this.options.animationEasing, function () {
						/**
						 * Fires after the menu has scrolled
						 * @event Drilldown#scrollme
						 */
						if (this === jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');
					});
				}
				/**
				 * Adds keydown event listener to `li`'s in the menu.
				 * @private
				 */

			}, {
				key:   "_keyboardEvents",
				value: function _keyboardEvents() {
					var _this = this;

					this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
						var $element  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $elements = $element.parent('li').parent('ul').children('li').children('a'),
						    $prevElement,
						    $nextElement;
						$elements.each(function (i) {
							if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
								$prevElement = $elements.eq(Math.max(0, i - 1));
								$nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
								return;
							}
						});
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.handleKey(e, 'Drilldown', {
							next:     function next() {
								if ($element.is(_this.$submenuAnchors)) {
									_this._show($element.parent('li'));

									$element.parent('li').one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
										$element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
									});
									return true;
								}
							},
							previous: function previous() {
								_this._hide($element.parent('li').parent('ul'));

								$element.parent('li').parent('ul').one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
									setTimeout(function () {
										$element.parent('li').parent('ul').parent('li').children('a').first().focus();
									}, 1);
								});
								return true;
							},
							up:       function up() {
								$prevElement.focus(); // Don't tap focus on first element in root ul

								return !$element.is(_this.$element.find('> li:first-child > a'));
							},
							down:     function down() {
								$nextElement.focus(); // Don't tap focus on last element in root ul

								return !$element.is(_this.$element.find('> li:last-child > a'));
							},
							close:    function close() {
								// Don't close on element in root ul
								if (!$element.is(_this.$element.find('> li > a'))) {
									_this._hide($element.parent().parent());

									$element.parent().parent().siblings('a').focus();
								}
							},
							open:     function open() {
								if (_this.options.parentLink && $element.attr('href')) {
									// Link with href
									return false;
								} else if (!$element.is(_this.$menuItems)) {
									// not menu item means back button
									_this._hide($element.parent('li').parent('ul'));

									$element.parent('li').parent('ul').one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
										setTimeout(function () {
											$element.parent('li').parent('ul').parent('li').children('a').first().focus();
										}, 1);
									});
									return true;
								} else if ($element.is(_this.$submenuAnchors)) {
									// Sub menu item
									_this._show($element.parent('li'));

									$element.parent('li').one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
										$element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
									});
									return true;
								}
							},
							handled:  function handled(preventDefault) {
								if (preventDefault) {
									e.preventDefault();
								}
							}
						});
					}); // end keyboardAccess
				}
				/**
				 * Closes all open elements, and returns to root menu.
				 * @function
				 * @fires Drilldown#close
				 * @fires Drilldown#closed
				 */

			}, {
				key:   "_hideAll",
				value: function _hideAll() {
					var _this2 = this;

					var $elem = this.$element.find('.is-drilldown-submenu.is-active');
					$elem.addClass('is-closing');

					if (this.options.autoHeight) {
						var calcHeight = $elem.parent().closest('ul').data('calcHeight');
						this.$wrapper.css({
							height: calcHeight
						});
					}
					/**
					 * Fires when the menu is closing.
					 * @event Drilldown#close
					 */


					this.$element.trigger('close.zf.drilldown');
					$elem.one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($elem), function () {
						$elem.removeClass('is-active is-closing');
						/**
						 * Fires when the menu is fully closed.
						 * @event Drilldown#closed
						 */

						_this2.$element.trigger('closed.zf.drilldown');
					});
				}
				/**
				 * Adds event listener for each `back` button, and closes open menus.
				 * @function
				 * @fires Drilldown#back
				 * @param {jQuery} $elem - the current sub-menu to add `back` event.
				 */

			}, {
				key:   "_back",
				value: function _back($elem) {
					var _this = this;

					$elem.off('click.zf.drilldown');
					$elem.children('.js-drilldown-back').on('click.zf.drilldown', function () {
						_this._hide($elem); // If there is a parent submenu, call show


						var parentSubMenu = $elem.parent('li').parent('ul').parent('li');

						if (parentSubMenu.length) {
							_this._show(parentSubMenu);
						} else {
							_this.$currentMenu = _this.$element;
						}
					});
				}
				/**
				 * Adds event listener to menu items w/o submenus to close open menus on click.
				 * @function
				 * @private
				 */

			}, {
				key:   "_menuLinkEvents",
				value: function _menuLinkEvents() {
					var _this = this;

					this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function () {
						setTimeout(function () {
							_this._hideAll();
						}, 0);
					});
				}
				/**
				 * Sets the CSS classes for submenu to show it.
				 * @function
				 * @private
				 * @param {jQuery} $elem - the target submenu (`ul` tag)
				 * @param {boolean} trigger - trigger drilldown event
				 */

			}, {
				key:   "_setShowSubMenuClasses",
				value: function _setShowSubMenuClasses($elem, trigger) {
					$elem.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
					$elem.parent('li').attr('aria-expanded', true);

					if (trigger === true) {
						this.$element.trigger('open.zf.drilldown', [$elem]);
					}
				}
				/**
				 * Sets the CSS classes for submenu to hide it.
				 * @function
				 * @private
				 * @param {jQuery} $elem - the target submenu (`ul` tag)
				 * @param {boolean} trigger - trigger drilldown event
				 */

			}, {
				key:   "_setHideSubMenuClasses",
				value: function _setHideSubMenuClasses($elem, trigger) {
					$elem.removeClass('is-active').addClass('invisible').attr('aria-hidden', true);
					$elem.parent('li').attr('aria-expanded', false);

					if (trigger === true) {
						$elem.trigger('hide.zf.drilldown', [$elem]);
					}
				}
				/**
				 * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
				 * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
				 * @function
				 * @fires Drilldown#open
				 * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
				 * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
				 */

			}, {
				key:   "_showMenu",
				value: function _showMenu($elem, autoFocus) {
					var _this = this; // Reset drilldown


					var $expandedSubmenus = this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
					$expandedSubmenus.each(function () {
						_this._setHideSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
					}); // Save the menu as the currently displayed one.

					this.$currentMenu = $elem; // If target menu is root, focus first link & exit

					if ($elem.is('[data-drilldown]')) {
						if (autoFocus === true) $elem.find('li > a').first().focus();
						if (this.options.autoHeight) this.$wrapper.css('height', $elem.data('calcHeight'));
						return;
					} // Find all submenus on way to root incl. the element itself


					var $submenus = $elem.children().first().parentsUntil('[data-drilldown]', '[data-submenu]'); // Open target menu and all submenus on its way to root

					$submenus.each(function (index) {
						// Update height of first child (target menu) if autoHeight option true
						if (index === 0 && _this.options.autoHeight) {
							_this.$wrapper.css('height', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight'));
						}

						var isLastChild = index === $submenus.length - 1; // Add transitionsend listener to last child (root due to reverse order) to open target menu's first link
						// Last child makes sure the event gets always triggered even if going through several menus

						if (isLastChild === true) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)), function () {
								if (autoFocus === true) {
									$elem.find('li > a').first().focus();
								}
							});
						}

						_this._setShowSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), isLastChild);
					});
				}
				/**
				 * Opens a submenu.
				 * @function
				 * @fires Drilldown#open
				 * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
				 */

			}, {
				key:   "_show",
				value: function _show($elem) {
					var $submenu = $elem.children('[data-submenu]');
					$elem.attr('aria-expanded', true);
					this.$currentMenu = $submenu; //hide drilldown parent menu when submenu is open
					// this removes it from the dom so that the tab key will take the user to the next visible element

					$elem.parent().closest('ul').addClass('invisible'); // add visible class to submenu to override invisible class above

					$submenu.addClass('is-active visible').removeClass('invisible').attr('aria-hidden', false);

					if (this.options.autoHeight) {
						this.$wrapper.css({
							height: $submenu.data('calcHeight')
						});
					}
					/**
					 * Fires when the submenu has opened.
					 * @event Drilldown#open
					 */


					this.$element.trigger('open.zf.drilldown', [$elem]);
				}
				/**
				 * Hides a submenu
				 * @function
				 * @fires Drilldown#hide
				 * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
				 */

			}, {
				key:   "_hide",
				value: function _hide($elem) {
					if (this.options.autoHeight) this.$wrapper.css({
						height: $elem.parent().closest('ul').data('calcHeight')
					});
					$elem.parent().closest('ul').removeClass('invisible');
					$elem.parent('li').attr('aria-expanded', false);
					$elem.attr('aria-hidden', true);
					$elem.addClass('is-closing').one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($elem), function () {
						$elem.removeClass('is-active is-closing visible');
						$elem.blur().addClass('invisible');
					});
					/**
					 * Fires when the submenu has closed.
					 * @event Drilldown#hide
					 */

					$elem.trigger('hide.zf.drilldown', [$elem]);
				}
				/**
				 * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
				 * Prevents content jumping.
				 * @function
				 * @private
				 */

			}, {
				key:   "_getMaxDims",
				value: function _getMaxDims() {
					var maxHeight = 0,
					    result    = {},
					    _this     = this; // Recalculate menu heights and total max height


					this.$submenus.add(this.$element).each(function () {
						var height = _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__.Box.GetDimensions(this).height;
						maxHeight = height > maxHeight ? height : maxHeight;

						if (_this.options.autoHeight) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight', height);
						}
					});
					if (this.options.autoHeight) result.height = this.$currentMenu.data('calcHeight'); else result['min-height'] = "".concat(maxHeight, "px");
					result['max-width'] = "".concat(this.$element[0].getBoundingClientRect().width, "px");
					return result;
				}
				/**
				 * Destroys the Drilldown Menu
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('.zf.drilldown');
					if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);

					this._hideAll();

					this.$element.off('mutateme.zf.trigger');
					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__.Nest.Burn(this.$element, 'drilldown');
					this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').off('transitionend otransitionend webkitTransitionEnd').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
					this.$submenuAnchors.each(function () {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('.zf.drilldown');
					});
					this.$element.find('[data-is-parent-link]').detach();
					this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');
					this.$element.find('a').each(function () {
						var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
						$link.removeAttr('tabindex');

						if ($link.data('savedHref')) {
							$link.attr('href', $link.data('savedHref')).removeData('savedHref');
						} else {
							return;
						}
					});
				}
			}]);

			return Drilldown;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__.Plugin);

		Drilldown.defaults = {
			/**
			 * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
			 * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			autoApplyClass: true,

			/**
			 * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
			 * @option
			 * @type {string}
			 * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
			 */
			backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',

			/**
			 * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
			 * @option
			 * @type {string}
			 * @default top
			 */
			backButtonPosition: 'top',

			/**
			 * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
			 * @option
			 * @type {string}
			 * @default '<div></div>'
			 */
			wrapper: '<div></div>',

			/**
			 * Adds the parent link to the submenu.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			parentLink: false,

			/**
			 * Allow the menu to return to root list on body click.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			closeOnClick: false,

			/**
			 * Allow the menu to auto adjust height.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			autoHeight: false,

			/**
			 * Animate the auto adjust height.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			animateHeight: false,

			/**
			 * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			scrollTop: false,

			/**
			 * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
			 * @option
			 * @type {string}
			 * @default ''
			 */
			scrollTopElement: '',

			/**
			 * ScrollTop offset
			 * @option
			 * @type {number}
			 * @default 0
			 */
			scrollTopOffset: 0,

			/**
			 * Scroll animation duration
			 * @option
			 * @type {number}
			 * @default 500
			 */
			animationDuration: 500,

			/**
			 * Scroll animation easing. Can be `'swing'` or `'linear'`.
			 * @option
			 * @type {string}
			 * @see {@link https://api.jquery.com/animate|JQuery animate}
			 * @default 'swing'
			 */
			animationEasing: 'swing' // holdOpen: false

		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.dropdown.js":
	/*!*****************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.dropdown.js ***!
	 \*****************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Dropdown": () => (/* binding */ Dropdown)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.positionable */ "./node_modules/foundation-sites/js/foundation.positionable.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
		/* harmony import */
		var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _get() {
			if (typeof Reflect !== "undefined" && Reflect.get) {
				_get = Reflect.get;
			} else {
				_get = function _get(target, property, receiver) {
					var base = _superPropBase(target, property);
					if (!base) return;
					var desc = Object.getOwnPropertyDescriptor(base, property);
					if (desc.get) {
						return desc.get.call(arguments.length < 3 ? target : receiver);
					}
					return desc.value;
				};
			}
			return _get.apply(this, arguments);
		}

		function _superPropBase(object, property) {
			while (!Object.prototype.hasOwnProperty.call(object, property)) {
				object = _getPrototypeOf(object);
				if (object === null) break;
			}
			return object;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Dropdown module.
		 * @module foundation.dropdown
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.box
		 * @requires foundation.util.touch
		 * @requires foundation.util.triggers
		 */

		var Dropdown = /*#__PURE__*/function (_Positionable) {
			_inherits(Dropdown, _Positionable);

			var _super = _createSuper(Dropdown);

			function Dropdown() {
				_classCallCheck(this, Dropdown);

				return _super.apply(this, arguments);
			}

			_createClass(Dropdown, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of a dropdown.
				      * @class
				      * @name Dropdown
				      * @param {jQuery} element - jQuery object to make into a dropdown.
				      *        Object should be of the dropdown panel, rather than its anchor.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Dropdown.defaults, this.$element.data(), options);
					     this.className = 'Dropdown'; // ie9 back compat
					     // Touch and Triggers init are idempotent, just need to make sure they are initialized

					     _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__.Touch.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));

					     this._init();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.register('Dropdown', {
						     'ENTER':  'toggle',
						     'SPACE':  'toggle',
						     'ESCAPE': 'close'
					     });
				     }
				/**
				 * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
				 * @function
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var $id = this.$element.attr('id');
					this.$anchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat($id, "\"]")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat($id, "\"]")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat($id, "\"]"));
					this.$anchors.attr({
						'aria-controls': $id,
						'data-is-focus': false,
						'data-yeti-box': $id,
						'aria-haspopup': true,
						'aria-expanded': false
					});

					this._setCurrentAnchor(this.$anchors.first());

					if (this.options.parentClass) {
						this.$parent = this.$element.parents('.' + this.options.parentClass);
					} else {
						this.$parent = null;
					} // Set [aria-labelledby] on the Dropdown if it is not set


					if (typeof this.$element.attr('aria-labelledby') === 'undefined') {
						// Get the anchor ID or create one
						if (typeof this.$currentAnchor.attr('id') === 'undefined') {
							this.$currentAnchor.attr('id', (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'dd-anchor'));
						}

						this.$element.attr('aria-labelledby', this.$currentAnchor.attr('id'));
					}

					this.$element.attr({
						'aria-hidden':   'true',
						'data-yeti-box': $id,
						'data-resize':   $id
					});

					_get(_getPrototypeOf(Dropdown.prototype), "_init", this).call(this);

					this._events();
				}
			}, {
				key:   "_getDefaultPosition",
				value: function _getDefaultPosition() {
					// handle legacy classnames
					var position = this.$element[0].className.match(/(top|left|right|bottom)/g);

					if (position) {
						return position[0];
					} else {
						return 'bottom';
					}
				}
			}, {
				key:   "_getDefaultAlignment",
				value: function _getDefaultAlignment() {
					// handle legacy float approach
					var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.attr('class'));

					if (horizontalPosition) {
						return horizontalPosition[1];
					}

					return _get(_getPrototypeOf(Dropdown.prototype), "_getDefaultAlignment", this).call(this);
				}
				/**
				 * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
				 * Recursively calls itself if a collision is detected, with a new position class.
				 * @function
				 * @private
				 */

			}, {
				key:   "_setPosition",
				value: function _setPosition() {
					this.$element.removeClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));

					_get(_getPrototypeOf(Dropdown.prototype), "_setPosition", this).call(this, this.$currentAnchor, this.$element, this.$parent);

					this.$element.addClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));
				}
				/**
				 * Make it a current anchor.
				 * Current anchor as the reference for the position of Dropdown panes.
				 * @param {HTML} el - DOM element of the anchor.
				 * @function
				 * @private
				 */

			}, {
				key:   "_setCurrentAnchor",
				value: function _setCurrentAnchor(el) {
					this.$currentAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
				}
				/**
				 * Adds event listeners to the element utilizing the triggers utility library.
				 * @function
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this    = this,
					    hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined';

					this.$element.on({
						'open.zf.trigger':     this.open.bind(this),
						'close.zf.trigger':    this.close.bind(this),
						'toggle.zf.trigger':   this.toggle.bind(this),
						'resizeme.zf.trigger': this._setPosition.bind(this)
					});
					this.$anchors.off('click.zf.trigger').on('click.zf.trigger', function (e) {
						_this._setCurrentAnchor(this);

						if ( // if forceFollow false, always prevent default action
							_this.options.forceFollow === false || // if forceFollow true and hover option true, only prevent default action on 1st click
							// on 2nd click (dropown opened) the default action (e.g. follow a href) gets executed
							hasTouch && _this.options.hover && _this.$element.hasClass('is-open') === false) {
							e.preventDefault();
						}
					});

					if (this.options.hover) {
						this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
							_this._setCurrentAnchor(this);

							var bodyData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').data();

							if (typeof bodyData.whatinput === 'undefined' || bodyData.whatinput === 'mouse') {
								clearTimeout(_this.timeout);
								_this.timeout = setTimeout(function () {
									_this.open();

									_this.$anchors.data('hover', true);
								}, _this.options.hoverDelay);
							}
						}).on('mouseleave.zf.dropdown', (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
							clearTimeout(_this.timeout);
							_this.timeout = setTimeout(function () {
								_this.close();

								_this.$anchors.data('hover', false);
							}, _this.options.hoverDelay);
						}));

						if (this.options.hoverPane) {
							this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
								clearTimeout(_this.timeout);
							}).on('mouseleave.zf.dropdown', (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
								clearTimeout(_this.timeout);
								_this.timeout = setTimeout(function () {
									_this.close();

									_this.$anchors.data('hover', false);
								}, _this.options.hoverDelay);
							}));
						}
					}

					this.$anchors.add(this.$element).on('keydown.zf.dropdown', function (e) {
						var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.handleKey(e, 'Dropdown', {
							open:  function open() {
								if ($target.is(_this.$anchors) && !$target.is('input, textarea')) {
									_this.open();

									_this.$element.attr('tabindex', -1).focus();

									e.preventDefault();
								}
							},
							close: function close() {
								_this.close();

								_this.$anchors.focus();
							}
						});
					});
				}
				/**
				 * Adds an event handler to the body to close any dropdowns on a click.
				 * @function
				 * @private
				 */

			}, {
				key:   "_addBodyHandler",
				value: function _addBodyHandler() {
					var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).not(this.$element),
					    _this = this;

					$body.off('click.zf.dropdown tap.zf.dropdown').on('click.zf.dropdown tap.zf.dropdown', function (e) {
						if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
							return;
						}

						if (_this.$element.is(e.target) || _this.$element.find(e.target).length) {
							return;
						}

						_this.close();

						$body.off('click.zf.dropdown tap.zf.dropdown');
					});
				}
				/**
				 * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
				 * @function
				 * @fires Dropdown#closeme
				 * @fires Dropdown#show
				 */

			}, {
				key:   "open",
				value: function open() {
					// var _this = this;

					/**
					 * Fires to close other open dropdowns, typically when dropdown is opening
					 * @event Dropdown#closeme
					 */
					this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
					this.$anchors.addClass('hover').attr({
						'aria-expanded': true
					}); // this.$element/*.show()*/;

					this.$element.addClass('is-opening');

					this._setPosition();

					this.$element.removeClass('is-opening').addClass('is-open').attr({
						'aria-hidden': false
					});

					if (this.options.autoFocus) {
						var $focusable = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.findFocusable(this.$element);

						if ($focusable.length) {
							$focusable.eq(0).focus();
						}
					}

					if (this.options.closeOnClick) {
						this._addBodyHandler();
					}

					if (this.options.trapFocus) {
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.trapFocus(this.$element);
					}
					/**
					 * Fires once the dropdown is visible.
					 * @event Dropdown#show
					 */


					this.$element.trigger('show.zf.dropdown', [this.$element]);
				}
				/**
				 * Closes the open dropdown pane.
				 * @function
				 * @fires Dropdown#hide
				 */

			}, {
				key:   "close",
				value: function close() {
					if (!this.$element.hasClass('is-open')) {
						return false;
					}

					this.$element.removeClass('is-open').attr({
						'aria-hidden': true
					});
					this.$anchors.removeClass('hover').attr('aria-expanded', false);
					/**
					 * Fires once the dropdown is no longer visible.
					 * @event Dropdown#hide
					 */

					this.$element.trigger('hide.zf.dropdown', [this.$element]);

					if (this.options.trapFocus) {
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__.Keyboard.releaseFocus(this.$element);
					}
				}
				/**
				 * Toggles the dropdown pane's visibility.
				 * @function
				 */

			}, {
				key:   "toggle",
				value: function toggle() {
					if (this.$element.hasClass('is-open')) {
						if (this.$anchors.data('hover')) return;
						this.close();
					} else {
						this.open();
					}
				}
				/**
				 * Destroys the dropdown.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.off('.zf.trigger').hide();
					this.$anchors.off('.zf.dropdown');
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdown tap.zf.dropdown');
				}
			}]);

			return Dropdown;
		}(_foundation_positionable__WEBPACK_IMPORTED_MODULE_3__.Positionable);

		Dropdown.defaults = {
			/**
			 * Class that designates bounding container of Dropdown (default: window)
			 * @option
			 * @type {?string}
			 * @default null
			 */
			parentClass: null,

			/**
			 * Amount of time to delay opening a submenu on hover event.
			 * @option
			 * @type {number}
			 * @default 250
			 */
			hoverDelay: 250,

			/**
			 * Allow submenus to open on hover events
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			hover: false,

			/**
			 * Don't close dropdown when hovering over dropdown pane
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			hoverPane: false,

			/**
			 * Number of pixels between the dropdown pane and the triggering element on open.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			vOffset: 0,

			/**
			 * Number of pixels between the dropdown pane and the triggering element on open.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			hOffset: 0,

			/**
			 * Position of dropdown. Can be left, right, bottom, top, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			position: 'auto',

			/**
			 * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			alignment: 'auto',

			/**
			 * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			allowOverlap: false,

			/**
			 * Allow overlap of only the bottom of the container. This is the most common
			 * behavior for dropdowns, allowing the dropdown to extend the bottom of the
			 * screen but not otherwise influence or break out of the container.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			allowBottomOverlap: true,

			/**
			 * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			trapFocus: false,

			/**
			 * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			autoFocus: false,

			/**
			 * Allows a click on the body to close the dropdown.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			closeOnClick: false,

			/**
			 * If true the default action of the toggle (e.g. follow a link with href) gets executed on click. If hover option is also true the default action gets prevented on first click for mobile / touch devices and executed on second click.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			forceFollow: true
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js":
	/*!*********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.dropdownMenu.js ***!
	 \*********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "DropdownMenu": () => (/* binding */ DropdownMenu)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
		/* harmony import */
		var _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
		/* harmony import */
		var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * DropdownMenu module.
		 * @module foundation.dropdownMenu
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.box
		 * @requires foundation.util.nest
		 * @requires foundation.util.touch
		 */

		var DropdownMenu = /*#__PURE__*/function (_Plugin) {
			_inherits(DropdownMenu, _Plugin);

			var _super = _createSuper(DropdownMenu);

			function DropdownMenu() {
				_classCallCheck(this, DropdownMenu);

				return _super.apply(this, arguments);
			}

			_createClass(DropdownMenu, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of DropdownMenu.
				      * @class
				      * @name DropdownMenu
				      * @fires DropdownMenu#init
				      * @param {jQuery} element - jQuery object to make into a dropdown menu.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, DropdownMenu.defaults, this.$element.data(), options);
					     this.className = 'DropdownMenu'; // ie9 back compat

					     _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__.Touch.init((jquery__WEBPACK_IMPORTED_MODULE_0___default())); // Touch init is idempotent, we just need to make sure it's initialied.

					     this._init();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.register('DropdownMenu', {
						     'ENTER':       'open',
						     'SPACE':       'open',
						     'ARROW_RIGHT': 'next',
						     'ARROW_UP':    'up',
						     'ARROW_DOWN':  'down',
						     'ARROW_LEFT':  'previous',
						     'ESCAPE':      'close'
					     });
				     }
				/**
				 * Initializes the plugin, and calls _prepareMenu
				 * @private
				 * @function
				 */

			}, {
				key:   "_init",
				value: function _init() {
					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__.Nest.Feather(this.$element, 'dropdown');
					var subs = this.$element.find('li.is-dropdown-submenu-parent');
					this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');
					this.$menuItems = this.$element.find('li[role="none"]');
					this.$tabs = this.$element.children('li[role="none"]');
					this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

					if (this.options.alignment === 'auto') {
						if (this.$element.hasClass(this.options.rightClass) || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() || this.$element.parents('.top-bar-right').is('*')) {
							this.options.alignment = 'right';
							subs.addClass('opens-left');
						} else {
							this.options.alignment = 'left';
							subs.addClass('opens-right');
						}
					} else {
						if (this.options.alignment === 'right') {
							subs.addClass('opens-left');
						} else {
							subs.addClass('opens-right');
						}
					}

					this.changed = false;

					this._events();
				}
			}, {
				key:   "_isVertical",
				value: function _isVertical() {
					return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
				}
			}, {
				key:   "_isRtl",
				value: function _isRtl() {
					return this.$element.hasClass('align-right') || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() && !this.$element.hasClass('align-left');
				}
				/**
				 * Adds event listeners to elements within the menu
				 * @private
				 * @function
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this    = this,
					    hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
					    parClass = 'is-dropdown-submenu-parent'; // used for onClick and in the keyboard handlers


					var handleClickFn = function handleClickFn(e) {
						var $elem      = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', ".".concat(parClass)),
						    hasSub     = $elem.hasClass(parClass),
						    hasClicked = $elem.attr('data-is-click') === 'true',
						    $sub       = $elem.children('.is-dropdown-submenu');

						if (hasSub) {
							if (hasClicked) {
								if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
									return;
								}

								e.stopImmediatePropagation();
								e.preventDefault();

								_this._hide($elem);
							} else {
								e.stopImmediatePropagation();
								e.preventDefault();

								_this._show($sub);

								$elem.add($elem.parentsUntil(_this.$element, ".".concat(parClass))).attr('data-is-click', true);
							}
						}
					};

					if (this.options.clickOpen || hasTouch) {
						this.$menuItems.on('click.zf.dropdownMenu touchstart.zf.dropdownMenu', handleClickFn);
					} // Handle Leaf element Clicks


					if (_this.options.closeOnClickInside) {
						this.$menuItems.on('click.zf.dropdownMenu', function () {
							var $elem  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
							    hasSub = $elem.hasClass(parClass);

							if (!hasSub) {
								_this._hide();
							}
						});
					}

					if (hasTouch && this.options.disableHoverOnTouch) this.options.disableHover = true;

					if (!this.options.disableHover) {
						this.$menuItems.on('mouseenter.zf.dropdownMenu', function () {
							var $elem  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
							    hasSub = $elem.hasClass(parClass);

							if (hasSub) {
								clearTimeout($elem.data('_delay'));
								$elem.data('_delay', setTimeout(function () {
									_this._show($elem.children('.is-dropdown-submenu'));
								}, _this.options.hoverDelay));
							}
						}).on('mouseleave.zf.dropdownMenu', (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
							var $elem  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
							    hasSub = $elem.hasClass(parClass);

							if (hasSub && _this.options.autoclose) {
								if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
									return false;
								}

								clearTimeout($elem.data('_delay'));
								$elem.data('_delay', setTimeout(function () {
									_this._hide($elem);
								}, _this.options.closingTime));
							}
						}));
					}

					this.$menuItems.on('keydown.zf.dropdownMenu', function (e) {
						var $element  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', '[role="none"]'),
						    isTab     = _this.$tabs.index($element) > -1,
						    $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
						    $prevElement,
						    $nextElement;
						$elements.each(function (i) {
							if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
								$prevElement = $elements.eq(i - 1);
								$nextElement = $elements.eq(i + 1);
								return;
							}
						});

						var nextSibling = function nextSibling() {
							    $nextElement.children('a:first').focus();
							    e.preventDefault();
						    },
						    prevSibling = function prevSibling() {
							    $prevElement.children('a:first').focus();
							    e.preventDefault();
						    },
						    openSub     = function openSub() {
							    var $sub = $element.children('ul.is-dropdown-submenu');

							    if ($sub.length) {
								    _this._show($sub);

								    $element.find('li > a:first').focus();
								    e.preventDefault();
							    } else {
								    return;
							    }
						    },
						    closeSub    = function closeSub() {
							    //if ($element.is(':first-child')) {
							    var close = $element.parent('ul').parent('li');
							    close.children('a:first').focus();

							    _this._hide(close);

							    e.preventDefault(); //}
						    };

						var functions = {
							open:  openSub,
							close: function close() {
								_this._hide(_this.$element);

								_this.$menuItems.eq(0).children('a').focus(); // focus to first element


								e.preventDefault();
							}
						};

						if (isTab) {
							if (_this._isVertical()) {
								// vertical menu
								if (_this._isRtl()) {
									// right aligned
									jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
										down:     nextSibling,
										up:       prevSibling,
										next:     closeSub,
										previous: openSub
									});
								} else {
									// left aligned
									jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
										down:     nextSibling,
										up:       prevSibling,
										next:     openSub,
										previous: closeSub
									});
								}
							} else {
								// horizontal menu
								if (_this._isRtl()) {
									// right aligned
									jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
										next:     prevSibling,
										previous: nextSibling,
										down:     openSub,
										up:       closeSub
									});
								} else {
									// left aligned
									jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
										next:     nextSibling,
										previous: prevSibling,
										down:     openSub,
										up:       closeSub
									});
								}
							}
						} else {
							// not tabs -> one sub
							if (_this._isRtl()) {
								// right aligned
								jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
									next:     closeSub,
									previous: openSub,
									down:     nextSibling,
									up:       prevSibling
								});
							} else {
								// left aligned
								jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
									next:     openSub,
									previous: closeSub,
									down:     nextSibling,
									up:       prevSibling
								});
							}
						}

						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.handleKey(e, 'DropdownMenu', functions);
					});
				}
				/**
				 * Adds an event handler to the body to close any dropdowns on a click.
				 * @function
				 * @private
				 */

			}, {
				key:   "_addBodyHandler",
				value: function _addBodyHandler() {
					var _this2 = this;

					var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);

					this._removeBodyHandler();

					$body.on('click.zf.dropdownMenu tap.zf.dropdownMenu', function (e) {
						var isItself = !!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest(_this2.$element).length;
						if (isItself) return;

						_this2._hide();

						_this2._removeBodyHandler();
					});
				}
				/**
				 * Remove the body event handler. See `_addBodyHandler`.
				 * @function
				 * @private
				 */

			}, {
				key:   "_removeBodyHandler",
				value: function _removeBodyHandler() {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdownMenu tap.zf.dropdownMenu');
				}
				/**
				 * Opens a dropdown pane, and checks for collisions first.
				 * @param {jQuery} $sub - ul element that is a submenu to show
				 * @function
				 * @private
				 * @fires DropdownMenu#show
				 */

			}, {
				key:   "_show",
				value: function _show($sub) {
					var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
						return jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find($sub).length > 0;
					}));
					var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

					this._hide($sibs, idx);

					$sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');
					var clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__.Box.ImNotTouchingYou($sub, null, true);

					if (!clear) {
						var oldClass  = this.options.alignment === 'left' ? '-right' : '-left',
						    $parentLi = $sub.parent('.is-dropdown-submenu-parent');
						$parentLi.removeClass("opens".concat(oldClass)).addClass("opens-".concat(this.options.alignment));
						clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__.Box.ImNotTouchingYou($sub, null, true);

						if (!clear) {
							$parentLi.removeClass("opens-".concat(this.options.alignment)).addClass('opens-inner');
						}

						this.changed = true;
					}

					$sub.css('visibility', '');

					if (this.options.closeOnClick) {
						this._addBodyHandler();
					}
					/**
					 * Fires when the new dropdown pane is visible.
					 * @event DropdownMenu#show
					 */


					this.$element.trigger('show.zf.dropdownMenu', [$sub]);
				}
				/**
				 * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
				 * @function
				 * @param {jQuery} $elem - element with a submenu to hide
				 * @param {Number} idx - index of the $tabs collection to hide
				 * @fires DropdownMenu#hide
				 * @private
				 */

			}, {
				key:   "_hide",
				value: function _hide($elem, idx) {
					var $toClose;

					if ($elem && $elem.length) {
						$toClose = $elem;
					} else if (typeof idx !== 'undefined') {
						$toClose = this.$tabs.not(function (i) {
							return i === idx;
						});
					} else {
						$toClose = this.$element;
					}

					var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

					if (somethingToClose) {
						var $activeItem = $toClose.find('li.is-active');
						$activeItem.add($toClose).attr({
							'data-is-click': false
						}).removeClass('is-active');
						$toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

						if (this.changed || $toClose.find('opens-inner').length) {
							var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
							$toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass("opens-inner opens-".concat(this.options.alignment)).addClass("opens-".concat(oldClass));
							this.changed = false;
						}

						clearTimeout($activeItem.data('_delay'));

						this._removeBodyHandler();
						/**
						 * Fires when the open menus are closed.
						 * @event DropdownMenu#hide
						 */


						this.$element.trigger('hide.zf.dropdownMenu', [$toClose]);
					}
				}
				/**
				 * Destroys the plugin.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$menuItems.off('.zf.dropdownMenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('.zf.dropdownMenu');
					_foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__.Nest.Burn(this.$element, 'dropdown');
				}
			}]);

			return DropdownMenu;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);
		/**
		 * Default settings for plugin
		 */


		DropdownMenu.defaults = {
			/**
			 * Disallows hover events from opening submenus
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			disableHover: false,

			/**
			 * Disallows hover on touch devices
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			disableHoverOnTouch: true,

			/**
			 * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			autoclose: true,

			/**
			 * Amount of time to delay opening a submenu on hover event.
			 * @option
			 * @type {number}
			 * @default 50
			 */
			hoverDelay: 50,

			/**
			 * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			clickOpen: false,

			/**
			 * Amount of time to delay closing a submenu on a mouseleave event.
			 * @option
			 * @type {number}
			 * @default 500
			 */
			closingTime: 500,

			/**
			 * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			alignment: 'auto',

			/**
			 * Allow clicks on the body to close any open submenus.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			closeOnClick: true,

			/**
			 * Allow clicks on leaf anchor links to close any open submenus.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			closeOnClickInside: true,

			/**
			 * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
			 * @option
			 * @type {string}
			 * @default 'vertical'
			 */
			verticalClass: 'vertical',

			/**
			 * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
			 * @option
			 * @type {string}
			 * @default 'align-right'
			 */
			rightClass: 'align-right',

			/**
			 * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			forceFollow: true
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.equalizer.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.equalizer.js ***!
	 \******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Equalizer": () => (/* binding */ Equalizer)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Equalizer module.
		 * @module foundation.equalizer
		 * @requires foundation.util.mediaQuery
		 * @requires foundation.util.imageLoader if equalizer contains images
		 */

		var Equalizer = /*#__PURE__*/function (_Plugin) {
			_inherits(Equalizer, _Plugin);

			var _super = _createSuper(Equalizer);

			function Equalizer() {
				_classCallCheck(this, Equalizer);

				return _super.apply(this, arguments);
			}

			_createClass(Equalizer, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of Equalizer.
				      * @class
				      * @name Equalizer
				      * @fires Equalizer#init
				      * @param {Object} element - jQuery object to add the trigger to.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Equalizer.defaults, this.$element.data(), options);
					     this.className = 'Equalizer'; // ie9 back compat

					     this._init();
				     }
				/**
				 * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var eqId = this.$element.attr('data-equalizer') || '';
					var $watched = this.$element.find("[data-equalizer-watch=\"".concat(eqId, "\"]"));

					_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__.MediaQuery._init();

					this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
					this.$element.attr('data-resize', eqId || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'eq'));
					this.$element.attr('data-mutate', eqId || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'eq'));
					this.hasNested = this.$element.find('[data-equalizer]').length > 0;
					this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
					this.isOn = false;
					this._bindHandler = {
						onResizeMeBound:      this._onResizeMe.bind(this),
						onPostEqualizedBound: this._onPostEqualized.bind(this)
					};
					var imgs = this.$element.find('img');
					var tooSmall;

					if (this.options.equalizeOn) {
						tooSmall = this._checkMQ();
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
					} else {
						this._events();
					}

					if (typeof tooSmall !== 'undefined' && tooSmall === false || typeof tooSmall === 'undefined') {
						if (imgs.length) {
							(0, _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__.onImagesLoaded)(imgs, this._reflow.bind(this));
						} else {
							this._reflow();
						}
					}
				}
				/**
				 * Removes event listeners if the breakpoint is too small.
				 * @private
				 */

			}, {
				key:   "_pauseEvents",
				value: function _pauseEvents() {
					this.isOn = false;
					this.$element.off({
						'.zf.equalizer':       this._bindHandler.onPostEqualizedBound,
						'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
						'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
					});
				}
				/**
				 * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
				 * @private
				 */

			}, {
				key:   "_onResizeMe",
				value: function _onResizeMe() {
					this._reflow();
				}
				/**
				 * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
				 * @private
				 */

			}, {
				key:   "_onPostEqualized",
				value: function _onPostEqualized(e) {
					if (e.target !== this.$element[0]) {
						this._reflow();
					}
				}
				/**
				 * Initializes events for Equalizer.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					this._pauseEvents();

					if (this.hasNested) {
						this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
					} else {
						this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
						this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
					}

					this.isOn = true;
				}
				/**
				 * Checks the current breakpoint to the minimum required size.
				 * @private
				 */

			}, {
				key:   "_checkMQ",
				value: function _checkMQ() {
					var tooSmall = !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__.MediaQuery.is(this.options.equalizeOn);

					if (tooSmall) {
						if (this.isOn) {
							this._pauseEvents();

							this.$watched.css('height', 'auto');
						}
					} else {
						if (!this.isOn) {
							this._events();
						}
					}

					return tooSmall;
				}
				/**
				 * A noop version for the plugin
				 * @private
				 */

			}, {
				key:   "_killswitch",
				value: function _killswitch() {
					return;
				}
				/**
				 * Calls necessary functions to update Equalizer upon DOM change
				 * @private
				 */

			}, {
				key:   "_reflow",
				value: function _reflow() {
					if (!this.options.equalizeOnStack) {
						if (this._isStacked()) {
							this.$watched.css('height', 'auto');
							return false;
						}
					}

					if (this.options.equalizeByRow) {
						this.getHeightsByRow(this.applyHeightByRow.bind(this));
					} else {
						this.getHeights(this.applyHeight.bind(this));
					}
				}
				/**
				 * Manually determines if the first 2 elements are *NOT* stacked.
				 * @private
				 */

			}, {
				key:   "_isStacked",
				value: function _isStacked() {
					if (!this.$watched[0] || !this.$watched[1]) {
						return true;
					}

					return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
				}
				/**
				 * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
				 * @param {Function} cb - A non-optional callback to return the heights array to.
				 * @returns {Array} heights - An array of heights of children within Equalizer container
				 */

			}, {
				key:   "getHeights",
				value: function getHeights(cb) {
					var heights = [];

					for (var i = 0, len = this.$watched.length; i < len; i++) {
						this.$watched[i].style.height = 'auto';
						heights.push(this.$watched[i].offsetHeight);
					}

					cb(heights);
				}
				/**
				 * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
				 * @param {Function} cb - A non-optional callback to return the heights array to.
				 * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
				 */

			}, {
				key:   "getHeightsByRow",
				value: function getHeightsByRow(cb) {
					var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
					    groups          = [],
					    group           = 0; //group by Row

					groups[group] = [];

					for (var i = 0, len = this.$watched.length; i < len; i++) {
						this.$watched[i].style.height = 'auto'; //maybe could use this.$watched[i].offsetTop

						var elOffsetTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$watched[i]).offset().top;

						if (elOffsetTop !== lastElTopOffset) {
							group++;
							groups[group] = [];
							lastElTopOffset = elOffsetTop;
						}

						groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
					}

					for (var j = 0, ln = groups.length; j < ln; j++) {
						var heights = jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[j]).map(function () {
							return this[1];
						}).get();
						var max = Math.max.apply(null, heights);
						groups[j].push(max);
					}

					cb(groups);
				}
				/**
				 * Changes the CSS height property of each child in an Equalizer parent to match the tallest
				 * @param {array} heights - An array of heights of children within Equalizer container
				 * @fires Equalizer#preequalized
				 * @fires Equalizer#postequalized
				 */

			}, {
				key:   "applyHeight",
				value: function applyHeight(heights) {
					var max = Math.max.apply(null, heights);
					/**
					 * Fires before the heights are applied
					 * @event Equalizer#preequalized
					 */

					this.$element.trigger('preequalized.zf.equalizer');
					this.$watched.css('height', max);
					/**
					 * Fires when the heights have been applied
					 * @event Equalizer#postequalized
					 */

					this.$element.trigger('postequalized.zf.equalizer');
				}
				/**
				 * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
				 * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
				 * @fires Equalizer#preequalized
				 * @fires Equalizer#preequalizedrow
				 * @fires Equalizer#postequalizedrow
				 * @fires Equalizer#postequalized
				 */

			}, {
				key:   "applyHeightByRow",
				value: function applyHeightByRow(groups) {
					/**
					 * Fires before the heights are applied
					 */
					this.$element.trigger('preequalized.zf.equalizer');

					for (var i = 0, len = groups.length; i < len; i++) {
						var groupsILength = groups[i].length,
						    max           = groups[i][groupsILength - 1];

						if (groupsILength <= 2) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][0][0]).css({
								'height': 'auto'
							});
							continue;
						}
						/**
						 * Fires before the heights per row are applied
						 * @event Equalizer#preequalizedrow
						 */


						this.$element.trigger('preequalizedrow.zf.equalizer');

						for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][j][0]).css({
								'height': max
							});
						}
						/**
						 * Fires when the heights per row have been applied
						 * @event Equalizer#postequalizedrow
						 */


						this.$element.trigger('postequalizedrow.zf.equalizer');
					}
					/**
					 * Fires when the heights have been applied
					 */


					this.$element.trigger('postequalized.zf.equalizer');
				}
				/**
				 * Destroys an instance of Equalizer.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this._pauseEvents();

					this.$watched.css('height', 'auto');
				}
			}]);

			return Equalizer;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__.Plugin);
		/**
		 * Default settings for plugin
		 */


		Equalizer.defaults = {
			/**
			 * Enable height equalization when stacked on smaller screens.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			equalizeOnStack: false,

			/**
			 * Enable height equalization row by row.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			equalizeByRow: false,

			/**
			 * String representing the minimum breakpoint size the plugin should equalize heights on.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			equalizeOn: ''
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.magellan.js":
	/*!*****************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.magellan.js ***!
	 \*****************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Magellan": () => (/* binding */ Magellan)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.smoothScroll */ "./node_modules/foundation-sites/js/foundation.smoothScroll.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Magellan module.
		 * @module foundation.magellan
		 * @requires foundation.smoothScroll
		 * @requires foundation.util.triggers
		 */

		var Magellan = /*#__PURE__*/function (_Plugin) {
			_inherits(Magellan, _Plugin);

			var _super = _createSuper(Magellan);

			function Magellan() {
				_classCallCheck(this, Magellan);

				return _super.apply(this, arguments);
			}

			_createClass(Magellan, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of Magellan.
				      * @class
				      * @name Magellan
				      * @fires Magellan#init
				      * @param {Object} element - jQuery object to add the trigger to.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Magellan.defaults, this.$element.data(), options);
					     this.className = 'Magellan'; // ie9 back compat
					     // Triggers init is idempotent, just need to make sure it is initialized

					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));

					     this._init();

					     this.calcPoints();
				     }
				/**
				 * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var id = this.$element[0].id || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'magellan');
					this.$targets = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-magellan-target]');
					this.$links = this.$element.find('a');
					this.$element.attr({
						'data-resize': id,
						'data-scroll': id,
						'id':          id
					});
					this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					this.scrollPos = parseInt(window.pageYOffset, 10);

					this._events();
				}
				/**
				 * Calculates an array of pixel values that are the demarcation lines between locations on the page.
				 * Can be invoked if new elements are added or the size of a location changes.
				 * @function
				 */

			}, {
				key:   "calcPoints",
				value: function calcPoints() {
					var _this = this,
					    body  = document.body,
					    html  = document.documentElement;

					this.points = [];
					this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
					this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
					this.$targets.each(function () {
						var $tar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    pt   = Math.round($tar.offset().top - _this.options.threshold);
						$tar.targetPoint = pt;

						_this.points.push(pt);
					});
				}
				/**
				 * Initializes events for Magellan.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this = this;

					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', function () {
						if (_this.options.deepLinking) {
							if (location.hash) {
								_this.scrollToLoc(location.hash);
							}
						}

						_this.calcPoints();

						_this._updateActive();
					});
					_this.onLoadListener = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
						_this.$element.on({
							'resizeme.zf.trigger': _this.reflow.bind(_this),
							'scrollme.zf.trigger': _this._updateActive.bind(_this)
						}).on('click.zf.magellan', 'a[href^="#"]', function (e) {
							e.preventDefault();
							var arrival = this.getAttribute('href');

							_this.scrollToLoc(arrival);
						});
					});

					this._deepLinkScroll = function () {
						if (_this.options.deepLinking) {
							_this.scrollToLoc(window.location.hash);
						}
					};

					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._deepLinkScroll);
				}
				/**
				 * Function to scroll to a given location on the page.
				 * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
				 * @function
				 */

			}, {
				key:   "scrollToLoc",
				value: function scrollToLoc(loc) {
					this._inTransition = true;

					var _this = this;

					var options = {
						animationEasing:   this.options.animationEasing,
						animationDuration: this.options.animationDuration,
						threshold:         this.options.threshold,
						offset:            this.options.offset
					};
					_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__.SmoothScroll.scrollToLoc(loc, options, function () {
						_this._inTransition = false;
					});
				}
				/**
				 * Calls necessary functions to update Magellan upon DOM change
				 * @function
				 */

			}, {
				key:   "reflow",
				value: function reflow() {
					this.calcPoints();

					this._updateActive();
				}
				/**
				 * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
				 * @private
				 * @function
				 * @fires Magellan#update
				 */

			}, {
				key:   "_updateActive",
				value: function
					       /*evt, elem, scrollPos*/
					       _updateActive() {
					var _this2 = this;

					if (this._inTransition) return;
					var newScrollPos = parseInt(window.pageYOffset, 10);
					var isScrollingUp = this.scrollPos > newScrollPos;
					this.scrollPos = newScrollPos;
					var activeIdx; // Before the first point: no link

					if (newScrollPos < this.points[0] - this.options.offset - (isScrollingUp ? this.options.threshold : 0)) {
						/* do nothing */
					} // At the bottom of the page: last link
					else if (newScrollPos + this.winHeight === this.docHeight) {
						activeIdx = this.points.length - 1;
					} // Otherwhise, use the last visible link
					else {
						var visibleLinks = this.points.filter(function (p) {
							return p - _this2.options.offset - (isScrollingUp ? _this2.options.threshold : 0) <= newScrollPos;
						});
						activeIdx = visibleLinks.length ? visibleLinks.length - 1 : 0;
					} // Get the new active link


					var $oldActive = this.$active;
					var activeHash = '';

					if (typeof activeIdx !== 'undefined') {
						this.$active = this.$links.filter('[href="#' + this.$targets.eq(activeIdx).data('magellan-target') + '"]');
						if (this.$active.length) activeHash = this.$active[0].getAttribute('href');
					} else {
						this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					}

					var isNewActive = !(!this.$active.length && !$oldActive.length) && !this.$active.is($oldActive);
					var isNewHash = activeHash !== window.location.hash; // Update the active link element

					if (isNewActive) {
						$oldActive.removeClass(this.options.activeClass);
						this.$active.addClass(this.options.activeClass);
					} // Update the hash (it may have changed with the same active link)


					if (this.options.deepLinking && isNewHash) {
						if (window.history.pushState) {
							// Set or remove the hash (see: https://stackoverflow.com/a/5298684/4317384
							var url = activeHash ? activeHash : window.location.pathname + window.location.search;

							if (this.options.updateHistory) {
								window.history.pushState({}, '', url);
							} else {
								window.history.replaceState({}, '', url);
							}
						} else {
							window.location.hash = activeHash;
						}
					}

					if (isNewActive) {
						/**
						 * Fires when magellan is finished updating to the new active element.
						 * @event Magellan#update
						 */
						this.$element.trigger('update.zf.magellan', [this.$active]);
					}
				}
				/**
				 * Destroys an instance of Magellan and resets the url of the window.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.off('.zf.trigger .zf.magellan').find(".".concat(this.options.activeClass)).removeClass(this.options.activeClass);

					if (this.options.deepLinking) {
						var hash = this.$active[0].getAttribute('href');
						window.location.hash.replace(hash, '');
					}

					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._deepLinkScroll);
					if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
				}
			}]);

			return Magellan;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);
		/**
		 * Default settings for plugin
		 */


		Magellan.defaults = {
			/**
			 * Amount of time, in ms, the animated scrolling should take between locations.
			 * @option
			 * @type {number}
			 * @default 500
			 */
			animationDuration: 500,

			/**
			 * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
			 * @option
			 * @type {string}
			 * @default 'linear'
			 * @see {@link https://api.jquery.com/animate|Jquery animate}
			 */
			animationEasing: 'linear',

			/**
			 * Number of pixels to use as a marker for location changes.
			 * @option
			 * @type {number}
			 * @default 50
			 */
			threshold: 50,

			/**
			 * Class applied to the active locations link on the magellan container.
			 * @option
			 * @type {string}
			 * @default 'is-active'
			 */
			activeClass: 'is-active',

			/**
			 * Allows the script to manipulate the url of the current page, and if supported, alter the history.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			deepLinking: false,

			/**
			 * Update the browser history with the active link, if deep linking is enabled.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			updateHistory: false,

			/**
			 * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			offset: 0
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.offcanvas.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.offcanvas.js ***!
	 \******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "OffCanvas": () => (/* binding */ OffCanvas)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * OffCanvas module.
		 * @module foundation.offCanvas
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.mediaQuery
		 * @requires foundation.util.triggers
		 */

		var OffCanvas = /*#__PURE__*/function (_Plugin) {
			_inherits(OffCanvas, _Plugin);

			var _super = _createSuper(OffCanvas);

			function OffCanvas() {
				_classCallCheck(this, OffCanvas);

				return _super.apply(this, arguments);
			}

			_createClass(OffCanvas, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of an off-canvas wrapper.
				      * @class
				      * @name OffCanvas
				      * @fires OffCanvas#init
				      * @param {Object} element - jQuery object to initialize.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     var _this2 = this;

					     this.className = 'OffCanvas'; // ie9 back compat

					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, OffCanvas.defaults, this.$element.data(), options);
					     this.contentClasses = {
						     base:   [],
						     reveal: []
					     };
					     this.$lastTrigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					     this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					     this.position = 'left';
					     this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					     this.nested = !!this.options.nested;
					     this.$sticky = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
					     this.isInCanvas = false; // Defines the CSS transition/position classes of the off-canvas content container.

					     jquery__WEBPACK_IMPORTED_MODULE_0___default()(['push', 'overlap']).each(function (index, val) {
						     _this2.contentClasses.base.push('has-transition-' + val);
					     });
					     jquery__WEBPACK_IMPORTED_MODULE_0___default()(['left', 'right', 'top', 'bottom']).each(function (index, val) {
						     _this2.contentClasses.base.push('has-position-' + val);

						     _this2.contentClasses.reveal.push('has-reveal-' + val);
					     }); // Triggers init is idempotent, just need to make sure it is initialized

					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));

					     _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery._init();

					     this._init();

					     this._events();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.register('OffCanvas', {
						     'ESCAPE': 'close'
					     });
				     }
				/**
				 * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
				 * @function
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var id = this.$element.attr('id');
					this.$element.attr('aria-hidden', 'true'); // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)

					if (this.options.contentId) {
						this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.options.contentId);
					} else if (this.$element.siblings('[data-off-canvas-content]').length) {
						this.$content = this.$element.siblings('[data-off-canvas-content]').first();
					} else {
						this.$content = this.$element.closest('[data-off-canvas-content]').first();
					}

					if (!this.options.contentId) {
						// Assume that the off-canvas element is nested if it isn't a sibling of the content
						this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
					} else if (this.options.contentId && this.options.nested === null) {
						// Warning if using content ID without setting the nested option
						// Once the element is nested it is required to work properly in this case
						console.warn('Remember to use the nested option if using the content ID option!');
					}

					if (this.nested === true) {
						// Force transition overlap if nested
						this.options.transition = 'overlap'; // Remove appropriate classes if already assigned in markup

						this.$element.removeClass('is-transition-push');
					}

					this.$element.addClass("is-transition-".concat(this.options.transition, " is-closed")); // Find triggers that affect this element and add aria-expanded to them

					this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id); // Get position by checking for related CSS class

					this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position; // Add an overlay over the content if necessary

					if (this.options.contentOverlay === true) {
						var overlay = document.createElement('div');
						var overlayPosition = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
						overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
						this.$overlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(overlay);

						if (overlayPosition === 'is-overlay-fixed') {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$overlay).insertAfter(this.$element);
						} else {
							this.$content.append(this.$overlay);
						}
					} // Get the revealOn option from the class.


					var revealOnRegExp = new RegExp((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.RegExpEscape)(this.options.revealClass) + '([^\\s]+)', 'g');
					var revealOnClass = revealOnRegExp.exec(this.$element[0].className);

					if (revealOnClass) {
						this.options.isRevealed = true;
						this.options.revealOn = this.options.revealOn || revealOnClass[1];
					} // Ensure the `reveal-on-*` class is set.


					if (this.options.isRevealed === true && this.options.revealOn) {
						this.$element.first().addClass("".concat(this.options.revealClass).concat(this.options.revealOn));

						this._setMQChecker();
					}

					if (this.options.transitionTime) {
						this.$element.css('transition-duration', this.options.transitionTime);
					} // Find fixed elements that should stay fixed while off-canvas is opened


					this.$sticky = this.$content.find('[data-off-canvas-sticky]');

					if (this.$sticky.length > 0 && this.options.transition === 'push') {
						// If there's at least one match force contentScroll:false because the absolute top value doesn't get recalculated on scroll
						// Limit to push transition since there's no transform scope for overlap
						this.options.contentScroll = false;
					}

					var inCanvasFor = this.$element.attr('class').match(/\bin-canvas-for-(\w+)/);

					if (inCanvasFor && inCanvasFor.length === 2) {
						// Set `inCanvasOn` option if found in-canvas-for-[BREAKPONT] CSS class
						this.options.inCanvasOn = inCanvasFor[1];
					} else if (this.options.inCanvasOn) {
						// Ensure the CSS class is set
						this.$element.addClass("in-canvas-for-".concat(this.options.inCanvasOn));
					}

					if (this.options.inCanvasOn) {
						this._checkInCanvas();
					} // Initally remove all transition/position CSS classes from off-canvas content container.


					this._removeContentClasses();
				}
				/**
				 * Adds event handlers to the off-canvas wrapper and the exit overlay.
				 * @function
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this3 = this;

					this.$element.off('.zf.trigger .zf.offCanvas').on({
						'open.zf.trigger':      this.open.bind(this),
						'close.zf.trigger':     this.close.bind(this),
						'toggle.zf.trigger':    this.toggle.bind(this),
						'keydown.zf.offCanvas': this._handleKeyboard.bind(this)
					});

					if (this.options.closeOnClick === true) {
						var $target = this.options.contentOverlay ? this.$overlay : this.$content;
						$target.on({
							'click.zf.offCanvas': this.close.bind(this)
						});
					}

					if (this.options.inCanvasOn) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {
							_this3._checkInCanvas();
						});
					}
				}
				/**
				 * Applies event listener for elements that will reveal at certain breakpoints.
				 * @private
				 */

			}, {
				key:   "_setMQChecker",
				value: function _setMQChecker() {
					var _this = this;

					this.onLoadListener = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
						if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery.atLeast(_this.options.revealOn)) {
							_this.reveal(true);
						}
					});
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {
						if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery.atLeast(_this.options.revealOn)) {
							_this.reveal(true);
						} else {
							_this.reveal(false);
						}
					});
				}
				/**
				 * Checks if InCanvas on current breakpoint and adjust off-canvas accordingly
				 * @private
				 */

			}, {
				key:   "_checkInCanvas",
				value: function _checkInCanvas() {
					this.isInCanvas = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery.atLeast(this.options.inCanvasOn);

					if (this.isInCanvas === true) {
						this.close();
					}
				}
				/**
				 * Removes the CSS transition/position classes of the off-canvas content container.
				 * Removing the classes is important when another off-canvas gets opened that uses the same content container.
				 * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
				 * @private
				 */

			}, {
				key:   "_removeContentClasses",
				value: function _removeContentClasses(hasReveal) {
					if (typeof hasReveal !== 'boolean') {
						this.$content.removeClass(this.contentClasses.base.join(' '));
					} else if (hasReveal === false) {
						this.$content.removeClass("has-reveal-".concat(this.position));
					}
				}
				/**
				 * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
				 * Beforehand any transition/position class gets removed.
				 * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
				 * @private
				 */

			}, {
				key:   "_addContentClasses",
				value: function _addContentClasses(hasReveal) {
					this._removeContentClasses(hasReveal);

					if (typeof hasReveal !== 'boolean') {
						this.$content.addClass("has-transition-".concat(this.options.transition, " has-position-").concat(this.position));
					} else if (hasReveal === true) {
						this.$content.addClass("has-reveal-".concat(this.position));
					}
				}
				/**
				 * Preserves the fixed behavior of sticky elements on opening an off-canvas with push transition.
				 * Since the off-canvas container has got a transform scope in such a case, it is done by calculating position absolute values.
				 * @private
				 */

			}, {
				key:   "_fixStickyElements",
				value: function _fixStickyElements() {
					this.$sticky.each(function (_, el) {
						var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el); // If sticky element is currently fixed, adjust its top value to match absolute position due to transform scope
						// Limit to push transition because postion:fixed works without problems for overlap (no transform scope)

						if ($el.css('position') === 'fixed') {
							// Save current inline styling to restore it if undoing the absolute fixing
							var topVal = parseInt($el.css('top'), 10);
							$el.data('offCanvasSticky', {
								top: topVal
							});
							var absoluteTopVal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).scrollTop() + topVal;
							$el.css({
								top:        "".concat(absoluteTopVal, "px"),
								width:      '100%',
								transition: 'none'
							});
						}
					});
				}
				/**
				 * Restores the original fixed styling of sticky elements after having closed an off-canvas that got pseudo fixed beforehand.
				 * This reverts the changes of _fixStickyElements()
				 * @private
				 */

			}, {
				key:   "_unfixStickyElements",
				value: function _unfixStickyElements() {
					this.$sticky.each(function (_, el) {
						var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
						var stickyData = $el.data('offCanvasSticky'); // If sticky element has got data object with prior values (meaning it was originally fixed) restore these values once off-canvas is closed

						if (_typeof(stickyData) === 'object') {
							$el.css({
								top:        "".concat(stickyData.top, "px"),
								width:      '',
								transition: ''
							});
							$el.data('offCanvasSticky', '');
						}
					});
				}
				/**
				 * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
				 * @param {Boolean} isRevealed - true if element should be revealed.
				 * @function
				 */

			}, {
				key:   "reveal",
				value: function reveal(isRevealed) {
					if (isRevealed) {
						this.close();
						this.isRevealed = true;
						this.$element.attr('aria-hidden', 'false');
						this.$element.off('open.zf.trigger toggle.zf.trigger');
						this.$element.removeClass('is-closed');
					} else {
						this.isRevealed = false;
						this.$element.attr('aria-hidden', 'true');
						this.$element.off('open.zf.trigger toggle.zf.trigger').on({
							'open.zf.trigger':   this.open.bind(this),
							'toggle.zf.trigger': this.toggle.bind(this)
						});
						this.$element.addClass('is-closed');
					}

					this._addContentClasses(isRevealed);
				}
				/**
				 * Stops scrolling of the body when OffCanvas is open on mobile Safari and other troublesome browsers.
				 * @function
				 * @private
				 */

			}, {
				key:   "_stopScrolling",
				value: function _stopScrolling() {
					return false;
				}
				/**
				 * Save current finger y-position
				 * @param event
				 * @private
				 */

			}, {
				key:   "_recordScrollable",
				value: function _recordScrollable(event) {
					var elem = this;
					elem.lastY = event.touches[0].pageY;
				}
				/**
				 * Prevent further scrolling when it hits the edges
				 * @param event
				 * @private
				 */

			}, {
				key:   "_preventDefaultAtEdges",
				value: function _preventDefaultAtEdges(event) {
					var elem = this;
					var _this = event.data;
					var delta = elem.lastY - event.touches[0].pageY;
					elem.lastY = event.touches[0].pageY;

					if (!_this._canScroll(delta, elem)) {
						event.preventDefault();
					}
				}
				/**
				 * Handle continuous scrolling of scrollbox
				 * Don't bubble up to _preventDefaultAtEdges
				 * @param event
				 * @private
				 */

			}, {
				key:   "_scrollboxTouchMoved",
				value: function _scrollboxTouchMoved(event) {
					var elem = this;
					var _this = event.data;
					var parent = elem.closest('[data-off-canvas], [data-off-canvas-scrollbox-outer]');
					var delta = elem.lastY - event.touches[0].pageY;
					parent.lastY = elem.lastY = event.touches[0].pageY;
					event.stopPropagation();

					if (!_this._canScroll(delta, elem)) {
						if (!_this._canScroll(delta, parent)) {
							event.preventDefault();
						} else {
							parent.scrollTop += delta;
						}
					}
				}
				/**
				 * Detect possibility of scrolling
				 * @param delta
				 * @param elem
				 * @returns boolean
				 * @private
				 */

			}, {
				key:   "_canScroll",
				value: function _canScroll(delta, elem) {
					var up = delta < 0;
					var down = delta > 0;
					var allowUp = elem.scrollTop > 0;
					var allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
					return up && allowUp || down && allowDown;
				}
				/**
				 * Opens the off-canvas menu.
				 * @function
				 * @param {Object} event - Event object passed from listener.
				 * @param {jQuery} trigger - element that triggered the off-canvas to open.
				 * @fires OffCanvas#opened
				 * @todo also trigger 'open' event?
				 */

			}, {
				key:   "open",
				value: function open(event, trigger) {
					var _this4 = this;

					if (this.$element.hasClass('is-open') || this.isRevealed || this.isInCanvas) {
						return;
					}

					var _this = this;

					if (trigger) {
						this.$lastTrigger = trigger;
					}

					if (this.options.forceTo === 'top') {
						window.scrollTo(0, 0);
					} else if (this.options.forceTo === 'bottom') {
						window.scrollTo(0, document.body.scrollHeight);
					}

					if (this.options.transitionTime && this.options.transition !== 'overlap') {
						this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
					} else {
						this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
					}

					this.$element.addClass('is-open').removeClass('is-closed');
					this.$triggers.attr('aria-expanded', 'true');
					this.$element.attr('aria-hidden', 'false');
					this.$content.addClass('is-open-' + this.position); // If `contentScroll` is set to false, add class and disable scrolling on touch devices.

					if (this.options.contentScroll === false) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
						this.$element.on('touchstart', this._recordScrollable);
						this.$element.on('touchmove', this, this._preventDefaultAtEdges);
						this.$element.on('touchstart', '[data-off-canvas-scrollbox]', this._recordScrollable);
						this.$element.on('touchmove', '[data-off-canvas-scrollbox]', this, this._scrollboxTouchMoved);
					}

					if (this.options.contentOverlay === true) {
						this.$overlay.addClass('is-visible');
					}

					if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
						this.$overlay.addClass('is-closable');
					}

					if (this.options.autoFocus === true) {
						this.$element.one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
							if (!_this.$element.hasClass('is-open')) {
								return; // exit if prematurely closed
							}

							var canvasFocus = _this.$element.find('[data-autofocus]');

							if (canvasFocus.length) {
								canvasFocus.eq(0).focus();
							} else {
								_this.$element.find('a, button').eq(0).focus();
							}
						});
					}

					if (this.options.trapFocus === true) {
						this.$content.attr('tabindex', '-1');
						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.trapFocus(this.$element);
					}

					if (this.options.transition === 'push') {
						this._fixStickyElements();
					}

					this._addContentClasses();
					/**
					 * Fires when the off-canvas menu opens.
					 * @event OffCanvas#opened
					 */


					this.$element.trigger('opened.zf.offCanvas');
					/**
					 * Fires when the off-canvas menu open transition is done.
					 * @event OffCanvas#openedEnd
					 */

					this.$element.one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
						_this4.$element.trigger('openedEnd.zf.offCanvas');
					});
				}
				/**
				 * Closes the off-canvas menu.
				 * @function
				 * @param {Function} cb - optional cb to fire after closure.
				 * @fires OffCanvas#close
				 * @fires OffCanvas#closed
				 */

			}, {
				key:   "close",
				value: function close() {
					var _this5 = this;

					if (!this.$element.hasClass('is-open') || this.isRevealed) {
						return;
					}
					/**
					 * Fires when the off-canvas menu closes.
					 * @event OffCanvas#close
					 */


					this.$element.trigger('close.zf.offCanvas');
					this.$element.removeClass('is-open');
					this.$element.attr('aria-hidden', 'true');
					this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

					if (this.options.contentOverlay === true) {
						this.$overlay.removeClass('is-visible');
					}

					if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
						this.$overlay.removeClass('is-closable');
					}

					this.$triggers.attr('aria-expanded', 'false'); // Listen to transitionEnd: add class, re-enable scrolling and release focus when done.

					this.$element.one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
						_this5.$element.addClass('is-closed');

						_this5._removeContentClasses();

						if (_this5.options.transition === 'push') {
							_this5._unfixStickyElements();
						} // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.


						if (_this5.options.contentScroll === false) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('is-off-canvas-open').off('touchmove', _this5._stopScrolling);

							_this5.$element.off('touchstart', _this5._recordScrollable);

							_this5.$element.off('touchmove', _this5._preventDefaultAtEdges);

							_this5.$element.off('touchstart', '[data-off-canvas-scrollbox]', _this5._recordScrollable);

							_this5.$element.off('touchmove', '[data-off-canvas-scrollbox]', _this5._scrollboxTouchMoved);
						}

						if (_this5.options.trapFocus === true) {
							_this5.$content.removeAttr('tabindex');

							_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.releaseFocus(_this5.$element);
						}
						/**
						 * Fires when the off-canvas menu close transition is done.
						 * @event OffCanvas#closed
						 */


						_this5.$element.trigger('closed.zf.offCanvas');
					});
				}
				/**
				 * Toggles the off-canvas menu open or closed.
				 * @function
				 * @param {Object} event - Event object passed from listener.
				 * @param {jQuery} trigger - element that triggered the off-canvas to open.
				 */

			}, {
				key:   "toggle",
				value: function toggle(event, trigger) {
					if (this.$element.hasClass('is-open')) {
						this.close(event, trigger);
					} else {
						this.open(event, trigger);
					}
				}
				/**
				 * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
				 * @function
				 * @private
				 */

			}, {
				key:   "_handleKeyboard",
				value: function _handleKeyboard(e) {
					var _this6 = this;

					_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.handleKey(e, 'OffCanvas', {
						close:   function close() {
							_this6.close();

							_this6.$lastTrigger.focus();

							return true;
						},
						handled: function handled() {
							e.preventDefault();
						}
					});
				}
				/**
				 * Destroys the OffCanvas plugin.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.close();
					this.$element.off('.zf.trigger .zf.offCanvas');
					this.$overlay.off('.zf.offCanvas');
					if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
				}
			}]);

			return OffCanvas;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);

		OffCanvas.defaults = {
			/**
			 * Allow the user to click outside of the menu to close it.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			closeOnClick: true,

			/**
			 * Adds an overlay on top of `[data-off-canvas-content]`.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			contentOverlay: true,

			/**
			 * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
			 * @option
			 * @type {?string}
			 * @default null
			 */
			contentId: null,

			/**
			 * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
			 * @option
			 * @type {boolean}
			 * @default null
			 */
			nested: null,

			/**
			 * Enable/disable scrolling of the main content when an off canvas panel is open.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			contentScroll: true,

			/**
			 * Amount of time the open and close transition requires, including the appropriate milliseconds (`ms`) or seconds (`s`) unit (e.g. `500ms`, `.75s`) If none selected, pulls from body style.
			 * @option
			 * @type {string}
			 * @default null
			 */
			transitionTime: null,

			/**
			 * Type of transition for the OffCanvas menu. Options are 'push', 'detached' or 'slide'.
			 * @option
			 * @type {string}
			 * @default push
			 */
			transition: 'push',

			/**
			 * Force the page to scroll to top or bottom on open.
			 * @option
			 * @type {?string}
			 * @default null
			 */
			forceTo: null,

			/**
			 * Allow the OffCanvas to remain open for certain breakpoints.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			isRevealed: false,

			/**
			 * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
			 * @option
			 * @type {?string}
			 * @default null
			 */
			revealOn: null,

			/**
			 * Breakpoint at which the off-canvas gets moved into canvas content and acts as regular page element.
			 * @option
			 * @type {?string}
			 * @default null
			 */
			inCanvasOn: null,

			/**
			 * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			autoFocus: true,

			/**
			 * Class used to force an OffCanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
			 * @option
			 * @type {string}
			 * @default reveal-for-
			 * @todo improve the regex testing for this.
			 */
			revealClass: 'reveal-for-',

			/**
			 * Triggers optional focus trapping when opening an OffCanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			trapFocus: false
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.positionable.js":
	/*!*********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.positionable.js ***!
	 \*********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Positionable": () => (/* binding */ Positionable)
			/* harmony export */
		});
		/* harmony import */
		var _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		var POSITIONS = ['left', 'right', 'top', 'bottom'];
		var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
		var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];
		var ALIGNMENTS = {
			'left':   VERTICAL_ALIGNMENTS,
			'right':  VERTICAL_ALIGNMENTS,
			'top':    HORIZONTAL_ALIGNMENTS,
			'bottom': HORIZONTAL_ALIGNMENTS
		};

		function nextItem(item, array) {
			var currentIdx = array.indexOf(item);

			if (currentIdx === array.length - 1) {
				return array[0];
			} else {
				return array[currentIdx + 1];
			}
		}

		var Positionable = /*#__PURE__*/function (_Plugin) {
			_inherits(Positionable, _Plugin);

			var _super = _createSuper(Positionable);

			function Positionable() {
				_classCallCheck(this, Positionable);

				return _super.apply(this, arguments);
			}

			_createClass(Positionable, [{
				key: "_init",
				value:
				     /**
				      * Abstract class encapsulating the tether-like explicit positioning logic
				      * including repositioning based on overlap.
				      * Expects classes to define defaults for vOffset, hOffset, position,
				      * alignment, allowOverlap, and allowBottomOverlap. They can do this by
				      * extending the defaults, or (for now recommended due to the way docs are
				      * generated) by explicitly declaring them.
				      *
				      **/
				     function _init() {
					     this.triedPositions = {};
					     this.position = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
					     this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
					     this.originalPosition = this.position;
					     this.originalAlignment = this.alignment;
				     }
			}, {
				key:   "_getDefaultPosition",
				value: function _getDefaultPosition() {
					return 'bottom';
				}
			}, {
				key:   "_getDefaultAlignment",
				value: function _getDefaultAlignment() {
					switch (this.position) {
						case 'bottom':
						case 'top':
							return (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() ? 'right' : 'left';

						case 'left':
						case 'right':
							return 'bottom';
					}
				}
				/**
				 * Adjusts the positionable possible positions by iterating through alignments
				 * and positions.
				 * @function
				 * @private
				 */

			}, {
				key:   "_reposition",
				value: function _reposition() {
					if (this._alignmentsExhausted(this.position)) {
						this.position = nextItem(this.position, POSITIONS);
						this.alignment = ALIGNMENTS[this.position][0];
					} else {
						this._realign();
					}
				}
				/**
				 * Adjusts the dropdown pane possible positions by iterating through alignments
				 * on the current position.
				 * @function
				 * @private
				 */

			}, {
				key:   "_realign",
				value: function _realign() {
					this._addTriedPosition(this.position, this.alignment);

					this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
				}
			}, {
				key:   "_addTriedPosition",
				value: function _addTriedPosition(position, alignment) {
					this.triedPositions[position] = this.triedPositions[position] || [];
					this.triedPositions[position].push(alignment);
				}
			}, {
				key:   "_positionsExhausted",
				value: function _positionsExhausted() {
					var isExhausted = true;

					for (var i = 0; i < POSITIONS.length; i++) {
						isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
					}

					return isExhausted;
				}
			}, {
				key:   "_alignmentsExhausted",
				value: function _alignmentsExhausted(position) {
					return this.triedPositions[position] && this.triedPositions[position].length === ALIGNMENTS[position].length;
				} // When we're trying to center, we don't want to apply offset that's going to
				// take us just off center, so wrap around to return 0 for the appropriate
				// offset in those alignments.  TODO: Figure out if we want to make this
				// configurable behavior... it feels more intuitive, especially for tooltips, but
				// it's possible someone might actually want to start from center and then nudge
				// slightly off.

			}, {
				key:   "_getVOffset",
				value: function _getVOffset() {
					return this.options.vOffset;
				}
			}, {
				key:   "_getHOffset",
				value: function _getHOffset() {
					return this.options.hOffset;
				}
			}, {
				key:   "_setPosition",
				value: function _setPosition($anchor, $element, $parent) {
					if ($anchor.attr('aria-expanded') === 'false') {
						return false;
					}

					if (!this.options.allowOverlap) {
						// restore original position & alignment before checking overlap
						this.position = this.originalPosition;
						this.alignment = this.originalAlignment;
					}

					$element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

					if (!this.options.allowOverlap) {
						var minOverlap = 100000000; // default coordinates to how we start, in case we can't figure out better

						var minCoordinates = {
							position:  this.position,
							alignment: this.alignment
						};

						while (!this._positionsExhausted()) {
							var overlap = _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__.Box.OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);

							if (overlap === 0) {
								return;
							}

							if (overlap < minOverlap) {
								minOverlap = overlap;
								minCoordinates = {
									position:  this.position,
									alignment: this.alignment
								};
							}

							this._reposition();

							$element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
						} // If we get through the entire loop, there was no non-overlapping
						// position available. Pick the version with least overlap.


						this.position = minCoordinates.position;
						this.alignment = minCoordinates.alignment;
						$element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__.Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
					}
				}
			}]);

			return Positionable;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);

		Positionable.defaults = {
			/**
			 * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			position: 'auto',

			/**
			 * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			alignment: 'auto',

			/**
			 * Allow overlap of container/window. If false, dropdown positionable first
			 * try to position as defined by data-position and data-alignment, but
			 * reposition if it would cause an overflow.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			allowOverlap: false,

			/**
			 * Allow overlap of only the bottom of the container. This is the most common
			 * behavior for dropdowns, allowing the dropdown to extend the bottom of the
			 * screen but not otherwise influence or break out of the container.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			allowBottomOverlap: true,

			/**
			 * Number of pixels the positionable should be separated vertically from anchor
			 * @option
			 * @type {number}
			 * @default 0
			 */
			vOffset: 0,

			/**
			 * Number of pixels the positionable should be separated horizontally from anchor
			 * @option
			 * @type {number}
			 * @default 0
			 */
			hOffset: 0
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.responsiveMenu.js":
	/*!***********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.responsiveMenu.js ***!
	 \***********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "ResponsiveMenu": () => (/* binding */ ResponsiveMenu)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.dropdownMenu */ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
		/* harmony import */
		var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.drilldown */ "./node_modules/foundation-sites/js/foundation.drilldown.js");
		/* harmony import */
		var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.accordionMenu */ "./node_modules/foundation-sites/js/foundation.accordionMenu.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		var MenuPlugins = {
			dropdown:  {
				cssClass: 'dropdown',
				plugin:   _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenu
			},
			drilldown: {
				cssClass: 'drilldown',
				plugin:   _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__.Drilldown
			},
			accordion: {
				cssClass: 'accordion-menu',
				plugin:   _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__.AccordionMenu
			}
		}; // import "foundation.util.triggers.js";

		/**
		 * ResponsiveMenu module.
		 * @module foundation.responsiveMenu
		 * @requires foundation.util.triggers
		 * @requires foundation.util.mediaQuery
		 */

		var ResponsiveMenu = /*#__PURE__*/function (_Plugin) {
			_inherits(ResponsiveMenu, _Plugin);

			var _super = _createSuper(ResponsiveMenu);

			function ResponsiveMenu() {
				_classCallCheck(this, ResponsiveMenu);

				return _super.apply(this, arguments);
			}

			_createClass(ResponsiveMenu, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of a responsive menu.
				      * @class
				      * @name ResponsiveMenu
				      * @fires ResponsiveMenu#init
				      * @param {jQuery} element - jQuery object to make into a dropdown menu.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element) {
					     this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
					     this.rules = this.$element.data('responsive-menu');
					     this.currentMq = null;
					     this.currentPlugin = null;
					     this.className = 'ResponsiveMenu'; // ie9 back compat

					     this._init();

					     this._events();
				     }
				/**
				 * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
				 * @function
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__.MediaQuery._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules


					if (typeof this.rules === 'string') {
						var rulesTree = {}; // Parse rules from "classes" pulled from data attribute

						var rules = this.rules.split(' '); // Iterate through every rule found

						for (var i = 0; i < rules.length; i++) {
							var rule = rules[i].split('-');
							var ruleSize = rule.length > 1 ? rule[0] : 'small';
							var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

							if (MenuPlugins[rulePlugin] !== null) {
								rulesTree[ruleSize] = MenuPlugins[rulePlugin];
							}
						}

						this.rules = rulesTree;
					}

					if (!jquery__WEBPACK_IMPORTED_MODULE_0___default().isEmptyObject(this.rules)) {
						this._checkMediaQueries();
					} // Add data-mutate since children may need it.


					this.$element.attr('data-mutate', this.$element.attr('data-mutate') || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'responsive-menu'));
				}
				/**
				 * Initializes events for the Menu.
				 * @function
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this = this;

					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {
						_this._checkMediaQueries();
					}); // $(window).on('resize.zf.ResponsiveMenu', function() {
					//   _this._checkMediaQueries();
					// });
				}
				/**
				 * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
				 * @function
				 * @private
				 */

			}, {
				key:   "_checkMediaQueries",
				value: function _checkMediaQueries() {
					var matchedMq,
					    _this = this; // Iterate through each rule and find the last matching rule


					jquery__WEBPACK_IMPORTED_MODULE_0___default().each(this.rules, function (key) {
						if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__.MediaQuery.atLeast(key)) {
							matchedMq = key;
						}
					}); // No match? No dice

					if (!matchedMq) return; // Plugin already initialized? We good

					if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes

					jquery__WEBPACK_IMPORTED_MODULE_0___default().each(MenuPlugins, function (key, value) {
						_this.$element.removeClass(value.cssClass);
					}); // Add the CSS class for the new plugin

					this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin

					if (this.currentPlugin) this.currentPlugin.destroy();
					this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
				}
				/**
				 * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.currentPlugin.destroy();
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('.zf.ResponsiveMenu');
				}
			}]);

			return ResponsiveMenu;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__.Plugin);

		ResponsiveMenu.defaults = {};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.reveal.js":
	/*!***************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.reveal.js ***!
	 \***************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Reveal": () => (/* binding */ Reveal)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
		/* harmony import */
		var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Reveal module.
		 * @module foundation.reveal
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.touch
		 * @requires foundation.util.triggers
		 * @requires foundation.util.mediaQuery
		 * @requires foundation.util.motion if using animations
		 */

		var Reveal = /*#__PURE__*/function (_Plugin) {
			_inherits(Reveal, _Plugin);

			var _super = _createSuper(Reveal);

			function Reveal() {
				_classCallCheck(this, Reveal);

				return _super.apply(this, arguments);
			}

			_createClass(Reveal, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of Reveal.
				      * @class
				      * @name Reveal
				      * @param {jQuery} element - jQuery object to use for the modal.
				      * @param {Object} options - optional parameters.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Reveal.defaults, this.$element.data(), options);
					     this.className = 'Reveal'; // ie9 back compat

					     this._init(); // Touch and Triggers init are idempotent, just need to make sure they are initialized


					     _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__.Touch.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.register('Reveal', {
						     'ESCAPE': 'close'
					     });
				     }
				/**
				 * Initializes the modal by adding the overlay and close buttons, (if selected).
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var _this2 = this;

					_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery._init();

					this.id = this.$element.attr('id');
					this.isActive = false;
					this.cached = {
						mq: _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__.MediaQuery.current
					};
					this.$anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id, "\"]")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id, "\"]")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat(this.id, "\"]"));
					this.$anchor.attr({
						'aria-controls': this.id,
						'aria-haspopup': 'dialog',
						'tabindex':      0
					});

					if (this.options.fullScreen || this.$element.hasClass('full')) {
						this.options.fullScreen = true;
						this.options.overlay = false;
					}

					if (this.options.overlay && !this.$overlay) {
						this.$overlay = this._makeOverlay(this.id);
					}

					this.$element.attr({
						'role':          'dialog',
						'aria-hidden':   true,
						'data-yeti-box': this.id,
						'data-resize':   this.id
					});

					if (this.$overlay) {
						this.$element.detach().appendTo(this.$overlay);
					} else {
						this.$element.detach().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));
						this.$element.addClass('without-overlay');
					}

					this._events();

					if (this.options.deepLink && window.location.hash === "#".concat(this.id)) {
						this.onLoadListener = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
							return _this2.open();
						});
					}
				}
				/**
				 * Creates an overlay div to display behind the modal.
				 * @private
				 */

			}, {
				key:   "_makeOverlay",
				value: function _makeOverlay() {
					var additionalOverlayClasses = '';

					if (this.options.additionalOverlayClasses) {
						additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
					}

					return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);
				}
				/**
				 * Updates position of modal
				 * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
				 * @private
				 */

			}, {
				key:   "_updatePosition",
				value: function _updatePosition() {
					var width = this.$element.outerWidth();
					var outerWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
					var height = this.$element.outerHeight();
					var outerHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();
					var left,
					    top = null;

					if (this.options.hOffset === 'auto') {
						left = parseInt((outerWidth - width) / 2, 10);
					} else {
						left = parseInt(this.options.hOffset, 10);
					}

					if (this.options.vOffset === 'auto') {
						if (height > outerHeight) {
							top = parseInt(Math.min(100, outerHeight / 10), 10);
						} else {
							top = parseInt((outerHeight - height) / 4, 10);
						}
					} else if (this.options.vOffset !== null) {
						top = parseInt(this.options.vOffset, 10);
					}

					if (top !== null) {
						this.$element.css({
							top: top + 'px'
						});
					} // only worry about left if we don't have an overlay or we have a horizontal offset,
					// otherwise we're perfectly in the middle


					if (!this.$overlay || this.options.hOffset !== 'auto') {
						this.$element.css({
							left: left + 'px'
						});
						this.$element.css({
							margin: '0px'
						});
					}
				}
				/**
				 * Adds event handlers for the modal.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this3 = this;

					var _this = this;

					this.$element.on({
						'open.zf.trigger':     this.open.bind(this),
						'close.zf.trigger':    function closeZfTrigger(event, $element) {
							if (event.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('[data-closable]')[0] === $element) {
								// only close reveal when it's explicitly called
								return _this3.close.apply(_this3);
							}
						},
						'toggle.zf.trigger':   this.toggle.bind(this),
						'resizeme.zf.trigger': function resizemeZfTrigger() {
							_this._updatePosition();
						}
					});

					if (this.options.closeOnClick && this.options.overlay) {
						this.$overlay.off('.zf.reveal').on('click.zf.dropdown tap.zf.dropdown', function (e) {
							if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(document, e.target)) {
								return;
							}

							_this.close();
						});
					}

					if (this.options.deepLink) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("hashchange.zf.reveal:".concat(this.id), this._handleState.bind(this));
					}
				}
				/**
				 * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.
				 * @private
				 */

			}, {
				key:   "_handleState",
				value: function _handleState() {
					if (window.location.hash === '#' + this.id && !this.isActive) {
						this.open();
					} else {
						this.close();
					}
				}
				/**
				 * Disables the scroll when Reveal is shown to prevent the background from shifting
				 * @param {number} scrollTop - Scroll to visually apply, window current scroll by default
				 */

			}, {
				key:   "_disableScroll",
				value: function _disableScroll(scrollTop) {
					scrollTop = scrollTop || jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();

					if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top", -scrollTop);
					}
				}
				/**
				 * Reenables the scroll when Reveal closes
				 * @param {number} scrollTop - Scroll to restore, html "top" property by default (as set by `_disableScroll`)
				 */

			}, {
				key:   "_enableScroll",
				value: function _enableScroll(scrollTop) {
					scrollTop = scrollTop || parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"), 10);

					if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top", "");
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(-scrollTop);
					}
				}
				/**
				 * Opens the modal controlled by `this.$anchor`, and closes all others by default.
				 * @function
				 * @fires Reveal#closeme
				 * @fires Reveal#open
				 */

			}, {
				key:   "open",
				value: function open() {
					var _this4 = this;

					// either update or replace browser history
					var hash = "#".concat(this.id);

					if (this.options.deepLink && window.location.hash !== hash) {
						if (window.history.pushState) {
							if (this.options.updateHistory) {
								window.history.pushState({}, '', hash);
							} else {
								window.history.replaceState({}, '', hash);
							}
						} else {
							window.location.hash = hash;
						}
					} // Remember anchor that opened it to set focus back later, have general anchors as fallback


					this.$activeAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement).is(this.$anchor) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement) : this.$anchor;
					this.isActive = true; // Make elements invisible, but remove display: none so we can get size and positioning

					this.$element.css({
						'visibility': 'hidden'
					}).show().scrollTop(0);

					if (this.options.overlay) {
						this.$overlay.css({
							'visibility': 'hidden'
						}).show();
					}

					this._updatePosition();

					this.$element.hide().css({
						'visibility': ''
					});

					if (this.$overlay) {
						this.$overlay.css({
							'visibility': ''
						}).hide();

						if (this.$element.hasClass('fast')) {
							this.$overlay.addClass('fast');
						} else if (this.$element.hasClass('slow')) {
							this.$overlay.addClass('slow');
						}
					}

					if (!this.options.multipleOpened) {
						/**
						 * Fires immediately before the modal opens.
						 * Closes any other modals that are currently open
						 * @event Reveal#closeme
						 */
						this.$element.trigger('closeme.zf.reveal', this.id);
					}

					if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
						this._disableScroll();
					}

					var _this = this; // Motion UI method of reveal


					if (this.options.animationIn) {
						var afterAnimation = function afterAnimation() {
							_this.$element.attr({
								'aria-hidden': false,
								'tabindex':    -1
							}).focus();

							_this._addGlobalClasses();

							_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.trapFocus(_this.$element);
						};

						if (this.options.overlay) {
							_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__.Motion.animateIn(this.$overlay, 'fade-in');
						}

						_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__.Motion.animateIn(this.$element, this.options.animationIn, function () {
							if (_this4.$element) {
								// protect against object having been removed
								_this4.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.findFocusable(_this4.$element);
								afterAnimation();
							}
						});
					} // jQuery method of reveal
					else {
						if (this.options.overlay) {
							this.$overlay.show(0);
						}

						this.$element.show(this.options.showDelay);
					} // handle accessibility


					this.$element.attr({
						'aria-hidden': false,
						'tabindex':    -1
					}).focus();
					_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.trapFocus(this.$element);

					this._addGlobalClasses();

					this._addGlobalListeners();
					/**
					 * Fires when the modal has successfully opened.
					 * @event Reveal#open
					 */


					this.$element.trigger('open.zf.reveal');
				}
				/**
				 * Adds classes and listeners on document required by open modals.
				 *
				 * The following classes are added and updated:
				 * - `.is-reveal-open` - Prevents the scroll on document
				 * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the
				 *                       scroll was not disabled. This prevent a "shift" of the page content due
				 *                       the scrollbar disappearing when the modal opens.
				 *
				 * @private
				 */

			}, {
				key:   "_addGlobalClasses",
				value: function _addGlobalClasses() {
					var updateScrollbarClass = function updateScrollbarClass() {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').toggleClass('zf-has-scroll', !!(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()));
					};

					this.$element.on('resizeme.zf.trigger.revealScrollbarListener', function () {
						return updateScrollbarClass();
					});
					updateScrollbarClass();
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('is-reveal-open');
				}
				/**
				 * Removes classes and listeners on document that were required by open modals.
				 * @private
				 */

			}, {
				key:   "_removeGlobalClasses",
				value: function _removeGlobalClasses() {
					this.$element.off('resizeme.zf.trigger.revealScrollbarListener');
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('is-reveal-open');
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('zf-has-scroll');
				}
				/**
				 * Adds extra event handlers for the body and window if necessary.
				 * @private
				 */

			}, {
				key:   "_addGlobalListeners",
				value: function _addGlobalListeners() {
					var _this = this;

					if (!this.$element) {
						return;
					} // If we're in the middle of cleanup, don't freak out


					this.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.findFocusable(this.$element);

					if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click.zf.dropdown tap.zf.dropdown', function (e) {
							if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default().contains(document, e.target)) {
								return;
							}

							_this.close();
						});
					}

					if (this.options.closeOnEsc) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keydown.zf.reveal', function (e) {
							_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.handleKey(e, 'Reveal', {
								close: function close() {
									if (_this.options.closeOnEsc) {
										_this.close();
									}
								}
							});
						});
					}
				}
				/**
				 * Closes the modal.
				 * @function
				 * @fires Reveal#closed
				 */

			}, {
				key:   "close",
				value: function close() {
					if (!this.isActive || !this.$element.is(':visible')) {
						return false;
					}

					var _this = this; // Motion UI method of hiding


					if (this.options.animationOut) {
						if (this.options.overlay) {
							_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__.Motion.animateOut(this.$overlay, 'fade-out');
						}

						_foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__.Motion.animateOut(this.$element, this.options.animationOut, finishUp);
					} // jQuery method of hiding
					else {
						this.$element.hide(this.options.hideDelay);

						if (this.options.overlay) {
							this.$overlay.hide(0, finishUp);
						} else {
							finishUp();
						}
					} // Conditionals to remove extra event listeners added on open


					if (this.options.closeOnEsc) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keydown.zf.reveal');
					}

					if (!this.options.overlay && this.options.closeOnClick) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click.zf.dropdown tap.zf.dropdown');
					}

					this.$element.off('keydown.zf.reveal');

					function finishUp() {
						// Get the current top before the modal is closed and restore the scroll after.
						// TODO: use component properties instead of HTML properties
						// See https://github.com/foundation/foundation-sites/pull/10786
						var scrollTop = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"), 10);

						if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
							_this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

						}

						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.releaseFocus(_this.$element);

						_this.$element.attr('aria-hidden', true);

						if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
							_this._enableScroll(scrollTop);
						}
						/**
						 * Fires when the modal is done closing.
						 * @event Reveal#closed
						 */


						_this.$element.trigger('closed.zf.reveal');
					}

					/**
					 * Resets the modal content
					 * This prevents a running video to keep going in the background
					 */


					if (this.options.resetOnClose) {
						this.$element.html(this.$element.html());
					}

					this.isActive = false; // If deepLink and we did not switched to an other modal...

					if (_this.options.deepLink && window.location.hash === "#".concat(this.id)) {
						// Remove the history hash
						if (window.history.replaceState) {
							var urlWithoutHash = window.location.pathname + window.location.search;

							if (this.options.updateHistory) {
								window.history.pushState({}, '', urlWithoutHash); // remove the hash
							} else {
								window.history.replaceState('', document.title, urlWithoutHash);
							}
						} else {
							window.location.hash = '';
						}
					}

					this.$activeAnchor.focus();
				}
				/**
				 * Toggles the open/closed state of a modal.
				 * @function
				 */

			}, {
				key:   "toggle",
				value: function toggle() {
					if (this.isActive) {
						this.close();
					} else {
						this.open();
					}
				}
			}, {
				key: "_destroy",
				value:
				     /**
				      * Destroys an instance of a modal.
				      * @function
				      */
				     function _destroy() {
					     if (this.options.overlay) {
						     this.$element.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()

						     this.$overlay.hide().off().remove();
					     }

					     this.$element.hide().off();
					     this.$anchor.off('.zf');
					     jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(".zf.reveal:".concat(this.id));
					     if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);

					     if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
						     this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

					     }
				     }
			}]);

			return Reveal;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);

		Reveal.defaults = {
			/**
			 * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			animationIn: '',

			/**
			 * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			animationOut: '',

			/**
			 * Time, in ms, to delay the opening of a modal after a click if no animation used.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			showDelay: 0,

			/**
			 * Time, in ms, to delay the closing of a modal after a click if no animation used.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			hideDelay: 0,

			/**
			 * Allows a click on the body/overlay to close the modal.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			closeOnClick: true,

			/**
			 * Allows the modal to close if the user presses the `ESCAPE` key.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			closeOnEsc: true,

			/**
			 * If true, allows multiple modals to be displayed at once.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			multipleOpened: false,

			/**
			 * Distance, in pixels, the modal should push down from the top of the screen.
			 * @option
			 * @type {number|string}
			 * @default auto
			 */
			vOffset: 'auto',

			/**
			 * Distance, in pixels, the modal should push in from the side of the screen.
			 * @option
			 * @type {number|string}
			 * @default auto
			 */
			hOffset: 'auto',

			/**
			 * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			fullScreen: false,

			/**
			 * Allows the modal to generate an overlay div, which will cover the view when modal opens.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			overlay: true,

			/**
			 * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			resetOnClose: false,

			/**
			 * Link the location hash to the modal.
			 * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			deepLink: false,

			/**
			 * If `deepLink` is enabled, update the browser history with the open modal
			 * @option
			 * @default false
			 */
			updateHistory: false,

			/**
			 * Allows the modal to append to custom div.
			 * @option
			 * @type {string}
			 * @default "body"
			 */
			appendTo: "body",

			/**
			 * Allows adding additional class names to the reveal overlay.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			additionalOverlayClasses: ''
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.smoothScroll.js":
	/*!*********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.smoothScroll.js ***!
	 \*********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "SmoothScroll": () => (/* binding */ SmoothScroll)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * SmoothScroll module.
		 * @module foundation.smoothScroll
		 */

		var SmoothScroll = /*#__PURE__*/function (_Plugin) {
			_inherits(SmoothScroll, _Plugin);

			var _super = _createSuper(SmoothScroll);

			function SmoothScroll() {
				_classCallCheck(this, SmoothScroll);

				return _super.apply(this, arguments);
			}

			_createClass(SmoothScroll, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of SmoothScroll.
				      * @class
				      * @name SmoothScroll
				      * @fires SmoothScroll#init
				      * @param {Object} element - jQuery object to add the trigger to.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, SmoothScroll.defaults, this.$element.data(), options);
					     this.className = 'SmoothScroll'; // ie9 back compat

					     this._init();
				     }
				/**
				 * Initialize the SmoothScroll plugin
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var id = this.$element[0].id || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'smooth-scroll');
					this.$element.attr({
						id: id
					});

					this._events();
				}
				/**
				 * Initializes events for SmoothScroll.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					this._linkClickListener = this._handleLinkClick.bind(this);
					this.$element.on('click.zf.smoothScroll', this._linkClickListener);
					this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', this._linkClickListener);
				}
				/**
				 * Handle the given event to smoothly scroll to the anchor pointed by the event target.
				 * @param {*} e - event
				 * @function
				 * @private
				 */

			}, {
				key:   "_handleLinkClick",
				value: function _handleLinkClick(e) {
					var _this = this;

					// Follow the link if it does not point to an anchor.
					if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).is('a[href^="#"]')) return;
					var arrival = e.currentTarget.getAttribute('href');
					this._inTransition = true;
					SmoothScroll.scrollToLoc(arrival, this.options, function () {
						_this._inTransition = false;
					});
					e.preventDefault();
				}
			}, {
				key: "_destroy",
				value:
				     /**
				      * Destroys the SmoothScroll instance.
				      * @function
				      */
				     function _destroy() {
					     this.$element.off('click.zf.smoothScroll', this._linkClickListener);
					     this.$element.off('click.zf.smoothScroll', 'a[href^="#"]', this._linkClickListener);
				     }
			}], [{
				key: "scrollToLoc",
				value:
				     /**
				      * Function to scroll to a given location on the page.
				      * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
				      * @param {Object} options - The options to use.
				      * @param {Function} callback - The callback function.
				      * @static
				      * @function
				      */
				     function scrollToLoc(loc) {
					     var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SmoothScroll.defaults;
					     var callback = arguments.length > 2 ? arguments[2] : undefined;
					     var $loc = jquery__WEBPACK_IMPORTED_MODULE_0___default()(loc); // Do nothing if target does not exist to prevent errors

					     if (!$loc.length) return false;
					     var scrollPos = Math.round($loc.offset().top - options.threshold / 2 - options.offset);
					     jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({
						     scrollTop: scrollPos
					     }, options.animationDuration, options.animationEasing, function () {
						     if (typeof callback === 'function') {
							     callback();
						     }
					     });
				     }
			}]);

			return SmoothScroll;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__.Plugin);
		/**
		 * Default settings for plugin.
		 */


		SmoothScroll.defaults = {
			/**
			 * Amount of time, in ms, the animated scrolling should take between locations.
			 * @option
			 * @type {number}
			 * @default 500
			 */
			animationDuration: 500,

			/**
			 * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
			 * @option
			 * @type {string}
			 * @default 'linear'
			 * @see {@link https://api.jquery.com/animate|Jquery animate}
			 */
			animationEasing: 'linear',

			/**
			 * Number of pixels to use as a marker for location changes.
			 * @option
			 * @type {number}
			 * @default 50
			 */
			threshold: 50,

			/**
			 * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			offset: 0
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.tabs.js":
	/*!*************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.tabs.js ***!
	 \*************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Tabs": () => (/* binding */ Tabs)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
		/* harmony import */
		var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Tabs module.
		 * @module foundation.tabs
		 * @requires foundation.util.keyboard
		 * @requires foundation.util.imageLoader if tabs contain images
		 */

		var Tabs = /*#__PURE__*/function (_Plugin) {
			_inherits(Tabs, _Plugin);

			var _super = _createSuper(Tabs);

			function Tabs() {
				_classCallCheck(this, Tabs);

				return _super.apply(this, arguments);
			}

			_createClass(Tabs, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of tabs.
				      * @class
				      * @name Tabs
				      * @fires Tabs#init
				      * @param {jQuery} element - jQuery object to make into tabs.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Tabs.defaults, this.$element.data(), options);
					     this.className = 'Tabs'; // ie9 back compat

					     this._init();

					     _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.register('Tabs', {
						     'ENTER':       'open',
						     'SPACE':       'open',
						     'ARROW_RIGHT': 'next',
						     'ARROW_UP':    'previous',
						     'ARROW_DOWN':  'next',
						     'ARROW_LEFT':  'previous' // 'TAB': 'next',
						     // 'SHIFT_TAB': 'previous'

					     });
				     }
				/**
				 * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					var _this2 = this;

					var _this = this;

					this._isInitializing = true;
					this.$element.attr({
						'role': 'tablist'
					});
					this.$tabTitles = this.$element.find(".".concat(this.options.linkClass));
					this.$tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-tabs-content=\"".concat(this.$element[0].id, "\"]"));
					this.$tabTitles.each(function () {
						var $elem       = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $link       = $elem.find('a'),
						    isActive    = $elem.hasClass("".concat(_this.options.linkActiveClass)),
						    hash        = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
						    linkId      = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
						    $tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(hash));
						$elem.attr({
							'role': 'presentation'
						});
						$link.attr({
							'role':          'tab',
							'aria-controls': hash,
							'aria-selected': isActive,
							'id':            linkId,
							'tabindex':      isActive ? '0' : '-1'
						});
						$tabContent.attr({
							'role':            'tabpanel',
							'aria-labelledby': linkId
						}); // Save up the initial hash to return to it later when going back in history

						if (isActive) {
							_this._initialAnchor = "#".concat(hash);
						}

						if (!isActive) {
							$tabContent.attr('aria-hidden', 'true');
						}

						if (isActive && _this.options.autoFocus) {
							_this.onLoadListener = (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
								jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
									scrollTop: $elem.offset().top
								}, _this.options.deepLinkSmudgeDelay, function () {
									$link.focus();
								});
							});
						}
					});

					if (this.options.matchHeight) {
						var $images = this.$tabContent.find('img');

						if ($images.length) {
							(0, _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__.onImagesLoaded)($images, this._setHeight.bind(this));
						} else {
							this._setHeight();
						}
					} // Current context-bound function to open tabs on page load or history hashchange


					this._checkDeepLink = function () {
						var anchor = window.location.hash;

						if (!anchor.length) {
							// If we are still initializing and there is no anchor, then there is nothing to do
							if (_this2._isInitializing) return; // Otherwise, move to the initial anchor

							if (_this2._initialAnchor) anchor = _this2._initialAnchor;
						}

						var anchorNoHash = anchor.indexOf('#') >= 0 ? anchor.slice(1) : anchor;
						var $anchor = anchorNoHash && jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(anchorNoHash));

						var $link = anchor && _this2.$element.find("[href$=\"".concat(anchor, "\"],[data-tabs-target=\"").concat(anchorNoHash, "\"]")).first(); // Whether the anchor element that has been found is part of this element


						var isOwnAnchor = !!($anchor.length && $link.length);

						if (isOwnAnchor) {
							// If there is an anchor for the hash, select it
							if ($anchor && $anchor.length && $link && $link.length) {
								_this2.selectTab($anchor, true);
							} // Otherwise, collapse everything
							else {
								_this2._collapse();
							} // Roll up a little to show the titles


							if (_this2.options.deepLinkSmudge) {
								var offset = _this2.$element.offset();

								jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
									scrollTop: offset.top - _this2.options.deepLinkSmudgeOffset
								}, _this2.options.deepLinkSmudgeDelay);
							}
							/**
							 * Fires when the plugin has deeplinked at pageload
							 * @event Tabs#deeplink
							 */


							_this2.$element.trigger('deeplink.zf.tabs', [$link, $anchor]);
						}
					}; //use browser to open a tab, if it exists in this tabset


					if (this.options.deepLink) {
						this._checkDeepLink();
					}

					this._events();

					this._isInitializing = false;
				}
				/**
				 * Adds event handlers for items within the tabs.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					this._addKeyHandler();

					this._addClickHandler();

					this._setHeightMqHandler = null;

					if (this.options.matchHeight) {
						this._setHeightMqHandler = this._setHeight.bind(this);
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
					}

					if (this.options.deepLink) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);
					}
				}
				/**
				 * Adds click handlers for items within the tabs.
				 * @private
				 */

			}, {
				key:   "_addClickHandler",
				value: function _addClickHandler() {
					var _this = this;

					this.$element.off('click.zf.tabs').on('click.zf.tabs', ".".concat(this.options.linkClass), function (e) {
						e.preventDefault();

						_this._handleTabChange(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
					});
				}
				/**
				 * Adds keyboard event handlers for items within the tabs.
				 * @private
				 */

			}, {
				key:   "_addKeyHandler",
				value: function _addKeyHandler() {
					var _this = this;

					this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
						if (e.which === 9) return;
						var $element  = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						    $elements = $element.parent('ul').children('li'),
						    $prevElement,
						    $nextElement;
						$elements.each(function (i) {
							if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
								if (_this.options.wrapOnKeys) {
									$prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
									$nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
								} else {
									$prevElement = $elements.eq(Math.max(0, i - 1));
									$nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
								}

								return;
							}
						}); // handle keyboard event with keyboard util

						_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.handleKey(e, 'Tabs', {
							open:     function open() {
								$element.find('[role="tab"]').focus();

								_this._handleTabChange($element);
							},
							previous: function previous() {
								$prevElement.find('[role="tab"]').focus();

								_this._handleTabChange($prevElement);
							},
							next:     function next() {
								$nextElement.find('[role="tab"]').focus();

								_this._handleTabChange($nextElement);
							},
							handled:  function handled() {
								e.preventDefault();
							}
						});
					});
				}
				/**
				 * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
				 * @param {jQuery} $target - Tab to open.
				 * @param {boolean} historyHandled - browser has already handled a history update
				 * @fires Tabs#change
				 * @function
				 */

			}, {
				key:   "_handleTabChange",
				value: function _handleTabChange($target, historyHandled) {
					// With `activeCollapse`, if the target is the active Tab, collapse it.
					if ($target.hasClass("".concat(this.options.linkActiveClass))) {
						if (this.options.activeCollapse) {
							this._collapse();
						}

						return;
					}

					var $oldTab        = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
					    $tabLink       = $target.find('[role="tab"]'),
					    target         = $tabLink.attr('data-tabs-target'),
					    anchor         = target && target.length ? "#".concat(target) : $tabLink[0].hash,
					    $targetContent = this.$tabContent.find(anchor); //close old tab

					this._collapseTab($oldTab); //open new tab


					this._openTab($target); //either replace or update browser history


					if (this.options.deepLink && !historyHandled) {
						if (this.options.updateHistory) {
							history.pushState({}, '', anchor);
						} else {
							history.replaceState({}, '', anchor);
						}
					}
					/**
					 * Fires when the plugin has successfully changed tabs.
					 * @event Tabs#change
					 */


					this.$element.trigger('change.zf.tabs', [$target, $targetContent]); //fire to children a mutation event

					$targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
				}
				/**
				 * Opens the tab `$targetContent` defined by `$target`.
				 * @param {jQuery} $target - Tab to open.
				 * @function
				 */

			}, {
				key:   "_openTab",
				value: function _openTab($target) {
					var $tabLink       = $target.find('[role="tab"]'),
					    hash           = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
					    $targetContent = this.$tabContent.find("#".concat(hash));
					$target.addClass("".concat(this.options.linkActiveClass));
					$tabLink.attr({
						'aria-selected': 'true',
						'tabindex':      '0'
					});
					$targetContent.addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
				}
				/**
				 * Collapses `$targetContent` defined by `$target`.
				 * @param {jQuery} $target - Tab to collapse.
				 * @function
				 */

			}, {
				key:   "_collapseTab",
				value: function _collapseTab($target) {
					var $targetAnchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
						'aria-selected': 'false',
						'tabindex':      -1
					});
					jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat($targetAnchor.attr('aria-controls'))).removeClass("".concat(this.options.panelActiveClass)).attr({
						'aria-hidden': 'true'
					});
				}
				/**
				 * Collapses the active Tab.
				 * @fires Tabs#collapse
				 * @function
				 */

			}, {
				key:   "_collapse",
				value: function _collapse() {
					var $activeTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass));

					if ($activeTab.length) {
						this._collapseTab($activeTab);
						/**
						 * Fires when the plugin has successfully collapsed tabs.
						 * @event Tabs#collapse
						 */


						this.$element.trigger('collapse.zf.tabs', [$activeTab]);
					}
				}
				/**
				 * Public method for selecting a content pane to display.
				 * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
				 * @param {boolean} historyHandled - browser has already handled a history update
				 * @function
				 */

			}, {
				key:   "selectTab",
				value: function selectTab(elem, historyHandled) {
					var idStr, hashIdStr;

					if (_typeof(elem) === 'object') {
						idStr = elem[0].id;
					} else {
						idStr = elem;
					}

					if (idStr.indexOf('#') < 0) {
						hashIdStr = "#".concat(idStr);
					} else {
						hashIdStr = idStr;
						idStr = idStr.slice(1);
					}

					var $target = this.$tabTitles.has("[href$=\"".concat(hashIdStr, "\"],[data-tabs-target=\"").concat(idStr, "\"]")).first();

					this._handleTabChange($target, historyHandled);
				}
			}, {
				key: "_setHeight",
				value:
				     /**
				      * Sets the height of each panel to the height of the tallest panel.
				      * If enabled in options, gets called on media query change.
				      * If loading content via external source, can be called directly or with _reflow.
				      * If enabled with `data-match-height="true"`, tabs sets to equal height
				      * @function
				      * @private
				      */
				     function _setHeight() {
					     var max   = 0,
					         _this = this; // Lock down the `this` value for the root tabs object


					     if (!this.$tabContent) {
						     return;
					     }

					     this.$tabContent.find(".".concat(this.options.panelClass)).css('min-height', '').each(function () {
						     var panel    = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
						         isActive = panel.hasClass("".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child

						     if (!isActive) {
							     panel.css({
								     'visibility': 'hidden',
								     'display':    'block'
							     });
						     }

						     var temp = this.getBoundingClientRect().height;

						     if (!isActive) {
							     panel.css({
								     'visibility': '',
								     'display':    ''
							     });
						     }

						     max = temp > max ? temp : max;
					     }).css('min-height', "".concat(max, "px"));
				     }
				/**
				 * Destroys an instance of tabs.
				 * @fires Tabs#destroyed
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.find(".".concat(this.options.linkClass)).off('.zf.tabs').hide().end().find(".".concat(this.options.panelClass)).hide();

					if (this.options.matchHeight) {
						if (this._setHeightMqHandler != null) {
							jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
						}
					}

					if (this.options.deepLink) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);
					}

					if (this.onLoadListener) {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
					}
				}
			}]);

			return Tabs;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);

		Tabs.defaults = {
			/**
			 * Link the location hash to the active pane.
			 * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			deepLink: false,

			/**
			 * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			deepLinkSmudge: false,

			/**
			 * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
			 * @option
			 * @type {number}
			 * @default 300
			 */
			deepLinkSmudgeDelay: 300,

			/**
			 * If `deepLinkSmudge` is enabled, animation offset from the top for the deep link adjustment
			 * @option
			 * @type {number}
			 * @default 0
			 */
			deepLinkSmudgeOffset: 0,

			/**
			 * If `deepLink` is enabled, update the browser history with the open tab
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			updateHistory: false,

			/**
			 * Allows the window to scroll to content of active pane on load.
			 * Not recommended if more than one tab panel per page.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			autoFocus: false,

			/**
			 * Allows keyboard input to 'wrap' around the tab links.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			wrapOnKeys: true,

			/**
			 * Allows the tab content panes to match heights if set to true.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			matchHeight: false,

			/**
			 * Allows active tabs to collapse when clicked.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			activeCollapse: false,

			/**
			 * Class applied to `li`'s in tab link list.
			 * @option
			 * @type {string}
			 * @default 'tabs-title'
			 */
			linkClass: 'tabs-title',

			/**
			 * Class applied to the active `li` in tab link list.
			 * @option
			 * @type {string}
			 * @default 'is-active'
			 */
			linkActiveClass: 'is-active',

			/**
			 * Class applied to the content containers.
			 * @option
			 * @type {string}
			 * @default 'tabs-panel'
			 */
			panelClass: 'tabs-panel',

			/**
			 * Class applied to the active content container.
			 * @option
			 * @type {string}
			 * @default 'is-active'
			 */
			panelActiveClass: 'is-active'
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.toggler.js":
	/*!****************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.toggler.js ***!
	 \****************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Toggler": () => (/* binding */ Toggler)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
		/* harmony import */
		var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Toggler module.
		 * @module foundation.toggler
		 * @requires foundation.util.motion
		 * @requires foundation.util.triggers
		 */

		var Toggler = /*#__PURE__*/function (_Plugin) {
			_inherits(Toggler, _Plugin);

			var _super = _createSuper(Toggler);

			function Toggler() {
				_classCallCheck(this, Toggler);

				return _super.apply(this, arguments);
			}

			_createClass(Toggler, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of Toggler.
				      * @class
				      * @name Toggler
				      * @fires Toggler#init
				      * @param {Object} element - jQuery object to add the trigger to.
				      * @param {Object} options - Overrides to the default plugin settings.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Toggler.defaults, element.data(), options);
					     this.className = '';
					     this.className = 'Toggler'; // ie9 back compat
					     // Triggers init is idempotent, just need to make sure it is initialized

					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));

					     this._init();

					     this._events();
				     }
				/**
				 * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
				 * @function
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					// Collect triggers to set ARIA attributes to
					var id        = this.$element[0].id,
					    $triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open~=\"".concat(id, "\"], [data-close~=\"").concat(id, "\"], [data-toggle~=\"").concat(id, "\"]"));
					var input; // Parse animation classes if they were set

					if (this.options.animate) {
						input = this.options.animate.split(' ');
						this.animationIn = input[0];
						this.animationOut = input[1] || null; // - aria-expanded: according to the element visibility.

						$triggers.attr('aria-expanded', !this.$element.is(':hidden'));
					} // Otherwise, parse toggle class
					else {
						input = this.options.toggler;

						if (typeof input !== 'string' || !input.length) {
							throw new Error("The 'toggler' option containing the target class is required, got \"".concat(input, "\""));
						} // Allow for a . at the beginning of the string


						this.className = input[0] === '.' ? input.slice(1) : input; // - aria-expanded: according to the elements class set.

						$triggers.attr('aria-expanded', this.$element.hasClass(this.className));
					} // - aria-controls: adding the element id to it if not already in it.


					$triggers.each(function (index, trigger) {
						var $trigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()(trigger);
						var controls = $trigger.attr('aria-controls') || '';
						var containsId = new RegExp("\\b".concat((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.RegExpEscape)(id), "\\b")).test(controls);
						if (!containsId) $trigger.attr('aria-controls', controls ? "".concat(controls, " ").concat(id) : id);
					});
				}
				/**
				 * Initializes events for the toggle trigger.
				 * @function
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
				}
				/**
				 * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
				 * @function
				 * @fires Toggler#on
				 * @fires Toggler#off
				 */

			}, {
				key:   "toggle",
				value: function toggle() {
					this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
				}
			}, {
				key:   "_toggleClass",
				value: function _toggleClass() {
					this.$element.toggleClass(this.className);
					var isOn = this.$element.hasClass(this.className);

					if (isOn) {
						/**
						 * Fires if the target element has the class after a toggle.
						 * @event Toggler#on
						 */
						this.$element.trigger('on.zf.toggler');
					} else {
						/**
						 * Fires if the target element does not have the class after a toggle.
						 * @event Toggler#off
						 */
						this.$element.trigger('off.zf.toggler');
					}

					this._updateARIA(isOn);

					this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
				}
			}, {
				key:   "_toggleAnimate",
				value: function _toggleAnimate() {
					var _this = this;

					if (this.$element.is(':hidden')) {
						_foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__.Motion.animateIn(this.$element, this.animationIn, function () {
							_this._updateARIA(true);

							this.trigger('on.zf.toggler');
							this.find('[data-mutate]').trigger('mutateme.zf.trigger');
						});
					} else {
						_foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__.Motion.animateOut(this.$element, this.animationOut, function () {
							_this._updateARIA(false);

							this.trigger('off.zf.toggler');
							this.find('[data-mutate]').trigger('mutateme.zf.trigger');
						});
					}
				}
			}, {
				key:   "_updateARIA",
				value: function _updateARIA(isOn) {
					var id = this.$element[0].id;
					jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(id, "\"], [data-close=\"").concat(id, "\"], [data-toggle=\"").concat(id, "\"]")).attr({
						'aria-expanded': isOn ? true : false
					});
				}
				/**
				 * Destroys the instance of Toggler on the element.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.off('.zf.toggler');
				}
			}]);

			return Toggler;
		}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__.Plugin);

		Toggler.defaults = {
			/**
			 * Class of the element to toggle. It can be provided with or without "."
			 * @option
			 * @type {string}
			 */
			toggler: undefined,

			/**
			 * Tells the plugin if the element should animated when toggled.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			animate: false
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.tooltip.js":
	/*!****************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.tooltip.js ***!
	 \****************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
		/* harmony import */
		var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
		/* harmony import */
		var _foundation_positionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.positionable */ "./node_modules/foundation-sites/js/foundation.positionable.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

		function _get() {
			if (typeof Reflect !== "undefined" && Reflect.get) {
				_get = Reflect.get;
			} else {
				_get = function _get(target, property, receiver) {
					var base = _superPropBase(target, property);
					if (!base) return;
					var desc = Object.getOwnPropertyDescriptor(base, property);
					if (desc.get) {
						return desc.get.call(arguments.length < 3 ? target : receiver);
					}
					return desc.value;
				};
			}
			return _get.apply(this, arguments);
		}

		function _superPropBase(object, property) {
			while (!Object.prototype.hasOwnProperty.call(object, property)) {
				object = _getPrototypeOf(object);
				if (object === null) break;
			}
			return object;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function");
			}
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value:        subClass,
					writable:     true,
					configurable: true
				}
			});
			Object.defineProperty(subClass, "prototype", {writable: false});
			if (superClass) _setPrototypeOf(subClass, superClass);
		}

		function _setPrototypeOf(o, p) {
			_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
			return _setPrototypeOf(o, p);
		}

		function _createSuper(Derived) {
			var hasNativeReflectConstruct = _isNativeReflectConstruct();
			return function _createSuperInternal() {
				var Super = _getPrototypeOf(Derived), result;
				if (hasNativeReflectConstruct) {
					var NewTarget = _getPrototypeOf(this).constructor;
					result = Reflect.construct(Super, arguments, NewTarget);
				} else {
					result = Super.apply(this, arguments);
				}
				return _possibleConstructorReturn(this, result);
			};
		}

		function _possibleConstructorReturn(self, call) {
			if (call && (_typeof(call) === "object" || typeof call === "function")) {
				return call;
			} else if (call !== void 0) {
				throw new TypeError("Derived constructors may only return object or undefined");
			}
			return _assertThisInitialized(self);
		}

		function _assertThisInitialized(self) {
			if (self === void 0) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			return self;
		}

		function _isNativeReflectConstruct() {
			if (typeof Reflect === "undefined" || !Reflect.construct) return false;
			if (Reflect.construct.sham) return false;
			if (typeof Proxy === "function") return true;
			try {
				Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
				}));
				return true;
			} catch (e) {
				return false;
			}
		}

		function _getPrototypeOf(o) {
			_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
			return _getPrototypeOf(o);
		}


		/**
		 * Tooltip module.
		 * @module foundation.tooltip
		 * @requires foundation.util.box
		 * @requires foundation.util.mediaQuery
		 * @requires foundation.util.triggers
		 */

		var Tooltip = /*#__PURE__*/function (_Positionable) {
			_inherits(Tooltip, _Positionable);

			var _super = _createSuper(Tooltip);

			function Tooltip() {
				_classCallCheck(this, Tooltip);

				return _super.apply(this, arguments);
			}

			_createClass(Tooltip, [{
				key: "_setup",
				value:
				     /**
				      * Creates a new instance of a Tooltip.
				      * @class
				      * @name Tooltip
				      * @fires Tooltip#init
				      * @param {jQuery} element - jQuery object to attach a tooltip to.
				      * @param {Object} options - object to extend the default configuration.
				      */
				     function _setup(element, options) {
					     this.$element = element;
					     this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Tooltip.defaults, this.$element.data(), options);
					     this.className = 'Tooltip'; // ie9 back compat

					     this.isActive = false;
					     this.isClick = false; // Triggers init is idempotent, just need to make sure it is initialized

					     _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__.Triggers.init((jquery__WEBPACK_IMPORTED_MODULE_0___default()));

					     this._init();
				     }
				/**
				 * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
				 * @private
				 */

			}, {
				key:   "_init",
				value: function _init() {
					_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__.MediaQuery._init();

					var elemId = this.$element.attr('aria-describedby') || (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'tooltip');
					this.options.tipText = this.options.tipText || this.$element.attr('title');
					this.template = this.options.template ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.template) : this._buildTemplate(elemId);

					if (this.options.allowHtml) {
						this.template.appendTo(document.body).html(this.options.tipText).hide();
					} else {
						this.template.appendTo(document.body).text(this.options.tipText).hide();
					}

					this.$element.attr({
						'title':            '',
						'aria-describedby': elemId,
						'data-yeti-box':    elemId,
						'data-toggle':      elemId,
						'data-resize':      elemId
					}).addClass(this.options.triggerClass);

					_get(_getPrototypeOf(Tooltip.prototype), "_init", this).call(this);

					this._events();
				}
			}, {
				key:   "_getDefaultPosition",
				value: function _getDefaultPosition() {
					// handle legacy classnames
					var elementClassName = this.$element[0].className;

					if (this.$element[0] instanceof SVGElement) {
						elementClassName = elementClassName.baseVal;
					}

					var position = elementClassName.match(/\b(top|left|right|bottom)\b/g);
					return position ? position[0] : 'top';
				}
			}, {
				key:   "_getDefaultAlignment",
				value: function _getDefaultAlignment() {
					return 'center';
				}
			}, {
				key:   "_getHOffset",
				value: function _getHOffset() {
					if (this.position === 'left' || this.position === 'right') {
						return this.options.hOffset + this.options.tooltipWidth;
					} else {
						return this.options.hOffset;
					}
				}
			}, {
				key:   "_getVOffset",
				value: function _getVOffset() {
					if (this.position === 'top' || this.position === 'bottom') {
						return this.options.vOffset + this.options.tooltipHeight;
					} else {
						return this.options.vOffset;
					}
				}
				/**
				 * builds the tooltip element, adds attributes, and returns the template.
				 * @private
				 */

			}, {
				key:   "_buildTemplate",
				value: function _buildTemplate(id) {
					var templateClasses = "".concat(this.options.tooltipClass, " ").concat(this.options.templateClasses).trim();
					var $template = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass(templateClasses).attr({
						'role':           'tooltip',
						'aria-hidden':    true,
						'data-is-active': false,
						'data-is-focus':  false,
						'id':             id
					});
					return $template;
				}
				/**
				 * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
				 * if the tooltip is larger than the screen width, default to full width - any user selected margin
				 * @private
				 */

			}, {
				key:   "_setPosition",
				value: function _setPosition() {
					_get(_getPrototypeOf(Tooltip.prototype), "_setPosition", this).call(this, this.$element, this.template);
				}
				/**
				 * reveals the tooltip, and fires an event to close any other open tooltips on the page
				 * @fires Tooltip#closeme
				 * @fires Tooltip#show
				 * @function
				 */

			}, {
				key:   "show",
				value: function show() {
					if (this.options.showOn !== 'all' && !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__.MediaQuery.is(this.options.showOn)) {
						// console.error('The screen is too small to display this tooltip');
						return false;
					}

					var _this = this;

					this.template.css('visibility', 'hidden').show();

					this._setPosition();

					this.template.removeClass('top bottom left right').addClass(this.position);
					this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);
					/**
					 * Fires to close all other open tooltips on the page
					 * @event Closeme#tooltip
					 */

					this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));
					this.template.attr({
						'data-is-active': true,
						'aria-hidden':    false
					});
					_this.isActive = true;
					this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {//maybe do stuff?
					});
					/**
					 * Fires when the tooltip is shown
					 * @event Tooltip#show
					 */

					this.$element.trigger('show.zf.tooltip');
				}
				/**
				 * Hides the current tooltip, and resets the positioning class if it was changed due to collision
				 * @fires Tooltip#hide
				 * @function
				 */

			}, {
				key:   "hide",
				value: function hide() {
					var _this = this;

					this.template.stop().attr({
						'aria-hidden':    true,
						'data-is-active': false
					}).fadeOut(this.options.fadeOutDuration, function () {
						_this.isActive = false;
						_this.isClick = false;
					});
					/**
					 * fires when the tooltip is hidden
					 * @event Tooltip#hide
					 */

					this.$element.trigger('hide.zf.tooltip');
				}
				/**
				 * adds event listeners for the tooltip and its anchor
				 * TODO combine some of the listeners like focus and mouseenter, etc.
				 * @private
				 */

			}, {
				key:   "_events",
				value: function _events() {
					var _this = this;

					var hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined';
					var isFocus = false; // `disableForTouch: Fully disable the tooltip on touch devices

					if (hasTouch && this.options.disableForTouch) return;

					if (!this.options.disableHover) {
						this.$element.on('mouseenter.zf.tooltip', function () {
							if (!_this.isActive) {
								_this.timeout = setTimeout(function () {
									_this.show();
								}, _this.options.hoverDelay);
							}
						}).on('mouseleave.zf.tooltip', (0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.ignoreMousedisappear)(function () {
							clearTimeout(_this.timeout);

							if (!isFocus || _this.isClick && !_this.options.clickOpen) {
								_this.hide();
							}
						}));
					}

					if (hasTouch) {
						this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function () {
							_this.isActive ? _this.hide() : _this.show();
						});
					}

					if (this.options.clickOpen) {
						this.$element.on('mousedown.zf.tooltip', function () {
							if (_this.isClick) {//_this.hide();
								// _this.isClick = false;
							} else {
								_this.isClick = true;

								if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
									_this.show();
								}
							}
						});
					} else {
						this.$element.on('mousedown.zf.tooltip', function () {
							_this.isClick = true;
						});
					}

					this.$element.on({
						// 'toggle.zf.trigger': this.toggle.bind(this),
						// 'close.zf.trigger': this.hide.bind(this)
						'close.zf.trigger': this.hide.bind(this)
					});
					this.$element.on('focus.zf.tooltip', function () {
						isFocus = true;

						if (_this.isClick) {
							// If we're not showing open on clicks, we need to pretend a click-launched focus isn't
							// a real focus, otherwise on hover and come back we get bad behavior
							if (!_this.options.clickOpen) {
								isFocus = false;
							}

							return false;
						} else {
							_this.show();
						}
					}).on('focusout.zf.tooltip', function () {
						isFocus = false;
						_this.isClick = false;

						_this.hide();
					}).on('resizeme.zf.trigger', function () {
						if (_this.isActive) {
							_this._setPosition();
						}
					});
				}
				/**
				 * adds a toggle method, in addition to the static show() & hide() functions
				 * @function
				 */

			}, {
				key:   "toggle",
				value: function toggle() {
					if (this.isActive) {
						this.hide();
					} else {
						this.show();
					}
				}
				/**
				 * Destroys an instance of tooltip, removes template element from the view.
				 * @function
				 */

			}, {
				key:   "_destroy",
				value: function _destroy() {
					this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tooltip').removeClass(this.options.triggerClass).removeClass('top right left bottom').removeAttr('aria-describedby data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');
					this.template.remove();
				}
			}]);

			return Tooltip;
		}(_foundation_positionable__WEBPACK_IMPORTED_MODULE_4__.Positionable);

		Tooltip.defaults = {
			/**
			 * Time, in ms, before a tooltip should open on hover.
			 * @option
			 * @type {number}
			 * @default 200
			 */
			hoverDelay: 200,

			/**
			 * Time, in ms, a tooltip should take to fade into view.
			 * @option
			 * @type {number}
			 * @default 150
			 */
			fadeInDuration: 150,

			/**
			 * Time, in ms, a tooltip should take to fade out of view.
			 * @option
			 * @type {number}
			 * @default 150
			 */
			fadeOutDuration: 150,

			/**
			 * Disables hover events from opening the tooltip if set to true
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			disableHover: false,

			/**
			 * Disable the tooltip for touch devices.
			 * This can be useful to make elements with a tooltip on it trigger their
			 * action on the first tap instead of displaying the tooltip.
			 * @option
			 * @type {booelan}
			 * @default false
			 */
			disableForTouch: false,

			/**
			 * Optional addtional classes to apply to the tooltip template on init.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			templateClasses: '',

			/**
			 * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
			 * @option
			 * @type {string}
			 * @default 'tooltip'
			 */
			tooltipClass: 'tooltip',

			/**
			 * Class applied to the tooltip anchor element.
			 * @option
			 * @type {string}
			 * @default 'has-tip'
			 */
			triggerClass: 'has-tip',

			/**
			 * Minimum breakpoint size at which to open the tooltip.
			 * @option
			 * @type {string}
			 * @default 'small'
			 */
			showOn: 'small',

			/**
			 * Custom template to be used to generate markup for tooltip.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			template: '',

			/**
			 * Text displayed in the tooltip template on open.
			 * @option
			 * @type {string}
			 * @default ''
			 */
			tipText:        '',
			touchCloseText: 'Tap to close.',

			/**
			 * Allows the tooltip to remain open if triggered with a click or touch event.
			 * @option
			 * @type {boolean}
			 * @default true
			 */
			clickOpen: true,

			/**
			 * Position of tooltip. Can be left, right, bottom, top, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			position: 'auto',

			/**
			 * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
			 * @option
			 * @type {string}
			 * @default 'auto'
			 */
			alignment: 'auto',

			/**
			 * Allow overlap of container/window. If false, tooltip will first try to
			 * position as defined by data-position and data-alignment, but reposition if
			 * it would cause an overflow.  @option
			 * @type {boolean}
			 * @default false
			 */
			allowOverlap: false,

			/**
			 * Allow overlap of only the bottom of the container. This is the most common
			 * behavior for dropdowns, allowing the dropdown to extend the bottom of the
			 * screen but not otherwise influence or break out of the container.
			 * Less common for tooltips.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			allowBottomOverlap: false,

			/**
			 * Distance, in pixels, the template should push away from the anchor on the Y axis.
			 * @option
			 * @type {number}
			 * @default 0
			 */
			vOffset: 0,

			/**
			 * Distance, in pixels, the template should push away from the anchor on the X axis
			 * @option
			 * @type {number}
			 * @default 0
			 */
			hOffset: 0,

			/**
			 * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
			 * @option
			 * @type {number}
			 * @default 14
			 */
			tooltipHeight: 14,

			/**
			 * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
			 * @option
			 * @type {number}
			 * @default 12
			 */
			tooltipWidth: 12,

			/**
			 * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
			 * allowing HTML may open yourself up to XSS attacks.
			 * @option
			 * @type {boolean}
			 * @default false
			 */
			allowHtml: false
		};
		/**
		 * TODO utilize resize event trigger
		 */


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.box.js":
	/*!*****************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.box.js ***!
	 \*****************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Box": () => (/* binding */ Box)
			/* harmony export */
		});
		var Box = {
			ImNotTouchingYou:   ImNotTouchingYou,
			OverlapArea:        OverlapArea,
			GetDimensions:      GetDimensions,
			GetExplicitOffsets: GetExplicitOffsets
		};

		/**
		 * Compares the dimensions of an element to a container and determines collision events with container.
		 * @function
		 * @param {jQuery} element - jQuery object to test for collisions.
		 * @param {jQuery} parent - jQuery object to use as bounding container.
		 * @param {Boolean} lrOnly - set to true to check left and right values only.
		 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
		 * @default if no parent object passed, detects collisions with `window`.
		 * @returns {Boolean} - true if collision free, false if a collision in any direction.
		 */

		function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
			return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
		}

		function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
			var eleDims = GetDimensions(element),
			    topOver,
			    bottomOver,
			    leftOver,
			    rightOver;

			if (parent) {
				var parDims = GetDimensions(parent);
				bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
				topOver = eleDims.offset.top - parDims.offset.top;
				leftOver = eleDims.offset.left - parDims.offset.left;
				rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
			} else {
				bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
				topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
				leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
				rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
			}

			bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
			topOver = Math.min(topOver, 0);
			leftOver = Math.min(leftOver, 0);
			rightOver = Math.min(rightOver, 0);

			if (lrOnly) {
				return leftOver + rightOver;
			}

			if (tbOnly) {
				return topOver + bottomOver;
			} // use sum of squares b/c we care about overlap area.


			return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
		}

		/**
		 * Uses native methods to return an object of dimension values.
		 * @function
		 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
		 * @returns {Object} - nested object of integer pixel values
		 * TODO - if element is window, return only those values.
		 */


		function GetDimensions(elem) {
			elem = elem.length ? elem[0] : elem;

			if (elem === window || elem === document) {
				throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
			}

			var rect    = elem.getBoundingClientRect(),
			    parRect = elem.parentNode.getBoundingClientRect(),
			    winRect = document.body.getBoundingClientRect(),
			    winY    = window.pageYOffset,
			    winX    = window.pageXOffset;
			return {
				width:      rect.width,
				height:     rect.height,
				offset:     {
					top:  rect.top + winY,
					left: rect.left + winX
				},
				parentDims: {
					width:  parRect.width,
					height: parRect.height,
					offset: {
						top:  parRect.top + winY,
						left: parRect.left + winX
					}
				},
				windowDims: {
					width:  winRect.width,
					height: winRect.height,
					offset: {
						top:  winY,
						left: winX
					}
				}
			};
		}

		/**
		 * Returns an object of top and left integer pixel values for dynamically rendered elements,
		 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
		 * you don't know alignment, but generally from
		 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
		 * @function
		 * @param {jQuery} element - jQuery object for the element being positioned.
		 * @param {jQuery} anchor - jQuery object for the element's anchor point.
		 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
		 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
		 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
		 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
		 * TODO alter/rewrite to work with `em` values as well/instead of pixels
		 */


		function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
			var $eleDims    = GetDimensions(element),
			    $anchorDims = anchor ? GetDimensions(anchor) : null;
			var topVal, leftVal;

			if ($anchorDims !== null) {
				// set position related attribute
				switch (position) {
					case 'top':
						topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
						break;

					case 'bottom':
						topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
						break;

					case 'left':
						leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
						break;

					case 'right':
						leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
						break;
				} // set alignment related attribute


				switch (position) {
					case 'top':
					case 'bottom':
						switch (alignment) {
							case 'left':
								leftVal = $anchorDims.offset.left + hOffset;
								break;

							case 'right':
								leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
								break;

							case 'center':
								leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
								break;
						}

						break;

					case 'right':
					case 'left':
						switch (alignment) {
							case 'bottom':
								topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
								break;

							case 'top':
								topVal = $anchorDims.offset.top + vOffset;
								break;

							case 'center':
								topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
								break;
						}

						break;
				}
			}

			return {
				top:  topVal,
				left: leftVal
			};
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js":
	/*!*************************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.imageLoader.js ***!
	 \*************************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "onImagesLoaded": () => (/* binding */ onImagesLoaded)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

		/**
		 * Runs a callback function when images are fully loaded.
		 * @param {Object} images - Image(s) to check if loaded.
		 * @param {Func} callback - Function to execute when image is fully loaded.
		 */

		function onImagesLoaded(images, callback) {
			var unloaded = images.length;

			if (unloaded === 0) {
				callback();
			}

			images.each(function () {
				// Check if image is loaded
				if (this.complete && typeof this.naturalWidth !== 'undefined') {
					singleImageLoaded();
				} else {
					// If the above check failed, simulate loading on detached element.
					var image = new Image(); // Still count image as loaded if it finalizes with an error.

					var events = "load.zf.images error.zf.images";
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).one(events, function me() {
						// Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off(events, me);
						singleImageLoaded();
					});
					image.src = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src');
				}
			});

			function singleImageLoaded() {
				unloaded--;

				if (unloaded === 0) {
					callback();
				}
			}
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.keyboard.js":
	/*!**********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.keyboard.js ***!
	 \**********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/*******************************************
		 *                                         *
		 * This util was created by Marius Olbertz *
		 * Please thank Marius on GitHub /owlbertz *
		 * or the web http://www.mariusolbertz.de/ *
		 *                                         *
		 ******************************************/


		var keyCodes = {
			9:  'TAB',
			13: 'ENTER',
			27: 'ESCAPE',
			32: 'SPACE',
			35: 'END',
			36: 'HOME',
			37: 'ARROW_LEFT',
			38: 'ARROW_UP',
			39: 'ARROW_RIGHT',
			40: 'ARROW_DOWN'
		};
		var commands = {}; // Functions pulled out to be referenceable from internals

		function findFocusable($element) {
			if (!$element) {
				return false;
			}

			return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
				if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':visible') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('tabindex') < 0) {
					return false;
				} //only have visible elements and those that have a tabindex greater or equal 0


				return true;
			}).sort(function (a, b) {
				if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex') === jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex')) {
					return 0;
				}

				var aTabIndex = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex'), 10),
				    bTabIndex = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex'), 10); // Undefined is treated the same as 0

				if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(a).attr('tabindex') === 'undefined' && bTabIndex > 0) {
					return 1;
				}

				if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(b).attr('tabindex') === 'undefined' && aTabIndex > 0) {
					return -1;
				}

				if (aTabIndex === 0 && bTabIndex > 0) {
					return 1;
				}

				if (bTabIndex === 0 && aTabIndex > 0) {
					return -1;
				}

				if (aTabIndex < bTabIndex) {
					return -1;
				}

				if (aTabIndex > bTabIndex) {
					return 1;
				}
			});
		}

		function parseKey(event) {
			var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase(); // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events

			key = key.replace(/\W+/, '');
			if (event.shiftKey) key = "SHIFT_".concat(key);
			if (event.ctrlKey) key = "CTRL_".concat(key);
			if (event.altKey) key = "ALT_".concat(key); // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)

			key = key.replace(/_$/, '');
			return key;
		}

		var Keyboard = {
			keys: getKeyCodes(keyCodes),

			/**
			 * Parses the (keyboard) event and returns a String that represents its key
			 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
			 * @param {Event} event - the event generated by the event handler
			 * @return String key - String that represents the key pressed
			 */
			parseKey: parseKey,

			/**
			 * Handles the given (keyboard) event
			 * @param {Event} event - the event generated by the event handler
			 * @param {String} component - Foundation component's name, e.g. Slider or Reveal
			 * @param {Objects} functions - collection of functions that are to be executed
			 */
			handleKey: function handleKey(event, component, functions) {
				var commandList = commands[component],
				    keyCode     = this.parseKey(event),
				    cmds,
				    command,
				    fn;
				if (!commandList) return console.warn('Component not defined!'); // Ignore the event if it was already handled

				if (event.zfIsKeyHandled === true) return; // This component does not differentiate between ltr and rtl

				if (typeof commandList.ltr === 'undefined') {
					cmds = commandList; // use plain list
				} else {
					// merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
					if ((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.rtl)()) cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, commandList.ltr, commandList.rtl); else cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, commandList.rtl, commandList.ltr);
				}

				command = cmds[keyCode];
				fn = functions[command]; // Execute the handler if found

				if (fn && typeof fn === 'function') {
					var returnValue = fn.apply(); // Mark the event as "handled" to prevent future handlings

					event.zfIsKeyHandled = true; // Execute function when event was handled

					if (functions.handled || typeof functions.handled === 'function') {
						functions.handled(returnValue);
					}
				} else {
					// Execute function when event was not handled
					if (functions.unhandled || typeof functions.unhandled === 'function') {
						functions.unhandled();
					}
				}
			},

			/**
			 * Finds all focusable elements within the given `$element`
			 * @param {jQuery} $element - jQuery object to search within
			 * @return {jQuery} $focusable - all focusable elements within `$element`
			 */
			findFocusable: findFocusable,

			/**
			 * Returns the component name name
			 * @param {Object} component - Foundation component, e.g. Slider or Reveal
			 * @return String componentName
			 */
			register: function register(componentName, cmds) {
				commands[componentName] = cmds;
			},
			// TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
			//

			/**
			 * Traps the focus in the given element.
			 * @param  {jQuery} $element  jQuery object to trap the foucs into.
			 */
			trapFocus: function trapFocus($element) {
				var $focusable      = findFocusable($element),
				    $firstFocusable = $focusable.eq(0),
				    $lastFocusable  = $focusable.eq(-1);
				$element.on('keydown.zf.trapfocus', function (event) {
					if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
						event.preventDefault();
						$firstFocusable.focus();
					} else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
						event.preventDefault();
						$lastFocusable.focus();
					}
				});
			},

			/**
			 * Releases the trapped focus from the given element.
			 * @param  {jQuery} $element  jQuery object to release the focus for.
			 */
			releaseFocus: function releaseFocus($element) {
				$element.off('keydown.zf.trapfocus');
			}
		};

		/*
		 * Constants for easier comparing.
		 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
		 */

		function getKeyCodes(kcs) {
			var k = {};

			for (var kc in kcs) {
				if (kcs.hasOwnProperty(kc)) k[kcs[kc]] = kcs[kc];
			}

			return k;
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js":
	/*!************************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.mediaQuery.js ***!
	 \************************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "MediaQuery": () => (/* binding */ MediaQuery)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}

		function _slicedToArray(arr, i) {
			return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
		}

		function _nonIterableRest() {
			throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}

		function _unsupportedIterableToArray(o, minLen) {
			if (!o) return;
			if (typeof o === "string") return _arrayLikeToArray(o, minLen);
			var n = Object.prototype.toString.call(o).slice(8, -1);
			if (n === "Object" && o.constructor) n = o.constructor.name;
			if (n === "Map" || n === "Set") return Array.from(o);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
		}

		function _arrayLikeToArray(arr, len) {
			if (len == null || len > arr.length) len = arr.length;
			for (var i = 0, arr2 = new Array(len); i < len; i++) {
				arr2[i] = arr[i];
			}
			return arr2;
		}

		function _iterableToArrayLimit(arr, i) {
			var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
			if (_i == null) return;
			var _arr = [];
			var _n = true;
			var _d = false;
			var _s, _e;
			try {
				for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);
					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"] != null) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}
			return _arr;
		}

		function _arrayWithHoles(arr) {
			if (Array.isArray(arr)) return arr;
		}

		// Default set of media queries
// const defaultQueries = {
//   'default' : 'only screen',
//   landscape : 'only screen and (orientation: landscape)',
//   portrait : 'only screen and (orientation: portrait)',
//   retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
//     'only screen and (min--moz-device-pixel-ratio: 2),' +
//     'only screen and (-o-min-device-pixel-ratio: 2/1),' +
//     'only screen and (min-device-pixel-ratio: 2),' +
//     'only screen and (min-resolution: 192dpi),' +
//     'only screen and (min-resolution: 2dppx)'
//   };
// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright © 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license

		/* eslint-disable */

		window.matchMedia || (window.matchMedia = function () {
			"use strict"; // For browsers that support matchMedium api such as IE 9 and webkit

			var styleMedia = window.styleMedia || window.media; // For those that don't support matchMedium

			if (!styleMedia) {
				var style  = document.createElement('style'),
				    script = document.getElementsByTagName('script')[0],
				    info   = null;
				style.type = 'text/css';
				style.id = 'matchmediajs-test';

				if (!script) {
					document.head.appendChild(style);
				} else {
					script.parentNode.insertBefore(style, script);
				} // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers


				info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;
				styleMedia = {
					matchMedium: function matchMedium(media) {
						var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }'; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers

						if (style.styleSheet) {
							style.styleSheet.cssText = text;
						} else {
							style.textContent = text;
						} // Test if media query is true or false


						return info.width === '1px';
					}
				};
			}

			return function (media) {
				return {
					matches: styleMedia.matchMedium(media || 'all'),
					media:   media || 'all'
				};
			};
		}());
		/* eslint-enable */

		var MediaQuery = {
			queries: [],
			current: '',

			/**
			 * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
			 * @function
			 * @private
			 */
			_init: function _init() {
				// make sure the initialization is only done once when calling _init() several times
				if (this.isInitialized === true) {
					return this;
				} else {
					this.isInitialized = true;
				}

				var self = this;
				var $meta = jquery__WEBPACK_IMPORTED_MODULE_0___default()('meta.foundation-mq');

				if (!$meta.length) {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()('<meta class="foundation-mq" name="foundation-mq" content>').appendTo(document.head);
				}

				var extractedStyles = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.foundation-mq').css('font-family');
				var namedQueries;
				namedQueries = parseStyleToObject(extractedStyles);
				self.queries = []; // reset

				for (var key in namedQueries) {
					if (namedQueries.hasOwnProperty(key)) {
						self.queries.push({
							name:  key,
							value: "only screen and (min-width: ".concat(namedQueries[key], ")")
						});
					}
				}

				this.current = this._getCurrentSize();

				this._watcher();
			},

			/**
			 * Reinitializes the media query helper.
			 * Useful if your CSS breakpoint configuration has just been loaded or has changed since the initialization.
			 * @function
			 * @private
			 */
			_reInit: function _reInit() {
				this.isInitialized = false;

				this._init();
			},

			/**
			 * Checks if the screen is at least as wide as a breakpoint.
			 * @function
			 * @param {String} size - Name of the breakpoint to check.
			 * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
			 */
			atLeast: function atLeast(size) {
				var query = this.get(size);

				if (query) {
					return window.matchMedia(query).matches;
				}

				return false;
			},

			/**
			 * Checks if the screen is within the given breakpoint.
			 * If smaller than the breakpoint of larger than its upper limit it returns false.
			 * @function
			 * @param {String} size - Name of the breakpoint to check.
			 * @returns {Boolean} `true` if the breakpoint matches, `false` otherwise.
			 */
			only: function only(size) {
				return size === this._getCurrentSize();
			},

			/**
			 * Checks if the screen is within a breakpoint or smaller.
			 * @function
			 * @param {String} size - Name of the breakpoint to check.
			 * @returns {Boolean} `true` if the breakpoint matches, `false` if it's larger.
			 */
			upTo: function upTo(size) {
				var nextSize = this.next(size); // If the next breakpoint does not match, the screen is smaller than
				// the upper limit of this breakpoint.

				if (nextSize) {
					return !this.atLeast(nextSize);
				} // If there is no next breakpoint, the "size" breakpoint does not have
				// an upper limit and the screen will always be within it or smaller.


				return true;
			},

			/**
			 * Checks if the screen matches to a breakpoint.
			 * @function
			 * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
			 * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
			 */
			is: function is(size) {
				var parts = size.trim().split(' ').filter(function (p) {
					return !!p.length;
				});

				var _parts     = _slicedToArray(parts, 2),
				    bpSize     = _parts[0],
				    _parts$    = _parts[1],
				    bpModifier = _parts$ === void 0 ? '' : _parts$; // Only the breakpont


				if (bpModifier === 'only') {
					return this.only(bpSize);
				} // At least the breakpoint (included)


				if (!bpModifier || bpModifier === 'up') {
					return this.atLeast(bpSize);
				} // Up to the breakpoint (included)


				if (bpModifier === 'down') {
					return this.upTo(bpSize);
				}

				throw new Error("\n      Invalid breakpoint passed to MediaQuery.is().\n      Expected a breakpoint name formatted like \"<size> <modifier>\", got \"".concat(size, "\".\n    "));
			},

			/**
			 * Gets the media query of a breakpoint.
			 * @function
			 * @param {String} size - Name of the breakpoint to get.
			 * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
			 */
			get: function get(size) {
				for (var i in this.queries) {
					if (this.queries.hasOwnProperty(i)) {
						var query = this.queries[i];
						if (size === query.name) return query.value;
					}
				}

				return null;
			},

			/**
			 * Get the breakpoint following the given breakpoint.
			 * @function
			 * @param {String} size - Name of the breakpoint.
			 * @returns {String|null} - The name of the following breakpoint, or `null` if the passed breakpoint was the last one.
			 */
			next: function next(size) {
				var _this = this;

				var queryIndex = this.queries.findIndex(function (q) {
					return _this._getQueryName(q) === size;
				});

				if (queryIndex === -1) {
					throw new Error("\n        Unknown breakpoint \"".concat(size, "\" passed to MediaQuery.next().\n        Ensure it is present in your Sass \"$breakpoints\" setting.\n      "));
				}

				var nextQuery = this.queries[queryIndex + 1];
				return nextQuery ? nextQuery.name : null;
			},

			/**
			 * Returns the name of the breakpoint related to the given value.
			 * @function
			 * @private
			 * @param {String|Object} value - Breakpoint name or query object.
			 * @returns {String} Name of the breakpoint.
			 */
			_getQueryName: function _getQueryName(value) {
				if (typeof value === 'string') return value;
				if (_typeof(value) === 'object') return value.name;
				throw new TypeError("\n      Invalid value passed to MediaQuery._getQueryName().\n      Expected a breakpoint name (String) or a breakpoint query (Object), got \"".concat(value, "\" (").concat(_typeof(value), ")\n    "));
			},

			/**
			 * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
			 * @function
			 * @private
			 * @returns {String} Name of the current breakpoint.
			 */
			_getCurrentSize: function _getCurrentSize() {
				var matched;

				for (var i = 0; i < this.queries.length; i++) {
					var query = this.queries[i];

					if (window.matchMedia(query.value).matches) {
						matched = query;
					}
				}

				return matched && this._getQueryName(matched);
			},

			/**
			 * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
			 * @function
			 * @private
			 */
			_watcher: function _watcher() {
				var _this2 = this;

				jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize.zf.trigger', function () {
					var newSize     = _this2._getCurrentSize(),
					    currentSize = _this2.current;

					if (newSize !== currentSize) {
						// Change the current media query
						_this2.current = newSize; // Broadcast the media query change on the window

						jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
					}
				});
			}
		}; // Thank you: https://github.com/sindresorhus/query-string

		function parseStyleToObject(str) {
			var styleObject = {};

			if (typeof str !== 'string') {
				return styleObject;
			}

			str = str.trim().slice(1, -1); // browsers re-quote string style values

			if (!str) {
				return styleObject;
			}

			styleObject = str.split('&').reduce(function (ret, param) {
				var parts = param.replace(/\+/g, ' ').split('=');
				var key = parts[0];
				var val = parts[1];
				key = decodeURIComponent(key); // missing `=` should be `null`:
				// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

				val = typeof val === 'undefined' ? null : decodeURIComponent(val);

				if (!ret.hasOwnProperty(key)) {
					ret[key] = val;
				} else if (Array.isArray(ret[key])) {
					ret[key].push(val);
				} else {
					ret[key] = [ret[key], val];
				}

				return ret;
			}, {});
			return styleObject;
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.motion.js":
	/*!********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.motion.js ***!
	 \********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Motion": () => (/* binding */ Motion),
			/* harmony export */   "Move":   () => (/* binding */ Move)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");


		/**
		 * Motion module.
		 * @module foundation.motion
		 */

		var initClasses = ['mui-enter', 'mui-leave'];
		var activeClasses = ['mui-enter-active', 'mui-leave-active'];
		var Motion = {
			animateIn:  function animateIn(element, animation, cb) {
				animate(true, element, animation, cb);
			},
			animateOut: function animateOut(element, animation, cb) {
				animate(false, element, animation, cb);
			}
		};

		function Move(duration, elem, fn) {
			var anim,
			    prog,
			    start = null;

			if (duration === 0) {
				fn.apply(elem);
				elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
				return;
			}

			function move(ts) {
				if (!start) start = ts;
				prog = ts - start;
				fn.apply(elem);

				if (prog < duration) {
					anim = window.requestAnimationFrame(move, elem);
				} else {
					window.cancelAnimationFrame(anim);
					elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
				}
			}

			anim = window.requestAnimationFrame(move);
		}

		/**
		 * Animates an element in or out using a CSS transition class.
		 * @function
		 * @private
		 * @param {Boolean} isIn - Defines if the animation is in or out.
		 * @param {Object} element - jQuery or HTML object to animate.
		 * @param {String} animation - CSS class to use.
		 * @param {Function} cb - Callback to run when animation is finished.
		 */


		function animate(isIn, element, animation, cb) {
			element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).eq(0);
			if (!element.length) return;
			var initClass = isIn ? initClasses[0] : initClasses[1];
			var activeClass = isIn ? activeClasses[0] : activeClasses[1]; // Set up the animation

			reset();
			element.addClass(animation).css('transition', 'none');
			requestAnimationFrame(function () {
				element.addClass(initClass);
				if (isIn) element.show();
			}); // Start the animation

			requestAnimationFrame(function () {
				// will trigger the browser to synchronously calculate the style and layout
				// also called reflow or layout thrashing
				// see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
				element[0].offsetWidth;
				element.css('transition', '').addClass(activeClass);
			}); // Clean up the animation when it finishes

			element.one((0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.transitionend)(element), finish); // Hides the element (for out animations), resets the element, and runs a callback

			function finish() {
				if (!isIn) element.hide();
				reset();
				if (cb) cb.apply(element);
			} // Resets transitions and removes motion-specific classes


			function reset() {
				element[0].style.transitionDuration = 0;
				element.removeClass("".concat(initClass, " ").concat(activeClass, " ").concat(animation));
			}
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.nest.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.nest.js ***!
	 \******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Nest": () => (/* binding */ Nest)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

		var Nest = {
			Feather: function Feather(menu) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';
				menu.attr('role', 'menubar');
				menu.find('a').attr({
					'role': 'menuitem'
				});
				var items        = menu.find('li').attr({
					    'role': 'none'
				    }),
				    subMenuClass = "is-".concat(type, "-submenu"),
				    subItemClass = "".concat(subMenuClass, "-item"),
				    hasSubClass  = "is-".concat(type, "-submenu-parent"),
				    applyAria    = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

				items.each(function () {
					var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
					    $sub  = $item.children('ul');

					if ($sub.length) {
						$item.addClass(hasSubClass);

						if (applyAria) {
							$item.children('a:first').attr({
								'aria-haspopup': true,
								'aria-label':    $item.children('a:first').text()
							}); // Note:  Drilldowns behave differently in how they hide, and so need
							// additional attributes.  We should look if this possibly over-generalized
							// utility (Nest) is appropriate when we rework menus in 6.4

							if (type === 'drilldown') {
								$item.attr({
									'aria-expanded': false
								});
							}
						}

						$sub.addClass("submenu ".concat(subMenuClass)).attr({
							'data-submenu': '',
							'role':         'menubar'
						});

						if (type === 'drilldown') {
							$sub.attr({
								'aria-hidden': true
							});
						}
					}

					if ($item.parent('[data-submenu]').length) {
						$item.addClass("is-submenu-item ".concat(subItemClass));
					}
				});
				return;
			},
			Burn:    function Burn(menu, type) {
				var //items = menu.find('li'),
					subMenuClass = "is-".concat(type, "-submenu"),
					subItemClass = "".concat(subMenuClass, "-item"),
					hasSubClass  = "is-".concat(type, "-submenu-parent");
				menu.find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').removeClass("".concat(subMenuClass, " ").concat(subItemClass, " ").concat(hasSubClass, " is-submenu-item submenu is-active")).removeAttr('data-submenu').css('display', '');
			}
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.timer.js":
	/*!*******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.timer.js ***!
	 \*******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Timer": () => (/* binding */ Timer)
			/* harmony export */
		});

		function Timer(elem, options, cb) {
			var _this     = this,
			    duration  = options.duration,
			    //options is an object for easily adding features later.
			    nameSpace = Object.keys(elem.data())[0] || 'timer',
			    remain    = -1,
			    start,
			    timer;

			this.isPaused = false;

			this.restart = function () {
				remain = -1;
				clearTimeout(timer);
				this.start();
			};

			this.start = function () {
				this.isPaused = false; // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

				clearTimeout(timer);
				remain = remain <= 0 ? duration : remain;
				elem.data('paused', false);
				start = Date.now();
				timer = setTimeout(function () {
					if (options.infinite) {
						_this.restart(); //rerun the timer.

					}

					if (cb && typeof cb === 'function') {
						cb();
					}
				}, remain);
				elem.trigger("timerstart.zf.".concat(nameSpace));
			};

			this.pause = function () {
				this.isPaused = true; //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

				clearTimeout(timer);
				elem.data('paused', true);
				var end = Date.now();
				remain = remain - (end - start);
				elem.trigger("timerpaused.zf.".concat(nameSpace));
			};
		}


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.touch.js":
	/*!*******************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.touch.js ***!
	 \*******************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Touch": () => (/* binding */ Touch)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		function _createClass(Constructor, protoProps, staticProps) {
			if (protoProps) _defineProperties(Constructor.prototype, protoProps);
			if (staticProps) _defineProperties(Constructor, staticProps);
			Object.defineProperty(Constructor, "prototype", {writable: false});
			return Constructor;
		}

//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************

		var Touch = {};
		var startPosX,
		    startTime,
		    elapsedTime,
		    startEvent,
		    isMoving = false,
		    didMoved = false;

		function onTouchEnd(e) {
			this.removeEventListener('touchmove', onTouchMove);
			this.removeEventListener('touchend', onTouchEnd); // If the touch did not move, consider it as a "tap"

			if (!didMoved) {
				var tapEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default().Event('tap', startEvent || e);
				jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(tapEvent);
			}

			startEvent = null;
			isMoving = false;
			didMoved = false;
		}

		function onTouchMove(e) {
			if (true === (jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe.preventDefault)) {
				e.preventDefault();
			}

			if (isMoving) {
				var x = e.touches[0].pageX; // var y = e.touches[0].pageY;

				var dx = startPosX - x; // var dy = startPosY - y;

				var dir;
				didMoved = true;
				elapsedTime = new Date().getTime() - startTime;

				if (Math.abs(dx) >= (jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe.moveThreshold) && elapsedTime <= (jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe.timeThreshold)) {
					dir = dx > 0 ? 'left' : 'right';
				} // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
				//   dir = dy > 0 ? 'down' : 'up';
				// }


				if (dir) {
					e.preventDefault();
					onTouchEnd.apply(this, arguments);
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event('swipe', Object.assign({}, e)), dir).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default().Event("swipe".concat(dir), Object.assign({}, e)));
				}
			}
		}

		function onTouchStart(e) {
			if (e.touches.length === 1) {
				startPosX = e.touches[0].pageX;
				startEvent = e;
				isMoving = true;
				didMoved = false;
				startTime = new Date().getTime();
				this.addEventListener('touchmove', onTouchMove, {
					passive: true === (jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe.preventDefault)
				});
				this.addEventListener('touchend', onTouchEnd, false);
			}
		}

		function init() {
			this.addEventListener && this.addEventListener('touchstart', onTouchStart, {
				passive: true
			});
		} // function teardown() {
//   this.removeEventListener('touchstart', onTouchStart);
// }


		var SpotSwipe = /*#__PURE__*/function () {
			function SpotSwipe() {
				_classCallCheck(this, SpotSwipe);

				this.version = '1.0.0';
				this.enabled = 'ontouchstart' in document.documentElement;
				this.preventDefault = false;
				this.moveThreshold = 75;
				this.timeThreshold = 200;

				this._init();
			}

			_createClass(SpotSwipe, [{
				key:   "_init",
				value: function _init() {
					(jquery__WEBPACK_IMPORTED_MODULE_0___default().event.special.swipe) = {
						setup: init
					};
					(jquery__WEBPACK_IMPORTED_MODULE_0___default().event.special.tap) = {
						setup: init
					};
					jquery__WEBPACK_IMPORTED_MODULE_0___default().each(['left', 'up', 'down', 'right'], function () {
						(jquery__WEBPACK_IMPORTED_MODULE_0___default().event.special)["swipe".concat(this)] = {
							setup: function setup() {
								jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('swipe', (jquery__WEBPACK_IMPORTED_MODULE_0___default().noop));
							}
						};
					});
				}
			}]);

			return SpotSwipe;
		}();
		/****************************************************
		 * As far as I can tell, both setupSpotSwipe and    *
		 * setupTouchHandler should be idempotent,          *
		 * because they directly replace functions &        *
		 * values, and do not add event handlers directly.  *
		 ****************************************************/


		Touch.setupSpotSwipe = function () {
			(jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe) = new SpotSwipe((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
		};
		/****************************************************
		 * Method for adding pseudo drag events to elements *
		 ***************************************************/


		Touch.setupTouchHandler = function () {
			(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn.addTouch) = function () {
				this.each(function (i, el) {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).bind('touchstart touchmove touchend touchcancel', function (event) {
						//we pass the original event object because the jQuery event
						//object is normalized to w3c specs and does not provide the TouchList
						handleTouch(event);
					});
				});

				var handleTouch = function handleTouch(event) {
					var touches    = event.changedTouches,
					    first      = touches[0],
					    eventTypes = {
						    touchstart: 'mousedown',
						    touchmove:  'mousemove',
						    touchend:   'mouseup'
					    },
					    type       = eventTypes[event.type],
					    simulatedEvent;

					if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
						simulatedEvent = new window.MouseEvent(type, {
							'bubbles':    true,
							'cancelable': true,
							'screenX':    first.screenX,
							'screenY':    first.screenY,
							'clientX':    first.clientX,
							'clientY':    first.clientY
						});
					} else {
						simulatedEvent = document.createEvent('MouseEvent');
						simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0
							/*left*/
							, null);
					}

					first.target.dispatchEvent(simulatedEvent);
				};
			};
		};

		Touch.init = function () {
			if (typeof (jquery__WEBPACK_IMPORTED_MODULE_0___default().spotSwipe) === 'undefined') {
				Touch.setupSpotSwipe((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
				Touch.setupTouchHandler((jquery__WEBPACK_IMPORTED_MODULE_0___default()));
			}
		};


		/***/
	}),

	/***/ "./node_modules/foundation-sites/js/foundation.util.triggers.js":
	/*!**********************************************************************!*\
	 !*** ./node_modules/foundation-sites/js/foundation.util.triggers.js ***!
	 \**********************************************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export */
		__webpack_require__.d(__webpack_exports__, {
			/* harmony export */   "Triggers": () => (/* binding */ Triggers)
			/* harmony export */
		});
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
		/* harmony import */
		var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
		/* harmony import */
		var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");

		function _typeof(obj) {
			"@babel/helpers - typeof";
			return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
			}, _typeof(obj);
		}


		var MutationObserver = function () {
			var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];

			for (var i = 0; i < prefixes.length; i++) {
				if ("".concat(prefixes[i], "MutationObserver") in window) {
					return window["".concat(prefixes[i], "MutationObserver")];
				}
			}

			return false;
		}();

		var triggers = function triggers(el, type) {
			el.data(type).split(' ').forEach(function (id) {
				jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id))[type === 'close' ? 'trigger' : 'triggerHandler']("".concat(type, ".zf.trigger"), [el]);
			});
		};

		var Triggers = {
			Listeners:    {
				Basic:  {},
				Global: {}
			},
			Initializers: {}
		};
		Triggers.Listeners.Basic = {
			openListener:        function openListener() {
				triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'open');
			},
			closeListener:       function closeListener() {
				var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('close');

				if (id) {
					triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'close');
				} else {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('close.zf.trigger');
				}
			},
			toggleListener:      function toggleListener() {
				var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');

				if (id) {
					triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle');
				} else {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('toggle.zf.trigger');
				}
			},
			closeableListener:   function closeableListener(e) {
				var animation = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('closable'); // Only close the first closable element. See https://git.io/zf-7833

				e.stopPropagation();

				if (animation !== '') {
					_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__.Motion.animateOut(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), animation, function () {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('closed.zf');
					});
				} else {
					jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).fadeOut().trigger('closed.zf');
				}
			},
			toggleFocusListener: function toggleFocusListener() {
				var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle-focus');
				jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id)).triggerHandler('toggle.zf.trigger', [jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)]);
			}
		}; // Elements with [data-open] will reveal a plugin that supports it when clicked.

		Triggers.Initializers.addOpenListener = function ($elem) {
			$elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
			$elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
		}; // Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.


		Triggers.Initializers.addCloseListener = function ($elem) {
			$elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
			$elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
		}; // Elements with [data-toggle] will toggle a plugin that supports it when clicked.


		Triggers.Initializers.addToggleListener = function ($elem) {
			$elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
			$elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
		}; // Elements with [data-closable] will respond to close.zf.trigger events.


		Triggers.Initializers.addCloseableListener = function ($elem) {
			$elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
			$elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
		}; // Elements with [data-toggle-focus] will respond to coming in and out of focus


		Triggers.Initializers.addToggleFocusListener = function ($elem) {
			$elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
			$elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
		}; // More Global/complex listeners and triggers


		Triggers.Listeners.Global = {
			resizeListener:  function resizeListener($nodes) {
				if (!MutationObserver) {
					//fallback for IE 9
					$nodes.each(function () {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('resizeme.zf.trigger');
					});
				} //trigger all listening elements and signal a resize event


				$nodes.attr('data-events', "resize");
			},
			scrollListener:  function scrollListener($nodes) {
				if (!MutationObserver) {
					//fallback for IE 9
					$nodes.each(function () {
						jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('scrollme.zf.trigger');
					});
				} //trigger all listening elements and signal a scroll event


				$nodes.attr('data-events', "scroll");
			},
			closeMeListener: function closeMeListener(e, pluginId) {
				var plugin = e.namespace.split('.')[0];
				var plugins = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-".concat(plugin, "]")).not("[data-yeti-box=\"".concat(pluginId, "\"]"));
				plugins.each(function () {
					var _this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);

					_this.triggerHandler('close.zf.trigger', [_this]);
				});
			}
		}; // Global, parses whole document.

		Triggers.Initializers.addClosemeListener = function (pluginName) {
			var yetiBoxes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-yeti-box]'),
			    plugNames = ['dropdown', 'tooltip', 'reveal'];

			if (pluginName) {
				if (typeof pluginName === 'string') {
					plugNames.push(pluginName);
				} else if (_typeof(pluginName) === 'object' && typeof pluginName[0] === 'string') {
					plugNames = plugNames.concat(pluginName);
				} else {
					console.error('Plugin names must be strings');
				}
			}

			if (yetiBoxes.length) {
				var listeners = plugNames.map(function (name) {
					return "closeme.zf.".concat(name);
				}).join(' ');
				jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
			}
		};

		function debounceGlobalListener(debounce, trigger, listener) {
			var timer,
			    args = Array.prototype.slice.call(arguments, 3);
			jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on(trigger, function () {
				if (timer) {
					clearTimeout(timer);
				}

				timer = setTimeout(function () {
					listener.apply(null, args);
				}, debounce || 10); //default time to emit scroll event
			});
		}

		Triggers.Initializers.addResizeListener = function (debounce) {
			var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-resize]');

			if ($nodes.length) {
				debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
			}
		};

		Triggers.Initializers.addScrollListener = function (debounce) {
			var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scroll]');

			if ($nodes.length) {
				debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
			}
		};

		Triggers.Initializers.addMutationEventsListener = function ($elem) {
			if (!MutationObserver) {
				return false;
			}

			var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]'); //element callback

			var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
				var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(mutationRecordsList[0].target); //trigger the event handler for the element depending on type

				switch (mutationRecordsList[0].type) {
					case "attributes":
						if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
							$target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
						}

						if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
							$target.triggerHandler('resizeme.zf.trigger', [$target]);
						}

						if (mutationRecordsList[0].attributeName === "style") {
							$target.closest("[data-mutate]").attr("data-events", "mutate");
							$target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
						}

						break;

					case "childList":
						$target.closest("[data-mutate]").attr("data-events", "mutate");
						$target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
						break;

					default:
						return false;
					//nothing
				}
			};

			if ($nodes.length) {
				//for each element that needs to listen for resizing, scrolling, or mutation add a single observer
				for (var i = 0; i <= $nodes.length - 1; i++) {
					var elementObserver = new MutationObserver(listeningElementsMutation);
					elementObserver.observe($nodes[i], {
						attributes:      true,
						childList:       true,
						characterData:   false,
						subtree:         true,
						attributeFilter: ["data-events", "style"]
					});
				}
			}
		};

		Triggers.Initializers.addSimpleListeners = function () {
			var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
			Triggers.Initializers.addOpenListener($document);
			Triggers.Initializers.addCloseListener($document);
			Triggers.Initializers.addToggleListener($document);
			Triggers.Initializers.addCloseableListener($document);
			Triggers.Initializers.addToggleFocusListener($document);
		};

		Triggers.Initializers.addGlobalListeners = function () {
			var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
			Triggers.Initializers.addMutationEventsListener($document);
			Triggers.Initializers.addResizeListener(250);
			Triggers.Initializers.addScrollListener();
			Triggers.Initializers.addClosemeListener();
		};

		Triggers.init = function (__, Foundation) {
			(0, _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
				if ((jquery__WEBPACK_IMPORTED_MODULE_0___default().triggersInitialized) !== true) {
					Triggers.Initializers.addSimpleListeners();
					Triggers.Initializers.addGlobalListeners();
					(jquery__WEBPACK_IMPORTED_MODULE_0___default().triggersInitialized) = true;
				}
			});

			if (Foundation) {
				Foundation.Triggers = Triggers; // Legacy included to be backwards compatible for now.

				Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
			}
		};


		/***/
	}),

	/***/ "./node_modules/what-input/dist/what-input.js":
	/*!****************************************************!*\
	 !*** ./node_modules/what-input/dist/what-input.js ***!
	 \****************************************************/
	/***/ (function (module, exports, __webpack_require__) {

		/* module decorator */
		module = __webpack_require__.nmd(module);
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
		 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
		 * @version v5.2.12
		 * @link https://github.com/ten1seven/what-input
		 * @license MIT
		 */
		(function webpackUniversalModuleDefinition(root, factory) {
			if ((false ? 0 : _typeof(exports)) === 'object' && (false ? 0 : _typeof(module)) === 'object') module.exports = factory(); else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				                                 (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
			__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else {
			}
		})(this, function () {
			return (
				/******/
				function (modules) {
					// webpackBootstrap

					/******/
					// The module cache

					/******/
					var installedModules = {};
					/******/
					// The require function

					/******/

					function __nested_webpack_require_1284__(moduleId) {
						/******/
						// Check if module is in cache

						/******/
						if (installedModules[moduleId])
							/******/
							return installedModules[moduleId].exports;
						/******/
						// Create a new module (and put it into the cache)

						/******/

						var module = installedModules[moduleId] = {
							/******/
							exports: {},

							/******/
							id: moduleId,

							/******/
							loaded: false
							/******/

						};
						/******/
						// Execute the module function

						/******/

						modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_1284__);
						/******/
						// Flag the module as loaded

						/******/

						module.loaded = true;
						/******/
						// Return the exports of the module

						/******/

						return module.exports;
						/******/
					}

					/******/
					// expose the modules object (__webpack_modules__)

					/******/


					__nested_webpack_require_1284__.m = modules;
					/******/
					// expose the module cache

					/******/

					__nested_webpack_require_1284__.c = installedModules;
					/******/
					// __webpack_public_path__

					/******/

					__nested_webpack_require_1284__.p = "";
					/******/
					// Load entry module and return exports

					/******/

					return __nested_webpack_require_1284__(0);
					/******/
				}
				/************************************************************************/

				/******/
				([
					/* 0 */

					/***/
					function (module, exports) {
						'use strict';

						module.exports = function () {
							/*
							 * bail out if there is no document or window
							 * (i.e. in a node/non-DOM environment)
							 *
							 * Return a stubbed API instead
							 */
							if (typeof document === 'undefined' || typeof window === 'undefined') {
								return {
									// always return "initial" because no interaction will ever be detected
									ask: function ask() {
										return 'initial';
									},
									// always return null
									element: function element() {
										return null;
									},
									// no-op
									ignoreKeys: function ignoreKeys() {
									},
									// no-op
									specificKeys: function specificKeys() {
									},
									// no-op
									registerOnChange: function registerOnChange() {
									},
									// no-op
									unRegisterOnChange: function unRegisterOnChange() {
									}
								};
							}
							/*
							 * variables
							 */
							// cache document.documentElement


							var docElem = document.documentElement; // currently focused dom element

							var currentElement = null; // last used input type

							var currentInput = 'initial'; // last used input intent

							var currentIntent = currentInput; // UNIX timestamp of current event

							var currentTimestamp = Date.now(); // check for a `data-whatpersist` attribute on either the `html` or `body` elements, defaults to `true`

							var shouldPersist = false; // form input types

							var formInputs = ['button', 'input', 'select', 'textarea']; // empty array for holding callback functions

							var functionList = []; // list of modifier keys commonly used with the mouse and
							// can be safely ignored to prevent false keyboard detection

							var ignoreMap = [16, // shift
							                 17, // control
							                 18, // alt
							                 91, // Windows key / left Apple cmd
							                 93 // Windows menu / right Apple cmd
							];
							var specificMap = []; // mapping of events to input types

							var inputMap = {
								keydown:       'keyboard',
								keyup:         'keyboard',
								mousedown:     'mouse',
								mousemove:     'mouse',
								MSPointerDown: 'pointer',
								MSPointerMove: 'pointer',
								pointerdown:   'pointer',
								pointermove:   'pointer',
								touchstart:    'touch',
								touchend:      'touch' // boolean: true if the page is being scrolled

							};
							var isScrolling = false; // store current mouse position

							var mousePos = {
								x: null,
								y: null // map of IE 10 pointer events

							};
							var pointerMap = {
								2: 'touch',
								3: 'touch',
								// treat pen like touch
								4: 'mouse' // check support for passive event listeners

							};
							var supportsPassive = false;

							try {
								var opts = Object.defineProperty({}, 'passive', {
									get: function get() {
										supportsPassive = true;
									}
								});
								window.addEventListener('test', null, opts);
							} catch (e) {
							} // fail silently

							/*
							 * set up
							 */


							var setUp = function setUp() {
								// add correct mouse wheel event mapping to `inputMap`
								inputMap[detectWheel()] = 'mouse';
								addListeners();
							};
							/*
							 * events
							 */


							var addListeners = function addListeners() {
								// `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
								// can only demonstrate potential, but not actual, interaction
								// and are treated separately
								var options = supportsPassive ? {
									passive: true,
									capture: true
								} : true;
								document.addEventListener('DOMContentLoaded', setPersist, true); // pointer events (mouse, pen, touch)

								if (window.PointerEvent) {
									window.addEventListener('pointerdown', setInput, true);
									window.addEventListener('pointermove', setIntent, true);
								} else if (window.MSPointerEvent) {
									window.addEventListener('MSPointerDown', setInput, true);
									window.addEventListener('MSPointerMove', setIntent, true);
								} else {
									// mouse events
									window.addEventListener('mousedown', setInput, true);
									window.addEventListener('mousemove', setIntent, true); // touch events

									if ('ontouchstart' in window) {
										window.addEventListener('touchstart', setInput, options);
										window.addEventListener('touchend', setInput, true);
									}
								} // mouse wheel


								window.addEventListener(detectWheel(), setIntent, options); // keyboard events

								window.addEventListener('keydown', setInput, true);
								window.addEventListener('keyup', setInput, true); // focus events

								window.addEventListener('focusin', setElement, true);
								window.addEventListener('focusout', clearElement, true);
							}; // checks if input persistence should happen and
							// get saved state from session storage if true (defaults to `false`)


							var setPersist = function setPersist() {
								shouldPersist = !(docElem.getAttribute('data-whatpersist') === 'false' || document.body.getAttribute('data-whatpersist') === 'false');

								if (shouldPersist) {
									// check for session variables and use if available
									try {
										if (window.sessionStorage.getItem('what-input')) {
											currentInput = window.sessionStorage.getItem('what-input');
										}

										if (window.sessionStorage.getItem('what-intent')) {
											currentIntent = window.sessionStorage.getItem('what-intent');
										}
									} catch (e) {// fail silently
									}
								} // always run these so at least `initial` state is set


								doUpdate('input');
								doUpdate('intent');
							}; // checks conditions before updating new input


							var setInput = function setInput(event) {
								var eventKey = event.which;
								var value = inputMap[event.type];

								if (value === 'pointer') {
									value = pointerType(event);
								}

								var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;
								var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;
								var shouldUpdate = value === 'keyboard' && eventKey && (ignoreMatch || specificMatch) || value === 'mouse' || value === 'touch'; // prevent touch detection from being overridden by event execution order

								if (validateTouch(value)) {
									shouldUpdate = false;
								}

								if (shouldUpdate && currentInput !== value) {
									currentInput = value;
									persistInput('input', currentInput);
									doUpdate('input');
								}

								if (shouldUpdate && currentIntent !== value) {
									// preserve intent for keyboard interaction with form fields
									var activeElem = document.activeElement;
									var notFormInput = activeElem && activeElem.nodeName && (formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1 || activeElem.nodeName.toLowerCase() === 'button' && !checkClosest(activeElem, 'form'));

									if (notFormInput) {
										currentIntent = value;
										persistInput('intent', currentIntent);
										doUpdate('intent');
									}
								}
							}; // updates the doc and `inputTypes` array with new input


							var doUpdate = function doUpdate(which) {
								docElem.setAttribute('data-what' + which, which === 'input' ? currentInput : currentIntent);
								fireFunctions(which);
							}; // updates input intent for `mousemove` and `pointermove`


							var setIntent = function setIntent(event) {
								var value = inputMap[event.type];

								if (value === 'pointer') {
									value = pointerType(event);
								} // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove


								detectScrolling(event); // only execute if scrolling isn't happening

								if ((!isScrolling && !validateTouch(value) || isScrolling && event.type === 'wheel' || event.type === 'mousewheel' || event.type === 'DOMMouseScroll') && currentIntent !== value) {
									currentIntent = value;
									persistInput('intent', currentIntent);
									doUpdate('intent');
								}
							};

							var setElement = function setElement(event) {
								if (!event.target.nodeName) {
									// If nodeName is undefined, clear the element
									// This can happen if click inside an <svg> element.
									clearElement();
									return;
								}

								currentElement = event.target.nodeName.toLowerCase();
								docElem.setAttribute('data-whatelement', currentElement);

								if (event.target.classList && event.target.classList.length) {
									docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','));
								}
							};

							var clearElement = function clearElement() {
								currentElement = null;
								docElem.removeAttribute('data-whatelement');
								docElem.removeAttribute('data-whatclasses');
							};

							var persistInput = function persistInput(which, value) {
								if (shouldPersist) {
									try {
										window.sessionStorage.setItem('what-' + which, value);
									} catch (e) {// fail silently
									}
								}
							};
							/*
							 * utilities
							 */


							var pointerType = function pointerType(event) {
								if (typeof event.pointerType === 'number') {
									return pointerMap[event.pointerType];
								} else {
									// treat pen like touch
									return event.pointerType === 'pen' ? 'touch' : event.pointerType;
								}
							}; // prevent touch detection from being overridden by event execution order


							var validateTouch = function validateTouch(value) {
								var timestamp = Date.now();
								var touchIsValid = value === 'mouse' && currentInput === 'touch' && timestamp - currentTimestamp < 200;
								currentTimestamp = timestamp;
								return touchIsValid;
							}; // detect version of mouse wheel event to use
							// via https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event


							var detectWheel = function detectWheel() {
								var wheelType = null; // Modern browsers support "wheel"

								if ('onwheel' in document.createElement('div')) {
									wheelType = 'wheel';
								} else {
									// Webkit and IE support at least "mousewheel"
									// or assume that remaining browsers are older Firefox
									wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
								}

								return wheelType;
							}; // runs callback functions


							var fireFunctions = function fireFunctions(type) {
								for (var i = 0, len = functionList.length; i < len; i++) {
									if (functionList[i].type === type) {
										functionList[i].fn.call(undefined, type === 'input' ? currentInput : currentIntent);
									}
								}
							}; // finds matching element in an object


							var objPos = function objPos(match) {
								for (var i = 0, len = functionList.length; i < len; i++) {
									if (functionList[i].fn === match) {
										return i;
									}
								}
							};

							var detectScrolling = function detectScrolling(event) {
								if (mousePos.x !== event.screenX || mousePos.y !== event.screenY) {
									isScrolling = false;
									mousePos.x = event.screenX;
									mousePos.y = event.screenY;
								} else {
									isScrolling = true;
								}
							}; // manual version of `closest()`


							var checkClosest = function checkClosest(elem, tag) {
								var ElementPrototype = window.Element.prototype;

								if (!ElementPrototype.matches) {
									ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.webkitMatchesSelector;
								}

								if (!ElementPrototype.closest) {
									do {
										if (elem.matches(tag)) {
											return elem;
										}

										elem = elem.parentElement || elem.parentNode;
									} while (elem !== null && elem.nodeType === 1);

									return null;
								} else {
									return elem.closest(tag);
								}
							};
							/*
							 * init
							 */
							// don't start script unless browser cuts the mustard
							// (also passes if polyfills are used)


							if ('addEventListener' in window && Array.prototype.indexOf) {
								setUp();
							}
							/*
							 * api
							 */


							return {
								// returns string: the current input type
								// opt: 'intent'|'input'
								// 'input' (default): returns the same value as the `data-whatinput` attribute
								// 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
								ask: function ask(opt) {
									return opt === 'intent' ? currentIntent : currentInput;
								},
								// returns string: the currently focused element or null
								element: function element() {
									return currentElement;
								},
								// overwrites ignored keys with provided array
								ignoreKeys: function ignoreKeys(arr) {
									ignoreMap = arr;
								},
								// overwrites specific char keys to update on
								specificKeys: function specificKeys(arr) {
									specificMap = arr;
								},
								// attach functions to input and intent "events"
								// funct: function to fire on change
								// eventType: 'input'|'intent'
								registerOnChange:   function registerOnChange(fn, eventType) {
									functionList.push({
										fn:   fn,
										type: eventType || 'input'
									});
								},
								unRegisterOnChange: function unRegisterOnChange(fn) {
									var position = objPos(fn);

									if (position || position === 0) {
										functionList.splice(position, 1);
									}
								},
								clearStorage:       function clearStorage() {
									window.sessionStorage.clear();
								}
							};
						}();
						/***/

					}
					/******/
				])
			);
		});

		;

		/***/
	}),

	/***/ "./webpack.build.foundation.js":
	/*!*************************************!*\
	 !*** ./webpack.build.foundation.js ***!
	 \*************************************/
	/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */
		var npm_what_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/what-input */ "./node_modules/what-input/dist/what-input.js");
		/* harmony import */
		var npm_what_input__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(npm_what_input__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var mediajs_foundation_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mediajs/foundation/foundation */ "./com_knowres/media/js/src/foundation/foundation.js");
// Foundation JS


		/***/
	})

},
	/******/ __webpack_require__ => { // webpackRuntimeModules
		/******/
		var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
		/******/
		__webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.foundation.js")));
		/******/
		var __webpack_exports__ = __webpack_require__.O();
		/******/
	}
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQXdCO1lBQ3BDaHpCLE1BQU0sQ0FBQ2d4QixjQUFQLENBQXNCL2tCLEtBQXRCO1VBQ0Q7UUE1Q0ksQ0FBUDtNQThDRCxDQS9iZ0IsRUFBakI7TUFpY0Q7O0lBQU87SUFDUDtJQXhjVSxDQTFDTTtFQUFoQjtBQW1mQyxDQTdmRDs7QUE4ZkE7Ozs7Ozs7Ozs7Ozs7OztBQ3BnQkE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vY29tX2tub3dyZXMvbWVkaWEvanMvc3JjL2ZvdW5kYXRpb24vZm91bmRhdGlvbi5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUudXRpbHMuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bi5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbi5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wb3NpdGlvbmFibGUuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51LmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicy5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9nZ2xlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3guanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy93aGF0LWlucHV0L2Rpc3Qvd2hhdC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9rci8uL3dlYnBhY2suYnVpbGQuZm91bmRhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG4vL2ltcG9ydCAnd2hhdC1pbnB1dCc7XG4vL2ZvciBhbGxcbi8vaW1wb3J0IHsgRm91bmRhdGlvbiB9IGZyb20gKCcuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzJyk7XG5pbXBvcnQgeyBGb3VuZGF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlJztcbmltcG9ydCAqIGFzIENvcmVVdGlscyBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmJveCdcbmltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24sIE1vdmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcbmltcG9ydCB7IE5lc3QgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBUaW1lciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lcic7XG5pbXBvcnQgeyBUb3VjaCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaCc7XG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG4vL2ltcG9ydCB7IEFiaWRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5hYmlkZSc7XG4vL2ltcG9ydCB7IEFjY29yZGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uJztcbi8vaW1wb3J0IHsgQWNjb3JkaW9uTWVudSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XG4vL2ltcG9ydCB7IERyaWxsZG93biB9IGZyb20gJ2ZvdW5kYXRpb24uZHJpbGxkb3duJztcbmltcG9ydCB7IERyb3Bkb3duIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5kcm9wZG93bic7XG5pbXBvcnQgeyBEcm9wZG93bk1lbnUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudSc7XG5pbXBvcnQgeyBFcXVhbGl6ZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmVxdWFsaXplcic7XG4vL2ltcG9ydCB7IEludGVyY2hhbmdlIH0gZnJvbSAnZm91bmRhdGlvbi5pbnRlcmNoYW5nZSc7XG5pbXBvcnQgeyBNYWdlbGxhbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4nO1xuaW1wb3J0IHsgT2ZmQ2FudmFzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMnO1xuLy9pbXBvcnQgeyBPcmJpdCB9IGZyb20gJ2ZvdW5kYXRpb24ub3JiaXQnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU1lbnUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51Jztcbi8vaW1wb3J0IHsgUmVzcG9uc2l2ZVRvZ2dsZSB9IGZyb20gJ2ZvdW5kYXRpb24ucmVzcG9uc2l2ZVRvZ2dsZSc7XG5pbXBvcnQgeyBSZXZlYWwgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJldmVhbCc7XG4vL2ltcG9ydCB7IFNsaWRlciB9IGZyb20gJ2ZvdW5kYXRpb24uc2xpZGVyJztcbi8vaW1wb3J0IHsgU21vb3RoU2Nyb2xsIH0gZnJvbSAnZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwnO1xuLy9pbXBvcnQgeyBTdGlja3kgfSBmcm9tICdmb3VuZGF0aW9uLnN0aWNreSc7XG5pbXBvcnQgeyBUYWJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzJztcbmltcG9ydCB7IFRvZ2dsZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvZ2dsZXInO1xuaW1wb3J0IHsgVG9vbHRpcCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcCc7XG4vL2ltcG9ydCB7IFJlc3BvbnNpdmVBY2NvcmRpb25UYWJzIH0gZnJvbSAnZm91bmRhdGlvbi5yZXNwb25zaXZlQWNjb3JkaW9uVGFicyc7XG5cbkZvdW5kYXRpb24uYWRkVG9KcXVlcnkoJCk7XG5cbi8vIElNUE9SVFNcbi8vQWRkIEZvdW5kYXRpb24gVXRpbHMgdG8gRm91bmRhdGlvbiBnbG9iYWwgbmFtZXNwYWNlIGZvciBiYWNrd2FyZHNcbi8vY29tcGF0aWJpbGl0eS5cbkZvdW5kYXRpb24ucnRsID0gQ29yZVV0aWxzLnJ0bDtcbkZvdW5kYXRpb24uR2V0WW9EaWdpdHMgPSBDb3JlVXRpbHMuR2V0WW9EaWdpdHM7XG5Gb3VuZGF0aW9uLnRyYW5zaXRpb25lbmQgPSBDb3JlVXRpbHMudHJhbnNpdGlvbmVuZDtcbkZvdW5kYXRpb24uUmVnRXhwRXNjYXBlID0gQ29yZVV0aWxzLlJlZ0V4cEVzY2FwZTtcbkZvdW5kYXRpb24ub25Mb2FkID0gQ29yZVV0aWxzLm9uTG9hZDtcblxuRm91bmRhdGlvbi5Cb3ggPSBCb3g7XG5Gb3VuZGF0aW9uLm9uSW1hZ2VzTG9hZGVkID0gb25JbWFnZXNMb2FkZWQ7XG5Gb3VuZGF0aW9uLktleWJvYXJkID0gS2V5Ym9hcmQ7XG5Gb3VuZGF0aW9uLk1lZGlhUXVlcnkgPSBNZWRpYVF1ZXJ5O1xuRm91bmRhdGlvbi5Nb3Rpb24gPSBNb3Rpb247XG5Gb3VuZGF0aW9uLk1vdmUgPSBNb3ZlO1xuRm91bmRhdGlvbi5OZXN0ID0gTmVzdDtcbkZvdW5kYXRpb24uVGltZXIgPSBUaW1lcjtcblxuLy9Ub3VjaCBhbmQgVHJpZ2dlcnMgcHJldmlvdXNseSB3ZXJlIGFsbW9zdCBwdXJlbHkgc2lkZSBlZmZlY3QgZHJpdmVuLFxuLy9zbyBubyBuZWVkIHRvIGFkZCBpdCB0byBGb3VuZGF0aW9uLCBqdXN0IGluaXQgdGhlbS5cblRvdWNoLmluaXQoJCk7XG5UcmlnZ2Vycy5pbml0KCQsIEZvdW5kYXRpb24pO1xuTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4vL0ZvdW5kYXRpb24ucGx1Z2luKEFiaWRlLCAnQWJpZGUnKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oQWNjb3JkaW9uLCAnQWNjb3JkaW9uJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbk1lbnUsICdBY2NvcmRpb25NZW51Jyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKERyaWxsZG93biwgJ0RyaWxsZG93bicpO1xuRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd24sICdEcm9wZG93bicpO1xuRm91bmRhdGlvbi5wbHVnaW4oRHJvcGRvd25NZW51LCAnRHJvcGRvd25NZW51Jyk7XG5Gb3VuZGF0aW9uLnBsdWdpbihFcXVhbGl6ZXIsICdFcXVhbGl6ZXInKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oSW50ZXJjaGFuZ2UsICdJbnRlcmNoYW5nZScpO1xuRm91bmRhdGlvbi5wbHVnaW4oTWFnZWxsYW4sICdNYWdlbGxhbicpO1xuRm91bmRhdGlvbi5wbHVnaW4oT2ZmQ2FudmFzLCAnT2ZmQ2FudmFzJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKE9yYml0LCAnT3JiaXQnKTtcbkZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVNZW51LCAnUmVzcG9uc2l2ZU1lbnUnKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZVRvZ2dsZSwgJ1Jlc3BvbnNpdmVUb2dnbGUnKTtcbkZvdW5kYXRpb24ucGx1Z2luKFJldmVhbCwgJ1JldmVhbCcpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihTbGlkZXIsICdTbGlkZXInKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oU21vb3RoU2Nyb2xsLCAnU21vb3RoU2Nyb2xsJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKFN0aWNreSwgJ1N0aWNreScpO1xuRm91bmRhdGlvbi5wbHVnaW4oVGFicywgJ1RhYnMnKTtcbkZvdW5kYXRpb24ucGx1Z2luKFRvZ2dsZXIsICdUb2dnbGVyJyk7XG5Gb3VuZGF0aW9uLnBsdWdpbihUb29sdGlwLCAnVG9vbHRpcCcpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlQWNjb3JkaW9uVGFicywgJ1Jlc3BvbnNpdmVBY2NvcmRpb25UYWJzJyk7XG5cbmV4cG9ydCB7IEZvdW5kYXRpb24gfTsiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBOZXN0IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnBsdWdpbic7XG5cbi8qKlxuICogQWNjb3JkaW9uTWVudSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uYWNjb3JkaW9uTWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKi9cblxuY2xhc3MgQWNjb3JkaW9uTWVudSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGFuIGFjY29yZGlvbiBtZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgQWNjb3JkaW9uTWVudVxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYW4gYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEFjY29yZGlvbk1lbnUuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdBY2NvcmRpb25NZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignQWNjb3JkaW9uTWVudScsIHtcbiAgICAgICdFTlRFUic6ICd0b2dnbGUnLFxuICAgICAgJ1NQQUNFJzogJ3RvZ2dsZScsXG4gICAgICAnQVJST1dfUklHSFQnOiAnb3BlbicsXG4gICAgICAnQVJST1dfVVAnOiAndXAnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnZG93bicsXG4gICAgICAnQVJST1dfTEVGVCc6ICdjbG9zZScsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlQWxsJ1xuICAgIH0pO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgYWNjb3JkaW9uIG1lbnUgYnkgaGlkaW5nIGFsbCBuZXN0ZWQgbWVudXMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBOZXN0LkZlYXRoZXIodGhpcy4kZWxlbWVudCwgJ2FjY29yZGlvbicpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKS5ub3QoJy5pcy1hY3RpdmUnKS5zbGlkZVVwKDApOy8vLmZpbmQoJ2EnKS5jc3MoJ3BhZGRpbmctbGVmdCcsICcxcmVtJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IHRoaXMub3B0aW9ucy5tdWx0aU9wZW5cbiAgICB9KTtcblxuICAgIHRoaXMuJG1lbnVMaW5rcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmlzLWFjY29yZGlvbi1zdWJtZW51LXBhcmVudCcpO1xuICAgIHRoaXMuJG1lbnVMaW5rcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxpbmtJZCA9IHRoaXMuaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2FjYy1tZW51LWxpbmsnKSxcbiAgICAgICAgICAkZWxlbSA9ICQodGhpcyksXG4gICAgICAgICAgJHN1YiA9ICRlbGVtLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpLFxuICAgICAgICAgIHN1YklkID0gJHN1YlswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnYWNjLW1lbnUnKSxcbiAgICAgICAgICBpc0FjdGl2ZSA9ICRzdWIuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICBpZiAoX3RoaXMub3B0aW9ucy5wYXJlbnRMaW5rKSB7XG4gICAgICAgIGxldCAkYW5jaG9yID0gJGVsZW0uY2hpbGRyZW4oJ2EnKTtcbiAgICAgICAgJGFuY2hvci5jbG9uZSgpLnByZXBlbmRUbygkc3ViKS53cmFwKCc8bGkgZGF0YS1pcy1wYXJlbnQtbGluayBjbGFzcz1cImlzLXN1Ym1lbnUtcGFyZW50LWl0ZW0gaXMtc3VibWVudS1pdGVtIGlzLWFjY29yZGlvbi1zdWJtZW51LWl0ZW1cIj48L2xpPicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAgICRlbGVtLmFkZENsYXNzKCdoYXMtc3VibWVudS10b2dnbGUnKTtcbiAgICAgICAgJGVsZW0uY2hpbGRyZW4oJ2EnKS5hZnRlcignPGJ1dHRvbiBpZD1cIicgKyBsaW5rSWQgKyAnXCIgY2xhc3M9XCJzdWJtZW51LXRvZ2dsZVwiIGFyaWEtY29udHJvbHM9XCInICsgc3ViSWQgKyAnXCIgYXJpYS1leHBhbmRlZD1cIicgKyBpc0FjdGl2ZSArICdcIiB0aXRsZT1cIicgKyBfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGVUZXh0ICsgJ1wiPjxzcGFuIGNsYXNzPVwic3VibWVudS10b2dnbGUtdGV4dFwiPicgKyBfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGVUZXh0ICsgJzwvc3Bhbj48L2J1dHRvbj4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRlbGVtLmF0dHIoe1xuICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogc3ViSWQsXG4gICAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBpc0FjdGl2ZSxcbiAgICAgICAgICAnaWQnOiBsaW5rSWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAkc3ViLmF0dHIoe1xuICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogbGlua0lkLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAhaXNBY3RpdmUsXG4gICAgICAgICdyb2xlJzogJ2dyb3VwJyxcbiAgICAgICAgJ2lkJzogc3ViSWRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBpbml0UGFuZXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pcy1hY3RpdmUnKTtcbiAgICBpZiAoaW5pdFBhbmVzLmxlbmd0aCkge1xuICAgICAgaW5pdFBhbmVzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLmRvd24oJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgaXRlbXMgd2l0aGluIHRoZSBtZW51LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdsaScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHN1Ym1lbnUgPSAkKHRoaXMpLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpO1xuXG4gICAgICBpZiAoJHN1Ym1lbnUubGVuZ3RoKSB7XG4gICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuc3VibWVudS10b2dnbGUnKS5vZmYoJ2NsaWNrLnpmLmFjY29yZGlvbk1lbnUnKS5vbignY2xpY2suemYuYWNjb3JkaW9uTWVudScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCRzdWJtZW51KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJ2EnKS5vZmYoJ2NsaWNrLnpmLmFjY29yZGlvbk1lbnUnKS5vbignY2xpY2suemYuYWNjb3JkaW9uTWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBfdGhpcy50b2dnbGUoJHN1Ym1lbnUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5vbigna2V5ZG93bi56Zi5hY2NvcmRpb25NZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgICAkZWxlbWVudHMgPSAkZWxlbWVudC5wYXJlbnQoJ3VsJykuY2hpbGRyZW4oJ2xpJyksXG4gICAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAgICRuZXh0RWxlbWVudCxcbiAgICAgICAgICAkdGFyZ2V0ID0gJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJyk7XG5cbiAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWF4KDAsIGktMSkpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1pbihpKzEsICRlbGVtZW50cy5sZW5ndGgtMSkpLmZpbmQoJ2EnKS5maXJzdCgpO1xuXG4gICAgICAgICAgaWYgKCQodGhpcykuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdOnZpc2libGUnKS5sZW5ndGgpIHsgLy8gaGFzIG9wZW4gc3ViIG1lbnVcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50LmZpbmQoJ2xpOmZpcnN0LWNoaWxkJykuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Zmlyc3QtY2hpbGQnKSkgeyAvLyBpcyBmaXJzdCBlbGVtZW50IG9mIHN1YiBtZW51XG4gICAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkcHJldkVsZW1lbnQucGFyZW50cygnbGknKS5maXJzdCgpLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XTp2aXNpYmxlJykubGVuZ3RoKSB7IC8vIGlmIHByZXZpb3VzIGVsZW1lbnQgaGFzIG9wZW4gc3ViIG1lbnVcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRwcmV2RWxlbWVudC5wYXJlbnRzKCdsaScpLmZpbmQoJ2xpOmxhc3QtY2hpbGQnKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpsYXN0LWNoaWxkJykpIHsgLy8gaXMgbGFzdCBlbGVtZW50IG9mIHN1YiBtZW51XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkubmV4dCgnbGknKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0FjY29yZGlvbk1lbnUnLCB7XG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgIF90aGlzLmRvd24oJHRhcmdldCk7XG4gICAgICAgICAgICAkdGFyZ2V0LmZpbmQoJ2xpJykuZmlyc3QoKS5maW5kKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCAmJiAhJHRhcmdldC5pcygnOmhpZGRlbicpKSB7IC8vIGNsb3NlIGFjdGl2ZSBzdWIgb2YgdGhpcyBpdGVtXG4gICAgICAgICAgICBfdGhpcy51cCgkdGFyZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRlbGVtZW50LnBhcmVudCgnW2RhdGEtc3VibWVudV0nKS5sZW5ndGgpIHsgLy8gY2xvc2UgY3VycmVudGx5IG9wZW4gc3ViXG4gICAgICAgICAgICBfdGhpcy51cCgkZWxlbWVudC5wYXJlbnQoJ1tkYXRhLXN1Ym1lbnVdJykpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50cygnbGknKS5maXJzdCgpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRuZXh0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCRlbGVtZW50LmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpLmxlbmd0aCkge1xuICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCRlbGVtZW50LmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmhpZGVBbGwoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlZDogZnVuY3Rpb24ocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pOy8vLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIGFsbCBwYW5lcyBvZiB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBoaWRlQWxsKCkge1xuICAgIHRoaXMudXAodGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbGwgcGFuZXMgb2YgdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgc2hvd0FsbCgpIHtcbiAgICB0aGlzLmRvd24odGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvcGVuL2Nsb3NlIHN0YXRlIG9mIGEgc3VibWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gdGhlIHN1Ym1lbnUgdG8gdG9nZ2xlXG4gICAqL1xuICB0b2dnbGUoJHRhcmdldCkge1xuICAgIGlmICghJHRhcmdldC5pcygnOmFuaW1hdGVkJykpIHtcbiAgICAgIGlmICghJHRhcmdldC5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgIHRoaXMudXAoJHRhcmdldCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5kb3duKCR0YXJnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgc3ViLW1lbnUgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gU3ViLW1lbnUgdG8gb3Blbi5cbiAgICogQGZpcmVzIEFjY29yZGlvbk1lbnUjZG93blxuICAgKi9cbiAgZG93bigkdGFyZ2V0KSB7XG4gICAgLy8gSWYgaGF2aW5nIG11bHRpcGxlIHN1Ym1lbnVzIGFjdGl2ZSBpcyBkaXNhYmxlZCwgY2xvc2UgYWxsIHRoZSBzdWJtZW51c1xuICAgIC8vIHRoYXQgYXJlIG5vdCBwYXJlbnRzIG9yIGNoaWxkcmVuIG9mIHRoZSB0YXJnZXRlZCBzdWJtZW51LlxuICAgIGlmICghdGhpcy5vcHRpb25zLm11bHRpT3Blbikge1xuICAgICAgLy8gVGhlIFwiYnJhbmNoXCIgb2YgdGhlIHRhcmdldHRlZCBzdWJtZW51LCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCB0b1xuICAgICAgLy8gdGhlIGFjdGl2ZSBzdWJtZW51cyBuZXN0ZWQgaW4gaXQuXG4gICAgICBjb25zdCAkdGFyZ2V0QnJhbmNoID0gJHRhcmdldC5wYXJlbnRzVW50aWwodGhpcy4kZWxlbWVudClcbiAgICAgICAgLmFkZCgkdGFyZ2V0KVxuICAgICAgICAuYWRkKCR0YXJnZXQuZmluZCgnLmlzLWFjdGl2ZScpKTtcbiAgICAgIC8vIEFsbCB0aGUgYWN0aXZlIHN1Ym1lbnVzIHRoYXQgYXJlIG5vdCBpbiB0aGUgYnJhbmNoLlxuICAgICAgY29uc3QgJG90aGVyc0FjdGl2ZVN1Ym1lbnVzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWN0aXZlJykubm90KCR0YXJnZXRCcmFuY2gpO1xuXG4gICAgICB0aGlzLnVwKCRvdGhlcnNBY3RpdmVTdWJtZW51cyk7XG4gICAgfVxuXG4gICAgJHRhcmdldFxuICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgLmF0dHIoeyAnYXJpYS1oaWRkZW4nOiBmYWxzZSB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgJHRhcmdldC5wcmV2KCcuc3VibWVudS10b2dnbGUnKS5hdHRyKHsnYXJpYS1leHBhbmRlZCc6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkdGFyZ2V0LnBhcmVudCgnLmlzLWFjY29yZGlvbi1zdWJtZW51LXBhcmVudCcpLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIH1cblxuICAgICR0YXJnZXQuc2xpZGVEb3duKHRoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCAoKSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZG9uZSBvcGVuaW5nLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbk1lbnUjZG93blxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Rvd24uemYuYWNjb3JkaW9uTWVudScsIFskdGFyZ2V0XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBzdWItbWVudSBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC4gQWxsIHN1Yi1tZW51cyBpbnNpZGUgdGhlIHRhcmdldCB3aWxsIGJlIGNsb3NlZCBhcyB3ZWxsLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFN1Yi1tZW51IHRvIGNsb3NlLlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSN1cFxuICAgKi9cbiAgdXAoJHRhcmdldCkge1xuICAgIGNvbnN0ICRzdWJtZW51cyA9ICR0YXJnZXQuZmluZCgnW2RhdGEtc3VibWVudV0nKTtcbiAgICBjb25zdCAkYWxsbWVudXMgPSAkdGFyZ2V0LmFkZCgkc3VibWVudXMpO1xuXG4gICAgJHN1Ym1lbnVzLnNsaWRlVXAoMCk7XG4gICAgJGFsbG1lbnVzXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgJGFsbG1lbnVzLnByZXYoJy5zdWJtZW51LXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJGFsbG1lbnVzLnBhcmVudCgnLmlzLWFjY29yZGlvbi1zdWJtZW51LXBhcmVudCcpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgJHRhcmdldC5zbGlkZVVwKHRoaXMub3B0aW9ucy5zbGlkZVNwZWVkLCAoKSA9PiB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZG9uZSBjb2xsYXBzaW5nIHVwLlxuICAgICAgICogQGV2ZW50IEFjY29yZGlvbk1lbnUjdXBcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCd1cC56Zi5hY2NvcmRpb25NZW51JywgWyR0YXJnZXRdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhY2NvcmRpb24gbWVudS5cbiAgICogQGZpcmVzIEFjY29yZGlvbk1lbnUjZGVzdHJveWVkXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLXN1Ym1lbnVdJykuc2xpZGVEb3duKDApLmNzcygnZGlzcGxheScsICcnKTtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ2EnKS5vZmYoJ2NsaWNrLnpmLmFjY29yZGlvbk1lbnUnKTtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWlzLXBhcmVudC1saW5rXScpLmRldGFjaCgpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmZpbmQoJy5oYXMtc3VibWVudS10b2dnbGUnKS5yZW1vdmVDbGFzcygnaGFzLXN1Ym1lbnUtdG9nZ2xlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50LmZpbmQoJy5zdWJtZW51LXRvZ2dsZScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIE5lc3QuQnVybih0aGlzLiRlbGVtZW50LCAnYWNjb3JkaW9uJyk7XG4gIH1cbn1cblxuQWNjb3JkaW9uTWVudS5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFkZHMgdGhlIHBhcmVudCBsaW5rIHRvIHRoZSBzdWJtZW51LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgcGFyZW50TGluazogZmFsc2UsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBhbmltYXRlIHRoZSBvcGVuaW5nIG9mIGEgc3VibWVudSBpbiBtcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAyNTBcbiAgICovXG4gIHNsaWRlU3BlZWQ6IDI1MCxcbiAgLyoqXG4gICAqIEFkZHMgYSBzZXBhcmF0ZSBzdWJtZW51IHRvZ2dsZSBidXR0b24uIFRoaXMgYWxsb3dzIHRoZSBwYXJlbnQgaXRlbSB0byBoYXZlIGEgbGluay5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBzdWJtZW51VG9nZ2xlOiBmYWxzZSxcbiAgLyoqXG4gICAqIFRoZSB0ZXh0IHVzZWQgZm9yIHRoZSBzdWJtZW51IHRvZ2dsZSBpZiBlbmFibGVkLiBUaGlzIGlzIHVzZWQgZm9yIHNjcmVlbiByZWFkZXJzIG9ubHkuXG4gICAqIEBvcHRpb25cbiAgICogQGV4YW1wbGUgdHJ1ZVxuICAgKi9cbiAgc3VibWVudVRvZ2dsZVRleHQ6ICdUb2dnbGUgbWVudScsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgbWVudSB0byBoYXZlIG11bHRpcGxlIG9wZW4gcGFuZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIG11bHRpT3BlbjogdHJ1ZVxufTtcblxuZXhwb3J0IHsgQWNjb3JkaW9uTWVudSB9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuXG52YXIgRk9VTkRBVElPTl9WRVJTSU9OID0gJzYuNy40JztcblxuLy8gR2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4vLyBUaGlzIGlzIGF0dGFjaGVkIHRvIHRoZSB3aW5kb3csIG9yIHVzZWQgYXMgYSBtb2R1bGUgZm9yIEFNRC9Ccm93c2VyaWZ5XG52YXIgRm91bmRhdGlvbiA9IHtcbiAgdmVyc2lvbjogRk9VTkRBVElPTl9WRVJTSU9OLFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW5pdGlhbGl6ZWQgcGx1Z2lucy5cbiAgICovXG4gIF9wbHVnaW5zOiB7fSxcblxuICAvKipcbiAgICogU3RvcmVzIGdlbmVyYXRlZCB1bmlxdWUgaWRzIGZvciBwbHVnaW4gaW5zdGFuY2VzXG4gICAqL1xuICBfdXVpZHM6IFtdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgRm91bmRhdGlvbiBwbHVnaW4sIGFkZGluZyBpdCB0byB0aGUgYEZvdW5kYXRpb25gIG5hbWVzcGFjZSBhbmQgdGhlIGxpc3Qgb2YgcGx1Z2lucyB0byBpbml0aWFsaXplIHdoZW4gcmVmbG93aW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwbHVnaW4uXG4gICAqL1xuICBwbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSkge1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gYWRkaW5nIHRvIGdsb2JhbCBGb3VuZGF0aW9uIG9iamVjdFxuICAgIC8vIEV4YW1wbGVzOiBGb3VuZGF0aW9uLlJldmVhbCwgRm91bmRhdGlvbi5PZmZDYW52YXNcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5hbWUgfHwgZnVuY3Rpb25OYW1lKHBsdWdpbikpO1xuICAgIC8vIE9iamVjdCBrZXkgdG8gdXNlIHdoZW4gc3RvcmluZyB0aGUgcGx1Z2luLCBhbHNvIHVzZWQgdG8gY3JlYXRlIHRoZSBpZGVudGlmeWluZyBkYXRhIGF0dHJpYnV0ZSBmb3IgdGhlIHBsdWdpblxuICAgIC8vIEV4YW1wbGVzOiBkYXRhLXJldmVhbCwgZGF0YS1vZmYtY2FudmFzXG4gICAgdmFyIGF0dHJOYW1lICA9IGh5cGhlbmF0ZShjbGFzc05hbWUpO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBGb3VuZGF0aW9uIG9iamVjdCBhbmQgdGhlIHBsdWdpbnMgbGlzdCAoZm9yIHJlZmxvd2luZylcbiAgICB0aGlzLl9wbHVnaW5zW2F0dHJOYW1lXSA9IHRoaXNbY2xhc3NOYW1lXSA9IHBsdWdpbjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBQb3B1bGF0ZXMgdGhlIF91dWlkcyBhcnJheSB3aXRoIHBvaW50ZXJzIHRvIGVhY2ggaW5kaXZpZHVhbCBwbHVnaW4gaW5zdGFuY2UuXG4gICAqIEFkZHMgdGhlIGB6ZlBsdWdpbmAgZGF0YS1hdHRyaWJ1dGUgdG8gcHJvZ3JhbW1hdGljYWxseSBjcmVhdGVkIHBsdWdpbnMgdG8gYWxsb3cgdXNlIG9mICQoc2VsZWN0b3IpLmZvdW5kYXRpb24obWV0aG9kKSBjYWxscy5cbiAgICogQWxzbyBmaXJlcyB0aGUgaW5pdGlhbGl6YXRpb24gZXZlbnQgZm9yIGVhY2ggcGx1Z2luLCBjb25zb2xpZGF0aW5nIHJlcGV0aXRpdmUgY29kZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiAtIGFuIGluc3RhbmNlIG9mIGEgcGx1Z2luLCB1c3VhbGx5IGB0aGlzYCBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4sIHBhc3NlZCBhcyBhIGNhbWVsQ2FzZWQgc3RyaW5nLlxuICAgKiBAZmlyZXMgUGx1Z2luI2luaXRcbiAgICovXG4gIHJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4sIG5hbWUpe1xuICAgIHZhciBwbHVnaW5OYW1lID0gbmFtZSA/IGh5cGhlbmF0ZShuYW1lKSA6IGZ1bmN0aW9uTmFtZShwbHVnaW4uY29uc3RydWN0b3IpLnRvTG93ZXJDYXNlKCk7XG4gICAgcGx1Z2luLnV1aWQgPSBHZXRZb0RpZ2l0cyg2LCBwbHVnaW5OYW1lKTtcblxuICAgIGlmKCFwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyBwbHVnaW4uJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgcGx1Z2luLnV1aWQpOyB9XG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgcGx1Z2luKTsgfVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNpbml0XG4gICAgICAgICAgICovXG4gICAgcGx1Z2luLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuXG4gICAgdGhpcy5fdXVpZHMucHVzaChwbHVnaW4udXVpZCk7XG5cbiAgICByZXR1cm47XG4gIH0sXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogUmVtb3ZlcyB0aGUgcGx1Z2lucyB1dWlkIGZyb20gdGhlIF91dWlkcyBhcnJheS5cbiAgICogUmVtb3ZlcyB0aGUgemZQbHVnaW4gZGF0YSBhdHRyaWJ1dGUsIGFzIHdlbGwgYXMgdGhlIGRhdGEtcGx1Z2luLW5hbWUgYXR0cmlidXRlLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBkZXN0cm95ZWQgZXZlbnQgZm9yIHRoZSBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBmaXJlcyBQbHVnaW4jZGVzdHJveWVkXG4gICAqL1xuICB1bnJlZ2lzdGVyUGx1Z2luOiBmdW5jdGlvbihwbHVnaW4pe1xuICAgIHZhciBwbHVnaW5OYW1lID0gaHlwaGVuYXRlKGZ1bmN0aW9uTmFtZShwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nKS5jb25zdHJ1Y3RvcikpO1xuXG4gICAgdGhpcy5fdXVpZHMuc3BsaWNlKHRoaXMuX3V1aWRzLmluZGV4T2YocGx1Z2luLnV1aWQpLCAxKTtcbiAgICBwbHVnaW4uJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAudHJpZ2dlcihgZGVzdHJveWVkLnpmLiR7cGx1Z2luTmFtZX1gKTtcbiAgICBmb3IodmFyIHByb3AgaW4gcGx1Z2luKXtcbiAgICAgIGlmKHR5cGVvZiBwbHVnaW5bcHJvcF0gPT09ICdmdW5jdGlvbicpe1xuICAgICAgICBwbHVnaW5bcHJvcF0gPSBudWxsOyAvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfSxcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIENhdXNlcyBvbmUgb3IgbW9yZSBhY3RpdmUgcGx1Z2lucyB0byByZS1pbml0aWFsaXplLCByZXNldHRpbmcgZXZlbnQgbGlzdGVuZXJzLCByZWNhbGN1bGF0aW5nIHBvc2l0aW9ucywgZXRjLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGx1Z2lucyAtIG9wdGlvbmFsIHN0cmluZyBvZiBhbiBpbmRpdmlkdWFsIHBsdWdpbiBrZXksIGF0dGFpbmVkIGJ5IGNhbGxpbmcgYCQoZWxlbWVudCkuZGF0YSgncGx1Z2luTmFtZScpYCwgb3Igc3RyaW5nIG9mIGEgcGx1Z2luIGNsYXNzIGkuZS4gYCdkcm9wZG93bidgXG4gICAqIEBkZWZhdWx0IElmIG5vIGFyZ3VtZW50IGlzIHBhc3NlZCwgcmVmbG93IGFsbCBjdXJyZW50bHkgYWN0aXZlIHBsdWdpbnMuXG4gICAqL1xuICAgcmVJbml0OiBmdW5jdGlvbihwbHVnaW5zKXtcbiAgICAgdmFyIGlzSlEgPSBwbHVnaW5zIGluc3RhbmNlb2YgJDtcbiAgICAgdHJ5e1xuICAgICAgIGlmKGlzSlEpe1xuICAgICAgICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICQodGhpcykuZGF0YSgnemZQbHVnaW4nKS5faW5pdCgpO1xuICAgICAgICAgfSk7XG4gICAgICAgfWVsc2V7XG4gICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBwbHVnaW5zLFxuICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgZm5zID0ge1xuICAgICAgICAgICAnb2JqZWN0JzogZnVuY3Rpb24ocGxncyl7XG4gICAgICAgICAgICAgcGxncy5mb3JFYWNoKGZ1bmN0aW9uKHApe1xuICAgICAgICAgICAgICAgcCA9IGh5cGhlbmF0ZShwKTtcbiAgICAgICAgICAgICAgICQoJ1tkYXRhLScrIHAgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3N0cmluZyc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgcGx1Z2lucyA9IGh5cGhlbmF0ZShwbHVnaW5zKTtcbiAgICAgICAgICAgICAkKCdbZGF0YS0nKyBwbHVnaW5zICsnXScpLmZvdW5kYXRpb24oJ19pbml0Jyk7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgICd1bmRlZmluZWQnOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIHRoaXMub2JqZWN0KE9iamVjdC5rZXlzKF90aGlzLl9wbHVnaW5zKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH07XG4gICAgICAgICBmbnNbdHlwZV0ocGx1Z2lucyk7XG4gICAgICAgfVxuICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgIH1maW5hbGx5e1xuICAgICAgIHJldHVybiBwbHVnaW5zO1xuICAgICB9XG4gICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHBsdWdpbnMgb24gYW55IGVsZW1lbnRzIHdpdGhpbiBgZWxlbWAgKGFuZCBgZWxlbWAgaXRzZWxmKSB0aGF0IGFyZW4ndCBhbHJlYWR5IGluaXRpYWxpemVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSAtIGpRdWVyeSBvYmplY3QgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBjaGVjayBpbnNpZGUuIEFsc28gY2hlY2tzIHRoZSBlbGVtZW50IGl0c2VsZiwgdW5sZXNzIGl0J3MgdGhlIGBkb2N1bWVudGAgb2JqZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGx1Z2lucyAtIEEgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUuIExlYXZlIHRoaXMgb3V0IHRvIGluaXRpYWxpemUgZXZlcnl0aGluZy5cbiAgICovXG4gIHJlZmxvdzogZnVuY3Rpb24oZWxlbSwgcGx1Z2lucykge1xuXG4gICAgLy8gSWYgcGx1Z2lucyBpcyB1bmRlZmluZWQsIGp1c3QgZ3JhYiBldmVyeXRoaW5nXG4gICAgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcGx1Z2lucyA9IE9iamVjdC5rZXlzKHRoaXMuX3BsdWdpbnMpO1xuICAgIH1cbiAgICAvLyBJZiBwbHVnaW5zIGlzIGEgc3RyaW5nLCBjb252ZXJ0IGl0IHRvIGFuIGFycmF5IHdpdGggb25lIGl0ZW1cbiAgICBlbHNlIGlmICh0eXBlb2YgcGx1Z2lucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHBsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBsdWdpblxuICAgICQuZWFjaChwbHVnaW5zLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGx1Z2luXG4gICAgICB2YXIgcGx1Z2luID0gX3RoaXMuX3BsdWdpbnNbbmFtZV07XG5cbiAgICAgIC8vIExvY2FsaXplIHRoZSBzZWFyY2ggdG8gYWxsIGVsZW1lbnRzIGluc2lkZSBlbGVtLCBhcyB3ZWxsIGFzIGVsZW0gaXRzZWxmLCB1bmxlc3MgZWxlbSA9PT0gZG9jdW1lbnRcbiAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSkuZmluZCgnW2RhdGEtJytuYW1lKyddJykuYWRkQmFjaygnW2RhdGEtJytuYW1lKyddJykuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiAkKHRoaXMpLmRhdGEoXCJ6ZlBsdWdpblwiKSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgICB9KTtcblxuICAgICAgLy8gRm9yIGVhY2ggcGx1Z2luIGZvdW5kLCBpbml0aWFsaXplIGl0XG4gICAgICAkZWxlbS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcbiAgICAgICAgICAgIG9wdHMgPSB7IHJlZmxvdzogdHJ1ZSB9O1xuXG4gICAgICAgIGlmKCRlbC5hdHRyKCdkYXRhLW9wdGlvbnMnKSl7XG4gICAgICAgICAgJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpLnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihvcHRpb24pe1xuICAgICAgICAgICAgdmFyIG9wdCA9IG9wdGlvbi5zcGxpdCgnOicpLm1hcChmdW5jdGlvbihlbCl7IHJldHVybiBlbC50cmltKCk7IH0pO1xuICAgICAgICAgICAgaWYob3B0WzBdKSBvcHRzW29wdFswXV0gPSBwYXJzZVZhbHVlKG9wdFsxXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICRlbC5kYXRhKCd6ZlBsdWdpbicsIG5ldyBwbHVnaW4oJCh0aGlzKSwgb3B0cykpO1xuICAgICAgICB9Y2F0Y2goZXIpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXIpO1xuICAgICAgICB9ZmluYWxseXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRGbk5hbWU6IGZ1bmN0aW9uTmFtZSxcblxuICBhZGRUb0pxdWVyeTogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgbm90IG1ha2luZyB0aGlzIGEgalF1ZXJ5IGZ1bmN0aW9uXG4gICAgLy8gVE9ETzogbmVlZCB3YXkgdG8gcmVmbG93IHZzLiByZS1pbml0aWFsaXplXG4gICAgLyoqXG4gICAgICogVGhlIEZvdW5kYXRpb24galF1ZXJ5IG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gbWV0aG9kIC0gQW4gYWN0aW9uIHRvIHBlcmZvcm0gb24gdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdC5cbiAgICAgKi9cbiAgICB2YXIgZm91bmRhdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgbWV0aG9kLFxuICAgICAgICAgICRub0pTID0gJCgnLm5vLWpzJyk7XG5cbiAgICAgIGlmKCRub0pTLmxlbmd0aCl7XG4gICAgICAgICRub0pTLnJlbW92ZUNsYXNzKCduby1qcycpO1xuICAgICAgfVxuXG4gICAgICBpZih0eXBlID09PSAndW5kZWZpbmVkJyl7Ly9uZWVkcyB0byBpbml0aWFsaXplIHRoZSBGb3VuZGF0aW9uIG9iamVjdCwgb3IgYW4gaW5kaXZpZHVhbCBwbHVnaW4uXG4gICAgICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICAgICAgRm91bmRhdGlvbi5yZWZsb3codGhpcyk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnc3RyaW5nJyl7Ly9hbiBpbmRpdmlkdWFsIG1ldGhvZCB0byBpbnZva2Ugb24gYSBwbHVnaW4gb3IgZ3JvdXAgb2YgcGx1Z2luc1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7Ly9jb2xsZWN0IGFsbCB0aGUgYXJndW1lbnRzLCBpZiBuZWNlc3NhcnlcbiAgICAgICAgdmFyIHBsdWdDbGFzcyA9IHRoaXMuZGF0YSgnemZQbHVnaW4nKTsvL2RldGVybWluZSB0aGUgY2xhc3Mgb2YgcGx1Z2luXG5cbiAgICAgICAgaWYodHlwZW9mIHBsdWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHBsdWdDbGFzc1ttZXRob2RdICE9PSAndW5kZWZpbmVkJyl7Ly9tYWtlIHN1cmUgYm90aCB0aGUgY2xhc3MgYW5kIG1ldGhvZCBleGlzdFxuICAgICAgICAgIGlmKHRoaXMubGVuZ3RoID09PSAxKXsvL2lmIHRoZXJlJ3Mgb25seSBvbmUsIGNhbGwgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICAgIHBsdWdDbGFzc1ttZXRob2RdLmFwcGx5KHBsdWdDbGFzcywgYXJncyk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oaSwgZWwpey8vb3RoZXJ3aXNlIGxvb3AgdGhyb3VnaCB0aGUgalF1ZXJ5IGNvbGxlY3Rpb24gYW5kIGludm9rZSB0aGUgbWV0aG9kIG9uIGVhY2hcbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkoJChlbCkuZGF0YSgnemZQbHVnaW4nKSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNley8vZXJyb3IgZm9yIG5vIGNsYXNzIG9yIG5vIG1ldGhvZFxuICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlJ3JlIHNvcnJ5LCAnXCIgKyBtZXRob2QgKyBcIicgaXMgbm90IGFuIGF2YWlsYWJsZSBtZXRob2QgZm9yIFwiICsgKHBsdWdDbGFzcyA/IGZ1bmN0aW9uTmFtZShwbHVnQ2xhc3MpIDogJ3RoaXMgZWxlbWVudCcpICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7Ly9lcnJvciBmb3IgaW52YWxpZCBhcmd1bWVudCB0eXBlXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFdlJ3JlIHNvcnJ5LCAke3R5cGV9IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlci4gWW91IG11c3QgdXNlIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWV0aG9kIHlvdSB3aXNoIHRvIGludm9rZS5gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgJC5mbi5mb3VuZGF0aW9uID0gZm91bmRhdGlvbjtcbiAgICByZXR1cm4gJDtcbiAgfVxufTtcblxuRm91bmRhdGlvbi51dGlsID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gZm9yIGFwcGx5aW5nIGEgZGVib3VuY2UgZWZmZWN0IHRvIGEgZnVuY3Rpb24gY2FsbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgZW5kIG9mIHRpbWVvdXQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheSAtIFRpbWUgaW4gbXMgdG8gZGVsYXkgdGhlIGNhbGwgb2YgYGZ1bmNgLlxuICAgKiBAcmV0dXJucyBmdW5jdGlvblxuICAgKi9cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cbndpbmRvdy5Gb3VuZGF0aW9uID0gRm91bmRhdGlvbjtcblxuLy8gUG9seWZpbGwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuKGZ1bmN0aW9uKCkge1xuICBpZiAoIURhdGUubm93IHx8ICF3aW5kb3cuRGF0ZS5ub3cpXG4gICAgd2luZG93LkRhdGUubm93ID0gRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpOyB9O1xuXG4gIHZhciB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsraSkge1xuICAgICAgdmFyIHZwID0gdmVuZG9yc1tpXTtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdnArJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gKHdpbmRvd1t2cCsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgd2luZG93W3ZwKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXSk7XG4gIH1cbiAgaWYgKC9pUChhZHxob25lfG9kKS4qT1MgNi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICB8fCAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAhd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBuZXh0VGltZSA9IE1hdGgubWF4KGxhc3RUaW1lICsgMTYsIG5vdyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhsYXN0VGltZSA9IG5leHRUaW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpbWUgLSBub3cpO1xuICAgIH07XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2xlYXJUaW1lb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQb2x5ZmlsbCBmb3IgcGVyZm9ybWFuY2Uubm93LCByZXF1aXJlZCBieSByQUZcbiAgICovXG4gIGlmKCF3aW5kb3cucGVyZm9ybWFuY2UgfHwgIXdpbmRvdy5wZXJmb3JtYW5jZS5ub3cpe1xuICAgIHdpbmRvdy5wZXJmb3JtYW5jZSA9IHtcbiAgICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICAgICAgbm93OiBmdW5jdGlvbigpeyByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7IH1cbiAgICB9O1xuICB9XG59KSgpO1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1leHRlbmQtbmF0aXZlICovXG4gIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob1RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuICAgICAgLy8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcbiAgICB9XG5cbiAgICB2YXIgYUFyZ3MgICA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QICAgID0gZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgZkJvdW5kICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QXG4gICAgICAgICAgICAgICAgID8gdGhpc1xuICAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKHRoaXMucHJvdG90eXBlKSB7XG4gICAgICAvLyBuYXRpdmUgZnVuY3Rpb25zIGRvbid0IGhhdmUgYSBwcm90b3R5cGVcbiAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgfVxuICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgcmV0dXJuIGZCb3VuZDtcbiAgfTtcbn1cbi8vIFBvbHlmaWxsIHRvIGdldCB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGluIElFOVxuZnVuY3Rpb24gZnVuY3Rpb25OYW1lKGZuKSB7XG4gIGlmICh0eXBlb2YgRnVuY3Rpb24ucHJvdG90eXBlLm5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGZ1bmNOYW1lUmVnZXggPSAvZnVuY3Rpb25cXHMoW14oXXsxLH0pXFwoLztcbiAgICB2YXIgcmVzdWx0cyA9IChmdW5jTmFtZVJlZ2V4KS5leGVjKChmbikudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkgPyByZXN1bHRzWzFdLnRyaW0oKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIGZuLnByb3RvdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZm4uY29uc3RydWN0b3IubmFtZTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gZm4ucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoc3RyKXtcbiAgaWYgKCd0cnVlJyA9PT0gc3RyKSByZXR1cm4gdHJ1ZTtcbiAgZWxzZSBpZiAoJ2ZhbHNlJyA9PT0gc3RyKSByZXR1cm4gZmFsc2U7XG4gIGVsc2UgaWYgKCFpc05hTihzdHIgKiAxKSkgcmV0dXJuIHBhcnNlRmxvYXQoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cbi8vIENvbnZlcnQgUGFzY2FsQ2FzZSB0byBrZWJhYi1jYXNlXG4vLyBUaGFuayB5b3U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg5NTU1ODBcbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5leHBvcnQge0ZvdW5kYXRpb259O1xuIiwiaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5cbi8vIEFic3RyYWN0IGNsYXNzIGZvciBwcm92aWRpbmcgbGlmZWN5Y2xlIGhvb2tzLiBFeHBlY3QgcGx1Z2lucyB0byBkZWZpbmUgQVQgTEVBU1Rcbi8vIHtmdW5jdGlvbn0gX3NldHVwIChyZXBsYWNlcyBwcmV2aW91cyBjb25zdHJ1Y3RvciksXG4vLyB7ZnVuY3Rpb259IF9kZXN0cm95IChyZXBsYWNlcyBwcmV2aW91cyBkZXN0cm95KVxuY2xhc3MgUGx1Z2luIHtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5fc2V0dXAoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBnZXRQbHVnaW5OYW1lKHRoaXMpO1xuICAgIHRoaXMudXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkpeyB0aGlzLiRlbGVtZW50LmF0dHIoYGRhdGEtJHtwbHVnaW5OYW1lfWAsIHRoaXMudXVpZCk7IH1cbiAgICBpZighdGhpcy4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpKXsgdGhpcy4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicsIHRoaXMpOyB9XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoYGluaXQuemYuJHtwbHVnaW5OYW1lfWApO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBnZXRQbHVnaW5OYW1lKHRoaXMpO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCkucmVtb3ZlRGF0YSgnemZQbHVnaW4nKVxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICogQGV2ZW50IFBsdWdpbiNkZXN0cm95ZWRcbiAgICAgICAgICovXG4gICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiB0aGlzKXtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIHRoaXNbcHJvcF0gPSBudWxsOyAvL2NsZWFuIHVwIHNjcmlwdCB0byBwcmVwIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIENvbnZlcnQgUGFzY2FsQ2FzZSB0byBrZWJhYi1jYXNlXG4vLyBUaGFuayB5b3U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg5NTU1ODBcbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRQbHVnaW5OYW1lKG9iaikge1xuICByZXR1cm4gaHlwaGVuYXRlKG9iai5jbGFzc05hbWUpO1xufVxuXG5leHBvcnQge1BsdWdpbn07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBDb3JlIEZvdW5kYXRpb24gVXRpbGl0aWVzLCB1dGlsaXplZCBpbiBhIG51bWJlciBvZiBwbGFjZXMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGZvciBSVEwgc3VwcG9ydFxuICAgKi9cbmZ1bmN0aW9uIHJ0bCgpIHtcbiAgcmV0dXJuICQoJ2h0bWwnKS5hdHRyKCdkaXInKSA9PT0gJ3J0bCc7XG59XG5cbi8qKlxuICogcmV0dXJucyBhIHJhbmRvbSBiYXNlLTM2IHVpZCB3aXRoIG5hbWVzcGFjaW5nXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGggLSBudW1iZXIgb2YgcmFuZG9tIGJhc2UtMzYgZGlnaXRzIGRlc2lyZWQuIEluY3JlYXNlIGZvciBtb3JlIHJhbmRvbSBzdHJpbmdzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIG5hbWUgb2YgcGx1Z2luIHRvIGJlIGluY29ycG9yYXRlZCBpbiB1aWQsIG9wdGlvbmFsLlxuICogQGRlZmF1bHQge1N0cmluZ30gJycgLSBpZiBubyBwbHVnaW4gbmFtZSBpcyBwcm92aWRlZCwgbm90aGluZyBpcyBhcHBlbmRlZCB0byB0aGUgdWlkLlxuICogQHJldHVybnMge1N0cmluZ30gLSB1bmlxdWUgaWRcbiAqL1xuZnVuY3Rpb24gR2V0WW9EaWdpdHMobGVuZ3RoID0gNiwgbmFtZXNwYWNlKXtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuICBjb25zdCBjaGFyc0xlbmd0aCA9IGNoYXJzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHN0ciArPSBjaGFyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyc0xlbmd0aCldO1xuICB9XG4gIHJldHVybiBuYW1lc3BhY2UgPyBgJHtzdHJ9LSR7bmFtZXNwYWNlfWAgOiBzdHI7XG59XG5cbi8qKlxuICogRXNjYXBlIGEgc3RyaW5nIHNvIGl0IGNhbiBiZSB1c2VkIGFzIGEgcmVnZXhwIHBhdHRlcm5cbiAqIEBmdW5jdGlvblxuICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTMxMDc1Mi80MzE3Mzg0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSAtIGVzY2FwZWQgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIFJlZ0V4cEVzY2FwZShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25lbmQoJGVsZW0pe1xuICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ1dlYmtpdFRyYW5zaXRpb24nOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgJ01velRyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgJ09UcmFuc2l0aW9uJzogJ290cmFuc2l0aW9uZW5kJ1xuICB9O1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgZW5kO1xuXG4gIGZvciAobGV0IHRyYW5zaXRpb24gaW4gdHJhbnNpdGlvbnMpe1xuICAgIGlmICh0eXBlb2YgZWxlbS5zdHlsZVt0cmFuc2l0aW9uXSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgZW5kID0gdHJhbnNpdGlvbnNbdHJhbnNpdGlvbl07XG4gICAgfVxuICB9XG4gIGlmIChlbmQpIHtcbiAgICByZXR1cm4gZW5kO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICRlbGVtLnRyaWdnZXJIYW5kbGVyKCd0cmFuc2l0aW9uZW5kJywgWyRlbGVtXSk7XG4gICAgfSwgMSk7XG4gICAgcmV0dXJuICd0cmFuc2l0aW9uZW5kJztcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybiBhbiBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3Igd2luZG93IGxvYWQuXG4gKlxuICogSWYgYCRlbGVtYCBpcyBwYXNzZWQsIGFuIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIG9uIGAkZWxlbWAuIElmIHdpbmRvdyBpcyBhbHJlYWR5IGxvYWRlZCwgdGhlIGV2ZW50IHdpbGwgc3RpbGwgYmUgdHJpZ2dlcmVkLlxuICogSWYgYGhhbmRsZXJgIGlzIHBhc3NlZCwgYXR0YWNoIGl0IHRvIHRoZSBldmVudCBvbiBgJGVsZW1gLlxuICogQ2FsbGluZyBgb25Mb2FkYCB3aXRob3V0IGhhbmRsZXIgYWxsb3dzIHlvdSB0byBnZXQgdGhlIGV2ZW50IHR5cGUgdGhhdCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgYXR0YWNoaW5nIHRoZSBoYW5kbGVyIGJ5IHlvdXJzZWxmLlxuICogQGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtdICRlbGVtIC0galF1ZXJ5IGVsZW1lbnQgb24gd2hpY2ggdGhlIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIGlmIHBhc3NlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtdIGhhbmRsZXIgLSBmdW5jdGlvbiB0byBhdHRhY2ggdG8gdGhlIGV2ZW50LlxuICogQHJldHVybnMge1N0cmluZ30gLSBldmVudCB0eXBlIHRoYXQgc2hvdWxkIG9yIHdpbGwgYmUgdHJpZ2dlcmVkLlxuICovXG5mdW5jdGlvbiBvbkxvYWQoJGVsZW0sIGhhbmRsZXIpIHtcbiAgY29uc3QgZGlkTG9hZCA9IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZSc7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IChkaWRMb2FkID8gJ19kaWRMb2FkJyA6ICdsb2FkJykgKyAnLnpmLnV0aWwub25Mb2FkJztcbiAgY29uc3QgY2IgPSAoKSA9PiAkZWxlbS50cmlnZ2VySGFuZGxlcihldmVudFR5cGUpO1xuXG4gIGlmICgkZWxlbSkge1xuICAgIGlmIChoYW5kbGVyKSAkZWxlbS5vbmUoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICAgIGlmIChkaWRMb2FkKVxuICAgICAgc2V0VGltZW91dChjYik7XG4gICAgZWxzZVxuICAgICAgJCh3aW5kb3cpLm9uZSgnbG9hZCcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiBldmVudFR5cGU7XG59XG5cbi8qKlxuICogUmV0dW5zIGFuIGhhbmRsZXIgZm9yIHRoZSBgbW91c2VsZWF2ZWAgdGhhdCBpZ25vcmUgZGlzYXBwZWFyZWQgbW91c2VzLlxuICpcbiAqIElmIHRoZSBtb3VzZSBcImRpc2FwcGVhcmVkXCIgZnJvbSB0aGUgZG9jdW1lbnQgKGxpa2Ugd2hlbiBnb2luZyBvbiBhIGJyb3dzZXIgVUkgZWxlbWVudCwgU2VlIGh0dHBzOi8vZ2l0LmlvL3pmLTExNDEwKSxcbiAqIHRoZSBldmVudCBpcyBpZ25vcmVkLlxuICogLSBJZiB0aGUgYGlnbm9yZUxlYXZlV2luZG93YCBpcyBgdHJ1ZWAsIHRoZSBldmVudCBpcyBpZ25vcmVkIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgbGVmdCB0aGUgd2luZG93XG4gKiAgIChsaWtlIGJ5IHN3aXRjaGluZyB0byBhbiBvdGhlciB3aW5kb3cgd2l0aCBbQWx0XStbVGFiXSkuXG4gKiAtIElmIHRoZSBgaWdub3JlUmVhcHBlYXJgIGlzIGB0cnVlYCwgdGhlIGV2ZW50IHdpbGwgYmUgaWdub3JlZCB3aGVuIHRoZSBtb3VzZSB3aWxsIHJlYXBwZWFyIGxhdGVyIG9uIHRoZSBkb2N1bWVudFxuICogICBvdXRzaWRlIG9mIHRoZSBlbGVtZW50IGl0IGxlZnQuXG4gKlxuICogQGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW10gaGFuZGxlciAtIGhhbmRsZXIgZm9yIHRoZSBmaWx0ZXJlZCBgbW91c2VsZWF2ZWAgZXZlbnQgdG8gd2F0Y2guXG4gKiBAcGFyYW0ge09iamVjdH0gW10gb3B0aW9ucyAtIG9iamVjdCBvZiBvcHRpb25zOlxuICogLSB7Qm9vbGVhbn0gW2ZhbHNlXSBpZ25vcmVMZWF2ZVdpbmRvdyAtIGFsc28gaWdub3JlIHdoZW4gdGhlIHVzZXIgc3dpdGNoZWQgd2luZG93cy5cbiAqIC0ge0Jvb2xlYW59IFtmYWxzZV0gaWdub3JlUmVhcHBlYXIgLSBhbHNvIGlnbm9yZSB3aGVuIHRoZSBtb3VzZSByZWFwcGVhcmVkIG91dHNpZGUgb2YgdGhlIGVsZW1lbnQgaXQgbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBmaWx0ZXJlZCBoYW5kbGVyIHRvIHVzZSB0byBsaXN0ZW4gb24gdGhlIGBtb3VzZWxlYXZlYCBldmVudC5cbiAqL1xuZnVuY3Rpb24gaWdub3JlTW91c2VkaXNhcHBlYXIoaGFuZGxlciwgeyBpZ25vcmVMZWF2ZVdpbmRvdyA9IGZhbHNlLCBpZ25vcmVSZWFwcGVhciA9IGZhbHNlIH0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gbGVhdmVFdmVudEhhbmRsZXIoZUxlYXZlLCAuLi5yZXN0KSB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSBoYW5kbGVyLmJpbmQodGhpcywgZUxlYXZlLCAuLi5yZXN0KTtcblxuICAgIC8vIFRoZSBtb3VzZSBsZWZ0OiBjYWxsIHRoZSBnaXZlbiBjYWxsYmFjayBpZiB0aGUgbW91c2UgZW50ZXJlZCBlbHNld2hlcmVcbiAgICBpZiAoZUxlYXZlLnJlbGF0ZWRUYXJnZXQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgaWYgdGhlIG1vdXNlIGFjdHVhbGx5IGxlZnQgdGhlIHdpbmRvdy5cbiAgICAvLyBJbiBmaXJlZm94IGlmIHRoZSB1c2VyIHN3aXRjaGVkIGJldHdlZW4gd2luZG93cywgdGhlIHdpbmRvdyBzaWxsIGhhdmUgdGhlIGZvY3VzIGJ5IHRoZSB0aW1lXG4gICAgLy8gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZC4gV2UgaGF2ZSB0byBkZWJvdW5jZSB0aGUgZXZlbnQgdG8gdGVzdCB0aGlzIGNhc2UuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiBsZWF2ZUV2ZW50RGVib3VuY2VyKCkge1xuICAgICAgaWYgKCFpZ25vcmVMZWF2ZVdpbmRvdyAmJiBkb2N1bWVudC5oYXNGb2N1cyAmJiAhZG9jdW1lbnQuaGFzRm9jdXMoKSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3RoZXJ3aXNlLCB3YWl0IGZvciB0aGUgbW91c2UgdG8gcmVlYXBlYXIgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCxcbiAgICAgIGlmICghaWdub3JlUmVhcHBlYXIpIHtcbiAgICAgICAgJChkb2N1bWVudCkub25lKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gcmVlbnRlckV2ZW50SGFuZGxlcihlUmVlbnRlcikge1xuICAgICAgICAgIGlmICghJChlTGVhdmUuY3VycmVudFRhcmdldCkuaGFzKGVSZWVudGVyLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBGaWxsIHdoZXJlIHRoZSBtb3VzZSBmaW5hbGx5IGVudGVyZWQuXG4gICAgICAgICAgICBlTGVhdmUucmVsYXRlZFRhcmdldCA9IGVSZWVudGVyLnRhcmdldDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIDApO1xuICB9O1xufVxuXG5cbmV4cG9ydCB7IHJ0bCwgR2V0WW9EaWdpdHMsIFJlZ0V4cEVzY2FwZSwgdHJhbnNpdGlvbmVuZCwgb25Mb2FkLCBpZ25vcmVNb3VzZWRpc2FwcGVhciB9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTmVzdCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMsIHRyYW5zaXRpb25lbmQgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5ib3gnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcblxuLyoqXG4gKiBEcmlsbGRvd24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmRyaWxsZG93blxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICovXG5cbmNsYXNzIERyaWxsZG93biBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgZHJpbGxkb3duIG1lbnUuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBEcmlsbGRvd25cbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhbiBhY2NvcmRpb24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJpbGxkb3duLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRHJpbGxkb3duJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignRHJpbGxkb3duJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0FSUk9XX1JJR0hUJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX1VQJzogJ3VwJyxcbiAgICAgICdBUlJPV19ET1dOJzogJ2Rvd24nLFxuICAgICAgJ0FSUk9XX0xFRlQnOiAncHJldmlvdXMnLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZScsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGRyaWxsZG93biBieSBjcmVhdGluZyBqUXVlcnkgY29sbGVjdGlvbnMgb2YgZWxlbWVudHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnZHJpbGxkb3duJyk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuYXV0b0FwcGx5Q2xhc3MpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2RyaWxsZG93bicpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAnYXJpYS1tdWx0aXNlbGVjdGFibGUnOiBmYWxzZVxuICAgIH0pO1xuICAgIHRoaXMuJHN1Ym1lbnVBbmNob3JzID0gdGhpcy4kZWxlbWVudC5maW5kKCdsaS5pcy1kcmlsbGRvd24tc3VibWVudS1wYXJlbnQnKS5jaGlsZHJlbignYScpO1xuICAgIHRoaXMuJHN1Ym1lbnVzID0gdGhpcy4kc3VibWVudUFuY2hvcnMucGFyZW50KCdsaScpLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpLmF0dHIoJ3JvbGUnLCAnZ3JvdXAnKTtcbiAgICB0aGlzLiRtZW51SXRlbXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpJykubm90KCcuanMtZHJpbGxkb3duLWJhY2snKS5maW5kKCdhJyk7XG5cbiAgICAvLyBTZXQgdGhlIG1haW4gbWVudSBhcyBjdXJyZW50IGJ5IGRlZmF1bHQgKHVubGVzcyBhIHN1Ym1lbnUgaXMgc2VsZWN0ZWQpXG4gICAgLy8gVXNlZCB0byBzZXQgdGhlIHdyYXBwZXIgaGVpZ2h0IHdoZW4gdGhlIGRyaWxsZG93biBpcyBjbG9zZWQvcmVvcGVuZWQgZnJvbSBhbnkgKHN1YiltZW51XG4gICAgdGhpcy4kY3VycmVudE1lbnUgPSB0aGlzLiRlbGVtZW50O1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScsICh0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtZHJpbGxkb3duJykgfHwgR2V0WW9EaWdpdHMoNiwgJ2RyaWxsZG93bicpKSk7XG5cbiAgICB0aGlzLl9wcmVwYXJlTWVudSgpO1xuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKCk7XG5cbiAgICB0aGlzLl9rZXlib2FyZEV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHByZXBhcmVzIGRyaWxsZG93biBtZW51IGJ5IHNldHRpbmcgYXR0cmlidXRlcyB0byBsaW5rcyBhbmQgZWxlbWVudHNcbiAgICogc2V0cyBhIG1pbiBoZWlnaHQgdG8gcHJldmVudCBjb250ZW50IGp1bXBpbmdcbiAgICogd3JhcHMgdGhlIGVsZW1lbnQgaWYgbm90IGFscmVhZHkgd3JhcHBlZFxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9wcmVwYXJlTWVudSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vIGlmKCF0aGlzLm9wdGlvbnMuaG9sZE9wZW4pe1xuICAgIC8vICAgdGhpcy5fbWVudUxpbmtFdmVudHMoKTtcbiAgICAvLyB9XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICAgIHZhciAkc3ViID0gJGxpbmsucGFyZW50KCk7XG4gICAgICBpZihfdGhpcy5vcHRpb25zLnBhcmVudExpbmspe1xuICAgICAgICAkbGluay5jbG9uZSgpLnByZXBlbmRUbygkc3ViLmNoaWxkcmVuKCdbZGF0YS1zdWJtZW51XScpKS53cmFwKCc8bGkgZGF0YS1pcy1wYXJlbnQtbGluayBjbGFzcz1cImlzLXN1Ym1lbnUtcGFyZW50LWl0ZW0gaXMtc3VibWVudS1pdGVtIGlzLWRyaWxsZG93bi1zdWJtZW51LWl0ZW1cIiByb2xlPVwibm9uZVwiPjwvbGk+Jyk7XG4gICAgICB9XG4gICAgICAkbGluay5kYXRhKCdzYXZlZEhyZWYnLCAkbGluay5hdHRyKCdocmVmJykpLnJlbW92ZUF0dHIoJ2hyZWYnKS5hdHRyKCd0YWJpbmRleCcsIDApO1xuICAgICAgJGxpbmsuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJylcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogMCxcbiAgICAgICAgICAgICdyb2xlJzogJ2dyb3VwJ1xuICAgICAgICAgIH0pO1xuICAgICAgX3RoaXMuX2V2ZW50cygkbGluayk7XG4gICAgfSk7XG4gICAgdGhpcy4kc3VibWVudXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRtZW51ID0gJCh0aGlzKSxcbiAgICAgICAgICAkYmFjayA9ICRtZW51LmZpbmQoJy5qcy1kcmlsbGRvd24tYmFjaycpO1xuICAgICAgaWYoISRiYWNrLmxlbmd0aCl7XG4gICAgICAgIHN3aXRjaCAoX3RoaXMub3B0aW9ucy5iYWNrQnV0dG9uUG9zaXRpb24pIHtcbiAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgICAkbWVudS5hcHBlbmQoX3RoaXMub3B0aW9ucy5iYWNrQnV0dG9uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICAgICRtZW51LnByZXBlbmQoX3RoaXMub3B0aW9ucy5iYWNrQnV0dG9uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5zdXBwb3J0ZWQgYmFja0J1dHRvblBvc2l0aW9uIHZhbHVlICdcIiArIF90aGlzLm9wdGlvbnMuYmFja0J1dHRvblBvc2l0aW9uICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5fYmFjaygkbWVudSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzdWJtZW51cy5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgaWYoIXRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB7XG4gICAgICB0aGlzLiRzdWJtZW51cy5hZGRDbGFzcygnZHJpbGxkb3duLXN1Ym1lbnUtY292ZXItcHJldmlvdXMnKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSB3cmFwcGVyIG9uIGVsZW1lbnQgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICBpZighdGhpcy4kZWxlbWVudC5wYXJlbnQoKS5oYXNDbGFzcygnaXMtZHJpbGxkb3duJykpe1xuICAgICAgdGhpcy4kd3JhcHBlciA9ICQodGhpcy5vcHRpb25zLndyYXBwZXIpLmFkZENsYXNzKCdpcy1kcmlsbGRvd24nKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5hbmltYXRlSGVpZ2h0KSB0aGlzLiR3cmFwcGVyLmFkZENsYXNzKCdhbmltYXRlLWhlaWdodCcpO1xuICAgICAgdGhpcy4kZWxlbWVudC53cmFwKHRoaXMuJHdyYXBwZXIpO1xuICAgIH1cbiAgICAvLyBzZXQgd3JhcHBlclxuICAgIHRoaXMuJHdyYXBwZXIgPSB0aGlzLiRlbGVtZW50LnBhcmVudCgpO1xuICAgIHRoaXMuJHdyYXBwZXIuY3NzKHRoaXMuX2dldE1heERpbXMoKSk7XG4gIH1cblxuICBfcmVzaXplKCkge1xuICAgIHRoaXMuJHdyYXBwZXIuY3NzKHsnbWF4LXdpZHRoJzogJ25vbmUnLCAnbWluLWhlaWdodCc6ICdub25lJ30pO1xuICAgIC8vIF9nZXRNYXhEaW1zIGhhcyBzaWRlIGVmZmVjdHMgKGJvbykgYnV0IGNhbGxpbmcgaXQgc2hvdWxkIHVwZGF0ZSBhbGwgb3RoZXIgbmVjZXNzYXJ5IGhlaWdodHMgJiB3aWR0aHNcbiAgICB0aGlzLiR3cmFwcGVyLmNzcyh0aGlzLl9nZXRNYXhEaW1zKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgdG8gZWxlbWVudHMgaW4gdGhlIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgY3VycmVudCBtZW51IGl0ZW0gdG8gYWRkIGhhbmRsZXJzIHRvLlxuICAgKi9cbiAgX2V2ZW50cygkZWxlbSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAkZWxlbS5vZmYoJ2NsaWNrLnpmLmRyaWxsZG93bicpXG4gICAgLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZigkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgJ2xpJykuaGFzQ2xhc3MoJ2lzLWRyaWxsZG93bi1zdWJtZW51LXBhcmVudCcpKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZihlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkKXtcbiAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gfVxuICAgICAgX3RoaXMuX3Nob3coJGVsZW0ucGFyZW50KCdsaScpKTtcblxuICAgICAgaWYoX3RoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spe1xuICAgICAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgICRib2R5Lm9mZignLnpmLmRyaWxsZG93bicpLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbihldikge1xuICAgICAgICAgIGlmIChldi50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8ICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGV2LnRhcmdldCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdGhpcy5faGlkZUFsbCgpO1xuICAgICAgICAgICRib2R5Lm9mZignLnpmLmRyaWxsZG93bicpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBtZW51IGVsZW1lbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlZ2lzdGVyRXZlbnRzKCkge1xuICAgIGlmKHRoaXMub3B0aW9ucy5zY3JvbGxUb3Ape1xuICAgICAgdGhpcy5fYmluZEhhbmRsZXIgPSB0aGlzLl9zY3JvbGxUb3AuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ29wZW4uemYuZHJpbGxkb3duIGhpZGUuemYuZHJpbGxkb3duIGNsb3NlLnpmLmRyaWxsZG93biBjbG9zZWQuemYuZHJpbGxkb3duJyx0aGlzLl9iaW5kSGFuZGxlcik7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQub24oJ211dGF0ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9yZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2Nyb2xsIHRvIFRvcCBvZiBFbGVtZW50IG9yIGRhdGEtc2Nyb2xsLXRvcC1lbGVtZW50XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI3Njcm9sbG1lXG4gICAqL1xuICBfc2Nyb2xsVG9wKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyICRzY3JvbGxUb3BFbGVtZW50ID0gX3RoaXMub3B0aW9ucy5zY3JvbGxUb3BFbGVtZW50ICE9PSAnJz8kKF90aGlzLm9wdGlvbnMuc2Nyb2xsVG9wRWxlbWVudCk6X3RoaXMuJGVsZW1lbnQsXG4gICAgICAgIHNjcm9sbFBvcyA9IHBhcnNlSW50KCRzY3JvbGxUb3BFbGVtZW50Lm9mZnNldCgpLnRvcCtfdGhpcy5vcHRpb25zLnNjcm9sbFRvcE9mZnNldCwgMTApO1xuICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKHRydWUpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHNjcm9sbFBvcyB9LCBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLCBfdGhpcy5vcHRpb25zLmFuaW1hdGlvbkVhc2luZyxmdW5jdGlvbigpe1xuICAgICAgLyoqXG4gICAgICAgICogRmlyZXMgYWZ0ZXIgdGhlIG1lbnUgaGFzIHNjcm9sbGVkXG4gICAgICAgICogQGV2ZW50IERyaWxsZG93biNzY3JvbGxtZVxuICAgICAgICAqL1xuICAgICAgaWYodGhpcz09PSQoJ2h0bWwnKVswXSlfdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzY3JvbGxtZS56Zi5kcmlsbGRvd24nKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGtleWRvd24gZXZlbnQgbGlzdGVuZXIgdG8gYGxpYCdzIGluIHRoZSBtZW51LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2tleWJvYXJkRXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRtZW51SXRlbXMuYWRkKHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrID4gYSwgLmlzLXN1Ym1lbnUtcGFyZW50LWl0ZW0gPiBhJykpLm9uKCdrZXlkb3duLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgICAkZWxlbWVudHMgPSAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLmNoaWxkcmVuKCdsaScpLmNoaWxkcmVuKCdhJyksXG4gICAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAgICRuZXh0RWxlbWVudDtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSk7XG4gICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcmlsbGRvd24nLCB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkZWxlbWVudC5pcyhfdGhpcy4kc3VibWVudUFuY2hvcnMpKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2hvdygkZWxlbWVudC5wYXJlbnQoJ2xpJykpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLmZpbmQoJ3VsIGxpIGEnKS5ub3QoJy5qcy1kcmlsbGRvd24tYmFjayBhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpKTtcbiAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtZW50KSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAvLyBEb24ndCB0YXAgZm9jdXMgb24gZmlyc3QgZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgcmV0dXJuICEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpOmZpcnN0LWNoaWxkID4gYScpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgLy8gRG9uJ3QgdGFwIGZvY3VzIG9uIGxhc3QgZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgcmV0dXJuICEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpOmxhc3QtY2hpbGQgPiBhJykpO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgY2xvc2Ugb24gZWxlbWVudCBpbiByb290IHVsXG4gICAgICAgICAgaWYgKCEkZWxlbWVudC5pcyhfdGhpcy4kZWxlbWVudC5maW5kKCc+IGxpID4gYScpKSkge1xuICAgICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCkpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJ2EnKS5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMucGFyZW50TGluayAmJiAkZWxlbWVudC5hdHRyKCdocmVmJykpIHsgLy8gTGluayB3aXRoIGhyZWZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCEkZWxlbWVudC5pcyhfdGhpcy4kbWVudUl0ZW1zKSkgeyAvLyBub3QgbWVudSBpdGVtIG1lYW5zIGJhY2sgYnV0dG9uXG4gICAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbWVudC5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykub25lKHRyYW5zaXRpb25lbmQoJGVsZW1lbnQpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmICgkZWxlbWVudC5pcyhfdGhpcy4kc3VibWVudUFuY2hvcnMpKSB7IC8vIFN1YiBtZW51IGl0ZW1cbiAgICAgICAgICAgIF90aGlzLl9zaG93KCRlbGVtZW50LnBhcmVudCgnbGknKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykub25lKHRyYW5zaXRpb25lbmQoJGVsZW1lbnQpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykuZmluZCgndWwgbGkgYScpLm5vdCgnLmpzLWRyaWxsZG93bi1iYWNrIGEnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlZDogZnVuY3Rpb24ocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pOyAvLyBlbmQga2V5Ym9hcmRBY2Nlc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYWxsIG9wZW4gZWxlbWVudHMsIGFuZCByZXR1cm5zIHRvIHJvb3QgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jY2xvc2VcbiAgICogQGZpcmVzIERyaWxsZG93biNjbG9zZWRcbiAgICovXG4gIF9oaWRlQWxsKCkge1xuICAgIHZhciAkZWxlbSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmlzLWRyaWxsZG93bi1zdWJtZW51LmlzLWFjdGl2ZScpXG4gICAgJGVsZW0uYWRkQ2xhc3MoJ2lzLWNsb3NpbmcnKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgY29uc3QgY2FsY0hlaWdodCA9ICRlbGVtLnBhcmVudCgpLmNsb3Nlc3QoJ3VsJykuZGF0YSgnY2FsY0hlaWdodCcpO1xuICAgICAgdGhpcy4kd3JhcHBlci5jc3MoeyBoZWlnaHQ6IGNhbGNIZWlnaHQgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgbWVudSBpcyBjbG9zaW5nLlxuICAgICAqIEBldmVudCBEcmlsbGRvd24jY2xvc2VcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlLnpmLmRyaWxsZG93bicpO1xuXG4gICAgJGVsZW0ub25lKHRyYW5zaXRpb25lbmQoJGVsZW0pLCAoKSA9PiB7XG4gICAgICAkZWxlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcnKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBtZW51IGlzIGZ1bGx5IGNsb3NlZC5cbiAgICAgICAqIEBldmVudCBEcmlsbGRvd24jY2xvc2VkXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLmRyaWxsZG93bicpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgZm9yIGVhY2ggYGJhY2tgIGJ1dHRvbiwgYW5kIGNsb3NlcyBvcGVuIG1lbnVzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNiYWNrXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IHN1Yi1tZW51IHRvIGFkZCBgYmFja2AgZXZlbnQuXG4gICAqL1xuICBfYmFjaygkZWxlbSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgJGVsZW0ub2ZmKCdjbGljay56Zi5kcmlsbGRvd24nKTtcbiAgICAkZWxlbS5jaGlsZHJlbignLmpzLWRyaWxsZG93bi1iYWNrJylcbiAgICAgIC5vbignY2xpY2suemYuZHJpbGxkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl9oaWRlKCRlbGVtKTtcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHBhcmVudCBzdWJtZW51LCBjYWxsIHNob3dcbiAgICAgICAgbGV0IHBhcmVudFN1Yk1lbnUgPSAkZWxlbS5wYXJlbnQoJ2xpJykucGFyZW50KCd1bCcpLnBhcmVudCgnbGknKTtcbiAgICAgICAgaWYgKHBhcmVudFN1Yk1lbnUubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXMuX3Nob3cocGFyZW50U3ViTWVudSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJGN1cnJlbnRNZW51ID0gX3RoaXMuJGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gbWVudSBpdGVtcyB3L28gc3VibWVudXMgdG8gY2xvc2Ugb3BlbiBtZW51cyBvbiBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWVudUxpbmtFdmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiRtZW51SXRlbXMubm90KCcuaXMtZHJpbGxkb3duLXN1Ym1lbnUtcGFyZW50JylcbiAgICAgICAgLm9mZignY2xpY2suemYuZHJpbGxkb3duJylcbiAgICAgICAgLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuX2hpZGVBbGwoKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIENTUyBjbGFzc2VzIGZvciBzdWJtZW51IHRvIHNob3cgaXQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgdGFyZ2V0IHN1Ym1lbnUgKGB1bGAgdGFnKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaWdnZXIgLSB0cmlnZ2VyIGRyaWxsZG93biBldmVudFxuICAgKi9cbiAgX3NldFNob3dTdWJNZW51Q2xhc3NlcygkZWxlbSwgdHJpZ2dlcikge1xuICAgICRlbGVtLmFkZENsYXNzKCdpcy1hY3RpdmUnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJykuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gICAgJGVsZW0ucGFyZW50KCdsaScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICBpZiAodHJpZ2dlciA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuLnpmLmRyaWxsZG93bicsIFskZWxlbV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBDU1MgY2xhc3NlcyBmb3Igc3VibWVudSB0byBoaWRlIGl0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIHRhcmdldCBzdWJtZW51IChgdWxgIHRhZylcbiAgICogQHBhcmFtIHtib29sZWFufSB0cmlnZ2VyIC0gdHJpZ2dlciBkcmlsbGRvd24gZXZlbnRcbiAgICovXG4gIF9zZXRIaWRlU3ViTWVudUNsYXNzZXMoJGVsZW0sIHRyaWdnZXIpIHtcbiAgICAkZWxlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgJGVsZW0ucGFyZW50KCdsaScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgaWYgKHRyaWdnZXIgPT09IHRydWUpIHtcbiAgICAgICRlbGVtLnRyaWdnZXIoJ2hpZGUuemYuZHJpbGxkb3duJywgWyRlbGVtXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgc3BlY2lmaWMgZHJpbGxkb3duIChzdWIpbWVudSBubyBtYXR0ZXIgd2hpY2ggKHN1YiltZW51IGluIGl0IGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICAgKiBDb21wYXJlZCB0byBfc2hvdygpIHRoaXMgbGV0cyB5b3UganVtcCBpbnRvIGFueSBzdWJtZW51IHdpdGhvdXQgY2xpY2tpbmcgdGhyb3VnaCBldmVyeSBzdWJtZW51IG9uIHRoZSB3YXkgdG8gaXQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI29wZW5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIHRhcmdldCAoc3ViKW1lbnUgKGB1bGAgdGFnKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9Gb2N1cyAtIGlmIHRydWUgdGhlIGZpcnN0IGxpbmsgaW4gdGhlIHRhcmdldCAoc3ViKW1lbnUgZ2V0cyBhdXRvIGZvY3VzZWRcbiAgICovXG4gIF9zaG93TWVudSgkZWxlbSwgYXV0b0ZvY3VzKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gUmVzZXQgZHJpbGxkb3duXG4gICAgdmFyICRleHBhbmRlZFN1Ym1lbnVzID0gdGhpcy4kZWxlbWVudC5maW5kKCdsaVthcmlhLWV4cGFuZGVkPVwidHJ1ZVwiXSA+IHVsW2RhdGEtc3VibWVudV0nKTtcbiAgICAkZXhwYW5kZWRTdWJtZW51cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuX3NldEhpZGVTdWJNZW51Q2xhc3NlcygkKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIC8vIFNhdmUgdGhlIG1lbnUgYXMgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgb25lLlxuICAgIHRoaXMuJGN1cnJlbnRNZW51ID0gJGVsZW07XG5cbiAgICAvLyBJZiB0YXJnZXQgbWVudSBpcyByb290LCBmb2N1cyBmaXJzdCBsaW5rICYgZXhpdFxuICAgIGlmICgkZWxlbS5pcygnW2RhdGEtZHJpbGxkb3duXScpKSB7XG4gICAgICBpZiAoYXV0b0ZvY3VzID09PSB0cnVlKSAkZWxlbS5maW5kKCdsaSA+IGEnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHRoaXMuJHdyYXBwZXIuY3NzKCdoZWlnaHQnLCAkZWxlbS5kYXRhKCdjYWxjSGVpZ2h0JykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYWxsIHN1Ym1lbnVzIG9uIHdheSB0byByb290IGluY2wuIHRoZSBlbGVtZW50IGl0c2VsZlxuICAgIHZhciAkc3VibWVudXMgPSAkZWxlbS5jaGlsZHJlbigpLmZpcnN0KCkucGFyZW50c1VudGlsKCdbZGF0YS1kcmlsbGRvd25dJywgJ1tkYXRhLXN1Ym1lbnVdJyk7XG5cbiAgICAvLyBPcGVuIHRhcmdldCBtZW51IGFuZCBhbGwgc3VibWVudXMgb24gaXRzIHdheSB0byByb290XG4gICAgJHN1Ym1lbnVzLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgLy8gVXBkYXRlIGhlaWdodCBvZiBmaXJzdCBjaGlsZCAodGFyZ2V0IG1lbnUpIGlmIGF1dG9IZWlnaHQgb3B0aW9uIHRydWVcbiAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBfdGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgX3RoaXMuJHdyYXBwZXIuY3NzKCdoZWlnaHQnLCAkKHRoaXMpLmRhdGEoJ2NhbGNIZWlnaHQnKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpc0xhc3RDaGlsZCA9IGluZGV4ID09PSAkc3VibWVudXMubGVuZ3RoIC0gMTtcblxuICAgICAgLy8gQWRkIHRyYW5zaXRpb25zZW5kIGxpc3RlbmVyIHRvIGxhc3QgY2hpbGQgKHJvb3QgZHVlIHRvIHJldmVyc2Ugb3JkZXIpIHRvIG9wZW4gdGFyZ2V0IG1lbnUncyBmaXJzdCBsaW5rXG4gICAgICAvLyBMYXN0IGNoaWxkIG1ha2VzIHN1cmUgdGhlIGV2ZW50IGdldHMgYWx3YXlzIHRyaWdnZXJlZCBldmVuIGlmIGdvaW5nIHRocm91Z2ggc2V2ZXJhbCBtZW51c1xuICAgICAgaWYgKGlzTGFzdENoaWxkID09PSB0cnVlKSB7XG4gICAgICAgICQodGhpcykub25lKHRyYW5zaXRpb25lbmQoJCh0aGlzKSksICgpID0+IHtcbiAgICAgICAgICBpZiAoYXV0b0ZvY3VzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkZWxlbS5maW5kKCdsaSA+IGEnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuX3NldFNob3dTdWJNZW51Q2xhc3NlcygkKHRoaXMpLCBpc0xhc3RDaGlsZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYSBzdWJtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNvcGVuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IGVsZW1lbnQgd2l0aCBhIHN1Ym1lbnUgdG8gb3BlbiwgaS5lLiB0aGUgYGxpYCB0YWcuXG4gICAqL1xuICBfc2hvdygkZWxlbSkge1xuICAgIGNvbnN0ICRzdWJtZW51ID0gJGVsZW0uY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJyk7XG5cbiAgICAkZWxlbS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICB0aGlzLiRjdXJyZW50TWVudSA9ICRzdWJtZW51O1xuXG4gICAgLy9oaWRlIGRyaWxsZG93biBwYXJlbnQgbWVudSB3aGVuIHN1Ym1lbnUgaXMgb3BlblxuICAgIC8vIHRoaXMgcmVtb3ZlcyBpdCBmcm9tIHRoZSBkb20gc28gdGhhdCB0aGUgdGFiIGtleSB3aWxsIHRha2UgdGhlIHVzZXIgdG8gdGhlIG5leHQgdmlzaWJsZSBlbGVtZW50XG4gICAgJGVsZW0ucGFyZW50KCkuY2xvc2VzdCgndWwnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICAvLyBhZGQgdmlzaWJsZSBjbGFzcyB0byBzdWJtZW51IHRvIG92ZXJyaWRlIGludmlzaWJsZSBjbGFzcyBhYm92ZVxuICAgICRzdWJtZW51LmFkZENsYXNzKCdpcy1hY3RpdmUgdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKS5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgdGhpcy4kd3JhcHBlci5jc3MoeyBoZWlnaHQ6ICRzdWJtZW51LmRhdGEoJ2NhbGNIZWlnaHQnKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBzdWJtZW51IGhhcyBvcGVuZWQuXG4gICAgICogQGV2ZW50IERyaWxsZG93biNvcGVuXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuLnpmLmRyaWxsZG93bicsIFskZWxlbV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGEgc3VibWVudVxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNoaWRlXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IHN1Yi1tZW51IHRvIGhpZGUsIGkuZS4gdGhlIGB1bGAgdGFnLlxuICAgKi9cbiAgX2hpZGUoJGVsZW0pIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkgdGhpcy4kd3JhcHBlci5jc3Moe2hlaWdodDokZWxlbS5wYXJlbnQoKS5jbG9zZXN0KCd1bCcpLmRhdGEoJ2NhbGNIZWlnaHQnKX0pO1xuICAgICRlbGVtLnBhcmVudCgpLmNsb3Nlc3QoJ3VsJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICRlbGVtLnBhcmVudCgnbGknKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICRlbGVtLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgJGVsZW0uYWRkQ2xhc3MoJ2lzLWNsb3NpbmcnKVxuICAgICAgICAgLm9uZSh0cmFuc2l0aW9uZW5kKCRlbGVtKSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgJGVsZW0ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZSBpcy1jbG9zaW5nIHZpc2libGUnKTtcbiAgICAgICAgICAgJGVsZW0uYmx1cigpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHN1Ym1lbnUgaGFzIGNsb3NlZC5cbiAgICAgKiBAZXZlbnQgRHJpbGxkb3duI2hpZGVcbiAgICAgKi9cbiAgICAkZWxlbS50cmlnZ2VyKCdoaWRlLnpmLmRyaWxsZG93bicsIFskZWxlbV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRocm91Z2ggdGhlIG5lc3RlZCBtZW51cyB0byBjYWxjdWxhdGUgdGhlIG1pbi1oZWlnaHQsIGFuZCBtYXgtd2lkdGggZm9yIHRoZSBtZW51LlxuICAgKiBQcmV2ZW50cyBjb250ZW50IGp1bXBpbmcuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldE1heERpbXMoKSB7XG4gICAgdmFyIG1heEhlaWdodCA9IDAsIHJlc3VsdCA9IHt9LCBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBSZWNhbGN1bGF0ZSBtZW51IGhlaWdodHMgYW5kIHRvdGFsIG1heCBoZWlnaHRcbiAgICB0aGlzLiRzdWJtZW51cy5hZGQodGhpcy4kZWxlbWVudCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyIGhlaWdodCA9IEJveC5HZXREaW1lbnNpb25zKHRoaXMpLmhlaWdodDtcblxuICAgICAgbWF4SGVpZ2h0ID0gaGVpZ2h0ID4gbWF4SGVpZ2h0ID8gaGVpZ2h0IDogbWF4SGVpZ2h0O1xuXG4gICAgICBpZihfdGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdjYWxjSGVpZ2h0JyxoZWlnaHQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KVxuICAgICAgcmVzdWx0LmhlaWdodCA9IHRoaXMuJGN1cnJlbnRNZW51LmRhdGEoJ2NhbGNIZWlnaHQnKTtcbiAgICBlbHNlXG4gICAgICByZXN1bHRbJ21pbi1oZWlnaHQnXSA9IGAke21heEhlaWdodH1weGA7XG5cbiAgICByZXN1bHRbJ21heC13aWR0aCddID0gYCR7dGhpcy4kZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aH1weGA7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBEcmlsbGRvd24gTWVudVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgICQoJ2JvZHknKS5vZmYoJy56Zi5kcmlsbGRvd24nKTtcbiAgICBpZih0aGlzLm9wdGlvbnMuc2Nyb2xsVG9wKSB0aGlzLiRlbGVtZW50Lm9mZignLnpmLmRyaWxsZG93bicsdGhpcy5fYmluZEhhbmRsZXIpO1xuICAgIHRoaXMuX2hpZGVBbGwoKTtcblx0ICB0aGlzLiRlbGVtZW50Lm9mZignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgIE5lc3QuQnVybih0aGlzLiRlbGVtZW50LCAnZHJpbGxkb3duJyk7XG4gICAgdGhpcy4kZWxlbWVudC51bndyYXAoKVxuICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrLCAuaXMtc3VibWVudS1wYXJlbnQtaXRlbScpLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgIC5lbmQoKS5maW5kKCcuaXMtYWN0aXZlLCAuaXMtY2xvc2luZywgLmlzLWRyaWxsZG93bi1zdWJtZW51JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZSBpcy1jbG9zaW5nIGlzLWRyaWxsZG93bi1zdWJtZW51Jykub2ZmKCd0cmFuc2l0aW9uZW5kIG90cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQnKVxuICAgICAgICAgICAgICAgICAuZW5kKCkuZmluZCgnW2RhdGEtc3VibWVudV0nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCByb2xlJyk7XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykub2ZmKCcuemYuZHJpbGxkb3duJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWlzLXBhcmVudC1saW5rXScpLmRldGFjaCgpO1xuICAgIHRoaXMuJHN1Ym1lbnVzLnJlbW92ZUNsYXNzKCdkcmlsbGRvd24tc3VibWVudS1jb3Zlci1wcmV2aW91cyBpbnZpc2libGUnKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkbGluayA9ICQodGhpcyk7XG4gICAgICAkbGluay5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgaWYoJGxpbmsuZGF0YSgnc2F2ZWRIcmVmJykpe1xuICAgICAgICAkbGluay5hdHRyKCdocmVmJywgJGxpbmsuZGF0YSgnc2F2ZWRIcmVmJykpLnJlbW92ZURhdGEoJ3NhdmVkSHJlZicpO1xuICAgICAgfWVsc2V7IHJldHVybjsgfVxuICAgIH0pO1xuICB9O1xufVxuXG5EcmlsbGRvd24uZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBEcmlsbGRvd25zIGRlcGVuZCBvbiBzdHlsZXMgaW4gb3JkZXIgdG8gZnVuY3Rpb24gcHJvcGVybHk7IGluIHRoZSBkZWZhdWx0IGJ1aWxkIG9mIEZvdW5kYXRpb24gdGhlc2UgYXJlXG4gICAqIG9uIHRoZSBgZHJpbGxkb3duYCBjbGFzcy4gVGhpcyBvcHRpb24gYXV0by1hcHBsaWVzIHRoaXMgY2xhc3MgdG8gdGhlIGRyaWxsZG93biB1cG9uIGluaXRpYWxpemF0aW9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvQXBwbHlDbGFzczogdHJ1ZSxcbiAgLyoqXG4gICAqIE1hcmt1cCB1c2VkIGZvciBKUyBnZW5lcmF0ZWQgYmFjayBidXR0b24uIFByZXBlbmRlZCAgb3IgYXBwZW5kZWQgKHNlZSBiYWNrQnV0dG9uUG9zaXRpb24pIHRvIHN1Ym1lbnUgbGlzdHMgYW5kIGRlbGV0ZWQgb24gYGRlc3Ryb3lgIG1ldGhvZCwgJ2pzLWRyaWxsZG93bi1iYWNrJyBjbGFzcyByZXF1aXJlZC4gUmVtb3ZlIHRoZSBiYWNrc2xhc2ggKGBcXGApIGlmIGNvcHkgYW5kIHBhc3RpbmcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJzxsaSBjbGFzcz1cImpzLWRyaWxsZG93bi1iYWNrXCI+PGEgdGFiaW5kZXg9XCIwXCI+QmFjazwvYT48L2xpPidcbiAgICovXG4gIGJhY2tCdXR0b246ICc8bGkgY2xhc3M9XCJqcy1kcmlsbGRvd24tYmFja1wiPjxhIHRhYmluZGV4PVwiMFwiPkJhY2s8L2E+PC9saT4nLFxuICAvKipcbiAgICogUG9zaXRpb24gdGhlIGJhY2sgYnV0dG9uIGVpdGhlciBhdCB0aGUgdG9wIG9yIGJvdHRvbSBvZiBkcmlsbGRvd24gc3VibWVudXMuIENhbiBiZSBgJ2xlZnQnYCBvciBgJ2JvdHRvbSdgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHRvcFxuICAgKi9cbiAgYmFja0J1dHRvblBvc2l0aW9uOiAndG9wJyxcbiAgLyoqXG4gICAqIE1hcmt1cCB1c2VkIHRvIHdyYXAgZHJpbGxkb3duIG1lbnUuIFVzZSBhIGNsYXNzIG5hbWUgZm9yIGluZGVwZW5kZW50IHN0eWxpbmc7IHRoZSBKUyBhcHBsaWVkIGNsYXNzOiBgaXMtZHJpbGxkb3duYCBpcyByZXF1aXJlZC4gUmVtb3ZlIHRoZSBiYWNrc2xhc2ggKGBcXGApIGlmIGNvcHkgYW5kIHBhc3RpbmcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJzxkaXY+PC9kaXY+J1xuICAgKi9cbiAgd3JhcHBlcjogJzxkaXY+PC9kaXY+JyxcbiAgLyoqXG4gICAqIEFkZHMgdGhlIHBhcmVudCBsaW5rIHRvIHRoZSBzdWJtZW51LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgcGFyZW50TGluazogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgbWVudSB0byByZXR1cm4gdG8gcm9vdCBsaXN0IG9uIGJvZHkgY2xpY2suXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgdGhlIG1lbnUgdG8gYXV0byBhZGp1c3QgaGVpZ2h0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYXV0b0hlaWdodDogZmFsc2UsXG4gIC8qKlxuICAgKiBBbmltYXRlIHRoZSBhdXRvIGFkanVzdCBoZWlnaHQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbmltYXRlSGVpZ2h0OiBmYWxzZSxcbiAgLyoqXG4gICAqIFNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBtZW51IGFmdGVyIG9wZW5pbmcgYSBzdWJtZW51IG9yIG5hdmlnYXRpbmcgYmFjayB1c2luZyB0aGUgbWVudSBiYWNrIGJ1dHRvblxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgc2Nyb2xsVG9wOiBmYWxzZSxcbiAgLyoqXG4gICAqIFN0cmluZyBqcXVlcnkgc2VsZWN0b3IgKGZvciBleGFtcGxlICdib2R5Jykgb2YgZWxlbWVudCB0byB0YWtlIG9mZnNldCgpLnRvcCBmcm9tLCBpZiBlbXB0eSBzdHJpbmcgdGhlIGRyaWxsZG93biBtZW51IG9mZnNldCgpLnRvcCBpcyB0YWtlblxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBzY3JvbGxUb3BFbGVtZW50OiAnJyxcbiAgLyoqXG4gICAqIFNjcm9sbFRvcCBvZmZzZXRcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBzY3JvbGxUb3BPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBTY3JvbGwgYW5pbWF0aW9uIGR1cmF0aW9uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwXG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNTAwLFxuICAvKipcbiAgICogU2Nyb2xsIGFuaW1hdGlvbiBlYXNpbmcuIENhbiBiZSBgJ3N3aW5nJ2Agb3IgYCdsaW5lYXInYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAc2VlIHtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FuaW1hdGV8SlF1ZXJ5IGFuaW1hdGV9XG4gICAqIEBkZWZhdWx0ICdzd2luZydcbiAgICovXG4gIGFuaW1hdGlvbkVhc2luZzogJ3N3aW5nJ1xuICAvLyBob2xkT3BlbjogZmFsc2Vcbn07XG5cbmV4cG9ydCB7RHJpbGxkb3dufTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IEdldFlvRGlnaXRzLCBpZ25vcmVNb3VzZWRpc2FwcGVhciB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IFBvc2l0aW9uYWJsZSB9IGZyb20gJy4vZm91bmRhdGlvbi5wb3NpdGlvbmFibGUnO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcbmltcG9ydCB7IFRvdWNoIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudG91Y2gnXG5cbi8qKlxuICogRHJvcGRvd24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmRyb3Bkb3duXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50b3VjaFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5jbGFzcyBEcm9wZG93biBleHRlbmRzIFBvc2l0aW9uYWJsZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIGEgZHJvcGRvd24uXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBEcm9wZG93blxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGEgZHJvcGRvd24uXG4gICAqICAgICAgICBPYmplY3Qgc2hvdWxkIGJlIG9mIHRoZSBkcm9wZG93biBwYW5lbCwgcmF0aGVyIHRoYW4gaXRzIGFuY2hvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJvcGRvd24uZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdEcm9wZG93bic7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgLy8gVG91Y2ggYW5kIFRyaWdnZXJzIGluaXQgYXJlIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgdGhleSBhcmUgaW5pdGlhbGl6ZWRcbiAgICBUb3VjaC5pbml0KCQpO1xuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignRHJvcGRvd24nLCB7XG4gICAgICAnRU5URVInOiAndG9nZ2xlJyxcbiAgICAgICdTUEFDRSc6ICd0b2dnbGUnLFxuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZSdcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luIGJ5IHNldHRpbmcvY2hlY2tpbmcgb3B0aW9ucyBhbmQgYXR0cmlidXRlcywgYWRkaW5nIGhlbHBlciB2YXJpYWJsZXMsIGFuZCBzYXZpbmcgdGhlIGFuY2hvci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgJGlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuXG4gICAgdGhpcy4kYW5jaG9ycyA9ICQoYFtkYXRhLXRvZ2dsZT1cIiR7JGlkfVwiXWApLmxlbmd0aCA/ICQoYFtkYXRhLXRvZ2dsZT1cIiR7JGlkfVwiXWApIDogJChgW2RhdGEtb3Blbj1cIiR7JGlkfVwiXWApO1xuICAgIHRoaXMuJGFuY2hvcnMuYXR0cih7XG4gICAgICAnYXJpYS1jb250cm9scyc6ICRpZCxcbiAgICAgICdkYXRhLWlzLWZvY3VzJzogZmFsc2UsXG4gICAgICAnZGF0YS15ZXRpLWJveCc6ICRpZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICdhcmlhLWV4cGFuZGVkJzogZmFsc2VcbiAgICB9KTtcblxuICAgIHRoaXMuX3NldEN1cnJlbnRBbmNob3IodGhpcy4kYW5jaG9ycy5maXJzdCgpKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5wYXJlbnRDbGFzcyl7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLiRlbGVtZW50LnBhcmVudHMoJy4nICsgdGhpcy5vcHRpb25zLnBhcmVudENsYXNzKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuJHBhcmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2V0IFthcmlhLWxhYmVsbGVkYnldIG9uIHRoZSBEcm9wZG93biBpZiBpdCBpcyBub3Qgc2V0XG4gICAgaWYgKHR5cGVvZiB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtbGFiZWxsZWRieScpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gR2V0IHRoZSBhbmNob3IgSUQgb3IgY3JlYXRlIG9uZVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLiRjdXJyZW50QW5jaG9yLmF0dHIoJ2lkJykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuJGN1cnJlbnRBbmNob3IuYXR0cignaWQnLCBHZXRZb0RpZ2l0cyg2LCAnZGQtYW5jaG9yJykpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIHRoaXMuJGN1cnJlbnRBbmNob3IuYXR0cignaWQnKSk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICdkYXRhLXlldGktYm94JzogJGlkLFxuICAgICAgJ2RhdGEtcmVzaXplJzogJGlkLFxuICAgIH0pO1xuXG4gICAgc3VwZXIuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIF9nZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgLy8gaGFuZGxlIGxlZ2FjeSBjbGFzc25hbWVzXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUubWF0Y2goLyh0b3B8bGVmdHxyaWdodHxib3R0b20pL2cpO1xuICAgIGlmKHBvc2l0aW9uKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb25bMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYm90dG9tJ1xuICAgIH1cbiAgfVxuXG4gIF9nZXREZWZhdWx0QWxpZ25tZW50KCkge1xuICAgIC8vIGhhbmRsZSBsZWdhY3kgZmxvYXQgYXBwcm9hY2hcbiAgICB2YXIgaG9yaXpvbnRhbFBvc2l0aW9uID0gL2Zsb2F0LShcXFMrKS8uZXhlYyh0aGlzLiRjdXJyZW50QW5jaG9yLmF0dHIoJ2NsYXNzJykpO1xuICAgIGlmKGhvcml6b250YWxQb3NpdGlvbikge1xuICAgICAgcmV0dXJuIGhvcml6b250YWxQb3NpdGlvblsxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuX2dldERlZmF1bHRBbGlnbm1lbnQoKTtcbiAgfVxuXG5cblxuICAvKipcbiAgICogU2V0cyB0aGUgcG9zaXRpb24gYW5kIG9yaWVudGF0aW9uIG9mIHRoZSBkcm9wZG93biBwYW5lLCBjaGVja3MgZm9yIGNvbGxpc2lvbnMgaWYgYWxsb3ctb3ZlcmxhcCBpcyBub3QgdHJ1ZS5cbiAgICogUmVjdXJzaXZlbHkgY2FsbHMgaXRzZWxmIGlmIGEgY29sbGlzaW9uIGlzIGRldGVjdGVkLCB3aXRoIGEgbmV3IHBvc2l0aW9uIGNsYXNzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRQb3NpdGlvbigpIHtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKGBoYXMtcG9zaXRpb24tJHt0aGlzLnBvc2l0aW9ufSBoYXMtYWxpZ25tZW50LSR7dGhpcy5hbGlnbm1lbnR9YCk7XG4gICAgc3VwZXIuX3NldFBvc2l0aW9uKHRoaXMuJGN1cnJlbnRBbmNob3IsIHRoaXMuJGVsZW1lbnQsIHRoaXMuJHBhcmVudCk7XG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhgaGFzLXBvc2l0aW9uLSR7dGhpcy5wb3NpdGlvbn0gaGFzLWFsaWdubWVudC0ke3RoaXMuYWxpZ25tZW50fWApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgaXQgYSBjdXJyZW50IGFuY2hvci5cbiAgICogQ3VycmVudCBhbmNob3IgYXMgdGhlIHJlZmVyZW5jZSBmb3IgdGhlIHBvc2l0aW9uIG9mIERyb3Bkb3duIHBhbmVzLlxuICAgKiBAcGFyYW0ge0hUTUx9IGVsIC0gRE9NIGVsZW1lbnQgb2YgdGhlIGFuY2hvci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0Q3VycmVudEFuY2hvcihlbCkge1xuICAgIHRoaXMuJGN1cnJlbnRBbmNob3IgPSAkKGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgZWxlbWVudCB1dGlsaXppbmcgdGhlIHRyaWdnZXJzIHV0aWxpdHkgbGlicmFyeS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGhhc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8ICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCAhPT0gJ3VuZGVmaW5lZCcpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IHRoaXMuX3NldFBvc2l0aW9uLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIHRoaXMuJGFuY2hvcnMub2ZmKCdjbGljay56Zi50cmlnZ2VyJylcbiAgICAgIC5vbignY2xpY2suemYudHJpZ2dlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgX3RoaXMuX3NldEN1cnJlbnRBbmNob3IodGhpcyk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIC8vIGlmIGZvcmNlRm9sbG93IGZhbHNlLCBhbHdheXMgcHJldmVudCBkZWZhdWx0IGFjdGlvblxuICAgICAgICAgIChfdGhpcy5vcHRpb25zLmZvcmNlRm9sbG93ID09PSBmYWxzZSkgfHxcbiAgICAgICAgICAvLyBpZiBmb3JjZUZvbGxvdyB0cnVlIGFuZCBob3ZlciBvcHRpb24gdHJ1ZSwgb25seSBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIG9uIDFzdCBjbGlja1xuICAgICAgICAgIC8vIG9uIDJuZCBjbGljayAoZHJvcG93biBvcGVuZWQpIHRoZSBkZWZhdWx0IGFjdGlvbiAoZS5nLiBmb2xsb3cgYSBocmVmKSBnZXRzIGV4ZWN1dGVkXG4gICAgICAgICAgKGhhc1RvdWNoICYmIF90aGlzLm9wdGlvbnMuaG92ZXIgJiYgX3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSA9PT0gZmFsc2UpXG4gICAgICAgICkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmhvdmVyKXtcbiAgICAgIHRoaXMuJGFuY2hvcnMub2ZmKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duIG1vdXNlbGVhdmUuemYuZHJvcGRvd24nKVxuICAgICAgLm9uKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgX3RoaXMuX3NldEN1cnJlbnRBbmNob3IodGhpcyk7XG5cbiAgICAgICAgdmFyIGJvZHlEYXRhID0gJCgnYm9keScpLmRhdGEoKTtcbiAgICAgICAgaWYodHlwZW9mKGJvZHlEYXRhLndoYXRpbnB1dCkgPT09ICd1bmRlZmluZWQnIHx8IGJvZHlEYXRhLndoYXRpbnB1dCA9PT0gJ21vdXNlJykge1xuICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZGF0YSgnaG92ZXInLCB0cnVlKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9KS5vbignbW91c2VsZWF2ZS56Zi5kcm9wZG93bicsIGlnbm9yZU1vdXNlZGlzYXBwZWFyKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIF90aGlzLiRhbmNob3JzLmRhdGEoJ2hvdmVyJywgZmFsc2UpO1xuICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgfSkpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmhvdmVyUGFuZSl7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duIG1vdXNlbGVhdmUuemYuZHJvcGRvd24nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd24nLCBpZ25vcmVNb3VzZWRpc2FwcGVhcihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4kYW5jaG9ycy5hZGQodGhpcy4kZWxlbWVudCkub24oJ2tleWRvd24uemYuZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciAkdGFyZ2V0ID0gJCh0aGlzKTtcblxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcm9wZG93bicsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoX3RoaXMuJGFuY2hvcnMpICYmICEkdGFyZ2V0LmlzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgX3RoaXMub3BlbigpO1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCAtMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgIF90aGlzLiRhbmNob3JzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgYm9keSB0byBjbG9zZSBhbnkgZHJvcGRvd25zIG9uIGEgY2xpY2suXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEJvZHlIYW5kbGVyKCkge1xuICAgICB2YXIgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpLm5vdCh0aGlzLiRlbGVtZW50KSxcbiAgICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgJGJvZHkub2ZmKCdjbGljay56Zi5kcm9wZG93biB0YXAuemYuZHJvcGRvd24nKVxuICAgICAgICAgIC5vbignY2xpY2suemYuZHJvcGRvd24gdGFwLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmKF90aGlzLiRhbmNob3JzLmlzKGUudGFyZ2V0KSB8fCBfdGhpcy4kYW5jaG9ycy5maW5kKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3RoaXMuJGVsZW1lbnQuaXMoZS50YXJnZXQpIHx8IF90aGlzLiRlbGVtZW50LmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgJGJvZHkub2ZmKCdjbGljay56Zi5kcm9wZG93biB0YXAuemYuZHJvcGRvd24nKTtcbiAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gcGFuZSwgYW5kIGZpcmVzIGEgYnViYmxpbmcgZXZlbnQgdG8gY2xvc2Ugb3RoZXIgZHJvcGRvd25zLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyb3Bkb3duI2Nsb3NlbWVcbiAgICogQGZpcmVzIERyb3Bkb3duI3Nob3dcbiAgICovXG4gIG9wZW4oKSB7XG4gICAgLy8gdmFyIF90aGlzID0gdGhpcztcbiAgICAvKipcbiAgICAgKiBGaXJlcyB0byBjbG9zZSBvdGhlciBvcGVuIGRyb3Bkb3ducywgdHlwaWNhbGx5IHdoZW4gZHJvcGRvd24gaXMgb3BlbmluZ1xuICAgICAqIEBldmVudCBEcm9wZG93biNjbG9zZW1lXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZW1lLnpmLmRyb3Bkb3duJywgdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpKTtcbiAgICB0aGlzLiRhbmNob3JzLmFkZENsYXNzKCdob3ZlcicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1leHBhbmRlZCc6IHRydWV9KTtcbiAgICAvLyB0aGlzLiRlbGVtZW50Lyouc2hvdygpKi87XG5cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1vcGVuaW5nJyk7XG4gICAgdGhpcy5fc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuaW5nJykuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogZmFsc2V9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMpe1xuICAgICAgdmFyICRmb2N1c2FibGUgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgaWYoJGZvY3VzYWJsZS5sZW5ndGgpe1xuICAgICAgICAkZm9jdXNhYmxlLmVxKDApLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayl7IHRoaXMuX2FkZEJvZHlIYW5kbGVyKCk7IH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzKSB7XG4gICAgICBLZXlib2FyZC50cmFwRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgb25jZSB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZS5cbiAgICAgKiBAZXZlbnQgRHJvcGRvd24jc2hvd1xuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvdy56Zi5kcm9wZG93bicsIFt0aGlzLiRlbGVtZW50XSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBvcGVuIGRyb3Bkb3duIHBhbmUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jaGlkZVxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAuYXR0cih7J2FyaWEtaGlkZGVuJzogdHJ1ZX0pO1xuXG4gICAgdGhpcy4kYW5jaG9ycy5yZW1vdmVDbGFzcygnaG92ZXInKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIG9uY2UgdGhlIGRyb3Bkb3duIGlzIG5vIGxvbmdlciB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93biNoaWRlXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdoaWRlLnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhcEZvY3VzKSB7XG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIHBhbmUncyB2aXNpYmlsaXR5LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZih0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpe1xuICAgICAgaWYodGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicpKSByZXR1cm47XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGRyb3Bkb3duLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYudHJpZ2dlcicpLmhpZGUoKTtcbiAgICB0aGlzLiRhbmNob3JzLm9mZignLnpmLmRyb3Bkb3duJyk7XG4gICAgJChkb2N1bWVudC5ib2R5KS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicpO1xuXG4gIH1cbn1cblxuRHJvcGRvd24uZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBDbGFzcyB0aGF0IGRlc2lnbmF0ZXMgYm91bmRpbmcgY29udGFpbmVyIG9mIERyb3Bkb3duIChkZWZhdWx0OiB3aW5kb3cpXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHBhcmVudENsYXNzOiBudWxsLFxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgdG8gZGVsYXkgb3BlbmluZyBhIHN1Ym1lbnUgb24gaG92ZXIgZXZlbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMjUwXG4gICAqL1xuICBob3ZlckRlbGF5OiAyNTAsXG4gIC8qKlxuICAgKiBBbGxvdyBzdWJtZW51cyB0byBvcGVuIG9uIGhvdmVyIGV2ZW50c1xuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaG92ZXI6IGZhbHNlLFxuICAvKipcbiAgICogRG9uJ3QgY2xvc2UgZHJvcGRvd24gd2hlbiBob3ZlcmluZyBvdmVyIGRyb3Bkb3duIHBhbmVcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGhvdmVyUGFuZTogZmFsc2UsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gdGhlIGRyb3Bkb3duIHBhbmUgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnQgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICB2T2Zmc2V0OiAwLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyBiZXR3ZWVuIHRoZSBkcm9wZG93biBwYW5lIGFuZCB0aGUgdHJpZ2dlcmluZyBlbGVtZW50IG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgaE9mZnNldDogMCxcbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIGRyb3Bkb3duLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgcG9zaXRpb246ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsaWdubWVudCBvZiBkcm9wZG93biByZWxhdGl2ZSB0byBhbmNob3IuIENhbiBiZSBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIGNlbnRlciwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIGFsaWdubWVudDogJ2F1dG8nLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBjb250YWluZXIvd2luZG93LiBJZiBmYWxzZSwgZHJvcGRvd24gd2lsbCBmaXJzdCB0cnkgdG8gcG9zaXRpb24gYXMgZGVmaW5lZCBieSBkYXRhLXBvc2l0aW9uIGFuZCBkYXRhLWFsaWdubWVudCwgYnV0IHJlcG9zaXRpb24gaWYgaXQgd291bGQgY2F1c2UgYW4gb3ZlcmZsb3cuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd092ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lci4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb25cbiAgICogYmVoYXZpb3IgZm9yIGRyb3Bkb3ducywgYWxsb3dpbmcgdGhlIGRyb3Bkb3duIHRvIGV4dGVuZCB0aGUgYm90dG9tIG9mIHRoZVxuICAgKiBzY3JlZW4gYnV0IG5vdCBvdGhlcndpc2UgaW5mbHVlbmNlIG9yIGJyZWFrIG91dCBvZiB0aGUgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhbGxvd0JvdHRvbU92ZXJsYXA6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgcGx1Z2luIHRvIHRyYXAgZm9jdXMgdG8gdGhlIGRyb3Bkb3duIHBhbmUgaWYgb3BlbmVkIHdpdGgga2V5Ym9hcmQgY29tbWFuZHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgdGhlIHBsdWdpbiB0byBzZXQgZm9jdXMgdG8gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgcGFuZSwgcmVnYXJkbGVzcyBvZiBtZXRob2Qgb2Ygb3BlbmluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9Gb2N1czogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBjbGljayBvbiB0aGUgYm9keSB0byBjbG9zZSB0aGUgZHJvcGRvd24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAvKipcbiAgICogSWYgdHJ1ZSB0aGUgZGVmYXVsdCBhY3Rpb24gb2YgdGhlIHRvZ2dsZSAoZS5nLiBmb2xsb3cgYSBsaW5rIHdpdGggaHJlZikgZ2V0cyBleGVjdXRlZCBvbiBjbGljay4gSWYgaG92ZXIgb3B0aW9uIGlzIGFsc28gdHJ1ZSB0aGUgZGVmYXVsdCBhY3Rpb24gZ2V0cyBwcmV2ZW50ZWQgb24gZmlyc3QgY2xpY2sgZm9yIG1vYmlsZSAvIHRvdWNoIGRldmljZXMgYW5kIGV4ZWN1dGVkIG9uIHNlY29uZCBjbGljay5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgZm9yY2VGb2xsb3c6IHRydWVcbn07XG5cbmV4cG9ydCB7RHJvcGRvd259O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnBsdWdpbic7XG5pbXBvcnQgeyBydGwgYXMgUnRsLCBpZ25vcmVNb3VzZWRpc2FwcGVhciB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTmVzdCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuYm94JztcbmltcG9ydCB7IFRvdWNoIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudG91Y2gnXG5cblxuLyoqXG4gKiBEcm9wZG93bk1lbnUgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmRyb3Bkb3duTWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubmVzdFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50b3VjaFxuICovXG5cbmNsYXNzIERyb3Bkb3duTWVudSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIERyb3Bkb3duTWVudS5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIERyb3Bkb3duTWVudVxuICAgKiBAZmlyZXMgRHJvcGRvd25NZW51I2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhIGRyb3Bkb3duIG1lbnUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIERyb3Bkb3duTWVudS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0Ryb3Bkb3duTWVudSc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgVG91Y2guaW5pdCgkKTsgLy8gVG91Y2ggaW5pdCBpcyBpZGVtcG90ZW50LCB3ZSBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0J3MgaW5pdGlhbGllZC5cblxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdEcm9wZG93bk1lbnUnLCB7XG4gICAgICAnRU5URVInOiAnb3BlbicsXG4gICAgICAnU1BBQ0UnOiAnb3BlbicsXG4gICAgICAnQVJST1dfUklHSFQnOiAnbmV4dCcsXG4gICAgICAnQVJST1dfVVAnOiAndXAnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnZG93bicsXG4gICAgICAnQVJST1dfTEVGVCc6ICdwcmV2aW91cycsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwbHVnaW4sIGFuZCBjYWxscyBfcHJlcGFyZU1lbnVcbiAgICogQHByaXZhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBOZXN0LkZlYXRoZXIodGhpcy4kZWxlbWVudCwgJ2Ryb3Bkb3duJyk7XG5cbiAgICB2YXIgc3VicyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKTtcbiAgICB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5jaGlsZHJlbignLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKS5hZGRDbGFzcygnZmlyc3Qtc3ViJyk7XG5cbiAgICB0aGlzLiRtZW51SXRlbXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpW3JvbGU9XCJub25lXCJdJyk7XG4gICAgdGhpcy4kdGFicyA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJ2xpW3JvbGU9XCJub25lXCJdJyk7XG4gICAgdGhpcy4kdGFicy5maW5kKCd1bC5pcy1kcm9wZG93bi1zdWJtZW51JykuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnZlcnRpY2FsQ2xhc3MpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdhdXRvJykge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcyh0aGlzLm9wdGlvbnMucmlnaHRDbGFzcykgfHwgUnRsKCkgfHwgdGhpcy4kZWxlbWVudC5wYXJlbnRzKCcudG9wLWJhci1yaWdodCcpLmlzKCcqJykpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPSAncmlnaHQnO1xuICAgICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtbGVmdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsaWdubWVudCA9ICdsZWZ0JztcbiAgICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLXJpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBzdWJzLmFkZENsYXNzKCdvcGVucy1sZWZ0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLXJpZ2h0Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9O1xuXG4gIF9pc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLiR0YWJzLmNzcygnZGlzcGxheScpID09PSAnYmxvY2snIHx8IHRoaXMuJGVsZW1lbnQuY3NzKCdmbGV4LWRpcmVjdGlvbicpID09PSAnY29sdW1uJztcbiAgfVxuXG4gIF9pc1J0bCgpIHtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWxpZ24tcmlnaHQnKSB8fCAoUnRsKCkgJiYgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FsaWduLWxlZnQnKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gZWxlbWVudHMgd2l0aGluIHRoZSBtZW51XG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBoYXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgIT09ICd1bmRlZmluZWQnKSxcbiAgICAgICAgcGFyQ2xhc3MgPSAnaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnO1xuXG4gICAgLy8gdXNlZCBmb3Igb25DbGljayBhbmQgaW4gdGhlIGtleWJvYXJkIGhhbmRsZXJzXG4gICAgdmFyIGhhbmRsZUNsaWNrRm4gPSBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGVsZW0gPSAkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgYC4ke3BhckNsYXNzfWApLFxuICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKSxcbiAgICAgICAgICBoYXNDbGlja2VkID0gJGVsZW0uYXR0cignZGF0YS1pcy1jbGljaycpID09PSAndHJ1ZScsXG4gICAgICAgICAgJHN1YiA9ICRlbGVtLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpO1xuXG4gICAgICBpZiAoaGFzU3ViKSB7XG4gICAgICAgIGlmIChoYXNDbGlja2VkKSB7XG4gICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmNsb3NlT25DbGlja1xuICAgICAgICAgICAgfHwgKCFfdGhpcy5vcHRpb25zLmNsaWNrT3BlbiAmJiAhaGFzVG91Y2gpXG4gICAgICAgICAgICB8fCAoX3RoaXMub3B0aW9ucy5mb3JjZUZvbGxvdyAmJiBoYXNUb3VjaCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIF90aGlzLl9zaG93KCRzdWIpO1xuICAgICAgICAgICRlbGVtLmFkZCgkZWxlbS5wYXJlbnRzVW50aWwoX3RoaXMuJGVsZW1lbnQsIGAuJHtwYXJDbGFzc31gKSkuYXR0cignZGF0YS1pcy1jbGljaycsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tPcGVuIHx8IGhhc1RvdWNoKSB7XG4gICAgICB0aGlzLiRtZW51SXRlbXMub24oJ2NsaWNrLnpmLmRyb3Bkb3duTWVudSB0b3VjaHN0YXJ0LnpmLmRyb3Bkb3duTWVudScsIGhhbmRsZUNsaWNrRm4pO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBMZWFmIGVsZW1lbnQgQ2xpY2tzXG4gICAgaWYoX3RoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2tJbnNpZGUpe1xuICAgICAgdGhpcy4kbWVudUl0ZW1zLm9uKCdjbGljay56Zi5kcm9wZG93bk1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKTtcbiAgICAgICAgaWYoIWhhc1N1Yil7XG4gICAgICAgICAgX3RoaXMuX2hpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1RvdWNoICYmIHRoaXMub3B0aW9ucy5kaXNhYmxlSG92ZXJPblRvdWNoKSB0aGlzLm9wdGlvbnMuZGlzYWJsZUhvdmVyID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVIb3Zlcikge1xuICAgICAgdGhpcy4kbWVudUl0ZW1zLm9uKCdtb3VzZWVudGVyLnpmLmRyb3Bkb3duTWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICBoYXNTdWIgPSAkZWxlbS5oYXNDbGFzcyhwYXJDbGFzcyk7XG5cbiAgICAgICAgaWYgKGhhc1N1Yikge1xuICAgICAgICAgIGNsZWFyVGltZW91dCgkZWxlbS5kYXRhKCdfZGVsYXknKSk7XG4gICAgICAgICAgJGVsZW0uZGF0YSgnX2RlbGF5Jywgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fc2hvdygkZWxlbS5jaGlsZHJlbignLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKSk7XG4gICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KSk7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duTWVudScsIGlnbm9yZU1vdXNlZGlzYXBwZWFyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKTtcbiAgICAgICAgaWYgKGhhc1N1YiAmJiBfdGhpcy5vcHRpb25zLmF1dG9jbG9zZSkge1xuICAgICAgICAgIGlmICgkZWxlbS5hdHRyKCdkYXRhLWlzLWNsaWNrJykgPT09ICd0cnVlJyAmJiBfdGhpcy5vcHRpb25zLmNsaWNrT3BlbikgeyByZXR1cm4gZmFsc2U7IH1cblxuICAgICAgICAgIGNsZWFyVGltZW91dCgkZWxlbS5kYXRhKCdfZGVsYXknKSk7XG4gICAgICAgICAgJGVsZW0uZGF0YSgnX2RlbGF5Jywgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbSk7XG4gICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5jbG9zaW5nVGltZSkpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICAgIHRoaXMuJG1lbnVJdGVtcy5vbigna2V5ZG93bi56Zi5kcm9wZG93bk1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoJ3VsJywgJ1tyb2xlPVwibm9uZVwiXScpLFxuICAgICAgICAgIGlzVGFiID0gX3RoaXMuJHRhYnMuaW5kZXgoJGVsZW1lbnQpID4gLTEsXG4gICAgICAgICAgJGVsZW1lbnRzID0gaXNUYWIgPyBfdGhpcy4kdGFicyA6ICRlbGVtZW50LnNpYmxpbmdzKCdsaScpLmFkZCgkZWxlbWVudCksXG4gICAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAgICRuZXh0RWxlbWVudDtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoaS0xKTtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudHMuZXEoaSsxKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbmV4dFNpYmxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJG5leHRFbGVtZW50LmNoaWxkcmVuKCdhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSwgcHJldlNpYmxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHByZXZFbGVtZW50LmNoaWxkcmVuKCdhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSwgb3BlblN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHN1YiA9ICRlbGVtZW50LmNoaWxkcmVuKCd1bC5pcy1kcm9wZG93bi1zdWJtZW51Jyk7XG4gICAgICAgIGlmICgkc3ViLmxlbmd0aCkge1xuICAgICAgICAgIF90aGlzLl9zaG93KCRzdWIpO1xuICAgICAgICAgICRlbGVtZW50LmZpbmQoJ2xpID4gYTpmaXJzdCcpLmZvY3VzKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgeyByZXR1cm47IH1cbiAgICAgIH0sIGNsb3NlU3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vaWYgKCRlbGVtZW50LmlzKCc6Zmlyc3QtY2hpbGQnKSkge1xuICAgICAgICB2YXIgY2xvc2UgPSAkZWxlbWVudC5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpO1xuICAgICAgICBjbG9zZS5jaGlsZHJlbignYTpmaXJzdCcpLmZvY3VzKCk7XG4gICAgICAgIF90aGlzLl9oaWRlKGNsb3NlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvL31cbiAgICAgIH07XG4gICAgICB2YXIgZnVuY3Rpb25zID0ge1xuICAgICAgICBvcGVuOiBvcGVuU3ViLFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMuX2hpZGUoX3RoaXMuJGVsZW1lbnQpO1xuICAgICAgICAgIF90aGlzLiRtZW51SXRlbXMuZXEoMCkuY2hpbGRyZW4oJ2EnKS5mb2N1cygpOyAvLyBmb2N1cyB0byBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoaXNUYWIpIHtcbiAgICAgICAgaWYgKF90aGlzLl9pc1ZlcnRpY2FsKCkpIHsgLy8gdmVydGljYWwgbWVudVxuICAgICAgICAgIGlmIChfdGhpcy5faXNSdGwoKSkgeyAvLyByaWdodCBhbGlnbmVkXG4gICAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgICAgZG93bjogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHVwOiBwcmV2U2libGluZyxcbiAgICAgICAgICAgICAgbmV4dDogY2xvc2VTdWIsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBvcGVuU3ViXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBsZWZ0IGFsaWduZWRcbiAgICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgICAgdXA6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBuZXh0OiBvcGVuU3ViLFxuICAgICAgICAgICAgICBwcmV2aW91czogY2xvc2VTdWJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gaG9yaXpvbnRhbCBtZW51XG4gICAgICAgICAgaWYgKF90aGlzLl9pc1J0bCgpKSB7IC8vIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgICBuZXh0OiBwcmV2U2libGluZyxcbiAgICAgICAgICAgICAgcHJldmlvdXM6IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICBkb3duOiBvcGVuU3ViLFxuICAgICAgICAgICAgICB1cDogY2xvc2VTdWJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGxlZnQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIG5leHQ6IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICBwcmV2aW91czogcHJldlNpYmxpbmcsXG4gICAgICAgICAgICAgIGRvd246IG9wZW5TdWIsXG4gICAgICAgICAgICAgIHVwOiBjbG9zZVN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBub3QgdGFicyAtPiBvbmUgc3ViXG4gICAgICAgIGlmIChfdGhpcy5faXNSdGwoKSkgeyAvLyByaWdodCBhbGlnbmVkXG4gICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICBuZXh0OiBjbG9zZVN1YixcbiAgICAgICAgICAgIHByZXZpb3VzOiBvcGVuU3ViLFxuICAgICAgICAgICAgZG93bjogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICB1cDogcHJldlNpYmxpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gbGVmdCBhbGlnbmVkXG4gICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICBuZXh0OiBvcGVuU3ViLFxuICAgICAgICAgICAgcHJldmlvdXM6IGNsb3NlU3ViLFxuICAgICAgICAgICAgZG93bjogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICB1cDogcHJldlNpYmxpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdEcm9wZG93bk1lbnUnLCBmdW5jdGlvbnMpO1xuXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBib2R5IHRvIGNsb3NlIGFueSBkcm9wZG93bnMgb24gYSBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQm9keUhhbmRsZXIoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xuICAgIHRoaXMuX3JlbW92ZUJvZHlIYW5kbGVyKCk7XG4gICAgJGJvZHkub24oJ2NsaWNrLnpmLmRyb3Bkb3duTWVudSB0YXAuemYuZHJvcGRvd25NZW51JywgKGUpID0+IHtcbiAgICAgIHZhciBpc0l0c2VsZiA9ICEhJChlLnRhcmdldCkuY2xvc2VzdCh0aGlzLiRlbGVtZW50KS5sZW5ndGg7XG4gICAgICBpZiAoaXNJdHNlbGYpIHJldHVybjtcblxuICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgdGhpcy5fcmVtb3ZlQm9keUhhbmRsZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGJvZHkgZXZlbnQgaGFuZGxlci4gU2VlIGBfYWRkQm9keUhhbmRsZXJgLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVCb2R5SGFuZGxlcigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLm9mZignY2xpY2suemYuZHJvcGRvd25NZW51IHRhcC56Zi5kcm9wZG93bk1lbnUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIGRyb3Bkb3duIHBhbmUsIGFuZCBjaGVja3MgZm9yIGNvbGxpc2lvbnMgZmlyc3QuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkc3ViIC0gdWwgZWxlbWVudCB0aGF0IGlzIGEgc3VibWVudSB0byBzaG93XG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZmlyZXMgRHJvcGRvd25NZW51I3Nob3dcbiAgICovXG4gIF9zaG93KCRzdWIpIHtcbiAgICB2YXIgaWR4ID0gdGhpcy4kdGFicy5pbmRleCh0aGlzLiR0YWJzLmZpbHRlcihmdW5jdGlvbihpLCBlbCkge1xuICAgICAgcmV0dXJuICQoZWwpLmZpbmQoJHN1YikubGVuZ3RoID4gMDtcbiAgICB9KSk7XG4gICAgdmFyICRzaWJzID0gJHN1Yi5wYXJlbnQoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50Jykuc2libGluZ3MoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50Jyk7XG4gICAgdGhpcy5faGlkZSgkc2licywgaWR4KTtcbiAgICAkc3ViLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKS5hZGRDbGFzcygnanMtZHJvcGRvd24tYWN0aXZlJylcbiAgICAgICAgLnBhcmVudCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgdmFyIGNsZWFyID0gQm94LkltTm90VG91Y2hpbmdZb3UoJHN1YiwgbnVsbCwgdHJ1ZSk7XG4gICAgaWYgKCFjbGVhcikge1xuICAgICAgdmFyIG9sZENsYXNzID0gdGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2xlZnQnID8gJy1yaWdodCcgOiAnLWxlZnQnLFxuICAgICAgICAgICRwYXJlbnRMaSA9ICRzdWIucGFyZW50KCcuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKTtcbiAgICAgICRwYXJlbnRMaS5yZW1vdmVDbGFzcyhgb3BlbnMke29sZENsYXNzfWApLmFkZENsYXNzKGBvcGVucy0ke3RoaXMub3B0aW9ucy5hbGlnbm1lbnR9YCk7XG4gICAgICBjbGVhciA9IEJveC5JbU5vdFRvdWNoaW5nWW91KCRzdWIsIG51bGwsIHRydWUpO1xuICAgICAgaWYgKCFjbGVhcikge1xuICAgICAgICAkcGFyZW50TGkucmVtb3ZlQ2xhc3MoYG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKS5hZGRDbGFzcygnb3BlbnMtaW5uZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgICRzdWIuY3NzKCd2aXNpYmlsaXR5JywgJycpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKSB7IHRoaXMuX2FkZEJvZHlIYW5kbGVyKCk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBuZXcgZHJvcGRvd24gcGFuZSBpcyB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93bk1lbnUjc2hvd1xuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignc2hvdy56Zi5kcm9wZG93bk1lbnUnLCBbJHN1Yl0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIGEgc2luZ2xlLCBjdXJyZW50bHkgb3BlbiBkcm9wZG93biBwYW5lLCBpZiBwYXNzZWQgYSBwYXJhbWV0ZXIsIG90aGVyd2lzZSwgaGlkZXMgZXZlcnl0aGluZy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIGVsZW1lbnQgd2l0aCBhIHN1Ym1lbnUgdG8gaGlkZVxuICAgKiBAcGFyYW0ge051bWJlcn0gaWR4IC0gaW5kZXggb2YgdGhlICR0YWJzIGNvbGxlY3Rpb24gdG8gaGlkZVxuICAgKiBAZmlyZXMgRHJvcGRvd25NZW51I2hpZGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oaWRlKCRlbGVtLCBpZHgpIHtcbiAgICB2YXIgJHRvQ2xvc2U7XG4gICAgaWYgKCRlbGVtICYmICRlbGVtLmxlbmd0aCkge1xuICAgICAgJHRvQ2xvc2UgPSAkZWxlbTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpZHggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAkdG9DbG9zZSA9IHRoaXMuJHRhYnMubm90KGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIGkgPT09IGlkeDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICR0b0Nsb3NlID0gdGhpcy4kZWxlbWVudDtcbiAgICB9XG4gICAgdmFyIHNvbWV0aGluZ1RvQ2xvc2UgPSAkdG9DbG9zZS5oYXNDbGFzcygnaXMtYWN0aXZlJykgfHwgJHRvQ2xvc2UuZmluZCgnLmlzLWFjdGl2ZScpLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoc29tZXRoaW5nVG9DbG9zZSkge1xuICAgICAgdmFyICRhY3RpdmVJdGVtID0gJHRvQ2xvc2UuZmluZCgnbGkuaXMtYWN0aXZlJyk7XG4gICAgICAkYWN0aXZlSXRlbS5hZGQoJHRvQ2xvc2UpLmF0dHIoe1xuICAgICAgICAnZGF0YS1pcy1jbGljayc6IGZhbHNlXG4gICAgICB9KS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICR0b0Nsb3NlLmZpbmQoJ3VsLmpzLWRyb3Bkb3duLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdqcy1kcm9wZG93bi1hY3RpdmUnKTtcblxuICAgICAgaWYgKHRoaXMuY2hhbmdlZCB8fCAkdG9DbG9zZS5maW5kKCdvcGVucy1pbm5lcicpLmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkQ2xhc3MgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICAkdG9DbG9zZS5maW5kKCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmFkZCgkdG9DbG9zZSlcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoYG9wZW5zLWlubmVyIG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhgb3BlbnMtJHtvbGRDbGFzc31gKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dCgkYWN0aXZlSXRlbS5kYXRhKCdfZGVsYXknKSk7XG4gICAgICB0aGlzLl9yZW1vdmVCb2R5SGFuZGxlcigpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG9wZW4gbWVudXMgYXJlIGNsb3NlZC5cbiAgICAgICAqIEBldmVudCBEcm9wZG93bk1lbnUjaGlkZVxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYuZHJvcGRvd25NZW51JywgWyR0b0Nsb3NlXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBwbHVnaW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kbWVudUl0ZW1zLm9mZignLnpmLmRyb3Bkb3duTWVudScpLnJlbW92ZUF0dHIoJ2RhdGEtaXMtY2xpY2snKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXJpZ2h0LWFycm93IGlzLWxlZnQtYXJyb3cgaXMtZG93bi1hcnJvdyBvcGVucy1yaWdodCBvcGVucy1sZWZ0IG9wZW5zLWlubmVyJyk7XG4gICAgJChkb2N1bWVudC5ib2R5KS5vZmYoJy56Zi5kcm9wZG93bk1lbnUnKTtcbiAgICBOZXN0LkJ1cm4odGhpcy4kZWxlbWVudCwgJ2Ryb3Bkb3duJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHNldHRpbmdzIGZvciBwbHVnaW5cbiAqL1xuRHJvcGRvd25NZW51LmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogRGlzYWxsb3dzIGhvdmVyIGV2ZW50cyBmcm9tIG9wZW5pbmcgc3VibWVudXNcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRpc2FibGVIb3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBEaXNhbGxvd3MgaG92ZXIgb24gdG91Y2ggZGV2aWNlc1xuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBkaXNhYmxlSG92ZXJPblRvdWNoOiB0cnVlLFxuICAvKipcbiAgICogQWxsb3cgYSBzdWJtZW51IHRvIGF1dG9tYXRpY2FsbHkgY2xvc2Ugb24gYSBtb3VzZWxlYXZlIGV2ZW50LCBpZiBub3QgY2xpY2tlZCBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvY2xvc2U6IHRydWUsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBvcGVuaW5nIGEgc3VibWVudSBvbiBob3ZlciBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MFxuICAgKi9cbiAgaG92ZXJEZWxheTogNTAsXG4gIC8qKlxuICAgKiBBbGxvdyBhIHN1Ym1lbnUgdG8gb3Blbi9yZW1haW4gb3BlbiBvbiBwYXJlbnQgY2xpY2sgZXZlbnQuIEFsbG93cyBjdXJzb3IgdG8gbW92ZSBhd2F5IGZyb20gbWVudS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsaWNrT3BlbjogZmFsc2UsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBjbG9zaW5nIGEgc3VibWVudSBvbiBhIG1vdXNlbGVhdmUgZXZlbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwXG4gICAqL1xuXG4gIGNsb3NpbmdUaW1lOiA1MDAsXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0aGUgbWVudSByZWxhdGl2ZSB0byB3aGF0IGRpcmVjdGlvbiB0aGUgc3VibWVudXMgc2hvdWxkIG9wZW4uIEhhbmRsZWQgYnkgSlMuIENhbiBiZSBgJ2F1dG8nYCwgYCdsZWZ0J2Agb3IgYCdyaWdodCdgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBjbGlja3Mgb24gdGhlIGJvZHkgdG8gY2xvc2UgYW55IG9wZW4gc3VibWVudXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93IGNsaWNrcyBvbiBsZWFmIGFuY2hvciBsaW5rcyB0byBjbG9zZSBhbnkgb3BlbiBzdWJtZW51cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrSW5zaWRlOiB0cnVlLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB2ZXJ0aWNhbCBvcmllbnRlZCBtZW51cywgRm91bmRhdGlvbiBkZWZhdWx0IGlzIGB2ZXJ0aWNhbGAuIFVwZGF0ZSB0aGlzIGlmIHVzaW5nIHlvdXIgb3duIGNsYXNzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd2ZXJ0aWNhbCdcbiAgICovXG4gIHZlcnRpY2FsQ2xhc3M6ICd2ZXJ0aWNhbCcsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHJpZ2h0LXNpZGUgb3JpZW50ZWQgbWVudXMsIEZvdW5kYXRpb24gZGVmYXVsdCBpcyBgYWxpZ24tcmlnaHRgLiBVcGRhdGUgdGhpcyBpZiB1c2luZyB5b3VyIG93biBjbGFzcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYWxpZ24tcmlnaHQnXG4gICAqL1xuICByaWdodENsYXNzOiAnYWxpZ24tcmlnaHQnLFxuICAvKipcbiAgICogQm9vbGVhbiB0byBmb3JjZSBvdmVyaWRlIHRoZSBjbGlja2luZyBvZiBsaW5rcyB0byBwZXJmb3JtIGRlZmF1bHQgYWN0aW9uLCBvbiBzZWNvbmQgdG91Y2ggZXZlbnQgZm9yIG1vYmlsZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgZm9yY2VGb2xsb3c6IHRydWVcbn07XG5cbmV4cG9ydCB7RHJvcGRvd25NZW51fTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBvbkltYWdlc0xvYWRlZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyJztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcblxuLyoqXG4gKiBFcXVhbGl6ZXIgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLmVxdWFsaXplclxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyIGlmIGVxdWFsaXplciBjb250YWlucyBpbWFnZXNcbiAqL1xuXG5jbGFzcyBFcXVhbGl6ZXIgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBFcXVhbGl6ZXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBFcXVhbGl6ZXJcbiAgICogQGZpcmVzIEVxdWFsaXplciNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKXtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgID0gJC5leHRlbmQoe30sIEVxdWFsaXplci5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0VxdWFsaXplcic7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBFcXVhbGl6ZXIgcGx1Z2luIGFuZCBjYWxscyBmdW5jdGlvbnMgdG8gZ2V0IGVxdWFsaXplciBmdW5jdGlvbmluZyBvbiBsb2FkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGVxSWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtZXF1YWxpemVyJykgfHwgJyc7XG4gICAgdmFyICR3YXRjaGVkID0gdGhpcy4kZWxlbWVudC5maW5kKGBbZGF0YS1lcXVhbGl6ZXItd2F0Y2g9XCIke2VxSWR9XCJdYCk7XG5cbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG5cbiAgICB0aGlzLiR3YXRjaGVkID0gJHdhdGNoZWQubGVuZ3RoID8gJHdhdGNoZWQgOiB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWVxdWFsaXplci13YXRjaF0nKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtcmVzaXplJywgKGVxSWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2VxJykpKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtbXV0YXRlJywgKGVxSWQgfHwgR2V0WW9EaWdpdHMoNiwgJ2VxJykpKTtcblxuICAgIHRoaXMuaGFzTmVzdGVkID0gdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1lcXVhbGl6ZXJdJykubGVuZ3RoID4gMDtcbiAgICB0aGlzLmlzTmVzdGVkID0gdGhpcy4kZWxlbWVudC5wYXJlbnRzVW50aWwoZG9jdW1lbnQuYm9keSwgJ1tkYXRhLWVxdWFsaXplcl0nKS5sZW5ndGggPiAwO1xuICAgIHRoaXMuaXNPbiA9IGZhbHNlO1xuICAgIHRoaXMuX2JpbmRIYW5kbGVyID0ge1xuICAgICAgb25SZXNpemVNZUJvdW5kOiB0aGlzLl9vblJlc2l6ZU1lLmJpbmQodGhpcyksXG4gICAgICBvblBvc3RFcXVhbGl6ZWRCb3VuZDogdGhpcy5fb25Qb3N0RXF1YWxpemVkLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgdmFyIGltZ3MgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2ltZycpO1xuICAgIHZhciB0b29TbWFsbDtcbiAgICBpZih0aGlzLm9wdGlvbnMuZXF1YWxpemVPbil7XG4gICAgICB0b29TbWFsbCA9IHRoaXMuX2NoZWNrTVEoKTtcbiAgICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fY2hlY2tNUS5iaW5kKHRoaXMpKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuX2V2ZW50cygpO1xuICAgIH1cbiAgICBpZigodHlwZW9mIHRvb1NtYWxsICE9PSAndW5kZWZpbmVkJyAmJiB0b29TbWFsbCA9PT0gZmFsc2UpIHx8IHR5cGVvZiB0b29TbWFsbCA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgaWYoaW1ncy5sZW5ndGgpe1xuICAgICAgICBvbkltYWdlc0xvYWRlZChpbWdzLCB0aGlzLl9yZWZsb3cuYmluZCh0aGlzKSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5fcmVmbG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGlmIHRoZSBicmVha3BvaW50IGlzIHRvbyBzbWFsbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXVzZUV2ZW50cygpIHtcbiAgICB0aGlzLmlzT24gPSBmYWxzZTtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZih7XG4gICAgICAnLnpmLmVxdWFsaXplcic6IHRoaXMuX2JpbmRIYW5kbGVyLm9uUG9zdEVxdWFsaXplZEJvdW5kLFxuICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmQsXG5cdCAgJ211dGF0ZW1lLnpmLnRyaWdnZXInOiB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmRcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0byBoYW5kbGUgJGVsZW1lbnRzIHJlc2l6ZW1lLnpmLnRyaWdnZXIsIHdpdGggYm91bmQgdGhpcyBvbiBfYmluZEhhbmRsZXIub25SZXNpemVNZUJvdW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfb25SZXNpemVNZSgpIHtcbiAgICB0aGlzLl9yZWZsb3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0byBoYW5kbGUgJGVsZW1lbnRzIHBvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyLCB3aXRoIGJvdW5kIHRoaXMgb24gX2JpbmRIYW5kbGVyLm9uUG9zdEVxdWFsaXplZEJvdW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfb25Qb3N0RXF1YWxpemVkKGUpIHtcbiAgICBpZihlLnRhcmdldCAhPT0gdGhpcy4kZWxlbWVudFswXSl7IHRoaXMuX3JlZmxvdygpOyB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciBFcXVhbGl6ZXIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX3BhdXNlRXZlbnRzKCk7XG4gICAgaWYodGhpcy5oYXNOZXN0ZWQpe1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigncG9zdGVxdWFsaXplZC56Zi5lcXVhbGl6ZXInLCB0aGlzLl9iaW5kSGFuZGxlci5vblBvc3RFcXVhbGl6ZWRCb3VuZCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgdGhpcy5fYmluZEhhbmRsZXIub25SZXNpemVNZUJvdW5kKTtcblx0ICB0aGlzLiRlbGVtZW50Lm9uKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgdGhpcy5fYmluZEhhbmRsZXIub25SZXNpemVNZUJvdW5kKTtcbiAgICB9XG4gICAgdGhpcy5pc09uID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgYnJlYWtwb2ludCB0byB0aGUgbWluaW11bSByZXF1aXJlZCBzaXplLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NoZWNrTVEoKSB7XG4gICAgdmFyIHRvb1NtYWxsID0gIU1lZGlhUXVlcnkuaXModGhpcy5vcHRpb25zLmVxdWFsaXplT24pO1xuICAgIGlmKHRvb1NtYWxsKXtcbiAgICAgIGlmKHRoaXMuaXNPbil7XG4gICAgICAgIHRoaXMuX3BhdXNlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgaWYoIXRoaXMuaXNPbil7XG4gICAgICAgIHRoaXMuX2V2ZW50cygpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG9vU21hbGw7XG4gIH1cblxuICAvKipcbiAgICogQSBub29wIHZlcnNpb24gZm9yIHRoZSBwbHVnaW5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9raWxsc3dpdGNoKCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBuZWNlc3NhcnkgZnVuY3Rpb25zIHRvIHVwZGF0ZSBFcXVhbGl6ZXIgdXBvbiBET00gY2hhbmdlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVmbG93KCkge1xuICAgIGlmKCF0aGlzLm9wdGlvbnMuZXF1YWxpemVPblN0YWNrKXtcbiAgICAgIGlmKHRoaXMuX2lzU3RhY2tlZCgpKXtcbiAgICAgICAgdGhpcy4kd2F0Y2hlZC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5lcXVhbGl6ZUJ5Um93KSB7XG4gICAgICB0aGlzLmdldEhlaWdodHNCeVJvdyh0aGlzLmFwcGx5SGVpZ2h0QnlSb3cuYmluZCh0aGlzKSk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmdldEhlaWdodHModGhpcy5hcHBseUhlaWdodC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgZGV0ZXJtaW5lcyBpZiB0aGUgZmlyc3QgMiBlbGVtZW50cyBhcmUgKk5PVCogc3RhY2tlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc1N0YWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLiR3YXRjaGVkWzBdIHx8ICF0aGlzLiR3YXRjaGVkWzFdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuJHdhdGNoZWRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICE9PSB0aGlzLiR3YXRjaGVkWzFdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgb3V0ZXIgaGVpZ2h0cyBvZiBjaGlsZHJlbiBjb250YWluZWQgd2l0aGluIGFuIEVxdWFsaXplciBwYXJlbnQgYW5kIHJldHVybnMgdGhlbSBpbiBhbiBhcnJheVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIEEgbm9uLW9wdGlvbmFsIGNhbGxiYWNrIHRvIHJldHVybiB0aGUgaGVpZ2h0cyBhcnJheSB0by5cbiAgICogQHJldHVybnMge0FycmF5fSBoZWlnaHRzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lclxuICAgKi9cbiAgZ2V0SGVpZ2h0cyhjYikge1xuICAgIHZhciBoZWlnaHRzID0gW107XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy4kd2F0Y2hlZC5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICB0aGlzLiR3YXRjaGVkW2ldLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgIGhlaWdodHMucHVzaCh0aGlzLiR3YXRjaGVkW2ldLm9mZnNldEhlaWdodCk7XG4gICAgfVxuICAgIGNiKGhlaWdodHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBvdXRlciBoZWlnaHRzIG9mIGNoaWxkcmVuIGNvbnRhaW5lZCB3aXRoaW4gYW4gRXF1YWxpemVyIHBhcmVudCBhbmQgcmV0dXJucyB0aGVtIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQSBub24tb3B0aW9uYWwgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSBoZWlnaHRzIGFycmF5IHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGdyb3VwcyAtIEFuIGFycmF5IG9mIGhlaWdodHMgb2YgY2hpbGRyZW4gd2l0aGluIEVxdWFsaXplciBjb250YWluZXIgZ3JvdXBlZCBieSByb3cgd2l0aCBlbGVtZW50LGhlaWdodCBhbmQgbWF4IGFzIGxhc3QgY2hpbGRcbiAgICovXG4gIGdldEhlaWdodHNCeVJvdyhjYikge1xuICAgIHZhciBsYXN0RWxUb3BPZmZzZXQgPSAodGhpcy4kd2F0Y2hlZC5sZW5ndGggPyB0aGlzLiR3YXRjaGVkLmZpcnN0KCkub2Zmc2V0KCkudG9wIDogMCksXG4gICAgICAgIGdyb3VwcyA9IFtdLFxuICAgICAgICBncm91cCA9IDA7XG4gICAgLy9ncm91cCBieSBSb3dcbiAgICBncm91cHNbZ3JvdXBdID0gW107XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gdGhpcy4kd2F0Y2hlZC5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICB0aGlzLiR3YXRjaGVkW2ldLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgIC8vbWF5YmUgY291bGQgdXNlIHRoaXMuJHdhdGNoZWRbaV0ub2Zmc2V0VG9wXG4gICAgICB2YXIgZWxPZmZzZXRUb3AgPSAkKHRoaXMuJHdhdGNoZWRbaV0pLm9mZnNldCgpLnRvcDtcbiAgICAgIGlmIChlbE9mZnNldFRvcCAhPT0gbGFzdEVsVG9wT2Zmc2V0KSB7XG4gICAgICAgIGdyb3VwKys7XG4gICAgICAgIGdyb3Vwc1tncm91cF0gPSBbXTtcbiAgICAgICAgbGFzdEVsVG9wT2Zmc2V0PWVsT2Zmc2V0VG9wO1xuICAgICAgfVxuICAgICAgZ3JvdXBzW2dyb3VwXS5wdXNoKFt0aGlzLiR3YXRjaGVkW2ldLHRoaXMuJHdhdGNoZWRbaV0ub2Zmc2V0SGVpZ2h0XSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDAsIGxuID0gZ3JvdXBzLmxlbmd0aDsgaiA8IGxuOyBqKyspIHtcbiAgICAgIHZhciBoZWlnaHRzID0gJChncm91cHNbal0pLm1hcChmdW5jdGlvbigpeyByZXR1cm4gdGhpc1sxXTsgfSkuZ2V0KCk7XG4gICAgICB2YXIgbWF4ICAgICAgICAgPSBNYXRoLm1heC5hcHBseShudWxsLCBoZWlnaHRzKTtcbiAgICAgIGdyb3Vwc1tqXS5wdXNoKG1heCk7XG4gICAgfVxuICAgIGNiKGdyb3Vwcyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgQ1NTIGhlaWdodCBwcm9wZXJ0eSBvZiBlYWNoIGNoaWxkIGluIGFuIEVxdWFsaXplciBwYXJlbnQgdG8gbWF0Y2ggdGhlIHRhbGxlc3RcbiAgICogQHBhcmFtIHthcnJheX0gaGVpZ2h0cyAtIEFuIGFycmF5IG9mIGhlaWdodHMgb2YgY2hpbGRyZW4gd2l0aGluIEVxdWFsaXplciBjb250YWluZXJcbiAgICogQGZpcmVzIEVxdWFsaXplciNwcmVlcXVhbGl6ZWRcbiAgICogQGZpcmVzIEVxdWFsaXplciNwb3N0ZXF1YWxpemVkXG4gICAqL1xuICBhcHBseUhlaWdodChoZWlnaHRzKSB7XG4gICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIGJlZm9yZSB0aGUgaGVpZ2h0cyBhcmUgYXBwbGllZFxuICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwcmVlcXVhbGl6ZWQuemYuZXF1YWxpemVyJyk7XG5cbiAgICB0aGlzLiR3YXRjaGVkLmNzcygnaGVpZ2h0JywgbWF4KTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIGhlaWdodHMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAgICAgKiBAZXZlbnQgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRcbiAgICAgKi9cbiAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwb3N0ZXF1YWxpemVkLnpmLmVxdWFsaXplcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZXMgdGhlIENTUyBoZWlnaHQgcHJvcGVydHkgb2YgZWFjaCBjaGlsZCBpbiBhbiBFcXVhbGl6ZXIgcGFyZW50IHRvIG1hdGNoIHRoZSB0YWxsZXN0IGJ5IHJvd1xuICAgKiBAcGFyYW0ge2FycmF5fSBncm91cHMgLSBBbiBhcnJheSBvZiBoZWlnaHRzIG9mIGNoaWxkcmVuIHdpdGhpbiBFcXVhbGl6ZXIgY29udGFpbmVyIGdyb3VwZWQgYnkgcm93IHdpdGggZWxlbWVudCxoZWlnaHQgYW5kIG1heCBhcyBsYXN0IGNoaWxkXG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkXG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkcm93XG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZHJvd1xuICAgKiBAZmlyZXMgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRcbiAgICovXG4gIGFwcGx5SGVpZ2h0QnlSb3coZ3JvdXBzKSB7XG4gICAgLyoqXG4gICAgICogRmlyZXMgYmVmb3JlIHRoZSBoZWlnaHRzIGFyZSBhcHBsaWVkXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwcmVlcXVhbGl6ZWQuemYuZXF1YWxpemVyJyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGdyb3Vwcy5sZW5ndGg7IGkgPCBsZW4gOyBpKyspIHtcbiAgICAgIHZhciBncm91cHNJTGVuZ3RoID0gZ3JvdXBzW2ldLmxlbmd0aCxcbiAgICAgICAgICBtYXggPSBncm91cHNbaV1bZ3JvdXBzSUxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGdyb3Vwc0lMZW5ndGg8PTIpIHtcbiAgICAgICAgJChncm91cHNbaV1bMF1bMF0pLmNzcyh7J2hlaWdodCc6J2F1dG8nfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgICogRmlyZXMgYmVmb3JlIHRoZSBoZWlnaHRzIHBlciByb3cgYXJlIGFwcGxpZWRcbiAgICAgICAgKiBAZXZlbnQgRXF1YWxpemVyI3ByZWVxdWFsaXplZHJvd1xuICAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwcmVlcXVhbGl6ZWRyb3cuemYuZXF1YWxpemVyJyk7XG4gICAgICBmb3IgKHZhciBqID0gMCwgbGVuSiA9IChncm91cHNJTGVuZ3RoLTEpOyBqIDwgbGVuSiA7IGorKykge1xuICAgICAgICAkKGdyb3Vwc1tpXVtqXVswXSkuY3NzKHsnaGVpZ2h0JzptYXh9KTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIGhlaWdodHMgcGVyIHJvdyBoYXZlIGJlZW4gYXBwbGllZFxuICAgICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZHJvd1xuICAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwb3N0ZXF1YWxpemVkcm93LnpmLmVxdWFsaXplcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBoZWlnaHRzIGhhdmUgYmVlbiBhcHBsaWVkXG4gICAgICovXG4gICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigncG9zdGVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBFcXVhbGl6ZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5fcGF1c2VFdmVudHMoKTtcbiAgICB0aGlzLiR3YXRjaGVkLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpblxuICovXG5FcXVhbGl6ZXIuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBFbmFibGUgaGVpZ2h0IGVxdWFsaXphdGlvbiB3aGVuIHN0YWNrZWQgb24gc21hbGxlciBzY3JlZW5zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZXF1YWxpemVPblN0YWNrOiBmYWxzZSxcbiAgLyoqXG4gICAqIEVuYWJsZSBoZWlnaHQgZXF1YWxpemF0aW9uIHJvdyBieSByb3cuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBlcXVhbGl6ZUJ5Um93OiBmYWxzZSxcbiAgLyoqXG4gICAqIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gYnJlYWtwb2ludCBzaXplIHRoZSBwbHVnaW4gc2hvdWxkIGVxdWFsaXplIGhlaWdodHMgb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGVxdWFsaXplT246ICcnXG59O1xuXG5leHBvcnQge0VxdWFsaXplcn07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IG9uTG9hZCwgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBTbW9vdGhTY3JvbGwgfSBmcm9tICcuL2ZvdW5kYXRpb24uc21vb3RoU2Nyb2xsJztcblxuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5cbi8qKlxuICogTWFnZWxsYW4gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm1hZ2VsbGFuXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi5zbW9vdGhTY3JvbGxcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBNYWdlbGxhbiBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIE1hZ2VsbGFuLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgTWFnZWxsYW5cbiAgICogQGZpcmVzIE1hZ2VsbGFuI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgID0gJC5leHRlbmQoe30sIE1hZ2VsbGFuLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnTWFnZWxsYW4nOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5jYWxjUG9pbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIE1hZ2VsbGFuIHBsdWdpbiBhbmQgY2FsbHMgZnVuY3Rpb25zIHRvIGdldCBlcXVhbGl6ZXIgZnVuY3Rpb25pbmcgb24gbG9hZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnRbMF0uaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ21hZ2VsbGFuJyk7XG4gICAgdGhpcy4kdGFyZ2V0cyA9ICQoJ1tkYXRhLW1hZ2VsbGFuLXRhcmdldF0nKTtcbiAgICB0aGlzLiRsaW5rcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnYScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7XG4gICAgICAnZGF0YS1yZXNpemUnOiBpZCxcbiAgICAgICdkYXRhLXNjcm9sbCc6IGlkLFxuICAgICAgJ2lkJzogaWRcbiAgICB9KTtcbiAgICB0aGlzLiRhY3RpdmUgPSAkKCk7XG4gICAgdGhpcy5zY3JvbGxQb3MgPSBwYXJzZUludCh3aW5kb3cucGFnZVlPZmZzZXQsIDEwKTtcblxuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgYW4gYXJyYXkgb2YgcGl4ZWwgdmFsdWVzIHRoYXQgYXJlIHRoZSBkZW1hcmNhdGlvbiBsaW5lcyBiZXR3ZWVuIGxvY2F0aW9ucyBvbiB0aGUgcGFnZS5cbiAgICogQ2FuIGJlIGludm9rZWQgaWYgbmV3IGVsZW1lbnRzIGFyZSBhZGRlZCBvciB0aGUgc2l6ZSBvZiBhIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgY2FsY1BvaW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcbiAgICAgICAgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHRoaXMucG9pbnRzID0gW107XG4gICAgdGhpcy53aW5IZWlnaHQgPSBNYXRoLnJvdW5kKE1hdGgubWF4KHdpbmRvdy5pbm5lckhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQpKTtcbiAgICB0aGlzLmRvY0hlaWdodCA9IE1hdGgucm91bmQoTWF0aC5tYXgoYm9keS5zY3JvbGxIZWlnaHQsIGJvZHkub2Zmc2V0SGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwub2Zmc2V0SGVpZ2h0KSk7XG5cbiAgICB0aGlzLiR0YXJnZXRzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkdGFyID0gJCh0aGlzKSxcbiAgICAgICAgICBwdCA9IE1hdGgucm91bmQoJHRhci5vZmZzZXQoKS50b3AgLSBfdGhpcy5vcHRpb25zLnRocmVzaG9sZCk7XG4gICAgICAkdGFyLnRhcmdldFBvaW50ID0gcHQ7XG4gICAgICBfdGhpcy5wb2ludHMucHVzaChwdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciBNYWdlbGxhbi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICQod2luZG93KS5vbmUoJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgICAgaWYoX3RoaXMub3B0aW9ucy5kZWVwTGlua2luZyl7XG4gICAgICAgIGlmKGxvY2F0aW9uLmhhc2gpe1xuICAgICAgICAgIF90aGlzLnNjcm9sbFRvTG9jKGxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5jYWxjUG9pbnRzKCk7XG4gICAgICBfdGhpcy5fdXBkYXRlQWN0aXZlKCk7XG4gICAgfSk7XG5cbiAgICBfdGhpcy5vbkxvYWRMaXN0ZW5lciA9IG9uTG9hZCgkKHdpbmRvdyksIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLiRlbGVtZW50XG4gICAgICAgIC5vbih7XG4gICAgICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiBfdGhpcy5yZWZsb3cuYmluZChfdGhpcyksXG4gICAgICAgICAgJ3Njcm9sbG1lLnpmLnRyaWdnZXInOiBfdGhpcy5fdXBkYXRlQWN0aXZlLmJpbmQoX3RoaXMpXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suemYubWFnZWxsYW4nLCAnYVtocmVmXj1cIiNcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB2YXIgYXJyaXZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgX3RoaXMuc2Nyb2xsVG9Mb2MoYXJyaXZhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZGVlcExpbmtTY3JvbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuZGVlcExpbmtpbmcpIHtcbiAgICAgICAgX3RoaXMuc2Nyb2xsVG9Mb2Mod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCB0aGlzLl9kZWVwTGlua1Njcm9sbCk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gc2Nyb2xsIHRvIGEgZ2l2ZW4gbG9jYXRpb24gb24gdGhlIHBhZ2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsb2MgLSBhIHByb3Blcmx5IGZvcm1hdHRlZCBqUXVlcnkgaWQgc2VsZWN0b3IuIEV4YW1wbGU6ICcjZm9vJ1xuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHNjcm9sbFRvTG9jKGxvYykge1xuICAgIHRoaXMuX2luVHJhbnNpdGlvbiA9IHRydWU7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgYW5pbWF0aW9uRWFzaW5nOiB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uRWFzaW5nLFxuICAgICAgYW5pbWF0aW9uRHVyYXRpb246IHRoaXMub3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgIHRocmVzaG9sZDogdGhpcy5vcHRpb25zLnRocmVzaG9sZCxcbiAgICAgIG9mZnNldDogdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIH07XG5cbiAgICBTbW9vdGhTY3JvbGwuc2Nyb2xsVG9Mb2MobG9jLCBvcHRpb25zLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLl9pblRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgdG8gdXBkYXRlIE1hZ2VsbGFuIHVwb24gRE9NIGNoYW5nZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHJlZmxvdygpIHtcbiAgICB0aGlzLmNhbGNQb2ludHMoKTtcbiAgICB0aGlzLl91cGRhdGVBY3RpdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2aXNpYmlsaXR5IG9mIGFuIGFjdGl2ZSBsb2NhdGlvbiBsaW5rLCBhbmQgdXBkYXRlcyB0aGUgdXJsIGhhc2ggZm9yIHRoZSBwYWdlLCBpZiBkZWVwTGlua2luZyBlbmFibGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIE1hZ2VsbGFuI3VwZGF0ZVxuICAgKi9cbiAgX3VwZGF0ZUFjdGl2ZSgvKmV2dCwgZWxlbSwgc2Nyb2xsUG9zKi8pIHtcbiAgICBpZih0aGlzLl9pblRyYW5zaXRpb24pIHJldHVybjtcblxuICAgIGNvbnN0IG5ld1Njcm9sbFBvcyA9IHBhcnNlSW50KHdpbmRvdy5wYWdlWU9mZnNldCwgMTApO1xuICAgIGNvbnN0IGlzU2Nyb2xsaW5nVXAgPSB0aGlzLnNjcm9sbFBvcyA+IG5ld1Njcm9sbFBvcztcbiAgICB0aGlzLnNjcm9sbFBvcyA9IG5ld1Njcm9sbFBvcztcblxuICAgIGxldCBhY3RpdmVJZHg7XG4gICAgLy8gQmVmb3JlIHRoZSBmaXJzdCBwb2ludDogbm8gbGlua1xuICAgIGlmKG5ld1Njcm9sbFBvcyA8IHRoaXMucG9pbnRzWzBdIC0gdGhpcy5vcHRpb25zLm9mZnNldCAtIChpc1Njcm9sbGluZ1VwID8gdGhpcy5vcHRpb25zLnRocmVzaG9sZCA6IDApKXsgLyogZG8gbm90aGluZyAqLyB9XG4gICAgLy8gQXQgdGhlIGJvdHRvbSBvZiB0aGUgcGFnZTogbGFzdCBsaW5rXG4gICAgZWxzZSBpZihuZXdTY3JvbGxQb3MgKyB0aGlzLndpbkhlaWdodCA9PT0gdGhpcy5kb2NIZWlnaHQpeyBhY3RpdmVJZHggPSB0aGlzLnBvaW50cy5sZW5ndGggLSAxOyB9XG4gICAgLy8gT3RoZXJ3aGlzZSwgdXNlIHRoZSBsYXN0IHZpc2libGUgbGlua1xuICAgIGVsc2V7XG4gICAgICBjb25zdCB2aXNpYmxlTGlua3MgPSB0aGlzLnBvaW50cy5maWx0ZXIoKHApID0+IHtcbiAgICAgICAgcmV0dXJuIChwIC0gdGhpcy5vcHRpb25zLm9mZnNldCAtIChpc1Njcm9sbGluZ1VwID8gdGhpcy5vcHRpb25zLnRocmVzaG9sZCA6IDApKSA8PSBuZXdTY3JvbGxQb3M7XG4gICAgICB9KTtcbiAgICAgIGFjdGl2ZUlkeCA9IHZpc2libGVMaW5rcy5sZW5ndGggPyB2aXNpYmxlTGlua3MubGVuZ3RoIC0gMSA6IDA7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBuZXcgYWN0aXZlIGxpbmtcbiAgICBjb25zdCAkb2xkQWN0aXZlID0gdGhpcy4kYWN0aXZlO1xuICAgIGxldCBhY3RpdmVIYXNoID0gJyc7XG4gICAgaWYodHlwZW9mIGFjdGl2ZUlkeCAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgdGhpcy4kYWN0aXZlID0gdGhpcy4kbGlua3MuZmlsdGVyKCdbaHJlZj1cIiMnICsgdGhpcy4kdGFyZ2V0cy5lcShhY3RpdmVJZHgpLmRhdGEoJ21hZ2VsbGFuLXRhcmdldCcpICsgJ1wiXScpO1xuICAgICAgaWYgKHRoaXMuJGFjdGl2ZS5sZW5ndGgpIGFjdGl2ZUhhc2ggPSB0aGlzLiRhY3RpdmVbMF0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLiRhY3RpdmUgPSAkKCk7XG4gICAgfVxuICAgIGNvbnN0IGlzTmV3QWN0aXZlID0gISghdGhpcy4kYWN0aXZlLmxlbmd0aCAmJiAhJG9sZEFjdGl2ZS5sZW5ndGgpICYmICF0aGlzLiRhY3RpdmUuaXMoJG9sZEFjdGl2ZSk7XG4gICAgY29uc3QgaXNOZXdIYXNoID0gYWN0aXZlSGFzaCAhPT0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgICAvLyBVcGRhdGUgdGhlIGFjdGl2ZSBsaW5rIGVsZW1lbnRcbiAgICBpZihpc05ld0FjdGl2ZSkge1xuICAgICAgJG9sZEFjdGl2ZS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuICAgICAgdGhpcy4kYWN0aXZlLmFkZENsYXNzKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBoYXNoIChpdCBtYXkgaGF2ZSBjaGFuZ2VkIHdpdGggdGhlIHNhbWUgYWN0aXZlIGxpbmspXG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5raW5nICYmIGlzTmV3SGFzaCl7XG4gICAgICBpZih3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpe1xuICAgICAgICAvLyBTZXQgb3IgcmVtb3ZlIHRoZSBoYXNoIChzZWU6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81Mjk4Njg0LzQzMTczODRcbiAgICAgICAgY29uc3QgdXJsID0gYWN0aXZlSGFzaCA/IGFjdGl2ZUhhc2ggOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICBpZih0aGlzLm9wdGlvbnMudXBkYXRlSGlzdG9yeSl7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgdXJsKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gYWN0aXZlSGFzaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOZXdBY3RpdmUpIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiBtYWdlbGxhbiBpcyBmaW5pc2hlZCB1cGRhdGluZyB0byB0aGUgbmV3IGFjdGl2ZSBlbGVtZW50LlxuICAgICAgICogQGV2ZW50IE1hZ2VsbGFuI3VwZGF0ZVxuICAgICAgICovXG4gICAgXHR0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3VwZGF0ZS56Zi5tYWdlbGxhbicsIFt0aGlzLiRhY3RpdmVdKTtcblx0ICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgTWFnZWxsYW4gYW5kIHJlc2V0cyB0aGUgdXJsIG9mIHRoZSB3aW5kb3cuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5tYWdlbGxhbicpXG4gICAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3N9YCkucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5kZWVwTGlua2luZyl7XG4gICAgICB2YXIgaGFzaCA9IHRoaXMuJGFjdGl2ZVswXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoaGFzaCwgJycpO1xuICAgIH1cblxuICAgICQod2luZG93KS5vZmYoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9kZWVwTGlua1Njcm9sbClcbiAgICBpZiAodGhpcy5vbkxvYWRMaXN0ZW5lcikgJCh3aW5kb3cpLm9mZih0aGlzLm9uTG9hZExpc3RlbmVyKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpblxuICovXG5NYWdlbGxhbi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lLCBpbiBtcywgdGhlIGFuaW1hdGVkIHNjcm9sbGluZyBzaG91bGQgdGFrZSBiZXR3ZWVuIGxvY2F0aW9ucy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8qKlxuICAgKiBBbmltYXRpb24gc3R5bGUgdG8gdXNlIHdoZW4gc2Nyb2xsaW5nIGJldHdlZW4gbG9jYXRpb25zLiBDYW4gYmUgYCdzd2luZydgIG9yIGAnbGluZWFyJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2xpbmVhcidcbiAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9hcGkuanF1ZXJ5LmNvbS9hbmltYXRlfEpxdWVyeSBhbmltYXRlfVxuICAgKi9cbiAgYW5pbWF0aW9uRWFzaW5nOiAnbGluZWFyJyxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gdXNlIGFzIGEgbWFya2VyIGZvciBsb2NhdGlvbiBjaGFuZ2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwXG4gICAqL1xuICB0aHJlc2hvbGQ6IDUwLFxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgYWN0aXZlIGxvY2F0aW9ucyBsaW5rIG9uIHRoZSBtYWdlbGxhbiBjb250YWluZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2lzLWFjdGl2ZSdcbiAgICovXG4gIGFjdGl2ZUNsYXNzOiAnaXMtYWN0aXZlJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgc2NyaXB0IHRvIG1hbmlwdWxhdGUgdGhlIHVybCBvZiB0aGUgY3VycmVudCBwYWdlLCBhbmQgaWYgc3VwcG9ydGVkLCBhbHRlciB0aGUgaGlzdG9yeS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5raW5nOiBmYWxzZSxcbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IHdpdGggdGhlIGFjdGl2ZSBsaW5rLCBpZiBkZWVwIGxpbmtpbmcgaXMgZW5hYmxlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHVwZGF0ZUhpc3Rvcnk6IGZhbHNlLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byBvZmZzZXQgdGhlIHNjcm9sbCBvZiB0aGUgcGFnZSBvbiBpdGVtIGNsaWNrIGlmIHVzaW5nIGEgc3RpY2t5IG5hdiBiYXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgb2Zmc2V0OiAwXG59XG5cbmV4cG9ydCB7TWFnZWxsYW59O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnBsdWdpbic7XG5pbXBvcnQgeyBvbkxvYWQsIHRyYW5zaXRpb25lbmQsIFJlZ0V4cEVzY2FwZSB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBPZmZDYW52YXMgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm9mZkNhbnZhc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cblxuY2xhc3MgT2ZmQ2FudmFzIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gb2ZmLWNhbnZhcyB3cmFwcGVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgT2ZmQ2FudmFzXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gaW5pdGlhbGl6ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdPZmZDYW52YXMnOyAvLyBpZTkgYmFjayBjb21wYXRcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgT2ZmQ2FudmFzLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jb250ZW50Q2xhc3NlcyA9IHsgYmFzZTogW10sIHJldmVhbDogW10gfTtcbiAgICB0aGlzLiRsYXN0VHJpZ2dlciA9ICQoKTtcbiAgICB0aGlzLiR0cmlnZ2VycyA9ICQoKTtcbiAgICB0aGlzLnBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIHRoaXMuJGNvbnRlbnQgPSAkKCk7XG4gICAgdGhpcy5uZXN0ZWQgPSAhISh0aGlzLm9wdGlvbnMubmVzdGVkKTtcbiAgICB0aGlzLiRzdGlja3kgPSAkKCk7XG4gICAgdGhpcy5pc0luQ2FudmFzID0gZmFsc2U7XG5cbiAgICAvLyBEZWZpbmVzIHRoZSBDU1MgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzc2VzIG9mIHRoZSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgICQoWydwdXNoJywgJ292ZXJsYXAnXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy10cmFuc2l0aW9uLScrdmFsKTtcbiAgICB9KTtcbiAgICAkKFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10pLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgIHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5wdXNoKCdoYXMtcG9zaXRpb24tJyt2YWwpO1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5yZXZlYWwucHVzaCgnaGFzLXJldmVhbC0nK3ZhbCk7XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdPZmZDYW52YXMnLCB7XG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG9mZi1jYW52YXMgd3JhcHBlciBieSBhZGRpbmcgdGhlIGV4aXQgb3ZlcmxheSAoaWYgbmVlZGVkKS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIC8vIEZpbmQgb2ZmLWNhbnZhcyBjb250ZW50LCBlaXRoZXIgYnkgSUQgKGlmIHNwZWNpZmllZCksIGJ5IHNpYmxpbmdzIG9yIGJ5IGNsb3Nlc3Qgc2VsZWN0b3IgKGZhbGxiYWNrKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gJCgnIycrdGhpcy5vcHRpb25zLmNvbnRlbnRJZCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5maXJzdCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLmNvbnRlbnRJZCkge1xuICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaWYgaXQgaXNuJ3QgYSBzaWJsaW5nIG9mIHRoZSBjb250ZW50XG4gICAgICB0aGlzLm5lc3RlZCA9IHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGggPT09IDA7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQgJiYgdGhpcy5vcHRpb25zLm5lc3RlZCA9PT0gbnVsbCkge1xuICAgICAgLy8gV2FybmluZyBpZiB1c2luZyBjb250ZW50IElEIHdpdGhvdXQgc2V0dGluZyB0aGUgbmVzdGVkIG9wdGlvblxuICAgICAgLy8gT25jZSB0aGUgZWxlbWVudCBpcyBuZXN0ZWQgaXQgaXMgcmVxdWlyZWQgdG8gd29yayBwcm9wZXJseSBpbiB0aGlzIGNhc2VcbiAgICAgIGNvbnNvbGUud2FybignUmVtZW1iZXIgdG8gdXNlIHRoZSBuZXN0ZWQgb3B0aW9uIGlmIHVzaW5nIHRoZSBjb250ZW50IElEIG9wdGlvbiEnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZXN0ZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIEZvcmNlIHRyYW5zaXRpb24gb3ZlcmxhcCBpZiBuZXN0ZWRcbiAgICAgIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uID0gJ292ZXJsYXAnO1xuICAgICAgLy8gUmVtb3ZlIGFwcHJvcHJpYXRlIGNsYXNzZXMgaWYgYWxyZWFkeSBhc3NpZ25lZCBpbiBtYXJrdXBcbiAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLXRyYW5zaXRpb24tcHVzaCcpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoYGlzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaXMtY2xvc2VkYCk7XG5cbiAgICAvLyBGaW5kIHRyaWdnZXJzIHRoYXQgYWZmZWN0IHRoaXMgZWxlbWVudCBhbmQgYWRkIGFyaWEtZXhwYW5kZWQgdG8gdGhlbVxuICAgIHRoaXMuJHRyaWdnZXJzID0gJChkb2N1bWVudClcbiAgICAgIC5maW5kKCdbZGF0YS1vcGVuPVwiJytpZCsnXCJdLCBbZGF0YS1jbG9zZT1cIicraWQrJ1wiXSwgW2RhdGEtdG9nZ2xlPVwiJytpZCsnXCJdJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgIC5hdHRyKCdhcmlhLWNvbnRyb2xzJywgaWQpO1xuXG4gICAgLy8gR2V0IHBvc2l0aW9uIGJ5IGNoZWNraW5nIGZvciByZWxhdGVkIENTUyBjbGFzc1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLiRlbGVtZW50LmlzKCcucG9zaXRpb24tbGVmdCwgLnBvc2l0aW9uLXRvcCwgLnBvc2l0aW9uLXJpZ2h0LCAucG9zaXRpb24tYm90dG9tJykgPyB0aGlzLiRlbGVtZW50LmF0dHIoJ2NsYXNzJykubWF0Y2goL3Bvc2l0aW9uXFwtKGxlZnR8dG9wfHJpZ2h0fGJvdHRvbSkvKVsxXSA6IHRoaXMucG9zaXRpb247XG5cbiAgICAvLyBBZGQgYW4gb3ZlcmxheSBvdmVyIHRoZSBjb250ZW50IGlmIG5lY2Vzc2FyeVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB2YXIgb3ZlcmxheVBvc2l0aW9uID0gJCh0aGlzLiRlbGVtZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gJ2ZpeGVkJyA/ICdpcy1vdmVybGF5LWZpeGVkJyA6ICdpcy1vdmVybGF5LWFic29sdXRlJztcbiAgICAgIG92ZXJsYXkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdqcy1vZmYtY2FudmFzLW92ZXJsYXkgJyArIG92ZXJsYXlQb3NpdGlvbik7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJChvdmVybGF5KTtcbiAgICAgIGlmKG92ZXJsYXlQb3NpdGlvbiA9PT0gJ2lzLW92ZXJsYXktZml4ZWQnKSB7XG4gICAgICAgICQodGhpcy4kb3ZlcmxheSkuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRjb250ZW50LmFwcGVuZCh0aGlzLiRvdmVybGF5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHJldmVhbE9uIG9wdGlvbiBmcm9tIHRoZSBjbGFzcy5cbiAgICB2YXIgcmV2ZWFsT25SZWdFeHAgPSBuZXcgUmVnRXhwKFJlZ0V4cEVzY2FwZSh0aGlzLm9wdGlvbnMucmV2ZWFsQ2xhc3MpICsgJyhbXlxcXFxzXSspJywgJ2cnKTtcbiAgICB2YXIgcmV2ZWFsT25DbGFzcyA9IHJldmVhbE9uUmVnRXhwLmV4ZWModGhpcy4kZWxlbWVudFswXS5jbGFzc05hbWUpO1xuICAgIGlmIChyZXZlYWxPbkNsYXNzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICB0aGlzLm9wdGlvbnMucmV2ZWFsT24gPSB0aGlzLm9wdGlvbnMucmV2ZWFsT24gfHwgcmV2ZWFsT25DbGFzc1sxXTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhlIGByZXZlYWwtb24tKmAgY2xhc3MgaXMgc2V0LlxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNSZXZlYWxlZCA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMucmV2ZWFsT24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZmlyc3QoKS5hZGRDbGFzcyhgJHt0aGlzLm9wdGlvbnMucmV2ZWFsQ2xhc3N9JHt0aGlzLm9wdGlvbnMucmV2ZWFsT259YCk7XG4gICAgICB0aGlzLl9zZXRNUUNoZWNrZXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfVxuXG4gICAgLy8gRmluZCBmaXhlZCBlbGVtZW50cyB0aGF0IHNob3VsZCBzdGF5IGZpeGVkIHdoaWxlIG9mZi1jYW52YXMgaXMgb3BlbmVkXG4gICAgdGhpcy4kc3RpY2t5ID0gdGhpcy4kY29udGVudC5maW5kKCdbZGF0YS1vZmYtY2FudmFzLXN0aWNreV0nKTtcbiAgICBpZiAodGhpcy4kc3RpY2t5Lmxlbmd0aCA+IDAgJiYgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPT09ICdwdXNoJykge1xuICAgICAgLy8gSWYgdGhlcmUncyBhdCBsZWFzdCBvbmUgbWF0Y2ggZm9yY2UgY29udGVudFNjcm9sbDpmYWxzZSBiZWNhdXNlIHRoZSBhYnNvbHV0ZSB0b3AgdmFsdWUgZG9lc24ndCBnZXQgcmVjYWxjdWxhdGVkIG9uIHNjcm9sbFxuICAgICAgLy8gTGltaXQgdG8gcHVzaCB0cmFuc2l0aW9uIHNpbmNlIHRoZXJlJ3Mgbm8gdHJhbnNmb3JtIHNjb3BlIGZvciBvdmVybGFwXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBpbkNhbnZhc0ZvciA9IHRoaXMuJGVsZW1lbnQuYXR0cignY2xhc3MnKS5tYXRjaCgvXFxiaW4tY2FudmFzLWZvci0oXFx3KykvKTtcbiAgICBpZiAoaW5DYW52YXNGb3IgJiYgaW5DYW52YXNGb3IubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyBTZXQgYGluQ2FudmFzT25gIG9wdGlvbiBpZiBmb3VuZCBpbi1jYW52YXMtZm9yLVtCUkVBS1BPTlRdIENTUyBjbGFzc1xuICAgICAgdGhpcy5vcHRpb25zLmluQ2FudmFzT24gPSBpbkNhbnZhc0ZvclsxXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5pbkNhbnZhc09uKSB7XG4gICAgICAvLyBFbnN1cmUgdGhlIENTUyBjbGFzcyBpcyBzZXRcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoYGluLWNhbnZhcy1mb3ItJHt0aGlzLm9wdGlvbnMuaW5DYW52YXNPbn1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmluQ2FudmFzT24pIHtcbiAgICAgIHRoaXMuX2NoZWNrSW5DYW52YXMoKTtcbiAgICB9XG5cbiAgICAvLyBJbml0YWxseSByZW1vdmUgYWxsIHRyYW5zaXRpb24vcG9zaXRpb24gQ1NTIGNsYXNzZXMgZnJvbSBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyLlxuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGFuZCB0aGUgZXhpdCBvdmVybGF5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZDYW52YXMnKS5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuY2xvc2UuYmluZCh0aGlzKSxcbiAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAna2V5ZG93bi56Zi5vZmZDYW52YXMnOiB0aGlzLl9oYW5kbGVLZXlib2FyZC5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSkge1xuICAgICAgdmFyICR0YXJnZXQgPSB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPyB0aGlzLiRvdmVybGF5IDogdGhpcy4kY29udGVudDtcbiAgICAgICR0YXJnZXQub24oeydjbGljay56Zi5vZmZDYW52YXMnOiB0aGlzLmNsb3NlLmJpbmQodGhpcyl9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmluQ2FudmFzT24pIHtcbiAgICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0luQ2FudmFzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGV2ZW50IGxpc3RlbmVyIGZvciBlbGVtZW50cyB0aGF0IHdpbGwgcmV2ZWFsIGF0IGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0TVFDaGVja2VyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLm9uTG9hZExpc3RlbmVyID0gb25Mb2FkKCQod2luZG93KSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykub24oJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3QoX3RoaXMub3B0aW9ucy5yZXZlYWxPbikpIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMucmV2ZWFsKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgSW5DYW52YXMgb24gY3VycmVudCBicmVha3BvaW50IGFuZCBhZGp1c3Qgb2ZmLWNhbnZhcyBhY2NvcmRpbmdseVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NoZWNrSW5DYW52YXMoKSB7XG4gICAgdGhpcy5pc0luQ2FudmFzID0gTWVkaWFRdWVyeS5hdExlYXN0KHRoaXMub3B0aW9ucy5pbkNhbnZhc09uKTtcbiAgICBpZiAodGhpcy5pc0luQ2FudmFzID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAqIFJlbW92aW5nIHRoZSBjbGFzc2VzIGlzIGltcG9ydGFudCB3aGVuIGFub3RoZXIgb2ZmLWNhbnZhcyBnZXRzIG9wZW5lZCB0aGF0IHVzZXMgdGhlIHNhbWUgY29udGVudCBjb250YWluZXIuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICBpZiAodHlwZW9mIGhhc1JldmVhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKHRoaXMuY29udGVudENsYXNzZXMuYmFzZS5qb2luKCcgJykpO1xuICAgIH0gZWxzZSBpZiAoaGFzUmV2ZWFsID09PSBmYWxzZSkge1xuICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIsIGJhc2VkIG9uIHRoZSBvcGVuaW5nIG9mZi1jYW52YXMgZWxlbWVudC5cbiAgICogQmVmb3JlaGFuZCBhbnkgdHJhbnNpdGlvbi9wb3NpdGlvbiBjbGFzcyBnZXRzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaGFzUmV2ZWFsIC0gdHJ1ZSBpZiByZWxhdGVkIG9mZi1jYW52YXMgZWxlbWVudCBpcyByZXZlYWxlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpIHtcbiAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcyhoYXNSZXZlYWwpO1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy10cmFuc2l0aW9uLSR7dGhpcy5vcHRpb25zLnRyYW5zaXRpb259IGhhcy1wb3NpdGlvbi0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoYGhhcy1yZXZlYWwtJHt0aGlzLnBvc2l0aW9ufWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVzZXJ2ZXMgdGhlIGZpeGVkIGJlaGF2aW9yIG9mIHN0aWNreSBlbGVtZW50cyBvbiBvcGVuaW5nIGFuIG9mZi1jYW52YXMgd2l0aCBwdXNoIHRyYW5zaXRpb24uXG4gICAqIFNpbmNlIHRoZSBvZmYtY2FudmFzIGNvbnRhaW5lciBoYXMgZ290IGEgdHJhbnNmb3JtIHNjb3BlIGluIHN1Y2ggYSBjYXNlLCBpdCBpcyBkb25lIGJ5IGNhbGN1bGF0aW5nIHBvc2l0aW9uIGFic29sdXRlIHZhbHVlcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9maXhTdGlja3lFbGVtZW50cygpIHtcbiAgICB0aGlzLiRzdGlja3kuZWFjaCgoXywgZWwpID0+IHtcbiAgICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuXG4gICAgICAvLyBJZiBzdGlja3kgZWxlbWVudCBpcyBjdXJyZW50bHkgZml4ZWQsIGFkanVzdCBpdHMgdG9wIHZhbHVlIHRvIG1hdGNoIGFic29sdXRlIHBvc2l0aW9uIGR1ZSB0byB0cmFuc2Zvcm0gc2NvcGVcbiAgICAgIC8vIExpbWl0IHRvIHB1c2ggdHJhbnNpdGlvbiBiZWNhdXNlIHBvc3Rpb246Zml4ZWQgd29ya3Mgd2l0aG91dCBwcm9ibGVtcyBmb3Igb3ZlcmxhcCAobm8gdHJhbnNmb3JtIHNjb3BlKVxuICAgICAgaWYgKCRlbC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcpIHtcblxuICAgICAgICAvLyBTYXZlIGN1cnJlbnQgaW5saW5lIHN0eWxpbmcgdG8gcmVzdG9yZSBpdCBpZiB1bmRvaW5nIHRoZSBhYnNvbHV0ZSBmaXhpbmdcbiAgICAgICAgbGV0IHRvcFZhbCA9IHBhcnNlSW50KCRlbC5jc3MoJ3RvcCcpLCAxMCk7XG4gICAgICAgICRlbC5kYXRhKCdvZmZDYW52YXNTdGlja3knLCB7IHRvcDogdG9wVmFsIH0pO1xuXG4gICAgICAgIGxldCBhYnNvbHV0ZVRvcFZhbCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpICsgdG9wVmFsO1xuICAgICAgICAkZWwuY3NzKHsgdG9wOiBgJHthYnNvbHV0ZVRvcFZhbH1weGAsIHdpZHRoOiAnMTAwJScsIHRyYW5zaXRpb246ICdub25lJyB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyB0aGUgb3JpZ2luYWwgZml4ZWQgc3R5bGluZyBvZiBzdGlja3kgZWxlbWVudHMgYWZ0ZXIgaGF2aW5nIGNsb3NlZCBhbiBvZmYtY2FudmFzIHRoYXQgZ290IHBzZXVkbyBmaXhlZCBiZWZvcmVoYW5kLlxuICAgKiBUaGlzIHJldmVydHMgdGhlIGNoYW5nZXMgb2YgX2ZpeFN0aWNreUVsZW1lbnRzKClcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91bmZpeFN0aWNreUVsZW1lbnRzKCkge1xuICAgIHRoaXMuJHN0aWNreS5lYWNoKChfLCBlbCkgPT4ge1xuICAgICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgICBsZXQgc3RpY2t5RGF0YSA9ICRlbC5kYXRhKCdvZmZDYW52YXNTdGlja3knKTtcblxuICAgICAgLy8gSWYgc3RpY2t5IGVsZW1lbnQgaGFzIGdvdCBkYXRhIG9iamVjdCB3aXRoIHByaW9yIHZhbHVlcyAobWVhbmluZyBpdCB3YXMgb3JpZ2luYWxseSBmaXhlZCkgcmVzdG9yZSB0aGVzZSB2YWx1ZXMgb25jZSBvZmYtY2FudmFzIGlzIGNsb3NlZFxuICAgICAgaWYgKHR5cGVvZiBzdGlja3lEYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICAkZWwuY3NzKHsgdG9wOiBgJHtzdGlja3lEYXRhLnRvcH1weGAsIHdpZHRoOiAnJywgdHJhbnNpdGlvbjogJycgfSlcbiAgICAgICAgJGVsLmRhdGEoJ29mZkNhbnZhc1N0aWNreScsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXZlYWxpbmcvaGlkaW5nIHRoZSBvZmYtY2FudmFzIGF0IGJyZWFrcG9pbnRzLCBub3QgdGhlIHNhbWUgYXMgb3Blbi5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpc1JldmVhbGVkIC0gdHJ1ZSBpZiBlbGVtZW50IHNob3VsZCBiZSByZXZlYWxlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICByZXZlYWwoaXNSZXZlYWxlZCkge1xuICAgIGlmIChpc1JldmVhbGVkKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB0aGlzLmlzUmV2ZWFsZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ29wZW4uemYudHJpZ2dlciB0b2dnbGUuemYudHJpZ2dlcicpO1xuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJykub24oe1xuICAgICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAgICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcylcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgfVxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKGlzUmV2ZWFsZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHNjcm9sbGluZyBvZiB0aGUgYm9keSB3aGVuIE9mZkNhbnZhcyBpcyBvcGVuIG9uIG1vYmlsZSBTYWZhcmkgYW5kIG90aGVyIHRyb3VibGVzb21lIGJyb3dzZXJzLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zdG9wU2Nyb2xsaW5nKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGN1cnJlbnQgZmluZ2VyIHktcG9zaXRpb25cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVjb3JkU2Nyb2xsYWJsZShldmVudCkge1xuICAgIGNvbnN0IGVsZW0gPSB0aGlzO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXZlbnQgZnVydGhlciBzY3JvbGxpbmcgd2hlbiBpdCBoaXRzIHRoZSBlZGdlc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wcmV2ZW50RGVmYXVsdEF0RWRnZXMoZXZlbnQpIHtcbiAgICBjb25zdCBlbGVtID0gdGhpcztcbiAgICBjb25zdCBfdGhpcyA9IGV2ZW50LmRhdGE7XG4gICAgY29uc3QgZGVsdGEgPSBlbGVtLmxhc3RZIC0gZXZlbnQudG91Y2hlc1swXS5wYWdlWTtcbiAgICBlbGVtLmxhc3RZID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWTtcblxuICAgIGlmICghX3RoaXMuX2NhblNjcm9sbChkZWx0YSwgZWxlbSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBjb250aW51b3VzIHNjcm9sbGluZyBvZiBzY3JvbGxib3hcbiAgICogRG9uJ3QgYnViYmxlIHVwIHRvIF9wcmV2ZW50RGVmYXVsdEF0RWRnZXNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2Nyb2xsYm94VG91Y2hNb3ZlZChldmVudCkge1xuICAgIGNvbnN0IGVsZW0gPSB0aGlzO1xuICAgIGNvbnN0IF90aGlzID0gZXZlbnQuZGF0YTtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtLmNsb3Nlc3QoJ1tkYXRhLW9mZi1jYW52YXNdLCBbZGF0YS1vZmYtY2FudmFzLXNjcm9sbGJveC1vdXRlcl0nKTtcbiAgICBjb25zdCBkZWx0YSA9IGVsZW0ubGFzdFkgLSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIHBhcmVudC5sYXN0WSA9IGVsZW0ubGFzdFkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIV90aGlzLl9jYW5TY3JvbGwoZGVsdGEsIGVsZW0pKSB7XG4gICAgICBpZiAoIV90aGlzLl9jYW5TY3JvbGwoZGVsdGEsIHBhcmVudCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudC5zY3JvbGxUb3AgKz0gZGVsdGE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBwb3NzaWJpbGl0eSBvZiBzY3JvbGxpbmdcbiAgICogQHBhcmFtIGRlbHRhXG4gICAqIEBwYXJhbSBlbGVtXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jYW5TY3JvbGwoZGVsdGEsIGVsZW0pIHtcbiAgICBjb25zdCB1cCA9IGRlbHRhIDwgMDtcbiAgICBjb25zdCBkb3duID0gZGVsdGEgPiAwO1xuICAgIGNvbnN0IGFsbG93VXAgPSBlbGVtLnNjcm9sbFRvcCA+IDA7XG4gICAgY29uc3QgYWxsb3dEb3duID0gZWxlbS5zY3JvbGxUb3AgPCBlbGVtLnNjcm9sbEhlaWdodCAtIGVsZW0uY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiB1cCAmJiBhbGxvd1VwIHx8IGRvd24gJiYgYWxsb3dEb3duO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBvZmYtY2FudmFzIG1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBvYmplY3QgcGFzc2VkIGZyb20gbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSB0cmlnZ2VyIC0gZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgb2ZmLWNhbnZhcyB0byBvcGVuLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI29wZW5lZFxuICAgKiBAdG9kbyBhbHNvIHRyaWdnZXIgJ29wZW4nIGV2ZW50P1xuICAgKi9cbiAgb3BlbihldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykgfHwgdGhpcy5pc1JldmVhbGVkIHx8IHRoaXMuaXNJbkNhbnZhcykgeyByZXR1cm47IH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gdHJpZ2dlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcmNlVG8gPT09ICd0b3AnKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lICYmIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uICE9PSAnb3ZlcmxhcCcpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJycpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5yZW1vdmVDbGFzcygnaXMtY2xvc2VkJyk7XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LmFkZENsYXNzKCdpcy1vcGVuLScgKyB0aGlzLnBvc2l0aW9uKTtcblxuICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIGFkZCBjbGFzcyBhbmQgZGlzYWJsZSBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcy5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9uKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNobW92ZScsIHRoaXMsIHRoaXMuX3ByZXZlbnREZWZhdWx0QXRFZGdlcyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaHN0YXJ0JywgJ1tkYXRhLW9mZi1jYW52YXMtc2Nyb2xsYm94XScsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2htb3ZlJywgJ1tkYXRhLW9mZi1jYW52YXMtc2Nyb2xsYm94XScsIHRoaXMsIHRoaXMuX3Njcm9sbGJveFRvdWNoTW92ZWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayA9PT0gdHJ1ZSAmJiB0aGlzLm9wdGlvbnMuY29udGVudE92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLWNsb3NhYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV90aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICByZXR1cm47IC8vIGV4aXQgaWYgcHJlbWF0dXJlbHkgY2xvc2VkXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhc0ZvY3VzID0gX3RoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtYXV0b2ZvY3VzXScpO1xuICAgICAgICBpZiAoY2FudmFzRm9jdXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYW52YXNGb2N1cy5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJGVsZW1lbnQuZmluZCgnYSwgYnV0dG9uJykuZXEoMCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPT09ICdwdXNoJykge1xuICAgICAgdGhpcy5fZml4U3RpY2t5RWxlbWVudHMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRDb250ZW50Q2xhc3NlcygpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW5zLlxuICAgICAqIEBldmVudCBPZmZDYW52YXMjb3BlbmVkXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuZWQuemYub2ZmQ2FudmFzJyk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbiB0cmFuc2l0aW9uIGlzIGRvbmUuXG4gICAgICogQGV2ZW50IE9mZkNhbnZhcyNvcGVuZWRFbmRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50Lm9uZSh0cmFuc2l0aW9uZW5kKHRoaXMuJGVsZW1lbnQpLCAoKSA9PiB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW5lZEVuZC56Zi5vZmZDYW52YXMnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gb3B0aW9uYWwgY2IgdG8gZmlyZSBhZnRlciBjbG9zdXJlLlxuICAgKiBAZmlyZXMgT2ZmQ2FudmFzI2Nsb3NlXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjY2xvc2VkXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgY2xvc2VzLlxuICAgICAqIEBldmVudCBPZmZDYW52YXMjY2xvc2VcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlLnpmLm9mZkNhbnZhcycpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuLWxlZnQgaXMtb3Blbi10b3AgaXMtb3Blbi1yaWdodCBpcy1vcGVuLWJvdHRvbScpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLiR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cblxuICAgIC8vIExpc3RlbiB0byB0cmFuc2l0aW9uRW5kOiBhZGQgY2xhc3MsIHJlLWVuYWJsZSBzY3JvbGxpbmcgYW5kIHJlbGVhc2UgZm9jdXMgd2hlbiBkb25lLlxuICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksICgpID0+IHtcblxuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtY2xvc2VkJyk7XG4gICAgICB0aGlzLl9yZW1vdmVDb250ZW50Q2xhc3NlcygpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPT09ICdwdXNoJykge1xuICAgICAgICB0aGlzLl91bmZpeFN0aWNreUVsZW1lbnRzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGBjb250ZW50U2Nyb2xsYCBpcyBzZXQgdG8gZmFsc2UsIHJlbW92ZSBjbGFzcyBhbmQgcmUtZW5hYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID09PSBmYWxzZSkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLW9mZi1jYW52YXMtb3BlbicpLm9mZigndG91Y2htb3ZlJywgdGhpcy5fc3RvcFNjcm9sbGluZyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaHN0YXJ0JywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9wcmV2ZW50RGVmYXVsdEF0RWRnZXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2hzdGFydCcsICdbZGF0YS1vZmYtY2FudmFzLXNjcm9sbGJveF0nLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNobW92ZScsICdbZGF0YS1vZmYtY2FudmFzLXNjcm9sbGJveF0nLCB0aGlzLl9zY3JvbGxib3hUb3VjaE1vdmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy4kY29udGVudC5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXModGhpcy4kZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgb2ZmLWNhbnZhcyBtZW51IGNsb3NlIHRyYW5zaXRpb24gaXMgZG9uZS5cbiAgICAgICAqIEBldmVudCBPZmZDYW52YXMjY2xvc2VkXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLm9mZkNhbnZhcycpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9mZi1jYW52YXMgbWVudSBvcGVuIG9yIGNsb3NlZC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqL1xuICB0b2dnbGUoZXZlbnQsIHRyaWdnZXIpIHtcbiAgICBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICB0aGlzLmNsb3NlKGV2ZW50LCB0cmlnZ2VyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGtleWJvYXJkIGlucHV0IHdoZW4gZGV0ZWN0ZWQuIFdoZW4gdGhlIGVzY2FwZSBrZXkgaXMgcHJlc3NlZCwgdGhlIG9mZi1jYW52YXMgbWVudSBjbG9zZXMsIGFuZCBmb2N1cyBpcyByZXN0b3JlZCB0byB0aGUgZWxlbWVudCB0aGF0IG9wZW5lZCB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGFuZGxlS2V5Ym9hcmQoZSkge1xuICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnT2ZmQ2FudmFzJywge1xuICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLiRsYXN0VHJpZ2dlci5mb2N1cygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBoYW5kbGVkOiAoKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgT2ZmQ2FudmFzIHBsdWdpbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyIC56Zi5vZmZDYW52YXMnKTtcbiAgICB0aGlzLiRvdmVybGF5Lm9mZignLnpmLm9mZkNhbnZhcycpO1xuICAgIGlmICh0aGlzLm9uTG9hZExpc3RlbmVyKSAkKHdpbmRvdykub2ZmKHRoaXMub25Mb2FkTGlzdGVuZXIpO1xuICB9XG59XG5cbk9mZkNhbnZhcy5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEFsbG93IHRoZSB1c2VyIHRvIGNsaWNrIG91dHNpZGUgb2YgdGhlIG1lbnUgdG8gY2xvc2UgaXQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcblxuICAvKipcbiAgICogQWRkcyBhbiBvdmVybGF5IG9uIHRvcCBvZiBgW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRPdmVybGF5OiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUYXJnZXQgYW4gb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciBieSBJRCB0aGF0IG1heSBiZSBwbGFjZWQgYW55d2hlcmUuIElmIG51bGwgdGhlIGNsb3Nlc3QgY29udGVudCBjb250YWluZXIgd2lsbCBiZSB0YWtlbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgY29udGVudElkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIG9mZi1jYW52YXMgZWxlbWVudCBpcyBuZXN0ZWQgaW4gYW4gb2ZmLWNhbnZhcyBjb250ZW50LiBUaGlzIGlzIHJlcXVpcmVkIHdoZW4gdXNpbmcgdGhlIGNvbnRlbnRJZCBvcHRpb24gZm9yIGEgbmVzdGVkIGVsZW1lbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIG5lc3RlZDogbnVsbCxcblxuICAvKipcbiAgICogRW5hYmxlL2Rpc2FibGUgc2Nyb2xsaW5nIG9mIHRoZSBtYWluIGNvbnRlbnQgd2hlbiBhbiBvZmYgY2FudmFzIHBhbmVsIGlzIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNvbnRlbnRTY3JvbGw6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRoZSBvcGVuIGFuZCBjbG9zZSB0cmFuc2l0aW9uIHJlcXVpcmVzLCBpbmNsdWRpbmcgdGhlIGFwcHJvcHJpYXRlIG1pbGxpc2Vjb25kcyAoYG1zYCkgb3Igc2Vjb25kcyAoYHNgKSB1bml0IChlLmcuIGA1MDBtc2AsIGAuNzVzYCkgSWYgbm9uZSBzZWxlY3RlZCwgcHVsbHMgZnJvbSBib2R5IHN0eWxlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHRyYW5zaXRpb25UaW1lOiBudWxsLFxuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHRyYW5zaXRpb24gZm9yIHRoZSBPZmZDYW52YXMgbWVudS4gT3B0aW9ucyBhcmUgJ3B1c2gnLCAnZGV0YWNoZWQnIG9yICdzbGlkZScuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcHVzaFxuICAgKi9cbiAgdHJhbnNpdGlvbjogJ3B1c2gnLFxuXG4gIC8qKlxuICAgKiBGb3JjZSB0aGUgcGFnZSB0byBzY3JvbGwgdG8gdG9wIG9yIGJvdHRvbSBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBmb3JjZVRvOiBudWxsLFxuXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgT2ZmQ2FudmFzIHRvIHJlbWFpbiBvcGVuIGZvciBjZXJ0YWluIGJyZWFrcG9pbnRzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaXNSZXZlYWxlZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEJyZWFrcG9pbnQgYXQgd2hpY2ggdG8gcmV2ZWFsLiBKUyB3aWxsIHVzZSBhIFJlZ0V4cCB0byB0YXJnZXQgc3RhbmRhcmQgY2xhc3NlcywgaWYgY2hhbmdpbmcgY2xhc3NuYW1lcywgcGFzcyB5b3VyIGNsYXNzIHdpdGggdGhlIGByZXZlYWxDbGFzc2Agb3B0aW9uLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICByZXZlYWxPbjogbnVsbCxcblxuICAvKipcbiAgICogQnJlYWtwb2ludCBhdCB3aGljaCB0aGUgb2ZmLWNhbnZhcyBnZXRzIG1vdmVkIGludG8gY2FudmFzIGNvbnRlbnQgYW5kIGFjdHMgYXMgcmVndWxhciBwYWdlIGVsZW1lbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGluQ2FudmFzT246IG51bGwsXG5cbiAgLyoqXG4gICAqIEZvcmNlIGZvY3VzIHRvIHRoZSBvZmZjYW52YXMgb24gb3Blbi4gSWYgdHJ1ZSwgd2lsbCBmb2N1cyB0aGUgb3BlbmluZyB0cmlnZ2VyIG9uIGNsb3NlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvRm9jdXM6IHRydWUsXG5cbiAgLyoqXG4gICAqIENsYXNzIHVzZWQgdG8gZm9yY2UgYW4gT2ZmQ2FudmFzIHRvIHJlbWFpbiBvcGVuLiBGb3VuZGF0aW9uIGRlZmF1bHRzIGZvciB0aGlzIGFyZSBgcmV2ZWFsLWZvci1sYXJnZWAgJiBgcmV2ZWFsLWZvci1tZWRpdW1gLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IHJldmVhbC1mb3ItXG4gICAqIEB0b2RvIGltcHJvdmUgdGhlIHJlZ2V4IHRlc3RpbmcgZm9yIHRoaXMuXG4gICAqL1xuICByZXZlYWxDbGFzczogJ3JldmVhbC1mb3ItJyxcblxuICAvKipcbiAgICogVHJpZ2dlcnMgb3B0aW9uYWwgZm9jdXMgdHJhcHBpbmcgd2hlbiBvcGVuaW5nIGFuIE9mZkNhbnZhcy4gU2V0cyB0YWJpbmRleCBvZiBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdIHRvIC0xIGZvciBhY2Nlc3NpYmlsaXR5IHB1cnBvc2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdHJhcEZvY3VzOiBmYWxzZVxufVxuXG5leHBvcnQge09mZkNhbnZhc307XG4iLCJpbXBvcnQgeyBCb3ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5ib3gnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5cbmNvbnN0IFBPU0lUSU9OUyA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG5jb25zdCBWRVJUSUNBTF9BTElHTk1FTlRTID0gWyd0b3AnLCAnYm90dG9tJywgJ2NlbnRlciddO1xuY29uc3QgSE9SSVpPTlRBTF9BTElHTk1FTlRTID0gWydsZWZ0JywgJ3JpZ2h0JywgJ2NlbnRlciddO1xuXG5jb25zdCBBTElHTk1FTlRTID0ge1xuICAnbGVmdCc6IFZFUlRJQ0FMX0FMSUdOTUVOVFMsXG4gICdyaWdodCc6IFZFUlRJQ0FMX0FMSUdOTUVOVFMsXG4gICd0b3AnOiBIT1JJWk9OVEFMX0FMSUdOTUVOVFMsXG4gICdib3R0b20nOiBIT1JJWk9OVEFMX0FMSUdOTUVOVFNcbn1cblxuZnVuY3Rpb24gbmV4dEl0ZW0oaXRlbSwgYXJyYXkpIHtcbiAgdmFyIGN1cnJlbnRJZHggPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICBpZihjdXJyZW50SWR4ID09PSBhcnJheS5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGFycmF5WzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhcnJheVtjdXJyZW50SWR4ICsgMV07XG4gIH1cbn1cblxuXG5jbGFzcyBQb3NpdGlvbmFibGUgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQWJzdHJhY3QgY2xhc3MgZW5jYXBzdWxhdGluZyB0aGUgdGV0aGVyLWxpa2UgZXhwbGljaXQgcG9zaXRpb25pbmcgbG9naWNcbiAgICogaW5jbHVkaW5nIHJlcG9zaXRpb25pbmcgYmFzZWQgb24gb3ZlcmxhcC5cbiAgICogRXhwZWN0cyBjbGFzc2VzIHRvIGRlZmluZSBkZWZhdWx0cyBmb3Igdk9mZnNldCwgaE9mZnNldCwgcG9zaXRpb24sXG4gICAqIGFsaWdubWVudCwgYWxsb3dPdmVybGFwLCBhbmQgYWxsb3dCb3R0b21PdmVybGFwLiBUaGV5IGNhbiBkbyB0aGlzIGJ5XG4gICAqIGV4dGVuZGluZyB0aGUgZGVmYXVsdHMsIG9yIChmb3Igbm93IHJlY29tbWVuZGVkIGR1ZSB0byB0aGUgd2F5IGRvY3MgYXJlXG4gICAqIGdlbmVyYXRlZCkgYnkgZXhwbGljaXRseSBkZWNsYXJpbmcgdGhlbS5cbiAgICpcbiAgICoqL1xuXG4gIF9pbml0KCkge1xuICAgIHRoaXMudHJpZWRQb3NpdGlvbnMgPSB7fTtcbiAgICB0aGlzLnBvc2l0aW9uICA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2F1dG8nID8gdGhpcy5fZ2V0RGVmYXVsdFBvc2l0aW9uKCkgOiB0aGlzLm9wdGlvbnMucG9zaXRpb247XG4gICAgdGhpcy5hbGlnbm1lbnQgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnYXV0bycgPyB0aGlzLl9nZXREZWZhdWx0QWxpZ25tZW50KCkgOiB0aGlzLm9wdGlvbnMuYWxpZ25tZW50O1xuICAgIHRoaXMub3JpZ2luYWxQb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgdGhpcy5vcmlnaW5hbEFsaWdubWVudCA9IHRoaXMuYWxpZ25tZW50O1xuICB9XG5cbiAgX2dldERlZmF1bHRQb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuICdib3R0b20nO1xuICB9XG5cbiAgX2dldERlZmF1bHRBbGlnbm1lbnQoKSB7XG4gICAgc3dpdGNoKHRoaXMucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICByZXR1cm4gUnRsKCkgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRqdXN0cyB0aGUgcG9zaXRpb25hYmxlIHBvc3NpYmxlIHBvc2l0aW9ucyBieSBpdGVyYXRpbmcgdGhyb3VnaCBhbGlnbm1lbnRzXG4gICAqIGFuZCBwb3NpdGlvbnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlcG9zaXRpb24oKSB7XG4gICAgaWYodGhpcy5fYWxpZ25tZW50c0V4aGF1c3RlZCh0aGlzLnBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IG5leHRJdGVtKHRoaXMucG9zaXRpb24sIFBPU0lUSU9OUyk7XG4gICAgICB0aGlzLmFsaWdubWVudCA9IEFMSUdOTUVOVFNbdGhpcy5wb3NpdGlvbl1bMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlYWxpZ24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRqdXN0cyB0aGUgZHJvcGRvd24gcGFuZSBwb3NzaWJsZSBwb3NpdGlvbnMgYnkgaXRlcmF0aW5nIHRocm91Z2ggYWxpZ25tZW50c1xuICAgKiBvbiB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVhbGlnbigpIHtcbiAgICB0aGlzLl9hZGRUcmllZFBvc2l0aW9uKHRoaXMucG9zaXRpb24sIHRoaXMuYWxpZ25tZW50KVxuICAgIHRoaXMuYWxpZ25tZW50ID0gbmV4dEl0ZW0odGhpcy5hbGlnbm1lbnQsIEFMSUdOTUVOVFNbdGhpcy5wb3NpdGlvbl0pXG4gIH1cblxuICBfYWRkVHJpZWRQb3NpdGlvbihwb3NpdGlvbiwgYWxpZ25tZW50KSB7XG4gICAgdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0gPSB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXSB8fCBbXVxuICAgIHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dLnB1c2goYWxpZ25tZW50KTtcbiAgfVxuXG4gIF9wb3NpdGlvbnNFeGhhdXN0ZWQoKSB7XG4gICAgdmFyIGlzRXhoYXVzdGVkID0gdHJ1ZTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgUE9TSVRJT05TLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpc0V4aGF1c3RlZCA9IGlzRXhoYXVzdGVkICYmIHRoaXMuX2FsaWdubWVudHNFeGhhdXN0ZWQoUE9TSVRJT05TW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRXhoYXVzdGVkO1xuICB9XG5cbiAgX2FsaWdubWVudHNFeGhhdXN0ZWQocG9zaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0gJiYgdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0ubGVuZ3RoID09PSBBTElHTk1FTlRTW3Bvc2l0aW9uXS5sZW5ndGg7XG4gIH1cblxuXG4gIC8vIFdoZW4gd2UncmUgdHJ5aW5nIHRvIGNlbnRlciwgd2UgZG9uJ3Qgd2FudCB0byBhcHBseSBvZmZzZXQgdGhhdCdzIGdvaW5nIHRvXG4gIC8vIHRha2UgdXMganVzdCBvZmYgY2VudGVyLCBzbyB3cmFwIGFyb3VuZCB0byByZXR1cm4gMCBmb3IgdGhlIGFwcHJvcHJpYXRlXG4gIC8vIG9mZnNldCBpbiB0aG9zZSBhbGlnbm1lbnRzLiAgVE9ETzogRmlndXJlIG91dCBpZiB3ZSB3YW50IHRvIG1ha2UgdGhpc1xuICAvLyBjb25maWd1cmFibGUgYmVoYXZpb3IuLi4gaXQgZmVlbHMgbW9yZSBpbnR1aXRpdmUsIGVzcGVjaWFsbHkgZm9yIHRvb2x0aXBzLCBidXRcbiAgLy8gaXQncyBwb3NzaWJsZSBzb21lb25lIG1pZ2h0IGFjdHVhbGx5IHdhbnQgdG8gc3RhcnQgZnJvbSBjZW50ZXIgYW5kIHRoZW4gbnVkZ2VcbiAgLy8gc2xpZ2h0bHkgb2ZmLlxuICBfZ2V0Vk9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnZPZmZzZXQ7XG4gIH1cblxuICBfZ2V0SE9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhPZmZzZXQ7XG4gIH1cblxuICBfc2V0UG9zaXRpb24oJGFuY2hvciwgJGVsZW1lbnQsICRwYXJlbnQpIHtcbiAgICBpZigkYW5jaG9yLmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ2ZhbHNlJyl7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYWxsb3dPdmVybGFwKSB7XG4gICAgICAvLyByZXN0b3JlIG9yaWdpbmFsIHBvc2l0aW9uICYgYWxpZ25tZW50IGJlZm9yZSBjaGVja2luZyBvdmVybGFwXG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5vcmlnaW5hbFBvc2l0aW9uO1xuICAgICAgdGhpcy5hbGlnbm1lbnQgPSB0aGlzLm9yaWdpbmFsQWxpZ25tZW50O1xuICAgIH1cblxuICAgICRlbGVtZW50Lm9mZnNldChCb3guR2V0RXhwbGljaXRPZmZzZXRzKCRlbGVtZW50LCAkYW5jaG9yLCB0aGlzLnBvc2l0aW9uLCB0aGlzLmFsaWdubWVudCwgdGhpcy5fZ2V0Vk9mZnNldCgpLCB0aGlzLl9nZXRIT2Zmc2V0KCkpKTtcblxuICAgIGlmKCF0aGlzLm9wdGlvbnMuYWxsb3dPdmVybGFwKSB7XG4gICAgICB2YXIgbWluT3ZlcmxhcCA9IDEwMDAwMDAwMDtcbiAgICAgIC8vIGRlZmF1bHQgY29vcmRpbmF0ZXMgdG8gaG93IHdlIHN0YXJ0LCBpbiBjYXNlIHdlIGNhbid0IGZpZ3VyZSBvdXQgYmV0dGVyXG4gICAgICB2YXIgbWluQ29vcmRpbmF0ZXMgPSB7cG9zaXRpb246IHRoaXMucG9zaXRpb24sIGFsaWdubWVudDogdGhpcy5hbGlnbm1lbnR9O1xuICAgICAgd2hpbGUoIXRoaXMuX3Bvc2l0aW9uc0V4aGF1c3RlZCgpKSB7XG4gICAgICAgIGxldCBvdmVybGFwID0gQm94Lk92ZXJsYXBBcmVhKCRlbGVtZW50LCAkcGFyZW50LCBmYWxzZSwgZmFsc2UsIHRoaXMub3B0aW9ucy5hbGxvd0JvdHRvbU92ZXJsYXApO1xuICAgICAgICBpZihvdmVybGFwID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYob3ZlcmxhcCA8IG1pbk92ZXJsYXApIHtcbiAgICAgICAgICBtaW5PdmVybGFwID0gb3ZlcmxhcDtcbiAgICAgICAgICBtaW5Db29yZGluYXRlcyA9IHtwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiwgYWxpZ25tZW50OiB0aGlzLmFsaWdubWVudH07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgJGVsZW1lbnQub2Zmc2V0KEJveC5HZXRFeHBsaWNpdE9mZnNldHMoJGVsZW1lbnQsICRhbmNob3IsIHRoaXMucG9zaXRpb24sIHRoaXMuYWxpZ25tZW50LCB0aGlzLl9nZXRWT2Zmc2V0KCksIHRoaXMuX2dldEhPZmZzZXQoKSkpO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgZ2V0IHRocm91Z2ggdGhlIGVudGlyZSBsb29wLCB0aGVyZSB3YXMgbm8gbm9uLW92ZXJsYXBwaW5nXG4gICAgICAvLyBwb3NpdGlvbiBhdmFpbGFibGUuIFBpY2sgdGhlIHZlcnNpb24gd2l0aCBsZWFzdCBvdmVybGFwLlxuICAgICAgdGhpcy5wb3NpdGlvbiA9IG1pbkNvb3JkaW5hdGVzLnBvc2l0aW9uO1xuICAgICAgdGhpcy5hbGlnbm1lbnQgPSBtaW5Db29yZGluYXRlcy5hbGlnbm1lbnQ7XG4gICAgICAkZWxlbWVudC5vZmZzZXQoQm94LkdldEV4cGxpY2l0T2Zmc2V0cygkZWxlbWVudCwgJGFuY2hvciwgdGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQsIHRoaXMuX2dldFZPZmZzZXQoKSwgdGhpcy5fZ2V0SE9mZnNldCgpKSk7XG4gICAgfVxuICB9XG5cbn1cblxuUG9zaXRpb25hYmxlLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogUG9zaXRpb24gb2YgcG9zaXRpb25hYmxlIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIHBvc2l0aW9uOiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGlnbm1lbnQgb2YgcG9zaXRpb25hYmxlIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgY2VudGVyLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIGNvbnRhaW5lci93aW5kb3cuIElmIGZhbHNlLCBkcm9wZG93biBwb3NpdGlvbmFibGUgZmlyc3RcbiAgICogdHJ5IHRvIHBvc2l0aW9uIGFzIGRlZmluZWQgYnkgZGF0YS1wb3NpdGlvbiBhbmQgZGF0YS1hbGlnbm1lbnQsIGJ1dFxuICAgKiByZXBvc2l0aW9uIGlmIGl0IHdvdWxkIGNhdXNlIGFuIG92ZXJmbG93LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWxsb3dPdmVybGFwOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IG92ZXJsYXAgb2Ygb25seSB0aGUgYm90dG9tIG9mIHRoZSBjb250YWluZXIuIFRoaXMgaXMgdGhlIG1vc3QgY29tbW9uXG4gICAqIGJlaGF2aW9yIGZvciBkcm9wZG93bnMsIGFsbG93aW5nIHRoZSBkcm9wZG93biB0byBleHRlbmQgdGhlIGJvdHRvbSBvZiB0aGVcbiAgICogc2NyZWVuIGJ1dCBub3Qgb3RoZXJ3aXNlIGluZmx1ZW5jZSBvciBicmVhayBvdXQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYWxsb3dCb3R0b21PdmVybGFwOiB0cnVlLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0aGUgcG9zaXRpb25hYmxlIHNob3VsZCBiZSBzZXBhcmF0ZWQgdmVydGljYWxseSBmcm9tIGFuY2hvclxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHZPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRoZSBwb3NpdGlvbmFibGUgc2hvdWxkIGJlIHNlcGFyYXRlZCBob3Jpem9udGFsbHkgZnJvbSBhbmNob3JcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoT2Zmc2V0OiAwLFxufVxuXG5leHBvcnQge1Bvc2l0aW9uYWJsZX07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnBsdWdpbic7XG5cbmltcG9ydCB7IERyb3Bkb3duTWVudSB9IGZyb20gJy4vZm91bmRhdGlvbi5kcm9wZG93bk1lbnUnO1xuaW1wb3J0IHsgRHJpbGxkb3duIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmRyaWxsZG93bic7XG5pbXBvcnQgeyBBY2NvcmRpb25NZW51IH0gZnJvbSAnLi9mb3VuZGF0aW9uLmFjY29yZGlvbk1lbnUnO1xuXG5sZXQgTWVudVBsdWdpbnMgPSB7XG4gIGRyb3Bkb3duOiB7XG4gICAgY3NzQ2xhc3M6ICdkcm9wZG93bicsXG4gICAgcGx1Z2luOiBEcm9wZG93bk1lbnVcbiAgfSxcbiBkcmlsbGRvd246IHtcbiAgICBjc3NDbGFzczogJ2RyaWxsZG93bicsXG4gICAgcGx1Z2luOiBEcmlsbGRvd25cbiAgfSxcbiAgYWNjb3JkaW9uOiB7XG4gICAgY3NzQ2xhc3M6ICdhY2NvcmRpb24tbWVudScsXG4gICAgcGx1Z2luOiBBY2NvcmRpb25NZW51XG4gIH1cbn07XG5cbiAgLy8gaW1wb3J0IFwiZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzLmpzXCI7XG5cblxuLyoqXG4gKiBSZXNwb25zaXZlTWVudSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ucmVzcG9uc2l2ZU1lbnVcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICovXG5cbmNsYXNzIFJlc3BvbnNpdmVNZW51IGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSByZXNwb25zaXZlIG1lbnUuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBSZXNwb25zaXZlTWVudVxuICAgKiBAZmlyZXMgUmVzcG9uc2l2ZU1lbnUjaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGEgZHJvcGRvd24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICB0aGlzLnJ1bGVzID0gdGhpcy4kZWxlbWVudC5kYXRhKCdyZXNwb25zaXZlLW1lbnUnKTtcbiAgICB0aGlzLmN1cnJlbnRNcSA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50UGx1Z2luID0gbnVsbDtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdSZXNwb25zaXZlTWVudSc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBNZW51IGJ5IHBhcnNpbmcgdGhlIGNsYXNzZXMgZnJvbSB0aGUgJ2RhdGEtUmVzcG9uc2l2ZU1lbnUnIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcblxuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICAvLyBUaGUgZmlyc3QgdGltZSBhbiBJbnRlcmNoYW5nZSBwbHVnaW4gaXMgaW5pdGlhbGl6ZWQsIHRoaXMucnVsZXMgaXMgY29udmVydGVkIGZyb20gYSBzdHJpbmcgb2YgXCJjbGFzc2VzXCIgdG8gYW4gb2JqZWN0IG9mIHJ1bGVzXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJ1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IHJ1bGVzVHJlZSA9IHt9O1xuXG4gICAgICAvLyBQYXJzZSBydWxlcyBmcm9tIFwiY2xhc3Nlc1wiIHB1bGxlZCBmcm9tIGRhdGEgYXR0cmlidXRlXG4gICAgICBsZXQgcnVsZXMgPSB0aGlzLnJ1bGVzLnNwbGl0KCcgJyk7XG5cbiAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBldmVyeSBydWxlIGZvdW5kXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBydWxlID0gcnVsZXNbaV0uc3BsaXQoJy0nKTtcbiAgICAgICAgbGV0IHJ1bGVTaXplID0gcnVsZS5sZW5ndGggPiAxID8gcnVsZVswXSA6ICdzbWFsbCc7XG4gICAgICAgIGxldCBydWxlUGx1Z2luID0gcnVsZS5sZW5ndGggPiAxID8gcnVsZVsxXSA6IHJ1bGVbMF07XG5cbiAgICAgICAgaWYgKE1lbnVQbHVnaW5zW3J1bGVQbHVnaW5dICE9PSBudWxsKSB7XG4gICAgICAgICAgcnVsZXNUcmVlW3J1bGVTaXplXSA9IE1lbnVQbHVnaW5zW3J1bGVQbHVnaW5dO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucnVsZXMgPSBydWxlc1RyZWU7XG4gICAgfVxuXG4gICAgaWYgKCEkLmlzRW1wdHlPYmplY3QodGhpcy5ydWxlcykpIHtcbiAgICAgIHRoaXMuX2NoZWNrTWVkaWFRdWVyaWVzKCk7XG4gICAgfVxuICAgIC8vIEFkZCBkYXRhLW11dGF0ZSBzaW5jZSBjaGlsZHJlbiBtYXkgbmVlZCBpdC5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtbXV0YXRlJywgKHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1tdXRhdGUnKSB8fCBHZXRZb0RpZ2l0cyg2LCAncmVzcG9uc2l2ZS1tZW51JykpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIHRoZSBNZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5fY2hlY2tNZWRpYVF1ZXJpZXMoKTtcbiAgICB9KTtcbiAgICAvLyAkKHdpbmRvdykub24oJ3Jlc2l6ZS56Zi5SZXNwb25zaXZlTWVudScsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgX3RoaXMuX2NoZWNrTWVkaWFRdWVyaWVzKCk7XG4gICAgLy8gfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBjdXJyZW50IHNjcmVlbiB3aWR0aCBhZ2FpbnN0IGF2YWlsYWJsZSBtZWRpYSBxdWVyaWVzLiBJZiB0aGUgbWVkaWEgcXVlcnkgaGFzIGNoYW5nZWQsIGFuZCB0aGUgcGx1Z2luIG5lZWRlZCBoYXMgY2hhbmdlZCwgdGhlIHBsdWdpbnMgd2lsbCBzd2FwIG91dC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tNZWRpYVF1ZXJpZXMoKSB7XG4gICAgdmFyIG1hdGNoZWRNcSwgX3RoaXMgPSB0aGlzO1xuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHJ1bGUgYW5kIGZpbmQgdGhlIGxhc3QgbWF0Y2hpbmcgcnVsZVxuICAgICQuZWFjaCh0aGlzLnJ1bGVzLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChNZWRpYVF1ZXJ5LmF0TGVhc3Qoa2V5KSkge1xuICAgICAgICBtYXRjaGVkTXEgPSBrZXk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBObyBtYXRjaD8gTm8gZGljZVxuICAgIGlmICghbWF0Y2hlZE1xKSByZXR1cm47XG5cbiAgICAvLyBQbHVnaW4gYWxyZWFkeSBpbml0aWFsaXplZD8gV2UgZ29vZFxuICAgIGlmICh0aGlzLmN1cnJlbnRQbHVnaW4gaW5zdGFuY2VvZiB0aGlzLnJ1bGVzW21hdGNoZWRNcV0ucGx1Z2luKSByZXR1cm47XG5cbiAgICAvLyBSZW1vdmUgZXhpc3RpbmcgcGx1Z2luLXNwZWNpZmljIENTUyBjbGFzc2VzXG4gICAgJC5lYWNoKE1lbnVQbHVnaW5zLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBfdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyh2YWx1ZS5jc3NDbGFzcyk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIENTUyBjbGFzcyBmb3IgdGhlIG5ldyBwbHVnaW5cbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMucnVsZXNbbWF0Y2hlZE1xXS5jc3NDbGFzcyk7XG5cbiAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIG5ldyBwbHVnaW5cbiAgICBpZiAodGhpcy5jdXJyZW50UGx1Z2luKSB0aGlzLmN1cnJlbnRQbHVnaW4uZGVzdHJveSgpO1xuICAgIHRoaXMuY3VycmVudFBsdWdpbiA9IG5ldyB0aGlzLnJ1bGVzW21hdGNoZWRNcV0ucGx1Z2luKHRoaXMuJGVsZW1lbnQsIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgaW5zdGFuY2Ugb2YgdGhlIGN1cnJlbnQgcGx1Z2luIG9uIHRoaXMgZWxlbWVudCwgYXMgd2VsbCBhcyB0aGUgd2luZG93IHJlc2l6ZSBoYW5kbGVyIHRoYXQgc3dpdGNoZXMgdGhlIHBsdWdpbnMgb3V0LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuY3VycmVudFBsdWdpbi5kZXN0cm95KCk7XG4gICAgJCh3aW5kb3cpLm9mZignLnpmLlJlc3BvbnNpdmVNZW51Jyk7XG4gIH1cbn1cblxuUmVzcG9uc2l2ZU1lbnUuZGVmYXVsdHMgPSB7fTtcblxuZXhwb3J0IHtSZXNwb25zaXZlTWVudX07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IG9uTG9hZCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgTWVkaWFRdWVyeSB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnknO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuaW1wb3J0IHsgVG91Y2ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50b3VjaCdcblxuLyoqXG4gKiBSZXZlYWwgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnJldmVhbFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50b3VjaFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1vdGlvbiBpZiB1c2luZyBhbmltYXRpb25zXG4gKi9cblxuY2xhc3MgUmV2ZWFsIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmV2ZWFsLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgUmV2ZWFsXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgZm9yIHRoZSBtb2RhbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBvcHRpb25hbCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgUmV2ZWFsLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnUmV2ZWFsJzsgLy8gaWU5IGJhY2sgY29tcGF0XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgLy8gVG91Y2ggYW5kIFRyaWdnZXJzIGluaXQgYXJlIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgdGhleSBhcmUgaW5pdGlhbGl6ZWRcbiAgICBUb3VjaC5pbml0KCQpO1xuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICBLZXlib2FyZC5yZWdpc3RlcignUmV2ZWFsJywge1xuICAgICAgJ0VTQ0FQRSc6ICdjbG9zZScsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG1vZGFsIGJ5IGFkZGluZyB0aGUgb3ZlcmxheSBhbmQgY2xvc2UgYnV0dG9ucywgKGlmIHNlbGVjdGVkKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICB0aGlzLmlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdpZCcpO1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmNhY2hlZCA9IHttcTogTWVkaWFRdWVyeS5jdXJyZW50fTtcblxuICAgIHRoaXMuJGFuY2hvciA9ICQoYFtkYXRhLW9wZW49XCIke3RoaXMuaWR9XCJdYCkubGVuZ3RoID8gJChgW2RhdGEtb3Blbj1cIiR7dGhpcy5pZH1cIl1gKSA6ICQoYFtkYXRhLXRvZ2dsZT1cIiR7dGhpcy5pZH1cIl1gKTtcbiAgICB0aGlzLiRhbmNob3IuYXR0cih7XG4gICAgICAnYXJpYS1jb250cm9scyc6IHRoaXMuaWQsXG4gICAgICAnYXJpYS1oYXNwb3B1cCc6ICdkaWFsb2cnLFxuICAgICAgJ3RhYmluZGV4JzogMFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mdWxsU2NyZWVuIHx8IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Z1bGwnKSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4gPSB0cnVlO1xuICAgICAgdGhpcy5vcHRpb25zLm92ZXJsYXkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5ICYmICF0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gdGhpcy5fbWFrZU92ZXJsYXkodGhpcy5pZCk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcbiAgICAgICAgJ2RhdGEteWV0aS1ib3gnOiB0aGlzLmlkLFxuICAgICAgICAnZGF0YS1yZXNpemUnOiB0aGlzLmlkXG4gICAgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKHRoaXMuJG92ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmRldGFjaCgpLmFwcGVuZFRvKCQodGhpcy5vcHRpb25zLmFwcGVuZFRvKSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCd3aXRob3V0LW92ZXJsYXknKTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluayAmJiB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCBgIyR7dGhpcy5pZH1gKSkge1xuICAgICAgdGhpcy5vbkxvYWRMaXN0ZW5lciA9IG9uTG9hZCgkKHdpbmRvdyksICgpID0+IHRoaXMub3BlbigpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvdmVybGF5IGRpdiB0byBkaXNwbGF5IGJlaGluZCB0aGUgbW9kYWwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWFrZU92ZXJsYXkoKSB7XG4gICAgdmFyIGFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcyA9ICcnO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXMpIHtcbiAgICAgIGFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcyA9ICcgJyArIHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuICQoJzxkaXY+PC9kaXY+JylcbiAgICAgIC5hZGRDbGFzcygncmV2ZWFsLW92ZXJsYXknICsgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzKVxuICAgICAgLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5hcHBlbmRUbyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBwb3NpdGlvbiBvZiBtb2RhbFxuICAgKiBUT0RPOiAgRmlndXJlIG91dCBpZiB3ZSBhY3R1YWxseSBuZWVkIHRvIGNhY2hlIHRoZXNlIHZhbHVlcyBvciBpZiBpdCBkb2Vzbid0IG1hdHRlclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3VwZGF0ZVBvc2l0aW9uKCkge1xuICAgIHZhciB3aWR0aCA9IHRoaXMuJGVsZW1lbnQub3V0ZXJXaWR0aCgpO1xuICAgIHZhciBvdXRlcldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuJGVsZW1lbnQub3V0ZXJIZWlnaHQoKTtcbiAgICB2YXIgb3V0ZXJIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdmFyIGxlZnQsIHRvcCA9IG51bGw7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oT2Zmc2V0ID09PSAnYXV0bycpIHtcbiAgICAgIGxlZnQgPSBwYXJzZUludCgob3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVmdCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy5oT2Zmc2V0LCAxMCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudk9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoaGVpZ2h0ID4gb3V0ZXJIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoTWF0aC5taW4oMTAwLCBvdXRlckhlaWdodCAvIDEwKSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wID0gcGFyc2VJbnQoKG91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDQsIDEwKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy52T2Zmc2V0ICE9PSBudWxsKSB7XG4gICAgICB0b3AgPSBwYXJzZUludCh0aGlzLm9wdGlvbnMudk9mZnNldCwgMTApO1xuICAgIH1cblxuICAgIGlmICh0b3AgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHt0b3A6IHRvcCArICdweCd9KTtcbiAgICB9XG5cbiAgICAvLyBvbmx5IHdvcnJ5IGFib3V0IGxlZnQgaWYgd2UgZG9uJ3QgaGF2ZSBhbiBvdmVybGF5IG9yIHdlIGhhdmUgYSBob3Jpem9udGFsIG9mZnNldCxcbiAgICAvLyBvdGhlcndpc2Ugd2UncmUgcGVyZmVjdGx5IGluIHRoZSBtaWRkbGVcbiAgICBpZiAoIXRoaXMuJG92ZXJsYXkgfHwgKHRoaXMub3B0aW9ucy5oT2Zmc2V0ICE9PSAnYXV0bycpKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmNzcyh7bGVmdDogbGVmdCArICdweCd9KTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHttYXJnaW46ICcwcHgnfSk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyBmb3IgdGhlIG1vZGFsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5vbih7XG4gICAgICAnb3Blbi56Zi50cmlnZ2VyJzogdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IChldmVudCwgJGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKChldmVudC50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdKSB8fFxuICAgICAgICAgICAgKCQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCdbZGF0YS1jbG9zYWJsZV0nKVswXSA9PT0gJGVsZW1lbnQpKSB7IC8vIG9ubHkgY2xvc2UgcmV2ZWFsIHdoZW4gaXQncyBleHBsaWNpdGx5IGNhbGxlZFxuICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NlLmFwcGx5KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl91cGRhdGVQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgJiYgdGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkub2ZmKCcuemYucmV2ZWFsJykub24oJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSB8fFxuICAgICAgICAgICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSB8fFxuICAgICAgICAgICAgISQuY29udGFpbnMoZG9jdW1lbnQsIGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub24oYGhhc2hjaGFuZ2UuemYucmV2ZWFsOiR7dGhpcy5pZH1gLCB0aGlzLl9oYW5kbGVTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtb2RhbCBtZXRob2RzIG9uIGJhY2svZm9yd2FyZCBidXR0b24gY2xpY2tzIG9yIGFueSBvdGhlciBldmVudCB0aGF0IHRyaWdnZXJzIGhhc2hjaGFuZ2UuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaGFuZGxlU3RhdGUoKSB7XG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICggJyMnICsgdGhpcy5pZCkgJiYgIXRoaXMuaXNBY3RpdmUpeyB0aGlzLm9wZW4oKTsgfVxuICAgIGVsc2V7IHRoaXMuY2xvc2UoKTsgfVxuICB9XG5cbiAgLyoqXG4gICogRGlzYWJsZXMgdGhlIHNjcm9sbCB3aGVuIFJldmVhbCBpcyBzaG93biB0byBwcmV2ZW50IHRoZSBiYWNrZ3JvdW5kIGZyb20gc2hpZnRpbmdcbiAgKiBAcGFyYW0ge251bWJlcn0gc2Nyb2xsVG9wIC0gU2Nyb2xsIHRvIHZpc3VhbGx5IGFwcGx5LCB3aW5kb3cgY3VycmVudCBzY3JvbGwgYnkgZGVmYXVsdFxuICAqL1xuICBfZGlzYWJsZVNjcm9sbChzY3JvbGxUb3ApIHtcbiAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgfHwgJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIGlmICgkKGRvY3VtZW50KS5oZWlnaHQoKSA+ICQod2luZG93KS5oZWlnaHQoKSkge1xuICAgICAgJChcImh0bWxcIilcbiAgICAgICAgLmNzcyhcInRvcFwiLCAtc2Nyb2xsVG9wKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBSZWVuYWJsZXMgdGhlIHNjcm9sbCB3aGVuIFJldmVhbCBjbG9zZXNcbiAgKiBAcGFyYW0ge251bWJlcn0gc2Nyb2xsVG9wIC0gU2Nyb2xsIHRvIHJlc3RvcmUsIGh0bWwgXCJ0b3BcIiBwcm9wZXJ0eSBieSBkZWZhdWx0IChhcyBzZXQgYnkgYF9kaXNhYmxlU2Nyb2xsYClcbiAgKi9cbiAgX2VuYWJsZVNjcm9sbChzY3JvbGxUb3ApIHtcbiAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgfHwgcGFyc2VJbnQoJChcImh0bWxcIikuY3NzKFwidG9wXCIpLCAxMCk7XG4gICAgaWYgKCQoZG9jdW1lbnQpLmhlaWdodCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKSB7XG4gICAgICAkKFwiaHRtbFwiKVxuICAgICAgICAuY3NzKFwidG9wXCIsIFwiXCIpO1xuICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgtc2Nyb2xsVG9wKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgbW9kYWwgY29udHJvbGxlZCBieSBgdGhpcy4kYW5jaG9yYCwgYW5kIGNsb3NlcyBhbGwgb3RoZXJzIGJ5IGRlZmF1bHQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgUmV2ZWFsI2Nsb3NlbWVcbiAgICogQGZpcmVzIFJldmVhbCNvcGVuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIC8vIGVpdGhlciB1cGRhdGUgb3IgcmVwbGFjZSBicm93c2VyIGhpc3RvcnlcbiAgICBjb25zdCBoYXNoID0gYCMke3RoaXMuaWR9YDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9PSBoYXNoKSB7XG5cbiAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgaGFzaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgaGFzaCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1lbWJlciBhbmNob3IgdGhhdCBvcGVuZWQgaXQgdG8gc2V0IGZvY3VzIGJhY2sgbGF0ZXIsIGhhdmUgZ2VuZXJhbCBhbmNob3JzIGFzIGZhbGxiYWNrXG4gICAgdGhpcy4kYWN0aXZlQW5jaG9yID0gJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyh0aGlzLiRhbmNob3IpID8gJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA6IHRoaXMuJGFuY2hvcjtcblxuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gTWFrZSBlbGVtZW50cyBpbnZpc2libGUsIGJ1dCByZW1vdmUgZGlzcGxheTogbm9uZSBzbyB3ZSBjYW4gZ2V0IHNpemUgYW5kIHBvc2l0aW9uaW5nXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJyB9KVxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5zY3JvbGxUb3AoMCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnaGlkZGVuJ30pLnNob3coKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmhpZGUoKVxuICAgICAgLmNzcyh7ICd2aXNpYmlsaXR5JzogJycgfSk7XG5cbiAgICBpZih0aGlzLiRvdmVybGF5KSB7XG4gICAgICB0aGlzLiRvdmVybGF5LmNzcyh7J3Zpc2liaWxpdHknOiAnJ30pLmhpZGUoKTtcbiAgICAgIGlmKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2Zhc3QnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdmYXN0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3Nsb3cnKSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmFkZENsYXNzKCdzbG93Jyk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5tdWx0aXBsZU9wZW5lZCkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIG1vZGFsIG9wZW5zLlxuICAgICAgICogQ2xvc2VzIGFueSBvdGhlciBtb2RhbHMgdGhhdCBhcmUgY3VycmVudGx5IG9wZW5cbiAgICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VtZVxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYucmV2ZWFsJywgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5yZXZlYWw6dmlzaWJsZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fZGlzYWJsZVNjcm9sbCgpO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBNb3Rpb24gVUkgbWV0aG9kIG9mIHJldmVhbFxuICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uSW4pIHtcbiAgICAgIGZ1bmN0aW9uIGFmdGVyQW5pbWF0aW9uKCl7XG4gICAgICAgIF90aGlzLiRlbGVtZW50XG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogZmFsc2UsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgIF90aGlzLl9hZGRHbG9iYWxDbGFzc2VzKCk7XG4gICAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyhfdGhpcy4kZWxlbWVudCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRvdmVybGF5LCAnZmFkZS1pbicpO1xuICAgICAgfVxuICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRlbGVtZW50LCB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uSW4sICgpID0+IHtcbiAgICAgICAgaWYodGhpcy4kZWxlbWVudCkgeyAvLyBwcm90ZWN0IGFnYWluc3Qgb2JqZWN0IGhhdmluZyBiZWVuIHJlbW92ZWRcbiAgICAgICAgICB0aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgICBhZnRlckFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8galF1ZXJ5IG1ldGhvZCBvZiByZXZlYWxcbiAgICBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coMCk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbGVtZW50LnNob3codGhpcy5vcHRpb25zLnNob3dEZWxheSk7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGFjY2Vzc2liaWxpdHlcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLWhpZGRlbic6IGZhbHNlLFxuICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgfSlcbiAgICAgIC5mb2N1cygpO1xuICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcblxuICAgIHRoaXMuX2FkZEdsb2JhbENsYXNzZXMoKTtcblxuICAgIHRoaXMuX2FkZEdsb2JhbExpc3RlbmVycygpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgbW9kYWwgaGFzIHN1Y2Nlc3NmdWxseSBvcGVuZWQuXG4gICAgICogQGV2ZW50IFJldmVhbCNvcGVuXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvcGVuLnpmLnJldmVhbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xhc3NlcyBhbmQgbGlzdGVuZXJzIG9uIGRvY3VtZW50IHJlcXVpcmVkIGJ5IG9wZW4gbW9kYWxzLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGNsYXNzZXMgYXJlIGFkZGVkIGFuZCB1cGRhdGVkOlxuICAgKiAtIGAuaXMtcmV2ZWFsLW9wZW5gIC0gUHJldmVudHMgdGhlIHNjcm9sbCBvbiBkb2N1bWVudFxuICAgKiAtIGAuemYtaGFzLXNjcm9sbGAgIC0gRGlzcGxheXMgYSBkaXNhYmxlZCBzY3JvbGxiYXIgb24gZG9jdW1lbnQgaWYgcmVxdWlyZWQgbGlrZSBpZiB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCB3YXMgbm90IGRpc2FibGVkLiBUaGlzIHByZXZlbnQgYSBcInNoaWZ0XCIgb2YgdGhlIHBhZ2UgY29udGVudCBkdWVcbiAgICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBzY3JvbGxiYXIgZGlzYXBwZWFyaW5nIHdoZW4gdGhlIG1vZGFsIG9wZW5zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZEdsb2JhbENsYXNzZXMoKSB7XG4gICAgY29uc3QgdXBkYXRlU2Nyb2xsYmFyQ2xhc3MgPSAoKSA9PiB7XG4gICAgICAkKCdodG1sJykudG9nZ2xlQ2xhc3MoJ3pmLWhhcy1zY3JvbGwnLCAhISgkKGRvY3VtZW50KS5oZWlnaHQoKSA+ICQod2luZG93KS5oZWlnaHQoKSkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdyZXNpemVtZS56Zi50cmlnZ2VyLnJldmVhbFNjcm9sbGJhckxpc3RlbmVyJywgKCkgPT4gdXBkYXRlU2Nyb2xsYmFyQ2xhc3MoKSk7XG4gICAgdXBkYXRlU2Nyb2xsYmFyQ2xhc3MoKTtcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjbGFzc2VzIGFuZCBsaXN0ZW5lcnMgb24gZG9jdW1lbnQgdGhhdCB3ZXJlIHJlcXVpcmVkIGJ5IG9wZW4gbW9kYWxzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZUdsb2JhbENsYXNzZXMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3Jlc2l6ZW1lLnpmLnRyaWdnZXIucmV2ZWFsU2Nyb2xsYmFyTGlzdGVuZXInKTtcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXJldmVhbC1vcGVuJyk7XG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCd6Zi1oYXMtc2Nyb2xsJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBleHRyYSBldmVudCBoYW5kbGVycyBmb3IgdGhlIGJvZHkgYW5kIHdpbmRvdyBpZiBuZWNlc3NhcnkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYoIXRoaXMuJGVsZW1lbnQpIHsgcmV0dXJuOyB9IC8vIElmIHdlJ3JlIGluIHRoZSBtaWRkbGUgb2YgY2xlYW51cCwgZG9uJ3QgZnJlYWsgb3V0XG4gICAgdGhpcy5mb2N1c2FibGVFbGVtZW50cyA9IEtleWJvYXJkLmZpbmRGb2N1c2FibGUodGhpcy4kZWxlbWVudCk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5vdmVybGF5ICYmIHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgJiYgIXRoaXMub3B0aW9ucy5mdWxsU2NyZWVuKSB7XG4gICAgICAkKCdib2R5Jykub24oJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBfdGhpcy4kZWxlbWVudFswXSB8fFxuICAgICAgICAgICQuY29udGFpbnMoX3RoaXMuJGVsZW1lbnRbMF0sIGUudGFyZ2V0KSB8fFxuICAgICAgICAgICAgISQuY29udGFpbnMoZG9jdW1lbnQsIGUudGFyZ2V0KSkgeyByZXR1cm47IH1cbiAgICAgICAgX3RoaXMuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgJCh3aW5kb3cpLm9uKCdrZXlkb3duLnpmLnJldmVhbCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdSZXZlYWwnLCB7XG4gICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXZlYWwjY2xvc2VkXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgaGlkaW5nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25PdXQpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiRvdmVybGF5LCAnZmFkZS1vdXQnKTtcbiAgICAgIH1cblxuICAgICAgTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kZWxlbWVudCwgdGhpcy5vcHRpb25zLmFuaW1hdGlvbk91dCwgZmluaXNoVXApO1xuICAgIH1cbiAgICAvLyBqUXVlcnkgbWV0aG9kIG9mIGhpZGluZ1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5oaWRlKHRoaXMub3B0aW9ucy5oaWRlRGVsYXkpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKDAsIGZpbmlzaFVwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmaW5pc2hVcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbmRpdGlvbmFscyB0byByZW1vdmUgZXh0cmEgZXZlbnQgbGlzdGVuZXJzIGFkZGVkIG9uIG9wZW5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25Fc2MpIHtcbiAgICAgICQod2luZG93KS5vZmYoJ2tleWRvd24uemYucmV2ZWFsJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3ZlcmxheSAmJiB0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKSB7XG4gICAgICAkKCdib2R5Jykub2ZmKCdjbGljay56Zi5kcm9wZG93biB0YXAuemYuZHJvcGRvd24nKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi5yZXZlYWwnKTtcblxuICAgIGZ1bmN0aW9uIGZpbmlzaFVwKCkge1xuXG4gICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgdG9wIGJlZm9yZSB0aGUgbW9kYWwgaXMgY2xvc2VkIGFuZCByZXN0b3JlIHRoZSBzY3JvbGwgYWZ0ZXIuXG4gICAgICAvLyBUT0RPOiB1c2UgY29tcG9uZW50IHByb3BlcnRpZXMgaW5zdGVhZCBvZiBIVE1MIHByb3BlcnRpZXNcbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZm91bmRhdGlvbi9mb3VuZGF0aW9uLXNpdGVzL3B1bGwvMTA3ODZcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBwYXJzZUludCgkKFwiaHRtbFwiKS5jc3MoXCJ0b3BcIiksIDEwKTtcblxuICAgICAgaWYgKCQoJy5yZXZlYWw6dmlzaWJsZScpLmxlbmd0aCAgPT09IDApIHtcbiAgICAgICAgX3RoaXMuX3JlbW92ZUdsb2JhbENsYXNzZXMoKTsgLy8gYWxzbyByZW1vdmUgLmlzLXJldmVhbC1vcGVuIGZyb20gdGhlIGh0bWwgZWxlbWVudCB3aGVuIHRoZXJlIGlzIG5vIG9wZW5lZCByZXZlYWxcbiAgICAgIH1cblxuICAgICAgS2V5Ym9hcmQucmVsZWFzZUZvY3VzKF90aGlzLiRlbGVtZW50KTtcblxuICAgICAgX3RoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcblxuICAgICAgaWYgKCQoJy5yZXZlYWw6dmlzaWJsZScpLmxlbmd0aCAgPT09IDApIHtcbiAgICAgICAgX3RoaXMuX2VuYWJsZVNjcm9sbChzY3JvbGxUb3ApO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICogRmlyZXMgd2hlbiB0aGUgbW9kYWwgaXMgZG9uZSBjbG9zaW5nLlxuICAgICAgKiBAZXZlbnQgUmV2ZWFsI2Nsb3NlZFxuICAgICAgKi9cbiAgICAgIF90aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlZC56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFJlc2V0cyB0aGUgbW9kYWwgY29udGVudFxuICAgICogVGhpcyBwcmV2ZW50cyBhIHJ1bm5pbmcgdmlkZW8gdG8ga2VlcCBnb2luZyBpbiB0aGUgYmFja2dyb3VuZFxuICAgICovXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXNldE9uQ2xvc2UpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuaHRtbCh0aGlzLiRlbGVtZW50Lmh0bWwoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIC8vIElmIGRlZXBMaW5rIGFuZCB3ZSBkaWQgbm90IHN3aXRjaGVkIHRvIGFuIG90aGVyIG1vZGFsLi4uXG4gICAgaWYgKF90aGlzLm9wdGlvbnMuZGVlcExpbmsgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09IGAjJHt0aGlzLmlkfWApIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgaGlzdG9yeSBoYXNoXG4gICAgICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHVybFdpdGhvdXRIYXNoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgdXJsV2l0aG91dEhhc2gpOyAvLyByZW1vdmUgdGhlIGhhc2hcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsIGRvY3VtZW50LnRpdGxlLCB1cmxXaXRob3V0SGFzaCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kYWN0aXZlQW5jaG9yLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb3Blbi9jbG9zZWQgc3RhdGUgb2YgYSBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBhIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmRUbygkKHRoaXMub3B0aW9ucy5hcHBlbmRUbykpOyAvLyBtb3ZlICRlbGVtZW50IG91dHNpZGUgb2YgJG92ZXJsYXkgdG8gcHJldmVudCBlcnJvciB1bnJlZ2lzdGVyUGx1Z2luKClcbiAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpLm9mZigpLnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LmhpZGUoKS5vZmYoKTtcbiAgICB0aGlzLiRhbmNob3Iub2ZmKCcuemYnKTtcbiAgICAkKHdpbmRvdykub2ZmKGAuemYucmV2ZWFsOiR7dGhpcy5pZH1gKVxuICAgIGlmICh0aGlzLm9uTG9hZExpc3RlbmVyKSAkKHdpbmRvdykub2ZmKHRoaXMub25Mb2FkTGlzdGVuZXIpO1xuXG4gICAgaWYgKCQoJy5yZXZlYWw6dmlzaWJsZScpLmxlbmd0aCAgPT09IDApIHtcbiAgICAgIHRoaXMuX3JlbW92ZUdsb2JhbENsYXNzZXMoKTsgLy8gYWxzbyByZW1vdmUgLmlzLXJldmVhbC1vcGVuIGZyb20gdGhlIGh0bWwgZWxlbWVudCB3aGVuIHRoZXJlIGlzIG5vIG9wZW5lZCByZXZlYWxcbiAgICB9XG4gIH07XG59XG5cblJldmVhbC5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIE1vdGlvbi1VSSBjbGFzcyB0byB1c2UgZm9yIGFuaW1hdGVkIGVsZW1lbnRzLiBJZiBub25lIHVzZWQsIGRlZmF1bHRzIHRvIHNpbXBsZSBzaG93L2hpZGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGFuaW1hdGlvbkluOiAnJyxcbiAgLyoqXG4gICAqIE1vdGlvbi1VSSBjbGFzcyB0byB1c2UgZm9yIGFuaW1hdGVkIGVsZW1lbnRzLiBJZiBub25lIHVzZWQsIGRlZmF1bHRzIHRvIHNpbXBsZSBzaG93L2hpZGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIGFuaW1hdGlvbk91dDogJycsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgdG8gZGVsYXkgdGhlIG9wZW5pbmcgb2YgYSBtb2RhbCBhZnRlciBhIGNsaWNrIGlmIG5vIGFuaW1hdGlvbiB1c2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHNob3dEZWxheTogMCxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgY2xvc2luZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgaGlkZURlbGF5OiAwLFxuICAvKipcbiAgICogQWxsb3dzIGEgY2xpY2sgb24gdGhlIGJvZHkvb3ZlcmxheSB0byBjbG9zZSB0aGUgbW9kYWwuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25DbGljazogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gY2xvc2UgaWYgdGhlIHVzZXIgcHJlc3NlcyB0aGUgYEVTQ0FQRWAga2V5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uRXNjOiB0cnVlLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgYWxsb3dzIG11bHRpcGxlIG1vZGFscyB0byBiZSBkaXNwbGF5ZWQgYXQgb25jZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIG11bHRpcGxlT3BlbmVkOiBmYWxzZSxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSBtb2RhbCBzaG91bGQgcHVzaCBkb3duIGZyb20gdGhlIHRvcCBvZiB0aGUgc2NyZWVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ8c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBhdXRvXG4gICAqL1xuICB2T2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgbW9kYWwgc2hvdWxkIHB1c2ggaW4gZnJvbSB0aGUgc2lkZSBvZiB0aGUgc2NyZWVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ8c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBhdXRvXG4gICAqL1xuICBoT2Zmc2V0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGJlIGZ1bGxzY3JlZW4sIGNvbXBsZXRlbHkgYmxvY2tpbmcgb3V0IHRoZSByZXN0IG9mIHRoZSB2aWV3LiBKUyBjaGVja3MgZm9yIHRoaXMgYXMgd2VsbC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGZ1bGxTY3JlZW46IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBnZW5lcmF0ZSBhbiBvdmVybGF5IGRpdiwgd2hpY2ggd2lsbCBjb3ZlciB0aGUgdmlldyB3aGVuIG1vZGFsIG9wZW5zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBvdmVybGF5OiB0cnVlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byByZW1vdmUgYW5kIHJlaW5qZWN0IG1hcmt1cCBvbiBjbG9zZS4gU2hvdWxkIGJlIHRydWUgaWYgdXNpbmcgdmlkZW8gZWxlbWVudHMgdy9vIHVzaW5nIHByb3ZpZGVyJ3MgYXBpLCBvdGhlcndpc2UsIHZpZGVvcyB3aWxsIGNvbnRpbnVlIHRvIHBsYXkgaW4gdGhlIGJhY2tncm91bmQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICByZXNldE9uQ2xvc2U6IGZhbHNlLFxuICAvKipcbiAgICogTGluayB0aGUgbG9jYXRpb24gaGFzaCB0byB0aGUgbW9kYWwuXG4gICAqIFNldCB0aGUgbG9jYXRpb24gaGFzaCB3aGVuIHRoZSBtb2RhbCBpcyBvcGVuZWQvY2xvc2VkLCBhbmQgb3Blbi9jbG9zZSB0aGUgbW9kYWwgd2hlbiB0aGUgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rOiBmYWxzZSxcbiAgLyoqXG4gICAqIElmIGBkZWVwTGlua2AgaXMgZW5hYmxlZCwgdXBkYXRlIHRoZSBicm93c2VyIGhpc3Rvcnkgd2l0aCB0aGUgb3BlbiBtb2RhbFxuICAgKiBAb3B0aW9uXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB1cGRhdGVIaXN0b3J5OiBmYWxzZSxcbiAgICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBhcHBlbmQgdG8gY3VzdG9tIGRpdi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBcImJvZHlcIlxuICAgKi9cbiAgYXBwZW5kVG86IFwiYm9keVwiLFxuICAvKipcbiAgICogQWxsb3dzIGFkZGluZyBhZGRpdGlvbmFsIGNsYXNzIG5hbWVzIHRvIHRoZSByZXZlYWwgb3ZlcmxheS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzOiAnJ1xufTtcblxuZXhwb3J0IHtSZXZlYWx9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcblxuLyoqXG4gKiBTbW9vdGhTY3JvbGwgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnNtb290aFNjcm9sbFxuICovXG5jbGFzcyBTbW9vdGhTY3JvbGwgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBTbW9vdGhTY3JvbGwuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBTbW9vdGhTY3JvbGxcbiAgICogQGZpcmVzIFNtb290aFNjcm9sbCNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gICAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBTbW9vdGhTY3JvbGwuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAnU21vb3RoU2Nyb2xsJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIFNtb290aFNjcm9sbCBwbHVnaW5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0KCkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuJGVsZW1lbnRbMF0uaWQgfHwgR2V0WW9EaWdpdHMoNiwgJ3Ntb290aC1zY3JvbGwnKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKHsgaWQgfSk7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgZXZlbnRzIGZvciBTbW9vdGhTY3JvbGwuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZXZlbnRzKCkge1xuICAgICAgICB0aGlzLl9saW5rQ2xpY2tMaXN0ZW5lciA9IHRoaXMuX2hhbmRsZUxpbmtDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay56Zi5zbW9vdGhTY3JvbGwnLCB0aGlzLl9saW5rQ2xpY2tMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLnpmLnNtb290aFNjcm9sbCcsICdhW2hyZWZePVwiI1wiXScsIHRoaXMuX2xpbmtDbGlja0xpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGdpdmVuIGV2ZW50IHRvIHNtb290aGx5IHNjcm9sbCB0byB0aGUgYW5jaG9yIHBvaW50ZWQgYnkgdGhlIGV2ZW50IHRhcmdldC5cbiAgICAgKiBAcGFyYW0geyp9IGUgLSBldmVudFxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2hhbmRsZUxpbmtDbGljayhlKSB7XG4gICAgICAgIC8vIEZvbGxvdyB0aGUgbGluayBpZiBpdCBkb2VzIG5vdCBwb2ludCB0byBhbiBhbmNob3IuXG4gICAgICAgIGlmICghJChlLmN1cnJlbnRUYXJnZXQpLmlzKCdhW2hyZWZePVwiI1wiXScpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgYXJyaXZhbCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICAgICAgICB0aGlzLl9pblRyYW5zaXRpb24gPSB0cnVlO1xuXG4gICAgICAgIFNtb290aFNjcm9sbC5zY3JvbGxUb0xvYyhhcnJpdmFsLCB0aGlzLm9wdGlvbnMsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2luVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIHNjcm9sbCB0byBhIGdpdmVuIGxvY2F0aW9uIG9uIHRoZSBwYWdlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsb2MgLSBBIHByb3Blcmx5IGZvcm1hdHRlZCBqUXVlcnkgaWQgc2VsZWN0b3IuIEV4YW1wbGU6ICcjZm9vJ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gdXNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgc2Nyb2xsVG9Mb2MobG9jLCBvcHRpb25zID0gU21vb3RoU2Nyb2xsLmRlZmF1bHRzLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCAkbG9jID0gJChsb2MpO1xuXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGFyZ2V0IGRvZXMgbm90IGV4aXN0IHRvIHByZXZlbnQgZXJyb3JzXG4gICAgICAgIGlmICghJGxvYy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gTWF0aC5yb3VuZCgkbG9jLm9mZnNldCgpLnRvcCAtIG9wdGlvbnMudGhyZXNob2xkIC8gMiAtIG9wdGlvbnMub2Zmc2V0KTtcblxuICAgICAgICAkKCdodG1sLCBib2R5Jykuc3RvcCh0cnVlKS5hbmltYXRlKFxuICAgICAgICAgICAgeyBzY3JvbGxUb3A6IHNjcm9sbFBvcyB9LFxuICAgICAgICAgICAgb3B0aW9ucy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIG9wdGlvbnMuYW5pbWF0aW9uRWFzaW5nLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95cyB0aGUgU21vb3RoU2Nyb2xsIGluc3RhbmNlLlxuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIF9kZXN0cm95KCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9mZignY2xpY2suemYuc21vb3RoU2Nyb2xsJywgdGhpcy5fbGlua0NsaWNrTGlzdGVuZXIpXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdjbGljay56Zi5zbW9vdGhTY3JvbGwnLCAnYVtocmVmXj1cIiNcIl0nLCB0aGlzLl9saW5rQ2xpY2tMaXN0ZW5lcik7XG4gICAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpbi5cbiAqL1xuU21vb3RoU2Nyb2xsLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUsIGluIG1zLCB0aGUgYW5pbWF0ZWQgc2Nyb2xsaW5nIHNob3VsZCB0YWtlIGJldHdlZW4gbG9jYXRpb25zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwMFxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgLyoqXG4gICAqIEFuaW1hdGlvbiBzdHlsZSB0byB1c2Ugd2hlbiBzY3JvbGxpbmcgYmV0d2VlbiBsb2NhdGlvbnMuIENhbiBiZSBgJ3N3aW5nJ2Agb3IgYCdsaW5lYXInYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnbGluZWFyJ1xuICAgKiBAc2VlIHtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FuaW1hdGV8SnF1ZXJ5IGFuaW1hdGV9XG4gICAqL1xuICBhbmltYXRpb25FYXNpbmc6ICdsaW5lYXInLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byB1c2UgYXMgYSBtYXJrZXIgZm9yIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTBcbiAgICovXG4gIHRocmVzaG9sZDogNTAsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRvIG9mZnNldCB0aGUgc2Nyb2xsIG9mIHRoZSBwYWdlIG9uIGl0ZW0gY2xpY2sgaWYgdXNpbmcgYSBzdGlja3kgbmF2IGJhci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBvZmZzZXQ6IDBcbn1cblxuZXhwb3J0IHtTbW9vdGhTY3JvbGx9XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IG9uTG9hZCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgb25JbWFnZXNMb2FkZWQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlcic7XG4vKipcbiAqIFRhYnMgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnRhYnNcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIgaWYgdGFicyBjb250YWluIGltYWdlc1xuICovXG5cbmNsYXNzIFRhYnMgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0YWJzLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgVGFic1xuICAgKiBAZmlyZXMgVGFicyNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gdGFicy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgVGFicy5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1RhYnMnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICBLZXlib2FyZC5yZWdpc3RlcignVGFicycsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICdwcmV2aW91cycsXG4gICAgICAnQVJST1dfRE9XTic6ICduZXh0JyxcbiAgICAgICdBUlJPV19MRUZUJzogJ3ByZXZpb3VzJ1xuICAgICAgLy8gJ1RBQic6ICduZXh0JyxcbiAgICAgIC8vICdTSElGVF9UQUInOiAncHJldmlvdXMnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHRhYnMgYnkgc2hvd2luZyBhbmQgZm9jdXNpbmcgKGlmIGF1dG9Gb2N1cz10cnVlKSB0aGUgcHJlc2V0IGFjdGl2ZSB0YWIuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6aW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cih7J3JvbGUnOiAndGFibGlzdCd9KTtcbiAgICB0aGlzLiR0YWJUaXRsZXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YCk7XG4gICAgdGhpcy4kdGFiQ29udGVudCA9ICQoYFtkYXRhLXRhYnMtY29udGVudD1cIiR7dGhpcy4kZWxlbWVudFswXS5pZH1cIl1gKTtcblxuICAgIHRoaXMuJHRhYlRpdGxlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICRsaW5rID0gJGVsZW0uZmluZCgnYScpLFxuICAgICAgICAgIGlzQWN0aXZlID0gJGVsZW0uaGFzQ2xhc3MoYCR7X3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCksXG4gICAgICAgICAgaGFzaCA9ICRsaW5rLmF0dHIoJ2RhdGEtdGFicy10YXJnZXQnKSB8fCAkbGlua1swXS5oYXNoLnNsaWNlKDEpLFxuICAgICAgICAgIGxpbmtJZCA9ICRsaW5rWzBdLmlkID8gJGxpbmtbMF0uaWQgOiBgJHtoYXNofS1sYWJlbGAsXG4gICAgICAgICAgJHRhYkNvbnRlbnQgPSAkKGAjJHtoYXNofWApO1xuXG4gICAgICAkZWxlbS5hdHRyKHsncm9sZSc6ICdwcmVzZW50YXRpb24nfSk7XG5cbiAgICAgICRsaW5rLmF0dHIoe1xuICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGhhc2gsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogaXNBY3RpdmUsXG4gICAgICAgICdpZCc6IGxpbmtJZCxcbiAgICAgICAgJ3RhYmluZGV4JzogaXNBY3RpdmUgPyAnMCcgOiAnLTEnXG4gICAgICB9KTtcblxuICAgICAgJHRhYkNvbnRlbnQuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgJ2FyaWEtbGFiZWxsZWRieSc6IGxpbmtJZFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFNhdmUgdXAgdGhlIGluaXRpYWwgaGFzaCB0byByZXR1cm4gdG8gaXQgbGF0ZXIgd2hlbiBnb2luZyBiYWNrIGluIGhpc3RvcnlcbiAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICBfdGhpcy5faW5pdGlhbEFuY2hvciA9IGAjJHtoYXNofWA7XG4gICAgICB9XG5cbiAgICAgIGlmKCFpc0FjdGl2ZSkge1xuICAgICAgICAkdGFiQ29udGVudC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmKGlzQWN0aXZlICYmIF90aGlzLm9wdGlvbnMuYXV0b0ZvY3VzKXtcbiAgICAgICAgX3RoaXMub25Mb2FkTGlzdGVuZXIgPSBvbkxvYWQoJCh3aW5kb3cpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogJGVsZW0ub2Zmc2V0KCkudG9wIH0sIF90aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2VEZWxheSwgKCkgPT4ge1xuICAgICAgICAgICAgJGxpbmsuZm9jdXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMubWF0Y2hIZWlnaHQpIHtcbiAgICAgIHZhciAkaW1hZ2VzID0gdGhpcy4kdGFiQ29udGVudC5maW5kKCdpbWcnKTtcblxuICAgICAgaWYgKCRpbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIG9uSW1hZ2VzTG9hZGVkKCRpbWFnZXMsIHRoaXMuX3NldEhlaWdodC5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldEhlaWdodCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgICAvLyBDdXJyZW50IGNvbnRleHQtYm91bmQgZnVuY3Rpb24gdG8gb3BlbiB0YWJzIG9uIHBhZ2UgbG9hZCBvciBoaXN0b3J5IGhhc2hjaGFuZ2VcbiAgICB0aGlzLl9jaGVja0RlZXBMaW5rID0gKCkgPT4ge1xuICAgICAgdmFyIGFuY2hvciA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXG4gICAgICBpZiAoIWFuY2hvci5sZW5ndGgpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIHN0aWxsIGluaXRpYWxpemluZyBhbmQgdGhlcmUgaXMgbm8gYW5jaG9yLCB0aGVuIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6aW5nKSByZXR1cm47XG4gICAgICAgIC8vIE90aGVyd2lzZSwgbW92ZSB0byB0aGUgaW5pdGlhbCBhbmNob3JcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxBbmNob3IpIGFuY2hvciA9IHRoaXMuX2luaXRpYWxBbmNob3I7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbmNob3JOb0hhc2ggPSBhbmNob3IuaW5kZXhPZignIycpID49IDAgPyBhbmNob3Iuc2xpY2UoMSkgOiBhbmNob3I7XG4gICAgICB2YXIgJGFuY2hvciA9IGFuY2hvck5vSGFzaCAmJiAkKGAjJHthbmNob3JOb0hhc2h9YCk7XG4gICAgICB2YXIgJGxpbmsgPSBhbmNob3IgJiYgdGhpcy4kZWxlbWVudC5maW5kKGBbaHJlZiQ9XCIke2FuY2hvcn1cIl0sW2RhdGEtdGFicy10YXJnZXQ9XCIke2FuY2hvck5vSGFzaH1cIl1gKS5maXJzdCgpO1xuICAgICAgLy8gV2hldGhlciB0aGUgYW5jaG9yIGVsZW1lbnQgdGhhdCBoYXMgYmVlbiBmb3VuZCBpcyBwYXJ0IG9mIHRoaXMgZWxlbWVudFxuICAgICAgdmFyIGlzT3duQW5jaG9yID0gISEoJGFuY2hvci5sZW5ndGggJiYgJGxpbmsubGVuZ3RoKTtcblxuICAgICAgaWYgKGlzT3duQW5jaG9yKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGFuY2hvciBmb3IgdGhlIGhhc2gsIHNlbGVjdCBpdFxuICAgICAgICBpZiAoJGFuY2hvciAmJiAkYW5jaG9yLmxlbmd0aCAmJiAkbGluayAmJiAkbGluay5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdFRhYigkYW5jaG9yLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGNvbGxhcHNlIGV2ZXJ5dGhpbmdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJvbGwgdXAgYSBsaXR0bGUgdG8gc2hvdyB0aGUgdGl0bGVzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmtTbXVkZ2UpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKTtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogb2Zmc2V0LnRvcCAtIHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZU9mZnNldH0sIHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZURlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGRlZXBsaW5rZWQgYXQgcGFnZWxvYWRcbiAgICAgICAgICogQGV2ZW50IFRhYnMjZGVlcGxpbmtcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZGVlcGxpbmsuemYudGFicycsIFskbGluaywgJGFuY2hvcl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vdXNlIGJyb3dzZXIgdG8gb3BlbiBhIHRhYiwgaWYgaXQgZXhpc3RzIGluIHRoaXMgdGFic2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgdGhpcy5fY2hlY2tEZWVwTGluaygpO1xuICAgIH1cblxuICAgIHRoaXMuX2V2ZW50cygpO1xuXG4gICAgdGhpcy5faXNJbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuX2FkZEtleUhhbmRsZXIoKTtcbiAgICB0aGlzLl9hZGRDbGlja0hhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tYXRjaEhlaWdodCkge1xuICAgICAgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyID0gdGhpcy5fc2V0SGVpZ2h0LmJpbmQodGhpcyk7XG5cbiAgICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIHRoaXMuX2NoZWNrRGVlcExpbmspO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGNsaWNrIGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQ2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAub2ZmKCdjbGljay56Zi50YWJzJylcbiAgICAgIC5vbignY2xpY2suemYudGFicycsIGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfWAsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGtleWJvYXJkIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIHRhYnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkS2V5SGFuZGxlcigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kdGFiVGl0bGVzLm9mZigna2V5ZG93bi56Zi50YWJzJykub24oJ2tleWRvd24uemYudGFicycsIGZ1bmN0aW9uKGUpe1xuICAgICAgaWYgKGUud2hpY2ggPT09IDkpIHJldHVybjtcblxuXG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAkZWxlbWVudHMgPSAkZWxlbWVudC5wYXJlbnQoJ3VsJykuY2hpbGRyZW4oJ2xpJyksXG4gICAgICAgICRwcmV2RWxlbWVudCxcbiAgICAgICAgJG5leHRFbGVtZW50O1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLndyYXBPbktleXMpIHtcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9IGkgPT09IDAgPyAkZWxlbWVudHMubGFzdCgpIDogJGVsZW1lbnRzLmVxKGktMSk7XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSBpID09PSAkZWxlbWVudHMubGVuZ3RoIC0xID8gJGVsZW1lbnRzLmZpcnN0KCkgOiAkZWxlbWVudHMuZXEoaSsxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWF4KDAsIGktMSkpO1xuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGhhbmRsZSBrZXlib2FyZCBldmVudCB3aXRoIGtleWJvYXJkIHV0aWxcbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnVGFicycsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGVsZW1lbnQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKS5mb2N1cygpO1xuICAgICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJGVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHByZXZFbGVtZW50LmZpbmQoJ1tyb2xlPVwidGFiXCJdJykuZm9jdXMoKTtcbiAgICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCRwcmV2RWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRuZXh0RWxlbWVudC5maW5kKCdbcm9sZT1cInRhYlwiXScpLmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkbmV4dEVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSB0YWIgYCR0YXJnZXRDb250ZW50YCBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC4gQ29sbGFwc2VzIGFjdGl2ZSB0YWIuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gVGFiIHRvIG9wZW4uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlzdG9yeUhhbmRsZWQgLSBicm93c2VyIGhhcyBhbHJlYWR5IGhhbmRsZWQgYSBoaXN0b3J5IHVwZGF0ZVxuICAgKiBAZmlyZXMgVGFicyNjaGFuZ2VcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfaGFuZGxlVGFiQ2hhbmdlKCR0YXJnZXQsIGhpc3RvcnlIYW5kbGVkKSB7XG5cbiAgICAvLyBXaXRoIGBhY3RpdmVDb2xsYXBzZWAsIGlmIHRoZSB0YXJnZXQgaXMgdGhlIGFjdGl2ZSBUYWIsIGNvbGxhcHNlIGl0LlxuICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKGAke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCkpIHtcbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmFjdGl2ZUNvbGxhcHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsYXBzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgJG9sZFRhYiA9IHRoaXMuJGVsZW1lbnQuXG4gICAgICAgICAgZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc30uJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApLFxuICAgICAgICAgICR0YWJMaW5rID0gJHRhcmdldC5maW5kKCdbcm9sZT1cInRhYlwiXScpLFxuICAgICAgICAgIHRhcmdldCA9ICR0YWJMaW5rLmF0dHIoJ2RhdGEtdGFicy10YXJnZXQnKSxcbiAgICAgICAgICBhbmNob3IgPSB0YXJnZXQgJiYgdGFyZ2V0Lmxlbmd0aCA/IGAjJHt0YXJnZXR9YCA6ICR0YWJMaW5rWzBdLmhhc2gsXG4gICAgICAgICAgJHRhcmdldENvbnRlbnQgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoYW5jaG9yKTtcblxuICAgIC8vY2xvc2Ugb2xkIHRhYlxuICAgIHRoaXMuX2NvbGxhcHNlVGFiKCRvbGRUYWIpO1xuXG4gICAgLy9vcGVuIG5ldyB0YWJcbiAgICB0aGlzLl9vcGVuVGFiKCR0YXJnZXQpO1xuXG4gICAgLy9laXRoZXIgcmVwbGFjZSBvciB1cGRhdGUgYnJvd3NlciBoaXN0b3J5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluayAmJiAhaGlzdG9yeUhhbmRsZWQpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBkYXRlSGlzdG9yeSkge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIGFuY2hvcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBzdWNjZXNzZnVsbHkgY2hhbmdlZCB0YWJzLlxuICAgICAqIEBldmVudCBUYWJzI2NoYW5nZVxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2hhbmdlLnpmLnRhYnMnLCBbJHRhcmdldCwgJHRhcmdldENvbnRlbnRdKTtcblxuICAgIC8vZmlyZSB0byBjaGlsZHJlbiBhIG11dGF0aW9uIGV2ZW50XG4gICAgJHRhcmdldENvbnRlbnQuZmluZChcIltkYXRhLW11dGF0ZV1cIikudHJpZ2dlcihcIm11dGF0ZW1lLnpmLnRyaWdnZXJcIik7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHRhYiBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFRhYiB0byBvcGVuLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9vcGVuVGFiKCR0YXJnZXQpIHtcbiAgICAgIHZhciAkdGFiTGluayA9ICR0YXJnZXQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKSxcbiAgICAgICAgICBoYXNoID0gJHRhYkxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpIHx8ICR0YWJMaW5rWzBdLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgJHRhcmdldENvbnRlbnQgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoYCMke2hhc2h9YCk7XG5cbiAgICAgICR0YXJnZXQuYWRkQ2xhc3MoYCR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKTtcblxuICAgICAgJHRhYkxpbmsuYXR0cih7XG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ3RydWUnLFxuICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgIH0pO1xuXG4gICAgICAkdGFyZ2V0Q29udGVudFxuICAgICAgICAuYWRkQ2xhc3MoYCR7dGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YCkucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYCR0YXJnZXRDb250ZW50YCBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBUYWIgdG8gY29sbGFwc2UuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2NvbGxhcHNlVGFiKCR0YXJnZXQpIHtcbiAgICB2YXIgJHRhcmdldEFuY2hvciA9ICR0YXJnZXRcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApXG4gICAgICAuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKVxuICAgICAgLmF0dHIoe1xuICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICdmYWxzZScsXG4gICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICB9KTtcblxuICAgICQoYCMkeyR0YXJnZXRBbmNob3IuYXR0cignYXJpYS1jb250cm9scycpfWApXG4gICAgICAucmVtb3ZlQ2xhc3MoYCR7dGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YClcbiAgICAgIC5hdHRyKHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnIH0pXG4gIH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIHRoZSBhY3RpdmUgVGFiLlxuICAgKiBAZmlyZXMgVGFicyNjb2xsYXBzZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9jb2xsYXBzZSgpIHtcbiAgICB2YXIgJGFjdGl2ZVRhYiA9IHRoaXMuJGVsZW1lbnQuZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc30uJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApO1xuXG4gICAgaWYgKCRhY3RpdmVUYWIubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9jb2xsYXBzZVRhYigkYWN0aXZlVGFiKTtcblxuICAgICAgLyoqXG4gICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgc3VjY2Vzc2Z1bGx5IGNvbGxhcHNlZCB0YWJzLlxuICAgICAgKiBAZXZlbnQgVGFicyNjb2xsYXBzZVxuICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY29sbGFwc2UuemYudGFicycsIFskYWN0aXZlVGFiXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgZm9yIHNlbGVjdGluZyBhIGNvbnRlbnQgcGFuZSB0byBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2pRdWVyeSB8IFN0cmluZ30gZWxlbSAtIGpRdWVyeSBvYmplY3Qgb3Igc3RyaW5nIG9mIHRoZSBpZCBvZiB0aGUgcGFuZSB0byBkaXNwbGF5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhpc3RvcnlIYW5kbGVkIC0gYnJvd3NlciBoYXMgYWxyZWFkeSBoYW5kbGVkIGEgaGlzdG9yeSB1cGRhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBzZWxlY3RUYWIoZWxlbSwgaGlzdG9yeUhhbmRsZWQpIHtcbiAgICB2YXIgaWRTdHIsIGhhc2hJZFN0cjtcblxuICAgIGlmICh0eXBlb2YgZWxlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlkU3RyID0gZWxlbVswXS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWRTdHIgPSBlbGVtO1xuICAgIH1cblxuICAgIGlmIChpZFN0ci5pbmRleE9mKCcjJykgPCAwKSB7XG4gICAgICBoYXNoSWRTdHIgPSBgIyR7aWRTdHJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFzaElkU3RyID0gaWRTdHI7XG4gICAgICBpZFN0ciA9IGlkU3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHZhciAkdGFyZ2V0ID0gdGhpcy4kdGFiVGl0bGVzLmhhcyhgW2hyZWYkPVwiJHtoYXNoSWRTdHJ9XCJdLFtkYXRhLXRhYnMtdGFyZ2V0PVwiJHtpZFN0cn1cIl1gKS5maXJzdCgpO1xuXG4gICAgdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCR0YXJnZXQsIGhpc3RvcnlIYW5kbGVkKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgaGVpZ2h0IG9mIGVhY2ggcGFuZWwgdG8gdGhlIGhlaWdodCBvZiB0aGUgdGFsbGVzdCBwYW5lbC5cbiAgICogSWYgZW5hYmxlZCBpbiBvcHRpb25zLCBnZXRzIGNhbGxlZCBvbiBtZWRpYSBxdWVyeSBjaGFuZ2UuXG4gICAqIElmIGxvYWRpbmcgY29udGVudCB2aWEgZXh0ZXJuYWwgc291cmNlLCBjYW4gYmUgY2FsbGVkIGRpcmVjdGx5IG9yIHdpdGggX3JlZmxvdy5cbiAgICogSWYgZW5hYmxlZCB3aXRoIGBkYXRhLW1hdGNoLWhlaWdodD1cInRydWVcImAsIHRhYnMgc2V0cyB0byBlcXVhbCBoZWlnaHRcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0SGVpZ2h0KCkge1xuICAgIHZhciBtYXggPSAwLFxuICAgICAgICBfdGhpcyA9IHRoaXM7IC8vIExvY2sgZG93biB0aGUgYHRoaXNgIHZhbHVlIGZvciB0aGUgcm9vdCB0YWJzIG9iamVjdFxuXG4gICAgaWYgKCF0aGlzLiR0YWJDb250ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4kdGFiQ29udGVudFxuICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5wYW5lbENsYXNzfWApXG4gICAgICAuY3NzKCdtaW4taGVpZ2h0JywgJycpXG4gICAgICAuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgcGFuZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgaXNBY3RpdmUgPSBwYW5lbC5oYXNDbGFzcyhgJHtfdGhpcy5vcHRpb25zLnBhbmVsQWN0aXZlQ2xhc3N9YCk7IC8vIGdldCB0aGUgb3B0aW9ucyBmcm9tIHRoZSBwYXJlbnQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gZ2V0IHRoZW0gZnJvbSB0aGUgY2hpbGRcblxuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcGFuZWwuY3NzKHsndmlzaWJpbGl0eSc6ICdoaWRkZW4nLCAnZGlzcGxheSc6ICdibG9jayd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZW1wID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIHBhbmVsLmNzcyh7XG4gICAgICAgICAgICAndmlzaWJpbGl0eSc6ICcnLFxuICAgICAgICAgICAgJ2Rpc3BsYXknOiAnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWF4ID0gdGVtcCA+IG1heCA/IHRlbXAgOiBtYXg7XG4gICAgICB9KVxuICAgICAgLmNzcygnbWluLWhlaWdodCcsIGAke21heH1weGApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIHRhYnMuXG4gICAqIEBmaXJlcyBUYWJzI2Rlc3Ryb3llZFxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YClcbiAgICAgIC5vZmYoJy56Zi50YWJzJykuaGlkZSgpLmVuZCgpXG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLnBhbmVsQ2xhc3N9YClcbiAgICAgIC5oaWRlKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1hdGNoSGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICQod2luZG93KS5vZmYoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9mZignaGFzaGNoYW5nZScsIHRoaXMuX2NoZWNrRGVlcExpbmspO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9uTG9hZExpc3RlbmVyKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKHRoaXMub25Mb2FkTGlzdGVuZXIpO1xuICAgIH1cbiAgfVxufVxuXG5UYWJzLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogTGluayB0aGUgbG9jYXRpb24gaGFzaCB0byB0aGUgYWN0aXZlIHBhbmUuXG4gICAqIFNldCB0aGUgbG9jYXRpb24gaGFzaCB3aGVuIHRoZSBhY3RpdmUgcGFuZSBjaGFuZ2VzLCBhbmQgb3BlbiB0aGUgY29ycmVzcG9uZGluZyBwYW5lIHdoZW4gdGhlIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkZWVwTGluazogZmFsc2UsXG5cbiAgLyoqXG4gICAqIElmIGBkZWVwTGlua2AgaXMgZW5hYmxlZCwgYWRqdXN0IHRoZSBkZWVwIGxpbmsgc2Nyb2xsIHRvIG1ha2Ugc3VyZSB0aGUgdG9wIG9mIHRoZSB0YWIgcGFuZWwgaXMgdmlzaWJsZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbmtTbXVkZ2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBJZiBgZGVlcExpbmtTbXVkZ2VgIGlzIGVuYWJsZWQsIGFuaW1hdGlvbiB0aW1lIChtcykgZm9yIHRoZSBkZWVwIGxpbmsgYWRqdXN0bWVudFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDMwMFxuICAgKi9cbiAgZGVlcExpbmtTbXVkZ2VEZWxheTogMzAwLFxuXG4gIC8qKlxuICAgKiBJZiBgZGVlcExpbmtTbXVkZ2VgIGlzIGVuYWJsZWQsIGFuaW1hdGlvbiBvZmZzZXQgZnJvbSB0aGUgdG9wIGZvciB0aGUgZGVlcCBsaW5rIGFkanVzdG1lbnRcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZU9mZnNldDogMCxcblxuICAvKipcbiAgICogSWYgYGRlZXBMaW5rYCBpcyBlbmFibGVkLCB1cGRhdGUgdGhlIGJyb3dzZXIgaGlzdG9yeSB3aXRoIHRoZSBvcGVuIHRhYlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdXBkYXRlSGlzdG9yeTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgd2luZG93IHRvIHNjcm9sbCB0byBjb250ZW50IG9mIGFjdGl2ZSBwYW5lIG9uIGxvYWQuXG4gICAqIE5vdCByZWNvbW1lbmRlZCBpZiBtb3JlIHRoYW4gb25lIHRhYiBwYW5lbCBwZXIgcGFnZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9Gb2N1czogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEFsbG93cyBrZXlib2FyZCBpbnB1dCB0byAnd3JhcCcgYXJvdW5kIHRoZSB0YWIgbGlua3MuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHdyYXBPbktleXM6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgdGFiIGNvbnRlbnQgcGFuZXMgdG8gbWF0Y2ggaGVpZ2h0cyBpZiBzZXQgdG8gdHJ1ZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIG1hdGNoSGVpZ2h0OiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIGFjdGl2ZSB0YWJzIHRvIGNvbGxhcHNlIHdoZW4gY2xpY2tlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFjdGl2ZUNvbGxhcHNlOiBmYWxzZSxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byBgbGlgJ3MgaW4gdGFiIGxpbmsgbGlzdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAndGFicy10aXRsZSdcbiAgICovXG4gIGxpbmtDbGFzczogJ3RhYnMtdGl0bGUnLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBhY3RpdmUgYGxpYCBpbiB0YWIgbGluayBsaXN0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdpcy1hY3RpdmUnXG4gICAqL1xuICBsaW5rQWN0aXZlQ2xhc3M6ICdpcy1hY3RpdmUnLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBjb250ZW50IGNvbnRhaW5lcnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3RhYnMtcGFuZWwnXG4gICAqL1xuICBwYW5lbENsYXNzOiAndGFicy1wYW5lbCcsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGFjdGl2ZSBjb250ZW50IGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaXMtYWN0aXZlJ1xuICAgKi9cbiAgcGFuZWxBY3RpdmVDbGFzczogJ2lzLWFjdGl2ZSdcbn07XG5cbmV4cG9ydCB7VGFic307XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnBsdWdpbic7XG5pbXBvcnQgeyBSZWdFeHBFc2NhcGUgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBUb2dnbGVyIG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi50b2dnbGVyXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1vdGlvblxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIFRvZ2dsZXIgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBUb2dnbGVyLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgVG9nZ2xlclxuICAgKiBAZmlyZXMgVG9nZ2xlciNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhZGQgdGhlIHRyaWdnZXIgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHBsdWdpbiBzZXR0aW5ncy5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRvZ2dsZXIuZGVmYXVsdHMsIGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICcnO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1RvZ2dsZXInOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIFRvZ2dsZXIgcGx1Z2luIGJ5IHBhcnNpbmcgdGhlIHRvZ2dsZSBjbGFzcyBmcm9tIGRhdGEtdG9nZ2xlciwgb3IgYW5pbWF0aW9uIGNsYXNzZXMgZnJvbSBkYXRhLWFuaW1hdGUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgLy8gQ29sbGVjdCB0cmlnZ2VycyB0byBzZXQgQVJJQSBhdHRyaWJ1dGVzIHRvXG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCxcbiAgICAgICR0cmlnZ2VycyA9ICQoYFtkYXRhLW9wZW5+PVwiJHtpZH1cIl0sIFtkYXRhLWNsb3Nlfj1cIiR7aWR9XCJdLCBbZGF0YS10b2dnbGV+PVwiJHtpZH1cIl1gKTtcblxuICAgIHZhciBpbnB1dDtcbiAgICAvLyBQYXJzZSBhbmltYXRpb24gY2xhc3NlcyBpZiB0aGV5IHdlcmUgc2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRlKSB7XG4gICAgICBpbnB1dCA9IHRoaXMub3B0aW9ucy5hbmltYXRlLnNwbGl0KCcgJyk7XG5cbiAgICAgIHRoaXMuYW5pbWF0aW9uSW4gPSBpbnB1dFswXTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uT3V0ID0gaW5wdXRbMV0gfHwgbnVsbDtcblxuICAgICAgLy8gLSBhcmlhLWV4cGFuZGVkOiBhY2NvcmRpbmcgdG8gdGhlIGVsZW1lbnQgdmlzaWJpbGl0eS5cbiAgICAgICR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgIXRoaXMuJGVsZW1lbnQuaXMoJzpoaWRkZW4nKSk7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgcGFyc2UgdG9nZ2xlIGNsYXNzXG4gICAgZWxzZSB7XG4gICAgICBpbnB1dCA9IHRoaXMub3B0aW9ucy50b2dnbGVyO1xuICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycgfHwgIWlucHV0Lmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAndG9nZ2xlcicgb3B0aW9uIGNvbnRhaW5pbmcgdGhlIHRhcmdldCBjbGFzcyBpcyByZXF1aXJlZCwgZ290IFwiJHtpbnB1dH1cImApO1xuICAgICAgfVxuICAgICAgLy8gQWxsb3cgZm9yIGEgLiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICAgIHRoaXMuY2xhc3NOYW1lID0gaW5wdXRbMF0gPT09ICcuJyA/IGlucHV0LnNsaWNlKDEpIDogaW5wdXQ7XG5cbiAgICAgIC8vIC0gYXJpYS1leHBhbmRlZDogYWNjb3JkaW5nIHRvIHRoZSBlbGVtZW50cyBjbGFzcyBzZXQuXG4gICAgICAkdHJpZ2dlcnMuYXR0cignYXJpYS1leHBhbmRlZCcsIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3ModGhpcy5jbGFzc05hbWUpKTtcbiAgICB9XG5cbiAgICAvLyAtIGFyaWEtY29udHJvbHM6IGFkZGluZyB0aGUgZWxlbWVudCBpZCB0byBpdCBpZiBub3QgYWxyZWFkeSBpbiBpdC5cbiAgICAkdHJpZ2dlcnMuZWFjaCgoaW5kZXgsIHRyaWdnZXIpID0+IHtcbiAgICAgIGNvbnN0ICR0cmlnZ2VyID0gJCh0cmlnZ2VyKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gJHRyaWdnZXIuYXR0cignYXJpYS1jb250cm9scycpIHx8ICcnO1xuXG4gICAgICBjb25zdCBjb250YWluc0lkID0gbmV3IFJlZ0V4cChgXFxcXGIke1JlZ0V4cEVzY2FwZShpZCl9XFxcXGJgKS50ZXN0KGNvbnRyb2xzKTtcbiAgICAgIGlmICghY29udGFpbnNJZCkgJHRyaWdnZXIuYXR0cignYXJpYS1jb250cm9scycsIGNvbnRyb2xzID8gYCR7Y29udHJvbHN9ICR7aWR9YCA6IGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIHRoZSB0b2dnbGUgdHJpZ2dlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b2dnbGUuemYudHJpZ2dlcicpLm9uKCd0b2dnbGUuemYudHJpZ2dlcicsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHRhcmdldCBjbGFzcyBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuIEFuIGV2ZW50IGlzIGZpcmVkIGZyb20gdGhlIG9yaWdpbmFsIHRyaWdnZXIgZGVwZW5kaW5nIG9uIGlmIHRoZSByZXN1bHRhbnQgc3RhdGUgd2FzIFwib25cIiBvciBcIm9mZlwiLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIFRvZ2dsZXIjb25cbiAgICogQGZpcmVzIFRvZ2dsZXIjb2ZmXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgdGhpc1sgdGhpcy5vcHRpb25zLmFuaW1hdGUgPyAnX3RvZ2dsZUFuaW1hdGUnIDogJ190b2dnbGVDbGFzcyddKCk7XG4gIH1cblxuICBfdG9nZ2xlQ2xhc3MoKSB7XG4gICAgdGhpcy4kZWxlbWVudC50b2dnbGVDbGFzcyh0aGlzLmNsYXNzTmFtZSk7XG5cbiAgICB2YXIgaXNPbiA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3ModGhpcy5jbGFzc05hbWUpO1xuICAgIGlmIChpc09uKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBoYXMgdGhlIGNsYXNzIGFmdGVyIGEgdG9nZ2xlLlxuICAgICAgICogQGV2ZW50IFRvZ2dsZXIjb25cbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvbi56Zi50b2dnbGVyJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgZG9lcyBub3QgaGF2ZSB0aGUgY2xhc3MgYWZ0ZXIgYSB0b2dnbGUuXG4gICAgICAgKiBAZXZlbnQgVG9nZ2xlciNvZmZcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdvZmYuemYudG9nZ2xlcicpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZUFSSUEoaXNPbik7XG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1tdXRhdGVdJykudHJpZ2dlcignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICB9XG5cbiAgX3RvZ2dsZUFuaW1hdGUoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0aGlzLiRlbGVtZW50LmlzKCc6aGlkZGVuJykpIHtcbiAgICAgIE1vdGlvbi5hbmltYXRlSW4odGhpcy4kZWxlbWVudCwgdGhpcy5hbmltYXRpb25JbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl91cGRhdGVBUklBKHRydWUpO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ29uLnpmLnRvZ2dsZXInKTtcbiAgICAgICAgdGhpcy5maW5kKCdbZGF0YS1tdXRhdGVdJykudHJpZ2dlcignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgTW90aW9uLmFuaW1hdGVPdXQodGhpcy4kZWxlbWVudCwgdGhpcy5hbmltYXRpb25PdXQsIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5fdXBkYXRlQVJJQShmYWxzZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignb2ZmLnpmLnRvZ2dsZXInKTtcbiAgICAgICAgdGhpcy5maW5kKCdbZGF0YS1tdXRhdGVdJykudHJpZ2dlcignbXV0YXRlbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZUFSSUEoaXNPbikge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnRbMF0uaWQ7XG4gICAgJChgW2RhdGEtb3Blbj1cIiR7aWR9XCJdLCBbZGF0YS1jbG9zZT1cIiR7aWR9XCJdLCBbZGF0YS10b2dnbGU9XCIke2lkfVwiXWApXG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogaXNPbiA/IHRydWUgOiBmYWxzZVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGluc3RhbmNlIG9mIFRvZ2dsZXIgb24gdGhlIGVsZW1lbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50b2dnbGVyJyk7XG4gIH1cbn1cblxuVG9nZ2xlci5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIENsYXNzIG9mIHRoZSBlbGVtZW50IHRvIHRvZ2dsZS4gSXQgY2FuIGJlIHByb3ZpZGVkIHdpdGggb3Igd2l0aG91dCBcIi5cIlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0b2dnbGVyOiB1bmRlZmluZWQsXG4gIC8qKlxuICAgKiBUZWxscyB0aGUgcGx1Z2luIGlmIHRoZSBlbGVtZW50IHNob3VsZCBhbmltYXRlZCB3aGVuIHRvZ2dsZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbmltYXRlOiBmYWxzZVxufTtcblxuZXhwb3J0IHtUb2dnbGVyfTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cywgaWdub3JlTW91c2VkaXNhcHBlYXIgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcbmltcG9ydCB7IFBvc2l0aW9uYWJsZSB9IGZyb20gJy4vZm91bmRhdGlvbi5wb3NpdGlvbmFibGUnO1xuXG4vKipcbiAqIFRvb2x0aXAgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnRvb2x0aXBcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgUG9zaXRpb25hYmxlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBUb29sdGlwLlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgVG9vbHRpcFxuICAgKiBAZmlyZXMgVG9vbHRpcCNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBhdHRhY2ggYSB0b29sdGlwIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9iamVjdCB0byBleHRlbmQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIF9zZXR1cChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFRvb2x0aXAuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdUb29sdGlwJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5pc0NsaWNrID0gZmFsc2U7XG5cbiAgICAvLyBUcmlnZ2VycyBpbml0IGlzIGlkZW1wb3RlbnQsIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQgaXMgaW5pdGlhbGl6ZWRcbiAgICBUcmlnZ2Vycy5pbml0KCQpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSB0b29sdGlwIGJ5IHNldHRpbmcgdGhlIGNyZWF0aW5nIHRoZSB0aXAgZWxlbWVudCwgYWRkaW5nIGl0J3MgdGV4dCwgc2V0dGluZyBwcml2YXRlIHZhcmlhYmxlcyBhbmQgc2V0dGluZyBhdHRyaWJ1dGVzIG9uIHRoZSBhbmNob3IuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICBNZWRpYVF1ZXJ5Ll9pbml0KCk7XG4gICAgdmFyIGVsZW1JZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1kZXNjcmliZWRieScpIHx8IEdldFlvRGlnaXRzKDYsICd0b29sdGlwJyk7XG5cbiAgICB0aGlzLm9wdGlvbnMudGlwVGV4dCA9IHRoaXMub3B0aW9ucy50aXBUZXh0IHx8IHRoaXMuJGVsZW1lbnQuYXR0cigndGl0bGUnKTtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlID8gJCh0aGlzLm9wdGlvbnMudGVtcGxhdGUpIDogdGhpcy5fYnVpbGRUZW1wbGF0ZShlbGVtSWQpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd0h0bWwpIHtcbiAgICAgIHRoaXMudGVtcGxhdGUuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLmh0bWwodGhpcy5vcHRpb25zLnRpcFRleHQpXG4gICAgICAgIC5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGVtcGxhdGUuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLnRleHQodGhpcy5vcHRpb25zLnRpcFRleHQpXG4gICAgICAgIC5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICd0aXRsZSc6ICcnLFxuICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBlbGVtSWQsXG4gICAgICAnZGF0YS15ZXRpLWJveCc6IGVsZW1JZCxcbiAgICAgICdkYXRhLXRvZ2dsZSc6IGVsZW1JZCxcbiAgICAgICdkYXRhLXJlc2l6ZSc6IGVsZW1JZFxuICAgIH0pLmFkZENsYXNzKHRoaXMub3B0aW9ucy50cmlnZ2VyQ2xhc3MpO1xuXG4gICAgc3VwZXIuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIF9nZXREZWZhdWx0UG9zaXRpb24oKSB7XG4gICAgLy8gaGFuZGxlIGxlZ2FjeSBjbGFzc25hbWVzXG4gICAgdmFyIGVsZW1lbnRDbGFzc05hbWUgPSB0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZTtcbiAgICBpZiAodGhpcy4kZWxlbWVudFswXSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudENsYXNzTmFtZSA9IGVsZW1lbnRDbGFzc05hbWUuYmFzZVZhbDtcbiAgICB9XG4gICAgdmFyIHBvc2l0aW9uID0gZWxlbWVudENsYXNzTmFtZS5tYXRjaCgvXFxiKHRvcHxsZWZ0fHJpZ2h0fGJvdHRvbSlcXGIvZyk7XG4gICAgcmV0dXJuIHBvc2l0aW9uID8gcG9zaXRpb25bMF0gOiAndG9wJztcbiAgfVxuXG4gIF9nZXREZWZhdWx0QWxpZ25tZW50KCkge1xuICAgIHJldHVybiAnY2VudGVyJztcbiAgfVxuXG4gIF9nZXRIT2Zmc2V0KCkge1xuICAgIGlmKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhPZmZzZXQgKyB0aGlzLm9wdGlvbnMudG9vbHRpcFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhPZmZzZXRcbiAgICB9XG4gIH1cblxuICBfZ2V0Vk9mZnNldCgpIHtcbiAgICBpZih0aGlzLnBvc2l0aW9uID09PSAndG9wJyB8fCB0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy52T2Zmc2V0ICsgdGhpcy5vcHRpb25zLnRvb2x0aXBIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMudk9mZnNldFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZHMgdGhlIHRvb2x0aXAgZWxlbWVudCwgYWRkcyBhdHRyaWJ1dGVzLCBhbmQgcmV0dXJucyB0aGUgdGVtcGxhdGUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYnVpbGRUZW1wbGF0ZShpZCkge1xuICAgIHZhciB0ZW1wbGF0ZUNsYXNzZXMgPSAoYCR7dGhpcy5vcHRpb25zLnRvb2x0aXBDbGFzc30gJHt0aGlzLm9wdGlvbnMudGVtcGxhdGVDbGFzc2VzfWApLnRyaW0oKTtcbiAgICB2YXIgJHRlbXBsYXRlID0gICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3ModGVtcGxhdGVDbGFzc2VzKS5hdHRyKHtcbiAgICAgICdyb2xlJzogJ3Rvb2x0aXAnLFxuICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcbiAgICAgICdkYXRhLWlzLWFjdGl2ZSc6IGZhbHNlLFxuICAgICAgJ2RhdGEtaXMtZm9jdXMnOiBmYWxzZSxcbiAgICAgICdpZCc6IGlkXG4gICAgfSk7XG4gICAgcmV0dXJuICR0ZW1wbGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHRoZSBwb3NpdGlvbiBjbGFzcyBvZiBhbiBlbGVtZW50IGFuZCByZWN1cnNpdmVseSBjYWxscyBpdHNlbGYgdW50aWwgdGhlcmUgYXJlIG5vIG1vcmUgcG9zc2libGUgcG9zaXRpb25zIHRvIGF0dGVtcHQsIG9yIHRoZSB0b29sdGlwIGVsZW1lbnQgaXMgbm8gbG9uZ2VyIGNvbGxpZGluZy5cbiAgICogaWYgdGhlIHRvb2x0aXAgaXMgbGFyZ2VyIHRoYW4gdGhlIHNjcmVlbiB3aWR0aCwgZGVmYXVsdCB0byBmdWxsIHdpZHRoIC0gYW55IHVzZXIgc2VsZWN0ZWQgbWFyZ2luXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc2V0UG9zaXRpb24oKSB7XG4gICAgc3VwZXIuX3NldFBvc2l0aW9uKHRoaXMuJGVsZW1lbnQsIHRoaXMudGVtcGxhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldmVhbHMgdGhlIHRvb2x0aXAsIGFuZCBmaXJlcyBhbiBldmVudCB0byBjbG9zZSBhbnkgb3RoZXIgb3BlbiB0b29sdGlwcyBvbiB0aGUgcGFnZVxuICAgKiBAZmlyZXMgVG9vbHRpcCNjbG9zZW1lXG4gICAqIEBmaXJlcyBUb29sdGlwI3Nob3dcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBzaG93KCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd09uICE9PSAnYWxsJyAmJiAhTWVkaWFRdWVyeS5pcyh0aGlzLm9wdGlvbnMuc2hvd09uKSkge1xuICAgICAgLy8gY29uc29sZS5lcnJvcignVGhlIHNjcmVlbiBpcyB0b28gc21hbGwgdG8gZGlzcGxheSB0aGlzIHRvb2x0aXAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMudGVtcGxhdGUuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpLnNob3coKTtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMudGVtcGxhdGUucmVtb3ZlQ2xhc3MoJ3RvcCBib3R0b20gbGVmdCByaWdodCcpLmFkZENsYXNzKHRoaXMucG9zaXRpb24pXG4gICAgdGhpcy50ZW1wbGF0ZS5yZW1vdmVDbGFzcygnYWxpZ24tdG9wIGFsaWduLWJvdHRvbSBhbGlnbi1sZWZ0IGFsaWduLXJpZ2h0IGFsaWduLWNlbnRlcicpLmFkZENsYXNzKCdhbGlnbi0nICsgdGhpcy5hbGlnbm1lbnQpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgdG8gY2xvc2UgYWxsIG90aGVyIG9wZW4gdG9vbHRpcHMgb24gdGhlIHBhZ2VcbiAgICAgKiBAZXZlbnQgQ2xvc2VtZSN0b29sdGlwXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZW1lLnpmLnRvb2x0aXAnLCB0aGlzLnRlbXBsYXRlLmF0dHIoJ2lkJykpO1xuXG5cbiAgICB0aGlzLnRlbXBsYXRlLmF0dHIoe1xuICAgICAgJ2RhdGEtaXMtYWN0aXZlJzogdHJ1ZSxcbiAgICAgICdhcmlhLWhpZGRlbic6IGZhbHNlXG4gICAgfSk7XG4gICAgX3RoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMudGVtcGxhdGUuc3RvcCgpLmhpZGUoKS5jc3MoJ3Zpc2liaWxpdHknLCAnJykuZmFkZUluKHRoaXMub3B0aW9ucy5mYWRlSW5EdXJhdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAvL21heWJlIGRvIHN0dWZmP1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHRvb2x0aXAgaXMgc2hvd25cbiAgICAgKiBAZXZlbnQgVG9vbHRpcCNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLnRvb2x0aXAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgY3VycmVudCB0b29sdGlwLCBhbmQgcmVzZXRzIHRoZSBwb3NpdGlvbmluZyBjbGFzcyBpZiBpdCB3YXMgY2hhbmdlZCBkdWUgdG8gY29sbGlzaW9uXG4gICAqIEBmaXJlcyBUb29sdGlwI2hpZGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBoaWRlKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy50ZW1wbGF0ZS5zdG9wKCkuYXR0cih7XG4gICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlLFxuICAgICAgJ2RhdGEtaXMtYWN0aXZlJzogZmFsc2VcbiAgICB9KS5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlT3V0RHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIF90aGlzLmlzQ2xpY2sgPSBmYWxzZTtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBmaXJlcyB3aGVuIHRoZSB0b29sdGlwIGlzIGhpZGRlblxuICAgICAqIEBldmVudCBUb29sdGlwI2hpZGVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYudG9vbHRpcCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgdG9vbHRpcCBhbmQgaXRzIGFuY2hvclxuICAgKiBUT0RPIGNvbWJpbmUgc29tZSBvZiB0aGUgbGlzdGVuZXJzIGxpa2UgZm9jdXMgYW5kIG1vdXNlZW50ZXIsIGV0Yy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IGhhc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8ICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCAhPT0gJ3VuZGVmaW5lZCcpO1xuICAgIHZhciBpc0ZvY3VzID0gZmFsc2U7XG5cbiAgICAvLyBgZGlzYWJsZUZvclRvdWNoOiBGdWxseSBkaXNhYmxlIHRoZSB0b29sdGlwIG9uIHRvdWNoIGRldmljZXNcbiAgICBpZiAoaGFzVG91Y2ggJiYgdGhpcy5vcHRpb25zLmRpc2FibGVGb3JUb3VjaCkgcmV0dXJuO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZUhvdmVyKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAub24oJ21vdXNlZW50ZXIuemYudG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIV90aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgfSwgX3RoaXMub3B0aW9ucy5ob3ZlckRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS56Zi50b29sdGlwJywgaWdub3JlTW91c2VkaXNhcHBlYXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgaWYgKCFpc0ZvY3VzIHx8IChfdGhpcy5pc0NsaWNrICYmICFfdGhpcy5vcHRpb25zLmNsaWNrT3BlbikpIHtcbiAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVG91Y2gpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbigndGFwLnpmLnRvb2x0aXAgdG91Y2hlbmQuemYudG9vbHRpcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuaXNBY3RpdmUgPyBfdGhpcy5oaWRlKCkgOiBfdGhpcy5zaG93KCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrT3Blbikge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2Vkb3duLnpmLnRvb2x0aXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF90aGlzLmlzQ2xpY2spIHtcbiAgICAgICAgICAvL190aGlzLmhpZGUoKTtcbiAgICAgICAgICAvLyBfdGhpcy5pc0NsaWNrID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNDbGljayA9IHRydWU7XG4gICAgICAgICAgaWYgKChfdGhpcy5vcHRpb25zLmRpc2FibGVIb3ZlciB8fCAhX3RoaXMuJGVsZW1lbnQuYXR0cigndGFiaW5kZXgnKSkgJiYgIV90aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbignbW91c2Vkb3duLnpmLnRvb2x0aXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuaXNDbGljayA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgIC8vICd0b2dnbGUuemYudHJpZ2dlcic6IHRoaXMudG9nZ2xlLmJpbmQodGhpcyksXG4gICAgICAvLyAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuaGlkZS5iaW5kKHRoaXMpXG4gICAgICAnY2xvc2UuemYudHJpZ2dlcic6IHRoaXMuaGlkZS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAub24oJ2ZvY3VzLnpmLnRvb2x0aXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXNGb2N1cyA9IHRydWU7XG4gICAgICAgIGlmIChfdGhpcy5pc0NsaWNrKSB7XG4gICAgICAgICAgLy8gSWYgd2UncmUgbm90IHNob3dpbmcgb3BlbiBvbiBjbGlja3MsIHdlIG5lZWQgdG8gcHJldGVuZCBhIGNsaWNrLWxhdW5jaGVkIGZvY3VzIGlzbid0XG4gICAgICAgICAgLy8gYSByZWFsIGZvY3VzLCBvdGhlcndpc2Ugb24gaG92ZXIgYW5kIGNvbWUgYmFjayB3ZSBnZXQgYmFkIGJlaGF2aW9yXG4gICAgICAgICAgaWYoIV90aGlzLm9wdGlvbnMuY2xpY2tPcGVuKSB7IGlzRm9jdXMgPSBmYWxzZTsgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC5vbignZm9jdXNvdXQuemYudG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmlzQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaGlkZSgpO1xuICAgICAgfSlcblxuICAgICAgLm9uKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgIF90aGlzLl9zZXRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIGEgdG9nZ2xlIG1ldGhvZCwgaW4gYWRkaXRpb24gdG8gdGhlIHN0YXRpYyBzaG93KCkgJiBoaWRlKCkgZnVuY3Rpb25zXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIHRvb2x0aXAsIHJlbW92ZXMgdGVtcGxhdGUgZWxlbWVudCBmcm9tIHRoZSB2aWV3LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cigndGl0bGUnLCB0aGlzLnRlbXBsYXRlLnRleHQoKSlcbiAgICAgICAgICAgICAgICAgLm9mZignLnpmLnRyaWdnZXIgLnpmLnRvb2x0aXAnKVxuICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnRyaWdnZXJDbGFzcylcbiAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0b3AgcmlnaHQgbGVmdCBib3R0b20nKVxuICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieSBkYXRhLWRpc2FibGUtaG92ZXIgZGF0YS1yZXNpemUgZGF0YS10b2dnbGUgZGF0YS10b29sdGlwIGRhdGEteWV0aS1ib3gnKTtcblxuICAgIHRoaXMudGVtcGxhdGUucmVtb3ZlKCk7XG4gIH1cbn1cblxuVG9vbHRpcC5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCBiZWZvcmUgYSB0b29sdGlwIHNob3VsZCBvcGVuIG9uIGhvdmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDIwMFxuICAgKi9cbiAgaG92ZXJEZWxheTogMjAwLFxuICAvKipcbiAgICogVGltZSwgaW4gbXMsIGEgdG9vbHRpcCBzaG91bGQgdGFrZSB0byBmYWRlIGludG8gdmlldy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxNTBcbiAgICovXG4gIGZhZGVJbkR1cmF0aW9uOiAxNTAsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgYSB0b29sdGlwIHNob3VsZCB0YWtlIHRvIGZhZGUgb3V0IG9mIHZpZXcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMTUwXG4gICAqL1xuICBmYWRlT3V0RHVyYXRpb246IDE1MCxcbiAgLyoqXG4gICAqIERpc2FibGVzIGhvdmVyIGV2ZW50cyBmcm9tIG9wZW5pbmcgdGhlIHRvb2x0aXAgaWYgc2V0IHRvIHRydWVcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRpc2FibGVIb3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBEaXNhYmxlIHRoZSB0b29sdGlwIGZvciB0b3VjaCBkZXZpY2VzLlxuICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gbWFrZSBlbGVtZW50cyB3aXRoIGEgdG9vbHRpcCBvbiBpdCB0cmlnZ2VyIHRoZWlyXG4gICAqIGFjdGlvbiBvbiB0aGUgZmlyc3QgdGFwIGluc3RlYWQgb2YgZGlzcGxheWluZyB0aGUgdG9vbHRpcC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vZWxhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRpc2FibGVGb3JUb3VjaDogZmFsc2UsXG4gIC8qKlxuICAgKiBPcHRpb25hbCBhZGR0aW9uYWwgY2xhc3NlcyB0byBhcHBseSB0byB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSBvbiBpbml0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICB0ZW1wbGF0ZUNsYXNzZXM6ICcnLFxuICAvKipcbiAgICogTm9uLW9wdGlvbmFsIGNsYXNzIGFkZGVkIHRvIHRvb2x0aXAgdGVtcGxhdGVzLiBGb3VuZGF0aW9uIGRlZmF1bHQgaXMgJ3Rvb2x0aXAnLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd0b29sdGlwJ1xuICAgKi9cbiAgdG9vbHRpcENsYXNzOiAndG9vbHRpcCcsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSB0b29sdGlwIGFuY2hvciBlbGVtZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdoYXMtdGlwJ1xuICAgKi9cbiAgdHJpZ2dlckNsYXNzOiAnaGFzLXRpcCcsXG4gIC8qKlxuICAgKiBNaW5pbXVtIGJyZWFrcG9pbnQgc2l6ZSBhdCB3aGljaCB0byBvcGVuIHRoZSB0b29sdGlwLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdzbWFsbCdcbiAgICovXG4gIHNob3dPbjogJ3NtYWxsJyxcbiAgLyoqXG4gICAqIEN1c3RvbSB0ZW1wbGF0ZSB0byBiZSB1c2VkIHRvIGdlbmVyYXRlIG1hcmt1cCBmb3IgdG9vbHRpcC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgdGVtcGxhdGU6ICcnLFxuICAvKipcbiAgICogVGV4dCBkaXNwbGF5ZWQgaW4gdGhlIHRvb2x0aXAgdGVtcGxhdGUgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgdGlwVGV4dDogJycsXG4gIHRvdWNoQ2xvc2VUZXh0OiAnVGFwIHRvIGNsb3NlLicsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIHRvb2x0aXAgdG8gcmVtYWluIG9wZW4gaWYgdHJpZ2dlcmVkIHdpdGggYSBjbGljayBvciB0b3VjaCBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xpY2tPcGVuOiB0cnVlLFxuICAvKipcbiAgICogUG9zaXRpb24gb2YgdG9vbHRpcC4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIHBvc2l0aW9uOiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGlnbm1lbnQgb2YgdG9vbHRpcCByZWxhdGl2ZSB0byBhbmNob3IuIENhbiBiZSBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIGNlbnRlciwgb3IgYXV0by5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnYXV0bydcbiAgICovXG4gIGFsaWdubWVudDogJ2F1dG8nLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBjb250YWluZXIvd2luZG93LiBJZiBmYWxzZSwgdG9vbHRpcCB3aWxsIGZpcnN0IHRyeSB0b1xuICAgKiBwb3NpdGlvbiBhcyBkZWZpbmVkIGJ5IGRhdGEtcG9zaXRpb24gYW5kIGRhdGEtYWxpZ25tZW50LCBidXQgcmVwb3NpdGlvbiBpZlxuICAgKiBpdCB3b3VsZCBjYXVzZSBhbiBvdmVyZmxvdy4gIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd092ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lci4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb25cbiAgICogYmVoYXZpb3IgZm9yIGRyb3Bkb3ducywgYWxsb3dpbmcgdGhlIGRyb3Bkb3duIHRvIGV4dGVuZCB0aGUgYm90dG9tIG9mIHRoZVxuICAgKiBzY3JlZW4gYnV0IG5vdCBvdGhlcndpc2UgaW5mbHVlbmNlIG9yIGJyZWFrIG91dCBvZiB0aGUgY29udGFpbmVyLlxuICAgKiBMZXNzIGNvbW1vbiBmb3IgdG9vbHRpcHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd0JvdHRvbU92ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIHRlbXBsYXRlIHNob3VsZCBwdXNoIGF3YXkgZnJvbSB0aGUgYW5jaG9yIG9uIHRoZSBZIGF4aXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgdk9mZnNldDogMCxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSB0ZW1wbGF0ZSBzaG91bGQgcHVzaCBhd2F5IGZyb20gdGhlIGFuY2hvciBvbiB0aGUgWCBheGlzXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgaE9mZnNldDogMCxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSB0ZW1wbGF0ZSBzcGFjaW5nIGF1dG8tYWRqdXN0IGZvciBhIHZlcnRpY2FsIHRvb2x0aXBcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxNFxuICAgKi9cbiAgdG9vbHRpcEhlaWdodDogMTQsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgdGVtcGxhdGUgc3BhY2luZyBhdXRvLWFkanVzdCBmb3IgYSBob3Jpem9udGFsIHRvb2x0aXBcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxMlxuICAgKi9cbiAgdG9vbHRpcFdpZHRoOiAxMixcbiAgICAvKipcbiAgICogQWxsb3cgSFRNTCBpbiB0b29sdGlwLiBXYXJuaW5nOiBJZiB5b3UgYXJlIGxvYWRpbmcgdXNlci1nZW5lcmF0ZWQgY29udGVudCBpbnRvIHRvb2x0aXBzLFxuICAgKiBhbGxvd2luZyBIVE1MIG1heSBvcGVuIHlvdXJzZWxmIHVwIHRvIFhTUyBhdHRhY2tzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWxsb3dIdG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBUT0RPIHV0aWxpemUgcmVzaXplIGV2ZW50IHRyaWdnZXJcbiAqL1xuXG5leHBvcnQge1Rvb2x0aXB9O1xuIiwidmFyIEJveCA9IHtcbiAgSW1Ob3RUb3VjaGluZ1lvdTogSW1Ob3RUb3VjaGluZ1lvdSxcbiAgT3ZlcmxhcEFyZWE6IE92ZXJsYXBBcmVhLFxuICBHZXREaW1lbnNpb25zOiBHZXREaW1lbnNpb25zLFxuICBHZXRFeHBsaWNpdE9mZnNldHM6IEdldEV4cGxpY2l0T2Zmc2V0c1xufVxuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQgdG8gYSBjb250YWluZXIgYW5kIGRldGVybWluZXMgY29sbGlzaW9uIGV2ZW50cyB3aXRoIGNvbnRhaW5lci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHRlc3QgZm9yIGNvbGxpc2lvbnMuXG4gKiBAcGFyYW0ge2pRdWVyeX0gcGFyZW50IC0galF1ZXJ5IG9iamVjdCB0byB1c2UgYXMgYm91bmRpbmcgY29udGFpbmVyLlxuICogQHBhcmFtIHtCb29sZWFufSBsck9ubHkgLSBzZXQgdG8gdHJ1ZSB0byBjaGVjayBsZWZ0IGFuZCByaWdodCB2YWx1ZXMgb25seS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGJPbmx5IC0gc2V0IHRvIHRydWUgdG8gY2hlY2sgdG9wIGFuZCBib3R0b20gdmFsdWVzIG9ubHkuXG4gKiBAZGVmYXVsdCBpZiBubyBwYXJlbnQgb2JqZWN0IHBhc3NlZCwgZGV0ZWN0cyBjb2xsaXNpb25zIHdpdGggYHdpbmRvd2AuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIGNvbGxpc2lvbiBmcmVlLCBmYWxzZSBpZiBhIGNvbGxpc2lvbiBpbiBhbnkgZGlyZWN0aW9uLlxuICovXG5mdW5jdGlvbiBJbU5vdFRvdWNoaW5nWW91KGVsZW1lbnQsIHBhcmVudCwgbHJPbmx5LCB0Yk9ubHksIGlnbm9yZUJvdHRvbSkge1xuICByZXR1cm4gT3ZlcmxhcEFyZWEoZWxlbWVudCwgcGFyZW50LCBsck9ubHksIHRiT25seSwgaWdub3JlQm90dG9tKSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gT3ZlcmxhcEFyZWEoZWxlbWVudCwgcGFyZW50LCBsck9ubHksIHRiT25seSwgaWdub3JlQm90dG9tKSB7XG4gIHZhciBlbGVEaW1zID0gR2V0RGltZW5zaW9ucyhlbGVtZW50KSxcbiAgdG9wT3ZlciwgYm90dG9tT3ZlciwgbGVmdE92ZXIsIHJpZ2h0T3ZlcjtcbiAgaWYgKHBhcmVudCkge1xuICAgIHZhciBwYXJEaW1zID0gR2V0RGltZW5zaW9ucyhwYXJlbnQpO1xuXG4gICAgYm90dG9tT3ZlciA9IChwYXJEaW1zLmhlaWdodCArIHBhckRpbXMub2Zmc2V0LnRvcCkgLSAoZWxlRGltcy5vZmZzZXQudG9wICsgZWxlRGltcy5oZWlnaHQpO1xuICAgIHRvcE92ZXIgICAgPSBlbGVEaW1zLm9mZnNldC50b3AgLSBwYXJEaW1zLm9mZnNldC50b3A7XG4gICAgbGVmdE92ZXIgICA9IGVsZURpbXMub2Zmc2V0LmxlZnQgLSBwYXJEaW1zLm9mZnNldC5sZWZ0O1xuICAgIHJpZ2h0T3ZlciAgPSAocGFyRGltcy53aWR0aCArIHBhckRpbXMub2Zmc2V0LmxlZnQpIC0gKGVsZURpbXMub2Zmc2V0LmxlZnQgKyBlbGVEaW1zLndpZHRoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBib3R0b21PdmVyID0gKGVsZURpbXMud2luZG93RGltcy5oZWlnaHQgKyBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcCkgLSAoZWxlRGltcy5vZmZzZXQudG9wICsgZWxlRGltcy5oZWlnaHQpO1xuICAgIHRvcE92ZXIgICAgPSBlbGVEaW1zLm9mZnNldC50b3AgLSBlbGVEaW1zLndpbmRvd0RpbXMub2Zmc2V0LnRvcDtcbiAgICBsZWZ0T3ZlciAgID0gZWxlRGltcy5vZmZzZXQubGVmdCAtIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQubGVmdDtcbiAgICByaWdodE92ZXIgID0gZWxlRGltcy53aW5kb3dEaW1zLndpZHRoIC0gKGVsZURpbXMub2Zmc2V0LmxlZnQgKyBlbGVEaW1zLndpZHRoKTtcbiAgfVxuXG4gIGJvdHRvbU92ZXIgPSBpZ25vcmVCb3R0b20gPyAwIDogTWF0aC5taW4oYm90dG9tT3ZlciwgMCk7XG4gIHRvcE92ZXIgICAgPSBNYXRoLm1pbih0b3BPdmVyLCAwKTtcbiAgbGVmdE92ZXIgICA9IE1hdGgubWluKGxlZnRPdmVyLCAwKTtcbiAgcmlnaHRPdmVyICA9IE1hdGgubWluKHJpZ2h0T3ZlciwgMCk7XG5cbiAgaWYgKGxyT25seSkge1xuICAgIHJldHVybiBsZWZ0T3ZlciArIHJpZ2h0T3ZlcjtcbiAgfVxuICBpZiAodGJPbmx5KSB7XG4gICAgcmV0dXJuIHRvcE92ZXIgKyBib3R0b21PdmVyO1xuICB9XG5cbiAgLy8gdXNlIHN1bSBvZiBzcXVhcmVzIGIvYyB3ZSBjYXJlIGFib3V0IG92ZXJsYXAgYXJlYS5cbiAgcmV0dXJuIE1hdGguc3FydCgodG9wT3ZlciAqIHRvcE92ZXIpICsgKGJvdHRvbU92ZXIgKiBib3R0b21PdmVyKSArIChsZWZ0T3ZlciAqIGxlZnRPdmVyKSArIChyaWdodE92ZXIgKiByaWdodE92ZXIpKTtcbn1cblxuLyoqXG4gKiBVc2VzIG5hdGl2ZSBtZXRob2RzIHRvIHJldHVybiBhbiBvYmplY3Qgb2YgZGltZW5zaW9uIHZhbHVlcy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnkgfHwgSFRNTH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3Qgb3IgRE9NIGVsZW1lbnQgZm9yIHdoaWNoIHRvIGdldCB0aGUgZGltZW5zaW9ucy4gQ2FuIGJlIGFueSBlbGVtZW50IG90aGVyIHRoYXQgZG9jdW1lbnQgb3Igd2luZG93LlxuICogQHJldHVybnMge09iamVjdH0gLSBuZXN0ZWQgb2JqZWN0IG9mIGludGVnZXIgcGl4ZWwgdmFsdWVzXG4gKiBUT0RPIC0gaWYgZWxlbWVudCBpcyB3aW5kb3csIHJldHVybiBvbmx5IHRob3NlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gR2V0RGltZW5zaW9ucyhlbGVtKXtcbiAgZWxlbSA9IGVsZW0ubGVuZ3RoID8gZWxlbVswXSA6IGVsZW07XG5cbiAgaWYgKGVsZW0gPT09IHdpbmRvdyB8fCBlbGVtID09PSBkb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkknbSBzb3JyeSwgRGF2ZS4gSSdtIGFmcmFpZCBJIGNhbid0IGRvIHRoYXQuXCIpO1xuICB9XG5cbiAgdmFyIHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgcGFyUmVjdCA9IGVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHdpblJlY3QgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgd2luWSA9IHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgIHdpblggPSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgIG9mZnNldDoge1xuICAgICAgdG9wOiByZWN0LnRvcCArIHdpblksXG4gICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5YXG4gICAgfSxcbiAgICBwYXJlbnREaW1zOiB7XG4gICAgICB3aWR0aDogcGFyUmVjdC53aWR0aCxcbiAgICAgIGhlaWdodDogcGFyUmVjdC5oZWlnaHQsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgdG9wOiBwYXJSZWN0LnRvcCArIHdpblksXG4gICAgICAgIGxlZnQ6IHBhclJlY3QubGVmdCArIHdpblhcbiAgICAgIH1cbiAgICB9LFxuICAgIHdpbmRvd0RpbXM6IHtcbiAgICAgIHdpZHRoOiB3aW5SZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5SZWN0LmhlaWdodCxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB0b3A6IHdpblksXG4gICAgICAgIGxlZnQ6IHdpblhcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB0b3AgYW5kIGxlZnQgaW50ZWdlciBwaXhlbCB2YWx1ZXMgZm9yIGR5bmFtaWNhbGx5IHJlbmRlcmVkIGVsZW1lbnRzLFxuICogc3VjaCBhczogVG9vbHRpcCwgUmV2ZWFsLCBhbmQgRHJvcGRvd24uIE1haW50YWluZWQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCBhbmQgd2hlcmVcbiAqIHlvdSBkb24ndCBrbm93IGFsaWdubWVudCwgYnV0IGdlbmVyYWxseSBmcm9tXG4gKiA2LjQgZm9yd2FyZCB5b3Ugc2hvdWxkIHVzZSBHZXRFeHBsaWNpdE9mZnNldHMsIGFzIEdldE9mZnNldHMgY29uZmxhdGVzIHBvc2l0aW9uIGFuZCBhbGlnbm1lbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCBmb3IgdGhlIGVsZW1lbnQgYmVpbmcgcG9zaXRpb25lZC5cbiAqIEBwYXJhbSB7alF1ZXJ5fSBhbmNob3IgLSBqUXVlcnkgb2JqZWN0IGZvciB0aGUgZWxlbWVudCdzIGFuY2hvciBwb2ludC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiAtIGEgc3RyaW5nIHJlbGF0aW5nIHRvIHRoZSBkZXNpcmVkIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50LCByZWxhdGl2ZSB0byBpdCdzIGFuY2hvclxuICogQHBhcmFtIHtOdW1iZXJ9IHZPZmZzZXQgLSBpbnRlZ2VyIHBpeGVsIHZhbHVlIG9mIGRlc2lyZWQgdmVydGljYWwgc2VwYXJhdGlvbiBiZXR3ZWVuIGFuY2hvciBhbmQgZWxlbWVudC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBoT2Zmc2V0IC0gaW50ZWdlciBwaXhlbCB2YWx1ZSBvZiBkZXNpcmVkIGhvcml6b250YWwgc2VwYXJhdGlvbiBiZXR3ZWVuIGFuY2hvciBhbmQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNPdmVyZmxvdyAtIGlmIGEgY29sbGlzaW9uIGV2ZW50IGlzIGRldGVjdGVkLCBzZXRzIHRvIHRydWUgdG8gZGVmYXVsdCB0aGUgZWxlbWVudCB0byBmdWxsIHdpZHRoIC0gYW55IGRlc2lyZWQgb2Zmc2V0LlxuICogVE9ETyBhbHRlci9yZXdyaXRlIHRvIHdvcmsgd2l0aCBgZW1gIHZhbHVlcyBhcyB3ZWxsL2luc3RlYWQgb2YgcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIEdldEV4cGxpY2l0T2Zmc2V0cyhlbGVtZW50LCBhbmNob3IsIHBvc2l0aW9uLCBhbGlnbm1lbnQsIHZPZmZzZXQsIGhPZmZzZXQsIGlzT3ZlcmZsb3cpIHtcbiAgdmFyICRlbGVEaW1zID0gR2V0RGltZW5zaW9ucyhlbGVtZW50KSxcbiAgICAgICRhbmNob3JEaW1zID0gYW5jaG9yID8gR2V0RGltZW5zaW9ucyhhbmNob3IpIDogbnVsbDtcblxuICAgICAgdmFyIHRvcFZhbCwgbGVmdFZhbDtcblxuICBpZiAoJGFuY2hvckRpbXMgIT09IG51bGwpIHtcbiAgLy8gc2V0IHBvc2l0aW9uIHJlbGF0ZWQgYXR0cmlidXRlXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtICgkZWxlRGltcy5oZWlnaHQgKyB2T2Zmc2V0KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgJGFuY2hvckRpbXMuaGVpZ2h0ICsgdk9mZnNldDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgbGVmdFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0IC0gKCRlbGVEaW1zLndpZHRoICsgaE9mZnNldCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyaWdodCc6XG4gICAgICBsZWZ0VmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAkYW5jaG9yRGltcy53aWR0aCArIGhPZmZzZXQ7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIHNldCBhbGlnbm1lbnQgcmVsYXRlZCBhdHRyaWJ1dGVcbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArIGhPZmZzZXQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICBsZWZ0VmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAkZWxlRGltcy53aWR0aCArICRhbmNob3JEaW1zLndpZHRoIC0gaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICBsZWZ0VmFsID0gaXNPdmVyZmxvdyA/IGhPZmZzZXQgOiAoKCRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgKCRhbmNob3JEaW1zLndpZHRoIC8gMikpIC0gKCRlbGVEaW1zLndpZHRoIC8gMikpICsgaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCAtIHZPZmZzZXQgKyAkYW5jaG9yRGltcy5oZWlnaHQgLSAkZWxlRGltcy5oZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgdG9wVmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXRcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICB0b3BWYWwgPSAoJGFuY2hvckRpbXMub2Zmc2V0LnRvcCArIHZPZmZzZXQgKyAoJGFuY2hvckRpbXMuaGVpZ2h0IC8gMikpIC0gKCRlbGVEaW1zLmhlaWdodCAvIDIpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICB9XG5cbiAgcmV0dXJuIHt0b3A6IHRvcFZhbCwgbGVmdDogbGVmdFZhbH07XG59XG5cbmV4cG9ydCB7Qm94fTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8qKlxuICogUnVucyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gaW1hZ2VzIGFyZSBmdWxseSBsb2FkZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gaW1hZ2VzIC0gSW1hZ2UocykgdG8gY2hlY2sgaWYgbG9hZGVkLlxuICogQHBhcmFtIHtGdW5jfSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBpbWFnZSBpcyBmdWxseSBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIG9uSW1hZ2VzTG9hZGVkKGltYWdlcywgY2FsbGJhY2spe1xuICB2YXIgdW5sb2FkZWQgPSBpbWFnZXMubGVuZ3RoO1xuXG4gIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICBpbWFnZXMuZWFjaChmdW5jdGlvbigpe1xuICAgIC8vIENoZWNrIGlmIGltYWdlIGlzIGxvYWRlZFxuICAgIGlmICh0aGlzLmNvbXBsZXRlICYmIHR5cGVvZiB0aGlzLm5hdHVyYWxXaWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHNpbmdsZUltYWdlTG9hZGVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gSWYgdGhlIGFib3ZlIGNoZWNrIGZhaWxlZCwgc2ltdWxhdGUgbG9hZGluZyBvbiBkZXRhY2hlZCBlbGVtZW50LlxuICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAvLyBTdGlsbCBjb3VudCBpbWFnZSBhcyBsb2FkZWQgaWYgaXQgZmluYWxpemVzIHdpdGggYW4gZXJyb3IuXG4gICAgICB2YXIgZXZlbnRzID0gXCJsb2FkLnpmLmltYWdlcyBlcnJvci56Zi5pbWFnZXNcIjtcbiAgICAgICQoaW1hZ2UpLm9uZShldmVudHMsIGZ1bmN0aW9uIG1lKCl7XG4gICAgICAgIC8vIFVuYmluZCB0aGUgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSB1c2luZyAnb25lJyBidXQgb25seSBvbmUgb2YgdGhlIHR3byBldmVudHMgd2lsbCBoYXZlIGZpcmVkLlxuICAgICAgICAkKHRoaXMpLm9mZihldmVudHMsIG1lKTtcbiAgICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICAgIH0pO1xuICAgICAgaW1hZ2Uuc3JjID0gJCh0aGlzKS5hdHRyKCdzcmMnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNpbmdsZUltYWdlTG9hZGVkKCkge1xuICAgIHVubG9hZGVkLS07XG4gICAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBvbkltYWdlc0xvYWRlZCB9O1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKiBUaGlzIHV0aWwgd2FzIGNyZWF0ZWQgYnkgTWFyaXVzIE9sYmVydHogKlxuICogUGxlYXNlIHRoYW5rIE1hcml1cyBvbiBHaXRIdWIgL293bGJlcnR6ICpcbiAqIG9yIHRoZSB3ZWIgaHR0cDovL3d3dy5tYXJpdXNvbGJlcnR6LmRlLyAqXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IHJ0bCBhcyBSdGwgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5cbmNvbnN0IGtleUNvZGVzID0ge1xuICA5OiAnVEFCJyxcbiAgMTM6ICdFTlRFUicsXG4gIDI3OiAnRVNDQVBFJyxcbiAgMzI6ICdTUEFDRScsXG4gIDM1OiAnRU5EJyxcbiAgMzY6ICdIT01FJyxcbiAgMzc6ICdBUlJPV19MRUZUJyxcbiAgMzg6ICdBUlJPV19VUCcsXG4gIDM5OiAnQVJST1dfUklHSFQnLFxuICA0MDogJ0FSUk9XX0RPV04nXG59XG5cbnZhciBjb21tYW5kcyA9IHt9XG5cbi8vIEZ1bmN0aW9ucyBwdWxsZWQgb3V0IHRvIGJlIHJlZmVyZW5jZWFibGUgZnJvbSBpbnRlcm5hbHNcbmZ1bmN0aW9uIGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpIHtcbiAgaWYoISRlbGVtZW50KSB7cmV0dXJuIGZhbHNlOyB9XG4gIHJldHVybiAkZWxlbWVudC5maW5kKCdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCAqW3RhYmluZGV4XSwgKltjb250ZW50ZWRpdGFibGVdJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgIGlmICghJCh0aGlzKS5pcygnOnZpc2libGUnKSB8fCAkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JykgPCAwKSB7IHJldHVybiBmYWxzZTsgfSAvL29ubHkgaGF2ZSB2aXNpYmxlIGVsZW1lbnRzIGFuZCB0aG9zZSB0aGF0IGhhdmUgYSB0YWJpbmRleCBncmVhdGVyIG9yIGVxdWFsIDBcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSlcbiAgLnNvcnQoIGZ1bmN0aW9uKCBhLCBiICkge1xuICAgIGlmICgkKGEpLmF0dHIoJ3RhYmluZGV4JykgPT09ICQoYikuYXR0cigndGFiaW5kZXgnKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGxldCBhVGFiSW5kZXggPSBwYXJzZUludCgkKGEpLmF0dHIoJ3RhYmluZGV4JyksIDEwKSxcbiAgICAgIGJUYWJJbmRleCA9IHBhcnNlSW50KCQoYikuYXR0cigndGFiaW5kZXgnKSwgMTApO1xuICAgIC8vIFVuZGVmaW5lZCBpcyB0cmVhdGVkIHRoZSBzYW1lIGFzIDBcbiAgICBpZiAodHlwZW9mICQoYSkuYXR0cigndGFiaW5kZXgnKSA9PT0gJ3VuZGVmaW5lZCcgJiYgYlRhYkluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgJChiKS5hdHRyKCd0YWJpbmRleCcpID09PSAndW5kZWZpbmVkJyAmJiBhVGFiSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChhVGFiSW5kZXggPT09IDAgJiYgYlRhYkluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmIChiVGFiSW5kZXggPT09IDAgJiYgYVRhYkluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAoYVRhYkluZGV4IDwgYlRhYkluZGV4KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChhVGFiSW5kZXggPiBiVGFiSW5kZXgpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlS2V5KGV2ZW50KSB7XG4gIHZhciBrZXkgPSBrZXlDb2Rlc1tldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LndoaWNoKS50b1VwcGVyQ2FzZSgpO1xuXG4gIC8vIFJlbW92ZSB1bi1wcmludGFibGUgY2hhcmFjdGVycywgZS5nLiBmb3IgYGZyb21DaGFyQ29kZWAgY2FsbHMgZm9yIENUUkwgb25seSBldmVudHNcbiAga2V5ID0ga2V5LnJlcGxhY2UoL1xcVysvLCAnJyk7XG5cbiAgaWYgKGV2ZW50LnNoaWZ0S2V5KSBrZXkgPSBgU0hJRlRfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmN0cmxLZXkpIGtleSA9IGBDVFJMXyR7a2V5fWA7XG4gIGlmIChldmVudC5hbHRLZXkpIGtleSA9IGBBTFRfJHtrZXl9YDtcblxuICAvLyBSZW1vdmUgdHJhaWxpbmcgdW5kZXJzY29yZSwgaW4gY2FzZSBvbmx5IG1vZGlmaWVycyB3ZXJlIHVzZWQgKGUuZy4gb25seSBgQ1RSTF9BTFRgKVxuICBrZXkgPSBrZXkucmVwbGFjZSgvXyQvLCAnJyk7XG5cbiAgcmV0dXJuIGtleTtcbn1cblxudmFyIEtleWJvYXJkID0ge1xuICBrZXlzOiBnZXRLZXlDb2RlcyhrZXlDb2RlcyksXG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgKGtleWJvYXJkKSBldmVudCBhbmQgcmV0dXJucyBhIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgaXRzIGtleVxuICAgKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEByZXR1cm4gU3RyaW5nIGtleSAtIFN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGtleSBwcmVzc2VkXG4gICAqL1xuICBwYXJzZUtleTogcGFyc2VLZXksXG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGdpdmVuIChrZXlib2FyZCkgZXZlbnRcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSB0aGUgZXZlbnQgZ2VuZXJhdGVkIGJ5IHRoZSBldmVudCBoYW5kbGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnQgLSBGb3VuZGF0aW9uIGNvbXBvbmVudCdzIG5hbWUsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcGFyYW0ge09iamVjdHN9IGZ1bmN0aW9ucyAtIGNvbGxlY3Rpb24gb2YgZnVuY3Rpb25zIHRoYXQgYXJlIHRvIGJlIGV4ZWN1dGVkXG4gICAqL1xuICBoYW5kbGVLZXkoZXZlbnQsIGNvbXBvbmVudCwgZnVuY3Rpb25zKSB7XG4gICAgdmFyIGNvbW1hbmRMaXN0ID0gY29tbWFuZHNbY29tcG9uZW50XSxcbiAgICAgIGtleUNvZGUgPSB0aGlzLnBhcnNlS2V5KGV2ZW50KSxcbiAgICAgIGNtZHMsXG4gICAgICBjb21tYW5kLFxuICAgICAgZm47XG5cbiAgICBpZiAoIWNvbW1hbmRMaXN0KSByZXR1cm4gY29uc29sZS53YXJuKCdDb21wb25lbnQgbm90IGRlZmluZWQhJyk7XG5cbiAgICAvLyBJZ25vcmUgdGhlIGV2ZW50IGlmIGl0IHdhcyBhbHJlYWR5IGhhbmRsZWRcbiAgICBpZiAoZXZlbnQuemZJc0tleUhhbmRsZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgIC8vIFRoaXMgY29tcG9uZW50IGRvZXMgbm90IGRpZmZlcmVudGlhdGUgYmV0d2VlbiBsdHIgYW5kIHJ0bFxuICAgIGlmICh0eXBlb2YgY29tbWFuZExpc3QubHRyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjbWRzID0gY29tbWFuZExpc3Q7IC8vIHVzZSBwbGFpbiBsaXN0XG4gICAgfSBlbHNlIHsgLy8gbWVyZ2UgbHRyIGFuZCBydGw6IGlmIGRvY3VtZW50IGlzIHJ0bCwgcnRsIG92ZXJ3cml0ZXMgbHRyIGFuZCB2aWNlIHZlcnNhXG4gICAgICAgIGlmIChSdGwoKSkgY21kcyA9ICQuZXh0ZW5kKHt9LCBjb21tYW5kTGlzdC5sdHIsIGNvbW1hbmRMaXN0LnJ0bCk7XG5cbiAgICAgICAgZWxzZSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0LnJ0bCwgY29tbWFuZExpc3QubHRyKTtcbiAgICB9XG4gICAgY29tbWFuZCA9IGNtZHNba2V5Q29kZV07XG5cbiAgICBmbiA9IGZ1bmN0aW9uc1tjb21tYW5kXTtcbiAgICAgLy8gRXhlY3V0ZSB0aGUgaGFuZGxlciBpZiBmb3VuZFxuICAgIGlmIChmbiAmJiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KCk7XG5cbiAgICAgIC8vIE1hcmsgdGhlIGV2ZW50IGFzIFwiaGFuZGxlZFwiIHRvIHByZXZlbnQgZnV0dXJlIGhhbmRsaW5nc1xuICAgICAgZXZlbnQuemZJc0tleUhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAvLyBFeGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIGhhbmRsZWRcbiAgICAgIGlmIChmdW5jdGlvbnMuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLmhhbmRsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBmdW5jdGlvbnMuaGFuZGxlZChyZXR1cm5WYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAvLyBFeGVjdXRlIGZ1bmN0aW9uIHdoZW4gZXZlbnQgd2FzIG5vdCBoYW5kbGVkXG4gICAgICBpZiAoZnVuY3Rpb25zLnVuaGFuZGxlZCB8fCB0eXBlb2YgZnVuY3Rpb25zLnVuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGZ1bmN0aW9ucy51bmhhbmRsZWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIHRoZSBnaXZlbiBgJGVsZW1lbnRgXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gc2VhcmNoIHdpdGhpblxuICAgKiBAcmV0dXJuIHtqUXVlcnl9ICRmb2N1c2FibGUgLSBhbGwgZm9jdXNhYmxlIGVsZW1lbnRzIHdpdGhpbiBgJGVsZW1lbnRgXG4gICAqL1xuXG4gIGZpbmRGb2N1c2FibGU6IGZpbmRGb2N1c2FibGUsXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBuYW1lIG5hbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50LCBlLmcuIFNsaWRlciBvciBSZXZlYWxcbiAgICogQHJldHVybiBTdHJpbmcgY29tcG9uZW50TmFtZVxuICAgKi9cblxuICByZWdpc3Rlcihjb21wb25lbnROYW1lLCBjbWRzKSB7XG4gICAgY29tbWFuZHNbY29tcG9uZW50TmFtZV0gPSBjbWRzO1xuICB9LFxuXG5cbiAgLy8gVE9ETzk0Mzg6IFRoZXNlIHJlZmVyZW5jZXMgdG8gS2V5Ym9hcmQgbmVlZCB0byBub3QgcmVxdWlyZSBnbG9iYWwuIFdpbGwgJ3RoaXMnIHdvcmsgaW4gdGhpcyBjb250ZXh0P1xuICAvL1xuICAvKipcbiAgICogVHJhcHMgdGhlIGZvY3VzIGluIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHRyYXAgdGhlIGZvdWNzIGludG8uXG4gICAqL1xuICB0cmFwRm9jdXMoJGVsZW1lbnQpIHtcbiAgICB2YXIgJGZvY3VzYWJsZSA9IGZpbmRGb2N1c2FibGUoJGVsZW1lbnQpLFxuICAgICAgICAkZmlyc3RGb2N1c2FibGUgPSAkZm9jdXNhYmxlLmVxKDApLFxuICAgICAgICAkbGFzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoLTEpO1xuXG4gICAgJGVsZW1lbnQub24oJ2tleWRvd24uemYudHJhcGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09ICRsYXN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGZpcnN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChldmVudC50YXJnZXQgPT09ICRmaXJzdEZvY3VzYWJsZVswXSAmJiBwYXJzZUtleShldmVudCkgPT09ICdTSElGVF9UQUInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICRsYXN0Rm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdHJhcHBlZCBmb2N1cyBmcm9tIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKiBAcGFyYW0gIHtqUXVlcnl9ICRlbGVtZW50ICBqUXVlcnkgb2JqZWN0IHRvIHJlbGVhc2UgdGhlIGZvY3VzIGZvci5cbiAgICovXG4gIHJlbGVhc2VGb2N1cygkZWxlbWVudCkge1xuICAgICRlbGVtZW50Lm9mZigna2V5ZG93bi56Zi50cmFwZm9jdXMnKTtcbiAgfVxufVxuXG4vKlxuICogQ29uc3RhbnRzIGZvciBlYXNpZXIgY29tcGFyaW5nLlxuICogQ2FuIGJlIHVzZWQgbGlrZSBGb3VuZGF0aW9uLnBhcnNlS2V5KGV2ZW50KSA9PT0gRm91bmRhdGlvbi5rZXlzLlNQQUNFXG4gKi9cbmZ1bmN0aW9uIGdldEtleUNvZGVzKGtjcykge1xuICB2YXIgayA9IHt9O1xuICBmb3IgKHZhciBrYyBpbiBrY3MpIHtcbiAgICBpZiAoa2NzLmhhc093blByb3BlcnR5KGtjKSkga1trY3Nba2NdXSA9IGtjc1trY107XG4gIH1cbiAgcmV0dXJuIGs7XG59XG5cbmV4cG9ydCB7S2V5Ym9hcmR9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gRGVmYXVsdCBzZXQgb2YgbWVkaWEgcXVlcmllc1xuLy8gY29uc3QgZGVmYXVsdFF1ZXJpZXMgPSB7XG4vLyAgICdkZWZhdWx0JyA6ICdvbmx5IHNjcmVlbicsXG4vLyAgIGxhbmRzY2FwZSA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJyxcbi8vICAgcG9ydHJhaXQgOiAnb25seSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpJyxcbi8vICAgcmV0aW5hIDogJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbi8vICAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuLy8gICAgICdvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIvMSksJyArXG4vLyAgICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4vLyAgICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDE5MmRwaSksJyArXG4vLyAgICAgJ29ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDJkcHB4KSdcbi8vICAgfTtcblxuXG4vLyBtYXRjaE1lZGlhKCkgcG9seWZpbGwgLSBUZXN0IGEgQ1NTIG1lZGlhIHR5cGUvcXVlcnkgaW4gSlMuXG4vLyBBdXRob3JzICYgY29weXJpZ2h0IMKpIDIwMTI6IFNjb3R0IEplaGwsIFBhdWwgSXJpc2gsIE5pY2hvbGFzIFpha2FzLCBEYXZpZCBLbmlnaHQuIE1JVCBsaWNlbnNlXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xud2luZG93Lm1hdGNoTWVkaWEgfHwgKHdpbmRvdy5tYXRjaE1lZGlhID0gKGZ1bmN0aW9uICgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBtYXRjaE1lZGl1bSBhcGkgc3VjaCBhcyBJRSA5IGFuZCB3ZWJraXRcbiAgdmFyIHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgd2luZG93Lm1lZGlhKTtcblxuICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gIGlmICghc3R5bGVNZWRpYSkge1xuICAgIHZhciBzdHlsZSAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICBzY3JpcHQgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICBpbmZvICAgICAgICA9IG51bGw7XG5cbiAgICBzdHlsZS50eXBlICA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGUuaWQgICAgPSAnbWF0Y2htZWRpYWpzLXRlc3QnO1xuXG4gICAgaWYgKCFzY3JpcHQpIHtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG4gICAgfVxuXG4gICAgLy8gJ3N0eWxlLmN1cnJlbnRTdHlsZScgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnd2luZG93LmdldENvbXB1dGVkU3R5bGUnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICBpbmZvID0gKCdnZXRDb21wdXRlZFN0eWxlJyBpbiB3aW5kb3cpICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHN0eWxlLCBudWxsKSB8fCBzdHlsZS5jdXJyZW50U3R5bGU7XG5cbiAgICBzdHlsZU1lZGlhID0ge1xuICAgICAgbWF0Y2hNZWRpdW06IGZ1bmN0aW9uIChtZWRpYSkge1xuICAgICAgICB2YXIgdGV4dCA9ICdAbWVkaWEgJyArIG1lZGlhICsgJ3sgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9JztcblxuICAgICAgICAvLyAnc3R5bGUuc3R5bGVTaGVldCcgaXMgdXNlZCBieSBJRSA8PSA4IGFuZCAnc3R5bGUudGV4dENvbnRlbnQnIGZvciBhbGwgb3RoZXIgYnJvd3NlcnNcbiAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihtZWRpYSkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgIH07XG4gIH07XG59KSgpKTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxudmFyIE1lZGlhUXVlcnkgPSB7XG4gIHF1ZXJpZXM6IFtdLFxuXG4gIGN1cnJlbnQ6ICcnLFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbWVkaWEgcXVlcnkgaGVscGVyLCBieSBleHRyYWN0aW5nIHRoZSBicmVha3BvaW50IGxpc3QgZnJvbSB0aGUgQ1NTIGFuZCBhY3RpdmF0aW5nIHRoZSBicmVha3BvaW50IHdhdGNoZXIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIGluaXRpYWxpemF0aW9uIGlzIG9ubHkgZG9uZSBvbmNlIHdoZW4gY2FsbGluZyBfaW5pdCgpIHNldmVyYWwgdGltZXNcbiAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyICRtZXRhID0gJCgnbWV0YS5mb3VuZGF0aW9uLW1xJyk7XG4gICAgaWYoISRtZXRhLmxlbmd0aCl7XG4gICAgICAkKCc8bWV0YSBjbGFzcz1cImZvdW5kYXRpb24tbXFcIiBuYW1lPVwiZm91bmRhdGlvbi1tcVwiIGNvbnRlbnQ+JykuYXBwZW5kVG8oZG9jdW1lbnQuaGVhZCk7XG4gICAgfVxuXG4gICAgdmFyIGV4dHJhY3RlZFN0eWxlcyA9ICQoJy5mb3VuZGF0aW9uLW1xJykuY3NzKCdmb250LWZhbWlseScpO1xuICAgIHZhciBuYW1lZFF1ZXJpZXM7XG5cbiAgICBuYW1lZFF1ZXJpZXMgPSBwYXJzZVN0eWxlVG9PYmplY3QoZXh0cmFjdGVkU3R5bGVzKTtcblxuICAgIHNlbGYucXVlcmllcyA9IFtdOyAvLyByZXNldFxuXG4gICAgZm9yICh2YXIga2V5IGluIG5hbWVkUXVlcmllcykge1xuICAgICAgaWYobmFtZWRRdWVyaWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc2VsZi5xdWVyaWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogYG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAke25hbWVkUXVlcmllc1trZXldfSlgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG5cbiAgICB0aGlzLl93YXRjaGVyKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlaW5pdGlhbGl6ZXMgdGhlIG1lZGlhIHF1ZXJ5IGhlbHBlci5cbiAgICogVXNlZnVsIGlmIHlvdXIgQ1NTIGJyZWFrcG9pbnQgY29uZmlndXJhdGlvbiBoYXMganVzdCBiZWVuIGxvYWRlZCBvciBoYXMgY2hhbmdlZCBzaW5jZSB0aGUgaW5pdGlhbGl6YXRpb24uXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlSW5pdCgpIHtcbiAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIGF0IGxlYXN0IGFzIHdpZGUgYXMgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBzbWFsbGVyLlxuICAgKi9cbiAgYXRMZWFzdChzaXplKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5nZXQoc2l6ZSk7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIHdpdGhpbiB0aGUgZ2l2ZW4gYnJlYWtwb2ludC5cbiAgICogSWYgc21hbGxlciB0aGFuIHRoZSBicmVha3BvaW50IG9mIGxhcmdlciB0aGFuIGl0cyB1cHBlciBsaW1pdCBpdCByZXR1cm5zIGZhbHNlLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgb25seShzaXplKSB7XG4gICAgcmV0dXJuIHNpemUgPT09IHRoaXMuX2dldEN1cnJlbnRTaXplKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIGlzIHdpdGhpbiBhIGJyZWFrcG9pbnQgb3Igc21hbGxlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gTmFtZSBvZiB0aGUgYnJlYWtwb2ludCB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0J3MgbGFyZ2VyLlxuICAgKi9cbiAgdXBUbyhzaXplKSB7XG4gICAgY29uc3QgbmV4dFNpemUgPSB0aGlzLm5leHQoc2l6ZSk7XG5cbiAgICAvLyBJZiB0aGUgbmV4dCBicmVha3BvaW50IGRvZXMgbm90IG1hdGNoLCB0aGUgc2NyZWVuIGlzIHNtYWxsZXIgdGhhblxuICAgIC8vIHRoZSB1cHBlciBsaW1pdCBvZiB0aGlzIGJyZWFrcG9pbnQuXG4gICAgaWYgKG5leHRTaXplKSB7XG4gICAgICByZXR1cm4gIXRoaXMuYXRMZWFzdChuZXh0U2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbmV4dCBicmVha3BvaW50LCB0aGUgXCJzaXplXCIgYnJlYWtwb2ludCBkb2VzIG5vdCBoYXZlXG4gICAgLy8gYW4gdXBwZXIgbGltaXQgYW5kIHRoZSBzY3JlZW4gd2lsbCBhbHdheXMgYmUgd2l0aGluIGl0IG9yIHNtYWxsZXIuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2NyZWVuIG1hdGNoZXMgdG8gYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLCBlaXRoZXIgJ3NtYWxsIG9ubHknIG9yICdzbWFsbCcuIE9taXR0aW5nICdvbmx5JyBmYWxscyBiYWNrIHRvIHVzaW5nIGF0TGVhc3QoKSBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCBkb2VzIG5vdC5cbiAgICovXG4gIGlzKHNpemUpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHNpemUudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKHAgPT4gISFwLmxlbmd0aCk7XG4gICAgY29uc3QgW2JwU2l6ZSwgYnBNb2RpZmllciA9ICcnXSA9IHBhcnRzO1xuXG4gICAgLy8gT25seSB0aGUgYnJlYWtwb250XG4gICAgaWYgKGJwTW9kaWZpZXIgPT09ICdvbmx5Jykge1xuICAgICAgcmV0dXJuIHRoaXMub25seShicFNpemUpO1xuICAgIH1cbiAgICAvLyBBdCBsZWFzdCB0aGUgYnJlYWtwb2ludCAoaW5jbHVkZWQpXG4gICAgaWYgKCFicE1vZGlmaWVyIHx8IGJwTW9kaWZpZXIgPT09ICd1cCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0TGVhc3QoYnBTaXplKTtcbiAgICB9XG4gICAgLy8gVXAgdG8gdGhlIGJyZWFrcG9pbnQgKGluY2x1ZGVkKVxuICAgIGlmIChicE1vZGlmaWVyID09PSAnZG93bicpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwVG8oYnBTaXplKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgSW52YWxpZCBicmVha3BvaW50IHBhc3NlZCB0byBNZWRpYVF1ZXJ5LmlzKCkuXG4gICAgICBFeHBlY3RlZCBhIGJyZWFrcG9pbnQgbmFtZSBmb3JtYXR0ZWQgbGlrZSBcIjxzaXplPiA8bW9kaWZpZXI+XCIsIGdvdCBcIiR7c2l6ZX1cIi5cbiAgICBgKTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgbWVkaWEgcXVlcnkgb2YgYSBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGdldC5cbiAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSAtIFRoZSBtZWRpYSBxdWVyeSBvZiB0aGUgYnJlYWtwb2ludCwgb3IgYG51bGxgIGlmIHRoZSBicmVha3BvaW50IGRvZXNuJ3QgZXhpc3QuXG4gICAqL1xuICBnZXQoc2l6ZSkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5xdWVyaWVzKSB7XG4gICAgICBpZih0aGlzLnF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuICAgICAgICBpZiAoc2l6ZSA9PT0gcXVlcnkubmFtZSkgcmV0dXJuIHF1ZXJ5LnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJyZWFrcG9pbnQgZm9sbG93aW5nIHRoZSBnaXZlbiBicmVha3BvaW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfG51bGx9IC0gVGhlIG5hbWUgb2YgdGhlIGZvbGxvd2luZyBicmVha3BvaW50LCBvciBgbnVsbGAgaWYgdGhlIHBhc3NlZCBicmVha3BvaW50IHdhcyB0aGUgbGFzdCBvbmUuXG4gICAqL1xuICBuZXh0KHNpemUpIHtcbiAgICBjb25zdCBxdWVyeUluZGV4ID0gdGhpcy5xdWVyaWVzLmZpbmRJbmRleCgocSkgPT4gdGhpcy5fZ2V0UXVlcnlOYW1lKHEpID09PSBzaXplKTtcbiAgICBpZiAocXVlcnlJbmRleCA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICAgIFVua25vd24gYnJlYWtwb2ludCBcIiR7c2l6ZX1cIiBwYXNzZWQgdG8gTWVkaWFRdWVyeS5uZXh0KCkuXG4gICAgICAgIEVuc3VyZSBpdCBpcyBwcmVzZW50IGluIHlvdXIgU2FzcyBcIiRicmVha3BvaW50c1wiIHNldHRpbmcuXG4gICAgICBgKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UXVlcnkgPSB0aGlzLnF1ZXJpZXNbcXVlcnlJbmRleCArIDFdO1xuICAgIHJldHVybiBuZXh0UXVlcnkgPyBuZXh0UXVlcnkubmFtZSA6IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgcmVsYXRlZCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHZhbHVlIC0gQnJlYWtwb2ludCBuYW1lIG9yIHF1ZXJ5IG9iamVjdC5cbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgYnJlYWtwb2ludC5cbiAgICovXG4gIF9nZXRRdWVyeU5hbWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JylcbiAgICAgIHJldHVybiB2YWx1ZS5uYW1lO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFxuICAgICAgSW52YWxpZCB2YWx1ZSBwYXNzZWQgdG8gTWVkaWFRdWVyeS5fZ2V0UXVlcnlOYW1lKCkuXG4gICAgICBFeHBlY3RlZCBhIGJyZWFrcG9pbnQgbmFtZSAoU3RyaW5nKSBvciBhIGJyZWFrcG9pbnQgcXVlcnkgKE9iamVjdCksIGdvdCBcIiR7dmFsdWV9XCIgKCR7dHlwZW9mIHZhbHVlfSlcbiAgICBgKTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBicmVha3BvaW50IG5hbWUgYnkgdGVzdGluZyBldmVyeSBicmVha3BvaW50IGFuZCByZXR1cm5pbmcgdGhlIGxhc3Qgb25lIHRvIG1hdGNoICh0aGUgYmlnZ2VzdCBvbmUpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1N0cmluZ30gTmFtZSBvZiB0aGUgY3VycmVudCBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldEN1cnJlbnRTaXplKCkge1xuICAgIHZhciBtYXRjaGVkO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcmllc1tpXTtcblxuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5LnZhbHVlKS5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZWQgPSBxdWVyeTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlZCAmJiB0aGlzLl9nZXRRdWVyeU5hbWUobWF0Y2hlZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyB0aGUgYnJlYWtwb2ludCB3YXRjaGVyLCB3aGljaCBmaXJlcyBhbiBldmVudCBvbiB0aGUgd2luZG93IHdoZW5ldmVyIHRoZSBicmVha3BvaW50IGNoYW5nZXMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3dhdGNoZXIoKSB7XG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuemYudHJpZ2dlcicsICgpID0+IHtcbiAgICAgIHZhciBuZXdTaXplID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKSwgY3VycmVudFNpemUgPSB0aGlzLmN1cnJlbnQ7XG5cbiAgICAgIGlmIChuZXdTaXplICE9PSBjdXJyZW50U2l6ZSkge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGN1cnJlbnQgbWVkaWEgcXVlcnlcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3U2l6ZTtcblxuICAgICAgICAvLyBCcm9hZGNhc3QgdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZSBvbiB0aGUgd2luZG93XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBbbmV3U2l6ZSwgY3VycmVudFNpemVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuXG5cbi8vIFRoYW5rIHlvdTogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmdcbmZ1bmN0aW9uIHBhcnNlU3R5bGVUb09iamVjdChzdHIpIHtcbiAgdmFyIHN0eWxlT2JqZWN0ID0ge307XG5cbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3RyID0gc3RyLnRyaW0oKS5zbGljZSgxLCAtMSk7IC8vIGJyb3dzZXJzIHJlLXF1b3RlIHN0cmluZyBzdHlsZSB2YWx1ZXNcblxuICBpZiAoIXN0cikge1xuICAgIHJldHVybiBzdHlsZU9iamVjdDtcbiAgfVxuXG4gIHN0eWxlT2JqZWN0ID0gc3RyLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uKHJldCwgcGFyYW0pIHtcbiAgICB2YXIgcGFydHMgPSBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKS5zcGxpdCgnPScpO1xuICAgIHZhciBrZXkgPSBwYXJ0c1swXTtcbiAgICB2YXIgdmFsID0gcGFydHNbMV07XG4gICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cbiAgICAvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuICAgIC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcbiAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuICAgIGlmICghcmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldFtrZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcbiAgICAgIHJldFtrZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sIHt9KTtcblxuICByZXR1cm4gc3R5bGVPYmplY3Q7XG59XG5cbmV4cG9ydCB7TWVkaWFRdWVyeX07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcblxuLyoqXG4gKiBNb3Rpb24gbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLm1vdGlvblxuICovXG5cbmNvbnN0IGluaXRDbGFzc2VzICAgPSBbJ211aS1lbnRlcicsICdtdWktbGVhdmUnXTtcbmNvbnN0IGFjdGl2ZUNsYXNzZXMgPSBbJ211aS1lbnRlci1hY3RpdmUnLCAnbXVpLWxlYXZlLWFjdGl2ZSddO1xuXG5jb25zdCBNb3Rpb24gPSB7XG4gIGFuaW1hdGVJbjogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUodHJ1ZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH0sXG5cbiAgYW5pbWF0ZU91dDogZnVuY3Rpb24oZWxlbWVudCwgYW5pbWF0aW9uLCBjYikge1xuICAgIGFuaW1hdGUoZmFsc2UsIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIE1vdmUoZHVyYXRpb24sIGVsZW0sIGZuKXtcbiAgdmFyIGFuaW0sIHByb2csIHN0YXJ0ID0gbnVsbDtcblxuICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICBmbi5hcHBseShlbGVtKTtcbiAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKHRzKXtcbiAgICBpZighc3RhcnQpIHN0YXJ0ID0gdHM7XG4gICAgcHJvZyA9IHRzIC0gc3RhcnQ7XG4gICAgZm4uYXBwbHkoZWxlbSk7XG5cbiAgICBpZihwcm9nIDwgZHVyYXRpb24peyBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlLCBlbGVtKTsgfVxuICAgIGVsc2V7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbSk7XG4gICAgICBlbGVtLnRyaWdnZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pLnRyaWdnZXJIYW5kbGVyKCdmaW5pc2hlZC56Zi5hbmltYXRlJywgW2VsZW1dKTtcbiAgICB9XG4gIH1cbiAgYW5pbSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZSk7XG59XG5cbi8qKlxuICogQW5pbWF0ZXMgYW4gZWxlbWVudCBpbiBvciBvdXQgdXNpbmcgYSBDU1MgdHJhbnNpdGlvbiBjbGFzcy5cbiAqIEBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbiAtIERlZmluZXMgaWYgdGhlIGFuaW1hdGlvbiBpcyBpbiBvciBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvciBIVE1MIG9iamVjdCB0byBhbmltYXRlLlxuICogQHBhcmFtIHtTdHJpbmd9IGFuaW1hdGlvbiAtIENTUyBjbGFzcyB0byB1c2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIENhbGxiYWNrIHRvIHJ1biB3aGVuIGFuaW1hdGlvbiBpcyBmaW5pc2hlZC5cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShpc0luLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gIGVsZW1lbnQgPSAkKGVsZW1lbnQpLmVxKDApO1xuXG4gIGlmICghZWxlbWVudC5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgaW5pdENsYXNzID0gaXNJbiA/IGluaXRDbGFzc2VzWzBdIDogaW5pdENsYXNzZXNbMV07XG4gIHZhciBhY3RpdmVDbGFzcyA9IGlzSW4gPyBhY3RpdmVDbGFzc2VzWzBdIDogYWN0aXZlQ2xhc3Nlc1sxXTtcblxuICAvLyBTZXQgdXAgdGhlIGFuaW1hdGlvblxuICByZXNldCgpO1xuXG4gIGVsZW1lbnRcbiAgICAuYWRkQ2xhc3MoYW5pbWF0aW9uKVxuICAgIC5jc3MoJ3RyYW5zaXRpb24nLCAnbm9uZScpO1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgZWxlbWVudC5hZGRDbGFzcyhpbml0Q2xhc3MpO1xuICAgIGlmIChpc0luKSBlbGVtZW50LnNob3coKTtcbiAgfSk7XG5cbiAgLy8gU3RhcnQgdGhlIGFuaW1hdGlvblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIC8vIHdpbGwgdHJpZ2dlciB0aGUgYnJvd3NlciB0byBzeW5jaHJvbm91c2x5IGNhbGN1bGF0ZSB0aGUgc3R5bGUgYW5kIGxheW91dFxuICAgIC8vIGFsc28gY2FsbGVkIHJlZmxvdyBvciBsYXlvdXQgdGhyYXNoaW5nXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC81ZDUyZmIwODFiMzU3MGM4MWUzYVxuICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGg7XG4gICAgZWxlbWVudFxuICAgICAgLmNzcygndHJhbnNpdGlvbicsICcnKVxuICAgICAgLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgfSk7XG5cbiAgLy8gQ2xlYW4gdXAgdGhlIGFuaW1hdGlvbiB3aGVuIGl0IGZpbmlzaGVzXG4gIGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQoZWxlbWVudCksIGZpbmlzaCk7XG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgKGZvciBvdXQgYW5pbWF0aW9ucyksIHJlc2V0cyB0aGUgZWxlbWVudCwgYW5kIHJ1bnMgYSBjYWxsYmFja1xuICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgaWYgKCFpc0luKSBlbGVtZW50LmhpZGUoKTtcbiAgICByZXNldCgpO1xuICAgIGlmIChjYikgY2IuYXBwbHkoZWxlbWVudCk7XG4gIH1cblxuICAvLyBSZXNldHMgdHJhbnNpdGlvbnMgYW5kIHJlbW92ZXMgbW90aW9uLXNwZWNpZmljIGNsYXNzZXNcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZWxlbWVudFswXS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAwO1xuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7aW5pdENsYXNzfSAke2FjdGl2ZUNsYXNzfSAke2FuaW1hdGlvbn1gKTtcbiAgfVxufVxuXG5leHBvcnQgeyBNb3ZlLCBNb3Rpb24gfTtcblxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3QgTmVzdCA9IHtcbiAgRmVhdGhlcihtZW51LCB0eXBlID0gJ3pmJykge1xuICAgIG1lbnUuYXR0cigncm9sZScsICdtZW51YmFyJyk7XG4gICAgbWVudS5maW5kKCdhJykuYXR0cih7J3JvbGUnOiAnbWVudWl0ZW0nfSk7XG5cbiAgICB2YXIgaXRlbXMgPSBtZW51LmZpbmQoJ2xpJykuYXR0cih7J3JvbGUnOiAnbm9uZSd9KSxcbiAgICAgICAgc3ViTWVudUNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudWAsXG4gICAgICAgIHN1Ykl0ZW1DbGFzcyA9IGAke3N1Yk1lbnVDbGFzc30taXRlbWAsXG4gICAgICAgIGhhc1N1YkNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudS1wYXJlbnRgLFxuICAgICAgICBhcHBseUFyaWEgPSAodHlwZSAhPT0gJ2FjY29yZGlvbicpOyAvLyBBY2NvcmRpb25zIGhhbmRsZSB0aGVpciBvd24gQVJJQSBhdHRyaXV0ZXMuXG5cbiAgICBpdGVtcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRpdGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAkc3ViID0gJGl0ZW0uY2hpbGRyZW4oJ3VsJyk7XG5cbiAgICAgIGlmICgkc3ViLmxlbmd0aCkge1xuICAgICAgICAkaXRlbS5hZGRDbGFzcyhoYXNTdWJDbGFzcyk7XG4gICAgICAgIGlmKGFwcGx5QXJpYSkge1xuICAgICAgICAgICRpdGVtLmNoaWxkcmVuKCdhOmZpcnN0JykuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oYXNwb3B1cCc6IHRydWUsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICRpdGVtLmNoaWxkcmVuKCdhOmZpcnN0JykudGV4dCgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gTm90ZTogIERyaWxsZG93bnMgYmVoYXZlIGRpZmZlcmVudGx5IGluIGhvdyB0aGV5IGhpZGUsIGFuZCBzbyBuZWVkXG4gICAgICAgICAgLy8gYWRkaXRpb25hbCBhdHRyaWJ1dGVzLiAgV2Ugc2hvdWxkIGxvb2sgaWYgdGhpcyBwb3NzaWJseSBvdmVyLWdlbmVyYWxpemVkXG4gICAgICAgICAgLy8gdXRpbGl0eSAoTmVzdCkgaXMgYXBwcm9wcmlhdGUgd2hlbiB3ZSByZXdvcmsgbWVudXMgaW4gNi40XG4gICAgICAgICAgaWYodHlwZSA9PT0gJ2RyaWxsZG93bicpIHtcbiAgICAgICAgICAgICRpdGVtLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogZmFsc2V9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHN1YlxuICAgICAgICAgIC5hZGRDbGFzcyhgc3VibWVudSAke3N1Yk1lbnVDbGFzc31gKVxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdkYXRhLXN1Ym1lbnUnOiAnJyxcbiAgICAgICAgICAgICdyb2xlJzogJ21lbnViYXInXG4gICAgICAgICAgfSk7XG4gICAgICAgIGlmKHR5cGUgPT09ICdkcmlsbGRvd24nKSB7XG4gICAgICAgICAgJHN1Yi5hdHRyKHsnYXJpYS1oaWRkZW4nOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCRpdGVtLnBhcmVudCgnW2RhdGEtc3VibWVudV0nKS5sZW5ndGgpIHtcbiAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoYGlzLXN1Ym1lbnUtaXRlbSAke3N1Ykl0ZW1DbGFzc31gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybjtcbiAgfSxcblxuICBCdXJuKG1lbnUsIHR5cGUpIHtcbiAgICB2YXIgLy9pdGVtcyA9IG1lbnUuZmluZCgnbGknKSxcbiAgICAgICAgc3ViTWVudUNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudWAsXG4gICAgICAgIHN1Ykl0ZW1DbGFzcyA9IGAke3N1Yk1lbnVDbGFzc30taXRlbWAsXG4gICAgICAgIGhhc1N1YkNsYXNzID0gYGlzLSR7dHlwZX0tc3VibWVudS1wYXJlbnRgO1xuXG4gICAgbWVudVxuICAgICAgLmZpbmQoJz5saSwgPiBsaSA+IHVsLCAubWVudSwgLm1lbnUgPiBsaSwgW2RhdGEtc3VibWVudV0gPiBsaScpXG4gICAgICAucmVtb3ZlQ2xhc3MoYCR7c3ViTWVudUNsYXNzfSAke3N1Ykl0ZW1DbGFzc30gJHtoYXNTdWJDbGFzc30gaXMtc3VibWVudS1pdGVtIHN1Ym1lbnUgaXMtYWN0aXZlYClcbiAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN1Ym1lbnUnKS5jc3MoJ2Rpc3BsYXknLCAnJyk7XG5cbiAgfVxufVxuXG5leHBvcnQge05lc3R9O1xuIiwiZnVuY3Rpb24gVGltZXIoZWxlbSwgb3B0aW9ucywgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiwvL29wdGlvbnMgaXMgYW4gb2JqZWN0IGZvciBlYXNpbHkgYWRkaW5nIGZlYXR1cmVzIGxhdGVyLlxuICAgICAgbmFtZVNwYWNlID0gT2JqZWN0LmtleXMoZWxlbS5kYXRhKCkpWzBdIHx8ICd0aW1lcicsXG4gICAgICByZW1haW4gPSAtMSxcbiAgICAgIHN0YXJ0LFxuICAgICAgdGltZXI7XG5cbiAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXG4gIHRoaXMucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlbWFpbiA9IC0xO1xuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAvLyBpZighZWxlbS5kYXRhKCdwYXVzZWQnKSl7IHJldHVybiBmYWxzZTsgfS8vbWF5YmUgaW1wbGVtZW50IHRoaXMgc2FuaXR5IGNoZWNrIGlmIHVzZWQgZm9yIG90aGVyIHRoaW5ncy5cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHJlbWFpbiA9IHJlbWFpbiA8PSAwID8gZHVyYXRpb24gOiByZW1haW47XG4gICAgZWxlbS5kYXRhKCdwYXVzZWQnLCBmYWxzZSk7XG4gICAgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgaWYob3B0aW9ucy5pbmZpbml0ZSl7XG4gICAgICAgIF90aGlzLnJlc3RhcnQoKTsvL3JlcnVuIHRoZSB0aW1lci5cbiAgICAgIH1cbiAgICAgIGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHsgY2IoKTsgfVxuICAgIH0sIHJlbWFpbik7XG4gICAgZWxlbS50cmlnZ2VyKGB0aW1lcnN0YXJ0LnpmLiR7bmFtZVNwYWNlfWApO1xuICB9XG5cbiAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgIC8vaWYoZWxlbS5kYXRhKCdwYXVzZWQnKSl7IHJldHVybiBmYWxzZTsgfS8vbWF5YmUgaW1wbGVtZW50IHRoaXMgc2FuaXR5IGNoZWNrIGlmIHVzZWQgZm9yIG90aGVyIHRoaW5ncy5cbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIGVsZW0uZGF0YSgncGF1c2VkJywgdHJ1ZSk7XG4gICAgdmFyIGVuZCA9IERhdGUubm93KCk7XG4gICAgcmVtYWluID0gcmVtYWluIC0gKGVuZCAtIHN0YXJ0KTtcbiAgICBlbGVtLnRyaWdnZXIoYHRpbWVycGF1c2VkLnpmLiR7bmFtZVNwYWNlfWApO1xuICB9XG59XG5cbmV4cG9ydCB7VGltZXJ9O1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8qKldvcmsgaW5zcGlyZWQgYnkgbXVsdGlwbGUganF1ZXJ5IHN3aXBlIHBsdWdpbnMqKlxuLy8qKkRvbmUgYnkgWW9oYWkgQXJhcmF0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG52YXIgVG91Y2ggPSB7fTtcblxudmFyIHN0YXJ0UG9zWCxcbiAgICBzdGFydFRpbWUsXG4gICAgZWxhcHNlZFRpbWUsXG4gICAgc3RhcnRFdmVudCxcbiAgICBpc01vdmluZyA9IGZhbHNlLFxuICAgIGRpZE1vdmVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG9uVG91Y2hFbmQoZSkge1xuICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlKTtcbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQpO1xuXG4gIC8vIElmIHRoZSB0b3VjaCBkaWQgbm90IG1vdmUsIGNvbnNpZGVyIGl0IGFzIGEgXCJ0YXBcIlxuICBpZiAoIWRpZE1vdmVkKSB7XG4gICAgdmFyIHRhcEV2ZW50ID0gJC5FdmVudCgndGFwJywgc3RhcnRFdmVudCB8fCBlKTtcbiAgICAkKHRoaXMpLnRyaWdnZXIodGFwRXZlbnQpO1xuICB9XG5cbiAgc3RhcnRFdmVudCA9IG51bGw7XG4gIGlzTW92aW5nID0gZmFsc2U7XG4gIGRpZE1vdmVkID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGUpIHtcbiAgaWYgKHRydWUgPT09ICQuc3BvdFN3aXBlLnByZXZlbnREZWZhdWx0KSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuXG4gIGlmKGlzTW92aW5nKSB7XG4gICAgdmFyIHggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgLy8gdmFyIHkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgdmFyIGR4ID0gc3RhcnRQb3NYIC0geDtcbiAgICAvLyB2YXIgZHkgPSBzdGFydFBvc1kgLSB5O1xuICAgIHZhciBkaXI7XG4gICAgZGlkTW92ZWQgPSB0cnVlO1xuICAgIGVsYXBzZWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWU7XG4gICAgaWYoTWF0aC5hYnMoZHgpID49ICQuc3BvdFN3aXBlLm1vdmVUaHJlc2hvbGQgJiYgZWxhcHNlZFRpbWUgPD0gJC5zcG90U3dpcGUudGltZVRocmVzaG9sZCkge1xuICAgICAgZGlyID0gZHggPiAwID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICB9XG4gICAgLy8gZWxzZSBpZihNYXRoLmFicyhkeSkgPj0gJC5zcG90U3dpcGUubW92ZVRocmVzaG9sZCAmJiBlbGFwc2VkVGltZSA8PSAkLnNwb3RTd2lwZS50aW1lVGhyZXNob2xkKSB7XG4gICAgLy8gICBkaXIgPSBkeSA+IDAgPyAnZG93bicgOiAndXAnO1xuICAgIC8vIH1cbiAgICBpZihkaXIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9uVG91Y2hFbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICQodGhpcylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudCgnc3dpcGUnLCBPYmplY3QuYXNzaWduKHt9LCBlKSksIGRpcilcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudChgc3dpcGUke2Rpcn1gLCBPYmplY3QuYXNzaWduKHt9LCBlKSkpO1xuICAgIH1cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG5cbiAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICBzdGFydFBvc1ggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgc3RhcnRFdmVudCA9IGU7XG4gICAgaXNNb3ZpbmcgPSB0cnVlO1xuICAgIGRpZE1vdmVkID0gZmFsc2U7XG4gICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlIDogdHJ1ZSA9PT0gJC5zcG90U3dpcGUucHJldmVudERlZmF1bHQgfSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIgJiYgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0LCB7IHBhc3NpdmUgOiB0cnVlIH0pO1xufVxuXG4vLyBmdW5jdGlvbiB0ZWFyZG93bigpIHtcbi8vICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0KTtcbi8vIH1cblxuY2xhc3MgU3BvdFN3aXBlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gJzEuMC4wJztcbiAgICB0aGlzLmVuYWJsZWQgPSAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIHRoaXMubW92ZVRocmVzaG9sZCA9IDc1O1xuICAgIHRoaXMudGltZVRocmVzaG9sZCA9IDIwMDtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICBfaW5pdCgpIHtcbiAgICAkLmV2ZW50LnNwZWNpYWwuc3dpcGUgPSB7IHNldHVwOiBpbml0IH07XG4gICAgJC5ldmVudC5zcGVjaWFsLnRhcCA9IHsgc2V0dXA6IGluaXQgfTtcblxuICAgICQuZWFjaChbJ2xlZnQnLCAndXAnLCAnZG93bicsICdyaWdodCddLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmV2ZW50LnNwZWNpYWxbYHN3aXBlJHt0aGlzfWBdID0geyBzZXR1cDogZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5vbignc3dpcGUnLCAkLm5vb3ApO1xuICAgICAgfSB9O1xuICAgIH0pO1xuICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBBcyBmYXIgYXMgSSBjYW4gdGVsbCwgYm90aCBzZXR1cFNwb3RTd2lwZSBhbmQgICAgKlxuICogc2V0dXBUb3VjaEhhbmRsZXIgc2hvdWxkIGJlIGlkZW1wb3RlbnQsICAgICAgICAgICpcbiAqIGJlY2F1c2UgdGhleSBkaXJlY3RseSByZXBsYWNlIGZ1bmN0aW9ucyAmICAgICAgICAqXG4gKiB2YWx1ZXMsIGFuZCBkbyBub3QgYWRkIGV2ZW50IGhhbmRsZXJzIGRpcmVjdGx5LiAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblRvdWNoLnNldHVwU3BvdFN3aXBlID0gZnVuY3Rpb24oKSB7XG4gICQuc3BvdFN3aXBlID0gbmV3IFNwb3RTd2lwZSgkKTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBNZXRob2QgZm9yIGFkZGluZyBwc2V1ZG8gZHJhZyBldmVudHMgdG8gZWxlbWVudHMgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblRvdWNoLnNldHVwVG91Y2hIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICQuZm4uYWRkVG91Y2ggPSBmdW5jdGlvbigpe1xuICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbCl7XG4gICAgICAkKGVsKS5iaW5kKCd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uKGV2ZW50KSAge1xuICAgICAgICAvL3dlIHBhc3MgdGhlIG9yaWdpbmFsIGV2ZW50IG9iamVjdCBiZWNhdXNlIHRoZSBqUXVlcnkgZXZlbnRcbiAgICAgICAgLy9vYmplY3QgaXMgbm9ybWFsaXplZCB0byB3M2Mgc3BlY3MgYW5kIGRvZXMgbm90IHByb3ZpZGUgdGhlIFRvdWNoTGlzdFxuICAgICAgICBoYW5kbGVUb3VjaChldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHZhciBoYW5kbGVUb3VjaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgIGZpcnN0ID0gdG91Y2hlc1swXSxcbiAgICAgICAgICBldmVudFR5cGVzID0ge1xuICAgICAgICAgICAgdG91Y2hzdGFydDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0b3VjaG1vdmU6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgdG91Y2hlbmQ6ICdtb3VzZXVwJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZSA9IGV2ZW50VHlwZXNbZXZlbnQudHlwZV0sXG4gICAgICAgICAgc2ltdWxhdGVkRXZlbnRcbiAgICAgICAgO1xuXG4gICAgICBpZignTW91c2VFdmVudCcgaW4gd2luZG93ICYmIHR5cGVvZiB3aW5kb3cuTW91c2VFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzaW11bGF0ZWRFdmVudCA9IG5ldyB3aW5kb3cuTW91c2VFdmVudCh0eXBlLCB7XG4gICAgICAgICAgJ2J1YmJsZXMnOiB0cnVlLFxuICAgICAgICAgICdjYW5jZWxhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAnc2NyZWVuWCc6IGZpcnN0LnNjcmVlblgsXG4gICAgICAgICAgJ3NjcmVlblknOiBmaXJzdC5zY3JlZW5ZLFxuICAgICAgICAgICdjbGllbnRYJzogZmlyc3QuY2xpZW50WCxcbiAgICAgICAgICAnY2xpZW50WSc6IGZpcnN0LmNsaWVudFlcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaW11bGF0ZWRFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgICAgIHNpbXVsYXRlZEV2ZW50LmluaXRNb3VzZUV2ZW50KHR5cGUsIHRydWUsIHRydWUsIHdpbmRvdywgMSwgZmlyc3Quc2NyZWVuWCwgZmlyc3Quc2NyZWVuWSwgZmlyc3QuY2xpZW50WCwgZmlyc3QuY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAvKmxlZnQqLywgbnVsbCk7XG4gICAgICB9XG4gICAgICBmaXJzdC50YXJnZXQuZGlzcGF0Y2hFdmVudChzaW11bGF0ZWRFdmVudCk7XG4gICAgfTtcbiAgfTtcbn07XG5cblRvdWNoLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmKHR5cGVvZigkLnNwb3RTd2lwZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgVG91Y2guc2V0dXBTcG90U3dpcGUoJCk7XG4gICAgVG91Y2guc2V0dXBUb3VjaEhhbmRsZXIoJCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7VG91Y2h9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IG9uTG9hZCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IE1vdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLm1vdGlvbic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcHJlZml4ZXMgPSBbJ1dlYktpdCcsICdNb3onLCAnTycsICdNcycsICcnXTtcbiAgZm9yICh2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmAgaW4gd2luZG93KSB7XG4gICAgICByZXR1cm4gd2luZG93W2Ake3ByZWZpeGVzW2ldfU11dGF0aW9uT2JzZXJ2ZXJgXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuY29uc3QgdHJpZ2dlcnMgPSAoZWwsIHR5cGUpID0+IHtcbiAgZWwuZGF0YSh0eXBlKS5zcGxpdCgnICcpLmZvckVhY2goaWQgPT4ge1xuICAgICQoYCMke2lkfWApWyB0eXBlID09PSAnY2xvc2UnID8gJ3RyaWdnZXInIDogJ3RyaWdnZXJIYW5kbGVyJ10oYCR7dHlwZX0uemYudHJpZ2dlcmAsIFtlbF0pO1xuICB9KTtcbn07XG5cbnZhciBUcmlnZ2VycyA9IHtcbiAgTGlzdGVuZXJzOiB7XG4gICAgQmFzaWM6IHt9LFxuICAgIEdsb2JhbDoge31cbiAgfSxcbiAgSW5pdGlhbGl6ZXJzOiB7fVxufVxuXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMgID0ge1xuICBvcGVuTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRyaWdnZXJzKCQodGhpcyksICdvcGVuJyk7XG4gIH0sXG4gIGNsb3NlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnY2xvc2UnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRyaWdnZXJzKCQodGhpcyksICdjbG9zZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcignY2xvc2UuemYudHJpZ2dlcicpO1xuICAgIH1cbiAgfSxcbiAgdG9nZ2xlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlJyk7XG4gICAgaWYgKGlkKSB7XG4gICAgICB0cmlnZ2VycygkKHRoaXMpLCAndG9nZ2xlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykudHJpZ2dlcigndG9nZ2xlLnpmLnRyaWdnZXInKTtcbiAgICB9XG4gIH0sXG4gIGNsb3NlYWJsZUxpc3RlbmVyOiBmdW5jdGlvbihlKSB7XG4gICAgbGV0IGFuaW1hdGlvbiA9ICQodGhpcykuZGF0YSgnY2xvc2FibGUnKTtcblxuICAgIC8vIE9ubHkgY2xvc2UgdGhlIGZpcnN0IGNsb3NhYmxlIGVsZW1lbnQuIFNlZSBodHRwczovL2dpdC5pby96Zi03ODMzXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmKGFuaW1hdGlvbiAhPT0gJycpe1xuICAgICAgTW90aW9uLmFuaW1hdGVPdXQoJCh0aGlzKSwgYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICAgIH0pO1xuICAgIH1lbHNle1xuICAgICAgJCh0aGlzKS5mYWRlT3V0KCkudHJpZ2dlcignY2xvc2VkLnpmJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVGb2N1c0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ3RvZ2dsZS1mb2N1cycpO1xuICAgICQoYCMke2lkfWApLnRyaWdnZXJIYW5kbGVyKCd0b2dnbGUuemYudHJpZ2dlcicsIFskKHRoaXMpXSk7XG4gIH1cbn07XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtb3Blbl0gd2lsbCByZXZlYWwgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkT3Blbkxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1vcGVuXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5vcGVuTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLWNsb3NlXSB3aWxsIGNsb3NlIGEgcGx1Z2luIHRoYXQgc3VwcG9ydHMgaXQgd2hlbiBjbGlja2VkLlxuLy8gSWYgdXNlZCB3aXRob3V0IGEgdmFsdWUgb24gW2RhdGEtY2xvc2VdLCB0aGUgZXZlbnQgd2lsbCBidWJibGUsIGFsbG93aW5nIGl0IHRvIGNsb3NlIGEgcGFyZW50IGNvbXBvbmVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xpY2suemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtY2xvc2VdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZV0gd2lsbCB0b2dnbGUgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbiAgJGVsZW0ub24oJ2NsaWNrLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2FibGVdIHdpbGwgcmVzcG9uZCB0byBjbG9zZS56Zi50cmlnZ2VyIGV2ZW50cy5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2Nsb3NlLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xvc2UuemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZWFibGVdLCBbZGF0YS1jbG9zYWJsZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VhYmxlTGlzdGVuZXIpO1xufVxuXG4vLyBFbGVtZW50cyB3aXRoIFtkYXRhLXRvZ2dsZS1mb2N1c10gd2lsbCByZXNwb25kIHRvIGNvbWluZyBpbiBhbmQgb3V0IG9mIGZvY3VzXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2ZvY3VzLnpmLnRyaWdnZXIgYmx1ci56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xuICAkZWxlbS5vbignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCAnW2RhdGEtdG9nZ2xlLWZvY3VzXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy50b2dnbGVGb2N1c0xpc3RlbmVyKTtcbn1cblxuXG5cbi8vIE1vcmUgR2xvYmFsL2NvbXBsZXggbGlzdGVuZXJzIGFuZCB0cmlnZ2Vyc1xuVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbCAgPSB7XG4gIHJlc2l6ZUxpc3RlbmVyOiBmdW5jdGlvbigkbm9kZXMpIHtcbiAgICBpZighTXV0YXRpb25PYnNlcnZlcil7Ly9mYWxsYmFjayBmb3IgSUUgOVxuICAgICAgJG5vZGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vdHJpZ2dlciBhbGwgbGlzdGVuaW5nIGVsZW1lbnRzIGFuZCBzaWduYWwgYSByZXNpemUgZXZlbnRcbiAgICAkbm9kZXMuYXR0cignZGF0YS1ldmVudHMnLCBcInJlc2l6ZVwiKTtcbiAgfSxcbiAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdzY3JvbGxtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHNjcm9sbCBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwic2Nyb2xsXCIpO1xuICB9LFxuICBjbG9zZU1lTGlzdGVuZXI6IGZ1bmN0aW9uKGUsIHBsdWdpbklkKXtcbiAgICBsZXQgcGx1Z2luID0gZS5uYW1lc3BhY2Uuc3BsaXQoJy4nKVswXTtcbiAgICBsZXQgcGx1Z2lucyA9ICQoYFtkYXRhLSR7cGx1Z2lufV1gKS5ub3QoYFtkYXRhLXlldGktYm94PVwiJHtwbHVnaW5JZH1cIl1gKTtcblxuICAgIHBsdWdpbnMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcbiAgICAgIF90aGlzLnRyaWdnZXJIYW5kbGVyKCdjbG9zZS56Zi50cmlnZ2VyJywgW190aGlzXSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gR2xvYmFsLCBwYXJzZXMgd2hvbGUgZG9jdW1lbnQuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VtZUxpc3RlbmVyID0gZnVuY3Rpb24ocGx1Z2luTmFtZSkge1xuICB2YXIgeWV0aUJveGVzID0gJCgnW2RhdGEteWV0aS1ib3hdJyksXG4gICAgICBwbHVnTmFtZXMgPSBbJ2Ryb3Bkb3duJywgJ3Rvb2x0aXAnLCAncmV2ZWFsJ107XG5cbiAgaWYocGx1Z2luTmFtZSl7XG4gICAgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdzdHJpbmcnKXtcbiAgICAgIHBsdWdOYW1lcy5wdXNoKHBsdWdpbk5hbWUpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBwbHVnaW5OYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGx1Z2luTmFtZVswXSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzID0gcGx1Z05hbWVzLmNvbmNhdChwbHVnaW5OYW1lKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBuYW1lcyBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gIH1cbiAgaWYoeWV0aUJveGVzLmxlbmd0aCl7XG4gICAgbGV0IGxpc3RlbmVycyA9IHBsdWdOYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgIHJldHVybiBgY2xvc2VtZS56Zi4ke25hbWV9YDtcbiAgICB9KS5qb2luKCcgJyk7XG5cbiAgICAkKHdpbmRvdykub2ZmKGxpc3RlbmVycykub24obGlzdGVuZXJzLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLmNsb3NlTWVMaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgdHJpZ2dlciwgbGlzdGVuZXIpIHtcbiAgbGV0IHRpbWVyLCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKTtcbiAgJCh3aW5kb3cpLm9uKHRyaWdnZXIsIGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aW1lcikgeyBjbGVhclRpbWVvdXQodGltZXIpOyB9XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9LCBkZWJvdW5jZSB8fCAxMCk7IC8vZGVmYXVsdCB0aW1lIHRvIGVtaXQgc2Nyb2xsIGV2ZW50XG4gIH0pO1xufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbihkZWJvdW5jZSl7XG4gIGxldCAkbm9kZXMgPSAkKCdbZGF0YS1yZXNpemVdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsICdyZXNpemUuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwucmVzaXplTGlzdGVuZXIsICRub2Rlcyk7XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyID0gZnVuY3Rpb24oZGVib3VuY2Upe1xuICBsZXQgJG5vZGVzID0gJCgnW2RhdGEtc2Nyb2xsXScpO1xuICBpZigkbm9kZXMubGVuZ3RoKXtcbiAgICBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCAnc2Nyb2xsLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsLnNjcm9sbExpc3RlbmVyLCAkbm9kZXMpO1xuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyID0gZnVuY3Rpb24oJGVsZW0pIHtcbiAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpeyByZXR1cm4gZmFsc2U7IH1cbiAgbGV0ICRub2RlcyA9ICRlbGVtLmZpbmQoJ1tkYXRhLXJlc2l6ZV0sIFtkYXRhLXNjcm9sbF0sIFtkYXRhLW11dGF0ZV0nKTtcblxuICAvL2VsZW1lbnQgY2FsbGJhY2tcbiAgdmFyIGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24gPSBmdW5jdGlvbiAobXV0YXRpb25SZWNvcmRzTGlzdCkge1xuICAgIHZhciAkdGFyZ2V0ID0gJChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnRhcmdldCk7XG5cbiAgICAvL3RyaWdnZXIgdGhlIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBlbGVtZW50IGRlcGVuZGluZyBvbiB0eXBlXG4gICAgc3dpdGNoIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJhdHRyaWJ1dGVzXCI6XG4gICAgICAgIGlmICgkdGFyZ2V0LmF0dHIoXCJkYXRhLWV2ZW50c1wiKSA9PT0gXCJzY3JvbGxcIiAmJiBtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwiZGF0YS1ldmVudHNcIikge1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInLCBbJHRhcmdldCwgd2luZG93LnBhZ2VZT2Zmc2V0XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpID09PSBcInJlc2l6ZVwiICYmIG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJkYXRhLWV2ZW50c1wiKSB7XG4gICAgICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcigncmVzaXplbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0XSk7XG4gICAgICAgICB9XG4gICAgICAgIGlmIChtdXRhdGlvblJlY29yZHNMaXN0WzBdLmF0dHJpYnV0ZU5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIikuYXR0cihcImRhdGEtZXZlbnRzXCIsXCJtdXRhdGVcIik7XG4gICAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJjaGlsZExpc3RcIjpcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS5hdHRyKFwiZGF0YS1ldmVudHNcIixcIm11dGF0ZVwiKTtcbiAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VySGFuZGxlcignbXV0YXRlbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpXSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvL25vdGhpbmdcbiAgICB9XG4gIH07XG5cbiAgaWYgKCRub2Rlcy5sZW5ndGgpIHtcbiAgICAvL2ZvciBlYWNoIGVsZW1lbnQgdGhhdCBuZWVkcyB0byBsaXN0ZW4gZm9yIHJlc2l6aW5nLCBzY3JvbGxpbmcsIG9yIG11dGF0aW9uIGFkZCBhIHNpbmdsZSBvYnNlcnZlclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9ICRub2Rlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHZhciBlbGVtZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihsaXN0ZW5pbmdFbGVtZW50c011dGF0aW9uKTtcbiAgICAgIGVsZW1lbnRPYnNlcnZlci5vYnNlcnZlKCRub2Rlc1tpXSwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFtcImRhdGEtZXZlbnRzXCIsIFwic3R5bGVcIl0gfSk7XG4gICAgfVxuICB9XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFRvZ2dsZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZWFibGVMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlRm9jdXNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuXG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkUmVzaXplTGlzdGVuZXIoMjUwKTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNjcm9sbExpc3RlbmVyKCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIoKTtcbn1cblxuXG5UcmlnZ2Vycy5pbml0ID0gZnVuY3Rpb24gKF9fLCBGb3VuZGF0aW9uKSB7XG4gIG9uTG9hZCgkKHdpbmRvdyksIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJC50cmlnZ2Vyc0luaXRpYWxpemVkICE9PSB0cnVlKSB7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2ltcGxlTGlzdGVuZXJzKCk7XG4gICAgICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAkLnRyaWdnZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYoRm91bmRhdGlvbikge1xuICAgIEZvdW5kYXRpb24uVHJpZ2dlcnMgPSBUcmlnZ2VycztcbiAgICAvLyBMZWdhY3kgaW5jbHVkZWQgdG8gYmUgYmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIG5vdy5cbiAgICBGb3VuZGF0aW9uLklIZWFyWW91ID0gVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVyc1xuICB9XG59XG5cbmV4cG9ydCB7VHJpZ2dlcnN9O1xuIiwiLyoqXG4gKiB3aGF0LWlucHV0IC0gQSBnbG9iYWwgdXRpbGl0eSBmb3IgdHJhY2tpbmcgdGhlIGN1cnJlbnQgaW5wdXQgbWV0aG9kIChtb3VzZSwga2V5Ym9hcmQgb3IgdG91Y2gpLlxuICogQHZlcnNpb24gdjUuMi4xMlxuICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3RlbjFzZXZlbi93aGF0LWlucHV0XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ3aGF0SW5wdXRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndoYXRJbnB1dFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHQgIC8qXG5cdCAgICogYmFpbCBvdXQgaWYgdGhlcmUgaXMgbm8gZG9jdW1lbnQgb3Igd2luZG93XG5cdCAgICogKGkuZS4gaW4gYSBub2RlL25vbi1ET00gZW52aXJvbm1lbnQpXG5cdCAgICpcblx0ICAgKiBSZXR1cm4gYSBzdHViYmVkIEFQSSBpbnN0ZWFkXG5cdCAgICovXG5cdCAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgIHJldHVybiB7XG5cdCAgICAgIC8vIGFsd2F5cyByZXR1cm4gXCJpbml0aWFsXCIgYmVjYXVzZSBubyBpbnRlcmFjdGlvbiB3aWxsIGV2ZXIgYmUgZGV0ZWN0ZWRcblx0ICAgICAgYXNrOiBmdW5jdGlvbiBhc2soKSB7XG5cdCAgICAgICAgcmV0dXJuICdpbml0aWFsJztcblx0ICAgICAgfSxcblxuXHQgICAgICAvLyBhbHdheXMgcmV0dXJuIG51bGxcblx0ICAgICAgZWxlbWVudDogZnVuY3Rpb24gZWxlbWVudCgpIHtcblx0ICAgICAgICByZXR1cm4gbnVsbDtcblx0ICAgICAgfSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICBpZ25vcmVLZXlzOiBmdW5jdGlvbiBpZ25vcmVLZXlzKCkge30sXG5cblx0ICAgICAgLy8gbm8tb3Bcblx0ICAgICAgc3BlY2lmaWNLZXlzOiBmdW5jdGlvbiBzcGVjaWZpY0tleXMoKSB7fSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICByZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiByZWdpc3Rlck9uQ2hhbmdlKCkge30sXG5cblx0ICAgICAgLy8gbm8tb3Bcblx0ICAgICAgdW5SZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiB1blJlZ2lzdGVyT25DaGFuZ2UoKSB7fVxuXHQgICAgfTtcblx0ICB9XG5cblx0ICAvKlxuXHQgICAqIHZhcmlhYmxlc1xuXHQgICAqL1xuXG5cdCAgLy8gY2FjaGUgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cdCAgdmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0ICAvLyBjdXJyZW50bHkgZm9jdXNlZCBkb20gZWxlbWVudFxuXHQgIHZhciBjdXJyZW50RWxlbWVudCA9IG51bGw7XG5cblx0ICAvLyBsYXN0IHVzZWQgaW5wdXQgdHlwZVxuXHQgIHZhciBjdXJyZW50SW5wdXQgPSAnaW5pdGlhbCc7XG5cblx0ICAvLyBsYXN0IHVzZWQgaW5wdXQgaW50ZW50XG5cdCAgdmFyIGN1cnJlbnRJbnRlbnQgPSBjdXJyZW50SW5wdXQ7XG5cblx0ICAvLyBVTklYIHRpbWVzdGFtcCBvZiBjdXJyZW50IGV2ZW50XG5cdCAgdmFyIGN1cnJlbnRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG5cdCAgLy8gY2hlY2sgZm9yIGEgYGRhdGEtd2hhdHBlcnNpc3RgIGF0dHJpYnV0ZSBvbiBlaXRoZXIgdGhlIGBodG1sYCBvciBgYm9keWAgZWxlbWVudHMsIGRlZmF1bHRzIHRvIGB0cnVlYFxuXHQgIHZhciBzaG91bGRQZXJzaXN0ID0gZmFsc2U7XG5cblx0ICAvLyBmb3JtIGlucHV0IHR5cGVzXG5cdCAgdmFyIGZvcm1JbnB1dHMgPSBbJ2J1dHRvbicsICdpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnXTtcblxuXHQgIC8vIGVtcHR5IGFycmF5IGZvciBob2xkaW5nIGNhbGxiYWNrIGZ1bmN0aW9uc1xuXHQgIHZhciBmdW5jdGlvbkxpc3QgPSBbXTtcblxuXHQgIC8vIGxpc3Qgb2YgbW9kaWZpZXIga2V5cyBjb21tb25seSB1c2VkIHdpdGggdGhlIG1vdXNlIGFuZFxuXHQgIC8vIGNhbiBiZSBzYWZlbHkgaWdub3JlZCB0byBwcmV2ZW50IGZhbHNlIGtleWJvYXJkIGRldGVjdGlvblxuXHQgIHZhciBpZ25vcmVNYXAgPSBbMTYsIC8vIHNoaWZ0XG5cdCAgMTcsIC8vIGNvbnRyb2xcblx0ICAxOCwgLy8gYWx0XG5cdCAgOTEsIC8vIFdpbmRvd3Mga2V5IC8gbGVmdCBBcHBsZSBjbWRcblx0ICA5MyAvLyBXaW5kb3dzIG1lbnUgLyByaWdodCBBcHBsZSBjbWRcblx0ICBdO1xuXG5cdCAgdmFyIHNwZWNpZmljTWFwID0gW107XG5cblx0ICAvLyBtYXBwaW5nIG9mIGV2ZW50cyB0byBpbnB1dCB0eXBlc1xuXHQgIHZhciBpbnB1dE1hcCA9IHtcblx0ICAgIGtleWRvd246ICdrZXlib2FyZCcsXG5cdCAgICBrZXl1cDogJ2tleWJvYXJkJyxcblx0ICAgIG1vdXNlZG93bjogJ21vdXNlJyxcblx0ICAgIG1vdXNlbW92ZTogJ21vdXNlJyxcblx0ICAgIE1TUG9pbnRlckRvd246ICdwb2ludGVyJyxcblx0ICAgIE1TUG9pbnRlck1vdmU6ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJkb3duOiAncG9pbnRlcicsXG5cdCAgICBwb2ludGVybW92ZTogJ3BvaW50ZXInLFxuXHQgICAgdG91Y2hzdGFydDogJ3RvdWNoJyxcblx0ICAgIHRvdWNoZW5kOiAndG91Y2gnXG5cblx0ICAgIC8vIGJvb2xlYW46IHRydWUgaWYgdGhlIHBhZ2UgaXMgYmVpbmcgc2Nyb2xsZWRcblx0ICB9O3ZhciBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXG5cdCAgLy8gc3RvcmUgY3VycmVudCBtb3VzZSBwb3NpdGlvblxuXHQgIHZhciBtb3VzZVBvcyA9IHtcblx0ICAgIHg6IG51bGwsXG5cdCAgICB5OiBudWxsXG5cblx0ICAgIC8vIG1hcCBvZiBJRSAxMCBwb2ludGVyIGV2ZW50c1xuXHQgIH07dmFyIHBvaW50ZXJNYXAgPSB7XG5cdCAgICAyOiAndG91Y2gnLFxuXHQgICAgMzogJ3RvdWNoJywgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcblx0ICAgIDQ6ICdtb3VzZSdcblxuXHQgICAgLy8gY2hlY2sgc3VwcG9ydCBmb3IgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnNcblx0ICB9O3ZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcblxuXHQgIHRyeSB7XG5cdCAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG5cdCAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHQgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xuXHQgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgLy8gZmFpbCBzaWxlbnRseVxuXG5cblx0ICAvKlxuXHQgICAqIHNldCB1cFxuXHQgICAqL1xuXG5cdCAgdmFyIHNldFVwID0gZnVuY3Rpb24gc2V0VXAoKSB7XG5cdCAgICAvLyBhZGQgY29ycmVjdCBtb3VzZSB3aGVlbCBldmVudCBtYXBwaW5nIHRvIGBpbnB1dE1hcGBcblx0ICAgIGlucHV0TWFwW2RldGVjdFdoZWVsKCldID0gJ21vdXNlJztcblxuXHQgICAgYWRkTGlzdGVuZXJzKCk7XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogZXZlbnRzXG5cdCAgICovXG5cblx0ICB2YXIgYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuXHQgICAgLy8gYHBvaW50ZXJtb3ZlYCwgYE1TUG9pbnRlck1vdmVgLCBgbW91c2Vtb3ZlYCBhbmQgbW91c2Ugd2hlZWwgZXZlbnQgYmluZGluZ1xuXHQgICAgLy8gY2FuIG9ubHkgZGVtb25zdHJhdGUgcG90ZW50aWFsLCBidXQgbm90IGFjdHVhbCwgaW50ZXJhY3Rpb25cblx0ICAgIC8vIGFuZCBhcmUgdHJlYXRlZCBzZXBhcmF0ZWx5XG5cdCAgICB2YXIgb3B0aW9ucyA9IHN1cHBvcnRzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogdHJ1ZSB9IDogdHJ1ZTtcblxuXHQgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldFBlcnNpc3QsIHRydWUpO1xuXG5cdCAgICAvLyBwb2ludGVyIGV2ZW50cyAobW91c2UsIHBlbiwgdG91Y2gpXG5cdCAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuXHQgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBzZXRJbnB1dCwgdHJ1ZSk7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHNldEludGVudCwgdHJ1ZSk7XG5cdCAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuXHQgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsIHNldElucHV0LCB0cnVlKTtcblx0ICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ01TUG9pbnRlck1vdmUnLCBzZXRJbnRlbnQsIHRydWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gbW91c2UgZXZlbnRzXG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzZXRJbnB1dCwgdHJ1ZSk7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzZXRJbnRlbnQsIHRydWUpO1xuXG5cdCAgICAgIC8vIHRvdWNoIGV2ZW50c1xuXHQgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB7XG5cdCAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzZXRJbnB1dCwgb3B0aW9ucyk7XG5cdCAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc2V0SW5wdXQsIHRydWUpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIG1vdXNlIHdoZWVsXG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihkZXRlY3RXaGVlbCgpLCBzZXRJbnRlbnQsIG9wdGlvbnMpO1xuXG5cdCAgICAvLyBrZXlib2FyZCBldmVudHNcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2V0SW5wdXQsIHRydWUpO1xuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2V0SW5wdXQsIHRydWUpO1xuXG5cdCAgICAvLyBmb2N1cyBldmVudHNcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgc2V0RWxlbWVudCwgdHJ1ZSk7XG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBjbGVhckVsZW1lbnQsIHRydWUpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgaWYgaW5wdXQgcGVyc2lzdGVuY2Ugc2hvdWxkIGhhcHBlbiBhbmRcblx0ICAvLyBnZXQgc2F2ZWQgc3RhdGUgZnJvbSBzZXNzaW9uIHN0b3JhZ2UgaWYgdHJ1ZSAoZGVmYXVsdHMgdG8gYGZhbHNlYClcblx0ICB2YXIgc2V0UGVyc2lzdCA9IGZ1bmN0aW9uIHNldFBlcnNpc3QoKSB7XG5cdCAgICBzaG91bGRQZXJzaXN0ID0gIShkb2NFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS13aGF0cGVyc2lzdCcpID09PSAnZmFsc2UnIHx8IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdkYXRhLXdoYXRwZXJzaXN0JykgPT09ICdmYWxzZScpO1xuXG5cdCAgICBpZiAoc2hvdWxkUGVyc2lzdCkge1xuXHQgICAgICAvLyBjaGVjayBmb3Igc2Vzc2lvbiB2YXJpYWJsZXMgYW5kIHVzZSBpZiBhdmFpbGFibGVcblx0ICAgICAgdHJ5IHtcblx0ICAgICAgICBpZiAod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3doYXQtaW5wdXQnKSkge1xuXHQgICAgICAgICAgY3VycmVudElucHV0ID0gd2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3doYXQtaW5wdXQnKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAod2luZG93LnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3doYXQtaW50ZW50JykpIHtcblx0ICAgICAgICAgIGN1cnJlbnRJbnRlbnQgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnRlbnQnKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAvLyBmYWlsIHNpbGVudGx5XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgLy8gYWx3YXlzIHJ1biB0aGVzZSBzbyBhdCBsZWFzdCBgaW5pdGlhbGAgc3RhdGUgaXMgc2V0XG5cdCAgICBkb1VwZGF0ZSgnaW5wdXQnKTtcblx0ICAgIGRvVXBkYXRlKCdpbnRlbnQnKTtcblx0ICB9O1xuXG5cdCAgLy8gY2hlY2tzIGNvbmRpdGlvbnMgYmVmb3JlIHVwZGF0aW5nIG5ldyBpbnB1dFxuXHQgIHZhciBzZXRJbnB1dCA9IGZ1bmN0aW9uIHNldElucHV0KGV2ZW50KSB7XG5cdCAgICB2YXIgZXZlbnRLZXkgPSBldmVudC53aGljaDtcblx0ICAgIHZhciB2YWx1ZSA9IGlucHV0TWFwW2V2ZW50LnR5cGVdO1xuXG5cdCAgICBpZiAodmFsdWUgPT09ICdwb2ludGVyJykge1xuXHQgICAgICB2YWx1ZSA9IHBvaW50ZXJUeXBlKGV2ZW50KTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGlnbm9yZU1hdGNoID0gIXNwZWNpZmljTWFwLmxlbmd0aCAmJiBpZ25vcmVNYXAuaW5kZXhPZihldmVudEtleSkgPT09IC0xO1xuXG5cdCAgICB2YXIgc3BlY2lmaWNNYXRjaCA9IHNwZWNpZmljTWFwLmxlbmd0aCAmJiBzcGVjaWZpY01hcC5pbmRleE9mKGV2ZW50S2V5KSAhPT0gLTE7XG5cblx0ICAgIHZhciBzaG91bGRVcGRhdGUgPSB2YWx1ZSA9PT0gJ2tleWJvYXJkJyAmJiBldmVudEtleSAmJiAoaWdub3JlTWF0Y2ggfHwgc3BlY2lmaWNNYXRjaCkgfHwgdmFsdWUgPT09ICdtb3VzZScgfHwgdmFsdWUgPT09ICd0b3VjaCc7XG5cblx0ICAgIC8vIHByZXZlbnQgdG91Y2ggZGV0ZWN0aW9uIGZyb20gYmVpbmcgb3ZlcnJpZGRlbiBieSBldmVudCBleGVjdXRpb24gb3JkZXJcblx0ICAgIGlmICh2YWxpZGF0ZVRvdWNoKHZhbHVlKSkge1xuXHQgICAgICBzaG91bGRVcGRhdGUgPSBmYWxzZTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHNob3VsZFVwZGF0ZSAmJiBjdXJyZW50SW5wdXQgIT09IHZhbHVlKSB7XG5cdCAgICAgIGN1cnJlbnRJbnB1dCA9IHZhbHVlO1xuXG5cdCAgICAgIHBlcnNpc3RJbnB1dCgnaW5wdXQnLCBjdXJyZW50SW5wdXQpO1xuXHQgICAgICBkb1VwZGF0ZSgnaW5wdXQnKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHNob3VsZFVwZGF0ZSAmJiBjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICAvLyBwcmVzZXJ2ZSBpbnRlbnQgZm9yIGtleWJvYXJkIGludGVyYWN0aW9uIHdpdGggZm9ybSBmaWVsZHNcblx0ICAgICAgdmFyIGFjdGl2ZUVsZW0gPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHQgICAgICB2YXIgbm90Rm9ybUlucHV0ID0gYWN0aXZlRWxlbSAmJiBhY3RpdmVFbGVtLm5vZGVOYW1lICYmIChmb3JtSW5wdXRzLmluZGV4T2YoYWN0aXZlRWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEgfHwgYWN0aXZlRWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYnV0dG9uJyAmJiAhY2hlY2tDbG9zZXN0KGFjdGl2ZUVsZW0sICdmb3JtJykpO1xuXG5cdCAgICAgIGlmIChub3RGb3JtSW5wdXQpIHtcblx0ICAgICAgICBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgICBwZXJzaXN0SW5wdXQoJ2ludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXHQgICAgICAgIGRvVXBkYXRlKCdpbnRlbnQnKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyB1cGRhdGVzIHRoZSBkb2MgYW5kIGBpbnB1dFR5cGVzYCBhcnJheSB3aXRoIG5ldyBpbnB1dFxuXHQgIHZhciBkb1VwZGF0ZSA9IGZ1bmN0aW9uIGRvVXBkYXRlKHdoaWNoKSB7XG5cdCAgICBkb2NFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS13aGF0JyArIHdoaWNoLCB3aGljaCA9PT0gJ2lucHV0JyA/IGN1cnJlbnRJbnB1dCA6IGN1cnJlbnRJbnRlbnQpO1xuXG5cdCAgICBmaXJlRnVuY3Rpb25zKHdoaWNoKTtcblx0ICB9O1xuXG5cdCAgLy8gdXBkYXRlcyBpbnB1dCBpbnRlbnQgZm9yIGBtb3VzZW1vdmVgIGFuZCBgcG9pbnRlcm1vdmVgXG5cdCAgdmFyIHNldEludGVudCA9IGZ1bmN0aW9uIHNldEludGVudChldmVudCkge1xuXHQgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cblx0ICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB7XG5cdCAgICAgIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXHQgICAgfVxuXG5cdCAgICAvLyB0ZXN0IHRvIHNlZSBpZiBgbW91c2Vtb3ZlYCBoYXBwZW5lZCByZWxhdGl2ZSB0byB0aGUgc2NyZWVuIHRvIGRldGVjdCBzY3JvbGxpbmcgdmVyc3VzIG1vdXNlbW92ZVxuXHQgICAgZGV0ZWN0U2Nyb2xsaW5nKGV2ZW50KTtcblxuXHQgICAgLy8gb25seSBleGVjdXRlIGlmIHNjcm9sbGluZyBpc24ndCBoYXBwZW5pbmdcblx0ICAgIGlmICgoIWlzU2Nyb2xsaW5nICYmICF2YWxpZGF0ZVRvdWNoKHZhbHVlKSB8fCBpc1Njcm9sbGluZyAmJiBldmVudC50eXBlID09PSAnd2hlZWwnIHx8IGV2ZW50LnR5cGUgPT09ICdtb3VzZXdoZWVsJyB8fCBldmVudC50eXBlID09PSAnRE9NTW91c2VTY3JvbGwnKSAmJiBjdXJyZW50SW50ZW50ICE9PSB2YWx1ZSkge1xuXHQgICAgICBjdXJyZW50SW50ZW50ID0gdmFsdWU7XG5cblx0ICAgICAgcGVyc2lzdElucHV0KCdpbnRlbnQnLCBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgZG9VcGRhdGUoJ2ludGVudCcpO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgc2V0RWxlbWVudCA9IGZ1bmN0aW9uIHNldEVsZW1lbnQoZXZlbnQpIHtcblx0ICAgIGlmICghZXZlbnQudGFyZ2V0Lm5vZGVOYW1lKSB7XG5cdCAgICAgIC8vIElmIG5vZGVOYW1lIGlzIHVuZGVmaW5lZCwgY2xlYXIgdGhlIGVsZW1lbnRcblx0ICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGNsaWNrIGluc2lkZSBhbiA8c3ZnPiBlbGVtZW50LlxuXHQgICAgICBjbGVhckVsZW1lbnQoKTtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXG5cdCAgICBjdXJyZW50RWxlbWVudCA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHQgICAgZG9jRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGVsZW1lbnQnLCBjdXJyZW50RWxlbWVudCk7XG5cblx0ICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0ICYmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QubGVuZ3RoKSB7XG5cdCAgICAgIGRvY0VsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXdoYXRjbGFzc2VzJywgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC50b1N0cmluZygpLnJlcGxhY2UoJyAnLCAnLCcpKTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgdmFyIGNsZWFyRWxlbWVudCA9IGZ1bmN0aW9uIGNsZWFyRWxlbWVudCgpIHtcblx0ICAgIGN1cnJlbnRFbGVtZW50ID0gbnVsbDtcblxuXHQgICAgZG9jRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtd2hhdGVsZW1lbnQnKTtcblx0ICAgIGRvY0VsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXdoYXRjbGFzc2VzJyk7XG5cdCAgfTtcblxuXHQgIHZhciBwZXJzaXN0SW5wdXQgPSBmdW5jdGlvbiBwZXJzaXN0SW5wdXQod2hpY2gsIHZhbHVlKSB7XG5cdCAgICBpZiAoc2hvdWxkUGVyc2lzdCkge1xuXHQgICAgICB0cnkge1xuXHQgICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd3aGF0LScgKyB3aGljaCwgdmFsdWUpO1xuXHQgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgLy8gZmFpbCBzaWxlbnRseVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogdXRpbGl0aWVzXG5cdCAgICovXG5cblx0ICB2YXIgcG9pbnRlclR5cGUgPSBmdW5jdGlvbiBwb2ludGVyVHlwZShldmVudCkge1xuXHQgICAgaWYgKHR5cGVvZiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgcmV0dXJuIHBvaW50ZXJNYXBbZXZlbnQucG9pbnRlclR5cGVdO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gdHJlYXQgcGVuIGxpa2UgdG91Y2hcblx0ICAgICAgcmV0dXJuIGV2ZW50LnBvaW50ZXJUeXBlID09PSAncGVuJyA/ICd0b3VjaCcgOiBldmVudC5wb2ludGVyVHlwZTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLy8gcHJldmVudCB0b3VjaCBkZXRlY3Rpb24gZnJvbSBiZWluZyBvdmVycmlkZGVuIGJ5IGV2ZW50IGV4ZWN1dGlvbiBvcmRlclxuXHQgIHZhciB2YWxpZGF0ZVRvdWNoID0gZnVuY3Rpb24gdmFsaWRhdGVUb3VjaCh2YWx1ZSkge1xuXHQgICAgdmFyIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0ICAgIHZhciB0b3VjaElzVmFsaWQgPSB2YWx1ZSA9PT0gJ21vdXNlJyAmJiBjdXJyZW50SW5wdXQgPT09ICd0b3VjaCcgJiYgdGltZXN0YW1wIC0gY3VycmVudFRpbWVzdGFtcCA8IDIwMDtcblxuXHQgICAgY3VycmVudFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuXHQgICAgcmV0dXJuIHRvdWNoSXNWYWxpZDtcblx0ICB9O1xuXG5cdCAgLy8gZGV0ZWN0IHZlcnNpb24gb2YgbW91c2Ugd2hlZWwgZXZlbnQgdG8gdXNlXG5cdCAgLy8gdmlhIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3doZWVsX2V2ZW50XG5cdCAgdmFyIGRldGVjdFdoZWVsID0gZnVuY3Rpb24gZGV0ZWN0V2hlZWwoKSB7XG5cdCAgICB2YXIgd2hlZWxUeXBlID0gbnVsbDtcblxuXHQgICAgLy8gTW9kZXJuIGJyb3dzZXJzIHN1cHBvcnQgXCJ3aGVlbFwiXG5cdCAgICBpZiAoJ29ud2hlZWwnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKSB7XG5cdCAgICAgIHdoZWVsVHlwZSA9ICd3aGVlbCc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBXZWJraXQgYW5kIElFIHN1cHBvcnQgYXQgbGVhc3QgXCJtb3VzZXdoZWVsXCJcblx0ICAgICAgLy8gb3IgYXNzdW1lIHRoYXQgcmVtYWluaW5nIGJyb3dzZXJzIGFyZSBvbGRlciBGaXJlZm94XG5cdCAgICAgIHdoZWVsVHlwZSA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCAhPT0gdW5kZWZpbmVkID8gJ21vdXNld2hlZWwnIDogJ0RPTU1vdXNlU2Nyb2xsJztcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHdoZWVsVHlwZTtcblx0ICB9O1xuXG5cdCAgLy8gcnVucyBjYWxsYmFjayBmdW5jdGlvbnNcblx0ICB2YXIgZmlyZUZ1bmN0aW9ucyA9IGZ1bmN0aW9uIGZpcmVGdW5jdGlvbnModHlwZSkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZ1bmN0aW9uTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoZnVuY3Rpb25MaXN0W2ldLnR5cGUgPT09IHR5cGUpIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3RbaV0uZm4uY2FsbCh1bmRlZmluZWQsIHR5cGUgPT09ICdpbnB1dCcgPyBjdXJyZW50SW5wdXQgOiBjdXJyZW50SW50ZW50KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBmaW5kcyBtYXRjaGluZyBlbGVtZW50IGluIGFuIG9iamVjdFxuXHQgIHZhciBvYmpQb3MgPSBmdW5jdGlvbiBvYmpQb3MobWF0Y2gpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmdW5jdGlvbkxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGZ1bmN0aW9uTGlzdFtpXS5mbiA9PT0gbWF0Y2gpIHtcblx0ICAgICAgICByZXR1cm4gaTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgZGV0ZWN0U2Nyb2xsaW5nID0gZnVuY3Rpb24gZGV0ZWN0U2Nyb2xsaW5nKGV2ZW50KSB7XG5cdCAgICBpZiAobW91c2VQb3MueCAhPT0gZXZlbnQuc2NyZWVuWCB8fCBtb3VzZVBvcy55ICE9PSBldmVudC5zY3JlZW5ZKSB7XG5cdCAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAgICAgbW91c2VQb3MueCA9IGV2ZW50LnNjcmVlblg7XG5cdCAgICAgIG1vdXNlUG9zLnkgPSBldmVudC5zY3JlZW5ZO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBtYW51YWwgdmVyc2lvbiBvZiBgY2xvc2VzdCgpYFxuXHQgIHZhciBjaGVja0Nsb3Nlc3QgPSBmdW5jdGlvbiBjaGVja0Nsb3Nlc3QoZWxlbSwgdGFnKSB7XG5cdCAgICB2YXIgRWxlbWVudFByb3RvdHlwZSA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZTtcblxuXHQgICAgaWYgKCFFbGVtZW50UHJvdG90eXBlLm1hdGNoZXMpIHtcblx0ICAgICAgRWxlbWVudFByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudFByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcblx0ICAgIH1cblxuXHQgICAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmNsb3Nlc3QpIHtcblx0ICAgICAgZG8ge1xuXHQgICAgICAgIGlmIChlbGVtLm1hdGNoZXModGFnKSkge1xuXHQgICAgICAgICAgcmV0dXJuIGVsZW07XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZWxlbSA9IGVsZW0ucGFyZW50RWxlbWVudCB8fCBlbGVtLnBhcmVudE5vZGU7XG5cdCAgICAgIH0gd2hpbGUgKGVsZW0gIT09IG51bGwgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSk7XG5cblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gZWxlbS5jbG9zZXN0KHRhZyk7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8qXG5cdCAgICogaW5pdFxuXHQgICAqL1xuXG5cdCAgLy8gZG9uJ3Qgc3RhcnQgc2NyaXB0IHVubGVzcyBicm93c2VyIGN1dHMgdGhlIG11c3RhcmRcblx0ICAvLyAoYWxzbyBwYXNzZXMgaWYgcG9seWZpbGxzIGFyZSB1c2VkKVxuXHQgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93ICYmIEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG5cdCAgICBzZXRVcCgpO1xuXHQgIH1cblxuXHQgIC8qXG5cdCAgICogYXBpXG5cdCAgICovXG5cblx0ICByZXR1cm4ge1xuXHQgICAgLy8gcmV0dXJucyBzdHJpbmc6IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcblx0ICAgIC8vIG9wdDogJ2ludGVudCd8J2lucHV0J1xuXHQgICAgLy8gJ2lucHV0JyAoZGVmYXVsdCk6IHJldHVybnMgdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGBkYXRhLXdoYXRpbnB1dGAgYXR0cmlidXRlXG5cdCAgICAvLyAnaW50ZW50JzogaW5jbHVkZXMgYGRhdGEtd2hhdGludGVudGAgdmFsdWUgaWYgaXQncyBkaWZmZXJlbnQgdGhhbiBgZGF0YS13aGF0aW5wdXRgXG5cdCAgICBhc2s6IGZ1bmN0aW9uIGFzayhvcHQpIHtcblx0ICAgICAgcmV0dXJuIG9wdCA9PT0gJ2ludGVudCcgPyBjdXJyZW50SW50ZW50IDogY3VycmVudElucHV0O1xuXHQgICAgfSxcblxuXHQgICAgLy8gcmV0dXJucyBzdHJpbmc6IHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50IG9yIG51bGxcblx0ICAgIGVsZW1lbnQ6IGZ1bmN0aW9uIGVsZW1lbnQoKSB7XG5cdCAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgaWdub3JlZCBrZXlzIHdpdGggcHJvdmlkZWQgYXJyYXlcblx0ICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoYXJyKSB7XG5cdCAgICAgIGlnbm9yZU1hcCA9IGFycjtcblx0ICAgIH0sXG5cblx0ICAgIC8vIG92ZXJ3cml0ZXMgc3BlY2lmaWMgY2hhciBrZXlzIHRvIHVwZGF0ZSBvblxuXHQgICAgc3BlY2lmaWNLZXlzOiBmdW5jdGlvbiBzcGVjaWZpY0tleXMoYXJyKSB7XG5cdCAgICAgIHNwZWNpZmljTWFwID0gYXJyO1xuXHQgICAgfSxcblxuXHQgICAgLy8gYXR0YWNoIGZ1bmN0aW9ucyB0byBpbnB1dCBhbmQgaW50ZW50IFwiZXZlbnRzXCJcblx0ICAgIC8vIGZ1bmN0OiBmdW5jdGlvbiB0byBmaXJlIG9uIGNoYW5nZVxuXHQgICAgLy8gZXZlbnRUeXBlOiAnaW5wdXQnfCdpbnRlbnQnXG5cdCAgICByZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiByZWdpc3Rlck9uQ2hhbmdlKGZuLCBldmVudFR5cGUpIHtcblx0ICAgICAgZnVuY3Rpb25MaXN0LnB1c2goe1xuXHQgICAgICAgIGZuOiBmbixcblx0ICAgICAgICB0eXBlOiBldmVudFR5cGUgfHwgJ2lucHV0J1xuXHQgICAgICB9KTtcblx0ICAgIH0sXG5cblx0ICAgIHVuUmVnaXN0ZXJPbkNoYW5nZTogZnVuY3Rpb24gdW5SZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG5cdCAgICAgIHZhciBwb3NpdGlvbiA9IG9ialBvcyhmbik7XG5cblx0ICAgICAgaWYgKHBvc2l0aW9uIHx8IHBvc2l0aW9uID09PSAwKSB7XG5cdCAgICAgICAgZnVuY3Rpb25MaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cblx0ICAgIGNsZWFyU3RvcmFnZTogZnVuY3Rpb24gY2xlYXJTdG9yYWdlKCkge1xuXHQgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcblx0ICAgIH1cblx0ICB9O1xuXHR9KCk7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKVxufSk7XG47IiwiLy8gRm91bmRhdGlvbiBKU1xuaW1wb3J0ICducG0vd2hhdC1pbnB1dCc7XG5pbXBvcnQgJ21lZGlhanMvZm91bmRhdGlvbi9mb3VuZGF0aW9uJzsiXSwibmFtZXMiOlsiRm91bmRhdGlvbiIsIkNvcmVVdGlscyIsIkJveCIsIm9uSW1hZ2VzTG9hZGVkIiwiS2V5Ym9hcmQiLCJNZWRpYVF1ZXJ5IiwiTW90aW9uIiwiTW92ZSIsIk5lc3QiLCJUaW1lciIsIlRvdWNoIiwiVHJpZ2dlcnMiLCJEcm9wZG93biIsIkRyb3Bkb3duTWVudSIsIkVxdWFsaXplciIsIk1hZ2VsbGFuIiwiT2ZmQ2FudmFzIiwiUmVzcG9uc2l2ZU1lbnUiLCJSZXZlYWwiLCJUYWJzIiwiVG9nZ2xlciIsIlRvb2x0aXAiLCJhZGRUb0pxdWVyeSIsIiQiLCJydGwiLCJHZXRZb0RpZ2l0cyIsInRyYW5zaXRpb25lbmQiLCJSZWdFeHBFc2NhcGUiLCJvbkxvYWQiLCJpbml0IiwiX2luaXQiLCJwbHVnaW4iLCJQbHVnaW4iLCJBY2NvcmRpb25NZW51IiwiZWxlbWVudCIsIm9wdGlvbnMiLCIkZWxlbWVudCIsImV4dGVuZCIsImRlZmF1bHRzIiwiZGF0YSIsImNsYXNzTmFtZSIsInJlZ2lzdGVyIiwiRmVhdGhlciIsIl90aGlzIiwiZmluZCIsIm5vdCIsInNsaWRlVXAiLCJhdHRyIiwibXVsdGlPcGVuIiwiJG1lbnVMaW5rcyIsImVhY2giLCJsaW5rSWQiLCJpZCIsIiRlbGVtIiwiJHN1YiIsImNoaWxkcmVuIiwic3ViSWQiLCJpc0FjdGl2ZSIsImhhc0NsYXNzIiwicGFyZW50TGluayIsIiRhbmNob3IiLCJjbG9uZSIsInByZXBlbmRUbyIsIndyYXAiLCJzdWJtZW51VG9nZ2xlIiwiYWRkQ2xhc3MiLCJhZnRlciIsInN1Ym1lbnVUb2dnbGVUZXh0IiwiaW5pdFBhbmVzIiwibGVuZ3RoIiwiZG93biIsIl9ldmVudHMiLCIkc3VibWVudSIsIm9mZiIsIm9uIiwidG9nZ2xlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJGVsZW1lbnRzIiwicGFyZW50IiwiJHByZXZFbGVtZW50IiwiJG5leHRFbGVtZW50IiwiJHRhcmdldCIsImkiLCJpcyIsImVxIiwiTWF0aCIsIm1heCIsImZpcnN0IiwibWluIiwicGFyZW50cyIsIm5leHQiLCJoYW5kbGVLZXkiLCJvcGVuIiwiZm9jdXMiLCJjbG9zZSIsInVwIiwiY2xvc2VBbGwiLCJoaWRlQWxsIiwiaGFuZGxlZCIsIiR0YXJnZXRCcmFuY2giLCJwYXJlbnRzVW50aWwiLCJhZGQiLCIkb3RoZXJzQWN0aXZlU3VibWVudXMiLCJwcmV2Iiwic2xpZGVEb3duIiwic2xpZGVTcGVlZCIsInRyaWdnZXIiLCIkc3VibWVudXMiLCIkYWxsbWVudXMiLCJyZW1vdmVDbGFzcyIsImNzcyIsImRldGFjaCIsInJlbW92ZSIsIkJ1cm4iLCJGT1VOREFUSU9OX1ZFUlNJT04iLCJ2ZXJzaW9uIiwiX3BsdWdpbnMiLCJfdXVpZHMiLCJuYW1lIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJoeXBoZW5hdGUiLCJyZWdpc3RlclBsdWdpbiIsInBsdWdpbk5hbWUiLCJjb25zdHJ1Y3RvciIsInRvTG93ZXJDYXNlIiwidXVpZCIsInB1c2giLCJ1bnJlZ2lzdGVyUGx1Z2luIiwic3BsaWNlIiwiaW5kZXhPZiIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsInJlSW5pdCIsInBsdWdpbnMiLCJpc0pRIiwidHlwZSIsImZucyIsInBsZ3MiLCJmb3JFYWNoIiwicCIsImZvdW5kYXRpb24iLCJvYmplY3QiLCJPYmplY3QiLCJrZXlzIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwicmVmbG93IiwiZWxlbSIsImFkZEJhY2siLCJmaWx0ZXIiLCIkZWwiLCJvcHRzIiwic3BsaXQiLCJvcHRpb24iLCJvcHQiLCJtYXAiLCJlbCIsInRyaW0iLCJwYXJzZVZhbHVlIiwiZXIiLCJnZXRGbk5hbWUiLCJtZXRob2QiLCIkbm9KUyIsImFyZ3MiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsInBsdWdDbGFzcyIsImFwcGx5IiwiUmVmZXJlbmNlRXJyb3IiLCJUeXBlRXJyb3IiLCJmbiIsInV0aWwiLCJ0aHJvdHRsZSIsImZ1bmMiLCJkZWxheSIsInRpbWVyIiwiY29udGV4dCIsInNldFRpbWVvdXQiLCJ3aW5kb3ciLCJEYXRlIiwibm93IiwiZ2V0VGltZSIsInZlbmRvcnMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ2cCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImxhc3RUaW1lIiwiY2FsbGJhY2siLCJuZXh0VGltZSIsImNsZWFyVGltZW91dCIsInBlcmZvcm1hbmNlIiwic3RhcnQiLCJGdW5jdGlvbiIsImJpbmQiLCJvVGhpcyIsImFBcmdzIiwiZlRvQmluZCIsImZOT1AiLCJmQm91bmQiLCJjb25jYXQiLCJmdW5jTmFtZVJlZ2V4IiwicmVzdWx0cyIsImV4ZWMiLCJ0b1N0cmluZyIsInN0ciIsImlzTmFOIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJfc2V0dXAiLCJnZXRQbHVnaW5OYW1lIiwiX2Rlc3Ryb3kiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iaiIsIm5hbWVzcGFjZSIsImNoYXJzIiwiY2hhcnNMZW5ndGgiLCJmbG9vciIsInJhbmRvbSIsInRyYW5zaXRpb25zIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZW5kIiwidHJhbnNpdGlvbiIsInN0eWxlIiwidHJpZ2dlckhhbmRsZXIiLCJoYW5kbGVyIiwiZGlkTG9hZCIsInJlYWR5U3RhdGUiLCJldmVudFR5cGUiLCJjYiIsIm9uZSIsImlnbm9yZU1vdXNlZGlzYXBwZWFyIiwiaWdub3JlTGVhdmVXaW5kb3ciLCJpZ25vcmVSZWFwcGVhciIsImxlYXZlRXZlbnRIYW5kbGVyIiwiZUxlYXZlIiwicmVzdCIsInJlbGF0ZWRUYXJnZXQiLCJsZWF2ZUV2ZW50RGVib3VuY2VyIiwiaGFzRm9jdXMiLCJyZWVudGVyRXZlbnRIYW5kbGVyIiwiZVJlZW50ZXIiLCJjdXJyZW50VGFyZ2V0IiwiaGFzIiwidGFyZ2V0IiwiRHJpbGxkb3duIiwiYXV0b0FwcGx5Q2xhc3MiLCIkc3VibWVudUFuY2hvcnMiLCIkbWVudUl0ZW1zIiwiJGN1cnJlbnRNZW51IiwiX3ByZXBhcmVNZW51IiwiX3JlZ2lzdGVyRXZlbnRzIiwiX2tleWJvYXJkRXZlbnRzIiwiJGxpbmsiLCIkbWVudSIsIiRiYWNrIiwiYmFja0J1dHRvblBvc2l0aW9uIiwiYXBwZW5kIiwiYmFja0J1dHRvbiIsInByZXBlbmQiLCJfYmFjayIsImF1dG9IZWlnaHQiLCIkd3JhcHBlciIsIndyYXBwZXIiLCJhbmltYXRlSGVpZ2h0IiwiX2dldE1heERpbXMiLCJfc2hvdyIsImNsb3NlT25DbGljayIsIiRib2R5IiwiZXYiLCJjb250YWlucyIsIl9oaWRlQWxsIiwic2Nyb2xsVG9wIiwiX2JpbmRIYW5kbGVyIiwiX3Njcm9sbFRvcCIsIl9yZXNpemUiLCIkc2Nyb2xsVG9wRWxlbWVudCIsInNjcm9sbFRvcEVsZW1lbnQiLCJzY3JvbGxQb3MiLCJwYXJzZUludCIsIm9mZnNldCIsInRvcCIsInNjcm9sbFRvcE9mZnNldCIsInN0b3AiLCJhbmltYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJhbmltYXRpb25FYXNpbmciLCJwcmV2aW91cyIsIl9oaWRlIiwic2libGluZ3MiLCJjYWxjSGVpZ2h0IiwiY2xvc2VzdCIsImhlaWdodCIsInBhcmVudFN1Yk1lbnUiLCJhdXRvRm9jdXMiLCIkZXhwYW5kZWRTdWJtZW51cyIsIl9zZXRIaWRlU3ViTWVudUNsYXNzZXMiLCJpbmRleCIsImlzTGFzdENoaWxkIiwiX3NldFNob3dTdWJNZW51Q2xhc3NlcyIsImJsdXIiLCJtYXhIZWlnaHQiLCJyZXN1bHQiLCJHZXREaW1lbnNpb25zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJ1bndyYXAiLCJQb3NpdGlvbmFibGUiLCIkaWQiLCIkYW5jaG9ycyIsIl9zZXRDdXJyZW50QW5jaG9yIiwicGFyZW50Q2xhc3MiLCIkcGFyZW50IiwiJGN1cnJlbnRBbmNob3IiLCJwb3NpdGlvbiIsIm1hdGNoIiwiaG9yaXpvbnRhbFBvc2l0aW9uIiwiYWxpZ25tZW50IiwiaGFzVG91Y2giLCJvbnRvdWNoc3RhcnQiLCJfc2V0UG9zaXRpb24iLCJmb3JjZUZvbGxvdyIsImhvdmVyIiwiYm9keURhdGEiLCJ3aGF0aW5wdXQiLCJ0aW1lb3V0IiwiaG92ZXJEZWxheSIsImhvdmVyUGFuZSIsImJvZHkiLCIkZm9jdXNhYmxlIiwiZmluZEZvY3VzYWJsZSIsIl9hZGRCb2R5SGFuZGxlciIsInRyYXBGb2N1cyIsInJlbGVhc2VGb2N1cyIsImhpZGUiLCJ2T2Zmc2V0IiwiaE9mZnNldCIsImFsbG93T3ZlcmxhcCIsImFsbG93Qm90dG9tT3ZlcmxhcCIsIlJ0bCIsInN1YnMiLCIkdGFicyIsInZlcnRpY2FsQ2xhc3MiLCJyaWdodENsYXNzIiwiY2hhbmdlZCIsInBhckNsYXNzIiwiaGFuZGxlQ2xpY2tGbiIsImhhc1N1YiIsImhhc0NsaWNrZWQiLCJjbGlja09wZW4iLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJjbG9zZU9uQ2xpY2tJbnNpZGUiLCJkaXNhYmxlSG92ZXJPblRvdWNoIiwiZGlzYWJsZUhvdmVyIiwiYXV0b2Nsb3NlIiwiY2xvc2luZ1RpbWUiLCJpc1RhYiIsIm5leHRTaWJsaW5nIiwicHJldlNpYmxpbmciLCJvcGVuU3ViIiwiY2xvc2VTdWIiLCJmdW5jdGlvbnMiLCJfaXNWZXJ0aWNhbCIsIl9pc1J0bCIsIl9yZW1vdmVCb2R5SGFuZGxlciIsImlzSXRzZWxmIiwiaWR4IiwiJHNpYnMiLCJjbGVhciIsIkltTm90VG91Y2hpbmdZb3UiLCJvbGRDbGFzcyIsIiRwYXJlbnRMaSIsIiR0b0Nsb3NlIiwic29tZXRoaW5nVG9DbG9zZSIsIiRhY3RpdmVJdGVtIiwiZXFJZCIsIiR3YXRjaGVkIiwiaGFzTmVzdGVkIiwiaXNOZXN0ZWQiLCJpc09uIiwib25SZXNpemVNZUJvdW5kIiwiX29uUmVzaXplTWUiLCJvblBvc3RFcXVhbGl6ZWRCb3VuZCIsIl9vblBvc3RFcXVhbGl6ZWQiLCJpbWdzIiwidG9vU21hbGwiLCJlcXVhbGl6ZU9uIiwiX2NoZWNrTVEiLCJfcmVmbG93IiwiX3BhdXNlRXZlbnRzIiwiZXF1YWxpemVPblN0YWNrIiwiX2lzU3RhY2tlZCIsImVxdWFsaXplQnlSb3ciLCJnZXRIZWlnaHRzQnlSb3ciLCJhcHBseUhlaWdodEJ5Um93IiwiZ2V0SGVpZ2h0cyIsImFwcGx5SGVpZ2h0IiwiaGVpZ2h0cyIsImxlbiIsIm9mZnNldEhlaWdodCIsImxhc3RFbFRvcE9mZnNldCIsImdyb3VwcyIsImdyb3VwIiwiZWxPZmZzZXRUb3AiLCJqIiwibG4iLCJnZXQiLCJncm91cHNJTGVuZ3RoIiwibGVuSiIsIlNtb290aFNjcm9sbCIsImNhbGNQb2ludHMiLCIkdGFyZ2V0cyIsIiRsaW5rcyIsIiRhY3RpdmUiLCJwYWdlWU9mZnNldCIsImh0bWwiLCJkb2N1bWVudEVsZW1lbnQiLCJwb2ludHMiLCJ3aW5IZWlnaHQiLCJyb3VuZCIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZG9jSGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiJHRhciIsInB0IiwidGhyZXNob2xkIiwidGFyZ2V0UG9pbnQiLCJkZWVwTGlua2luZyIsImxvY2F0aW9uIiwiaGFzaCIsInNjcm9sbFRvTG9jIiwiX3VwZGF0ZUFjdGl2ZSIsIm9uTG9hZExpc3RlbmVyIiwiYXJyaXZhbCIsImdldEF0dHJpYnV0ZSIsIl9kZWVwTGlua1Njcm9sbCIsImxvYyIsIl9pblRyYW5zaXRpb24iLCJuZXdTY3JvbGxQb3MiLCJpc1Njcm9sbGluZ1VwIiwiYWN0aXZlSWR4IiwidmlzaWJsZUxpbmtzIiwiJG9sZEFjdGl2ZSIsImFjdGl2ZUhhc2giLCJpc05ld0FjdGl2ZSIsImlzTmV3SGFzaCIsImFjdGl2ZUNsYXNzIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInVybCIsInBhdGhuYW1lIiwic2VhcmNoIiwidXBkYXRlSGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImNvbnRlbnRDbGFzc2VzIiwiYmFzZSIsInJldmVhbCIsIiRsYXN0VHJpZ2dlciIsIiR0cmlnZ2VycyIsIiRjb250ZW50IiwibmVzdGVkIiwiJHN0aWNreSIsImlzSW5DYW52YXMiLCJ2YWwiLCJjb250ZW50SWQiLCJ3YXJuIiwiY29udGVudE92ZXJsYXkiLCJvdmVybGF5Iiwib3ZlcmxheVBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwiJG92ZXJsYXkiLCJpbnNlcnRBZnRlciIsInJldmVhbE9uUmVnRXhwIiwiUmVnRXhwIiwicmV2ZWFsQ2xhc3MiLCJyZXZlYWxPbkNsYXNzIiwiaXNSZXZlYWxlZCIsInJldmVhbE9uIiwiX3NldE1RQ2hlY2tlciIsInRyYW5zaXRpb25UaW1lIiwiY29udGVudFNjcm9sbCIsImluQ2FudmFzRm9yIiwiaW5DYW52YXNPbiIsIl9jaGVja0luQ2FudmFzIiwiX3JlbW92ZUNvbnRlbnRDbGFzc2VzIiwiX2hhbmRsZUtleWJvYXJkIiwiYXRMZWFzdCIsImhhc1JldmVhbCIsImpvaW4iLCJfIiwidG9wVmFsIiwiYWJzb2x1dGVUb3BWYWwiLCJzdGlja3lEYXRhIiwiX2FkZENvbnRlbnRDbGFzc2VzIiwiZXZlbnQiLCJsYXN0WSIsInRvdWNoZXMiLCJwYWdlWSIsImRlbHRhIiwiX2NhblNjcm9sbCIsInN0b3BQcm9wYWdhdGlvbiIsImFsbG93VXAiLCJhbGxvd0Rvd24iLCJmb3JjZVRvIiwic2Nyb2xsVG8iLCJfc3RvcFNjcm9sbGluZyIsIl9yZWNvcmRTY3JvbGxhYmxlIiwiX3ByZXZlbnREZWZhdWx0QXRFZGdlcyIsIl9zY3JvbGxib3hUb3VjaE1vdmVkIiwiY2FudmFzRm9jdXMiLCJfZml4U3RpY2t5RWxlbWVudHMiLCJfdW5maXhTdGlja3lFbGVtZW50cyIsIlBPU0lUSU9OUyIsIlZFUlRJQ0FMX0FMSUdOTUVOVFMiLCJIT1JJWk9OVEFMX0FMSUdOTUVOVFMiLCJBTElHTk1FTlRTIiwibmV4dEl0ZW0iLCJpdGVtIiwiYXJyYXkiLCJjdXJyZW50SWR4IiwidHJpZWRQb3NpdGlvbnMiLCJfZ2V0RGVmYXVsdFBvc2l0aW9uIiwiX2dldERlZmF1bHRBbGlnbm1lbnQiLCJvcmlnaW5hbFBvc2l0aW9uIiwib3JpZ2luYWxBbGlnbm1lbnQiLCJfYWxpZ25tZW50c0V4aGF1c3RlZCIsIl9yZWFsaWduIiwiX2FkZFRyaWVkUG9zaXRpb24iLCJpc0V4aGF1c3RlZCIsIkdldEV4cGxpY2l0T2Zmc2V0cyIsIl9nZXRWT2Zmc2V0IiwiX2dldEhPZmZzZXQiLCJtaW5PdmVybGFwIiwibWluQ29vcmRpbmF0ZXMiLCJfcG9zaXRpb25zRXhoYXVzdGVkIiwib3ZlcmxhcCIsIk92ZXJsYXBBcmVhIiwiX3JlcG9zaXRpb24iLCJNZW51UGx1Z2lucyIsImRyb3Bkb3duIiwiY3NzQ2xhc3MiLCJkcmlsbGRvd24iLCJhY2NvcmRpb24iLCJydWxlcyIsImN1cnJlbnRNcSIsImN1cnJlbnRQbHVnaW4iLCJydWxlc1RyZWUiLCJydWxlIiwicnVsZVNpemUiLCJydWxlUGx1Z2luIiwiaXNFbXB0eU9iamVjdCIsIl9jaGVja01lZGlhUXVlcmllcyIsIm1hdGNoZWRNcSIsImtleSIsInZhbHVlIiwiZGVzdHJveSIsImNhY2hlZCIsIm1xIiwiY3VycmVudCIsImZ1bGxTY3JlZW4iLCJfbWFrZU92ZXJsYXkiLCJhcHBlbmRUbyIsImRlZXBMaW5rIiwiYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzIiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwibGVmdCIsIm1hcmdpbiIsIl91cGRhdGVQb3NpdGlvbiIsIl9oYW5kbGVTdGF0ZSIsIiRhY3RpdmVBbmNob3IiLCJhY3RpdmVFbGVtZW50Iiwic2hvdyIsIm11bHRpcGxlT3BlbmVkIiwiX2Rpc2FibGVTY3JvbGwiLCJhbmltYXRpb25JbiIsImFmdGVyQW5pbWF0aW9uIiwiX2FkZEdsb2JhbENsYXNzZXMiLCJhbmltYXRlSW4iLCJmb2N1c2FibGVFbGVtZW50cyIsInNob3dEZWxheSIsIl9hZGRHbG9iYWxMaXN0ZW5lcnMiLCJ1cGRhdGVTY3JvbGxiYXJDbGFzcyIsInRvZ2dsZUNsYXNzIiwiY2xvc2VPbkVzYyIsImFuaW1hdGlvbk91dCIsImFuaW1hdGVPdXQiLCJmaW5pc2hVcCIsImhpZGVEZWxheSIsIl9yZW1vdmVHbG9iYWxDbGFzc2VzIiwiX2VuYWJsZVNjcm9sbCIsInJlc2V0T25DbG9zZSIsInVybFdpdGhvdXRIYXNoIiwidGl0bGUiLCJfbGlua0NsaWNrTGlzdGVuZXIiLCJfaGFuZGxlTGlua0NsaWNrIiwiJGxvYyIsIl9pc0luaXRpYWxpemluZyIsIiR0YWJUaXRsZXMiLCJsaW5rQ2xhc3MiLCIkdGFiQ29udGVudCIsImxpbmtBY3RpdmVDbGFzcyIsIl9pbml0aWFsQW5jaG9yIiwiZGVlcExpbmtTbXVkZ2VEZWxheSIsIm1hdGNoSGVpZ2h0IiwiJGltYWdlcyIsIl9zZXRIZWlnaHQiLCJfY2hlY2tEZWVwTGluayIsImFuY2hvciIsImFuY2hvck5vSGFzaCIsImlzT3duQW5jaG9yIiwic2VsZWN0VGFiIiwiX2NvbGxhcHNlIiwiZGVlcExpbmtTbXVkZ2UiLCJkZWVwTGlua1NtdWRnZU9mZnNldCIsIl9hZGRLZXlIYW5kbGVyIiwiX2FkZENsaWNrSGFuZGxlciIsIl9zZXRIZWlnaHRNcUhhbmRsZXIiLCJfaGFuZGxlVGFiQ2hhbmdlIiwid2hpY2giLCJ3cmFwT25LZXlzIiwibGFzdCIsImhpc3RvcnlIYW5kbGVkIiwiYWN0aXZlQ29sbGFwc2UiLCIkb2xkVGFiIiwiJHRhYkxpbmsiLCIkdGFyZ2V0Q29udGVudCIsIl9jb2xsYXBzZVRhYiIsIl9vcGVuVGFiIiwicGFuZWxBY3RpdmVDbGFzcyIsIiR0YXJnZXRBbmNob3IiLCIkYWN0aXZlVGFiIiwiaWRTdHIiLCJoYXNoSWRTdHIiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJ0ZW1wIiwiaW5wdXQiLCJ0b2dnbGVyIiwiRXJyb3IiLCIkdHJpZ2dlciIsImNvbnRyb2xzIiwiY29udGFpbnNJZCIsIl91cGRhdGVBUklBIiwidW5kZWZpbmVkIiwiaXNDbGljayIsImVsZW1JZCIsInRpcFRleHQiLCJ0ZW1wbGF0ZSIsIl9idWlsZFRlbXBsYXRlIiwiYWxsb3dIdG1sIiwidGV4dCIsInRyaWdnZXJDbGFzcyIsImVsZW1lbnRDbGFzc05hbWUiLCJTVkdFbGVtZW50IiwiYmFzZVZhbCIsInRvb2x0aXBXaWR0aCIsInRvb2x0aXBIZWlnaHQiLCJ0ZW1wbGF0ZUNsYXNzZXMiLCJ0b29sdGlwQ2xhc3MiLCIkdGVtcGxhdGUiLCJzaG93T24iLCJmYWRlSW4iLCJmYWRlSW5EdXJhdGlvbiIsImZhZGVPdXQiLCJmYWRlT3V0RHVyYXRpb24iLCJpc0ZvY3VzIiwiZGlzYWJsZUZvclRvdWNoIiwidG91Y2hDbG9zZVRleHQiLCJsck9ubHkiLCJ0Yk9ubHkiLCJpZ25vcmVCb3R0b20iLCJlbGVEaW1zIiwidG9wT3ZlciIsImJvdHRvbU92ZXIiLCJsZWZ0T3ZlciIsInJpZ2h0T3ZlciIsInBhckRpbXMiLCJ3aW5kb3dEaW1zIiwic3FydCIsInJlY3QiLCJwYXJSZWN0IiwicGFyZW50Tm9kZSIsIndpblJlY3QiLCJ3aW5ZIiwid2luWCIsInBhZ2VYT2Zmc2V0IiwicGFyZW50RGltcyIsImlzT3ZlcmZsb3ciLCIkZWxlRGltcyIsIiRhbmNob3JEaW1zIiwibGVmdFZhbCIsImltYWdlcyIsInVubG9hZGVkIiwiY29tcGxldGUiLCJuYXR1cmFsV2lkdGgiLCJzaW5nbGVJbWFnZUxvYWRlZCIsImltYWdlIiwiSW1hZ2UiLCJldmVudHMiLCJtZSIsInNyYyIsImtleUNvZGVzIiwiY29tbWFuZHMiLCJzb3J0IiwiYSIsImIiLCJhVGFiSW5kZXgiLCJiVGFiSW5kZXgiLCJwYXJzZUtleSIsImtleUNvZGUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0b1VwcGVyQ2FzZSIsInNoaWZ0S2V5IiwiY3RybEtleSIsImFsdEtleSIsImdldEtleUNvZGVzIiwiY29tcG9uZW50IiwiY29tbWFuZExpc3QiLCJjbWRzIiwiY29tbWFuZCIsInpmSXNLZXlIYW5kbGVkIiwibHRyIiwicmV0dXJuVmFsdWUiLCJ1bmhhbmRsZWQiLCJjb21wb25lbnROYW1lIiwiJGZpcnN0Rm9jdXNhYmxlIiwiJGxhc3RGb2N1c2FibGUiLCJrY3MiLCJrIiwia2MiLCJtYXRjaE1lZGlhIiwic3R5bGVNZWRpYSIsIm1lZGlhIiwic2NyaXB0IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbmZvIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsIm1hdGNoTWVkaXVtIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJ0ZXh0Q29udGVudCIsIm1hdGNoZXMiLCJxdWVyaWVzIiwiaXNJbml0aWFsaXplZCIsInNlbGYiLCIkbWV0YSIsImV4dHJhY3RlZFN0eWxlcyIsIm5hbWVkUXVlcmllcyIsInBhcnNlU3R5bGVUb09iamVjdCIsIl9nZXRDdXJyZW50U2l6ZSIsIl93YXRjaGVyIiwiX3JlSW5pdCIsInNpemUiLCJxdWVyeSIsIm9ubHkiLCJ1cFRvIiwibmV4dFNpemUiLCJwYXJ0cyIsImJwU2l6ZSIsImJwTW9kaWZpZXIiLCJxdWVyeUluZGV4IiwiZmluZEluZGV4IiwicSIsIl9nZXRRdWVyeU5hbWUiLCJuZXh0UXVlcnkiLCJtYXRjaGVkIiwibmV3U2l6ZSIsImN1cnJlbnRTaXplIiwic3R5bGVPYmplY3QiLCJyZWR1Y2UiLCJyZXQiLCJwYXJhbSIsImRlY29kZVVSSUNvbXBvbmVudCIsImlzQXJyYXkiLCJpbml0Q2xhc3NlcyIsImFjdGl2ZUNsYXNzZXMiLCJhbmltYXRpb24iLCJkdXJhdGlvbiIsImFuaW0iLCJwcm9nIiwibW92ZSIsInRzIiwiaXNJbiIsImluaXRDbGFzcyIsInJlc2V0Iiwib2Zmc2V0V2lkdGgiLCJmaW5pc2giLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJtZW51IiwiaXRlbXMiLCJzdWJNZW51Q2xhc3MiLCJzdWJJdGVtQ2xhc3MiLCJoYXNTdWJDbGFzcyIsImFwcGx5QXJpYSIsIiRpdGVtIiwibmFtZVNwYWNlIiwicmVtYWluIiwiaXNQYXVzZWQiLCJyZXN0YXJ0IiwiaW5maW5pdGUiLCJwYXVzZSIsInN0YXJ0UG9zWCIsInN0YXJ0VGltZSIsImVsYXBzZWRUaW1lIiwic3RhcnRFdmVudCIsImlzTW92aW5nIiwiZGlkTW92ZWQiLCJvblRvdWNoRW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9uVG91Y2hNb3ZlIiwidGFwRXZlbnQiLCJFdmVudCIsInNwb3RTd2lwZSIsIngiLCJwYWdlWCIsImR4IiwiZGlyIiwiYWJzIiwibW92ZVRocmVzaG9sZCIsInRpbWVUaHJlc2hvbGQiLCJhc3NpZ24iLCJvblRvdWNoU3RhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsIlNwb3RTd2lwZSIsImVuYWJsZWQiLCJzcGVjaWFsIiwic3dpcGUiLCJzZXR1cCIsInRhcCIsIm5vb3AiLCJzZXR1cFNwb3RTd2lwZSIsInNldHVwVG91Y2hIYW5kbGVyIiwiYWRkVG91Y2giLCJoYW5kbGVUb3VjaCIsImNoYW5nZWRUb3VjaGVzIiwiZXZlbnRUeXBlcyIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsInNpbXVsYXRlZEV2ZW50IiwiTW91c2VFdmVudCIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJwcmVmaXhlcyIsInRyaWdnZXJzIiwiTGlzdGVuZXJzIiwiQmFzaWMiLCJHbG9iYWwiLCJJbml0aWFsaXplcnMiLCJvcGVuTGlzdGVuZXIiLCJjbG9zZUxpc3RlbmVyIiwidG9nZ2xlTGlzdGVuZXIiLCJjbG9zZWFibGVMaXN0ZW5lciIsInRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJhZGRPcGVuTGlzdGVuZXIiLCJhZGRDbG9zZUxpc3RlbmVyIiwiYWRkVG9nZ2xlTGlzdGVuZXIiLCJhZGRDbG9zZWFibGVMaXN0ZW5lciIsImFkZFRvZ2dsZUZvY3VzTGlzdGVuZXIiLCJyZXNpemVMaXN0ZW5lciIsIiRub2RlcyIsInNjcm9sbExpc3RlbmVyIiwiY2xvc2VNZUxpc3RlbmVyIiwicGx1Z2luSWQiLCJhZGRDbG9zZW1lTGlzdGVuZXIiLCJ5ZXRpQm94ZXMiLCJwbHVnTmFtZXMiLCJsaXN0ZW5lcnMiLCJkZWJvdW5jZUdsb2JhbExpc3RlbmVyIiwiZGVib3VuY2UiLCJsaXN0ZW5lciIsImFkZFJlc2l6ZUxpc3RlbmVyIiwiYWRkU2Nyb2xsTGlzdGVuZXIiLCJhZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyIiwibGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbiIsIm11dGF0aW9uUmVjb3Jkc0xpc3QiLCJhdHRyaWJ1dGVOYW1lIiwiZWxlbWVudE9ic2VydmVyIiwib2JzZXJ2ZSIsImF0dHJpYnV0ZXMiLCJjaGlsZExpc3QiLCJjaGFyYWN0ZXJEYXRhIiwic3VidHJlZSIsImF0dHJpYnV0ZUZpbHRlciIsImFkZFNpbXBsZUxpc3RlbmVycyIsIiRkb2N1bWVudCIsImFkZEdsb2JhbExpc3RlbmVycyIsIl9fIiwidHJpZ2dlcnNJbml0aWFsaXplZCIsIklIZWFyWW91Iiwid2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJyb290IiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImxvYWRlZCIsIm0iLCJjIiwiYXNrIiwiaWdub3JlS2V5cyIsInNwZWNpZmljS2V5cyIsInJlZ2lzdGVyT25DaGFuZ2UiLCJ1blJlZ2lzdGVyT25DaGFuZ2UiLCJkb2NFbGVtIiwiY3VycmVudEVsZW1lbnQiLCJjdXJyZW50SW5wdXQiLCJjdXJyZW50SW50ZW50IiwiY3VycmVudFRpbWVzdGFtcCIsInNob3VsZFBlcnNpc3QiLCJmb3JtSW5wdXRzIiwiZnVuY3Rpb25MaXN0IiwiaWdub3JlTWFwIiwic3BlY2lmaWNNYXAiLCJpbnB1dE1hcCIsImtleWRvd24iLCJrZXl1cCIsIm1vdXNlZG93biIsIm1vdXNlbW92ZSIsIk1TUG9pbnRlckRvd24iLCJNU1BvaW50ZXJNb3ZlIiwicG9pbnRlcmRvd24iLCJwb2ludGVybW92ZSIsImlzU2Nyb2xsaW5nIiwibW91c2VQb3MiLCJ5IiwicG9pbnRlck1hcCIsInN1cHBvcnRzUGFzc2l2ZSIsImRlZmluZVByb3BlcnR5Iiwic2V0VXAiLCJkZXRlY3RXaGVlbCIsImFkZExpc3RlbmVycyIsImNhcHR1cmUiLCJzZXRQZXJzaXN0IiwiUG9pbnRlckV2ZW50Iiwic2V0SW5wdXQiLCJzZXRJbnRlbnQiLCJNU1BvaW50ZXJFdmVudCIsInNldEVsZW1lbnQiLCJjbGVhckVsZW1lbnQiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJkb1VwZGF0ZSIsImV2ZW50S2V5IiwicG9pbnRlclR5cGUiLCJpZ25vcmVNYXRjaCIsInNwZWNpZmljTWF0Y2giLCJzaG91bGRVcGRhdGUiLCJ2YWxpZGF0ZVRvdWNoIiwicGVyc2lzdElucHV0IiwiYWN0aXZlRWxlbSIsIm5vdEZvcm1JbnB1dCIsIm5vZGVOYW1lIiwiY2hlY2tDbG9zZXN0IiwiZmlyZUZ1bmN0aW9ucyIsImRldGVjdFNjcm9sbGluZyIsImNsYXNzTGlzdCIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEl0ZW0iLCJ0aW1lc3RhbXAiLCJ0b3VjaElzVmFsaWQiLCJ3aGVlbFR5cGUiLCJvbm1vdXNld2hlZWwiLCJvYmpQb3MiLCJ0YWciLCJFbGVtZW50UHJvdG90eXBlIiwiRWxlbWVudCIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwicGFyZW50RWxlbWVudCIsIm5vZGVUeXBlIiwiYXJyIiwiY2xlYXJTdG9yYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==