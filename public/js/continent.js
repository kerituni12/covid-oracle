const _0x426d = ['each', '#country_name', 'vectorMap', '#country_todayDeaths', 'recovered', 'cases', 'flag', '\x22\x20width=\x2225\x22\x20class=\x22mr-2\x20mb-1\x20\x22\x20/>', '#000000', 'deathsPerOneMillion', 'entries', '#country_todayCases', 'todayDeaths', '#f00000', '\x22\x20class=\x22img-fluid\x20mr-3\x22\x20width=\x2270\x22\x20/>', '<img\x20src=\x22', '#country_active', '<br/>\x20Cases:\x20', 'critical', 'ajax', 'casesPerOneMillion', 'polynomial', '<br/>\x20Active:\x20', 'iso2', 'country', '#country_critical', 'GET', '#country_cases', 'deaths', 'todayCases', '#ddd', '#country_deaths', 'json', 'countryInfo', 'log', 'asia_en', 'toUpperCase', 'active', '#country_flag', '#country_recovered', '#country_casesPerOneMillion', 'html'];
(function (_0xa72e78, _0x426d23) {
    const _0x2a5d1d = function (_0x3e387d) {
        while (--_0x3e387d) {
            _0xa72e78['push'](_0xa72e78['shift']());
        }
    };
    _0x2a5d1d(++_0x426d23);
}(_0x426d, 0x8f));
const _0x2a5d = function (_0xa72e78, _0x426d23) {
    _0xa72e78 = _0xa72e78 - 0x0;
    let _0x2a5d1d = _0x426d[_0xa72e78];
    return _0x2a5d1d;
};

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

function removeData(myChart) {
    console.log(myChart)
    // myChart.data.labels = [];
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    console.log(myChart)
    myChart.update();
}

let myChart;

$(function () {
    const _0x1be489 = $(_0x2a5d('0x1a'));
    const _0x365275 = $(_0x2a5d('0x15'));
    const _0x2c6f7f = $(_0x2a5d('0xa'));
    const _0x266682 = $(_0x2a5d('0x29'));
    const _0x5d270c = $(_0x2a5d('0x8'));
    const _0x364d3e = $(_0x2a5d('0xe'));
    const _0x212973 = $(_0x2a5d('0x16'));
    const _0x2f4155 = $(_0x2a5d('0x24'));
    const _0x22fe41 = $(_0x2a5d('0x1c'));

    const flagForDefault = {
        'asia' : 'VN',
        'europe' : 'GB',
        'africa' : 'ZA',
        'south-america' :'BR',
        'north-america' : 'US'
    }
    const pathname = window.location.pathname;
    const continent = pathname.split('/')[2];
    const flagContinent = (flagForDefault[`${continent}`]);
    $[_0x2a5d('0x2')]({
        'type': _0x2a5d('0x9'),
        'url': 'http://localhost:3001/api/countries',
        'dataType': _0x2a5d('0xf'),
        'success': function (_0x1741bc) {

            $['each'](_0x1741bc, function (_0x40062f, _0x3ec79a) {
                // console.log(_0x2a5d('0x7'))
                const vgg = _0x3ec79a['ISO2'].trim();
                // console.log(vgg, typeof vgg);
                // _0x1be489['html'](_0x3ec79a['COUNTRY']);
               
                if (vgg == flagContinent) {
                    const imgLink = `https://disease.sh/assets/img/flags/${vgg.toLowerCase()}.png`;
                    _0x1be489['html'](_0x3ec79a['COUNTRY']);
                    _0x365275['html'](`<img src="${imgLink}` + '\x22\x20class=\x22img-fluid\x20mr-3\x22\x20width=\x2270\x22\x20/>');
                    _0x2c6f7f['html'](_0x3ec79a['CASES']);
                    _0x266682['html'](_0x3ec79a['ACTIVED']);
                    _0x364d3e['html'](_0x3ec79a['DEATHS']);
                    _0x212973['html'](_0x3ec79a['RECOVERED']);

                    $[_0x2b00('0x9')]({
                        'type': _0x2b00('0xd'),
                        'url': 'http://localhost:3001/api/data-week/'+ vgg,
                        'dataType': 'json',
                        'success': function (data) {               
                            
                
                            const time = data.map(v => v["TIME"]);
                            time.shift();
                            const recovered = data.map(v => v["NEW_RECOVERED"]);
                            recovered.shift();
                            const cases = data.map(v => v["NEW_CASES"]);
                            cases.shift();
                            const deaths = data.map(v => v["NEW_DEATHS"]);
                            deaths.shift();
                            console.log(time, recovered, cases, deaths)
                            if(myChart) myChart.destroy();
                            var _0x31241e = document['getElementById'](_0x2b00('0x13'));                            
                            _0x31241e[_0x2b00('0x19')] = 0x64;
                
                            myChart = new Chart(_0x31241e, {
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
                }
                
            });
            // sample_data = {};
            // $[_0x2a5d('0x19')](_0x1741bc, function (_0x53c972, _0x173b26) {
            //     var _0x420963 = _0x173b26['countryInfo'][_0x2a5d('0x6')];
            //     var _0x4b09f3 = _0x173b26[_0x2a5d('0x1e')];
            //     sample_data[_0x420963] = _0x4b09f3;
            // });
            // const _0x2ad24b = {};

            let _testValues = [];
            let a = _0x1741bc.forEach((d, i) => {
                const {
                    ISO2,
                    CASES
                } = d;
                _testValues[ISO2.trim().toLowerCase()] = CASES;
                return;
            })

            // console.log(_testValues);
            const pathname = window.location.pathname;

            const continent = pathname.split('/')[2];
            console.log(continent);

            $('#continent-map')[_0x2a5d('0x1b')]({
                'map':`${continent}_en`,
                'backgroundColor': null,
                'selectedRegions': 'bd',
                'color': _0x2a5d('0xd'),
                'hoverOpacity': 0.7,
                'selectedColor': '#7B6FFF',
                'values': _testValues,
                'scaleColors': [_0x2a5d('0x26'), _0x2a5d('0x21')],
                'normalizeFunction': _0x2a5d('0x4'),
                'onRegionClick': function (_0x48c5b0, _0xd7ed1c, _0x1f6967) {

                    let vfv = _0xd7ed1c['toUpperCase']();
                    $[_0x2a5d('0x19')](_0x1741bc, function (_0x4c4b78, _0x3a7378) {
                        // console.log(_0x2a5d('0x1e'), _0x2a5d('0x14'), _0x2a5d('0x1'), _0x2a5d('0x1'), _0x2a5d('0xb'), _0x2a5d('0xc'), _0x2a5d('0x25'), _0x2a5d('0x3'), _0x2a5d('0x22'));
                        // _0x2a5d('0x18'  html 

                        // cases active critical critical deaths todayCases todayDeaths casesPerOneMillion deathsPerOneMillion
                        let vgg = _0x3a7378['ISO2'].trim();
                        // console.log(vgg, vfv)
                        if (vfv == vgg) {
                            const imgLink = `https://disease.sh/assets/img/flags/${vgg.toLowerCase()}.png`;
                            _0x1be489['html'](_0x3a7378['COUNTRY']);
                            _0x365275['html'](`<img src="${imgLink}` + '\x22\x20class=\x22img-fluid\x20mr-3\x22\x20width=\x2270\x22\x20/>');
                            _0x2c6f7f['html'](_0x3a7378['CASES']);
                            _0x266682['html'](_0x3a7378['ACTIVED']);
                            _0x364d3e['html'](_0x3a7378['DEATHS']);
                            _0x212973['html'](_0x3a7378['RECOVERED']);
                        }
                    });
                    
                    $[_0x2b00('0x9')]({
                        'type': _0x2b00('0xd'),
                        'url': 'http://localhost:3001/api/data-week/'+ vfv,
                        'dataType': 'json',
                        'success': function (data) {               
                            
                
                            const time = data.map(v => v["TIME"]);
                            time.shift();
                            const recovered = data.map(v => v["NEW_RECOVERED"]);
                            recovered.shift();
                            const cases = data.map(v => v["NEW_CASES"]);
                            cases.shift();
                            const deaths = data.map(v => v["NEW_DEATHS"]);
                            deaths.shift();
                            console.log(time, recovered, cases, deaths)
                            if(myChart) myChart.destroy();
                            var _0x31241e = document['getElementById'](_0x2b00('0x13'));                            
                            _0x31241e[_0x2b00('0x19')] = 0x64;
                
                            myChart = new Chart(_0x31241e, {
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

                }

            });
        }
    });
});