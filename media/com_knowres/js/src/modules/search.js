/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */
// noinspection JSUnusedGlobalSymbols

"use strict";

export function guestIncrement(updown, target, atext, ctext, ctext1) {
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
            if (children === 1)
                dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext1;
            else
                dropdown.options[guestcount - 1].text = adults + ' ' + atext + ', ' + children + ' ' + ctext;
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
                    removeAgeField(value + 1)
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

export function createAgeField(count) {
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

export function removeAgeField(count) {
    let container = document.getElementById('child_ages_' + count);
    container.remove();
}