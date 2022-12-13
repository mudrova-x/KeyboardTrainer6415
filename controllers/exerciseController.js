const { Exercise } = require('../models/models')
const errors = require('../error/errors')

class ExerciseController {

    //weddewdw
        // сделать функцию для генерации текста на б // length 
        async create(req, res) {
    
            const { name, level, length, text, type } = req.body
            console.log(req.body)
            console.log(level)
            let autoText = (type === 'auto') ? "auto" : text
            const exercise = await Exercise.create({
                name: name,
                level_num: level,
                text: autoText,
                levelId:level+1
            })
            return res.json(exercise)
            
        }
    
        async update(req, res) {
            const { name, level, length, text, type } = req.body
            console.log(req.body)
            const exercise = await Exercise.update({level_num: level, text:text},
                {
                    where: {
                        name: name
                    }
                  })
            return res.json({message: "exercise has been changed"})
        }
    
        async delete(req, res) {
            const { name } = req.body
            console.log(req.body)
            Exercise.destroy({
                where: {
                    name: name
                }
              });
            return res.json({message: "exercise has been deleted"})
        }
        async explore(req, res) {
            const {name} = req.body
            const exercise = await Exercise.findAll(/*{
                where: {
                    name: name
                }
            }*/);
            return res.json(exercise)
        }
        async getAll(req, res) {
            const exercises = await Exercise.findAll();
            //console.log(exercises.every(exercise => exercise instanceof Exercise)); 
            //console.log("All exercises:", JSON.stringify(exercises, null, 2));
            console.log(typeof(exercises))
            return res.json(exercises)
        }
    
    async getExerciseByLevel(req, res) {
        const {level_num} = req.params
        console.log(level_num)
       // let {level_num} = req.query;
        //const level_num = 1
        const exercise = await Exercise.findAndCountAll({where: {level_num}});
        //const exercise = await Exercise.findAll();
       // console.log(exercise.rows)
        return res.json(exercise);

            // console.log(req.query)
            // let {level_num} = req.query;
            // //const level_num = 1
            // const exercise = await Exercise.findAndCountAll({where: {level_num}});
            // //const exercise = await Exercise.findAll();
            // return res.json(exercise);
        }

    async getOneExercise(req, res) {
        const {id} = req.params
        console.log(id)
        // let {level_num} = req.query;
        //const level_num = 1
        const exercise = await Exercise.findOne({where: {id}});
        //const exercise = await Exercise.findAll();
        // console.log(exercise.rows)
        return res.json(exercise);

        // console.log(req.query)
        // let {level_num} = req.query;
        // //const level_num = 1
        // const exercise = await Exercise.findAndCountAll({where: {level_num}});
        // //const exercise = await Exercise.findAll();
        // return res.json(exercise);
    }
    }



    module.exports = new ExerciseController() // возвращаем объект класса, через который будем обращаться к функциям (выше)