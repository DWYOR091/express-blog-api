const express = require('express');
const { fileController } = require('../controllers');
const upload = require('../middlewares/upload');
const router = express.Router()
const isAuth = require('../middlewares/isAuth')

router.post('/upload', isAuth, upload.single('image'), fileController.fileUpload)
    .delete('/upload/:id', isAuth, fileController.deleteFile)

module.exports = router