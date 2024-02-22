import express from "express";
const router = express.Router();
import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../../models/user.js";

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureMessage: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success_msg", "你已經成功登出!");
    res.redirect("/users/login");
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || !email || !password) {
    errors.push({ message: "所有欄位都是必填" });
  }
  if (password.length < 4 || password.length > 12) {
    errors.push({ message: "密碼需介於4-12位之間" });
  }
  if (!email.includes("@")) {
    errors.push({ message: "Email格式錯誤" });
  }

  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
    });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({
        message: "用戶已存在",
      });
      res.render("register", {
        errors,
        name,
        email,
        password,
      });
    } else {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => {
          req.flash("success_msg", "註冊成功!");
          res.redirect("/users/login");
        })
        .catch((error) => console.log(error));
    }
  });
});

export default router;
