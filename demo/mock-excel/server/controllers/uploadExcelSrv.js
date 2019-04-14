const reportModel = require('../models/reportModel');
const readerExcel = require('.//readerExcel');

//接收上传的excel文件，保存解析返回objects
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const downPath = path.resolve(__dirname, '../../public/files');

async function getExcelObjs(ctx) {
    const file = ctx.request.files.file; // 获取上传文件

    //判断是否有重复上传
    const readerXlsx = await readerExcel.readerAllExcelObjs(ctx);

    if (readerXlsx && readerXlsx.length) {
        const ifRepeat = readerXlsx.filter(v => v.name === file.name);
        if (ifRepeat.length) {
            return {
                status: false,
                msg: '上传文件重复'
            }
        }
    }

    const reader = fs.createReadStream(file.path); // 创建可读流
    const filePath = `${downPath}/${file.name}`;

    const upStream = fs.createWriteStream(filePath); // 创建可写流
    const getRes = await getFile(reader, upStream); //等待数据存储完成

    reportModel.addReport(filePath, file.name);
    const datas = []; //可能存在多个sheet的情况
    if (!getRes) { //没有问题
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames; // 返回 ['sheet1', ...]
        for (const sheetName of sheetNames) {
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            datas.push(data);
        }
        return {
            status: true,
            datas
        };
    } else {
        return {
            status: false,
            msg: '上传文件错误'
        };
    }
}

function getFile(reader, upStream) {
    return new Promise(function (result) {
        let stream = reader.pipe(upStream); // 可读流通过管道写入可写流
        stream.on('finish', function (err) {
            result(err);
        });
    });
}

module.exports = {
    getExcelObjs
};