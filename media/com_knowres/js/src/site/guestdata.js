// noinspection DuplicatedCode

/**
 * @package    Know Reservations
 * @subpackage Admin JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {
	$(function () {
		if (document.getElementById('howtoarrive')) {
			const howtoarrive = document.getElementById('howtoarrive');
			let arrivalmeans = howtoarrive.getAttribute('data-means');
			if (!arrivalmeans) {
				arrivalmeans = 'air';
			}
			displayArrival(arrivalmeans);
		}

		$('body').on('click', '.amitem', function (e) {
			e.preventDefault();
			displayArrival($(this).attr('id'));
		});
	});

	function displayArrival(value) {
		let x = document.getElementsByClassName('amitem');
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('active');
		}

		document.getElementById('air-data').style.display = 'none';
		document.getElementById('train-data').style.display = 'none';
		document.getElementById('auto-data').style.display = 'none';
		document.getElementById('other-data').style.display = 'none';
		let arrivaldata = value + '-data';
		document.getElementById(arrivaldata).style.display = 'block';
		document.getElementById(value).classList.add('active');
		document.getElementById('jform_arrival_means').value = value;
	}
})(jQuery);