const Router = require("koa-router");
const check = require("../middlewares/checkLogin");

const router = new Router();

router.use(check);

router.get("/", ctx => {
  ctx.body = "Index Page!";
});

router.get("/about", ctx => {
  ctx.body = "About Page!";
});

// 登录
router
  .get("/signin", ctx => {
    ctx.type = "text/html";
    ctx.body = `
      <div>
      <form action="/signin" method="POST">
      <p>
        用户名：<input type="text" name="username" id="username" />
      </p>
      <p>
        密码：<input type="password" name="password" id="passwaord" />
      </p>
      <button>提交</button>
    </form>
      </div>
    `;
  })
  .post("/signin", ctx => {
    let { username, password } = ctx.request.body;
    if (username == "jerry" && password == "123") {
      ctx.session.userInfo = { username };
      ctx.redirect("/users");
    } else {
      ctx.redirect("/signin");
    }
  });
// 注册
router
  .get("/signup", ctx => {
    ctx.body = "Register Page!";
  })
  .post("/signup", ctx => {
    ctx.body = { code: 200, msg: "success" };
  });

module.exports = router;
