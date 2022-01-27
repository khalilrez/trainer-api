function associationSetup(sequelize) {
  const { users, roles, ingredients, diets, meals } = sequelize.models;
  users.belongsTo(roles);
  users.hasMany(diets, { foreignKey: "userId" });
  diets.belongsTo(users);
  meals.belongsToMany(diets, { through: "diet_meals" });
  ingredients.belongsToMany(meals, { through: "meal_ingredients" });
}

module.exports = { associationSetup };
