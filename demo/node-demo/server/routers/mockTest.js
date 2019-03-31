var express = require('express');
const pageData = require('../data')
module.exports = function (app) {

    app.post('/person/pagelist', function (req, res) {
        const {pageSize, pageNumber, keyWord} = req.body;
        if (pageSize === undefined || pageNumber === undefined || keyWord === undefined) {
            return res.status(400).json({error: '分页参数不能为空！'})
        }

        let newPageData = [...pageData];
        //判断是否有关键字
        if (keyWord.trim() !== "") {
            newPageData = pageData.filter(val => {
                let ifInclude = false;
                Object.values(val).map(val => {
                    if (val.indexOf(keyWord) > -1) {
                        ifInclude = true;
                    }
                });
                return ifInclude;
            });
        }

        //设置返回数量
        const num = parseInt(pageNumber);
        const size = parseInt(pageSize);
        let start;
        if (num === 1) {
            start = 0
        } else {
            start = (num - 1) * size
        }
        let resData = newPageData.slice(start, start + size);


        const len = newPageData.length;
        const result = {
            "api": "http://111.111.111.111:9207/task/page-task-list",
            "v": "v1.0",
            "retType": "0",
            "data": {
                "data": resData, "pageNumber": pageNumber, "pageSize": pageSize, "total": len
            },
            "msg": "操作成功！"
        }

        setTimeout(() => {
            res.json(result);
        }, 1000)
    })
}