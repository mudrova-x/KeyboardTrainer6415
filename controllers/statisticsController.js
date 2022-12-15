const { Statistics } = require("../models/models")
const errors = require("../error/errors")

class StatisticsController {
   async getStatisticsByUserId(req, res) {
      const { userId } = req.params
      console.log(userId)

      const statistic = await Statistics.findAll({ where: {userId}})

      return res.json(statistic)
   }

   async getStatisticsByExerciseId(req, res) {
      const { exerciseId } = req.params
      console.log(exerciseId)

      const statistic = await Statistics.findAll({ where: {exerciseId}})

      return res.json(statistic)
   }

   async getAllStatistics(req, res) {
      const statistic = await Statistics.findAll()
      return res.json(statistic)
   }
   
}

module.exports = new StatisticsController()