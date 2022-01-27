const db = require("../models");
const Diet = db.diets;
const Op = db.Sequelize.Op;

// Create and Save a new Diet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Diet
  const diet = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status ? req.body.status : false,
  };

  // Save Diet in the database
  Diet.create(diet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Diet.",
      });
    });
};

// Retrieve all Diets from the database.
exports.findAll = (req, res) => {
  Diet.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Diets.",
      });
    });
};

// Find a single Diet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Diet.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Diet with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Diet with id=" + id,
      });
    });
};

// Update a Diet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Diet.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Diet was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Diet with id=${id}. Maybe Diet was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Diet with id=" + id,
      });
    });
};

// Delete a Diet with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Diet.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Diet was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Diet with id=${id}. Maybe Diet was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Diet with id=" + id,
      });
    });
};

// Delete all Diets from the database.
exports.deleteAll = (req, res) => {
  Diet.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Diets were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Diets.",
      });
    });
};

// Find all active Diets
exports.findAllActive = (req, res) => {
  Diet.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Diets.",
      });
    });
};
