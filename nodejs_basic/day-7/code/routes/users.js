const Router = require("koa-router");

const router = new Router();

const check = require("../middlewares/checkLogin");

router.use(check);

router.get("/users", ctx => {
  ctx.body = "Users Page";
});

module.exports = router;
