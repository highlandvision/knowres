let cboxes = document.getElementsByClassName('checkover country');
for (let c = 0; c < cboxes.length; c++) {
    cboxes[c].addEventListener('change', function() {
        let country = cboxes[c].getAttribute('data-value');
        let rboxes = document.getElementsByClassName('checkover region');
        for (let r = 0; r < rboxes.length; r++) {
            if (rboxes[r].getAttribute('data-country') === country) {
                rboxes[r].checked = cboxes[c].checked;
            }
        }
    });
}