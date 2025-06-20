const { check, param } = require("express-validator");
const { default: mongoose } = require("mongoose");

const addCategoryValidator = [
    check('title').notEmpty().withMessage("title is required"),
    check('description').notEmpty().withMessage("description is required")
]

const idCategoryValidator = [
    param('id').custom(async (id) => {
        if (id && !mongoose.Types.ObjectId.isValid(id)) {
            throw "Invalid category id"
        }
    })
]

module.exports = { addCategoryValidator, idCategoryValidator }