const reportModel = require('../models/reportModel');
const {readerExcel: readerExcel} = require('./utils');



//读取所有的excel文件

async function readerAllExcelObjs(ctx) {

    const result = await reportModel.findAllReport();

    if (result && result.length > 0) {
        const readerResult = result.map(v => {
            let res = readerExcel(v.path);
            return {
                excelData: res.datas,
                name: v.name,
                id:v.id
            }
        });
        return readerResult
    }
}

module.exports = {
    readerAllExcelObjs
};