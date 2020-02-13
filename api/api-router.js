const router = require("express").Router();

const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");

router.use("/", authRouter);
router.use("/restricted", userRouter);

router.get("/", (req, res) => {
  res.json({ api: "Hello World!" });
});

module.exports = router;
