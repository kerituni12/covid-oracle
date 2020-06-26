const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dbConfig = require('../configs/dbconfig.js');

// vidu : 0 -> asia
const partion = {
    asia : 0,
    africa: 1,
    atafrictica :2,
    euro:3,
    nor_america:4,
    oceania:5,
    sou_america:6,
    hybird:7,
    unknow:8
};

const starSubpartitionNumber = {
   'feb' : 7, 'mar':17, 'apr':27, 'may':37, 'june':47, 'july':57
}

router.get('/', function (req, res) {
    res.send('ok');
})

router.get('/:continent/:month/:page', async function (req, res) {
    const continentNumber = req.params.continent;
    const month = req.params.month;
    const numberPerPage = 100;
    const subPartition = `SYS_SUBP8${String(partion[continentNumber] + starSubpartitionNumber[month]).padStart(2,"0")}`;
    const pageIndex = req.params.page - 1;
    const dataPage = await paging(numberPerPage, pageIndex, subPartition);
    res.send(dataPage);
});

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
module.exports = router;