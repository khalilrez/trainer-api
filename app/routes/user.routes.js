const users = require("../controllers/user.controller.js");

var router = require("express").Router();

// Create a new User
router.post("/", users.create);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single Diet with id
router.get("/:id", users.findOne);

// Update a Diet with id
router.put("/:id", users.update);

// Delete a Diet with id
router.delete("/:id", users.delete);

// Delete all users
router.delete("/", users.deleteAll);

module.exports = router;
