const { User } = require('../models/models')
const errors = require('../error/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require("config") // константы проекта
const key = config.get('Key')
//доделать логин

const generateJwt = (login, type) => {
    return jwt.sign(
        {login, type},
        "process.env.SECRET_KEY",
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration(req, res) {
        try {
            const { login, password } = req.body
            console.log(req.body)
            
          
            if (!login || !password)
                return res.json({ message: 'Некорректные данные регистрации' })
        
            //next(errors.badRequest('Некорректные данные регистрации'))
    
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
           // next(errors.badRequest(e.message))
            console.log(e)
        }
    }

    async login(req, res) {
        try{
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return res.json({ message: 'Пользователь не найден' })
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.json({ message: 'Указан неверный пароль'})
        }
        const accountType = user.login === "admin" ? true : false
        console.log(user)
            const token = generateJwt(user.login, accountType)
        console.log({ accountType:accountType })
       
//        res.setHeader("Access-Control-Allow-Origin", "http://localhost5000");
//         res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
        //res.status(201);
        return res.json(user)
        }
        catch (e) {
            console.log("error")
            console.log(e)
        }
    }

    // async login(req, res) {
    //     try {
    //         console.log(req.body)
    //         const { login, password } = req.body
    //         const user = await User.findOne({
    //             where: {
    //                 login: login
    //             }
    //         })
    //        //console.log(user)
    //         if (!user) {
    //             return res.json(JSON.stringify({ message: 'Пользователь не найден' }))
    //         }

    //         //const isMatch = await bcrypt.compare(password, user.password)
    //         console.log("isMatch " + isMatch)
    //         if (!isMatch) {
    //             return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    //         }
    //         const token = jwt.sign(
    //             { userId: user.login },
    //             config.get('Key'),
    //             { expiresIn: '1h' }
    //         )
    //         const accountType = user.login === "admin" ? true : false
    //         let result = { token, userLogin: user.login, accountType: accountType }
        
    //        // console.log({ token, userId: user.login, accountType })
    //         //console.log( res.json(result));
    //         res.json(user)
            
    //     }catch (e) {
    //         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    //     }
            
    // }

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