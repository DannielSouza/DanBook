const router = require('express').Router()
const PostController = require('../controllers/PostController')
 const verifyToken = require('../helpers/verifyToken')
 const {ImageUpload} = require('../helpers/imageUploader')

router.post('/create', verifyToken, ImageUpload.single("image"), PostController.createPost)
router.get('/', verifyToken, PostController.getAllPosts)
router.delete('/:id', verifyToken, PostController.deletePostById)
router.put('/:id', verifyToken, ImageUpload.single("image"), PostController.updatePostById)
router.post('/comment/:id', verifyToken, PostController.commentAPostById)
router.post('/like/:id', verifyToken, PostController.likeAPostById)


module.exports = router