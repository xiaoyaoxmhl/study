const Router = require('koa-router');
const uploadExcelSrv = require('../service/uploadExcelSrv');

const saveData = async function (ctx, next) {

    const getRes = await uploadExcelSrv.getExcelObjs(ctx);
    if (getRes.status) {
        if(getRes.datas){
            const objs = getRes.datas;
            ctx.body = {
                status: true,
                msg: '上传数据成功',
                data: objs
            };
        }
    } else {
        ctx.body = {code: getRes.msg};
    }
    await next();
};

let router = new Router();

router.post('/file', saveData)
module.exports = router;