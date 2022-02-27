var router = require("express").Router();

const { authJwt } = require("../middleware");
const ingredients = require("../controllers/ingredient.controller");

// Create a new Diet
router.post("/", ingredients.create);

// Retrieve all diets
router.get("/", ingredients.findAll);

module.exports = router;
