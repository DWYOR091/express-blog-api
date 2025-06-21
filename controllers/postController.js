const { File, Post, Category } = require("../models")

const addPost = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { title, desc, file, category } = req.body
        if (file) {
            const checkFile = await File.findById(file)
            if (!checkFile) {
                res.code = 404
                throw new Error("file not found")
            }
        }

        const isCategoryExist = await Category.findById(category)
        if (!isCategoryExist) {
            res.code = 404
            throw new Error("category not found")
        }

        await Post.create({ title, desc, file, category, updateBy: _id })
        res.status(200).json({ code: 200, status: true, message: "post added successfully" })
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { _id } = req.user
        const { title, desc, file, category } = req.body
        const { id } = req.params

        const post = await Post.findById(id)
        if (!post) {
            res.code = 404
            throw new Error("post not found")
        }

        const isCategoryExist = await Category.findById(category)
        if (!isCategoryExist) {
            res.code = 404
            throw new Error("category not found")
        }

        post.title = title ? title : post.title
        post.desc = desc ? desc : post.desc
        post.file = file ? file : post.file
        post.category = category ? category : post.category
        post.updateBy = _id

        await post.save()
        res.status(200).json({ code: 200, status: true, message: "post updated successfully" })
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const checkPost = await Post.findById(id)
        if (!checkPost) {
            res.code = 404
            throw new Error("Post not found")
        }

        await Post.findByIdAndDelete(id)
        res.status(200).json({ code: 200, status: true, message: "post deleted successfully" })
    } catch (error) {
        next(error)
    }
}

const findAllPost = async (req, res, next) => {
    try {
        const { title, size, page } = req.query
        const sizeNumber = parseInt(size) || 10
        const pageNumber = parseInt(page) || 1

        let query = {};
        if (title) {
            const search = new RegExp(title, 'i')
            query = { title: search }
        }

        const posts = await Post.find(query)
            .skip((pageNumber - 1) * sizeNumber)
            .limit(sizeNumber)

        const totalPost = await Post.countDocuments(query)
        const pages = Math.ceil(totalPost / sizeNumber)

        res.status(200).json({
            code: 200,
            status: true,
            message: "get all post successfully",
            data: { posts },
            total: totalPost,
            pages
        })
    } catch (error) {
        next(error)
    }
}

const findOnePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
            .populate('file')
            .populate('category')
            .populate('updateBy', '-password')
        if (!post) {
            res.code = 404
            throw new Error("post not found")
        }
        res.status(200).json({ code: 200, status: true, message: "get one post susccessfully", data: { post } })
    } catch (error) {
        next(error)
    }
}

module.exports = { addPost, updatePost, deletePost, findAllPost, findOnePost }