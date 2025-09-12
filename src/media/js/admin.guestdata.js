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
		kickDobissue();
	});

	function kickDobissue() {
		const $dobissueMin = $('.dobissue.min');
		if ($dobissueMin.length > 0) {
			$dobissueMin.datetextentry({
				min_year:         '1910', max_date: function () {
					return this.get_today();
				},
				min_date_message: 'Date must not be in the future',
			});
		}
		const $dobissueMax = $('.dobissue.max');
		if ($dobissueMax.length > 0) {
			$dobissueMax.datetextentry({
				max_year:         '2050', min_date: function () {
					return this.get_today();
				},
				max_date_message: 'Date must not be in the past',
			});
		}
	}
})(jQuery);