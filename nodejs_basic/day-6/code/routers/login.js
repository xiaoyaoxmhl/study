const { Router } = require("express");
const path = require("path");

const router = Router();

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../views/login.html"));
});

// const name = 'jhad'
// const obj = {name}
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (username == "jerry" && password == "123") {
    req.session = { username };
    res.json({ code: 200, message: "登录成功" });
  } else {
    res.json({ code: 300, message: "用户名或密码错误" });
  }
});

router.get("/register", (req, res) => {
  res.send("Register Page");
});

router.post("/register", (req, res) => {
  res.json({ code: 200, message: "注册成功" });
});

module.exports = router;
