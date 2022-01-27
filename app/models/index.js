const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { associationSetup } = require("./associations.js");

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
db.users = require("./user.model")(sequelize, Sequelize);
db.roles = require("./role.model")(sequelize, Sequelize);
db.meals = require("./meal.model")(sequelize, Sequelize);

associationSetup(sequelize);

module.exports = db;
