const { check } = require('express-validator')

const addPostValidator = [
    check('title').notEmpty().withMessage('title is required'),
    check('desc').notEmpty().withMessage('desc is required'),
    check('category').notEmpty().withMessage('category is required'),
]

module.exports = { addPostValidator }