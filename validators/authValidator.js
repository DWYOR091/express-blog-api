const { check } = require('express-validator')

const authValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('invalid email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required')
]

module.exports = authValidator