const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.json({ msg: "no token is available" });
  }
  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if (err) {
      return res.json({ msg: "token is not valid" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authentication };
