const knex = require('knex');

const env = process.env.DB_ENV || 'development';
const knex = require('../knexfile.js')

const db = knex(config[env])

module.exports = db