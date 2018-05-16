'use strict';
!function ($) {
	$(document).ready(function () {
		initExchangeSlider();
        initAwardsSlider();
	});

	$(window).load(function(){
        initVideo();
	});

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

	function initVideo() {
		let wrapper = $('.invest-video__player');
		let video = wrapper.find('video');
		let close = $('.invest-video__stop-btn');

		video.attr('src', video.data('src'));

		$('.invest-video__play-btn').click(function(){
			video.get(0).play();
			close.removeClass('invest-video__stop-btn-inactive');
            wrapper.show();
		});


        $('.invest-video__stop-btn').click(function(){
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