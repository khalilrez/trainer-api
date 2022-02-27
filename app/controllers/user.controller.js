const { send } = require("express/lib/response");
const db = require("../models");
const Profile = db.profile;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.coachBoard = (req, res) => {
  res.status(200).send("Coach Content.");
};

exports.getProfile = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "No User Specified in request",
    });
  }

  //get Profile
  Profile.findOne({ where: { userId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving your profile.",
      });
    });
};

exports.updateProfile = (req, res) => {
  const id = req.params.id;

  Profile.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or Request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id,
      });
    });
};
