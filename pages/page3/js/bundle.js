'use strict';

!function ($) {
	$(document).ready(function () {

		initTabs();
		initAwardsSlider();
		initSpecSlider();
		toggleCollapse();
	});
	var chart;
	function initTabs() {
		$('.invest-live__tab-btn').click(function (event) {
			if ($(event.target).hasClass('active-tab')) return;

			$('.invest-live__tab-btn').removeClass('active-tab');
			$(event.target).addClass('active-tab');
		});

		$('#invest-hours-btn').click(initHoursChart);
		$('#invest-day-btn').click(initDayChart);
		$('#invest-week-btn').click(initWeekChart);
		$('#invest-month-btn').click(initMonthChart);
	}

	function initAwardsSlider() {
		$('.invest-awards__slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			infinite: false,
			responsive: [{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					dots: true
				}
			}]
		});
	}

	function initSpecSlider() {
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
			responsive: [{
				breakpoint: 767,
				settings: {
					centerPadding: '0'
				}
			}]
		});
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
					color: "#fff"
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
					zeroLineColor: "#dee0ec"
				}
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

			chart = new Chart(document.getElementById("invest-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false
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

			chart = new Chart(document.getElementById("invest-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false
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
					color: "#fff"
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
					zeroLineColor: "#dee0ec"
				}

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
				var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
				if (values.length && rounded.getTime() === values[values.length - 1].x.getTime()) {
					values[values.length - 1].y += item.volume;
				} else {
					values.push({ x: rounded, y: item.volume });
				}
			});
			chart = new Chart(document.getElementById("invest-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false
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
				var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
				if (values.length && rounded.getTime() === values[values.length - 1].x.getTime()) {
					values[values.length - 1].y += item.volume;
				} else {
					i++;
					values.push({ x: rounded, y: item.volume });
				}
			});

			chart = new Chart(document.getElementById("invest-chart"), {
				type: 'line',
				data: {
					datasets: [{
						data: values,
						borderColor: "#2072E1",
						borderWidth: 3,
						fill: false
					}]
				},
				options: dayOptions
			});
		});
	}

	function toggleCollapse() {
		$('.specification__link').click(function (event) {
			$(event.target.parentElement).toggleClass('active');
			var panel = $(event.target.parentElement).find('.specification__link-expanded')[0];
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
}(jQuery);