module.exports = async (ctx, next) => {
  if (ctx.session.userInfo || 
      ctx.url == "/signin" || 
      ctx.url == "/signup") {
    // 登录后的用户
    await next();
    return;
  }
  // 未登录
  ctx.redirect("/signin");
};
