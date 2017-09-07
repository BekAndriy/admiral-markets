'use strict';
!function ($) {
	$('.slider-testimonials').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
				}
			}
		]
	});

	const candidateDesc = $('.candidate-desc'),
		titleSliderWrapper = $('.title-slider-wrapper'),
		mobileSlider = $('.mobile-slider');
	let slickIndex = 0;

	titleSliderWrapper.slick({
		infinite: false,
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
		responsive: [
			{
				breakpoint: 767,
				settings: {
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
				}
			}
		]
	});

	let titleSliderItems = titleSliderWrapper.find('.item');

	titleSliderItems.on('click',function() {
		slickIndex = parseInt($(this).attr('data-slick-index'));

		candidateDesc[0].slick.slickGoTo(slickIndex);
		titleSliderWrapper[0].slick.slickGoTo(slickIndex);
	});
	$('.candidates').on('click','.slick-next, .slick-prev',function() {
		let nextIndex = parseInt($(this).parent().find('.slick-active').attr('data-slick-index'));
		candidateDesc[0].slick.slickGoTo(nextIndex);
	});

	let messageBlock = $('.message-block');
	$('.media-popularity .question-btn').hover(function() {
		let _this = $(this);

		messageBlock.append(_this.next().clone()).css({
			display: 'block',
			top: _this.offset().top + _this.height() + 5,
		})
	}, function() {
		messageBlock.html('');
	})

}(jQuery);