const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
var router = require("express").Router();

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);
router.post("/signin", controller.signin);

router.post("/refreshtoken", controller.refreshToken);

module.exports = router;
