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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXhDLENBQWhCO0VBQ0FJLFNBQVMsQ0FBQ0MsTUFBVjtBQUNBO0FBRU0sU0FBU0MsU0FBVCxDQUFtQkMsRUFBbkIsRUFBdUI7RUFDN0IsSUFBSUMsT0FBTyxHQUFHL0IsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWQ7RUFDQThCLE9BQU8sQ0FBQzVCLEtBQVIsR0FBZ0IyQixFQUFoQjtFQUNBLElBQUlFLElBQUksR0FBR2hDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixXQUF4QixDQUFYO0VBQ0ErQixJQUFJLENBQUNDLEtBQUw7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tyLy4vc3JjL21lZGlhL2NvbV9rbm93cmVzL2pzL3NyYy9tb2R1bGVzL3NlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwYWNrYWdlICAgIEtub3cgUmVzZXJ2YXRpb25zXG4gKiBAc3VicGFja2FnZSBTaXRlIEpTXG4gKiBAY29weXJpZ2h0ICAyMDIwIEhpZ2hsYW5kIFZpc2lvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEBsaWNlbnNlICAgIFNlZSB0aGUgZmlsZSBcIkxJQ0VOU0UudHh0XCIgZm9yIHRoZSBmdWxsIGxpY2Vuc2UgZ292ZXJuaW5nIHRoaXMgY29kZS5cbiAqIEBhdXRob3IgICAgIEhhemVsIFdpbHNvbiA8aGF6ZWxAaGlnaGxhbmR2aXNpb24uY29tPlxuICovXG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ3Vlc3RJbmNyZW1lbnQodXBkb3duLCB0YXJnZXQsIGF0ZXh0LCBjdGV4dCkge1xuXHRsZXQgY2FjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkLWFnZXMtY29udGFpbmVyJyk7XG5cdGxldCBhY2kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpO1xuXHRsZXQgdmFsdWUgPSBwYXJzZUludChhY2kudmFsdWUpO1xuXHR2YWx1ZSArPSB1cGRvd247XG5cdGlmICh2YWx1ZSA+PSBhY2kuZ2V0QXR0cmlidXRlKCdtaW4nKSAmJiB2YWx1ZSA8PSBhY2kuZ2V0QXR0cmlidXRlKCdtYXgnKSkge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGx1cycpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRsZXQgZ3Vlc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2d1ZXN0cycpO1xuXHRcdGxldCBtYXhndWVzdHMgPSBwYXJzZUludChndWVzdHMuZGF0YXNldC5tYXgpO1xuXHRcdGxldCBtYXhhZHVsdHMgPSBwYXJzZUludChndWVzdHMuZGF0YXNldC5hZHVsdHMpO1xuXHRcdGxldCBndWVzdGNvdW50ID0gcGFyc2VJbnQoZ3Vlc3RzLm9wdGlvbnNbZ3Vlc3RzLnNlbGVjdGVkSW5kZXhdLnZhbHVlKSArIHBhcnNlSW50KHVwZG93bik7XG5cdFx0aWYgKGd1ZXN0Y291bnQgPiAwICYmIGd1ZXN0Y291bnQgPD0gbWF4Z3Vlc3RzKSB7XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRsZXQgYWR1bHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkdWx0cycpLnZhbHVlO1xuXHRcdFx0bGV0IGNoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkcmVuJykudmFsdWU7XG5cdFx0XHRndWVzdHMub3B0aW9uc1tndWVzdGNvdW50IC0gMV0udGV4dCA9IGFkdWx0cyArICcgJyArIGF0ZXh0ICsgJywgJyArIGNoaWxkcmVuICsgJyAnICsgY3RleHQ7XG5cdFx0XHRndWVzdHMudmFsdWUgPSBndWVzdGNvdW50O1xuXHRcdFx0aWYgKHRhcmdldCA9PT0gJ2NoaWxkcmVuJykge1xuXHRcdFx0XHRsZXQgYWdlaGVscCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtaGVscCcpO1xuXHRcdFx0XHRpZiAodXBkb3duID09PSAxKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWMuYXBwZW5kKGNyZWF0ZUFnZUZpZWxkKHZhbHVlKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlbW92ZUFnZUZpZWxkKHZhbHVlICsgMSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKChwYXJzZUludChhZHVsdHMpICsgcGFyc2VJbnQoY2hpbGRyZW4pKSA9PT0gbWF4Z3Vlc3RzKSB7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGx1cycpLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBhcnNlSW50KGFkdWx0cykgPT09IG1heGFkdWx0cykge1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBsdXMnKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZ2VGaWVsZChjb3VudCkge1xuXHRsZXQgbmV3YWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgndHlwZScsICdudW1iZXInKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdBZ2UgJyArIGNvdW50KTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnbWluJywgJzAnKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnbWF4JywgJzE3Jyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJzInKTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnc3RlcCcsICcxJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnY2hpbGRfYWdlc1tdJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NoaWxkX2FnZXNfJyArIGNvdW50KTtcblx0bmV3YWdlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZm9ybS1jb250cm9sIHZhbGlkIGZvcm0tY29udHJvbC1zdWNjZXNzJyk7XG5cdHJldHVybiBuZXdhZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBZ2VGaWVsZChjb3VudCkge1xuXHRsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkX2FnZXNfJyArIGNvdW50KTtcblx0Y29udGFpbmVyLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRyZWdpb24oaWQpIHtcblx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uX2lkJyk7XG5cdGVsZW1lbnQudmFsdWUgPSBpZDtcblx0bGV0IHBhbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uX2lkJyk7XG5cdHBhbmUuY2xpY2soKTtcbn0iXSwibmFtZXMiOlsiZ3Vlc3RJbmNyZW1lbnQiLCJ1cGRvd24iLCJ0YXJnZXQiLCJhdGV4dCIsImN0ZXh0IiwiY2FjIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFjaSIsInZhbHVlIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJkaXNhYmxlZCIsImd1ZXN0cyIsIm1heGd1ZXN0cyIsImRhdGFzZXQiLCJtYXgiLCJtYXhhZHVsdHMiLCJhZHVsdHMiLCJndWVzdGNvdW50Iiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJjaGlsZHJlbiIsInRleHQiLCJhZ2VoZWxwIiwiaGlkZGVuIiwiYXBwZW5kIiwiY3JlYXRlQWdlRmllbGQiLCJyZW1vdmVBZ2VGaWVsZCIsImNvdW50IiwibmV3YWdlIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNvbnRhaW5lciIsInJlbW92ZSIsInNldHJlZ2lvbiIsImlkIiwiZWxlbWVudCIsInBhbmUiLCJjbGljayJdLCJzb3VyY2VSb290IjoiIn0=