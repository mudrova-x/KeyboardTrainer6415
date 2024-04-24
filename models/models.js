const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING(16), unique: true,  allowNull: false },
    password: { type: DataTypes.STRING(16), allowNull: false }
})

const Exercise = sequelize.define('exercise', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), unique: true, allowNull: false},
    level_num: { type: DataTypes.INTEGER, allowNull: false},
    text: { type: DataTypes.STRING(200), allowNull: false }
})

const Statistics = sequelize.define('statistics', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    time: { type: DataTypes.DOUBLE, allowNull: false},
    date: { type: DataTypes.DATEONLY, allowNull: false },
    errors: { type: DataTypes.INTEGER, allowNull: false },
    speed: { type: DataTypes.DOUBLE, allowNull: false },
    success: { type: DataTypes.BOOLEAN, allowNull: false }
})

const Level = sequelize.define('level', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    max_errors: { type: DataTypes.INTEGER, allowNull: false },
    max_time: { type: DataTypes.DOUBLE, allowNull: false },
    zones: { type: DataTypes.INTEGER, allowNull: false },
    min_length: { type: DataTypes.INTEGER, allowNull: false },
    max_length: { type: DataTypes.INTEGER, allowNull: false }
})


User.hasMany(Statistics, { onDelete: "cascade" })
Statistics.belongsTo(User)
Exercise.hasMany(Statistics, { onDelete: "cascade" })
Statistics.belongsTo(Exercise)

Level.hasMany(Exercise, { onDelete: "cascade" })

module.exports = {
    User, Level, Statistics, Exercise
}