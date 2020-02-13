const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

router.post("/register", (req, res) => {
  let user = req.body;

  if (!(req.body.username || req.body.password)) {
    res.status(401).json({ message: "Please include username and password" });
  }
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error registering user. Please try again later." });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          id: user.id,
          username: user.username
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error while logging in. Please try back later" });
    });
});

module.exports = router;
