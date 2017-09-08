'use strict';

!function ($) {
	$('.slider-testimonials').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		responsive: [{
			breakpoint: 991,
			settings: {
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true
			}
		}]
	});

	var candidateDesc = $('.candidate-desc'),
	    titleSliderWrapper = $('.title-slider-wrapper'),
	    mobileSlider = $('.mobile-slider'),
	    bubblesItems = $('.about-section .point');
	var slickIndex = 0;

	titleSliderWrapper.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		arrows: true,
		draggable: false
	});

	candidateDesc.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		cssEase: 'linear',
		speed: 300,
		draggable: false
	});

	mobileSlider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		responsive: [{
			breakpoint: 767,
			settings: {
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true
			}
		}]
	});

	var titleSliderItems = titleSliderWrapper.find('.item');

	titleSliderItems.on('click', function () {
		slickIndex = parseInt($(this).attr('data-slick-index'));

		candidateDesc[0].slick.slickGoTo(slickIndex);
		titleSliderWrapper[0].slick.slickGoTo(slickIndex);
		changeBubblesActivity(slickIndex);
	});

	$('.candidates').on('click', '.slick-next, .slick-prev', function () {
		var nextIndex = parseInt($(this).parent().find('.slick-active').attr('data-slick-index'));
		candidateDesc[0].slick.slickGoTo(nextIndex);
		changeBubblesActivity(nextIndex);
	});

	var messageBlock = $('.message-block');
	$('.media-popularity .question-btn').hover(function () {
		var _this = $(this);

		messageBlock.append(_this.next().clone()).css({
			display: 'block',
			top: _this.offset().top + _this.height() + 5
		});
	}, function () {
		messageBlock.html('');
	});

	function changeBubblesActivity(slide) {
		var bundle = bubblesItems.filter('[data-slide-id="' + slide + '"]');
		bubblesItems.removeClass('active');

		if (bundle) bundle.addClass('active');
	}
}(jQuery);