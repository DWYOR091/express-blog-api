const express = require('express')
const { categoryController } = require('../controllers')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')
const router = express()
const validate = require('../validators/validate')
const { addCategoryValidator } = require('../validators/categoryValidator')

router.post('/', isAuth, isAdmin(1, 2), addCategoryValidator, validate, categoryController.addCategory)

module.exports = router