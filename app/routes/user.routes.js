const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/all", userController.allAccess);
  app.get("/user", [authJwt.verifyToken], userController.userBoard);
  app.get(
    "/coach",
    [authJwt.verifyToken, authJwt.isCoach],
    userController.coachBoard
  );
  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};
