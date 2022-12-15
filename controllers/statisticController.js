const { User, Statistics, Exercise} = require('../models/models')
const errors = require('../error/errors')
const config = require("config")

class StatisticController{
    async getStatisticByUser(req,res,next){
        try{

            const id = req.params.id;
            console.log(id)
            const statistic = await Statistics.findAll({where:{userId: id}})
            return res.json(statistic)
        }
        catch (e){
            next(e.message)
        }
    }
}

module.exports = new StatisticController()