(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["foundation"],{

/***/ "./node_modules/foundation-sites/js/foundation.accordionMenu.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.accordionMenu.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccordionMenu": () => (/* binding */ AccordionMenu)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_RIGHT': 'open',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'close',
        'ESCAPE': 'closeAll'
      });
    }
    /**
     * Initializes the accordion menu by hiding all nested menus.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__.Nest.Feather(this.$element, 'accordion');

      var _this = this;

      this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');

      this.$element.attr({
        'aria-multiselectable': this.options.multiOpen
      });
      this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
      this.$menuLinks.each(function () {
        var linkId = this.id || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'acc-menu-link'),
            $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            $sub = $elem.children('[data-submenu]'),
            subId = $sub[0].id || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'acc-menu'),
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
            'id': linkId
          });
        }

        $sub.attr({
          'aria-labelledby': linkId,
          'aria-hidden': !isActive,
          'role': 'group',
          'id': subId
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
    key: "_events",
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
        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement,
            $target = $element.children('[data-submenu]');
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
          open: function open() {
            if ($target.is(':hidden')) {
              _this.down($target);

              $target.find('li').first().find('a').first().focus();
            }
          },
          close: function close() {
            if ($target.length && !$target.is(':hidden')) {
              // close active sub of this item
              _this.up($target);
            } else if ($element.parent('[data-submenu]').length) {
              // close currently open sub
              _this.up($element.parent('[data-submenu]'));

              $element.parents('li').first().find('a').first().focus();
            }
          },
          up: function up() {
            $prevElement.focus();
            return true;
          },
          down: function down() {
            $nextElement.focus();
            return true;
          },
          toggle: function toggle() {
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
          handled: function handled(preventDefault) {
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
    key: "hideAll",
    value: function hideAll() {
      this.up(this.$element.find('[data-submenu]'));
    }
    /**
     * Opens all panes of the menu.
     * @function
     */

  }, {
    key: "showAll",
    value: function showAll() {
      this.down(this.$element.find('[data-submenu]'));
    }
    /**
     * Toggles the open/close state of a submenu.
     * @function
     * @param {jQuery} $target - the submenu to toggle
     */

  }, {
    key: "toggle",
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
    key: "down",
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
    key: "up",
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.core.js":
/*!*************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Foundation": () => (/* binding */ Foundation)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }




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
    plugin.uuid = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, pluginName);

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
        var type = _typeof(plugins),
            _this = this,
            fns = {
          'object': function object(plgs) {
            plgs.forEach(function (p) {
              p = hyphenate(p);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + p + ']').foundation('_init');
            });
          },
          'string': function string() {
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
  reflow: function reflow(elem, plugins) {
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
        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
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
  getFnName: functionName,
  addToJquery: function addToJquery() {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize

    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function foundation(method) {
      var type = _typeof(method),
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
          args = arguments;

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
      now: function now() {
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

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function fNOP() {},
        fBound = function fBound() {
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
  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
} // Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580


function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.core.plugin.js":
/*!********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.plugin.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plugin": () => (/* binding */ Plugin)
/* harmony export */ });
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

 // Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)

var Plugin = /*#__PURE__*/function () {
  function Plugin(element, options) {
    _classCallCheck(this, Plugin);

    this._setup(element, options);

    var pluginName = getPluginName(this);
    this.uuid = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__.GetYoDigits)(6, pluginName);

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
    key: "destroy",
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.core.utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.core.utils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetYoDigits": () => (/* binding */ GetYoDigits),
/* harmony export */   "RegExpEscape": () => (/* binding */ RegExpEscape),
/* harmony export */   "ignoreMousedisappear": () => (/* binding */ ignoreMousedisappear),
/* harmony export */   "onLoad": () => (/* binding */ onLoad),
/* harmony export */   "rtl": () => (/* binding */ rtl),
/* harmony export */   "transitionend": () => (/* binding */ transitionend)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
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
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
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
    if (didLoad) setTimeout(cb);else jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', cb);
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
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ignoreLeaveWindo = _ref.ignoreLeaveWindow,
      ignoreLeaveWindow = _ref$ignoreLeaveWindo === void 0 ? false : _ref$ignoreLeaveWindo,
      _ref$ignoreReappear = _ref.ignoreReappear,
      ignoreReappear = _ref$ignoreReappear === void 0 ? false : _ref$ignoreReappear;

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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.drilldown.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.drilldown.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Drilldown": () => (/* binding */ Drilldown)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







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
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */

  }, {
    key: "_init",
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
      this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'drilldown'));

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
    key: "_prepareMenu",
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
          'tabindex': 0,
          'role': 'group'
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
    key: "_resize",
    value: function _resize() {
      this.$wrapper.css({
        'max-width': 'none',
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
    key: "_events",
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
    key: "_registerEvents",
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
    key: "_scrollTop",
    value: function _scrollTop() {
      var _this = this;

      var $scrollTopElement = _this.options.scrollTopElement !== '' ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.scrollTopElement) : _this.$element,
          scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
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
    key: "_keyboardEvents",
    value: function _keyboardEvents() {
      var _this = this;

      this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
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
          next: function next() {
            if ($element.is(_this.$submenuAnchors)) {
              _this._show($element.parent('li'));

              $element.parent('li').one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
              });
              return true;
            }
          },
          previous: function previous() {
            _this._hide($element.parent('li').parent('ul'));

            $element.parent('li').parent('ul').one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
              setTimeout(function () {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
            return true;
          },
          up: function up() {
            $prevElement.focus(); // Don't tap focus on first element in root ul

            return !$element.is(_this.$element.find('> li:first-child > a'));
          },
          down: function down() {
            $nextElement.focus(); // Don't tap focus on last element in root ul

            return !$element.is(_this.$element.find('> li:last-child > a'));
          },
          close: function close() {
            // Don't close on element in root ul
            if (!$element.is(_this.$element.find('> li > a'))) {
              _this._hide($element.parent().parent());

              $element.parent().parent().siblings('a').focus();
            }
          },
          open: function open() {
            if (_this.options.parentLink && $element.attr('href')) {
              // Link with href
              return false;
            } else if (!$element.is(_this.$menuItems)) {
              // not menu item means back button
              _this._hide($element.parent('li').parent('ul'));

              $element.parent('li').parent('ul').one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
                setTimeout(function () {
                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                }, 1);
              });
              return true;
            } else if ($element.is(_this.$submenuAnchors)) {
              // Sub menu item
              _this._show($element.parent('li'));

              $element.parent('li').one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($element), function () {
                $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
              });
              return true;
            }
          },
          handled: function handled(preventDefault) {
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
    key: "_hideAll",
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
      $elem.one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($elem), function () {
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
    key: "_back",
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
    key: "_menuLinkEvents",
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
    key: "_setShowSubMenuClasses",
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
    key: "_setHideSubMenuClasses",
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
    key: "_showMenu",
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
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)), function () {
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
    key: "_show",
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
    key: "_hide",
    value: function _hide($elem) {
      if (this.options.autoHeight) this.$wrapper.css({
        height: $elem.parent().closest('ul').data('calcHeight')
      });
      $elem.parent().closest('ul').removeClass('invisible');
      $elem.parent('li').attr('aria-expanded', false);
      $elem.attr('aria-hidden', true);
      $elem.addClass('is-closing').one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.transitionend)($elem), function () {
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
    key: "_getMaxDims",
    value: function _getMaxDims() {
      var maxHeight = 0,
          result = {},
          _this = this; // Recalculate menu heights and total max height


      this.$submenus.add(this.$element).each(function () {
        var height = _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__.Box.GetDimensions(this).height;
        maxHeight = height > maxHeight ? height : maxHeight;

        if (_this.options.autoHeight) {
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight', height);
        }
      });
      if (this.options.autoHeight) result.height = this.$currentMenu.data('calcHeight');else result['min-height'] = "".concat(maxHeight, "px");
      result['max-width'] = "".concat(this.$element[0].getBoundingClientRect().width, "px");
      return result;
    }
    /**
     * Destroys the Drilldown Menu
     * @function
     */

  }, {
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.dropdown.js":
/*!*****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.dropdown.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dropdown": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.positionable */ "./node_modules/foundation-sites/js/foundation.positionable.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







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
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
     * @function
     * @private
     */

  }, {
    key: "_init",
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
          this.$currentAnchor.attr('id', (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'dd-anchor'));
        }

        this.$element.attr('aria-labelledby', this.$currentAnchor.attr('id'));
      }

      this.$element.attr({
        'aria-hidden': 'true',
        'data-yeti-box': $id,
        'data-resize': $id
      });

      _get(_getPrototypeOf(Dropdown.prototype), "_init", this).call(this);

      this._events();
    }
  }, {
    key: "_getDefaultPosition",
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
    key: "_getDefaultAlignment",
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
    key: "_setPosition",
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
    key: "_setCurrentAnchor",
    value: function _setCurrentAnchor(el) {
      this.$currentAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
    }
    /**
     * Adds event listeners to the element utilizing the triggers utility library.
     * @function
     * @private
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this,
          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined';

      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
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
        }).on('mouseleave.zf.dropdown', (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            _this.close();

            _this.$anchors.data('hover', false);
          }, _this.options.hoverDelay);
        }));

        if (this.options.hoverPane) {
          this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
            clearTimeout(_this.timeout);
          }).on('mouseleave.zf.dropdown', (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
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
          open: function open() {
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
    key: "_addBodyHandler",
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
    key: "open",
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
    key: "close",
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
    key: "toggle",
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js":
/*!*********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.dropdownMenu.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropdownMenu": () => (/* binding */ DropdownMenu)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








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
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }
    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */

  }, {
    key: "_init",
    value: function _init() {
      _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__.Nest.Feather(this.$element, 'dropdown');
      var subs = this.$element.find('li.is-dropdown-submenu-parent');
      this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');
      this.$menuItems = this.$element.find('li[role="none"]');
      this.$tabs = this.$element.children('li[role="none"]');
      this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

      if (this.options.alignment === 'auto') {
        if (this.$element.hasClass(this.options.rightClass) || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() || this.$element.parents('.top-bar-right').is('*')) {
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
    key: "_isVertical",
    value: function _isVertical() {
      return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
    }
  }, {
    key: "_isRtl",
    value: function _isRtl() {
      return this.$element.hasClass('align-right') || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() && !this.$element.hasClass('align-left');
    }
    /**
     * Adds event listeners to elements within the menu
     * @private
     * @function
     */

  }, {
    key: "_events",
    value: function _events() {
      var _this = this,
          hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
          parClass = 'is-dropdown-submenu-parent'; // used for onClick and in the keyboard handlers


      var handleClickFn = function handleClickFn(e) {
        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', ".".concat(parClass)),
            hasSub = $elem.hasClass(parClass),
            hasClicked = $elem.attr('data-is-click') === 'true',
            $sub = $elem.children('.is-dropdown-submenu');

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
          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
              hasSub = $elem.hasClass(parClass);

          if (!hasSub) {
            _this._hide();
          }
        });
      }

      if (hasTouch && this.options.disableHoverOnTouch) this.options.disableHover = true;

      if (!this.options.disableHover) {
        this.$menuItems.on('mouseenter.zf.dropdownMenu', function () {
          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
              hasSub = $elem.hasClass(parClass);

          if (hasSub) {
            clearTimeout($elem.data('_delay'));
            $elem.data('_delay', setTimeout(function () {
              _this._show($elem.children('.is-dropdown-submenu'));
            }, _this.options.hoverDelay));
          }
        }).on('mouseleave.zf.dropdownMenu', (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.ignoreMousedisappear)(function () {
          var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
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
        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', '[role="none"]'),
            isTab = _this.$tabs.index($element) > -1,
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
            openSub = function openSub() {
          var $sub = $element.children('ul.is-dropdown-submenu');

          if ($sub.length) {
            _this._show($sub);

            $element.find('li > a:first').focus();
            e.preventDefault();
          } else {
            return;
          }
        },
            closeSub = function closeSub() {
          //if ($element.is(':first-child')) {
          var close = $element.parent('ul').parent('li');
          close.children('a:first').focus();

          _this._hide(close);

          e.preventDefault(); //}
        };

        var functions = {
          open: openSub,
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
                down: nextSibling,
                up: prevSibling,
                next: closeSub,
                previous: openSub
              });
            } else {
              // left aligned
              jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
                down: nextSibling,
                up: prevSibling,
                next: openSub,
                previous: closeSub
              });
            }
          } else {
            // horizontal menu
            if (_this._isRtl()) {
              // right aligned
              jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
                next: prevSibling,
                previous: nextSibling,
                down: openSub,
                up: closeSub
              });
            } else {
              // left aligned
              jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
                next: nextSibling,
                previous: prevSibling,
                down: openSub,
                up: closeSub
              });
            }
          }
        } else {
          // not tabs -> one sub
          if (_this._isRtl()) {
            // right aligned
            jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
              next: closeSub,
              previous: openSub,
              down: nextSibling,
              up: prevSibling
            });
          } else {
            // left aligned
            jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(functions, {
              next: openSub,
              previous: closeSub,
              down: nextSibling,
              up: prevSibling
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
    key: "_addBodyHandler",
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
    key: "_removeBodyHandler",
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
    key: "_show",
    value: function _show($sub) {
      var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
        return jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find($sub).length > 0;
      }));
      var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

      this._hide($sibs, idx);

      $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');
      var clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__.Box.ImNotTouchingYou($sub, null, true);

      if (!clear) {
        var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
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
    key: "_hide",
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.equalizer.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.equalizer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Equalizer": () => (/* binding */ Equalizer)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
    key: "_init",
    value: function _init() {
      var eqId = this.$element.attr('data-equalizer') || '';
      var $watched = this.$element.find("[data-equalizer-watch=\"".concat(eqId, "\"]"));

      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__.MediaQuery._init();

      this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
      this.$element.attr('data-resize', eqId || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'eq'));
      this.$element.attr('data-mutate', eqId || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.GetYoDigits)(6, 'eq'));
      this.hasNested = this.$element.find('[data-equalizer]').length > 0;
      this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
      this.isOn = false;
      this._bindHandler = {
        onResizeMeBound: this._onResizeMe.bind(this),
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
          (0,_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__.onImagesLoaded)(imgs, this._reflow.bind(this));
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
    key: "_pauseEvents",
    value: function _pauseEvents() {
      this.isOn = false;
      this.$element.off({
        '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
        'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
        'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
      });
    }
    /**
     * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
     * @private
     */

  }, {
    key: "_onResizeMe",
    value: function _onResizeMe() {
      this._reflow();
    }
    /**
     * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
     * @private
     */

  }, {
    key: "_onPostEqualized",
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
    key: "_events",
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
    key: "_checkMQ",
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
    key: "_killswitch",
    value: function _killswitch() {
      return;
    }
    /**
     * Calls necessary functions to update Equalizer upon DOM change
     * @private
     */

  }, {
    key: "_reflow",
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
    key: "_isStacked",
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
    key: "getHeights",
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
    key: "getHeightsByRow",
    value: function getHeightsByRow(cb) {
      var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
          groups = [],
          group = 0; //group by Row

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
    key: "applyHeight",
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
    key: "applyHeightByRow",
    value: function applyHeightByRow(groups) {
      /**
       * Fires before the heights are applied
       */
      this.$element.trigger('preequalized.zf.equalizer');

      for (var i = 0, len = groups.length; i < len; i++) {
        var groupsILength = groups[i].length,
            max = groups[i][groupsILength - 1];

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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.magellan.js":
/*!*****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.magellan.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Magellan": () => (/* binding */ Magellan)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.smoothScroll */ "./node_modules/foundation-sites/js/foundation.smoothScroll.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
    key: "_init",
    value: function _init() {
      var id = this.$element[0].id || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'magellan');
      this.$targets = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-magellan-target]');
      this.$links = this.$element.find('a');
      this.$element.attr({
        'data-resize': id,
        'data-scroll': id,
        'id': id
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
    key: "calcPoints",
    value: function calcPoints() {
      var _this = this,
          body = document.body,
          html = document.documentElement;

      this.points = [];
      this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
      this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
      this.$targets.each(function () {
        var $tar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            pt = Math.round($tar.offset().top - _this.options.threshold);
        $tar.targetPoint = pt;

        _this.points.push(pt);
      });
    }
    /**
     * Initializes events for Magellan.
     * @private
     */

  }, {
    key: "_events",
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
      _this.onLoadListener = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
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
    key: "scrollToLoc",
    value: function scrollToLoc(loc) {
      this._inTransition = true;

      var _this = this;

      var options = {
        animationEasing: this.options.animationEasing,
        animationDuration: this.options.animationDuration,
        threshold: this.options.threshold,
        offset: this.options.offset
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
    key: "reflow",
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
    key: "_updateActive",
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.offcanvas.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.offcanvas.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OffCanvas": () => (/* binding */ OffCanvas)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







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
        base: [],
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
    key: "_init",
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


      var revealOnRegExp = new RegExp((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.RegExpEscape)(this.options.revealClass) + '([^\\s]+)', 'g');
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
    key: "_events",
    value: function _events() {
      var _this3 = this;

      this.$element.off('.zf.trigger .zf.offCanvas').on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': this.close.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this),
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
    key: "_setMQChecker",
    value: function _setMQChecker() {
      var _this = this;

      this.onLoadListener = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
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
    key: "_checkInCanvas",
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
    key: "_removeContentClasses",
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
    key: "_addContentClasses",
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
    key: "_fixStickyElements",
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
            top: "".concat(absoluteTopVal, "px"),
            width: '100%',
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
    key: "_unfixStickyElements",
    value: function _unfixStickyElements() {
      this.$sticky.each(function (_, el) {
        var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
        var stickyData = $el.data('offCanvasSticky'); // If sticky element has got data object with prior values (meaning it was originally fixed) restore these values once off-canvas is closed

        if (_typeof(stickyData) === 'object') {
          $el.css({
            top: "".concat(stickyData.top, "px"),
            width: '',
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
    key: "reveal",
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
          'open.zf.trigger': this.open.bind(this),
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
    key: "_stopScrolling",
    value: function _stopScrolling() {
      return false;
    }
    /**
     * Save current finger y-position
     * @param event
     * @private
     */

  }, {
    key: "_recordScrollable",
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
    key: "_preventDefaultAtEdges",
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
    key: "_scrollboxTouchMoved",
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
    key: "_canScroll",
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
    key: "open",
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
        this.$element.one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
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

      this.$element.one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
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
    key: "close",
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

      this.$element.one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.transitionend)(this.$element), function () {
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
    key: "toggle",
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
    key: "_handleKeyboard",
    value: function _handleKeyboard(e) {
      var _this6 = this;

      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.handleKey(e, 'OffCanvas', {
        close: function close() {
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.positionable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.positionable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Positionable": () => (/* binding */ Positionable)
/* harmony export */ });
/* harmony import */ var _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var POSITIONS = ['left', 'right', 'top', 'bottom'];
var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];
var ALIGNMENTS = {
  'left': VERTICAL_ALIGNMENTS,
  'right': VERTICAL_ALIGNMENTS,
  'top': HORIZONTAL_ALIGNMENTS,
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
    key: "_getDefaultPosition",
    value: function _getDefaultPosition() {
      return 'bottom';
    }
  }, {
    key: "_getDefaultAlignment",
    value: function _getDefaultAlignment() {
      switch (this.position) {
        case 'bottom':
        case 'top':
          return (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.rtl)() ? 'right' : 'left';

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
    key: "_reposition",
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
    key: "_realign",
    value: function _realign() {
      this._addTriedPosition(this.position, this.alignment);

      this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
    }
  }, {
    key: "_addTriedPosition",
    value: function _addTriedPosition(position, alignment) {
      this.triedPositions[position] = this.triedPositions[position] || [];
      this.triedPositions[position].push(alignment);
    }
  }, {
    key: "_positionsExhausted",
    value: function _positionsExhausted() {
      var isExhausted = true;

      for (var i = 0; i < POSITIONS.length; i++) {
        isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
      }

      return isExhausted;
    }
  }, {
    key: "_alignmentsExhausted",
    value: function _alignmentsExhausted(position) {
      return this.triedPositions[position] && this.triedPositions[position].length === ALIGNMENTS[position].length;
    } // When we're trying to center, we don't want to apply offset that's going to
    // take us just off center, so wrap around to return 0 for the appropriate
    // offset in those alignments.  TODO: Figure out if we want to make this
    // configurable behavior... it feels more intuitive, especially for tooltips, but
    // it's possible someone might actually want to start from center and then nudge
    // slightly off.

  }, {
    key: "_getVOffset",
    value: function _getVOffset() {
      return this.options.vOffset;
    }
  }, {
    key: "_getHOffset",
    value: function _getHOffset() {
      return this.options.hOffset;
    }
  }, {
    key: "_setPosition",
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
          position: this.position,
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
              position: this.position,
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.responsiveMenu.js":
/*!***********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.responsiveMenu.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResponsiveMenu": () => (/* binding */ ResponsiveMenu)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.dropdownMenu */ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
/* harmony import */ var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.drilldown */ "./node_modules/foundation-sites/js/foundation.drilldown.js");
/* harmony import */ var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.accordionMenu */ "./node_modules/foundation-sites/js/foundation.accordionMenu.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








var MenuPlugins = {
  dropdown: {
    cssClass: 'dropdown',
    plugin: _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenu
  },
  drilldown: {
    cssClass: 'drilldown',
    plugin: _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__.Drilldown
  },
  accordion: {
    cssClass: 'accordion-menu',
    plugin: _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__.AccordionMenu
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
    key: "_init",
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


      this.$element.attr('data-mutate', this.$element.attr('data-mutate') || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.GetYoDigits)(6, 'responsive-menu'));
    }
    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */

  }, {
    key: "_events",
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
    key: "_checkMediaQueries",
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
    key: "_destroy",
    value: function _destroy() {
      this.currentPlugin.destroy();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('.zf.ResponsiveMenu');
    }
  }]);

  return ResponsiveMenu;
}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__.Plugin);

ResponsiveMenu.defaults = {};


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.reveal.js":
/*!***************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.reveal.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Reveal": () => (/* binding */ Reveal)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony import */ var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









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
    key: "_init",
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
        'tabindex': 0
      });

      if (this.options.fullScreen || this.$element.hasClass('full')) {
        this.options.fullScreen = true;
        this.options.overlay = false;
      }

      if (this.options.overlay && !this.$overlay) {
        this.$overlay = this._makeOverlay(this.id);
      }

      this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
      });

      if (this.$overlay) {
        this.$element.detach().appendTo(this.$overlay);
      } else {
        this.$element.detach().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));
        this.$element.addClass('without-overlay');
      }

      this._events();

      if (this.options.deepLink && window.location.hash === "#".concat(this.id)) {
        this.onLoadListener = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
          return _this2.open();
        });
      }
    }
    /**
     * Creates an overlay div to display behind the modal.
     * @private
     */

  }, {
    key: "_makeOverlay",
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
    key: "_updatePosition",
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
    key: "_events",
    value: function _events() {
      var _this3 = this;

      var _this = this;

      this.$element.on({
        'open.zf.trigger': this.open.bind(this),
        'close.zf.trigger': function closeZfTrigger(event, $element) {
          if (event.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('[data-closable]')[0] === $element) {
            // only close reveal when it's explicitly called
            return _this3.close.apply(_this3);
          }
        },
        'toggle.zf.trigger': this.toggle.bind(this),
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
    key: "_handleState",
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
    key: "_disableScroll",
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
    key: "_enableScroll",
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
    key: "open",
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
            'tabindex': -1
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
        'tabindex': -1
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
    key: "_addGlobalClasses",
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
    key: "_removeGlobalClasses",
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
    key: "_addGlobalListeners",
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
    key: "close",
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
    key: "toggle",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.smoothScroll.js":
/*!*********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.smoothScroll.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmoothScroll": () => (/* binding */ SmoothScroll)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




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
    key: "_init",
    value: function _init() {
      var id = this.$element[0].id || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'smooth-scroll');
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
    key: "_events",
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
    key: "_handleLinkClick",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.tabs.js":
/*!*************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.tabs.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tabs": () => (/* binding */ Tabs)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous' // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'

      });
    }
    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */

  }, {
    key: "_init",
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
        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            $link = $elem.find('a'),
            isActive = $elem.hasClass("".concat(_this.options.linkActiveClass)),
            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
            linkId = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
            $tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(hash));
        $elem.attr({
          'role': 'presentation'
        });
        $link.attr({
          'role': 'tab',
          'aria-controls': hash,
          'aria-selected': isActive,
          'id': linkId,
          'tabindex': isActive ? '0' : '-1'
        });
        $tabContent.attr({
          'role': 'tabpanel',
          'aria-labelledby': linkId
        }); // Save up the initial hash to return to it later when going back in history

        if (isActive) {
          _this._initialAnchor = "#".concat(hash);
        }

        if (!isActive) {
          $tabContent.attr('aria-hidden', 'true');
        }

        if (isActive && _this.options.autoFocus) {
          _this.onLoadListener = (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
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
          (0,_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__.onImagesLoaded)($images, this._setHeight.bind(this));
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
    key: "_events",
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
    key: "_addClickHandler",
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
    key: "_addKeyHandler",
    value: function _addKeyHandler() {
      var _this = this;

      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
        if (e.which === 9) return;
        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
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
          open: function open() {
            $element.find('[role="tab"]').focus();

            _this._handleTabChange($element);
          },
          previous: function previous() {
            $prevElement.find('[role="tab"]').focus();

            _this._handleTabChange($prevElement);
          },
          next: function next() {
            $nextElement.find('[role="tab"]').focus();

            _this._handleTabChange($nextElement);
          },
          handled: function handled() {
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
    key: "_handleTabChange",
    value: function _handleTabChange($target, historyHandled) {
      // With `activeCollapse`, if the target is the active Tab, collapse it.
      if ($target.hasClass("".concat(this.options.linkActiveClass))) {
        if (this.options.activeCollapse) {
          this._collapse();
        }

        return;
      }

      var $oldTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
          $tabLink = $target.find('[role="tab"]'),
          target = $tabLink.attr('data-tabs-target'),
          anchor = target && target.length ? "#".concat(target) : $tabLink[0].hash,
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
    key: "_openTab",
    value: function _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find("#".concat(hash));
      $target.addClass("".concat(this.options.linkActiveClass));
      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });
      $targetContent.addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
    }
    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to collapse.
     * @function
     */

  }, {
    key: "_collapseTab",
    value: function _collapseTab($target) {
      var $targetAnchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
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
    key: "_collapse",
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
    key: "selectTab",
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
      var max = 0,
          _this = this; // Lock down the `this` value for the root tabs object


      if (!this.$tabContent) {
        return;
      }

      this.$tabContent.find(".".concat(this.options.panelClass)).css('min-height', '').each(function () {
        var panel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
            isActive = panel.hasClass("".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({
            'visibility': 'hidden',
            'display': 'block'
          });
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.toggler.js":
/*!****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.toggler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toggler": () => (/* binding */ Toggler)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.core.plugin */ "./node_modules/foundation-sites/js/foundation.core.plugin.js");
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
    key: "_init",
    value: function _init() {
      // Collect triggers to set ARIA attributes to
      var id = this.$element[0].id,
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
        var containsId = new RegExp("\\b".concat((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__.RegExpEscape)(id), "\\b")).test(controls);
        if (!containsId) $trigger.attr('aria-controls', controls ? "".concat(controls, " ").concat(id) : id);
      });
    }
    /**
     * Initializes events for the toggle trigger.
     * @function
     * @private
     */

  }, {
    key: "_events",
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
    key: "toggle",
    value: function toggle() {
      this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
    }
  }, {
    key: "_toggleClass",
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
    key: "_toggleAnimate",
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
    key: "_updateARIA",
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
    key: "_destroy",
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


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.tooltip.js":
/*!****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.tooltip.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony import */ var _foundation_positionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation.positionable */ "./node_modules/foundation-sites/js/foundation.positionable.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






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
    key: "_init",
    value: function _init() {
      _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__.MediaQuery._init();

      var elemId = this.$element.attr('aria-describedby') || (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'tooltip');
      this.options.tipText = this.options.tipText || this.$element.attr('title');
      this.template = this.options.template ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.template) : this._buildTemplate(elemId);

      if (this.options.allowHtml) {
        this.template.appendTo(document.body).html(this.options.tipText).hide();
      } else {
        this.template.appendTo(document.body).text(this.options.tipText).hide();
      }

      this.$element.attr({
        'title': '',
        'aria-describedby': elemId,
        'data-yeti-box': elemId,
        'data-toggle': elemId,
        'data-resize': elemId
      }).addClass(this.options.triggerClass);

      _get(_getPrototypeOf(Tooltip.prototype), "_init", this).call(this);

      this._events();
    }
  }, {
    key: "_getDefaultPosition",
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
    key: "_getDefaultAlignment",
    value: function _getDefaultAlignment() {
      return 'center';
    }
  }, {
    key: "_getHOffset",
    value: function _getHOffset() {
      if (this.position === 'left' || this.position === 'right') {
        return this.options.hOffset + this.options.tooltipWidth;
      } else {
        return this.options.hOffset;
      }
    }
  }, {
    key: "_getVOffset",
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
    key: "_buildTemplate",
    value: function _buildTemplate(id) {
      var templateClasses = "".concat(this.options.tooltipClass, " ").concat(this.options.templateClasses).trim();
      var $template = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass(templateClasses).attr({
        'role': 'tooltip',
        'aria-hidden': true,
        'data-is-active': false,
        'data-is-focus': false,
        'id': id
      });
      return $template;
    }
    /**
     * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
     * if the tooltip is larger than the screen width, default to full width - any user selected margin
     * @private
     */

  }, {
    key: "_setPosition",
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
    key: "show",
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
        'aria-hidden': false
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
    key: "hide",
    value: function hide() {
      var _this = this;

      this.template.stop().attr({
        'aria-hidden': true,
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
    key: "_events",
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
        }).on('mouseleave.zf.tooltip', (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.ignoreMousedisappear)(function () {
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
    key: "toggle",
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
    key: "_destroy",
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
  tipText: '',
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.box.js":
/*!*****************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.box.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box)
/* harmony export */ });
var Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  OverlapArea: OverlapArea,
  GetDimensions: GetDimensions,
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

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;
  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
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
  var $eleDims = GetDimensions(element),
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
    top: topVal,
    left: leftVal
  };
}



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js":
/*!*************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.imageLoader.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onImagesLoaded": () => (/* binding */ onImagesLoaded)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.keyboard.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.keyboard.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/


var keyCodes = {
  9: 'TAB',
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
        keyCode = this.parseKey(event),
        cmds,
        command,
        fn;
    if (!commandList) return console.warn('Component not defined!'); // Ignore the event if it was already handled

    if (event.zfIsKeyHandled === true) return; // This component does not differentiate between ltr and rtl

    if (typeof commandList.ltr === 'undefined') {
      cmds = commandList; // use plain list
    } else {
      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
      if ((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.rtl)()) cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, commandList.ltr, commandList.rtl);else cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, commandList.rtl, commandList.ltr);
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
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js":
/*!************************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.mediaQuery.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaQuery": () => (/* binding */ MediaQuery)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    var style = document.createElement('style'),
        script = document.getElementsByTagName('script')[0],
        info = null;
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
      media: media || 'all'
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
          name: key,
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

    var _parts = _slicedToArray(parts, 2),
        bpSize = _parts[0],
        _parts$ = _parts[1],
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
      var newSize = _this2._getCurrentSize(),
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.motion.js":
/*!********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.motion.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Motion": () => (/* binding */ Motion),
/* harmony export */   "Move": () => (/* binding */ Move)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");


/**
 * Motion module.
 * @module foundation.motion
 */

var initClasses = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];
var Motion = {
  animateIn: function animateIn(element, animation, cb) {
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

  element.one((0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.transitionend)(element), finish); // Hides the element (for out animations), resets the element, and runs a callback

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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.nest.js":
/*!******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.nest.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Nest": () => (/* binding */ Nest)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var Nest = {
  Feather: function Feather(menu) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';
    menu.attr('role', 'menubar');
    menu.find('a').attr({
      'role': 'menuitem'
    });
    var items = menu.find('li').attr({
      'role': 'none'
    }),
        subMenuClass = "is-".concat(type, "-submenu"),
        subItemClass = "".concat(subMenuClass, "-item"),
        hasSubClass = "is-".concat(type, "-submenu-parent"),
        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

    items.each(function () {
      var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item.addClass(hasSubClass);

        if (applyAria) {
          $item.children('a:first').attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
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
          'role': 'menubar'
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
  Burn: function Burn(menu, type) {
    var //items = menu.find('li'),
    subMenuClass = "is-".concat(type, "-submenu"),
        subItemClass = "".concat(subMenuClass, "-item"),
        hasSubClass = "is-".concat(type, "-submenu-parent");
    menu.find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').removeClass("".concat(subMenuClass, " ").concat(subItemClass, " ").concat(hasSubClass, " is-submenu-item submenu is-active")).removeAttr('data-submenu').css('display', '');
  }
};


/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.timer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.timer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timer": () => (/* binding */ Timer)
/* harmony export */ });
function Timer(elem, options, cb) {
  var _this = this,
      duration = options.duration,
      //options is an object for easily adding features later.
  nameSpace = Object.keys(elem.data())[0] || 'timer',
      remain = -1,
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.touch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.touch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Touch": () => (/* binding */ Touch)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
    key: "_init",
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
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup'
      },
          type = eventTypes[event.type],
          simulatedEvent;

      if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
        simulatedEvent = new window.MouseEvent(type, {
          'bubbles': true,
          'cancelable': true,
          'screenX': first.screenX,
          'screenY': first.screenY,
          'clientX': first.clientX,
          'clientY': first.clientY
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



/***/ }),

/***/ "./node_modules/foundation-sites/js/foundation.util.triggers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/foundation-sites/js/foundation.util.triggers.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Triggers": () => (/* binding */ Triggers)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }





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
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
};
Triggers.Listeners.Basic = {
  openListener: function openListener() {
    triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'open');
  },
  closeListener: function closeListener() {
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('close');

    if (id) {
      triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'close');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function toggleListener() {
    var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');

    if (id) {
      triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function closeableListener(e) {
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
  resizeListener: function resizeListener($nodes) {
    if (!MutationObserver) {
      //fallback for IE 9
      $nodes.each(function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('resizeme.zf.trigger');
      });
    } //trigger all listening elements and signal a resize event


    $nodes.attr('data-events', "resize");
  },
  scrollListener: function scrollListener($nodes) {
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
        attributes: true,
        childList: true,
        characterData: false,
        subtree: true,
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
  (0,_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
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



/***/ }),

/***/ "./node_modules/what-input/dist/what-input.js":
/*!****************************************************!*\
  !*** ./node_modules/what-input/dist/what-input.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.2.12
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 0 : _typeof(exports)) === 'object' && ( false ? 0 : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
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
            ignoreKeys: function ignoreKeys() {},
            // no-op
            specificKeys: function specificKeys() {},
            // no-op
            registerOnChange: function registerOnChange() {},
            // no-op
            unRegisterOnChange: function unRegisterOnChange() {}
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
          keydown: 'keyboard',
          keyup: 'keyboard',
          mousedown: 'mouse',
          mousemove: 'mouse',
          MSPointerDown: 'pointer',
          MSPointerMove: 'pointer',
          pointerdown: 'pointer',
          pointermove: 'pointer',
          touchstart: 'touch',
          touchend: 'touch' // boolean: true if the page is being scrolled

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
        } catch (e) {} // fail silently

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
          registerOnChange: function registerOnChange(fn, eventType) {
            functionList.push({
              fn: fn,
              type: eventType || 'input'
            });
          },
          unRegisterOnChange: function unRegisterOnChange(fn) {
            var position = objPos(fn);

            if (position || position === 0) {
              functionList.splice(position, 1);
            }
          },
          clearStorage: function clearStorage() {
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

/***/ }),

/***/ "./src/media/com_knowres/js/src/foundation/foundation.js":
/*!***************************************************************!*\
  !*** ./src/media/com_knowres/js/src/foundation/foundation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Foundation": () => (/* reexport safe */ _node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation)
/* harmony export */ });
/* harmony import */ var _node_modules_foundation_sites_js_foundation_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.core */ "./node_modules/foundation-sites/js/foundation.core.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.core.utils */ "./node_modules/foundation-sites/js/foundation.core.utils.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.box */ "./node_modules/foundation-sites/js/foundation.util.box.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.imageLoader */ "./node_modules/foundation-sites/js/foundation.util.imageLoader.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.keyboard */ "./node_modules/foundation-sites/js/foundation.util.keyboard.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.mediaQuery */ "./node_modules/foundation-sites/js/foundation.util.mediaQuery.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.motion */ "./node_modules/foundation-sites/js/foundation.util.motion.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_nest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.nest */ "./node_modules/foundation-sites/js/foundation.util.nest.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.timer */ "./node_modules/foundation-sites/js/foundation.util.timer.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_touch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.touch */ "./node_modules/foundation-sites/js/foundation.util.touch.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_util_triggers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.util.triggers */ "./node_modules/foundation-sites/js/foundation.util.triggers.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.dropdown */ "./node_modules/foundation-sites/js/foundation.dropdown.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.dropdownMenu */ "./node_modules/foundation-sites/js/foundation.dropdownMenu.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_equalizer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.equalizer */ "./node_modules/foundation-sites/js/foundation.equalizer.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_magellan__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.magellan */ "./node_modules/foundation-sites/js/foundation.magellan.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.offcanvas */ "./node_modules/foundation-sites/js/foundation.offcanvas.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.responsiveMenu */ "./node_modules/foundation-sites/js/foundation.responsiveMenu.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_reveal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.reveal */ "./node_modules/foundation-sites/js/foundation.reveal.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_tabs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.tabs */ "./node_modules/foundation-sites/js/foundation.tabs.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_toggler__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.toggler */ "./node_modules/foundation-sites/js/foundation.toggler.js");
/* harmony import */ var _node_modules_foundation_sites_js_foundation_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../../node_modules/foundation-sites/js/foundation.tooltip */ "./node_modules/foundation-sites/js/foundation.tooltip.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
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



/***/ }),

/***/ "./webpack.build.foundation.js":
/*!*************************************!*\
  !*** ./webpack.build.foundation.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var npm_what_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! npm/what-input */ "./node_modules/what-input/dist/what-input.js");
/* harmony import */ var npm_what_input__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(npm_what_input__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mediajs_foundation_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mediajs/foundation/foundation */ "./src/media/com_knowres/js/src/foundation/foundation.js");
// Foundation JS



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["common"], () => (__webpack_exec__("./webpack.build.foundation.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QnVjLHdHQUFsQixFQUFrQyxnQkFBbEMsR0FDQTs7QUFDQXZjLGdHQUFBLENBQWtCc2Qsd0ZBQWxCLEVBQTBCLFFBQTFCLEdBQ0E7QUFDQTtBQUNBOztBQUNBdGQsZ0dBQUEsQ0FBa0JnZ0Isb0ZBQWxCLEVBQXdCLE1BQXhCO0FBQ0FoZ0IsZ0dBQUEsQ0FBa0J5aUIsMEZBQWxCLEVBQTJCLFNBQTNCO0FBQ0F6aUIsZ0dBQUEsQ0FBa0JrakIsMEZBQWxCLEVBQTJCLFNBQTNCLEdBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkZBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUudXRpbHMuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyaWxsZG93bi5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5tYWdlbGxhbi5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ub2ZmY2FudmFzLmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5wb3NpdGlvbmFibGUuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnJlc3BvbnNpdmVNZW51LmpzIiwid2VicGFjazovL2tyLy4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnNtb290aFNjcm9sbC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udGFicy5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9nZ2xlci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9vbHRpcC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3guanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeS5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24uanMiLCJ3ZWJwYWNrOi8va3IvLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwubmVzdC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50aW1lci5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaC5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycy5qcyIsIndlYnBhY2s6Ly9rci8uL25vZGVfbW9kdWxlcy93aGF0LWlucHV0L2Rpc3Qvd2hhdC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvZm91bmRhdGlvbi9mb3VuZGF0aW9uLmpzIiwid2VicGFjazovL2tyLy4vd2VicGFjay5idWlsZC5mb3VuZGF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBLZXlib2FyZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7IE5lc3QgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5uZXN0JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcblxuLyoqXG4gKiBBY2NvcmRpb25NZW51IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5hY2NvcmRpb25NZW51XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm5lc3RcbiAqL1xuXG5jbGFzcyBBY2NvcmRpb25NZW51IGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYWNjb3JkaW9uIG1lbnUuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBBY2NvcmRpb25NZW51XG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byBhbiBhY2NvcmRpb24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWNjb3JkaW9uTWVudS5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0FjY29yZGlvbk1lbnUnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdBY2NvcmRpb25NZW51Jywge1xuICAgICAgJ0VOVEVSJzogJ3RvZ2dsZScsXG4gICAgICAnU1BBQ0UnOiAndG9nZ2xlJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19VUCc6ICd1cCcsXG4gICAgICAnQVJST1dfRE9XTic6ICdkb3duJyxcbiAgICAgICdBUlJPV19MRUZUJzogJ2Nsb3NlJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2VBbGwnXG4gICAgfSk7XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhY2NvcmRpb24gbWVudSBieSBoaWRpbmcgYWxsIG5lc3RlZCBtZW51cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnYWNjb3JkaW9uJyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1zdWJtZW51XScpLm5vdCgnLmlzLWFjdGl2ZScpLnNsaWRlVXAoMCk7Ly8uZmluZCgnYScpLmNzcygncGFkZGluZy1sZWZ0JywgJzFyZW0nKTtcbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogdGhpcy5vcHRpb25zLm11bHRpT3BlblxuICAgIH0pO1xuXG4gICAgdGhpcy4kbWVudUxpbmtzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50Jyk7XG4gICAgdGhpcy4kbWVudUxpbmtzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGlua0lkID0gdGhpcy5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnYWNjLW1lbnUtbGluaycpLFxuICAgICAgICAgICRlbGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAkc3ViID0gJGVsZW0uY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJyksXG4gICAgICAgICAgc3ViSWQgPSAkc3ViWzBdLmlkIHx8IEdldFlvRGlnaXRzKDYsICdhY2MtbWVudScpLFxuICAgICAgICAgIGlzQWN0aXZlID0gJHN1Yi5oYXNDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgIGlmIChfdGhpcy5vcHRpb25zLnBhcmVudExpbmspIHtcbiAgICAgICAgbGV0ICRhbmNob3IgPSAkZWxlbS5jaGlsZHJlbignYScpO1xuICAgICAgICAkYW5jaG9yLmNsb25lKCkucHJlcGVuZFRvKCRzdWIpLndyYXAoJzxsaSBkYXRhLWlzLXBhcmVudC1saW5rIGNsYXNzPVwiaXMtc3VibWVudS1wYXJlbnQtaXRlbSBpcy1zdWJtZW51LWl0ZW0gaXMtYWNjb3JkaW9uLXN1Ym1lbnUtaXRlbVwiPjwvbGk+Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgICAgJGVsZW0uYWRkQ2xhc3MoJ2hhcy1zdWJtZW51LXRvZ2dsZScpO1xuICAgICAgICAkZWxlbS5jaGlsZHJlbignYScpLmFmdGVyKCc8YnV0dG9uIGlkPVwiJyArIGxpbmtJZCArICdcIiBjbGFzcz1cInN1Ym1lbnUtdG9nZ2xlXCIgYXJpYS1jb250cm9scz1cIicgKyBzdWJJZCArICdcIiBhcmlhLWV4cGFuZGVkPVwiJyArIGlzQWN0aXZlICsgJ1wiIHRpdGxlPVwiJyArIF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZVRleHQgKyAnXCI+PHNwYW4gY2xhc3M9XCJzdWJtZW51LXRvZ2dsZS10ZXh0XCI+JyArIF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZVRleHQgKyAnPC9zcGFuPjwvYnV0dG9uPicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGVsZW0uYXR0cih7XG4gICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBzdWJJZCxcbiAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGlzQWN0aXZlLFxuICAgICAgICAgICdpZCc6IGxpbmtJZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgICRzdWIuYXR0cih7XG4gICAgICAgICdhcmlhLWxhYmVsbGVkYnknOiBsaW5rSWQsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICFpc0FjdGl2ZSxcbiAgICAgICAgJ3JvbGUnOiAnZ3JvdXAnLFxuICAgICAgICAnaWQnOiBzdWJJZFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGluaXRQYW5lcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmlzLWFjdGl2ZScpO1xuICAgIGlmIChpbml0UGFuZXMubGVuZ3RoKSB7XG4gICAgICBpbml0UGFuZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuZG93bigkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBpdGVtcyB3aXRoaW4gdGhlIG1lbnUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkc3VibWVudSA9ICQodGhpcykuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJyk7XG5cbiAgICAgIGlmICgkc3VibWVudS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5zdWJtZW51LXRvZ2dsZScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpLm9uKCdjbGljay56Zi5hY2NvcmRpb25NZW51JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoJHN1Ym1lbnUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignYScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpLm9uKCdjbGljay56Zi5hY2NvcmRpb25NZW51JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIF90aGlzLnRvZ2dsZSgkc3VibWVudSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLm9uKCdrZXlkb3duLnpmLmFjY29yZGlvbk1lbnUnLCBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICRlbGVtZW50cyA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5jaGlsZHJlbignbGknKSxcbiAgICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICAgJG5leHRFbGVtZW50LFxuICAgICAgICAgICR0YXJnZXQgPSAkZWxlbWVudC5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKTtcblxuICAgICAgJGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaSkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSkuZmluZCgnYScpLmZpcnN0KCk7XG4gICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnRzLmVxKE1hdGgubWluKGkrMSwgJGVsZW1lbnRzLmxlbmd0aC0xKSkuZmluZCgnYScpLmZpcnN0KCk7XG5cbiAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbignW2RhdGEtc3VibWVudV06dmlzaWJsZScpLmxlbmd0aCkgeyAvLyBoYXMgb3BlbiBzdWIgbWVudVxuICAgICAgICAgICAgJG5leHRFbGVtZW50ID0gJGVsZW1lbnQuZmluZCgnbGk6Zmlyc3QtY2hpbGQnKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpmaXJzdC1jaGlsZCcpKSB7IC8vIGlzIGZpcnN0IGVsZW1lbnQgb2Ygc3ViIG1lbnVcbiAgICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5maW5kKCdhJykuZmlyc3QoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRwcmV2RWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdOnZpc2libGUnKS5sZW5ndGgpIHsgLy8gaWYgcHJldmlvdXMgZWxlbWVudCBoYXMgb3BlbiBzdWIgbWVudVxuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gJHByZXZFbGVtZW50LnBhcmVudHMoJ2xpJykuZmluZCgnbGk6bGFzdC1jaGlsZCcpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmxhc3QtY2hpbGQnKSkgeyAvLyBpcyBsYXN0IGVsZW1lbnQgb2Ygc3ViIG1lbnVcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50LnBhcmVudHMoJ2xpJykuZmlyc3QoKS5uZXh0KCdsaScpLmZpbmQoJ2EnKS5maXJzdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIEtleWJvYXJkLmhhbmRsZUtleShlLCAnQWNjb3JkaW9uTWVudScsIHtcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgX3RoaXMuZG93bigkdGFyZ2V0KTtcbiAgICAgICAgICAgICR0YXJnZXQuZmluZCgnbGknKS5maXJzdCgpLmZpbmQoJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoICYmICEkdGFyZ2V0LmlzKCc6aGlkZGVuJykpIHsgLy8gY2xvc2UgYWN0aXZlIHN1YiBvZiB0aGlzIGl0ZW1cbiAgICAgICAgICAgIF90aGlzLnVwKCR0YXJnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoJGVsZW1lbnQucGFyZW50KCdbZGF0YS1zdWJtZW51XScpLmxlbmd0aCkgeyAvLyBjbG9zZSBjdXJyZW50bHkgb3BlbiBzdWJcbiAgICAgICAgICAgIF90aGlzLnVwKCRlbGVtZW50LnBhcmVudCgnW2RhdGEtc3VibWVudV0nKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRzKCdsaScpLmZpcnN0KCkuZmluZCgnYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuc3VibWVudVRvZ2dsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGUoJGVsZW1lbnQuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZUFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMuaGlkZUFsbCgpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbihwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7Ly8uYXR0cigndGFiaW5kZXgnLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYWxsIHBhbmVzIG9mIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGhpZGVBbGwoKSB7XG4gICAgdGhpcy51cCh0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLXN1Ym1lbnVdJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGFsbCBwYW5lcyBvZiB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBzaG93QWxsKCkge1xuICAgIHRoaXMuZG93bih0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLXN1Ym1lbnVdJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9wZW4vY2xvc2Ugc3RhdGUgb2YgYSBzdWJtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSB0aGUgc3VibWVudSB0byB0b2dnbGVcbiAgICovXG4gIHRvZ2dsZSgkdGFyZ2V0KSB7XG4gICAgaWYgKCEkdGFyZ2V0LmlzKCc6YW5pbWF0ZWQnKSkge1xuICAgICAgaWYgKCEkdGFyZ2V0LmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgdGhpcy51cCgkdGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmRvd24oJHRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBzdWItbWVudSBkZWZpbmVkIGJ5IGAkdGFyZ2V0YC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBTdWItbWVudSB0byBvcGVuLlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNkb3duXG4gICAqL1xuICBkb3duKCR0YXJnZXQpIHtcbiAgICAvLyBJZiBoYXZpbmcgbXVsdGlwbGUgc3VibWVudXMgYWN0aXZlIGlzIGRpc2FibGVkLCBjbG9zZSBhbGwgdGhlIHN1Ym1lbnVzXG4gICAgLy8gdGhhdCBhcmUgbm90IHBhcmVudHMgb3IgY2hpbGRyZW4gb2YgdGhlIHRhcmdldGVkIHN1Ym1lbnUuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubXVsdGlPcGVuKSB7XG4gICAgICAvLyBUaGUgXCJicmFuY2hcIiBvZiB0aGUgdGFyZ2V0dGVkIHN1Ym1lbnUsIGZyb20gdGhlIGNvbXBvbmVudCByb290IHRvXG4gICAgICAvLyB0aGUgYWN0aXZlIHN1Ym1lbnVzIG5lc3RlZCBpbiBpdC5cbiAgICAgIGNvbnN0ICR0YXJnZXRCcmFuY2ggPSAkdGFyZ2V0LnBhcmVudHNVbnRpbCh0aGlzLiRlbGVtZW50KVxuICAgICAgICAuYWRkKCR0YXJnZXQpXG4gICAgICAgIC5hZGQoJHRhcmdldC5maW5kKCcuaXMtYWN0aXZlJykpO1xuICAgICAgLy8gQWxsIHRoZSBhY3RpdmUgc3VibWVudXMgdGhhdCBhcmUgbm90IGluIHRoZSBicmFuY2guXG4gICAgICBjb25zdCAkb3RoZXJzQWN0aXZlU3VibWVudXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pcy1hY3RpdmUnKS5ub3QoJHRhcmdldEJyYW5jaCk7XG5cbiAgICAgIHRoaXMudXAoJG90aGVyc0FjdGl2ZVN1Ym1lbnVzKTtcbiAgICB9XG5cbiAgICAkdGFyZ2V0XG4gICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAuYXR0cih7ICdhcmlhLWhpZGRlbic6IGZhbHNlIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAkdGFyZ2V0LnByZXYoJy5zdWJtZW51LXRvZ2dsZScpLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICR0YXJnZXQucGFyZW50KCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50JykuYXR0cih7J2FyaWEtZXhwYW5kZWQnOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgJHRhcmdldC5zbGlkZURvd24odGhpcy5vcHRpb25zLnNsaWRlU3BlZWQsICgpID0+IHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgbWVudSBpcyBkb25lIG9wZW5pbmcuXG4gICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uTWVudSNkb3duXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignZG93bi56Zi5hY2NvcmRpb25NZW51JywgWyR0YXJnZXRdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHN1Yi1tZW51IGRlZmluZWQgYnkgYCR0YXJnZXRgLiBBbGwgc3ViLW1lbnVzIGluc2lkZSB0aGUgdGFyZ2V0IHdpbGwgYmUgY2xvc2VkIGFzIHdlbGwuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gU3ViLW1lbnUgdG8gY2xvc2UuXG4gICAqIEBmaXJlcyBBY2NvcmRpb25NZW51I3VwXG4gICAqL1xuICB1cCgkdGFyZ2V0KSB7XG4gICAgY29uc3QgJHN1Ym1lbnVzID0gJHRhcmdldC5maW5kKCdbZGF0YS1zdWJtZW51XScpO1xuICAgIGNvbnN0ICRhbGxtZW51cyA9ICR0YXJnZXQuYWRkKCRzdWJtZW51cyk7XG5cbiAgICAkc3VibWVudXMuc2xpZGVVcCgwKTtcbiAgICAkYWxsbWVudXNcbiAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdWJtZW51VG9nZ2xlKSB7XG4gICAgICAkYWxsbWVudXMucHJldignLnN1Ym1lbnUtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkYWxsbWVudXMucGFyZW50KCcuaXMtYWNjb3JkaW9uLXN1Ym1lbnUtcGFyZW50JykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAkdGFyZ2V0LnNsaWRlVXAodGhpcy5vcHRpb25zLnNsaWRlU3BlZWQsICgpID0+IHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgbWVudSBpcyBkb25lIGNvbGxhcHNpbmcgdXAuXG4gICAgICAgKiBAZXZlbnQgQWNjb3JkaW9uTWVudSN1cFxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3VwLnpmLmFjY29yZGlvbk1lbnUnLCBbJHRhcmdldF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGFjY29yZGlvbiBtZW51LlxuICAgKiBAZmlyZXMgQWNjb3JkaW9uTWVudSNkZXN0cm95ZWRcbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtc3VibWVudV0nKS5zbGlkZURvd24oMCkuY3NzKCdkaXNwbGF5JywgJycpO1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnYScpLm9mZignY2xpY2suemYuYWNjb3JkaW9uTWVudScpO1xuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtaXMtcGFyZW50LWxpbmtdJykuZGV0YWNoKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnN1Ym1lbnVUb2dnbGUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnLmhhcy1zdWJtZW51LXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdoYXMtc3VibWVudS10b2dnbGUnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnLnN1Ym1lbnUtdG9nZ2xlJykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgTmVzdC5CdXJuKHRoaXMuJGVsZW1lbnQsICdhY2NvcmRpb24nKTtcbiAgfVxufVxuXG5BY2NvcmRpb25NZW51LmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQWRkcyB0aGUgcGFyZW50IGxpbmsgdG8gdGhlIHN1Ym1lbnUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBwYXJlbnRMaW5rOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGFuaW1hdGUgdGhlIG9wZW5pbmcgb2YgYSBzdWJtZW51IGluIG1zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDI1MFxuICAgKi9cbiAgc2xpZGVTcGVlZDogMjUwLFxuICAvKipcbiAgICogQWRkcyBhIHNlcGFyYXRlIHN1Ym1lbnUgdG9nZ2xlIGJ1dHRvbi4gVGhpcyBhbGxvd3MgdGhlIHBhcmVudCBpdGVtIHRvIGhhdmUgYSBsaW5rLlxuICAgKiBAb3B0aW9uXG4gICAqIEBleGFtcGxlIHRydWVcbiAgICovXG4gIHN1Ym1lbnVUb2dnbGU6IGZhbHNlLFxuICAvKipcbiAgICogVGhlIHRleHQgdXNlZCBmb3IgdGhlIHN1Ym1lbnUgdG9nZ2xlIGlmIGVuYWJsZWQuIFRoaXMgaXMgdXNlZCBmb3Igc2NyZWVuIHJlYWRlcnMgb25seS5cbiAgICogQG9wdGlvblxuICAgKiBAZXhhbXBsZSB0cnVlXG4gICAqL1xuICBzdWJtZW51VG9nZ2xlVGV4dDogJ1RvZ2dsZSBtZW51JyxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBtZW51IHRvIGhhdmUgbXVsdGlwbGUgb3BlbiBwYW5lcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgbXVsdGlPcGVuOiB0cnVlXG59O1xuXG5leHBvcnQgeyBBY2NvcmRpb25NZW51IH07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5cbnZhciBGT1VOREFUSU9OX1ZFUlNJT04gPSAnNi43LjQnO1xuXG4vLyBHbG9iYWwgRm91bmRhdGlvbiBvYmplY3Rcbi8vIFRoaXMgaXMgYXR0YWNoZWQgdG8gdGhlIHdpbmRvdywgb3IgdXNlZCBhcyBhIG1vZHVsZSBmb3IgQU1EL0Jyb3dzZXJpZnlcbnZhciBGb3VuZGF0aW9uID0ge1xuICB2ZXJzaW9uOiBGT1VOREFUSU9OX1ZFUlNJT04sXG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbml0aWFsaXplZCBwbHVnaW5zLlxuICAgKi9cbiAgX3BsdWdpbnM6IHt9LFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgZ2VuZXJhdGVkIHVuaXF1ZSBpZHMgZm9yIHBsdWdpbiBpbnN0YW5jZXNcbiAgICovXG4gIF91dWlkczogW10sXG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBGb3VuZGF0aW9uIHBsdWdpbiwgYWRkaW5nIGl0IHRvIHRoZSBgRm91bmRhdGlvbmAgbmFtZXNwYWNlIGFuZCB0aGUgbGlzdCBvZiBwbHVnaW5zIHRvIGluaXRpYWxpemUgd2hlbiByZWZsb3dpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBUaGUgY29uc3RydWN0b3Igb2YgdGhlIHBsdWdpbi5cbiAgICovXG4gIHBsdWdpbjogZnVuY3Rpb24ocGx1Z2luLCBuYW1lKSB7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBhZGRpbmcgdG8gZ2xvYmFsIEZvdW5kYXRpb24gb2JqZWN0XG4gICAgLy8gRXhhbXBsZXM6IEZvdW5kYXRpb24uUmV2ZWFsLCBGb3VuZGF0aW9uLk9mZkNhbnZhc1xuICAgIHZhciBjbGFzc05hbWUgPSAobmFtZSB8fCBmdW5jdGlvbk5hbWUocGx1Z2luKSk7XG4gICAgLy8gT2JqZWN0IGtleSB0byB1c2Ugd2hlbiBzdG9yaW5nIHRoZSBwbHVnaW4sIGFsc28gdXNlZCB0byBjcmVhdGUgdGhlIGlkZW50aWZ5aW5nIGRhdGEgYXR0cmlidXRlIGZvciB0aGUgcGx1Z2luXG4gICAgLy8gRXhhbXBsZXM6IGRhdGEtcmV2ZWFsLCBkYXRhLW9mZi1jYW52YXNcbiAgICB2YXIgYXR0ck5hbWUgID0gaHlwaGVuYXRlKGNsYXNzTmFtZSk7XG5cbiAgICAvLyBBZGQgdG8gdGhlIEZvdW5kYXRpb24gb2JqZWN0IGFuZCB0aGUgcGx1Z2lucyBsaXN0IChmb3IgcmVmbG93aW5nKVxuICAgIHRoaXMuX3BsdWdpbnNbYXR0ck5hbWVdID0gdGhpc1tjbGFzc05hbWVdID0gcGx1Z2luO1xuICB9LFxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIFBvcHVsYXRlcyB0aGUgX3V1aWRzIGFycmF5IHdpdGggcG9pbnRlcnMgdG8gZWFjaCBpbmRpdmlkdWFsIHBsdWdpbiBpbnN0YW5jZS5cbiAgICogQWRkcyB0aGUgYHpmUGx1Z2luYCBkYXRhLWF0dHJpYnV0ZSB0byBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZWQgcGx1Z2lucyB0byBhbGxvdyB1c2Ugb2YgJChzZWxlY3RvcikuZm91bmRhdGlvbihtZXRob2QpIGNhbGxzLlxuICAgKiBBbHNvIGZpcmVzIHRoZSBpbml0aWFsaXphdGlvbiBldmVudCBmb3IgZWFjaCBwbHVnaW4sIGNvbnNvbGlkYXRpbmcgcmVwZXRpdGl2ZSBjb2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIC0gYW4gaW5zdGFuY2Ugb2YgYSBwbHVnaW4sIHVzdWFsbHkgYHRoaXNgIGluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIG5hbWUgb2YgdGhlIHBsdWdpbiwgcGFzc2VkIGFzIGEgY2FtZWxDYXNlZCBzdHJpbmcuXG4gICAqIEBmaXJlcyBQbHVnaW4jaW5pdFxuICAgKi9cbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbiwgbmFtZSl7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBuYW1lID8gaHlwaGVuYXRlKG5hbWUpIDogZnVuY3Rpb25OYW1lKHBsdWdpbi5jb25zdHJ1Y3RvcikudG9Mb3dlckNhc2UoKTtcbiAgICBwbHVnaW4udXVpZCA9IEdldFlvRGlnaXRzKDYsIHBsdWdpbk5hbWUpO1xuXG4gICAgaWYoIXBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHBsdWdpbi4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gLCBwbHVnaW4udXVpZCk7IH1cbiAgICBpZighcGx1Z2luLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyBwbHVnaW4uJGVsZW1lbnQuZGF0YSgnemZQbHVnaW4nLCBwbHVnaW4pOyB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2luaXRcbiAgICAgICAgICAgKi9cbiAgICBwbHVnaW4uJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG5cbiAgICB0aGlzLl91dWlkcy5wdXNoKHBsdWdpbi51dWlkKTtcblxuICAgIHJldHVybjtcbiAgfSxcbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBSZW1vdmVzIHRoZSBwbHVnaW5zIHV1aWQgZnJvbSB0aGUgX3V1aWRzIGFycmF5LlxuICAgKiBSZW1vdmVzIHRoZSB6ZlBsdWdpbiBkYXRhIGF0dHJpYnV0ZSwgYXMgd2VsbCBhcyB0aGUgZGF0YS1wbHVnaW4tbmFtZSBhdHRyaWJ1dGUuXG4gICAqIEFsc28gZmlyZXMgdGhlIGRlc3Ryb3llZCBldmVudCBmb3IgdGhlIHBsdWdpbiwgY29uc29saWRhdGluZyByZXBldGl0aXZlIGNvZGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gLSBhbiBpbnN0YW5jZSBvZiBhIHBsdWdpbiwgdXN1YWxseSBgdGhpc2AgaW4gY29udGV4dC5cbiAgICogQGZpcmVzIFBsdWdpbiNkZXN0cm95ZWRcbiAgICovXG4gIHVucmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uKHBsdWdpbil7XG4gICAgdmFyIHBsdWdpbk5hbWUgPSBoeXBoZW5hdGUoZnVuY3Rpb25OYW1lKHBsdWdpbi4kZWxlbWVudC5kYXRhKCd6ZlBsdWdpbicpLmNvbnN0cnVjdG9yKSk7XG5cbiAgICB0aGlzLl91dWlkcy5zcGxpY2UodGhpcy5fdXVpZHMuaW5kZXhPZihwbHVnaW4udXVpZCksIDEpO1xuICAgIHBsdWdpbi4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBiZWVuIGRlc3Ryb3llZC5cbiAgICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgICAqL1xuICAgICAgICAgIC50cmlnZ2VyKGBkZXN0cm95ZWQuemYuJHtwbHVnaW5OYW1lfWApO1xuICAgIGZvcih2YXIgcHJvcCBpbiBwbHVnaW4pe1xuICAgICAgaWYodHlwZW9mIHBsdWdpbltwcm9wXSA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIHBsdWdpbltwcm9wXSA9IG51bGw7IC8vY2xlYW4gdXAgc2NyaXB0IHRvIHByZXAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAZnVuY3Rpb25cbiAgICogQ2F1c2VzIG9uZSBvciBtb3JlIGFjdGl2ZSBwbHVnaW5zIHRvIHJlLWluaXRpYWxpemUsIHJlc2V0dGluZyBldmVudCBsaXN0ZW5lcnMsIHJlY2FsY3VsYXRpbmcgcG9zaXRpb25zLCBldGMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwbHVnaW5zIC0gb3B0aW9uYWwgc3RyaW5nIG9mIGFuIGluZGl2aWR1YWwgcGx1Z2luIGtleSwgYXR0YWluZWQgYnkgY2FsbGluZyBgJChlbGVtZW50KS5kYXRhKCdwbHVnaW5OYW1lJylgLCBvciBzdHJpbmcgb2YgYSBwbHVnaW4gY2xhc3MgaS5lLiBgJ2Ryb3Bkb3duJ2BcbiAgICogQGRlZmF1bHQgSWYgbm8gYXJndW1lbnQgaXMgcGFzc2VkLCByZWZsb3cgYWxsIGN1cnJlbnRseSBhY3RpdmUgcGx1Z2lucy5cbiAgICovXG4gICByZUluaXQ6IGZ1bmN0aW9uKHBsdWdpbnMpe1xuICAgICB2YXIgaXNKUSA9IHBsdWdpbnMgaW5zdGFuY2VvZiAkO1xuICAgICB0cnl7XG4gICAgICAgaWYoaXNKUSl7XG4gICAgICAgICBwbHVnaW5zLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgJCh0aGlzKS5kYXRhKCd6ZlBsdWdpbicpLl9pbml0KCk7XG4gICAgICAgICB9KTtcbiAgICAgICB9ZWxzZXtcbiAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHBsdWdpbnMsXG4gICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICBmbnMgPSB7XG4gICAgICAgICAgICdvYmplY3QnOiBmdW5jdGlvbihwbGdzKXtcbiAgICAgICAgICAgICBwbGdzLmZvckVhY2goZnVuY3Rpb24ocCl7XG4gICAgICAgICAgICAgICBwID0gaHlwaGVuYXRlKHApO1xuICAgICAgICAgICAgICAgJCgnW2RhdGEtJysgcCArJ10nKS5mb3VuZGF0aW9uKCdfaW5pdCcpO1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICAnc3RyaW5nJzogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBwbHVnaW5zID0gaHlwaGVuYXRlKHBsdWdpbnMpO1xuICAgICAgICAgICAgICQoJ1tkYXRhLScrIHBsdWdpbnMgKyddJykuZm91bmRhdGlvbignX2luaXQnKTtcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgJ3VuZGVmaW5lZCc6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgdGhpcy5vYmplY3QoT2JqZWN0LmtleXMoX3RoaXMuX3BsdWdpbnMpKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfTtcbiAgICAgICAgIGZuc1t0eXBlXShwbHVnaW5zKTtcbiAgICAgICB9XG4gICAgIH1jYXRjaChlcnIpe1xuICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgfWZpbmFsbHl7XG4gICAgICAgcmV0dXJuIHBsdWdpbnM7XG4gICAgIH1cbiAgIH0sXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgcGx1Z2lucyBvbiBhbnkgZWxlbWVudHMgd2l0aGluIGBlbGVtYCAoYW5kIGBlbGVtYCBpdHNlbGYpIHRoYXQgYXJlbid0IGFscmVhZHkgaW5pdGlhbGl6ZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIC0galF1ZXJ5IG9iamVjdCBjb250YWluaW5nIHRoZSBlbGVtZW50IHRvIGNoZWNrIGluc2lkZS4gQWxzbyBjaGVja3MgdGhlIGVsZW1lbnQgaXRzZWxmLCB1bmxlc3MgaXQncyB0aGUgYGRvY3VtZW50YCBvYmplY3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBwbHVnaW5zIC0gQSBsaXN0IG9mIHBsdWdpbnMgdG8gaW5pdGlhbGl6ZS4gTGVhdmUgdGhpcyBvdXQgdG8gaW5pdGlhbGl6ZSBldmVyeXRoaW5nLlxuICAgKi9cbiAgcmVmbG93OiBmdW5jdGlvbihlbGVtLCBwbHVnaW5zKSB7XG5cbiAgICAvLyBJZiBwbHVnaW5zIGlzIHVuZGVmaW5lZCwganVzdCBncmFiIGV2ZXJ5dGhpbmdcbiAgICBpZiAodHlwZW9mIHBsdWdpbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwbHVnaW5zID0gT2JqZWN0LmtleXModGhpcy5fcGx1Z2lucyk7XG4gICAgfVxuICAgIC8vIElmIHBsdWdpbnMgaXMgYSBzdHJpbmcsIGNvbnZlcnQgaXQgdG8gYW4gYXJyYXkgd2l0aCBvbmUgaXRlbVxuICAgIGVsc2UgaWYgKHR5cGVvZiBwbHVnaW5zID09PSAnc3RyaW5nJykge1xuICAgICAgcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICB9XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcGx1Z2luXG4gICAgJC5lYWNoKHBsdWdpbnMsIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCBwbHVnaW5cbiAgICAgIHZhciBwbHVnaW4gPSBfdGhpcy5fcGx1Z2luc1tuYW1lXTtcblxuICAgICAgLy8gTG9jYWxpemUgdGhlIHNlYXJjaCB0byBhbGwgZWxlbWVudHMgaW5zaWRlIGVsZW0sIGFzIHdlbGwgYXMgZWxlbSBpdHNlbGYsIHVubGVzcyBlbGVtID09PSBkb2N1bWVudFxuICAgICAgdmFyICRlbGVtID0gJChlbGVtKS5maW5kKCdbZGF0YS0nK25hbWUrJ10nKS5hZGRCYWNrKCdbZGF0YS0nK25hbWUrJ10nKS5maWx0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mICQodGhpcykuZGF0YShcInpmUGx1Z2luXCIpID09PSAndW5kZWZpbmVkJztcbiAgICAgIH0pO1xuXG4gICAgICAvLyBGb3IgZWFjaCBwbHVnaW4gZm91bmQsIGluaXRpYWxpemUgaXRcbiAgICAgICRlbGVtLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0cyA9IHsgcmVmbG93OiB0cnVlIH07XG5cbiAgICAgICAgaWYoJGVsLmF0dHIoJ2RhdGEtb3B0aW9ucycpKXtcbiAgICAgICAgICAkZWwuYXR0cignZGF0YS1vcHRpb25zJykuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKG9wdGlvbil7XG4gICAgICAgICAgICB2YXIgb3B0ID0gb3B0aW9uLnNwbGl0KCc6JykubWFwKGZ1bmN0aW9uKGVsKXsgcmV0dXJuIGVsLnRyaW0oKTsgfSk7XG4gICAgICAgICAgICBpZihvcHRbMF0pIG9wdHNbb3B0WzBdXSA9IHBhcnNlVmFsdWUob3B0WzFdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0cnl7XG4gICAgICAgICAgJGVsLmRhdGEoJ3pmUGx1Z2luJywgbmV3IHBsdWdpbigkKHRoaXMpLCBvcHRzKSk7XG4gICAgICAgIH1jYXRjaChlcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcik7XG4gICAgICAgIH1maW5hbGx5e1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldEZuTmFtZTogZnVuY3Rpb25OYW1lLFxuXG4gIGFkZFRvSnF1ZXJ5OiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBjb25zaWRlciBub3QgbWFraW5nIHRoaXMgYSBqUXVlcnkgZnVuY3Rpb25cbiAgICAvLyBUT0RPOiBuZWVkIHdheSB0byByZWZsb3cgdnMuIHJlLWluaXRpYWxpemVcbiAgICAvKipcbiAgICAgKiBUaGUgRm91bmRhdGlvbiBqUXVlcnkgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBtZXRob2QgLSBBbiBhY3Rpb24gdG8gcGVyZm9ybSBvbiB0aGUgY3VycmVudCBqUXVlcnkgb2JqZWN0LlxuICAgICAqL1xuICAgIHZhciBmb3VuZGF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICB2YXIgdHlwZSA9IHR5cGVvZiBtZXRob2QsXG4gICAgICAgICAgJG5vSlMgPSAkKCcubm8tanMnKTtcblxuICAgICAgaWYoJG5vSlMubGVuZ3RoKXtcbiAgICAgICAgJG5vSlMucmVtb3ZlQ2xhc3MoJ25vLWpzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmKHR5cGUgPT09ICd1bmRlZmluZWQnKXsvL25lZWRzIHRvIGluaXRpYWxpemUgdGhlIEZvdW5kYXRpb24gb2JqZWN0LCBvciBhbiBpbmRpdmlkdWFsIHBsdWdpbi5cbiAgICAgICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgICAgICBGb3VuZGF0aW9uLnJlZmxvdyh0aGlzKTtcbiAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdzdHJpbmcnKXsvL2FuIGluZGl2aWR1YWwgbWV0aG9kIHRvIGludm9rZSBvbiBhIHBsdWdpbiBvciBncm91cCBvZiBwbHVnaW5zXG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTsvL2NvbGxlY3QgYWxsIHRoZSBhcmd1bWVudHMsIGlmIG5lY2Vzc2FyeVxuICAgICAgICB2YXIgcGx1Z0NsYXNzID0gdGhpcy5kYXRhKCd6ZlBsdWdpbicpOy8vZGV0ZXJtaW5lIHRoZSBjbGFzcyBvZiBwbHVnaW5cblxuICAgICAgICBpZih0eXBlb2YgcGx1Z0NsYXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcGx1Z0NsYXNzW21ldGhvZF0gIT09ICd1bmRlZmluZWQnKXsvL21ha2Ugc3VyZSBib3RoIHRoZSBjbGFzcyBhbmQgbWV0aG9kIGV4aXN0XG4gICAgICAgICAgaWYodGhpcy5sZW5ndGggPT09IDEpey8vaWYgdGhlcmUncyBvbmx5IG9uZSwgY2FsbCBpdCBkaXJlY3RseS5cbiAgICAgICAgICAgICAgcGx1Z0NsYXNzW21ldGhvZF0uYXBwbHkocGx1Z0NsYXNzLCBhcmdzKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbCl7Ly9vdGhlcndpc2UgbG9vcCB0aHJvdWdoIHRoZSBqUXVlcnkgY29sbGVjdGlvbiBhbmQgaW52b2tlIHRoZSBtZXRob2Qgb24gZWFjaFxuICAgICAgICAgICAgICBwbHVnQ2xhc3NbbWV0aG9kXS5hcHBseSgkKGVsKS5kYXRhKCd6ZlBsdWdpbicpLCBhcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7Ly9lcnJvciBmb3Igbm8gY2xhc3Mgb3Igbm8gbWV0aG9kXG4gICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiV2UncmUgc29ycnksICdcIiArIG1ldGhvZCArIFwiJyBpcyBub3QgYW4gYXZhaWxhYmxlIG1ldGhvZCBmb3IgXCIgKyAocGx1Z0NsYXNzID8gZnVuY3Rpb25OYW1lKHBsdWdDbGFzcykgOiAndGhpcyBlbGVtZW50JykgKyAnLicpO1xuICAgICAgICB9XG4gICAgICB9ZWxzZXsvL2Vycm9yIGZvciBpbnZhbGlkIGFyZ3VtZW50IHR5cGVcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgV2UncmUgc29ycnksICR7dHlwZX0gaXMgbm90IGEgdmFsaWQgcGFyYW1ldGVyLiBZb3UgbXVzdCB1c2UgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtZXRob2QgeW91IHdpc2ggdG8gaW52b2tlLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAkLmZuLmZvdW5kYXRpb24gPSBmb3VuZGF0aW9uO1xuICAgIHJldHVybiAkO1xuICB9XG59O1xuXG5Gb3VuZGF0aW9uLnV0aWwgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiBmb3IgYXBwbHlpbmcgYSBkZWJvdW5jZSBlZmZlY3QgdG8gYSBmdW5jdGlvbiBjYWxsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCBlbmQgb2YgdGltZW91dC5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5IC0gVGltZSBpbiBtcyB0byBkZWxheSB0aGUgY2FsbCBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIGZ1bmN0aW9uXG4gICAqL1xuICB0aHJvdHRsZTogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxud2luZG93LkZvdW5kYXRpb24gPSBGb3VuZGF0aW9uO1xuXG4vLyBQb2x5ZmlsbCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRGF0ZS5ub3cgfHwgIXdpbmRvdy5EYXRlLm5vdylcbiAgICB3aW5kb3cuRGF0ZS5ub3cgPSBEYXRlLm5vdyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH07XG5cbiAgdmFyIHZlbmRvcnMgPSBbJ3dlYmtpdCcsICdtb3onXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKytpKSB7XG4gICAgICB2YXIgdnAgPSB2ZW5kb3JzW2ldO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2cCsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSAod2luZG93W3ZwKydDYW5jZWxBbmltYXRpb25GcmFtZSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdnArJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddKTtcbiAgfVxuICBpZiAoL2lQKGFkfGhvbmV8b2QpLipPUyA2Ly50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIHx8ICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIG5leHRUaW1lID0gTWF0aC5tYXgobGFzdFRpbWUgKyAxNiwgbm93KTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGxhc3RUaW1lID0gbmV4dFRpbWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0VGltZSAtIG5vdyk7XG4gICAgfTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjbGVhclRpbWVvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvbHlmaWxsIGZvciBwZXJmb3JtYW5jZS5ub3csIHJlcXVpcmVkIGJ5IHJBRlxuICAgKi9cbiAgaWYoIXdpbmRvdy5wZXJmb3JtYW5jZSB8fCAhd2luZG93LnBlcmZvcm1hbmNlLm5vdyl7XG4gICAgd2luZG93LnBlcmZvcm1hbmNlID0ge1xuICAgICAgc3RhcnQ6IERhdGUubm93KCksXG4gICAgICBub3c6IGZ1bmN0aW9uKCl7IHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDsgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWV4dGVuZC1uYXRpdmUgKi9cbiAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvVGhpcykge1xuICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1XG4gICAgICAvLyBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgIH1cblxuICAgIHZhciBhQXJncyAgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgICAgPSBmdW5jdGlvbigpIHt9LFxuICAgICAgICBmQm91bmQgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1BcbiAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICBpZiAodGhpcy5wcm90b3R5cGUpIHtcbiAgICAgIC8vIG5hdGl2ZSBmdW5jdGlvbnMgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZVxuICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICB9XG4gICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICByZXR1cm4gZkJvdW5kO1xuICB9O1xufVxuLy8gUG9seWZpbGwgdG8gZ2V0IHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24gaW4gSUU5XG5mdW5jdGlvbiBmdW5jdGlvbk5hbWUoZm4pIHtcbiAgaWYgKHR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGUubmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvblxccyhbXihdezEsfSlcXCgvO1xuICAgIHZhciByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKGZuKS50b1N0cmluZygpKTtcbiAgICByZXR1cm4gKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxKSA/IHJlc3VsdHNbMV0udHJpbSgpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgZm4ucHJvdG90eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmbi5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBmbi5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZShzdHIpe1xuICBpZiAoJ3RydWUnID09PSBzdHIpIHJldHVybiB0cnVlO1xuICBlbHNlIGlmICgnZmFsc2UnID09PSBzdHIpIHJldHVybiBmYWxzZTtcbiAgZWxzZSBpZiAoIWlzTmFOKHN0ciAqIDEpKSByZXR1cm4gcGFyc2VGbG9hdChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCB7Rm91bmRhdGlvbn07XG4iLCJpbXBvcnQgeyBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcblxuLy8gQWJzdHJhY3QgY2xhc3MgZm9yIHByb3ZpZGluZyBsaWZlY3ljbGUgaG9va3MuIEV4cGVjdCBwbHVnaW5zIHRvIGRlZmluZSBBVCBMRUFTVFxuLy8ge2Z1bmN0aW9ufSBfc2V0dXAgKHJlcGxhY2VzIHByZXZpb3VzIGNvbnN0cnVjdG9yKSxcbi8vIHtmdW5jdGlvbn0gX2Rlc3Ryb3kgKHJlcGxhY2VzIHByZXZpb3VzIGRlc3Ryb3kpXG5jbGFzcyBQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9zZXR1cChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy51dWlkID0gR2V0WW9EaWdpdHMoNiwgcGx1Z2luTmFtZSk7XG5cbiAgICBpZighdGhpcy4kZWxlbWVudC5hdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKSl7IHRoaXMuJGVsZW1lbnQuYXR0cihgZGF0YS0ke3BsdWdpbk5hbWV9YCwgdGhpcy51dWlkKTsgfVxuICAgIGlmKCF0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJykpeyB0aGlzLiRlbGVtZW50LmRhdGEoJ3pmUGx1Z2luJywgdGhpcyk7IH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGluaXRpYWxpemVkLlxuICAgICAqIEBldmVudCBQbHVnaW4jaW5pdFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihgaW5pdC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB2YXIgcGx1Z2luTmFtZSA9IGdldFBsdWdpbk5hbWUodGhpcyk7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVBdHRyKGBkYXRhLSR7cGx1Z2luTmFtZX1gKS5yZW1vdmVEYXRhKCd6ZlBsdWdpbicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIGJlZW4gZGVzdHJveWVkLlxuICAgICAgICAgKiBAZXZlbnQgUGx1Z2luI2Rlc3Ryb3llZFxuICAgICAgICAgKi9cbiAgICAgICAgLnRyaWdnZXIoYGRlc3Ryb3llZC56Zi4ke3BsdWdpbk5hbWV9YCk7XG4gICAgZm9yKHZhciBwcm9wIGluIHRoaXMpe1xuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgdGhpc1twcm9wXSA9IG51bGw7IC8vY2xlYW4gdXAgc2NyaXB0IHRvIHByZXAgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gQ29udmVydCBQYXNjYWxDYXNlIHRvIGtlYmFiLWNhc2Vcbi8vIFRoYW5rIHlvdTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvODk1NTU4MFxuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFBsdWdpbk5hbWUob2JqKSB7XG4gIHJldHVybiBoeXBoZW5hdGUob2JqLmNsYXNzTmFtZSk7XG59XG5cbmV4cG9ydCB7UGx1Z2lufTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbi8vIENvcmUgRm91bmRhdGlvbiBVdGlsaXRpZXMsIHV0aWxpemVkIGluIGEgbnVtYmVyIG9mIHBsYWNlcy5cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gZm9yIFJUTCBzdXBwb3J0XG4gICAqL1xuZnVuY3Rpb24gcnRsKCkge1xuICByZXR1cm4gJCgnaHRtbCcpLmF0dHIoJ2RpcicpID09PSAncnRsJztcbn1cblxuLyoqXG4gKiByZXR1cm5zIGEgcmFuZG9tIGJhc2UtMzYgdWlkIHdpdGggbmFtZXNwYWNpbmdcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCAtIG51bWJlciBvZiByYW5kb20gYmFzZS0zNiBkaWdpdHMgZGVzaXJlZC4gSW5jcmVhc2UgZm9yIG1vcmUgcmFuZG9tIHN0cmluZ3MuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIC0gbmFtZSBvZiBwbHVnaW4gdG8gYmUgaW5jb3Jwb3JhdGVkIGluIHVpZCwgb3B0aW9uYWwuXG4gKiBAZGVmYXVsdCB7U3RyaW5nfSAnJyAtIGlmIG5vIHBsdWdpbiBuYW1lIGlzIHByb3ZpZGVkLCBub3RoaW5nIGlzIGFwcGVuZGVkIHRvIHRoZSB1aWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSAtIHVuaXF1ZSBpZFxuICovXG5mdW5jdGlvbiBHZXRZb0RpZ2l0cyhsZW5ndGggPSA2LCBuYW1lc3BhY2Upe1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG4gIGNvbnN0IGNoYXJzTGVuZ3RoID0gY2hhcnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgc3RyICs9IGNoYXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzTGVuZ3RoKV07XG4gIH1cbiAgcmV0dXJuIG5hbWVzcGFjZSA/IGAke3N0cn0tJHtuYW1lc3BhY2V9YCA6IHN0cjtcbn1cblxuLyoqXG4gKiBFc2NhcGUgYSBzdHJpbmcgc28gaXQgY2FuIGJlIHVzZWQgYXMgYSByZWdleHAgcGF0dGVyblxuICogQGZ1bmN0aW9uXG4gKiBAc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MzEwNzUyLzQzMTczODRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0gc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IC0gZXNjYXBlZCBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gUmVnRXhwRXNjYXBlKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbmVuZCgkZWxlbSl7XG4gIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAndHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAnTW96VHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAnT1RyYW5zaXRpb24nOiAnb3RyYW5zaXRpb25lbmQnXG4gIH07XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBlbmQ7XG5cbiAgZm9yIChsZXQgdHJhbnNpdGlvbiBpbiB0cmFuc2l0aW9ucyl7XG4gICAgaWYgKHR5cGVvZiBlbGVtLnN0eWxlW3RyYW5zaXRpb25dICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICBlbmQgPSB0cmFuc2l0aW9uc1t0cmFuc2l0aW9uXTtcbiAgICB9XG4gIH1cbiAgaWYgKGVuZCkge1xuICAgIHJldHVybiBlbmQ7XG4gIH0gZWxzZSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3RyYW5zaXRpb25lbmQnLCBbJGVsZW1dKTtcbiAgICB9LCAxKTtcbiAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQnO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvciB3aW5kb3cgbG9hZC5cbiAqXG4gKiBJZiBgJGVsZW1gIGlzIHBhc3NlZCwgYW4gZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgb24gYCRlbGVtYC4gSWYgd2luZG93IGlzIGFscmVhZHkgbG9hZGVkLCB0aGUgZXZlbnQgd2lsbCBzdGlsbCBiZSB0cmlnZ2VyZWQuXG4gKiBJZiBgaGFuZGxlcmAgaXMgcGFzc2VkLCBhdHRhY2ggaXQgdG8gdGhlIGV2ZW50IG9uIGAkZWxlbWAuXG4gKiBDYWxsaW5nIGBvbkxvYWRgIHdpdGhvdXQgaGFuZGxlciBhbGxvd3MgeW91IHRvIGdldCB0aGUgZXZlbnQgdHlwZSB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSBhdHRhY2hpbmcgdGhlIGhhbmRsZXIgYnkgeW91cnNlbGYuXG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW10gJGVsZW0gLSBqUXVlcnkgZWxlbWVudCBvbiB3aGljaCB0aGUgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgaWYgcGFzc2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW10gaGFuZGxlciAtIGZ1bmN0aW9uIHRvIGF0dGFjaCB0byB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSAtIGV2ZW50IHR5cGUgdGhhdCBzaG91bGQgb3Igd2lsbCBiZSB0cmlnZ2VyZWQuXG4gKi9cbmZ1bmN0aW9uIG9uTG9hZCgkZWxlbSwgaGFuZGxlcikge1xuICBjb25zdCBkaWRMb2FkID0gZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJztcbiAgY29uc3QgZXZlbnRUeXBlID0gKGRpZExvYWQgPyAnX2RpZExvYWQnIDogJ2xvYWQnKSArICcuemYudXRpbC5vbkxvYWQnO1xuICBjb25zdCBjYiA9ICgpID0+ICRlbGVtLnRyaWdnZXJIYW5kbGVyKGV2ZW50VHlwZSk7XG5cbiAgaWYgKCRlbGVtKSB7XG4gICAgaWYgKGhhbmRsZXIpICRlbGVtLm9uZShldmVudFR5cGUsIGhhbmRsZXIpO1xuXG4gICAgaWYgKGRpZExvYWQpXG4gICAgICBzZXRUaW1lb3V0KGNiKTtcbiAgICBlbHNlXG4gICAgICAkKHdpbmRvdykub25lKCdsb2FkJywgY2IpO1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50VHlwZTtcbn1cblxuLyoqXG4gKiBSZXR1bnMgYW4gaGFuZGxlciBmb3IgdGhlIGBtb3VzZWxlYXZlYCB0aGF0IGlnbm9yZSBkaXNhcHBlYXJlZCBtb3VzZXMuXG4gKlxuICogSWYgdGhlIG1vdXNlIFwiZGlzYXBwZWFyZWRcIiBmcm9tIHRoZSBkb2N1bWVudCAobGlrZSB3aGVuIGdvaW5nIG9uIGEgYnJvd3NlciBVSSBlbGVtZW50LCBTZWUgaHR0cHM6Ly9naXQuaW8vemYtMTE0MTApLFxuICogdGhlIGV2ZW50IGlzIGlnbm9yZWQuXG4gKiAtIElmIHRoZSBgaWdub3JlTGVhdmVXaW5kb3dgIGlzIGB0cnVlYCwgdGhlIGV2ZW50IGlzIGlnbm9yZWQgd2hlbiB0aGUgdXNlciBhY3R1YWxseSBsZWZ0IHRoZSB3aW5kb3dcbiAqICAgKGxpa2UgYnkgc3dpdGNoaW5nIHRvIGFuIG90aGVyIHdpbmRvdyB3aXRoIFtBbHRdK1tUYWJdKS5cbiAqIC0gSWYgdGhlIGBpZ25vcmVSZWFwcGVhcmAgaXMgYHRydWVgLCB0aGUgZXZlbnQgd2lsbCBiZSBpZ25vcmVkIHdoZW4gdGhlIG1vdXNlIHdpbGwgcmVhcHBlYXIgbGF0ZXIgb24gdGhlIGRvY3VtZW50XG4gKiAgIG91dHNpZGUgb2YgdGhlIGVsZW1lbnQgaXQgbGVmdC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbXSBoYW5kbGVyIC0gaGFuZGxlciBmb3IgdGhlIGZpbHRlcmVkIGBtb3VzZWxlYXZlYCBldmVudCB0byB3YXRjaC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbXSBvcHRpb25zIC0gb2JqZWN0IG9mIG9wdGlvbnM6XG4gKiAtIHtCb29sZWFufSBbZmFsc2VdIGlnbm9yZUxlYXZlV2luZG93IC0gYWxzbyBpZ25vcmUgd2hlbiB0aGUgdXNlciBzd2l0Y2hlZCB3aW5kb3dzLlxuICogLSB7Qm9vbGVhbn0gW2ZhbHNlXSBpZ25vcmVSZWFwcGVhciAtIGFsc28gaWdub3JlIHdoZW4gdGhlIG1vdXNlIHJlYXBwZWFyZWQgb3V0c2lkZSBvZiB0aGUgZWxlbWVudCBpdCBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSAtIGZpbHRlcmVkIGhhbmRsZXIgdG8gdXNlIHRvIGxpc3RlbiBvbiB0aGUgYG1vdXNlbGVhdmVgIGV2ZW50LlxuICovXG5mdW5jdGlvbiBpZ25vcmVNb3VzZWRpc2FwcGVhcihoYW5kbGVyLCB7IGlnbm9yZUxlYXZlV2luZG93ID0gZmFsc2UsIGlnbm9yZVJlYXBwZWFyID0gZmFsc2UgfSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBsZWF2ZUV2ZW50SGFuZGxlcihlTGVhdmUsIC4uLnJlc3QpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IGhhbmRsZXIuYmluZCh0aGlzLCBlTGVhdmUsIC4uLnJlc3QpO1xuXG4gICAgLy8gVGhlIG1vdXNlIGxlZnQ6IGNhbGwgdGhlIGdpdmVuIGNhbGxiYWNrIGlmIHRoZSBtb3VzZSBlbnRlcmVkIGVsc2V3aGVyZVxuICAgIGlmIChlTGVhdmUucmVsYXRlZFRhcmdldCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCBjaGVjayBpZiB0aGUgbW91c2UgYWN0dWFsbHkgbGVmdCB0aGUgd2luZG93LlxuICAgIC8vIEluIGZpcmVmb3ggaWYgdGhlIHVzZXIgc3dpdGNoZWQgYmV0d2VlbiB3aW5kb3dzLCB0aGUgd2luZG93IHNpbGwgaGF2ZSB0aGUgZm9jdXMgYnkgdGhlIHRpbWVcbiAgICAvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkLiBXZSBoYXZlIHRvIGRlYm91bmNlIHRoZSBldmVudCB0byB0ZXN0IHRoaXMgY2FzZS5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGxlYXZlRXZlbnREZWJvdW5jZXIoKSB7XG4gICAgICBpZiAoIWlnbm9yZUxlYXZlV2luZG93ICYmIGRvY3VtZW50Lmhhc0ZvY3VzICYmICFkb2N1bWVudC5oYXNGb2N1cygpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UsIHdhaXQgZm9yIHRoZSBtb3VzZSB0byByZWVhcGVhciBvdXRzaWRlIG9mIHRoZSBlbGVtZW50LFxuICAgICAgaWYgKCFpZ25vcmVSZWFwcGVhcikge1xuICAgICAgICAkKGRvY3VtZW50KS5vbmUoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiByZWVudGVyRXZlbnRIYW5kbGVyKGVSZWVudGVyKSB7XG4gICAgICAgICAgaWYgKCEkKGVMZWF2ZS5jdXJyZW50VGFyZ2V0KS5oYXMoZVJlZW50ZXIudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEZpbGwgd2hlcmUgdGhlIG1vdXNlIGZpbmFsbHkgZW50ZXJlZC5cbiAgICAgICAgICAgIGVMZWF2ZS5yZWxhdGVkVGFyZ2V0ID0gZVJlZW50ZXIudGFyZ2V0O1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgMCk7XG4gIH07XG59XG5cblxuZXhwb3J0IHsgcnRsLCBHZXRZb0RpZ2l0cywgUmVnRXhwRXNjYXBlLCB0cmFuc2l0aW9uZW5kLCBvbkxvYWQsIGlnbm9yZU1vdXNlZGlzYXBwZWFyIH07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBOZXN0IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBHZXRZb0RpZ2l0cywgdHJhbnNpdGlvbmVuZCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IEJveCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmJveCc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuXG4vKipcbiAqIERyaWxsZG93biBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJpbGxkb3duXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm5lc3RcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKi9cblxuY2xhc3MgRHJpbGxkb3duIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBkcmlsbGRvd24gbWVudS5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIERyaWxsZG93blxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGFuIGFjY29yZGlvbiBtZW51LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBEcmlsbGRvd24uZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdEcmlsbGRvd24nOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdEcmlsbGRvd24nLCB7XG4gICAgICAnRU5URVInOiAnb3BlbicsXG4gICAgICAnU1BBQ0UnOiAnb3BlbicsXG4gICAgICAnQVJST1dfUklHSFQnOiAnbmV4dCcsXG4gICAgICAnQVJST1dfVVAnOiAndXAnLFxuICAgICAgJ0FSUk9XX0RPV04nOiAnZG93bicsXG4gICAgICAnQVJST1dfTEVGVCc6ICdwcmV2aW91cycsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZHJpbGxkb3duIGJ5IGNyZWF0aW5nIGpRdWVyeSBjb2xsZWN0aW9ucyBvZiBlbGVtZW50c1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTmVzdC5GZWF0aGVyKHRoaXMuJGVsZW1lbnQsICdkcmlsbGRvd24nKTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvQXBwbHlDbGFzcykge1xuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnZHJpbGxkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IGZhbHNlXG4gICAgfSk7XG4gICAgdGhpcy4kc3VibWVudUFuY2hvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpLmlzLWRyaWxsZG93bi1zdWJtZW51LXBhcmVudCcpLmNoaWxkcmVuKCdhJyk7XG4gICAgdGhpcy4kc3VibWVudXMgPSB0aGlzLiRzdWJtZW51QW5jaG9ycy5wYXJlbnQoJ2xpJykuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykuYXR0cigncm9sZScsICdncm91cCcpO1xuICAgIHRoaXMuJG1lbnVJdGVtcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnbGknKS5ub3QoJy5qcy1kcmlsbGRvd24tYmFjaycpLmZpbmQoJ2EnKTtcblxuICAgIC8vIFNldCB0aGUgbWFpbiBtZW51IGFzIGN1cnJlbnQgYnkgZGVmYXVsdCAodW5sZXNzIGEgc3VibWVudSBpcyBzZWxlY3RlZClcbiAgICAvLyBVc2VkIHRvIHNldCB0aGUgd3JhcHBlciBoZWlnaHQgd2hlbiB0aGUgZHJpbGxkb3duIGlzIGNsb3NlZC9yZW9wZW5lZCBmcm9tIGFueSAoc3ViKW1lbnVcbiAgICB0aGlzLiRjdXJyZW50TWVudSA9IHRoaXMuJGVsZW1lbnQ7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2RhdGEtbXV0YXRlJywgKHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1kcmlsbGRvd24nKSB8fCBHZXRZb0RpZ2l0cyg2LCAnZHJpbGxkb3duJykpKTtcblxuICAgIHRoaXMuX3ByZXBhcmVNZW51KCk7XG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudHMoKTtcblxuICAgIHRoaXMuX2tleWJvYXJkRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogcHJlcGFyZXMgZHJpbGxkb3duIG1lbnUgYnkgc2V0dGluZyBhdHRyaWJ1dGVzIHRvIGxpbmtzIGFuZCBlbGVtZW50c1xuICAgKiBzZXRzIGEgbWluIGhlaWdodCB0byBwcmV2ZW50IGNvbnRlbnQganVtcGluZ1xuICAgKiB3cmFwcyB0aGUgZWxlbWVudCBpZiBub3QgYWxyZWFkeSB3cmFwcGVkXG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX3ByZXBhcmVNZW51KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy8gaWYoIXRoaXMub3B0aW9ucy5ob2xkT3Blbil7XG4gICAgLy8gICB0aGlzLl9tZW51TGlua0V2ZW50cygpO1xuICAgIC8vIH1cbiAgICB0aGlzLiRzdWJtZW51QW5jaG9ycy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJGxpbmsgPSAkKHRoaXMpO1xuICAgICAgdmFyICRzdWIgPSAkbGluay5wYXJlbnQoKTtcbiAgICAgIGlmKF90aGlzLm9wdGlvbnMucGFyZW50TGluayl7XG4gICAgICAgICRsaW5rLmNsb25lKCkucHJlcGVuZFRvKCRzdWIuY2hpbGRyZW4oJ1tkYXRhLXN1Ym1lbnVdJykpLndyYXAoJzxsaSBkYXRhLWlzLXBhcmVudC1saW5rIGNsYXNzPVwiaXMtc3VibWVudS1wYXJlbnQtaXRlbSBpcy1zdWJtZW51LWl0ZW0gaXMtZHJpbGxkb3duLXN1Ym1lbnUtaXRlbVwiIHJvbGU9XCJub25lXCI+PC9saT4nKTtcbiAgICAgIH1cbiAgICAgICRsaW5rLmRhdGEoJ3NhdmVkSHJlZicsICRsaW5rLmF0dHIoJ2hyZWYnKSkucmVtb3ZlQXR0cignaHJlZicpLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gICAgICAkbGluay5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKVxuICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAwLFxuICAgICAgICAgICAgJ3JvbGUnOiAnZ3JvdXAnXG4gICAgICAgICAgfSk7XG4gICAgICBfdGhpcy5fZXZlbnRzKCRsaW5rKTtcbiAgICB9KTtcbiAgICB0aGlzLiRzdWJtZW51cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgJG1lbnUgPSAkKHRoaXMpLFxuICAgICAgICAgICRiYWNrID0gJG1lbnUuZmluZCgnLmpzLWRyaWxsZG93bi1iYWNrJyk7XG4gICAgICBpZighJGJhY2subGVuZ3RoKXtcbiAgICAgICAgc3dpdGNoIChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b25Qb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICAgICRtZW51LmFwcGVuZChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgICAgJG1lbnUucHJlcGVuZChfdGhpcy5vcHRpb25zLmJhY2tCdXR0b24pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbnN1cHBvcnRlZCBiYWNrQnV0dG9uUG9zaXRpb24gdmFsdWUgJ1wiICsgX3RoaXMub3B0aW9ucy5iYWNrQnV0dG9uUG9zaXRpb24gKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF90aGlzLl9iYWNrKCRtZW51KTtcbiAgICB9KTtcblxuICAgIHRoaXMuJHN1Ym1lbnVzLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICBpZighdGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHRoaXMuJHN1Ym1lbnVzLmFkZENsYXNzKCdkcmlsbGRvd24tc3VibWVudS1jb3Zlci1wcmV2aW91cycpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIHdyYXBwZXIgb24gZWxlbWVudCBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgIGlmKCF0aGlzLiRlbGVtZW50LnBhcmVudCgpLmhhc0NsYXNzKCdpcy1kcmlsbGRvd24nKSl7XG4gICAgICB0aGlzLiR3cmFwcGVyID0gJCh0aGlzLm9wdGlvbnMud3JhcHBlcikuYWRkQ2xhc3MoJ2lzLWRyaWxsZG93bicpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmFuaW1hdGVIZWlnaHQpIHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoJ2FuaW1hdGUtaGVpZ2h0Jyk7XG4gICAgICB0aGlzLiRlbGVtZW50LndyYXAodGhpcy4kd3JhcHBlcik7XG4gICAgfVxuICAgIC8vIHNldCB3cmFwcGVyXG4gICAgdGhpcy4kd3JhcHBlciA9IHRoaXMuJGVsZW1lbnQucGFyZW50KCk7XG4gICAgdGhpcy4kd3JhcHBlci5jc3ModGhpcy5fZ2V0TWF4RGltcygpKTtcbiAgfVxuXG4gIF9yZXNpemUoKSB7XG4gICAgdGhpcy4kd3JhcHBlci5jc3MoeydtYXgtd2lkdGgnOiAnbm9uZScsICdtaW4taGVpZ2h0JzogJ25vbmUnfSk7XG4gICAgLy8gX2dldE1heERpbXMgaGFzIHNpZGUgZWZmZWN0cyAoYm9vKSBidXQgY2FsbGluZyBpdCBzaG91bGQgdXBkYXRlIGFsbCBvdGhlciBuZWNlc3NhcnkgaGVpZ2h0cyAmIHdpZHRoc1xuICAgIHRoaXMuJHdyYXBwZXIuY3NzKHRoaXMuX2dldE1heERpbXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBoYW5kbGVycyB0byBlbGVtZW50cyBpbiB0aGUgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSBjdXJyZW50IG1lbnUgaXRlbSB0byBhZGQgaGFuZGxlcnMgdG8uXG4gICAqL1xuICBfZXZlbnRzKCRlbGVtKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICRlbGVtLm9mZignY2xpY2suemYuZHJpbGxkb3duJylcbiAgICAub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmKCQoZS50YXJnZXQpLnBhcmVudHNVbnRpbCgndWwnLCAnbGknKS5oYXNDbGFzcygnaXMtZHJpbGxkb3duLXN1Ym1lbnUtcGFyZW50Jykpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQpe1xuICAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgICBfdGhpcy5fc2hvdygkZWxlbS5wYXJlbnQoJ2xpJykpO1xuXG4gICAgICBpZihfdGhpcy5vcHRpb25zLmNsb3NlT25DbGljayl7XG4gICAgICAgIHZhciAkYm9keSA9ICQoJ2JvZHknKTtcbiAgICAgICAgJGJvZHkub2ZmKCcuemYuZHJpbGxkb3duJykub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgaWYgKGV2LnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0gfHwgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZXYudGFyZ2V0KSkgeyByZXR1cm47IH1cbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIF90aGlzLl9oaWRlQWxsKCk7XG4gICAgICAgICAgJGJvZHkub2ZmKCcuemYuZHJpbGxkb3duJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIG1lbnUgZWxlbWVudC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgaWYodGhpcy5vcHRpb25zLnNjcm9sbFRvcCl7XG4gICAgICB0aGlzLl9iaW5kSGFuZGxlciA9IHRoaXMuX3Njcm9sbFRvcC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbignb3Blbi56Zi5kcmlsbGRvd24gaGlkZS56Zi5kcmlsbGRvd24gY2xvc2UuemYuZHJpbGxkb3duIGNsb3NlZC56Zi5kcmlsbGRvd24nLHRoaXMuX2JpbmRIYW5kbGVyKTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5vbignbXV0YXRlbWUuemYudHJpZ2dlcicsIHRoaXMuX3Jlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY3JvbGwgdG8gVG9wIG9mIEVsZW1lbnQgb3IgZGF0YS1zY3JvbGwtdG9wLWVsZW1lbnRcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jc2Nyb2xsbWVcbiAgICovXG4gIF9zY3JvbGxUb3AoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgJHNjcm9sbFRvcEVsZW1lbnQgPSBfdGhpcy5vcHRpb25zLnNjcm9sbFRvcEVsZW1lbnQgIT09ICcnPyQoX3RoaXMub3B0aW9ucy5zY3JvbGxUb3BFbGVtZW50KTpfdGhpcy4kZWxlbWVudCxcbiAgICAgICAgc2Nyb2xsUG9zID0gcGFyc2VJbnQoJHNjcm9sbFRvcEVsZW1lbnQub2Zmc2V0KCkudG9wK190aGlzLm9wdGlvbnMuc2Nyb2xsVG9wT2Zmc2V0LCAxMCk7XG4gICAgJCgnaHRtbCwgYm9keScpLnN0b3AodHJ1ZSkuYW5pbWF0ZSh7IHNjcm9sbFRvcDogc2Nyb2xsUG9zIH0sIF90aGlzLm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24sIF90aGlzLm9wdGlvbnMuYW5pbWF0aW9uRWFzaW5nLGZ1bmN0aW9uKCl7XG4gICAgICAvKipcbiAgICAgICAgKiBGaXJlcyBhZnRlciB0aGUgbWVudSBoYXMgc2Nyb2xsZWRcbiAgICAgICAgKiBAZXZlbnQgRHJpbGxkb3duI3Njcm9sbG1lXG4gICAgICAgICovXG4gICAgICBpZih0aGlzPT09JCgnaHRtbCcpWzBdKV90aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Njcm9sbG1lLnpmLmRyaWxsZG93bicpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMga2V5ZG93biBldmVudCBsaXN0ZW5lciB0byBgbGlgJ3MgaW4gdGhlIG1lbnUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfa2V5Ym9hcmRFdmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJG1lbnVJdGVtcy5hZGQodGhpcy4kZWxlbWVudC5maW5kKCcuanMtZHJpbGxkb3duLWJhY2sgPiBhLCAuaXMtc3VibWVudS1wYXJlbnQtaXRlbSA+IGEnKSkub24oJ2tleWRvd24uemYuZHJpbGxkb3duJywgZnVuY3Rpb24oZSl7XG4gICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICRlbGVtZW50cyA9ICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykuY2hpbGRyZW4oJ2xpJykuY2hpbGRyZW4oJ2EnKSxcbiAgICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICAgJG5leHRFbGVtZW50O1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50cy5lcShNYXRoLm1heCgwLCBpLTEpKTtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5taW4oaSsxLCAkZWxlbWVudHMubGVuZ3RoLTEpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0RyaWxsZG93bicsIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCRlbGVtZW50LmlzKF90aGlzLiRzdWJtZW51QW5jaG9ycykpIHtcbiAgICAgICAgICAgIF90aGlzLl9zaG93KCRlbGVtZW50LnBhcmVudCgnbGknKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykub25lKHRyYW5zaXRpb25lbmQoJGVsZW1lbnQpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoJ2xpJykuZmluZCgndWwgbGkgYScpLm5vdCgnLmpzLWRyaWxsZG93bi1iYWNrIGEnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykpO1xuICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykub25lKHRyYW5zaXRpb25lbmQoJGVsZW1lbnQpLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKS5wYXJlbnQoJ2xpJykuY2hpbGRyZW4oJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRwcmV2RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIC8vIERvbid0IHRhcCBmb2N1cyBvbiBmaXJzdCBlbGVtZW50IGluIHJvb3QgdWxcbiAgICAgICAgICByZXR1cm4gISRlbGVtZW50LmlzKF90aGlzLiRlbGVtZW50LmZpbmQoJz4gbGk6Zmlyc3QtY2hpbGQgPiBhJykpO1xuICAgICAgICB9LFxuICAgICAgICBkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkbmV4dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAvLyBEb24ndCB0YXAgZm9jdXMgb24gbGFzdCBlbGVtZW50IGluIHJvb3QgdWxcbiAgICAgICAgICByZXR1cm4gISRlbGVtZW50LmlzKF90aGlzLiRlbGVtZW50LmZpbmQoJz4gbGk6bGFzdC1jaGlsZCA+IGEnKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBEb24ndCBjbG9zZSBvbiBlbGVtZW50IGluIHJvb3QgdWxcbiAgICAgICAgICBpZiAoISRlbGVtZW50LmlzKF90aGlzLiRlbGVtZW50LmZpbmQoJz4gbGkgPiBhJykpKSB7XG4gICAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKSk7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygnYScpLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5wYXJlbnRMaW5rICYmICRlbGVtZW50LmF0dHIoJ2hyZWYnKSkgeyAvLyBMaW5rIHdpdGggaHJlZlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoISRlbGVtZW50LmlzKF90aGlzLiRtZW51SXRlbXMpKSB7IC8vIG5vdCBtZW51IGl0ZW0gbWVhbnMgYmFjayBidXR0b25cbiAgICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtZW50LnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykpO1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbWVudCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50KCdsaScpLnBhcmVudCgndWwnKS5wYXJlbnQoJ2xpJykuY2hpbGRyZW4oJ2EnKS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRlbGVtZW50LmlzKF90aGlzLiRzdWJtZW51QW5jaG9ycykpIHsgLy8gU3ViIG1lbnUgaXRlbVxuICAgICAgICAgICAgX3RoaXMuX3Nob3coJGVsZW1lbnQucGFyZW50KCdsaScpKTtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbWVudCksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgnbGknKS5maW5kKCd1bCBsaSBhJykubm90KCcuanMtZHJpbGxkb3duLWJhY2sgYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVkOiBmdW5jdGlvbihwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7IC8vIGVuZCBrZXlib2FyZEFjY2Vzc1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyBhbGwgb3BlbiBlbGVtZW50cywgYW5kIHJldHVybnMgdG8gcm9vdCBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIERyaWxsZG93biNjbG9zZVxuICAgKiBAZmlyZXMgRHJpbGxkb3duI2Nsb3NlZFxuICAgKi9cbiAgX2hpZGVBbGwoKSB7XG4gICAgdmFyICRlbGVtID0gdGhpcy4kZWxlbWVudC5maW5kKCcuaXMtZHJpbGxkb3duLXN1Ym1lbnUuaXMtYWN0aXZlJylcbiAgICAkZWxlbS5hZGRDbGFzcygnaXMtY2xvc2luZycpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB7XG4gICAgICBjb25zdCBjYWxjSGVpZ2h0ID0gJGVsZW0ucGFyZW50KCkuY2xvc2VzdCgndWwnKS5kYXRhKCdjYWxjSGVpZ2h0Jyk7XG4gICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7IGhlaWdodDogY2FsY0hlaWdodCB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBtZW51IGlzIGNsb3NpbmcuXG4gICAgICogQGV2ZW50IERyaWxsZG93biNjbG9zZVxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2UuemYuZHJpbGxkb3duJyk7XG5cbiAgICAkZWxlbS5vbmUodHJhbnNpdGlvbmVuZCgkZWxlbSksICgpID0+IHtcbiAgICAgICRlbGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUgaXMtY2xvc2luZycpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgZnVsbHkgY2xvc2VkLlxuICAgICAgICogQGV2ZW50IERyaWxsZG93biNjbG9zZWRcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZWQuemYuZHJpbGxkb3duJyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lciBmb3IgZWFjaCBgYmFja2AgYnV0dG9uLCBhbmQgY2xvc2VzIG9wZW4gbWVudXMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI2JhY2tcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgc3ViLW1lbnUgdG8gYWRkIGBiYWNrYCBldmVudC5cbiAgICovXG4gIF9iYWNrKCRlbGVtKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAkZWxlbS5vZmYoJ2NsaWNrLnpmLmRyaWxsZG93bicpO1xuICAgICRlbGVtLmNoaWxkcmVuKCcuanMtZHJpbGxkb3duLWJhY2snKVxuICAgICAgLm9uKCdjbGljay56Zi5kcmlsbGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX2hpZGUoJGVsZW0pO1xuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IHN1Ym1lbnUsIGNhbGwgc2hvd1xuICAgICAgICBsZXQgcGFyZW50U3ViTWVudSA9ICRlbGVtLnBhcmVudCgnbGknKS5wYXJlbnQoJ3VsJykucGFyZW50KCdsaScpO1xuICAgICAgICBpZiAocGFyZW50U3ViTWVudS5sZW5ndGgpIHtcbiAgICAgICAgICBfdGhpcy5fc2hvdyhwYXJlbnRTdWJNZW51KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBfdGhpcy4kY3VycmVudE1lbnUgPSBfdGhpcy4kZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudCBsaXN0ZW5lciB0byBtZW51IGl0ZW1zIHcvbyBzdWJtZW51cyB0byBjbG9zZSBvcGVuIG1lbnVzIG9uIGNsaWNrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tZW51TGlua0V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJG1lbnVJdGVtcy5ub3QoJy5pcy1kcmlsbGRvd24tc3VibWVudS1wYXJlbnQnKVxuICAgICAgICAub2ZmKCdjbGljay56Zi5kcmlsbGRvd24nKVxuICAgICAgICAub24oJ2NsaWNrLnpmLmRyaWxsZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5faGlkZUFsbCgpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgQ1NTIGNsYXNzZXMgZm9yIHN1Ym1lbnUgdG8gc2hvdyBpdC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbSAtIHRoZSB0YXJnZXQgc3VibWVudSAoYHVsYCB0YWcpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJpZ2dlciAtIHRyaWdnZXIgZHJpbGxkb3duIGV2ZW50XG4gICAqL1xuICBfc2V0U2hvd1N1Yk1lbnVDbGFzc2VzKCRlbGVtLCB0cmlnZ2VyKSB7XG4gICAgJGVsZW0uYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKS5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICAkZWxlbS5wYXJlbnQoJ2xpJykuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIGlmICh0cmlnZ2VyID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW4uemYuZHJpbGxkb3duJywgWyRlbGVtXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIENTUyBjbGFzc2VzIGZvciBzdWJtZW51IHRvIGhpZGUgaXQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgdGFyZ2V0IHN1Ym1lbnUgKGB1bGAgdGFnKVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaWdnZXIgLSB0cmlnZ2VyIGRyaWxsZG93biBldmVudFxuICAgKi9cbiAgX3NldEhpZGVTdWJNZW51Q2xhc3NlcygkZWxlbSwgdHJpZ2dlcikge1xuICAgICRlbGVtLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKS5hZGRDbGFzcygnaW52aXNpYmxlJykuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAkZWxlbS5wYXJlbnQoJ2xpJykuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICBpZiAodHJpZ2dlciA9PT0gdHJ1ZSkge1xuICAgICAgJGVsZW0udHJpZ2dlcignaGlkZS56Zi5kcmlsbGRvd24nLCBbJGVsZW1dKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYSBzcGVjaWZpYyBkcmlsbGRvd24gKHN1YiltZW51IG5vIG1hdHRlciB3aGljaCAoc3ViKW1lbnUgaW4gaXQgaXMgY3VycmVudGx5IHZpc2libGUuXG4gICAqIENvbXBhcmVkIHRvIF9zaG93KCkgdGhpcyBsZXRzIHlvdSBqdW1wIGludG8gYW55IHN1Ym1lbnUgd2l0aG91dCBjbGlja2luZyB0aHJvdWdoIGV2ZXJ5IHN1Ym1lbnUgb24gdGhlIHdheSB0byBpdC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcmlsbGRvd24jb3BlblxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVsZW0gLSB0aGUgdGFyZ2V0IChzdWIpbWVudSAoYHVsYCB0YWcpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0ZvY3VzIC0gaWYgdHJ1ZSB0aGUgZmlyc3QgbGluayBpbiB0aGUgdGFyZ2V0IChzdWIpbWVudSBnZXRzIGF1dG8gZm9jdXNlZFxuICAgKi9cbiAgX3Nob3dNZW51KCRlbGVtLCBhdXRvRm9jdXMpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBSZXNldCBkcmlsbGRvd25cbiAgICB2YXIgJGV4cGFuZGVkU3VibWVudXMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ2xpW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdID4gdWxbZGF0YS1zdWJtZW51XScpO1xuICAgICRleHBhbmRlZFN1Ym1lbnVzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5fc2V0SGlkZVN1Yk1lbnVDbGFzc2VzKCQodGhpcykpO1xuICAgIH0pO1xuXG4gICAgLy8gU2F2ZSB0aGUgbWVudSBhcyB0aGUgY3VycmVudGx5IGRpc3BsYXllZCBvbmUuXG4gICAgdGhpcy4kY3VycmVudE1lbnUgPSAkZWxlbTtcblxuICAgIC8vIElmIHRhcmdldCBtZW51IGlzIHJvb3QsIGZvY3VzIGZpcnN0IGxpbmsgJiBleGl0XG4gICAgaWYgKCRlbGVtLmlzKCdbZGF0YS1kcmlsbGRvd25dJykpIHtcbiAgICAgIGlmIChhdXRvRm9jdXMgPT09IHRydWUpICRlbGVtLmZpbmQoJ2xpID4gYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkgdGhpcy4kd3JhcHBlci5jc3MoJ2hlaWdodCcsICRlbGVtLmRhdGEoJ2NhbGNIZWlnaHQnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCBhbGwgc3VibWVudXMgb24gd2F5IHRvIHJvb3QgaW5jbC4gdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgdmFyICRzdWJtZW51cyA9ICRlbGVtLmNoaWxkcmVuKCkuZmlyc3QoKS5wYXJlbnRzVW50aWwoJ1tkYXRhLWRyaWxsZG93bl0nLCAnW2RhdGEtc3VibWVudV0nKTtcblxuICAgIC8vIE9wZW4gdGFyZ2V0IG1lbnUgYW5kIGFsbCBzdWJtZW51cyBvbiBpdHMgd2F5IHRvIHJvb3RcbiAgICAkc3VibWVudXMuZWFjaChmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAvLyBVcGRhdGUgaGVpZ2h0IG9mIGZpcnN0IGNoaWxkICh0YXJnZXQgbWVudSkgaWYgYXV0b0hlaWdodCBvcHRpb24gdHJ1ZVxuICAgICAgaWYgKGluZGV4ID09PSAwICYmIF90aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgICBfdGhpcy4kd3JhcHBlci5jc3MoJ2hlaWdodCcsICQodGhpcykuZGF0YSgnY2FsY0hlaWdodCcpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGlzTGFzdENoaWxkID0gaW5kZXggPT09ICRzdWJtZW51cy5sZW5ndGggLSAxO1xuXG4gICAgICAvLyBBZGQgdHJhbnNpdGlvbnNlbmQgbGlzdGVuZXIgdG8gbGFzdCBjaGlsZCAocm9vdCBkdWUgdG8gcmV2ZXJzZSBvcmRlcikgdG8gb3BlbiB0YXJnZXQgbWVudSdzIGZpcnN0IGxpbmtcbiAgICAgIC8vIExhc3QgY2hpbGQgbWFrZXMgc3VyZSB0aGUgZXZlbnQgZ2V0cyBhbHdheXMgdHJpZ2dlcmVkIGV2ZW4gaWYgZ29pbmcgdGhyb3VnaCBzZXZlcmFsIG1lbnVzXG4gICAgICBpZiAoaXNMYXN0Q2hpbGQgPT09IHRydWUpIHtcbiAgICAgICAgJCh0aGlzKS5vbmUodHJhbnNpdGlvbmVuZCgkKHRoaXMpKSwgKCkgPT4ge1xuICAgICAgICAgIGlmIChhdXRvRm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICRlbGVtLmZpbmQoJ2xpID4gYScpLmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBfdGhpcy5fc2V0U2hvd1N1Yk1lbnVDbGFzc2VzKCQodGhpcyksIGlzTGFzdENoaWxkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhIHN1Ym1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI29wZW5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgZWxlbWVudCB3aXRoIGEgc3VibWVudSB0byBvcGVuLCBpLmUuIHRoZSBgbGlgIHRhZy5cbiAgICovXG4gIF9zaG93KCRlbGVtKSB7XG4gICAgY29uc3QgJHN1Ym1lbnUgPSAkZWxlbS5jaGlsZHJlbignW2RhdGEtc3VibWVudV0nKTtcblxuICAgICRlbGVtLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgIHRoaXMuJGN1cnJlbnRNZW51ID0gJHN1Ym1lbnU7XG5cbiAgICAvL2hpZGUgZHJpbGxkb3duIHBhcmVudCBtZW51IHdoZW4gc3VibWVudSBpcyBvcGVuXG4gICAgLy8gdGhpcyByZW1vdmVzIGl0IGZyb20gdGhlIGRvbSBzbyB0aGF0IHRoZSB0YWIga2V5IHdpbGwgdGFrZSB0aGUgdXNlciB0byB0aGUgbmV4dCB2aXNpYmxlIGVsZW1lbnRcbiAgICAkZWxlbS5wYXJlbnQoKS5jbG9zZXN0KCd1bCcpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcblxuICAgIC8vIGFkZCB2aXNpYmxlIGNsYXNzIHRvIHN1Ym1lbnUgdG8gb3ZlcnJpZGUgaW52aXNpYmxlIGNsYXNzIGFib3ZlXG4gICAgJHN1Ym1lbnUuYWRkQ2xhc3MoJ2lzLWFjdGl2ZSB2aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB7XG4gICAgICB0aGlzLiR3cmFwcGVyLmNzcyh7IGhlaWdodDogJHN1Ym1lbnUuZGF0YSgnY2FsY0hlaWdodCcpIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIHN1Ym1lbnUgaGFzIG9wZW5lZC5cbiAgICAgKiBAZXZlbnQgRHJpbGxkb3duI29wZW5cbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW4uemYuZHJpbGxkb3duJywgWyRlbGVtXSk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYSBzdWJtZW51XG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJpbGxkb3duI2hpZGVcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gdGhlIGN1cnJlbnQgc3ViLW1lbnUgdG8gaGlkZSwgaS5lLiB0aGUgYHVsYCB0YWcuXG4gICAqL1xuICBfaGlkZSgkZWxlbSkge1xuICAgIGlmKHRoaXMub3B0aW9ucy5hdXRvSGVpZ2h0KSB0aGlzLiR3cmFwcGVyLmNzcyh7aGVpZ2h0OiRlbGVtLnBhcmVudCgpLmNsb3Nlc3QoJ3VsJykuZGF0YSgnY2FsY0hlaWdodCcpfSk7XG4gICAgJGVsZW0ucGFyZW50KCkuY2xvc2VzdCgndWwnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgJGVsZW0ucGFyZW50KCdsaScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgJGVsZW0uYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAkZWxlbS5hZGRDbGFzcygnaXMtY2xvc2luZycpXG4gICAgICAgICAub25lKHRyYW5zaXRpb25lbmQoJGVsZW0pLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAkZWxlbS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcgdmlzaWJsZScpO1xuICAgICAgICAgICAkZWxlbS5ibHVyKCkuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgfSk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgc3VibWVudSBoYXMgY2xvc2VkLlxuICAgICAqIEBldmVudCBEcmlsbGRvd24jaGlkZVxuICAgICAqL1xuICAgICRlbGVtLnRyaWdnZXIoJ2hpZGUuemYuZHJpbGxkb3duJywgWyRlbGVtXSk7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGhyb3VnaCB0aGUgbmVzdGVkIG1lbnVzIHRvIGNhbGN1bGF0ZSB0aGUgbWluLWhlaWdodCwgYW5kIG1heC13aWR0aCBmb3IgdGhlIG1lbnUuXG4gICAqIFByZXZlbnRzIGNvbnRlbnQganVtcGluZy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0TWF4RGltcygpIHtcbiAgICB2YXIgbWF4SGVpZ2h0ID0gMCwgcmVzdWx0ID0ge30sIF90aGlzID0gdGhpcztcblxuICAgIC8vIFJlY2FsY3VsYXRlIG1lbnUgaGVpZ2h0cyBhbmQgdG90YWwgbWF4IGhlaWdodFxuICAgIHRoaXMuJHN1Ym1lbnVzLmFkZCh0aGlzLiRlbGVtZW50KS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaGVpZ2h0ID0gQm94LkdldERpbWVuc2lvbnModGhpcykuaGVpZ2h0O1xuXG4gICAgICBtYXhIZWlnaHQgPSBoZWlnaHQgPiBtYXhIZWlnaHQgPyBoZWlnaHQgOiBtYXhIZWlnaHQ7XG5cbiAgICAgIGlmKF90aGlzLm9wdGlvbnMuYXV0b0hlaWdodCkge1xuICAgICAgICAkKHRoaXMpLmRhdGEoJ2NhbGNIZWlnaHQnLGhlaWdodCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9IZWlnaHQpXG4gICAgICByZXN1bHQuaGVpZ2h0ID0gdGhpcy4kY3VycmVudE1lbnUuZGF0YSgnY2FsY0hlaWdodCcpO1xuICAgIGVsc2VcbiAgICAgIHJlc3VsdFsnbWluLWhlaWdodCddID0gYCR7bWF4SGVpZ2h0fXB4YDtcblxuICAgIHJlc3VsdFsnbWF4LXdpZHRoJ10gPSBgJHt0aGlzLiRlbGVtZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRofXB4YDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIERyaWxsZG93biBNZW51XG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgJCgnYm9keScpLm9mZignLnpmLmRyaWxsZG93bicpO1xuICAgIGlmKHRoaXMub3B0aW9ucy5zY3JvbGxUb3ApIHRoaXMuJGVsZW1lbnQub2ZmKCcuemYuZHJpbGxkb3duJyx0aGlzLl9iaW5kSGFuZGxlcik7XG4gICAgdGhpcy5faGlkZUFsbCgpO1xuXHQgIHRoaXMuJGVsZW1lbnQub2ZmKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgTmVzdC5CdXJuKHRoaXMuJGVsZW1lbnQsICdkcmlsbGRvd24nKTtcbiAgICB0aGlzLiRlbGVtZW50LnVud3JhcCgpXG4gICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZHJpbGxkb3duLWJhY2ssIC5pcy1zdWJtZW51LXBhcmVudC1pdGVtJykucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgLmVuZCgpLmZpbmQoJy5pcy1hY3RpdmUsIC5pcy1jbG9zaW5nLCAuaXMtZHJpbGxkb3duLXN1Ym1lbnUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlIGlzLWNsb3NpbmcgaXMtZHJpbGxkb3duLXN1Ym1lbnUnKS5vZmYoJ3RyYW5zaXRpb25lbmQgb3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCcpXG4gICAgICAgICAgICAgICAgIC5lbmQoKS5maW5kKCdbZGF0YS1zdWJtZW51XScpLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIHRhYmluZGV4IHJvbGUnKTtcbiAgICB0aGlzLiRzdWJtZW51QW5jaG9ycy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5vZmYoJy56Zi5kcmlsbGRvd24nKTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtaXMtcGFyZW50LWxpbmtdJykuZGV0YWNoKCk7XG4gICAgdGhpcy4kc3VibWVudXMucmVtb3ZlQ2xhc3MoJ2RyaWxsZG93bi1zdWJtZW51LWNvdmVyLXByZXZpb3VzIGludmlzaWJsZScpO1xuXG4gICAgdGhpcy4kZWxlbWVudC5maW5kKCdhJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICAgICRsaW5rLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICBpZigkbGluay5kYXRhKCdzYXZlZEhyZWYnKSl7XG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCAkbGluay5kYXRhKCdzYXZlZEhyZWYnKSkucmVtb3ZlRGF0YSgnc2F2ZWRIcmVmJyk7XG4gICAgICB9ZWxzZXsgcmV0dXJuOyB9XG4gICAgfSk7XG4gIH07XG59XG5cbkRyaWxsZG93bi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIERyaWxsZG93bnMgZGVwZW5kIG9uIHN0eWxlcyBpbiBvcmRlciB0byBmdW5jdGlvbiBwcm9wZXJseTsgaW4gdGhlIGRlZmF1bHQgYnVpbGQgb2YgRm91bmRhdGlvbiB0aGVzZSBhcmVcbiAgICogb24gdGhlIGBkcmlsbGRvd25gIGNsYXNzLiBUaGlzIG9wdGlvbiBhdXRvLWFwcGxpZXMgdGhpcyBjbGFzcyB0byB0aGUgZHJpbGxkb3duIHVwb24gaW5pdGlhbGl6YXRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9BcHBseUNsYXNzOiB0cnVlLFxuICAvKipcbiAgICogTWFya3VwIHVzZWQgZm9yIEpTIGdlbmVyYXRlZCBiYWNrIGJ1dHRvbi4gUHJlcGVuZGVkICBvciBhcHBlbmRlZCAoc2VlIGJhY2tCdXR0b25Qb3NpdGlvbikgdG8gc3VibWVudSBsaXN0cyBhbmQgZGVsZXRlZCBvbiBgZGVzdHJveWAgbWV0aG9kLCAnanMtZHJpbGxkb3duLWJhY2snIGNsYXNzIHJlcXVpcmVkLiBSZW1vdmUgdGhlIGJhY2tzbGFzaCAoYFxcYCkgaWYgY29weSBhbmQgcGFzdGluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnPGxpIGNsYXNzPVwianMtZHJpbGxkb3duLWJhY2tcIj48YSB0YWJpbmRleD1cIjBcIj5CYWNrPC9hPjwvbGk+J1xuICAgKi9cbiAgYmFja0J1dHRvbjogJzxsaSBjbGFzcz1cImpzLWRyaWxsZG93bi1iYWNrXCI+PGEgdGFiaW5kZXg9XCIwXCI+QmFjazwvYT48L2xpPicsXG4gIC8qKlxuICAgKiBQb3NpdGlvbiB0aGUgYmFjayBidXR0b24gZWl0aGVyIGF0IHRoZSB0b3Agb3IgYm90dG9tIG9mIGRyaWxsZG93biBzdWJtZW51cy4gQ2FuIGJlIGAnbGVmdCdgIG9yIGAnYm90dG9tJ2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgdG9wXG4gICAqL1xuICBiYWNrQnV0dG9uUG9zaXRpb246ICd0b3AnLFxuICAvKipcbiAgICogTWFya3VwIHVzZWQgdG8gd3JhcCBkcmlsbGRvd24gbWVudS4gVXNlIGEgY2xhc3MgbmFtZSBmb3IgaW5kZXBlbmRlbnQgc3R5bGluZzsgdGhlIEpTIGFwcGxpZWQgY2xhc3M6IGBpcy1kcmlsbGRvd25gIGlzIHJlcXVpcmVkLiBSZW1vdmUgdGhlIGJhY2tzbGFzaCAoYFxcYCkgaWYgY29weSBhbmQgcGFzdGluZy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnPGRpdj48L2Rpdj4nXG4gICAqL1xuICB3cmFwcGVyOiAnPGRpdj48L2Rpdj4nLFxuICAvKipcbiAgICogQWRkcyB0aGUgcGFyZW50IGxpbmsgdG8gdGhlIHN1Ym1lbnUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBwYXJlbnRMaW5rOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBtZW51IHRvIHJldHVybiB0byByb290IGxpc3Qgb24gYm9keSBjbGljay5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsb3NlT25DbGljazogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgbWVudSB0byBhdXRvIGFkanVzdCBoZWlnaHQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgLyoqXG4gICAqIEFuaW1hdGUgdGhlIGF1dG8gYWRqdXN0IGhlaWdodC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFuaW1hdGVIZWlnaHQ6IGZhbHNlLFxuICAvKipcbiAgICogU2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIG1lbnUgYWZ0ZXIgb3BlbmluZyBhIHN1Ym1lbnUgb3IgbmF2aWdhdGluZyBiYWNrIHVzaW5nIHRoZSBtZW51IGJhY2sgYnV0dG9uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBzY3JvbGxUb3A6IGZhbHNlLFxuICAvKipcbiAgICogU3RyaW5nIGpxdWVyeSBzZWxlY3RvciAoZm9yIGV4YW1wbGUgJ2JvZHknKSBvZiBlbGVtZW50IHRvIHRha2Ugb2Zmc2V0KCkudG9wIGZyb20sIGlmIGVtcHR5IHN0cmluZyB0aGUgZHJpbGxkb3duIG1lbnUgb2Zmc2V0KCkudG9wIGlzIHRha2VuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIHNjcm9sbFRvcEVsZW1lbnQ6ICcnLFxuICAvKipcbiAgICogU2Nyb2xsVG9wIG9mZnNldFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHNjcm9sbFRvcE9mZnNldDogMCxcbiAgLyoqXG4gICAqIFNjcm9sbCBhbmltYXRpb24gZHVyYXRpb25cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gIC8qKlxuICAgKiBTY3JvbGwgYW5pbWF0aW9uIGVhc2luZy4gQ2FuIGJlIGAnc3dpbmcnYCBvciBgJ2xpbmVhcidgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vYXBpLmpxdWVyeS5jb20vYW5pbWF0ZXxKUXVlcnkgYW5pbWF0ZX1cbiAgICogQGRlZmF1bHQgJ3N3aW5nJ1xuICAgKi9cbiAgYW5pbWF0aW9uRWFzaW5nOiAnc3dpbmcnXG4gIC8vIGhvbGRPcGVuOiBmYWxzZVxufTtcblxuZXhwb3J0IHtEcmlsbGRvd259O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEtleWJvYXJkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmQnO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMsIGlnbm9yZU1vdXNlZGlzYXBwZWFyIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgUG9zaXRpb25hYmxlIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBvc2l0aW9uYWJsZSc7XG5cbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuaW1wb3J0IHsgVG91Y2ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50b3VjaCdcblxuLyoqXG4gKiBEcm9wZG93biBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJvcGRvd25cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwua2V5Ym9hcmRcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuYm94XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRvdWNoXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cbmNsYXNzIERyb3Bkb3duIGV4dGVuZHMgUG9zaXRpb25hYmxlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBkcm9wZG93bi5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIERyb3Bkb3duXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYSBkcm9wZG93bi5cbiAgICogICAgICAgIE9iamVjdCBzaG91bGQgYmUgb2YgdGhlIGRyb3Bkb3duIHBhbmVsLCByYXRoZXIgdGhhbiBpdHMgYW5jaG9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBEcm9wZG93bi5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ0Ryb3Bkb3duJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICAvLyBUb3VjaCBhbmQgVHJpZ2dlcnMgaW5pdCBhcmUgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSB0aGV5IGFyZSBpbml0aWFsaXplZFxuICAgIFRvdWNoLmluaXQoJCk7XG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdEcm9wZG93bicsIHtcbiAgICAgICdFTlRFUic6ICd0b2dnbGUnLFxuICAgICAgJ1NQQUNFJzogJ3RvZ2dsZScsXG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwbHVnaW4gYnkgc2V0dGluZy9jaGVja2luZyBvcHRpb25zIGFuZCBhdHRyaWJ1dGVzLCBhZGRpbmcgaGVscGVyIHZhcmlhYmxlcywgYW5kIHNhdmluZyB0aGUgYW5jaG9yLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciAkaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG5cbiAgICB0aGlzLiRhbmNob3JzID0gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkubGVuZ3RoID8gJChgW2RhdGEtdG9nZ2xlPVwiJHskaWR9XCJdYCkgOiAkKGBbZGF0YS1vcGVuPVwiJHskaWR9XCJdYCk7XG4gICAgdGhpcy4kYW5jaG9ycy5hdHRyKHtcbiAgICAgICdhcmlhLWNvbnRyb2xzJzogJGlkLFxuICAgICAgJ2RhdGEtaXMtZm9jdXMnOiBmYWxzZSxcbiAgICAgICdkYXRhLXlldGktYm94JzogJGlkLFxuICAgICAgJ2FyaWEtaGFzcG9wdXAnOiB0cnVlLFxuICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzLiRhbmNob3JzLmZpcnN0KCkpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLnBhcmVudENsYXNzKXtcbiAgICAgIHRoaXMuJHBhcmVudCA9IHRoaXMuJGVsZW1lbnQucGFyZW50cygnLicgKyB0aGlzLm9wdGlvbnMucGFyZW50Q2xhc3MpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy4kcGFyZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZXQgW2FyaWEtbGFiZWxsZWRieV0gb24gdGhlIERyb3Bkb3duIGlmIGl0IGlzIG5vdCBzZXRcbiAgICBpZiAodHlwZW9mIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1sYWJlbGxlZGJ5JykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBHZXQgdGhlIGFuY2hvciBJRCBvciBjcmVhdGUgb25lXG4gICAgICBpZiAodHlwZW9mIHRoaXMuJGN1cnJlbnRBbmNob3IuYXR0cignaWQnKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy4kY3VycmVudEFuY2hvci5hdHRyKCdpZCcsIEdldFlvRGlnaXRzKDYsICdkZC1hbmNob3InKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1sYWJlbGxlZGJ5JywgdGhpcy4kY3VycmVudEFuY2hvci5hdHRyKCdpZCcpKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgJ2RhdGEteWV0aS1ib3gnOiAkaWQsXG4gICAgICAnZGF0YS1yZXNpemUnOiAkaWQsXG4gICAgfSk7XG5cbiAgICBzdXBlci5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgX2dldERlZmF1bHRQb3NpdGlvbigpIHtcbiAgICAvLyBoYW5kbGUgbGVnYWN5IGNsYXNzbmFtZXNcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZS5tYXRjaCgvKHRvcHxsZWZ0fHJpZ2h0fGJvdHRvbSkvZyk7XG4gICAgaWYocG9zaXRpb24pIHtcbiAgICAgIHJldHVybiBwb3NpdGlvblswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdib3R0b20nXG4gICAgfVxuICB9XG5cbiAgX2dldERlZmF1bHRBbGlnbm1lbnQoKSB7XG4gICAgLy8gaGFuZGxlIGxlZ2FjeSBmbG9hdCBhcHByb2FjaFxuICAgIHZhciBob3Jpem9udGFsUG9zaXRpb24gPSAvZmxvYXQtKFxcUyspLy5leGVjKHRoaXMuJGN1cnJlbnRBbmNob3IuYXR0cignY2xhc3MnKSk7XG4gICAgaWYoaG9yaXpvbnRhbFBvc2l0aW9uKSB7XG4gICAgICByZXR1cm4gaG9yaXpvbnRhbFBvc2l0aW9uWzFdO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5fZ2V0RGVmYXVsdEFsaWdubWVudCgpO1xuICB9XG5cblxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBhbmQgb3JpZW50YXRpb24gb2YgdGhlIGRyb3Bkb3duIHBhbmUsIGNoZWNrcyBmb3IgY29sbGlzaW9ucyBpZiBhbGxvdy1vdmVybGFwIGlzIG5vdCB0cnVlLlxuICAgKiBSZWN1cnNpdmVseSBjYWxscyBpdHNlbGYgaWYgYSBjb2xsaXNpb24gaXMgZGV0ZWN0ZWQsIHdpdGggYSBuZXcgcG9zaXRpb24gY2xhc3MuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYGhhcy1wb3NpdGlvbi0ke3RoaXMucG9zaXRpb259IGhhcy1hbGlnbm1lbnQtJHt0aGlzLmFsaWdubWVudH1gKTtcbiAgICBzdXBlci5fc2V0UG9zaXRpb24odGhpcy4kY3VycmVudEFuY2hvciwgdGhpcy4kZWxlbWVudCwgdGhpcy4kcGFyZW50KTtcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKGBoYXMtcG9zaXRpb24tJHt0aGlzLnBvc2l0aW9ufSBoYXMtYWxpZ25tZW50LSR7dGhpcy5hbGlnbm1lbnR9YCk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBpdCBhIGN1cnJlbnQgYW5jaG9yLlxuICAgKiBDdXJyZW50IGFuY2hvciBhcyB0aGUgcmVmZXJlbmNlIGZvciB0aGUgcG9zaXRpb24gb2YgRHJvcGRvd24gcGFuZXMuXG4gICAqIEBwYXJhbSB7SFRNTH0gZWwgLSBET00gZWxlbWVudCBvZiB0aGUgYW5jaG9yLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRDdXJyZW50QW5jaG9yKGVsKSB7XG4gICAgdGhpcy4kY3VycmVudEFuY2hvciA9ICQoZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBlbGVtZW50IHV0aWxpemluZyB0aGUgdHJpZ2dlcnMgdXRpbGl0eSBsaWJyYXJ5LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgaGFzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ICE9PSAndW5kZWZpbmVkJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdyZXNpemVtZS56Zi50cmlnZ2VyJzogdGhpcy5fc2V0UG9zaXRpb24uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gICAgdGhpcy4kYW5jaG9ycy5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInKVxuICAgICAgLm9uKCdjbGljay56Zi50cmlnZ2VyJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBfdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgLy8gaWYgZm9yY2VGb2xsb3cgZmFsc2UsIGFsd2F5cyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uXG4gICAgICAgICAgKF90aGlzLm9wdGlvbnMuZm9yY2VGb2xsb3cgPT09IGZhbHNlKSB8fFxuICAgICAgICAgIC8vIGlmIGZvcmNlRm9sbG93IHRydWUgYW5kIGhvdmVyIG9wdGlvbiB0cnVlLCBvbmx5IHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gb24gMXN0IGNsaWNrXG4gICAgICAgICAgLy8gb24gMm5kIGNsaWNrIChkcm9wb3duIG9wZW5lZCkgdGhlIGRlZmF1bHQgYWN0aW9uIChlLmcuIGZvbGxvdyBhIGhyZWYpIGdldHMgZXhlY3V0ZWRcbiAgICAgICAgICAoaGFzVG91Y2ggJiYgX3RoaXMub3B0aW9ucy5ob3ZlciAmJiBfdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpID09PSBmYWxzZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuaG92ZXIpe1xuICAgICAgdGhpcy4kYW5jaG9ycy5vZmYoJ21vdXNlZW50ZXIuemYuZHJvcGRvd24gbW91c2VsZWF2ZS56Zi5kcm9wZG93bicpXG4gICAgICAub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICBfdGhpcy5fc2V0Q3VycmVudEFuY2hvcih0aGlzKTtcblxuICAgICAgICB2YXIgYm9keURhdGEgPSAkKCdib2R5JykuZGF0YSgpO1xuICAgICAgICBpZih0eXBlb2YoYm9keURhdGEud2hhdGlucHV0KSA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9keURhdGEud2hhdGlucHV0ID09PSAnbW91c2UnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICAgIF90aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICBfdGhpcy4kYW5jaG9ycy5kYXRhKCdob3ZlcicsIHRydWUpO1xuICAgICAgICAgIH0sIF90aGlzLm9wdGlvbnMuaG92ZXJEZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0pLm9uKCdtb3VzZWxlYXZlLnpmLmRyb3Bkb3duJywgaWdub3JlTW91c2VkaXNhcHBlYXIoZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZGF0YSgnaG92ZXInLCBmYWxzZSk7XG4gICAgICAgIH0sIF90aGlzLm9wdGlvbnMuaG92ZXJEZWxheSk7XG4gICAgICB9KSk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuaG92ZXJQYW5lKXtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ21vdXNlZW50ZXIuemYuZHJvcGRvd24gbW91c2VsZWF2ZS56Zi5kcm9wZG93bicpXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMudGltZW91dCk7XG4gICAgICAgICAgICB9KS5vbignbW91c2VsZWF2ZS56Zi5kcm9wZG93bicsIGlnbm9yZU1vdXNlZGlzYXBwZWFyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgX3RoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRhbmNob3JzLmRhdGEoJ2hvdmVyJywgZmFsc2UpO1xuICAgICAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiRhbmNob3JzLmFkZCh0aGlzLiRlbGVtZW50KS5vbigna2V5ZG93bi56Zi5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgdmFyICR0YXJnZXQgPSAkKHRoaXMpO1xuXG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0Ryb3Bkb3duJywge1xuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJHRhcmdldC5pcyhfdGhpcy4kYW5jaG9ycykgJiYgISR0YXJnZXQuaXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgICAgICBfdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsIC0xKS5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgX3RoaXMuJGFuY2hvcnMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBib2R5IHRvIGNsb3NlIGFueSBkcm9wZG93bnMgb24gYSBjbGljay5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkQm9keUhhbmRsZXIoKSB7XG4gICAgIHZhciAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSkubm90KHRoaXMuJGVsZW1lbnQpLFxuICAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAkYm9keS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicpXG4gICAgICAgICAgLm9uKCdjbGljay56Zi5kcm9wZG93biB0YXAuemYuZHJvcGRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYoX3RoaXMuJGFuY2hvcnMuaXMoZS50YXJnZXQpIHx8IF90aGlzLiRhbmNob3JzLmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfdGhpcy4kZWxlbWVudC5pcyhlLnRhcmdldCkgfHwgX3RoaXMuJGVsZW1lbnQuZmluZChlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAkYm9keS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicpO1xuICAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBwYW5lLCBhbmQgZmlyZXMgYSBidWJibGluZyBldmVudCB0byBjbG9zZSBvdGhlciBkcm9wZG93bnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgRHJvcGRvd24jY2xvc2VtZVxuICAgKiBAZmlyZXMgRHJvcGRvd24jc2hvd1xuICAgKi9cbiAgb3BlbigpIHtcbiAgICAvLyB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKlxuICAgICAqIEZpcmVzIHRvIGNsb3NlIG90aGVyIG9wZW4gZHJvcGRvd25zLCB0eXBpY2FsbHkgd2hlbiBkcm9wZG93biBpcyBvcGVuaW5nXG4gICAgICogQGV2ZW50IERyb3Bkb3duI2Nsb3NlbWVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYuZHJvcGRvd24nLCB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJykpO1xuICAgIHRoaXMuJGFuY2hvcnMuYWRkQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgLmF0dHIoeydhcmlhLWV4cGFuZGVkJzogdHJ1ZX0pO1xuICAgIC8vIHRoaXMuJGVsZW1lbnQvKi5zaG93KCkqLztcblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLW9wZW5pbmcnKTtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5pbmcnKS5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiBmYWxzZX0pO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyl7XG4gICAgICB2YXIgJGZvY3VzYWJsZSA9IEtleWJvYXJkLmZpbmRGb2N1c2FibGUodGhpcy4kZWxlbWVudCk7XG4gICAgICBpZigkZm9jdXNhYmxlLmxlbmd0aCl7XG4gICAgICAgICRmb2N1c2FibGUuZXEoMCkuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrKXsgdGhpcy5fYWRkQm9keUhhbmRsZXIoKTsgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMpIHtcbiAgICAgIEtleWJvYXJkLnRyYXBGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyBvbmNlIHRoZSBkcm9wZG93biBpcyB2aXNpYmxlLlxuICAgICAqIEBldmVudCBEcm9wZG93biNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLmRyb3Bkb3duJywgW3RoaXMuJGVsZW1lbnRdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG9wZW4gZHJvcGRvd24gcGFuZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBEcm9wZG93biNoaWRlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZighdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgIC5hdHRyKHsnYXJpYS1oaWRkZW4nOiB0cnVlfSk7XG5cbiAgICB0aGlzLiRhbmNob3JzLnJlbW92ZUNsYXNzKCdob3ZlcicpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgb25jZSB0aGUgZHJvcGRvd24gaXMgbm8gbG9uZ2VyIHZpc2libGUuXG4gICAgICogQGV2ZW50IERyb3Bkb3duI2hpZGVcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2hpZGUuemYuZHJvcGRvd24nLCBbdGhpcy4kZWxlbWVudF0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmFwRm9jdXMpIHtcbiAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gcGFuZSdzIHZpc2liaWxpdHkuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICBpZih0aGlzLiRhbmNob3JzLmRhdGEoJ2hvdmVyJykpIHJldHVybjtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgZHJvcGRvd24uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJy56Zi50cmlnZ2VyJykuaGlkZSgpO1xuICAgIHRoaXMuJGFuY2hvcnMub2ZmKCcuemYuZHJvcGRvd24nKTtcbiAgICAkKGRvY3VtZW50LmJvZHkpLm9mZignY2xpY2suemYuZHJvcGRvd24gdGFwLnpmLmRyb3Bkb3duJyk7XG5cbiAgfVxufVxuXG5Ecm9wZG93bi5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIENsYXNzIHRoYXQgZGVzaWduYXRlcyBib3VuZGluZyBjb250YWluZXIgb2YgRHJvcGRvd24gKGRlZmF1bHQ6IHdpbmRvdylcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgcGFyZW50Q2xhc3M6IG51bGwsXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSB0byBkZWxheSBvcGVuaW5nIGEgc3VibWVudSBvbiBob3ZlciBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAyNTBcbiAgICovXG4gIGhvdmVyRGVsYXk6IDI1MCxcbiAgLyoqXG4gICAqIEFsbG93IHN1Ym1lbnVzIHRvIG9wZW4gb24gaG92ZXIgZXZlbnRzXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBob3ZlcjogZmFsc2UsXG4gIC8qKlxuICAgKiBEb24ndCBjbG9zZSBkcm9wZG93biB3aGVuIGhvdmVyaW5nIG92ZXIgZHJvcGRvd24gcGFuZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaG92ZXJQYW5lOiBmYWxzZSxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiB0aGUgZHJvcGRvd24gcGFuZSBhbmQgdGhlIHRyaWdnZXJpbmcgZWxlbWVudCBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIHZPZmZzZXQ6IDAsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gdGhlIGRyb3Bkb3duIHBhbmUgYW5kIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnQgb24gb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoT2Zmc2V0OiAwLFxuICAvKipcbiAgICogUG9zaXRpb24gb2YgZHJvcGRvd24uIENhbiBiZSBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG9yIGF1dG8uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBwb3NpdGlvbjogJ2F1dG8nLFxuICAvKipcbiAgICogQWxpZ25tZW50IG9mIGRyb3Bkb3duIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgY2VudGVyLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIGNvbnRhaW5lci93aW5kb3cuIElmIGZhbHNlLCBkcm9wZG93biB3aWxsIGZpcnN0IHRyeSB0byBwb3NpdGlvbiBhcyBkZWZpbmVkIGJ5IGRhdGEtcG9zaXRpb24gYW5kIGRhdGEtYWxpZ25tZW50LCBidXQgcmVwb3NpdGlvbiBpZiBpdCB3b3VsZCBjYXVzZSBhbiBvdmVyZmxvdy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFsbG93T3ZlcmxhcDogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyLiBUaGlzIGlzIHRoZSBtb3N0IGNvbW1vblxuICAgKiBiZWhhdmlvciBmb3IgZHJvcGRvd25zLCBhbGxvd2luZyB0aGUgZHJvcGRvd24gdG8gZXh0ZW5kIHRoZSBib3R0b20gb2YgdGhlXG4gICAqIHNjcmVlbiBidXQgbm90IG90aGVyd2lzZSBpbmZsdWVuY2Ugb3IgYnJlYWsgb3V0IG9mIHRoZSBjb250YWluZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGFsbG93Qm90dG9tT3ZlcmxhcDogdHJ1ZSxcbiAgLyoqXG4gICAqIEFsbG93IHRoZSBwbHVnaW4gdG8gdHJhcCBmb2N1cyB0byB0aGUgZHJvcGRvd24gcGFuZSBpZiBvcGVuZWQgd2l0aCBrZXlib2FyZCBjb21tYW5kcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHRyYXBGb2N1czogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyB0aGUgcGx1Z2luIHRvIHNldCBmb2N1cyB0byB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgd2l0aGluIHRoZSBwYW5lLCByZWdhcmRsZXNzIG9mIG1ldGhvZCBvZiBvcGVuaW5nLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFsbG93cyBhIGNsaWNrIG9uIHRoZSBib2R5IHRvIGNsb3NlIHRoZSBkcm9wZG93bi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNsb3NlT25DbGljazogZmFsc2UsXG4gIC8qKlxuICAgKiBJZiB0cnVlIHRoZSBkZWZhdWx0IGFjdGlvbiBvZiB0aGUgdG9nZ2xlIChlLmcuIGZvbGxvdyBhIGxpbmsgd2l0aCBocmVmKSBnZXRzIGV4ZWN1dGVkIG9uIGNsaWNrLiBJZiBob3ZlciBvcHRpb24gaXMgYWxzbyB0cnVlIHRoZSBkZWZhdWx0IGFjdGlvbiBnZXRzIHByZXZlbnRlZCBvbiBmaXJzdCBjbGljayBmb3IgbW9iaWxlIC8gdG91Y2ggZGV2aWNlcyBhbmQgZXhlY3V0ZWQgb24gc2Vjb25kIGNsaWNrLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBmb3JjZUZvbGxvdzogdHJ1ZVxufTtcblxuZXhwb3J0IHtEcm9wZG93bn07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IHJ0bCBhcyBSdGwsIGlnbm9yZU1vdXNlZGlzYXBwZWFyIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBOZXN0IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubmVzdCc7XG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5ib3gnO1xuaW1wb3J0IHsgVG91Y2ggfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50b3VjaCdcblxuXG4vKipcbiAqIERyb3Bkb3duTWVudSBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZHJvcGRvd25NZW51XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmJveFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5uZXN0XG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRvdWNoXG4gKi9cblxuY2xhc3MgRHJvcGRvd25NZW51IGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgRHJvcGRvd25NZW51LlxuICAgKiBAY2xhc3NcbiAgICogQG5hbWUgRHJvcGRvd25NZW51XG4gICAqIEBmaXJlcyBEcm9wZG93bk1lbnUjaW5pdFxuICAgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gbWFrZSBpbnRvIGEgZHJvcGRvd24gbWVudS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRHJvcGRvd25NZW51LmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRHJvcGRvd25NZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICBUb3VjaC5pbml0KCQpOyAvLyBUb3VjaCBpbml0IGlzIGlkZW1wb3RlbnQsIHdlIGp1c3QgbmVlZCB0byBtYWtlIHN1cmUgaXQncyBpbml0aWFsaWVkLlxuXG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ0Ryb3Bkb3duTWVudScsIHtcbiAgICAgICdFTlRFUic6ICdvcGVuJyxcbiAgICAgICdTUEFDRSc6ICdvcGVuJyxcbiAgICAgICdBUlJPV19SSUdIVCc6ICduZXh0JyxcbiAgICAgICdBUlJPV19VUCc6ICd1cCcsXG4gICAgICAnQVJST1dfRE9XTic6ICdkb3duJyxcbiAgICAgICdBUlJPV19MRUZUJzogJ3ByZXZpb3VzJyxcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBsdWdpbiwgYW5kIGNhbGxzIF9wcmVwYXJlTWVudVxuICAgKiBAcHJpdmF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9pbml0KCkge1xuICAgIE5lc3QuRmVhdGhlcih0aGlzLiRlbGVtZW50LCAnZHJvcGRvd24nKTtcblxuICAgIHZhciBzdWJzID0gdGhpcy4kZWxlbWVudC5maW5kKCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpO1xuICAgIHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oJy5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpLmFkZENsYXNzKCdmaXJzdC1zdWInKTtcblxuICAgIHRoaXMuJG1lbnVJdGVtcyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnbGlbcm9sZT1cIm5vbmVcIl0nKTtcbiAgICB0aGlzLiR0YWJzID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbignbGlbcm9sZT1cIm5vbmVcIl0nKTtcbiAgICB0aGlzLiR0YWJzLmZpbmQoJ3VsLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMudmVydGljYWxDbGFzcyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKHRoaXMub3B0aW9ucy5yaWdodENsYXNzKSB8fCBSdGwoKSB8fCB0aGlzLiRlbGVtZW50LnBhcmVudHMoJy50b3AtYmFyLXJpZ2h0JykuaXMoJyonKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFsaWdubWVudCA9ICdyaWdodCc7XG4gICAgICAgICAgICBzdWJzLmFkZENsYXNzKCdvcGVucy1sZWZ0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID0gJ2xlZnQnO1xuICAgICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtcmlnaHQnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgIHN1YnMuYWRkQ2xhc3MoJ29wZW5zLWxlZnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3Vicy5hZGRDbGFzcygnb3BlbnMtcmlnaHQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH07XG5cbiAgX2lzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHRhYnMuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycgfHwgdGhpcy4kZWxlbWVudC5jc3MoJ2ZsZXgtZGlyZWN0aW9uJykgPT09ICdjb2x1bW4nO1xuICB9XG5cbiAgX2lzUnRsKCkge1xuICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhbGlnbi1yaWdodCcpIHx8IChSdGwoKSAmJiAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWxpZ24tbGVmdCcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byBlbGVtZW50cyB3aXRoaW4gdGhlIG1lbnVcbiAgICogQHByaXZhdGVcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGhhc1RvdWNoID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8ICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCAhPT0gJ3VuZGVmaW5lZCcpLFxuICAgICAgICBwYXJDbGFzcyA9ICdpcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCc7XG5cbiAgICAvLyB1c2VkIGZvciBvbkNsaWNrIGFuZCBpbiB0aGUga2V5Ym9hcmQgaGFuZGxlcnNcbiAgICB2YXIgaGFuZGxlQ2xpY2tGbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkZWxlbSA9ICQoZS50YXJnZXQpLnBhcmVudHNVbnRpbCgndWwnLCBgLiR7cGFyQ2xhc3N9YCksXG4gICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpLFxuICAgICAgICAgIGhhc0NsaWNrZWQgPSAkZWxlbS5hdHRyKCdkYXRhLWlzLWNsaWNrJykgPT09ICd0cnVlJyxcbiAgICAgICAgICAkc3ViID0gJGVsZW0uY2hpbGRyZW4oJy5pcy1kcm9wZG93bi1zdWJtZW51Jyk7XG5cbiAgICAgIGlmIChoYXNTdWIpIHtcbiAgICAgICAgaWYgKGhhc0NsaWNrZWQpIHtcbiAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrXG4gICAgICAgICAgICB8fCAoIV90aGlzLm9wdGlvbnMuY2xpY2tPcGVuICYmICFoYXNUb3VjaClcbiAgICAgICAgICAgIHx8IChfdGhpcy5vcHRpb25zLmZvcmNlRm9sbG93ICYmIGhhc1RvdWNoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBfdGhpcy5faGlkZSgkZWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgX3RoaXMuX3Nob3coJHN1Yik7XG4gICAgICAgICAgJGVsZW0uYWRkKCRlbGVtLnBhcmVudHNVbnRpbChfdGhpcy4kZWxlbWVudCwgYC4ke3BhckNsYXNzfWApKS5hdHRyKCdkYXRhLWlzLWNsaWNrJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja09wZW4gfHwgaGFzVG91Y2gpIHtcbiAgICAgIHRoaXMuJG1lbnVJdGVtcy5vbignY2xpY2suemYuZHJvcGRvd25NZW51IHRvdWNoc3RhcnQuemYuZHJvcGRvd25NZW51JywgaGFuZGxlQ2xpY2tGbik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIExlYWYgZWxlbWVudCBDbGlja3NcbiAgICBpZihfdGhpcy5vcHRpb25zLmNsb3NlT25DbGlja0luc2lkZSl7XG4gICAgICB0aGlzLiRtZW51SXRlbXMub24oJ2NsaWNrLnpmLmRyb3Bkb3duTWVudScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpO1xuICAgICAgICBpZighaGFzU3ViKXtcbiAgICAgICAgICBfdGhpcy5faGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVG91Y2ggJiYgdGhpcy5vcHRpb25zLmRpc2FibGVIb3Zlck9uVG91Y2gpIHRoaXMub3B0aW9ucy5kaXNhYmxlSG92ZXIgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZUhvdmVyKSB7XG4gICAgICB0aGlzLiRtZW51SXRlbXMub24oJ21vdXNlZW50ZXIuemYuZHJvcGRvd25NZW51JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgIGhhc1N1YiA9ICRlbGVtLmhhc0NsYXNzKHBhckNsYXNzKTtcblxuICAgICAgICBpZiAoaGFzU3ViKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KCRlbGVtLmRhdGEoJ19kZWxheScpKTtcbiAgICAgICAgICAkZWxlbS5kYXRhKCdfZGVsYXknLCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9zaG93KCRlbGVtLmNoaWxkcmVuKCcuaXMtZHJvcGRvd24tc3VibWVudScpKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpKTtcbiAgICAgICAgfVxuICAgICAgfSkub24oJ21vdXNlbGVhdmUuemYuZHJvcGRvd25NZW51JywgaWdub3JlTW91c2VkaXNhcHBlYXIoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgaGFzU3ViID0gJGVsZW0uaGFzQ2xhc3MocGFyQ2xhc3MpO1xuICAgICAgICBpZiAoaGFzU3ViICYmIF90aGlzLm9wdGlvbnMuYXV0b2Nsb3NlKSB7XG4gICAgICAgICAgaWYgKCRlbGVtLmF0dHIoJ2RhdGEtaXMtY2xpY2snKSA9PT0gJ3RydWUnICYmIF90aGlzLm9wdGlvbnMuY2xpY2tPcGVuKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KCRlbGVtLmRhdGEoJ19kZWxheScpKTtcbiAgICAgICAgICAkZWxlbS5kYXRhKCdfZGVsYXknLCBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9oaWRlKCRlbGVtKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmNsb3NpbmdUaW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgdGhpcy4kbWVudUl0ZW1zLm9uKCdrZXlkb3duLnpmLmRyb3Bkb3duTWVudScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkZWxlbWVudCA9ICQoZS50YXJnZXQpLnBhcmVudHNVbnRpbCgndWwnLCAnW3JvbGU9XCJub25lXCJdJyksXG4gICAgICAgICAgaXNUYWIgPSBfdGhpcy4kdGFicy5pbmRleCgkZWxlbWVudCkgPiAtMSxcbiAgICAgICAgICAkZWxlbWVudHMgPSBpc1RhYiA/IF90aGlzLiR0YWJzIDogJGVsZW1lbnQuc2libGluZ3MoJ2xpJykuYWRkKCRlbGVtZW50KSxcbiAgICAgICAgICAkcHJldkVsZW1lbnQsXG4gICAgICAgICAgJG5leHRFbGVtZW50O1xuXG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCRlbGVtZW50KSkge1xuICAgICAgICAgICRwcmV2RWxlbWVudCA9ICRlbGVtZW50cy5lcShpLTEpO1xuICAgICAgICAgICRuZXh0RWxlbWVudCA9ICRlbGVtZW50cy5lcShpKzEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBuZXh0U2libGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkbmV4dEVsZW1lbnQuY2hpbGRyZW4oJ2E6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LCBwcmV2U2libGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkcHJldkVsZW1lbnQuY2hpbGRyZW4oJ2E6Zmlyc3QnKS5mb2N1cygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9LCBvcGVuU3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkc3ViID0gJGVsZW1lbnQuY2hpbGRyZW4oJ3VsLmlzLWRyb3Bkb3duLXN1Ym1lbnUnKTtcbiAgICAgICAgaWYgKCRzdWIubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXMuX3Nob3coJHN1Yik7XG4gICAgICAgICAgJGVsZW1lbnQuZmluZCgnbGkgPiBhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7IHJldHVybjsgfVxuICAgICAgfSwgY2xvc2VTdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9pZiAoJGVsZW1lbnQuaXMoJzpmaXJzdC1jaGlsZCcpKSB7XG4gICAgICAgIHZhciBjbG9zZSA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5wYXJlbnQoJ2xpJyk7XG4gICAgICAgIGNsb3NlLmNoaWxkcmVuKCdhOmZpcnN0JykuZm9jdXMoKTtcbiAgICAgICAgX3RoaXMuX2hpZGUoY2xvc2UpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vfVxuICAgICAgfTtcbiAgICAgIHZhciBmdW5jdGlvbnMgPSB7XG4gICAgICAgIG9wZW46IG9wZW5TdWIsXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy5faGlkZShfdGhpcy4kZWxlbWVudCk7XG4gICAgICAgICAgX3RoaXMuJG1lbnVJdGVtcy5lcSgwKS5jaGlsZHJlbignYScpLmZvY3VzKCk7IC8vIGZvY3VzIHRvIGZpcnN0IGVsZW1lbnRcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChpc1RhYikge1xuICAgICAgICBpZiAoX3RoaXMuX2lzVmVydGljYWwoKSkgeyAvLyB2ZXJ0aWNhbCBtZW51XG4gICAgICAgICAgaWYgKF90aGlzLl9pc1J0bCgpKSB7IC8vIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgICAgICQuZXh0ZW5kKGZ1bmN0aW9ucywge1xuICAgICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgICAgdXA6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBuZXh0OiBjbG9zZVN1YixcbiAgICAgICAgICAgICAgcHJldmlvdXM6IG9wZW5TdWJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7IC8vIGxlZnQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIGRvd246IG5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICB1cDogcHJldlNpYmxpbmcsXG4gICAgICAgICAgICAgIG5leHQ6IG9wZW5TdWIsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBjbG9zZVN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBob3Jpem9udGFsIG1lbnVcbiAgICAgICAgICBpZiAoX3RoaXMuX2lzUnRsKCkpIHsgLy8gcmlnaHQgYWxpZ25lZFxuICAgICAgICAgICAgJC5leHRlbmQoZnVuY3Rpb25zLCB7XG4gICAgICAgICAgICAgIG5leHQ6IHByZXZTaWJsaW5nLFxuICAgICAgICAgICAgICBwcmV2aW91czogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIGRvd246IG9wZW5TdWIsXG4gICAgICAgICAgICAgIHVwOiBjbG9zZVN1YlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHsgLy8gbGVmdCBhbGlnbmVkXG4gICAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgICAgbmV4dDogbmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2U2libGluZyxcbiAgICAgICAgICAgICAgZG93bjogb3BlblN1YixcbiAgICAgICAgICAgICAgdXA6IGNsb3NlU3ViXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIG5vdCB0YWJzIC0+IG9uZSBzdWJcbiAgICAgICAgaWYgKF90aGlzLl9pc1J0bCgpKSB7IC8vIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgIG5leHQ6IGNsb3NlU3ViLFxuICAgICAgICAgICAgcHJldmlvdXM6IG9wZW5TdWIsXG4gICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgIHVwOiBwcmV2U2libGluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyBsZWZ0IGFsaWduZWRcbiAgICAgICAgICAkLmV4dGVuZChmdW5jdGlvbnMsIHtcbiAgICAgICAgICAgIG5leHQ6IG9wZW5TdWIsXG4gICAgICAgICAgICBwcmV2aW91czogY2xvc2VTdWIsXG4gICAgICAgICAgICBkb3duOiBuZXh0U2libGluZyxcbiAgICAgICAgICAgIHVwOiBwcmV2U2libGluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ0Ryb3Bkb3duTWVudScsIGZ1bmN0aW9ucyk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGJvZHkgdG8gY2xvc2UgYW55IGRyb3Bkb3ducyBvbiBhIGNsaWNrLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRCb2R5SGFuZGxlcigpIHtcbiAgICBjb25zdCAkYm9keSA9ICQoZG9jdW1lbnQuYm9keSk7XG4gICAgdGhpcy5fcmVtb3ZlQm9keUhhbmRsZXIoKTtcbiAgICAkYm9keS5vbignY2xpY2suemYuZHJvcGRvd25NZW51IHRhcC56Zi5kcm9wZG93bk1lbnUnLCAoZSkgPT4ge1xuICAgICAgdmFyIGlzSXRzZWxmID0gISEkKGUudGFyZ2V0KS5jbG9zZXN0KHRoaXMuJGVsZW1lbnQpLmxlbmd0aDtcbiAgICAgIGlmIChpc0l0c2VsZikgcmV0dXJuO1xuXG4gICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICB0aGlzLl9yZW1vdmVCb2R5SGFuZGxlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgYm9keSBldmVudCBoYW5kbGVyLiBTZWUgYF9hZGRCb2R5SGFuZGxlcmAuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZUJvZHlIYW5kbGVyKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkub2ZmKCdjbGljay56Zi5kcm9wZG93bk1lbnUgdGFwLnpmLmRyb3Bkb3duTWVudScpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgZHJvcGRvd24gcGFuZSwgYW5kIGNoZWNrcyBmb3IgY29sbGlzaW9ucyBmaXJzdC5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRzdWIgLSB1bCBlbGVtZW50IHRoYXQgaXMgYSBzdWJtZW51IHRvIHNob3dcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBmaXJlcyBEcm9wZG93bk1lbnUjc2hvd1xuICAgKi9cbiAgX3Nob3coJHN1Yikge1xuICAgIHZhciBpZHggPSB0aGlzLiR0YWJzLmluZGV4KHRoaXMuJHRhYnMuZmlsdGVyKGZ1bmN0aW9uKGksIGVsKSB7XG4gICAgICByZXR1cm4gJChlbCkuZmluZCgkc3ViKS5sZW5ndGggPiAwO1xuICAgIH0pKTtcbiAgICB2YXIgJHNpYnMgPSAkc3ViLnBhcmVudCgnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKS5zaWJsaW5ncygnbGkuaXMtZHJvcGRvd24tc3VibWVudS1wYXJlbnQnKTtcbiAgICB0aGlzLl9oaWRlKCRzaWJzLCBpZHgpO1xuICAgICRzdWIuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpLmFkZENsYXNzKCdqcy1kcm9wZG93bi1hY3RpdmUnKVxuICAgICAgICAucGFyZW50KCdsaS5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB2YXIgY2xlYXIgPSBCb3guSW1Ob3RUb3VjaGluZ1lvdSgkc3ViLCBudWxsLCB0cnVlKTtcbiAgICBpZiAoIWNsZWFyKSB7XG4gICAgICB2YXIgb2xkQ2xhc3MgPSB0aGlzLm9wdGlvbnMuYWxpZ25tZW50ID09PSAnbGVmdCcgPyAnLXJpZ2h0JyA6ICctbGVmdCcsXG4gICAgICAgICAgJHBhcmVudExpID0gJHN1Yi5wYXJlbnQoJy5pcy1kcm9wZG93bi1zdWJtZW51LXBhcmVudCcpO1xuICAgICAgJHBhcmVudExpLnJlbW92ZUNsYXNzKGBvcGVucyR7b2xkQ2xhc3N9YCkuYWRkQ2xhc3MoYG9wZW5zLSR7dGhpcy5vcHRpb25zLmFsaWdubWVudH1gKTtcbiAgICAgIGNsZWFyID0gQm94LkltTm90VG91Y2hpbmdZb3UoJHN1YiwgbnVsbCwgdHJ1ZSk7XG4gICAgICBpZiAoIWNsZWFyKSB7XG4gICAgICAgICRwYXJlbnRMaS5yZW1vdmVDbGFzcyhgb3BlbnMtJHt0aGlzLm9wdGlvbnMuYWxpZ25tZW50fWApLmFkZENsYXNzKCdvcGVucy1pbm5lcicpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgJHN1Yi5jc3MoJ3Zpc2liaWxpdHknLCAnJyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spIHsgdGhpcy5fYWRkQm9keUhhbmRsZXIoKTsgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG5ldyBkcm9wZG93biBwYW5lIGlzIHZpc2libGUuXG4gICAgICogQGV2ZW50IERyb3Bkb3duTWVudSNzaG93XG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdzaG93LnpmLmRyb3Bkb3duTWVudScsIFskc3ViXSk7XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgYSBzaW5nbGUsIGN1cnJlbnRseSBvcGVuIGRyb3Bkb3duIHBhbmUsIGlmIHBhc3NlZCBhIHBhcmFtZXRlciwgb3RoZXJ3aXNlLCBoaWRlcyBldmVyeXRoaW5nLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtIC0gZWxlbWVudCB3aXRoIGEgc3VibWVudSB0byBoaWRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLSBpbmRleCBvZiB0aGUgJHRhYnMgY29sbGVjdGlvbiB0byBoaWRlXG4gICAqIEBmaXJlcyBEcm9wZG93bk1lbnUjaGlkZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2hpZGUoJGVsZW0sIGlkeCkge1xuICAgIHZhciAkdG9DbG9zZTtcbiAgICBpZiAoJGVsZW0gJiYgJGVsZW0ubGVuZ3RoKSB7XG4gICAgICAkdG9DbG9zZSA9ICRlbGVtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlkeCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICR0b0Nsb3NlID0gdGhpcy4kdGFicy5ub3QoZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gaSA9PT0gaWR4O1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJHRvQ2xvc2UgPSB0aGlzLiRlbGVtZW50O1xuICAgIH1cbiAgICB2YXIgc29tZXRoaW5nVG9DbG9zZSA9ICR0b0Nsb3NlLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSB8fCAkdG9DbG9zZS5maW5kKCcuaXMtYWN0aXZlJykubGVuZ3RoID4gMDtcblxuICAgIGlmIChzb21ldGhpbmdUb0Nsb3NlKSB7XG4gICAgICB2YXIgJGFjdGl2ZUl0ZW0gPSAkdG9DbG9zZS5maW5kKCdsaS5pcy1hY3RpdmUnKTtcbiAgICAgICRhY3RpdmVJdGVtLmFkZCgkdG9DbG9zZSkuYXR0cih7XG4gICAgICAgICdkYXRhLWlzLWNsaWNrJzogZmFsc2VcbiAgICAgIH0pLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgJHRvQ2xvc2UuZmluZCgndWwuanMtZHJvcGRvd24tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2pzLWRyb3Bkb3duLWFjdGl2ZScpO1xuXG4gICAgICBpZiAodGhpcy5jaGFuZ2VkIHx8ICR0b0Nsb3NlLmZpbmQoJ29wZW5zLWlubmVyJykubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRDbGFzcyA9IHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdsZWZ0JyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgICR0b0Nsb3NlLmZpbmQoJ2xpLmlzLWRyb3Bkb3duLXN1Ym1lbnUtcGFyZW50JykuYWRkKCR0b0Nsb3NlKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhgb3BlbnMtaW5uZXIgb3BlbnMtJHt0aGlzLm9wdGlvbnMuYWxpZ25tZW50fWApXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGBvcGVucy0ke29sZENsYXNzfWApO1xuICAgICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KCRhY3RpdmVJdGVtLmRhdGEoJ19kZWxheScpKTtcbiAgICAgIHRoaXMuX3JlbW92ZUJvZHlIYW5kbGVyKCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgd2hlbiB0aGUgb3BlbiBtZW51cyBhcmUgY2xvc2VkLlxuICAgICAgICogQGV2ZW50IERyb3Bkb3duTWVudSNoaWRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaGlkZS56Zi5kcm9wZG93bk1lbnUnLCBbJHRvQ2xvc2VdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHBsdWdpbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRtZW51SXRlbXMub2ZmKCcuemYuZHJvcGRvd25NZW51JykucmVtb3ZlQXR0cignZGF0YS1pcy1jbGljaycpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaXMtcmlnaHQtYXJyb3cgaXMtbGVmdC1hcnJvdyBpcy1kb3duLWFycm93IG9wZW5zLXJpZ2h0IG9wZW5zLWxlZnQgb3BlbnMtaW5uZXInKTtcbiAgICAkKGRvY3VtZW50LmJvZHkpLm9mZignLnpmLmRyb3Bkb3duTWVudScpO1xuICAgIE5lc3QuQnVybih0aGlzLiRlbGVtZW50LCAnZHJvcGRvd24nKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmF1bHQgc2V0dGluZ3MgZm9yIHBsdWdpblxuICovXG5Ecm9wZG93bk1lbnUuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBEaXNhbGxvd3MgaG92ZXIgZXZlbnRzIGZyb20gb3BlbmluZyBzdWJtZW51c1xuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZUhvdmVyOiBmYWxzZSxcbiAgLyoqXG4gICAqIERpc2FsbG93cyBob3ZlciBvbiB0b3VjaCBkZXZpY2VzXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGRpc2FibGVIb3Zlck9uVG91Y2g6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvdyBhIHN1Ym1lbnUgdG8gYXV0b21hdGljYWxseSBjbG9zZSBvbiBhIG1vdXNlbGVhdmUgZXZlbnQsIGlmIG5vdCBjbGlja2VkIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9jbG9zZTogdHJ1ZSxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGRlbGF5IG9wZW5pbmcgYSBzdWJtZW51IG9uIGhvdmVyIGV2ZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwXG4gICAqL1xuICBob3ZlckRlbGF5OiA1MCxcbiAgLyoqXG4gICAqIEFsbG93IGEgc3VibWVudSB0byBvcGVuL3JlbWFpbiBvcGVuIG9uIHBhcmVudCBjbGljayBldmVudC4gQWxsb3dzIGN1cnNvciB0byBtb3ZlIGF3YXkgZnJvbSBtZW51LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgY2xpY2tPcGVuOiBmYWxzZSxcbiAgLyoqXG4gICAqIEFtb3VudCBvZiB0aW1lIHRvIGRlbGF5IGNsb3NpbmcgYSBzdWJtZW51IG9uIGEgbW91c2VsZWF2ZSBldmVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MDBcbiAgICovXG5cbiAgY2xvc2luZ1RpbWU6IDUwMCxcbiAgLyoqXG4gICAqIFBvc2l0aW9uIG9mIHRoZSBtZW51IHJlbGF0aXZlIHRvIHdoYXQgZGlyZWN0aW9uIHRoZSBzdWJtZW51cyBzaG91bGQgb3Blbi4gSGFuZGxlZCBieSBKUy4gQ2FuIGJlIGAnYXV0bydgLCBgJ2xlZnQnYCBvciBgJ3JpZ2h0J2AuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBhbGlnbm1lbnQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93IGNsaWNrcyBvbiB0aGUgYm9keSB0byBjbG9zZSBhbnkgb3BlbiBzdWJtZW51cy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuICAvKipcbiAgICogQWxsb3cgY2xpY2tzIG9uIGxlYWYgYW5jaG9yIGxpbmtzIHRvIGNsb3NlIGFueSBvcGVuIHN1Ym1lbnVzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbG9zZU9uQ2xpY2tJbnNpZGU6IHRydWUsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHZlcnRpY2FsIG9yaWVudGVkIG1lbnVzLCBGb3VuZGF0aW9uIGRlZmF1bHQgaXMgYHZlcnRpY2FsYC4gVXBkYXRlIHRoaXMgaWYgdXNpbmcgeW91ciBvd24gY2xhc3MuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3ZlcnRpY2FsJ1xuICAgKi9cbiAgdmVydGljYWxDbGFzczogJ3ZlcnRpY2FsJyxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gcmlnaHQtc2lkZSBvcmllbnRlZCBtZW51cywgRm91bmRhdGlvbiBkZWZhdWx0IGlzIGBhbGlnbi1yaWdodGAuIFVwZGF0ZSB0aGlzIGlmIHVzaW5nIHlvdXIgb3duIGNsYXNzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhbGlnbi1yaWdodCdcbiAgICovXG4gIHJpZ2h0Q2xhc3M6ICdhbGlnbi1yaWdodCcsXG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGZvcmNlIG92ZXJpZGUgdGhlIGNsaWNraW5nIG9mIGxpbmtzIHRvIHBlcmZvcm0gZGVmYXVsdCBhY3Rpb24sIG9uIHNlY29uZCB0b3VjaCBldmVudCBmb3IgbW9iaWxlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBmb3JjZUZvbGxvdzogdHJ1ZVxufTtcblxuZXhwb3J0IHtEcm9wZG93bk1lbnV9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuXG4vKipcbiAqIEVxdWFsaXplciBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uZXF1YWxpemVyXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXIgaWYgZXF1YWxpemVyIGNvbnRhaW5zIGltYWdlc1xuICovXG5cbmNsYXNzIEVxdWFsaXplciBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIEVxdWFsaXplci5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIEVxdWFsaXplclxuICAgKiBAZmlyZXMgRXF1YWxpemVyI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpe1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyAgPSAkLmV4dGVuZCh7fSwgRXF1YWxpemVyLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnRXF1YWxpemVyJzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIEVxdWFsaXplciBwbHVnaW4gYW5kIGNhbGxzIGZ1bmN0aW9ucyB0byBnZXQgZXF1YWxpemVyIGZ1bmN0aW9uaW5nIG9uIGxvYWQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICB2YXIgZXFJZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1lcXVhbGl6ZXInKSB8fCAnJztcbiAgICB2YXIgJHdhdGNoZWQgPSB0aGlzLiRlbGVtZW50LmZpbmQoYFtkYXRhLWVxdWFsaXplci13YXRjaD1cIiR7ZXFJZH1cIl1gKTtcblxuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcblxuICAgIHRoaXMuJHdhdGNoZWQgPSAkd2F0Y2hlZC5sZW5ndGggPyAkd2F0Y2hlZCA6IHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtZXF1YWxpemVyLXdhdGNoXScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1yZXNpemUnLCAoZXFJZCB8fCBHZXRZb0RpZ2l0cyg2LCAnZXEnKSkpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1tdXRhdGUnLCAoZXFJZCB8fCBHZXRZb0RpZ2l0cyg2LCAnZXEnKSkpO1xuXG4gICAgdGhpcy5oYXNOZXN0ZWQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLWVxdWFsaXplcl0nKS5sZW5ndGggPiAwO1xuICAgIHRoaXMuaXNOZXN0ZWQgPSB0aGlzLiRlbGVtZW50LnBhcmVudHNVbnRpbChkb2N1bWVudC5ib2R5LCAnW2RhdGEtZXF1YWxpemVyXScpLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5pc09uID0gZmFsc2U7XG4gICAgdGhpcy5fYmluZEhhbmRsZXIgPSB7XG4gICAgICBvblJlc2l6ZU1lQm91bmQ6IHRoaXMuX29uUmVzaXplTWUuYmluZCh0aGlzKSxcbiAgICAgIG9uUG9zdEVxdWFsaXplZEJvdW5kOiB0aGlzLl9vblBvc3RFcXVhbGl6ZWQuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICB2YXIgaW1ncyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW1nJyk7XG4gICAgdmFyIHRvb1NtYWxsO1xuICAgIGlmKHRoaXMub3B0aW9ucy5lcXVhbGl6ZU9uKXtcbiAgICAgIHRvb1NtYWxsID0gdGhpcy5fY2hlY2tNUSgpO1xuICAgICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl9jaGVja01RLmJpbmQodGhpcykpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgfVxuICAgIGlmKCh0eXBlb2YgdG9vU21hbGwgIT09ICd1bmRlZmluZWQnICYmIHRvb1NtYWxsID09PSBmYWxzZSkgfHwgdHlwZW9mIHRvb1NtYWxsID09PSAndW5kZWZpbmVkJyl7XG4gICAgICBpZihpbWdzLmxlbmd0aCl7XG4gICAgICAgIG9uSW1hZ2VzTG9hZGVkKGltZ3MsIHRoaXMuX3JlZmxvdy5iaW5kKHRoaXMpKTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLl9yZWZsb3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgaWYgdGhlIGJyZWFrcG9pbnQgaXMgdG9vIHNtYWxsLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhdXNlRXZlbnRzKCkge1xuICAgIHRoaXMuaXNPbiA9IGZhbHNlO1xuICAgIHRoaXMuJGVsZW1lbnQub2ZmKHtcbiAgICAgICcuemYuZXF1YWxpemVyJzogdGhpcy5fYmluZEhhbmRsZXIub25Qb3N0RXF1YWxpemVkQm91bmQsXG4gICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZCxcblx0ICAnbXV0YXRlbWUuemYudHJpZ2dlcic6IHRoaXMuX2JpbmRIYW5kbGVyLm9uUmVzaXplTWVCb3VuZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHRvIGhhbmRsZSAkZWxlbWVudHMgcmVzaXplbWUuemYudHJpZ2dlciwgd2l0aCBib3VuZCB0aGlzIG9uIF9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vblJlc2l6ZU1lKCkge1xuICAgIHRoaXMuX3JlZmxvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHRvIGhhbmRsZSAkZWxlbWVudHMgcG9zdGVxdWFsaXplZC56Zi5lcXVhbGl6ZXIsIHdpdGggYm91bmQgdGhpcyBvbiBfYmluZEhhbmRsZXIub25Qb3N0RXF1YWxpemVkQm91bmRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9vblBvc3RFcXVhbGl6ZWQoZSkge1xuICAgIGlmKGUudGFyZ2V0ICE9PSB0aGlzLiRlbGVtZW50WzBdKXsgdGhpcy5fcmVmbG93KCk7IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIEVxdWFsaXplci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fcGF1c2VFdmVudHMoKTtcbiAgICBpZih0aGlzLmhhc05lc3RlZCl7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdwb3N0ZXF1YWxpemVkLnpmLmVxdWFsaXplcicsIHRoaXMuX2JpbmRIYW5kbGVyLm9uUG9zdEVxdWFsaXplZEJvdW5kKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmQpO1xuXHQgIHRoaXMuJGVsZW1lbnQub24oJ211dGF0ZW1lLnpmLnRyaWdnZXInLCB0aGlzLl9iaW5kSGFuZGxlci5vblJlc2l6ZU1lQm91bmQpO1xuICAgIH1cbiAgICB0aGlzLmlzT24gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY3VycmVudCBicmVha3BvaW50IHRvIHRoZSBtaW5pbXVtIHJlcXVpcmVkIHNpemUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tNUSgpIHtcbiAgICB2YXIgdG9vU21hbGwgPSAhTWVkaWFRdWVyeS5pcyh0aGlzLm9wdGlvbnMuZXF1YWxpemVPbik7XG4gICAgaWYodG9vU21hbGwpe1xuICAgICAgaWYodGhpcy5pc09uKXtcbiAgICAgICAgdGhpcy5fcGF1c2VFdmVudHMoKTtcbiAgICAgICAgdGhpcy4kd2F0Y2hlZC5jc3MoJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBpZighdGhpcy5pc09uKXtcbiAgICAgICAgdGhpcy5fZXZlbnRzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b29TbWFsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG5vb3AgdmVyc2lvbiBmb3IgdGhlIHBsdWdpblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2tpbGxzd2l0Y2goKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIG5lY2Vzc2FyeSBmdW5jdGlvbnMgdG8gdXBkYXRlIEVxdWFsaXplciB1cG9uIERPTSBjaGFuZ2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWZsb3coKSB7XG4gICAgaWYoIXRoaXMub3B0aW9ucy5lcXVhbGl6ZU9uU3RhY2spe1xuICAgICAgaWYodGhpcy5faXNTdGFja2VkKCkpe1xuICAgICAgICB0aGlzLiR3YXRjaGVkLmNzcygnaGVpZ2h0JywgJ2F1dG8nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmVxdWFsaXplQnlSb3cpIHtcbiAgICAgIHRoaXMuZ2V0SGVpZ2h0c0J5Um93KHRoaXMuYXBwbHlIZWlnaHRCeVJvdy5iaW5kKHRoaXMpKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZ2V0SGVpZ2h0cyh0aGlzLmFwcGx5SGVpZ2h0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBkZXRlcm1pbmVzIGlmIHRoZSBmaXJzdCAyIGVsZW1lbnRzIGFyZSAqTk9UKiBzdGFja2VkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzU3RhY2tlZCgpIHtcbiAgICBpZiAoIXRoaXMuJHdhdGNoZWRbMF0gfHwgIXRoaXMuJHdhdGNoZWRbMV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kd2F0Y2hlZFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgIT09IHRoaXMuJHdhdGNoZWRbMV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBvdXRlciBoZWlnaHRzIG9mIGNoaWxkcmVuIGNvbnRhaW5lZCB3aXRoaW4gYW4gRXF1YWxpemVyIHBhcmVudCBhbmQgcmV0dXJucyB0aGVtIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQSBub24tb3B0aW9uYWwgY2FsbGJhY2sgdG8gcmV0dXJuIHRoZSBoZWlnaHRzIGFycmF5IHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGhlaWdodHMgLSBBbiBhcnJheSBvZiBoZWlnaHRzIG9mIGNoaWxkcmVuIHdpdGhpbiBFcXVhbGl6ZXIgY29udGFpbmVyXG4gICAqL1xuICBnZXRIZWlnaHRzKGNiKSB7XG4gICAgdmFyIGhlaWdodHMgPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLiR3YXRjaGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHRoaXMuJHdhdGNoZWRbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgaGVpZ2h0cy5wdXNoKHRoaXMuJHdhdGNoZWRbaV0ub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG4gICAgY2IoaGVpZ2h0cyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG91dGVyIGhlaWdodHMgb2YgY2hpbGRyZW4gY29udGFpbmVkIHdpdGhpbiBhbiBFcXVhbGl6ZXIgcGFyZW50IGFuZCByZXR1cm5zIHRoZW0gaW4gYW4gYXJyYXlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBBIG5vbi1vcHRpb25hbCBjYWxsYmFjayB0byByZXR1cm4gdGhlIGhlaWdodHMgYXJyYXkgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZ3JvdXBzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lciBncm91cGVkIGJ5IHJvdyB3aXRoIGVsZW1lbnQsaGVpZ2h0IGFuZCBtYXggYXMgbGFzdCBjaGlsZFxuICAgKi9cbiAgZ2V0SGVpZ2h0c0J5Um93KGNiKSB7XG4gICAgdmFyIGxhc3RFbFRvcE9mZnNldCA9ICh0aGlzLiR3YXRjaGVkLmxlbmd0aCA/IHRoaXMuJHdhdGNoZWQuZmlyc3QoKS5vZmZzZXQoKS50b3AgOiAwKSxcbiAgICAgICAgZ3JvdXBzID0gW10sXG4gICAgICAgIGdyb3VwID0gMDtcbiAgICAvL2dyb3VwIGJ5IFJvd1xuICAgIGdyb3Vwc1tncm91cF0gPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB0aGlzLiR3YXRjaGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHRoaXMuJHdhdGNoZWRbaV0uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgLy9tYXliZSBjb3VsZCB1c2UgdGhpcy4kd2F0Y2hlZFtpXS5vZmZzZXRUb3BcbiAgICAgIHZhciBlbE9mZnNldFRvcCA9ICQodGhpcy4kd2F0Y2hlZFtpXSkub2Zmc2V0KCkudG9wO1xuICAgICAgaWYgKGVsT2Zmc2V0VG9wICE9PSBsYXN0RWxUb3BPZmZzZXQpIHtcbiAgICAgICAgZ3JvdXArKztcbiAgICAgICAgZ3JvdXBzW2dyb3VwXSA9IFtdO1xuICAgICAgICBsYXN0RWxUb3BPZmZzZXQ9ZWxPZmZzZXRUb3A7XG4gICAgICB9XG4gICAgICBncm91cHNbZ3JvdXBdLnB1c2goW3RoaXMuJHdhdGNoZWRbaV0sdGhpcy4kd2F0Y2hlZFtpXS5vZmZzZXRIZWlnaHRdKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMCwgbG4gPSBncm91cHMubGVuZ3RoOyBqIDwgbG47IGorKykge1xuICAgICAgdmFyIGhlaWdodHMgPSAkKGdyb3Vwc1tqXSkubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzWzFdOyB9KS5nZXQoKTtcbiAgICAgIHZhciBtYXggICAgICAgICA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgZ3JvdXBzW2pdLnB1c2gobWF4KTtcbiAgICB9XG4gICAgY2IoZ3JvdXBzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSBDU1MgaGVpZ2h0IHByb3BlcnR5IG9mIGVhY2ggY2hpbGQgaW4gYW4gRXF1YWxpemVyIHBhcmVudCB0byBtYXRjaCB0aGUgdGFsbGVzdFxuICAgKiBAcGFyYW0ge2FycmF5fSBoZWlnaHRzIC0gQW4gYXJyYXkgb2YgaGVpZ2h0cyBvZiBjaGlsZHJlbiB3aXRoaW4gRXF1YWxpemVyIGNvbnRhaW5lclxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3ByZWVxdWFsaXplZFxuICAgKiBAZmlyZXMgRXF1YWxpemVyI3Bvc3RlcXVhbGl6ZWRcbiAgICovXG4gIGFwcGx5SGVpZ2h0KGhlaWdodHMpIHtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgYmVmb3JlIHRoZSBoZWlnaHRzIGFyZSBhcHBsaWVkXG4gICAgICogQGV2ZW50IEVxdWFsaXplciNwcmVlcXVhbGl6ZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcblxuICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCBtYXgpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgaGVpZ2h0cyBoYXZlIGJlZW4gYXBwbGllZFxuICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZFxuICAgICAqL1xuICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Bvc3RlcXVhbGl6ZWQuemYuZXF1YWxpemVyJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgQ1NTIGhlaWdodCBwcm9wZXJ0eSBvZiBlYWNoIGNoaWxkIGluIGFuIEVxdWFsaXplciBwYXJlbnQgdG8gbWF0Y2ggdGhlIHRhbGxlc3QgYnkgcm93XG4gICAqIEBwYXJhbSB7YXJyYXl9IGdyb3VwcyAtIEFuIGFycmF5IG9mIGhlaWdodHMgb2YgY2hpbGRyZW4gd2l0aGluIEVxdWFsaXplciBjb250YWluZXIgZ3JvdXBlZCBieSByb3cgd2l0aCBlbGVtZW50LGhlaWdodCBhbmQgbWF4IGFzIGxhc3QgY2hpbGRcbiAgICogQGZpcmVzIEVxdWFsaXplciNwcmVlcXVhbGl6ZWRcbiAgICogQGZpcmVzIEVxdWFsaXplciNwcmVlcXVhbGl6ZWRyb3dcbiAgICogQGZpcmVzIEVxdWFsaXplciNwb3N0ZXF1YWxpemVkcm93XG4gICAqIEBmaXJlcyBFcXVhbGl6ZXIjcG9zdGVxdWFsaXplZFxuICAgKi9cbiAgYXBwbHlIZWlnaHRCeVJvdyhncm91cHMpIHtcbiAgICAvKipcbiAgICAgKiBGaXJlcyBiZWZvcmUgdGhlIGhlaWdodHMgYXJlIGFwcGxpZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZC56Zi5lcXVhbGl6ZXInKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZ3JvdXBzLmxlbmd0aDsgaSA8IGxlbiA7IGkrKykge1xuICAgICAgdmFyIGdyb3Vwc0lMZW5ndGggPSBncm91cHNbaV0ubGVuZ3RoLFxuICAgICAgICAgIG1heCA9IGdyb3Vwc1tpXVtncm91cHNJTGVuZ3RoIC0gMV07XG4gICAgICBpZiAoZ3JvdXBzSUxlbmd0aDw9Mikge1xuICAgICAgICAkKGdyb3Vwc1tpXVswXVswXSkuY3NzKHsnaGVpZ2h0JzonYXV0byd9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAgKiBGaXJlcyBiZWZvcmUgdGhlIGhlaWdodHMgcGVyIHJvdyBhcmUgYXBwbGllZFxuICAgICAgICAqIEBldmVudCBFcXVhbGl6ZXIjcHJlZXF1YWxpemVkcm93XG4gICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3ByZWVxdWFsaXplZHJvdy56Zi5lcXVhbGl6ZXInKTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBsZW5KID0gKGdyb3Vwc0lMZW5ndGgtMSk7IGogPCBsZW5KIDsgaisrKSB7XG4gICAgICAgICQoZ3JvdXBzW2ldW2pdWzBdKS5jc3MoeydoZWlnaHQnOm1heH0pO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgICogRmlyZXMgd2hlbiB0aGUgaGVpZ2h0cyBwZXIgcm93IGhhdmUgYmVlbiBhcHBsaWVkXG4gICAgICAgICogQGV2ZW50IEVxdWFsaXplciNwb3N0ZXF1YWxpemVkcm93XG4gICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Bvc3RlcXVhbGl6ZWRyb3cuemYuZXF1YWxpemVyJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIGhlaWdodHMgaGF2ZSBiZWVuIGFwcGxpZWRcbiAgICAgKi9cbiAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdwb3N0ZXF1YWxpemVkLnpmLmVxdWFsaXplcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIEVxdWFsaXplci5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLl9wYXVzZUV2ZW50cygpO1xuICAgIHRoaXMuJHdhdGNoZWQuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbkVxdWFsaXplci5kZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIEVuYWJsZSBoZWlnaHQgZXF1YWxpemF0aW9uIHdoZW4gc3RhY2tlZCBvbiBzbWFsbGVyIHNjcmVlbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBlcXVhbGl6ZU9uU3RhY2s6IGZhbHNlLFxuICAvKipcbiAgICogRW5hYmxlIGhlaWdodCBlcXVhbGl6YXRpb24gcm93IGJ5IHJvdy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGVxdWFsaXplQnlSb3c6IGZhbHNlLFxuICAvKipcbiAgICogU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBicmVha3BvaW50IHNpemUgdGhlIHBsdWdpbiBzaG91bGQgZXF1YWxpemUgaGVpZ2h0cyBvbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgZXF1YWxpemVPbjogJydcbn07XG5cbmV4cG9ydCB7RXF1YWxpemVyfTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuaW1wb3J0IHsgb25Mb2FkLCBHZXRZb0RpZ2l0cyB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJy4vZm91bmRhdGlvbi5zbW9vdGhTY3JvbGwnO1xuXG5pbXBvcnQgeyBUcmlnZ2VycyB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzJztcblxuLyoqXG4gKiBNYWdlbGxhbiBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ubWFnZWxsYW5cbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnNtb290aFNjcm9sbFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIE1hZ2VsbGFuIGV4dGVuZHMgUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgTWFnZWxsYW4uXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBNYWdlbGxhblxuICAgKiBAZmlyZXMgTWFnZWxsYW4jaW5pdFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gYWRkIHRoZSB0cmlnZ2VyIHRvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyAgPSAkLmV4dGVuZCh7fSwgTWFnZWxsYW4uZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdNYWdlbGxhbic7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLmNhbGNQb2ludHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgTWFnZWxsYW4gcGx1Z2luIGFuZCBjYWxscyBmdW5jdGlvbnMgdG8gZ2V0IGVxdWFsaXplciBmdW5jdGlvbmluZyBvbiBsb2FkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnbWFnZWxsYW4nKTtcbiAgICB0aGlzLiR0YXJnZXRzID0gJCgnW2RhdGEtbWFnZWxsYW4tdGFyZ2V0XScpO1xuICAgIHRoaXMuJGxpbmtzID0gdGhpcy4kZWxlbWVudC5maW5kKCdhJyk7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHtcbiAgICAgICdkYXRhLXJlc2l6ZSc6IGlkLFxuICAgICAgJ2RhdGEtc2Nyb2xsJzogaWQsXG4gICAgICAnaWQnOiBpZFxuICAgIH0pO1xuICAgIHRoaXMuJGFjdGl2ZSA9ICQoKTtcbiAgICB0aGlzLnNjcm9sbFBvcyA9IHBhcnNlSW50KHdpbmRvdy5wYWdlWU9mZnNldCwgMTApO1xuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhbiBhcnJheSBvZiBwaXhlbCB2YWx1ZXMgdGhhdCBhcmUgdGhlIGRlbWFyY2F0aW9uIGxpbmVzIGJldHdlZW4gbG9jYXRpb25zIG9uIHRoZSBwYWdlLlxuICAgKiBDYW4gYmUgaW52b2tlZCBpZiBuZXcgZWxlbWVudHMgYXJlIGFkZGVkIG9yIHRoZSBzaXplIG9mIGEgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBjYWxjUG9pbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgICAgICBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgdGhpcy5wb2ludHMgPSBbXTtcbiAgICB0aGlzLndpbkhlaWdodCA9IE1hdGgucm91bmQoTWF0aC5tYXgod2luZG93LmlubmVySGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCkpO1xuICAgIHRoaXMuZG9jSGVpZ2h0ID0gTWF0aC5yb3VuZChNYXRoLm1heChib2R5LnNjcm9sbEhlaWdodCwgYm9keS5vZmZzZXRIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5vZmZzZXRIZWlnaHQpKTtcblxuICAgIHRoaXMuJHRhcmdldHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgdmFyICR0YXIgPSAkKHRoaXMpLFxuICAgICAgICAgIHB0ID0gTWF0aC5yb3VuZCgkdGFyLm9mZnNldCgpLnRvcCAtIF90aGlzLm9wdGlvbnMudGhyZXNob2xkKTtcbiAgICAgICR0YXIudGFyZ2V0UG9pbnQgPSBwdDtcbiAgICAgIF90aGlzLnBvaW50cy5wdXNoKHB0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIE1hZ2VsbGFuLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJCh3aW5kb3cpLm9uZSgnbG9hZCcsIGZ1bmN0aW9uKCl7XG4gICAgICBpZihfdGhpcy5vcHRpb25zLmRlZXBMaW5raW5nKXtcbiAgICAgICAgaWYobG9jYXRpb24uaGFzaCl7XG4gICAgICAgICAgX3RoaXMuc2Nyb2xsVG9Mb2MobG9jYXRpb24uaGFzaCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF90aGlzLmNhbGNQb2ludHMoKTtcbiAgICAgIF90aGlzLl91cGRhdGVBY3RpdmUoKTtcbiAgICB9KTtcblxuICAgIF90aGlzLm9uTG9hZExpc3RlbmVyID0gb25Mb2FkKCQod2luZG93KSwgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuJGVsZW1lbnRcbiAgICAgICAgLm9uKHtcbiAgICAgICAgICAncmVzaXplbWUuemYudHJpZ2dlcic6IF90aGlzLnJlZmxvdy5iaW5kKF90aGlzKSxcbiAgICAgICAgICAnc2Nyb2xsbWUuemYudHJpZ2dlcic6IF90aGlzLl91cGRhdGVBY3RpdmUuYmluZChfdGhpcylcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay56Zi5tYWdlbGxhbicsICdhW2hyZWZePVwiI1wiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHZhciBhcnJpdmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICBfdGhpcy5zY3JvbGxUb0xvYyhhcnJpdmFsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kZWVwTGlua1Njcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYoX3RoaXMub3B0aW9ucy5kZWVwTGlua2luZykge1xuICAgICAgICBfdGhpcy5zY3JvbGxUb0xvYyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIHRoaXMuX2RlZXBMaW5rU2Nyb2xsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzY3JvbGwgdG8gYSBnaXZlbiBsb2NhdGlvbiBvbiB0aGUgcGFnZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGxvYyAtIGEgcHJvcGVybHkgZm9ybWF0dGVkIGpRdWVyeSBpZCBzZWxlY3Rvci4gRXhhbXBsZTogJyNmb28nXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgc2Nyb2xsVG9Mb2MobG9jKSB7XG4gICAgdGhpcy5faW5UcmFuc2l0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICBhbmltYXRpb25FYXNpbmc6IHRoaXMub3B0aW9ucy5hbmltYXRpb25FYXNpbmcsXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogdGhpcy5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgdGhyZXNob2xkOiB0aGlzLm9wdGlvbnMudGhyZXNob2xkLFxuICAgICAgb2Zmc2V0OiB0aGlzLm9wdGlvbnMub2Zmc2V0XG4gICAgfTtcblxuICAgIFNtb290aFNjcm9sbC5zY3JvbGxUb0xvYyhsb2MsIG9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuX2luVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgbmVjZXNzYXJ5IGZ1bmN0aW9ucyB0byB1cGRhdGUgTWFnZWxsYW4gdXBvbiBET00gY2hhbmdlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgcmVmbG93KCkge1xuICAgIHRoaXMuY2FsY1BvaW50cygpO1xuICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHZpc2liaWxpdHkgb2YgYW4gYWN0aXZlIGxvY2F0aW9uIGxpbmssIGFuZCB1cGRhdGVzIHRoZSB1cmwgaGFzaCBmb3IgdGhlIHBhZ2UsIGlmIGRlZXBMaW5raW5nIGVuYWJsZWQuXG4gICAqIEBwcml2YXRlXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgTWFnZWxsYW4jdXBkYXRlXG4gICAqL1xuICBfdXBkYXRlQWN0aXZlKC8qZXZ0LCBlbGVtLCBzY3JvbGxQb3MqLykge1xuICAgIGlmKHRoaXMuX2luVHJhbnNpdGlvbikgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3U2Nyb2xsUG9zID0gcGFyc2VJbnQod2luZG93LnBhZ2VZT2Zmc2V0LCAxMCk7XG4gICAgY29uc3QgaXNTY3JvbGxpbmdVcCA9IHRoaXMuc2Nyb2xsUG9zID4gbmV3U2Nyb2xsUG9zO1xuICAgIHRoaXMuc2Nyb2xsUG9zID0gbmV3U2Nyb2xsUG9zO1xuXG4gICAgbGV0IGFjdGl2ZUlkeDtcbiAgICAvLyBCZWZvcmUgdGhlIGZpcnN0IHBvaW50OiBubyBsaW5rXG4gICAgaWYobmV3U2Nyb2xsUG9zIDwgdGhpcy5wb2ludHNbMF0gLSB0aGlzLm9wdGlvbnMub2Zmc2V0IC0gKGlzU2Nyb2xsaW5nVXAgPyB0aGlzLm9wdGlvbnMudGhyZXNob2xkIDogMCkpeyAvKiBkbyBub3RoaW5nICovIH1cbiAgICAvLyBBdCB0aGUgYm90dG9tIG9mIHRoZSBwYWdlOiBsYXN0IGxpbmtcbiAgICBlbHNlIGlmKG5ld1Njcm9sbFBvcyArIHRoaXMud2luSGVpZ2h0ID09PSB0aGlzLmRvY0hlaWdodCl7IGFjdGl2ZUlkeCA9IHRoaXMucG9pbnRzLmxlbmd0aCAtIDE7IH1cbiAgICAvLyBPdGhlcndoaXNlLCB1c2UgdGhlIGxhc3QgdmlzaWJsZSBsaW5rXG4gICAgZWxzZXtcbiAgICAgIGNvbnN0IHZpc2libGVMaW5rcyA9IHRoaXMucG9pbnRzLmZpbHRlcigocCkgPT4ge1xuICAgICAgICByZXR1cm4gKHAgLSB0aGlzLm9wdGlvbnMub2Zmc2V0IC0gKGlzU2Nyb2xsaW5nVXAgPyB0aGlzLm9wdGlvbnMudGhyZXNob2xkIDogMCkpIDw9IG5ld1Njcm9sbFBvcztcbiAgICAgIH0pO1xuICAgICAgYWN0aXZlSWR4ID0gdmlzaWJsZUxpbmtzLmxlbmd0aCA/IHZpc2libGVMaW5rcy5sZW5ndGggLSAxIDogMDtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG5ldyBhY3RpdmUgbGlua1xuICAgIGNvbnN0ICRvbGRBY3RpdmUgPSB0aGlzLiRhY3RpdmU7XG4gICAgbGV0IGFjdGl2ZUhhc2ggPSAnJztcbiAgICBpZih0eXBlb2YgYWN0aXZlSWR4ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICB0aGlzLiRhY3RpdmUgPSB0aGlzLiRsaW5rcy5maWx0ZXIoJ1tocmVmPVwiIycgKyB0aGlzLiR0YXJnZXRzLmVxKGFjdGl2ZUlkeCkuZGF0YSgnbWFnZWxsYW4tdGFyZ2V0JykgKyAnXCJdJyk7XG4gICAgICBpZiAodGhpcy4kYWN0aXZlLmxlbmd0aCkgYWN0aXZlSGFzaCA9IHRoaXMuJGFjdGl2ZVswXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuJGFjdGl2ZSA9ICQoKTtcbiAgICB9XG4gICAgY29uc3QgaXNOZXdBY3RpdmUgPSAhKCF0aGlzLiRhY3RpdmUubGVuZ3RoICYmICEkb2xkQWN0aXZlLmxlbmd0aCkgJiYgIXRoaXMuJGFjdGl2ZS5pcygkb2xkQWN0aXZlKTtcbiAgICBjb25zdCBpc05ld0hhc2ggPSBhY3RpdmVIYXNoICE9PSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgIC8vIFVwZGF0ZSB0aGUgYWN0aXZlIGxpbmsgZWxlbWVudFxuICAgIGlmKGlzTmV3QWN0aXZlKSB7XG4gICAgICAkb2xkQWN0aXZlLnJlbW92ZUNsYXNzKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XG4gICAgICB0aGlzLiRhY3RpdmUuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGhhc2ggKGl0IG1heSBoYXZlIGNoYW5nZWQgd2l0aCB0aGUgc2FtZSBhY3RpdmUgbGluaylcbiAgICBpZih0aGlzLm9wdGlvbnMuZGVlcExpbmtpbmcgJiYgaXNOZXdIYXNoKXtcbiAgICAgIGlmKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSl7XG4gICAgICAgIC8vIFNldCBvciByZW1vdmUgdGhlIGhhc2ggKHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUyOTg2ODQvNDMxNzM4NFxuICAgICAgICBjb25zdCB1cmwgPSBhY3RpdmVIYXNoID8gYWN0aXZlSGFzaCA6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KXtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCB1cmwpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCB1cmwpO1xuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBhY3RpdmVIYXNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc05ld0FjdGl2ZSkge1xuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIG1hZ2VsbGFuIGlzIGZpbmlzaGVkIHVwZGF0aW5nIHRvIHRoZSBuZXcgYWN0aXZlIGVsZW1lbnQuXG4gICAgICAgKiBAZXZlbnQgTWFnZWxsYW4jdXBkYXRlXG4gICAgICAgKi9cbiAgICBcdHRoaXMuJGVsZW1lbnQudHJpZ2dlcigndXBkYXRlLnpmLm1hZ2VsbGFuJywgW3RoaXMuJGFjdGl2ZV0pO1xuXHQgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyBhbiBpbnN0YW5jZSBvZiBNYWdlbGxhbiBhbmQgcmVzZXRzIHRoZSB1cmwgb2YgdGhlIHdpbmRvdy5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm1hZ2VsbGFuJylcbiAgICAgICAgLmZpbmQoYC4ke3RoaXMub3B0aW9ucy5hY3RpdmVDbGFzc31gKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuXG4gICAgaWYodGhpcy5vcHRpb25zLmRlZXBMaW5raW5nKXtcbiAgICAgIHZhciBoYXNoID0gdGhpcy4kYWN0aXZlWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShoYXNoLCAnJyk7XG4gICAgfVxuXG4gICAgJCh3aW5kb3cpLm9mZignaGFzaGNoYW5nZScsIHRoaXMuX2RlZXBMaW5rU2Nyb2xsKVxuICAgIGlmICh0aGlzLm9uTG9hZExpc3RlbmVyKSAkKHdpbmRvdykub2ZmKHRoaXMub25Mb2FkTGlzdGVuZXIpO1xuICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luXG4gKi9cbk1hZ2VsbGFuLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUsIGluIG1zLCB0aGUgYW5pbWF0ZWQgc2Nyb2xsaW5nIHNob3VsZCB0YWtlIGJldHdlZW4gbG9jYXRpb25zLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDUwMFxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgLyoqXG4gICAqIEFuaW1hdGlvbiBzdHlsZSB0byB1c2Ugd2hlbiBzY3JvbGxpbmcgYmV0d2VlbiBsb2NhdGlvbnMuIENhbiBiZSBgJ3N3aW5nJ2Agb3IgYCdsaW5lYXInYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnbGluZWFyJ1xuICAgKiBAc2VlIHtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FuaW1hdGV8SnF1ZXJ5IGFuaW1hdGV9XG4gICAqL1xuICBhbmltYXRpb25FYXNpbmc6ICdsaW5lYXInLFxuICAvKipcbiAgICogTnVtYmVyIG9mIHBpeGVscyB0byB1c2UgYXMgYSBtYXJrZXIgZm9yIGxvY2F0aW9uIGNoYW5nZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTBcbiAgICovXG4gIHRocmVzaG9sZDogNTAsXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIHRoZSBhY3RpdmUgbG9jYXRpb25zIGxpbmsgb24gdGhlIG1hZ2VsbGFuIGNvbnRhaW5lci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaXMtYWN0aXZlJ1xuICAgKi9cbiAgYWN0aXZlQ2xhc3M6ICdpcy1hY3RpdmUnLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBzY3JpcHQgdG8gbWFuaXB1bGF0ZSB0aGUgdXJsIG9mIHRoZSBjdXJyZW50IHBhZ2UsIGFuZCBpZiBzdXBwb3J0ZWQsIGFsdGVyIHRoZSBoaXN0b3J5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbmtpbmc6IGZhbHNlLFxuICAvKipcbiAgICogVXBkYXRlIHRoZSBicm93c2VyIGhpc3Rvcnkgd2l0aCB0aGUgYWN0aXZlIGxpbmssIGlmIGRlZXAgbGlua2luZyBpcyBlbmFibGVkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgdXBkYXRlSGlzdG9yeTogZmFsc2UsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRvIG9mZnNldCB0aGUgc2Nyb2xsIG9mIHRoZSBwYWdlIG9uIGl0ZW0gY2xpY2sgaWYgdXNpbmcgYSBzdGlja3kgbmF2IGJhci5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBvZmZzZXQ6IDBcbn1cblxuZXhwb3J0IHtNYWdlbGxhbn07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IG9uTG9hZCwgdHJhbnNpdGlvbmVuZCwgUmVnRXhwRXNjYXBlIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5cbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIE9mZkNhbnZhcyBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ub2ZmQ2FudmFzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnNcbiAqL1xuXG5jbGFzcyBPZmZDYW52YXMgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhbiBvZmYtY2FudmFzIHdyYXBwZXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBPZmZDYW52YXNcbiAgICogQGZpcmVzIE9mZkNhbnZhcyNpbml0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBpbml0aWFsaXplLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ09mZkNhbnZhcyc7IC8vIGllOSBiYWNrIGNvbXBhdFxuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBPZmZDYW52YXMuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRlbnRDbGFzc2VzID0geyBiYXNlOiBbXSwgcmV2ZWFsOiBbXSB9O1xuICAgIHRoaXMuJGxhc3RUcmlnZ2VyID0gJCgpO1xuICAgIHRoaXMuJHRyaWdnZXJzID0gJCgpO1xuICAgIHRoaXMucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgdGhpcy4kY29udGVudCA9ICQoKTtcbiAgICB0aGlzLm5lc3RlZCA9ICEhKHRoaXMub3B0aW9ucy5uZXN0ZWQpO1xuICAgIHRoaXMuJHN0aWNreSA9ICQoKTtcbiAgICB0aGlzLmlzSW5DYW52YXMgPSBmYWxzZTtcblxuICAgIC8vIERlZmluZXMgdGhlIENTUyB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzZXMgb2YgdGhlIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgJChbJ3B1c2gnLCAnb3ZlcmxhcCddKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLmJhc2UucHVzaCgnaGFzLXRyYW5zaXRpb24tJyt2YWwpO1xuICAgIH0pO1xuICAgICQoWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSkuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLnB1c2goJ2hhcy1wb3NpdGlvbi0nK3ZhbCk7XG4gICAgICB0aGlzLmNvbnRlbnRDbGFzc2VzLnJldmVhbC5wdXNoKCdoYXMtcmV2ZWFsLScrdmFsKTtcbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuXG4gICAgS2V5Ym9hcmQucmVnaXN0ZXIoJ09mZkNhbnZhcycsIHtcbiAgICAgICdFU0NBUEUnOiAnY2xvc2UnXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgb2ZmLWNhbnZhcyB3cmFwcGVyIGJ5IGFkZGluZyB0aGUgZXhpdCBvdmVybGF5IChpZiBuZWVkZWQpLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBpZCA9IHRoaXMuJGVsZW1lbnQuYXR0cignaWQnKTtcblxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gRmluZCBvZmYtY2FudmFzIGNvbnRlbnQsIGVpdGhlciBieSBJRCAoaWYgc3BlY2lmaWVkKSwgYnkgc2libGluZ3Mgb3IgYnkgY2xvc2VzdCBzZWxlY3RvciAoZmFsbGJhY2spXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50SWQpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSAkKCcjJyt0aGlzLm9wdGlvbnMuY29udGVudElkKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQgPSB0aGlzLiRlbGVtZW50LnNpYmxpbmdzKCdbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdJykuZmlyc3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY29udGVudElkKSB7XG4gICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpZiBpdCBpc24ndCBhIHNpYmxpbmcgb2YgdGhlIGNvbnRlbnRcbiAgICAgIHRoaXMubmVzdGVkID0gdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmxlbmd0aCA9PT0gMDtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRJZCAmJiB0aGlzLm9wdGlvbnMubmVzdGVkID09PSBudWxsKSB7XG4gICAgICAvLyBXYXJuaW5nIGlmIHVzaW5nIGNvbnRlbnQgSUQgd2l0aG91dCBzZXR0aW5nIHRoZSBuZXN0ZWQgb3B0aW9uXG4gICAgICAvLyBPbmNlIHRoZSBlbGVtZW50IGlzIG5lc3RlZCBpdCBpcyByZXF1aXJlZCB0byB3b3JrIHByb3Blcmx5IGluIHRoaXMgY2FzZVxuICAgICAgY29uc29sZS53YXJuKCdSZW1lbWJlciB0byB1c2UgdGhlIG5lc3RlZCBvcHRpb24gaWYgdXNpbmcgdGhlIGNvbnRlbnQgSUQgb3B0aW9uIScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5lc3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gRm9yY2UgdHJhbnNpdGlvbiBvdmVybGFwIGlmIG5lc3RlZFxuICAgICAgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gPSAnb3ZlcmxhcCc7XG4gICAgICAvLyBSZW1vdmUgYXBwcm9wcmlhdGUgY2xhc3NlcyBpZiBhbHJlYWR5IGFzc2lnbmVkIGluIG1hcmt1cFxuICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtdHJhbnNpdGlvbi1wdXNoJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhgaXMtdHJhbnNpdGlvbi0ke3RoaXMub3B0aW9ucy50cmFuc2l0aW9ufSBpcy1jbG9zZWRgKTtcblxuICAgIC8vIEZpbmQgdHJpZ2dlcnMgdGhhdCBhZmZlY3QgdGhpcyBlbGVtZW50IGFuZCBhZGQgYXJpYS1leHBhbmRlZCB0byB0aGVtXG4gICAgdGhpcy4kdHJpZ2dlcnMgPSAkKGRvY3VtZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLW9wZW49XCInK2lkKydcIl0sIFtkYXRhLWNsb3NlPVwiJytpZCsnXCJdLCBbZGF0YS10b2dnbGU9XCInK2lkKydcIl0nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgICAgLmF0dHIoJ2FyaWEtY29udHJvbHMnLCBpZCk7XG5cbiAgICAvLyBHZXQgcG9zaXRpb24gYnkgY2hlY2tpbmcgZm9yIHJlbGF0ZWQgQ1NTIGNsYXNzXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuJGVsZW1lbnQuaXMoJy5wb3NpdGlvbi1sZWZ0LCAucG9zaXRpb24tdG9wLCAucG9zaXRpb24tcmlnaHQsIC5wb3NpdGlvbi1ib3R0b20nKSA/IHRoaXMuJGVsZW1lbnQuYXR0cignY2xhc3MnKS5tYXRjaCgvcG9zaXRpb25cXC0obGVmdHx0b3B8cmlnaHR8Ym90dG9tKS8pWzFdIDogdGhpcy5wb3NpdGlvbjtcblxuICAgIC8vIEFkZCBhbiBvdmVybGF5IG92ZXIgdGhlIGNvbnRlbnQgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHZhciBvdmVybGF5UG9zaXRpb24gPSAkKHRoaXMuJGVsZW1lbnQpLmNzcyhcInBvc2l0aW9uXCIpID09PSAnZml4ZWQnID8gJ2lzLW92ZXJsYXktZml4ZWQnIDogJ2lzLW92ZXJsYXktYWJzb2x1dGUnO1xuICAgICAgb3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2pzLW9mZi1jYW52YXMtb3ZlcmxheSAnICsgb3ZlcmxheVBvc2l0aW9uKTtcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKG92ZXJsYXkpO1xuICAgICAgaWYob3ZlcmxheVBvc2l0aW9uID09PSAnaXMtb3ZlcmxheS1maXhlZCcpIHtcbiAgICAgICAgJCh0aGlzLiRvdmVybGF5KS5pbnNlcnRBZnRlcih0aGlzLiRlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGNvbnRlbnQuYXBwZW5kKHRoaXMuJG92ZXJsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgcmV2ZWFsT24gb3B0aW9uIGZyb20gdGhlIGNsYXNzLlxuICAgIHZhciByZXZlYWxPblJlZ0V4cCA9IG5ldyBSZWdFeHAoUmVnRXhwRXNjYXBlKHRoaXMub3B0aW9ucy5yZXZlYWxDbGFzcykgKyAnKFteXFxcXHNdKyknLCAnZycpO1xuICAgIHZhciByZXZlYWxPbkNsYXNzID0gcmV2ZWFsT25SZWdFeHAuZXhlYyh0aGlzLiRlbGVtZW50WzBdLmNsYXNzTmFtZSk7XG4gICAgaWYgKHJldmVhbE9uQ2xhc3MpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMub3B0aW9ucy5yZXZlYWxPbiA9IHRoaXMub3B0aW9ucy5yZXZlYWxPbiB8fCByZXZlYWxPbkNsYXNzWzFdO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGUgYHJldmVhbC1vbi0qYCBjbGFzcyBpcyBzZXQuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1JldmVhbGVkID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5yZXZlYWxPbikge1xuICAgICAgdGhpcy4kZWxlbWVudC5maXJzdCgpLmFkZENsYXNzKGAke3RoaXMub3B0aW9ucy5yZXZlYWxDbGFzc30ke3RoaXMub3B0aW9ucy5yZXZlYWxPbn1gKTtcbiAgICAgIHRoaXMuX3NldE1RQ2hlY2tlcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5vcHRpb25zLnRyYW5zaXRpb25UaW1lKTtcbiAgICB9XG5cbiAgICAvLyBGaW5kIGZpeGVkIGVsZW1lbnRzIHRoYXQgc2hvdWxkIHN0YXkgZml4ZWQgd2hpbGUgb2ZmLWNhbnZhcyBpcyBvcGVuZWRcbiAgICB0aGlzLiRzdGlja3kgPSB0aGlzLiRjb250ZW50LmZpbmQoJ1tkYXRhLW9mZi1jYW52YXMtc3RpY2t5XScpO1xuICAgIGlmICh0aGlzLiRzdGlja3kubGVuZ3RoID4gMCAmJiB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiA9PT0gJ3B1c2gnKSB7XG4gICAgICAvLyBJZiB0aGVyZSdzIGF0IGxlYXN0IG9uZSBtYXRjaCBmb3JjZSBjb250ZW50U2Nyb2xsOmZhbHNlIGJlY2F1c2UgdGhlIGFic29sdXRlIHRvcCB2YWx1ZSBkb2Vzbid0IGdldCByZWNhbGN1bGF0ZWQgb24gc2Nyb2xsXG4gICAgICAvLyBMaW1pdCB0byBwdXNoIHRyYW5zaXRpb24gc2luY2UgdGhlcmUncyBubyB0cmFuc2Zvcm0gc2NvcGUgZm9yIG92ZXJsYXBcbiAgICAgIHRoaXMub3B0aW9ucy5jb250ZW50U2Nyb2xsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGluQ2FudmFzRm9yID0gdGhpcy4kZWxlbWVudC5hdHRyKCdjbGFzcycpLm1hdGNoKC9cXGJpbi1jYW52YXMtZm9yLShcXHcrKS8pO1xuICAgIGlmIChpbkNhbnZhc0ZvciAmJiBpbkNhbnZhc0Zvci5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIFNldCBgaW5DYW52YXNPbmAgb3B0aW9uIGlmIGZvdW5kIGluLWNhbnZhcy1mb3ItW0JSRUFLUE9OVF0gQ1NTIGNsYXNzXG4gICAgICB0aGlzLm9wdGlvbnMuaW5DYW52YXNPbiA9IGluQ2FudmFzRm9yWzFdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmluQ2FudmFzT24pIHtcbiAgICAgIC8vIEVuc3VyZSB0aGUgQ1NTIGNsYXNzIGlzIHNldFxuICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhgaW4tY2FudmFzLWZvci0ke3RoaXMub3B0aW9ucy5pbkNhbnZhc09ufWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5DYW52YXNPbikge1xuICAgICAgdGhpcy5fY2hlY2tJbkNhbnZhcygpO1xuICAgIH1cblxuICAgIC8vIEluaXRhbGx5IHJlbW92ZSBhbGwgdHJhbnNpdGlvbi9wb3NpdGlvbiBDU1MgY2xhc3NlcyBmcm9tIG9mZi1jYW52YXMgY29udGVudCBjb250YWluZXIuXG4gICAgdGhpcy5fcmVtb3ZlQ29udGVudENsYXNzZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBvZmYtY2FudmFzIHdyYXBwZXIgYW5kIHRoZSBleGl0IG92ZXJsYXkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZkNhbnZhcycpLm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5jbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgICdrZXlkb3duLnpmLm9mZkNhbnZhcyc6IHRoaXMuX2hhbmRsZUtleWJvYXJkLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlKSB7XG4gICAgICB2YXIgJHRhcmdldCA9IHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA/IHRoaXMuJG92ZXJsYXkgOiB0aGlzLiRjb250ZW50O1xuICAgICAgJHRhcmdldC5vbih7J2NsaWNrLnpmLm9mZkNhbnZhcyc6IHRoaXMuY2xvc2UuYmluZCh0aGlzKX0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5DYW52YXNPbikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2NoZWNrSW5DYW52YXMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgZXZlbnQgbGlzdGVuZXIgZm9yIGVsZW1lbnRzIHRoYXQgd2lsbCByZXZlYWwgYXQgY2VydGFpbiBicmVha3BvaW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRNUUNoZWNrZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMub25Mb2FkTGlzdGVuZXIgPSBvbkxvYWQoJCh3aW5kb3cpLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoTWVkaWFRdWVyeS5hdExlYXN0KF90aGlzLm9wdGlvbnMucmV2ZWFsT24pKSB7XG4gICAgICAgIF90aGlzLnJldmVhbCh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQod2luZG93KS5vbignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChfdGhpcy5vcHRpb25zLnJldmVhbE9uKSkge1xuICAgICAgICBfdGhpcy5yZXZlYWwodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5yZXZlYWwoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBJbkNhbnZhcyBvbiBjdXJyZW50IGJyZWFrcG9pbnQgYW5kIGFkanVzdCBvZmYtY2FudmFzIGFjY29yZGluZ2x5XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tJbkNhbnZhcygpIHtcbiAgICB0aGlzLmlzSW5DYW52YXMgPSBNZWRpYVF1ZXJ5LmF0TGVhc3QodGhpcy5vcHRpb25zLmluQ2FudmFzT24pO1xuICAgIGlmICh0aGlzLmlzSW5DYW52YXMgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lci5cbiAgICogUmVtb3ZpbmcgdGhlIGNsYXNzZXMgaXMgaW1wb3J0YW50IHdoZW4gYW5vdGhlciBvZmYtY2FudmFzIGdldHMgb3BlbmVkIHRoYXQgdXNlcyB0aGUgc2FtZSBjb250ZW50IGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIGlmICh0eXBlb2YgaGFzUmV2ZWFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Q2xhc3Nlcy5iYXNlLmpvaW4oJyAnKSk7XG4gICAgfSBlbHNlIGlmIChoYXNSZXZlYWwgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUNsYXNzKGBoYXMtcmV2ZWFsLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgQ1NTIHRyYW5zaXRpb24vcG9zaXRpb24gY2xhc3NlcyBvZiB0aGUgb2ZmLWNhbnZhcyBjb250ZW50IGNvbnRhaW5lciwgYmFzZWQgb24gdGhlIG9wZW5pbmcgb2ZmLWNhbnZhcyBlbGVtZW50LlxuICAgKiBCZWZvcmVoYW5kIGFueSB0cmFuc2l0aW9uL3Bvc2l0aW9uIGNsYXNzIGdldHMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBoYXNSZXZlYWwgLSB0cnVlIGlmIHJlbGF0ZWQgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIHJldmVhbGVkLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZENvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCkge1xuICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKGhhc1JldmVhbCk7XG4gICAgaWYgKHR5cGVvZiBoYXNSZXZlYWwgIT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXRyYW5zaXRpb24tJHt0aGlzLm9wdGlvbnMudHJhbnNpdGlvbn0gaGFzLXBvc2l0aW9uLSR7dGhpcy5wb3NpdGlvbn1gKTtcbiAgICB9IGVsc2UgaWYgKGhhc1JldmVhbCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hZGRDbGFzcyhgaGFzLXJldmVhbC0ke3RoaXMucG9zaXRpb259YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByZXNlcnZlcyB0aGUgZml4ZWQgYmVoYXZpb3Igb2Ygc3RpY2t5IGVsZW1lbnRzIG9uIG9wZW5pbmcgYW4gb2ZmLWNhbnZhcyB3aXRoIHB1c2ggdHJhbnNpdGlvbi5cbiAgICogU2luY2UgdGhlIG9mZi1jYW52YXMgY29udGFpbmVyIGhhcyBnb3QgYSB0cmFuc2Zvcm0gc2NvcGUgaW4gc3VjaCBhIGNhc2UsIGl0IGlzIGRvbmUgYnkgY2FsY3VsYXRpbmcgcG9zaXRpb24gYWJzb2x1dGUgdmFsdWVzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2ZpeFN0aWNreUVsZW1lbnRzKCkge1xuICAgIHRoaXMuJHN0aWNreS5lYWNoKChfLCBlbCkgPT4ge1xuICAgICAgY29uc3QgJGVsID0gJChlbCk7XG5cbiAgICAgIC8vIElmIHN0aWNreSBlbGVtZW50IGlzIGN1cnJlbnRseSBmaXhlZCwgYWRqdXN0IGl0cyB0b3AgdmFsdWUgdG8gbWF0Y2ggYWJzb2x1dGUgcG9zaXRpb24gZHVlIHRvIHRyYW5zZm9ybSBzY29wZVxuICAgICAgLy8gTGltaXQgdG8gcHVzaCB0cmFuc2l0aW9uIGJlY2F1c2UgcG9zdGlvbjpmaXhlZCB3b3JrcyB3aXRob3V0IHByb2JsZW1zIGZvciBvdmVybGFwIChubyB0cmFuc2Zvcm0gc2NvcGUpXG4gICAgICBpZiAoJGVsLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuXG4gICAgICAgIC8vIFNhdmUgY3VycmVudCBpbmxpbmUgc3R5bGluZyB0byByZXN0b3JlIGl0IGlmIHVuZG9pbmcgdGhlIGFic29sdXRlIGZpeGluZ1xuICAgICAgICBsZXQgdG9wVmFsID0gcGFyc2VJbnQoJGVsLmNzcygndG9wJyksIDEwKTtcbiAgICAgICAgJGVsLmRhdGEoJ29mZkNhbnZhc1N0aWNreScsIHsgdG9wOiB0b3BWYWwgfSk7XG5cbiAgICAgICAgbGV0IGFic29sdXRlVG9wVmFsID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyB0b3BWYWw7XG4gICAgICAgICRlbC5jc3MoeyB0b3A6IGAke2Fic29sdXRlVG9wVmFsfXB4YCwgd2lkdGg6ICcxMDAlJywgdHJhbnNpdGlvbjogJ25vbmUnIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RvcmVzIHRoZSBvcmlnaW5hbCBmaXhlZCBzdHlsaW5nIG9mIHN0aWNreSBlbGVtZW50cyBhZnRlciBoYXZpbmcgY2xvc2VkIGFuIG9mZi1jYW52YXMgdGhhdCBnb3QgcHNldWRvIGZpeGVkIGJlZm9yZWhhbmQuXG4gICAqIFRoaXMgcmV2ZXJ0cyB0aGUgY2hhbmdlcyBvZiBfZml4U3RpY2t5RWxlbWVudHMoKVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3VuZml4U3RpY2t5RWxlbWVudHMoKSB7XG4gICAgdGhpcy4kc3RpY2t5LmVhY2goKF8sIGVsKSA9PiB7XG4gICAgICBjb25zdCAkZWwgPSAkKGVsKTtcbiAgICAgIGxldCBzdGlja3lEYXRhID0gJGVsLmRhdGEoJ29mZkNhbnZhc1N0aWNreScpO1xuXG4gICAgICAvLyBJZiBzdGlja3kgZWxlbWVudCBoYXMgZ290IGRhdGEgb2JqZWN0IHdpdGggcHJpb3IgdmFsdWVzIChtZWFuaW5nIGl0IHdhcyBvcmlnaW5hbGx5IGZpeGVkKSByZXN0b3JlIHRoZXNlIHZhbHVlcyBvbmNlIG9mZi1jYW52YXMgaXMgY2xvc2VkXG4gICAgICBpZiAodHlwZW9mIHN0aWNreURhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICRlbC5jc3MoeyB0b3A6IGAke3N0aWNreURhdGEudG9wfXB4YCwgd2lkdGg6ICcnLCB0cmFuc2l0aW9uOiAnJyB9KVxuICAgICAgICAkZWwuZGF0YSgnb2ZmQ2FudmFzU3RpY2t5JywgJycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHJldmVhbGluZy9oaWRpbmcgdGhlIG9mZi1jYW52YXMgYXQgYnJlYWtwb2ludHMsIG5vdCB0aGUgc2FtZSBhcyBvcGVuLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzUmV2ZWFsZWQgLSB0cnVlIGlmIGVsZW1lbnQgc2hvdWxkIGJlIHJldmVhbGVkLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHJldmVhbChpc1JldmVhbGVkKSB7XG4gICAgaWYgKGlzUmV2ZWFsZWQpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuaXNSZXZlYWxlZCA9IHRydWU7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9mZignb3Blbi56Zi50cmlnZ2VyIHRvZ2dsZS56Zi50cmlnZ2VyJyk7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1JldmVhbGVkID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdvcGVuLnpmLnRyaWdnZXIgdG9nZ2xlLnpmLnRyaWdnZXInKS5vbih7XG4gICAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKVxuICAgICAgfSk7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fYWRkQ29udGVudENsYXNzZXMoaXNSZXZlYWxlZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgc2Nyb2xsaW5nIG9mIHRoZSBib2R5IHdoZW4gT2ZmQ2FudmFzIGlzIG9wZW4gb24gbW9iaWxlIFNhZmFyaSBhbmQgb3RoZXIgdHJvdWJsZXNvbWUgYnJvd3NlcnMuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N0b3BTY3JvbGxpbmcoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgY3VycmVudCBmaW5nZXIgeS1wb3NpdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWNvcmRTY3JvbGxhYmxlKGV2ZW50KSB7XG4gICAgY29uc3QgZWxlbSA9IHRoaXM7XG4gICAgZWxlbS5sYXN0WSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XG4gIH1cblxuICAvKipcbiAgICogUHJldmVudCBmdXJ0aGVyIHNjcm9sbGluZyB3aGVuIGl0IGhpdHMgdGhlIGVkZ2VzXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3ByZXZlbnREZWZhdWx0QXRFZGdlcyhldmVudCkge1xuICAgIGNvbnN0IGVsZW0gPSB0aGlzO1xuICAgIGNvbnN0IF90aGlzID0gZXZlbnQuZGF0YTtcbiAgICBjb25zdCBkZWx0YSA9IGVsZW0ubGFzdFkgLSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIGVsZW0ubGFzdFkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgaWYgKCFfdGhpcy5fY2FuU2Nyb2xsKGRlbHRhLCBlbGVtKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGNvbnRpbnVvdXMgc2Nyb2xsaW5nIG9mIHNjcm9sbGJveFxuICAgKiBEb24ndCBidWJibGUgdXAgdG8gX3ByZXZlbnREZWZhdWx0QXRFZGdlc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zY3JvbGxib3hUb3VjaE1vdmVkKGV2ZW50KSB7XG4gICAgY29uc3QgZWxlbSA9IHRoaXM7XG4gICAgY29uc3QgX3RoaXMgPSBldmVudC5kYXRhO1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW0uY2xvc2VzdCgnW2RhdGEtb2ZmLWNhbnZhc10sIFtkYXRhLW9mZi1jYW52YXMtc2Nyb2xsYm94LW91dGVyXScpO1xuICAgIGNvbnN0IGRlbHRhID0gZWxlbS5sYXN0WSAtIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgcGFyZW50Lmxhc3RZID0gZWxlbS5sYXN0WSA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghX3RoaXMuX2NhblNjcm9sbChkZWx0YSwgZWxlbSkpIHtcbiAgICAgIGlmICghX3RoaXMuX2NhblNjcm9sbChkZWx0YSwgcGFyZW50KSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50LnNjcm9sbFRvcCArPSBkZWx0YTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0IHBvc3NpYmlsaXR5IG9mIHNjcm9sbGluZ1xuICAgKiBAcGFyYW0gZGVsdGFcbiAgICogQHBhcmFtIGVsZW1cbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NhblNjcm9sbChkZWx0YSwgZWxlbSkge1xuICAgIGNvbnN0IHVwID0gZGVsdGEgPCAwO1xuICAgIGNvbnN0IGRvd24gPSBkZWx0YSA+IDA7XG4gICAgY29uc3QgYWxsb3dVcCA9IGVsZW0uc2Nyb2xsVG9wID4gMDtcbiAgICBjb25zdCBhbGxvd0Rvd24gPSBlbGVtLnNjcm9sbFRvcCA8IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQ7XG4gICAgcmV0dXJuIHVwICYmIGFsbG93VXAgfHwgZG93biAmJiBhbGxvd0Rvd247XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIG9mZi1jYW52YXMgbWVudS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIEV2ZW50IG9iamVjdCBwYXNzZWQgZnJvbSBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHtqUXVlcnl9IHRyaWdnZXIgLSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBvZmYtY2FudmFzIHRvIG9wZW4uXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjb3BlbmVkXG4gICAqIEB0b2RvIGFsc28gdHJpZ2dlciAnb3BlbicgZXZlbnQ/XG4gICAqL1xuICBvcGVuKGV2ZW50LCB0cmlnZ2VyKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSB8fCB0aGlzLmlzUmV2ZWFsZWQgfHwgdGhpcy5pc0luQ2FudmFzKSB7IHJldHVybjsgfVxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgdGhpcy4kbGFzdFRyaWdnZXIgPSB0cmlnZ2VyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9yY2VUbyA9PT0gJ3RvcCcpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5mb3JjZVRvID09PSAnYm90dG9tJykge1xuICAgICAgd2luZG93LnNjcm9sbFRvKDAsZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvblRpbWUgJiYgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24gIT09ICdvdmVybGFwJykge1xuICAgICAgdGhpcy4kZWxlbWVudC5zaWJsaW5ncygnW2RhdGEtb2ZmLWNhbnZhcy1jb250ZW50XScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMub3B0aW9ucy50cmFuc2l0aW9uVGltZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuc2libGluZ3MoJ1tkYXRhLW9mZi1jYW52YXMtY29udGVudF0nKS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnaXMtb3BlbicpLnJlbW92ZUNsYXNzKCdpcy1jbG9zZWQnKTtcblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQuYWRkQ2xhc3MoJ2lzLW9wZW4tJyArIHRoaXMucG9zaXRpb24pO1xuXG4gICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgYWRkIGNsYXNzIGFuZCBkaXNhYmxlIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzLlxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub24oJ3RvdWNobW92ZScsIHRoaXMuX3N0b3BTY3JvbGxpbmcpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2hzdGFydCcsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigndG91Y2htb3ZlJywgdGhpcywgdGhpcy5fcHJldmVudERlZmF1bHRBdEVkZ2VzKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQub24oJ3RvdWNoc3RhcnQnLCAnW2RhdGEtb2ZmLWNhbnZhcy1zY3JvbGxib3hdJywgdGhpcy5fcmVjb3JkU2Nyb2xsYWJsZSk7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCd0b3VjaG1vdmUnLCAnW2RhdGEtb2ZmLWNhbnZhcy1zY3JvbGxib3hdJywgdGhpcywgdGhpcy5fc2Nyb2xsYm94VG91Y2hNb3ZlZCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkNsaWNrID09PSB0cnVlICYmIHRoaXMub3B0aW9ucy5jb250ZW50T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5hZGRDbGFzcygnaXMtY2xvc2FibGUnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Gb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgIHJldHVybjsgLy8gZXhpdCBpZiBwcmVtYXR1cmVseSBjbG9zZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FudmFzRm9jdXMgPSBfdGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1hdXRvZm9jdXNdJyk7XG4gICAgICAgIGlmIChjYW52YXNGb2N1cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbnZhc0ZvY3VzLmVxKDApLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy4kZWxlbWVudC5maW5kKCdhLCBidXR0b24nKS5lcSgwKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy4kY29udGVudC5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgS2V5Ym9hcmQudHJhcEZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiA9PT0gJ3B1c2gnKSB7XG4gICAgICB0aGlzLl9maXhTdGlja3lFbGVtZW50cygpO1xuICAgIH1cblxuICAgIHRoaXMuX2FkZENvbnRlbnRDbGFzc2VzKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgb3BlbnMuXG4gICAgICogQGV2ZW50IE9mZkNhbnZhcyNvcGVuZWRcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW5lZC56Zi5vZmZDYW52YXMnKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBvcGVuIHRyYW5zaXRpb24gaXMgZG9uZS5cbiAgICAgKiBAZXZlbnQgT2ZmQ2FudmFzI29wZW5lZEVuZFxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQub25lKHRyYW5zaXRpb25lbmQodGhpcy4kZWxlbWVudCksICgpID0+IHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignb3BlbmVkRW5kLnpmLm9mZkNhbnZhcycpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgb2ZmLWNhbnZhcyBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBvcHRpb25hbCBjYiB0byBmaXJlIGFmdGVyIGNsb3N1cmUuXG4gICAqIEBmaXJlcyBPZmZDYW52YXMjY2xvc2VcbiAgICogQGZpcmVzIE9mZkNhbnZhcyNjbG9zZWRcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaXMtb3BlbicpIHx8IHRoaXMuaXNSZXZlYWxlZCkgeyByZXR1cm47IH1cblxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gdGhlIG9mZi1jYW52YXMgbWVudSBjbG9zZXMuXG4gICAgICogQGV2ZW50IE9mZkNhbnZhcyNjbG9zZVxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2UuemYub2ZmQ2FudmFzJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIHRoaXMuJGNvbnRlbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4tbGVmdCBpcy1vcGVuLXRvcCBpcy1vcGVuLXJpZ2h0IGlzLW9wZW4tYm90dG9tJyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgPT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmNvbnRlbnRPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLiRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy1jbG9zYWJsZScpO1xuICAgIH1cblxuICAgIHRoaXMuJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuXG4gICAgLy8gTGlzdGVuIHRvIHRyYW5zaXRpb25FbmQ6IGFkZCBjbGFzcywgcmUtZW5hYmxlIHNjcm9sbGluZyBhbmQgcmVsZWFzZSBmb2N1cyB3aGVuIGRvbmUuXG4gICAgdGhpcy4kZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZCh0aGlzLiRlbGVtZW50KSwgKCkgPT4ge1xuXG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdpcy1jbG9zZWQnKTtcbiAgICAgIHRoaXMuX3JlbW92ZUNvbnRlbnRDbGFzc2VzKCk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiA9PT0gJ3B1c2gnKSB7XG4gICAgICAgIHRoaXMuX3VuZml4U3RpY2t5RWxlbWVudHMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYGNvbnRlbnRTY3JvbGxgIGlzIHNldCB0byBmYWxzZSwgcmVtb3ZlIGNsYXNzIGFuZCByZS1lbmFibGUgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRTY3JvbGwgPT09IGZhbHNlKSB7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtb2ZmLWNhbnZhcy1vcGVuJykub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLl9zdG9wU2Nyb2xsaW5nKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNoc3RhcnQnLCB0aGlzLl9yZWNvcmRTY3JvbGxhYmxlKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvdWNobW92ZScsIHRoaXMuX3ByZXZlbnREZWZhdWx0QXRFZGdlcyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCd0b3VjaHN0YXJ0JywgJ1tkYXRhLW9mZi1jYW52YXMtc2Nyb2xsYm94XScsIHRoaXMuX3JlY29yZFNjcm9sbGFibGUpO1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9mZigndG91Y2htb3ZlJywgJ1tkYXRhLW9mZi1jYW52YXMtc2Nyb2xsYm94XScsIHRoaXMuX3Njcm9sbGJveFRvdWNoTW92ZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRyYXBGb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRjb250ZW50LnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgIEtleWJvYXJkLnJlbGVhc2VGb2N1cyh0aGlzLiRlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBGaXJlcyB3aGVuIHRoZSBvZmYtY2FudmFzIG1lbnUgY2xvc2UgdHJhbnNpdGlvbiBpcyBkb25lLlxuICAgICAgICogQGV2ZW50IE9mZkNhbnZhcyNjbG9zZWRcbiAgICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjbG9zZWQuemYub2ZmQ2FudmFzJyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgb2ZmLWNhbnZhcyBtZW51IG9wZW4gb3IgY2xvc2VkLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gRXZlbnQgb2JqZWN0IHBhc3NlZCBmcm9tIGxpc3RlbmVyLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdHJpZ2dlciAtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIG9mZi1jYW52YXMgdG8gb3Blbi5cbiAgICovXG4gIHRvZ2dsZShldmVudCwgdHJpZ2dlcikge1xuICAgIGlmICh0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgIHRoaXMuY2xvc2UoZXZlbnQsIHRyaWdnZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub3BlbihldmVudCwgdHJpZ2dlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5Ym9hcmQgaW5wdXQgd2hlbiBkZXRlY3RlZC4gV2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLCB0aGUgb2ZmLWNhbnZhcyBtZW51IGNsb3NlcywgYW5kIGZvY3VzIGlzIHJlc3RvcmVkIHRvIHRoZSBlbGVtZW50IHRoYXQgb3BlbmVkIHRoZSBtZW51LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYW5kbGVLZXlib2FyZChlKSB7XG4gICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdPZmZDYW52YXMnLCB7XG4gICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuJGxhc3RUcmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGhhbmRsZWQ6ICgpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBPZmZDYW52YXMgcGx1Z2luLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9kZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRyaWdnZXIgLnpmLm9mZkNhbnZhcycpO1xuICAgIHRoaXMuJG92ZXJsYXkub2ZmKCcuemYub2ZmQ2FudmFzJyk7XG4gICAgaWYgKHRoaXMub25Mb2FkTGlzdGVuZXIpICQod2luZG93KS5vZmYodGhpcy5vbkxvYWRMaXN0ZW5lcik7XG4gIH1cbn1cblxuT2ZmQ2FudmFzLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgb3V0c2lkZSBvZiB0aGUgbWVudSB0byBjbG9zZSBpdC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIG92ZXJsYXkgb24gdG9wIG9mIGBbZGF0YS1vZmYtY2FudmFzLWNvbnRlbnRdYC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudE92ZXJsYXk6IHRydWUsXG5cbiAgLyoqXG4gICAqIFRhcmdldCBhbiBvZmYtY2FudmFzIGNvbnRlbnQgY29udGFpbmVyIGJ5IElEIHRoYXQgbWF5IGJlIHBsYWNlZCBhbnl3aGVyZS4gSWYgbnVsbCB0aGUgY2xvc2VzdCBjb250ZW50IGNvbnRhaW5lciB3aWxsIGJlIHRha2VuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBjb250ZW50SWQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIERlZmluZSB0aGUgb2ZmLWNhbnZhcyBlbGVtZW50IGlzIG5lc3RlZCBpbiBhbiBvZmYtY2FudmFzIGNvbnRlbnQuIFRoaXMgaXMgcmVxdWlyZWQgd2hlbiB1c2luZyB0aGUgY29udGVudElkIG9wdGlvbiBmb3IgYSBuZXN0ZWQgZWxlbWVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgbmVzdGVkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBFbmFibGUvZGlzYWJsZSBzY3JvbGxpbmcgb2YgdGhlIG1haW4gY29udGVudCB3aGVuIGFuIG9mZiBjYW52YXMgcGFuZWwgaXMgb3Blbi5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY29udGVudFNjcm9sbDogdHJ1ZSxcblxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgdGhlIG9wZW4gYW5kIGNsb3NlIHRyYW5zaXRpb24gcmVxdWlyZXMsIGluY2x1ZGluZyB0aGUgYXBwcm9wcmlhdGUgbWlsbGlzZWNvbmRzIChgbXNgKSBvciBzZWNvbmRzIChgc2ApIHVuaXQgKGUuZy4gYDUwMG1zYCwgYC43NXNgKSBJZiBub25lIHNlbGVjdGVkLCBwdWxscyBmcm9tIGJvZHkgc3R5bGUuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgdHJhbnNpdGlvblRpbWU6IG51bGwsXG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdHJhbnNpdGlvbiBmb3IgdGhlIE9mZkNhbnZhcyBtZW51LiBPcHRpb25zIGFyZSAncHVzaCcsICdkZXRhY2hlZCcgb3IgJ3NsaWRlJy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCBwdXNoXG4gICAqL1xuICB0cmFuc2l0aW9uOiAncHVzaCcsXG5cbiAgLyoqXG4gICAqIEZvcmNlIHRoZSBwYWdlIHRvIHNjcm9sbCB0byB0b3Agb3IgYm90dG9tIG9uIG9wZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGZvcmNlVG86IG51bGwsXG5cbiAgLyoqXG4gICAqIEFsbG93IHRoZSBPZmZDYW52YXMgdG8gcmVtYWluIG9wZW4gZm9yIGNlcnRhaW4gYnJlYWtwb2ludHMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBpc1JldmVhbGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogQnJlYWtwb2ludCBhdCB3aGljaCB0byByZXZlYWwuIEpTIHdpbGwgdXNlIGEgUmVnRXhwIHRvIHRhcmdldCBzdGFuZGFyZCBjbGFzc2VzLCBpZiBjaGFuZ2luZyBjbGFzc25hbWVzLCBwYXNzIHlvdXIgY2xhc3Mgd2l0aCB0aGUgYHJldmVhbENsYXNzYCBvcHRpb24uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIHJldmVhbE9uOiBudWxsLFxuXG4gIC8qKlxuICAgKiBCcmVha3BvaW50IGF0IHdoaWNoIHRoZSBvZmYtY2FudmFzIGdldHMgbW92ZWQgaW50byBjYW52YXMgY29udGVudCBhbmQgYWN0cyBhcyByZWd1bGFyIHBhZ2UgZWxlbWVudC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgaW5DYW52YXNPbjogbnVsbCxcblxuICAvKipcbiAgICogRm9yY2UgZm9jdXMgdG8gdGhlIG9mZmNhbnZhcyBvbiBvcGVuLiBJZiB0cnVlLCB3aWxsIGZvY3VzIHRoZSBvcGVuaW5nIHRyaWdnZXIgb24gY2xvc2UuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGF1dG9Gb2N1czogdHJ1ZSxcblxuICAvKipcbiAgICogQ2xhc3MgdXNlZCB0byBmb3JjZSBhbiBPZmZDYW52YXMgdG8gcmVtYWluIG9wZW4uIEZvdW5kYXRpb24gZGVmYXVsdHMgZm9yIHRoaXMgYXJlIGByZXZlYWwtZm9yLWxhcmdlYCAmIGByZXZlYWwtZm9yLW1lZGl1bWAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgcmV2ZWFsLWZvci1cbiAgICogQHRvZG8gaW1wcm92ZSB0aGUgcmVnZXggdGVzdGluZyBmb3IgdGhpcy5cbiAgICovXG4gIHJldmVhbENsYXNzOiAncmV2ZWFsLWZvci0nLFxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBvcHRpb25hbCBmb2N1cyB0cmFwcGluZyB3aGVuIG9wZW5pbmcgYW4gT2ZmQ2FudmFzLiBTZXRzIHRhYmluZGV4IG9mIFtkYXRhLW9mZi1jYW52YXMtY29udGVudF0gdG8gLTEgZm9yIGFjY2Vzc2liaWxpdHkgcHVycG9zZXMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB0cmFwRm9jdXM6IGZhbHNlXG59XG5cbmV4cG9ydCB7T2ZmQ2FudmFzfTtcbiIsImltcG9ydCB7IEJveCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmJveCc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcblxuY29uc3QgUE9TSVRJT05TID0gWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXTtcbmNvbnN0IFZFUlRJQ0FMX0FMSUdOTUVOVFMgPSBbJ3RvcCcsICdib3R0b20nLCAnY2VudGVyJ107XG5jb25zdCBIT1JJWk9OVEFMX0FMSUdOTUVOVFMgPSBbJ2xlZnQnLCAncmlnaHQnLCAnY2VudGVyJ107XG5cbmNvbnN0IEFMSUdOTUVOVFMgPSB7XG4gICdsZWZ0JzogVkVSVElDQUxfQUxJR05NRU5UUyxcbiAgJ3JpZ2h0JzogVkVSVElDQUxfQUxJR05NRU5UUyxcbiAgJ3RvcCc6IEhPUklaT05UQUxfQUxJR05NRU5UUyxcbiAgJ2JvdHRvbSc6IEhPUklaT05UQUxfQUxJR05NRU5UU1xufVxuXG5mdW5jdGlvbiBuZXh0SXRlbShpdGVtLCBhcnJheSkge1xuICB2YXIgY3VycmVudElkeCA9IGFycmF5LmluZGV4T2YoaXRlbSk7XG4gIGlmKGN1cnJlbnRJZHggPT09IGFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gYXJyYXlbMF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFycmF5W2N1cnJlbnRJZHggKyAxXTtcbiAgfVxufVxuXG5cbmNsYXNzIFBvc2l0aW9uYWJsZSBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBBYnN0cmFjdCBjbGFzcyBlbmNhcHN1bGF0aW5nIHRoZSB0ZXRoZXItbGlrZSBleHBsaWNpdCBwb3NpdGlvbmluZyBsb2dpY1xuICAgKiBpbmNsdWRpbmcgcmVwb3NpdGlvbmluZyBiYXNlZCBvbiBvdmVybGFwLlxuICAgKiBFeHBlY3RzIGNsYXNzZXMgdG8gZGVmaW5lIGRlZmF1bHRzIGZvciB2T2Zmc2V0LCBoT2Zmc2V0LCBwb3NpdGlvbixcbiAgICogYWxpZ25tZW50LCBhbGxvd092ZXJsYXAsIGFuZCBhbGxvd0JvdHRvbU92ZXJsYXAuIFRoZXkgY2FuIGRvIHRoaXMgYnlcbiAgICogZXh0ZW5kaW5nIHRoZSBkZWZhdWx0cywgb3IgKGZvciBub3cgcmVjb21tZW5kZWQgZHVlIHRvIHRoZSB3YXkgZG9jcyBhcmVcbiAgICogZ2VuZXJhdGVkKSBieSBleHBsaWNpdGx5IGRlY2xhcmluZyB0aGVtLlxuICAgKlxuICAgKiovXG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy50cmllZFBvc2l0aW9ucyA9IHt9O1xuICAgIHRoaXMucG9zaXRpb24gID0gdGhpcy5vcHRpb25zLnBvc2l0aW9uID09PSAnYXV0bycgPyB0aGlzLl9nZXREZWZhdWx0UG9zaXRpb24oKSA6IHRoaXMub3B0aW9ucy5wb3NpdGlvbjtcbiAgICB0aGlzLmFsaWdubWVudCA9IHRoaXMub3B0aW9ucy5hbGlnbm1lbnQgPT09ICdhdXRvJyA/IHRoaXMuX2dldERlZmF1bHRBbGlnbm1lbnQoKSA6IHRoaXMub3B0aW9ucy5hbGlnbm1lbnQ7XG4gICAgdGhpcy5vcmlnaW5hbFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICB0aGlzLm9yaWdpbmFsQWxpZ25tZW50ID0gdGhpcy5hbGlnbm1lbnQ7XG4gIH1cblxuICBfZ2V0RGVmYXVsdFBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gJ2JvdHRvbSc7XG4gIH1cblxuICBfZ2V0RGVmYXVsdEFsaWdubWVudCgpIHtcbiAgICBzd2l0Y2godGhpcy5wb3NpdGlvbikge1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHJldHVybiBSdGwoKSA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgcmV0dXJuICdib3R0b20nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3RzIHRoZSBwb3NpdGlvbmFibGUgcG9zc2libGUgcG9zaXRpb25zIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGFsaWdubWVudHNcbiAgICogYW5kIHBvc2l0aW9ucy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVwb3NpdGlvbigpIHtcbiAgICBpZih0aGlzLl9hbGlnbm1lbnRzRXhoYXVzdGVkKHRoaXMucG9zaXRpb24pKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gbmV4dEl0ZW0odGhpcy5wb3NpdGlvbiwgUE9TSVRJT05TKTtcbiAgICAgIHRoaXMuYWxpZ25tZW50ID0gQUxJR05NRU5UU1t0aGlzLnBvc2l0aW9uXVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVhbGlnbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3RzIHRoZSBkcm9wZG93biBwYW5lIHBvc3NpYmxlIHBvc2l0aW9ucyBieSBpdGVyYXRpbmcgdGhyb3VnaCBhbGlnbm1lbnRzXG4gICAqIG9uIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWFsaWduKCkge1xuICAgIHRoaXMuX2FkZFRyaWVkUG9zaXRpb24odGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQpXG4gICAgdGhpcy5hbGlnbm1lbnQgPSBuZXh0SXRlbSh0aGlzLmFsaWdubWVudCwgQUxJR05NRU5UU1t0aGlzLnBvc2l0aW9uXSlcbiAgfVxuXG4gIF9hZGRUcmllZFBvc2l0aW9uKHBvc2l0aW9uLCBhbGlnbm1lbnQpIHtcbiAgICB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXSA9IHRoaXMudHJpZWRQb3NpdGlvbnNbcG9zaXRpb25dIHx8IFtdXG4gICAgdGhpcy50cmllZFBvc2l0aW9uc1twb3NpdGlvbl0ucHVzaChhbGlnbm1lbnQpO1xuICB9XG5cbiAgX3Bvc2l0aW9uc0V4aGF1c3RlZCgpIHtcbiAgICB2YXIgaXNFeGhhdXN0ZWQgPSB0cnVlO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBQT1NJVElPTlMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlzRXhoYXVzdGVkID0gaXNFeGhhdXN0ZWQgJiYgdGhpcy5fYWxpZ25tZW50c0V4aGF1c3RlZChQT1NJVElPTlNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gaXNFeGhhdXN0ZWQ7XG4gIH1cblxuICBfYWxpZ25tZW50c0V4aGF1c3RlZChwb3NpdGlvbikge1xuICAgIHJldHVybiB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXSAmJiB0aGlzLnRyaWVkUG9zaXRpb25zW3Bvc2l0aW9uXS5sZW5ndGggPT09IEFMSUdOTUVOVFNbcG9zaXRpb25dLmxlbmd0aDtcbiAgfVxuXG5cbiAgLy8gV2hlbiB3ZSdyZSB0cnlpbmcgdG8gY2VudGVyLCB3ZSBkb24ndCB3YW50IHRvIGFwcGx5IG9mZnNldCB0aGF0J3MgZ29pbmcgdG9cbiAgLy8gdGFrZSB1cyBqdXN0IG9mZiBjZW50ZXIsIHNvIHdyYXAgYXJvdW5kIHRvIHJldHVybiAwIGZvciB0aGUgYXBwcm9wcmlhdGVcbiAgLy8gb2Zmc2V0IGluIHRob3NlIGFsaWdubWVudHMuICBUT0RPOiBGaWd1cmUgb3V0IGlmIHdlIHdhbnQgdG8gbWFrZSB0aGlzXG4gIC8vIGNvbmZpZ3VyYWJsZSBiZWhhdmlvci4uLiBpdCBmZWVscyBtb3JlIGludHVpdGl2ZSwgZXNwZWNpYWxseSBmb3IgdG9vbHRpcHMsIGJ1dFxuICAvLyBpdCdzIHBvc3NpYmxlIHNvbWVvbmUgbWlnaHQgYWN0dWFsbHkgd2FudCB0byBzdGFydCBmcm9tIGNlbnRlciBhbmQgdGhlbiBudWRnZVxuICAvLyBzbGlnaHRseSBvZmYuXG4gIF9nZXRWT2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudk9mZnNldDtcbiAgfVxuXG4gIF9nZXRIT2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaE9mZnNldDtcbiAgfVxuXG4gIF9zZXRQb3NpdGlvbigkYW5jaG9yLCAkZWxlbWVudCwgJHBhcmVudCkge1xuICAgIGlmKCRhbmNob3IuYXR0cignYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKXsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hbGxvd092ZXJsYXApIHtcbiAgICAgIC8vIHJlc3RvcmUgb3JpZ2luYWwgcG9zaXRpb24gJiBhbGlnbm1lbnQgYmVmb3JlIGNoZWNraW5nIG92ZXJsYXBcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9yaWdpbmFsUG9zaXRpb247XG4gICAgICB0aGlzLmFsaWdubWVudCA9IHRoaXMub3JpZ2luYWxBbGlnbm1lbnQ7XG4gICAgfVxuXG4gICAgJGVsZW1lbnQub2Zmc2V0KEJveC5HZXRFeHBsaWNpdE9mZnNldHMoJGVsZW1lbnQsICRhbmNob3IsIHRoaXMucG9zaXRpb24sIHRoaXMuYWxpZ25tZW50LCB0aGlzLl9nZXRWT2Zmc2V0KCksIHRoaXMuX2dldEhPZmZzZXQoKSkpO1xuXG4gICAgaWYoIXRoaXMub3B0aW9ucy5hbGxvd092ZXJsYXApIHtcbiAgICAgIHZhciBtaW5PdmVybGFwID0gMTAwMDAwMDAwO1xuICAgICAgLy8gZGVmYXVsdCBjb29yZGluYXRlcyB0byBob3cgd2Ugc3RhcnQsIGluIGNhc2Ugd2UgY2FuJ3QgZmlndXJlIG91dCBiZXR0ZXJcbiAgICAgIHZhciBtaW5Db29yZGluYXRlcyA9IHtwb3NpdGlvbjogdGhpcy5wb3NpdGlvbiwgYWxpZ25tZW50OiB0aGlzLmFsaWdubWVudH07XG4gICAgICB3aGlsZSghdGhpcy5fcG9zaXRpb25zRXhoYXVzdGVkKCkpIHtcbiAgICAgICAgbGV0IG92ZXJsYXAgPSBCb3guT3ZlcmxhcEFyZWEoJGVsZW1lbnQsICRwYXJlbnQsIGZhbHNlLCBmYWxzZSwgdGhpcy5vcHRpb25zLmFsbG93Qm90dG9tT3ZlcmxhcCk7XG4gICAgICAgIGlmKG92ZXJsYXAgPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZihvdmVybGFwIDwgbWluT3ZlcmxhcCkge1xuICAgICAgICAgIG1pbk92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICAgIG1pbkNvb3JkaW5hdGVzID0ge3Bvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCBhbGlnbm1lbnQ6IHRoaXMuYWxpZ25tZW50fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlcG9zaXRpb24oKTtcblxuICAgICAgICAkZWxlbWVudC5vZmZzZXQoQm94LkdldEV4cGxpY2l0T2Zmc2V0cygkZWxlbWVudCwgJGFuY2hvciwgdGhpcy5wb3NpdGlvbiwgdGhpcy5hbGlnbm1lbnQsIHRoaXMuX2dldFZPZmZzZXQoKSwgdGhpcy5fZ2V0SE9mZnNldCgpKSk7XG4gICAgICB9XG4gICAgICAvLyBJZiB3ZSBnZXQgdGhyb3VnaCB0aGUgZW50aXJlIGxvb3AsIHRoZXJlIHdhcyBubyBub24tb3ZlcmxhcHBpbmdcbiAgICAgIC8vIHBvc2l0aW9uIGF2YWlsYWJsZS4gUGljayB0aGUgdmVyc2lvbiB3aXRoIGxlYXN0IG92ZXJsYXAuXG4gICAgICB0aGlzLnBvc2l0aW9uID0gbWluQ29vcmRpbmF0ZXMucG9zaXRpb247XG4gICAgICB0aGlzLmFsaWdubWVudCA9IG1pbkNvb3JkaW5hdGVzLmFsaWdubWVudDtcbiAgICAgICRlbGVtZW50Lm9mZnNldChCb3guR2V0RXhwbGljaXRPZmZzZXRzKCRlbGVtZW50LCAkYW5jaG9yLCB0aGlzLnBvc2l0aW9uLCB0aGlzLmFsaWdubWVudCwgdGhpcy5fZ2V0Vk9mZnNldCgpLCB0aGlzLl9nZXRIT2Zmc2V0KCkpKTtcbiAgICB9XG4gIH1cblxufVxuXG5Qb3NpdGlvbmFibGUuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiBwb3NpdGlvbmFibGUgcmVsYXRpdmUgdG8gYW5jaG9yLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgcG9zaXRpb246ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsaWdubWVudCBvZiBwb3NpdGlvbmFibGUgcmVsYXRpdmUgdG8gYW5jaG9yLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBjZW50ZXIsIG9yIGF1dG8uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBhbGlnbm1lbnQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93IG92ZXJsYXAgb2YgY29udGFpbmVyL3dpbmRvdy4gSWYgZmFsc2UsIGRyb3Bkb3duIHBvc2l0aW9uYWJsZSBmaXJzdFxuICAgKiB0cnkgdG8gcG9zaXRpb24gYXMgZGVmaW5lZCBieSBkYXRhLXBvc2l0aW9uIGFuZCBkYXRhLWFsaWdubWVudCwgYnV0XG4gICAqIHJlcG9zaXRpb24gaWYgaXQgd291bGQgY2F1c2UgYW4gb3ZlcmZsb3cuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd092ZXJsYXA6IGZhbHNlLFxuICAvKipcbiAgICogQWxsb3cgb3ZlcmxhcCBvZiBvbmx5IHRoZSBib3R0b20gb2YgdGhlIGNvbnRhaW5lci4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb25cbiAgICogYmVoYXZpb3IgZm9yIGRyb3Bkb3ducywgYWxsb3dpbmcgdGhlIGRyb3Bkb3duIHRvIGV4dGVuZCB0aGUgYm90dG9tIG9mIHRoZVxuICAgKiBzY3JlZW4gYnV0IG5vdCBvdGhlcndpc2UgaW5mbHVlbmNlIG9yIGJyZWFrIG91dCBvZiB0aGUgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhbGxvd0JvdHRvbU92ZXJsYXA6IHRydWUsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRoZSBwb3NpdGlvbmFibGUgc2hvdWxkIGJlIHNlcGFyYXRlZCB2ZXJ0aWNhbGx5IGZyb20gYW5jaG9yXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgdk9mZnNldDogMCxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdGhlIHBvc2l0aW9uYWJsZSBzaG91bGQgYmUgc2VwYXJhdGVkIGhvcml6b250YWxseSBmcm9tIGFuY2hvclxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIGhPZmZzZXQ6IDAsXG59XG5cbmV4cG9ydCB7UG9zaXRpb25hYmxlfTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcblxuaW1wb3J0IHsgRHJvcGRvd25NZW51IH0gZnJvbSAnLi9mb3VuZGF0aW9uLmRyb3Bkb3duTWVudSc7XG5pbXBvcnQgeyBEcmlsbGRvd24gfSBmcm9tICcuL2ZvdW5kYXRpb24uZHJpbGxkb3duJztcbmltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICcuL2ZvdW5kYXRpb24uYWNjb3JkaW9uTWVudSc7XG5cbmxldCBNZW51UGx1Z2lucyA9IHtcbiAgZHJvcGRvd246IHtcbiAgICBjc3NDbGFzczogJ2Ryb3Bkb3duJyxcbiAgICBwbHVnaW46IERyb3Bkb3duTWVudVxuICB9LFxuIGRyaWxsZG93bjoge1xuICAgIGNzc0NsYXNzOiAnZHJpbGxkb3duJyxcbiAgICBwbHVnaW46IERyaWxsZG93blxuICB9LFxuICBhY2NvcmRpb246IHtcbiAgICBjc3NDbGFzczogJ2FjY29yZGlvbi1tZW51JyxcbiAgICBwbHVnaW46IEFjY29yZGlvbk1lbnVcbiAgfVxufTtcblxuICAvLyBpbXBvcnQgXCJmb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMuanNcIjtcblxuXG4vKipcbiAqIFJlc3BvbnNpdmVNZW51IG1vZHVsZS5cbiAqIEBtb2R1bGUgZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5XG4gKi9cblxuY2xhc3MgUmVzcG9uc2l2ZU1lbnUgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIHJlc3BvbnNpdmUgbWVudS5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFJlc3BvbnNpdmVNZW51XG4gICAqIEBmaXJlcyBSZXNwb25zaXZlTWVudSNpbml0XG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBtYWtlIGludG8gYSBkcm9wZG93biBtZW51LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCkge1xuICAgIHRoaXMuJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuICAgIHRoaXMucnVsZXMgPSB0aGlzLiRlbGVtZW50LmRhdGEoJ3Jlc3BvbnNpdmUtbWVudScpO1xuICAgIHRoaXMuY3VycmVudE1xID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRQbHVnaW4gPSBudWxsO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1Jlc3BvbnNpdmVNZW51JzsgLy8gaWU5IGJhY2sgY29tcGF0XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fZXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIE1lbnUgYnkgcGFyc2luZyB0aGUgY2xhc3NlcyBmcm9tIHRoZSAnZGF0YS1SZXNwb25zaXZlTWVudScgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuXG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIC8vIFRoZSBmaXJzdCB0aW1lIGFuIEludGVyY2hhbmdlIHBsdWdpbiBpcyBpbml0aWFsaXplZCwgdGhpcy5ydWxlcyBpcyBjb252ZXJ0ZWQgZnJvbSBhIHN0cmluZyBvZiBcImNsYXNzZXNcIiB0byBhbiBvYmplY3Qgb2YgcnVsZXNcbiAgICBpZiAodHlwZW9mIHRoaXMucnVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgcnVsZXNUcmVlID0ge307XG5cbiAgICAgIC8vIFBhcnNlIHJ1bGVzIGZyb20gXCJjbGFzc2VzXCIgcHVsbGVkIGZyb20gZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGxldCBydWxlcyA9IHRoaXMucnVsZXMuc3BsaXQoJyAnKTtcblxuICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGV2ZXJ5IHJ1bGUgZm91bmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHJ1bGUgPSBydWxlc1tpXS5zcGxpdCgnLScpO1xuICAgICAgICBsZXQgcnVsZVNpemUgPSBydWxlLmxlbmd0aCA+IDEgPyBydWxlWzBdIDogJ3NtYWxsJztcbiAgICAgICAgbGV0IHJ1bGVQbHVnaW4gPSBydWxlLmxlbmd0aCA+IDEgPyBydWxlWzFdIDogcnVsZVswXTtcblxuICAgICAgICBpZiAoTWVudVBsdWdpbnNbcnVsZVBsdWdpbl0gIT09IG51bGwpIHtcbiAgICAgICAgICBydWxlc1RyZWVbcnVsZVNpemVdID0gTWVudVBsdWdpbnNbcnVsZVBsdWdpbl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5ydWxlcyA9IHJ1bGVzVHJlZTtcbiAgICB9XG5cbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdCh0aGlzLnJ1bGVzKSkge1xuICAgICAgdGhpcy5fY2hlY2tNZWRpYVF1ZXJpZXMoKTtcbiAgICB9XG4gICAgLy8gQWRkIGRhdGEtbXV0YXRlIHNpbmNlIGNoaWxkcmVuIG1heSBuZWVkIGl0LlxuICAgIHRoaXMuJGVsZW1lbnQuYXR0cignZGF0YS1tdXRhdGUnLCAodGhpcy4kZWxlbWVudC5hdHRyKCdkYXRhLW11dGF0ZScpIHx8IEdldFlvRGlnaXRzKDYsICdyZXNwb25zaXZlLW1lbnUnKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgdGhlIE1lbnUuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLl9jaGVja01lZGlhUXVlcmllcygpO1xuICAgIH0pO1xuICAgIC8vICQod2luZG93KS5vbigncmVzaXplLnpmLlJlc3BvbnNpdmVNZW51JywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICBfdGhpcy5fY2hlY2tNZWRpYVF1ZXJpZXMoKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGN1cnJlbnQgc2NyZWVuIHdpZHRoIGFnYWluc3QgYXZhaWxhYmxlIG1lZGlhIHF1ZXJpZXMuIElmIHRoZSBtZWRpYSBxdWVyeSBoYXMgY2hhbmdlZCwgYW5kIHRoZSBwbHVnaW4gbmVlZGVkIGhhcyBjaGFuZ2VkLCB0aGUgcGx1Z2lucyB3aWxsIHN3YXAgb3V0LlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja01lZGlhUXVlcmllcygpIHtcbiAgICB2YXIgbWF0Y2hlZE1xLCBfdGhpcyA9IHRoaXM7XG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcnVsZSBhbmQgZmluZCB0aGUgbGFzdCBtYXRjaGluZyBydWxlXG4gICAgJC5lYWNoKHRoaXMucnVsZXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKE1lZGlhUXVlcnkuYXRMZWFzdChrZXkpKSB7XG4gICAgICAgIG1hdGNoZWRNcSA9IGtleTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE5vIG1hdGNoPyBObyBkaWNlXG4gICAgaWYgKCFtYXRjaGVkTXEpIHJldHVybjtcblxuICAgIC8vIFBsdWdpbiBhbHJlYWR5IGluaXRpYWxpemVkPyBXZSBnb29kXG4gICAgaWYgKHRoaXMuY3VycmVudFBsdWdpbiBpbnN0YW5jZW9mIHRoaXMucnVsZXNbbWF0Y2hlZE1xXS5wbHVnaW4pIHJldHVybjtcblxuICAgIC8vIFJlbW92ZSBleGlzdGluZyBwbHVnaW4tc3BlY2lmaWMgQ1NTIGNsYXNzZXNcbiAgICAkLmVhY2goTWVudVBsdWdpbnMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIF90aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHZhbHVlLmNzc0NsYXNzKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgQ1NTIGNsYXNzIGZvciB0aGUgbmV3IHBsdWdpblxuICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3ModGhpcy5ydWxlc1ttYXRjaGVkTXFdLmNzc0NsYXNzKTtcblxuICAgIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgbmV3IHBsdWdpblxuICAgIGlmICh0aGlzLmN1cnJlbnRQbHVnaW4pIHRoaXMuY3VycmVudFBsdWdpbi5kZXN0cm95KCk7XG4gICAgdGhpcy5jdXJyZW50UGx1Z2luID0gbmV3IHRoaXMucnVsZXNbbWF0Y2hlZE1xXS5wbHVnaW4odGhpcy4kZWxlbWVudCwge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBpbnN0YW5jZSBvZiB0aGUgY3VycmVudCBwbHVnaW4gb24gdGhpcyBlbGVtZW50LCBhcyB3ZWxsIGFzIHRoZSB3aW5kb3cgcmVzaXplIGhhbmRsZXIgdGhhdCBzd2l0Y2hlcyB0aGUgcGx1Z2lucyBvdXQuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50UGx1Z2luLmRlc3Ryb3koKTtcbiAgICAkKHdpbmRvdykub2ZmKCcuemYuUmVzcG9uc2l2ZU1lbnUnKTtcbiAgfVxufVxuXG5SZXNwb25zaXZlTWVudS5kZWZhdWx0cyA9IHt9O1xuXG5leHBvcnQge1Jlc3BvbnNpdmVNZW51fTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuaW1wb3J0IHsgb25Mb2FkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBNZWRpYVF1ZXJ5IH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHsgVHJpZ2dlcnMgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC50cmlnZ2Vycyc7XG5pbXBvcnQgeyBUb3VjaCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLnRvdWNoJ1xuXG4vKipcbiAqIFJldmVhbCBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ucmV2ZWFsXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLmtleWJvYXJkXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRvdWNoXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLm1lZGlhUXVlcnlcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubW90aW9uIGlmIHVzaW5nIGFuaW1hdGlvbnNcbiAqL1xuXG5jbGFzcyBSZXZlYWwgZXh0ZW5kcyBQbHVnaW4ge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXZlYWwuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBSZXZlYWxcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHVzZSBmb3IgdGhlIG1vZGFsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbmFsIHBhcmFtZXRlcnMuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBSZXZlYWwuZGVmYXVsdHMsIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKTtcbiAgICB0aGlzLmNsYXNzTmFtZSA9ICdSZXZlYWwnOyAvLyBpZTkgYmFjayBjb21wYXRcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAvLyBUb3VjaCBhbmQgVHJpZ2dlcnMgaW5pdCBhcmUgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSB0aGV5IGFyZSBpbml0aWFsaXplZFxuICAgIFRvdWNoLmluaXQoJCk7XG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdSZXZlYWwnLCB7XG4gICAgICAnRVNDQVBFJzogJ2Nsb3NlJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgbW9kYWwgYnkgYWRkaW5nIHRoZSBvdmVybGF5IGFuZCBjbG9zZSBidXR0b25zLCAoaWYgc2VsZWN0ZWQpLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgTWVkaWFRdWVyeS5faW5pdCgpO1xuICAgIHRoaXMuaWQgPSB0aGlzLiRlbGVtZW50LmF0dHIoJ2lkJyk7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY2FjaGVkID0ge21xOiBNZWRpYVF1ZXJ5LmN1cnJlbnR9O1xuXG4gICAgdGhpcy4kYW5jaG9yID0gJChgW2RhdGEtb3Blbj1cIiR7dGhpcy5pZH1cIl1gKS5sZW5ndGggPyAkKGBbZGF0YS1vcGVuPVwiJHt0aGlzLmlkfVwiXWApIDogJChgW2RhdGEtdG9nZ2xlPVwiJHt0aGlzLmlkfVwiXWApO1xuICAgIHRoaXMuJGFuY2hvci5hdHRyKHtcbiAgICAgICdhcmlhLWNvbnRyb2xzJzogdGhpcy5pZCxcbiAgICAgICdhcmlhLWhhc3BvcHVwJzogJ2RpYWxvZycsXG4gICAgICAndGFiaW5kZXgnOiAwXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4gfHwgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZnVsbCcpKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZnVsbFNjcmVlbiA9IHRydWU7XG4gICAgICB0aGlzLm9wdGlvbnMub3ZlcmxheSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkgJiYgIXRoaXMuJG92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkgPSB0aGlzLl9tYWtlT3ZlcmxheSh0aGlzLmlkKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgICAncm9sZSc6ICdkaWFsb2cnLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlLFxuICAgICAgICAnZGF0YS15ZXRpLWJveCc6IHRoaXMuaWQsXG4gICAgICAgICdkYXRhLXJlc2l6ZSc6IHRoaXMuaWRcbiAgICB9KTtcblxuICAgIGlmKHRoaXMuJG92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZGV0YWNoKCkuYXBwZW5kVG8odGhpcy4kb3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuZGV0YWNoKCkuYXBwZW5kVG8oJCh0aGlzLm9wdGlvbnMuYXBwZW5kVG8pKTtcbiAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ3dpdGhvdXQtb3ZlcmxheScpO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAoIGAjJHt0aGlzLmlkfWApKSB7XG4gICAgICB0aGlzLm9uTG9hZExpc3RlbmVyID0gb25Mb2FkKCQod2luZG93KSwgKCkgPT4gdGhpcy5vcGVuKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG92ZXJsYXkgZGl2IHRvIGRpc3BsYXkgYmVoaW5kIHRoZSBtb2RhbC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9tYWtlT3ZlcmxheSgpIHtcbiAgICB2YXIgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzID0gJyc7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxPdmVybGF5Q2xhc3Nlcykge1xuICAgICAgYWRkaXRpb25hbE92ZXJsYXlDbGFzc2VzID0gJyAnICsgdGhpcy5vcHRpb25zLmFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcztcbiAgICB9XG5cbiAgICByZXR1cm4gJCgnPGRpdj48L2Rpdj4nKVxuICAgICAgLmFkZENsYXNzKCdyZXZlYWwtb3ZlcmxheScgKyBhZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXMpXG4gICAgICAuYXBwZW5kVG8odGhpcy5vcHRpb25zLmFwcGVuZFRvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHBvc2l0aW9uIG9mIG1vZGFsXG4gICAqIFRPRE86ICBGaWd1cmUgb3V0IGlmIHdlIGFjdHVhbGx5IG5lZWQgdG8gY2FjaGUgdGhlc2UgdmFsdWVzIG9yIGlmIGl0IGRvZXNuJ3QgbWF0dGVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgdmFyIHdpZHRoID0gdGhpcy4kZWxlbWVudC5vdXRlcldpZHRoKCk7XG4gICAgdmFyIG91dGVyV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy4kZWxlbWVudC5vdXRlckhlaWdodCgpO1xuICAgIHZhciBvdXRlckhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB2YXIgbGVmdCwgdG9wID0gbnVsbDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhPZmZzZXQgPT09ICdhdXRvJykge1xuICAgICAgbGVmdCA9IHBhcnNlSW50KChvdXRlcldpZHRoIC0gd2lkdGgpIC8gMiwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZWZ0ID0gcGFyc2VJbnQodGhpcy5vcHRpb25zLmhPZmZzZXQsIDEwKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy52T2Zmc2V0ID09PSAnYXV0bycpIHtcbiAgICAgIGlmIChoZWlnaHQgPiBvdXRlckhlaWdodCkge1xuICAgICAgICB0b3AgPSBwYXJzZUludChNYXRoLm1pbigxMDAsIG91dGVySGVpZ2h0IC8gMTApLCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3AgPSBwYXJzZUludCgob3V0ZXJIZWlnaHQgLSBoZWlnaHQpIC8gNCwgMTApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnZPZmZzZXQgIT09IG51bGwpIHtcbiAgICAgIHRvcCA9IHBhcnNlSW50KHRoaXMub3B0aW9ucy52T2Zmc2V0LCAxMCk7XG4gICAgfVxuXG4gICAgaWYgKHRvcCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe3RvcDogdG9wICsgJ3B4J30pO1xuICAgIH1cblxuICAgIC8vIG9ubHkgd29ycnkgYWJvdXQgbGVmdCBpZiB3ZSBkb24ndCBoYXZlIGFuIG92ZXJsYXkgb3Igd2UgaGF2ZSBhIGhvcml6b250YWwgb2Zmc2V0LFxuICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBwZXJmZWN0bHkgaW4gdGhlIG1pZGRsZVxuICAgIGlmICghdGhpcy4kb3ZlcmxheSB8fCAodGhpcy5vcHRpb25zLmhPZmZzZXQgIT09ICdhdXRvJykpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtsZWZ0OiBsZWZ0ICsgJ3B4J30pO1xuICAgICAgdGhpcy4kZWxlbWVudC5jc3Moe21hcmdpbjogJzBweCd9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgbW9kYWwuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZXZlbnRzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKHtcbiAgICAgICdvcGVuLnpmLnRyaWdnZXInOiB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogKGV2ZW50LCAkZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoKGV2ZW50LnRhcmdldCA9PT0gX3RoaXMuJGVsZW1lbnRbMF0pIHx8XG4gICAgICAgICAgICAoJChldmVudC50YXJnZXQpLnBhcmVudHMoJ1tkYXRhLWNsb3NhYmxlXScpWzBdID09PSAkZWxlbWVudCkpIHsgLy8gb25seSBjbG9zZSByZXZlYWwgd2hlbiBpdCdzIGV4cGxpY2l0bHkgY2FsbGVkXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2UuYXBwbHkodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAndG9nZ2xlLnpmLnRyaWdnZXInOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpLFxuICAgICAgJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInOiBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlT25DbGljayAmJiB0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgdGhpcy4kb3ZlcmxheS5vZmYoJy56Zi5yZXZlYWwnKS5vbignY2xpY2suemYuZHJvcGRvd24gdGFwLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8XG4gICAgICAgICAgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZS50YXJnZXQpIHx8XG4gICAgICAgICAgICAhJC5jb250YWlucyhkb2N1bWVudCwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmspIHtcbiAgICAgICQod2luZG93KS5vbihgaGFzaGNoYW5nZS56Zi5yZXZlYWw6JHt0aGlzLmlkfWAsIHRoaXMuX2hhbmRsZVN0YXRlLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIG1vZGFsIG1ldGhvZHMgb24gYmFjay9mb3J3YXJkIGJ1dHRvbiBjbGlja3Mgb3IgYW55IG90aGVyIGV2ZW50IHRoYXQgdHJpZ2dlcnMgaGFzaGNoYW5nZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYW5kbGVTdGF0ZSgpIHtcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gKCAnIycgKyB0aGlzLmlkKSAmJiAhdGhpcy5pc0FjdGl2ZSl7IHRoaXMub3BlbigpOyB9XG4gICAgZWxzZXsgdGhpcy5jbG9zZSgpOyB9XG4gIH1cblxuICAvKipcbiAgKiBEaXNhYmxlcyB0aGUgc2Nyb2xsIHdoZW4gUmV2ZWFsIGlzIHNob3duIHRvIHByZXZlbnQgdGhlIGJhY2tncm91bmQgZnJvbSBzaGlmdGluZ1xuICAqIEBwYXJhbSB7bnVtYmVyfSBzY3JvbGxUb3AgLSBTY3JvbGwgdG8gdmlzdWFsbHkgYXBwbHksIHdpbmRvdyBjdXJyZW50IHNjcm9sbCBieSBkZWZhdWx0XG4gICovXG4gIF9kaXNhYmxlU2Nyb2xsKHNjcm9sbFRvcCkge1xuICAgIHNjcm9sbFRvcCA9IHNjcm9sbFRvcCB8fCAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgaWYgKCQoZG9jdW1lbnQpLmhlaWdodCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKSB7XG4gICAgICAkKFwiaHRtbFwiKVxuICAgICAgICAuY3NzKFwidG9wXCIsIC1zY3JvbGxUb3ApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJlZW5hYmxlcyB0aGUgc2Nyb2xsIHdoZW4gUmV2ZWFsIGNsb3Nlc1xuICAqIEBwYXJhbSB7bnVtYmVyfSBzY3JvbGxUb3AgLSBTY3JvbGwgdG8gcmVzdG9yZSwgaHRtbCBcInRvcFwiIHByb3BlcnR5IGJ5IGRlZmF1bHQgKGFzIHNldCBieSBgX2Rpc2FibGVTY3JvbGxgKVxuICAqL1xuICBfZW5hYmxlU2Nyb2xsKHNjcm9sbFRvcCkge1xuICAgIHNjcm9sbFRvcCA9IHNjcm9sbFRvcCB8fCBwYXJzZUludCgkKFwiaHRtbFwiKS5jc3MoXCJ0b3BcIiksIDEwKTtcbiAgICBpZiAoJChkb2N1bWVudCkuaGVpZ2h0KCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkpIHtcbiAgICAgICQoXCJodG1sXCIpXG4gICAgICAgIC5jc3MoXCJ0b3BcIiwgXCJcIik7XG4gICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKC1zY3JvbGxUb3ApO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBtb2RhbCBjb250cm9sbGVkIGJ5IGB0aGlzLiRhbmNob3JgLCBhbmQgY2xvc2VzIGFsbCBvdGhlcnMgYnkgZGVmYXVsdC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBmaXJlcyBSZXZlYWwjY2xvc2VtZVxuICAgKiBAZmlyZXMgUmV2ZWFsI29wZW5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgLy8gZWl0aGVyIHVwZGF0ZSBvciByZXBsYWNlIGJyb3dzZXIgaGlzdG9yeVxuICAgIGNvbnN0IGhhc2ggPSBgIyR7dGhpcy5pZH1gO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVlcExpbmsgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT09IGhhc2gpIHtcblxuICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwZGF0ZUhpc3RvcnkpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBoYXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBoYXNoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbWVtYmVyIGFuY2hvciB0aGF0IG9wZW5lZCBpdCB0byBzZXQgZm9jdXMgYmFjayBsYXRlciwgaGF2ZSBnZW5lcmFsIGFuY2hvcnMgYXMgZmFsbGJhY2tcbiAgICB0aGlzLiRhY3RpdmVBbmNob3IgPSAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKHRoaXMuJGFuY2hvcikgPyAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIDogdGhpcy4kYW5jaG9yO1xuXG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBNYWtlIGVsZW1lbnRzIGludmlzaWJsZSwgYnV0IHJlbW92ZSBkaXNwbGF5OiBub25lIHNvIHdlIGNhbiBnZXQgc2l6ZSBhbmQgcG9zaXRpb25pbmdcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5jc3MoeyAndmlzaWJpbGl0eSc6ICdoaWRkZW4nIH0pXG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHsndmlzaWJpbGl0eSc6ICdoaWRkZW4nfSkuc2hvdygpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuaGlkZSgpXG4gICAgICAuY3NzKHsgJ3Zpc2liaWxpdHknOiAnJyB9KTtcblxuICAgIGlmKHRoaXMuJG92ZXJsYXkpIHtcbiAgICAgIHRoaXMuJG92ZXJsYXkuY3NzKHsndmlzaWJpbGl0eSc6ICcnfSkuaGlkZSgpO1xuICAgICAgaWYodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFzdCcpKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ2Zhc3QnKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4kZWxlbWVudC5oYXNDbGFzcygnc2xvdycpKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuYWRkQ2xhc3MoJ3Nsb3cnKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmICghdGhpcy5vcHRpb25zLm11bHRpcGxlT3BlbmVkKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgbW9kYWwgb3BlbnMuXG4gICAgICAgKiBDbG9zZXMgYW55IG90aGVyIG1vZGFscyB0aGF0IGFyZSBjdXJyZW50bHkgb3BlblxuICAgICAgICogQGV2ZW50IFJldmVhbCNjbG9zZW1lXG4gICAgICAgKi9cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VtZS56Zi5yZXZlYWwnLCB0aGlzLmlkKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlU2Nyb2xsKCk7XG4gICAgfVxuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIE1vdGlvbiBVSSBtZXRob2Qgb2YgcmV2ZWFsXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb25Jbikge1xuICAgICAgZnVuY3Rpb24gYWZ0ZXJBbmltYXRpb24oKXtcbiAgICAgICAgX3RoaXMuJGVsZW1lbnRcbiAgICAgICAgICAuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiBmYWxzZSxcbiAgICAgICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZm9jdXMoKTtcbiAgICAgICAgX3RoaXMuX2FkZEdsb2JhbENsYXNzZXMoKTtcbiAgICAgICAgS2V5Ym9hcmQudHJhcEZvY3VzKF90aGlzLiRlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICBNb3Rpb24uYW5pbWF0ZUluKHRoaXMuJG92ZXJsYXksICdmYWRlLWluJyk7XG4gICAgICB9XG4gICAgICBNb3Rpb24uYW5pbWF0ZUluKHRoaXMuJGVsZW1lbnQsIHRoaXMub3B0aW9ucy5hbmltYXRpb25JbiwgKCkgPT4ge1xuICAgICAgICBpZih0aGlzLiRlbGVtZW50KSB7IC8vIHByb3RlY3QgYWdhaW5zdCBvYmplY3QgaGF2aW5nIGJlZW4gcmVtb3ZlZFxuICAgICAgICAgIHRoaXMuZm9jdXNhYmxlRWxlbWVudHMgPSBLZXlib2FyZC5maW5kRm9jdXNhYmxlKHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICAgIGFmdGVyQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBqUXVlcnkgbWV0aG9kIG9mIHJldmVhbFxuICAgIGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsZW1lbnQuc2hvdyh0aGlzLm9wdGlvbnMuc2hvd0RlbGF5KTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYWNjZXNzaWJpbGl0eVxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogZmFsc2UsXG4gICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICB9KVxuICAgICAgLmZvY3VzKCk7XG4gICAgS2V5Ym9hcmQudHJhcEZvY3VzKHRoaXMuJGVsZW1lbnQpO1xuXG4gICAgdGhpcy5fYWRkR2xvYmFsQ2xhc3NlcygpO1xuXG4gICAgdGhpcy5fYWRkR2xvYmFsTGlzdGVuZXJzKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBtb2RhbCBoYXMgc3VjY2Vzc2Z1bGx5IG9wZW5lZC5cbiAgICAgKiBAZXZlbnQgUmV2ZWFsI29wZW5cbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29wZW4uemYucmV2ZWFsJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjbGFzc2VzIGFuZCBsaXN0ZW5lcnMgb24gZG9jdW1lbnQgcmVxdWlyZWQgYnkgb3BlbiBtb2RhbHMuXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgY2xhc3NlcyBhcmUgYWRkZWQgYW5kIHVwZGF0ZWQ6XG4gICAqIC0gYC5pcy1yZXZlYWwtb3BlbmAgLSBQcmV2ZW50cyB0aGUgc2Nyb2xsIG9uIGRvY3VtZW50XG4gICAqIC0gYC56Zi1oYXMtc2Nyb2xsYCAgLSBEaXNwbGF5cyBhIGRpc2FibGVkIHNjcm9sbGJhciBvbiBkb2N1bWVudCBpZiByZXF1aXJlZCBsaWtlIGlmIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIHdhcyBub3QgZGlzYWJsZWQuIFRoaXMgcHJldmVudCBhIFwic2hpZnRcIiBvZiB0aGUgcGFnZSBjb250ZW50IGR1ZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIHNjcm9sbGJhciBkaXNhcHBlYXJpbmcgd2hlbiB0aGUgbW9kYWwgb3BlbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkR2xvYmFsQ2xhc3NlcygpIHtcbiAgICBjb25zdCB1cGRhdGVTY3JvbGxiYXJDbGFzcyA9ICgpID0+IHtcbiAgICAgICQoJ2h0bWwnKS50b2dnbGVDbGFzcygnemYtaGFzLXNjcm9sbCcsICEhKCQoZG9jdW1lbnQpLmhlaWdodCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKSk7XG4gICAgfTtcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXIucmV2ZWFsU2Nyb2xsYmFyTGlzdGVuZXInLCAoKSA9PiB1cGRhdGVTY3JvbGxiYXJDbGFzcygpKTtcbiAgICB1cGRhdGVTY3JvbGxiYXJDbGFzcygpO1xuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNsYXNzZXMgYW5kIGxpc3RlbmVycyBvbiBkb2N1bWVudCB0aGF0IHdlcmUgcmVxdWlyZWQgYnkgb3BlbiBtb2RhbHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlR2xvYmFsQ2xhc3NlcygpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZigncmVzaXplbWUuemYudHJpZ2dlci5yZXZlYWxTY3JvbGxiYXJMaXN0ZW5lcicpO1xuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtcmV2ZWFsLW9wZW4nKTtcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3pmLWhhcy1zY3JvbGwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV4dHJhIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgYm9keSBhbmQgd2luZG93IGlmIG5lY2Vzc2FyeS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRHbG9iYWxMaXN0ZW5lcnMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZighdGhpcy4kZWxlbWVudCkgeyByZXR1cm47IH0gLy8gSWYgd2UncmUgaW4gdGhlIG1pZGRsZSBvZiBjbGVhbnVwLCBkb24ndCBmcmVhayBvdXRcbiAgICB0aGlzLmZvY3VzYWJsZUVsZW1lbnRzID0gS2V5Ym9hcmQuZmluZEZvY3VzYWJsZSh0aGlzLiRlbGVtZW50KTtcblxuICAgIGlmICghdGhpcy5vcHRpb25zLm92ZXJsYXkgJiYgdGhpcy5vcHRpb25zLmNsb3NlT25DbGljayAmJiAhdGhpcy5vcHRpb25zLmZ1bGxTY3JlZW4pIHtcbiAgICAgICQoJ2JvZHknKS5vbignY2xpY2suemYuZHJvcGRvd24gdGFwLnpmLmRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IF90aGlzLiRlbGVtZW50WzBdIHx8XG4gICAgICAgICAgJC5jb250YWlucyhfdGhpcy4kZWxlbWVudFswXSwgZS50YXJnZXQpIHx8XG4gICAgICAgICAgICAhJC5jb250YWlucyhkb2N1bWVudCwgZS50YXJnZXQpKSB7IHJldHVybjsgfVxuICAgICAgICBfdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZU9uRXNjKSB7XG4gICAgICAkKHdpbmRvdykub24oJ2tleWRvd24uemYucmV2ZWFsJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBLZXlib2FyZC5oYW5kbGVLZXkoZSwgJ1JldmVhbCcsIHtcbiAgICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5jbG9zZU9uRXNjKSB7XG4gICAgICAgICAgICAgIF90aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQGZpcmVzIFJldmVhbCNjbG9zZWRcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc0FjdGl2ZSB8fCAhdGhpcy4kZWxlbWVudC5pcygnOnZpc2libGUnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gTW90aW9uIFVJIG1ldGhvZCBvZiBoaWRpbmdcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbk91dCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICAgIE1vdGlvbi5hbmltYXRlT3V0KHRoaXMuJG92ZXJsYXksICdmYWRlLW91dCcpO1xuICAgICAgfVxuXG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiRlbGVtZW50LCB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uT3V0LCBmaW5pc2hVcCk7XG4gICAgfVxuICAgIC8vIGpRdWVyeSBtZXRob2Qgb2YgaGlkaW5nXG4gICAgZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmhpZGUodGhpcy5vcHRpb25zLmhpZGVEZWxheSk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoMCwgZmluaXNoVXApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZpbmlzaFVwKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29uZGl0aW9uYWxzIHRvIHJlbW92ZSBleHRyYSBldmVudCBsaXN0ZW5lcnMgYWRkZWQgb24gb3BlblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VPbkVzYykge1xuICAgICAgJCh3aW5kb3cpLm9mZigna2V5ZG93bi56Zi5yZXZlYWwnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5vdmVybGF5ICYmIHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2spIHtcbiAgICAgICQoJ2JvZHknKS5vZmYoJ2NsaWNrLnpmLmRyb3Bkb3duIHRhcC56Zi5kcm9wZG93bicpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLnpmLnJldmVhbCcpO1xuXG4gICAgZnVuY3Rpb24gZmluaXNoVXAoKSB7XG5cbiAgICAgIC8vIEdldCB0aGUgY3VycmVudCB0b3AgYmVmb3JlIHRoZSBtb2RhbCBpcyBjbG9zZWQgYW5kIHJlc3RvcmUgdGhlIHNjcm9sbCBhZnRlci5cbiAgICAgIC8vIFRPRE86IHVzZSBjb21wb25lbnQgcHJvcGVydGllcyBpbnN0ZWFkIG9mIEhUTUwgcHJvcGVydGllc1xuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3VuZGF0aW9uL2ZvdW5kYXRpb24tc2l0ZXMvcHVsbC8xMDc4NlxuICAgICAgdmFyIHNjcm9sbFRvcCA9IHBhcnNlSW50KCQoXCJodG1sXCIpLmNzcyhcInRvcFwiKSwgMTApO1xuXG4gICAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoICA9PT0gMCkge1xuICAgICAgICBfdGhpcy5fcmVtb3ZlR2xvYmFsQ2xhc3NlcygpOyAvLyBhbHNvIHJlbW92ZSAuaXMtcmV2ZWFsLW9wZW4gZnJvbSB0aGUgaHRtbCBlbGVtZW50IHdoZW4gdGhlcmUgaXMgbm8gb3BlbmVkIHJldmVhbFxuICAgICAgfVxuXG4gICAgICBLZXlib2FyZC5yZWxlYXNlRm9jdXMoX3RoaXMuJGVsZW1lbnQpO1xuXG4gICAgICBfdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoICA9PT0gMCkge1xuICAgICAgICBfdGhpcy5fZW5hYmxlU2Nyb2xsKHNjcm9sbFRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgKiBGaXJlcyB3aGVuIHRoZSBtb2RhbCBpcyBkb25lIGNsb3NpbmcuXG4gICAgICAqIEBldmVudCBSZXZlYWwjY2xvc2VkXG4gICAgICAqL1xuICAgICAgX3RoaXMuJGVsZW1lbnQudHJpZ2dlcignY2xvc2VkLnpmLnJldmVhbCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVzZXRzIHRoZSBtb2RhbCBjb250ZW50XG4gICAgKiBUaGlzIHByZXZlbnRzIGEgcnVubmluZyB2aWRlbyB0byBrZWVwIGdvaW5nIGluIHRoZSBiYWNrZ3JvdW5kXG4gICAgKi9cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlc2V0T25DbG9zZSkge1xuICAgICAgdGhpcy4kZWxlbWVudC5odG1sKHRoaXMuJGVsZW1lbnQuaHRtbCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgLy8gSWYgZGVlcExpbmsgYW5kIHdlIGRpZCBub3Qgc3dpdGNoZWQgdG8gYW4gb3RoZXIgbW9kYWwuLi5cbiAgICBpZiAoX3RoaXMub3B0aW9ucy5kZWVwTGluayAmJiB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gYCMke3RoaXMuaWR9YCkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBoaXN0b3J5IGhhc2hcbiAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgY29uc3QgdXJsV2l0aG91dEhhc2ggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVwZGF0ZUhpc3RvcnkpIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCB1cmxXaXRob3V0SGFzaCk7IC8vIHJlbW92ZSB0aGUgaGFzaFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgZG9jdW1lbnQudGl0bGUsIHVybFdpdGhvdXRIYXNoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiRhY3RpdmVBbmNob3IuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBvcGVuL2Nsb3NlZCBzdGF0ZSBvZiBhIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGluc3RhbmNlIG9mIGEgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZFRvKCQodGhpcy5vcHRpb25zLmFwcGVuZFRvKSk7IC8vIG1vdmUgJGVsZW1lbnQgb3V0c2lkZSBvZiAkb3ZlcmxheSB0byBwcmV2ZW50IGVycm9yIHVucmVnaXN0ZXJQbHVnaW4oKVxuICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCkub2ZmKCkucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpLm9mZigpO1xuICAgIHRoaXMuJGFuY2hvci5vZmYoJy56ZicpO1xuICAgICQod2luZG93KS5vZmYoYC56Zi5yZXZlYWw6JHt0aGlzLmlkfWApXG4gICAgaWYgKHRoaXMub25Mb2FkTGlzdGVuZXIpICQod2luZG93KS5vZmYodGhpcy5vbkxvYWRMaXN0ZW5lcik7XG5cbiAgICBpZiAoJCgnLnJldmVhbDp2aXNpYmxlJykubGVuZ3RoICA9PT0gMCkge1xuICAgICAgdGhpcy5fcmVtb3ZlR2xvYmFsQ2xhc3NlcygpOyAvLyBhbHNvIHJlbW92ZSAuaXMtcmV2ZWFsLW9wZW4gZnJvbSB0aGUgaHRtbCBlbGVtZW50IHdoZW4gdGhlcmUgaXMgbm8gb3BlbmVkIHJldmVhbFxuICAgIH1cbiAgfTtcbn1cblxuUmV2ZWFsLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYW5pbWF0aW9uSW46ICcnLFxuICAvKipcbiAgICogTW90aW9uLVVJIGNsYXNzIHRvIHVzZSBmb3IgYW5pbWF0ZWQgZWxlbWVudHMuIElmIG5vbmUgdXNlZCwgZGVmYXVsdHMgdG8gc2ltcGxlIHNob3cvaGlkZS5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnJ1xuICAgKi9cbiAgYW5pbWF0aW9uT3V0OiAnJyxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCB0byBkZWxheSB0aGUgb3BlbmluZyBvZiBhIG1vZGFsIGFmdGVyIGEgY2xpY2sgaWYgbm8gYW5pbWF0aW9uIHVzZWQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMFxuICAgKi9cbiAgc2hvd0RlbGF5OiAwLFxuICAvKipcbiAgICogVGltZSwgaW4gbXMsIHRvIGRlbGF5IHRoZSBjbG9zaW5nIG9mIGEgbW9kYWwgYWZ0ZXIgYSBjbGljayBpZiBubyBhbmltYXRpb24gdXNlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoaWRlRGVsYXk6IDAsXG4gIC8qKlxuICAgKiBBbGxvd3MgYSBjbGljayBvbiB0aGUgYm9keS9vdmVybGF5IHRvIGNsb3NlIHRoZSBtb2RhbC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuICAvKipcbiAgICogQWxsb3dzIHRoZSBtb2RhbCB0byBjbG9zZSBpZiB0aGUgdXNlciBwcmVzc2VzIHRoZSBgRVNDQVBFYCBrZXkuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGNsb3NlT25Fc2M6IHRydWUsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBhbGxvd3MgbXVsdGlwbGUgbW9kYWxzIHRvIGJlIGRpc3BsYXllZCBhdCBvbmNlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgbXVsdGlwbGVPcGVuZWQ6IGZhbHNlLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIG1vZGFsIHNob3VsZCBwdXNoIGRvd24gZnJvbSB0aGUgdG9wIG9mIHRoZSBzY3JlZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcnxzdHJpbmd9XG4gICAqIEBkZWZhdWx0IGF1dG9cbiAgICovXG4gIHZPZmZzZXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSBtb2RhbCBzaG91bGQgcHVzaCBpbiBmcm9tIHRoZSBzaWRlIG9mIHRoZSBzY3JlZW4uXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcnxzdHJpbmd9XG4gICAqIEBkZWZhdWx0IGF1dG9cbiAgICovXG4gIGhPZmZzZXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgbW9kYWwgdG8gYmUgZnVsbHNjcmVlbiwgY29tcGxldGVseSBibG9ja2luZyBvdXQgdGhlIHJlc3Qgb2YgdGhlIHZpZXcuIEpTIGNoZWNrcyBmb3IgdGhpcyBhcyB3ZWxsLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZnVsbFNjcmVlbjogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGdlbmVyYXRlIGFuIG92ZXJsYXkgZGl2LCB3aGljaCB3aWxsIGNvdmVyIHRoZSB2aWV3IHdoZW4gbW9kYWwgb3BlbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIG92ZXJsYXk6IHRydWUsXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIHJlbW92ZSBhbmQgcmVpbmplY3QgbWFya3VwIG9uIGNsb3NlLiBTaG91bGQgYmUgdHJ1ZSBpZiB1c2luZyB2aWRlbyBlbGVtZW50cyB3L28gdXNpbmcgcHJvdmlkZXIncyBhcGksIG90aGVyd2lzZSwgdmlkZW9zIHdpbGwgY29udGludWUgdG8gcGxheSBpbiB0aGUgYmFja2dyb3VuZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHJlc2V0T25DbG9zZTogZmFsc2UsXG4gIC8qKlxuICAgKiBMaW5rIHRoZSBsb2NhdGlvbiBoYXNoIHRvIHRoZSBtb2RhbC5cbiAgICogU2V0IHRoZSBsb2NhdGlvbiBoYXNoIHdoZW4gdGhlIG1vZGFsIGlzIG9wZW5lZC9jbG9zZWQsIGFuZCBvcGVuL2Nsb3NlIHRoZSBtb2RhbCB3aGVuIHRoZSBsb2NhdGlvbiBjaGFuZ2VzLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVlcExpbms6IGZhbHNlLFxuICAvKipcbiAgICogSWYgYGRlZXBMaW5rYCBpcyBlbmFibGVkLCB1cGRhdGUgdGhlIGJyb3dzZXIgaGlzdG9yeSB3aXRoIHRoZSBvcGVuIG1vZGFsXG4gICAqIEBvcHRpb25cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHVwZGF0ZUhpc3Rvcnk6IGZhbHNlLFxuICAgIC8qKlxuICAgKiBBbGxvd3MgdGhlIG1vZGFsIHRvIGFwcGVuZCB0byBjdXN0b20gZGl2LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0IFwiYm9keVwiXG4gICAqL1xuICBhcHBlbmRUbzogXCJib2R5XCIsXG4gIC8qKlxuICAgKiBBbGxvd3MgYWRkaW5nIGFkZGl0aW9uYWwgY2xhc3MgbmFtZXMgdG8gdGhlIHJldmVhbCBvdmVybGF5LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICBhZGRpdGlvbmFsT3ZlcmxheUNsYXNzZXM6ICcnXG59O1xuXG5leHBvcnQge1JldmVhbH07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgR2V0WW9EaWdpdHMgfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS51dGlscyc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuXG4vKipcbiAqIFNtb290aFNjcm9sbCBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24uc21vb3RoU2Nyb2xsXG4gKi9cbmNsYXNzIFNtb290aFNjcm9sbCBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFNtb290aFNjcm9sbC5cbiAgICogQGNsYXNzXG4gICAqIEBuYW1lIFNtb290aFNjcm9sbFxuICAgKiBAZmlyZXMgU21vb3RoU2Nyb2xsI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIFNtb290aFNjcm9sbC5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9ICdTbW9vdGhTY3JvbGwnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgU21vb3RoU2Nyb2xsIHBsdWdpblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXQoKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy4kZWxlbWVudFswXS5pZCB8fCBHZXRZb0RpZ2l0cyg2LCAnc21vb3RoLXNjcm9sbCcpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmF0dHIoeyBpZCB9KTtcblxuICAgICAgICB0aGlzLl9ldmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBldmVudHMgZm9yIFNtb290aFNjcm9sbC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9ldmVudHMoKSB7XG4gICAgICAgIHRoaXMuX2xpbmtDbGlja0xpc3RlbmVyID0gdGhpcy5faGFuZGxlTGlua0NsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLnpmLnNtb290aFNjcm9sbCcsIHRoaXMuX2xpbmtDbGlja0xpc3RlbmVyKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suemYuc21vb3RoU2Nyb2xsJywgJ2FbaHJlZl49XCIjXCJdJywgdGhpcy5fbGlua0NsaWNrTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgZ2l2ZW4gZXZlbnQgdG8gc21vb3RobHkgc2Nyb2xsIHRvIHRoZSBhbmNob3IgcG9pbnRlZCBieSB0aGUgZXZlbnQgdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7Kn0gZSAtIGV2ZW50XG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaGFuZGxlTGlua0NsaWNrKGUpIHtcbiAgICAgICAgLy8gRm9sbG93IHRoZSBsaW5rIGlmIGl0IGRvZXMgbm90IHBvaW50IHRvIGFuIGFuY2hvci5cbiAgICAgICAgaWYgKCEkKGUuY3VycmVudFRhcmdldCkuaXMoJ2FbaHJlZl49XCIjXCJdJykpIHJldHVybjtcblxuICAgICAgICBjb25zdCBhcnJpdmFsID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXG4gICAgICAgIHRoaXMuX2luVHJhbnNpdGlvbiA9IHRydWU7XG5cbiAgICAgICAgU21vb3RoU2Nyb2xsLnNjcm9sbFRvTG9jKGFycml2YWwsIHRoaXMub3B0aW9ucywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faW5UcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2Nyb2xsIHRvIGEgZ2l2ZW4gbG9jYXRpb24gb24gdGhlIHBhZ2UuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxvYyAtIEEgcHJvcGVybHkgZm9ybWF0dGVkIGpRdWVyeSBpZCBzZWxlY3Rvci4gRXhhbXBsZTogJyNmb28nXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byB1c2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBzY3JvbGxUb0xvYyhsb2MsIG9wdGlvbnMgPSBTbW9vdGhTY3JvbGwuZGVmYXVsdHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0ICRsb2MgPSAkKGxvYyk7XG5cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiB0YXJnZXQgZG9lcyBub3QgZXhpc3QgdG8gcHJldmVudCBlcnJvcnNcbiAgICAgICAgaWYgKCEkbG9jLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSBNYXRoLnJvdW5kKCRsb2Mub2Zmc2V0KCkudG9wIC0gb3B0aW9ucy50aHJlc2hvbGQgLyAyIC0gb3B0aW9ucy5vZmZzZXQpO1xuXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKHRydWUpLmFuaW1hdGUoXG4gICAgICAgICAgICB7IHNjcm9sbFRvcDogc2Nyb2xsUG9zIH0sXG4gICAgICAgICAgICBvcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICAgICAgb3B0aW9ucy5hbmltYXRpb25FYXNpbmcsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3lzIHRoZSBTbW9vdGhTY3JvbGwgaW5zdGFuY2UuXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgX2Rlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdjbGljay56Zi5zbW9vdGhTY3JvbGwnLCB0aGlzLl9saW5rQ2xpY2tMaXN0ZW5lcilcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ2NsaWNrLnpmLnNtb290aFNjcm9sbCcsICdhW2hyZWZePVwiI1wiXScsIHRoaXMuX2xpbmtDbGlja0xpc3RlbmVyKTtcbiAgICB9XG59XG5cbi8qKlxuICogRGVmYXVsdCBzZXR0aW5ncyBmb3IgcGx1Z2luLlxuICovXG5TbW9vdGhTY3JvbGwuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSwgaW4gbXMsIHRoZSBhbmltYXRlZCBzY3JvbGxpbmcgc2hvdWxkIHRha2UgYmV0d2VlbiBsb2NhdGlvbnMuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgNTAwXG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNTAwLFxuICAvKipcbiAgICogQW5pbWF0aW9uIHN0eWxlIHRvIHVzZSB3aGVuIHNjcm9sbGluZyBiZXR3ZWVuIGxvY2F0aW9ucy4gQ2FuIGJlIGAnc3dpbmcnYCBvciBgJ2xpbmVhcidgLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdsaW5lYXInXG4gICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vYXBpLmpxdWVyeS5jb20vYW5pbWF0ZXxKcXVlcnkgYW5pbWF0ZX1cbiAgICovXG4gIGFuaW1hdGlvbkVhc2luZzogJ2xpbmVhcicsXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgcGl4ZWxzIHRvIHVzZSBhcyBhIG1hcmtlciBmb3IgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCA1MFxuICAgKi9cbiAgdGhyZXNob2xkOiA1MCxcbiAgLyoqXG4gICAqIE51bWJlciBvZiBwaXhlbHMgdG8gb2Zmc2V0IHRoZSBzY3JvbGwgb2YgdGhlIHBhZ2Ugb24gaXRlbSBjbGljayBpZiB1c2luZyBhIHN0aWNreSBuYXYgYmFyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIG9mZnNldDogMFxufVxuXG5leHBvcnQge1Ntb290aFNjcm9sbH1cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBQbHVnaW4gfSBmcm9tICcuL2ZvdW5kYXRpb24uY29yZS5wbHVnaW4nO1xuaW1wb3J0IHsgb25Mb2FkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgS2V5Ym9hcmQgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5rZXlib2FyZCc7XG5pbXBvcnQgeyBvbkltYWdlc0xvYWRlZCB9IGZyb20gJy4vZm91bmRhdGlvbi51dGlsLmltYWdlTG9hZGVyJztcbi8qKlxuICogVGFicyBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24udGFic1xuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5rZXlib2FyZFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5pbWFnZUxvYWRlciBpZiB0YWJzIGNvbnRhaW4gaW1hZ2VzXG4gKi9cblxuY2xhc3MgVGFicyBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRhYnMuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBUYWJzXG4gICAqIEBmaXJlcyBUYWJzI2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIG1ha2UgaW50byB0YWJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCBwbHVnaW4gc2V0dGluZ3MuXG4gICAqL1xuICBfc2V0dXAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBUYWJzLmRlZmF1bHRzLCB0aGlzLiRlbGVtZW50LmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnVGFicyc7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgdGhpcy5faW5pdCgpO1xuICAgIEtleWJvYXJkLnJlZ2lzdGVyKCdUYWJzJywge1xuICAgICAgJ0VOVEVSJzogJ29wZW4nLFxuICAgICAgJ1NQQUNFJzogJ29wZW4nLFxuICAgICAgJ0FSUk9XX1JJR0hUJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX1VQJzogJ3ByZXZpb3VzJyxcbiAgICAgICdBUlJPV19ET1dOJzogJ25leHQnLFxuICAgICAgJ0FSUk9XX0xFRlQnOiAncHJldmlvdXMnXG4gICAgICAvLyAnVEFCJzogJ25leHQnLFxuICAgICAgLy8gJ1NISUZUX1RBQic6ICdwcmV2aW91cydcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgdGFicyBieSBzaG93aW5nIGFuZCBmb2N1c2luZyAoaWYgYXV0b0ZvY3VzPXRydWUpIHRoZSBwcmVzZXQgYWN0aXZlIHRhYi5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5faXNJbml0aWFsaXppbmcgPSB0cnVlO1xuXG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKHsncm9sZSc6ICd0YWJsaXN0J30pO1xuICAgIHRoaXMuJHRhYlRpdGxlcyA9IHRoaXMuJGVsZW1lbnQuZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gKTtcbiAgICB0aGlzLiR0YWJDb250ZW50ID0gJChgW2RhdGEtdGFicy1jb250ZW50PVwiJHt0aGlzLiRlbGVtZW50WzBdLmlkfVwiXWApO1xuXG4gICAgdGhpcy4kdGFiVGl0bGVzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciAkZWxlbSA9ICQodGhpcyksXG4gICAgICAgICAgJGxpbmsgPSAkZWxlbS5maW5kKCdhJyksXG4gICAgICAgICAgaXNBY3RpdmUgPSAkZWxlbS5oYXNDbGFzcyhgJHtfdGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKSxcbiAgICAgICAgICBoYXNoID0gJGxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpIHx8ICRsaW5rWzBdLmhhc2guc2xpY2UoMSksXG4gICAgICAgICAgbGlua0lkID0gJGxpbmtbMF0uaWQgPyAkbGlua1swXS5pZCA6IGAke2hhc2h9LWxhYmVsYCxcbiAgICAgICAgICAkdGFiQ29udGVudCA9ICQoYCMke2hhc2h9YCk7XG5cbiAgICAgICRlbGVtLmF0dHIoeydyb2xlJzogJ3ByZXNlbnRhdGlvbid9KTtcblxuICAgICAgJGxpbmsuYXR0cih7XG4gICAgICAgICdyb2xlJzogJ3RhYicsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogaGFzaCxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc0FjdGl2ZSxcbiAgICAgICAgJ2lkJzogbGlua0lkLFxuICAgICAgICAndGFiaW5kZXgnOiBpc0FjdGl2ZSA/ICcwJyA6ICctMSdcbiAgICAgIH0pO1xuXG4gICAgICAkdGFiQ29udGVudC5hdHRyKHtcbiAgICAgICAgJ3JvbGUnOiAndGFicGFuZWwnLFxuICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5JzogbGlua0lkXG4gICAgICB9KTtcblxuICAgICAgLy8gU2F2ZSB1cCB0aGUgaW5pdGlhbCBoYXNoIHRvIHJldHVybiB0byBpdCBsYXRlciB3aGVuIGdvaW5nIGJhY2sgaW4gaGlzdG9yeVxuICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgIF90aGlzLl9pbml0aWFsQW5jaG9yID0gYCMke2hhc2h9YDtcbiAgICAgIH1cblxuICAgICAgaWYoIWlzQWN0aXZlKSB7XG4gICAgICAgICR0YWJDb250ZW50LmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgIH1cblxuICAgICAgaWYoaXNBY3RpdmUgJiYgX3RoaXMub3B0aW9ucy5hdXRvRm9jdXMpe1xuICAgICAgICBfdGhpcy5vbkxvYWRMaXN0ZW5lciA9IG9uTG9hZCgkKHdpbmRvdyksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkZWxlbS5vZmZzZXQoKS50b3AgfSwgX3RoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZURlbGF5LCAoKSA9PiB7XG4gICAgICAgICAgICAkbGluay5mb2N1cygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKHRoaXMub3B0aW9ucy5tYXRjaEhlaWdodCkge1xuICAgICAgdmFyICRpbWFnZXMgPSB0aGlzLiR0YWJDb250ZW50LmZpbmQoJ2ltZycpO1xuXG4gICAgICBpZiAoJGltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgb25JbWFnZXNMb2FkZWQoJGltYWdlcywgdGhpcy5fc2V0SGVpZ2h0LmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0SGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgIC8vIEN1cnJlbnQgY29udGV4dC1ib3VuZCBmdW5jdGlvbiB0byBvcGVuIHRhYnMgb24gcGFnZSBsb2FkIG9yIGhpc3RvcnkgaGFzaGNoYW5nZVxuICAgIHRoaXMuX2NoZWNrRGVlcExpbmsgPSAoKSA9PiB7XG4gICAgICB2YXIgYW5jaG9yID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgICAgIGlmICghYW5jaG9yLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgc3RpbGwgaW5pdGlhbGl6aW5nIGFuZCB0aGVyZSBpcyBubyBhbmNob3IsIHRoZW4gdGhlcmUgaXMgbm90aGluZyB0byBkb1xuICAgICAgICBpZiAodGhpcy5faXNJbml0aWFsaXppbmcpIHJldHVybjtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBtb3ZlIHRvIHRoZSBpbml0aWFsIGFuY2hvclxuICAgICAgICBpZiAodGhpcy5faW5pdGlhbEFuY2hvcikgYW5jaG9yID0gdGhpcy5faW5pdGlhbEFuY2hvcjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFuY2hvck5vSGFzaCA9IGFuY2hvci5pbmRleE9mKCcjJykgPj0gMCA/IGFuY2hvci5zbGljZSgxKSA6IGFuY2hvcjtcbiAgICAgIHZhciAkYW5jaG9yID0gYW5jaG9yTm9IYXNoICYmICQoYCMke2FuY2hvck5vSGFzaH1gKTtcbiAgICAgIHZhciAkbGluayA9IGFuY2hvciAmJiB0aGlzLiRlbGVtZW50LmZpbmQoYFtocmVmJD1cIiR7YW5jaG9yfVwiXSxbZGF0YS10YWJzLXRhcmdldD1cIiR7YW5jaG9yTm9IYXNofVwiXWApLmZpcnN0KCk7XG4gICAgICAvLyBXaGV0aGVyIHRoZSBhbmNob3IgZWxlbWVudCB0aGF0IGhhcyBiZWVuIGZvdW5kIGlzIHBhcnQgb2YgdGhpcyBlbGVtZW50XG4gICAgICB2YXIgaXNPd25BbmNob3IgPSAhISgkYW5jaG9yLmxlbmd0aCAmJiAkbGluay5sZW5ndGgpO1xuXG4gICAgICBpZiAoaXNPd25BbmNob3IpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gYW5jaG9yIGZvciB0aGUgaGFzaCwgc2VsZWN0IGl0XG4gICAgICAgIGlmICgkYW5jaG9yICYmICRhbmNob3IubGVuZ3RoICYmICRsaW5rICYmICRsaW5rLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKCRhbmNob3IsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgY29sbGFwc2UgZXZlcnl0aGluZ1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUm9sbCB1cCBhIGxpdHRsZSB0byBzaG93IHRoZSB0aXRsZXNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWVwTGlua1NtdWRnZSkge1xuICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpO1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBvZmZzZXQudG9wIC0gdGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlT2Zmc2V0fSwgdGhpcy5vcHRpb25zLmRlZXBMaW5rU211ZGdlRGVsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcmVzIHdoZW4gdGhlIHBsdWdpbiBoYXMgZGVlcGxpbmtlZCBhdCBwYWdlbG9hZFxuICAgICAgICAgKiBAZXZlbnQgVGFicyNkZWVwbGlua1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdkZWVwbGluay56Zi50YWJzJywgWyRsaW5rLCAkYW5jaG9yXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy91c2UgYnJvd3NlciB0byBvcGVuIGEgdGFiLCBpZiBpdCBleGlzdHMgaW4gdGhpcyB0YWJzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICB0aGlzLl9jaGVja0RlZXBMaW5rKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzKCk7XG5cbiAgICB0aGlzLl9pc0luaXRpYWxpemluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy5fYWRkS2V5SGFuZGxlcigpO1xuICAgIHRoaXMuX2FkZENsaWNrSGFuZGxlcigpO1xuICAgIHRoaXMuX3NldEhlaWdodE1xSGFuZGxlciA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1hdGNoSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgPSB0aGlzLl9zZXRIZWlnaHQuYmluZCh0aGlzKTtcblxuICAgICAgJCh3aW5kb3cpLm9uKCdjaGFuZ2VkLnpmLm1lZGlhcXVlcnknLCB0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmKHRoaXMub3B0aW9ucy5kZWVwTGluaykge1xuICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgdGhpcy5fY2hlY2tEZWVwTGluayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgY2xpY2sgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRDbGlja0hhbmRsZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vZmYoJ2NsaWNrLnpmLnRhYnMnKVxuICAgICAgLm9uKCdjbGljay56Zi50YWJzJywgYC4ke3RoaXMub3B0aW9ucy5saW5rQ2xhc3N9YCwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkKHRoaXMpKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMga2V5Ym9hcmQgZXZlbnQgaGFuZGxlcnMgZm9yIGl0ZW1zIHdpdGhpbiB0aGUgdGFicy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRLZXlIYW5kbGVyKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0YWJUaXRsZXMub2ZmKCdrZXlkb3duLnpmLnRhYnMnKS5vbigna2V5ZG93bi56Zi50YWJzJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZiAoZS53aGljaCA9PT0gOSkgcmV0dXJuO1xuXG5cbiAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICRlbGVtZW50cyA9ICRlbGVtZW50LnBhcmVudCgndWwnKS5jaGlsZHJlbignbGknKSxcbiAgICAgICAgJHByZXZFbGVtZW50LFxuICAgICAgICAkbmV4dEVsZW1lbnQ7XG5cbiAgICAgICRlbGVtZW50cy5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJGVsZW1lbnQpKSB7XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMud3JhcE9uS2V5cykge1xuICAgICAgICAgICAgJHByZXZFbGVtZW50ID0gaSA9PT0gMCA/ICRlbGVtZW50cy5sYXN0KCkgOiAkZWxlbWVudHMuZXEoaS0xKTtcbiAgICAgICAgICAgICRuZXh0RWxlbWVudCA9IGkgPT09ICRlbGVtZW50cy5sZW5ndGggLTEgPyAkZWxlbWVudHMuZmlyc3QoKSA6ICRlbGVtZW50cy5lcShpKzEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkcHJldkVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5tYXgoMCwgaS0xKSk7XG4gICAgICAgICAgICAkbmV4dEVsZW1lbnQgPSAkZWxlbWVudHMuZXEoTWF0aC5taW4oaSsxLCAkZWxlbWVudHMubGVuZ3RoLTEpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaGFuZGxlIGtleWJvYXJkIGV2ZW50IHdpdGgga2V5Ym9hcmQgdXRpbFxuICAgICAgS2V5Ym9hcmQuaGFuZGxlS2V5KGUsICdUYWJzJywge1xuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkZWxlbWVudC5maW5kKCdbcm9sZT1cInRhYlwiXScpLmZvY3VzKCk7XG4gICAgICAgICAgX3RoaXMuX2hhbmRsZVRhYkNoYW5nZSgkZWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkcHJldkVsZW1lbnQuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKS5mb2N1cygpO1xuICAgICAgICAgIF90aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJHByZXZFbGVtZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJG5leHRFbGVtZW50LmZpbmQoJ1tyb2xlPVwidGFiXCJdJykuZm9jdXMoKTtcbiAgICAgICAgICBfdGhpcy5faGFuZGxlVGFiQ2hhbmdlKCRuZXh0RWxlbWVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIHRhYiBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLiBDb2xsYXBzZXMgYWN0aXZlIHRhYi5cbiAgICogQHBhcmFtIHtqUXVlcnl9ICR0YXJnZXQgLSBUYWIgdG8gb3Blbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBoaXN0b3J5SGFuZGxlZCAtIGJyb3dzZXIgaGFzIGFscmVhZHkgaGFuZGxlZCBhIGhpc3RvcnkgdXBkYXRlXG4gICAqIEBmaXJlcyBUYWJzI2NoYW5nZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIF9oYW5kbGVUYWJDaGFuZ2UoJHRhcmdldCwgaGlzdG9yeUhhbmRsZWQpIHtcblxuICAgIC8vIFdpdGggYGFjdGl2ZUNvbGxhcHNlYCwgaWYgdGhlIHRhcmdldCBpcyB0aGUgYWN0aXZlIFRhYiwgY29sbGFwc2UgaXQuXG4gICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoYCR7dGhpcy5vcHRpb25zLmxpbmtBY3RpdmVDbGFzc31gKSkge1xuICAgICAgICBpZih0aGlzLm9wdGlvbnMuYWN0aXZlQ29sbGFwc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkb2xkVGFiID0gdGhpcy4kZWxlbWVudC5cbiAgICAgICAgICBmaW5kKGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfS4ke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCksXG4gICAgICAgICAgJHRhYkxpbmsgPSAkdGFyZ2V0LmZpbmQoJ1tyb2xlPVwidGFiXCJdJyksXG4gICAgICAgICAgdGFyZ2V0ID0gJHRhYkxpbmsuYXR0cignZGF0YS10YWJzLXRhcmdldCcpLFxuICAgICAgICAgIGFuY2hvciA9IHRhcmdldCAmJiB0YXJnZXQubGVuZ3RoID8gYCMke3RhcmdldH1gIDogJHRhYkxpbmtbMF0uaGFzaCxcbiAgICAgICAgICAkdGFyZ2V0Q29udGVudCA9IHRoaXMuJHRhYkNvbnRlbnQuZmluZChhbmNob3IpO1xuXG4gICAgLy9jbG9zZSBvbGQgdGFiXG4gICAgdGhpcy5fY29sbGFwc2VUYWIoJG9sZFRhYik7XG5cbiAgICAvL29wZW4gbmV3IHRhYlxuICAgIHRoaXMuX29wZW5UYWIoJHRhcmdldCk7XG5cbiAgICAvL2VpdGhlciByZXBsYWNlIG9yIHVwZGF0ZSBicm93c2VyIGhpc3RvcnlcbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rICYmICFoaXN0b3J5SGFuZGxlZCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGRhdGVIaXN0b3J5KSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCAnJywgYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIHRoZSBwbHVnaW4gaGFzIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkIHRhYnMuXG4gICAgICogQGV2ZW50IFRhYnMjY2hhbmdlXG4gICAgICovXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UuemYudGFicycsIFskdGFyZ2V0LCAkdGFyZ2V0Q29udGVudF0pO1xuXG4gICAgLy9maXJlIHRvIGNoaWxkcmVuIGEgbXV0YXRpb24gZXZlbnRcbiAgICAkdGFyZ2V0Q29udGVudC5maW5kKFwiW2RhdGEtbXV0YXRlXVwiKS50cmlnZ2VyKFwibXV0YXRlbWUuemYudHJpZ2dlclwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgdGFiIGAkdGFyZ2V0Q29udGVudGAgZGVmaW5lZCBieSBgJHRhcmdldGAuXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkdGFyZ2V0IC0gVGFiIHRvIG9wZW4uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX29wZW5UYWIoJHRhcmdldCkge1xuICAgICAgdmFyICR0YWJMaW5rID0gJHRhcmdldC5maW5kKCdbcm9sZT1cInRhYlwiXScpLFxuICAgICAgICAgIGhhc2ggPSAkdGFiTGluay5hdHRyKCdkYXRhLXRhYnMtdGFyZ2V0JykgfHwgJHRhYkxpbmtbMF0uaGFzaC5zbGljZSgxKSxcbiAgICAgICAgICAkdGFyZ2V0Q29udGVudCA9IHRoaXMuJHRhYkNvbnRlbnQuZmluZChgIyR7aGFzaH1gKTtcblxuICAgICAgJHRhcmdldC5hZGRDbGFzcyhgJHt0aGlzLm9wdGlvbnMubGlua0FjdGl2ZUNsYXNzfWApO1xuXG4gICAgICAkdGFiTGluay5hdHRyKHtcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgfSk7XG5cbiAgICAgICR0YXJnZXRDb250ZW50XG4gICAgICAgIC5hZGRDbGFzcyhgJHt0aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlcyBgJHRhcmdldENvbnRlbnRgIGRlZmluZWQgYnkgYCR0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHRhcmdldCAtIFRhYiB0byBjb2xsYXBzZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfY29sbGFwc2VUYWIoJHRhcmdldCkge1xuICAgIHZhciAkdGFyZ2V0QW5jaG9yID0gJHRhcmdldFxuICAgICAgLnJlbW92ZUNsYXNzKGAke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YClcbiAgICAgIC5maW5kKCdbcm9sZT1cInRhYlwiXScpXG4gICAgICAuYXR0cih7XG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogJ2ZhbHNlJyxcbiAgICAgICAgJ3RhYmluZGV4JzogLTFcbiAgICAgIH0pO1xuXG4gICAgJChgIyR7JHRhcmdldEFuY2hvci5hdHRyKCdhcmlhLWNvbnRyb2xzJyl9YClcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHt0aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKVxuICAgICAgLmF0dHIoeyAnYXJpYS1oaWRkZW4nOiAndHJ1ZScgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgdGhlIGFjdGl2ZSBUYWIuXG4gICAqIEBmaXJlcyBUYWJzI2NvbGxhcHNlXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2NvbGxhcHNlKCkge1xuICAgIHZhciAkYWN0aXZlVGFiID0gdGhpcy4kZWxlbWVudC5maW5kKGAuJHt0aGlzLm9wdGlvbnMubGlua0NsYXNzfS4ke3RoaXMub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3N9YCk7XG5cbiAgICBpZiAoJGFjdGl2ZVRhYi5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2NvbGxhcHNlVGFiKCRhY3RpdmVUYWIpO1xuXG4gICAgICAvKipcbiAgICAgICogRmlyZXMgd2hlbiB0aGUgcGx1Z2luIGhhcyBzdWNjZXNzZnVsbHkgY29sbGFwc2VkIHRhYnMuXG4gICAgICAqIEBldmVudCBUYWJzI2NvbGxhcHNlXG4gICAgICAqL1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdjb2xsYXBzZS56Zi50YWJzJywgWyRhY3RpdmVUYWJdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCBmb3Igc2VsZWN0aW5nIGEgY29udGVudCBwYW5lIHRvIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7alF1ZXJ5IHwgU3RyaW5nfSBlbGVtIC0galF1ZXJ5IG9iamVjdCBvciBzdHJpbmcgb2YgdGhlIGlkIG9mIHRoZSBwYW5lIHRvIGRpc3BsYXkuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaGlzdG9yeUhhbmRsZWQgLSBicm93c2VyIGhhcyBhbHJlYWR5IGhhbmRsZWQgYSBoaXN0b3J5IHVwZGF0ZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHNlbGVjdFRhYihlbGVtLCBoaXN0b3J5SGFuZGxlZCkge1xuICAgIHZhciBpZFN0ciwgaGFzaElkU3RyO1xuXG4gICAgaWYgKHR5cGVvZiBlbGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgaWRTdHIgPSBlbGVtWzBdLmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZFN0ciA9IGVsZW07XG4gICAgfVxuXG4gICAgaWYgKGlkU3RyLmluZGV4T2YoJyMnKSA8IDApIHtcbiAgICAgIGhhc2hJZFN0ciA9IGAjJHtpZFN0cn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNoSWRTdHIgPSBpZFN0cjtcbiAgICAgIGlkU3RyID0gaWRTdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgdmFyICR0YXJnZXQgPSB0aGlzLiR0YWJUaXRsZXMuaGFzKGBbaHJlZiQ9XCIke2hhc2hJZFN0cn1cIl0sW2RhdGEtdGFicy10YXJnZXQ9XCIke2lkU3RyfVwiXWApLmZpcnN0KCk7XG5cbiAgICB0aGlzLl9oYW5kbGVUYWJDaGFuZ2UoJHRhcmdldCwgaGlzdG9yeUhhbmRsZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBoZWlnaHQgb2YgZWFjaCBwYW5lbCB0byB0aGUgaGVpZ2h0IG9mIHRoZSB0YWxsZXN0IHBhbmVsLlxuICAgKiBJZiBlbmFibGVkIGluIG9wdGlvbnMsIGdldHMgY2FsbGVkIG9uIG1lZGlhIHF1ZXJ5IGNoYW5nZS5cbiAgICogSWYgbG9hZGluZyBjb250ZW50IHZpYSBleHRlcm5hbCBzb3VyY2UsIGNhbiBiZSBjYWxsZWQgZGlyZWN0bHkgb3Igd2l0aCBfcmVmbG93LlxuICAgKiBJZiBlbmFibGVkIHdpdGggYGRhdGEtbWF0Y2gtaGVpZ2h0PVwidHJ1ZVwiYCwgdGFicyBzZXRzIHRvIGVxdWFsIGhlaWdodFxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRIZWlnaHQoKSB7XG4gICAgdmFyIG1heCA9IDAsXG4gICAgICAgIF90aGlzID0gdGhpczsgLy8gTG9jayBkb3duIHRoZSBgdGhpc2AgdmFsdWUgZm9yIHRoZSByb290IHRhYnMgb2JqZWN0XG5cbiAgICBpZiAoIXRoaXMuJHRhYkNvbnRlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLiR0YWJDb250ZW50XG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLnBhbmVsQ2xhc3N9YClcbiAgICAgIC5jc3MoJ21pbi1oZWlnaHQnLCAnJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBwYW5lbCA9ICQodGhpcyksXG4gICAgICAgICAgICBpc0FjdGl2ZSA9IHBhbmVsLmhhc0NsYXNzKGAke190aGlzLm9wdGlvbnMucGFuZWxBY3RpdmVDbGFzc31gKTsgLy8gZ2V0IHRoZSBvcHRpb25zIGZyb20gdGhlIHBhcmVudCBpbnN0ZWFkIG9mIHRyeWluZyB0byBnZXQgdGhlbSBmcm9tIHRoZSBjaGlsZFxuXG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICBwYW5lbC5jc3Moeyd2aXNpYmlsaXR5JzogJ2hpZGRlbicsICdkaXNwbGF5JzogJ2Jsb2NrJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRlbXAgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICAgICAgcGFuZWwuY3NzKHtcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJycsXG4gICAgICAgICAgICAnZGlzcGxheSc6ICcnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXggPSB0ZW1wID4gbWF4ID8gdGVtcCA6IG1heDtcbiAgICAgIH0pXG4gICAgICAuY3NzKCdtaW4taGVpZ2h0JywgYCR7bWF4fXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgdGFicy5cbiAgICogQGZpcmVzIFRhYnMjZGVzdHJveWVkXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAuZmluZChgLiR7dGhpcy5vcHRpb25zLmxpbmtDbGFzc31gKVxuICAgICAgLm9mZignLnpmLnRhYnMnKS5oaWRlKCkuZW5kKClcbiAgICAgIC5maW5kKGAuJHt0aGlzLm9wdGlvbnMucGFuZWxDbGFzc31gKVxuICAgICAgLmhpZGUoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubWF0Y2hIZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLl9zZXRIZWlnaHRNcUhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgJCh3aW5kb3cpLm9mZignY2hhbmdlZC56Zi5tZWRpYXF1ZXJ5JywgdGhpcy5fc2V0SGVpZ2h0TXFIYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlZXBMaW5rKSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdoYXNoY2hhbmdlJywgdGhpcy5fY2hlY2tEZWVwTGluayk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub25Mb2FkTGlzdGVuZXIpIHtcbiAgICAgICQod2luZG93KS5vZmYodGhpcy5vbkxvYWRMaXN0ZW5lcik7XG4gICAgfVxuICB9XG59XG5cblRhYnMuZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBMaW5rIHRoZSBsb2NhdGlvbiBoYXNoIHRvIHRoZSBhY3RpdmUgcGFuZS5cbiAgICogU2V0IHRoZSBsb2NhdGlvbiBoYXNoIHdoZW4gdGhlIGFjdGl2ZSBwYW5lIGNoYW5nZXMsIGFuZCBvcGVuIHRoZSBjb3JyZXNwb25kaW5nIHBhbmUgd2hlbiB0aGUgbG9jYXRpb24gY2hhbmdlcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlZXBMaW5rOiBmYWxzZSxcblxuICAvKipcbiAgICogSWYgYGRlZXBMaW5rYCBpcyBlbmFibGVkLCBhZGp1c3QgdGhlIGRlZXAgbGluayBzY3JvbGwgdG8gbWFrZSBzdXJlIHRoZSB0b3Agb2YgdGhlIHRhYiBwYW5lbCBpcyB2aXNpYmxlXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIElmIGBkZWVwTGlua1NtdWRnZWAgaXMgZW5hYmxlZCwgYW5pbWF0aW9uIHRpbWUgKG1zKSBmb3IgdGhlIGRlZXAgbGluayBhZGp1c3RtZW50XG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMzAwXG4gICAqL1xuICBkZWVwTGlua1NtdWRnZURlbGF5OiAzMDAsXG5cbiAgLyoqXG4gICAqIElmIGBkZWVwTGlua1NtdWRnZWAgaXMgZW5hYmxlZCwgYW5pbWF0aW9uIG9mZnNldCBmcm9tIHRoZSB0b3AgZm9yIHRoZSBkZWVwIGxpbmsgYWRqdXN0bWVudFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDBcbiAgICovXG4gIGRlZXBMaW5rU211ZGdlT2Zmc2V0OiAwLFxuXG4gIC8qKlxuICAgKiBJZiBgZGVlcExpbmtgIGlzIGVuYWJsZWQsIHVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IHdpdGggdGhlIG9wZW4gdGFiXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICB1cGRhdGVIaXN0b3J5OiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIHRoZSB3aW5kb3cgdG8gc2Nyb2xsIHRvIGNvbnRlbnQgb2YgYWN0aXZlIHBhbmUgb24gbG9hZC5cbiAgICogTm90IHJlY29tbWVuZGVkIGlmIG1vcmUgdGhhbiBvbmUgdGFiIHBhbmVsIHBlciBwYWdlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYXV0b0ZvY3VzOiBmYWxzZSxcblxuICAvKipcbiAgICogQWxsb3dzIGtleWJvYXJkIGlucHV0IHRvICd3cmFwJyBhcm91bmQgdGhlIHRhYiBsaW5rcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgd3JhcE9uS2V5czogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3dzIHRoZSB0YWIgY29udGVudCBwYW5lcyB0byBtYXRjaCBoZWlnaHRzIGlmIHNldCB0byB0cnVlLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgbWF0Y2hIZWlnaHQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgYWN0aXZlIHRhYnMgdG8gY29sbGFwc2Ugd2hlbiBjbGlja2VkLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgYWN0aXZlQ29sbGFwc2U6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDbGFzcyBhcHBsaWVkIHRvIGBsaWAncyBpbiB0YWIgbGluayBsaXN0LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICd0YWJzLXRpdGxlJ1xuICAgKi9cbiAgbGlua0NsYXNzOiAndGFicy10aXRsZScsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGFjdGl2ZSBgbGlgIGluIHRhYiBsaW5rIGxpc3QuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2lzLWFjdGl2ZSdcbiAgICovXG4gIGxpbmtBY3RpdmVDbGFzczogJ2lzLWFjdGl2ZScsXG5cbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIGNvbnRlbnQgY29udGFpbmVycy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAZGVmYXVsdCAndGFicy1wYW5lbCdcbiAgICovXG4gIHBhbmVsQ2xhc3M6ICd0YWJzLXBhbmVsJyxcblxuICAvKipcbiAgICogQ2xhc3MgYXBwbGllZCB0byB0aGUgYWN0aXZlIGNvbnRlbnQgY29udGFpbmVyLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdpcy1hY3RpdmUnXG4gICAqL1xuICBwYW5lbEFjdGl2ZUNsYXNzOiAnaXMtYWN0aXZlJ1xufTtcblxuZXhwb3J0IHtUYWJzfTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBNb3Rpb24gfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUucGx1Z2luJztcbmltcG9ydCB7IFJlZ0V4cEVzY2FwZSB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuXG4vKipcbiAqIFRvZ2dsZXIgbW9kdWxlLlxuICogQG1vZHVsZSBmb3VuZGF0aW9uLnRvZ2dsZXJcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubW90aW9uXG4gKiBAcmVxdWlyZXMgZm91bmRhdGlvbi51dGlsLnRyaWdnZXJzXG4gKi9cblxuY2xhc3MgVG9nZ2xlciBleHRlbmRzIFBsdWdpbiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFRvZ2dsZXIuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBUb2dnbGVyXG4gICAqIEBmaXJlcyBUb2dnbGVyI2luaXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGFkZCB0aGUgdHJpZ2dlciB0by5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZXMgdG8gdGhlIGRlZmF1bHQgcGx1Z2luIHNldHRpbmdzLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgVG9nZ2xlci5kZWZhdWx0cywgZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJyc7XG4gICAgdGhpcy5jbGFzc05hbWUgPSAnVG9nZ2xlcic7IC8vIGllOSBiYWNrIGNvbXBhdFxuXG4gICAgLy8gVHJpZ2dlcnMgaW5pdCBpcyBpZGVtcG90ZW50LCBqdXN0IG5lZWQgdG8gbWFrZSBzdXJlIGl0IGlzIGluaXRpYWxpemVkXG4gICAgVHJpZ2dlcnMuaW5pdCgkKTtcblxuICAgIHRoaXMuX2luaXQoKTtcbiAgICB0aGlzLl9ldmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgVG9nZ2xlciBwbHVnaW4gYnkgcGFyc2luZyB0aGUgdG9nZ2xlIGNsYXNzIGZyb20gZGF0YS10b2dnbGVyLCBvciBhbmltYXRpb24gY2xhc3NlcyBmcm9tIGRhdGEtYW5pbWF0ZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcbiAgICAvLyBDb2xsZWN0IHRyaWdnZXJzIHRvIHNldCBBUklBIGF0dHJpYnV0ZXMgdG9cbiAgICB2YXIgaWQgPSB0aGlzLiRlbGVtZW50WzBdLmlkLFxuICAgICAgJHRyaWdnZXJzID0gJChgW2RhdGEtb3Blbn49XCIke2lkfVwiXSwgW2RhdGEtY2xvc2V+PVwiJHtpZH1cIl0sIFtkYXRhLXRvZ2dsZX49XCIke2lkfVwiXWApO1xuXG4gICAgdmFyIGlucHV0O1xuICAgIC8vIFBhcnNlIGFuaW1hdGlvbiBjbGFzc2VzIGlmIHRoZXkgd2VyZSBzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGUpIHtcbiAgICAgIGlucHV0ID0gdGhpcy5vcHRpb25zLmFuaW1hdGUuc3BsaXQoJyAnKTtcblxuICAgICAgdGhpcy5hbmltYXRpb25JbiA9IGlucHV0WzBdO1xuICAgICAgdGhpcy5hbmltYXRpb25PdXQgPSBpbnB1dFsxXSB8fCBudWxsO1xuXG4gICAgICAvLyAtIGFyaWEtZXhwYW5kZWQ6IGFjY29yZGluZyB0byB0aGUgZWxlbWVudCB2aXNpYmlsaXR5LlxuICAgICAgJHRyaWdnZXJzLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAhdGhpcy4kZWxlbWVudC5pcygnOmhpZGRlbicpKTtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBwYXJzZSB0b2dnbGUgY2xhc3NcbiAgICBlbHNlIHtcbiAgICAgIGlucHV0ID0gdGhpcy5vcHRpb25zLnRvZ2dsZXI7XG4gICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyB8fCAhaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICd0b2dnbGVyJyBvcHRpb24gY29udGFpbmluZyB0aGUgdGFyZ2V0IGNsYXNzIGlzIHJlcXVpcmVkLCBnb3QgXCIke2lucHV0fVwiYCk7XG4gICAgICB9XG4gICAgICAvLyBBbGxvdyBmb3IgYSAuIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZ1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSBpbnB1dFswXSA9PT0gJy4nID8gaW5wdXQuc2xpY2UoMSkgOiBpbnB1dDtcblxuICAgICAgLy8gLSBhcmlhLWV4cGFuZGVkOiBhY2NvcmRpbmcgdG8gdGhlIGVsZW1lbnRzIGNsYXNzIHNldC5cbiAgICAgICR0cmlnZ2Vycy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdGhpcy4kZWxlbWVudC5oYXNDbGFzcyh0aGlzLmNsYXNzTmFtZSkpO1xuICAgIH1cblxuICAgIC8vIC0gYXJpYS1jb250cm9sczogYWRkaW5nIHRoZSBlbGVtZW50IGlkIHRvIGl0IGlmIG5vdCBhbHJlYWR5IGluIGl0LlxuICAgICR0cmlnZ2Vycy5lYWNoKChpbmRleCwgdHJpZ2dlcikgPT4ge1xuICAgICAgY29uc3QgJHRyaWdnZXIgPSAkKHRyaWdnZXIpO1xuICAgICAgY29uc3QgY29udHJvbHMgPSAkdHJpZ2dlci5hdHRyKCdhcmlhLWNvbnRyb2xzJykgfHwgJyc7XG5cbiAgICAgIGNvbnN0IGNvbnRhaW5zSWQgPSBuZXcgUmVnRXhwKGBcXFxcYiR7UmVnRXhwRXNjYXBlKGlkKX1cXFxcYmApLnRlc3QoY29udHJvbHMpO1xuICAgICAgaWYgKCFjb250YWluc0lkKSAkdHJpZ2dlci5hdHRyKCdhcmlhLWNvbnRyb2xzJywgY29udHJvbHMgPyBgJHtjb250cm9sc30gJHtpZH1gIDogaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGV2ZW50cyBmb3IgdGhlIHRvZ2dsZSB0cmlnZ2VyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9ldmVudHMoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5vZmYoJ3RvZ2dsZS56Zi50cmlnZ2VyJykub24oJ3RvZ2dsZS56Zi50cmlnZ2VyJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdGFyZ2V0IGNsYXNzIG9uIHRoZSB0YXJnZXQgZWxlbWVudC4gQW4gZXZlbnQgaXMgZmlyZWQgZnJvbSB0aGUgb3JpZ2luYWwgdHJpZ2dlciBkZXBlbmRpbmcgb24gaWYgdGhlIHJlc3VsdGFudCBzdGF0ZSB3YXMgXCJvblwiIG9yIFwib2ZmXCIuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAZmlyZXMgVG9nZ2xlciNvblxuICAgKiBAZmlyZXMgVG9nZ2xlciNvZmZcbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzWyB0aGlzLm9wdGlvbnMuYW5pbWF0ZSA/ICdfdG9nZ2xlQW5pbWF0ZScgOiAnX3RvZ2dsZUNsYXNzJ10oKTtcbiAgfVxuXG4gIF90b2dnbGVDbGFzcygpIHtcbiAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3NOYW1lKTtcblxuICAgIHZhciBpc09uID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcyh0aGlzLmNsYXNzTmFtZSk7XG4gICAgaWYgKGlzT24pIHtcbiAgICAgIC8qKlxuICAgICAgICogRmlyZXMgaWYgdGhlIHRhcmdldCBlbGVtZW50IGhhcyB0aGUgY2xhc3MgYWZ0ZXIgYSB0b2dnbGUuXG4gICAgICAgKiBAZXZlbnQgVG9nZ2xlciNvblxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29uLnpmLnRvZ2dsZXInKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvKipcbiAgICAgICAqIEZpcmVzIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBkb2VzIG5vdCBoYXZlIHRoZSBjbGFzcyBhZnRlciBhIHRvZ2dsZS5cbiAgICAgICAqIEBldmVudCBUb2dnbGVyI29mZlxuICAgICAgICovXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ29mZi56Zi50b2dnbGVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlQVJJQShpc09uKTtcbiAgICB0aGlzLiRlbGVtZW50LmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gIH1cblxuICBfdG9nZ2xlQW5pbWF0ZSgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgTW90aW9uLmFuaW1hdGVJbih0aGlzLiRlbGVtZW50LCB0aGlzLmFuaW1hdGlvbkluLCBmdW5jdGlvbigpIHtcbiAgICAgICAgX3RoaXMuX3VwZGF0ZUFSSUEodHJ1ZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignb24uemYudG9nZ2xlcicpO1xuICAgICAgICB0aGlzLmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCh0aGlzLiRlbGVtZW50LCB0aGlzLmFuaW1hdGlvbk91dCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl91cGRhdGVBUklBKGZhbHNlKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdvZmYuemYudG9nZ2xlcicpO1xuICAgICAgICB0aGlzLmZpbmQoJ1tkYXRhLW11dGF0ZV0nKS50cmlnZ2VyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfdXBkYXRlQVJJQShpc09uKSB7XG4gICAgdmFyIGlkID0gdGhpcy4kZWxlbWVudFswXS5pZDtcbiAgICAkKGBbZGF0YS1vcGVuPVwiJHtpZH1cIl0sIFtkYXRhLWNsb3NlPVwiJHtpZH1cIl0sIFtkYXRhLXRvZ2dsZT1cIiR7aWR9XCJdYClcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBpc09uID8gdHJ1ZSA6IGZhbHNlXG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgaW5zdGFuY2Ugb2YgVG9nZ2xlciBvbiB0aGUgZWxlbWVudC5cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICBfZGVzdHJveSgpIHtcbiAgICB0aGlzLiRlbGVtZW50Lm9mZignLnpmLnRvZ2dsZXInKTtcbiAgfVxufVxuXG5Ub2dnbGVyLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQgdG8gdG9nZ2xlLiBJdCBjYW4gYmUgcHJvdmlkZWQgd2l0aCBvciB3aXRob3V0IFwiLlwiXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRvZ2dsZXI6IHVuZGVmaW5lZCxcbiAgLyoqXG4gICAqIFRlbGxzIHRoZSBwbHVnaW4gaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGFuaW1hdGVkIHdoZW4gdG9nZ2xlZC5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFuaW1hdGU6IGZhbHNlXG59O1xuXG5leHBvcnQge1RvZ2dsZXJ9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEdldFlvRGlnaXRzLCBpZ25vcmVNb3VzZWRpc2FwcGVhciB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7IE1lZGlhUXVlcnkgfSBmcm9tICcuL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7IFRyaWdnZXJzIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuaW1wb3J0IHsgUG9zaXRpb25hYmxlIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnBvc2l0aW9uYWJsZSc7XG5cbi8qKlxuICogVG9vbHRpcCBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24udG9vbHRpcFxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC5ib3hcbiAqIEByZXF1aXJlcyBmb3VuZGF0aW9uLnV0aWwubWVkaWFRdWVyeVxuICogQHJlcXVpcmVzIGZvdW5kYXRpb24udXRpbC50cmlnZ2Vyc1xuICovXG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBQb3NpdGlvbmFibGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhIFRvb2x0aXAuXG4gICAqIEBjbGFzc1xuICAgKiBAbmFtZSBUb29sdGlwXG4gICAqIEBmaXJlcyBUb29sdGlwI2luaXRcbiAgICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IHRvIGF0dGFjaCBhIHRvb2x0aXAgdG8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb2JqZWN0IHRvIGV4dGVuZCB0aGUgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgX3NldHVwKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgVG9vbHRpcC5kZWZhdWx0cywgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpO1xuICAgIHRoaXMuY2xhc3NOYW1lID0gJ1Rvb2x0aXAnOyAvLyBpZTkgYmFjayBjb21wYXRcblxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2xpY2sgPSBmYWxzZTtcblxuICAgIC8vIFRyaWdnZXJzIGluaXQgaXMgaWRlbXBvdGVudCwganVzdCBuZWVkIHRvIG1ha2Ugc3VyZSBpdCBpcyBpbml0aWFsaXplZFxuICAgIFRyaWdnZXJzLmluaXQoJCk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHRvb2x0aXAgYnkgc2V0dGluZyB0aGUgY3JlYXRpbmcgdGhlIHRpcCBlbGVtZW50LCBhZGRpbmcgaXQncyB0ZXh0LCBzZXR0aW5nIHByaXZhdGUgdmFyaWFibGVzIGFuZCBzZXR0aW5nIGF0dHJpYnV0ZXMgb24gdGhlIGFuY2hvci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbml0KCkge1xuICAgIE1lZGlhUXVlcnkuX2luaXQoKTtcbiAgICB2YXIgZWxlbUlkID0gdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JykgfHwgR2V0WW9EaWdpdHMoNiwgJ3Rvb2x0aXAnKTtcblxuICAgIHRoaXMub3B0aW9ucy50aXBUZXh0ID0gdGhpcy5vcHRpb25zLnRpcFRleHQgfHwgdGhpcy4kZWxlbWVudC5hdHRyKCd0aXRsZScpO1xuICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPyAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSkgOiB0aGlzLl9idWlsZFRlbXBsYXRlKGVsZW1JZCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93SHRtbCkge1xuICAgICAgdGhpcy50ZW1wbGF0ZS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KVxuICAgICAgICAuaHRtbCh0aGlzLm9wdGlvbnMudGlwVGV4dClcbiAgICAgICAgLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZW1wbGF0ZS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KVxuICAgICAgICAudGV4dCh0aGlzLm9wdGlvbnMudGlwVGV4dClcbiAgICAgICAgLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LmF0dHIoe1xuICAgICAgJ3RpdGxlJzogJycsXG4gICAgICAnYXJpYS1kZXNjcmliZWRieSc6IGVsZW1JZCxcbiAgICAgICdkYXRhLXlldGktYm94JzogZWxlbUlkLFxuICAgICAgJ2RhdGEtdG9nZ2xlJzogZWxlbUlkLFxuICAgICAgJ2RhdGEtcmVzaXplJzogZWxlbUlkXG4gICAgfSkuYWRkQ2xhc3ModGhpcy5vcHRpb25zLnRyaWdnZXJDbGFzcyk7XG5cbiAgICBzdXBlci5faW5pdCgpO1xuICAgIHRoaXMuX2V2ZW50cygpO1xuICB9XG5cbiAgX2dldERlZmF1bHRQb3NpdGlvbigpIHtcbiAgICAvLyBoYW5kbGUgbGVnYWN5IGNsYXNzbmFtZXNcbiAgICB2YXIgZWxlbWVudENsYXNzTmFtZSA9IHRoaXMuJGVsZW1lbnRbMF0uY2xhc3NOYW1lO1xuICAgIGlmICh0aGlzLiRlbGVtZW50WzBdIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Q2xhc3NOYW1lID0gZWxlbWVudENsYXNzTmFtZS5iYXNlVmFsO1xuICAgIH1cbiAgICB2YXIgcG9zaXRpb24gPSBlbGVtZW50Q2xhc3NOYW1lLm1hdGNoKC9cXGIodG9wfGxlZnR8cmlnaHR8Ym90dG9tKVxcYi9nKTtcbiAgICByZXR1cm4gcG9zaXRpb24gPyBwb3NpdGlvblswXSA6ICd0b3AnO1xuICB9XG5cbiAgX2dldERlZmF1bHRBbGlnbm1lbnQoKSB7XG4gICAgcmV0dXJuICdjZW50ZXInO1xuICB9XG5cbiAgX2dldEhPZmZzZXQoKSB7XG4gICAgaWYodGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaE9mZnNldCArIHRoaXMub3B0aW9ucy50b29sdGlwV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaE9mZnNldFxuICAgIH1cbiAgfVxuXG4gIF9nZXRWT2Zmc2V0KCkge1xuICAgIGlmKHRoaXMucG9zaXRpb24gPT09ICd0b3AnIHx8IHRoaXMucG9zaXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnZPZmZzZXQgKyB0aGlzLm9wdGlvbnMudG9vbHRpcEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy52T2Zmc2V0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkcyB0aGUgdG9vbHRpcCBlbGVtZW50LCBhZGRzIGF0dHJpYnV0ZXMsIGFuZCByZXR1cm5zIHRoZSB0ZW1wbGF0ZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9idWlsZFRlbXBsYXRlKGlkKSB7XG4gICAgdmFyIHRlbXBsYXRlQ2xhc3NlcyA9IChgJHt0aGlzLm9wdGlvbnMudG9vbHRpcENsYXNzfSAke3RoaXMub3B0aW9ucy50ZW1wbGF0ZUNsYXNzZXN9YCkudHJpbSgpO1xuICAgIHZhciAkdGVtcGxhdGUgPSAgJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyh0ZW1wbGF0ZUNsYXNzZXMpLmF0dHIoe1xuICAgICAgJ3JvbGUnOiAndG9vbHRpcCcsXG4gICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlLFxuICAgICAgJ2RhdGEtaXMtYWN0aXZlJzogZmFsc2UsXG4gICAgICAnZGF0YS1pcy1mb2N1cyc6IGZhbHNlLFxuICAgICAgJ2lkJzogaWRcbiAgICB9KTtcbiAgICByZXR1cm4gJHRlbXBsYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldHMgdGhlIHBvc2l0aW9uIGNsYXNzIG9mIGFuIGVsZW1lbnQgYW5kIHJlY3Vyc2l2ZWx5IGNhbGxzIGl0c2VsZiB1bnRpbCB0aGVyZSBhcmUgbm8gbW9yZSBwb3NzaWJsZSBwb3NpdGlvbnMgdG8gYXR0ZW1wdCwgb3IgdGhlIHRvb2x0aXAgZWxlbWVudCBpcyBubyBsb25nZXIgY29sbGlkaW5nLlxuICAgKiBpZiB0aGUgdG9vbHRpcCBpcyBsYXJnZXIgdGhhbiB0aGUgc2NyZWVuIHdpZHRoLCBkZWZhdWx0IHRvIGZ1bGwgd2lkdGggLSBhbnkgdXNlciBzZWxlY3RlZCBtYXJnaW5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRQb3NpdGlvbigpIHtcbiAgICBzdXBlci5fc2V0UG9zaXRpb24odGhpcy4kZWxlbWVudCwgdGhpcy50ZW1wbGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogcmV2ZWFscyB0aGUgdG9vbHRpcCwgYW5kIGZpcmVzIGFuIGV2ZW50IHRvIGNsb3NlIGFueSBvdGhlciBvcGVuIHRvb2x0aXBzIG9uIHRoZSBwYWdlXG4gICAqIEBmaXJlcyBUb29sdGlwI2Nsb3NlbWVcbiAgICogQGZpcmVzIFRvb2x0aXAjc2hvd1xuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zaG93T24gIT09ICdhbGwnICYmICFNZWRpYVF1ZXJ5LmlzKHRoaXMub3B0aW9ucy5zaG93T24pKSB7XG4gICAgICAvLyBjb25zb2xlLmVycm9yKCdUaGUgc2NyZWVuIGlzIHRvbyBzbWFsbCB0byBkaXNwbGF5IHRoaXMgdG9vbHRpcCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy50ZW1wbGF0ZS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJykuc2hvdygpO1xuICAgIHRoaXMuX3NldFBvc2l0aW9uKCk7XG4gICAgdGhpcy50ZW1wbGF0ZS5yZW1vdmVDbGFzcygndG9wIGJvdHRvbSBsZWZ0IHJpZ2h0JykuYWRkQ2xhc3ModGhpcy5wb3NpdGlvbilcbiAgICB0aGlzLnRlbXBsYXRlLnJlbW92ZUNsYXNzKCdhbGlnbi10b3AgYWxpZ24tYm90dG9tIGFsaWduLWxlZnQgYWxpZ24tcmlnaHQgYWxpZ24tY2VudGVyJykuYWRkQ2xhc3MoJ2FsaWduLScgKyB0aGlzLmFsaWdubWVudCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlcyB0byBjbG9zZSBhbGwgb3RoZXIgb3BlbiB0b29sdGlwcyBvbiB0aGUgcGFnZVxuICAgICAqIEBldmVudCBDbG9zZW1lI3Rvb2x0aXBcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2Nsb3NlbWUuemYudG9vbHRpcCcsIHRoaXMudGVtcGxhdGUuYXR0cignaWQnKSk7XG5cblxuICAgIHRoaXMudGVtcGxhdGUuYXR0cih7XG4gICAgICAnZGF0YS1pcy1hY3RpdmUnOiB0cnVlLFxuICAgICAgJ2FyaWEtaGlkZGVuJzogZmFsc2VcbiAgICB9KTtcbiAgICBfdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy50ZW1wbGF0ZS5zdG9wKCkuaGlkZSgpLmNzcygndmlzaWJpbGl0eScsICcnKS5mYWRlSW4odGhpcy5vcHRpb25zLmZhZGVJbkR1cmF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vbWF5YmUgZG8gc3R1ZmY/XG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxuICAgICAqIEBldmVudCBUb29sdGlwI3Nob3dcbiAgICAgKi9cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ3Nob3cuemYudG9vbHRpcCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBjdXJyZW50IHRvb2x0aXAsIGFuZCByZXNldHMgdGhlIHBvc2l0aW9uaW5nIGNsYXNzIGlmIGl0IHdhcyBjaGFuZ2VkIGR1ZSB0byBjb2xsaXNpb25cbiAgICogQGZpcmVzIFRvb2x0aXAjaGlkZVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGhpZGUoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLnRlbXBsYXRlLnN0b3AoKS5hdHRyKHtcbiAgICAgICdhcmlhLWhpZGRlbic6IHRydWUsXG4gICAgICAnZGF0YS1pcy1hY3RpdmUnOiBmYWxzZVxuICAgIH0pLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVPdXREdXJhdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgX3RoaXMuaXNDbGljayA9IGZhbHNlO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIGZpcmVzIHdoZW4gdGhlIHRvb2x0aXAgaXMgaGlkZGVuXG4gICAgICogQGV2ZW50IFRvb2x0aXAjaGlkZVxuICAgICAqL1xuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaGlkZS56Zi50b29sdGlwJyk7XG4gIH1cblxuICAvKipcbiAgICogYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSB0b29sdGlwIGFuZCBpdHMgYW5jaG9yXG4gICAqIFRPRE8gY29tYmluZSBzb21lIG9mIHRoZSBsaXN0ZW5lcnMgbGlrZSBmb2N1cyBhbmQgbW91c2VlbnRlciwgZXRjLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2V2ZW50cygpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3QgaGFzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ICE9PSAndW5kZWZpbmVkJyk7XG4gICAgdmFyIGlzRm9jdXMgPSBmYWxzZTtcblxuICAgIC8vIGBkaXNhYmxlRm9yVG91Y2g6IEZ1bGx5IGRpc2FibGUgdGhlIHRvb2x0aXAgb24gdG91Y2ggZGV2aWNlc1xuICAgIGlmIChoYXNUb3VjaCAmJiB0aGlzLm9wdGlvbnMuZGlzYWJsZUZvclRvdWNoKSByZXR1cm47XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlSG92ZXIpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignbW91c2VlbnRlci56Zi50b29sdGlwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghX3RoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICBfdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICB9LCBfdGhpcy5vcHRpb25zLmhvdmVyRGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZWxlYXZlLnpmLnRvb2x0aXAnLCBpZ25vcmVNb3VzZWRpc2FwcGVhcihmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnRpbWVvdXQpO1xuICAgICAgICBpZiAoIWlzRm9jdXMgfHwgKF90aGlzLmlzQ2xpY2sgJiYgIV90aGlzLm9wdGlvbnMuY2xpY2tPcGVuKSkge1xuICAgICAgICAgIF90aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGlmIChoYXNUb3VjaCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCd0YXAuemYudG9vbHRpcCB0b3VjaGVuZC56Zi50b29sdGlwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5pc0FjdGl2ZSA/IF90aGlzLmhpZGUoKSA6IF90aGlzLnNob3coKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tPcGVuKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWRvd24uemYudG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3RoaXMuaXNDbGljaykge1xuICAgICAgICAgIC8vX3RoaXMuaGlkZSgpO1xuICAgICAgICAgIC8vIF90aGlzLmlzQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoKF90aGlzLm9wdGlvbnMuZGlzYWJsZUhvdmVyIHx8ICFfdGhpcy4kZWxlbWVudC5hdHRyKCd0YWJpbmRleCcpKSAmJiAhX3RoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdtb3VzZWRvd24uemYudG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5pc0NsaWNrID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQub24oe1xuICAgICAgLy8gJ3RvZ2dsZS56Zi50cmlnZ2VyJzogdGhpcy50b2dnbGUuYmluZCh0aGlzKSxcbiAgICAgIC8vICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5oaWRlLmJpbmQodGhpcylcbiAgICAgICdjbG9zZS56Zi50cmlnZ2VyJzogdGhpcy5oaWRlLmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbignZm9jdXMuemYudG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgaWYgKF90aGlzLmlzQ2xpY2spIHtcbiAgICAgICAgICAvLyBJZiB3ZSdyZSBub3Qgc2hvd2luZyBvcGVuIG9uIGNsaWNrcywgd2UgbmVlZCB0byBwcmV0ZW5kIGEgY2xpY2stbGF1bmNoZWQgZm9jdXMgaXNuJ3RcbiAgICAgICAgICAvLyBhIHJlYWwgZm9jdXMsIG90aGVyd2lzZSBvbiBob3ZlciBhbmQgY29tZSBiYWNrIHdlIGdldCBiYWQgYmVoYXZpb3JcbiAgICAgICAgICBpZighX3RoaXMub3B0aW9ucy5jbGlja09wZW4pIHsgaXNGb2N1cyA9IGZhbHNlOyB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLm9uKCdmb2N1c291dC56Zi50b29sdGlwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaXNDbGljayA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICB9KVxuXG4gICAgICAub24oJ3Jlc2l6ZW1lLnpmLnRyaWdnZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF90aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgX3RoaXMuX3NldFBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgYSB0b2dnbGUgbWV0aG9kLCBpbiBhZGRpdGlvbiB0byB0aGUgc3RhdGljIHNob3coKSAmIGhpZGUoKSBmdW5jdGlvbnNcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgYW4gaW5zdGFuY2Ugb2YgdG9vbHRpcCwgcmVtb3ZlcyB0ZW1wbGF0ZSBlbGVtZW50IGZyb20gdGhlIHZpZXcuXG4gICAqIEBmdW5jdGlvblxuICAgKi9cbiAgX2Rlc3Ryb3koKSB7XG4gICAgdGhpcy4kZWxlbWVudC5hdHRyKCd0aXRsZScsIHRoaXMudGVtcGxhdGUudGV4dCgpKVxuICAgICAgICAgICAgICAgICAub2ZmKCcuemYudHJpZ2dlciAuemYudG9vbHRpcCcpXG4gICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMudHJpZ2dlckNsYXNzKVxuICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RvcCByaWdodCBsZWZ0IGJvdHRvbScpXG4gICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWRlc2NyaWJlZGJ5IGRhdGEtZGlzYWJsZS1ob3ZlciBkYXRhLXJlc2l6ZSBkYXRhLXRvZ2dsZSBkYXRhLXRvb2x0aXAgZGF0YS15ZXRpLWJveCcpO1xuXG4gICAgdGhpcy50ZW1wbGF0ZS5yZW1vdmUoKTtcbiAgfVxufVxuXG5Ub29sdGlwLmRlZmF1bHRzID0ge1xuICAvKipcbiAgICogVGltZSwgaW4gbXMsIGJlZm9yZSBhIHRvb2x0aXAgc2hvdWxkIG9wZW4gb24gaG92ZXIuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge251bWJlcn1cbiAgICogQGRlZmF1bHQgMjAwXG4gICAqL1xuICBob3ZlckRlbGF5OiAyMDAsXG4gIC8qKlxuICAgKiBUaW1lLCBpbiBtcywgYSB0b29sdGlwIHNob3VsZCB0YWtlIHRvIGZhZGUgaW50byB2aWV3LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDE1MFxuICAgKi9cbiAgZmFkZUluRHVyYXRpb246IDE1MCxcbiAgLyoqXG4gICAqIFRpbWUsIGluIG1zLCBhIHRvb2x0aXAgc2hvdWxkIHRha2UgdG8gZmFkZSBvdXQgb2Ygdmlldy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxNTBcbiAgICovXG4gIGZhZGVPdXREdXJhdGlvbjogMTUwLFxuICAvKipcbiAgICogRGlzYWJsZXMgaG92ZXIgZXZlbnRzIGZyb20gb3BlbmluZyB0aGUgdG9vbHRpcCBpZiBzZXQgdG8gdHJ1ZVxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZUhvdmVyOiBmYWxzZSxcbiAgLyoqXG4gICAqIERpc2FibGUgdGhlIHRvb2x0aXAgZm9yIHRvdWNoIGRldmljZXMuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCB0byBtYWtlIGVsZW1lbnRzIHdpdGggYSB0b29sdGlwIG9uIGl0IHRyaWdnZXIgdGhlaXJcbiAgICogYWN0aW9uIG9uIHRoZSBmaXJzdCB0YXAgaW5zdGVhZCBvZiBkaXNwbGF5aW5nIHRoZSB0b29sdGlwLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29lbGFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGlzYWJsZUZvclRvdWNoOiBmYWxzZSxcbiAgLyoqXG4gICAqIE9wdGlvbmFsIGFkZHRpb25hbCBjbGFzc2VzIHRvIGFwcGx5IHRvIHRoZSB0b29sdGlwIHRlbXBsYXRlIG9uIGluaXQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJydcbiAgICovXG4gIHRlbXBsYXRlQ2xhc3NlczogJycsXG4gIC8qKlxuICAgKiBOb24tb3B0aW9uYWwgY2xhc3MgYWRkZWQgdG8gdG9vbHRpcCB0ZW1wbGF0ZXMuIEZvdW5kYXRpb24gZGVmYXVsdCBpcyAndG9vbHRpcCcuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3Rvb2x0aXAnXG4gICAqL1xuICB0b29sdGlwQ2xhc3M6ICd0b29sdGlwJyxcbiAgLyoqXG4gICAqIENsYXNzIGFwcGxpZWQgdG8gdGhlIHRvb2x0aXAgYW5jaG9yIGVsZW1lbnQuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ2hhcy10aXAnXG4gICAqL1xuICB0cmlnZ2VyQ2xhc3M6ICdoYXMtdGlwJyxcbiAgLyoqXG4gICAqIE1pbmltdW0gYnJlYWtwb2ludCBzaXplIGF0IHdoaWNoIHRvIG9wZW4gdGhlIHRvb2x0aXAuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQGRlZmF1bHQgJ3NtYWxsJ1xuICAgKi9cbiAgc2hvd09uOiAnc21hbGwnLFxuICAvKipcbiAgICogQ3VzdG9tIHRlbXBsYXRlIHRvIGJlIHVzZWQgdG8gZ2VuZXJhdGUgbWFya3VwIGZvciB0b29sdGlwLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICB0ZW1wbGF0ZTogJycsXG4gIC8qKlxuICAgKiBUZXh0IGRpc3BsYXllZCBpbiB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSBvbiBvcGVuLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcnXG4gICAqL1xuICB0aXBUZXh0OiAnJyxcbiAgdG91Y2hDbG9zZVRleHQ6ICdUYXAgdG8gY2xvc2UuJyxcbiAgLyoqXG4gICAqIEFsbG93cyB0aGUgdG9vbHRpcCB0byByZW1haW4gb3BlbiBpZiB0cmlnZ2VyZWQgd2l0aCBhIGNsaWNrIG9yIHRvdWNoIGV2ZW50LlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBjbGlja09wZW46IHRydWUsXG4gIC8qKlxuICAgKiBQb3NpdGlvbiBvZiB0b29sdGlwLiBDYW4gYmUgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgcG9zaXRpb246ICdhdXRvJyxcbiAgLyoqXG4gICAqIEFsaWdubWVudCBvZiB0b29sdGlwIHJlbGF0aXZlIHRvIGFuY2hvci4gQ2FuIGJlIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgY2VudGVyLCBvciBhdXRvLlxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgYWxpZ25tZW50OiAnYXV0bycsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIGNvbnRhaW5lci93aW5kb3cuIElmIGZhbHNlLCB0b29sdGlwIHdpbGwgZmlyc3QgdHJ5IHRvXG4gICAqIHBvc2l0aW9uIGFzIGRlZmluZWQgYnkgZGF0YS1wb3NpdGlvbiBhbmQgZGF0YS1hbGlnbm1lbnQsIGJ1dCByZXBvc2l0aW9uIGlmXG4gICAqIGl0IHdvdWxkIGNhdXNlIGFuIG92ZXJmbG93LiAgQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFsbG93T3ZlcmxhcDogZmFsc2UsXG4gIC8qKlxuICAgKiBBbGxvdyBvdmVybGFwIG9mIG9ubHkgdGhlIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyLiBUaGlzIGlzIHRoZSBtb3N0IGNvbW1vblxuICAgKiBiZWhhdmlvciBmb3IgZHJvcGRvd25zLCBhbGxvd2luZyB0aGUgZHJvcGRvd24gdG8gZXh0ZW5kIHRoZSBib3R0b20gb2YgdGhlXG4gICAqIHNjcmVlbiBidXQgbm90IG90aGVyd2lzZSBpbmZsdWVuY2Ugb3IgYnJlYWsgb3V0IG9mIHRoZSBjb250YWluZXIuXG4gICAqIExlc3MgY29tbW9uIGZvciB0b29sdGlwcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGFsbG93Qm90dG9tT3ZlcmxhcDogZmFsc2UsXG4gIC8qKlxuICAgKiBEaXN0YW5jZSwgaW4gcGl4ZWxzLCB0aGUgdGVtcGxhdGUgc2hvdWxkIHB1c2ggYXdheSBmcm9tIHRoZSBhbmNob3Igb24gdGhlIFkgYXhpcy5cbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICB2T2Zmc2V0OiAwLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIHRlbXBsYXRlIHNob3VsZCBwdXNoIGF3YXkgZnJvbSB0aGUgYW5jaG9yIG9uIHRoZSBYIGF4aXNcbiAgICogQG9wdGlvblxuICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgKiBAZGVmYXVsdCAwXG4gICAqL1xuICBoT2Zmc2V0OiAwLFxuICAvKipcbiAgICogRGlzdGFuY2UsIGluIHBpeGVscywgdGhlIHRlbXBsYXRlIHNwYWNpbmcgYXV0by1hZGp1c3QgZm9yIGEgdmVydGljYWwgdG9vbHRpcFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDE0XG4gICAqL1xuICB0b29sdGlwSGVpZ2h0OiAxNCxcbiAgLyoqXG4gICAqIERpc3RhbmNlLCBpbiBwaXhlbHMsIHRoZSB0ZW1wbGF0ZSBzcGFjaW5nIGF1dG8tYWRqdXN0IGZvciBhIGhvcml6b250YWwgdG9vbHRpcFxuICAgKiBAb3B0aW9uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqIEBkZWZhdWx0IDEyXG4gICAqL1xuICB0b29sdGlwV2lkdGg6IDEyLFxuICAgIC8qKlxuICAgKiBBbGxvdyBIVE1MIGluIHRvb2x0aXAuIFdhcm5pbmc6IElmIHlvdSBhcmUgbG9hZGluZyB1c2VyLWdlbmVyYXRlZCBjb250ZW50IGludG8gdG9vbHRpcHMsXG4gICAqIGFsbG93aW5nIEhUTUwgbWF5IG9wZW4geW91cnNlbGYgdXAgdG8gWFNTIGF0dGFja3MuXG4gICAqIEBvcHRpb25cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhbGxvd0h0bWw6IGZhbHNlXG59O1xuXG4vKipcbiAqIFRPRE8gdXRpbGl6ZSByZXNpemUgZXZlbnQgdHJpZ2dlclxuICovXG5cbmV4cG9ydCB7VG9vbHRpcH07XG4iLCJ2YXIgQm94ID0ge1xuICBJbU5vdFRvdWNoaW5nWW91OiBJbU5vdFRvdWNoaW5nWW91LFxuICBPdmVybGFwQXJlYTogT3ZlcmxhcEFyZWEsXG4gIEdldERpbWVuc2lvbnM6IEdldERpbWVuc2lvbnMsXG4gIEdldEV4cGxpY2l0T2Zmc2V0czogR2V0RXhwbGljaXRPZmZzZXRzXG59XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudCB0byBhIGNvbnRhaW5lciBhbmQgZGV0ZXJtaW5lcyBjb2xsaXNpb24gZXZlbnRzIHdpdGggY29udGFpbmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCAtIGpRdWVyeSBvYmplY3QgdG8gdGVzdCBmb3IgY29sbGlzaW9ucy5cbiAqIEBwYXJhbSB7alF1ZXJ5fSBwYXJlbnQgLSBqUXVlcnkgb2JqZWN0IHRvIHVzZSBhcyBib3VuZGluZyBjb250YWluZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGxyT25seSAtIHNldCB0byB0cnVlIHRvIGNoZWNrIGxlZnQgYW5kIHJpZ2h0IHZhbHVlcyBvbmx5LlxuICogQHBhcmFtIHtCb29sZWFufSB0Yk9ubHkgLSBzZXQgdG8gdHJ1ZSB0byBjaGVjayB0b3AgYW5kIGJvdHRvbSB2YWx1ZXMgb25seS5cbiAqIEBkZWZhdWx0IGlmIG5vIHBhcmVudCBvYmplY3QgcGFzc2VkLCBkZXRlY3RzIGNvbGxpc2lvbnMgd2l0aCBgd2luZG93YC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgY29sbGlzaW9uIGZyZWUsIGZhbHNlIGlmIGEgY29sbGlzaW9uIGluIGFueSBkaXJlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIEltTm90VG91Y2hpbmdZb3UoZWxlbWVudCwgcGFyZW50LCBsck9ubHksIHRiT25seSwgaWdub3JlQm90dG9tKSB7XG4gIHJldHVybiBPdmVybGFwQXJlYShlbGVtZW50LCBwYXJlbnQsIGxyT25seSwgdGJPbmx5LCBpZ25vcmVCb3R0b20pID09PSAwO1xufVxuXG5mdW5jdGlvbiBPdmVybGFwQXJlYShlbGVtZW50LCBwYXJlbnQsIGxyT25seSwgdGJPbmx5LCBpZ25vcmVCb3R0b20pIHtcbiAgdmFyIGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICB0b3BPdmVyLCBib3R0b21PdmVyLCBsZWZ0T3ZlciwgcmlnaHRPdmVyO1xuICBpZiAocGFyZW50KSB7XG4gICAgdmFyIHBhckRpbXMgPSBHZXREaW1lbnNpb25zKHBhcmVudCk7XG5cbiAgICBib3R0b21PdmVyID0gKHBhckRpbXMuaGVpZ2h0ICsgcGFyRGltcy5vZmZzZXQudG9wKSAtIChlbGVEaW1zLm9mZnNldC50b3AgKyBlbGVEaW1zLmhlaWdodCk7XG4gICAgdG9wT3ZlciAgICA9IGVsZURpbXMub2Zmc2V0LnRvcCAtIHBhckRpbXMub2Zmc2V0LnRvcDtcbiAgICBsZWZ0T3ZlciAgID0gZWxlRGltcy5vZmZzZXQubGVmdCAtIHBhckRpbXMub2Zmc2V0LmxlZnQ7XG4gICAgcmlnaHRPdmVyICA9IChwYXJEaW1zLndpZHRoICsgcGFyRGltcy5vZmZzZXQubGVmdCkgLSAoZWxlRGltcy5vZmZzZXQubGVmdCArIGVsZURpbXMud2lkdGgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGJvdHRvbU92ZXIgPSAoZWxlRGltcy53aW5kb3dEaW1zLmhlaWdodCArIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wKSAtIChlbGVEaW1zLm9mZnNldC50b3AgKyBlbGVEaW1zLmhlaWdodCk7XG4gICAgdG9wT3ZlciAgICA9IGVsZURpbXMub2Zmc2V0LnRvcCAtIGVsZURpbXMud2luZG93RGltcy5vZmZzZXQudG9wO1xuICAgIGxlZnRPdmVyICAgPSBlbGVEaW1zLm9mZnNldC5sZWZ0IC0gZWxlRGltcy53aW5kb3dEaW1zLm9mZnNldC5sZWZ0O1xuICAgIHJpZ2h0T3ZlciAgPSBlbGVEaW1zLndpbmRvd0RpbXMud2lkdGggLSAoZWxlRGltcy5vZmZzZXQubGVmdCArIGVsZURpbXMud2lkdGgpO1xuICB9XG5cbiAgYm90dG9tT3ZlciA9IGlnbm9yZUJvdHRvbSA/IDAgOiBNYXRoLm1pbihib3R0b21PdmVyLCAwKTtcbiAgdG9wT3ZlciAgICA9IE1hdGgubWluKHRvcE92ZXIsIDApO1xuICBsZWZ0T3ZlciAgID0gTWF0aC5taW4obGVmdE92ZXIsIDApO1xuICByaWdodE92ZXIgID0gTWF0aC5taW4ocmlnaHRPdmVyLCAwKTtcblxuICBpZiAobHJPbmx5KSB7XG4gICAgcmV0dXJuIGxlZnRPdmVyICsgcmlnaHRPdmVyO1xuICB9XG4gIGlmICh0Yk9ubHkpIHtcbiAgICByZXR1cm4gdG9wT3ZlciArIGJvdHRvbU92ZXI7XG4gIH1cblxuICAvLyB1c2Ugc3VtIG9mIHNxdWFyZXMgYi9jIHdlIGNhcmUgYWJvdXQgb3ZlcmxhcCBhcmVhLlxuICByZXR1cm4gTWF0aC5zcXJ0KCh0b3BPdmVyICogdG9wT3ZlcikgKyAoYm90dG9tT3ZlciAqIGJvdHRvbU92ZXIpICsgKGxlZnRPdmVyICogbGVmdE92ZXIpICsgKHJpZ2h0T3ZlciAqIHJpZ2h0T3ZlcikpO1xufVxuXG4vKipcbiAqIFVzZXMgbmF0aXZlIG1ldGhvZHMgdG8gcmV0dXJuIGFuIG9iamVjdCBvZiBkaW1lbnNpb24gdmFsdWVzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2pRdWVyeSB8fCBIVE1MfSBlbGVtZW50IC0galF1ZXJ5IG9iamVjdCBvciBET00gZWxlbWVudCBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBkaW1lbnNpb25zLiBDYW4gYmUgYW55IGVsZW1lbnQgb3RoZXIgdGhhdCBkb2N1bWVudCBvciB3aW5kb3cuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIG5lc3RlZCBvYmplY3Qgb2YgaW50ZWdlciBwaXhlbCB2YWx1ZXNcbiAqIFRPRE8gLSBpZiBlbGVtZW50IGlzIHdpbmRvdywgcmV0dXJuIG9ubHkgdGhvc2UgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBHZXREaW1lbnNpb25zKGVsZW0pe1xuICBlbGVtID0gZWxlbS5sZW5ndGggPyBlbGVtWzBdIDogZWxlbTtcblxuICBpZiAoZWxlbSA9PT0gd2luZG93IHx8IGVsZW0gPT09IGRvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSSdtIHNvcnJ5LCBEYXZlLiBJJ20gYWZyYWlkIEkgY2FuJ3QgZG8gdGhhdC5cIik7XG4gIH1cblxuICB2YXIgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBwYXJSZWN0ID0gZWxlbS5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgd2luUmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB3aW5ZID0gd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgd2luWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0b3A6IHJlY3QudG9wICsgd2luWSxcbiAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpblhcbiAgICB9LFxuICAgIHBhcmVudERpbXM6IHtcbiAgICAgIHdpZHRoOiBwYXJSZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiBwYXJSZWN0LmhlaWdodCxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB0b3A6IHBhclJlY3QudG9wICsgd2luWSxcbiAgICAgICAgbGVmdDogcGFyUmVjdC5sZWZ0ICsgd2luWFxuICAgICAgfVxuICAgIH0sXG4gICAgd2luZG93RGltczoge1xuICAgICAgd2lkdGg6IHdpblJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpblJlY3QuaGVpZ2h0LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHRvcDogd2luWSxcbiAgICAgICAgbGVmdDogd2luWFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHRvcCBhbmQgbGVmdCBpbnRlZ2VyIHBpeGVsIHZhbHVlcyBmb3IgZHluYW1pY2FsbHkgcmVuZGVyZWQgZWxlbWVudHMsXG4gKiBzdWNoIGFzOiBUb29sdGlwLCBSZXZlYWwsIGFuZCBEcm9wZG93bi4gTWFpbnRhaW5lZCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIGFuZCB3aGVyZVxuICogeW91IGRvbid0IGtub3cgYWxpZ25tZW50LCBidXQgZ2VuZXJhbGx5IGZyb21cbiAqIDYuNCBmb3J3YXJkIHlvdSBzaG91bGQgdXNlIEdldEV4cGxpY2l0T2Zmc2V0cywgYXMgR2V0T2Zmc2V0cyBjb25mbGF0ZXMgcG9zaXRpb24gYW5kIGFsaWdubWVudC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBqUXVlcnkgb2JqZWN0IGZvciB0aGUgZWxlbWVudCBiZWluZyBwb3NpdGlvbmVkLlxuICogQHBhcmFtIHtqUXVlcnl9IGFuY2hvciAtIGpRdWVyeSBvYmplY3QgZm9yIHRoZSBlbGVtZW50J3MgYW5jaG9yIHBvaW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHBvc2l0aW9uIC0gYSBzdHJpbmcgcmVsYXRpbmcgdG8gdGhlIGRlc2lyZWQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnQsIHJlbGF0aXZlIHRvIGl0J3MgYW5jaG9yXG4gKiBAcGFyYW0ge051bWJlcn0gdk9mZnNldCAtIGludGVnZXIgcGl4ZWwgdmFsdWUgb2YgZGVzaXJlZCB2ZXJ0aWNhbCBzZXBhcmF0aW9uIGJldHdlZW4gYW5jaG9yIGFuZCBlbGVtZW50LlxuICogQHBhcmFtIHtOdW1iZXJ9IGhPZmZzZXQgLSBpbnRlZ2VyIHBpeGVsIHZhbHVlIG9mIGRlc2lyZWQgaG9yaXpvbnRhbCBzZXBhcmF0aW9uIGJldHdlZW4gYW5jaG9yIGFuZCBlbGVtZW50LlxuICogQHBhcmFtIHtCb29sZWFufSBpc092ZXJmbG93IC0gaWYgYSBjb2xsaXNpb24gZXZlbnQgaXMgZGV0ZWN0ZWQsIHNldHMgdG8gdHJ1ZSB0byBkZWZhdWx0IHRoZSBlbGVtZW50IHRvIGZ1bGwgd2lkdGggLSBhbnkgZGVzaXJlZCBvZmZzZXQuXG4gKiBUT0RPIGFsdGVyL3Jld3JpdGUgdG8gd29yayB3aXRoIGBlbWAgdmFsdWVzIGFzIHdlbGwvaW5zdGVhZCBvZiBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gR2V0RXhwbGljaXRPZmZzZXRzKGVsZW1lbnQsIGFuY2hvciwgcG9zaXRpb24sIGFsaWdubWVudCwgdk9mZnNldCwgaE9mZnNldCwgaXNPdmVyZmxvdykge1xuICB2YXIgJGVsZURpbXMgPSBHZXREaW1lbnNpb25zKGVsZW1lbnQpLFxuICAgICAgJGFuY2hvckRpbXMgPSBhbmNob3IgPyBHZXREaW1lbnNpb25zKGFuY2hvcikgOiBudWxsO1xuXG4gICAgICB2YXIgdG9wVmFsLCBsZWZ0VmFsO1xuXG4gIGlmICgkYW5jaG9yRGltcyAhPT0gbnVsbCkge1xuICAvLyBzZXQgcG9zaXRpb24gcmVsYXRlZCBhdHRyaWJ1dGVcbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wIC0gKCRlbGVEaW1zLmhlaWdodCArIHZPZmZzZXQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHRvcFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC50b3AgKyAkYW5jaG9yRGltcy5oZWlnaHQgKyB2T2Zmc2V0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICBsZWZ0VmFsID0gJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgLSAoJGVsZURpbXMud2lkdGggKyBoT2Zmc2V0KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCArICRhbmNob3JEaW1zLndpZHRoICsgaE9mZnNldDtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gc2V0IGFsaWdubWVudCByZWxhdGVkIGF0dHJpYnV0ZVxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgbGVmdFZhbCA9ICRhbmNob3JEaW1zLm9mZnNldC5sZWZ0ICsgaE9mZnNldDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIGxlZnRWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQubGVmdCAtICRlbGVEaW1zLndpZHRoICsgJGFuY2hvckRpbXMud2lkdGggLSBoT2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIGxlZnRWYWwgPSBpc092ZXJmbG93ID8gaE9mZnNldCA6ICgoJGFuY2hvckRpbXMub2Zmc2V0LmxlZnQgKyAoJGFuY2hvckRpbXMud2lkdGggLyAyKSkgLSAoJGVsZURpbXMud2lkdGggLyAyKSkgKyBoT2Zmc2V0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmlnaHQnOlxuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wIC0gdk9mZnNldCArICRhbmNob3JEaW1zLmhlaWdodCAtICRlbGVEaW1zLmhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0b3BWYWwgPSAkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgdk9mZnNldFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIHRvcFZhbCA9ICgkYW5jaG9yRGltcy5vZmZzZXQudG9wICsgdk9mZnNldCArICgkYW5jaG9yRGltcy5oZWlnaHQgLyAyKSkgLSAoJGVsZURpbXMuaGVpZ2h0IC8gMilcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIH1cblxuICByZXR1cm4ge3RvcDogdG9wVmFsLCBsZWZ0OiBsZWZ0VmFsfTtcbn1cblxuZXhwb3J0IHtCb3h9O1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBSdW5zIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBpbWFnZXMgYXJlIGZ1bGx5IGxvYWRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZXMgLSBJbWFnZShzKSB0byBjaGVjayBpZiBsb2FkZWQuXG4gKiBAcGFyYW0ge0Z1bmN9IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZC5cbiAqL1xuZnVuY3Rpb24gb25JbWFnZXNMb2FkZWQoaW1hZ2VzLCBjYWxsYmFjayl7XG4gIHZhciB1bmxvYWRlZCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIGltYWdlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgLy8gQ2hlY2sgaWYgaW1hZ2UgaXMgbG9hZGVkXG4gICAgaWYgKHRoaXMuY29tcGxldGUgJiYgdHlwZW9mIHRoaXMubmF0dXJhbFdpZHRoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgc2luZ2xlSW1hZ2VMb2FkZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgYWJvdmUgY2hlY2sgZmFpbGVkLCBzaW11bGF0ZSBsb2FkaW5nIG9uIGRldGFjaGVkIGVsZW1lbnQuXG4gICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIC8vIFN0aWxsIGNvdW50IGltYWdlIGFzIGxvYWRlZCBpZiBpdCBmaW5hbGl6ZXMgd2l0aCBhbiBlcnJvci5cbiAgICAgIHZhciBldmVudHMgPSBcImxvYWQuemYuaW1hZ2VzIGVycm9yLnpmLmltYWdlc1wiO1xuICAgICAgJChpbWFnZSkub25lKGV2ZW50cywgZnVuY3Rpb24gbWUoKXtcbiAgICAgICAgLy8gVW5iaW5kIHRoZSBldmVudCBsaXN0ZW5lcnMuIFdlJ3JlIHVzaW5nICdvbmUnIGJ1dCBvbmx5IG9uZSBvZiB0aGUgdHdvIGV2ZW50cyB3aWxsIGhhdmUgZmlyZWQuXG4gICAgICAgICQodGhpcykub2ZmKGV2ZW50cywgbWUpO1xuICAgICAgICBzaW5nbGVJbWFnZUxvYWRlZCgpO1xuICAgICAgfSk7XG4gICAgICBpbWFnZS5zcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2luZ2xlSW1hZ2VMb2FkZWQoKSB7XG4gICAgdW5sb2FkZWQtLTtcbiAgICBpZiAodW5sb2FkZWQgPT09IDApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IG9uSW1hZ2VzTG9hZGVkIH07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqIFRoaXMgdXRpbCB3YXMgY3JlYXRlZCBieSBNYXJpdXMgT2xiZXJ0eiAqXG4gKiBQbGVhc2UgdGhhbmsgTWFyaXVzIG9uIEdpdEh1YiAvb3dsYmVydHogKlxuICogb3IgdGhlIHdlYiBodHRwOi8vd3d3Lm1hcml1c29sYmVydHouZGUvICpcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgcnRsIGFzIFJ0bCB9IGZyb20gJy4vZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcblxuY29uc3Qga2V5Q29kZXMgPSB7XG4gIDk6ICdUQUInLFxuICAxMzogJ0VOVEVSJyxcbiAgMjc6ICdFU0NBUEUnLFxuICAzMjogJ1NQQUNFJyxcbiAgMzU6ICdFTkQnLFxuICAzNjogJ0hPTUUnLFxuICAzNzogJ0FSUk9XX0xFRlQnLFxuICAzODogJ0FSUk9XX1VQJyxcbiAgMzk6ICdBUlJPV19SSUdIVCcsXG4gIDQwOiAnQVJST1dfRE9XTidcbn1cblxudmFyIGNvbW1hbmRzID0ge31cblxuLy8gRnVuY3Rpb25zIHB1bGxlZCBvdXQgdG8gYmUgcmVmZXJlbmNlYWJsZSBmcm9tIGludGVybmFsc1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZSgkZWxlbWVudCkge1xuICBpZighJGVsZW1lbnQpIHtyZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuICRlbGVtZW50LmZpbmQoJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsICpbdGFiaW5kZXhdLCAqW2NvbnRlbnRlZGl0YWJsZV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEkKHRoaXMpLmlzKCc6dmlzaWJsZScpIHx8ICQodGhpcykuYXR0cigndGFiaW5kZXgnKSA8IDApIHsgcmV0dXJuIGZhbHNlOyB9IC8vb25seSBoYXZlIHZpc2libGUgZWxlbWVudHMgYW5kIHRob3NlIHRoYXQgaGF2ZSBhIHRhYmluZGV4IGdyZWF0ZXIgb3IgZXF1YWwgMFxuICAgIHJldHVybiB0cnVlO1xuICB9KVxuICAuc29ydCggZnVuY3Rpb24oIGEsIGIgKSB7XG4gICAgaWYgKCQoYSkuYXR0cigndGFiaW5kZXgnKSA9PT0gJChiKS5hdHRyKCd0YWJpbmRleCcpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgbGV0IGFUYWJJbmRleCA9IHBhcnNlSW50KCQoYSkuYXR0cigndGFiaW5kZXgnKSwgMTApLFxuICAgICAgYlRhYkluZGV4ID0gcGFyc2VJbnQoJChiKS5hdHRyKCd0YWJpbmRleCcpLCAxMCk7XG4gICAgLy8gVW5kZWZpbmVkIGlzIHRyZWF0ZWQgdGhlIHNhbWUgYXMgMFxuICAgIGlmICh0eXBlb2YgJChhKS5hdHRyKCd0YWJpbmRleCcpID09PSAndW5kZWZpbmVkJyAmJiBiVGFiSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiAkKGIpLmF0dHIoJ3RhYmluZGV4JykgPT09ICd1bmRlZmluZWQnICYmIGFUYWJJbmRleCA+IDApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKGFUYWJJbmRleCA9PT0gMCAmJiBiVGFiSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaWYgKGJUYWJJbmRleCA9PT0gMCAmJiBhVGFiSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChhVGFiSW5kZXggPCBiVGFiSW5kZXgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKGFUYWJJbmRleCA+IGJUYWJJbmRleCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VLZXkoZXZlbnQpIHtcbiAgdmFyIGtleSA9IGtleUNvZGVzW2V2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGVdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQud2hpY2gpLnRvVXBwZXJDYXNlKCk7XG5cbiAgLy8gUmVtb3ZlIHVuLXByaW50YWJsZSBjaGFyYWN0ZXJzLCBlLmcuIGZvciBgZnJvbUNoYXJDb2RlYCBjYWxscyBmb3IgQ1RSTCBvbmx5IGV2ZW50c1xuICBrZXkgPSBrZXkucmVwbGFjZSgvXFxXKy8sICcnKTtcblxuICBpZiAoZXZlbnQuc2hpZnRLZXkpIGtleSA9IGBTSElGVF8ke2tleX1gO1xuICBpZiAoZXZlbnQuY3RybEtleSkga2V5ID0gYENUUkxfJHtrZXl9YDtcbiAgaWYgKGV2ZW50LmFsdEtleSkga2V5ID0gYEFMVF8ke2tleX1gO1xuXG4gIC8vIFJlbW92ZSB0cmFpbGluZyB1bmRlcnNjb3JlLCBpbiBjYXNlIG9ubHkgbW9kaWZpZXJzIHdlcmUgdXNlZCAoZS5nLiBvbmx5IGBDVFJMX0FMVGApXG4gIGtleSA9IGtleS5yZXBsYWNlKC9fJC8sICcnKTtcblxuICByZXR1cm4ga2V5O1xufVxuXG52YXIgS2V5Ym9hcmQgPSB7XG4gIGtleXM6IGdldEtleUNvZGVzKGtleUNvZGVzKSxcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSAoa2V5Ym9hcmQpIGV2ZW50IGFuZCByZXR1cm5zIGEgU3RyaW5nIHRoYXQgcmVwcmVzZW50cyBpdHMga2V5XG4gICAqIENhbiBiZSB1c2VkIGxpa2UgRm91bmRhdGlvbi5wYXJzZUtleShldmVudCkgPT09IEZvdW5kYXRpb24ua2V5cy5TUEFDRVxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHJldHVybiBTdHJpbmcga2V5IC0gU3RyaW5nIHRoYXQgcmVwcmVzZW50cyB0aGUga2V5IHByZXNzZWRcbiAgICovXG4gIHBhcnNlS2V5OiBwYXJzZUtleSxcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgZ2l2ZW4gKGtleWJvYXJkKSBldmVudFxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIHRoZSBldmVudCBnZW5lcmF0ZWQgYnkgdGhlIGV2ZW50IGhhbmRsZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudCAtIEZvdW5kYXRpb24gY29tcG9uZW50J3MgbmFtZSwgZS5nLiBTbGlkZXIgb3IgUmV2ZWFsXG4gICAqIEBwYXJhbSB7T2JqZWN0c30gZnVuY3Rpb25zIC0gY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdGhhdCBhcmUgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGhhbmRsZUtleShldmVudCwgY29tcG9uZW50LCBmdW5jdGlvbnMpIHtcbiAgICB2YXIgY29tbWFuZExpc3QgPSBjb21tYW5kc1tjb21wb25lbnRdLFxuICAgICAga2V5Q29kZSA9IHRoaXMucGFyc2VLZXkoZXZlbnQpLFxuICAgICAgY21kcyxcbiAgICAgIGNvbW1hbmQsXG4gICAgICBmbjtcblxuICAgIGlmICghY29tbWFuZExpc3QpIHJldHVybiBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCBub3QgZGVmaW5lZCEnKTtcblxuICAgIC8vIElnbm9yZSB0aGUgZXZlbnQgaWYgaXQgd2FzIGFscmVhZHkgaGFuZGxlZFxuICAgIGlmIChldmVudC56ZklzS2V5SGFuZGxlZCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgLy8gVGhpcyBjb21wb25lbnQgZG9lcyBub3QgZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIGx0ciBhbmQgcnRsXG4gICAgaWYgKHR5cGVvZiBjb21tYW5kTGlzdC5sdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNtZHMgPSBjb21tYW5kTGlzdDsgLy8gdXNlIHBsYWluIGxpc3RcbiAgICB9IGVsc2UgeyAvLyBtZXJnZSBsdHIgYW5kIHJ0bDogaWYgZG9jdW1lbnQgaXMgcnRsLCBydGwgb3ZlcndyaXRlcyBsdHIgYW5kIHZpY2UgdmVyc2FcbiAgICAgICAgaWYgKFJ0bCgpKSBjbWRzID0gJC5leHRlbmQoe30sIGNvbW1hbmRMaXN0Lmx0ciwgY29tbWFuZExpc3QucnRsKTtcblxuICAgICAgICBlbHNlIGNtZHMgPSAkLmV4dGVuZCh7fSwgY29tbWFuZExpc3QucnRsLCBjb21tYW5kTGlzdC5sdHIpO1xuICAgIH1cbiAgICBjb21tYW5kID0gY21kc1trZXlDb2RlXTtcblxuICAgIGZuID0gZnVuY3Rpb25zW2NvbW1hbmRdO1xuICAgICAvLyBFeGVjdXRlIHRoZSBoYW5kbGVyIGlmIGZvdW5kXG4gICAgaWYgKGZuICYmIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHJldHVyblZhbHVlID0gZm4uYXBwbHkoKTtcblxuICAgICAgLy8gTWFyayB0aGUgZXZlbnQgYXMgXCJoYW5kbGVkXCIgdG8gcHJldmVudCBmdXR1cmUgaGFuZGxpbmdzXG4gICAgICBldmVudC56ZklzS2V5SGFuZGxlZCA9IHRydWU7XG5cbiAgICAgIC8vIEV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgaGFuZGxlZFxuICAgICAgaWYgKGZ1bmN0aW9ucy5oYW5kbGVkIHx8IHR5cGVvZiBmdW5jdGlvbnMuaGFuZGxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGZ1bmN0aW9ucy5oYW5kbGVkKHJldHVyblZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgIC8vIEV4ZWN1dGUgZnVuY3Rpb24gd2hlbiBldmVudCB3YXMgbm90IGhhbmRsZWRcbiAgICAgIGlmIChmdW5jdGlvbnMudW5oYW5kbGVkIHx8IHR5cGVvZiBmdW5jdGlvbnMudW5oYW5kbGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZnVuY3Rpb25zLnVuaGFuZGxlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGZvY3VzYWJsZSBlbGVtZW50cyB3aXRoaW4gdGhlIGdpdmVuIGAkZWxlbWVudGBcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbGVtZW50IC0galF1ZXJ5IG9iamVjdCB0byBzZWFyY2ggd2l0aGluXG4gICAqIEByZXR1cm4ge2pRdWVyeX0gJGZvY3VzYWJsZSAtIGFsbCBmb2N1c2FibGUgZWxlbWVudHMgd2l0aGluIGAkZWxlbWVudGBcbiAgICovXG5cbiAgZmluZEZvY3VzYWJsZTogZmluZEZvY3VzYWJsZSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IG5hbWUgbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29tcG9uZW50IC0gRm91bmRhdGlvbiBjb21wb25lbnQsIGUuZy4gU2xpZGVyIG9yIFJldmVhbFxuICAgKiBAcmV0dXJuIFN0cmluZyBjb21wb25lbnROYW1lXG4gICAqL1xuXG4gIHJlZ2lzdGVyKGNvbXBvbmVudE5hbWUsIGNtZHMpIHtcbiAgICBjb21tYW5kc1tjb21wb25lbnROYW1lXSA9IGNtZHM7XG4gIH0sXG5cblxuICAvLyBUT0RPOTQzODogVGhlc2UgcmVmZXJlbmNlcyB0byBLZXlib2FyZCBuZWVkIHRvIG5vdCByZXF1aXJlIGdsb2JhbC4gV2lsbCAndGhpcycgd29yayBpbiB0aGlzIGNvbnRleHQ/XG4gIC8vXG4gIC8qKlxuICAgKiBUcmFwcyB0aGUgZm9jdXMgaW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gdHJhcCB0aGUgZm91Y3MgaW50by5cbiAgICovXG4gIHRyYXBGb2N1cygkZWxlbWVudCkge1xuICAgIHZhciAkZm9jdXNhYmxlID0gZmluZEZvY3VzYWJsZSgkZWxlbWVudCksXG4gICAgICAgICRmaXJzdEZvY3VzYWJsZSA9ICRmb2N1c2FibGUuZXEoMCksXG4gICAgICAgICRsYXN0Rm9jdXNhYmxlID0gJGZvY3VzYWJsZS5lcSgtMSk7XG5cbiAgICAkZWxlbWVudC5vbigna2V5ZG93bi56Zi50cmFwZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGxhc3RGb2N1c2FibGVbMF0gJiYgcGFyc2VLZXkoZXZlbnQpID09PSAnVEFCJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PT0gJGZpcnN0Rm9jdXNhYmxlWzBdICYmIHBhcnNlS2V5KGV2ZW50KSA9PT0gJ1NISUZUX1RBQicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGxhc3RGb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSB0cmFwcGVkIGZvY3VzIGZyb20gdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGVsZW1lbnQgIGpRdWVyeSBvYmplY3QgdG8gcmVsZWFzZSB0aGUgZm9jdXMgZm9yLlxuICAgKi9cbiAgcmVsZWFzZUZvY3VzKCRlbGVtZW50KSB7XG4gICAgJGVsZW1lbnQub2ZmKCdrZXlkb3duLnpmLnRyYXBmb2N1cycpO1xuICB9XG59XG5cbi8qXG4gKiBDb25zdGFudHMgZm9yIGVhc2llciBjb21wYXJpbmcuXG4gKiBDYW4gYmUgdXNlZCBsaWtlIEZvdW5kYXRpb24ucGFyc2VLZXkoZXZlbnQpID09PSBGb3VuZGF0aW9uLmtleXMuU1BBQ0VcbiAqL1xuZnVuY3Rpb24gZ2V0S2V5Q29kZXMoa2NzKSB7XG4gIHZhciBrID0ge307XG4gIGZvciAodmFyIGtjIGluIGtjcykge1xuICAgIGlmIChrY3MuaGFzT3duUHJvcGVydHkoa2MpKSBrW2tjc1trY11dID0ga2NzW2tjXTtcbiAgfVxuICByZXR1cm4gaztcbn1cblxuZXhwb3J0IHtLZXlib2FyZH07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG4vLyBEZWZhdWx0IHNldCBvZiBtZWRpYSBxdWVyaWVzXG4vLyBjb25zdCBkZWZhdWx0UXVlcmllcyA9IHtcbi8vICAgJ2RlZmF1bHQnIDogJ29ubHkgc2NyZWVuJyxcbi8vICAgbGFuZHNjYXBlIDogJ29ubHkgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSknLFxuLy8gICBwb3J0cmFpdCA6ICdvbmx5IHNjcmVlbiBhbmQgKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknLFxuLy8gICByZXRpbmEgOiAnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIpLCcgK1xuLy8gICAgICdvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMiksJyArXG4vLyAgICAgJ29ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMi8xKSwnICtcbi8vICAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAyKSwnICtcbi8vICAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMTkyZHBpKSwnICtcbi8vICAgICAnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMmRwcHgpJ1xuLy8gICB9O1xuXG5cbi8vIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy5cbi8vIEF1dGhvcnMgJiBjb3B5cmlnaHQgwqkgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gTUlUIGxpY2Vuc2Vcbi8qIGVzbGludC1kaXNhYmxlICovXG53aW5kb3cubWF0Y2hNZWRpYSB8fCAod2luZG93Lm1hdGNoTWVkaWEgPSAoZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gIC8vIEZvciB0aG9zZSB0aGF0IGRvbid0IHN1cHBvcnQgbWF0Y2hNZWRpdW1cbiAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgdmFyIHN0eWxlICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgIHNjcmlwdCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdLFxuICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICBpZiAoIXNjcmlwdCkge1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcbiAgICB9XG5cbiAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICBtYXRjaE1lZGl1bTogZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gJ0BtZWRpYSAnICsgbWVkaWEgKyAneyAjbWF0Y2htZWRpYWpzLXRlc3QgeyB3aWR0aDogMXB4OyB9IH0nO1xuXG4gICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgIHJldHVybiBpbmZvLndpZHRoID09PSAnMXB4JztcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hdGNoZXM6IHN0eWxlTWVkaWEubWF0Y2hNZWRpdW0obWVkaWEgfHwgJ2FsbCcpLFxuICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgfTtcbiAgfTtcbn0pKCkpO1xuLyogZXNsaW50LWVuYWJsZSAqL1xuXG52YXIgTWVkaWFRdWVyeSA9IHtcbiAgcXVlcmllczogW10sXG5cbiAgY3VycmVudDogJycsXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBtZWRpYSBxdWVyeSBoZWxwZXIsIGJ5IGV4dHJhY3RpbmcgdGhlIGJyZWFrcG9pbnQgbGlzdCBmcm9tIHRoZSBDU1MgYW5kIGFjdGl2YXRpbmcgdGhlIGJyZWFrcG9pbnQgd2F0Y2hlci5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW5pdCgpIHtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgaW5pdGlhbGl6YXRpb24gaXMgb25seSBkb25lIG9uY2Ugd2hlbiBjYWxsaW5nIF9pbml0KCkgc2V2ZXJhbCB0aW1lc1xuICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgJG1ldGEgPSAkKCdtZXRhLmZvdW5kYXRpb24tbXEnKTtcbiAgICBpZighJG1ldGEubGVuZ3RoKXtcbiAgICAgICQoJzxtZXRhIGNsYXNzPVwiZm91bmRhdGlvbi1tcVwiIG5hbWU9XCJmb3VuZGF0aW9uLW1xXCIgY29udGVudD4nKS5hcHBlbmRUbyhkb2N1bWVudC5oZWFkKTtcbiAgICB9XG5cbiAgICB2YXIgZXh0cmFjdGVkU3R5bGVzID0gJCgnLmZvdW5kYXRpb24tbXEnKS5jc3MoJ2ZvbnQtZmFtaWx5Jyk7XG4gICAgdmFyIG5hbWVkUXVlcmllcztcblxuICAgIG5hbWVkUXVlcmllcyA9IHBhcnNlU3R5bGVUb09iamVjdChleHRyYWN0ZWRTdHlsZXMpO1xuXG4gICAgc2VsZi5xdWVyaWVzID0gW107IC8vIHJlc2V0XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gbmFtZWRRdWVyaWVzKSB7XG4gICAgICBpZihuYW1lZFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBzZWxmLnF1ZXJpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHZhbHVlOiBgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7bmFtZWRRdWVyaWVzW2tleV19KWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKTtcblxuICAgIHRoaXMuX3dhdGNoZXIoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVpbml0aWFsaXplcyB0aGUgbWVkaWEgcXVlcnkgaGVscGVyLlxuICAgKiBVc2VmdWwgaWYgeW91ciBDU1MgYnJlYWtwb2ludCBjb25maWd1cmF0aW9uIGhhcyBqdXN0IGJlZW4gbG9hZGVkIG9yIGhhcyBjaGFuZ2VkIHNpbmNlIHRoZSBpbml0aWFsaXphdGlvbi5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVJbml0KCkge1xuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgYXQgbGVhc3QgYXMgd2lkZSBhcyBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBpZiBpdCdzIHNtYWxsZXIuXG4gICAqL1xuICBhdExlYXN0KHNpemUpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLmdldChzaXplKTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgd2l0aGluIHRoZSBnaXZlbiBicmVha3BvaW50LlxuICAgKiBJZiBzbWFsbGVyIHRoYW4gdGhlIGJyZWFrcG9pbnQgb2YgbGFyZ2VyIHRoYW4gaXRzIHVwcGVyIGxpbWl0IGl0IHJldHVybnMgZmFsc2UuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGJyZWFrcG9pbnQgbWF0Y2hlcywgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBvbmx5KHNpemUpIHtcbiAgICByZXR1cm4gc2l6ZSA9PT0gdGhpcy5fZ2V0Q3VycmVudFNpemUoKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gaXMgd2l0aGluIGEgYnJlYWtwb2ludCBvciBzbWFsbGVyLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNpemUgLSBOYW1lIG9mIHRoZSBicmVha3BvaW50IHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBicmVha3BvaW50IG1hdGNoZXMsIGBmYWxzZWAgaWYgaXQncyBsYXJnZXIuXG4gICAqL1xuICB1cFRvKHNpemUpIHtcbiAgICBjb25zdCBuZXh0U2l6ZSA9IHRoaXMubmV4dChzaXplKTtcblxuICAgIC8vIElmIHRoZSBuZXh0IGJyZWFrcG9pbnQgZG9lcyBub3QgbWF0Y2gsIHRoZSBzY3JlZW4gaXMgc21hbGxlciB0aGFuXG4gICAgLy8gdGhlIHVwcGVyIGxpbWl0IG9mIHRoaXMgYnJlYWtwb2ludC5cbiAgICBpZiAobmV4dFNpemUpIHtcbiAgICAgIHJldHVybiAhdGhpcy5hdExlYXN0KG5leHRTaXplKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBubyBuZXh0IGJyZWFrcG9pbnQsIHRoZSBcInNpemVcIiBicmVha3BvaW50IGRvZXMgbm90IGhhdmVcbiAgICAvLyBhbiB1cHBlciBsaW1pdCBhbmQgdGhlIHNjcmVlbiB3aWxsIGFsd2F5cyBiZSB3aXRoaW4gaXQgb3Igc21hbGxlci5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzY3JlZW4gbWF0Y2hlcyB0byBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gY2hlY2ssIGVpdGhlciAnc21hbGwgb25seScgb3IgJ3NtYWxsJy4gT21pdHRpbmcgJ29ubHknIGZhbGxzIGJhY2sgdG8gdXNpbmcgYXRMZWFzdCgpIG1ldGhvZC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgYnJlYWtwb2ludCBtYXRjaGVzLCBgZmFsc2VgIGlmIGl0IGRvZXMgbm90LlxuICAgKi9cbiAgaXMoc2l6ZSkge1xuICAgIGNvbnN0IHBhcnRzID0gc2l6ZS50cmltKCkuc3BsaXQoJyAnKS5maWx0ZXIocCA9PiAhIXAubGVuZ3RoKTtcbiAgICBjb25zdCBbYnBTaXplLCBicE1vZGlmaWVyID0gJyddID0gcGFydHM7XG5cbiAgICAvLyBPbmx5IHRoZSBicmVha3BvbnRcbiAgICBpZiAoYnBNb2RpZmllciA9PT0gJ29ubHknKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbmx5KGJwU2l6ZSk7XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IHRoZSBicmVha3BvaW50IChpbmNsdWRlZClcbiAgICBpZiAoIWJwTW9kaWZpZXIgfHwgYnBNb2RpZmllciA9PT0gJ3VwJykge1xuICAgICAgcmV0dXJuIHRoaXMuYXRMZWFzdChicFNpemUpO1xuICAgIH1cbiAgICAvLyBVcCB0byB0aGUgYnJlYWtwb2ludCAoaW5jbHVkZWQpXG4gICAgaWYgKGJwTW9kaWZpZXIgPT09ICdkb3duJykge1xuICAgICAgcmV0dXJuIHRoaXMudXBUbyhicFNpemUpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBJbnZhbGlkIGJyZWFrcG9pbnQgcGFzc2VkIHRvIE1lZGlhUXVlcnkuaXMoKS5cbiAgICAgIEV4cGVjdGVkIGEgYnJlYWtwb2ludCBuYW1lIGZvcm1hdHRlZCBsaWtlIFwiPHNpemU+IDxtb2RpZmllcj5cIiwgZ290IFwiJHtzaXplfVwiLlxuICAgIGApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtZWRpYSBxdWVyeSBvZiBhIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQgdG8gZ2V0LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfG51bGx9IC0gVGhlIG1lZGlhIHF1ZXJ5IG9mIHRoZSBicmVha3BvaW50LCBvciBgbnVsbGAgaWYgdGhlIGJyZWFrcG9pbnQgZG9lc24ndCBleGlzdC5cbiAgICovXG4gIGdldChzaXplKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLnF1ZXJpZXMpIHtcbiAgICAgIGlmKHRoaXMucXVlcmllcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJpZXNbaV07XG4gICAgICAgIGlmIChzaXplID09PSBxdWVyeS5uYW1lKSByZXR1cm4gcXVlcnkudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYnJlYWtwb2ludCBmb2xsb3dpbmcgdGhlIGdpdmVuIGJyZWFrcG9pbnQuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIE5hbWUgb2YgdGhlIGJyZWFrcG9pbnQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gLSBUaGUgbmFtZSBvZiB0aGUgZm9sbG93aW5nIGJyZWFrcG9pbnQsIG9yIGBudWxsYCBpZiB0aGUgcGFzc2VkIGJyZWFrcG9pbnQgd2FzIHRoZSBsYXN0IG9uZS5cbiAgICovXG4gIG5leHQoc2l6ZSkge1xuICAgIGNvbnN0IHF1ZXJ5SW5kZXggPSB0aGlzLnF1ZXJpZXMuZmluZEluZGV4KChxKSA9PiB0aGlzLl9nZXRRdWVyeU5hbWUocSkgPT09IHNpemUpO1xuICAgIGlmIChxdWVyeUluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgVW5rbm93biBicmVha3BvaW50IFwiJHtzaXplfVwiIHBhc3NlZCB0byBNZWRpYVF1ZXJ5Lm5leHQoKS5cbiAgICAgICAgRW5zdXJlIGl0IGlzIHByZXNlbnQgaW4geW91ciBTYXNzIFwiJGJyZWFrcG9pbnRzXCIgc2V0dGluZy5cbiAgICAgIGApO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRRdWVyeSA9IHRoaXMucXVlcmllc1txdWVyeUluZGV4ICsgMV07XG4gICAgcmV0dXJuIG5leHRRdWVyeSA/IG5leHRRdWVyeS5uYW1lIDogbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgYnJlYWtwb2ludCByZWxhdGVkIHRvIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gdmFsdWUgLSBCcmVha3BvaW50IG5hbWUgb3IgcXVlcnkgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBOYW1lIG9mIHRoZSBicmVha3BvaW50LlxuICAgKi9cbiAgX2dldFF1ZXJ5TmFtZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKVxuICAgICAgcmV0dXJuIHZhbHVlLm5hbWU7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXG4gICAgICBJbnZhbGlkIHZhbHVlIHBhc3NlZCB0byBNZWRpYVF1ZXJ5Ll9nZXRRdWVyeU5hbWUoKS5cbiAgICAgIEV4cGVjdGVkIGEgYnJlYWtwb2ludCBuYW1lIChTdHJpbmcpIG9yIGEgYnJlYWtwb2ludCBxdWVyeSAoT2JqZWN0KSwgZ290IFwiJHt2YWx1ZX1cIiAoJHt0eXBlb2YgdmFsdWV9KVxuICAgIGApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQgbmFtZSBieSB0ZXN0aW5nIGV2ZXJ5IGJyZWFrcG9pbnQgYW5kIHJldHVybmluZyB0aGUgbGFzdCBvbmUgdG8gbWF0Y2ggKHRoZSBiaWdnZXN0IG9uZSkuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBOYW1lIG9mIHRoZSBjdXJyZW50IGJyZWFrcG9pbnQuXG4gICAqL1xuICBfZ2V0Q3VycmVudFNpemUoKSB7XG4gICAgdmFyIG1hdGNoZWQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyaWVzW2ldO1xuXG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEocXVlcnkudmFsdWUpLm1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZCA9IHF1ZXJ5O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVkICYmIHRoaXMuX2dldFF1ZXJ5TmFtZShtYXRjaGVkKTtcbiAgfSxcblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBicmVha3BvaW50IHdhdGNoZXIsIHdoaWNoIGZpcmVzIGFuIGV2ZW50IG9uIHRoZSB3aW5kb3cgd2hlbmV2ZXIgdGhlIGJyZWFrcG9pbnQgY2hhbmdlcy5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd2F0Y2hlcigpIHtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS56Zi50cmlnZ2VyJywgKCkgPT4ge1xuICAgICAgdmFyIG5ld1NpemUgPSB0aGlzLl9nZXRDdXJyZW50U2l6ZSgpLCBjdXJyZW50U2l6ZSA9IHRoaXMuY3VycmVudDtcblxuICAgICAgaWYgKG5ld1NpemUgIT09IGN1cnJlbnRTaXplKSB7XG4gICAgICAgIC8vIENoYW5nZSB0aGUgY3VycmVudCBtZWRpYSBxdWVyeVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXdTaXplO1xuXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgbWVkaWEgcXVlcnkgY2hhbmdlIG9uIHRoZSB3aW5kb3dcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2NoYW5nZWQuemYubWVkaWFxdWVyeScsIFtuZXdTaXplLCBjdXJyZW50U2l6ZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5cblxuLy8gVGhhbmsgeW91OiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZ1xuZnVuY3Rpb24gcGFyc2VTdHlsZVRvT2JqZWN0KHN0cikge1xuICB2YXIgc3R5bGVPYmplY3QgPSB7fTtcblxuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gIH1cblxuICBzdHIgPSBzdHIudHJpbSgpLnNsaWNlKDEsIC0xKTsgLy8gYnJvd3NlcnMgcmUtcXVvdGUgc3RyaW5nIHN0eWxlIHZhbHVlc1xuXG4gIGlmICghc3RyKSB7XG4gICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICB9XG5cbiAgc3R5bGVPYmplY3QgPSBzdHIuc3BsaXQoJyYnKS5yZWR1Y2UoZnVuY3Rpb24ocmV0LCBwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IHBhcnRzWzBdO1xuICAgIHZhciB2YWwgPSBwYXJ0c1sxXTtcbiAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcblxuICAgIC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG4gICAgLy8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG4gICAgaWYgKCFyZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0W2tleV0gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuICAgICAgcmV0W2tleV0ucHVzaCh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSwge30pO1xuXG4gIHJldHVybiBzdHlsZU9iamVjdDtcbn1cblxuZXhwb3J0IHtNZWRpYVF1ZXJ5fTtcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uZW5kIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuXG4vKipcbiAqIE1vdGlvbiBtb2R1bGUuXG4gKiBAbW9kdWxlIGZvdW5kYXRpb24ubW90aW9uXG4gKi9cblxuY29uc3QgaW5pdENsYXNzZXMgICA9IFsnbXVpLWVudGVyJywgJ211aS1sZWF2ZSddO1xuY29uc3QgYWN0aXZlQ2xhc3NlcyA9IFsnbXVpLWVudGVyLWFjdGl2ZScsICdtdWktbGVhdmUtYWN0aXZlJ107XG5cbmNvbnN0IE1vdGlvbiA9IHtcbiAgYW5pbWF0ZUluOiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZSh0cnVlLCBlbGVtZW50LCBhbmltYXRpb24sIGNiKTtcbiAgfSxcblxuICBhbmltYXRlT3V0OiBmdW5jdGlvbihlbGVtZW50LCBhbmltYXRpb24sIGNiKSB7XG4gICAgYW5pbWF0ZShmYWxzZSwgZWxlbWVudCwgYW5pbWF0aW9uLCBjYik7XG4gIH1cbn1cblxuZnVuY3Rpb24gTW92ZShkdXJhdGlvbiwgZWxlbSwgZm4pe1xuICB2YXIgYW5pbSwgcHJvZywgc3RhcnQgPSBudWxsO1xuXG4gIGlmIChkdXJhdGlvbiA9PT0gMCkge1xuICAgIGZuLmFwcGx5KGVsZW0pO1xuICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUodHMpe1xuICAgIGlmKCFzdGFydCkgc3RhcnQgPSB0cztcbiAgICBwcm9nID0gdHMgLSBzdGFydDtcbiAgICBmbi5hcHBseShlbGVtKTtcblxuICAgIGlmKHByb2cgPCBkdXJhdGlvbil7IGFuaW0gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmUsIGVsZW0pOyB9XG4gICAgZWxzZXtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltKTtcbiAgICAgIGVsZW0udHJpZ2dlcignZmluaXNoZWQuemYuYW5pbWF0ZScsIFtlbGVtXSkudHJpZ2dlckhhbmRsZXIoJ2ZpbmlzaGVkLnpmLmFuaW1hdGUnLCBbZWxlbV0pO1xuICAgIH1cbiAgfVxuICBhbmltID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShtb3ZlKTtcbn1cblxuLyoqXG4gKiBBbmltYXRlcyBhbiBlbGVtZW50IGluIG9yIG91dCB1c2luZyBhIENTUyB0cmFuc2l0aW9uIGNsYXNzLlxuICogQGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCb29sZWFufSBpc0luIC0gRGVmaW5lcyBpZiB0aGUgYW5pbWF0aW9uIGlzIGluIG9yIG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0galF1ZXJ5IG9yIEhUTUwgb2JqZWN0IHRvIGFuaW1hdGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gYW5pbWF0aW9uIC0gQ1NTIGNsYXNzIHRvIHVzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gQ2FsbGJhY2sgdG8gcnVuIHdoZW4gYW5pbWF0aW9uIGlzIGZpbmlzaGVkLlxuICovXG5mdW5jdGlvbiBhbmltYXRlKGlzSW4sIGVsZW1lbnQsIGFuaW1hdGlvbiwgY2IpIHtcbiAgZWxlbWVudCA9ICQoZWxlbWVudCkuZXEoMCk7XG5cbiAgaWYgKCFlbGVtZW50Lmxlbmd0aCkgcmV0dXJuO1xuXG4gIHZhciBpbml0Q2xhc3MgPSBpc0luID8gaW5pdENsYXNzZXNbMF0gOiBpbml0Q2xhc3Nlc1sxXTtcbiAgdmFyIGFjdGl2ZUNsYXNzID0gaXNJbiA/IGFjdGl2ZUNsYXNzZXNbMF0gOiBhY3RpdmVDbGFzc2VzWzFdO1xuXG4gIC8vIFNldCB1cCB0aGUgYW5pbWF0aW9uXG4gIHJlc2V0KCk7XG5cbiAgZWxlbWVudFxuICAgIC5hZGRDbGFzcyhhbmltYXRpb24pXG4gICAgLmNzcygndHJhbnNpdGlvbicsICdub25lJyk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBlbGVtZW50LmFkZENsYXNzKGluaXRDbGFzcyk7XG4gICAgaWYgKGlzSW4pIGVsZW1lbnQuc2hvdygpO1xuICB9KTtcblxuICAvLyBTdGFydCB0aGUgYW5pbWF0aW9uXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgLy8gd2lsbCB0cmlnZ2VyIHRoZSBicm93c2VyIHRvIHN5bmNocm9ub3VzbHkgY2FsY3VsYXRlIHRoZSBzdHlsZSBhbmQgbGF5b3V0XG4gICAgLy8gYWxzbyBjYWxsZWQgcmVmbG93IG9yIGxheW91dCB0aHJhc2hpbmdcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzVkNTJmYjA4MWIzNTcwYzgxZTNhXG4gICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aDtcbiAgICBlbGVtZW50XG4gICAgICAuY3NzKCd0cmFuc2l0aW9uJywgJycpXG4gICAgICAuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICB9KTtcblxuICAvLyBDbGVhbiB1cCB0aGUgYW5pbWF0aW9uIHdoZW4gaXQgZmluaXNoZXNcbiAgZWxlbWVudC5vbmUodHJhbnNpdGlvbmVuZChlbGVtZW50KSwgZmluaXNoKTtcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCAoZm9yIG91dCBhbmltYXRpb25zKSwgcmVzZXRzIHRoZSBlbGVtZW50LCBhbmQgcnVucyBhIGNhbGxiYWNrXG4gIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIWlzSW4pIGVsZW1lbnQuaGlkZSgpO1xuICAgIHJlc2V0KCk7XG4gICAgaWYgKGNiKSBjYi5hcHBseShlbGVtZW50KTtcbiAgfVxuXG4gIC8vIFJlc2V0cyB0cmFuc2l0aW9ucyBhbmQgcmVtb3ZlcyBtb3Rpb24tc3BlY2lmaWMgY2xhc3Nlc1xuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBlbGVtZW50WzBdLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IDA7XG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyhgJHtpbml0Q2xhc3N9ICR7YWN0aXZlQ2xhc3N9ICR7YW5pbWF0aW9ufWApO1xuICB9XG59XG5cbmV4cG9ydCB7IE1vdmUsIE1vdGlvbiB9O1xuXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5jb25zdCBOZXN0ID0ge1xuICBGZWF0aGVyKG1lbnUsIHR5cGUgPSAnemYnKSB7XG4gICAgbWVudS5hdHRyKCdyb2xlJywgJ21lbnViYXInKTtcbiAgICBtZW51LmZpbmQoJ2EnKS5hdHRyKHsncm9sZSc6ICdtZW51aXRlbSd9KTtcblxuICAgIHZhciBpdGVtcyA9IG1lbnUuZmluZCgnbGknKS5hdHRyKHsncm9sZSc6ICdub25lJ30pLFxuICAgICAgICBzdWJNZW51Q2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51YCxcbiAgICAgICAgc3ViSXRlbUNsYXNzID0gYCR7c3ViTWVudUNsYXNzfS1pdGVtYCxcbiAgICAgICAgaGFzU3ViQ2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51LXBhcmVudGAsXG4gICAgICAgIGFwcGx5QXJpYSA9ICh0eXBlICE9PSAnYWNjb3JkaW9uJyk7IC8vIEFjY29yZGlvbnMgaGFuZGxlIHRoZWlyIG93biBBUklBIGF0dHJpdXRlcy5cblxuICAgIGl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJGl0ZW0gPSAkKHRoaXMpLFxuICAgICAgICAgICRzdWIgPSAkaXRlbS5jaGlsZHJlbigndWwnKTtcblxuICAgICAgaWYgKCRzdWIubGVuZ3RoKSB7XG4gICAgICAgICRpdGVtLmFkZENsYXNzKGhhc1N1YkNsYXNzKTtcbiAgICAgICAgaWYoYXBwbHlBcmlhKSB7XG4gICAgICAgICAgJGl0ZW0uY2hpbGRyZW4oJ2E6Zmlyc3QnKS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogJGl0ZW0uY2hpbGRyZW4oJ2E6Zmlyc3QnKS50ZXh0KClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBOb3RlOiAgRHJpbGxkb3ducyBiZWhhdmUgZGlmZmVyZW50bHkgaW4gaG93IHRoZXkgaGlkZSwgYW5kIHNvIG5lZWRcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMuICBXZSBzaG91bGQgbG9vayBpZiB0aGlzIHBvc3NpYmx5IG92ZXItZ2VuZXJhbGl6ZWRcbiAgICAgICAgICAvLyB1dGlsaXR5IChOZXN0KSBpcyBhcHByb3ByaWF0ZSB3aGVuIHdlIHJld29yayBtZW51cyBpbiA2LjRcbiAgICAgICAgICBpZih0eXBlID09PSAnZHJpbGxkb3duJykge1xuICAgICAgICAgICAgJGl0ZW0uYXR0cih7J2FyaWEtZXhwYW5kZWQnOiBmYWxzZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc3ViXG4gICAgICAgICAgLmFkZENsYXNzKGBzdWJtZW51ICR7c3ViTWVudUNsYXNzfWApXG4gICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgJ2RhdGEtc3VibWVudSc6ICcnLFxuICAgICAgICAgICAgJ3JvbGUnOiAnbWVudWJhcidcbiAgICAgICAgICB9KTtcbiAgICAgICAgaWYodHlwZSA9PT0gJ2RyaWxsZG93bicpIHtcbiAgICAgICAgICAkc3ViLmF0dHIoeydhcmlhLWhpZGRlbic6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJGl0ZW0ucGFyZW50KCdbZGF0YS1zdWJtZW51XScpLmxlbmd0aCkge1xuICAgICAgICAkaXRlbS5hZGRDbGFzcyhgaXMtc3VibWVudS1pdGVtICR7c3ViSXRlbUNsYXNzfWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIEJ1cm4obWVudSwgdHlwZSkge1xuICAgIHZhciAvL2l0ZW1zID0gbWVudS5maW5kKCdsaScpLFxuICAgICAgICBzdWJNZW51Q2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51YCxcbiAgICAgICAgc3ViSXRlbUNsYXNzID0gYCR7c3ViTWVudUNsYXNzfS1pdGVtYCxcbiAgICAgICAgaGFzU3ViQ2xhc3MgPSBgaXMtJHt0eXBlfS1zdWJtZW51LXBhcmVudGA7XG5cbiAgICBtZW51XG4gICAgICAuZmluZCgnPmxpLCA+IGxpID4gdWwsIC5tZW51LCAubWVudSA+IGxpLCBbZGF0YS1zdWJtZW51XSA+IGxpJylcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHtzdWJNZW51Q2xhc3N9ICR7c3ViSXRlbUNsYXNzfSAke2hhc1N1YkNsYXNzfSBpcy1zdWJtZW51LWl0ZW0gc3VibWVudSBpcy1hY3RpdmVgKVxuICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3VibWVudScpLmNzcygnZGlzcGxheScsICcnKTtcblxuICB9XG59XG5cbmV4cG9ydCB7TmVzdH07XG4iLCJmdW5jdGlvbiBUaW1lcihlbGVtLCBvcHRpb25zLCBjYikge1xuICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uLC8vb3B0aW9ucyBpcyBhbiBvYmplY3QgZm9yIGVhc2lseSBhZGRpbmcgZmVhdHVyZXMgbGF0ZXIuXG4gICAgICBuYW1lU3BhY2UgPSBPYmplY3Qua2V5cyhlbGVtLmRhdGEoKSlbMF0gfHwgJ3RpbWVyJyxcbiAgICAgIHJlbWFpbiA9IC0xLFxuICAgICAgc3RhcnQsXG4gICAgICB0aW1lcjtcblxuICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG5cbiAgdGhpcy5yZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmVtYWluID0gLTE7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuICAgIC8vIGlmKCFlbGVtLmRhdGEoJ3BhdXNlZCcpKXsgcmV0dXJuIGZhbHNlOyB9Ly9tYXliZSBpbXBsZW1lbnQgdGhpcyBzYW5pdHkgY2hlY2sgaWYgdXNlZCBmb3Igb3RoZXIgdGhpbmdzLlxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgcmVtYWluID0gcmVtYWluIDw9IDAgPyBkdXJhdGlvbiA6IHJlbWFpbjtcbiAgICBlbGVtLmRhdGEoJ3BhdXNlZCcsIGZhbHNlKTtcbiAgICBzdGFydCA9IERhdGUubm93KCk7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpZihvcHRpb25zLmluZmluaXRlKXtcbiAgICAgICAgX3RoaXMucmVzdGFydCgpOy8vcmVydW4gdGhlIHRpbWVyLlxuICAgICAgfVxuICAgICAgaWYgKGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgeyBjYigpOyB9XG4gICAgfSwgcmVtYWluKTtcbiAgICBlbGVtLnRyaWdnZXIoYHRpbWVyc3RhcnQuemYuJHtuYW1lU3BhY2V9YCk7XG4gIH1cblxuICB0aGlzLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XG4gICAgLy9pZihlbGVtLmRhdGEoJ3BhdXNlZCcpKXsgcmV0dXJuIGZhbHNlOyB9Ly9tYXliZSBpbXBsZW1lbnQgdGhpcyBzYW5pdHkgY2hlY2sgaWYgdXNlZCBmb3Igb3RoZXIgdGhpbmdzLlxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgZWxlbS5kYXRhKCdwYXVzZWQnLCB0cnVlKTtcbiAgICB2YXIgZW5kID0gRGF0ZS5ub3coKTtcbiAgICByZW1haW4gPSByZW1haW4gLSAoZW5kIC0gc3RhcnQpO1xuICAgIGVsZW0udHJpZ2dlcihgdGltZXJwYXVzZWQuemYuJHtuYW1lU3BhY2V9YCk7XG4gIH1cbn1cblxuZXhwb3J0IHtUaW1lcn07XG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyoqV29yayBpbnNwaXJlZCBieSBtdWx0aXBsZSBqcXVlcnkgc3dpcGUgcGx1Z2lucyoqXG4vLyoqRG9uZSBieSBZb2hhaSBBcmFyYXQgKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbnZhciBUb3VjaCA9IHt9O1xuXG52YXIgc3RhcnRQb3NYLFxuICAgIHN0YXJ0VGltZSxcbiAgICBlbGFwc2VkVGltZSxcbiAgICBzdGFydEV2ZW50LFxuICAgIGlzTW92aW5nID0gZmFsc2UsXG4gICAgZGlkTW92ZWQgPSBmYWxzZTtcblxuZnVuY3Rpb24gb25Ub3VjaEVuZChlKSB7XG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7XG5cbiAgLy8gSWYgdGhlIHRvdWNoIGRpZCBub3QgbW92ZSwgY29uc2lkZXIgaXQgYXMgYSBcInRhcFwiXG4gIGlmICghZGlkTW92ZWQpIHtcbiAgICB2YXIgdGFwRXZlbnQgPSAkLkV2ZW50KCd0YXAnLCBzdGFydEV2ZW50IHx8IGUpO1xuICAgICQodGhpcykudHJpZ2dlcih0YXBFdmVudCk7XG4gIH1cblxuICBzdGFydEV2ZW50ID0gbnVsbDtcbiAgaXNNb3ZpbmcgPSBmYWxzZTtcbiAgZGlkTW92ZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xuICBpZiAodHJ1ZSA9PT0gJC5zcG90U3dpcGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG5cbiAgaWYoaXNNb3ZpbmcpIHtcbiAgICB2YXIgeCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAvLyB2YXIgeSA9IGUudG91Y2hlc1swXS5wYWdlWTtcbiAgICB2YXIgZHggPSBzdGFydFBvc1ggLSB4O1xuICAgIC8vIHZhciBkeSA9IHN0YXJ0UG9zWSAtIHk7XG4gICAgdmFyIGRpcjtcbiAgICBkaWRNb3ZlZCA9IHRydWU7XG4gICAgZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0VGltZTtcbiAgICBpZihNYXRoLmFicyhkeCkgPj0gJC5zcG90U3dpcGUubW92ZVRocmVzaG9sZCAmJiBlbGFwc2VkVGltZSA8PSAkLnNwb3RTd2lwZS50aW1lVGhyZXNob2xkKSB7XG4gICAgICBkaXIgPSBkeCA+IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIH1cbiAgICAvLyBlbHNlIGlmKE1hdGguYWJzKGR5KSA+PSAkLnNwb3RTd2lwZS5tb3ZlVGhyZXNob2xkICYmIGVsYXBzZWRUaW1lIDw9ICQuc3BvdFN3aXBlLnRpbWVUaHJlc2hvbGQpIHtcbiAgICAvLyAgIGRpciA9IGR5ID4gMCA/ICdkb3duJyA6ICd1cCc7XG4gICAgLy8gfVxuICAgIGlmKGRpcikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb25Ub3VjaEVuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgJCh0aGlzKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KCdzd2lwZScsIE9iamVjdC5hc3NpZ24oe30sIGUpKSwgZGlyKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KGBzd2lwZSR7ZGlyfWAsIE9iamVjdC5hc3NpZ24oe30sIGUpKSk7XG4gICAgfVxuICB9XG5cbn1cblxuZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcblxuICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHN0YXJ0UG9zWCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICBzdGFydEV2ZW50ID0gZTtcbiAgICBpc01vdmluZyA9IHRydWU7XG4gICAgZGlkTW92ZWQgPSBmYWxzZTtcbiAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCB7IHBhc3NpdmUgOiB0cnVlID09PSAkLnNwb3RTd2lwZS5wcmV2ZW50RGVmYXVsdCB9KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciAmJiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZSA6IHRydWUgfSk7XG59XG5cbi8vIGZ1bmN0aW9uIHRlYXJkb3duKCkge1xuLy8gICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQpO1xuLy8gfVxuXG5jbGFzcyBTcG90U3dpcGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcnNpb24gPSAnMS4wLjAnO1xuICAgIHRoaXMuZW5hYmxlZCA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB0aGlzLnByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZlVGhyZXNob2xkID0gNzU7XG4gICAgdGhpcy50aW1lVGhyZXNob2xkID0gMjAwO1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIF9pbml0KCkge1xuICAgICQuZXZlbnQuc3BlY2lhbC5zd2lwZSA9IHsgc2V0dXA6IGluaXQgfTtcbiAgICAkLmV2ZW50LnNwZWNpYWwudGFwID0geyBzZXR1cDogaW5pdCB9O1xuXG4gICAgJC5lYWNoKFsnbGVmdCcsICd1cCcsICdkb3duJywgJ3JpZ2h0J10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZXZlbnQuc3BlY2lhbFtgc3dpcGUke3RoaXN9YF0gPSB7IHNldHVwOiBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLm9uKCdzd2lwZScsICQubm9vcCk7XG4gICAgICB9IH07XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEFzIGZhciBhcyBJIGNhbiB0ZWxsLCBib3RoIHNldHVwU3BvdFN3aXBlIGFuZCAgICAqXG4gKiBzZXR1cFRvdWNoSGFuZGxlciBzaG91bGQgYmUgaWRlbXBvdGVudCwgICAgICAgICAgKlxuICogYmVjYXVzZSB0aGV5IGRpcmVjdGx5IHJlcGxhY2UgZnVuY3Rpb25zICYgICAgICAgICpcbiAqIHZhbHVlcywgYW5kIGRvIG5vdCBhZGQgZXZlbnQgaGFuZGxlcnMgZGlyZWN0bHkuICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuVG91Y2guc2V0dXBTcG90U3dpcGUgPSBmdW5jdGlvbigpIHtcbiAgJC5zcG90U3dpcGUgPSBuZXcgU3BvdFN3aXBlKCQpO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIE1ldGhvZCBmb3IgYWRkaW5nIHBzZXVkbyBkcmFnIGV2ZW50cyB0byBlbGVtZW50cyAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuVG91Y2guc2V0dXBUb3VjaEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgJC5mbi5hZGRUb3VjaCA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGksIGVsKXtcbiAgICAgICQoZWwpLmJpbmQoJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJywgZnVuY3Rpb24oZXZlbnQpICB7XG4gICAgICAgIC8vd2UgcGFzcyB0aGUgb3JpZ2luYWwgZXZlbnQgb2JqZWN0IGJlY2F1c2UgdGhlIGpRdWVyeSBldmVudFxuICAgICAgICAvL29iamVjdCBpcyBub3JtYWxpemVkIHRvIHczYyBzcGVjcyBhbmQgZG9lcyBub3QgcHJvdmlkZSB0aGUgVG91Y2hMaXN0XG4gICAgICAgIGhhbmRsZVRvdWNoKGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGhhbmRsZVRvdWNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgZmlyc3QgPSB0b3VjaGVzWzBdLFxuICAgICAgICAgIGV2ZW50VHlwZXMgPSB7XG4gICAgICAgICAgICB0b3VjaHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIHRvdWNobW92ZTogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICB0b3VjaGVuZDogJ21vdXNldXAnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0eXBlID0gZXZlbnRUeXBlc1tldmVudC50eXBlXSxcbiAgICAgICAgICBzaW11bGF0ZWRFdmVudFxuICAgICAgICA7XG5cbiAgICAgIGlmKCdNb3VzZUV2ZW50JyBpbiB3aW5kb3cgJiYgdHlwZW9mIHdpbmRvdy5Nb3VzZUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNpbXVsYXRlZEV2ZW50ID0gbmV3IHdpbmRvdy5Nb3VzZUV2ZW50KHR5cGUsIHtcbiAgICAgICAgICAnYnViYmxlcyc6IHRydWUsXG4gICAgICAgICAgJ2NhbmNlbGFibGUnOiB0cnVlLFxuICAgICAgICAgICdzY3JlZW5YJzogZmlyc3Quc2NyZWVuWCxcbiAgICAgICAgICAnc2NyZWVuWSc6IGZpcnN0LnNjcmVlblksXG4gICAgICAgICAgJ2NsaWVudFgnOiBmaXJzdC5jbGllbnRYLFxuICAgICAgICAgICdjbGllbnRZJzogZmlyc3QuY2xpZW50WVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNpbXVsYXRlZEV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICAgICAgc2ltdWxhdGVkRXZlbnQuaW5pdE1vdXNlRXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAxLCBmaXJzdC5zY3JlZW5YLCBmaXJzdC5zY3JlZW5ZLCBmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMC8qbGVmdCovLCBudWxsKTtcbiAgICAgIH1cbiAgICAgIGZpcnN0LnRhcmdldC5kaXNwYXRjaEV2ZW50KHNpbXVsYXRlZEV2ZW50KTtcbiAgICB9O1xuICB9O1xufTtcblxuVG91Y2guaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYodHlwZW9mKCQuc3BvdFN3aXBlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBUb3VjaC5zZXR1cFNwb3RTd2lwZSgkKTtcbiAgICBUb3VjaC5zZXR1cFRvdWNoSGFuZGxlcigkKTtcbiAgfVxufTtcblxuZXhwb3J0IHtUb3VjaH07XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHsgb25Mb2FkIH0gZnJvbSAnLi9mb3VuZGF0aW9uLmNvcmUudXRpbHMnO1xuaW1wb3J0IHsgTW90aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uLnV0aWwubW90aW9uJztcblxuY29uc3QgTXV0YXRpb25PYnNlcnZlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBwcmVmaXhlcyA9IFsnV2ViS2l0JywgJ01veicsICdPJywgJ01zJywgJyddO1xuICBmb3IgKHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChgJHtwcmVmaXhlc1tpXX1NdXRhdGlvbk9ic2VydmVyYCBpbiB3aW5kb3cpIHtcbiAgICAgIHJldHVybiB3aW5kb3dbYCR7cHJlZml4ZXNbaV19TXV0YXRpb25PYnNlcnZlcmBdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG5jb25zdCB0cmlnZ2VycyA9IChlbCwgdHlwZSkgPT4ge1xuICBlbC5kYXRhKHR5cGUpLnNwbGl0KCcgJykuZm9yRWFjaChpZCA9PiB7XG4gICAgJChgIyR7aWR9YClbIHR5cGUgPT09ICdjbG9zZScgPyAndHJpZ2dlcicgOiAndHJpZ2dlckhhbmRsZXInXShgJHt0eXBlfS56Zi50cmlnZ2VyYCwgW2VsXSk7XG4gIH0pO1xufTtcblxudmFyIFRyaWdnZXJzID0ge1xuICBMaXN0ZW5lcnM6IHtcbiAgICBCYXNpYzoge30sXG4gICAgR2xvYmFsOiB7fVxuICB9LFxuICBJbml0aWFsaXplcnM6IHt9XG59XG5cblRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYyAgPSB7XG4gIG9wZW5MaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ29wZW4nKTtcbiAgfSxcbiAgY2xvc2VMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdjbG9zZScpO1xuICAgIGlmIChpZCkge1xuICAgICAgdHJpZ2dlcnMoJCh0aGlzKSwgJ2Nsb3NlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbG9zZS56Zi50cmlnZ2VyJyk7XG4gICAgfVxuICB9LFxuICB0b2dnbGVMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCd0b2dnbGUnKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRyaWdnZXJzKCQodGhpcyksICd0b2dnbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS50cmlnZ2VyKCd0b2dnbGUuemYudHJpZ2dlcicpO1xuICAgIH1cbiAgfSxcbiAgY2xvc2VhYmxlTGlzdGVuZXI6IGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgYW5pbWF0aW9uID0gJCh0aGlzKS5kYXRhKCdjbG9zYWJsZScpO1xuXG4gICAgLy8gT25seSBjbG9zZSB0aGUgZmlyc3QgY2xvc2FibGUgZWxlbWVudC4gU2VlIGh0dHBzOi8vZ2l0LmlvL3pmLTc4MzNcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYoYW5pbWF0aW9uICE9PSAnJyl7XG4gICAgICBNb3Rpb24uYW5pbWF0ZU91dCgkKHRoaXMpLCBhbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC56ZicpO1xuICAgICAgfSk7XG4gICAgfWVsc2V7XG4gICAgICAkKHRoaXMpLmZhZGVPdXQoKS50cmlnZ2VyKCdjbG9zZWQuemYnKTtcbiAgICB9XG4gIH0sXG4gIHRvZ2dsZUZvY3VzTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgndG9nZ2xlLWZvY3VzJyk7XG4gICAgJChgIyR7aWR9YCkudHJpZ2dlckhhbmRsZXIoJ3RvZ2dsZS56Zi50cmlnZ2VyJywgWyQodGhpcyldKTtcbiAgfVxufTtcblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1vcGVuXSB3aWxsIHJldmVhbCBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRPcGVuTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbGljay56Zi50cmlnZ2VyJywgJ1tkYXRhLW9wZW5dJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLm9wZW5MaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtY2xvc2VdIHdpbGwgY2xvc2UgYSBwbHVnaW4gdGhhdCBzdXBwb3J0cyBpdCB3aGVuIGNsaWNrZWQuXG4vLyBJZiB1c2VkIHdpdGhvdXQgYSB2YWx1ZSBvbiBbZGF0YS1jbG9zZV0sIHRoZSBldmVudCB3aWxsIGJ1YmJsZSwgYWxsb3dpbmcgaXQgdG8gY2xvc2UgYSBwYXJlbnQgY29tcG9uZW50LlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlTGlzdGVuZXIgPSAoJGVsZW0pID0+IHtcbiAgJGVsZW0ub2ZmKCdjbGljay56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLmNsb3NlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS1jbG9zZV0nLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMuY2xvc2VMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlXSB3aWxsIHRvZ2dsZSBhIHBsdWdpbiB0aGF0IHN1cHBvcnRzIGl0IHdoZW4gY2xpY2tlZC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVMaXN0ZW5lciA9ICgkZWxlbSkgPT4ge1xuICAkZWxlbS5vZmYoJ2NsaWNrLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlTGlzdGVuZXIpO1xuICAkZWxlbS5vbignY2xpY2suemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGVdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUxpc3RlbmVyKTtcbn1cblxuLy8gRWxlbWVudHMgd2l0aCBbZGF0YS1jbG9zYWJsZV0gd2lsbCByZXNwb25kIHRvIGNsb3NlLnpmLnRyaWdnZXIgZXZlbnRzLlxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlYWJsZUxpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignY2xvc2UuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdjbG9zZS56Zi50cmlnZ2VyJywgJ1tkYXRhLWNsb3NlYWJsZV0sIFtkYXRhLWNsb3NhYmxlXScsIFRyaWdnZXJzLkxpc3RlbmVycy5CYXNpYy5jbG9zZWFibGVMaXN0ZW5lcik7XG59XG5cbi8vIEVsZW1lbnRzIHdpdGggW2RhdGEtdG9nZ2xlLWZvY3VzXSB3aWxsIHJlc3BvbmQgdG8gY29taW5nIGluIGFuZCBvdXQgb2YgZm9jdXNcblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVGb2N1c0xpc3RlbmVyID0gKCRlbGVtKSA9PiB7XG4gICRlbGVtLm9mZignZm9jdXMuemYudHJpZ2dlciBibHVyLnpmLnRyaWdnZXInLCBUcmlnZ2Vycy5MaXN0ZW5lcnMuQmFzaWMudG9nZ2xlRm9jdXNMaXN0ZW5lcik7XG4gICRlbGVtLm9uKCdmb2N1cy56Zi50cmlnZ2VyIGJsdXIuemYudHJpZ2dlcicsICdbZGF0YS10b2dnbGUtZm9jdXNdJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkJhc2ljLnRvZ2dsZUZvY3VzTGlzdGVuZXIpO1xufVxuXG5cblxuLy8gTW9yZSBHbG9iYWwvY29tcGxleCBsaXN0ZW5lcnMgYW5kIHRyaWdnZXJzXG5UcmlnZ2Vycy5MaXN0ZW5lcnMuR2xvYmFsICA9IHtcbiAgcmVzaXplTGlzdGVuZXI6IGZ1bmN0aW9uKCRub2Rlcykge1xuICAgIGlmKCFNdXRhdGlvbk9ic2VydmVyKXsvL2ZhbGxiYWNrIGZvciBJRSA5XG4gICAgICAkbm9kZXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy90cmlnZ2VyIGFsbCBsaXN0ZW5pbmcgZWxlbWVudHMgYW5kIHNpZ25hbCBhIHJlc2l6ZSBldmVudFxuICAgICRub2Rlcy5hdHRyKCdkYXRhLWV2ZW50cycsIFwicmVzaXplXCIpO1xuICB9LFxuICBzY3JvbGxMaXN0ZW5lcjogZnVuY3Rpb24oJG5vZGVzKSB7XG4gICAgaWYoIU11dGF0aW9uT2JzZXJ2ZXIpey8vZmFsbGJhY2sgZm9yIElFIDlcbiAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3Njcm9sbG1lLnpmLnRyaWdnZXInKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL3RyaWdnZXIgYWxsIGxpc3RlbmluZyBlbGVtZW50cyBhbmQgc2lnbmFsIGEgc2Nyb2xsIGV2ZW50XG4gICAgJG5vZGVzLmF0dHIoJ2RhdGEtZXZlbnRzJywgXCJzY3JvbGxcIik7XG4gIH0sXG4gIGNsb3NlTWVMaXN0ZW5lcjogZnVuY3Rpb24oZSwgcGx1Z2luSWQpe1xuICAgIGxldCBwbHVnaW4gPSBlLm5hbWVzcGFjZS5zcGxpdCgnLicpWzBdO1xuICAgIGxldCBwbHVnaW5zID0gJChgW2RhdGEtJHtwbHVnaW59XWApLm5vdChgW2RhdGEteWV0aS1ib3g9XCIke3BsdWdpbklkfVwiXWApO1xuXG4gICAgcGx1Z2lucy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgX3RoaXMudHJpZ2dlckhhbmRsZXIoJ2Nsb3NlLnpmLnRyaWdnZXInLCBbX3RoaXNdKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBHbG9iYWwsIHBhcnNlcyB3aG9sZSBkb2N1bWVudC5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRDbG9zZW1lTGlzdGVuZXIgPSBmdW5jdGlvbihwbHVnaW5OYW1lKSB7XG4gIHZhciB5ZXRpQm94ZXMgPSAkKCdbZGF0YS15ZXRpLWJveF0nKSxcbiAgICAgIHBsdWdOYW1lcyA9IFsnZHJvcGRvd24nLCAndG9vbHRpcCcsICdyZXZlYWwnXTtcblxuICBpZihwbHVnaW5OYW1lKXtcbiAgICBpZih0eXBlb2YgcGx1Z2luTmFtZSA9PT0gJ3N0cmluZycpe1xuICAgICAgcGx1Z05hbWVzLnB1c2gocGx1Z2luTmFtZSk7XG4gICAgfWVsc2UgaWYodHlwZW9mIHBsdWdpbk5hbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBwbHVnaW5OYW1lWzBdID09PSAnc3RyaW5nJyl7XG4gICAgICBwbHVnTmFtZXMgPSBwbHVnTmFtZXMuY29uY2F0KHBsdWdpbk5hbWUpO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5lcnJvcignUGx1Z2luIG5hbWVzIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgfVxuICBpZih5ZXRpQm94ZXMubGVuZ3RoKXtcbiAgICBsZXQgbGlzdGVuZXJzID0gcGx1Z05hbWVzLm1hcCgobmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIGBjbG9zZW1lLnpmLiR7bmFtZX1gO1xuICAgIH0pLmpvaW4oJyAnKTtcblxuICAgICQod2luZG93KS5vZmYobGlzdGVuZXJzKS5vbihsaXN0ZW5lcnMsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwuY2xvc2VNZUxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWJvdW5jZUdsb2JhbExpc3RlbmVyKGRlYm91bmNlLCB0cmlnZ2VyLCBsaXN0ZW5lcikge1xuICBsZXQgdGltZXIsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuICAkKHdpbmRvdykub24odHJpZ2dlciwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRpbWVyKSB7IGNsZWFyVGltZW91dCh0aW1lcik7IH1cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIGRlYm91bmNlIHx8IDEwKTsgLy9kZWZhdWx0IHRpbWUgdG8gZW1pdCBzY3JvbGwgZXZlbnRcbiAgfSk7XG59XG5cblRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uKGRlYm91bmNlKXtcbiAgbGV0ICRub2RlcyA9ICQoJ1tkYXRhLXJlc2l6ZV0nKTtcbiAgaWYoJG5vZGVzLmxlbmd0aCl7XG4gICAgZGVib3VuY2VHbG9iYWxMaXN0ZW5lcihkZWJvdW5jZSwgJ3Jlc2l6ZS56Zi50cmlnZ2VyJywgVHJpZ2dlcnMuTGlzdGVuZXJzLkdsb2JhbC5yZXNpemVMaXN0ZW5lciwgJG5vZGVzKTtcbiAgfVxufVxuXG5UcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2Nyb2xsTGlzdGVuZXIgPSBmdW5jdGlvbihkZWJvdW5jZSl7XG4gIGxldCAkbm9kZXMgPSAkKCdbZGF0YS1zY3JvbGxdJyk7XG4gIGlmKCRub2Rlcy5sZW5ndGgpe1xuICAgIGRlYm91bmNlR2xvYmFsTGlzdGVuZXIoZGVib3VuY2UsICdzY3JvbGwuemYudHJpZ2dlcicsIFRyaWdnZXJzLkxpc3RlbmVycy5HbG9iYWwuc2Nyb2xsTGlzdGVuZXIsICRub2Rlcyk7XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE11dGF0aW9uRXZlbnRzTGlzdGVuZXIgPSBmdW5jdGlvbigkZWxlbSkge1xuICBpZighTXV0YXRpb25PYnNlcnZlcil7IHJldHVybiBmYWxzZTsgfVxuICBsZXQgJG5vZGVzID0gJGVsZW0uZmluZCgnW2RhdGEtcmVzaXplXSwgW2RhdGEtc2Nyb2xsXSwgW2RhdGEtbXV0YXRlXScpO1xuXG4gIC8vZWxlbWVudCBjYWxsYmFja1xuICB2YXIgbGlzdGVuaW5nRWxlbWVudHNNdXRhdGlvbiA9IGZ1bmN0aW9uIChtdXRhdGlvblJlY29yZHNMaXN0KSB7XG4gICAgdmFyICR0YXJnZXQgPSAkKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0udGFyZ2V0KTtcblxuICAgIC8vdHJpZ2dlciB0aGUgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGVsZW1lbnQgZGVwZW5kaW5nIG9uIHR5cGVcbiAgICBzd2l0Y2ggKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0udHlwZSkge1xuICAgICAgY2FzZSBcImF0dHJpYnV0ZXNcIjpcbiAgICAgICAgaWYgKCR0YXJnZXQuYXR0cihcImRhdGEtZXZlbnRzXCIpID09PSBcInNjcm9sbFwiICYmIG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJkYXRhLWV2ZW50c1wiKSB7XG4gICAgICAgICAgJHRhcmdldC50cmlnZ2VySGFuZGxlcignc2Nyb2xsbWUuemYudHJpZ2dlcicsIFskdGFyZ2V0LCB3aW5kb3cucGFnZVlPZmZzZXRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHRhcmdldC5hdHRyKFwiZGF0YS1ldmVudHNcIikgPT09IFwicmVzaXplXCIgJiYgbXV0YXRpb25SZWNvcmRzTGlzdFswXS5hdHRyaWJ1dGVOYW1lID09PSBcImRhdGEtZXZlbnRzXCIpIHtcbiAgICAgICAgICAkdGFyZ2V0LnRyaWdnZXJIYW5kbGVyKCdyZXNpemVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXRdKTtcbiAgICAgICAgIH1cbiAgICAgICAgaWYgKG11dGF0aW9uUmVjb3Jkc0xpc3RbMF0uYXR0cmlidXRlTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgICAgJHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbXV0YXRlXVwiKS5hdHRyKFwiZGF0YS1ldmVudHNcIixcIm11dGF0ZVwiKTtcbiAgICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLnRyaWdnZXJIYW5kbGVyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIildKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImNoaWxkTGlzdFwiOlxuICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLmF0dHIoXCJkYXRhLWV2ZW50c1wiLFwibXV0YXRlXCIpO1xuICAgICAgICAkdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tdXRhdGVdXCIpLnRyaWdnZXJIYW5kbGVyKCdtdXRhdGVtZS56Zi50cmlnZ2VyJywgWyR0YXJnZXQuY2xvc2VzdChcIltkYXRhLW11dGF0ZV1cIildKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vbm90aGluZ1xuICAgIH1cbiAgfTtcblxuICBpZiAoJG5vZGVzLmxlbmd0aCkge1xuICAgIC8vZm9yIGVhY2ggZWxlbWVudCB0aGF0IG5lZWRzIHRvIGxpc3RlbiBmb3IgcmVzaXppbmcsIHNjcm9sbGluZywgb3IgbXV0YXRpb24gYWRkIGEgc2luZ2xlIG9ic2VydmVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gJG5vZGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgdmFyIGVsZW1lbnRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24pO1xuICAgICAgZWxlbWVudE9ic2VydmVyLm9ic2VydmUoJG5vZGVzW2ldLCB7IGF0dHJpYnV0ZXM6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogZmFsc2UsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogW1wiZGF0YS1ldmVudHNcIiwgXCJzdHlsZVwiXSB9KTtcbiAgICB9XG4gIH1cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZFNpbXBsZUxpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZE9wZW5MaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkQ2xvc2VMaXN0ZW5lcigkZG9jdW1lbnQpO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkVG9nZ2xlTGlzdGVuZXIoJGRvY3VtZW50KTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlYWJsZUxpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRUb2dnbGVGb2N1c0xpc3RlbmVyKCRkb2N1bWVudCk7XG5cbn1cblxuVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZEdsb2JhbExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRNdXRhdGlvbkV2ZW50c0xpc3RlbmVyKCRkb2N1bWVudCk7XG4gIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRSZXNpemVMaXN0ZW5lcigyNTApO1xuICBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkU2Nyb2xsTGlzdGVuZXIoKTtcbiAgVHJpZ2dlcnMuSW5pdGlhbGl6ZXJzLmFkZENsb3NlbWVMaXN0ZW5lcigpO1xufVxuXG5cblRyaWdnZXJzLmluaXQgPSBmdW5jdGlvbiAoX18sIEZvdW5kYXRpb24pIHtcbiAgb25Mb2FkKCQod2luZG93KSwgZnVuY3Rpb24gKCkge1xuICAgIGlmICgkLnRyaWdnZXJzSW5pdGlhbGl6ZWQgIT09IHRydWUpIHtcbiAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRTaW1wbGVMaXN0ZW5lcnMoKTtcbiAgICAgIFRyaWdnZXJzLkluaXRpYWxpemVycy5hZGRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICQudHJpZ2dlcnNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZihGb3VuZGF0aW9uKSB7XG4gICAgRm91bmRhdGlvbi5UcmlnZ2VycyA9IFRyaWdnZXJzO1xuICAgIC8vIExlZ2FjeSBpbmNsdWRlZCB0byBiZSBiYWNrd2FyZHMgY29tcGF0aWJsZSBmb3Igbm93LlxuICAgIEZvdW5kYXRpb24uSUhlYXJZb3UgPSBUcmlnZ2Vycy5Jbml0aWFsaXplcnMuYWRkR2xvYmFsTGlzdGVuZXJzXG4gIH1cbn1cblxuZXhwb3J0IHtUcmlnZ2Vyc307XG4iLCIvKipcbiAqIHdoYXQtaW5wdXQgLSBBIGdsb2JhbCB1dGlsaXR5IGZvciB0cmFja2luZyB0aGUgY3VycmVudCBpbnB1dCBtZXRob2QgKG1vdXNlLCBrZXlib2FyZCBvciB0b3VjaCkuXG4gKiBAdmVyc2lvbiB2NS4yLjEyXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vdGVuMXNldmVuL3doYXQtaW5wdXRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIndoYXRJbnB1dFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3aGF0SW5wdXRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wid2hhdElucHV0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgLypcblx0ICAgKiBiYWlsIG91dCBpZiB0aGVyZSBpcyBubyBkb2N1bWVudCBvciB3aW5kb3dcblx0ICAgKiAoaS5lLiBpbiBhIG5vZGUvbm9uLURPTSBlbnZpcm9ubWVudClcblx0ICAgKlxuXHQgICAqIFJldHVybiBhIHN0dWJiZWQgQVBJIGluc3RlYWRcblx0ICAgKi9cblx0ICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgLy8gYWx3YXlzIHJldHVybiBcImluaXRpYWxcIiBiZWNhdXNlIG5vIGludGVyYWN0aW9uIHdpbGwgZXZlciBiZSBkZXRlY3RlZFxuXHQgICAgICBhc2s6IGZ1bmN0aW9uIGFzaygpIHtcblx0ICAgICAgICByZXR1cm4gJ2luaXRpYWwnO1xuXHQgICAgICB9LFxuXG5cdCAgICAgIC8vIGFsd2F5cyByZXR1cm4gbnVsbFxuXHQgICAgICBlbGVtZW50OiBmdW5jdGlvbiBlbGVtZW50KCkge1xuXHQgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICB9LFxuXG5cdCAgICAgIC8vIG5vLW9wXG5cdCAgICAgIGlnbm9yZUtleXM6IGZ1bmN0aW9uIGlnbm9yZUtleXMoKSB7fSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICBzcGVjaWZpY0tleXM6IGZ1bmN0aW9uIHNwZWNpZmljS2V5cygpIHt9LFxuXG5cdCAgICAgIC8vIG5vLW9wXG5cdCAgICAgIHJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHJlZ2lzdGVyT25DaGFuZ2UoKSB7fSxcblxuXHQgICAgICAvLyBuby1vcFxuXHQgICAgICB1blJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHVuUmVnaXN0ZXJPbkNoYW5nZSgpIHt9XG5cdCAgICB9O1xuXHQgIH1cblxuXHQgIC8qXG5cdCAgICogdmFyaWFibGVzXG5cdCAgICovXG5cblx0ICAvLyBjYWNoZSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0ICB2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHQgIC8vIGN1cnJlbnRseSBmb2N1c2VkIGRvbSBlbGVtZW50XG5cdCAgdmFyIGN1cnJlbnRFbGVtZW50ID0gbnVsbDtcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCB0eXBlXG5cdCAgdmFyIGN1cnJlbnRJbnB1dCA9ICdpbml0aWFsJztcblxuXHQgIC8vIGxhc3QgdXNlZCBpbnB1dCBpbnRlbnRcblx0ICB2YXIgY3VycmVudEludGVudCA9IGN1cnJlbnRJbnB1dDtcblxuXHQgIC8vIFVOSVggdGltZXN0YW1wIG9mIGN1cnJlbnQgZXZlbnRcblx0ICB2YXIgY3VycmVudFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0ICAvLyBjaGVjayBmb3IgYSBgZGF0YS13aGF0cGVyc2lzdGAgYXR0cmlidXRlIG9uIGVpdGhlciB0aGUgYGh0bWxgIG9yIGBib2R5YCBlbGVtZW50cywgZGVmYXVsdHMgdG8gYHRydWVgXG5cdCAgdmFyIHNob3VsZFBlcnNpc3QgPSBmYWxzZTtcblxuXHQgIC8vIGZvcm0gaW5wdXQgdHlwZXNcblx0ICB2YXIgZm9ybUlucHV0cyA9IFsnYnV0dG9uJywgJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYSddO1xuXG5cdCAgLy8gZW1wdHkgYXJyYXkgZm9yIGhvbGRpbmcgY2FsbGJhY2sgZnVuY3Rpb25zXG5cdCAgdmFyIGZ1bmN0aW9uTGlzdCA9IFtdO1xuXG5cdCAgLy8gbGlzdCBvZiBtb2RpZmllciBrZXlzIGNvbW1vbmx5IHVzZWQgd2l0aCB0aGUgbW91c2UgYW5kXG5cdCAgLy8gY2FuIGJlIHNhZmVseSBpZ25vcmVkIHRvIHByZXZlbnQgZmFsc2Uga2V5Ym9hcmQgZGV0ZWN0aW9uXG5cdCAgdmFyIGlnbm9yZU1hcCA9IFsxNiwgLy8gc2hpZnRcblx0ICAxNywgLy8gY29udHJvbFxuXHQgIDE4LCAvLyBhbHRcblx0ICA5MSwgLy8gV2luZG93cyBrZXkgLyBsZWZ0IEFwcGxlIGNtZFxuXHQgIDkzIC8vIFdpbmRvd3MgbWVudSAvIHJpZ2h0IEFwcGxlIGNtZFxuXHQgIF07XG5cblx0ICB2YXIgc3BlY2lmaWNNYXAgPSBbXTtcblxuXHQgIC8vIG1hcHBpbmcgb2YgZXZlbnRzIHRvIGlucHV0IHR5cGVzXG5cdCAgdmFyIGlucHV0TWFwID0ge1xuXHQgICAga2V5ZG93bjogJ2tleWJvYXJkJyxcblx0ICAgIGtleXVwOiAna2V5Ym9hcmQnLFxuXHQgICAgbW91c2Vkb3duOiAnbW91c2UnLFxuXHQgICAgbW91c2Vtb3ZlOiAnbW91c2UnLFxuXHQgICAgTVNQb2ludGVyRG93bjogJ3BvaW50ZXInLFxuXHQgICAgTVNQb2ludGVyTW92ZTogJ3BvaW50ZXInLFxuXHQgICAgcG9pbnRlcmRvd246ICdwb2ludGVyJyxcblx0ICAgIHBvaW50ZXJtb3ZlOiAncG9pbnRlcicsXG5cdCAgICB0b3VjaHN0YXJ0OiAndG91Y2gnLFxuXHQgICAgdG91Y2hlbmQ6ICd0b3VjaCdcblxuXHQgICAgLy8gYm9vbGVhbjogdHJ1ZSBpZiB0aGUgcGFnZSBpcyBiZWluZyBzY3JvbGxlZFxuXHQgIH07dmFyIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cblx0ICAvLyBzdG9yZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uXG5cdCAgdmFyIG1vdXNlUG9zID0ge1xuXHQgICAgeDogbnVsbCxcblx0ICAgIHk6IG51bGxcblxuXHQgICAgLy8gbWFwIG9mIElFIDEwIHBvaW50ZXIgZXZlbnRzXG5cdCAgfTt2YXIgcG9pbnRlck1hcCA9IHtcblx0ICAgIDI6ICd0b3VjaCcsXG5cdCAgICAzOiAndG91Y2gnLCAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgNDogJ21vdXNlJ1xuXG5cdCAgICAvLyBjaGVjayBzdXBwb3J0IGZvciBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyc1xuXHQgIH07dmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuXG5cdCAgdHJ5IHtcblx0ICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcblx0ICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdCAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG5cdCAgfSBjYXRjaCAoZSkge31cblx0ICAvLyBmYWlsIHNpbGVudGx5XG5cblxuXHQgIC8qXG5cdCAgICogc2V0IHVwXG5cdCAgICovXG5cblx0ICB2YXIgc2V0VXAgPSBmdW5jdGlvbiBzZXRVcCgpIHtcblx0ICAgIC8vIGFkZCBjb3JyZWN0IG1vdXNlIHdoZWVsIGV2ZW50IG1hcHBpbmcgdG8gYGlucHV0TWFwYFxuXHQgICAgaW5wdXRNYXBbZGV0ZWN0V2hlZWwoKV0gPSAnbW91c2UnO1xuXG5cdCAgICBhZGRMaXN0ZW5lcnMoKTtcblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBldmVudHNcblx0ICAgKi9cblxuXHQgIHZhciBhZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG5cdCAgICAvLyBgcG9pbnRlcm1vdmVgLCBgTVNQb2ludGVyTW92ZWAsIGBtb3VzZW1vdmVgIGFuZCBtb3VzZSB3aGVlbCBldmVudCBiaW5kaW5nXG5cdCAgICAvLyBjYW4gb25seSBkZW1vbnN0cmF0ZSBwb3RlbnRpYWwsIGJ1dCBub3QgYWN0dWFsLCBpbnRlcmFjdGlvblxuXHQgICAgLy8gYW5kIGFyZSB0cmVhdGVkIHNlcGFyYXRlbHlcblx0ICAgIHZhciBvcHRpb25zID0gc3VwcG9ydHNQYXNzaXZlID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiB0cnVlIH0gOiB0cnVlO1xuXG5cdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2V0UGVyc2lzdCwgdHJ1ZSk7XG5cblx0ICAgIC8vIHBvaW50ZXIgZXZlbnRzIChtb3VzZSwgcGVuLCB0b3VjaClcblx0ICAgIGlmICh3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHNldElucHV0LCB0cnVlKTtcblx0ICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgc2V0SW50ZW50LCB0cnVlKTtcblx0ICAgIH0gZWxzZSBpZiAod2luZG93Lk1TUG9pbnRlckV2ZW50KSB7XG5cdCAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJywgc2V0SW5wdXQsIHRydWUpO1xuXHQgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyTW92ZScsIHNldEludGVudCwgdHJ1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBtb3VzZSBldmVudHNcblx0ICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHNldElucHV0LCB0cnVlKTtcblx0ICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNldEludGVudCwgdHJ1ZSk7XG5cblx0ICAgICAgLy8gdG91Y2ggZXZlbnRzXG5cdCAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcblx0ICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNldElucHV0LCBvcHRpb25zKTtcblx0ICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBzZXRJbnB1dCwgdHJ1ZSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgLy8gbW91c2Ugd2hlZWxcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGRldGVjdFdoZWVsKCksIHNldEludGVudCwgb3B0aW9ucyk7XG5cblx0ICAgIC8vIGtleWJvYXJkIGV2ZW50c1xuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzZXRJbnB1dCwgdHJ1ZSk7XG5cdCAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzZXRJbnB1dCwgdHJ1ZSk7XG5cblx0ICAgIC8vIGZvY3VzIGV2ZW50c1xuXHQgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCBzZXRFbGVtZW50LCB0cnVlKTtcblx0ICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGNsZWFyRWxlbWVudCwgdHJ1ZSk7XG5cdCAgfTtcblxuXHQgIC8vIGNoZWNrcyBpZiBpbnB1dCBwZXJzaXN0ZW5jZSBzaG91bGQgaGFwcGVuIGFuZFxuXHQgIC8vIGdldCBzYXZlZCBzdGF0ZSBmcm9tIHNlc3Npb24gc3RvcmFnZSBpZiB0cnVlIChkZWZhdWx0cyB0byBgZmFsc2VgKVxuXHQgIHZhciBzZXRQZXJzaXN0ID0gZnVuY3Rpb24gc2V0UGVyc2lzdCgpIHtcblx0ICAgIHNob3VsZFBlcnNpc3QgPSAhKGRvY0VsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXdoYXRwZXJzaXN0JykgPT09ICdmYWxzZScgfHwgZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdHBlcnNpc3QnKSA9PT0gJ2ZhbHNlJyk7XG5cblx0ICAgIGlmIChzaG91bGRQZXJzaXN0KSB7XG5cdCAgICAgIC8vIGNoZWNrIGZvciBzZXNzaW9uIHZhcmlhYmxlcyBhbmQgdXNlIGlmIGF2YWlsYWJsZVxuXHQgICAgICB0cnkge1xuXHQgICAgICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnB1dCcpKSB7XG5cdCAgICAgICAgICBjdXJyZW50SW5wdXQgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnB1dCcpO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnd2hhdC1pbnRlbnQnKSkge1xuXHQgICAgICAgICAgY3VycmVudEludGVudCA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd3aGF0LWludGVudCcpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgIC8vIGZhaWwgc2lsZW50bHlcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICAvLyBhbHdheXMgcnVuIHRoZXNlIHNvIGF0IGxlYXN0IGBpbml0aWFsYCBzdGF0ZSBpcyBzZXRcblx0ICAgIGRvVXBkYXRlKCdpbnB1dCcpO1xuXHQgICAgZG9VcGRhdGUoJ2ludGVudCcpO1xuXHQgIH07XG5cblx0ICAvLyBjaGVja3MgY29uZGl0aW9ucyBiZWZvcmUgdXBkYXRpbmcgbmV3IGlucHV0XG5cdCAgdmFyIHNldElucHV0ID0gZnVuY3Rpb24gc2V0SW5wdXQoZXZlbnQpIHtcblx0ICAgIHZhciBldmVudEtleSA9IGV2ZW50LndoaWNoO1xuXHQgICAgdmFyIHZhbHVlID0gaW5wdXRNYXBbZXZlbnQudHlwZV07XG5cblx0ICAgIGlmICh2YWx1ZSA9PT0gJ3BvaW50ZXInKSB7XG5cdCAgICAgIHZhbHVlID0gcG9pbnRlclR5cGUoZXZlbnQpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgaWdub3JlTWF0Y2ggPSAhc3BlY2lmaWNNYXAubGVuZ3RoICYmIGlnbm9yZU1hcC5pbmRleE9mKGV2ZW50S2V5KSA9PT0gLTE7XG5cblx0ICAgIHZhciBzcGVjaWZpY01hdGNoID0gc3BlY2lmaWNNYXAubGVuZ3RoICYmIHNwZWNpZmljTWFwLmluZGV4T2YoZXZlbnRLZXkpICE9PSAtMTtcblxuXHQgICAgdmFyIHNob3VsZFVwZGF0ZSA9IHZhbHVlID09PSAna2V5Ym9hcmQnICYmIGV2ZW50S2V5ICYmIChpZ25vcmVNYXRjaCB8fCBzcGVjaWZpY01hdGNoKSB8fCB2YWx1ZSA9PT0gJ21vdXNlJyB8fCB2YWx1ZSA9PT0gJ3RvdWNoJztcblxuXHQgICAgLy8gcHJldmVudCB0b3VjaCBkZXRlY3Rpb24gZnJvbSBiZWluZyBvdmVycmlkZGVuIGJ5IGV2ZW50IGV4ZWN1dGlvbiBvcmRlclxuXHQgICAgaWYgKHZhbGlkYXRlVG91Y2godmFsdWUpKSB7XG5cdCAgICAgIHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoc2hvdWxkVXBkYXRlICYmIGN1cnJlbnRJbnB1dCAhPT0gdmFsdWUpIHtcblx0ICAgICAgY3VycmVudElucHV0ID0gdmFsdWU7XG5cblx0ICAgICAgcGVyc2lzdElucHV0KCdpbnB1dCcsIGN1cnJlbnRJbnB1dCk7XG5cdCAgICAgIGRvVXBkYXRlKCdpbnB1dCcpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoc2hvdWxkVXBkYXRlICYmIGN1cnJlbnRJbnRlbnQgIT09IHZhbHVlKSB7XG5cdCAgICAgIC8vIHByZXNlcnZlIGludGVudCBmb3Iga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2l0aCBmb3JtIGZpZWxkc1xuXHQgICAgICB2YXIgYWN0aXZlRWxlbSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdCAgICAgIHZhciBub3RGb3JtSW5wdXQgPSBhY3RpdmVFbGVtICYmIGFjdGl2ZUVsZW0ubm9kZU5hbWUgJiYgKGZvcm1JbnB1dHMuaW5kZXhPZihhY3RpdmVFbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpID09PSAtMSB8fCBhY3RpdmVFbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdidXR0b24nICYmICFjaGVja0Nsb3Nlc3QoYWN0aXZlRWxlbSwgJ2Zvcm0nKSk7XG5cblx0ICAgICAgaWYgKG5vdEZvcm1JbnB1dCkge1xuXHQgICAgICAgIGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICAgIHBlcnNpc3RJbnB1dCgnaW50ZW50JywgY3VycmVudEludGVudCk7XG5cdCAgICAgICAgZG9VcGRhdGUoJ2ludGVudCcpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIHVwZGF0ZXMgdGhlIGRvYyBhbmQgYGlucHV0VHlwZXNgIGFycmF5IHdpdGggbmV3IGlucHV0XG5cdCAgdmFyIGRvVXBkYXRlID0gZnVuY3Rpb24gZG9VcGRhdGUod2hpY2gpIHtcblx0ICAgIGRvY0VsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXdoYXQnICsgd2hpY2gsIHdoaWNoID09PSAnaW5wdXQnID8gY3VycmVudElucHV0IDogY3VycmVudEludGVudCk7XG5cblx0ICAgIGZpcmVGdW5jdGlvbnMod2hpY2gpO1xuXHQgIH07XG5cblx0ICAvLyB1cGRhdGVzIGlucHV0IGludGVudCBmb3IgYG1vdXNlbW92ZWAgYW5kIGBwb2ludGVybW92ZWBcblx0ICB2YXIgc2V0SW50ZW50ID0gZnVuY3Rpb24gc2V0SW50ZW50KGV2ZW50KSB7XG5cdCAgICB2YXIgdmFsdWUgPSBpbnB1dE1hcFtldmVudC50eXBlXTtcblxuXHQgICAgaWYgKHZhbHVlID09PSAncG9pbnRlcicpIHtcblx0ICAgICAgdmFsdWUgPSBwb2ludGVyVHlwZShldmVudCk7XG5cdCAgICB9XG5cblx0ICAgIC8vIHRlc3QgdG8gc2VlIGlmIGBtb3VzZW1vdmVgIGhhcHBlbmVkIHJlbGF0aXZlIHRvIHRoZSBzY3JlZW4gdG8gZGV0ZWN0IHNjcm9sbGluZyB2ZXJzdXMgbW91c2Vtb3ZlXG5cdCAgICBkZXRlY3RTY3JvbGxpbmcoZXZlbnQpO1xuXG5cdCAgICAvLyBvbmx5IGV4ZWN1dGUgaWYgc2Nyb2xsaW5nIGlzbid0IGhhcHBlbmluZ1xuXHQgICAgaWYgKCghaXNTY3JvbGxpbmcgJiYgIXZhbGlkYXRlVG91Y2godmFsdWUpIHx8IGlzU2Nyb2xsaW5nICYmIGV2ZW50LnR5cGUgPT09ICd3aGVlbCcgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNld2hlZWwnIHx8IGV2ZW50LnR5cGUgPT09ICdET01Nb3VzZVNjcm9sbCcpICYmIGN1cnJlbnRJbnRlbnQgIT09IHZhbHVlKSB7XG5cdCAgICAgIGN1cnJlbnRJbnRlbnQgPSB2YWx1ZTtcblxuXHQgICAgICBwZXJzaXN0SW5wdXQoJ2ludGVudCcsIGN1cnJlbnRJbnRlbnQpO1xuXHQgICAgICBkb1VwZGF0ZSgnaW50ZW50Jyk7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIHZhciBzZXRFbGVtZW50ID0gZnVuY3Rpb24gc2V0RWxlbWVudChldmVudCkge1xuXHQgICAgaWYgKCFldmVudC50YXJnZXQubm9kZU5hbWUpIHtcblx0ICAgICAgLy8gSWYgbm9kZU5hbWUgaXMgdW5kZWZpbmVkLCBjbGVhciB0aGUgZWxlbWVudFxuXHQgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgY2xpY2sgaW5zaWRlIGFuIDxzdmc+IGVsZW1lbnQuXG5cdCAgICAgIGNsZWFyRWxlbWVudCgpO1xuXHQgICAgICByZXR1cm47XG5cdCAgICB9XG5cblx0ICAgIGN1cnJlbnRFbGVtZW50ID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdCAgICBkb2NFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS13aGF0ZWxlbWVudCcsIGN1cnJlbnRFbGVtZW50KTtcblxuXHQgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5sZW5ndGgpIHtcblx0ICAgICAgZG9jRWxlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2hhdGNsYXNzZXMnLCBldmVudC50YXJnZXQuY2xhc3NMaXN0LnRvU3RyaW5nKCkucmVwbGFjZSgnICcsICcsJykpO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICB2YXIgY2xlYXJFbGVtZW50ID0gZnVuY3Rpb24gY2xlYXJFbGVtZW50KCkge1xuXHQgICAgY3VycmVudEVsZW1lbnQgPSBudWxsO1xuXG5cdCAgICBkb2NFbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS13aGF0ZWxlbWVudCcpO1xuXHQgICAgZG9jRWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtd2hhdGNsYXNzZXMnKTtcblx0ICB9O1xuXG5cdCAgdmFyIHBlcnNpc3RJbnB1dCA9IGZ1bmN0aW9uIHBlcnNpc3RJbnB1dCh3aGljaCwgdmFsdWUpIHtcblx0ICAgIGlmIChzaG91bGRQZXJzaXN0KSB7XG5cdCAgICAgIHRyeSB7XG5cdCAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3doYXQtJyArIHdoaWNoLCB2YWx1ZSk7XG5cdCAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAvLyBmYWlsIHNpbGVudGx5XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiB1dGlsaXRpZXNcblx0ICAgKi9cblxuXHQgIHZhciBwb2ludGVyVHlwZSA9IGZ1bmN0aW9uIHBvaW50ZXJUeXBlKGV2ZW50KSB7XG5cdCAgICBpZiAodHlwZW9mIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbnVtYmVyJykge1xuXHQgICAgICByZXR1cm4gcG9pbnRlck1hcFtldmVudC5wb2ludGVyVHlwZV07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyB0cmVhdCBwZW4gbGlrZSB0b3VjaFxuXHQgICAgICByZXR1cm4gZXZlbnQucG9pbnRlclR5cGUgPT09ICdwZW4nID8gJ3RvdWNoJyA6IGV2ZW50LnBvaW50ZXJUeXBlO1xuXHQgICAgfVxuXHQgIH07XG5cblx0ICAvLyBwcmV2ZW50IHRvdWNoIGRldGVjdGlvbiBmcm9tIGJlaW5nIG92ZXJyaWRkZW4gYnkgZXZlbnQgZXhlY3V0aW9uIG9yZGVyXG5cdCAgdmFyIHZhbGlkYXRlVG91Y2ggPSBmdW5jdGlvbiB2YWxpZGF0ZVRvdWNoKHZhbHVlKSB7XG5cdCAgICB2YXIgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHQgICAgdmFyIHRvdWNoSXNWYWxpZCA9IHZhbHVlID09PSAnbW91c2UnICYmIGN1cnJlbnRJbnB1dCA9PT0gJ3RvdWNoJyAmJiB0aW1lc3RhbXAgLSBjdXJyZW50VGltZXN0YW1wIDwgMjAwO1xuXG5cdCAgICBjdXJyZW50VGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG5cdCAgICByZXR1cm4gdG91Y2hJc1ZhbGlkO1xuXHQgIH07XG5cblx0ICAvLyBkZXRlY3QgdmVyc2lvbiBvZiBtb3VzZSB3aGVlbCBldmVudCB0byB1c2Vcblx0ICAvLyB2aWEgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvd2hlZWxfZXZlbnRcblx0ICB2YXIgZGV0ZWN0V2hlZWwgPSBmdW5jdGlvbiBkZXRlY3RXaGVlbCgpIHtcblx0ICAgIHZhciB3aGVlbFR5cGUgPSBudWxsO1xuXG5cdCAgICAvLyBNb2Rlcm4gYnJvd3NlcnMgc3VwcG9ydCBcIndoZWVsXCJcblx0ICAgIGlmICgnb253aGVlbCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpIHtcblx0ICAgICAgd2hlZWxUeXBlID0gJ3doZWVsJztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIFdlYmtpdCBhbmQgSUUgc3VwcG9ydCBhdCBsZWFzdCBcIm1vdXNld2hlZWxcIlxuXHQgICAgICAvLyBvciBhc3N1bWUgdGhhdCByZW1haW5pbmcgYnJvd3NlcnMgYXJlIG9sZGVyIEZpcmVmb3hcblx0ICAgICAgd2hlZWxUeXBlID0gZG9jdW1lbnQub25tb3VzZXdoZWVsICE9PSB1bmRlZmluZWQgPyAnbW91c2V3aGVlbCcgOiAnRE9NTW91c2VTY3JvbGwnO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gd2hlZWxUeXBlO1xuXHQgIH07XG5cblx0ICAvLyBydW5zIGNhbGxiYWNrIGZ1bmN0aW9uc1xuXHQgIHZhciBmaXJlRnVuY3Rpb25zID0gZnVuY3Rpb24gZmlyZUZ1bmN0aW9ucyh0eXBlKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnVuY3Rpb25MaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIGlmIChmdW5jdGlvbkxpc3RbaV0udHlwZSA9PT0gdHlwZSkge1xuXHQgICAgICAgIGZ1bmN0aW9uTGlzdFtpXS5mbi5jYWxsKHVuZGVmaW5lZCwgdHlwZSA9PT0gJ2lucHV0JyA/IGN1cnJlbnRJbnB1dCA6IGN1cnJlbnRJbnRlbnQpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIGZpbmRzIG1hdGNoaW5nIGVsZW1lbnQgaW4gYW4gb2JqZWN0XG5cdCAgdmFyIG9ialBvcyA9IGZ1bmN0aW9uIG9ialBvcyhtYXRjaCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZ1bmN0aW9uTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoZnVuY3Rpb25MaXN0W2ldLmZuID09PSBtYXRjaCkge1xuXHQgICAgICAgIHJldHVybiBpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIHZhciBkZXRlY3RTY3JvbGxpbmcgPSBmdW5jdGlvbiBkZXRlY3RTY3JvbGxpbmcoZXZlbnQpIHtcblx0ICAgIGlmIChtb3VzZVBvcy54ICE9PSBldmVudC5zY3JlZW5YIHx8IG1vdXNlUG9zLnkgIT09IGV2ZW50LnNjcmVlblkpIHtcblx0ICAgICAgaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuXHQgICAgICBtb3VzZVBvcy54ID0gZXZlbnQuc2NyZWVuWDtcblx0ICAgICAgbW91c2VQb3MueSA9IGV2ZW50LnNjcmVlblk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpc1Njcm9sbGluZyA9IHRydWU7XG5cdCAgICB9XG5cdCAgfTtcblxuXHQgIC8vIG1hbnVhbCB2ZXJzaW9uIG9mIGBjbG9zZXN0KClgXG5cdCAgdmFyIGNoZWNrQ2xvc2VzdCA9IGZ1bmN0aW9uIGNoZWNrQ2xvc2VzdChlbGVtLCB0YWcpIHtcblx0ICAgIHZhciBFbGVtZW50UHJvdG90eXBlID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuXG5cdCAgICBpZiAoIUVsZW1lbnRQcm90b3R5cGUubWF0Y2hlcykge1xuXHQgICAgICBFbGVtZW50UHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50UHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuY2xvc2VzdCkge1xuXHQgICAgICBkbyB7XG5cdCAgICAgICAgaWYgKGVsZW0ubWF0Y2hlcyh0YWcpKSB7XG5cdCAgICAgICAgICByZXR1cm4gZWxlbTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBlbGVtID0gZWxlbS5wYXJlbnRFbGVtZW50IHx8IGVsZW0ucGFyZW50Tm9kZTtcblx0ICAgICAgfSB3aGlsZSAoZWxlbSAhPT0gbnVsbCAmJiBlbGVtLm5vZGVUeXBlID09PSAxKTtcblxuXHQgICAgICByZXR1cm4gbnVsbDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJldHVybiBlbGVtLmNsb3Nlc3QodGFnKTtcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgLypcblx0ICAgKiBpbml0XG5cdCAgICovXG5cblx0ICAvLyBkb24ndCBzdGFydCBzY3JpcHQgdW5sZXNzIGJyb3dzZXIgY3V0cyB0aGUgbXVzdGFyZFxuXHQgIC8vIChhbHNvIHBhc3NlcyBpZiBwb2x5ZmlsbHMgYXJlIHVzZWQpXG5cdCAgaWYgKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cgJiYgQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcblx0ICAgIHNldFVwKCk7XG5cdCAgfVxuXG5cdCAgLypcblx0ICAgKiBhcGlcblx0ICAgKi9cblxuXHQgIHJldHVybiB7XG5cdCAgICAvLyByZXR1cm5zIHN0cmluZzogdGhlIGN1cnJlbnQgaW5wdXQgdHlwZVxuXHQgICAgLy8gb3B0OiAnaW50ZW50J3wnaW5wdXQnXG5cdCAgICAvLyAnaW5wdXQnIChkZWZhdWx0KTogcmV0dXJucyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgYGRhdGEtd2hhdGlucHV0YCBhdHRyaWJ1dGVcblx0ICAgIC8vICdpbnRlbnQnOiBpbmNsdWRlcyBgZGF0YS13aGF0aW50ZW50YCB2YWx1ZSBpZiBpdCdzIGRpZmZlcmVudCB0aGFuIGBkYXRhLXdoYXRpbnB1dGBcblx0ICAgIGFzazogZnVuY3Rpb24gYXNrKG9wdCkge1xuXHQgICAgICByZXR1cm4gb3B0ID09PSAnaW50ZW50JyA/IGN1cnJlbnRJbnRlbnQgOiBjdXJyZW50SW5wdXQ7XG5cdCAgICB9LFxuXG5cdCAgICAvLyByZXR1cm5zIHN0cmluZzogdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgb3IgbnVsbFxuXHQgICAgZWxlbWVudDogZnVuY3Rpb24gZWxlbWVudCgpIHtcblx0ICAgICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xuXHQgICAgfSxcblxuXHQgICAgLy8gb3ZlcndyaXRlcyBpZ25vcmVkIGtleXMgd2l0aCBwcm92aWRlZCBhcnJheVxuXHQgICAgaWdub3JlS2V5czogZnVuY3Rpb24gaWdub3JlS2V5cyhhcnIpIHtcblx0ICAgICAgaWdub3JlTWFwID0gYXJyO1xuXHQgICAgfSxcblxuXHQgICAgLy8gb3ZlcndyaXRlcyBzcGVjaWZpYyBjaGFyIGtleXMgdG8gdXBkYXRlIG9uXG5cdCAgICBzcGVjaWZpY0tleXM6IGZ1bmN0aW9uIHNwZWNpZmljS2V5cyhhcnIpIHtcblx0ICAgICAgc3BlY2lmaWNNYXAgPSBhcnI7XG5cdCAgICB9LFxuXG5cdCAgICAvLyBhdHRhY2ggZnVuY3Rpb25zIHRvIGlucHV0IGFuZCBpbnRlbnQgXCJldmVudHNcIlxuXHQgICAgLy8gZnVuY3Q6IGZ1bmN0aW9uIHRvIGZpcmUgb24gY2hhbmdlXG5cdCAgICAvLyBldmVudFR5cGU6ICdpbnB1dCd8J2ludGVudCdcblx0ICAgIHJlZ2lzdGVyT25DaGFuZ2U6IGZ1bmN0aW9uIHJlZ2lzdGVyT25DaGFuZ2UoZm4sIGV2ZW50VHlwZSkge1xuXHQgICAgICBmdW5jdGlvbkxpc3QucHVzaCh7XG5cdCAgICAgICAgZm46IGZuLFxuXHQgICAgICAgIHR5cGU6IGV2ZW50VHlwZSB8fCAnaW5wdXQnXG5cdCAgICAgIH0pO1xuXHQgICAgfSxcblxuXHQgICAgdW5SZWdpc3Rlck9uQ2hhbmdlOiBmdW5jdGlvbiB1blJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcblx0ICAgICAgdmFyIHBvc2l0aW9uID0gb2JqUG9zKGZuKTtcblxuXHQgICAgICBpZiAocG9zaXRpb24gfHwgcG9zaXRpb24gPT09IDApIHtcblx0ICAgICAgICBmdW5jdGlvbkxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcblx0ICAgICAgfVxuXHQgICAgfSxcblxuXHQgICAgY2xlYXJTdG9yYWdlOiBmdW5jdGlvbiBjbGVhclN0b3JhZ2UoKSB7XG5cdCAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuXHQgICAgfVxuXHQgIH07XG5cdH0oKTtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pXG59KTtcbjsiLCIvL2ltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG4vL2ltcG9ydCAnd2hhdC1pbnB1dCc7XG4vL2ZvciBhbGxcbi8vaW1wb3J0IHsgRm91bmRhdGlvbiB9IGZyb20gKCcuL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzJyk7XG5pbXBvcnQge0ZvdW5kYXRpb259ICAgICBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmNvcmUnO1xuaW1wb3J0ICogYXMgQ29yZVV0aWxzICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5jb3JlLnV0aWxzJztcbmltcG9ydCB7Qm94fSAgICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5ib3gnXG5pbXBvcnQge29uSW1hZ2VzTG9hZGVkfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwuaW1hZ2VMb2FkZXInO1xuaW1wb3J0IHtLZXlib2FyZH0gICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLmtleWJvYXJkJztcbmltcG9ydCB7TWVkaWFRdWVyeX0gICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tZWRpYVF1ZXJ5JztcbmltcG9ydCB7TW90aW9uLCBNb3ZlfSAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC5tb3Rpb24nO1xuaW1wb3J0IHtOZXN0fSAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLm5lc3QnO1xuaW1wb3J0IHtUaW1lcn0gICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi51dGlsLnRpbWVyJztcbmltcG9ydCB7VG91Y2h9ICAgICAgICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udXRpbC50b3VjaCc7XG5pbXBvcnQge1RyaWdnZXJzfSAgICAgICBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnV0aWwudHJpZ2dlcnMnO1xuLy9pbXBvcnQgeyBBYmlkZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uYWJpZGUnO1xuLy9pbXBvcnQgeyBBY2NvcmRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbic7XG4vL2ltcG9ydCB7IEFjY29yZGlvbk1lbnUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmFjY29yZGlvbk1lbnUnO1xuLy9pbXBvcnQgeyBEcmlsbGRvd24gfSBmcm9tICdmb3VuZGF0aW9uLmRyaWxsZG93bic7XG5pbXBvcnQge0Ryb3Bkb3dufSAgICAgICBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLmRyb3Bkb3duJztcbmltcG9ydCB7RHJvcGRvd25NZW51fSAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZHJvcGRvd25NZW51JztcbmltcG9ydCB7RXF1YWxpemVyfSAgICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24uZXF1YWxpemVyJztcbi8vaW1wb3J0IHsgSW50ZXJjaGFuZ2UgfSBmcm9tICdmb3VuZGF0aW9uLmludGVyY2hhbmdlJztcbmltcG9ydCB7TWFnZWxsYW59ICAgICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24ubWFnZWxsYW4nO1xuaW1wb3J0IHtPZmZDYW52YXN9ICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5vZmZjYW52YXMnO1xuLy9pbXBvcnQgeyBPcmJpdCB9IGZyb20gJ2ZvdW5kYXRpb24ub3JiaXQnO1xuaW1wb3J0IHtSZXNwb25zaXZlTWVudX0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXNwb25zaXZlTWVudSc7XG4vL2ltcG9ydCB7IFJlc3BvbnNpdmVUb2dnbGUgfSBmcm9tICdmb3VuZGF0aW9uLnJlc3BvbnNpdmVUb2dnbGUnO1xuaW1wb3J0IHtSZXZlYWx9ICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi5yZXZlYWwnO1xuLy9pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICdmb3VuZGF0aW9uLnNsaWRlcic7XG4vL2ltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJ2ZvdW5kYXRpb24uc21vb3RoU2Nyb2xsJztcbi8vaW1wb3J0IHsgU3RpY2t5IH0gZnJvbSAnZm91bmRhdGlvbi5zdGlja3knO1xuaW1wb3J0IHtUYWJzfSAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi50YWJzJztcbmltcG9ydCB7VG9nZ2xlcn0gICAgICAgIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24udG9nZ2xlcic7XG5pbXBvcnQge1Rvb2x0aXB9ICAgICAgICBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uLnRvb2x0aXAnO1xuLy9pbXBvcnQgeyBSZXNwb25zaXZlQWNjb3JkaW9uVGFicyB9IGZyb20gJ2ZvdW5kYXRpb24ucmVzcG9uc2l2ZUFjY29yZGlvblRhYnMnO1xuXG5Gb3VuZGF0aW9uLmFkZFRvSnF1ZXJ5KCQpO1xuXG4vLyBJTVBPUlRTXG4vL0FkZCBGb3VuZGF0aW9uIFV0aWxzIHRvIEZvdW5kYXRpb24gZ2xvYmFsIG5hbWVzcGFjZSBmb3IgYmFja3dhcmRzXG4vL2NvbXBhdGliaWxpdHkuXG5Gb3VuZGF0aW9uLnJ0bCA9IENvcmVVdGlscy5ydGw7XG5Gb3VuZGF0aW9uLkdldFlvRGlnaXRzID0gQ29yZVV0aWxzLkdldFlvRGlnaXRzO1xuRm91bmRhdGlvbi50cmFuc2l0aW9uZW5kID0gQ29yZVV0aWxzLnRyYW5zaXRpb25lbmQ7XG5Gb3VuZGF0aW9uLlJlZ0V4cEVzY2FwZSA9IENvcmVVdGlscy5SZWdFeHBFc2NhcGU7XG5Gb3VuZGF0aW9uLm9uTG9hZCA9IENvcmVVdGlscy5vbkxvYWQ7XG5cbkZvdW5kYXRpb24uQm94ID0gQm94O1xuRm91bmRhdGlvbi5vbkltYWdlc0xvYWRlZCA9IG9uSW1hZ2VzTG9hZGVkO1xuRm91bmRhdGlvbi5LZXlib2FyZCA9IEtleWJvYXJkO1xuRm91bmRhdGlvbi5NZWRpYVF1ZXJ5ID0gTWVkaWFRdWVyeTtcbkZvdW5kYXRpb24uTW90aW9uID0gTW90aW9uO1xuRm91bmRhdGlvbi5Nb3ZlID0gTW92ZTtcbkZvdW5kYXRpb24uTmVzdCA9IE5lc3Q7XG5Gb3VuZGF0aW9uLlRpbWVyID0gVGltZXI7XG5cbi8vVG91Y2ggYW5kIFRyaWdnZXJzIHByZXZpb3VzbHkgd2VyZSBhbG1vc3QgcHVyZWx5IHNpZGUgZWZmZWN0IGRyaXZlbixcbi8vc28gbm8gbmVlZCB0byBhZGQgaXQgdG8gRm91bmRhdGlvbiwganVzdCBpbml0IHRoZW0uXG5Ub3VjaC5pbml0KCQpO1xuVHJpZ2dlcnMuaW5pdCgkLCBGb3VuZGF0aW9uKTtcbk1lZGlhUXVlcnkuX2luaXQoKTtcblxuLy9Gb3VuZGF0aW9uLnBsdWdpbihBYmlkZSwgJ0FiaWRlJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKEFjY29yZGlvbiwgJ0FjY29yZGlvbicpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihBY2NvcmRpb25NZW51LCAnQWNjb3JkaW9uTWVudScpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihEcmlsbGRvd24sICdEcmlsbGRvd24nKTtcbkZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duLCAnRHJvcGRvd24nKTtcbkZvdW5kYXRpb24ucGx1Z2luKERyb3Bkb3duTWVudSwgJ0Ryb3Bkb3duTWVudScpO1xuRm91bmRhdGlvbi5wbHVnaW4oRXF1YWxpemVyLCAnRXF1YWxpemVyJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKEludGVyY2hhbmdlLCAnSW50ZXJjaGFuZ2UnKTtcbkZvdW5kYXRpb24ucGx1Z2luKE1hZ2VsbGFuLCAnTWFnZWxsYW4nKTtcbkZvdW5kYXRpb24ucGx1Z2luKE9mZkNhbnZhcywgJ09mZkNhbnZhcycpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihPcmJpdCwgJ09yYml0Jyk7XG5Gb3VuZGF0aW9uLnBsdWdpbihSZXNwb25zaXZlTWVudSwgJ1Jlc3BvbnNpdmVNZW51Jyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKFJlc3BvbnNpdmVUb2dnbGUsICdSZXNwb25zaXZlVG9nZ2xlJyk7XG5Gb3VuZGF0aW9uLnBsdWdpbihSZXZlYWwsICdSZXZlYWwnKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oU2xpZGVyLCAnU2xpZGVyJyk7XG4vL0ZvdW5kYXRpb24ucGx1Z2luKFNtb290aFNjcm9sbCwgJ1Ntb290aFNjcm9sbCcpO1xuLy9Gb3VuZGF0aW9uLnBsdWdpbihTdGlja3ksICdTdGlja3knKTtcbkZvdW5kYXRpb24ucGx1Z2luKFRhYnMsICdUYWJzJyk7XG5Gb3VuZGF0aW9uLnBsdWdpbihUb2dnbGVyLCAnVG9nZ2xlcicpO1xuRm91bmRhdGlvbi5wbHVnaW4oVG9vbHRpcCwgJ1Rvb2x0aXAnKTtcbi8vRm91bmRhdGlvbi5wbHVnaW4oUmVzcG9uc2l2ZUFjY29yZGlvblRhYnMsICdSZXNwb25zaXZlQWNjb3JkaW9uVGFicycpO1xuXG5leHBvcnQge0ZvdW5kYXRpb259OyIsIi8vIEZvdW5kYXRpb24gSlNcbmltcG9ydCAnbnBtL3doYXQtaW5wdXQnO1xuaW1wb3J0ICdtZWRpYWpzL2ZvdW5kYXRpb24vZm91bmRhdGlvbic7Il0sIm5hbWVzIjpbIiQiLCJLZXlib2FyZCIsIk5lc3QiLCJHZXRZb0RpZ2l0cyIsIlBsdWdpbiIsIkFjY29yZGlvbk1lbnUiLCJlbGVtZW50Iiwib3B0aW9ucyIsIiRlbGVtZW50IiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJkYXRhIiwiY2xhc3NOYW1lIiwiX2luaXQiLCJyZWdpc3RlciIsIkZlYXRoZXIiLCJfdGhpcyIsImZpbmQiLCJub3QiLCJzbGlkZVVwIiwiYXR0ciIsIm11bHRpT3BlbiIsIiRtZW51TGlua3MiLCJlYWNoIiwibGlua0lkIiwiaWQiLCIkZWxlbSIsIiRzdWIiLCJjaGlsZHJlbiIsInN1YklkIiwiaXNBY3RpdmUiLCJoYXNDbGFzcyIsInBhcmVudExpbmsiLCIkYW5jaG9yIiwiY2xvbmUiLCJwcmVwZW5kVG8iLCJ3cmFwIiwic3VibWVudVRvZ2dsZSIsImFkZENsYXNzIiwiYWZ0ZXIiLCJzdWJtZW51VG9nZ2xlVGV4dCIsImluaXRQYW5lcyIsImxlbmd0aCIsImRvd24iLCJfZXZlbnRzIiwiJHN1Ym1lbnUiLCJvZmYiLCJvbiIsInRvZ2dsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiRlbGVtZW50cyIsInBhcmVudCIsIiRwcmV2RWxlbWVudCIsIiRuZXh0RWxlbWVudCIsIiR0YXJnZXQiLCJpIiwiaXMiLCJlcSIsIk1hdGgiLCJtYXgiLCJmaXJzdCIsIm1pbiIsInBhcmVudHMiLCJuZXh0IiwiaGFuZGxlS2V5Iiwib3BlbiIsImZvY3VzIiwiY2xvc2UiLCJ1cCIsImNsb3NlQWxsIiwiaGlkZUFsbCIsImhhbmRsZWQiLCIkdGFyZ2V0QnJhbmNoIiwicGFyZW50c1VudGlsIiwiYWRkIiwiJG90aGVyc0FjdGl2ZVN1Ym1lbnVzIiwicHJldiIsInNsaWRlRG93biIsInNsaWRlU3BlZWQiLCJ0cmlnZ2VyIiwiJHN1Ym1lbnVzIiwiJGFsbG1lbnVzIiwicmVtb3ZlQ2xhc3MiLCJjc3MiLCJkZXRhY2giLCJyZW1vdmUiLCJCdXJuIiwiTWVkaWFRdWVyeSIsIkZPVU5EQVRJT05fVkVSU0lPTiIsIkZvdW5kYXRpb24iLCJ2ZXJzaW9uIiwiX3BsdWdpbnMiLCJfdXVpZHMiLCJwbHVnaW4iLCJuYW1lIiwiZnVuY3Rpb25OYW1lIiwiYXR0ck5hbWUiLCJoeXBoZW5hdGUiLCJyZWdpc3RlclBsdWdpbiIsInBsdWdpbk5hbWUiLCJjb25zdHJ1Y3RvciIsInRvTG93ZXJDYXNlIiwidXVpZCIsInB1c2giLCJ1bnJlZ2lzdGVyUGx1Z2luIiwic3BsaWNlIiwiaW5kZXhPZiIsInJlbW92ZUF0dHIiLCJyZW1vdmVEYXRhIiwicHJvcCIsInJlSW5pdCIsInBsdWdpbnMiLCJpc0pRIiwidHlwZSIsImZucyIsInBsZ3MiLCJmb3JFYWNoIiwicCIsImZvdW5kYXRpb24iLCJvYmplY3QiLCJPYmplY3QiLCJrZXlzIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwicmVmbG93IiwiZWxlbSIsImFkZEJhY2siLCJmaWx0ZXIiLCIkZWwiLCJvcHRzIiwic3BsaXQiLCJvcHRpb24iLCJvcHQiLCJtYXAiLCJlbCIsInRyaW0iLCJwYXJzZVZhbHVlIiwiZXIiLCJnZXRGbk5hbWUiLCJhZGRUb0pxdWVyeSIsIm1ldGhvZCIsIiRub0pTIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwicGx1Z0NsYXNzIiwiYXBwbHkiLCJSZWZlcmVuY2VFcnJvciIsIlR5cGVFcnJvciIsImZuIiwidXRpbCIsInRocm90dGxlIiwiZnVuYyIsImRlbGF5IiwidGltZXIiLCJjb250ZXh0Iiwic2V0VGltZW91dCIsIndpbmRvdyIsIkRhdGUiLCJub3ciLCJnZXRUaW1lIiwidmVuZG9ycyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZwIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibGFzdFRpbWUiLCJjYWxsYmFjayIsIm5leHRUaW1lIiwiY2xlYXJUaW1lb3V0IiwicGVyZm9ybWFuY2UiLCJzdGFydCIsIkZ1bmN0aW9uIiwiYmluZCIsIm9UaGlzIiwiYUFyZ3MiLCJmVG9CaW5kIiwiZk5PUCIsImZCb3VuZCIsImNvbmNhdCIsImZ1bmNOYW1lUmVnZXgiLCJyZXN1bHRzIiwiZXhlYyIsInRvU3RyaW5nIiwic3RyIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicmVwbGFjZSIsIl9zZXR1cCIsImdldFBsdWdpbk5hbWUiLCJfZGVzdHJveSIsImhhc093blByb3BlcnR5Iiwib2JqIiwicnRsIiwibmFtZXNwYWNlIiwiY2hhcnMiLCJjaGFyc0xlbmd0aCIsImZsb29yIiwicmFuZG9tIiwiUmVnRXhwRXNjYXBlIiwidHJhbnNpdGlvbmVuZCIsInRyYW5zaXRpb25zIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZW5kIiwidHJhbnNpdGlvbiIsInN0eWxlIiwidHJpZ2dlckhhbmRsZXIiLCJvbkxvYWQiLCJoYW5kbGVyIiwiZGlkTG9hZCIsInJlYWR5U3RhdGUiLCJldmVudFR5cGUiLCJjYiIsIm9uZSIsImlnbm9yZU1vdXNlZGlzYXBwZWFyIiwiaWdub3JlTGVhdmVXaW5kb3ciLCJpZ25vcmVSZWFwcGVhciIsImxlYXZlRXZlbnRIYW5kbGVyIiwiZUxlYXZlIiwicmVzdCIsInJlbGF0ZWRUYXJnZXQiLCJsZWF2ZUV2ZW50RGVib3VuY2VyIiwiaGFzRm9jdXMiLCJyZWVudGVyRXZlbnRIYW5kbGVyIiwiZVJlZW50ZXIiLCJjdXJyZW50VGFyZ2V0IiwiaGFzIiwidGFyZ2V0IiwiQm94IiwiRHJpbGxkb3duIiwiYXV0b0FwcGx5Q2xhc3MiLCIkc3VibWVudUFuY2hvcnMiLCIkbWVudUl0ZW1zIiwiJGN1cnJlbnRNZW51IiwiX3ByZXBhcmVNZW51IiwiX3JlZ2lzdGVyRXZlbnRzIiwiX2tleWJvYXJkRXZlbnRzIiwiJGxpbmsiLCIkbWVudSIsIiRiYWNrIiwiYmFja0J1dHRvblBvc2l0aW9uIiwiYXBwZW5kIiwiYmFja0J1dHRvbiIsInByZXBlbmQiLCJfYmFjayIsImF1dG9IZWlnaHQiLCIkd3JhcHBlciIsIndyYXBwZXIiLCJhbmltYXRlSGVpZ2h0IiwiX2dldE1heERpbXMiLCJfc2hvdyIsImNsb3NlT25DbGljayIsIiRib2R5IiwiZXYiLCJjb250YWlucyIsIl9oaWRlQWxsIiwic2Nyb2xsVG9wIiwiX2JpbmRIYW5kbGVyIiwiX3Njcm9sbFRvcCIsIl9yZXNpemUiLCIkc2Nyb2xsVG9wRWxlbWVudCIsInNjcm9sbFRvcEVsZW1lbnQiLCJzY3JvbGxQb3MiLCJwYXJzZUludCIsIm9mZnNldCIsInRvcCIsInNjcm9sbFRvcE9mZnNldCIsInN0b3AiLCJhbmltYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJhbmltYXRpb25FYXNpbmciLCJwcmV2aW91cyIsIl9oaWRlIiwic2libGluZ3MiLCJjYWxjSGVpZ2h0IiwiY2xvc2VzdCIsImhlaWdodCIsInBhcmVudFN1Yk1lbnUiLCJhdXRvRm9jdXMiLCIkZXhwYW5kZWRTdWJtZW51cyIsIl9zZXRIaWRlU3ViTWVudUNsYXNzZXMiLCJpbmRleCIsImlzTGFzdENoaWxkIiwiX3NldFNob3dTdWJNZW51Q2xhc3NlcyIsImJsdXIiLCJtYXhIZWlnaHQiLCJyZXN1bHQiLCJHZXREaW1lbnNpb25zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJ1bndyYXAiLCJQb3NpdGlvbmFibGUiLCJUcmlnZ2VycyIsIlRvdWNoIiwiRHJvcGRvd24iLCJpbml0IiwiJGlkIiwiJGFuY2hvcnMiLCJfc2V0Q3VycmVudEFuY2hvciIsInBhcmVudENsYXNzIiwiJHBhcmVudCIsIiRjdXJyZW50QW5jaG9yIiwicG9zaXRpb24iLCJtYXRjaCIsImhvcml6b250YWxQb3NpdGlvbiIsImFsaWdubWVudCIsImhhc1RvdWNoIiwib250b3VjaHN0YXJ0IiwiX3NldFBvc2l0aW9uIiwiZm9yY2VGb2xsb3ciLCJob3ZlciIsImJvZHlEYXRhIiwid2hhdGlucHV0IiwidGltZW91dCIsImhvdmVyRGVsYXkiLCJob3ZlclBhbmUiLCJib2R5IiwiJGZvY3VzYWJsZSIsImZpbmRGb2N1c2FibGUiLCJfYWRkQm9keUhhbmRsZXIiLCJ0cmFwRm9jdXMiLCJyZWxlYXNlRm9jdXMiLCJoaWRlIiwidk9mZnNldCIsImhPZmZzZXQiLCJhbGxvd092ZXJsYXAiLCJhbGxvd0JvdHRvbU92ZXJsYXAiLCJSdGwiLCJEcm9wZG93bk1lbnUiLCJzdWJzIiwiJHRhYnMiLCJ2ZXJ0aWNhbENsYXNzIiwicmlnaHRDbGFzcyIsImNoYW5nZWQiLCJwYXJDbGFzcyIsImhhbmRsZUNsaWNrRm4iLCJoYXNTdWIiLCJoYXNDbGlja2VkIiwiY2xpY2tPcGVuIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiY2xvc2VPbkNsaWNrSW5zaWRlIiwiZGlzYWJsZUhvdmVyT25Ub3VjaCIsImRpc2FibGVIb3ZlciIsImF1dG9jbG9zZSIsImNsb3NpbmdUaW1lIiwiaXNUYWIiLCJuZXh0U2libGluZyIsInByZXZTaWJsaW5nIiwib3BlblN1YiIsImNsb3NlU3ViIiwiZnVuY3Rpb25zIiwiX2lzVmVydGljYWwiLCJfaXNSdGwiLCJfcmVtb3ZlQm9keUhhbmRsZXIiLCJpc0l0c2VsZiIsImlkeCIsIiRzaWJzIiwiY2xlYXIiLCJJbU5vdFRvdWNoaW5nWW91Iiwib2xkQ2xhc3MiLCIkcGFyZW50TGkiLCIkdG9DbG9zZSIsInNvbWV0aGluZ1RvQ2xvc2UiLCIkYWN0aXZlSXRlbSIsIm9uSW1hZ2VzTG9hZGVkIiwiRXF1YWxpemVyIiwiZXFJZCIsIiR3YXRjaGVkIiwiaGFzTmVzdGVkIiwiaXNOZXN0ZWQiLCJpc09uIiwib25SZXNpemVNZUJvdW5kIiwiX29uUmVzaXplTWUiLCJvblBvc3RFcXVhbGl6ZWRCb3VuZCIsIl9vblBvc3RFcXVhbGl6ZWQiLCJpbWdzIiwidG9vU21hbGwiLCJlcXVhbGl6ZU9uIiwiX2NoZWNrTVEiLCJfcmVmbG93IiwiX3BhdXNlRXZlbnRzIiwiZXF1YWxpemVPblN0YWNrIiwiX2lzU3RhY2tlZCIsImVxdWFsaXplQnlSb3ciLCJnZXRIZWlnaHRzQnlSb3ciLCJhcHBseUhlaWdodEJ5Um93IiwiZ2V0SGVpZ2h0cyIsImFwcGx5SGVpZ2h0IiwiaGVpZ2h0cyIsImxlbiIsIm9mZnNldEhlaWdodCIsImxhc3RFbFRvcE9mZnNldCIsImdyb3VwcyIsImdyb3VwIiwiZWxPZmZzZXRUb3AiLCJqIiwibG4iLCJnZXQiLCJncm91cHNJTGVuZ3RoIiwibGVuSiIsIlNtb290aFNjcm9sbCIsIk1hZ2VsbGFuIiwiY2FsY1BvaW50cyIsIiR0YXJnZXRzIiwiJGxpbmtzIiwiJGFjdGl2ZSIsInBhZ2VZT2Zmc2V0IiwiaHRtbCIsImRvY3VtZW50RWxlbWVudCIsInBvaW50cyIsIndpbkhlaWdodCIsInJvdW5kIiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJkb2NIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCIkdGFyIiwicHQiLCJ0aHJlc2hvbGQiLCJ0YXJnZXRQb2ludCIsImRlZXBMaW5raW5nIiwibG9jYXRpb24iLCJoYXNoIiwic2Nyb2xsVG9Mb2MiLCJfdXBkYXRlQWN0aXZlIiwib25Mb2FkTGlzdGVuZXIiLCJhcnJpdmFsIiwiZ2V0QXR0cmlidXRlIiwiX2RlZXBMaW5rU2Nyb2xsIiwibG9jIiwiX2luVHJhbnNpdGlvbiIsIm5ld1Njcm9sbFBvcyIsImlzU2Nyb2xsaW5nVXAiLCJhY3RpdmVJZHgiLCJ2aXNpYmxlTGlua3MiLCIkb2xkQWN0aXZlIiwiYWN0aXZlSGFzaCIsImlzTmV3QWN0aXZlIiwiaXNOZXdIYXNoIiwiYWN0aXZlQ2xhc3MiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwidXJsIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ1cGRhdGVIaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwiT2ZmQ2FudmFzIiwiY29udGVudENsYXNzZXMiLCJiYXNlIiwicmV2ZWFsIiwiJGxhc3RUcmlnZ2VyIiwiJHRyaWdnZXJzIiwiJGNvbnRlbnQiLCJuZXN0ZWQiLCIkc3RpY2t5IiwiaXNJbkNhbnZhcyIsInZhbCIsImNvbnRlbnRJZCIsIndhcm4iLCJjb250ZW50T3ZlcmxheSIsIm92ZXJsYXkiLCJvdmVybGF5UG9zaXRpb24iLCJzZXRBdHRyaWJ1dGUiLCIkb3ZlcmxheSIsImluc2VydEFmdGVyIiwicmV2ZWFsT25SZWdFeHAiLCJSZWdFeHAiLCJyZXZlYWxDbGFzcyIsInJldmVhbE9uQ2xhc3MiLCJpc1JldmVhbGVkIiwicmV2ZWFsT24iLCJfc2V0TVFDaGVja2VyIiwidHJhbnNpdGlvblRpbWUiLCJjb250ZW50U2Nyb2xsIiwiaW5DYW52YXNGb3IiLCJpbkNhbnZhc09uIiwiX2NoZWNrSW5DYW52YXMiLCJfcmVtb3ZlQ29udGVudENsYXNzZXMiLCJfaGFuZGxlS2V5Ym9hcmQiLCJhdExlYXN0IiwiaGFzUmV2ZWFsIiwiam9pbiIsIl8iLCJ0b3BWYWwiLCJhYnNvbHV0ZVRvcFZhbCIsInN0aWNreURhdGEiLCJfYWRkQ29udGVudENsYXNzZXMiLCJldmVudCIsImxhc3RZIiwidG91Y2hlcyIsInBhZ2VZIiwiZGVsdGEiLCJfY2FuU2Nyb2xsIiwic3RvcFByb3BhZ2F0aW9uIiwiYWxsb3dVcCIsImFsbG93RG93biIsImZvcmNlVG8iLCJzY3JvbGxUbyIsIl9zdG9wU2Nyb2xsaW5nIiwiX3JlY29yZFNjcm9sbGFibGUiLCJfcHJldmVudERlZmF1bHRBdEVkZ2VzIiwiX3Njcm9sbGJveFRvdWNoTW92ZWQiLCJjYW52YXNGb2N1cyIsIl9maXhTdGlja3lFbGVtZW50cyIsIl91bmZpeFN0aWNreUVsZW1lbnRzIiwiUE9TSVRJT05TIiwiVkVSVElDQUxfQUxJR05NRU5UUyIsIkhPUklaT05UQUxfQUxJR05NRU5UUyIsIkFMSUdOTUVOVFMiLCJuZXh0SXRlbSIsIml0ZW0iLCJhcnJheSIsImN1cnJlbnRJZHgiLCJ0cmllZFBvc2l0aW9ucyIsIl9nZXREZWZhdWx0UG9zaXRpb24iLCJfZ2V0RGVmYXVsdEFsaWdubWVudCIsIm9yaWdpbmFsUG9zaXRpb24iLCJvcmlnaW5hbEFsaWdubWVudCIsIl9hbGlnbm1lbnRzRXhoYXVzdGVkIiwiX3JlYWxpZ24iLCJfYWRkVHJpZWRQb3NpdGlvbiIsImlzRXhoYXVzdGVkIiwiR2V0RXhwbGljaXRPZmZzZXRzIiwiX2dldFZPZmZzZXQiLCJfZ2V0SE9mZnNldCIsIm1pbk92ZXJsYXAiLCJtaW5Db29yZGluYXRlcyIsIl9wb3NpdGlvbnNFeGhhdXN0ZWQiLCJvdmVybGFwIiwiT3ZlcmxhcEFyZWEiLCJfcmVwb3NpdGlvbiIsIk1lbnVQbHVnaW5zIiwiZHJvcGRvd24iLCJjc3NDbGFzcyIsImRyaWxsZG93biIsImFjY29yZGlvbiIsIlJlc3BvbnNpdmVNZW51IiwicnVsZXMiLCJjdXJyZW50TXEiLCJjdXJyZW50UGx1Z2luIiwicnVsZXNUcmVlIiwicnVsZSIsInJ1bGVTaXplIiwicnVsZVBsdWdpbiIsImlzRW1wdHlPYmplY3QiLCJfY2hlY2tNZWRpYVF1ZXJpZXMiLCJtYXRjaGVkTXEiLCJrZXkiLCJ2YWx1ZSIsImRlc3Ryb3kiLCJNb3Rpb24iLCJSZXZlYWwiLCJjYWNoZWQiLCJtcSIsImN1cnJlbnQiLCJmdWxsU2NyZWVuIiwiX21ha2VPdmVybGF5IiwiYXBwZW5kVG8iLCJkZWVwTGluayIsImFkZGl0aW9uYWxPdmVybGF5Q2xhc3NlcyIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsImxlZnQiLCJtYXJnaW4iLCJfdXBkYXRlUG9zaXRpb24iLCJfaGFuZGxlU3RhdGUiLCIkYWN0aXZlQW5jaG9yIiwiYWN0aXZlRWxlbWVudCIsInNob3ciLCJtdWx0aXBsZU9wZW5lZCIsIl9kaXNhYmxlU2Nyb2xsIiwiYW5pbWF0aW9uSW4iLCJhZnRlckFuaW1hdGlvbiIsIl9hZGRHbG9iYWxDbGFzc2VzIiwiYW5pbWF0ZUluIiwiZm9jdXNhYmxlRWxlbWVudHMiLCJzaG93RGVsYXkiLCJfYWRkR2xvYmFsTGlzdGVuZXJzIiwidXBkYXRlU2Nyb2xsYmFyQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsImNsb3NlT25Fc2MiLCJhbmltYXRpb25PdXQiLCJhbmltYXRlT3V0IiwiZmluaXNoVXAiLCJoaWRlRGVsYXkiLCJfcmVtb3ZlR2xvYmFsQ2xhc3NlcyIsIl9lbmFibGVTY3JvbGwiLCJyZXNldE9uQ2xvc2UiLCJ1cmxXaXRob3V0SGFzaCIsInRpdGxlIiwiX2xpbmtDbGlja0xpc3RlbmVyIiwiX2hhbmRsZUxpbmtDbGljayIsIiRsb2MiLCJUYWJzIiwiX2lzSW5pdGlhbGl6aW5nIiwiJHRhYlRpdGxlcyIsImxpbmtDbGFzcyIsIiR0YWJDb250ZW50IiwibGlua0FjdGl2ZUNsYXNzIiwiX2luaXRpYWxBbmNob3IiLCJkZWVwTGlua1NtdWRnZURlbGF5IiwibWF0Y2hIZWlnaHQiLCIkaW1hZ2VzIiwiX3NldEhlaWdodCIsIl9jaGVja0RlZXBMaW5rIiwiYW5jaG9yIiwiYW5jaG9yTm9IYXNoIiwiaXNPd25BbmNob3IiLCJzZWxlY3RUYWIiLCJfY29sbGFwc2UiLCJkZWVwTGlua1NtdWRnZSIsImRlZXBMaW5rU211ZGdlT2Zmc2V0IiwiX2FkZEtleUhhbmRsZXIiLCJfYWRkQ2xpY2tIYW5kbGVyIiwiX3NldEhlaWdodE1xSGFuZGxlciIsIl9oYW5kbGVUYWJDaGFuZ2UiLCJ3aGljaCIsIndyYXBPbktleXMiLCJsYXN0IiwiaGlzdG9yeUhhbmRsZWQiLCJhY3RpdmVDb2xsYXBzZSIsIiRvbGRUYWIiLCIkdGFiTGluayIsIiR0YXJnZXRDb250ZW50IiwiX2NvbGxhcHNlVGFiIiwiX29wZW5UYWIiLCJwYW5lbEFjdGl2ZUNsYXNzIiwiJHRhcmdldEFuY2hvciIsIiRhY3RpdmVUYWIiLCJpZFN0ciIsImhhc2hJZFN0ciIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsInRlbXAiLCJUb2dnbGVyIiwiaW5wdXQiLCJ0b2dnbGVyIiwiRXJyb3IiLCIkdHJpZ2dlciIsImNvbnRyb2xzIiwiY29udGFpbnNJZCIsIl91cGRhdGVBUklBIiwidW5kZWZpbmVkIiwiVG9vbHRpcCIsImlzQ2xpY2siLCJlbGVtSWQiLCJ0aXBUZXh0IiwidGVtcGxhdGUiLCJfYnVpbGRUZW1wbGF0ZSIsImFsbG93SHRtbCIsInRleHQiLCJ0cmlnZ2VyQ2xhc3MiLCJlbGVtZW50Q2xhc3NOYW1lIiwiU1ZHRWxlbWVudCIsImJhc2VWYWwiLCJ0b29sdGlwV2lkdGgiLCJ0b29sdGlwSGVpZ2h0IiwidGVtcGxhdGVDbGFzc2VzIiwidG9vbHRpcENsYXNzIiwiJHRlbXBsYXRlIiwic2hvd09uIiwiZmFkZUluIiwiZmFkZUluRHVyYXRpb24iLCJmYWRlT3V0IiwiZmFkZU91dER1cmF0aW9uIiwiaXNGb2N1cyIsImRpc2FibGVGb3JUb3VjaCIsInRvdWNoQ2xvc2VUZXh0IiwibHJPbmx5IiwidGJPbmx5IiwiaWdub3JlQm90dG9tIiwiZWxlRGltcyIsInRvcE92ZXIiLCJib3R0b21PdmVyIiwibGVmdE92ZXIiLCJyaWdodE92ZXIiLCJwYXJEaW1zIiwid2luZG93RGltcyIsInNxcnQiLCJyZWN0IiwicGFyUmVjdCIsInBhcmVudE5vZGUiLCJ3aW5SZWN0Iiwid2luWSIsIndpblgiLCJwYWdlWE9mZnNldCIsInBhcmVudERpbXMiLCJpc092ZXJmbG93IiwiJGVsZURpbXMiLCIkYW5jaG9yRGltcyIsImxlZnRWYWwiLCJpbWFnZXMiLCJ1bmxvYWRlZCIsImNvbXBsZXRlIiwibmF0dXJhbFdpZHRoIiwic2luZ2xlSW1hZ2VMb2FkZWQiLCJpbWFnZSIsIkltYWdlIiwiZXZlbnRzIiwibWUiLCJzcmMiLCJrZXlDb2RlcyIsImNvbW1hbmRzIiwic29ydCIsImEiLCJiIiwiYVRhYkluZGV4IiwiYlRhYkluZGV4IiwicGFyc2VLZXkiLCJrZXlDb2RlIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwidG9VcHBlckNhc2UiLCJzaGlmdEtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJnZXRLZXlDb2RlcyIsImNvbXBvbmVudCIsImNvbW1hbmRMaXN0IiwiY21kcyIsImNvbW1hbmQiLCJ6ZklzS2V5SGFuZGxlZCIsImx0ciIsInJldHVyblZhbHVlIiwidW5oYW5kbGVkIiwiY29tcG9uZW50TmFtZSIsIiRmaXJzdEZvY3VzYWJsZSIsIiRsYXN0Rm9jdXNhYmxlIiwia2NzIiwiayIsImtjIiwibWF0Y2hNZWRpYSIsInN0eWxlTWVkaWEiLCJtZWRpYSIsInNjcmlwdCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5mbyIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsImdldENvbXB1dGVkU3R5bGUiLCJjdXJyZW50U3R5bGUiLCJtYXRjaE1lZGl1bSIsInN0eWxlU2hlZXQiLCJjc3NUZXh0IiwidGV4dENvbnRlbnQiLCJtYXRjaGVzIiwicXVlcmllcyIsImlzSW5pdGlhbGl6ZWQiLCJzZWxmIiwiJG1ldGEiLCJleHRyYWN0ZWRTdHlsZXMiLCJuYW1lZFF1ZXJpZXMiLCJwYXJzZVN0eWxlVG9PYmplY3QiLCJfZ2V0Q3VycmVudFNpemUiLCJfd2F0Y2hlciIsIl9yZUluaXQiLCJzaXplIiwicXVlcnkiLCJvbmx5IiwidXBUbyIsIm5leHRTaXplIiwicGFydHMiLCJicFNpemUiLCJicE1vZGlmaWVyIiwicXVlcnlJbmRleCIsImZpbmRJbmRleCIsInEiLCJfZ2V0UXVlcnlOYW1lIiwibmV4dFF1ZXJ5IiwibWF0Y2hlZCIsIm5ld1NpemUiLCJjdXJyZW50U2l6ZSIsInN0eWxlT2JqZWN0IiwicmVkdWNlIiwicmV0IiwicGFyYW0iLCJkZWNvZGVVUklDb21wb25lbnQiLCJpc0FycmF5IiwiaW5pdENsYXNzZXMiLCJhY3RpdmVDbGFzc2VzIiwiYW5pbWF0aW9uIiwiTW92ZSIsImR1cmF0aW9uIiwiYW5pbSIsInByb2ciLCJtb3ZlIiwidHMiLCJpc0luIiwiaW5pdENsYXNzIiwicmVzZXQiLCJvZmZzZXRXaWR0aCIsImZpbmlzaCIsInRyYW5zaXRpb25EdXJhdGlvbiIsIm1lbnUiLCJpdGVtcyIsInN1Yk1lbnVDbGFzcyIsInN1Ykl0ZW1DbGFzcyIsImhhc1N1YkNsYXNzIiwiYXBwbHlBcmlhIiwiJGl0ZW0iLCJUaW1lciIsIm5hbWVTcGFjZSIsInJlbWFpbiIsImlzUGF1c2VkIiwicmVzdGFydCIsImluZmluaXRlIiwicGF1c2UiLCJzdGFydFBvc1giLCJzdGFydFRpbWUiLCJlbGFwc2VkVGltZSIsInN0YXJ0RXZlbnQiLCJpc01vdmluZyIsImRpZE1vdmVkIiwib25Ub3VjaEVuZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvblRvdWNoTW92ZSIsInRhcEV2ZW50IiwiRXZlbnQiLCJzcG90U3dpcGUiLCJ4IiwicGFnZVgiLCJkeCIsImRpciIsImFicyIsIm1vdmVUaHJlc2hvbGQiLCJ0aW1lVGhyZXNob2xkIiwiYXNzaWduIiwib25Ub3VjaFN0YXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NpdmUiLCJTcG90U3dpcGUiLCJlbmFibGVkIiwic3BlY2lhbCIsInN3aXBlIiwic2V0dXAiLCJ0YXAiLCJub29wIiwic2V0dXBTcG90U3dpcGUiLCJzZXR1cFRvdWNoSGFuZGxlciIsImFkZFRvdWNoIiwiaGFuZGxlVG91Y2giLCJjaGFuZ2VkVG91Y2hlcyIsImV2ZW50VHlwZXMiLCJ0b3VjaHN0YXJ0IiwidG91Y2htb3ZlIiwidG91Y2hlbmQiLCJzaW11bGF0ZWRFdmVudCIsIk1vdXNlRXZlbnQiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJNdXRhdGlvbk9ic2VydmVyIiwicHJlZml4ZXMiLCJ0cmlnZ2VycyIsIkxpc3RlbmVycyIsIkJhc2ljIiwiR2xvYmFsIiwiSW5pdGlhbGl6ZXJzIiwib3Blbkxpc3RlbmVyIiwiY2xvc2VMaXN0ZW5lciIsInRvZ2dsZUxpc3RlbmVyIiwiY2xvc2VhYmxlTGlzdGVuZXIiLCJ0b2dnbGVGb2N1c0xpc3RlbmVyIiwiYWRkT3Blbkxpc3RlbmVyIiwiYWRkQ2xvc2VMaXN0ZW5lciIsImFkZFRvZ2dsZUxpc3RlbmVyIiwiYWRkQ2xvc2VhYmxlTGlzdGVuZXIiLCJhZGRUb2dnbGVGb2N1c0xpc3RlbmVyIiwicmVzaXplTGlzdGVuZXIiLCIkbm9kZXMiLCJzY3JvbGxMaXN0ZW5lciIsImNsb3NlTWVMaXN0ZW5lciIsInBsdWdpbklkIiwiYWRkQ2xvc2VtZUxpc3RlbmVyIiwieWV0aUJveGVzIiwicGx1Z05hbWVzIiwibGlzdGVuZXJzIiwiZGVib3VuY2VHbG9iYWxMaXN0ZW5lciIsImRlYm91bmNlIiwibGlzdGVuZXIiLCJhZGRSZXNpemVMaXN0ZW5lciIsImFkZFNjcm9sbExpc3RlbmVyIiwiYWRkTXV0YXRpb25FdmVudHNMaXN0ZW5lciIsImxpc3RlbmluZ0VsZW1lbnRzTXV0YXRpb24iLCJtdXRhdGlvblJlY29yZHNMaXN0IiwiYXR0cmlidXRlTmFtZSIsImVsZW1lbnRPYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwiY2hpbGRMaXN0IiwiY2hhcmFjdGVyRGF0YSIsInN1YnRyZWUiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJhZGRTaW1wbGVMaXN0ZW5lcnMiLCIkZG9jdW1lbnQiLCJhZGRHbG9iYWxMaXN0ZW5lcnMiLCJfXyIsInRyaWdnZXJzSW5pdGlhbGl6ZWQiLCJJSGVhcllvdSIsIndlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJsb2FkZWQiLCJtIiwiYyIsImFzayIsImlnbm9yZUtleXMiLCJzcGVjaWZpY0tleXMiLCJyZWdpc3Rlck9uQ2hhbmdlIiwidW5SZWdpc3Rlck9uQ2hhbmdlIiwiZG9jRWxlbSIsImN1cnJlbnRFbGVtZW50IiwiY3VycmVudElucHV0IiwiY3VycmVudEludGVudCIsImN1cnJlbnRUaW1lc3RhbXAiLCJzaG91bGRQZXJzaXN0IiwiZm9ybUlucHV0cyIsImZ1bmN0aW9uTGlzdCIsImlnbm9yZU1hcCIsInNwZWNpZmljTWFwIiwiaW5wdXRNYXAiLCJrZXlkb3duIiwia2V5dXAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJNU1BvaW50ZXJEb3duIiwiTVNQb2ludGVyTW92ZSIsInBvaW50ZXJkb3duIiwicG9pbnRlcm1vdmUiLCJpc1Njcm9sbGluZyIsIm1vdXNlUG9zIiwieSIsInBvaW50ZXJNYXAiLCJzdXBwb3J0c1Bhc3NpdmUiLCJkZWZpbmVQcm9wZXJ0eSIsInNldFVwIiwiZGV0ZWN0V2hlZWwiLCJhZGRMaXN0ZW5lcnMiLCJjYXB0dXJlIiwic2V0UGVyc2lzdCIsIlBvaW50ZXJFdmVudCIsInNldElucHV0Iiwic2V0SW50ZW50IiwiTVNQb2ludGVyRXZlbnQiLCJzZXRFbGVtZW50IiwiY2xlYXJFbGVtZW50Iiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwiZG9VcGRhdGUiLCJldmVudEtleSIsInBvaW50ZXJUeXBlIiwiaWdub3JlTWF0Y2giLCJzcGVjaWZpY01hdGNoIiwic2hvdWxkVXBkYXRlIiwidmFsaWRhdGVUb3VjaCIsInBlcnNpc3RJbnB1dCIsImFjdGl2ZUVsZW0iLCJub3RGb3JtSW5wdXQiLCJub2RlTmFtZSIsImNoZWNrQ2xvc2VzdCIsImZpcmVGdW5jdGlvbnMiLCJkZXRlY3RTY3JvbGxpbmciLCJjbGFzc0xpc3QiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRJdGVtIiwidGltZXN0YW1wIiwidG91Y2hJc1ZhbGlkIiwid2hlZWxUeXBlIiwib25tb3VzZXdoZWVsIiwib2JqUG9zIiwidGFnIiwiRWxlbWVudFByb3RvdHlwZSIsIkVsZW1lbnQiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsInBhcmVudEVsZW1lbnQiLCJub2RlVHlwZSIsImFyciIsImNsZWFyU3RvcmFnZSIsIkNvcmVVdGlscyJdLCJzb3VyY2VSb290IjoiIn0=