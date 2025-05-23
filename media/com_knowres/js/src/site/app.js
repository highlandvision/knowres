/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

let searchData = [];
let searchDone = false;
let calendarLoaded = false;
let savedwidth = false;
let large;
let resized = false;
let scloaded = false;

(function ($) {
    $(function () {
        Foundation.addToJquery();
        $(document).foundation();

        checkScreenWidth();
        $(window).on("resize", function () {
            checkScreenWidth();
        });

        const bars = $('.kr-rating');
        if (bars.length) {
            bars.barrating('show', {
                showValues: true,
                showSelectedRating: false
            });
        }

        const $ctrigger = $('#kr-page-geriatric-calendar-trigger');
        if ($ctrigger.length && !calendarLoaded) {
            loadCalendar($ctrigger.data('pid'), $ctrigger.data('target'));
            calendarLoaded = true;
            const sticky = $('.sticky');
            if (sticky.length) {
                sticky.foundation('_calc', true);
            }
        }

        $(document).on('submit', '.ajaxform', function (e) {
            e.preventDefault();
            const $form = $(this);
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
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
        }).on('show.zf.dropdown', '.noscroll', function () {
            $('body').addClass("staticpane");
            $(this).css('opacity', '1');
        }).on('hide.zf.dropdown', '.noscroll', function () {
            $('body').removeClass("staticpane");
            $(this).css('opacity', '0');
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
        }).on('open.zf.reveal', '#kr-gateway-modal[data-reveal]', function (e) {
            if (!scloaded) {
                e.preventDefault();
                $.getScript('media/com_knowres/js/stripecheckout.min.js');
                scloaded = true;
            } else {
                initializeStripe();
            }
        }).on('open.zf.reveal', '#kr-property-slideshow-reveal[data-reveal]', function (e) {
            const $pslider = $('#kr-property-slideshow');
            $pslider.slick('setPosition');
            $pslider.slick('refresh');
            $('#kr-property-thumbs').slick();
            $('#kr-property-arrows').slick();
            $pslider.slick();
        }).on('click', '.favspan', function (e) {
            e.preventDefault();
            const pid = $(this).data('property');
            const bar = $('.kr-searchbar a.is-active').data('bar');
            $.ajax({
                type: 'POST',
                url: '/index.php?option=com_knowres&task=properties.favourite',
                data: {'property_id': pid},
                dataType: 'json',
                success: function (result) {
                    if (result.success) {
                        getProperties(bar);
                        $('.favicon-top').foundation('hide');
                    }
                }
            });
        }).on('click', '.getResponseSearch', function (e) {
            e.preventDefault();
            if ($(this).data('action') === undefined) {
                getProperties($(this).data('bar'));
            } else {
                getProperties($(this).data('bar'), $(this).data('action'), $(this).data('action-value'));
            }
        }).on('click', '.kr-filters-close', function (e) {
            e.preventDefault();
            $('.kr-filters.top').addClass('hideme');
            $(this).removeClass('active');
        }).on('click', '.kr-filters ul.filter-sort-list li.head', function (e) {
            e.preventDefault();
            $(this).parent().children('li.filter-item').toggle();
            $(this).toggleClass('active');
        }).on('click', '#showgateways', function (e) {
            e.preventDefault();
            $('#kr-gateways').toggleClass('hideme');
        }).on('click', 'a.kr-searchbar', function (e) {
            e.preventDefault();
            setActiveMenu($(this).data('bar'));
        }).on('click', '.toggleother', function (e) {
            e.preventDefault();
            $(this).data('other').toggle();
        }).on('click', '#kr-property-tabs a[href="#calendar"]', function (e) {
            e.preventDefault();
            if (!calendarLoaded) {
                const pid = $(this).data('pid');
                loadCalendar(pid, '#calendar.tabs-panel');
                calendarLoaded = true;
            }
        }).on('mouseover', '#kr-thumb img', function () {
            let property = $(this).parent().data('id');
            if (property) {
                let target = '.thumboverview' + property;
                $('#pinfo').html($(target).html());
            }
        });

        let $props = $('.kr-properties');
        if ($props.length && !searchDone) {
            getProperties($props.data('bar'));
        }
        let $tabs = $('.tabs');
        if ($('#kr-property-tabs').length && !calendarLoaded) {
            $tabs.find('a').each(function () {
                if ($(this).attr('href') === "#calendar") {
                    const pid = $(this).data('pid');
                    loadCalendar(pid, '#calendar.tabs-panel');
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

    function loadCalendar(pid, target) {
        $.ajax({
            type: 'POST',
            url: '/index.php?option=com_knowres&task=property.geriatric',
            dataType: 'html',
            data: {
                'pid': pid
            },
            success: function (data) {
                $(target).append(data);
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

    function getProperties(bar, action = '', action_value = '') {
        $.ajax({
            url: '/index.php?option=com_knowres&task=properties.raw',
            type: 'POST',
            data: {'bar': bar, 'action': action, 'action_value': action_value},
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    window.location.reload();
                    return;
                }

                const vals = ['grid', 'list', 'favs', 'map'];
                if (vals.includes(data.bar)) {
                    setActiveMenu(data.bar);
                }

                setSearchData(data, data.bar);
                $('.has-tip').foundation();
                $('.dropdown-pane').foundation();
                $('.kr-property .card').foundation();
                $('#kr-order-close').trigger('click');
                searchDone = true;
            }
        });
    }

    function setSearchData(response, action = '') {
        let $sidebar;
        if (response) {
            $('#kr-properties-data').empty().fadeIn('slow').html(response['items']).foundation();
            $('.kr-pager').html(response['pagination']);
            $('.kr-pager.bottom').html(response['pagination']);
            $("#kr-offcanvas-properties-filter").html(response['filters']);
            $("#kr-offcanvas-properties-sortby").html(response['sortby']);
            $('#kr-properties-filter-count').html(response['pcount']);
            $sidebar = $("#kr-sidebar-search");
            if ($sidebar.length && response['search'].length) {
                $sidebar.empty().html(response['search']);
                $('body').trigger('initajaxsearch');
            }

            if (action === 'page') {
                const sticky = $('.sticky');
                if (sticky.length) {
                    sticky.foundation('_calc', true);
                    window.scrollTo(0, 0);
                }
            }
        }
    }

    function setActiveMenu(bar) {
        const searchbar = $('.kr-searchbar').find('.button');
        $.each(searchbar, function (index, searchbar) {
            $(searchbar).removeClass('is-active');
        });
        $('.kr-searchbar .button.' + bar).addClass('is-active');
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
        if (screenWidthHasChanged() && searchData['items'] && !resized) {
            setSearchData(searchData);
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