const multer = require('multer')
const path = require('path')

//DESTINATION TO STORAGE THE IMAGES
const imageStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    let folder = ''

    if(req.baseUrl.includes('/user')){
      folder = 'users'
    }else if(req.baseUrl.includes('/post')){
      folder = 'posts'
    }

    cb(null, `public/images/${folder}`)

  },

  filename: (req, file, cb) =>{
    cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
  }

})

const ImageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb){
    //ACCEPT JUST PNG AND JPG IMAGES
    if(!file.originalname.match(/\.(png|jpg)$/)){
      return cb(new Error("Por favor, envie apenas imagens em formato PNG ou JPG"))
    }
    cb(undefined, true)
  }
})

module.exports = {ImageUpload}