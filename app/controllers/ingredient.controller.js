const db = require("../models");
const Ingredient = db.ingredients;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Ingredient
  const ingredient = {
    title: req.body.title,
    description: req.body.description,
    unit: req.body.unit ? req.body.unit : "none",
    calories: req.body.calories ? req.body.calories : 0,
    proteins: req.body.proteins ? req.body.proteins : 0,
    carbs: req.body.carbs ? req.body.carbs : 0,
    fats: req.body.fats ? req.body.fats : 0,
  };

  // Save Ingredient in the database
  Ingredient.create(ingredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ingredient.",
      });
    });
};

// Retrieve all Ingredients from the database.
exports.findAll = (req, res) => {
  Ingredient.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Ingredients.",
      });
    });
};

// Find a single Ingredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ingredient.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Ingredient with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Ingredient with id=" + id,
      });
    });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ingredient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Ingredient with id=" + id,
      });
    });
};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ingredient.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Ingredient with id=${id}. Maybe Ingredient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Ingredient with id=" + id,
      });
    });
};

// Delete all Ingredients from the database.
exports.deleteAll = (req, res) => {
  Ingredient.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Ingredient were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Ingredients.",
      });
    });
};
