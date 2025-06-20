const Category = require("../models/Category")

const addCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const { _id } = req.user

        const isTitleExist = await Category.findOne({ title })
        if (isTitleExist) {
            res.code = 400
            throw new Error("Title already exist")
        }

        const newCategory = await Category.create({ title, description, updateBy: _id })
        await newCategory.save()

        res.status(200).json({ code: 200, status: true, message: "category added successfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = { addCategory }