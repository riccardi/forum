'use strict';
const app = require('./app');
const chalk = require('chalk');
const db = require('./db/');

let startDb = db.sync();

startDb.then(function () {
  console.log(chalk.cyan('Sequelize models synced to PostgreSQL'));
});

let server = require('http').createServer();

let createApplication = function () {
    server.on('request', app);
};

let startServer = function () {

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
