const _0x5225 = ['catch', 'getElementById', 'Cases', 'showChart', 'coronaChart', '#7B6FFF', 'recovered', 'getLocationData', 'errMsg', '#F5385A', 'Deaths', 'error', 'then', 'bottom', 'pie', 'json'];
(function (_0x4f8e60, _0x5225e9) {
    const _0x257769 = function (_0x8b0f08) {
        while (--_0x8b0f08) {
            _0x4f8e60['push'](_0x4f8e60['shift']());
        }
    };
    _0x257769(++_0x5225e9);
}(_0x5225, 0x1b2));
const _0x2577 = function (_0x4f8e60, _0x5225e9) {
    _0x4f8e60 = _0x4f8e60 - 0x0;
    let _0x257769 = _0x5225[_0x4f8e60];
    return _0x257769;
};
const Corona = {
    'init': () => {
        Corona[_0x2577('0x5')]();
    },
    'getLocationData': () => {
        let _0x9df8cf = 'https://corona.lmao.ninja/v2/all';
        fetch(_0x9df8cf, {
            'method': 'GET'
        })[_0x2577('0xa')](_0x724a49 => _0x724a49[_0x2577('0xd')]())[_0x2577('0xa')](_0x4be7fd => {
            Corona[_0x2577('0x1')](_0x4be7fd);
        })[_0x2577('0xe')](_0x75947d => {
            console[_0x2577('0x9')](_0x75947d);
            conf[_0x2577('0x6')]();
        });
    },
    'showChart': _0x347799 => {
        let _0x4dfd59 = _0x347799;
        let _0x519232 = document[_0x2577('0xf')](_0x2577('0x2'));
        console.log(_0x2577('0xb'), _0x2577('0xc'), 0x14, 0x46, 0x0,_0x2577('0x3'),_0x2577('0x7'));
        const _0x43a835 = new Chart(_0x519232, {
            'type': _0x2577('0xc'),
            'options': {
                'responsive': !![],
                'maintainAspectRatio': ![],
                'legend': {
                    'display': !![],
                    'position': _0x2577('0xb'),
                    'labels': {
                        'usePointStyle': !![],
                        'padding': 0x14
                    }
                },
                'tooltips': {
                    'enabled': !![]
                },
                'hover': {
                    'mode': null
                },
                'cutoutPercentage': 0x46
            },
            'data': {
                'labels': [_0x2577('0x0'), _0x2577('0x8'), 'Recovered'],
                'datasets': [{
                    'data': [_0x4dfd59['cases'], _0x4dfd59['deaths'], _0x4dfd59[_0x2577('0x4')]],
                    'backgroundColor': [_0x2577('0x3'), _0x2577('0x7'), '#2DCE99'],
                    'borderWidth': 0x0
                }]
            }
        });
    }
};
Corona['init']();