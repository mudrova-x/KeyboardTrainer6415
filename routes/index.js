const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const exerciseRoute = require('./exerciseRoute')
const levelRouter = require('./levelRouter')

router.use('/user',userRouter)
router.use('/level',levelRouter)
router.use('/exercise',exerciseRoute)

module.exports = router