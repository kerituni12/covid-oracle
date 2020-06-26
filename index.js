const express = require('express');
var path = require('path');

// Init app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

// Set Routers

const api = require('./routers/api.js');
const continent = require('./routers/continent.js');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'home'
    });
})

app.get('/continent/:continent', function(req,res){
    const continent = req.params.continent;
    console.log(continent);
    // const month = req.query.month;
    res.render('continent',{title: continent})
})

app.use('/api', api);
// app.use('/continents', continent);

const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});