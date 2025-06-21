const path = require('path')
const { File } = require('../models')
const fs = require('fs')
const fileUpload = async (req, res, next) => {
    try {
        const { filename, mimetype, size } = req.file
        const { _id } = req.user
        const newFile = await File.create({ name: filename, size, mimetype, createdBy: _id })
        res.status(200).json({ code: 200, status: true, message: "File uploaded successfully", data: { newFile } })
    } catch (error) {
        next(error)
    }
}

const deleteFile = async (req, res, next) => {
    try {
        const { id } = req.params
        const file = await File.findById(id)
        const filePath = path.join(__dirname, '..', 'uploads', file.name)
        fs.unlink(filePath, (err) => {
            if (err) throw err
            console.log("file was deleted")
        })
        if (!file) {
            res.code = 404
            throw new Error("file not found")
        }
        await File.findByIdAndDelete(id)

        res.status(200).json({ code: 200, status: true, message: "file deleted successfully" })
    } catch (error) {
        next(error)
    }
}

module.exports = { fileUpload, deleteFile }