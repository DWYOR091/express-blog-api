const path = require('path')
const { File } = require('../models')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const fileUpload = async (req, res, next) => {
    try {
        const { filename, mimetype, size } = req.file
        const { _id } = req.user
        // const newFile = await File.create({ name: filename, size, mimetype, createdBy: _id })
        // res.status(200).json({ code: 200, status: true, message: "File uploaded successfully", data: { newFile } })
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        //cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'images'
            }, (error, result) => {
                if (error) reject(error)
                resolve(result)
            })

            uploadStream.end(req.file.buffer)
        })
        const newFile = await File.create({ name: result.display_name, size, mimetype, url: result.secure_url, public_id: result.public_id, createdBy: _id })
        res.status(200).json({ code: 200, status: true, message: "File uploaded successfully", data: { newFile, url: result.secure_url } })
    } catch (error) {
        next(error)
    }
}

const deleteFile = async (req, res, next) => {
    try {
        const { id } = req.params
        const file = await File.findById(id)
        // const filePath = path.join(__dirname, '..', 'uploads', file.name)
        // fs.unlink(filePath, (err) => {
        //     if (err) throw err
        //     console.log("file was deleted")
        // })
        console.log(file.public_id);
        if (file.public_id) {
            await cloudinary.uploader.destroy(file.public_id)
        }

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