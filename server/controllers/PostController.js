const Post = require('../models/Posts')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')

module.exports = class PostController{
  
  /* CREATE POST */
  static async createPost(req, res){
    const {content} = req.body
    const image = req.files


    res.json({message: 'ta pegante'})
  }
}