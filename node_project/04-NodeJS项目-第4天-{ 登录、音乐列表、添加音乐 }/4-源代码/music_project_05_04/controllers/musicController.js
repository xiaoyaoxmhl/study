const musicModel = require('../models/musicModel');
const path = require('path');
module.exports = {
    showIndex:async (ctx,next) => {
        console.log('进入首页了');
        // 2: 需要用户的id => 从session中获取
        let { id } = ctx.session.user;
        // 3: 通过用户id查询数据库获取相关的音乐数据
        let musics = await musicModel.findMusicsByUid(id);
        // 4: 渲染到页面
        ctx.render('index',{ musics });
    },
    addMusic: async (ctx,next) => {
        // 接收上传音乐的数据（formidable）
        let { title,singer,time } = ctx.request.body; // 文字信息
        let { file,filelrc } = ctx.request.files;
        let filePath,lrcPath;
        // 解析网络路径
        if(file) {
           filePath =  path.parse(file.path).base; //文件名
           // 拼接 /public/files/ +
           filePath = '/public/files/' + filePath; 
        }
        if(filelrc) {
           lrcPath =  path.parse(filelrc.path).base; //文件名
           // 拼接 /public/files/ +
           lrcPath = '/public/files/' + lrcPath; 
        }

        // 获取用户id
        let uid = ctx.session.user.id;
        // 合并对象 
        // Object.assign(ctx.request.body,{ filePath,filelrc,uid })
        
        // 插入数据到数据库
        musicModel.addMusicByFields(title,singer,time,filePath,lrcPath,uid);

        console.log(file);
        // console.log(ctx.request.body);//{ title: '告白气球', singer: '预习', time: '03:00' }
        ctx.body = { code:'ok' };
    }
}