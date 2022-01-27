module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredients", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    unit: {
      type: Sequelize.STRING,
    },
    calories: {
      type: Sequelize.DOUBLE,
    },
    proteins: {
      type: Sequelize.DOUBLE,
    },
    carbs: {
      type: Sequelize.DOUBLE,
    },
    fats: {
      type: Sequelize.DOUBLE,
    },
  });

  return Ingredient;
};
