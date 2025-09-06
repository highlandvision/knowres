"use strict";

let tabs, period, element, piedata, statsData;
let loaded = false;
const gc_options = {
	is3D:            true,
	chartArea:       {
		width: '100%', height: '100%', top: '20', chartArea: {
			left:         "3%",
			top:          "3%",
			height:       "94%",
			width:        "94%",
			pieSliceText: 'percentage',
		}
	},
	backgroundColor: 'transparent'
};

function drawChart() {
	const data = new google.visualization.DataTable(piedata);
	const chart = new google.visualization.PieChart(document.getElementById(element));
	chart.draw(data, gc_options);
}

window.addEventListener('DOMContentLoaded', function () {
	statsData = document.getElementById('kr-stats-data');
	tabs = document.querySelectorAll('#kr-statsTabs [data-bs-toggle="tab"]')

	for (let i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('shown.bs.tab', function () {
			period = tabs[i].hash;
			if (period === '#year') {
				piedata = statsData.dataset.year;
				element = 'piechart_year';
			} else if (period === '#month') {
				piedata = statsData.dataset.month;
				element = 'piechart_month';
			} else if (period === '#week') {
				piedata = statsData.dataset.week;
				element = 'piechart_week';
			} else if (period === '#day') {
				piedata = statsData.dataset.day;
				element = 'piechart_day';
			}

			if (!loaded) {
				google.charts.load('visualization', {'packages': ['corechart'], 'callback': drawChart});
				loaded = true;
			} else {
				drawChart();
			}
		}, false);

		let first = document.querySelector('#kr-statsTabs li:first-child a');
		let tab = new bootstrap.Tab(first);
		tab.show();
	}
});