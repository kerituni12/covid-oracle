const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../configs/dbconfig.js');

const apiController = require('../controllers/apiController');


router.get('/test', function (req, res) {
  res.send('ok');
});

router.get('/all', apiController.getAll);

router.get('/countries', apiController.getCountries);

router.get('/data-week/:countryCode', apiController.getDataWeek);




router.get('/:continent/:month/:page', apiController.getContinent);
// router.get('/export-data',);


module.exports = router;
