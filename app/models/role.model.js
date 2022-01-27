module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "roles",
    {
      label: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Role;
};
