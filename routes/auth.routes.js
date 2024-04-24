const {Router} = require('express')
const bcrypt = require('bcryptjs')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()
// /api/auth/register
router.post(
    '/register',
    async (req, res,next) => {
        try{
            const { login, password } = req.body
                console.log(req.body)
                
              
                if (!login || !password)
                next(errors.badRequest('Некорректные данные регистрации'))
        
            const candidate = await User.findOne({ where: { login } })
            console.log(candidate)
            if (candidate)
                return res.json({message: 'Такой пользователь уже существует'})
            
            //const hashPasswors = await bcrypt.hash(password, 2)
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)
            const user = await User.create({
                login: login,
                password: hashedPassword
            })
            //const jwt = jsonwebtoken.sign({ login: login }, key)
            res.status(201).json({message: 'Пользователь создан'})
            }
            catch (e) {
                next(errors.badRequest(e.message))
            }
    })
// /api/auth/login
router.post('/login',
    async (req, res) => {
        try {
            console.log(req.body)
            const { login, password } = req.body
            const user = await User.findOne({
                where: {
                    login: login
                }
            })
            console.log(user)
            if (!user) {
                return res.json(JSON.stringify({ message: 'Пользователь не найден' }))
            }

            const isMatch = await bcrypt.compare(password, user.password)
            console.log("isMatch " + isMatch)
            
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }
            const token = jwt.sign(
                {id: user.id },
                config.get('Key'),
                { expiresIn: '1h' }
            )
            const accountType = user.login === "admin" ? true : false
            // let result = { token, userLogin: user.login, accountType: accountType }
            console.log({ token, id: user.id, accountType })

            return res.json({ token, id: user.id, accountType })
            
        }catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

    module.exports = router