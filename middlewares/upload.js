const multer = require("multer")
const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './uploads')
//     },
//     filename: (req, file, callback) => {
//         const uniqueSuffix = Date.now()
//         const extension = path.extname(file.originalname)
//         const oriName = path.parse(file.originalname).name.split(" ").join("-")
//         callback(null, `${oriName.toLowerCase()}-${uniqueSuffix}${extension}`)
//     }
// })

// const upload = multer({
//     storage, fileFilter: (req, file, callback) => {
//         if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
//             callback(null, true)
//         } else {
//             callback(new Error("File upload must be an image of type PNG, JPG, or JPEG"));
//         }
//     }
// })

//cloudinary
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            callback(null, true)
        } else {
            callback(new Error("File upload must be an image of type PNG, JPG, or JPEG"));
        }
    }
})

module.exports = upload

