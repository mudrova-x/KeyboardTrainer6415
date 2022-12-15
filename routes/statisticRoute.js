const Router = require('express')
const router = new Router()
const statisticController = require('../controllers/statisticController')

router.get('/getStatistic/user/:id', statisticController.getStatisticByUser);

module.exports = router