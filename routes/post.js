const express = require('express')
const { postController } = require('../controllers')
const isAuth = require('../middlewares/isAuth')
const { addPostValidator } = require('../validators/postValidator')
const validate = require('../validators/validate')

const router = express.Router()

router.post('/', isAuth, addPostValidator, validate, postController.addPost)
    .put('/:id', isAuth, postController.updatePost)
    .delete('/:id', isAuth, postController.deletePost)
    .get('/', isAuth, postController.findAllPost)
    .get('/:id', isAuth, postController.findOnePost)

module.exports = router