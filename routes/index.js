const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const exerciseRoute = require('./exerciseRoute')
const levelRouter = require('./levelRouter')
const statisticRouter = require('./statisticRoute')

router.use('/user',userRouter)
router.use('/level',levelRouter)
router.use('/exercise',exerciseRoute)
router.use('/statistic',statisticRouter)

module.exports = router