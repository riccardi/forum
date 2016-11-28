'use strict';
const app = require('./app');
const chalk = require('chalk');
const db = require('./db/');

// Requires in ./db/index.js -- which returns a promise that represents
// sequelize syncing its models to the postgreSQL database.
// let startDb = require('./db');


// Syncing all the models at once. This promise is used by main.js.
let startDb = db.sync();

startDb.then(function () {
  console.log(chalk.cyan('Sequelize models synced to PostgreSQL'));
});


// Create a node server instance
let server = require('http').createServer();

let createApplication = function () {
    server.on('request', app); // Attach the Express application.
};

let startServer = function () {

    //what is this doing?
    //process.env.PORT
    let PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.exit(1);
});
