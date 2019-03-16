const express = require("express");
const loginRouter = require("./routers/login");
const usersRouter = require("./routers/users");

// console.log(express);
const app = express();
// 使用express.static中间件去托管静态文件。
// 下面代码 是 将静态文件托管到public目录下。
app.use(express.static('public'))
app.use(express.static('other'))
// 中间件：就是 在请求与相应可以处理一些事情 定义函数来处理，通常把这个函数就叫做中间件
// 在该处可以写日志
app.use(function(req, res, next) {
  console.log(`${Date.now()} ${req.method} ${req.path}`);
  next(); // 将路由的处理交给下一个中间件
});
// 路由：如何定义应用端点 以及 给客户端的响应。
app.get("/", (req, res) => {
  res.send("Home page.");
});

app.use(loginRouter); // 挂载登录路由
app.use(usersRouter); // 挂载用户路由

// 拦截 404
app.use((req, res, next) => {
  let error = new Error('404')
  next(error)
})

// 错误中间件
app.use(function(err, req, res, next) {
  console.error(err.message);
  if(err.message == 404) return res.status(404).send('Page Not Found.');
  res.status(500).send('Something Error.');
});
// 处理所有请求的中间件
// app.use((req, res) => {
//   res.send('Hello, Express.')
// })

// // 中间件栈
// app.get(
//   "/users",
//   (req, res, next) => {
//     // 假设 用户登录成功后，session，给 req对象添加了user属性
//     // 登录的用户
//     if (req.user) return next();
//     // 否则不是登录的用户 就重定向到登录页面
//     res.redirect("/login");
//   },
//   (req, res) => {
//     // res.send()
//     res.sendFile(path.resolve(__dirname, "./views/users.html"));
//   }
// );
// // 要登录的页面
// app.get("/login", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/login.html"));
// });
// // 登录验证
// app.post("/login", (req, res) => {
//   // post data
//   console.log(req.body); // 没有请求体
//   // 其实 真正的原因 是 没有中间件处理用户的请求数据 bodyParse
//   res.json({ code: 200, message: "登录成功" });
// });

// app.get(/a/, (req, res) => {
//   res.send("/a/**");
// });

module.exports = app;

if (!module.parent) {
  app.listen(1234, () => {
    console.log("Server running");
  });
}
