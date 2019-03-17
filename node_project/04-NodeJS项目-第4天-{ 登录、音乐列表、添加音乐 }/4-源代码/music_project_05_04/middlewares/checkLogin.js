module.exports = function(routeList) {
    function _checkLogin (ctx) {
        return ctx.session.user;  // true: 有用户
    }
    // 给use函数使用的函数
    return async function (ctx,next) {
        let isNext = true;
        // 遍历routeList
        routeList.forEach( async route => {
            // 如果是正则
            if (route instanceof RegExp) {
                if(route.test(ctx.url)) {   
                    //验证是否登录
                  isNext = _checkLogin(ctx)
                }
            }
            // 如果是字符串
            if(route === ctx.url) {
                // 验证是否登录
               isNext = _checkLogin(ctx)
            }
        });
        if(isNext) {
            console.log('放行了');
             await next();// 都不满足  不放行的条件
        } else {
            console.log('不放行');
            await ctx.render('error',{
                msg:'您为未登录'
            });
            return;
            
        }
       

    }
}