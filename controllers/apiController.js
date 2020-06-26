const oracledb = require('oracledb');
const dbConfig = require('../configs/dbconfig.js');

function getBeforeYesterday() {
    let currentDate = new Date();
    let yesterday = (currentDate.getDate() - 2).toString().padStart(2, '0');
    let dayBeforeYesterday = (currentDate.getDate() - 4)
        .toString()
        .padStart(2, '0');
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let year = currentDate.getFullYear();
    let stringYesterday = `${year}/${month}/${yesterday}`;
    let stringDayBeforeYesterDay = `${year}/${month}/${dayBeforeYesterday}`;
    return [stringYesterday, stringDayBeforeYesterDay];
}
const [yesterday, dayBeforYesterday] = getBeforeYesterday();

function getSevenDate() {
    const numDateBefore = 10;
    const newDate = new Date();
    const _date = (newDate.getDate() - 3).toString().padStart(2, '0');
    const _month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const _year = newDate.getFullYear();
    const normalDate = `${_date}-${_month}-${_year} `;

    var lastDate = new Date(newDate.getTime() - (numDateBefore * 24 * 60 * 60 * 1000));
    const _dateBefore = (lastDate.getDate() - 2).toString().padStart(2, '0');
    const _monthBefore = (lastDate.getMonth() + 1).toString().padStart(2, '0');
    const _yearBefore = lastDate.getFullYear();
    const dateBefore = `${_dateBefore}-${_monthBefore }-${_yearBefore } `;
    console.log(normalDate, dateBefore);
    return [normalDate, dateBefore];

}



async function paging(pageSize, curPage, subPartition) {
    let connection,
        row,
        paging = [];

    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log(typeof subPartition, subPartition);
        const result = await connection.execute(
            `BEGIN
          paging(${pageSize}, ${curPage}, '${subPartition}', :total, :cur);
           END;`, {
                cur: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT,
                },
                total: {
                    type: oracledb.NUMBER,
                    dir: oracledb.BIND_OUT,
                },
            }, {
                outFormat: oracledb.OBJECT,
            },
        );

        // console.log(result);
        const resultSet = result.outBinds.cur;
        while ((row = await resultSet.getRow())) {
            paging.push(row);
        }

        return {
            totalPage: result.outBinds.total,
            data: paging,
        };

        // always close the ResultSet
        await resultSet.close();
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

exports.getAll = async (req, res) => {
    let connection;
    connection = await oracledb.getConnection(dbConfig);

    const querySql = `select sum(confirmed) as confirmed, sum(deathed) as deathed, sum(recovered) as recovered , sum(actived) as actived 
                        from cases where occured_at=to_date('${yesterday}','yyyy-mm-dd') or occured_at=to_date('${dayBeforYesterday}','yyyy-mm-dd')
                        group by occured_at order by CONFIRMED ASC`;

    // console.log(querySql)
    const result = await connection.execute(
        querySql, {}, {
            outFormat: oracledb.OBJECT,
        },
    );

    if (result.rows.length > 0) {
        res.status(200).json(result.rows);
    } else {
        res.status(404).end();
    }
}

exports.getCountries = async function (req, res) {
    let connection;
    connection = await oracledb.getConnection(dbConfig);

    const querySql = `SELECT co.name as country, co.code as iso2, ca.CONFIRMED as cases, ca.DEATHED as deaths, ca.RECOVERED as recovered, ca.ACTIVED as actived
      FROM cases ca
      INNER JOIN countries co
      ON co.code = ca.country_code
      WHERE ca.OCCURED_AT = to_date('${yesterday}','yyyy-mm-dd')`;
    console.log(querySql);
    const result = await connection.execute(
        querySql, {}, {
            outFormat: oracledb.OBJECT,
        },
    );

    if (result.rows.length > 0) {
        res.status(200).json(result.rows);
    } else {
        res.status(404).end();
    }
}

exports.getDataWeek = async function (req, res) {

    const countryCode = req.params.countryCode;

    const [normalDate, dateBefore] = getSevenDate()

    try {
        let connection;
        connection = await oracledb.getConnection(dbConfig);
        const querySql = `WITH confirmed_lag as (SELECT co.name as country, co.code as iso2, ca.CONFIRMED as cases, ca.DEATHED as deaths, ca.RECOVERED as recovered, ltrim(TO_CHAR(ca.OCCURED_AT,'dd-mm'),'0') as time, 
      LAG(ca.CONFIRMED) OVER (ORDER BY OCCURED_AT) as pred_cases, 
      LAG(ca.DEATHED) OVER (ORDER BY OCCURED_AT) as pred_deaths,
      LAG(ca.recovered) OVER (ORDER BY OCCURED_AT) as pred_recovered
      FROM cases ca
      INNER JOIN countries co
      ON co.code = ca.country_code
      WHERE ca.OCCURED_AT < to_date('${normalDate}','DD-MM-YYYY') and ca.OCCURED_AT > to_date('${dateBefore}','DD-MM-YYYY')  and ca.country_code = '${countryCode}') 
      SELECT
          recovered - pred_recovered as new_recovered, cases - pred_cases as new_cases, deaths - pred_deaths as new_deaths , time
       FROM confirmed_lag`;
        // console.log(querySql);
        const result = await connection.execute(
            querySql, {}, {
                outFormat: oracledb.OBJECT,
            },
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.log(error);
    }
}

// CONTINET API

const partion = {
    asia: 0,
    africa: 1,
    atafrictica: 2,
    europe: 3,
    'north-america': 4,
    oceania: 5,
    'south-america': 6,
    hybird: 7,
    unknow: 8,
};

const starSubpartitionNumber = {
    feb: 7,
    mar: 17,
    apr: 27,
    may: 37,
    june: 47,
    july: 57,
};

exports.getContinent = async function (req, res) {
    const continentNumber = req.params.continent;
    const month = req.params.month;
    const numberPerPage = 100;
    const subPartition = `SYS_SUBP8${String(
      partion[continentNumber] + starSubpartitionNumber[month],
    ).padStart(2, '0')}`;
    const pageIndex = req.params.page ;
    const dataPage = await paging(numberPerPage, pageIndex, subPartition);
    res.send(dataPage);
}

exports.exportData = async function () {
    try {
        let connection;
        connection = await oracledb.getConnection(dbConfig);
        const pathExport = `covid.csv`;
        const querySql = `spool '${pathExport}'    `;

        console.log(querySql);
        const result = await connection.executeSQLStatement(querySql);

        console.log(result);
    } catch (error) {
        console.error(error);
    }
    // if (result.rows.length > 0) {
    //     res.status(200).json(result.rows);
    // } else {
    //     res.status(404).end();
    // }
}