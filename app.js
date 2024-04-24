console.log('app')

const express = require("express")
const config = require("config") // константы проекта
const sequelize = require('./db')
const cors = require('cors')

const app = express()

const router = require('./routes/index')
app.use(cors());
// app.use(express.json())
app.use(express.json(
   // { extended: true }
))
app.use('/api', router)
//app.use('/api/auth',require('./routes/auth.routes'))
const PORT = config.get('port') || 5000

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
