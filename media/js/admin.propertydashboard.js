// package    Know Reservations
// subpackage Admin Js
// copyright  2020 Highland Vision. All rights reserved.
// license    See the file "LICENSE.txt" for the full license governing this code.
// author     Hazel Wilson <hazel@highlandvision.com>
'use strict';

if (typeof jQuery !== 'undefined') jQuery.noConflict();

(function ($) {
	let self;
	let $progressBar;
	let settings = {
		current: 0, newId: 0, newName: '', formData: '', original: ''
	};
	const tasks = ["index.php?option=com_knowres&task=property.cloner&type=propertyoption", "index.php?option=com_knowres&task=property.cloner&type=propertyroom", "index.php?option=com_knowres&task=property.cloner&type=rate", "index.php?option=com_knowres&task=property.cloner&type=ratemarkup", "index.php?option=com_knowres&task=property.cloner&type=discount", "index.php?option=com_knowres&task=property.cloner&type=coupon", "index.php?option=com_knowres&task=property.cloner&type=extra", "index.php?option=com_knowres&task=property.cloner&type=image", "index.php?option=com_knowres&task=property.cloner&type=imagecopy"];

	class Krclone {
		constructor(options) {
			this.settings = settings;
			if (options) {
				$.extend(this.settings, options);
			}

			this.init();
			this.cloneOthers();
		}

		static displayMessage(text) {
			$(text).appendTo("#responses");
		}

		cloneOthers() {
			Krclone.displayMessage('<progress id="progress_bar" value="0" max="100" style="margin:16px 0;width:100%;height:40px;"></progress>');
			Krclone.displayMessage('<p>' + this.settings.newName + ' is being created. This could take a few minutes so please wait until the bar above is all blue!</p>');

			$progressBar = $('#progress_bar');
			this.doChildren();
		}

		doChildren() {
			self = this;
			if (this.settings.current < tasks.length) {
				$.ajax({
					type:    "POST",
					url:     tasks[this.settings.current],
					data:    this.settings.formData,
					success: function success(message) {
						self.settings.current += 1;
						$progressBar.val(10 * self.settings.current);
						Krclone.displayMessage('<p>' + message + '</p>');
						self.doChildren();
					},
				})
			} else {
				$progressBar.val(100);
				let link = 'index.php?option=com_knowres&task=property.edit&id=' + self.settings.newId;
				Krclone.displayMessage("<p>Complete!<br><br>Click <a href='" + link + "'>here</a> to edit " + self.settings.newName + " or click the x in the top right corner to continue.</p><br>");
				$('.disableme').attr('disabled', 'false');
				$('document').on('click', '#restoreme', function () {
					self.restoreOriginal();
				});
				self.settings.current = 0;
			}
		}

		init() {
			this.settings.formData = this.settings.formData + "&newid=" + this.settings.newId;
			this.settings.newName = document.getElementById('jform_new_name').value;
			this.settings.original = $('#clonePropertyModal').html();

			$('.disableme').attr("disabled", 'true');
			$('.modal-footer').remove();
			$('#newdata').empty();
			$('<div id="responses"></div>').appendTo("#newdata");
		}

		restoreOriginal() {
			$("#clonePropertyModal").html(this.settings.original);
			$("[data-dismiss=modal]").trigger('click');
		}
	}

	$(function () {
		$("#kr-property-clone-form").on('submit', function (event) {
			event.preventDefault();
			const $form = $(this);

			$.ajax({
				type:     "POST",
				url:      "index.php?option=com_knowres&task=property.cloner",
				data:     $form.serialize(),
				dataType: 'html',
				success:  function success(newId) {
					if (newId) {
						let options = {
							newId: newId, formData: $form.serialize()
						};
						new Krclone(options);
					} else {
						alert('Error occurred, please try again');
					}
				}
			});
		});
	});
})(jQuery);
