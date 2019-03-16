// const { Router } = require("express"); // es6 解构赋值
const express = require("express");
const Router = express.Router;
const path = require("path");

const router = Router();
// router.get(
//   "/users",
//   (req, res, next) => {
//     // 假设 用户登录成功后，session，给 req对象添加了user属性
//     // 登录的用户
//     req.user = { username: "jerry" };
//     if (req.user) return next();
//     // 否则不是登录的用户 就重定向到登录页面
//     res.redirect("/login");
//   },
//   (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../views/users.html"));
//   }
// );
router.get(
  "/users",
  (req, res, next) => {
    // 假设 用户登录成功后，session，给 req对象添加了user属性
    // 登录的用户
    req.user = { username: "jerry" };
    if (req.user) return next();
    // 否则不是登录的用户 就重定向到登录页面
    res.redirect("/login");
  },
  (req, res, next) => {
    try {
      res.sendFile(path.resolve(__dirname, "./views/users.html"));
    } catch (err) {
      next(new Error("500"));
    }
  }
);
// router.get("/users", (req, res) => {
//   if (req.user) {
//     res.sendFile(path.resolve(__dirname, "../views/users.html"));
//   } else {
//     res.redirect("/login");
//   }
// }); // 路由 中间件 就具有 多个功能了（2个）
module.exports = router;
