"use strict";
var moduleSearch;
(self["webpackChunkkrdev"] = self["webpackChunkkrdev"] || []).push([["modulesearch"], {

	/***/ "./pkg/kr/src/media/js/src/modules/search.js":
	/*!***************************************************!*\
	  !*** ./pkg/kr/src/media/js/src/modules/search.js ***!
	  \***************************************************/
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

// function is used ignore phpstorm warning
function guestIncrement(updown, target, atext, ctext, ctext1) {
			var cac = document.getElementById('child-ages-container');
			var aci = document.getElementById(target);
			var value = parseInt(aci.value);
  value += updown;
  if (value >= aci.getAttribute('min') && value <= aci.getAttribute('max')) {
    document.getElementById('aplus').disabled = false;
    document.getElementById('cplus').disabled = false;
	  var dropdown = document.getElementById('guests');
	  var maxguests = parseInt(dropdown.dataset.max);
	  var elAdults = document.getElementById('adults');
	  var maxadults = Number(elAdults.getAttribute('max'));
	  var guestcount = parseInt(dropdown.options[dropdown.selectedIndex].value) + parseInt(updown);
    if (guestcount > 0 && guestcount <= maxguests) {
      document.getElementById(target).value = value;
		var adults = Number(elAdults.value);
		var children = Number(document.getElementById('children').value);
      if (children === 1) dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext1;else dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext;
      dropdown.value = guestcount;
      if (target === 'children') {
		  var agehelp = document.getElementById('age-help');
        if (updown === 1) {
          if (value === 1) {
            agehelp.hidden = false;
          }
          cac.append(createAgeField(value));
        } else {
          if (value === 0) {
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

// noinspection JSUnusedGlobalSymbols
function createAgeField(count) {
	var newage = document.createElement('input');
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
	var container = document.getElementById('child_ages_' + count);
  container.remove();
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
		/******/
		var __webpack_exports__ = (__webpack_exec__("./pkg/kr/src/media/js/src/modules/search.js"));
/******/ moduleSearch = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxhQUFhLEdBQUdILEtBQUssQ0FBQztFQUNoREMsTUFBTSxDQUFDRSxZQUFZLENBQUMsT0FBTyxFQUFFLHlDQUF5QyxDQUFDO0VBQ3ZFLE9BQU9GLE1BQU07QUFDZDtBQUVPLFNBQVNGLGNBQWNBLENBQUNDLEtBQUssRUFBRTtFQUNyQyxJQUFJSSxTQUFTLEdBQUc3QixRQUFRLENBQUNDLGNBQWMsQ0FBQyxhQUFhLEdBQUd3QixLQUFLLENBQUM7RUFDOURJLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFDbkIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2tyZGV2Ly4vcGtnL2tyL3NyYy9tZWRpYS9qcy9zcmMvbW9kdWxlcy9zZWFyY2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAcGFja2FnZSAgICBLbm93IFJlc2VydmF0aW9uc1xuICogQHN1YnBhY2thZ2UgU2l0ZSBKU1xuICogQGNvcHlyaWdodCAgMjAyMCBIaWdobGFuZCBWaXNpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBAbGljZW5zZSAgICBTZWUgdGhlIGZpbGUgXCJMSUNFTlNFLnR4dFwiIGZvciB0aGUgZnVsbCBsaWNlbnNlIGdvdmVybmluZyB0aGlzIGNvZGUuXG4gKiBAYXV0aG9yICAgICBIYXplbCBXaWxzb24gPGhhemVsQGhpZ2hsYW5kdmlzaW9uLmNvbT5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gZnVuY3Rpb24gaXMgdXNlZCBpZ25vcmUgcGhwc3Rvcm0gd2FybmluZ1xuZXhwb3J0IGZ1bmN0aW9uIGd1ZXN0SW5jcmVtZW50KHVwZG93biwgdGFyZ2V0LCBhdGV4dCwgY3RleHQsIGN0ZXh0MSkge1xuXHRsZXQgY2FjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoaWxkLWFnZXMtY29udGFpbmVyJyk7XG5cdGxldCBhY2kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpO1xuXHRsZXQgdmFsdWUgPSBwYXJzZUludChhY2kudmFsdWUpO1xuXHR2YWx1ZSArPSB1cGRvd247XG5cdGlmICh2YWx1ZSA+PSBhY2kuZ2V0QXR0cmlidXRlKCdtaW4nKSAmJiB2YWx1ZSA8PSBhY2kuZ2V0QXR0cmlidXRlKCdtYXgnKSkge1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcGx1cycpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NwbHVzJykuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRsZXQgZHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3Vlc3RzJyk7XG5cdFx0bGV0IG1heGd1ZXN0cyA9IHBhcnNlSW50KGRyb3Bkb3duLmRhdGFzZXQubWF4KTtcblx0XHRsZXQgZWxBZHVsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWR1bHRzJyk7XG5cdFx0bGV0IG1heGFkdWx0cyA9IE51bWJlcihlbEFkdWx0cy5nZXRBdHRyaWJ1dGUoJ21heCcpKTtcblx0XHRsZXQgZ3Vlc3Rjb3VudCA9IHBhcnNlSW50KGRyb3Bkb3duLm9wdGlvbnNbZHJvcGRvd24uc2VsZWN0ZWRJbmRleF0udmFsdWUpICsgcGFyc2VJbnQodXBkb3duKTtcblx0XHRpZiAoZ3Vlc3Rjb3VudCA+IDAgJiYgZ3Vlc3Rjb3VudCA8PSBtYXhndWVzdHMpIHtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCkudmFsdWUgPSB2YWx1ZTtcblx0XHRcdGxldCBhZHVsdHMgPSBOdW1iZXIoZWxBZHVsdHMudmFsdWUpO1xuXHRcdFx0bGV0IGNoaWxkcmVuID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZHJlbicpLnZhbHVlKTtcblx0XHRcdGlmIChjaGlsZHJlbiA9PT0gMSlcblx0XHRcdFx0ZHJvcGRvd24ub3B0aW9uc1tndWVzdGNvdW50IC0gMV0udGV4dCA9IGFkdWx0cyArICcgJyArIGF0ZXh0ICsgJywgJyArIGNoaWxkcmVuICsgJyAnICsgY3RleHQxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkcm9wZG93bi5vcHRpb25zW2d1ZXN0Y291bnQgLSAxXS50ZXh0ID0gYWR1bHRzICsgJyAnICsgYXRleHQgKyAnLCAnICsgY2hpbGRyZW4gKyAnICcgKyBjdGV4dDtcblx0XHRcdGRyb3Bkb3duLnZhbHVlID0gZ3Vlc3Rjb3VudDtcblxuXHRcdFx0aWYgKHRhcmdldCA9PT0gJ2NoaWxkcmVuJykge1xuXHRcdFx0XHRsZXQgYWdlaGVscCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtaGVscCcpO1xuXHRcdFx0XHRpZiAodXBkb3duID09PSAxKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYWMuYXBwZW5kKGNyZWF0ZUFnZUZpZWxkKHZhbHVlKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0XHRhZ2VoZWxwLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlbW92ZUFnZUZpZWxkKHZhbHVlICsgMSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFkdWx0cyArIGNoaWxkcmVuID09PSBtYXhhZHVsdHMpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3BsdXMnKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWR1bHRzID09PSBtYXhhZHVsdHMpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwbHVzJykuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWdlRmllbGQoY291bnQpIHtcblx0bGV0IG5ld2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbnVtYmVyJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWdlICcgKyBjb3VudCk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ21pbicsICcwJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ21heCcsICcxNycpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcyJyk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ3N0ZXAnLCAnMScpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NoaWxkX2FnZXNbXScpO1xuXHRuZXdhZ2Uuc2V0QXR0cmlidXRlKCdpZCcsICdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG5cdG5ld2FnZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2Zvcm0tY29udHJvbCB2YWxpZCBmb3JtLWNvbnRyb2wtc3VjY2VzcycpO1xuXHRyZXR1cm4gbmV3YWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWdlRmllbGQoY291bnQpIHtcblx0bGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGlsZF9hZ2VzXycgKyBjb3VudCk7XG5cdGNvbnRhaW5lci5yZW1vdmUoKTtcbn0iXSwibmFtZXMiOlsiZ3Vlc3RJbmNyZW1lbnQiLCJ1cGRvd24iLCJ0YXJnZXQiLCJhdGV4dCIsImN0ZXh0IiwiY3RleHQxIiwiY2FjIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFjaSIsInZhbHVlIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJkaXNhYmxlZCIsImRyb3Bkb3duIiwibWF4Z3Vlc3RzIiwiZGF0YXNldCIsIm1heCIsImVsQWR1bHRzIiwibWF4YWR1bHRzIiwiTnVtYmVyIiwiZ3Vlc3Rjb3VudCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwiYWR1bHRzIiwiY2hpbGRyZW4iLCJ0ZXh0IiwiYWdlaGVscCIsImhpZGRlbiIsImFwcGVuZCIsImNyZWF0ZUFnZUZpZWxkIiwicmVtb3ZlQWdlRmllbGQiLCJjb3VudCIsIm5ld2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjb250YWluZXIiLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9