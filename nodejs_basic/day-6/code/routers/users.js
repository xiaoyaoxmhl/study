const express = require("express");
const Router = express.Router;
const path = require("path");

const router = Router();

router.get("/users", (req, res, next) => {
  try {
    res.sendFile(path.resolve(__dirname, "../views/users.html"));
  } catch (err) {
    next(new Error("500"));
  }
});
module.exports = router;
