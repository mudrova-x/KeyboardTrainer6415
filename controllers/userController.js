const { User } = require('../models/models')
const errors = require('../error/errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config") // константы проекта
const key = config.get('Key')
//доделать логин

class UserController {

    async registration(req, res, next) {
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
        return res.json(user)
        }
        catch (e) {
            next(errors.badRequest(e.message))
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body
            const user = await User.findOne({
                where: {
                    login: login
                }
            })
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
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

            res.json({ token, userId: user.login, accountType })
            
        }catch (e) {
            res.status(500).json({message: e.message})
        }
            
    }

    async checkAuth(req, res) {
        const query = req.query
        res.status(200).json({message:query})
        
    }

    async delete(req, res) {
        const { login } = req.body
        console.log(req.body)
        User.destroy({
            where: {
                login: login
            }
          });
        return res.json({message: "user has been deleted"})

        
    }

    async update(req, res) {
        const { login, password } = req.body
        console.log(req.body)
        const user = await User.update({password: password,},
            {
                where: {
                    login: login
                }
              })
        return res.json({message: "password has been changed"})
    }

    async explore(req, res) {
        const {login} = req.body
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        return res.json(user)
    }

    async getAll(req, res, next) {
        //const users = await User.findAndCountAll();
        try{
        const users = await User.findAll();
        console.log(users.every(user => user instanceof User)); 
        console.log("All users:", JSON.stringify(users, null, 2));
        return res.json(users)
        }
        catch (e) {
            next(errors.badRequest("wrong data"))
        }
    }
}

module.exports = new UserController() // возвращаем объект класса, через который будем обращаться к функциям (выше)