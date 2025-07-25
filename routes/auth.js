const express = require('express')
const { authController } = require('../controllers')
const { signinValidator, signupValidator, verifyEmail, verifyUser, recoverPasswordValidator, changePassValidator, updateProfileValidator } = require('../validators/authValidator')
const validate = require('../validators/validate')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.post('/signup', signupValidator, validate, authController.signup)
    .post('/signin', signinValidator, validate, authController.signin)
    .post('/verify-email', verifyEmail, validate, authController.verifyEmail)
    .post('/verify-user', verifyUser, validate, authController.verifyUser)
    .post('/forgot-password', verifyEmail, validate, authController.forgotPassword)
    .post('/recover-password', recoverPasswordValidator, validate, authController.recoverPassword)
    .post('/change-password', isAuth, changePassValidator, validate, authController.changePassword)
    .put('/update-profile', isAuth, updateProfileValidator, validate, authController.updateProfile)
    .get('/current-user', isAuth, authController.currentUser)

module.exports = router