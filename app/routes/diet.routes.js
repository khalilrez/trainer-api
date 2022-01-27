const diets = require("../controllers/diet.controller.js");

var router = require("express").Router();

// Create a new Diet
router.post("/", diets.create);

// Retrieve all diets
router.get("/", diets.findAll);

// Retrieve all active diets
router.get("/active", diets.findAllActive);

// Retrieve a single Diet with id
router.get("/:id", diets.findOne);

// Update a Diet with id
router.put("/:id", diets.update);

// Delete a Diet with id
router.delete("/:id", diets.delete);

// Delete all diets
router.delete("/del", diets.deleteAll);

module.exports = router;
