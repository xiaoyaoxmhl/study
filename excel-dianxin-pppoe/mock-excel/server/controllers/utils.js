const xlsx = require('xlsx');
const jwt = require('jsonwebtoken')
const CERT = 'mySecret';

const readerExcel = (filePath) => {
    const datas = [];
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
}

const generateToken = user => {
    // sign 是同步的
    return jwt.sign(user, CERT, {
        expiresIn: 1200 // 单位是秒
    })
}
const validAuth = (ctx, next) => {
    return new Promise((resolve, reject) => {
        const token = ctx.req.headers.authorization;
        if (token) {
            jwt.verify(token, CERT, function (err, decoded) {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        resolve({status: false, msg: '认证码失效，请重新登录!', token: 'loseefficacy'})
                    } else {
                        resolve({status: false, msg: '认证码失效，认证失败!', token: 'error'})
                    }
                } else {
                    resolve({status: true, msg: '认证码成功', token: 'efficacy', data: decoded})
                }
            })
        } else {
            resolve({status: false, msg: '没有token信息', token: 'none'})
        }
    })
}


module.exports = {
    readerExcel,
    generateToken,
    validAuth
}