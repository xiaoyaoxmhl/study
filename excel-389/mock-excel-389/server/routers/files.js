const Router = require('koa-router');
const excelController = require('../controllers/excelController');
const readerExcel = require('../controllers/readerExcel');


let router = new Router();
router.get('/file', function (ctx, next) {
    ctx.body = {msg: 'test'}
});

router.post('/file', async function (ctx, next) {

    const getRes = await excelController.getExcelObjs(ctx);
    if (getRes.status) {
        if (getRes.datas) {
            const objs = getRes.datas;
            ctx.body = {
                status: true,
                msg: '上传数据成功',
                data: objs
            };
        }
    } else {
        ctx.body = {msg: getRes.msg, status: getRes.status};
    }
    await next();
});√
router.post('/fileList', async function (ctx, next) {

    let {keyword} = ctx.request.body;

    const readerXlsx = await readerExcel.readerAllExcelObjs(ctx);
    ctx.body = {
        status: true,
        data: readerXlsx,
        validStatus: ctx.validStatus
    };
})

router.post('/deleteReport', async function (ctx, next) {

    let res = await  excelController.deleteReportByid(ctx);

    ctx.body = {
        status: res.status,
        msg:res.msg,
    };
})


module.exports = router;