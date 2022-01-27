module.exports = (sequelize, Sequelize) => {
  const Diet = sequelize.define("diets", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Diet;
};
