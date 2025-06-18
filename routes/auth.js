const express = require('express')
const { authController } = require('../controllers')
const { signinValidator, signupValidator } = require('../validators/authValidator')
const validate = require('../validators/validate')
const router = express.Router()

router.post('/signup', signupValidator, validate, authController.signup)
    .post('/signin', signinValidator, validate, authController.signin)

module.exports = router