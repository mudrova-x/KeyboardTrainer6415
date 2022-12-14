const { Statistics } = require("../models/models")
const errors = require("../error/errors")

class StatisticsController {
   async getStatisticsByUserId(req, res) {
      const { userId } = req.params
      console.log(userId)

      const statistic = await Statistics.findAll({ where: {userId}})

      return res.json(statistic)
   }
   
}

module.exports = new StatisticsController()