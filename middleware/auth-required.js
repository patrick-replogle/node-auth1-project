const bcrypt = require("bcryptjs");
const users = require("../users/user-model.js");

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (!(username && password)) {
    res.status(401).json({ message: "You shall not pass!" });
  } else {
    users
      .findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Please try again later",
          error: err
        });
      });
  }
}

module.exports = restricted;
