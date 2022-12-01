console.log('app')

const express = require("express")
const config = require("config") // константы проекта
const sequelize = require('./db')
const app = express()
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./error/errors')

app.use(cors())
app.use(express.json())
app.use('/api', router)

const PORT = config.get('port') || 5000

// Обработка ошибок, не двигать!
//app.use(errorHandler)

async function start() {
    try {
        await sequelize.authenticate()//функция для подключения к БД
        await sequelize.sync()//сверяет состояние БД со схемой
        app.listen(PORT, () => console.log(`has been started...on ${PORT}`))
        
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()




/*
Что уже было:
npm install install -D nodemon concurrently
    install config
    react app
 */