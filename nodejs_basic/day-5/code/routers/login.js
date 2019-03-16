const { Router } = require("express");
const path = require("path");

const router = Router();

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/login.html"));
});

router.post("/login", (req, res) => {
  res.json({ code: 200, message: "登录成功" });
});

router.get("/register", (req, res) => {
  res.send("Register Page");
});

router.post("/register", (req, res) => {
  res.json({ code: 200, message: "注册成功" });
});

module.exports = router