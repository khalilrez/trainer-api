const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
  .then(function () {
    db.sequelize.sync({ force: true }).then(function () {
      console.info("Dropped & Rebuilt Database schema");
    });
  });

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
app.use("/diets", dietRoute);

const ingredientRoute = require("./app/routes/ingredient.routes");
app.use("/ingredients", ingredientRoute);

const userRoute = require("./app/routes/user.routes");
app.use("/users", userRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
