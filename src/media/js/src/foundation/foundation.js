//import $ from 'jquery';
//import 'what-input';
//for all
//import { Foundation } from ('./node_modules/foundation-sites');
import {Foundation} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.core';
import * as CoreUtils from 'Z:/krdev/node_modules/foundation-sites/js/foundation.core.utils';
import {Box} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.box';
import {onImagesLoaded} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.imageLoader';
import {Keyboard} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.keyboard';
import {MediaQuery} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.mediaQuery';
import {Motion, Move} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.motion';
import {Nest} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.nest';
import {Timer} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.timer';
import {Touch} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.touch';
import {Triggers} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.util.triggers';
//import { Abide } from 'Z:/krdev/node_modules/foundation-sites/js/foundation.abide';
//import { Accordion } from 'Z:/krdev/node_modules/foundation-sites/js/foundation.accordion';
//import { AccordionMenu } from 'Z:/krdev/node_modules/foundation-sites/js/foundation.accordionMenu';
//import { Drilldown } from 'foundation.drilldown';
import {Dropdown} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.dropdown';
import {DropdownMenu} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.dropdownMenu';
import {Equalizer} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.equalizer';
//import { Interchange } from 'foundation.interchange';
import {Magellan} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.magellan';
import {OffCanvas} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.offcanvas';
//import { Orbit } from 'foundation.orbit';
import {ResponsiveMenu} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.responsiveMenu';
import {ResponsiveToggle} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.responsiveToggle';
import {Reveal} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.reveal';
//import { Slider } from 'foundation.slider';
//import { SmoothScroll } from 'foundation.smoothScroll';
import {Sticky} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.sticky';
import {Tabs} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.tabs';
import {Toggler} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.toggler';
import {Tooltip} from 'Z:/krdev/node_modules/foundation-sites/js/foundation.tooltip';
//import { ResponsiveAccordionTabs } from 'foundation.responsiveAccordionTabs';

Foundation.addToJquery($);

// IMPORTS
//Add Foundation Utils to Foundation global namespace for backwards
//compatibility.
Foundation.rtl = CoreUtils.rtl;
Foundation.GetYoDigits = CoreUtils.GetYoDigits;
Foundation.transitionend = CoreUtils.transitionend;
Foundation.RegExpEscape = CoreUtils.RegExpEscape;
Foundation.onLoad = CoreUtils.onLoad;

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

//Touch and Triggers previously were almost purely side effect driven,
//so no need to add it to Foundation, just init them.
Touch.init($);
Triggers.init($, Foundation);
MediaQuery._init();

//Foundation.plugin(Abide, 'Abide');
//Foundation.plugin(Accordion, 'Accordion');
//Foundation.plugin(AccordionMenu, 'AccordionMenu');
//Foundation.plugin(Drilldown, 'Drilldown');
Foundation.plugin(Dropdown, 'Dropdown');
Foundation.plugin(DropdownMenu, 'DropdownMenu');
Foundation.plugin(Equalizer, 'Equalizer');
//Foundation.plugin(Interchange, 'Interchange');
Foundation.plugin(Magellan, 'Magellan');
Foundation.plugin(OffCanvas, 'OffCanvas');
//Foundation.plugin(Orbit, 'Orbit');
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
Foundation.plugin(Reveal, 'Reveal');
//Foundation.plugin(Slider, 'Slider');
//Foundation.plugin(SmoothScroll, 'SmoothScroll');
Foundation.plugin(Sticky, 'Sticky');
Foundation.plugin(Tabs, 'Tabs');
Foundation.plugin(Toggler, 'Toggler');
Foundation.plugin(Tooltip, 'Tooltip');
//Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

export {Foundation};