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
        const {level_num} = req.params
        console.log(req.params)
        console.log("Запрос пошел нужный")
        const level = await Level.findOne({
            where:
                {number:level_num}

        });
        console.log("Прошел")
        return res.json(level)
    }

    async update(req, res) {

        const { number, max_errors, max_time, zones,  min_length, max_length } = req.body
        console.log(req.body)
        const l = await Level.findOne({
            where: {
                number: number
            }
        })
        if (!l) {
            return res.status(400).json({ message: "Уровень не найден" })
          }
        const level = await Level.update({max_errors: max_errors, max_time: max_time, zones:zones,  min_length: min_length, max_length:max_length},
            {
                where: {
                    number: number
                }
              })
        return res.json({message: "Уровень сложности был изменен"})
    }

}

module.exports = new LevelController() // возвращаем объект класса, через который будем обращаться к функциям (выше)