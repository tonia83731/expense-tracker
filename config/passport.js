import passport from "passport";
import local from "passport-local";
const LocalStrategy = local.Strategy;
import bcrypt from 'bcryptjs'
import User from "../models/user.js";

export default (app) => {
  // 初始化Passport模組
  app.use(passport.initialize());
  app.use(passport.session());
  // 設定本地登入策略
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, req.flash("error_msg", "此用戶尚未註冊"));
            }
            return bcrypt.compare(password, user.password).then(isMatch => {
              if(!isMatch){
                return done(
                  null,
                  false,
                  req.flash("error_msg", "帳號或密碼錯誤")
                );
              }
              return done(null, user);
            })
          })
          .catch((error) => done(error, false));
      }
    )
  );
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((error) => done(error, null));
  });
};
