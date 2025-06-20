const { check } = require("express-validator");

const addCategoryValidator = [
    check('title').notEmpty().withMessage("title is required"),
    check('description').notEmpty().withMessage("description is required")
]

module.exports = { addCategoryValidator }