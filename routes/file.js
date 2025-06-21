const express = require('express');
const { fileController } = require('../controllers');
const upload = require('../middlewares/upload');
const router = express.Router()

router.post('/upload', upload.single('image'), fileController.fileUpload)

module.exports = router