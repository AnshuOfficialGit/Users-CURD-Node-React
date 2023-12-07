const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    logging: false,
    dialect: "mysql",
  }
);
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*  Define your models */

db.Users = require('../models/Users')(sequelize, DataTypes);





(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();
module.exports = db;