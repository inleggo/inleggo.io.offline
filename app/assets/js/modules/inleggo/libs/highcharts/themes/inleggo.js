/**
 * Grid-light theme for app.inleggo.com
 * @author Joseph Urbina
 */
// <link href="assets/css/modules/inleggo/css/open-sans.css" rel="stylesheet" />
// Load the fonts
Highcharts.createElement('link', {
	href: 'assets/css/modules/inleggo/css/open-sans.css',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
	colors: ["#0AA89E", "#08877F", "#066962", "#05524C", "#04403B", "#EEB5AC", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor: null,
		style: {
			fontFamily: "Roboto, sans-serif",
                        fontSize: '10px',
                        color:"#313534"
		}
	},
	title: {
		style: {
			fontSize: '20px',
			fontWeight: 'bold',
			textTransform: 'uppercase'
		}
	},
	tooltip: {
		borderWidth: 2,
		backgroundColor: '#E5E6E6',
        fonSize:'12px',
		shadow: true
	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '10px'
		}
	},
        /*
        series: {
                dataLabels: {
                    style: {
                        fontSize: '50px !important',
                        fontFamily: "Dosis, sans-serif"
                    }
                }
            },
            */
	xAxis: {
		gridLineWidth: 0,
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	yAxis: {
		//minorTickInterval: 'auto',
		title: {
			style: {
				textTransform: 'uppercase'
			}
		},
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	plotOptions: {
		candlestick: {
			lineColor: '#FFF'
		}
	},


	// General
	background2: '#fff'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

Highcharts.getOptions().plotOptions.pie.colors = (function () {
    var colors = [],
    base = '#0AA89E',
    i;
    for (i = 0; i < 10; i += 1) {
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
}());
