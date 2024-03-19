/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

let ovChildren, ovState = null, ovPs = 0, $ovBtn;
let fcChildren, fcState = null, $fcBtn;
let ttChildren, ttState = null, ttPs = 0, $ttBtn, ttparas;
let currentParagraph, hrElement;

(function ($) {
    $(function () {
        ovChildren = $('.readmore-overview').children('p');
        ovPs = ovChildren.length;
        if (ovPs > 5) {
            ovChildren.slice(6).hide();
            ovChildren.slice(ovPs - 1, ovPs).after('<a class="button hollow' +
                ' accent readmore overview-toggle">Read more...</a>');
            ovState = 'hidden';
        }

        ttChildren = $('.readmore-testimonials').children('p');
        ttPs = ttChildren.length;
        if (ttPs > 10) {
            ttChildren.slice(11).hide();
            ttparas = document.querySelectorAll('.readmore-testimonials p[style*="display: none"]');
            doHRs(ttparas, 'hide');
            ttChildren.slice(ttPs - 1, ttPs).after('<a class="button hollow' +
                ' accent readmore testimonials-toggle">Read more...</a>');
            ttState = 'hidden';
        }

        fcChildren = $('.readmore-facilities').children('.rooms');
        if (fcChildren.length) {
            fcChildren.hide().after('<a class="button hollow' +
                ' accent readmore facilities-toggle">See all facilities...</a>');
            fcState = 'hidden';
        }

        $(document).on('click', '.readmore.overview-toggle', function (e) {
            e.preventDefault();
            $ovBtn = $(".overview-toggle");
            if (ovState === 'visible') {
                ovChildren.slice(6).hide();
                $ovBtn.attr('value', 'Read more');
                $ovBtn.text("Read more...");
                ovState = 'hidden';
            } else if (ovState === 'hidden') {
                $('.readmore-overview p').show();
                $ovBtn.attr('value', 'Read less');
                $ovBtn.text("Read less...");
                ovState = 'visible';
            }
            $('.property-menu').foundation('calcPoints');
            $('.sticky').foundation('_calc', true);
        }).on('click', '.readmore.testimonials-toggle', function (e) {
            e.preventDefault();
            $ttBtn = $(".testimonials-toggle");
            if (ttState === 'visible') {
                ttChildren.slice(11).hide();
                doHRs(ttparas, 'hide');
                $ttBtn.attr('value', 'Read more');
                $ttBtn.text("Read more...");
                ttState = 'hidden';
            } else if (ttState === 'hidden') {
                $('.readmore-testimonials p').show();
                doHRs(ttparas, 'show');
                $ttBtn.attr('value', 'Read less');
                $ttBtn.text("Read less...");
                ttState = 'visible';
            }
            $('.property-menu').foundation('calcPoints');
            $('.sticky').foundation('_calc', true);
        }).on('click', '.readmore.facilities-toggle', function (e) {
            e.preventDefault();
            $fcBtn = $(".facilities-toggle");
            if (fcState === 'visible') {
                $('.readmore-facilities .rooms').hide();
                $fcBtn.attr('value', 'See all facilities');
                $fcBtn.text("See all facilities...");
                fcState = 'hidden';
            } else if (fcState === 'hidden') {
                $('.readmore-facilities .rooms').show();
                $fcBtn.attr('value', 'Hide all facilities');
                $fcBtn.text("Hide all facilities...");
                fcState = 'visible';
            }
            $('.property-menu').foundation('calcPoints');
            $('.sticky').foundation('_calc', true);
        });
    });
}(jQuery));

function doHRs(paragraphs, type) {
    for (let i = 0; i < paragraphs.length; i++) {
        currentParagraph = paragraphs[i];
        hrElement = currentParagraph.nextElementSibling;
        if (hrElement && hrElement.tagName === 'HR') {
            if (type === 'hide')
                hrElement.style.display = 'none';
            else
                hrElement.style.display = 'block';
        }
    }
}