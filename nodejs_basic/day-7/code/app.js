const Koa = require("koa");
const session = require("koa-session");
const koaBody = require("koa-body");

const indexRouter = require("./routes");
const userRouter = require("./routes/users");

const app = new Koa();

// 配置session

app.keys = ["Koa", "learn"];

const CONFIG = {
  key: "koa-sess",
  maxAge: 20 * 1000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true
};
// 配置后，app会具有session属性 就可以获取用户的信息了
app.use(session(CONFIG, app));

// koa-body
app.use(koaBody());

app.use((ctx, next) => {
  // ctx.body = "Hello, Koa!"; // 给客户端响应
  console.log(`${Date.now()} ${ctx.method} ${ctx.path}`);
  next(); // 开始递归
}); 

app.use(indexRouter.routes());
app.use(userRouter.routes());

app.use(indexRouter.allowedMethods());
app.use(userRouter.allowedMethods());

// app.use(ctx => {
//   // ctx.body = 'Hello, Koa!';
//   ctx.body = { name: "jerry" };
// });

app.listen(3000, () => {
  console.log("Server is running.");
});
