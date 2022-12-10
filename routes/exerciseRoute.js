const express = require("express");
const router = express.Router()
const exerciseController = require('../controllers/exerciseController')

router.post('/create',exerciseController.create)
router.post('/update',exerciseController.update)
router.delete('/',exerciseController.delete)
router.get('/explore', exerciseController.explore)
router.get('/getAll', exerciseController.getAll)
router.get('/getExerciseByLevel', exerciseController.getExerciseByLevel)

module.exports = router