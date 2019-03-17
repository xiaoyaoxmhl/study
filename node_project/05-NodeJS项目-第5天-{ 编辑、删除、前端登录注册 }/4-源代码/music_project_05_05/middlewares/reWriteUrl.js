module.exports = function (rules) {
    // { src:'/c',dist:'/d' },
    // { regex:/\/public\/(.*)/ ,dist:'/xxx' }

    return async (ctx,next)=>{
        // 判断请求是否以 /public开头，如果是，去除/public
        rules.forEach( rule => {
            // 判断是否有正则的处理
            if(rule.regex) { // result[0]是原字符串,1是分组内容
                let result = rule.regex.exec(ctx.url);
                if(result) {
                    // 判断是否有dist属性，如果有，就整个赋值
                    if (rule.dist) {
                        ctx.url = rule.dist;
                    } else {
                        // 反之就取其中分组的部分
                        ctx.url = result[1];
                    }
                    
                }
            }

            // 处理src => dist
            if(ctx.url === rule.src) {
                ctx.url = rule.dist;
            }
        });
        // 判断用户是否以/ 请求
       // 经过一堆的规则匹配以后，最终放行，实在不行，就完全没有改变url
       await next();
    }
}