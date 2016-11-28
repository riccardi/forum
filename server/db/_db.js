const path = require('path');
const Sequelize = require('sequelize');
const env = require(path.join(__dirname, '../env'));
const chalk = require('chalk');

const db = new Sequelize(env.DATABASE_URI, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true,   // lets Sequelize know we can use pg-native for ~30% more speed
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true,        // automatically include timestamp columns
  }
});

console.log(chalk.yellow('Opening connection to PostgreSQL'));

module.exports = db;
