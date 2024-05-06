// noinspection NpmUsedModulesInstalled
/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

let cboxes = document.getElementsByClassName('checkover country');
for (let c = 0; c < cboxes.length; c++) {
    cboxes[c].addEventListener('change', function () {
        let country = cboxes[c].getAttribute('data-value');
        let rboxes = document.getElementsByClassName('checkover region');
        for (let r = 0; r < rboxes.length; r++) {
            if (rboxes[r].getAttribute('data-country') === country) {
                rboxes[r].checked = cboxes[c].checked;
            }
        }
    });
}


let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.target.classList.contains('is-open')) {
            document.getElementById("kr-overlay").style.display = "block";
            let cards = document.querySelectorAll(".card,.button,.tabs,.slideshow-wrapper,.tabs-content");
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.cursor = "default";
                cards[i].style.opacity = "0.2";
            }
        } else {
            document.getElementById("kr-overlay").style.display = "none";
            let cards = document.querySelectorAll(".card,.button,.tabs,.slideshow-wrapper,.tabs-content");
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.cursor = "pointer";
                cards[i].style.opacity = "1";
            }
        }
    });
});

let panes = document.querySelectorAll('.dropdown-pane');
panes.forEach(function (pane) {
    observer.observe(pane, {
        attributes: true,
        attributeFilter: ['class']
    });
});