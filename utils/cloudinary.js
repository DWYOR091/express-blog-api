const { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } = require('../config/kyes')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
    secure: true
})

module.exports = cloudinary