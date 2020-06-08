var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const authUtils = require("./utils/authUtils.js");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
    try {
      const users = await authUtils.selectUsernames();

      if (users.find((x) => x.username === req.body.username))
        throw { status: 409, message: "username already exists" };

      // add the new username
      let hash_password = bcrypt.hashSync(
        req.body.password,
        parseInt("13")
      );

      await authUtils.addUser(req.body.username, hash_password, req.body.firstname, req.body.lastname, req.body.country, req.body.email, req.body.urlPic);

      res.status(201).send({ message: "user created", success: true });
    } catch (error) {
      next(error);
    }
  }
);


router.post("/login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await authUtils.selectUsernames();
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    const user = await authUtils.findUser(req.body.username);

    // check that the password is correct

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;
    // req.session.save();
    // res.cookie(session_options.cookieName, user.user_id, cookies_options);

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
