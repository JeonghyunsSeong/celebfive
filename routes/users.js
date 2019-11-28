const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config/database");

// Register 사용자등록
router.post("/register", (req, res, next) => {
  let newUser = new User({
    userid: req.body.userid,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });

  User.getUserByUsername(newUser.userid, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({
        success: false,
        msg: "동일한 아이디가 존재합니다. 사용자 등록 실패."
      });
    } else {
      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({ success: false, msg: "사용자 등록 실패" });
        } else {
          res.json({ success: true, msg: "사용자 등록 성공" });
        }
      });
    }
  });
});

// Authenticate 사용자인증, 로그인
router.post("/authenticate", (req, res, next) => {
  const userid = req.body.userid;
  const password = req.body.password;

  User.getUserByUsername(userid, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found! 등록된 사용자가 없습니다..."
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week, 유효기간: 1주일
        });

        res.json({
          success: true,
          token: "JWT " + token,
          userNoPW: {
            // id: user._id,
            userid: user.userid,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password
          }
        });
      } else {
        return res.json({
          success: false,
          msg: "Wrong password. 패스워드가 틀립니다... "
        });
      }
    });
  });
});

// profile 접근은 로그인 상태에서만 토큰을 이용하여 접근하도록 설정
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: {
        userid: req.user.userid,
        username: req.user.username,
        email: req.user.email,
        phone: req.user.phone,
        password: req.user.password
      }
    });
  }
);

router.get("/list", (req, res, next) => {
  User.getAll((err, users) => {
    if (err) throw err;
    res.json(users);
  });
});

module.exports = router;
