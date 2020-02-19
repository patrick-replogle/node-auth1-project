const router = require("express").Router();

const Users = require("./user-model.js");
const authRequired = require("../auth/restricted-middleware.js");

router.get("/users", authRequired, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error while retrieving users. Please try again later"
      });
    });
});

module.exports = router;
