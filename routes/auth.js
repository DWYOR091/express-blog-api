const express = require('express')
const { authController } = require('../controllers')
const { signinValidator, signupValidator, verifyEmail } = require('../validators/authValidator')
const validate = require('../validators/validate')
const router = express.Router()

router.post('/signup', signupValidator, validate, authController.signup)
    .post('/signin', signinValidator, validate, authController.signin)
    .post('/verify-email', verifyEmail, validate, authController.verifyEmail)

module.exports = router