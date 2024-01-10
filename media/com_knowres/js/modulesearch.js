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
/* harmony export */   removeAgeField: () => (/* binding */ removeAgeField)
/* harmony export */ });
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
// noinspection JSUnusedGlobalSymbols



function guestIncrement(updown, target, atext, ctext, ctext1) {
  let cac = document.getElementById('child-ages-container');
  let aci = document.getElementById(target);
  let value = parseInt(aci.value);
  value += updown;
  if (value >= aci.getAttribute('min') && value <= aci.getAttribute('max')) {
    document.getElementById('aplus').disabled = false;
    document.getElementById('cplus').disabled = false;
    let dropdown = document.getElementById('guests');
    let maxguests = parseInt(dropdown.dataset.max);
    let elAdults = document.getElementById('adults');
    let maxadults = Number(elAdults.getAttribute('max'));
    let guestcount = parseInt(dropdown.options[dropdown.selectedIndex].value) + parseInt(updown);
    if (guestcount > 0 && guestcount <= maxguests) {
      document.getElementById(target).value = value;
      let adults = Number(elAdults.value);
      let children = Number(document.getElementById('children').value);
      if (children === 1) dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext1;else dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext;
      dropdown.value = guestcount;
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
      if (adults + children === maxadults) {
        document.getElementById('aplus').disabled = true;
        document.getElementById('cplus').disabled = true;
      }
      if (adults === maxadults) {
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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/media/com_knowres/js/src/modules/search.js"));
/******/ moduleSearch = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBR0gsS0FBSyxDQUFDO0VBQ2hEQyxNQUFNLENBQUNFLFlBQVksQ0FBQyxPQUFPLEVBQUUseUNBQXlDLENBQUM7RUFDdkUsT0FBT0YsTUFBTTtBQUNqQjtBQUVPLFNBQVNGLGNBQWNBLENBQUNDLEtBQUssRUFBRTtFQUNsQyxJQUFJSSxTQUFTLEdBQUc3QixRQUFRLENBQUNDLGNBQWMsQ0FBQyxhQUFhLEdBQUd3QixLQUFLLENBQUM7RUFDOURJLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFDdEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rci8uL3NyYy9tZWRpYS9jb21fa25vd3Jlcy9qcy9zcmMvbW9kdWxlcy9zZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGd1ZXN0SW5jcmVtZW50KHVwZG93biwgdGFyZ2V0LCBhdGV4dCwgY3RleHQsIGN0ZXh0MSkge1xuICAgIGxldCBjYWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hpbGQtYWdlcy1jb250YWluZXInKTtcbiAgICBsZXQgYWNpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KTtcbiAgICBsZXQgdmFsdWUgPSBwYXJzZUludChhY2kudmFsdWUpO1xuICAgIHZhbHVlICs9IHVwZG93bjtcbiAgICBpZiAodmFsdWUgPj0gYWNpLmdldEF0dHJpYnV0ZSgnbWluJykgJiYgdmFsdWUgPD0gYWNpLmdldEF0dHJpYnV0ZSgnbWF4JykpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwbHVzJykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXN0cycpO1xuICAgICAgICBsZXQgbWF4Z3Vlc3RzID0gcGFyc2VJbnQoZHJvcGRvd24uZGF0YXNldC5tYXgpO1xuICAgICAgICBsZXQgZWxBZHVsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWR1bHRzJyk7XG4gICAgICAgIGxldCBtYXhhZHVsdHMgPSBOdW1iZXIoZWxBZHVsdHMuZ2V0QXR0cmlidXRlKCdtYXgnKSk7XG4gICAgICAgIGxldCBndWVzdGNvdW50ID0gcGFyc2VJbnQoZHJvcGRvd24ub3B0aW9uc1tkcm9wZG93bi5zZWxlY3RlZEluZGV4XS52YWx1ZSkgKyBwYXJzZUludCh1cGRvd24pO1xuICAgICAgICBpZiAoZ3Vlc3Rjb3VudCA+IDAgJiYgZ3Vlc3Rjb3VudCA8PSBtYXhndWVzdHMpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBhZHVsdHMgPSBOdW1iZXIoZWxBZHVsdHMudmFsdWUpO1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZHJlbicpLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbiA9PT0gMSlcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5vcHRpb25zW2d1ZXN0Y291bnQgLSAxXS50ZXh0ID0gYWR1bHRzICsgJyAnICsgYXRleHQgKyAnLCAnICsgY2hpbGRyZW4gKyAnICcgKyBjdGV4dDE7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZHJvcGRvd24ub3B0aW9uc1tndWVzdGNvdW50IC0gMV0udGV4dCA9IGFkdWx0cyArICcgJyArIGF0ZXh0ICsgJywgJyArIGNoaWxkcmVuICsgJyAnICsgY3RleHQ7XG4gICAgICAgICAgICBkcm9wZG93bi52YWx1ZSA9IGd1ZXN0Y291bnQ7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09ICdjaGlsZHJlbicpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWdlaGVscCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtaGVscCcpO1xuICAgICAgICAgICAgICAgIGlmICh1cGRvd24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VoZWxwLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhYy5hcHBlbmQoY3JlYXRlQWdlRmllbGQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZWhlbHAuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVBZ2VGaWVsZCh2YWx1ZSArIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkdWx0cyArIGNoaWxkcmVuID09PSBtYXhhZHVsdHMpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBsdXMnKS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFkdWx0cyA9PT0gbWF4YWR1bHRzKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWdlRmllbGQoY291bnQpIHtcbiAgICBsZXQgbmV3YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBuZXdhZ2Uuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xuICAgIG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWdlICcgKyBjb3VudCk7XG4gICAgbmV3YWdlLnNldEF0dHJpYnV0ZSgnbWluJywgJzAnKTtcbiAgICBuZXdhZ2Uuc2V0QXR0cmlidXRlKCdtYXgnLCAnMTcnKTtcbiAgICBuZXdhZ2Uuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcyJyk7XG4gICAgbmV3YWdlLnNldEF0dHJpYnV0ZSgnc3RlcCcsICcxJyk7XG4gICAgbmV3YWdlLnNldEF0dHJpYnV0ZSgnbmFtZScsICdjaGlsZF9hZ2VzW10nKTtcbiAgICBuZXdhZ2Uuc2V0QXR0cmlidXRlKCdpZCcsICdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG4gICAgbmV3YWdlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybS1jb250cm9sIHZhbGlkIGZvcm0tY29udHJvbC1zdWNjZXNzJyk7XG4gICAgcmV0dXJuIG5ld2FnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUFnZUZpZWxkKGNvdW50KSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG4gICAgY29udGFpbmVyLnJlbW92ZSgpXG59Il0sIm5hbWVzIjpbImd1ZXN0SW5jcmVtZW50IiwidXBkb3duIiwidGFyZ2V0IiwiYXRleHQiLCJjdGV4dCIsImN0ZXh0MSIsImNhYyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhY2kiLCJ2YWx1ZSIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiZGlzYWJsZWQiLCJkcm9wZG93biIsIm1heGd1ZXN0cyIsImRhdGFzZXQiLCJtYXgiLCJlbEFkdWx0cyIsIm1heGFkdWx0cyIsIk51bWJlciIsImd1ZXN0Y291bnQiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsImFkdWx0cyIsImNoaWxkcmVuIiwidGV4dCIsImFnZWhlbHAiLCJoaWRkZW4iLCJhcHBlbmQiLCJjcmVhdGVBZ2VGaWVsZCIsInJlbW92ZUFnZUZpZWxkIiwiY291bnQiLCJuZXdhZ2UiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29udGFpbmVyIiwicmVtb3ZlIl0sInNvdXJjZVJvb3QiOiIifQ==