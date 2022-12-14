const { User, Statistics} = require('../models/models')
const errors = require('../error/errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config") // константы проекта
const key = config.get("Key")
//доделать логин

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body
      console.log(req.body)

      if (!login || !password)
        next(errors.badRequest("Некорректные данные регистрации"))

      const candidate = await User.findOne({ where: { login } })
      console.log(candidate)
      if (candidate)
        return res.json({ message: "Такой пользователь уже существует" })

      //const hashPasswors = await bcrypt.hash(password, 2)
      const hashedPassword = await bcrypt.hash(password, 12)
      console.log(hashedPassword)
      const user = await User.create({
        login: login,
        password: hashedPassword,
      })
      //const jwt = jsonwebtoken.sign({ login: login }, key)
      return res.json(user)
    } catch (e) {
      next(errors.badRequest(e.message))
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body
      const user = await User.findOne({
        where: {
          login: login,
        },
      })
      console.log(user)
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      console.log("isMatch " + isMatch)
      if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
      const token = jwt.sign(
          {userId: user.id },
          config.get('Key'),
          { expiresIn: '1h' }
      )
      const accountType = user.login === "admin" ? 'admin' : 'student'
      // let result = { token, userLogin: user.login, accountType: accountType }
      console.log({ token, userId: user.id, accountType })

      res.json({ token, userId: user.id, accountType })
      
  }catch (e) {
      res.status(500).json({message: e.message})
  }
    //   const isMatch = await bcrypt.compare(password, user.password)
    //   console.log("isMatch " + isMatch)
    //   if (!isMatch) {
    //     return res
    //       .status(400)
    //       .json({ message: "Неверный пароль, попробуйте снова" })
    //   }
    //   const token = jwt.sign({ userId: user.login }, config.get("Key"), {
    //     expiresIn: "1h",
    //   })
    //   const accountType = user.login === "admin" ? "admin" : "student"
    //   // let result = { token, userLogin: user.login, accountType: accountType }
    //   console.log({ token, userId: user.login, accountType })

    //   res.json({ token, userId: user.login, accountType })
    // } catch (e) {
    //   res.status(500).json({ message: e.message })
    // }
  }

  async checkAuth(req, res) {
    const query = req.query
    res.status(200).json({ message: query })
  }

  async delete(req, res) {
    try {
      const { login } = req.body
      console.log(req.body)

      const user = await User.findOne({
        where: {
          login: login,
        },
      })
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      User.destroy({
        where: {
          login: login,
        },
      })
      return res.json({ message: "Пользователь удален" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async update(req, res) {
    try {
      const { login, password } = req.body
      console.log(req.body)

      const fuser = await User.findOne({
        where: {
          login: login,
        },
      })
      console.log(fuser)
      if (!fuser) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await User.update(
        { password: hashedPassword },
        {
          where: {
            login: login,
          },
        }
      )
      return res.json({ message: "Пароль изменен" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  async explore(req, res) {
    const { login } = req.body
    const user = await User.findOne({
      where: {
        login: login,
      },
    })
    return res.json(user)
  }
  async postStatistic(req,res,next){
    try{

        let{time,date,errors,speed,success,userId, exerciseId} = req.body;
        const statistic = await Statistics.create({time,date,errors,speed,success,userId,exerciseId})
        return res.json(statistic)
    }
    catch (e){
        next(e.message)
    }
}
  async getAll(req, res, next) {
    //const users = await User.findAndCountAll();
    try {
      const users = await User.findAll()
      console.log(users.every((user) => user instanceof User))
      console.log("All users:", JSON.stringify(users, null, 2))
      return res.json(users)
    } catch (e) {
      next(errors.badRequest("Ошибка запроса"))
    }
  }
}

module.exports = new UserController() // возвращаем объект класса, через который будем обращаться к функциям (выше)
