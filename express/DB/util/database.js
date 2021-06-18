const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'qweASD!@#4', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;