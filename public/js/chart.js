var _0x2212 = ['height', '#2DCE99', 'Confirmed', 'deaths', 'line', 'Value', 'formatToParts', 'Month', 'index', 'transparent', 'top', 'ajax', 'length', '#6456FF', '2-digit', 'GET', 'recovered', 'slice', 'Recovered', 'numeric', 'map', 'usa_timeseries', 'Death', '#F5385A', 'nearest', 'max', '#F7F8FC'];
(function (_0x490b76, _0x22126c) {
    var _0x2b00c9 = function (_0x3f394e) {
        while (--_0x3f394e) {
            _0x490b76['push'](_0x490b76['shift']());
        }
    };
    _0x2b00c9(++_0x22126c);
}(_0x2212, 0x197));
var _0x2b00 = function (_0x490b76, _0x22126c) {
    _0x490b76 = _0x490b76 - 0x0;
    var _0x2b00c9 = _0x2212[_0x490b76];
    return _0x2b00c9;
};


$(function () {
    $[_0x2b00('0x9')]({
        'type': _0x2b00('0xd'),
        'url': 'http://localhost:3001/api/data-week',
        'dataType': 'json',
        'success': function (data) {

            // var _0x269932 = _0x509599['US'][_0x2b00('0xf')](Math[_0x2b00('0x17')](_0x509599['US'][_0x2b00('0xa')] - 0x1e, 0x1))[_0x2b00('0x12')](_0x200d57 => _0x200d57['confirmed']);
            // var _0x1c66f2 = _0x509599['US'][_0x2b00('0xf')](Math[_0x2b00('0x17')](_0x509599['US'][_0x2b00('0xa')] - 0x1e, 0x1))[_0x2b00('0x12')](_0x112872 => _0x112872[_0x2b00('0x1')]);
            // var _0x50da90 = _0x509599['US'][_0x2b00('0xf')](Math['max'](_0x509599['US'][_0x2b00('0xa')] - 0x1e, 0x1))[_0x2b00('0x12')](_0x48fc53 => _0x48fc53[_0x2b00('0xe')]);
            // var _0x49acf0 = _0x509599['US'][_0x2b00('0xf')](Math[_0x2b00('0x17')](_0x509599['US'][_0x2b00('0xa')] - 0x1e, 0x1))[_0x2b00('0x12')](function (_0x347c74) {
               
            //     const _0x4639d5 = new Date(_0x347c74['date']);
            //     const _0xf3455 = new Intl['DateTimeFormat']('en', {
            //         'year': _0x2b00('0x11'),
            //         'month': 'short',
            //         'day': _0x2b00('0xc')
            //     });
            //     const [{
            //         value: _0x4d7281
            //     }, , {
            //         value: _0x55663f
            //     }] = _0xf3455[_0x2b00('0x4')](_0x4639d5);
            //     return _0x55663f + '-' + _0x4d7281;
            // });

            // console.log(_0x49acf0,  _0x50da90, _0x1c66f2, _0x269932)

            const time = data.map(v => v["TIME"]);
            time.shift();
            const recovered = data.map(v => v["NEW_RECOVERED"]);
            recovered.shift();
            const cases = data.map(v => v["NEW_CASES"]);
            cases.shift();
            const deaths = data.map(v => v["NEW_DEATHS"]);
            deaths.shift();
            console.log(time, recovered, cases, deaths)
            var _0x31241e = document['getElementById'](_0x2b00('0x13'));
            _0x31241e[_0x2b00('0x19')] = 0x64;

            new Chart(_0x31241e, {
                'type': _0x2b00('0x2'),
                'data': {
                    'labels': time,
                    'datasets': [{
                        'label': 'recovered',
                        'borderColor': '#6456FF',
                        'borderWidth': '2',
                        'backgroundColor': _0x2b00('0x7'),
                        'pointBackgroundColor': _0x2b00('0xb'),
                        'data': recovered,
                        'yAxisID': 'y-axis-1',
                    }, {
                        'label': 'confirmed',
                        'borderColor': _0x2b00('0x1a'),
                        'borderWidth': '2',
                        'backgroundColor': 'transparent',
                        'pointBackgroundColor': _0x2b00('0x1a'),
                        'data': cases,
                        'yAxisID': 'y-axis-1',
                    }, {
                        'label': 'deaths',
                        'borderColor': '#F5385A',
                        'borderWidth': '2',
                        'backgroundColor': 'transparent',
                        'pointBackgroundColor': _0x2b00('0x15'),
                        'data': deaths,
                        'yAxisID': 'y-axis-1',
                    }]
                },
                'options': {
                    'responsive': !![],
                    'maintainAspectRatio': ![],
                    'legend': {
                        'display': !![],
                        'position': _0x2b00('0x8'),
                        'labels': {
                            'usePointStyle': !![]
                        }
                    },
                    'tooltips': {
                        'mode': _0x2b00('0x6'),
                        'intersect': ![]
                    },
                    'hover': {
                        'mode': _0x2b00('0x16'),
                        'intersect': !![]
                    },
                    'scales': {
						'yAxes': [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}],
					}
				
                }
            });
        }
    });
});