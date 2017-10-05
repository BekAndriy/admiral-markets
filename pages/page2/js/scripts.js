'use strict';
!function ($) {
	$(document).ready(function () {

		initTabs();
		initAwardsSlider();
		initSpecSlider();
		initMonthChart();
	});
	var chart;
	function initTabs() {
		$('.dax30-live__tab-btn').click(function (event) {
			if ($(event.target).hasClass('active-tab')) return;

			$('.dax30-live__tab-btn').removeClass('active-tab');
			$(event.target).addClass('active-tab');
		});

		$('#dax30-hours-btn').click(initHoursChart);
		$('#dax30-day-btn').click(initDayChart);
		$('#dax30-week-btn').click(initWeekChart);
		$('#dax30-month-btn').click(initMonthChart);
	}

	function initAwardsSlider() {
		$('.dax30-awards__slider').slick({
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

	function initSpecSlider() {
		var specSlider = $('.dax30-live__specifications-slider');
		specSlider.on('init', function () {
			initSliderButton(1);
		});
		specSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			centerMode: true,
			infinite: false,
			initialSlide: 1,
			centerPadding: 'calc(30% - 10px)',
			prevArrow: `<button type="button" class="slick-prev">
									<svg class="arrow-left-icon" width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g id="Instruments" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
													<g id="AM-5.0-Instruments-page-2.1-Mobile" transform="translate(-38.000000, -2959.000000)" stroke="#2572DE" stroke-width="2">
															<g id="Section" transform="translate(20.000000, 2822.000000)">
																	<g id="Conditions-block" transform="translate(0.000000, 59.000000)">
																			<g id="Arrow-left" transform="translate(28.000000, 87.000000) rotate(-90.000000) translate(-28.000000, -87.000000) translate(20.000000, 78.000000)">
																					<polyline id="Stroke-3" points="0 8 8 0 16 8"></polyline>
																					<path d="M8,0 L8,18" id="Stroke-5"></path>
																			</g>
																	</g>
															</g>
													</g>
											</g>
									</svg>
									<span class="arrow-text">Admiral.Prime</span>
								</button>`,
			nextArrow: `<button type="button" class="slick-next">
									<span class="arrow-text">Admiral.Prime</span>
									<svg class="arrow-right-icon" width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
											<g id="Instruments" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
													<g id="AM-5.0-Instruments-page-2.1-Mobile" transform="translate(-309.000000, -2959.000000)" stroke="#2572DE" stroke-width="2">
															<g id="Section" transform="translate(20.000000, 2822.000000)">
																	<g id="Conditions-block" transform="translate(0.000000, 59.000000)">
																			<g id="Arrow-right" transform="translate(299.000000, 87.000000) rotate(90.000000) translate(-299.000000, -87.000000) translate(291.000000, 78.000000)">
																					<polyline id="Stroke-3" points="0 8 8 0 16 8"></polyline>
																					<path d="M8,0 L8,18" id="Stroke-5"></path>
																			</g>
																	</g>
															</g>
													</g>
											</g>
									</svg>
								</button>`,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						centerPadding: '0',
					}
				}
			]
		});

		specSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			initSliderButton(nextSlide);
		});


		function initSliderButton(slide) {
			var slides = $('.dax30-live__specifications-slider .specification');
			$('.dax30-live__specifications-slider .slick-prev .arrow-text')[0].innerHTML = $(slides[slide - 1]).attr('name') || '';
			$('.dax30-live__specifications-slider .slick-next .arrow-text')[0].innerHTML = $(slides[slide + 1]).attr('name') || '';
		}
	}

	var monthOptions = {
		maintainAspectRatio: false,
		legend: {
			display: false,
			labels: {
				fontColor: '#000'
			}
		},
		elements: {
			point: { radius: 0 },
			line: {
				tension: 0
			}
		},
		scales: {
			xAxes: [{
				gridLines: {
					color: "#fff",
				},
				type: "time",
				ticks: {
					fontColor: '#babdd6',
					padding: 12
				},
				time: {
					unit: 'day',
					round: 'day',
					displayFormats: {
						day: 'D MMM'
					}
				}
			}],
			yAxes: [{
				ticks: {
					fontColor: '#babdd6',
					padding: 12
				},
				gridLines: {
					drawBorder: false,
					color: "#dee0ec",
					zeroLineColor: "#dee0ec",
				},
			}]
		}
	};

	function initMonthChart() {
		chart && chart.destroy();
		$.get("./month-data.json", function (data) {
			var values = [];
			data.forEach(function (item, index) {
				var date = new Date(item.date.slice(0, -3));
				if (values.length && date.getDate() === values[values.length - 1].x.getDate()) {
					values[values.length - 1].y += item.volume;
				} else {
					values.push({ x: date, y: item.volume });
				}
			});

			chart = new Chart(document.getElementById("dax30-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false,
					}]
				},
				options: monthOptions
			});
		});
	}
	function initWeekChart() {
		chart && chart.destroy();
		$.get("./month-data.json", function (data) {
			var labels = [];
			var values = [];
			var i = 0;

			data.forEach(function (item, index) {
				if (i > 5) return;
				var date = new Date(item.date.slice(0, -3));
				if (values.length && date.getDate() === values[values.length - 1].x.getDate()) {
					values[values.length - 1].y += item.volume;
				} else {
					i++;
					values.push({ x: date, y: item.volume });
				}
			});

			chart = new Chart(document.getElementById("dax30-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false,
					}]
				},
				options: monthOptions
			});
		});
	}


	var dayOptions = {
		maintainAspectRatio: false,
		legend: {
			display: false,
			labels: {
				fontColor: '#000'
			}
		},
		elements: {
			point: { radius: 0 },
			line: {
				tension: 0
			}
		},
		scales: {
			xAxes: [{
				gridLines: {
					color: "#fff",
				},
				ticks: {
					fontColor: '#babdd6'
				},
				type: "time",
				time: {
					round: 'hour',
					unit: 'hour',
					displayFormats: {
						day: 'hA'
					}
				}
			}],
			yAxes: [{
				ticks: {
					fontColor: '#babdd6',
					padding: 12
				},
				gridLines: {
					drawBorder: false,
					color: "#dee0ec",
					zeroLineColor: "#dee0ec",
				},
				
			}]
		}
	};
	function initDayChart() {
		chart && chart.destroy();
		
		$.get("./day-data.json", function (data) {
			var values = [];

			data.forEach(function (item, index) {
				var coeff = 1000 * 60 * 60;
				var date = new Date(item.date.slice(0, -3));
				var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
				if (values.length && rounded.getTime() === values[values.length - 1].x.getTime()) {
					values[values.length - 1].y += item.volume;
				} else {
					values.push({ x: rounded, y: item.volume });
				}
			});
			chart = new Chart(document.getElementById("dax30-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false,
					}]
				},
				options: dayOptions
			});
		});
	}
	function initHoursChart() {
		chart && chart.destroy();
		
		$.get("./day-data.json", function (data) {
			var values = [];
			var i = 0;
			data.splice(1).forEach(function (item, index) {
				if (i > 4) return;
				var coeff = 1000 * 60 * 60;
				var date = new Date(item.date.slice(0, -3));
				var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
				if (values.length && rounded.getTime() === values[values.length - 1].x.getTime()) {
					values[values.length - 1].y += item.volume;
				} else {
					i++;
					values.push({ x: rounded, y: item.volume });
				}
			});

			chart = new Chart(document.getElementById("dax30-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false,
					}]
				},
				options: dayOptions
			});
		});
	}
}(jQuery);