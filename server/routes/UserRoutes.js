const router = require('express').Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verifyToken')
const { ImageUpload } = require('../helpers/imageUploader')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/:id', UserController.getUserById)
router.put('/edit/:id', verifyToken, ImageUpload.single("image"), UserController.editUser)


module.exports = router