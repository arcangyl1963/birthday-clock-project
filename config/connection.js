

require('dotenv').config();

const Sequelize = require('sequelize');

// ternary operator below uses JAWSDB databse if it exists, otherwise uses local database.  Will be needed after cloud database is deployed.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {

      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    });

module.exports = sequelize;


