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
    },
    showEdit:async (ctx,next)=>{
        // 1: 接收查询字符串参数
        let { id } = ctx.query;
        // 2: 通过id作为条件查询音乐
        let musics = await musicModel.findMusicById(id);
        // 3:判断歌曲是否存在
        if(musics.length === 0) {
            ctx.throw('音乐数据不存在');
            return;
        }
        // 响应页面
        await ctx.render('edit',{
            music:musics[0]
        });
    },
    doUpdateMusic:async (ctx,next) => {
        // koa-formidable 文字数据
        let { id,title,singer,time } = ctx.request.body;
        // 上传的文件对象
        let { file,filelrc } = ctx.request.files;
        // 有可能file没传递，或者filelrc没传递
        if (!file || !filelrc) {
            ctx.throw('没有上传文件');
            return;
        }

        // 文件的还需要处理文件的网络路径
        let lrcPath =  path.parse(filelrc.path).base; //文件名
        // 拼接 /public/files/ +
        lrcPath = '/public/files/' + lrcPath; 
        let filePath =  path.parse(file.path).base; //文件名
        // 拼接 /public/files/ +
        filePath = '/public/files/' + lrcPath; 

        // 更新数据
        let result = await musicModel.updateMusic(title,singer,time,filePath,lrcPath,id);

        if (result.affectedRows === 1) {
            ctx.body = { code:'001',msg:'更新成功'};
        } else {
            ctx.throw(result.message);
        }
        

    },
    doDeleteMusic:async (ctx,next) => {
        // 接收参数  delete请求类似get请求，参数在url上
        let { id } = ctx.query;

        let result = await musicModel.deleteMusicById(id);

        if (result.affectedRows === 1) {
            ctx.body = { code:'001',msg:'删除成功'};
        } else {
            ctx.throw('删除失败');
        }
    }
}