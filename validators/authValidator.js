const { check } = require('express-validator')

const signupValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required')
]

const signinValidator = [
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required')
]

const verifyEmail = [
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage('Email is required'),
]

const verifyUser = [
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage('Email is required'),
    check('code').notEmpty().withMessage('Code is required')
]

module.exports = { signupValidator, signinValidator, verifyEmail, verifyUser }