const { Sequelize } = require('sequelize')
const config = require("config") // константы проекта

const DB_PORT = config.get('DB_PORT')
const DB_HOST = config.get('DB_HOST')
const DB_PASSWORD = config.get('DB_PASSWORD')
const DB_USER = config.get('DB_USER')
const DB_NAME = config.get('DB_NAME')

module.exports = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT
    }
)