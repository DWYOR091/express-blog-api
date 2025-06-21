const multer = require("multer")
const path = require('path')



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now()
        const extension = path.extname(file.originalname)
        const oriName = path.parse(file.originalname).name.split(" ").join("-")
        callback(null, `${oriName.toLowerCase()}-${uniqueSuffix}${extension}`)
    }
})

const upload = multer({ storage })

module.exports = upload

