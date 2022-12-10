console.log('app')

// const express = require("express")
// const config = require("config") // константы проекта

// const app = express()

// app.use(express.json({extended: true}))

// app.use('/api/auth',require('./routes/auth.routes'))

// const PORT = config.get('port') || 5000

// async function start() {
//     try {
//         app.listen(PORT,()=>console.log(`has been started...on ${PORT}`))
//     } catch (e) {
//         console.log('Server error', e.message)
//         process.exit(1)
//     }
// }

// start()
const express = require("express")
const config = require("config") // константы проекта
const sequelize = require('./db')
const index = express()
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./error/errors')


const fileUpload = require('express-fileupload')


index.use(cors())
index.use(express.json({extended: true}))
//index.use(express.json())
index.use('/api', router)
index.use(fileUpload({}))
//index.use(errorHandler)


const PORT = config.get('port') || 5000

// Обработка ошибок, не двигать!
//app.use(errorHandler)

async function start() {
    try {
        await sequelize.authenticate()//функция для подключения к БД
        await sequelize.sync()//сверяет состояние БД со схемой
        index.listen(PORT, () => console.log(`has been started...on ${PORT}`))
        
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