const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const { role } = require("./app/models");

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

const dietRoute = require("./app/routes/diet.routes");
app.use("api/diets", dietRoute);

const ingredientRoute = require("./app/routes/ingredient.routes");
app.use("api/ingredients", ingredientRoute);

const authRoute = require("./app/routes/auth.routes");
app.use("/api/auth", authRoute);

const userRoute = require("./app/routes/user.routes");
app.use("/api/user", userRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
