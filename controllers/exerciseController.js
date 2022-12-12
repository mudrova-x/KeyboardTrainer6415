const { Exercise } = require("../models/models")
const errors = require("../error/errors")

class ExerciseController {
  //weddewdw
  // сделать функцию для генерации текста на б // length
  async create(req, res) {
    try {
      const { name, level, length, text, type } = req.body
      console.log(req.body)
      console.log(level)
      let autoText = type === "auto" ? "auto" : text
      const exercise = await Exercise.create({
        name: name,
        level_num: level,
        text: text,
        levelId: level - 1,
      })
      console.log(exercise)
      return res.json(exercise)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async update(req, res) {
    try {
      const { name, level, length, text, type } = req.body
      console.log(req.body)

      if (!name || !level || !text) {
        return res.status(400).json({ message: "Упражнение не найдено" })
      }

      const ex = await Exercise.findOne({
        where: {
          name: name,
        },
      })
      if (!ex) {
        return res.status(400).json({ message: "Упражнение не найдено" })
      }

      Exercise.update(
        { level_num: level, text: text },
        {
          where: {
            name: name,
          },
        }
      )
      return res.json({ message: "Упражнение изменено" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
  async delete(req, res) {
    try{
    const { name } = req.body
    console.log(req.body)
    Exercise.destroy({
      where: {
        name: name,
      },
    })
    return res.json({ message: "Упражнение удалено" })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
  }
  
  async explore(req, res) {
    const { name } = req.body
    const exercise = await Exercise.findAll(/*{
                where: {
                    name: name
                }
            }*/)
    return res.json(exercise)
  }
  async getAll(req, res) {
    try {
      const exercises = await Exercise.findAll()
      console.log(exercises.every((exercise) => exercise instanceof Exercise))
      console.log("All exercises:", JSON.stringify(exercises, null, 2))
      console.log(typeof exercises)
      return res.json(exercises)
    } catch (e) {
      next(errors.badRequest(e.message))
    }
  }

  async getExerciseByLevel(req, res) {
    const { level_num } = req.params
    console.log(level_num)
    // let {level_num} = req.query;
    //const level_num = 1
    const exercise = await Exercise.findAndCountAll({ where: { level_num } })
    //const exercise = await Exercise.findAll();
    // console.log(exercise.rows)
    return res.json(exercise)

    // console.log(req.query)
    // let {level_num} = req.query;
    // //const level_num = 1
    // const exercise = await Exercise.findAndCountAll({where: {level_num}});
    // //const exercise = await Exercise.findAll();
    // return res.json(exercise);
  }
 


}

module.exports = new ExerciseController() // возвращаем объект класса, через который будем обращаться к функциям (выше)
