const express = require('express')
const { authController } = require('../controllers')
const authValidator = require('../validators/authValidator')
const validate = require('../validators/validate')
const router = express.Router()

router.post('/signup', authValidator, validate, authController.signup)

module.exports = router