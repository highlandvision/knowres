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
                showValues: true,
                showSelectedRating: false
            });
        }

        $(document).on('submit', '.ajaxform', function (e) {
            e.preventDefault();
            const $form = $(this);
            $.ajax({
                type: 'POST',
                url: $form.attr('action') + '&lang=' + lang,
                data: $form.serialize(),
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        if (result.data) {
                            formResponse($form.attr('id'), result.data);
                        } else {
                            window.location.href = '/';
                        }
                    } else {
                        $('.kr-ajax-modal-error-message').html(result.message);
                        const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
                        $modal.open();
                    }
                },
                error: function () {
                    $('.kr-ajax-modal-error-message').html('Sorry an error has occurred, please try again');
                    const $modal = new Foundation.Reveal($('#KrAjaxModalError'));
                    $modal.open();
                }
            });
        }).on('show.zf.dropdown', '#kr-searchregion-drop', function () {
            $("#kr-searchregion-drop").css('opacity', '1');
        }).on('show.zf.dropdown', '#kr-searchguest-drop', function () {
            $('#kr-searchguest-drop').css('opacity', '1');
        }).on('hide.zf.dropdown', '#kr-searchregion-drop, #kr-searchguest-drop', function () {
            $('body').css('opacity', '1');
        }).on('hide.zf.dropdown', '#kr-quote-form', function () {
            $('#guests').trigger('change');
        }).on('open.zf.reveal', '.kr-ajax-modal[data-reveal]', function (e) {
            e.preventDefault();
            const modalid = "#" + $(this).attr('id');
            if (!$.trim($(modalid).html()).length) {
                const ajaxurl = $(this).data('ajaxurl');
                if (ajaxurl) {
                    $.ajax({
                        type: 'POST',
                        url: ajaxurl,
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
            const pid = $this.data('property');
            const krproperty = '#kr-property-' + pid;

            $.ajax({
                type: 'POST',
                url: 'index.php?option=com_knowres&task=properties.favourite&lang=' + lang,
                data: {'property_id': pid, 'view': $this.data('view')},
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        if (result.data.action === 'hideme') {
                            const element = "#" + $this.find('.has-tip').data('toggle');
                            $(element).remove();
                            $(krproperty).fadeOut(1200, function() {
                                $(krproperty).parent().css('display', 'none')});
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
        }).on('click', '.kr-filters ul.filter-sort-list li.head', function (e) {
            e.preventDefault();
            $(this).parent().children('li.checkbox').toggle();
            $(this).toggleClass('active');
        }).on('click', '#showgateways', function (e) {
            e.preventDefault();
            $('#kr-gateways').toggleClass('hideme');
        }).on('click', '.kr-searchbar .button', function (e) {
            e.preventDefault();
            setActiveMenu($(this).data('value'));
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
        }).on('click', '#kr-property-tabs a[href="#calendar"]', function (e) {
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
            type: 'POST',
            url: 'index.php?option=com_knowres&task=property.geriatric&lang=' + lang,
            dataType: 'html',
            data: {
                'pid': pid
            },
            success: function (data) {
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
                window.location.href = '/';
            }
        } else if (id === 'kr-form-mailchimp') {
            $('#response2').html(data);
        }
    }

    function getProperties(field, value) {
        $.ajax({
            url: 'index.php?option=com_knowres&view=properties&format=raw&lang=' + lang,
            type: 'POST',
            data: {'field': field, 'value': value},
            dataType: 'json',
            success: function (data) {
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
                $('.kr-property .card').foundation();
                $('#kr-order-close').trigger('click');
                searchDone = true;
            }
        });
    }

    function setSearchData(response, field = '') {
        if (response) {
            $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
            $('#kr-properties-filter-heading').html(response['heading']);
            $('.kr-pager').html(response['pagination']);
            $("#kr-properties-filters-off-canvas").html(response['filters']);
            $("#kr-properties-filters-top").html(response['filters_top']);
            $("#kr-properties-sortby-off-canvas").html(response['sortby']);
            $("#kr-properties-search-off-canvas").html(response['search']);

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

    function setActiveMenu(value) {
        const bar = $('.kr-searchbar').find('.button');
        $.each(bar, function (index, bar) {
            $(bar).removeClass('is-active');
        });
        $( '.kr-searchbar .button.' + value).addClass('is-active');
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