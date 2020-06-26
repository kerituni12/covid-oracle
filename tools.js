const oracledb = require('oracledb');
const dbConfig = require('./configs/dbconfig.js');
const axios = require('axios');

async function addCountries(countries) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const createSql = `insert into countries (name, code) values (:name, :code)`;
        const result = await connection.executeMany(createSql, countries, {
            autoCommit: true,
        });
        console.log('Result is:', result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

function getCountries() {
    axios
        .get('https://api.covid19api.com/countries')
        .then(function ({
            data
        }) {
            const countries = data.map((data) => {
                const {
                    Slug,
                    ...newData
                } = data;

                // change properties for matching with oracle
                const {
                    Country: name,
                    ISO2: code
                } = newData;

                return {
                    name,
                    code,
                }; // Country
            });

            addCountries(countries);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

async function addCases(cases) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const createSql = `insert into cases (country_code, confirmed, deathed, recovered, actived, occured_at) values (:country_code, :confirmed, :deathed, :recovered, :actived, to_date(:occured_at,'YYYY-MM-DD'))`;
        const result = await connection.executeMany(createSql, cases, {
            autoCommit: true,
        });
        console.log('Result is:', result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function getCases(country) {
    axios
        .get(
            `https://api.covid19api.com/total/country/${country}?from=2020-06-23T00:00:00Z&to=2020-06-24T00:00:00Z`,
        )
        .then(async function ({
            data
        }) {
            //get id_country, code_country
            let connection;
            connection = await oracledb.getConnection(dbConfig);
            const countryCodeSql = `select code from countries where name = '${data[0].Country}'`;
            const result = await connection.execute(countryCodeSql);
            const country_code = result.rows[0][0];

            const cases = data.map((data) => {
                //change properties to match with oracle
                // console.log(data.Date.split('T')[0])
                const {
                    Confirmed: confirmed,
                    Deaths: deathed,
                    Recovered: recovered,
                    Active: actived,
                    Date: occured_at,
                } = data;

                return {
                    country_code,
                    confirmed,
                    deathed,
                    recovered,
                    actived,
                    occured_at: occured_at.split('T')[0],
                }; // Case
            });

            // console.log(cases);
            addCases(cases);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

function getCasesAllCountries() {
    axios
        .get('https://api.covid19api.com/countries')
        .then(async function ({
            data
        }) {
            const countries = data.map(({
                Slug
            }) => Slug); // return slug for all countries

            for (let i = 0; i < countries.length; i++) {
                getCases(countries[i]);
                await sleep(2000);
                console.log(countries[i]);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function getCotinents() {
    axios
        .get(
            'https://pkgstore.datahub.io/JohnSnowLabs/country-and-continent-codes-list/country-and-continent-codes-list-csv_json/data/c218eebbf2f8545f3db9051ac893d69c/country-and-continent-codes-list-csv_json.json',
        )
        .then(function ({
            data
        }) {
            console.log(data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

async function todayUpdate(country) {
    axios
        .get(`https://api.covid19api.com/summary`)
        .then(async function ({
            data
        }) {
            console.log(data['Countries']);
            //get id_country, code_country
            // let connection;
            // connection = await oracledb.getConnection(dbConfig);
            // const countryCodeSql = `select code from countries where name = '${data[0].Country}'`;
            // const result = await connection.execute(countryCodeSql);
            // const country_code = result.rows[0][0];

            const cases = data['Countries'].map((data) => {
                //change properties to match with oracle
                // console.log(data.Date.split('T')[0])
                const {
                    CountryCode: country_code,
                    TotalConfirmed: confirmed,
                    TotalDeaths: deathed,
                    TotalRecovered: recovered,
                    Date: occured_at,
                } = data;

                const actived = confirmed - deathed - recovered;
                return {
                    country_code,
                    confirmed,
                    deathed,
                    recovered,
                    actived,
                    occured_at: occured_at.split('T')[0],
                }; // Case
            });

            // console.log(cases);
            addCases(cases);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

// getCasesAllCountries();
todayUpdate();


// Test Lap Lich
async function testLapLich() {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const createSql = `insert into cases (country_code, confirmed, deathed, recovered, actived, occured_at) values ('VN', 122, 122, 122, 122, to_date('2020-06-06','YYYY-MM-DD'))`;
        const result = await connection.execute(
            createSql, {}, {
                autoCommit: true,
            },
        );
        console.log('Result is:', result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
// console.log(
//   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
// );
// testLapLich();