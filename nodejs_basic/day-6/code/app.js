const express = require("express");
const loginRouter = require("./routers/login");
const usersRouter = require("./routers/users");
const checkLogin = require("./middlewares/checkLogin");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json()); // 处理json数据
app.use(bodyParser.urlencoded({extended: false})); // 处理表单数据
// 挂载cookie session
app.use(
  cookieSession({
    name: "NODESESS",
    maxAge: 20 * 1000,
    keys: ["node", "express"],
    httpOnly: false
  })
);

// 拦截所有的请求, 如果是登录的状态 就给请求对象添加user属性
app.use((req, res, next) => {
  if (req.session.username) {
    req.user = { username: req.session.username };
  }
  next();
});

app.use(function(req, res, next) {
  console.log(`${Date.now()} ${req.method} ${req.path}`);
  next();
});
// 挂载校验登录状态中间件
app.use(checkLogin(["login", "register"]));
app.get("/", (req, res) => {
  res.send("Home page.");
});

app.use(loginRouter);
app.use(usersRouter);

app.use((req, res, next) => {
  let error = new Error("404");
  next(error);
});

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (err.message == 404) return res.status(404).send("Page Not Found.");
  res.status(500).send("Something Error.");
});

if (!module.parent) {
  app.listen(1234, () => {
    console.log("Server running");
  });
}

module.exports = app;
