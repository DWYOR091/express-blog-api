const express = require('express')
const { categoryController } = require('../controllers')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')
const router = express()
const validate = require('../validators/validate')
const { addCategoryValidator, idCategoryValidator } = require('../validators/categoryValidator')

router.post('/', isAuth, isAdmin(1, 2), addCategoryValidator, validate, categoryController.addCategory)
    .put('/:id', isAuth, isAdmin(1, 2), idCategoryValidator, validate, categoryController.updateCategory)
    .delete('/:id', isAuth, isAdmin(1, 2), idCategoryValidator, validate, categoryController.deleteCategory)
    .get('/', categoryController.findAllCategory)
module.exports = router