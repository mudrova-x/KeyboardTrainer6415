const Router = require('express')
const router = new Router()
const exerciseController = require('../controllers/exerciseController')

router.post('/create',exerciseController.create)
router.post('/update',exerciseController.update)
router.delete('/',exerciseController.delete)
router.get('/getAll', exerciseController.getAll)
//router.get('/explore/:num', exerciseController.explore)

router.get('/getExerciseByLevel/:level_num', exerciseController.getExerciseByLevel)

module.exports = router