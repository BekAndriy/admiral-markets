'use strict';
!function ($) {
    $(document).ready(function () {
        initExchangeSlider();
        initAwardsSlider();
        initScroll();
        initAccordion();
        initCtaScroll();
    });

    $(window).load(function () {
        initVideo();
    });

    function initScroll() {
        $(".invest-stocks__scroll-button").click(function () {
            $('html,body').animate({
                    scrollTop: $(".invest-exchange").offset().top + 50
                },
                'slow');
        });
    }

    function initCtaScroll() {
        $(".scroll-to-form").click(function (e) {
            e.preventDefault();
            $('html,body').animate({
                    scrollTop: $(".invest-signup__form").offset().top - 10
                },
                'slow');
        });
    }

    function initAwardsSlider() {
        $('.invest-awards__slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                    }
                }
            ]
        });
    }

    function initAccordion() {
        let accordion = $('#accordion');
        accordion.on('show.bs.collapse','.collapse', function() {
            accordion.find('.accordion-tab').removeClass('open');
            $(this).closest('.accordion-tab').addClass('open');
            accordion.find('.collapse.in').collapse('hide');
        });
        accordion.on('hide.bs.collapse','.collapse', function() {
            if ($(this).closest('.accordion-tab.open').length) {
                $(this).closest('.accordion-tab').removeClass('open');
            }
        });

    }

    function initVideo() {
        let wrapper = $('.invest-video__player');
        let video = wrapper.find('video');
        let close = $('.invest-video__stop-btn');

        video.attr('src', video.data('src'));

        $('.invest-video__play-btn').click(function () {
            video.get(0).play();
            close.removeClass('invest-video__stop-btn-inactive');
            wrapper.show();
        });


        close.click(function () {
            close.addClass('invest-video__stop-btn-inactive');
            video.get(0).pause();
            wrapper.hide();
        });
    }

    function initExchangeSlider() {
        var specSlider = $('.invest-exchange__slider');
        specSlider.slick({
            slidesToShow: 6,
            arrows: false,
            centerMode: true,
            infinite: true,
            initialSlide: 4,
            prevArrow: false,
            nextArrow: false,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        centerPadding: '0',
                    }
                }
            ]
        });
    }
}(jQuery);