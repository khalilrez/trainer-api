const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.diets = require("./diet.model.js")(sequelize, Sequelize);
db.ingredients = require("./ingredient.model")(sequelize, Sequelize);
db.meals = require("./meal.model")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model")(sequelize, Sequelize);

// ROLE RELATION
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.ROLES = ["user", "admin", "coach"];

// Refresh Token Relation
db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

//Profile Relation
db.user.hasOne(db.profile, {
  foreignKey: "userId",
  targetKey: "id",
});
db.profile.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

// MEAL DIET INGREDIENT RELATION
db.diets.belongsTo(db.user);

db.meals.belongsToMany(db.diets, { through: "diet_meals" });

db.ingredients.belongsToMany(db.meals, { through: "meal_ingredients" });

module.exports = db;
