"use strict";
var moduleSearch;
(self["webpackChunkkr"] = self["webpackChunkkr"] || []).push([["modulesearch"],{

/***/ "./src/media/com_knowres/js/src/modules/search.js":
/*!********************************************************!*\
  !*** ./src/media/com_knowres/js/src/modules/search.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAgeField: () => (/* binding */ createAgeField),
/* harmony export */   guestIncrement: () => (/* binding */ guestIncrement),
/* harmony export */   removeAgeField: () => (/* binding */ removeAgeField),
/* harmony export */   setregion: () => (/* binding */ setregion)
/* harmony export */ });
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
// noinspection JSUnusedGlobalSymbols



function guestIncrement(updown, target, atext, ctext) {
  let cac = document.getElementById('child-ages-container');
  let aci = document.getElementById(target);
  let value = parseInt(aci.value);
  value += updown;
  if (value >= aci.getAttribute('min') && value <= aci.getAttribute('max')) {
    document.getElementById('aplus').disabled = false;
    document.getElementById('cplus').disabled = false;
    let guests = document.getElementById('guests');
    let maxguests = parseInt(guests.dataset.max);
    let maxadults = parseInt(guests.dataset.adults);
    let guestcount = parseInt(guests.options[guests.selectedIndex].value) + parseInt(updown);
    if (guestcount > 0 && guestcount <= maxguests) {
      document.getElementById(target).value = value;
      let adults = document.getElementById('adults').value;
      let children = document.getElementById('children').value;
      guests.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext;
      guests.value = guestcount;
      if (target === 'children') {
        let agehelp = document.getElementById('age-help');
        if (updown === 1) {
          if (value === 1) {
            agehelp.hidden = false;
          }
          cac.append(createAgeField(value));
        } else {
          if (value === 1) {
            agehelp.hidden = true;
          }
          removeAgeField(value + 1);
        }
      }
      if (parseInt(adults) + parseInt(children) === maxguests) {
        document.getElementById('aplus').disabled = true;
        document.getElementById('cplus').disabled = true;
      }
      if (parseInt(adults) === maxadults) {
        document.getElementById('aplus').disabled = true;
      }
    }
  }
}
function createAgeField(count) {
  let newage = document.createElement('input');
  newage.setAttribute('type', 'number');
  newage.setAttribute('aria-label', 'Age ' + count);
  newage.setAttribute('min', '0');
  newage.setAttribute('max', '17');
  newage.setAttribute('value', '2');
  newage.setAttribute('step', '1');
  newage.setAttribute('name', 'child_ages[]');
  newage.setAttribute('id', 'child_ages_' + count);
  newage.setAttribute('class', 'form-control valid form-control-success');
  return newage;
}
function removeAgeField(count) {
  let container = document.getElementById('child_ages_' + count);
  container.remove();
}
function setregion(id) {
  let element = document.getElementById('region_id');
  element.value = id;
  let pane = document.getElementById('region_id');
  pane.click();
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/media/com_knowres/js/src/modules/search.js"));
/******/ moduleSearch = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFDbkI7QUFFTyxTQUFTQyxTQUFTQSxDQUFDQyxFQUFFLEVBQUU7RUFDN0IsSUFBSUMsT0FBTyxHQUFHL0IsUUFBUSxDQUFDQyxjQUFjLENBQUMsV0FBVyxDQUFDO0VBQ2xEOEIsT0FBTyxDQUFDNUIsS0FBSyxHQUFHMkIsRUFBRTtFQUNsQixJQUFJRSxJQUFJLEdBQUdoQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7RUFDL0MrQixJQUFJLENBQUNDLEtBQUssQ0FBQyxDQUFDO0FBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvbW9kdWxlcy9zZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGd1ZXN0SW5jcmVtZW50KHVwZG93biwgdGFyZ2V0LCBhdGV4dCwgY3RleHQpIHtcblx0bGV0IGNhYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZC1hZ2VzLWNvbnRhaW5lcicpO1xuXHRsZXQgYWNpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KTtcblx0bGV0IHZhbHVlID0gcGFyc2VJbnQoYWNpLnZhbHVlKTtcblx0dmFsdWUgKz0gdXBkb3duO1xuXHRpZiAodmFsdWUgPj0gYWNpLmdldEF0dHJpYnV0ZSgnbWluJykgJiYgdmFsdWUgPD0gYWNpLmdldEF0dHJpYnV0ZSgnbWF4JykpIHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBsdXMnKS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcGx1cycpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0bGV0IGd1ZXN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdndWVzdHMnKTtcblx0XHRsZXQgbWF4Z3Vlc3RzID0gcGFyc2VJbnQoZ3Vlc3RzLmRhdGFzZXQubWF4KTtcblx0XHRsZXQgbWF4YWR1bHRzID0gcGFyc2VJbnQoZ3Vlc3RzLmRhdGFzZXQuYWR1bHRzKTtcblx0XHRsZXQgZ3Vlc3Rjb3VudCA9IHBhcnNlSW50KGd1ZXN0cy5vcHRpb25zW2d1ZXN0cy5zZWxlY3RlZEluZGV4XS52YWx1ZSkgKyBwYXJzZUludCh1cGRvd24pO1xuXHRcdGlmIChndWVzdGNvdW50ID4gMCAmJiBndWVzdGNvdW50IDw9IG1heGd1ZXN0cykge1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KS52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0bGV0IGFkdWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZHVsdHMnKS52YWx1ZTtcblx0XHRcdGxldCBjaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZHJlbicpLnZhbHVlO1xuXHRcdFx0Z3Vlc3RzLm9wdGlvbnNbZ3Vlc3Rjb3VudCAtIDFdLnRleHQgPSBhZHVsdHMgKyAnICcgKyBhdGV4dCArICcsICcgKyBjaGlsZHJlbiArICcgJyArIGN0ZXh0O1xuXHRcdFx0Z3Vlc3RzLnZhbHVlID0gZ3Vlc3Rjb3VudDtcblx0XHRcdGlmICh0YXJnZXQgPT09ICdjaGlsZHJlbicpIHtcblx0XHRcdFx0bGV0IGFnZWhlbHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlLWhlbHAnKTtcblx0XHRcdFx0aWYgKHVwZG93biA9PT0gMSkge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0YWdlaGVscC5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FjLmFwcGVuZChjcmVhdGVBZ2VGaWVsZCh2YWx1ZSkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0YWdlaGVscC5oaWRkZW4gPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZW1vdmVBZ2VGaWVsZCh2YWx1ZSArIDEpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICgocGFyc2VJbnQoYWR1bHRzKSArIHBhcnNlSW50KGNoaWxkcmVuKSkgPT09IG1heGd1ZXN0cykge1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBsdXMnKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcGx1cycpLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmIChwYXJzZUludChhZHVsdHMpID09PSBtYXhhZHVsdHMpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWdlRmllbGQoY291bnQpIHtcblx0bGV0IG5ld2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbnVtYmVyJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWdlICcgKyBjb3VudCk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ21pbicsICcwJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ21heCcsICcxNycpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcyJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3N0ZXAnLCAnMScpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NoaWxkX2FnZXNbXScpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCdpZCcsICdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm0tY29udHJvbCB2YWxpZCBmb3JtLWNvbnRyb2wtc3VjY2VzcycpO1xuXHRyZXR1cm4gbmV3YWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWdlRmllbGQoY291bnQpIHtcblx0bGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG5cdGNvbnRhaW5lci5yZW1vdmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0cmVnaW9uKGlkKSB7XG5cdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lvbl9pZCcpO1xuXHRlbGVtZW50LnZhbHVlID0gaWQ7XG5cdGxldCBwYW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lvbl9pZCcpO1xuXHRwYW5lLmNsaWNrKCk7XG59Il0sIm5hbWVzIjpbImd1ZXN0SW5jcmVtZW50IiwidXBkb3duIiwidGFyZ2V0IiwiYXRleHQiLCJjdGV4dCIsImNhYyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhY2kiLCJ2YWx1ZSIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiZGlzYWJsZWQiLCJndWVzdHMiLCJtYXhndWVzdHMiLCJkYXRhc2V0IiwibWF4IiwibWF4YWR1bHRzIiwiYWR1bHRzIiwiZ3Vlc3Rjb3VudCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwiY2hpbGRyZW4iLCJ0ZXh0IiwiYWdlaGVscCIsImhpZGRlbiIsImFwcGVuZCIsImNyZWF0ZUFnZUZpZWxkIiwicmVtb3ZlQWdlRmllbGQiLCJjb3VudCIsIm5ld2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjb250YWluZXIiLCJyZW1vdmUiLCJzZXRyZWdpb24iLCJpZCIsImVsZW1lbnQiLCJwYW5lIiwiY2xpY2siXSwic291cmNlUm9vdCI6IiJ9