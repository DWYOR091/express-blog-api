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

const updateCategory = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const { id } = req.params
        const category = await Category.findById(id)
        if (!category) {
            res.code = 404
            throw new Error("category not found")
        }

        const isTitleExist = await Category.findOne({ title })
        console.log(isTitleExist);
        if (isTitleExist && String(id) !== String(isTitleExist._id)) {
            res.code = 400
            throw new Error("title already exist")
        }

        category.title = title
        category.description = description
        await category.save()

        res.status(200).json({ code: 200, status: true, message: "category updated successfully" })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
        if (!category) {
            res.code = 404
            throw new Error("category not found")
        }

        await Category.findByIdAndDelete(id)
        res.status(200).json({ code: 200, status: true, message: "category deleted successfully" })
    } catch (error) {
        next(error)
    }
}

const findAllCategory = async (req, res, next) => {
    try {
        const { q, size, page } = req.query
        const pageNumber = parseInt(page) || 1
        const sizeNumber = parseInt(size) || 5

        let query
        if (q) {
            const search = RegExp(q, 'i')
            query = { title: search }
        }

        const totalCategory = await Category.countDocuments(query);
        const pages = Math.ceil(totalCategory / sizeNumber)

        const categories = await Category.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber)

        res.status(200).json({ code: 200, status: true, message: "get all category successfully", data: { categories, total: totalCategory, pages } })
    } catch (error) {
        next(error)
    }
}

const findOneCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
        if (!category) {
            throw new Error("category not found")
        }

        res.status(200).json({
            code: 200, status: true, message: "Get one category successfully", data: {
                category
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { addCategory, updateCategory, deleteCategory, findAllCategory, findOneCategory }