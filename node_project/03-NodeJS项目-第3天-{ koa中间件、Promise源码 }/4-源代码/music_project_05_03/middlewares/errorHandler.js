module.exports = async function(ctx,next){
   try {
     // 让后续先执行，如果出现异常，我来catch
        await next();
   }catch (err) {
        console.log(err); // 给后台看
        // 给前台看
        ctx.body = `
            <div>
                对不起您访问的数据出现了异常，程序猿马上飞来拯救世界
            </div>
        `
   }
}