const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ api: "Hello World!" });
});

module.exports = router;
