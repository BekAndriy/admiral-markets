'use strict';
!function ($) {
    let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

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
        accordion.on('show.bs.collapse', '.collapse', function () {
            accordion.find('.accordion-tab').removeClass('open');
            $(this).closest('.accordion-tab').addClass('open');
            accordion.find('.collapse.in').collapse('hide');
        });
        accordion.on('hide.bs.collapse', '.collapse', function () {
            if ($(this).closest('.accordion-tab.open').length) {
                $(this).closest('.accordion-tab').removeClass('open');
            }
        });

    }

    function initVideo() {
        let wrapper = $('.invest-video');
        let video = wrapper.find('video');
        let playBtn = wrapper.find('.invest-video__play-btn');
        let userAgent = window.navigator.userAgent;

        video.attr('src', video.data('src'));

        if ((userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) && is_safari) {
            playBtn.css('display', 'flex');
            playBtn.on('click', function () {
                video.get(0).muted = false;
                video.get(0).play();
            });
        } else {
            video.on('click', function () {
                video.get(0).muted = !video.get(0).muted;
            });

            $(window).scroll(function () {
                let scroll = $(this).scrollTop();
                let videoHeight = video.height();
                let docViewBottom = scroll + $(this).height();
                let elemTop = video.offset().top;
                let elemCenter = elemTop + videoHeight / 2;
                let elemBottom = elemTop + videoHeight;

                let isPlaying = video.get(0).currentTime > 0 && !video.get(0).paused && !video.get(0).ended
                    && video.get(0).readyState > 2;

                // if (((elemBottom <= docViewBottom) && (elemTop >= scroll))
                //     || ((elemBottom <= docViewBottom) && (elemTop + videoHeight/5 >= scroll))
                //     || ((elemBottom >= docViewBottom) && (elemTop <= scroll))) {

                if (((elemCenter < docViewBottom) && (elemTop > scroll))
                    || ((elemBottom < docViewBottom) && (elemCenter > scroll))
                    || ((elemBottom >= docViewBottom) && (elemTop <= scroll))) {

                    !isPlaying && video.get(0).play();
                } else {
                    isPlaying && video.get(0).pause();
                }
            });
        }
    }

    function initExchangeSlider() {

        let exSlider = $( ".invest-exchange__slider" );
        exSlider.flickity({
            wrapAround: true,
            autoPlay: 2500,
            groupCells: '10%',
            imagesLoaded: true,
            pauseAutoPlayOnHover: true,
            prevNextButtons: false,
            pageDots: false
        }, 1000);
        exSlider.mouseleave(function(e) {
            $(this).flickity('playPlayer')
        });
        exSlider.bind('touchend', function(e) {
            $(this).flickity('playPlayer')
        });
    }
}(jQuery);