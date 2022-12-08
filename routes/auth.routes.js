const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
//const User = require('../models/User')
const router = Router()
//const auth = require("../middleware/auth.middleware");