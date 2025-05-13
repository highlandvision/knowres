/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

'use strict';

(function ($) {
    let portrait = null;

    function kickSlideshow() {
        const $slides = $('#kr-property-slideshow');

        if ($('slick-initialized').length) {
            $slides.slick('slickSetOption', 'infinite', true, true);
            if ($slides.data('thumbs')) {
                $('#kr-property-thumbs').slick('slickSetOption', 'infinite', true, true);
            }

            return;
        }

        if ($slides.length) {
            const type = $slides.data('type');
            const showthumbs = $slides.data('thumbs');

            if (type === 'centered') {
                $slides.slick({
                    adaptiveHeight: false,
                    arrows: true,
                    asNavFor: showthumbs ? '#kr-property-thumbs' : '',
                    centerMode: true,
                    centerPadding: '0px',
                    infinite: true,
                    lazyLoad: 'progressive',
                    prevArrow: '<i class="slick-nav prev fa-solid fa-chevron-left"></i>',
                    nextArrow: '<i class="slick-nav next fa-solid fa-chevron-right"></i>',
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    speed: 300,
                    variableWidth: true,
                });
            } else {
                $slides.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<i class="slick-nav prev fa-solid fa-chevron-left"></i>',
                    nextArrow: '<i class="slick-nav next fa-solid fa-chevron-right"></i>',
                    arrows: true,
                    infinite: true,
                    lazyLoad: 'ondemand',
                    fade: true,
                    asNavFor: showthumbs ? '#kr-property-thumbs' : '',
                    variableWidth: true,
                    mobileFirst: true,
                });
            }

            if (showthumbs) {
                const $thumbs = $('#kr-property-thumbs');
                const twidth = $thumbs.data('twidth');
                const show = Math.floor($slides.width() / (twidth));
                if ($thumbs.length) {
                    $thumbs.slick({
                        slidesToShow: show,
                        slidesToScroll: 1,
                        asNavFor: '#kr-property-slideshow',
                        dots: false,
                        infinite: true,
                        arrows: false,
                        lazyLoad: 'ondemand',
                        focusOnSelect: true
                    });
                }
            }
        }
    }

    $(function () {
        $('body').on('mouseenter', '.kr-list-property.card', function (e) {
            e.preventDefault();
            let id = '#kr-lazy-' + $(this).attr('data-id');
            if (!$(id).hasClass('slick-initialized')) {
                $(id).slick({
                    prevArrow: '<button type="button" class="slick-nav prev slick-btn" title="Back">' +
                        '<i class="fa-solid fa-chevron-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-nav next slick-btn" title="Forward">' +
                        '<i class="fa-solid fa-chevron-right"></i></button>',
                    lazyLoad: 'ondemand',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                });
            }
        });
        $('.kr-slideshow').slick({
            prevArrow: '<i class="slick-nav prev fa-solid fa-chevron-left"></i>',
            nextArrow: '<i class="slick-nav next fa-solid fa-chevron-right"></i>',
            speed: 800,
            lazyLoad: 'ondemand',
            adaptiveHeight: true,
        });
        if ($('#kr-property-slideshow').length) {
            kickSlideshow();
        }
        $('.kr-carousel').slick({
            arrows: false,
            autoplay: true,
            fade: true,
            infinite: true,
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            slidesToShow: 1
        });

        const $featured  = $('.kr-featured');
        const $sts = $featured.data('slidestoshow');
        $featured.slick({
            adaptiveHeight: true,
            appendArrows: '.kr-double-arrows',
            prevArrow: '<i class="featured slick-nav prev fa-solid fa-chevron-left"></i>',
            nextArrow: '<i class="featured slick-nav next fa-solid fa-chevron-right"></i>',
            lazyload: 'ondemand',
            infinite: false,
            mobileFirst: true,
            slidesToScroll: 1,
            speed: 300,
            responsive: [
                {breakpoint: 1200, settings: {slidesToShow: $sts}},
                {breakpoint: 800,
                    settings: {
                        slidesToShow: $sts < 3 ? $sts : 3}},
                {breakpoint: 400,
                    settings: {
                        slidesToShow: $sts < 2 ? $sts : 2}}
            ]
        });

        let tallest = 0;
        let $items = $('.kr-featured .content h4');
        $items.each(function () {
            if ($(this).height() > tallest) {
                tallest = $(this).height();
            }
        });
        $items.height(tallest);

        tallest = 0;
        $items = $('.kr-featured .content p');
        $items.each(function () {
            if ($(this).height() > tallest) {
                tallest = $(this).height();
            }
        });
        $items.height(tallest);

        $('.kr-alternatives').slick({
            appendArrows: '.kr-double-arrows',
            prevArrow: '<i class="slick-nav prev fa-solid fa-chevron-left"></i>',
            nextArrow: '<i class="slick-nav next fa-solid fa-chevron-right"></i>',
            infinite: false,
            lazyload: 'ondemand',
            slidesToScroll: 1,
            speed: 300,
            variableHeight: true
        });
    });

    $('#kr-property-slideshow.mixed-width').on('beforeChange init', function (event, slick, currentSlide, nextSlide) {
        let currentImg = $(slick.$slides.get(nextSlide)).find('img');
        if (isPortrait(currentImg) && !portrait) {
            $('#kr-property-slideshow.mixed-width.slick-initialized').slick('slickSetOption', {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3,
                slidesToScroll: 1,
            }, true);
            portrait = true;
        } else if (portrait) {
            $('#kr-property-slideshow.mixed-width.slick-initialized').slick('slickSetOption', {
                centerMode: false,
                centerPadding: '0px',
                slidesToShow: 1,
                slidesToScroll: 1,
            }, true);
            portrait = false;
        }
    });
}(jQuery));

function isPortrait(img) {
    return img.attr('height') > img.attr('width');
}