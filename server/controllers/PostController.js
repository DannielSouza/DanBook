const Post = require('../models/Posts')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const ObjetctId= require('mongoose').Types.ObjectId

module.exports = class PostController{
  
  /* CREATE POST */
  static async createPost(req, res){
    const {content} = req.body
    const imagesForm = req.file

    if(!content) return res.status(422).json({message: 'o post não pode ser em branco'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    const post = new Post({
      content,
      image: '',
      user:{
        _id: user._id,
        name: user.name,
        image: user.image,
      }
    })

    if(imagesForm) post.image =imagesForm.filename

    try {
      const newPost = await post.save()
      return res.status(201).json({message: 'Post publicado com sucesso.', newPost})
    } catch (error) {
      return res.status(500).json({message: 'Houve um arro ao publicar o post.'})
    }
  }


  /* GET ALL POSTS */
  static async getAllPosts(req, res){
    const posts = await Post.find().sort('-createdAt')
    res.status(200).json({posts:posts})
  }


  /* DETELE USER'S POST */
  static async deletePostById(req, res){
    const {id} = req.params

    if(!ObjetctId.isValid(id)) return res.status(422).json({message: 'Id inválido.'})

    const post = await Post.findOne({_id: id})
    if(!post) return res.status(404).json({message: 'Pet não encontrado.'})

    const token = getToken(req)
    const user = await getUserByToken(token)

    if(String(post.user._id) !== String(user._id)) return res.status(422).json({message: 'O post foi publicado por outro usuário.'})

    await Post.findByIdAndDelete(id)
    return res.status(200).json({message: 'Post removido com sucesso.'})
  }


  /* UPDATE USER'S POST */
  static async updatePostById(req, res){
    const {id} = req.params
    const {content} = req.body
    const imagesForm = req.file

    const post = await Post.findOne({_id: id})
    if(!post) return res.status(404).json({message: 'Post não encontrado.'})

    const token = getToken(req)
    const user = await getUserByToken(token)
    if(String(post.user._id) !== String(user._id)) return res.status(422).json({message: 'O post foi publicado por outro usuário.'})
    
    if(!content) return res.status(422).json({message: 'o post não pode ser em branco'})

    let updatedPost = {
      ...post
    }

    updatedPost._doc.content = content
    if(imagesForm) updatedPost._doc.image = imagesForm.filename

    await Post.findByIdAndUpdate(id, updatedPost)
    return res.status(200).json({message: 'Post atualizado com sucesso.'})
  }

}