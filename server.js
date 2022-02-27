const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
const db = require("./app/models");
const { role } = require("./app/models");
const { authJwt } = require("./app/middleware");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Trainer API",
      version: "1.0.0",
    },
  },
  apis: ["./app/routes/*.routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
  .then(function () {
    db.sequelize.sync({ force: true }).then(function () {
      console.info("Dropped & Rebuilt Database schema");
      initial();
    });
  });
function initial() {
  role.create({
    id: 1,
    name: "user",
  });

  role.create({
    id: 2,
    name: "coach",
  });

  role.create({
    id: 3,
    name: "admin",
  });
}

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Trainer API home route." });
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const dietRoute = require("./app/routes/diet.routes");
app.use("/api/diets", dietRoute);

const ingredientRoute = require("./app/routes/ingredient.routes");
app.use("/api/ingredients", ingredientRoute);

const authRoute = require("./app/routes/auth.routes");
app.use("/api/auth", authRoute);

const userRoute = require("./app/routes/user.routes");
app.use("/api/user", authJwt.verifyToken, userRoute);

const coachRoute = require("./app/routes/coach.routes");
app.use("/api/coach", [authJwt.verifyToken, authJwt.isCoach], coachRoute);

const adminRoute = require("./app/routes/admin.routes");
app.use("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], adminRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
