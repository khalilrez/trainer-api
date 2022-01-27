module.exports = (sequelize, Sequelize) => {
  const Meal = sequelize.define("meals", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Meal;
};
