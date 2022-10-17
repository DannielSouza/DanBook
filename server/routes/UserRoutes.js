const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verifyToken')
const { ImageUpload } = require('../helpers/imageUploader')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/:id',verifyToken, UserController.getUserById)
router.put('/edit', verifyToken, ImageUpload.single("image"), UserController.editUser)
router.post('/login', UserController.login)
router.get('/checkuser',verifyToken, UserController.checkUser)
router.get('/profile', verifyToken, UserController.profile)


module.exports = router