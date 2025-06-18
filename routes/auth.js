const express = require('express')
const { authController } = require('../controllers')
const { signinValidator, signupValidator, verifyEmail, verifyUser } = require('../validators/authValidator')
const validate = require('../validators/validate')
const router = express.Router()

router.post('/signup', signupValidator, validate, authController.signup)
    .post('/signin', signinValidator, validate, authController.signin)
    .post('/verify-email', verifyEmail, validate, authController.verifyEmail)
    .post('/verify-user', verifyUser, validate, authController.verifyUser)
    .post('/forgot-password', verifyEmail, validate, authController.forgotPassword)

module.exports = router