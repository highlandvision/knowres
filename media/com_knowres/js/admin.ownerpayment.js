// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file LICENSE.txt for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
"use strict";

if (typeof jQuery !== 'undefined') jQuery.noConflict();

(function ($) {
	const options = {
		buttonText:        '<i class="fas fa-calendar-alt"></i>',
		changeMonth:       true,
		changeYear:        true,
		dateFormat:        'd M yy',
		firstDay:          1,
		numberOfMonths:    1,
		selectOtherMonths: false,
		showButtonPanel:   true,
		showOn:            'both',
		showOtherMonths:   false,
	};
	$(function () {
		$(document).on('click', '.ownerpaymentconfirm', function (e) {
			e.preventDefault();
			const payment_id = $(this).data('id');
			$.ajax({
				url:      'index.php?option=com_knowres&task=ownerpayment.modal&id=' + payment_id,
				dataType: 'html',
				success:  function (data) {
					$('#kr-ownerpayment-modal .modal-content').empty().append(data);
					$('#kr-ownerpayment-modal').modal('show');
					$('[data-datepicker]').each(function () {
						$.extend(options, $(this).data('datepicker'));
						$(this).datepicker(options);
					});
					$('.uicalendar').datepicker();
					$('.hasPopover').popover({
						trigger: 'hover'
					});
					$('.radio.btn-group label').addClass('btn');
					$('.btn-group input:checked').each(function () {
						let $input = $(this);
						let $label = $('label[for=' + $input.attr('id') + ']');
						let btnClass = 'primary';

						if ($input.val() !== '') {
							let reversed = $input.parent().hasClass('btn-group-reversed');
							btnClass = ($input.val() === 0 ? !reversed : reversed) ? 'danger' : 'success';
						}

						$label.addClass('active btn-' + btnClass);
					});
				}
			});
		});
	});
})(jQuery);