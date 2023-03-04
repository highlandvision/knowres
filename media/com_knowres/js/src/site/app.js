/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

let lang;
let searchdata = [];
let searchDone = false;
let calendarLoaded = false;
let savedwidth = false;
let large;
let resized = false;

if (!window.location.origin)
	window.location.origin = window.location.protocol + "//" + window.location.host;
const livesite = window.location.origin + '/';

(function ($) {
	$(function () {
		Foundation.addToJquery();
		$(document).foundation();
		lang = $('#kr-lang').data('krlang');

		checkScreenWidth();
		$(window).on("resize", function () {
			checkScreenWidth()
		});

		const bars = $('.kr-rating');
		if (bars.length) {
			bars.barrating('show', {
				showValues:         true,
				showSelectedRating: false
			});
		}

		$(document).on('submit', '.ajaxform', function (e) {
			e.preventDefault();
			const $form = $(this);
			$.ajax({
				type:     'POST',
				url:      $form.attr('action') + '&lang=' + lang,
				data:     $form.serialize(),
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						if (result.data) {
							formResponse($form.attr('id'), result.data);
						} else {
							window.location.href = livesite;
						}
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
		}).on('hide.zf.dropdown', '#kr-quote-form', function () {
			$('#guests').trigger('change');
		}).on('open.zf.reveal', '.kr-ajax-modal[data-reveal]', function (e) {
			e.preventDefault();
			const modalid = "#" + $(this).attr('id');
			if (!$.trim($(modalid).html()).length) {
				const ajaxurl = $(this).data('ajaxurl');
				if (ajaxurl) {
					$.ajax({
						type:    'POST',
						url:     ajaxurl,
						success: function (content) {
							$(modalid).html(content).trigger('resizeme.zf.reveal');
							$(modalid).foundation();
						}
					});
				}
			}
		}).on('click', '.favspan', function (e) {
			e.preventDefault();
			const $this = $(this);

			$.ajax({
				type:     'POST',
				url:      livesite + 'index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
				data:     {'property_id': $this.data('property'), 'view': $this.data('view')},
				dataType: 'json',
				success:  function (result) {
					if (result.success) {
						if (result.data.action === 'hideme') {
							const element = "#" + $this.find('.has-tip').data('toggle');
							$(element).remove();
							$this.parents('.kr-properties .kr-property .favs:first').hide('slow');
						} else if (result.data.action !== 'none') {
							const $target = $this.find('i.fa-heart');
							$target.toggleClass('in');
							const val1 = '#' + $target.data('toggle');
							$(val1).text(result.data.action).hide();
						}
					}
				}
			});
		}).on('click', '.getResponseSearch', function (e) {
			e.preventDefault();
			getProperties($(this).data('field'), $(this).data('value'));
		}).on('click', '.kr-filters-close', function (e) {
			e.preventDefault();
			$('.kr-filters.top').addClass('hideme');
			$(this).removeClass('active');
		}).on('click', '.sidebar .kr-filters ul.filter-sort-list li.head', function (e) {
			e.preventDefault();
			$(this).parent().children('li.checkbox').toggle();
			$(this).toggleClass('active');
		}).on('click', '#showgateways', function (e) {
			e.preventDefault();
			$('#kr-gateways').toggleClass('hideme');
		}).on('click', '#kr-show-sortby', function (e) {
			e.preventDefault();
			$('.kr-filters.top').addClass('hideme');
			$('.kr-sortby.top').toggleClass('hideme');
			setActiveMenu('sort');
		}).on('click', '#kr-show-filterby', function (e) {
			e.preventDefault();
			$('.kr-sortby.top').addClass('hideme');
			$('.kr-filters.top').toggleClass('hideme');
			setActiveMenu('filter');
		}).on('click', '.kr-filters-close', function (e) {
			e.preventDefault();
			$('.kr-filters.top').addClass('hideme');
			setActiveMenu('list');
		}).on('click', '.toggleother', function (e) {
			e.preventDefault();
			$(this).data('other').toggle();
		}).on('click', '#kr-property-tabs a[href="#calendar"]', function(e) {
			e.preventDefault();
			if (!calendarLoaded) {
				const pid = $(this).data('pid');
				loadCalendar(pid);
				calendarLoaded = true;
			}
		});

		if ($('.kr-properties').length && !searchDone) {
			getProperties('view', $(this).data('view'));
		}

		let $tabs = $('.tabs');
		if ($('#kr-property-tabs').length && !calendarLoaded) {
			$tabs.find('a').each(function () {
				if ($(this).attr('href') === "#calendar") {
					const pid = $(this).data('pid');
					loadCalendar(pid);
					calendarLoaded = true;
				}
			});
		}
	});

	$.event.special.touchstart = {
		setup: function (_, ns, handle) {
			if (ns.includes("noPreventDefault")) {
				this.addEventListener("touchstart", handle, {passive: false});
			} else {
				this.addEventListener("touchstart", handle, {passive: true});
			}
		}
	};
	$.event.special.touchmove = {
		setup: function (_, ns, handle) {
			if (ns.includes("noPreventDefault")) {
				this.addEventListener("touchmove", handle, {passive: false});
			} else {
				this.addEventListener("touchmove", handle, {passive: true});
			}
		}
	};

	function loadCalendar(pid) {
		$.ajax({
			type:     'POST',
			url:      livesite + 'index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
			dataType: 'html',
			data:     {
				'pid': pid
			},
			success:  function (data) {
				$('#calendar.tabs-panel').append(data);
			}
		});
	}

	function formResponse(id, data) {
		if (data.hasOwnProperty('redirect')) {
			window.location.replace(data.redirect);
		} else if (id === 'kr-form-payment') {
			if (data.hasOwnProperty('html')) {
				let $modal = $('#kr-gateway-modal');
				$modal.html(data.html).trigger('resizeme.zf.reveal');
				$modal.foundation('open');
			} else {
				window.location.href = livesite;
			}
		} else if (id === 'kr-form-mailchimp') {
			$('#response2').html(data);
		}
	}

	function getProperties(field, value) {
		$.ajax({
			url:      livesite + 'index.php?option=com_knowres&view=properties&format=raw&lang=' + lang,
			type:     'POST',
			data:     {'field': field, 'value': value},
			dataType: 'json',
			success:  function (data) {
				searchdata = data;
				if (!searchdata) {
					window.location.reload();
					return;
				}

				// noinspection OverlyComplexBooleanExpressionJS
				if (field === 'order' || field === 'view' || field === 'favs' || field === 'map') {
					setActiveMenu(searchdata['view']);
				}

				setSearchData(searchdata, field);
				$('.has-tip').foundation();
				$('.dropdown-pane').foundation();
				if (!large && field === 'order') {
					$('#sortby').trigger('click');
				}
				searchDone = true;
			}
		});
	}

	function setSearchData(response, field = '') {
		if (response) {
			$('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
			$('.kr-pager').html(response['pagination']);

			if (large === true) {
				$("#kr-properties-search-off-canvas").html('');
				$("#kr-properties-filters-off-canvas").html('');
				$("#kr-properties-sortby-off-canvas").html('');
				$("#kr-sidebar-search").empty().html(response['search']);
				$('#kr-properties-filters').empty().html(response['filters']);
				$('#kr-properties-sortby').empty().html(response['sortby']).addClass('hideme');
			} else {
				$('#kr-properties-filters').html('');
				$('#kr-properties-sortby').html('');
				$("#kr-sidebar-search").html('');
				$("#kr-properties-filters-off-canvas").html(response['filters']);
				$("#kr-properties-sortby-off-canvas").html(response['sortby']);
				$("#kr-properties-search-off-canvas").html(response['search']);
			}

			if (response['search'].length && $('#arrivaldsp').length) {
				$('body').trigger('initajaxsearch');
			}

			$('.sidebar .kr-filters ul.filter-sort-list li.head').each(function () {
				if ($(this).hasClass('active')) {
					$(this).parent().children('li.checkbox').show();
				} else {
					$(this).parent().children('li.checkbox').hide();
				}
			});

			if (field === 'page') {
				window.scrollTo(0, 0);
			}
		}
	}

	function setActiveMenu(item) {
		const bar = $('.kr-searchbar').find('li');
		$.each(bar, function (index, bar) {
			$(bar).removeClass('is-active');
		});

		const element = '.kr-searchbar li.' + item;
		$(element).addClass('is-active');
	}

	// Return true if width has changed
	function screenWidthHasChanged() {
		large = Foundation.MediaQuery.atLeast('large');
		if (large !== savedwidth) {
			savedwidth = large;
			return true;
		} else
			return false;
	}

	function checkScreenWidth() {
		resized = false;
		if (screenWidthHasChanged() && searchdata['items'] && !resized) {
			setSearchData(searchdata);
			resized = true;
		}
	}

	$.event.special.touchstart = {
		setup: function (_, ns, handle) {
			if (ns.includes("noPreventDefault")) {
				this.addEventListener("touchstart", handle, {passive: false});
			} else {
				this.addEventListener("touchstart", handle, {passive: true});
			}
		}
	};
	$.event.special.touchmove = {
		setup: function (_, ns, handle) {
			if (ns.includes("noPreventDefault")) {
				this.addEventListener("touchmove", handle, {passive: false});
			} else {
				this.addEventListener("touchmove", handle, {passive: true});
			}
		}
	};
}(jQuery));