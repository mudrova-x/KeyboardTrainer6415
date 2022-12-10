const { Level } = require('../models/models')

class LevelController {

    async zones(req, res) {
        const { number } = req.body
        console.log(req.body)
        const level = await Level.findOne({
            where: {
                number: number
            }
        })
        console.log(level.zones)
        return res.json(level.zones??"none")
    }

    async explore(req, res) {
        const { number } = req.query
        console.log(req.query)
        console.log("Запрос пошел нужный")
        const level = await Level.findOne({
            where:
                {number}

        });
        console.log("Прошел")
        return res.json(level)
    }

    async update(req, res) {

        const { number, max_errors, max_time, zones,  min_length, max_length } = req.body
        console.log(req.body)
        const level = await Level.update({max_errors: max_errors, max_time: max_time, zones:zones,  min_length: min_length, max_length:max_length},
            {
                where: {
                    number: number
                }
              })
        return res.json({message: "Level has been changed"})
    }

}

module.exports = new LevelController() // возвращаем объект класса, через который будем обращаться к функциям (выше)