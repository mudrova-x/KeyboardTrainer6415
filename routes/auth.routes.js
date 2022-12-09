const {Router} = require('express')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()


router.post('/login',
    async (request, response) => {
        try {
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
                {userId: user.login },
                config.get('Key'),
                { expiresIn: '1h' }
            )
            const accountType = user.login === "admin" ? true : false
            // let result = { token, userLogin: user.login, accountType: accountType }
            console.log({ token, userId: user.login, accountType })

            response.json({ token, userId: user.login, accountType })
            
        }catch (e) {
            response.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })