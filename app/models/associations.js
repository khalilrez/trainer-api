// function associationSetup(sequelize) {
//   const { users, roles, ingredients, diets, meals } = sequelize.models;
//   db.role.belongsToMany(db.user, {
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId",
//   });
//   db.user.belongsToMany(db.role, {
//     through: "user_roles",
//     foreignKey: "userId",
//     otherKey: "roleId",
//   });
//   db.ROLES = ["user", "admin", "coach"];

//   diets.belongsTo(users);
//   meals.belongsToMany(diets, { through: "diet_meals" });
//   ingredients.belongsToMany(meals, { through: "meal_ingredients" });
// }

// module.exports = { associationSetup };
