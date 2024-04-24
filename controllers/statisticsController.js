const { Statistics } = require("../models/models")
const errors = require("../error/errors")

class StatisticsController {
   async getStatisticsByUserId(req, res) {
      console.log(req.params)
      const { userId } = req.params
      console.log("========"+userId)

      const statistic = await Statistics.findAll({ where: {userId}})
      console.log(statistic)
      return res.json(statistic)
   }

   async getStatisticsByExerciseId(req, res) {
      const { exerciseId } = req.params
      console.log("exerciseId === "+exerciseId)

      const statistic = await Statistics.findAll({ where: {exerciseId}})
      console.log(statistic)
      return res.json(statistic)
   }

   async getAllStatistics(req, res) {
      const statistic = await Statistics.findAll()
      console.log(statistic)
      return res.json(statistic)
   }
   
}

module.exports = new StatisticsController()