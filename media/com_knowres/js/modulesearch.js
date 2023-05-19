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
/* harmony export */   "createAgeField": () => (/* binding */ createAgeField),
/* harmony export */   "guestIncrement": () => (/* binding */ guestIncrement),
/* harmony export */   "removeAgeField": () => (/* binding */ removeAgeField),
/* harmony export */   "setregion": () => (/* binding */ setregion)
/* harmony export */ });
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
// noinspection JSUnusedGlobalSymbols


function guestIncrement(updown, target, atext, ctext, quote) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0IsZ0JBQWdCc0IsS0FBeEMsQ0FBaEI7RUFDQUksU0FBUyxDQUFDQyxNQUFWO0FBQ0E7QUFFTSxTQUFTQyxTQUFULENBQW1CQyxFQUFuQixFQUF1QjtFQUM3QixJQUFJQyxPQUFPLEdBQUcvQixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZDtFQUNBOEIsT0FBTyxDQUFDNUIsS0FBUixHQUFnQjJCLEVBQWhCO0VBQ0EsSUFBSUUsSUFBSSxHQUFHaEMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQVg7RUFDQStCLElBQUksQ0FBQ0MsS0FBTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va3IvLi9zcmMvbWVkaWEvY29tX2tub3dyZXMvanMvc3JjL21vZHVsZXMvc2VhcmNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHBhY2thZ2UgICAgS25vdyBSZXNlcnZhdGlvbnNcbiAqIEBzdWJwYWNrYWdlIFNpdGUgSlNcbiAqIEBjb3B5cmlnaHQgIDIwMjAgSGlnaGxhbmQgVmlzaW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogQGxpY2Vuc2UgICAgU2VlIHRoZSBmaWxlIFwiTElDRU5TRS50eHRcIiBmb3IgdGhlIGZ1bGwgbGljZW5zZSBnb3Zlcm5pbmcgdGhpcyBjb2RlLlxuICogQGF1dGhvciAgICAgSGF6ZWwgV2lsc29uIDxoYXplbEBoaWdobGFuZHZpc2lvbi5jb20+XG4gKi9cbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBndWVzdEluY3JlbWVudCh1cGRvd24sIHRhcmdldCwgYXRleHQsIGN0ZXh0LCBxdW90ZSkge1xuXHRsZXQgY2FjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkLWFnZXMtY29udGFpbmVyJyk7XG5cdGxldCBhY2kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpO1xuXHRsZXQgdmFsdWUgPSBwYXJzZUludChhY2kudmFsdWUpO1xuXHR2YWx1ZSArPSB1cGRvd247XG5cdGlmICh2YWx1ZSA+PSBhY2kuZ2V0QXR0cmlidXRlKCdtaW4nKSAmJiB2YWx1ZSA8PSBhY2kuZ2V0QXR0cmlidXRlKCdtYXgnKSkge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGx1cycpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRsZXQgZ3Vlc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXN0cycpO1xuXHRcdGxldCBtYXhndWVzdHMgPSBwYXJzZUludChndWVzdHMuZGF0YXNldC5tYXgpO1xuXHRcdGxldCBtYXhhZHVsdHMgPSBwYXJzZUludChndWVzdHMuZGF0YXNldC5hZHVsdHMpO1xuXHRcdGxldCBndWVzdGNvdW50ID0gcGFyc2VJbnQoZ3Vlc3RzLm9wdGlvbnNbZ3Vlc3RzLnNlbGVjdGVkSW5kZXhdLnZhbHVlKSArIHBhcnNlSW50KHVwZG93bik7XG5cdFx0aWYgKGd1ZXN0Y291bnQgPiAwICYmIGd1ZXN0Y291bnQgPD0gbWF4Z3Vlc3RzKSB7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRsZXQgYWR1bHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkdWx0cycpLnZhbHVlO1xuXHRcdFx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkcmVuJykudmFsdWU7XG5cdFx0XHRndWVzdHMub3B0aW9uc1tndWVzdGNvdW50IC0gMV0udGV4dCA9IGFkdWx0cyArICcgJyArIGF0ZXh0ICsgJywgJyArIGNoaWxkcmVuICsgJyAnICsgY3RleHQ7XG5cdFx0XHRndWVzdHMudmFsdWUgPSBndWVzdGNvdW50O1xuXHRcdFx0aWYgKHRhcmdldCA9PT0gJ2NoaWxkcmVuJykge1xuXHRcdFx0XHRsZXQgYWdlaGVscCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtaGVscCcpO1xuXHRcdFx0XHRpZiAodXBkb3duID09PSAxKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWMuYXBwZW5kKGNyZWF0ZUFnZUZpZWxkKHZhbHVlKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlbW92ZUFnZUZpZWxkKHZhbHVlICsgMSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKChwYXJzZUludChhZHVsdHMpICsgcGFyc2VJbnQoY2hpbGRyZW4pKSA9PT0gbWF4Z3Vlc3RzKSB7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGx1cycpLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBhcnNlSW50KGFkdWx0cykgPT09IG1heGFkdWx0cykge1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBsdXMnKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZ2VGaWVsZChjb3VudCkge1xuXHRsZXQgbmV3YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgndHlwZScsICdudW1iZXInKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdBZ2UgJyArIGNvdW50KTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnbWluJywgJzAnKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnbWF4JywgJzE3Jyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJzInKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnc3RlcCcsICcxJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnY2hpbGRfYWdlc1tdJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NoaWxkX2FnZXNfJyArIGNvdW50KTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybS1jb250cm9sIHZhbGlkIGZvcm0tY29udHJvbC1zdWNjZXNzJyk7XG5cdHJldHVybiBuZXdhZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBZ2VGaWVsZChjb3VudCkge1xuXHRsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkX2FnZXNfJyArIGNvdW50KTtcblx0Y29udGFpbmVyLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRyZWdpb24oaWQpIHtcblx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uX2lkJyk7XG5cdGVsZW1lbnQudmFsdWUgPSBpZDtcblx0bGV0IHBhbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uX2lkJyk7XG5cdHBhbmUuY2xpY2soKTtcbn0iXSwibmFtZXMiOlsiZ3Vlc3RJbmNyZW1lbnQiLCJ1cGRvd24iLCJ0YXJnZXQiLCJhdGV4dCIsImN0ZXh0IiwicXVvdGUiLCJjYWMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWNpIiwidmFsdWUiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImRpc2FibGVkIiwiZ3Vlc3RzIiwibWF4Z3Vlc3RzIiwiZGF0YXNldCIsIm1heCIsIm1heGFkdWx0cyIsImFkdWx0cyIsImd1ZXN0Y291bnQiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsImNoaWxkcmVuIiwidGV4dCIsImFnZWhlbHAiLCJoaWRkZW4iLCJhcHBlbmQiLCJjcmVhdGVBZ2VGaWVsZCIsInJlbW92ZUFnZUZpZWxkIiwiY291bnQiLCJuZXdhZ2UiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29udGFpbmVyIiwicmVtb3ZlIiwic2V0cmVnaW9uIiwiaWQiLCJlbGVtZW50IiwicGFuZSIsImNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==