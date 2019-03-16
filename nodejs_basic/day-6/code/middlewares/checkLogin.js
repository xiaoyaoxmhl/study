module.exports = (uncheck=[]) => {
  return function(req, res, next) {
    console.log(req.user);
    // 登录成功, 交给对应路由去处理该请求
    // 或者 是登录（注册）页面 那么就不需要登录状态的校验了。
    if(uncheck.indexOf(req.url.slice(1)) != -1 || req.user) return next();
    // 没有登录，就跳转到登录页面
    // req.url = "/login"; 
    res.redirect('/login')
    next();
  };
};
