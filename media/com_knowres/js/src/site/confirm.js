/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {
	if (!window.location.origin)
		window.location.origin = window.location.protocol + "//" + window.location.host;
	const livesite = window.location.origin + '/';

	let lang = $("#kr-lang").data('krlang');
	let myConfirm;

	class Krconfirm {
		constructor($form) {
			this.form = $form;
			this.init();
		}

		init() {
			this.updateQuote(this.form);
		}

		updateQuote($form) {
			jQuery.ajax({
				type:     'POST',
				url:      livesite + 'index.php?option=com_knowres&task=confirm.compute&lang=' + lang,
				data:     $form.serializeArray(),
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						const data = result.data;
						if (data.hasOwnProperty('redirect')) {
							window.location.replace(data.redirect);
						}
						let div;
						$.each(result.data.response, function (key, val) {
							$('.hideinitial').show();
							div = "#" + key;
							$(div).text(val);
							$(div).html(val);
							$(div).val(val);
							$(div).show();
						});
					} else {
						$('.kr-ajax-modal-error-message').html(result.message);
						const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
						$modal.open();
					}
				}
			});
		}
	}

	$(function () {
		let $element = $('#kr-form-confirm');
		if ($element.length) {
			myConfirm = new Krconfirm($element);
		}

		$element.on('change, click', '.kr-calculate', function (e) {
			e.preventDefault();
			$element = $('#kr-form-confirm');
			myConfirm.updateQuote($element);
		});

		$(document).on('submit', '.jsonform', function (e) {
			e.preventDefault();
			const $form = $(this);
			$.ajax({
				type:     'POST',
				url:      $form.attr('action') + '&lang=' + lang,
				data:     $form.serialize(),
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						window.location.href = result.data.redirect;
					} else {
						$('.kr-ajax-modal-error-message').html(result.message);
						const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
						$modal.open();
					}
				},
				error:    function () {
					$('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
					const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
					$modal.open();
				}
			});
		}).on('click', '#checkterms', function (e) {
			e.preventDefault();
			if (checkTerms()) {
				$('#checkterms').trigger('submit');
			}
		});
	});

	// noinspection JSUnusedLocalSymbols
	function checkTerms() {
		let result = true;
		const test = document.getElementById('agreecheck');
		const testc = document.getElementById('agreecheckc');
		const testt = document.getElementById('agreecheckt');

		// noinspection JSUnresolvedVariable
		if (test && !document.getElementById('kr-form-payment').agreecheck.checked) {
			result = false;
		}
		// noinspection JSUnresolvedVariable
		if (testc && !document.getElementById('kr-form-payment').agreecheckc.checked) {
			result = false;
		}
		// noinspection JSUnresolvedVariable
		if (testt && !document.getElementById('kr-form-payment').agreecheckt.checked) {
			result = false;
		}

		if (result) {
			return true;
		} else {
			const $modal = new Foundation.Reveal($('#errorModal'));
			$modal.open();
			return false;
		}
	}
}(jQuery));