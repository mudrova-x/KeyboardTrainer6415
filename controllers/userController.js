const { User } = require('../models/models')
const errors = require('../error/errors')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const config = require("config") // константы проекта
const key = config.get('Key')
//доделать логин

class UserController {

    async registration(req, res, next) {
        try{
        const { login, password } = req.body
            console.log(req.body)
            
            if (!login || !password)
                next(errors.badRequest("wrong data"))
            const candidate = await User.findOne({ where: { login } })
            if (candidate)
                next(errors.badRequest("user exist"))
            
        //const hashPasswors = await bcrypt.hash(password, 2)
        const user = await User.create({
            login: login,
            password: password
        })
        //const jwt = jsonwebtoken.sign({ login: login }, key)
        return res.json(user)
        }
        catch (e) {
            next(errors.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        console.log(user)
        if (!user) {
            next(errors.badRequest("wrong data"))
        }
        if (password !== user.password){
            next(errors.badRequest("wrong data"))
        }
        return res.json({user})
            
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