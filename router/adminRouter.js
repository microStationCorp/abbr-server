const router = require("express").Router();
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//for login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.json({ msg: "user does not exists" });
      }
      if (user.password == password) {
        jwt.sign(
          {
            id: user._id,
          },
          process.env.jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                username: user.username,
              },
            });
          }
        );
      } else {
        res.json({ msg: "password is incorect" });
      }
    })
    .catch((err) => res.json(err));
});

//for register
// router.post("/register", (req, res) => {
//   const { username, password } = req.body;
//   const admin = new Admin({ username, password });
//   admin
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json(err));
// });

module.exports = router;
