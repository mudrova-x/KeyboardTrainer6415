const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/login', userController.login) // скобок нет, тк передаем объект-функцию
router.post('/registration', userController.registration)
router.post('/update',userController.update)
router.get('/auth', userController.checkAuth)
router.delete('/', userController.delete)
router.get('/explore', userController.explore)
router.get('/getAll', userController.getAll)

module.exports = router