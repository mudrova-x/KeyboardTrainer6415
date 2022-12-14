const Router = require('express')
const router = new Router()
const statisticsController = require('../controllers/statisticsController')

router.get('/getStatisticsByUserId/:userId', statisticsController.getStatisticsByUserId)
router.get('/getStatisticsByExerciseId/:exerciseId', statisticsController.getStatisticsByExerciseId)

module.exports = router