const userController = require("../controllers/user.controller");
var router = require("express").Router();

router.get("/", userController.adminBoard);

module.exports = router;
