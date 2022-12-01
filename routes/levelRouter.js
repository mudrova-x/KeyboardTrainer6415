const Router = require('express')
const router = new Router()
const levelController = require('../controllers/levelController')

router.post('/update',levelController.update)
router.get('/explore',levelController.explore)
router.get('/zones', levelController.zones)
//router.get('/', levelController.getAll)

module.exports = router