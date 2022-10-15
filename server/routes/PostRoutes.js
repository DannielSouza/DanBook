const router = require('express').Router()
const PostController = require('../controllers/PostController')
 const verifyToken = require('../helpers/verifyToken')
 const {ImageUpload} = require('../helpers/imageUploader')

router.post('/create', verifyToken, ImageUpload.single("image"), PostController.createPost)
router.get('/', verifyToken, PostController.getAllPosts)
router.delete('/:id', verifyToken, PostController.deletePostById)
router.put('/:id', verifyToken, ImageUpload.single("image"), PostController.updatePostById)

module.exports = router