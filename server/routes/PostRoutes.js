const router = require('express').Router()
const PostController = require('../controllers/PostController')
 const verifyToken = require('../helpers/verifyToken')

router.post('/create', verifyToken, PostController.createPost)

module.exports = router