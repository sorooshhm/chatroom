const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRoutes");

router.use("/user", UserRouter);

module.exports = router;
