/**
 * @package    Know Reservations
 * @subpackage Site JS
 * @copyright  2020 Highland Vision. All rights reserved.
 * @license    See the file "LICENSE.txt" for the full license governing this code.
 * @author     Hazel Wilson <hazel@highlandvision.com>
 */

"use strict";

(function ($) {
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
                    arrows: true,
                    prevArrow: '<i class="slick-nav prev fas fa-chevron-left show-for-medium"></i>',
                    nextArrow: '<i class="slick-nav next fas fa-chevron-right show-for-medium"></i>',
                    infinite: true,
                    speed: 300,
                    centerMode: true,
                    centerPadding: '3px',
                    variableWidth: true,
                    slidesToShow: 1,
                    lazyLoad: 'progressive',
                    responsive: [
                        {
                            breakpoint: 640,
                            settings: {
                                variableWidth: false,
                                centerMode: false,
                                centerPadding: '0px',
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            } else {
                $slides.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<i class="slick-nav prev fas fa-chevron-left show-for-medium"></i>',
                    nextArrow: '<i class="slick-nav next fas fa-chevron-right show-for-medium"></i>',
                    arrows: true,
                    infinite: true,
                    lazyLoad: 'ondemand',
                    fade: true,
                    asNavFor: showthumbs ? '#kr-property-thumbs' : ''
                });
            }

            if (showthumbs) {
                const $thumbs = $('#kr-property-thumbs');
                const twidth = $thumbs.data('twidth');
                const show = Math.floor($slides.width() / (twidth + 5));

                if ($thumbs.length) {
                    $thumbs.slick({
                        slidesToShow: show,
                        slidesToScroll: 1,
                        asNavFor: '#kr-property-slideshow',
                        dots: false,
                        infinite: true,
                        arrows: false,
                        lazyLoad: 'ondemand',
                        centerMode: false,
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
                        '<i class="fas fa-chevron-left"></i></button>',
                    nextArrow: '<button type="button" class="slick-nav next slick-btn" title="Forward">' +
                        '<i class="fas fa-chevron-right"></i></button>',
                    lazyLoad: 'ondemand',
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                });
            }
        });

        $('.kr-slideshow').slick({
            prevArrow: '<i class="slick-nav prev fas fa-chevron-left"></i>',
            nextArrow: '<i class="slick-nav next fas fa-chevron-right"></i>',
            speed: 800,
            lazyLoad: 'ondemand',
            adaptiveHeight: true
        });

        if ($('#kr-property-slideshow').length) {
            kickSlideshow()
        }

        $('.kr-carousel').each(function () {
            $(this).slick({
                arrows: false,
                autoplay: true,
                fade: true,
                infinite: true,
                lazyLoad: 'ondemand',
                adaptiveHeight: true
            });
        });

        $('.kr-featured').slick({
            appendArrows: '.kr-double-arrows',
            prevArrow: '<i class="featured slick-nav prev fas fa-chevron-left"></i>',
            nextArrow: '<i class="featured slick-nav next fas fa-chevron-right"></i>',
            lazyload: 'ondemand',
            infinite: false,
            slidesToScroll: 1,
            speed: 300,
            responsive: [
                {breakpoint: 741, settings: {slidesToShow: 2, slidesToScroll: 1}},
                {breakpoint: 501, settings: {slidesToShow: 1, slidesToScroll: 1}}
            ]
        });

        let tallest = 0;
        let $items =  $('.kr-featured .content h4');
        $items.each(function(){
            if ($(this).height() > tallest){
                tallest = $(this).height();
            }
        });
        $items.height(tallest);

        $('.kr-alternatives').slick({
            appendArrows: '.kr-double-arrows',
            prevArrow: '<i class="slick-nav prev fas fa-chevron-left"></i>',
            nextArrow: '<i class="slick-nav next fas fa-chevron-right"></i>',
            infinite: false,
            lazyload: 'ondemand',
            slidesToScroll: 1,
            speed: 300,
        });
    });
}(jQuery));