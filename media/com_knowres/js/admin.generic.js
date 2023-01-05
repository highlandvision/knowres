// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

let Knowres;
Knowres = window.Knowres || {};
if (typeof jQuery === 'undefined') jQuery.noConflict();

(function (Knowres, document) {
	/**
	 * Generic submit form
	 *
	 * @param  {String}         task      The given task.
	 * @param  {HTMLElement}    form      The form element.
	 * @param   {bool}          modal     >0 for modal.
	 * @return  {void}
	 */
	Knowres.submitform = function (task, form, modal) {
		let newForm = form;
		if (!newForm) {
			newForm = document.getElementById('adminForm');
		}
		if (task) {
			newForm.task.value = task;
		}

		jQuery(function () {
			jQuery.ajax({
				type:        'POST',
				url:         newForm.getAttribute('action'),
				data:        new FormData(newForm),
				processData: false,
				contentType: false,
				dataType:    'json',
				success:     function (result) {
					if (result.success) {
						/** @namespace string result.data.redirect **/
						if (result.data == null || window.location.href === result.data.redirect) {
							window.location.reload();
						} else {
							window.location.href = result.data.redirect;
						}
						/** @namespace result.messages **/
					} else if (result.messages) {
						if (modal) {
							jQuery('.modal').modal('hide');
						}
						Joomla.renderMessages(result.messages);
					} else {
						/** @namespace result.message **/
						$('#errorModalMessage').empty().append(result.message);
						$('#errorModal').modal('show');
					}
				},
				error:       function (jqXHR) {
					if (jqXHR.status !== 200) window.location.href = window.location.origin + '/administrator'; else window.location.href = window.location.origin + '/administrator/index.php?option=com_knowres&view=contracts';
				}
			});

			return false;
		});
	}
})(Knowres, document);

function refreshShow(id) {
	window.location.href = "index.php?option=com_knowres&task=property.dashboard&id=" + id;
}

function switchAmenities(room) {
	let types = document.querySelectorAll('.roomtype');
	for (let i = 0; i < types.length; i++) {
		types[i].classList.add('hideme')
	}

	let current = document.getElementById(room);
	current.classList.remove('hideme')
}

function togglerates(id, action) {
	if (action) {
		if (id === "managed_rates") {
			document.getElementById('net_rates0').click();
			document.getElementById('beyond_rates0').click();
		} else if (id === "net_rates") {
			document.getElementById('managed_rates0').click();
			document.getElementById('beyond_rates0').click();
		} else {
			document.getElementById('managed_rates0').click();
			document.getElementById('net_rates0').click();
		}
	}
}

(function ($) {
	$(document).on('hidden', '#ajaxmodal', function () {
		$(this).removeData('modal');
	}).on('click', function (e) {
		$().each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).clickover('destroy');
			}
		});
	});

	$(function () {
		const $gallery = $('#kr-media-images');
		if ($gallery.length) {
			$gallery.sortable({
				stop: function () {
					let data = '';
					$('div', $gallery).each(function (i, el) {
						const p = $(el).data('id');
						data += p + ',';
					});

					data = data.slice(0, -1);
					$.post(
						'index.php?option=com_knowres&task=images.ordering', {
							order:       data,
							property_id: $('#property_id').text()
						},
						function () {
							return false;
						}
					);
				}
			});
		}
	});
}(jQuery));