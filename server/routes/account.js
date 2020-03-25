import express from "express";
import Account from "../models/account";

const router = express.Router();

/*
  회원가입: POST /api/account/signup
  BODY SAMPLE: { "username": "test", "password": "test" }
  ERROR CODES:
    1: BAD USERNAME
    2: BAD PASSWORD
    3: USERNAM EXISTS
*/

router.post("/signup", (req, res) => {
  // USERNAME 정규 표현식으로 체크
  let usernameRegex = /^[a-z0-9]+$/;

  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: "BAD USERNAME",
      code: 1
    });
  }

  // 비밀번호 길이 비교
  if (req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2
    });
  }

  // USER 정보 체크
  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.status(409).json({
        error: "USERNAME EXISTS",
        code: 3
      });
    }

    // 계정 생성
    let account = new Account({
      username: req.body.username,
      password: req.body.password
    });

    account.password = account.generateHash(account.password);

    // DB에 저장
    account.save(err => {
      if (err) throw err;
      return res.json({ success: true });
    });
  });
});

/*
  로그인: POST /api/account/login
  BODY SAMPLE: { "username": "test", "password": "test" }
  ERROR CODES:
    1: LOGIN FAILED
*/

router.post("/login", (req, res) => {
  if (typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }

  // USERNAME 으로 USER 찾기
  Account.findOne({ username: req.body.username }, (err, account) => {
    if (err) throw err;

    // CHECK ACCOUNT EXISTANCY
    if (!account) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if (!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // ALTER SESSION
    let session = req.session;
    session.loginInfo = {
      _id: account._id,
      username: account.username
    };

    // RETURN SUCCESS
    return res.json({
      success: true
    });
  });
});

/*
  현재 USER 정보 가져오기: GET /api/account/getInfo
*/
router.get("/getinfo", (req, res) => {
  if (typeof req.session.loginInfo === "undefined") {
    return res.status(401).json({
      error: 1
    });
  }

  res.json({ info: req.session.loginInfo });
});

/*
  로그아웃: POST /api/account/logout
*/
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({ sucess: true });
});

export default router;
