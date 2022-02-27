const diets = require("../controllers/diet.controller.js");

const { authJwt } = require("../middleware");
var router = require("express").Router();

// Create a new Diet
router.post("/", [authJwt.verifyToken, authJwt.isCoach], diets.create);

// Retrieve all diets
router.get("/", diets.findAll);

// Retrieve all active diets
router.get("/active", diets.findAllActive);

// Retrieve a single Diet with id
router.get("/:id", diets.findOne);

// Update a Diet with id
router.put("/:id", [authJwt.verifyToken, authJwt.isCoach], diets.update);

// Delete a Diet with id
router.delete("/:id", [authJwt.verifyToken, authJwt.isCoach], diets.delete);

// Delete all diets
router.delete("/del", [authJwt.verifyToken, authJwt.isCoach], diets.deleteAll);

module.exports = router;
